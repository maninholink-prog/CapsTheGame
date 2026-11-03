import {settle} from './state-events.js';
import { opponent } from './types.js';
import type { BattleEvent, BattleState, PlayerId, Result } from './types.js';

export function drawOne(state: BattleState, player: PlayerId): Result {
  if (state.phase !== 'actions') return { ok: false, state, error: 'Draw unavailable in this phase' };
  const next = structuredClone(state);
  const target = next.players[player];
  const events: BattleEvent[] = [];
  const card = target.deck.shift();
  if (card) {
    events.push({ type: 'cardDrawn', player, instanceId: card.instanceId });
    if (target.hand.length < 10) target.hand.push(card);
    else {
      target.discard.push(card);
      events.push({ type: 'cardDiscarded', player, instanceId: card.instanceId });
    }
  } else {
    target.fatigue++;
    target.nexus = Math.max(0, target.nexus - target.fatigue);
    events.push({ type: 'fatigueDamage', player, amount: target.fatigue });
    if(target.nexus===0)settle(next,events);
  }
  return { ok: true, state: next, events };
}

