import {consumeRubelCosts} from './rubel-talents.js';
import {consumeArcataCosts} from './arcata-talents.js';
import {consumeAbeCosts} from './abe-talents.js';
import {consumeMusicDiscount,expandedResolved} from './expansion.js';
import {kuaraStolenCardPlayed} from './kuara-talents.js';
import {entryRule,entryTargets,consumeNarrativeCosts} from './narrative.js';
import { effectiveDefinition, cardCost } from './champions.js';
import { payCost } from './costs.js';
import { resolveEffect } from './effects.js';
import { isLegalTarget, targetKey } from './targets.js';
import { opponent } from './types.js';
import { equipFromHand } from './equipment.js';
import { playArsenal } from './arsenal.js';
import { removeUnit } from './state-events.js';
import { enterUnit } from './units.js';
import type { BattleEvent, BattleState, PendingEffect, PlayerId, Result, TargetRef } from './types.js';

export interface PlayCommand {
  type: 'play'; player: PlayerId; instanceId: string; targets?: TargetRef[];
  position?: number; replaceUnitId?: string;
  equipmentId?: string; replaceEquipmentId?: string;
}

export function playCard(state: BattleState, command: PlayCommand): Result {
  const invalid = (error: string): Result => ({ ok: false, state, error });
  if (state.phase !== 'actions' || state.priorityOwner !== command.player) return invalid('Not your action');
  if (state.combat && state.combat.stage !== 'responses') return invalid('Combat selection required');
  const player = state.players[command.player];
  const card = player.hand.find(c => c.instanceId === command.instanceId);
  if (!card) return invalid('Card is not in your hand');
  const definition = effectiveDefinition(state, command.player, card);
  if (!definition) return invalid('Unsupported card definition');
  const targets = command.targets ?? [];
  if(definition.kind==='unit'&&definition.unique&&player.board.some(u=>(state.definitions[u.card.definitionId].baseId??u.card.definitionId)===(definition.baseId??definition.id)))return invalid('Unique unit already in play');
  if (definition.kind === 'unit' && definition.champion === 'kylast' && player.board.some(u => {
    const def = state.definitions[u.card.definitionId];
    return def?.kind === 'unit' && def.champion === 'kylast';
  })) return playArsenal(state, command);
  if (definition.kind === 'equipment') {
    if (state.combat || state.stackReturnOwner !== null || state.stack.length || targets.length !== 1 ||
      targets[0].kind !== 'unit' || targets[0].player !== command.player || command.equipmentId !== undefined ||
      command.position !== undefined || command.replaceUnitId !== undefined) return invalid('Equipment requires an allied bearer outside combat');
    const equipped = equipFromHand(state, command.player, card.instanceId, targets[0].instanceId, command.replaceEquipmentId);
    if (!equipped.ok) return equipped;
    kuaraStolenCardPlayed(equipped.state,command.player,card,equipped.events);
    expandedResolved(equipped.state,command.player,definition,card,equipped.events);
    equipped.state.priorityOwner = opponent(command.player);
    equipped.state.consecutivePasses = 0;
    return { ...equipped, events: [{ type: 'cardPlayed', player: command.player, instanceId: card.instanceId }, ...equipped.events] };
  }
  if (command.equipmentId !== undefined || command.replaceEquipmentId !== undefined) return invalid('Equipment selection is not applicable');
  let position = 0;
  if (definition.kind === 'unit') {
    if (state.combat || state.stackReturnOwner !== null || state.stack.length) return invalid('Unit cannot be played as a response or with targets');
    const entry=entryRule(definition);
    if(entry ? targets.length<entry.min||targets.length>entry.max||targets.some(t=>!entryTargets(state,command.player,card).some(x=>targetKey(x)===targetKey(t))) : targets.length>0)return invalid('Invalid unit entry targets');
    if (player.board.length >= 5) {
      if (!command.replaceUnitId || !player.board.some(u => u.card.instanceId === command.replaceUnitId))
        return invalid('Full board requires an explicit replacement');
    } else if (command.replaceUnitId !== undefined) return invalid('Replacement only allowed on full board');
    const length = player.board.length - (command.replaceUnitId ? 1 : 0);
    position = command.position ?? length;
    if (!Number.isInteger(position) || position < 0 || position > length) return invalid('Invalid board position');
  } else {
    if (command.replaceUnitId !== undefined || command.position !== undefined) return invalid('Spell has no board position');
    if (definition.speed === 'slow' && (state.combat || state.stackReturnOwner !== null || state.stack.length)) return invalid('Slow spell cannot respond');
    if (targets.length < definition.target.min || targets.length > definition.target.max ||
      new Set(targets.map(targetKey)).size !== targets.length ||
      targets.some(target => !isLegalTarget(state, command.player, definition.target, target))) return invalid('Invalid spell targets');
  }
  if(definition.requiresEnemyDeck&&!(state.publicDeckCounts?.[opponent(command.player)]??state.players[opponent(command.player)].deck.length))return invalid('Enemy deck is empty');
  if(definition.kind!=='unit'&&definition.effect.type==='summon'&&player.board.length>=5)return invalid('Board is full');
  const paid = payCost(player, {...definition,cost:cardCost(state,command.player,definition,card)});
  if (!paid) return invalid('Insufficient mana');
  const next = structuredClone(state);
  next.players[command.player] = paid;
  consumeAbeCosts(next,command.player,definition);
  consumeArcataCosts(next,command.player,definition);
  consumeRubelCosts(next,command.player,definition);
  consumeMusicDiscount(next,command.player,definition);
  const damageBonus=consumeNarrativeCosts(next,command.player,definition);
  const sourceIndex = paid.hand.findIndex(c => c.instanceId === card.instanceId);
  const [source] = paid.hand.splice(sourceIndex, 1);
  next.consecutivePasses = 0;
  const events: BattleEvent[] = [{ type: 'cardPlayed', player: command.player, instanceId: source.instanceId }];
  kuaraStolenCardPlayed(next,command.player,source,events);
  if (definition.kind === 'unit') {
    if (command.replaceUnitId) {
      (next.deathCauses??={})[command.replaceUnitId]=command.player;
      removeUnit(next, command.player, command.replaceUnitId, events);
    }
    enterUnit(next, command.player, source, position, events, targets,false,true);
    expandedResolved(next,command.player,definition,source,events);
    if(next.phase!=='ended'&&next.stackReturnOwner===null)next.priorityOwner = opponent(command.player);
    return { ok: true, state: next, events };
  }
  const pending: PendingEffect = { id: next.nextEffectId++, owner: command.player, source, damageBonus, targets: structuredClone(targets), ...(definition.id !== card.definitionId ? {spellId:definition.id}: {}) };
  if (definition.speed === 'burst') {
    const resolved = resolveEffect(next, pending);
    if (!resolved.ok) return invalid(resolved.error);
    return { ok: true, state: resolved.state, events: [...events, ...resolved.events] };
  }
  if (next.stackReturnOwner === null) next.stackReturnOwner = opponent(command.player);
  next.stack.push(pending);
  next.priorityOwner = opponent(command.player);
  events.push({ type: 'effectQueued', effectId: pending.id });
  return { ok: true, state: next, events };
}




