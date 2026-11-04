import {equipmentDamage} from './equipment.js';
import {laboratoryAttack,laboratoryBlocked,laboratoryAfterAttack} from './laboratory.js';
import {finishEncounterResolution} from './encounters.js';
import {recordDamage,nexusStrike} from './expansion.js';
import {markTalentAttack,talentStrikeBonus,talentDamage} from './kylast-talents.js';
import {narrativeBlock,shieldTriggers,queueShields} from './narrative.js';
import { strikes, canBlock } from './champions.js';
import { opponent } from './types.js';
import { settle } from './state-events.js';
import { requiredBanjos } from './attack-triggers.js';
import type { BattleEvent, BattleState, CombatLane, PlayerId, Result } from './types.js';

export interface AttackCommand { type: 'attack'; player: PlayerId; attackers: { unitId: string; weapons?: (string | null)[] }[] }
export interface BlockCommand { type: 'block'; player: PlayerId; assignments: { attackerId: string; blockerId: string }[] }
export interface PrepareCommand { type: 'prepareAttack'; player: PlayerId; banjos: { equipmentId: string; targetId: string }[] }

export function declareAttack(state: BattleState, command: AttackCommand): Result {
  const invalid = (error: string): Result => ({ ok: false, state, error });
  if (state.phase !== 'actions' || state.combat || state.stackReturnOwner !== null || state.stack.length ||
    state.priorityOwner !== command.player || state.attackOwner !== command.player || !state.attackAvailable)
    return invalid('Attack unavailable');
  if (!command.attackers.length || new Set(command.attackers.map(a => a.unitId)).size !== command.attackers.length)
    return invalid('Invalid attackers');
  const lanes: CombatLane[] = [];
  for (const entry of command.attackers) {
    const unit = state.players[command.player].board.find(u => u.card.instanceId === entry.unitId);
    if (!unit || (unit.stunnedUntilRound ?? -1) >= state.round)
      return invalid('Invalid attacker or equipment sequence');
    const def = state.definitions[unit.card.definitionId];
    const hitCount = strikes(state,unit);
    const gear = unit.equipment ?? [];
    if (gear.length > 1 && !entry.weapons) return invalid('Choose an equipment sequence');
    const weapons = entry.weapons ?? Array<string | null>(hitCount).fill(gear[0]?.card.instanceId ?? null);
    if (weapons.length !== hitCount || weapons.some(w => w !== null && !gear.some(e => e.card.instanceId === w)))
      return invalid('Invalid equipment sequence');
    lanes.push({ attackerId: entry.unitId, blockerId: null, blocked: false, weapons: [...weapons] });
  }
  const next = structuredClone(state);
  for(const lane of lanes)markTalentAttack(next,command.player,lane);
  next.combat = { attacker: command.player, stage: 'blocking', lanes };
  next.attackAvailable = false;
  next.priorityOwner = opponent(command.player);
  next.consecutivePasses = 0;
  const events:BattleEvent[]=[{type:'attackDeclared',player:command.player,attackerIds:lanes.map(l=>l.attackerId)}];
  for(const lane of next.combat!.lanes){const u=next.players[command.player].board.find(u=>u.card.instanceId===lane.attackerId)!;if(next.definitions[u.card.definitionId].encounterSpecial==='dianamite')u.attack++;}
  laboratoryAttack(next,command.player,next.combat!.lanes,events);
  if(next.stack.length){next.combat!.stage='responses';next.combat!.awaitingBlocks=true;}
  return {ok:true,state:next,events};
}

export function declareBlocks(state: BattleState, command: BlockCommand): Result {
  const combat = state.combat;
  const invalid = (error: string): Result => ({ ok: false, state, error });
  if (state.phase !== 'actions' || !combat || combat.stage !== 'blocking' || command.player !== opponent(combat.attacker))
    return invalid('Blocking unavailable');
  if (new Set(command.assignments.map(a => a.attackerId)).size !== command.assignments.length ||
    new Set(command.assignments.map(a => a.blockerId)).size !== command.assignments.length) return invalid('Duplicate block assignment');
  for (const entry of command.assignments) {
    const blocker = state.players[command.player].board.find(u => u.card.instanceId === entry.blockerId);
    if (!combat.lanes.some(l => l.attackerId === entry.attackerId) || !blocker || (blocker.stunnedUntilRound ?? -1) >= state.round)
      return invalid('Invalid blocker');
    const attacker=state.players[combat.attacker].board.find(u=>u.card.instanceId===entry.attackerId);
    if(attacker&&!canBlock(attacker,blocker))return invalid('Elusive requires elusive blocker');
  }
  const next = structuredClone(state);
  for (const entry of command.assignments) {
    const lane = next.combat!.lanes.find(l => l.attackerId === entry.attackerId)!;
    lane.blockerId = entry.blockerId;
    lane.blocked = true;
  }
  next.combat!.stage = requiredBanjos(next).length ? 'triggers' : 'responses';
  next.priorityOwner = combat.attacker;
  next.consecutivePasses = 0;
  const events:BattleEvent[]=[{type:'blocksDeclared',player:command.player}];
  if(next.combat!.stage==='triggers')next.combat!.pendingBlockers=command.assignments.map(x=>x.blockerId);
  else {narrativeBlock(next,command.player,command.assignments.map(x=>x.blockerId),events);laboratoryBlocked(next,next.combat!,events);}
  if(next.combat!.stage==='triggers')next.priorityOwner=combat.attacker;
  return {ok:true,state:next,events};
}

export function resolveCombat(state: BattleState): Result {
  if (state.phase !== 'actions' || state.combat?.stage !== 'responses' || state.stack.length || state.stackReturnOwner !== null)
    return { ok: false, state, error: 'Combat not ready' };
  const next = structuredClone(state);
  const combat = next.combat!;
  const defender = opponent(combat.attacker);
  const events: BattleEvent[] = [];
  for (const [laneIndex, lane] of combat.lanes.entries()) {
    if(laneIndex<(combat.laneIndex??0))continue;
    let brokeBlock = lane.brokeBlock??false;
    for (let strike = 0; strike < lane.weapons.length; strike++) {
      if(laneIndex===(combat.laneIndex??0)&&strike<(combat.strikeIndex??0))continue;
      const retaliations:ReturnType<typeof shieldTriggers>=[];
      const attacker = next.players[combat.attacker].board.find(u => u.card.instanceId === lane.attackerId);
      if (!attacker || (attacker.stunnedUntilRound ?? -1) >= next.round) break;
      const blocker = next.players[defender].board.find(u => u.card.instanceId === lane.blockerId);
      const weapon = (attacker.equipment ?? []).find(e => e.card.instanceId === lane.weapons[strike]);
      const definition = weapon && next.definitions[weapon.card.definitionId];
      if(weapon&&(blocker||!lane.blocked||brokeBlock)){lane.laboratoryUsedWeapons??=[];if(!lane.laboratoryUsedWeapons.includes(weapon.card.instanceId))lane.laboratoryUsedWeapons.push(weapon.card.instanceId);}
      const executionBonus=blocker&&definition?.expansion==='last-cry'&&next.executionMarks?.[combat.attacker]?.targetId===blocker.card.instanceId?1:0;
      const attack = Math.max(0, attacker.attack + executionBonus +talentStrikeBonus(next,combat.attacker,attacker,lane,strike)+ equipmentDamage(next,attacker,definition));
      if (blocker) {
        if(attack>0)retaliations.push(...shieldTriggers(next,blocker,{kind:'unit',player:combat.attacker,instanceId:attacker.card.instanceId}));
        blocker.health = Math.max(0, blocker.health - attack);
        events.push({ type: 'damageApplied', target: { kind: 'unit', player: defender, instanceId: blocker.card.instanceId }, amount: attack });recordDamage(next,{kind:'unit',player:defender,instanceId:blocker.card.instanceId},combat.attacker);
        talentDamage(next,defender,blocker,attack,events);
        // Evolved first strike is Quick Attack. Only the second exchanges damage.
        if ((lane.weapons.length === 1 && (!attacker.keywords?.includes('quick') || blocker.health > 0)) || strike > 0) {
          const retaliation = Math.max(0, blocker.attack);
          if(retaliation>0)retaliations.push(...shieldTriggers(next,attacker,{kind:'unit',player:defender,instanceId:blocker.card.instanceId}));
          attacker.health = Math.max(0, attacker.health - retaliation);
          events.push({ type: 'damageApplied', target: { kind: 'unit', player: combat.attacker, instanceId: attacker.card.instanceId }, amount: retaliation });recordDamage(next,{kind:'unit',player:combat.attacker,instanceId:attacker.card.instanceId},defender);
          talentDamage(next,combat.attacker,attacker,retaliation,events);
        }
      } else if (!lane.blocked || brokeBlock) {
        next.players[defender].nexus = Math.max(0, next.players[defender].nexus - attack);
        events.push({ type: 'damageApplied', target: { kind: 'nexus', player: defender }, amount: attack });if(next.players[defender].nexus>0)nexusStrike(next,combat.attacker,attacker,attack,events);
      }
      settle(next, events);
      if (next.phase !== 'ended' && blocker && definition?.kind === 'equipment' && definition.ability === 'alastor') {
        const aura = next.players[combat.attacker].board.some(u => {
          const def = next.definitions[u.card.definitionId];
          return def?.kind === 'unit' && def.ability === 'ybew';
        });
        const amount = aura ? 2 : 1;
        for (const index of [laneIndex - 1, laneIndex + 1]) {
          const id = combat.lanes[index]?.blockerId;
          const neighbor = next.players[defender].board.find(u => u.card.instanceId === id);
          if (neighbor) {
            neighbor.health = Math.max(0, neighbor.health - amount);recordDamage(next,{kind:'unit',player:defender,instanceId:neighbor.card.instanceId},combat.attacker);
            talentDamage(next,defender,neighbor,amount,events);
            events.push({ type: 'damageApplied', target: { kind: 'unit', player: defender, instanceId: neighbor.card.instanceId }, amount });
          }
        }
        settle(next, events);
      }
      if (strike === 0 && blocker && !next.players[defender].board.some(u => u.card.instanceId === blocker.card.instanceId)) brokeBlock = true;
      lane.brokeBlock=brokeBlock;combat.laneIndex=laneIndex;combat.strikeIndex=strike+1;
      queueShields(next,retaliations,events);
      if(next.stack.length&&next.phase!=='ended')return {ok:true,state:next,events};
      if (next.phase === 'ended') break;
    }
    if (next.phase === 'ended') break;
  }
  if(next.phase!=='ended'){
    laboratoryAfterAttack(next,combat,events);
    for(const lane of combat.lanes){const u=next.players[combat.attacker].board.find(u=>u.card.instanceId===lane.attackerId&&u.health>0);if(u&&next.definitions[u.card.definitionId].encounterSpecial==='dianamite'){const id=next.nextEffectId++;next.stack.push({id,owner:combat.attacker,source:{definitionId:'lab-dianamite-recoil',instanceId:`recoil-${id}`,generated:true},targets:[{kind:'unit',player:combat.attacker,instanceId:u.card.instanceId}],mode:'ability'});next.stackReturnOwner??=defender;next.priorityOwner=defender;next.responseWindowOpened=true;events.push({type:'effectQueued',effectId:id});}}
  }
  next.combat = null;
  next.consecutivePasses = 0;
  if (next.phase !== 'ended') next.priorityOwner = defender;
  events.push({ type: 'combatEnded' });
  return { ok: true, state: next, events };
}


