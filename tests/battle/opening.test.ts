import { afterEach, describe, expect, it, vi } from 'vitest';
import { createBattle } from '../../src/battle/setup.js';
import { applyCommand } from '../../src/battle/commands.js';
import * as random from '../../src/battle/random.js';
import type { BattleState, CardInstance, Result } from '../../src/battle/types.js';

export const deck = (prefix: string, count = 20): CardInstance[] =>
  Array.from({ length: count }, (_, i) => ({ instanceId: `${prefix}-${i}`, definitionId: `card-${Math.floor(i / 2)}` }));
export const accepted = (result: Result): BattleState => {
  if (!result.ok) throw new Error(result.error);
  return result.state;
};
export function ready(): BattleState {
  let state = createBattle({ p1: deck('a'), p2: deck('b') }, 17);
  for (const player of ['p1', 'p2'] as const)
    state = accepted(applyCommand(state, { type: 'mulligan', player, instanceIds: [] }));
  return state;
}
afterEach(() => vi.restoreAllMocks());

describe('abertura', () => {
  it('distribui cinco, Nexus 20, mana 1 e não modifica decks recebidos', () => {
    const decks = { p1: deck('a'), p2: deck('b') };
    const snapshot = structuredClone(decks);
    const state = createBattle(decks, 0);
    expect(decks).toEqual(snapshot);
    for (const player of Object.values(state.players)) {
      expect(player.hand).toHaveLength(5);
      expect(player.deck).toHaveLength(15);
      expect(player.nexus).toBe(20);
      expect(player.mana).toBe(1);
    }
    state.players.p1.hand[0].definitionId = 'changed';
    expect(decks).toEqual(snapshot);
  });

  it('exige confirmações, repete ambos os dados no empate e compra só para o vencedor', () => {
    const initial = createBattle({ p1: deck('a'), p2: deck('b') }, 0);
    expect(applyCommand(initial, { type: 'start' }).ok).toBe(false);
    const state = ready();
    vi.spyOn(random, 'nextInt')
      .mockReturnValueOnce({ value: 4, state: 101 })
      .mockReturnValueOnce({ value: 4, state: 102 })
      .mockReturnValueOnce({ value: 7, state: 103 })
      .mockReturnValueOnce({ value: 15, state: 104 });
    const result = applyCommand(state, { type: 'start' });
    const next = accepted(result);
    expect(next.attackOwner).toBe('p2');
    expect(next.priorityOwner).toBe('p2');
    expect(next.players.p2.hand).toHaveLength(6);
    expect(next.players.p1.hand).toHaveLength(5);
    expect(next.players.p1.mana).toBe(1);
    expect(next.players.p2.maxMana).toBe(1);
    expect(next.round).toBe(1);
    expect(next.rngState).toBe(104);
    if (result.ok) expect(result.events.filter(e => e.type === 'initiativeRolled')).toHaveLength(2);
    expect(applyCommand(next, { type: 'start' }).ok).toBe(false);
  });

  it('substitui cópias físicas antes de devolver e permite outra cópia da identidade', () => {
    const state = createBattle({ p1: deck('a'), p2: deck('b') }, 0);
    // Hand-crafted legal zones isolate the physical-copy rule from shuffle luck.
    state.players.p1.hand = deck('a', 5);
    state.players.p1.deck = [
      { instanceId: 'other-copy', definitionId: 'card-0' },
      ...deck('rest', 14),
    ];
    const id = state.players.p1.hand[0].instanceId;
    const next = accepted(applyCommand(state, { type: 'mulligan', player: 'p1', instanceIds: [id] }));
    expect(next.players.p1.hand.some(c => c.instanceId === id)).toBe(false);
    expect(next.players.p1.hand.some(c => c.instanceId === 'other-copy')).toBe(true);
    expect(next.players.p1.deck.some(c => c.instanceId === id)).toBe(true);
    expect(next.players.p1.hand).toHaveLength(5);
  });

  it('rejeita IDs repetidos, ausentes e segundo mulligan sem mudar estado ou RNG', () => {
    const state = ready();
    const before = structuredClone(state);
    for (const instanceIds of [[], ['missing'], [state.players.p1.hand[0].instanceId, state.players.p1.hand[0].instanceId]]) {
      const result = applyCommand(state, { type: 'mulligan', player: 'p1', instanceIds });
      expect(result.ok).toBe(false);
      expect(result.state).toBe(state);
      expect(state).toEqual(before);
    }
    const opening = createBattle({ p1: deck('a'), p2: deck('b') }, 3);
    const id = opening.players.p1.hand[0].instanceId;
    expect(applyCommand(opening, { type: 'mulligan', player: 'p1', instanceIds: [id, id] }).ok).toBe(false);
    expect(applyCommand(opening, { type: 'mulligan', player: 'p1', instanceIds: ['missing'] }).ok).toBe(false);
  });

  it('rejeita substituições sem cartas suficientes, sem perder cartas da mão', () => {
    const state = createBattle({ p1: deck('a', 6), p2: deck('b', 6) }, 0);
    const before = structuredClone(state);
    const result = applyCommand(state, { type: 'mulligan', player: 'p1', instanceIds: state.players.p1.hand.slice(0, 2).map(c => c.instanceId) });
    expect(result.ok).toBe(false);
    expect(result.state).toBe(state);
    expect(state).toEqual(before);
  });
});
