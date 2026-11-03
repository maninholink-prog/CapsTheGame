import { describe, expect, it } from 'vitest';
import { observeBattle } from '../../src/ai/observation.js';
import { chooseAiCommand } from '../../src/ai/policy.js';
import { createSession, actingPlayer } from '../../src/ui/session.js';
import { applyCommand } from '../../src/battle/commands.js';

describe('duelos determinísticos da IA', () => {
  for (const seed of [0, 7, 131, 2026]) it(`conclui o duelo ${seed} com comandos legais`, () => {
    let state = createSession(seed).state;
    let steps = 0;
    const actions = new Set<string>();
    while (state.phase !== 'ended' && steps < 400) {
      const actor = actingPlayer(state);
      const decision = actor ? chooseAiCommand(observeBattle(state, actor)) : { command: { type: 'start' as const } };
      expect(decision, `sem decisão na rodada ${state.round}`).not.toBeNull();
      const result = applyCommand(state, decision!.command);
      expect(result.ok, `rodada ${state.round}: ${JSON.stringify(decision!.command)} ${!result.ok ? result.error : ''}`).toBe(true);
      if (!result.ok) break;
      actions.add(decision!.command.type);
      state = result.state; steps++;
    }
    expect(state.phase, `duelo interrompido na rodada ${state.round} após ${steps} comandos`).toBe('ended');
    expect(actions.has('play')).toBe(true);
    expect(actions.has('attack')).toBe(true);
    expect(actions.has('block')).toBe(true);
    expect(state.winner).not.toBeNull();
  }, 20000);
});
