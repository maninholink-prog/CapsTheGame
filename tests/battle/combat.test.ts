import { describe, expect, it } from 'vitest';
import { applyCommand } from '../../src/battle/commands.js';
import { accepted, fixture, give, pass, play, putUnit } from './fixtures.js';
import type { BattleState } from '../../src/battle/types.js';

export function attackers(state: BattleState, ids: string[]): BattleState {
  return accepted(applyCommand(state, { type: 'attack', player: 'p1', attackers: ids.map(unitId => ({ unitId })) }));
}
export function blocks(state: BattleState, pairs: [string, string][]): BattleState {
  return accepted(applyCommand(state, { type: 'block', player: 'p2', assignments: pairs.map(([attackerId, blockerId]) => ({ attackerId, blockerId })) }));
}
function readyCombat(): BattleState {
  const state = fixture();
  state.attackOwner = 'p1';
  state.attackAvailable = true;
  putUnit(state, 'p1', 'a');
  putUnit(state, 'p2', 'b');
  return state;
}

describe('combate básico', () => {
  it('ataque não bloqueado atinge Nexus, consome token e não muda rodada', () => {
    let state = readyCombat();
    state = attackers(state, ['a']);
    expect(state.priorityOwner).toBe('p2');
    expect(state.attackAvailable).toBe(false);
    state = blocks(state, []);
    state = pass(pass(state));
    expect(state.players.p2.nexus).toBe(18);
    expect(state.combat).toBeNull();
    expect(state.round).toBe(1);
    expect(state.priorityOwner).toBe('p2');
    state = pass(state);
    expect(applyCommand(state, { type: 'attack', player: 'p1', attackers: [{ unitId: 'a' }] }).ok).toBe(false);
  });

  it('troca de dano é simultânea e não transfere excedente ao Nexus', () => {
    let state = readyCombat();
    state.players.p1.board[0].attack = 8;
    state.players.p1.board[0].health = 2;
    state = blocks(attackers(state, ['a']), [['a', 'b']]);
    state = pass(pass(state));
    expect(state.players.p1.board).toHaveLength(0);
    expect(state.players.p2.board).toHaveLength(0);
    expect(state.players.p2.nexus).toBe(20);
    expect(state.players.p1.deathRecords.map(c => c.instanceId)).toEqual(['a']);
  });

  it('bloqueador morto por resposta mantém atacante bloqueado', () => {
    let state = readyCombat();
    state.players.p2.board[0].health = 3;
    const fire = give(state, 'p1', 'fire');
    state = blocks(attackers(state, ['a']), [['a', 'b']]);
    state = play(state, 'p1', fire, [{ kind: 'unit', player: 'p2', instanceId: 'b' }]);
    state = pass(pass(state));
    expect(state.players.p2.board).toHaveLength(0);
    expect(state.players.p2.nexus).toBe(20);
    expect(state.players.p1.board[0].health).toBe(4);
  });

  it('armadura Rápida protege o bloqueador; Lenta e unidade não respondem ao combate', () => {
    let state = readyCombat();
    state.players.p1.board[0].attack = 5;
    const armor = give(state, 'p2', 'armor');
    const unit = give(state, 'p1', 'unit');
    const slow = give(state, 'p1', 'slow');
    state = blocks(attackers(state, ['a']), [['a', 'b']]);
    expect(applyCommand(state, { type: 'play', player: 'p1', instanceId: unit }).ok).toBe(false);
    expect(applyCommand(state, { type: 'play', player: 'p1', instanceId: slow, targets: [{ kind: 'nexus', player: 'p2' }] }).ok).toBe(false);
    state = pass(state);
    state = play(state, 'p2', armor, [{ kind: 'unit', player: 'p2', instanceId: 'b' }]);
    state = pass(pass(state));
    expect(state.players.p2.board[0]).toMatchObject({ health: 1, maxHealth: 6 });
    expect(state.players.p1.board[0].health).toBe(2);
  });

  it('ataque zero não causa dano, mas recebe dano do bloqueador', () => {
    let state = readyCombat();
    state.players.p1.board[0].attack = 0;
    state = pass(pass(blocks(attackers(state, ['a']), [['a', 'b']])));
    expect(state.players.p2.board[0].health).toBe(4);
    expect(state.players.p1.board[0].health).toBe(2);
  });

  it('rejeita IDs repetidos, bloqueador duplicado, ataque vazio e jogador sem token', () => {
    const state = readyCombat();
    putUnit(state, 'p1', 'a2');
    const before = structuredClone(state);
    for (const ids of [[], ['a', 'a'], ['missing']]) {
      expect(applyCommand(state, { type: 'attack', player: 'p1', attackers: ids.map(unitId => ({ unitId })) }).ok).toBe(false);
      expect(state).toEqual(before);
    }
    expect(applyCommand(state, { type: 'attack', player: 'p2', attackers: [{ unitId: 'b' }] }).ok).toBe(false);
    const declared = attackers(state, ['a', 'a2']);
    expect(applyCommand(declared, { type: 'pass', player: 'p2' }).ok).toBe(false);
    expect(applyCommand(declared, { type: 'block', player: 'p2', assignments: [
      { attackerId: 'a', blockerId: 'b' }, { attackerId: 'a2', blockerId: 'b' },
    ] }).ok).toBe(false);
  });

  it('Nexus derrotado interrompe os próximos atacantes', () => {
    let state = readyCombat();
    state.players.p2.nexus = 1;
    putUnit(state, 'p1', 'a2');
    state = pass(pass(blocks(attackers(state, ['a', 'a2']), [])));
    expect(state.winner).toBe('p1');
    expect(state.phase).toBe('ended');
  });
});
