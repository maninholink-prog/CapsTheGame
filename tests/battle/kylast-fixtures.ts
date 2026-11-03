import { kylastCombatCatalog } from '../../src/content/kylast.js';
import { applyCommand } from '../../src/battle/commands.js';
import type { BattleState } from '../../src/battle/types.js';
import { accepted, fixture, give, pass, play, putUnit } from './fixtures.js';

export function kylastFixture(): BattleState {
  const state = fixture();
  Object.assign(state.definitions, structuredClone(kylastCombatCatalog));
  state.definitions.fourth = { id: 'fourth', kind: 'equipment', cost: 0, damage: 0 };
  state.attackOwner = 'p1';
  state.attackAvailable = true;
  return state;
}
export function turn(state: BattleState): BattleState { return state.priorityOwner === 'p1' ? state : pass(state); }
export function enterKylast(state: BattleState): BattleState {
  const id = give(state, 'p1', 'kylast');
  return turn(play(state, 'p1', id));
}
export function equip(state: BattleState, definitionId: string, suffix = '', targetId = 'p1_kylast', replacement?: string): BattleState {
  const id = give(state, 'p1', definitionId, suffix);
  return accepted(applyCommand(turn(state), { type: 'play', player: 'p1', instanceId: id,
    targets: [{ kind: 'unit', player: 'p1', instanceId: targetId }], replaceEquipmentId: replacement }));
}
export function evolve(state: BattleState): BattleState {
  // Four identities globally, on a different unit; no Kylast presence required.
  putUnit(state, 'p1', 'bearer');
  for (const [i, def] of ['sword-kylast', 'alastor', 'banjo', 'fourth'].entries()) {
    state.players.p1.mana = 10;
    state = equip(turn(state), def, `e${i}`, 'bearer', i > 0 ? state.players.p1.board.find(u => u.card.instanceId === 'bearer')!.equipment![0].card.instanceId : undefined);
  }
  return turn(state);
}
