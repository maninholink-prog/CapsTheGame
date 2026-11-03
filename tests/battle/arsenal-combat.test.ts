import { describe, expect, it } from 'vitest';
import { applyCommand } from '../../src/battle/commands.js';
import { accepted, give, pass, play, putUnit } from './fixtures.js';
import { enterKylast, equip, evolve, kylastFixture, turn } from './kylast-fixtures.js';
import type { BattleState } from '../../src/battle/types.js';

function attack(state: BattleState, entries: { unitId: string; weapons?: (string | null)[] }[], pairs: [string, string][]): BattleState {
  state = accepted(applyCommand(turn(state), { type: 'attack', player: 'p1', attackers: entries }));
  return accepted(applyCommand(state, { type: 'block', player: 'p2', assignments: pairs.map(([attackerId, blockerId]) => ({ attackerId, blockerId })) }));
}
function banjos(state: BattleState, entries: [string, string][]): BattleState {
  return accepted(applyCommand(state, { type: 'prepareAttack', player: 'p1', banjos: entries.map(([equipmentId, targetId]) => ({ equipmentId, targetId })) }));
}
function defenders(state: BattleState): void {
  for (const id of ['left', 'block', 'right', 'outside']) {
    putUnit(state, 'p2', id, 20);
    const u = state.players.p2.board.at(-1)!; u.maxHealth = 20; u.attack = 0;
  }
  for (const id of ['a-left', 'a-right']) {
    putUnit(state, 'p1', id, 20);
    state.players.p1.board.at(-1)!.attack = 0;
  }
}

describe('Alastor e Banjo no combate', () => {
  it('Alastor atinge vizinhos da linha, excluindo unidades fora do combate', () => {
    let state = enterKylast(kylastFixture());
    state = equip(state, 'alastor');
    defenders(state);
    state = attack(state, [{ unitId: 'a-left' }, { unitId: 'p1_kylast', weapons: ['p1_alastor'] }, { unitId: 'a-right' }],
      [['a-left', 'left'], ['p1_kylast', 'block'], ['a-right', 'right']]);
    state = pass(pass(state));
    expect(state.players.p2.board.map(u => [u.card.instanceId, u.health])).toEqual([['left', 19], ['block', 15], ['right', 19], ['outside', 20]]);
  });

  it('lacuna de bloqueador removido não aproxima outro alvo para o raio', () => {
    let state = enterKylast(kylastFixture());
    state = equip(state, 'alastor');
    defenders(state);
    state.players.p2.board.find(u => u.card.instanceId === 'block')!.health = 3;
    const fire = give(state, 'p1', 'fire');
    state = attack(state, [{ unitId: 'a-left' }, { unitId: 'a-right' }, { unitId: 'p1_kylast', weapons: ['p1_alastor'] }],
      [['a-left', 'left'], ['a-right', 'block'], ['p1_kylast', 'right']]);
    state = play(state, 'p1', fire, [{ kind: 'unit', player: 'p2', instanceId: 'block' }]);
    state = pass(pass(state));
    expect(state.players.p2.board.find(u => u.card.instanceId === 'left')!.health).toBe(20);
  });

  it('Ybew dobra raio nos dois golpes sem acumular com outra cópia', () => {
    let state = evolve(enterKylast(kylastFixture()));
    state.players.p1.mana = 10;
    state = equip(state, 'alastor');
    defenders(state);
    // Use one aura bearer; board also contains evolution's bearer and two flank attackers.
    state.players.p1.board.find(u => u.card.instanceId === 'bearer')!.card.definitionId = 'ybew';
    state.players.p1.board.find(u => u.card.instanceId === 'a-left')!.card.definitionId = 'ybew';
    state = attack(state, [{ unitId: 'a-left' }, { unitId: 'p1_kylast', weapons: ['p1_alastor', 'p1_alastor'] }, { unitId: 'a-right' }],
      [['a-left', 'left'], ['p1_kylast', 'block'], ['a-right', 'right']]);
    state = pass(pass(state));
    expect(state.players.p2.board.find(u => u.card.instanceId === 'left')!.health).toBe(16);
    expect(state.players.p2.board.find(u => u.card.instanceId === 'right')!.health).toBe(16);
  });

  it('raios seguintes perdem bônus quando o último Ybew morre em uma posição anterior', () => {
    let state = enterKylast(kylastFixture());
    state = equip(state, 'alastor');
    defenders(state);
    putUnit(state, 'p1', 'ybew-actor', 1);
    state.players.p1.board.at(-1)!.card.definitionId = 'ybew';
    state.players.p2.board.find(u => u.card.instanceId === 'outside')!.attack = 20;
    state = attack(state, [{ unitId: 'ybew-actor' }, { unitId: 'a-left' }, { unitId: 'p1_kylast', weapons: ['p1_alastor'] }, { unitId: 'a-right' }],
      [['ybew-actor', 'outside'], ['a-left', 'left'], ['p1_kylast', 'block'], ['a-right', 'right']]);
    state = pass(pass(state));
    expect(state.players.p1.board.some(u => u.card.definitionId === 'ybew')).toBe(false);
    expect(state.players.p2.board.find(u => u.card.instanceId === 'left')!.health).toBe(19);
  });

  it('Banjo como segunda arma dispara antes dos golpes, remove bloqueio e abre resposta', () => {
    let state = evolve(enterKylast(kylastFixture()));
    state.players.p1.mana = 10;
    state = equip(state, 'sword-kylast');
    state = equip(turn(state), 'banjo');
    putUnit(state, 'p2', 'block', 20);
    state = attack(state, [{ unitId: 'p1_kylast', weapons: ['p1_sword-kylast', 'p1_banjo'] }], [['p1_kylast', 'block']]);
    expect(state.combat!.stage).toBe('triggers');
    state = banjos(state, [['p1_banjo', 'block']]);
    expect(state.players.p2.board[0].stunnedUntilRound).toBeUndefined();
    expect(state.priorityOwner).toBe('p2');
    state = pass(pass(state));
    expect(state.players.p2.nexus).toBe(11);
    expect(state.players.p2.board[0].health).toBe(20);
    expect(state.players.p2.board[0].stunnedUntilRound).toBe(1);
    expect(state.players.p1.board.find(u => u.card.definitionId === 'kylast')!.equipment!.find(e => e.card.definitionId === 'banjo')!.used).toBe(true);
  });

  it('anular atordoamento consome uso sem descartar o Banjo equipado', () => {
    let state = enterKylast(kylastFixture());
    state = equip(state, 'banjo');
    putUnit(state, 'p2', 'block', 20);
    const counter = give(state, 'p2', 'counter');
    state = attack(state, [{ unitId: 'p1_kylast', weapons: ['p1_banjo'] }], [['p1_kylast', 'block']]);
    state = banjos(state, [['p1_banjo', 'block']]);
    state = play(state, 'p2', counter, [{ kind: 'stack', effectId: state.stack[0].id }]);
    state = pass(pass(state));
    expect(state.players.p2.board[0].stunnedUntilRound).toBeUndefined();
    expect(state.players.p2.board[0].health).toBe(17);
    expect(state.players.p1.board[0].equipment![0].used).toBe(true);
    expect(state.players.p1.discard.some(c => c.definitionId === 'banjo')).toBe(false);
  });

  it('mesmo Banjo nos dois golpes produz apenas um gatilho; duas cópias produzem dois', () => {
    let state = evolve(enterKylast(kylastFixture()));
    state.players.p1.mana = 10;
    state = equip(state, 'banjo', '1');
    state = equip(turn(state), 'banjo', '2');
    putUnit(state, 'p2', 'block');
    state = attack(state, [{ unitId: 'p1_kylast', weapons: ['p1_banjo1', 'p1_banjo2'] }], []);
    state = banjos(state, [['p1_banjo1', 'block'], ['p1_banjo2', 'block']]);
    expect(state.stack).toHaveLength(2);
    expect(state.players.p1.board[0].equipment!.every(e => e.used)).toBe(true);
  });

  it('uma única cópia selecionada nos dois golpes só ativa uma vez', () => {
    let state = evolve(enterKylast(kylastFixture()));
    state.players.p1.mana = 10;
    state = equip(state, 'banjo');
    putUnit(state, 'p2', 'block');
    state = attack(state, [{ unitId: 'p1_kylast', weapons: ['p1_banjo', 'p1_banjo'] }], []);
    state = banjos(state, [['p1_banjo', 'block']]);
    expect(state.stack).toHaveLength(1);
  });

  it('retorno à mão preserva evolução, limpa dano e permite novo uso do Banjo ao reequipar', () => {
    let state = evolve(enterKylast(kylastFixture()));
    state.players.p1.mana = 10;
    state = equip(state, 'banjo');
    putUnit(state, 'p2', 'block');
    state = attack(state, [{ unitId: 'p1_kylast', weapons: ['p1_banjo', 'p1_banjo'] }], []);
    state = banjos(state, [['p1_banjo', 'block']]);
    state = pass(pass(state));
    expect(state.players.p1.board[0].equipment![0].used).toBe(true);
    state.players.p1.board[0].health = 3;
    state.definitions.recall = { id: 'recall', kind: 'spell', cost: 0, speed: 'fast',
      target: { kind: 'unit', side: 'ally', min: 1, max: 1 }, effect: { type: 'recall' } };
    const recall = give(state, 'p1', 'recall');
    state = play(turn(state), 'p1', recall, [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }]);
    state = pass(pass(state));
    expect(state.players.p1.hand.slice(-2).map(c => c.instanceId)).toEqual(['p1_kylast', 'p1_banjo']);
    state.players.p1.mana = 10;
    state = play(turn(state), 'p1', 'p1_kylast');
    const hero = state.players.p1.board.find(u => u.card.instanceId === 'p1_kylast')!;
    expect(hero).toMatchObject({ health: 6, maxHealth: 6, evolved: true });
    state = play(turn(state), 'p1', 'p1_banjo', [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }]);
    expect(state.players.p1.board.find(u => u.card.instanceId === 'p1_kylast')!.equipment![0].used).toBe(false);
  });

  it('nova rodada limpa atordoamento, sem renovar o uso de Banjo', () => {
    let state = enterKylast(kylastFixture());
    state = equip(state, 'banjo');
    putUnit(state, 'p2', 'block');
    state = attack(state, [{ unitId: 'p1_kylast', weapons: ['p1_banjo'] }], []);
    state = pass(pass(banjos(state, [['p1_banjo', 'block']])));
    state = pass(pass(state));
    expect(state.round).toBe(2);
    expect(state.players.p2.board[0].stunnedUntilRound).toBeUndefined();
    expect(state.players.p1.board[0].equipment![0].used).toBe(true);
  });

  it('arma devolvida após declarar ataque não é substituída na sequência', () => {
    let state = evolve(enterKylast(kylastFixture()));
    state.players.p1.mana = 10;
    state = equip(state, 'sword-kylast');
    state = equip(turn(state), 'alastor');
    const second = give(state, 'p1', 'kylast', '2');
    const fourth = give(state, 'p1', 'fourth');
    state = attack(state, [{ unitId: 'p1_kylast', weapons: ['p1_sword-kylast', 'p1_alastor'] }], []);
    state = accepted(applyCommand(state, { type: 'play', player: 'p1', instanceId: second, equipmentId: fourth,
      replaceEquipmentId: 'p1_sword-kylast', targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] }));
    state = pass(pass(state));
    expect(state.players.p2.nexus).toBe(10); // base 4, then 4+2. No replacement bonus.
    expect(state.players.p1.hand.map(c => c.instanceId)).toContain('p1_sword-kylast');
  });

  it('evolução em resposta não acrescenta golpe ao ataque já declarado', () => {
    let state = enterKylast(kylastFixture());
    state.equippedIdentities.p1 = ['sword-kylast', 'alastor', 'banjo'];
    const second = give(state, 'p1', 'kylast', '2');
    const fourth = give(state, 'p1', 'fourth');
    state = attack(state, [{ unitId: 'p1_kylast', weapons: [null] }], []);
    state = accepted(applyCommand(state, { type: 'play', player: 'p1', instanceId: second, equipmentId: fourth,
      targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] }));
    state = pass(pass(state));
    expect(state.players.p1.board[0].evolved).toBe(true);
    expect(state.players.p2.nexus).toBe(16);
  });
});
