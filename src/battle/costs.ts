import type { CardDefinition } from '../content/schema.js';
import type { PlayerState } from './types.js';

export function payCost(player: PlayerState, definition: CardDefinition | Pick<CardDefinition, 'kind' | 'cost'>): PlayerState | null {
  if (!Number.isSafeInteger(definition.cost) || definition.cost < 0) return null;
  const mayUseReserve = ['spell', 'trick', 'armor'].includes(definition.kind);
  const reserve = mayUseReserve ? Math.min(player.reserve, definition.cost) : 0;
  const mana = definition.cost - reserve;
  if (player.mana < mana) return null;
  const paid = structuredClone(player);
  paid.reserve -= reserve;
  paid.mana -= mana;
  return paid;
}
