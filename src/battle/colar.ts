import {entryRule,consumeNarrativeCosts} from './narrative.js';
import { effectiveDefinition } from './champions.js';
import { nextInt } from './random.js';
import { isLegalTarget } from './targets.js';
import { attachEquipment, effectiveEquipmentCapacity } from './equipment.js';
import { enterUnit } from './units.js';
import { insertChampionCopy } from './arsenal.js';
import { opponent } from './types.js';
import type { TargetRule } from '../content/schema.js';
import type { BattleEvent, BattleState, CardInstance, PendingEffect, PlayerId, Result, TargetRef } from './types.js';

function choose<T>(state: BattleState, items: T[]): T | undefined {
  if (!items.length) return undefined;
  const roll = nextInt(state.rngState, 0, items.length - 1);
  state.rngState = roll.state;
  return items[roll.value];
}

function selectRecipient(state: BattleState, trigger: PendingEffect, recipient: PlayerId, events: BattleEvent[]): void {
  const card = choose(state, state.players[recipient].hand);
  if (!card) return;
  state.players[recipient].hand.splice(state.players[recipient].hand.findIndex(c => c.instanceId === card.instanceId), 1);
  const definition = state.definitions[card.definitionId];
  const activation = definition?.kind === 'unit' && definition.champion === 'kylast' && state.players[recipient].board.some(u => {
    const def = state.definitions[u.card.definitionId];
    return def?.kind === 'unit' && def.champion === 'kylast';
  }) ? 'arsenal' as const : undefined;
  const id = state.nextEffectId++;
  state.stack.push({ id, mode: 'colar-card', owner: recipient, source: structuredClone(card), targets: [], activation });
  state.responseWindowOpened = true;
  state.priorityOwner = opponent(recipient);
  state.consecutivePasses = 0;
  events.push({ type: 'cardActivated', player: recipient, instanceId: card.instanceId, effectId: id });
}

export function resolveColarTrigger(state: BattleState, pending: PendingEffect): Result {
  const next = structuredClone(state);
  const events: BattleEvent[] = [{ type: 'effectResolved', effectId: pending.id }];
  next.stack.push({ id: next.nextEffectId++, mode: 'colar-next', owner: pending.owner,
    recipient: opponent(pending.owner), source: structuredClone(pending.source), targets: [] });
  selectRecipient(next, pending, pending.owner, events);
  return { ok: true, state: next, events };
}

export function resolveColarContinuation(state: BattleState, pending: PendingEffect): Result {
  const next = structuredClone(state);
  const events: BattleEvent[] = [];
  selectRecipient(next, pending, pending.recipient!, events);
  return { ok: true, state: next, events };
}

function randomTargets(state: BattleState, owner: PlayerId, rule: TargetRule): TargetRef[] | null {
  const possible: TargetRef[] = [];
  if (rule.kind === 'stack') {
    for (const effect of state.stack) possible.push({ kind: 'stack', effectId: effect.id });
  } else {
    for (const player of ['p1', 'p2'] as const) {
      if (rule.kind === 'nexus' || rule.kind === 'character') possible.push({ kind: 'nexus', player });
      if (rule.kind === 'unit' || rule.kind === 'character') for (const unit of state.players[player].board)
        possible.push({ kind: 'unit', player, instanceId: unit.card.instanceId });
    }
  }
  const pool = possible.filter(target => isLegalTarget(state, owner, { ...rule, side: 'any' }, target));
  if (pool.length < rule.min) return null;
  const max = Math.min(pool.length, rule.max);
  let count = rule.min;
  if (max > rule.min) {
    const roll = nextInt(state.rngState, rule.min, max);
    state.rngState = roll.state;
    count = roll.value;
  }
  const targets: TargetRef[] = [];
  for (let i = 0; i < count; i++) {
    const selected = choose(state, pool)!;
    targets.push(selected);
    pool.splice(pool.indexOf(selected), 1);
  }
  return targets;
}

function randomEquipment(state: BattleState, owner: PlayerId, card: CardInstance, events: BattleEvent[]): boolean {
  const targets = randomTargets(state, owner, { kind: 'unit', side: 'any', min: 1, max: 1 });
  const target = targets?.[0];
  if (!target || target.kind !== 'unit') return false;
  const bearer = state.players[target.player].board.find(u => u.card.instanceId === target.instanceId)!;
  const gear = bearer.equipment ?? [];
  const replacement = gear.length >= effectiveEquipmentCapacity(state, bearer) ? choose(state, gear)?.card.instanceId : undefined;
  return attachEquipment(state, owner, card, target.player, target.instanceId, events, replacement);
}

export function resolveColarCard(state: BattleState, pending: PendingEffect,
  resolveMagic: (state: BattleState, pending: PendingEffect) => Result): Result {
  const next = structuredClone(state);
  const definition = effectiveDefinition(next,pending.owner,pending.source);
  if (!definition) return { ok: false, state, error: 'Unknown activated card' };
  const events: BattleEvent[] = [];
  let success = false;
  let consumed = true;
  if (pending.activation === 'arsenal') {
    const weapons = next.players[pending.owner].hand.filter(c => next.definitions[c.definitionId]?.kind === 'equipment');
    const weapon = choose(next, weapons);
    if (weapon) {
      const hand = next.players[pending.owner].hand;
      const index = hand.findIndex(c => c.instanceId === weapon.instanceId);
      hand.splice(index, 1);
      if (randomEquipment(next, pending.owner, weapon, events)) {
        insertChampionCopy(next, pending.owner, pending.source.definitionId, pending.source.instanceId);
        success = true;
      } else hand.splice(index, 0, weapon);
    }
  } else if (definition.kind === 'unit') {
    success = enterUnit(next, pending.owner, structuredClone(pending.source), next.players[pending.owner].board.length, events, entryRule(definition) ? randomTargets(next,pending.owner,{...entryRule(definition)!,side:'any'})??undefined:undefined,true,true);
    consumed = !success;
  } else if (definition.kind === 'equipment') {
    success = randomEquipment(next, pending.owner, pending.source, events);
    consumed = !success;
  } else {
    const targets = randomTargets(next, pending.owner, definition.target);
    if (targets !== null) return resolveMagic(next, { ...pending, damageBonus:consumeNarrativeCosts(next,pending.owner,definition), mode: undefined, targets, ignoreSide: true, ...(definition.id!==pending.source.definitionId?{spellId:definition.id}:{}) });
  }
  if (consumed) next.players[pending.owner].discard.push(structuredClone(pending.source));
  events.push({ type: success ? 'effectResolved' : 'effectFizzled', effectId: pending.id });
  return { ok: true, state: next, events };
}
