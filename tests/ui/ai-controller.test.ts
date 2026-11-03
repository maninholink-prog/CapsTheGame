import { afterEach, describe, expect, it, vi } from 'vitest';
import { createSession, dispatchHuman, dispatch } from '../../src/ui/session.js';
import { createAiController } from '../../src/ui/ai-controller.js';

afterEach(() => vi.useRealTimers());
describe('controle automático da IA', () => {
  it('agenda uma ação, confirma a mão da IA e mantém a mão humana na tela', () => {
    vi.useFakeTimers();
    let session = dispatchHuman(createSession(131, 'ai'), { type: 'mulligan', player: 'p1', instanceIds: [] });
    const commit = vi.fn(next => { session = next; });
    const controller = createAiController({ getSession: () => session, commit }, { delayMs: 100 });
    controller.schedule(); controller.schedule();
    expect(vi.getTimerCount()).toBe(1);
    vi.advanceTimersByTime(100);
    expect(commit).toHaveBeenCalledTimes(1);
    expect(session.state.players.p2.mulliganUsed).toBe(true);
    expect(session.viewPlayer).toBe('p1');
  });

  it('não executa timer de uma batalha anterior após iniciar outra', () => {
    vi.useFakeTimers();
    let session = dispatchHuman(createSession(131, 'ai'), { type: 'mulligan', player: 'p1', instanceIds: [] });
    const commit = vi.fn();
    const controller = createAiController({ getSession: () => session, commit }, { delayMs: 100 });
    controller.schedule();
    session = createSession(2026, 'manual'); controller.schedule();
    vi.advanceTimersByTime(100);
    expect(commit).not.toHaveBeenCalled(); expect(vi.getTimerCount()).toBe(0);
  });

  it('humano não comanda a mão adversária no modo IA e o manual continua disponível', () => {
    const session = createSession(1, 'ai');
    const refused = dispatchHuman(session, { type: 'mulligan', player: 'p2', instanceIds: [] });
    expect(refused.state).toBe(session.state); expect(refused.error).toContain('computador');
    expect(dispatch(createSession(1, 'manual'), { type: 'mulligan', player: 'p1', instanceIds: [] }).viewPlayer).toBe('p2');
  });

  it('falha de decisão pausa sem criar repetição infinita no mesmo estado', () => {
    vi.useFakeTimers();
    let session = dispatchHuman(createSession(1, 'ai'), { type: 'mulligan', player: 'p1', instanceIds: [] });
    const controller = createAiController({ getSession: () => session, commit: next => { session = next; } }, {
      delayMs: 100, decide: () => ({ command: { type: 'play', player: 'p2', instanceId: 'missing' }, reason: 'test' }),
    });
    controller.schedule(); vi.advanceTimersByTime(100); controller.schedule();
    expect(session.error).toContain('pausada'); expect(vi.getTimerCount()).toBe(0);
  });
});
