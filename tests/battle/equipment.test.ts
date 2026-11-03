import { describe, expect, it } from 'vitest';
import { applyCommand } from '../../src/battle/commands.js';
import { accepted, give, pass, play, putUnit } from './fixtures.js';
import { enterKylast, equip, kylastFixture, turn } from './kylast-fixtures.js';

describe('equipamentos', () => {
  it('usa mana comum, duas cópias iguais ocupam slots distintos e substituição devolve à mão', () => {
    let state = enterKylast(kylastFixture());
    state = equip(state, 'sword-kylast', '1');
    state = equip(turn(state), 'sword-kylast', '2');
    expect(state.players.p1.board[0].equipment).toHaveLength(2);
    expect(state.players.p1.reserve).toBe(3);
    state = turn(state);
    const banjo = give(state, 'p1', 'banjo');
    const before = structuredClone(state);
    const command = { type: 'play' as const, player: 'p1' as const, instanceId: banjo,
      targets: [{ kind: 'unit' as const, player: 'p1' as const, instanceId: 'p1_kylast' }] };
    expect(applyCommand(state, command).ok).toBe(false);
    expect(state).toEqual(before);
    state = accepted(applyCommand(state, { ...command, replaceEquipmentId: 'p1_sword-kylast1' }));
    expect(state.players.p1.hand.map(c => c.instanceId)).toContain('p1_sword-kylast1');
    expect(state.players.p1.board[0].equipment!.map(e => e.card.instanceId)).toEqual(['p1_sword-kylast2', banjo]);
  });

  it('morte devolve equipamentos mais antigos primeiro e descarta o excesso da mão', () => {
    let state = enterKylast(kylastFixture());
    state = equip(state, 'sword-kylast', 'old');
    state = equip(turn(state), 'sword-kylast', 'new');
    state.players.p1.board[0].health = 3;
    while (state.players.p1.hand.length < 9) give(state, 'p1', 'unit', `${state.players.p1.hand.length}`);
    const fire = give(state, 'p2', 'fire');
    state = play(state, 'p2', fire, [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }]);
    state = pass(pass(state));
    expect(state.players.p1.board).toHaveLength(0);
    expect(state.players.p1.hand).toHaveLength(10);
    expect(state.players.p1.hand.map(c => c.instanceId)).toContain('p1_sword-kylastold');
    expect(state.players.p1.discard.map(c => c.instanceId)).toContain('p1_sword-kylastnew');
  });

  it('outras unidades têm um slot', () => {
    let state = kylastFixture();
    putUnit(state, 'p1', 'normal');
    state = equip(state, 'sword-kylast', '1', 'normal');
    state = turn(state);
    const id = give(state, 'p1', 'sword-kylast', '2');
    expect(applyCommand(state, { type: 'play', player: 'p1', instanceId: id,
      targets: [{ kind: 'unit', player: 'p1', instanceId: 'normal' }] }).ok).toBe(false);
  });

  it('capacidade configurada de Kylast é limitada a seis, sem conceder maestria automaticamente', () => {
    let state = enterKylast(kylastFixture());
    state.kylastEquipmentSlots = 8;
    state.players.p1.mana = 10;
    for (let i = 0; i < 6; i++) state = equip(turn(state), 'sword-kylast', `${i}`);
    expect(state.players.p1.board[0].equipment).toHaveLength(6);
    state = turn(state);
    const id = give(state, 'p1', 'sword-kylast', 'seventh');
    expect(applyCommand(state, { type: 'play', player: 'p1', instanceId: id,
      targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] }).ok).toBe(false);
  });
});
