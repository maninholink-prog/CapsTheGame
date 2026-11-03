import { describe, expect, it } from 'vitest';
import { applyCommand } from '../../src/battle/commands.js';
import { accepted, fixture, give, pass, play, putUnit } from './fixtures.js';

describe('resolução de efeitos', () => {
  it('resolve LIFO e conserva a prioridade de retorno do iniciador', () => {
    let state = fixture();
    const target = putUnit(state, 'p2');
    const fire = give(state, 'p1', 'fire');
    const armor = give(state, 'p2', 'armor');
    state = play(state, 'p1', fire, [target]);
    state = play(state, 'p2', armor, [target]);
    state = pass(pass(state));
    expect(state.players.p2.board[0]).toMatchObject({ health: 3, maxHealth: 6 });
    expect(state.priorityOwner).toBe('p2');
    expect(state.players.p1.reserve).toBe(1);
    expect(state.players.p2.reserve).toBe(2);
    expect(state.players.p1.discard.map(c => c.instanceId)).toContain(fire);
    expect(state.players.p2.discard.map(c => c.instanceId)).toContain(armor);
  });

  it('anulação consome carta e mana sem executar o efeito', () => {
    let state = fixture();
    const fire = give(state, 'p1', 'fire');
    const counter = give(state, 'p2', 'counter');
    state = play(state, 'p1', fire, [{ kind: 'nexus', player: 'p2' }]);
    state = play(state, 'p2', counter, [{ kind: 'stack', effectId: state.stack[0].id }]);
    state = pass(pass(state));
    expect(state.players.p2.nexus).toBe(20);
    expect(state.players.p1.reserve).toBe(1);
    expect(state.players.p2.reserve).toBe(2);
    expect(state.players.p1.discard.map(c => c.instanceId)).toContain(fire);
    expect(state.players.p2.discard.map(c => c.instanceId)).toContain(counter);
    expect(state.stack).toHaveLength(0);
  });

  it('resposta pode anular a anulação anterior', () => {
    let state = fixture();
    const fire = give(state, 'p1', 'fire');
    const c1 = give(state, 'p2', 'counter');
    const c2 = give(state, 'p1', 'counter');
    state = play(state, 'p1', fire, [{ kind: 'nexus', player: 'p2' }]);
    state = play(state, 'p2', c1, [{ kind: 'stack', effectId: state.stack.at(-1)!.id }]);
    state = play(state, 'p1', c2, [{ kind: 'stack', effectId: state.stack.at(-1)!.id }]);
    state = pass(pass(state));
    expect(state.players.p2.nexus).toBe(17);
    expect(state.players.p1.discard).toHaveLength(2);
    expect(state.players.p2.discard).toHaveLength(1);
  });

  it('alvos que morrem antes da resolução ficam inválidos, preservando os demais', () => {
    let state = fixture();
    const a = putUnit(state, 'p2', 'a', 2);
    const b = putUnit(state, 'p2', 'b');
    const multi = give(state, 'p1', 'multi');
    // First p1 plays, then p2 passes and p1 responds to its own pending effect.
    const fire = give(state, 'p1', 'fire');
    state = play(state, 'p1', multi, [a, b]);
    state = pass(state);
    state = play(state, 'p1', fire, [a]);
    state = pass(pass(state));
    expect(state.players.p2.board.map(u => [u.card.instanceId, u.health])).toEqual([['b', 1]]);
    expect(state.players.p2.deathRecords.map(c => c.instanceId)).toEqual(['a']);
  });

  it('efeito com todos os alvos inválidos falha sem reembolsar', () => {
    let state = fixture();
    const target = putUnit(state, 'p2', 'a', 2);
    const f1 = give(state, 'p1', 'fire', '1');
    const f2 = give(state, 'p1', 'fire', '2');
    state = play(state, 'p1', f1, [target]);
    state = pass(state);
    state = play(state, 'p1', f2, [target]);
    state = pass(pass(state));
    expect(state.players.p1.discard).toHaveLength(2);
    expect(state.players.p1.mana).toBe(9);
    expect(state.players.p1.reserve).toBe(0);
    expect(state.players.p2.deathRecords).toHaveLength(1);
  });

  it('cura respeita máximo e armadura aumenta vida atual e máxima sem restaurar dano', () => {
    let state = fixture();
    const target = putUnit(state, 'p1', 'hurt', 1);
    const armor = give(state, 'p1', 'armor');
    const heal = give(state, 'p1', 'heal');
    state = play(state, 'p1', armor, [target]);
    state = pass(pass(state));
    expect(state.players.p1.board[0]).toMatchObject({ health: 3, maxHealth: 6 });
    state = pass(state); // return priority to p1
    state = play(state, 'p1', heal, [target]);
    state = pass(pass(state));
    expect(state.players.p1.board[0].health).toBe(6);
  });

  it('dano letal resolve antes de cura pendente, sem ressuscitar', () => {
    let state = fixture();
    const target = putUnit(state, 'p1', 'hurt', 2);
    const heal = give(state, 'p1', 'heal');
    const fire = give(state, 'p2', 'fire');
    state = play(state, 'p1', heal, [target]);
    state = play(state, 'p2', fire, [target]);
    state = pass(pass(state));
    expect(state.players.p1.board).toHaveLength(0);
    expect(state.players.p1.deathRecords).toHaveLength(1);
    expect(state.players.p1.discard.map(c => c.instanceId)).toContain(heal);
  });

  it('dano simultâneo nos dois Nexus produz empate', () => {
    let state = fixture();
    const blast = give(state, 'p1', 'blast');
    state = play(state, 'p1', blast, [{ kind: 'nexus', player: 'p1' }, { kind: 'nexus', player: 'p2' }]);
    state = pass(pass(state));
    expect(state.players.p1.nexus).toBe(0);
    expect(state.players.p2.nexus).toBe(0);
    expect(state.winner).toBe('draw');
    expect(state.phase).toBe('ended');
  });

  it('encerra antes de resolver efeitos pendentes após morte do Nexus', () => {
    let state = fixture();
    state.players.p2.nexus = 3;
    const slow = give(state, 'p1', 'slow');
    const fire = give(state, 'p2', 'fire');
    state.players.p1.nexus = 3;
    state = play(state, 'p1', slow, [{ kind: 'nexus', player: 'p2' }]);
    state = play(state, 'p2', fire, [{ kind: 'nexus', player: 'p1' }]);
    state = pass(pass(state));
    expect(state.winner).toBe('p2');
    expect(state.players.p2.nexus).toBe(3);
    expect(state.stack).toHaveLength(1);
  });

  it('valida categorias, lados, repetição e quantidade antes de gastar', () => {
    const state = fixture();
    const ally = putUnit(state, 'p1');
    const enemy = putUnit(state, 'p2');
    const multi = give(state, 'p1', 'multi');
    const before = structuredClone(state);
    for (const targets of [[], [ally], [enemy, enemy], [{ kind: 'nexus', player: 'p2' }] as const]) {
      expect(applyCommand(state, { type: 'play', player: 'p1', instanceId: multi, targets: [...targets] }).ok).toBe(false);
      expect(state).toEqual(before);
    }
  });

  it('até X permite zero, sem exigir alvo fictício', () => {
    let state = fixture();
    const id = give(state, 'p1', 'optional');
    state = play(state, 'p1', id);
    state = pass(pass(state));
    expect(state.players.p1.discard.map(c => c.instanceId)).toContain(id);
  });

  it('cura do Nexus não ultrapassa seu máximo', () => {
    let state = fixture();
    state.players.p1.nexus = 19;
    const heal = give(state, 'p1', 'heal');
    state = play(state, 'p1', heal, [{ kind: 'nexus', player: 'p1' }]);
    state = pass(pass(state));
    expect(state.players.p1.nexus).toBe(20);
  });

  it('Explosiva como resposta preserva efeitos pendentes e não passa prioridade', () => {
    let state = fixture();
    const fire = give(state, 'p1', 'fire');
    const spark = give(state, 'p2', 'spark');
    state = play(state, 'p1', fire, [{ kind: 'nexus', player: 'p2' }]);
    state = play(state, 'p2', spark, [{ kind: 'nexus', player: 'p1' }]);
    expect(state.players.p1.nexus).toBe(19);
    expect(state.players.p2.nexus).toBe(20);
    expect(state.stack).toHaveLength(1);
    expect(state.priorityOwner).toBe('p2');
    state = pass(pass(state));
    expect(state.players.p2.nexus).toBe(17);
    expect(state.priorityOwner).toBe('p2');
  });
});
