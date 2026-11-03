import { describe, expect, it } from 'vitest';
import { applyCommand } from '../../src/battle/commands.js';
import { advanceRound } from '../../src/battle/round.js';
import { accepted, fixture, give, pass, play, putUnit } from './fixtures.js';

describe('jogar cartas e prioridade', () => {
  it('unidade entra na posição escolhida, usa mana comum e passa prioridade', () => {
    const state = fixture();
    putUnit(state, 'p1', 'old');
    const id = give(state, 'p1', 'unit');
    const before = structuredClone(state);
    const next = accepted(applyCommand(state, { type: 'play', player: 'p1', instanceId: id, position: 0 }));
    expect(next.players.p1.board.map(u => u.card.instanceId)).toEqual([id, 'old']);
    expect(next.players.p1.mana).toBe(8);
    expect(next.players.p1.reserve).toBe(3);
    expect(next.priorityOwner).toBe('p2');
    expect(next.players.p1.hand).toHaveLength(0);
    expect(state).toEqual(before);
  });

  it('campo cheio exige substituição explícita, registrando morte e descarte', () => {
    const state = fixture();
    for (let i = 0; i < 5; i++) putUnit(state, 'p1', `u${i}`);
    const id = give(state, 'p1', 'unit');
    const before = structuredClone(state);
    expect(applyCommand(state, { type: 'play', player: 'p1', instanceId: id }).ok).toBe(false);
    expect(state).toEqual(before);
    const next = accepted(applyCommand(state, { type: 'play', player: 'p1', instanceId: id, replaceUnitId: 'u2', position: 2 }));
    expect(next.players.p1.board).toHaveLength(5);
    expect(next.players.p1.board[2].card.instanceId).toBe(id);
    expect(next.players.p1.deathRecords.map(c => c.instanceId)).toContain('u2');
    expect(next.players.p1.discard.map(c => c.instanceId)).toContain('u2');
  });

  it('Lenta abre resposta e bloqueia unidades/outra Lenta até a resolução', () => {
    let state = fixture();
    const id = give(state, 'p1', 'slow');
    const unit = give(state, 'p2', 'unit');
    const slow = give(state, 'p2', 'slow');
    state = play(state, 'p1', id, [{ kind: 'nexus', player: 'p2' }]);
    expect(state.stack).toHaveLength(1);
    expect(state.players.p2.nexus).toBe(20);
    expect(applyCommand(state, { type: 'play', player: 'p2', instanceId: unit }).ok).toBe(false);
    expect(applyCommand(state, { type: 'play', player: 'p2', instanceId: slow, targets: [{ kind: 'nexus', player: 'p1' }] }).ok).toBe(false);
    expect(advanceRound({ ...state, consecutivePasses: 2 }).ok).toBe(false);
    const round = state.round;
    state = pass(pass(state));
    expect(state.players.p2.nexus).toBe(17);
    expect(state.stack).toHaveLength(0);
    expect(state.round).toBe(round);
    expect(state.priorityOwner).toBe('p2');
  });

  it('Explosiva resolve sem passar prioridade e reinicia passes anteriores', () => {
    let state = fixture();
    const id = give(state, 'p2', 'spark');
    state = pass(state);
    const round = state.round;
    state = play(state, 'p2', id, [{ kind: 'nexus', player: 'p1' }]);
    expect(state.priorityOwner).toBe('p2');
    expect(state.stack).toHaveLength(0);
    expect(state.players.p1.nexus).toBe(19);
    expect(state.consecutivePasses).toBe(0);
    state = pass(state);
    expect(state.round).toBe(round);
  });

  it('comando inválido não gasta mana, consome carta nem altera RNG', () => {
    const state = fixture();
    const id = give(state, 'p1', 'fire');
    const gear = give(state, 'p1', 'equipment');
    state.players.p1.mana = 0; state.players.p1.reserve = 0;
    const before = structuredClone(state);
    for (const command of [
      { type: 'play', player: 'p1', instanceId: id, targets: [{ kind: 'nexus', player: 'p2' }] },
      { type: 'play', player: 'p1', instanceId: gear },
      { type: 'play', player: 'p2', instanceId: id },
    ] as const) {
      const result = applyCommand(state, { ...command, targets: [...(command.targets ?? [])] });
      expect(result.ok).toBe(false);
      expect(result.state).toBe(state);
      expect(state).toEqual(before);
    }
  });

  it('anulação Explosiva pode esvaziar a pilha sem encerrar a janela nem a rodada', () => {
    let state = fixture();
    const counter = state.definitions.counter;
    if (counter.kind !== 'spell') throw new Error('Test definition');
    state.definitions.counter = { ...counter, speed: 'burst' };
    const fire = give(state, 'p1', 'fire');
    const cancel = give(state, 'p2', 'counter');
    const unit = give(state, 'p2', 'unit');
    state = play(state, 'p1', fire, [{ kind: 'nexus', player: 'p2' }]);
    const round = state.round;
    state = play(state, 'p2', cancel, [{ kind: 'stack', effectId: state.stack[0].id }]);
    expect(state.stack).toHaveLength(0);
    expect(state.priorityOwner).toBe('p2');
    expect(applyCommand(state, { type: 'play', player: 'p2', instanceId: unit }).ok).toBe(false);
    expect(advanceRound({ ...state, consecutivePasses: 2 }).ok).toBe(false);
    state = pass(pass(state));
    expect(state.round).toBe(round);
    expect(state.priorityOwner).toBe('p2');
    expect(state.stackReturnOwner).toBeNull();
  });
});
