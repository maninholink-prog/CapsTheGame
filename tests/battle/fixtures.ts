import type { CardCatalog } from '../../src/content/schema.js';
import { createBattle } from '../../src/battle/setup.js';
import { applyCommand } from '../../src/battle/commands.js';
import type { BattleState, PlayerId, Result, TargetRef } from '../../src/battle/types.js';

export const catalog: CardCatalog = {
  unit: { id: 'unit', kind: 'unit', cost: 2, attack: 2, health: 4 },
  fire: { id: 'fire', kind: 'spell', speed: 'fast', cost: 2,
    target: { kind: 'character', side: 'enemy', min: 1, max: 1 }, effect: { type: 'damage', amount: 3 } },
  slow: { id: 'slow', kind: 'spell', speed: 'slow', cost: 2,
    target: { kind: 'nexus', side: 'enemy', min: 1, max: 1 }, effect: { type: 'damage', amount: 3 } },
  spark: { id: 'spark', kind: 'trick', speed: 'burst', cost: 1,
    target: { kind: 'nexus', side: 'enemy', min: 1, max: 1 }, effect: { type: 'damage', amount: 1 } },
  heal: { id: 'heal', kind: 'spell', speed: 'fast', cost: 1,
    target: { kind: 'character', side: 'ally', min: 1, max: 1 }, effect: { type: 'heal', amount: 4 } },
  armor: { id: 'armor', kind: 'armor', speed: 'fast', cost: 1,
    target: { kind: 'unit', side: 'ally', min: 1, max: 1 }, effect: { type: 'armor', amount: 2 } },
  counter: { id: 'counter', kind: 'spell', speed: 'fast', cost: 1,
    target: { kind: 'stack', side: 'enemy', min: 1, max: 1 }, effect: { type: 'counter' } },
  multi: { id: 'multi', kind: 'spell', speed: 'fast', cost: 1,
    target: { kind: 'unit', side: 'enemy', min: 1, max: 2 }, effect: { type: 'damage', amount: 3 } },
  blast: { id: 'blast', kind: 'spell', speed: 'slow', cost: 1,
    target: { kind: 'nexus', side: 'any', min: 2, max: 2 }, effect: { type: 'damage', amount: 20 } },
  optional: { id: 'optional', kind: 'spell', speed: 'fast', cost: 0,
    target: { kind: 'unit', side: 'enemy', min: 0, max: 2 }, effect: { type: 'damage', amount: 1 } },
  equipment: { id: 'equipment', kind: 'equipment', cost: 0 },
};
export function accepted(result: Result): BattleState {
  if (!result.ok) throw new Error(result.error);
  return result.state;
}
export function fixture(): BattleState {
  const cards = (p: string) => Array.from({ length: 20 }, (_, i) => ({ instanceId: `${p}${i}`, definitionId: 'unit' }));
  let state = createBattle({ p1: cards('a'), p2: cards('b') }, 3, catalog);
  for (const player of ['p1', 'p2'] as const)
    state = accepted(applyCommand(state, { type: 'mulligan', player, instanceIds: [] }));
  state = accepted(applyCommand(state, { type: 'start' }));
  state.priorityOwner = 'p1';
  for (const player of Object.values(state.players)) {
    player.hand = []; player.mana = 10; player.maxMana = 10; player.reserve = 3;
  }
  return state;
}
export function give(state: BattleState, player: PlayerId, definitionId: string, suffix = ''): string {
  const instanceId = `${player}_${definitionId}${suffix}`;
  state.players[player].hand.push({ instanceId, definitionId });
  return instanceId;
}
export function putUnit(state: BattleState, player: PlayerId, id = `${player}-unit`, health = 4): TargetRef {
  state.players[player].board.push({ card: { instanceId: id, definitionId: 'unit' }, attack: 2, health, maxHealth: 4 });
  return { kind: 'unit', player, instanceId: id };
}
export function pass(state: BattleState): BattleState {
  return accepted(applyCommand(state, { type: 'pass', player: state.priorityOwner! }));
}
export function play(state: BattleState, player: PlayerId, instanceId: string, targets: TargetRef[] = []): BattleState {
  return accepted(applyCommand(state, { type: 'play', player, instanceId, targets }));
}
