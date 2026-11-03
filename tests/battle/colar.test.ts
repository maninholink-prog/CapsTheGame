import { afterEach, describe, expect, it, vi } from 'vitest';
import { applyCommand } from '../../src/battle/commands.js';
import * as random from '../../src/battle/random.js';
import { accepted, give, pass, play, putUnit } from './fixtures.js';
import { enterKylast, equip, kylastFixture, turn } from './kylast-fixtures.js';
import type { BattleState } from '../../src/battle/types.js';

afterEach(() => vi.restoreAllMocks());
function fixture(): BattleState {
  const state = kylastFixture();
  putUnit(state, 'p1', 'bearer');
  return state;
}
function start(state: BattleState): BattleState {
  const colar = give(state, 'p1', 'colar');
  return play(state, 'p1', colar, [{ kind: 'unit', player: 'p1', instanceId: 'bearer' }]);
}
const chooseFirst = () => vi.spyOn(random, 'nextInt').mockImplementation((state, min) => ({ value: min, state: (state + 1) >>> 0 }));
const chooseLast = () => vi.spyOn(random, 'nextInt').mockImplementation((state, _min, max) => ({ value: max, state: (state + 1) >>> 0 }));

describe('Colar do Deus Enganador', () => {
  it('gatilho pode ser anulado sem descartar o equipamento ou ativar cartas', () => {
    let state = fixture();
    const own = give(state, 'p1', 'spark');
    const counter = give(state, 'p2', 'counter');
    state = start(state);
    expect(state.stack.at(-1)!.mode).toBe('colar');
    state = play(state, 'p2', counter, [{ kind: 'stack', effectId: state.stack.at(-1)!.id }]);
    state = pass(pass(state));
    expect(state.players.p1.hand.map(c => c.instanceId)).toContain(own);
    expect(state.players.p1.board[0].equipment![0].card.definitionId).toBe('colar');
    expect(state.players.p1.discard.some(c => c.definitionId === 'colar')).toBe(false);
  });

  it('Explosiva sorteada revela carta sem alvos e permite resposta antes de resolver', () => {
    let state = fixture();
    const spark = give(state, 'p1', 'spark');
    const counter = give(state, 'p2', 'counter');
    state = start(state);
    state = pass(pass(state));
    const selected = state.stack.at(-1)!;
    expect(selected.mode).toBe('colar-card');
    expect(selected.source.instanceId).toBe(spark);
    expect(selected.targets).toEqual([]);
    expect(state.players.p1.nexus).toBe(20);
    expect(state.players.p2.nexus).toBe(20);
    state = play(state, 'p2', counter, [{ kind: 'stack', effectId: selected.id }]);
    state = pass(pass(state));
    expect(state.stack).toHaveLength(0);
    expect(state.players.p1.discard.map(c => c.instanceId)).toContain(spark);
    expect(state.players.p1.nexus + state.players.p2.nexus).toBe(40);
  });

  it('ignora lado no sorteio de alvo, podendo causar dano ao próprio Nexus', () => {
    let state = fixture();
    chooseFirst();
    give(state, 'p1', 'fire');
    state = pass(pass(start(state)));
    state = pass(pass(state));
    expect(state.players.p1.nexus).toBe(17);
    expect(state.players.p2.nexus).toBe(20);
  });

  it('só sorteia o adversário depois de a primeira carta alterar a mão dele', () => {
    let state = fixture();
    chooseLast();
    putUnit(state, 'p2', 'victim');
    state.definitions.recall = { id: 'recall', kind: 'spell', cost: 0, speed: 'fast',
      target: { kind: 'unit', side: 'enemy', min: 1, max: 1 }, effect: { type: 'recall' } };
    give(state, 'p1', 'recall');
    state = pass(pass(start(state)));
    expect(state.players.p2.hand).toHaveLength(0);
    state = pass(pass(state));
    expect(state.players.p2.board).toHaveLength(0);
    expect(state.stack.at(-1)!.mode).toBe('colar-card');
    expect(state.stack.at(-1)!.source.instanceId).toBe('victim');
    expect(state.players.p2.hand).toHaveLength(0);
    state = pass(pass(state));
    expect(state.players.p2.board[0].card.instanceId).toBe('victim');
  });

  it('unidade em campo cheio é consumida sem substituir ou criar registro de morte', () => {
    let state = fixture();
    for (let i = 0; i < 4; i++) putUnit(state, 'p1', `u${i}`);
    const unit = give(state, 'p1', 'unit');
    state = pass(pass(start(state)));
    expect(state.players.p1.board).toHaveLength(5);
    state = pass(pass(state));
    expect(state.players.p1.board).toHaveLength(5);
    expect(state.players.p1.deathRecords).toHaveLength(0);
    expect(state.players.p1.discard.map(c => c.instanceId)).toContain(unit);
  });

  it('continuações internas não são alvos de anulação e carta sem alvo é consumida', () => {
    let state = fixture();
    const counter = give(state, 'p1', 'counter');
    const reply = give(state, 'p2', 'counter');
    state = pass(pass(start(state)));
    const marker = state.stack.find(p => p.mode === 'colar-next')!;
    const before = structuredClone(state);
    expect(applyCommand(state, { type: 'play', player: 'p2', instanceId: reply,
      targets: [{ kind: 'stack', effectId: marker.id }] }).ok).toBe(false);
    expect(state).toEqual(before);
    // Keep second hand empty to isolate the first card's lack of target.
    state.players.p2.hand = [];
    state = pass(pass(state));
    expect(state.players.p1.discard.map(c => c.instanceId)).toContain(counter);
    expect(state.stack).toHaveLength(0);
  });

  it('mãos vazias pulam ambos e equipamento removido não cancela gatilho já disparado', () => {
    let state = fixture();
    state = pass(pass(start(state)));
    expect(state.stack).toHaveLength(0);
    state = fixture();
    chooseFirst();
    const unit = give(state, 'p1', 'unit');
    const fire = give(state, 'p2', 'fire');
    state.players.p1.board[0].health = 3;
    state = start(state);
    state = play(state, 'p2', fire, [{ kind: 'unit', player: 'p1', instanceId: 'bearer' }]);
    state = pass(pass(state));
    expect(state.players.p1.board).toHaveLength(0);
    expect(state.stack.at(-1)!.source.instanceId).toBe(unit);
    expect(state.players.p1.hand.some(c => c.definitionId === 'colar')).toBe(true);
  });

  it('equipar outro Colar gratuitamente abre resposta ao novo gatilho antes de continuar', () => {
    let state = fixture();
    chooseLast();
    putUnit(state, 'p1', 'free-bearer');
    give(state, 'p1', 'colar', 'nested');
    state = pass(pass(start(state)));
    expect(state.stack.at(-1)!.mode).toBe('colar-card');
    state = pass(pass(state));
    expect(state.stack.at(-1)!.mode).toBe('colar');
    expect(state.players.p1.mana).toBe(8);
    state = pass(pass(state));
    expect(state.stack).toHaveLength(0);
    expect(state.players.p1.board.flatMap(u => u.equipment ?? [])).toHaveLength(2);
  });

  it('derrota simultânea encerra sem sortear carta adversária pendente', () => {
    let state = fixture();
    give(state, 'p1', 'blast');
    const opponent = give(state, 'p2', 'unit');
    state = pass(pass(start(state)));
    state = pass(pass(state));
    expect(state.phase).toBe('ended');
    expect(state.winner).toBe('draw');
    expect(state.players.p2.hand.map(c => c.instanceId)).toContain(opponent);
  });

  it('Colar equipado por Troca pausa o combate até terminar suas cartas', () => {
    let state = enterKylast(kylastFixture());
    chooseLast();
    const second = give(state, 'p1', 'kylast', '2');
    const colar = give(state, 'p1', 'colar');
    give(state, 'p1', 'spark');
    state = accepted(applyCommand(turn(state), { type: 'attack', player: 'p1', attackers: [{ unitId: 'p1_kylast', weapons: [null] }] }));
    state = accepted(applyCommand(state, { type: 'block', player: 'p2', assignments: [] }));
    state = accepted(applyCommand(state, { type: 'play', player: 'p1', instanceId: second, equipmentId: colar,
      targets: [{ kind: 'unit', player: 'p1', instanceId: 'p1_kylast' }] }));
    state = pass(pass(state));
    expect(state.combat).not.toBeNull();
    expect(state.players.p2.nexus).toBe(20);
    state = pass(pass(state));
    expect(state.stack.at(-1)!.mode).toBe('colar-card');
    expect(state.players.p2.nexus).toBe(20);
    state = pass(pass(state));
    expect(state.combat).toBeNull();
    expect(state.players.p2.nexus).toBe(16);
  });

  it('Troca gratuita sorteada libera espaço da arma antes de devolver equipamento substituído', () => {
    let state = enterKylast(kylastFixture());
    state = equip(state, 'sword-kylast', 'old1');
    state = equip(turn(state), 'sword-kylast', 'old2');
    state = turn(state);
    putUnit(state, 'p1', 'bearer');
    chooseFirst();
    give(state, 'p1', 'kylast', '2');
    state = pass(pass(start(state)));
    give(state, 'p1', 'alastor');
    for (let i = 0; i < 9; i++) give(state, 'p1', 'unit', `${i}`);
    expect(state.players.p1.hand).toHaveLength(10);
    state = pass(pass(state));
    expect(state.players.p1.hand).toHaveLength(10);
    expect(state.players.p1.hand.some(c => c.instanceId === 'p1_sword-kylastold1')).toBe(true);
    expect(state.players.p1.discard.some(c => c.instanceId === 'p1_sword-kylastold1')).toBe(false);
  });

  it('equipamento ativado em inimigo volta à mão de seu dono físico', () => {
    let state = fixture();
    chooseLast();
    putUnit(state, 'p2', 'enemy');
    const sword = give(state, 'p1', 'sword-kylast');
    state = pass(pass(start(state)));
    state = pass(pass(state));
    expect(state.players.p2.board[0].equipment![0].card.instanceId).toBe(sword);
    state.definitions.recall = { id: 'recall', kind: 'spell', cost: 0, speed: 'fast',
      target: { kind: 'unit', side: 'ally', min: 1, max: 1 }, effect: { type: 'recall' } };
    const recall = give(state, 'p2', 'recall');
    state = play(state, 'p2', recall, [{ kind: 'unit', player: 'p2', instanceId: 'enemy' }]);
    state = pass(pass(state));
    expect(state.players.p1.hand.map(c => c.instanceId)).toContain(sword);
    expect(state.players.p2.hand.map(c => c.instanceId)).not.toContain(sword);
  });

  it('Wang ativado pelo Colar busca equipamento e descarta a compra se a mão estiver cheia', () => {
    let state = fixture();
    give(state, 'p1', 'wang-jianxi');
    state.players.p1.deck = [{ instanceId: 'deck-sword', definitionId: 'sword-kylast' }];
    state = pass(pass(start(state)));
    for (let i = 0; i < 10; i++) give(state, 'p1', 'unit', `fill-${i}`);
    state = pass(pass(state));
    expect(state.players.p1.board.some(u => u.card.definitionId === 'wang-jianxi')).toBe(true);
    expect(state.players.p1.hand).toHaveLength(10);
    expect(state.players.p1.discard.map(c => c.instanceId)).toContain('deck-sword');
    expect(state.players.p1.deck).toHaveLength(0);
    expect(state.players.p1.fatigue).toBe(0);
  });

  it('a mesma semente e os mesmos comandos reproduzem a sequência do Colar sem mutar entradas', () => {
    const run = () => {
      let state = fixture();
      give(state, 'p1', 'fire');
      give(state, 'p2', 'spark');
      state = start(state);
      const snapshot = structuredClone(state);
      const selected = pass(pass(state));
      expect(state).toEqual(snapshot);
      state = pass(pass(selected));
      state = pass(pass(state));
      return state;
    };
    expect(run()).toEqual(run());
  });
});
