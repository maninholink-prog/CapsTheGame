import { describe, expect, it } from 'vitest';
import { nextInt, shuffle } from '../../src/battle/random.js';

describe('sorteio reproduzível', () => {
  it('preserva cópias físicas e não altera a entrada', () => {
    const cards = Object.freeze([
      { instanceId: 'a', definitionId: 'sword' },
      { instanceId: 'b', definitionId: 'sword' },
      { instanceId: 'c', definitionId: 'other' },
    ]);
    const result = shuffle(cards, 0);
    expect(result.items.map(c => c.instanceId).sort()).toEqual(['a', 'b', 'c']);
    expect(cards.map(c => c.instanceId)).toEqual(['a', 'b', 'c']);
    expect(shuffle(cards, 0)).toEqual(result);
  });

  it('aceita zero e produz inteiros dentro do intervalo inclusivo', () => {
    let state = 0;
    const values = new Set<number>();
    for (let i = 0; i < 1000; i++) {
      const result = nextInt(state, 1, 20);
      expect(Number.isInteger(result.value)).toBe(true);
      expect(result.value).toBeGreaterThanOrEqual(1);
      expect(result.value).toBeLessThanOrEqual(20);
      values.add(result.value);
      state = result.state;
    }
    expect(values.has(1)).toBe(true);
    expect(values.has(20)).toBe(true);
  });

  it('não consome RNG ao embaralhar uma lista vazia', () => {
    expect(shuffle([], 12)).toEqual({ items: [], state: 12 });
  });

  it('permite empates naturais em dois d20 consecutivos', () => {
    let state = 0;
    let ties = 0;
    for (let i = 0; i < 1000; i++) {
      const a = nextInt(state, 1, 20);
      const b = nextInt(a.state, 1, 20);
      if (a.value === b.value) ties++;
      state = b.state;
    }
    expect(ties).toBeGreaterThan(0);
  });
});
