import { describe, expect, it } from 'vitest';
import { freshDraft, actionCommand, parseDraggedUnit } from '../../src/ui/forms.js';
import { createSession } from '../../src/ui/session.js';
import { preview } from '../../src/ui/presentation.js';
import { render } from '../../src/ui/render.js';
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

  it('mantém o painel de ataque sem formulário; a mesa recebe as seleções', () => {
    const state = kylastFixture();
    putUnit(state, 'p1', 'a');
    const draft = freshDraft(); draft.mode = 'attack'; draft.attackers = ['a'];
    const html = render({ ...createSession(1), state }, draft);
    const panel=html.match(/<section class="action-panel panel"[\s\S]*?<\/section>/)?.[0]??'';
    expect(panel).toContain('data-action="confirm"');
    expect(panel).toContain('Declarar ataque');
    expect(panel).not.toContain('attacker-toggles');
    expect(panel).not.toContain('order-left');
    expect(panel).not.toContain('Passar ação');
    expect(panel).not.toContain('Golpe 1');
    expect(panel).not.toContain('<select');
    expect(panel.match(/<button/g)).toHaveLength(1);
    expect(html).toContain('data-drop="attack"');
    expect(html).toContain('draggable="true" data-drag-unit="true"');
  });

  it('offers a single back button before choosing an attacker',()=>{
    const state=kylastFixture();const draft=freshDraft();draft.mode='attack';
    const html=render({...createSession(1),state},draft);
    const panel=html.match(/<section class="action-panel panel"[\s\S]*?<\/section>/)?.[0]??'';
    expect(panel).toContain('data-action="cancel-attack"');
    expect(panel).toContain('Voltar às cartas');
    expect(panel.match(/<button/g)).toHaveLength(1);
  });

  it('preserva os dois-pontos do ID da unidade arrastada',()=>{
    expect(parseDraggedUnit('unit:p1:j1:wang-jianxi:0')).toEqual({owner:'p1',id:'j1:wang-jianxi:0'});
    expect(parseDraggedUnit('unit:p3:bad')).toBeNull();
  });
});
