import { describe, expect, it } from 'vitest';
import { createBattle } from '../../src/battle/setup.js';
import { applyCommand } from '../../src/battle/commands.js';
import { drawOne } from '../../src/battle/draw.js';
import { advanceRound } from '../../src/battle/round.js';
import { opponent } from '../../src/battle/types.js';
import type { BattleState, PlayerId, Result } from '../../src/battle/types.js';

function accepted(result: Result): BattleState {
  if (!result.ok) throw new Error(result.error);
  return result.state;
}
function started(): BattleState {
  const cards = (prefix: string) => Array.from({ length: 20 }, (_, i) => ({ instanceId: `${prefix}${i}`, definitionId: `c${i}` }));
  let state = createBattle({ p1: cards('a'), p2: cards('b') }, 3);
  for (const player of ['p1', 'p2'] as const)
    state = accepted(applyCommand(state, { type: 'mulligan', player, instanceIds: [] }));
  return accepted(applyCommand(state, { type: 'start' }));
}
function pass(state: BattleState): BattleState {
  return accepted(applyCommand(state, { type: 'pass', player: state.priorityOwner! }));
}

describe('rodadas e compras', () => {
  it('dois passes transferem ataque, aumentam e recarregam mana e compram só para novo atacante', () => {
    const state = started();
    const oldOwner = state.attackOwner!;
    const newOwner = opponent(oldOwner);
    const handCounts = { p1: state.players.p1.hand.length, p2: state.players.p2.hand.length };
    state.players.p1.reserve = 2;
    state.players.p1.mana = 2;
    state.players.p1.maxMana = 2;
    const before = structuredClone(state);
    const first = pass(state);
    expect(first.round).toBe(1);
    expect(first.consecutivePasses).toBe(1);
    const next = pass(first);
    expect(next.round).toBe(2);
    expect(next.attackOwner).toBe(newOwner);
    expect(next.priorityOwner).toBe(newOwner);
    expect(next.players.p1.reserve).toBe(3);
    expect(next.players.p1.mana).toBe(3);
    expect(next.players.p2.mana).toBe(2);
    expect(next.players[newOwner].hand).toHaveLength(handCounts[newOwner] + 1);
    expect(next.players[oldOwner].hand).toHaveLength(handCounts[oldOwner]);
    expect(next.consecutivePasses).toBe(0);
    expect(state).toEqual(before);
  });

  it('mantém teto de mana 10 e reserva existente quando não sobra mana', () => {
    const state = started();
    for (const player of Object.values(state.players)) {
      player.maxMana = 10; player.mana = 0; player.reserve = 2;
    }
    const next = pass(pass(state));
    for (const player of Object.values(next.players)) {
      expect(player.maxMana).toBe(10);
      expect(player.mana).toBe(10);
      expect(player.reserve).toBe(2);
    }
  });

  it('queima compra com mão cheia, preservando a carta no descarte', () => {
    const state = started();
    const p = state.players.p1;
    p.hand.push(...p.deck.splice(0, 10 - p.hand.length));
    const top = p.deck[0];
    const count = p.deck.length;
    const result = drawOne(state, 'p1');
    const next = accepted(result);
    expect(next.players.p1.hand).toHaveLength(10);
    expect(next.players.p1.deck).toHaveLength(count - 1);
    expect(next.players.p1.discard).toContainEqual(top);
    expect(next.players.p1.fatigue).toBe(0);
    if (result.ok) expect(result.events.map(e => e.type)).toEqual(['cardDrawn', 'cardDiscarded']);
  });

  it('fadiga cresce 1, 2, 3 e não reinicia após repor cartas', () => {
    let state = started();
    state.players.p1.deck = [];
    for (const amount of [1, 2, 3]) {
      const result = drawOne(state, 'p1');
      state = accepted(result);
      if (result.ok) expect(result.events).toContainEqual({ type: 'fatigueDamage', player: 'p1', amount });
    }
    expect(state.players.p1.nexus).toBe(14);
    state.players.p1.deck.push({ instanceId: 'new', definitionId: 'new' });
    state = accepted(drawOne(state, 'p1'));
    state = accepted(drawOne(state, 'p1'));
    expect(state.players.p1.fatigue).toBe(4);
    expect(state.players.p1.nexus).toBe(10);
  });

  it('compra letal encerra a batalha e rejeita ações posteriores', () => {
    const state = started();
    state.players.p1.deck = [];
    state.players.p1.nexus = 1;
    const result = drawOne(state, 'p1');
    const next = accepted(result);
    expect(next.phase).toBe('ended');
    expect(next.winner).toBe('p2');
    expect(next.priorityOwner).toBeNull();
    if (result.ok) expect(result.events.at(-1)).toEqual({ type: 'battleEnded', winner: 'p2' });
    expect(applyCommand(next, { type: 'pass', player: 'p2' }).ok).toBe(false);
    expect(drawOne(next, 'p1').ok).toBe(false);
    expect(advanceRound(next).ok).toBe(false);
  });

  it('compra letal no início da rodada impede ações nessa rodada', () => {
    const state = started();
    const receiver = opponent(state.attackOwner!);
    state.players[receiver].deck = [];
    state.players[receiver].nexus = 1;
    const next = pass(pass(state));
    expect(next.phase).toBe('ended');
    expect(next.winner).toBe(opponent(receiver));
  });

  it('passe fora da prioridade e avanço sem dois passes não mudam estado ou RNG', () => {
    const state = started();
    const before = structuredClone(state);
    const result = applyCommand(state, { type: 'pass', player: opponent(state.priorityOwner!) });
    expect(result.ok).toBe(false);
    expect(result.state).toBe(state);
    expect(advanceRound(state).ok).toBe(false);
    expect(state).toEqual(before);
  });

  it('vencedor da iniciativa sofre fadiga se as cinco cartas esgotaram seu deck', () => {
    const cards = (p: PlayerId) => Array.from({ length: 5 }, (_, i) => ({ instanceId: `${p}${i}`, definitionId: `c${i}` }));
    let state = createBattle({ p1: cards('p1'), p2: cards('p2') }, 5);
    for (const player of ['p1', 'p2'] as const)
      state = accepted(applyCommand(state, { type: 'mulligan', player, instanceIds: [] }));
    state = accepted(applyCommand(state, { type: 'start' }));
    expect(state.players[state.attackOwner!].fatigue).toBe(1);
    expect(state.players[state.attackOwner!].nexus).toBe(19);
  });
});
