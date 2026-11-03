import type { CardDefinition } from '../content/schema.js';
import {talentEquipmentDiscount,talentEntry} from './kylast-talents.js';
import type { BattleEvent, BattleState, BoardUnit, PlayerId } from './types.js';

export function equipmentPrice(state: BattleState, owner: PlayerId, definition: CardDefinition,unitId?:string,cardId?:string): number {
  const joias = state.players[owner].equipmentDiscountUsedRound === state.round?0:state.players[owner].board.filter(unit => {
    const def = state.definitions[unit.card.definitionId];
    return def?.kind === 'unit' && def.ability === 'joia';
  }).length;
  return Math.max(0, definition.cost - joias-talentEquipmentDiscount(state,owner,unitId,cardId));
}

export function consumeEquipmentDiscount(state: BattleState, owner: PlayerId, original: number, paid: number): void {
  if (paid < original) state.players[owner].equipmentDiscountUsedRound = state.round;
}

export function onEquipmentAttached(state: BattleState, owner: PlayerId, bearerOwner: PlayerId, bearer: BoardUnit): void {
  const def = state.definitions[bearer.card.definitionId];
  if (def?.kind === 'unit' && def.ability === 'damian') {
    bearer.attack++;
    bearer.roundAttackBonus = (bearer.roundAttackBonus ?? 0) + 1;
  }
  if (owner !== bearerOwner) return;
  for (const unit of state.players[owner].board) {
    const robot = state.definitions[unit.card.definitionId];
    if (robot?.kind === 'unit' && robot.ability === 'robot' && unit.firstEquipRound !== state.round) {
      unit.attack++; unit.firstEquipRound = state.round;
    }
  }
}

export function onUnitEntered(state: BattleState, owner: PlayerId, unit: BoardUnit, events: BattleEvent[]): void {
  talentEntry(state,owner,unit,events);
  const def = state.definitions[unit.card.definitionId];
  if (def?.kind !== 'unit' || def.ability !== 'wang') return;
  const player = state.players[owner];
  const index = player.deck.findIndex(card => state.definitions[card.definitionId]?.kind === 'equipment');
  if (index < 0) return;
  const [card] = player.deck.splice(index, 1);
  events.push({ type: 'cardDrawn', player: owner, instanceId: card.instanceId });
  if (player.hand.length < 10) player.hand.push(card);
  else {
    player.discard.push(card);
    events.push({ type: 'cardDiscarded', player: owner, instanceId: card.instanceId });
  }
}
