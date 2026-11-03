import { describe, expect, it } from 'vitest';
import { chooseAiCommand } from '../../src/ai/policy.js';
import { observeBattle } from '../../src/ai/observation.js';
import { applyCommand } from '../../src/battle/commands.js';
import { createSession } from '../../src/ui/session.js';
import { accepted, fixture, give, play, putUnit } from '../battle/fixtures.js';
import { enterKylast, equip, kylastFixture, turn } from '../battle/kylast-fixtures.js';

describe('política básica', () => {
  it('confirma mulligan na vez correta e rejeita agir fora da prioridade', () => {
    const opening = createSession(131).state;
    expect(chooseAiCommand(observeBattle(opening, 'p2'))).toBeNull();
    const state = accepted(applyCommand(opening, { type: 'mulligan', player: 'p1', instanceIds: [] }));
    const decision = chooseAiCommand(observeBattle(state, 'p2'))!;
    expect(decision.command.type).toBe('mulligan');
    expect(applyCommand(state, decision.command).ok).toBe(true);
    expect(chooseAiCommand(observeBattle(fixture(), 'p2'))).toBeNull();
  });

  it('joga unidade útil em vez de passar sem gastar sua mana', () => {
    const state = fixture(); state.priorityOwner = 'p2';
    const id = give(state, 'p2', 'unit');
    const decision = chooseAiCommand(observeBattle(state, 'p2'))!;
    expect(decision.command).toMatchObject({ type: 'play', instanceId: id });
    expect(applyCommand(state, decision.command).ok).toBe(true);
  });

  it('prioriza dano letal conhecido', () => {
    const state = fixture(); state.priorityOwner = 'p2'; state.players.p1.nexus = 3;
    give(state, 'p2', 'unit'); const fire = give(state, 'p2', 'fire');
    const decision = chooseAiCommand(observeBattle(state, 'p2'))!;
    expect(decision.command).toMatchObject({ type: 'play', instanceId: fire, targets: [{ kind: 'nexus', player: 'p1' }] });
  });

  it('anula magia letal antes de passar a resposta', () => {
    let state = fixture(); state.players.p2.nexus = 3;
    const fire = give(state, 'p1', 'fire'); const counter = give(state, 'p2', 'counter');
    state = play(state, 'p1', fire, [{ kind: 'nexus', player: 'p2' }]);
    const decision = chooseAiCommand(observeBattle(state, 'p2'))!;
    expect(decision.command).toMatchObject({ type: 'play', instanceId: counter, targets: [{ kind: 'stack', effectId: state.stack[0].id }] });
  });

  it('bloqueia ataque letal mesmo perdendo uma unidade fraca', () => {
    let state = fixture(); state.attackOwner = 'p1'; state.attackAvailable = true;
    putUnit(state, 'p1', 'attacker'); state.players.p1.board[0].attack = 5;
    putUnit(state, 'p2', 'blocker', 1); state.players.p2.nexus = 2;
    state = accepted(applyCommand(state, { type: 'attack', player: 'p1', attackers: [{ unitId: 'attacker' }] }));
    const decision = chooseAiCommand(observeBattle(state, 'p2'))!;
    expect(decision.command).toMatchObject({ type: 'block', assignments: [{ attackerId: 'attacker', blockerId: 'blocker' }] });
  });

  it('prepara Banjo mirando o bloqueador para abrir caminho', () => {
    let state = enterKylast(kylastFixture()); state = turn(equip(state, 'banjo'));
    putUnit(state, 'p2', 'blocker');
    state = accepted(applyCommand(state, { type: 'attack', player: 'p1', attackers: [{ unitId: 'p1_kylast', weapons: ['p1_banjo'] }] }));
    state = accepted(applyCommand(state, { type: 'block', player: 'p2', assignments: [{ attackerId: 'p1_kylast', blockerId: 'blocker' }] }));
    const decision = chooseAiCommand(observeBattle(state, 'p1'))!;
    expect(decision.command).toMatchObject({ type: 'prepareAttack', banjos: [{ equipmentId: 'p1_banjo', targetId: 'blocker' }] });
    expect(applyCommand(state, decision.command).ok).toBe(true);
  });

  it('mesma informação pública produz mesma decisão e não altera o jogo', () => {
    const state = fixture(); state.priorityOwner = 'p2';
    give(state, 'p1', 'fire'); give(state, 'p2', 'unit'); give(state, 'p2', 'fire');
    const altered = structuredClone(state); altered.players.p1.hand[0].definitionId = 'counter';
    altered.players.p1.deck.reverse(); altered.rngState = 42;
    const snapshot = structuredClone(state);
    const observation = observeBattle(state, 'p2'); const before = structuredClone(observation);
    expect(chooseAiCommand(observation)).toEqual(chooseAiCommand(observeBattle(altered, 'p2')));
    expect(state).toEqual(snapshot); expect(observation).toEqual(before);
  });

  it('equipa arma útil e consegue jogar a segunda cópia como Troca', () => {
    const state = enterKylast(kylastFixture()); state.attackAvailable = false;
    const sword = give(state, 'p1', 'sword-kylast');
    expect(chooseAiCommand(observeBattle(state, 'p1'))!.command).toMatchObject({ type: 'play', instanceId: sword });
    // Same gear is playable as a response only through the second champion copy.
    const second = give(state, 'p1', 'kylast', '2');
    const threat = give(state, 'p2', 'fire');
    state.priorityOwner = 'p2';
    const responding = play(state, 'p2', threat, [{ kind: 'nexus', player: 'p1' }]);
    const choice = chooseAiCommand(observeBattle(responding, 'p1'))!;
    expect(choice.command).toMatchObject({ type: 'play', instanceId: second, equipmentId: sword });
    expect(applyCommand(responding, choice.command).ok).toBe(true);
  });
});
