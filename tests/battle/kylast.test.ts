import { describe, expect, it } from 'vitest';
import { applyCommand } from '../../src/battle/commands.js';
import { accepted, give, pass, play, putUnit } from './fixtures.js';
import { enterKylast, equip, evolve, kylastFixture, turn } from './kylast-fixtures.js';
import type { BattleState } from '../../src/battle/types.js';

function attack(state: BattleState, weapons: (string | null)[]): BattleState {
  state = accepted(applyCommand(turn(state), { type: 'attack', player: 'p1', attackers: [{ unitId: 'p1_kylast', weapons }] }));
  return accepted(applyCommand(state, { type: 'block', player: 'p2', assignments: state.players.p2.board.length ? [{ attackerId: 'p1_kylast', blockerId: 'block' }] : [] }));
}

describe('Kylast', () => {
  it('evolui por quatro identidades globais, preserva dano e não conta cópias iguais novamente', () => {
    let state = enterKylast(kylastFixture());
    state.players.p1.board[0].health = 3;
    state = equip(state, 'sword-kylast', '1');
    state = equip(turn(state), 'sword-kylast', '2');
    expect(state.players.p1.board[0].evolved).not.toBe(true);
    state = evolve(turn(state));
    expect(state.players.p1.board[0]).toMatchObject({ attack: 4, health: 4, maxHealth: 6, evolved: true });
    expect(state.players.p1.board[0].equipment).toHaveLength(2);
    expect(state.equippedIdentities.p1).toHaveLength(4);
  });

  it('entra evoluído se a condição foi cumprida antes de entrar em campo', () => {
    let state = evolve(kylastFixture());
    state.players.p1.mana = 10;
    state = enterKylast(state);
    expect(state.players.p1.board.find(u => u.card.definitionId === 'kylast')).toMatchObject({ attack: 4, health: 6, evolved: true });
  });

  it('escolhe arma por golpe: primeiro mata bloqueador, segundo acerta Nexus sem retaliação', () => {
    let state = evolve(enterKylast(kylastFixture()));
    state.players.p1.mana = 10;
    state = equip(state, 'sword-kylast');
    state = equip(turn(state), 'alastor');
    putUnit(state, 'p2', 'block', 5);
    state.players.p2.board[0].attack = 20;
    state = attack(state, ['p1_sword-kylast', 'p1_alastor']);
    state = pass(pass(state));
    expect(state.players.p1.board.find(u => u.card.definitionId === 'kylast')!.health).toBe(6);
    expect(state.players.p2.board).toHaveLength(0);
    expect(state.players.p2.nexus).toBe(14);
  });

  it('bloqueador sobrevivente responde simultaneamente ao segundo golpe', () => {
    let state = evolve(enterKylast(kylastFixture()));
    putUnit(state, 'p2', 'block', 12);
    state.players.p2.board[0].maxHealth = 12;
    state.players.p2.board[0].attack = 6;
    state = pass(pass(attack(state, [null, null])));
    expect(state.players.p1.board.some(u => u.card.definitionId === 'kylast')).toBe(false);
    expect(state.players.p2.board[0].health).toBe(4);
    expect(state.players.p2.nexus).toBe(20);
  });

  it('segundo Kylast vira Troca de Arsenal: paga magia + arma e embaralha cópia só ao resolver', () => {
    let state = enterKylast(kylastFixture());
    state.players.p1.mana = 10;
    const champion = give(state, 'p1', 'kylast', '2');
    const sword = give(state, 'p1', 'sword-kylast');
    const deckSize = state.players.p1.deck.length;
    state = accepted(applyCommand(state, { type: 'play', player: 'p1', instanceId: champion, equipmentId: sword,
      targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] }));
    expect(state.players.p1.reserve).toBe(2);
    expect(state.players.p1.mana).toBe(9);
    expect(state.players.p1.board).toHaveLength(1);
    state = pass(pass(state));
    expect(state.players.p1.board[0].equipment![0].card.instanceId).toBe(sword);
    expect(state.players.p1.deck).toHaveLength(deckSize + 1);
    expect(state.players.p1.deck.some(c => c.definitionId === 'kylast' && c.generated)).toBe(true);
  });

  it('Troca anulada não equipa nem embaralha campeão', () => {
    let state = enterKylast(kylastFixture());
    const champion = give(state, 'p1', 'kylast', '2');
    const sword = give(state, 'p1', 'sword-kylast');
    const counter = give(state, 'p2', 'counter');
    const count = state.players.p1.deck.length;
    state = accepted(applyCommand(state, { type: 'play', player: 'p1', instanceId: champion, equipmentId: sword,
      targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] }));
    state = play(state, 'p2', counter, [{ kind: 'stack', effectId: state.stack[0].id }]);
    state = pass(pass(state));
    expect(state.players.p1.board[0].equipment ?? []).toHaveLength(0);
    expect(state.players.p1.hand.map(c => c.instanceId)).toContain(sword);
    expect(state.players.p1.deck).toHaveLength(count);
  });

  it('Troca não usa reserva para pagar a arma e não gasta parcialmente ao falhar', () => {
    const state = enterKylast(kylastFixture());
    state.players.p1.mana = 2; state.players.p1.reserve = 3;
    const champion = give(state, 'p1', 'kylast', '2');
    const weapon = give(state, 'p1', 'alastor');
    const before = structuredClone(state);
    const result = applyCommand(state, { type: 'play', player: 'p1', instanceId: champion, equipmentId: weapon,
      targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] });
    expect(result.ok).toBe(false);
    expect(state).toEqual(before);
  });

  it('portador removido deixa arma na mão sem reembolsar custos da Troca', () => {
    let state = enterKylast(kylastFixture());
    state.players.p1.board[0].health = 3;
    const champion = give(state, 'p1', 'kylast', '2');
    const sword = give(state, 'p1', 'sword-kylast');
    const fire = give(state, 'p2', 'fire');
    state = accepted(applyCommand(state, { type: 'play', player: 'p1', instanceId: champion, equipmentId: sword,
      targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] }));
    const mana = state.players.p1.mana;
    const reserve = state.players.p1.reserve;
    state = play(state, 'p2', fire, [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }]);
    state = pass(pass(state));
    expect(state.players.p1.hand.map(c => c.instanceId)).toContain(sword);
    expect(state.players.p1.mana).toBe(mana);
    expect(state.players.p1.reserve).toBe(reserve);
    expect(state.players.p1.board).toHaveLength(0);
  });
});
