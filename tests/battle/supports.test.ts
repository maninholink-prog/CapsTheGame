import { describe, expect, it } from 'vitest';
import { accepted, give, pass, play, putUnit } from './fixtures.js';
import { enterKylast, equip, kylastFixture, turn } from './kylast-fixtures.js';
import { applyCommand } from '../../src/battle/commands.js';

describe('suportes de Kylast', () => {
  it('Wang busca equipamento ao entrar e não causa fadiga quando não encontra', () => {
    let state = kylastFixture();
    state.players.p1.deck = [{ instanceId: 'weapon-in-deck', definitionId: 'alastor' }];
    const wang = give(state, 'p1', 'wang-jianxi');
    state = play(state, 'p1', wang);
    expect(state.players.p1.hand.map(c => c.instanceId)).toContain('weapon-in-deck');
    expect(state.players.p1.deck).toHaveLength(0);
    const wang2 = give(state, 'p1', 'wang-jianxi', '2');
    state = play(turn(state), 'p1', wang2);
    expect(state.players.p1.fatigue).toBe(0);
  });

  it('duas Joias somam desconto, custo zero não consome, e Troca não usa desconto duas vezes', () => {
    let state = enterKylast(kylastFixture());
    for (const id of ['j1', 'j2']) {
      putUnit(state, 'p1', id); state.players.p1.board.at(-1)!.card.definitionId = 'joia-rubra';
    }
    state.players.p1.mana = 10;
    state = equip(state, 'fourth');
    expect(state.players.p1.mana).toBe(10);
    state = equip(turn(state), 'alastor');
    expect(state.players.p1.mana).toBe(9);
    state = turn(state);
    const champ = give(state, 'p1', 'kylast', '2');
    const sword = give(state, 'p1', 'sword-kylast');
    state = accepted(applyCommand(state, { type: 'play', player: 'p1', instanceId: champ, equipmentId: sword,
      replaceEquipmentId: 'p1_fourth', targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] }));
    expect(state.players.p1.mana).toBe(8);
    state = pass(pass(state));
    expect(state.players.p1.mana).toBe(8);
    state = pass(pass(state));
    state = equip(turn(state), 'alastor', 'next-round', 'p1_kylast', sword);
    expect(state.players.p1.mana).toBe(9);
  });

  it('Damian acumula bônus de equipagens e perde somente esse bônus na próxima rodada', () => {
    let state = kylastFixture();
    const damian = give(state, 'p1', 'damian');
    state = play(state, 'p1', damian);
    state = equip(turn(state), 'sword-kylast', '1', damian);
    state = equip(turn(state), 'sword-kylast', '2', damian, 'p1_sword-kylast1');
    expect(state.players.p1.board[0].attack).toBe(5);
    state = pass(pass(state));
    expect(state.players.p1.board[0].attack).toBe(3);
  });

  it('cada robô ganha bônus uma vez por rodada e mantém o ataque ganho', () => {
    let state = enterKylast(kylastFixture());
    for (const id of ['r1', 'r2']) {
      putUnit(state, 'p1', id); const unit = state.players.p1.board.at(-1)!;
      unit.card.definitionId = 'robot-campeao'; unit.attack = 3;
    }
    state = equip(state, 'sword-kylast', '1');
    state = equip(turn(state), 'sword-kylast', '2');
    expect(state.players.p1.board.slice(1).map(u => u.attack)).toEqual([4, 4]);
    state = pass(pass(state));
    state = equip(turn(state), 'sword-kylast', '3', 'p1_kylast', 'p1_sword-kylast1');
    expect(state.players.p1.board.slice(1).map(u => u.attack)).toEqual([5, 5]);
  });
});
