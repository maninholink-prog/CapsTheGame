import { chooseAiCommand } from '../ai/policy.js';
import { observeBattle } from '../ai/observation.js';
import { dispatch, isAiTurn } from './session.js';
import type { BattleSession } from './session.js';
import type { BattleState } from '../battle/types.js';
import type { AiObservation } from '../ai/observation.js';
import type { AiDecision } from '../ai/policy.js';

interface Port { getSession(): BattleSession; commit(session: BattleSession): void }
export function createAiController(port: Port, options: { delayMs?: number; decide?: (observation: AiObservation) => AiDecision | null } = {}) {
  let timer: ReturnType<typeof setTimeout> | null = null;
  let ticket: BattleState | null = null;
  let stopped: BattleState | null = null;
  function cancel() {
    if (timer !== null) clearTimeout(timer);
    timer = null; ticket = null;
  }
  function schedule() {
    const session = port.getSession();
    if (!isAiTurn(session) || stopped === session.state) { cancel(); return; }
    if (timer !== null && ticket === session.state) return;
    cancel(); ticket = session.state;
    const captured = session.state;
    timer = setTimeout(() => {
      timer = null; ticket = null;
      const current = port.getSession();
      if (current.state !== captured || !isAiTurn(current)) return;
      try {
        const decision = (options.decide ?? chooseAiCommand)(observeBattle(current.state, 'p2'));
        const result = decision ? dispatch(current, decision.command) : current;
        if (result.state === current.state) {
          stopped = current.state;
          port.commit({ ...current, error: 'IA pausada: não foi possível confirmar uma ação válida. Inicie outra batalha para tentar novamente.' });
        } else port.commit(result);
      } catch {
        stopped = current.state;
        port.commit({ ...current, error: 'IA pausada ao calcular uma ação. Inicie outra batalha para tentar novamente.' });
      }
    }, options.delayMs ?? 500);
  }
  return { schedule, cancel };
}
