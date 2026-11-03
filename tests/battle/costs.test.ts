import { describe, expect, it } from 'vitest';
import { payCost } from '../../src/battle/costs.js';
import { createBattle } from '../../src/battle/setup.js';
import type { CardDefinition } from '../../src/content/schema.js';

const cards = (p: string) => Array.from({ length: 10 }, (_, i) => ({ instanceId: `${p}${i}`, definitionId: 'unit' }));
const unit: CardDefinition = { id: 'unit', kind: 'unit', cost: 3, attack: 2, health: 3 };
const spell: CardDefinition = { id: 'spell', kind: 'spell', cost: 4, speed: 'fast',
  target: { kind: 'nexus', side: 'enemy', min: 1, max: 1 }, effect: { type: 'damage', amount: 2 } };

describe('custos e catálogo', () => {
  it('gasta reserva antes de mana somente para magia, truque e armadura', () => {
    const state = createBattle({ p1: cards('a'), p2: cards('b') }, 0);
    const player = state.players.p1;
    player.mana = 2; player.reserve = 3;
    const before = structuredClone(player);
    for (const kind of ['spell', 'trick', 'armor'] as const) {
      const paid = payCost(player, { ...spell, kind });
      expect(paid?.reserve).toBe(0);
      expect(paid?.mana).toBe(1);
    }
    expect(payCost(player, unit)).toBeNull();
    expect(payCost(player, { id: 'equip', kind: 'equipment', cost: 3 })).toBeNull();
    expect(player).toEqual(before);
  });

  it('custo zero não gasta e pagamento insuficiente não modifica entrada', () => {
    const player = createBattle({ p1: cards('a'), p2: cards('b') }, 0).players.p1;
    expect(payCost(player, { ...spell, cost: 0 })).toEqual(player);
    expect(payCost(player, spell)).toBeNull();
    expect(player.mana).toBe(1);
  });

  it('valida custos, atributos e identidades do catálogo', () => {
    for (const value of [-1, NaN, Infinity, 1.5]) {
      expect(() => createBattle({ p1: cards('a'), p2: cards('b') }, 0, { unit: { ...unit, cost: value } })).toThrow();
    }
    expect(() => createBattle({ p1: cards('a'), p2: cards('b') }, 0, { unit: { ...unit, health: 0 } })).toThrow();
    expect(() => createBattle({ p1: cards('a'), p2: cards('b') }, 0, { other: unit })).toThrow();
    expect(() => createBattle({ p1: cards('a'), p2: cards('b') }, 0, { unit })).not.toThrow();
  });
});
