import type { CardCatalog } from '../content/schema.js';
import type { BattleState, BoardUnit, CardInstance, CombatState, PendingEffect, PlayerId } from '../battle/types.js';

export interface PublicPlayer {protagonist?:import('../content/schema.js').Champion;
  board: BoardUnit[]; discard: CardInstance[]; deathRecords: CardInstance[];
  nexus: number; maxNexus: number; mana: number; maxMana: number; reserve: number; fatigue: number;
  upgradeDiscount?:number; upgradeDiscountRound?:number; fireDiscount?:number; fireDiscountRound?:number; fireBoost?:number; fireBoostRound?:number;
  mulliganUsed: boolean; equipmentDiscountUsedRound?: number; handCount: number; deckCount: number;
}
export interface AiObservation {relicState?:BattleState['relicState'];laboratory?:BattleState['laboratory'];laboratoryChoices?:BattleState['laboratoryChoices'];encounter?:Omit<NonNullable<BattleState['encounter']>,'kingDeck'>;talentLoadouts?:BattleState['talentLoadouts'];talentState?:BattleState['talentState'];formChoices?:BattleState['formChoices'];heroProgress?:BattleState['heroProgress'];executionMarks?:BattleState['executionMarks'];roundEnding?:boolean;
  choices?: BattleState['choices']; allyProgress?: BattleState['allyProgress'];
  self: PlayerId; ownHand: CardInstance[]; players: Record<PlayerId, PublicPlayer>; definitions: CardCatalog;
  phase: BattleState['phase']; round: number; attackOwner: PlayerId | null; priorityOwner: PlayerId | null;
  attackAvailable: boolean; consecutivePasses: number; combat: CombatState | null; stack: PendingEffect[];
  stackReturnOwner: PlayerId | null; equippedIdentities: Record<PlayerId, string[]>;
  evolvedKylast: Record<PlayerId, boolean>; kylastEquipmentSlots: number;
}

// Explicit allowlist. No spread of BattleState/PlayerState across this boundary.
export function observeBattle(state: BattleState, self: PlayerId): AiObservation {
  const player = (id: PlayerId): PublicPlayer => {
    const p = state.players[id];
    return { protagonist:p.protagonist,board: structuredClone(p.board), discard: structuredClone(p.discard), deathRecords: structuredClone(p.deathRecords),
      nexus: p.nexus, maxNexus: p.maxNexus, mana: p.mana, maxMana: p.maxMana, reserve: p.reserve, fatigue: p.fatigue,
      upgradeDiscount:p.upgradeDiscount,upgradeDiscountRound:p.upgradeDiscountRound,fireDiscount:p.fireDiscount,fireDiscountRound:p.fireDiscountRound,fireBoost:p.fireBoost,fireBoostRound:p.fireBoostRound,
      mulliganUsed: p.mulliganUsed, equipmentDiscountUsedRound: p.equipmentDiscountUsedRound,
      handCount: p.hand.length, deckCount: p.deck.length };
  };
  const known=new Set([...state.players[self].hand,...Object.values(state.players).flatMap(p=>[...p.discard,...p.deathRecords,...p.board.map(u=>u.card),...p.board.flatMap(u=>(u.equipment??[]).map(g=>g.card))]),...state.stack.filter(p=>p.mode!=='colar-next').map(p=>p.source)].map(c=>c.definitionId));
  for(const pending of state.stack)if(pending.spellId)known.add(pending.spellId);
  const definitions=Object.fromEntries(Object.entries(state.definitions).filter(([id,d])=>!d.baseId||known.has(id)));
  const encounter=state.encounter?(({kingDeck,...publicData})=>publicData)(state.encounter):undefined;
  return {relicState:structuredClone(state.relicState),laboratory:structuredClone(state.laboratory),laboratoryChoices:structuredClone(state.laboratoryChoices),encounter:structuredClone(encounter),talentLoadouts:structuredClone(state.talentLoadouts),talentState:structuredClone(state.talentState),formChoices:structuredClone(state.formChoices),heroProgress:structuredClone(state.heroProgress),executionMarks:structuredClone(state.executionMarks),roundEnding:state.roundEnding,choices:state.choices?.map(c=>({owner:c.owner,options:c.owner===self?[...c.options]:[]})),allyProgress:structuredClone(state.allyProgress),self, ownHand: structuredClone(state.players[self].hand), players: { p1: player('p1'), p2: player('p2') },
    definitions: structuredClone(definitions), phase: state.phase, round: state.round, attackOwner: state.attackOwner,
    priorityOwner: state.priorityOwner, attackAvailable: state.attackAvailable, consecutivePasses: state.consecutivePasses,
    combat: structuredClone(state.combat), stack: structuredClone(state.stack.filter(p => p.mode !== 'colar-next')),
    stackReturnOwner: state.stackReturnOwner, equippedIdentities: structuredClone(state.equippedIdentities),
    evolvedKylast: structuredClone(state.evolvedKylast), kylastEquipmentSlots: state.kylastEquipmentSlots };
}

// Validation/simulation sandbox from permitted information ONLY. Never predicts draws or random effects.
export function planningState(observation: AiObservation): BattleState {
  const o = structuredClone(observation);
  const player = (id: PlayerId) => {
    const { handCount: _handCount, deckCount: _deckCount, ...publicData } = o.players[id];
    return { ...publicData, hand: id === o.self ? o.ownHand : [], deck: [] as CardInstance[] };
  };
  return {relicState:structuredClone(o.relicState),laboratory:o.laboratory,laboratoryChoices:o.laboratoryChoices,encounter:o.encounter,publicDeckCounts:{p1:o.players.p1.deckCount,p2:o.players.p2.deckCount},talentLoadouts:o.talentLoadouts,talentState:o.talentState,formChoices:o.formChoices,heroProgress:o.heroProgress,executionMarks:o.executionMarks,roundEnding:o.roundEnding,choices:o.choices,allyProgress:o.allyProgress,version: 1, rngAlgorithm: 'lcg32-v1', rngState: 0, players: { p1: player('p1'), p2: player('p2') },
    definitions: o.definitions, phase: o.phase, round: o.round, attackOwner: o.attackOwner, priorityOwner: o.priorityOwner,
    attackAvailable: o.attackAvailable, consecutivePasses: o.consecutivePasses, combat: o.combat, stack: o.stack,
    stackReturnOwner: o.stackReturnOwner, equippedIdentities: o.equippedIdentities, evolvedKylast: o.evolvedKylast,
    kylastEquipmentSlots: o.kylastEquipmentSlots, responseWindowOpened: false,
    nextEffectId: Math.max(0, ...o.stack.map(p => p.id)) + 1, winner: null };
}




