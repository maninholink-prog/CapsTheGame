import { describe, expect, it } from 'vitest';
import { createSession, dispatch, actingPlayer } from '../../src/ui/session.js';
import { handCardMode, visibleEffects } from '../../src/ui/presentation.js';
import { enterKylast, kylastFixture } from '../battle/kylast-fixtures.js';
import { give, pass, play, putUnit } from '../battle/fixtures.js';

describe('sessão da interface', () => {
  it('conduz mulligan de ambos e inicia batalha reproduzível sem alterar a sessão anterior', () => {
    const initial = createSession(2026);
    const snapshot = structuredClone(initial);
    expect(actingPlayer(initial.state)).toBe('p1');
    let session = dispatch(initial, { type: 'mulligan', player: 'p1', instanceIds: [] });
    expect(actingPlayer(session.state)).toBe('p2');
    expect(session.viewPlayer).toBe('p2');
    session = dispatch(session, { type: 'mulligan', player: 'p2', instanceIds: [] });
    expect(actingPlayer(session.state)).toBeNull();
    session = dispatch(session, { type: 'start' });
    expect(session.state.round).toBe(1);
    expect(session.viewPlayer).toBe(session.state.priorityOwner);
    expect(initial).toEqual(snapshot);
    expect(initial.state.players.p1.deck).toHaveLength(15);
    expect(session.history.some(row => row.message.includes('d20'))).toBe(true);
  });

  it('comando inválido mantém estado e informa erro em português', () => {
    const session = createSession(3);
    const next = dispatch(session, { type: 'start' });
    expect(next.state).toBe(session.state);
    expect(next.error).toContain('mão');
    expect(next.history).toEqual(session.history);
  });

  it('identifica segunda cópia como Troca sem alterar sua identidade no motor', () => {
    const state = enterKylast(kylastFixture());
    const id = give(state, 'p1', 'kylast', '2');
    const card = state.players.p1.hand.find(c => c.instanceId === id)!;
    expect(handCardMode(state, 'p1', card)).toBe('arsenal');
    expect(card.definitionId).toBe('kylast');
  });

  it('mostra carta do Colar sem revelar alvos nem continuação interna', () => {
    let state = kylastFixture();
    putUnit(state, 'p1', 'bearer');
    const spark = give(state, 'p1', 'spark');
    const colar = give(state, 'p1', 'colar');
    state = play(state, 'p1', colar, [{ kind: 'unit', player: 'p1', instanceId: 'bearer' }]);
    state = pass(pass(state));
    const effects = visibleEffects(state);
    expect(effects).toHaveLength(1);
    expect(effects[0].sourceId).toBe(spark);
    expect(effects[0].targetsText).toContain('resolver');
    expect(effects[0].title).not.toContain('colar-next');
  });
});
