import {paidEquipmentUpgrade} from './laboratory.js';
import { payCost } from './costs.js';
import {talentGripAvailable} from './kylast-talents.js';
import { equipmentError, equipFromHand } from './equipment.js';
import { shuffle } from './random.js';
import { opponent } from './types.js';
import { consumeEquipmentDiscount, equipmentPrice } from './supports.js';
import type { PlayCommand } from './play.js';
import type { BattleEvent, BattleState, PendingEffect, PlayerId, Result } from './types.js';

export function insertChampionCopy(state: BattleState, owner: PlayerId, definitionId: string, sourceId: string): void {
  definitionId=state.runAliases?.[owner]?.[definitionId]??definitionId;
  const ids = new Set<string>([sourceId]);
  for (const player of Object.values(state.players)) {
    for (const card of [...player.hand, ...player.deck, ...player.discard, ...player.board.map(u => u.card),
      ...player.board.flatMap(u => (u.equipment ?? []).map(e => e.card))]) ids.add(card.instanceId);
  }
  for (const item of state.stack) ids.add(item.source.instanceId);
  let instanceId: string;
  do { instanceId = `battle-generated-${owner}-${state.nextEffectId++}`; } while (ids.has(instanceId));
  const shuffled = shuffle([...state.players[owner].deck, { instanceId, definitionId, generated: true }], state.rngState);
  state.players[owner].deck = shuffled.items;
  state.rngState = shuffled.state;
}

export function playArsenal(state: BattleState, command: PlayCommand): Result {
  const invalid = (error: string): Result => ({ ok: false, state, error });
  const targets = command.targets ?? [];
  if (targets.length !== 1 || targets[0].kind !== 'unit' || targets[0].player !== command.player || !command.equipmentId ||
    command.position !== undefined || command.replaceUnitId !== undefined) return invalid('Arsenal requires equipment and an allied bearer');
  const error = equipmentError(state, command.player, command.equipmentId, targets[0].instanceId, command.replaceEquipmentId);
  if (error) return invalid(error);
  const magicPaid = payCost(state.players[command.player], { kind: 'spell', cost: 1 });
  const weapon = state.players[command.player].hand.find(c => c.instanceId === command.equipmentId)!;
  const weaponDef = state.definitions[weapon.definitionId];
  const price = equipmentPrice(state, command.player, weaponDef,targets[0].instanceId,command.equipmentId);
  const paid = magicPaid && payCost(magicPaid, { kind: 'equipment', cost: price });
  if (!paid) return invalid('Insufficient mana for spell and equipment');
  const next = structuredClone(state);
  next.players[command.player] = paid;
  consumeEquipmentDiscount(next, command.player, weaponDef.cost, equipmentPrice(state,command.player,weaponDef));
  const [source] = paid.hand.splice(paid.hand.findIndex(c => c.instanceId === command.instanceId), 1);
  const pending: PendingEffect = { id: next.nextEffectId++, mode: 'arsenal', owner: command.player, source,
    paidTalentGrip:talentGripAvailable(state,command.player,targets[0].instanceId),
    equipmentId: command.equipmentId, replaceEquipmentId: command.replaceEquipmentId, targets: structuredClone(targets) };
  if (next.stackReturnOwner === null) next.stackReturnOwner = opponent(command.player);
  next.stack.push(pending);
  next.consecutivePasses = 0;
  next.priorityOwner = opponent(command.player);
  return { ok: true, state: next, events: [
    { type: 'cardPlayed', player: command.player, instanceId: source.instanceId }, { type: 'effectQueued', effectId: pending.id },
  ] };
}

export function resolveArsenal(state: BattleState, pending: PendingEffect): Result {
  let next = structuredClone(state);
  const target = pending.targets[0];
  const weapon=state.players[pending.owner].hand.find(c=>c.instanceId===pending.equipmentId);
  const equipped = target?.kind === 'unit' && pending.equipmentId
    ? equipFromHand(next, pending.owner, pending.equipmentId, target.instanceId, pending.replaceEquipmentId, true) : null;
  const events: BattleEvent[] = [];
  if (equipped?.ok) {
    next = equipped.state;
    events.push(...equipped.events);
    if(weapon&&target.kind==='unit')paidEquipmentUpgrade(next,pending.owner,next.definitions[weapon.definitionId],target.instanceId,events);
    insertChampionCopy(next, pending.owner, pending.source.definitionId, pending.source.instanceId);
  }
  next.players[pending.owner].discard.push(structuredClone(pending.source));
  events.push({ type: equipped?.ok ? 'effectResolved' : 'effectFizzled', effectId: pending.id });
  return { ok: true, state: next, events };
}

