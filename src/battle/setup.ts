import { shuffle } from './random.js';
import { validateCatalog } from '../content/schema.js';
import type { CardCatalog } from '../content/schema.js';
import type { BattleState, CardInstance, PlayerId, PlayerState } from './types.js';

export function createBattle(decks: Record<PlayerId, CardInstance[]>, seed: number, definitions: CardCatalog = {}): BattleState {
  validateCatalog(definitions);
  if (!Number.isInteger(seed) || seed < 0 || seed > 0xffffffff) throw new RangeError('Seed must be uint32');
  const ids = new Set<string>();
  for (const deck of Object.values(decks)) {
    if (deck.length < 5) throw new RangeError('Opening deck requires at least five cards');
    for (const card of deck) {
      if (!card.instanceId || !card.definitionId || ids.has(card.instanceId)) throw new Error('Invalid or duplicate card instance');
      ids.add(card.instanceId);
    }
  }
  let rngState = seed;
  const build = (deck: CardInstance[]): PlayerState => {
    const shuffled = shuffle(structuredClone(deck), rngState);
    rngState = shuffled.state;
    const champion=deck.map(c=>definitions[c.definitionId]).find(d=>d?.kind==='unit'&&d.champion);
    return { protagonist:champion?.kind==='unit'?champion.champion:undefined,hand: shuffled.items.slice(0, 5), deck: shuffled.items.slice(5), discard: [],
      nexus: 20, maxNexus: 20, mana: 1, maxMana: 1, reserve: 0, fatigue: 0, mulliganUsed: false, board: [], deathRecords: [] };
  };
  const p1 = build(decks.p1);
  const p2 = build(decks.p2);
  return { version: 1, rngAlgorithm: 'lcg32-v1', players: { p1, p2 }, rngState,
    round: 0, attackOwner: null, priorityOwner: null, phase: 'opening', consecutivePasses: 0, winner: null,
    definitions: structuredClone(definitions), stack: [], stackReturnOwner: null, nextEffectId: 1,
    combat: null, attackAvailable: false, equippedIdentities: { p1: [], p2: [] },
    evolvedKylast: { p1: false, p2: false }, kylastEquipmentSlots: 2, responseWindowOpened: false };
}
