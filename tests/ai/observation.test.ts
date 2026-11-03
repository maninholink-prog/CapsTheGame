import { describe, expect, it } from 'vitest';
import { observeBattle, planningState } from '../../src/ai/observation.js';
import { fixture, give } from '../battle/fixtures.js';

describe('fronteira de informação da IA', () => {
  it('não entrega mãos inimigas, conteúdo dos decks ou RNG à política', () => {
    const state = fixture();
    give(state, 'p1', 'fire'); give(state, 'p2', 'heal');
    const observation = observeBattle(state, 'p2');
    expect(observation.ownHand.map(c => c.definitionId)).toEqual(['heal']);
    for (const player of Object.values(observation.players)) {
      expect(player).not.toHaveProperty('hand'); expect(player).not.toHaveProperty('deck');
    }
    expect(observation).not.toHaveProperty('rngState');
    expect(observation.players.p1.handCount).toBe(1);
    const synthetic = planningState(observation);
    expect(synthetic.players.p1.hand).toEqual([]);
    expect(synthetic.players.p1.deck).toEqual([]);
    expect(synthetic.players.p2.deck).toEqual([]);
  });

  it('alterações ocultas não interferem na observação e os clones não alteram o jogo', () => {
    const state = fixture(); give(state, 'p1', 'fire'); give(state, 'p2', 'heal');
    const altered = structuredClone(state);
    altered.players.p1.hand[0] = { instanceId: 'secret', definitionId: 'unit' };
    altered.players.p1.deck.reverse(); altered.players.p2.deck.reverse(); altered.rngState = 999;
    expect(observeBattle(state, 'p2')).toEqual(observeBattle(altered, 'p2'));
    const observation = observeBattle(state, 'p2');
    observation.ownHand.length = 0; observation.players.p1.nexus = 1;
    expect(state.players.p2.hand).toHaveLength(1); expect(state.players.p1.nexus).toBe(20);
  });
});
