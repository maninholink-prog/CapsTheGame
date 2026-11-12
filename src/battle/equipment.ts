import {consumeAbeCosts} from './abe-talents.js';
import type {CardDefinition} from '../content/schema.js';
import {paidEquipmentUpgrade} from './laboratory.js';
import { payCost } from './costs.js';
import {hasTalent,talentCapacity,talentAttached,consumeTalentEquipmentCost} from './kylast-talents.js';
import {lazaroEquipmentAttached} from './lazaro-talents.js';
import { returnCard } from './state-events.js';
import { consumeEquipmentDiscount, equipmentPrice, onEquipmentAttached } from './supports.js';
import { opponent } from './types.js';
import type { BattleEvent, BattleState, BoardUnit, CardInstance, PlayerId, Result } from './types.js';

export function equipmentDamage(state:BattleState,bearer:BoardUnit,definition?:CardDefinition):number {
 if(definition?.kind!=='equipment')return 0;
 const d=state.definitions[bearer.card.definitionId];
 return (definition.damage??0)+((definition.baseId??definition.id)==='cinderela'&&bearer.evolved&&d?.kind==='unit'&&d.champion==='abe'?2:0);
}

export function effectiveEquipmentCapacity(state: BattleState, unit: BoardUnit): number {
  const definition = state.definitions[unit.card.definitionId];
  const owner=(['p1','p2'] as const).find(o=>state.players[o].board.some(u=>u.card.instanceId===unit.card.instanceId));
  return definition?.kind === 'unit' && definition.champion === 'kylast'
    ? owner&&state.talentLoadouts?.[owner]?talentCapacity(state,owner):Math.min(6, Math.max(2, state.kylastEquipmentSlots)) : 1;
}

export function equipmentError(state: BattleState, owner: PlayerId, equipmentId: string, unitId: string, replacement?: string, ignoreReservations = false): string | null {
  const player = state.players[owner];
  const card = player.hand.find(c => c.instanceId === equipmentId);
  const definition = card && state.definitions[card.definitionId];
  const unit = player.board.find(u => u.card.instanceId === unitId);
  if (!card || definition?.kind !== 'equipment' || !unit) return 'Invalid equipment or bearer';
  if (!ignoreReservations && state.stack.some(p => p.owner === owner && p.mode === 'arsenal' && p.equipmentId === equipmentId))
    return 'Equipment is reserved by a pending spell';
  const gear = unit.equipment ?? [];
  if (gear.length >= effectiveEquipmentCapacity(state, unit)) {
    if (!replacement || !gear.some(e => e.card.instanceId === replacement)) return 'Equipment slot replacement required';
  } else if (replacement !== undefined) return 'Equipment replacement requires full slots';
  return null;
}

// Mutates a private clone immediately after the equipment is attached.
export function applyEvolution(state: BattleState, owner: PlayerId, events: BattleEvent[]): void {
  if (!state.evolvedKylast[owner] && state.equippedIdentities[owner].length >= 4) {
    state.evolvedKylast[owner] = true;
    for (const unit of state.players[owner].board) {
      const def = state.definitions[unit.card.definitionId];
      if (def?.kind === 'unit' && def.champion === 'kylast' && !unit.evolved) {
        unit.attack += 1+(hasTalent(state,owner,'master-of-all')?1:0); unit.maxHealth += 1; unit.health += 1; unit.evolved = true;
      }
    }
    events.push({ type: 'championEvolved', player: owner, champion: 'kylast' });
  }
}

// Internal attachment, shared with free/random activations; source is already outside the hand.
export function attachEquipment(state: BattleState, owner: PlayerId, source: CardInstance, bearerOwner: PlayerId,
  unitId: string, events: BattleEvent[], replacement?: string): boolean {
  const bearer = state.players[bearerOwner].board.find(u => u.card.instanceId === unitId);
  if (!bearer || state.definitions[source.definitionId]?.kind !== 'equipment') return false;
  const gear = bearer.equipment ?? [];
  const previousIdentities=gear.map(e=>state.definitions[e.card.definitionId].baseId??e.card.definitionId);
  if (gear.length >= effectiveEquipmentCapacity(state, bearer)) {
    if (!replacement || !gear.some(e => e.card.instanceId === replacement)) return false;
  } else if (replacement !== undefined) return false;
  bearer.equipment = gear;
  if (replacement) {
    const [returned] = gear.splice(gear.findIndex(e => e.card.instanceId === replacement), 1);
    returnCard(state, returned.owner ?? bearerOwner, returned.card, events);
  }
  gear.push({ card: structuredClone(source), used: false, owner });
  const identity=state.definitions[source.definitionId].baseId??source.definitionId;
  talentAttached(state,bearerOwner,bearer,previousIdentities,identity);
  consumeTalentEquipmentCost(state,bearerOwner,unitId,source.instanceId);
  lazaroEquipmentAttached(state,bearerOwner,bearer,source.definitionId);
  if (!state.equippedIdentities[bearerOwner].includes(identity)) state.equippedIdentities[bearerOwner].push(identity);
  events.push({ type: 'equipmentAttached', player: bearerOwner, equipmentId: source.instanceId, unitId });
  onEquipmentAttached(state, owner, bearerOwner, bearer);
  applyEvolution(state, bearerOwner, events);
  const definition = state.definitions[source.definitionId];
  if (definition?.kind === 'equipment' && definition.ability === 'colar') {
    const id = state.nextEffectId++;
    state.stack.push({ id, mode: 'colar', owner, source: structuredClone(source), targets: [] });
    if (state.stackReturnOwner === null) state.stackReturnOwner = opponent(owner);
    state.priorityOwner = opponent(owner);
    state.responseWindowOpened = true;
    state.consecutivePasses = 0;
    events.push({ type: 'effectQueued', effectId: id });
  }
  return true;
}

export function equipFromHand(state: BattleState, owner: PlayerId, equipmentId: string, unitId: string, replacement?: string, free = false): Result {
  const error = equipmentError(state, owner, equipmentId, unitId, replacement, free);
  if (error) return { ok: false, state, error };
  const next = structuredClone(state);
  const card = next.players[owner].hand.find(c => c.instanceId === equipmentId)!;
  const definition = next.definitions[card.definitionId];
  const price = equipmentPrice(next, owner, definition,unitId,equipmentId);
  const paid = free ? next.players[owner] : payCost(next.players[owner], { kind: 'equipment', cost: price });
  if (!paid) return { ok: false, state, error: 'Insufficient equipment mana' };
  next.players[owner] = paid;
  paid.hand.splice(paid.hand.findIndex(c => c.instanceId === equipmentId), 1);
  const events: BattleEvent[] = [];
  if (!free) {
    consumeAbeCosts(next,owner,definition);
    const joiaPrice=equipmentPrice(next,owner,definition);
    consumeEquipmentDiscount(next, owner, definition.cost, joiaPrice);
  }
  if (!attachEquipment(next, owner, card, owner, unitId, events, replacement)) return { ok: false, state, error: 'Invalid attachment' };
  if(!free)paidEquipmentUpgrade(next,owner,definition,unitId,events);
  return { ok: true, state: next, events };
}

