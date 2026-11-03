import type { CardCatalog } from './schema.js';
import type { CardInstance } from '../battle/types.js';

export const kylastCatalog: CardCatalog = {
  kylast: { id: 'kylast', name: 'Kylast Heathcliff', kind: 'unit', cost: 5, attack: 3, health: 5, champion: 'kylast',
    regions: ['north', 'west'], rarity: 'ultradimensional' },
  'sword-kylast': { id: 'sword-kylast', regions: ['north'], name: 'Espada Kylast', kind: 'equipment', cost: 1, damage: 1,
    rarity: 'common', exclusiveChampion: 'kylast' },
  alastor: { id: 'alastor', regions: ['west'], name: 'Alastor', kind: 'equipment', cost: 3, damage: 2, ability: 'alastor',
    rarity: 'epic', exclusiveChampion: 'kylast' },
  banjo: { id: 'banjo', regions: ['north'], name: 'Banjo Pirata', kind: 'equipment', cost: 3, damage: 0, ability: 'banjo',
    rarity: 'epic', exclusiveChampion: 'kylast' },
  ybew: { id: 'ybew', name: 'Ybew', kind: 'unit', cost: 5, attack: 5, health: 6, ability: 'ybew', regions: ['west'], rarity: 'epic' },
  'wang-jianxi': { id: 'wang-jianxi', name: 'Wang Jianxi', kind: 'unit', cost: 2, attack: 1, health: 3, ability: 'wang', regions: ['west'], rarity: 'legendary' },
  'joia-rubra': { id: 'joia-rubra', name: 'Joia Rubra', kind: 'unit', cost: 2, attack: 2, health: 3, ability: 'joia', regions: ['korakarom'], rarity: 'rare' },
  damian: { id: 'damian', name: 'Damian', kind: 'unit', cost: 3, attack: 3, health: 4, ability: 'damian', regions: ['north'], rarity: 'common' },
  'robot-campeao': { id: 'robot-campeao', name: 'Campeão, o robô', kind: 'unit', cost: 4, attack: 3, health: 5, ability: 'robot', regions: ['west'], rarity: 'rare' },
  colar: { id: 'colar', regions: ['north'], name: 'Colar do Deus Enganador', kind: 'equipment', cost: 2, damage: 0, ability: 'colar',
    rarity: 'legendary', exclusiveChampion: 'kylast' },
};

// Compatibility alias for consumers of the earlier partial catalog.
export const kylastCombatCatalog = kylastCatalog;

export function createKylastDeck(prefix: string): CardInstance[] {
  if (!prefix.trim()) throw new Error('Deck instance prefix is required');
  return Object.keys(kylastCatalog).flatMap(definitionId => [0, 1].map(copy => ({
    instanceId: `${prefix}:${definitionId}:${copy}`, definitionId,
  })));
}
