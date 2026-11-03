import {canBlock,strikes} from '../battle/champions.js';
import { applyCommand } from '../battle/commands.js';
import { opponent } from '../battle/types.js';
import { requiredBanjos } from '../battle/attack-triggers.js';
import type { BattleState, BoardUnit, CombatLane, PlayerId } from '../battle/types.js';
import type { AttackCommand, BlockCommand, PrepareCommand } from '../battle/combat.js';

// All callers supply a public-information sandbox, never the real hidden state.
export function unitValue(state: BattleState, unit: BoardUnit): number {
  const def = state.definitions[unit.card.definitionId];
  return Math.max(0, unit.attack) * .85 + unit.health * .6 +
    (def?.kind === 'unit' && def.champion ? 3 : 0) +
    (def?.kind === 'unit' && ['wang', 'robot', 'joia'].includes(def.ability ?? '') ? 1.2 : 0);
}
export function damageWith(state: BattleState, unit: BoardUnit, weapon: string | null): number {
  const gear = (unit.equipment ?? []).find(g => g.card.instanceId === weapon);
  const def = gear && state.definitions[gear.card.definitionId];
  return Math.max(0, unit.attack + (def?.kind === 'equipment' ? def.damage ?? 0 : 0));
}
function laneTrade(state: BattleState, lane: CombatLane, blocker?: BoardUnit) {
  const attacker = state.players[state.combat!.attacker].board.find(u => u.card.instanceId === lane.attackerId)!;
  if (!attacker || (attacker.stunnedUntilRound ?? -1) >= state.round) return { damage: 0, ownLoss: 0, enemyLoss: 0, wounds: 0 };
  let hp = attacker.health, blockHp = blocker?.health ?? 0, damage = 0;
  for (let i = 0; i < lane.weapons.length && hp > 0; i++) {
    const hit = damageWith(state, attacker, lane.weapons[i]);
    if (blocker && blockHp > 0) {
      blockHp -= hit;
      if ((lane.weapons.length === 1&&(!attacker.keywords?.includes('quick')||blockHp>0)) || i > 0) hp -= Math.max(0, blocker.attack);
    } else damage += hit;
  }
  return { damage, ownLoss: blocker && blockHp <= 0 ? unitValue(state, blocker) : 0,
    enemyLoss: hp <= 0 ? unitValue(state, attacker) : 0,
    wounds: blocker ? Math.min(blocker.health, blocker.health - Math.max(0, blockHp)) * .08 - Math.min(attacker.health, attacker.health - Math.max(0, hp)) * .08 : 0 };
}

export function blockCommand(state: BattleState, defender: PlayerId, exhaustive = true): BlockCommand {
  const combat = state.combat!;
  const available = state.players[defender].board.filter(u => (u.stunnedUntilRound ?? -1) < state.round);
  let bestScore = -Infinity;
  let best: BlockCommand['assignments'] = [];
  const score = (assignments: BlockCommand['assignments']) => {
    let damage = 0, trades = 0;
    for (const lane of combat.lanes) {
      const id = assignments.find(a => a.attackerId === lane.attackerId)?.blockerId;
      const trade = laneTrade(state, lane, available.find(u => u.card.instanceId === id));
      damage += trade.damage;
      trades += trade.enemyLoss - trade.ownLoss - trade.wounds;
    }
    return trades - damage * 2.5 - (damage >= state.players[defender].nexus ? 100000 : 0);
  };
  if (!exhaustive) {
    const assignments: BlockCommand['assignments'] = [];
    for (const lane of combat.lanes) {
      let pick: string | null = null; let benefit = score(assignments);
      for (const unit of available) {
        if (assignments.some(a => a.blockerId === unit.card.instanceId)||!canBlock(state.players[combat.attacker].board.find(u=>u.card.instanceId===lane.attackerId)!,unit)) continue;
        const trial = [...assignments, { attackerId: lane.attackerId, blockerId: unit.card.instanceId }];
        const value = score(trial);
        if (value > benefit) { benefit = value; pick = unit.card.instanceId; }
      }
      if (pick) assignments.push({ attackerId: lane.attackerId, blockerId: pick });
    }
    return { type: 'block', player: defender, assignments };
  }
  // At most 1546 partial matchings for five attackers/five defenders.
  function visit(index: number, assignments: BlockCommand['assignments'], used: Set<string>) {
    if (index === combat.lanes.length) {
      const value = score(assignments);
      if (value > bestScore) { bestScore = value; best = [...assignments]; }
      return;
    }
    visit(index + 1, assignments, used);
    for (const unit of available) {
      if (used.has(unit.card.instanceId)||!canBlock(state.players[combat.attacker].board.find(u=>u.card.instanceId===combat.lanes[index].attackerId)!,unit)) continue;
      used.add(unit.card.instanceId);
      assignments.push({ attackerId: combat.lanes[index].attackerId, blockerId: unit.card.instanceId });
      visit(index + 1, assignments, used);
      assignments.pop(); used.delete(unit.card.instanceId);
    }
  }
  visit(0, [], new Set());
  return { type: 'block', player: defender, assignments: best };
}

export function banjoCommand(state: BattleState): PrepareCommand {
  const owner = state.combat!.attacker;
  const enemies = state.players[opponent(owner)].board;
  const chosen = new Set<string>();
  return { type: 'prepareAttack', player: owner, banjos: requiredBanjos(state).map(gear => {
    const ranked = enemies.map(unit => {
      const lane = state.combat!.lanes.find(l => l.blockerId === unit.card.instanceId);
      const attacker = lane && state.players[owner].board.find(u => u.card.instanceId === lane.attackerId);
      const opening = lane && attacker ? lane.weapons.reduce((sum, weapon) => sum + damageWith(state, attacker, weapon), 0) * 3 + 4 : 0;
      return { unit, score: opening + unitValue(state, unit) * .25 - (chosen.has(unit.card.instanceId) ? 100 : 0) };
    }).sort((a, b) => b.score - a.score);
    const targetId = ranked[0]?.unit.card.instanceId ?? '';
    chosen.add(targetId);
    return { equipmentId: gear.instanceId, targetId };
  }) };
}

function weaponPlan(state: BattleState, unit: BoardUnit, useBanjo: boolean): (string | null)[] {
  const gear = [...(unit.equipment ?? [])].sort((a, b) => damageWith(state, unit, b.card.instanceId) - damageWith(state, unit, a.card.instanceId));
  const def = state.definitions[unit.card.definitionId];
  const hitCount = strikes(state,unit);
  const result = Array<string | null>(hitCount).fill(gear[0]?.card.instanceId ?? null);
  if (useBanjo && state.players[opponent(state.combat?.attacker ?? state.priorityOwner!)].board.length) {
    const banjos = gear.filter(g => {
      const d = state.definitions[g.card.definitionId];
      return !g.used && d?.kind === 'equipment' && d.ability === 'banjo';
    });
    for (let i = 0; i < Math.min(hitCount, banjos.length); i++) result[i] = banjos[i].card.instanceId;
  }
  return result;
}
function positionValue(state: BattleState, self: PlayerId): number {
  const foe = opponent(self);
  return state.players[self].nexus * 1.8 - state.players[foe].nexus * 1.8 +
    state.players[self].board.reduce((sum, unit) => sum + unitValue(state, unit), 0) -
    state.players[foe].board.reduce((sum, unit) => sum + unitValue(state, unit), 0);
}
export function attackCandidates(state: BattleState, self: PlayerId): { command: AttackCommand; score: number }[] {
  if (!state.attackAvailable || state.attackOwner !== self || state.combat || state.stackReturnOwner !== null) return [];
  const units = state.players[self].board.filter(u => (u.stunnedUntilRound ?? -1) < state.round);
  const result: { command: AttackCommand; score: number }[] = [];
  const before = positionValue(state, self);
  const seen = new Set<string>();
  for (let mask = 1; mask < 1 << units.length; mask++) {
    const selected = units.filter((_, i) => mask & 1 << i);
    for (const order of [selected, [...selected].sort((a, b) => b.attack - a.attack)]) for (const useBanjo of [false, true]) {
      const command: AttackCommand = { type: 'attack', player: self, attackers: order.map(u => ({ unitId: u.card.instanceId, weapons: weaponPlan(state, u, useBanjo) })) };
      const key = JSON.stringify(command); if (seen.has(key)) continue; seen.add(key);
      const attacked = applyCommand(state, command); if (!attacked.ok) continue;
      const blocked = applyCommand(attacked.state, blockCommand(attacked.state, opponent(self), false)); if (!blocked.ok) continue;
      let next = blocked.state;
      if (next.combat?.stage === 'triggers') {
        const prepared = applyCommand(next, banjoCommand(next)); if (!prepared.ok) continue;
        next = prepared.state;
      }
      // Only known combat/Banjo outcomes, with no assumed hidden responses, draws or Colar rolls.
      for (let i = 0; i < 4 && next.combat && next.phase !== 'ended'; i++) {
        const passed = applyCommand(next, { type: 'pass', player: next.priorityOwner! });
        if (!passed.ok) break;
        next = passed.state;
      }
      if (next.combat && next.phase !== 'ended') continue;
      const score = next.winner === self ? 100000 : next.winner === opponent(self) ? -100000 : positionValue(next, self) - before - .1;
      result.push({ command, score });
    }
  }
  return result;
}
