import { describe, expect, it } from 'vitest';
import { freshDraft, actionCommand } from '../../src/ui/forms.js';
import { createSession } from '../../src/ui/session.js';
import { preview } from '../../src/ui/presentation.js';
import { enterKylast, kylastFixture } from '../battle/kylast-fixtures.js';
import { give, putUnit } from '../battle/fixtures.js';

describe('comandos dos formulários', () => {
  it('campo cheio exige substituição explícita, sem omitir a escolha', () => {
    const state = kylastFixture();
    for (let i = 0; i < 5; i++) putUnit(state, 'p1', `u${i}`);
    const draft = freshDraft();
    draft.selectedCardId = give(state, 'p1', 'damian');
    const session = { ...createSession(1), state };
    expect(preview(state, actionCommand(session, draft)!).ok).toBe(false);
    draft.replaceUnitId = 'u2';
    expect(actionCommand(session, draft)).toMatchObject({ type: 'play', replaceUnitId: 'u2' });
    expect(preview(state, actionCommand(session, draft)!).ok).toBe(true);
  });

  it('constrói Troca com arma, alvo e substituição de equipamento', () => {
    const state = enterKylast(kylastFixture());
    const draft = freshDraft();
    draft.selectedCardId = give(state, 'p1', 'kylast', '2');
    draft.equipmentId = give(state, 'p1', 'sword-kylast');
    draft.targetId = 'p1_kylast';
    const command = actionCommand({ ...createSession(1), state }, draft)!;
    expect(command).toMatchObject({ type: 'play', equipmentId: draft.equipmentId,
      targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] });
    expect(preview(state, command).ok).toBe(true);
  });

  it('preserva a ordem dos atacantes e a arma de cada golpe', () => {
    const state = kylastFixture();
    putUnit(state, 'p1', 'a'); putUnit(state, 'p1', 'b');
    const draft = freshDraft(); draft.mode = 'attack'; draft.attackers = ['b', 'a'];
    const command = actionCommand({ ...createSession(1), state }, draft)!;
    expect(command).toMatchObject({ type: 'attack', attackers: [{ unitId: 'b', weapons: [null] }, { unitId: 'a', weapons: [null] }] });
    expect(preview(state, command).ok).toBe(true);
  });

  it('permite escolher golpe sem arma mesmo com equipamento disponível', () => {
    const state = kylastFixture();
    putUnit(state, 'p1', 'a');
    state.players.p1.board[0].equipment = [{ card: { instanceId: 'sword', definitionId: 'sword-kylast' }, used: false }];
    const draft = freshDraft(); draft.mode = 'attack'; draft.attackers = ['a']; draft.weapons.a = [null];
    expect(actionCommand({ ...createSession(1), state }, draft)).toMatchObject({ attackers: [{ unitId: 'a', weapons: [null] }] });
  });
});
