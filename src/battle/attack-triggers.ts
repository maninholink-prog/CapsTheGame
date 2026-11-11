import {laboratoryBlocked} from './laboratory.js';
import {caveiraBlocked} from './caveira.js';
import {narrativeBlock} from './narrative.js';
import { opponent } from './types.js';
import type { BattleEvent, BattleState, CardInstance, PendingEffect, Result } from './types.js';
import type { PrepareCommand } from './combat.js';

export function requiredBanjos(state: BattleState): CardInstance[] {
  const combat = state.combat;
  if (!combat || !state.players[opponent(combat.attacker)].board.length) return [];
  const required: CardInstance[] = [];
  // Simultaneous unit triggers follow permanent field order, not reordered attackers.
  for (const unit of state.players[combat.attacker].board) {
    const lane = combat.lanes.find(l => l.attackerId === unit.card.instanceId);
    if (!lane) continue;
    const selected = new Set(lane.weapons);
    for (const id of selected) {
      const gear = (unit.equipment ?? []).find(e => e.card.instanceId === id);
      const def = gear && state.definitions[gear.card.definitionId];
      if (gear && !gear.used && def?.kind === 'equipment' && def.ability === 'banjo') required.push(gear.card);
    }
  }
  return required;
}

export function prepareAttackEffects(state: BattleState, command: PrepareCommand): Result {
  const invalid = (error: string): Result => ({ ok: false, state, error });
  const combat = state.combat;
  if (state.phase !== 'actions' || combat?.stage !== 'triggers' || combat.attacker !== command.player ||
    state.priorityOwner !== command.player || state.stack.length || state.stackReturnOwner !== null) return invalid('Attack triggers unavailable');
  const required = requiredBanjos(state);
  if (command.banjos.length !== required.length || new Set(command.banjos.map(b => b.equipmentId)).size !== required.length ||
    command.banjos.some(b => !required.some(c => c.instanceId === b.equipmentId) ||
      !state.players[opponent(command.player)].board.some(u => u.card.instanceId === b.targetId))) return invalid('Choose a valid target for each Banjo');
  const next = structuredClone(state);
  const events: BattleEvent[] = [];
  const pending: PendingEffect[] = [];
  for (const card of required) {
    const targetId = command.banjos.find(b => b.equipmentId === card.instanceId)!.targetId;
    for (const unit of next.players[command.player].board) {
      const gear = (unit.equipment ?? []).find(e => e.card.instanceId === card.instanceId);
      if (gear) gear.used = true;
    }
    const id = next.nextEffectId++;
    pending.push({ id, mode: 'banjo', owner: command.player, source: structuredClone(card),
      targets: [{ kind: 'unit', player: opponent(command.player), instanceId: targetId }] });
    events.push({ type: 'effectQueued', effectId: id });
  }
  // Last-in-first-out resolves the first ordered trigger first.
  next.stack.push(...pending.reverse());
  next.stackReturnOwner = opponent(command.player);
  next.priorityOwner = opponent(command.player);
  next.combat!.stage = 'responses';
  narrativeBlock(next,opponent(command.player),next.combat!.pendingBlockers??[],events);delete next.combat!.pendingBlockers;laboratoryBlocked(next,next.combat!,events);
  caveiraBlocked(next,next.combat!,events);
  next.consecutivePasses = 0;
  return { ok: true, state: next, events };
}

