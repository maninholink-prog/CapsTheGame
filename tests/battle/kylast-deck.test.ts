import { describe, expect, it } from 'vitest';
import { createKylastDeck, kylastCatalog } from '../../src/content/kylast.js';
import { createBattle } from '../../src/battle/setup.js';

describe('deck inicial completo', () => {
  it('tem dez identidades, vinte cartas e duas cópias físicas de cada', () => {
    const deck = createKylastDeck('player');
    expect(deck).toHaveLength(20);
    expect(Object.keys(kylastCatalog)).toHaveLength(10);
    expect(new Set(deck.map(c => c.instanceId)).size).toBe(20);
    for (const id of Object.keys(kylastCatalog)) expect(deck.filter(c => c.definitionId === id)).toHaveLength(2);
    expect(createBattle({ p1: deck, p2: createKylastDeck('enemy') }, 0, kylastCatalog).players.p1.hand).toHaveLength(5);
  });

  it('inclui nomes, raridades, regiões e custos aprovados, sem confundir o robô com campeão', () => {
    expect(kylastCatalog.kylast).toMatchObject({ cost: 5, rarity: 'ultradimensional', regions: ['north', 'west'] });
    expect(kylastCatalog.colar).toMatchObject({ cost: 2, rarity: 'legendary', exclusiveChampion: 'kylast' });
    expect(kylastCatalog['joia-rubra'].regions).toEqual(['korakarom']);
    expect(kylastCatalog['robot-campeao']).not.toHaveProperty('champion');
  });
});
