import type { CardCatalog, Champion, Keyword } from '../content/schema.js';
import type {TalentId} from '../profile/talents.js';
import type {TalentBattleState} from './kylast-talents.js';
export type PlayerId = 'p1' | 'p2';
export const opponent = (player: PlayerId): PlayerId => player === 'p1' ? 'p2' : 'p1';
export interface CardInstance { instanceId: string; definitionId: string; generated?: boolean; stolenFrom?:PlayerId }
export interface EquippedCard { card: CardInstance; used: boolean; owner?: PlayerId }
export interface BoardUnit {
  card: CardInstance; attack: number; health: number; maxHealth: number; form?:'bear'|'tiger'; formPower?:number; temporaryKeywords?:Keyword[]; stunnedUntilRound?: number;
  equipment?: EquippedCard[]; evolved?: boolean;
  triggerRounds?: Record<string,number>; fireShields?: {owner:PlayerId; round:number; bonus:number}[];
  keywords?: Keyword[]; roundAttackBonus?: number; firstEquipRound?: number;
}
export interface CombatLane { laboratoryUsedWeapons?:string[];laboratoryAfterAttack?:boolean;laboratoryBlocked?:boolean; talentFirstWeapon?:string; talentPrepared?:boolean; attackerId: string; blockerId: string | null; blocked: boolean; brokeBlock?:boolean; weapons: (string | null)[] }
export interface CombatState { awaitingBlocks?:boolean; pendingBlockers?:string[]; laneIndex?:number; strikeIndex?:number; attacker: PlayerId; stage: 'blocking' | 'triggers' | 'responses'; lanes: CombatLane[] }
export type TargetRef =
  | { kind: 'unit'; player: PlayerId; instanceId: string }
  | { kind: 'nexus'; player: PlayerId }
  | { kind: 'stack'; effectId: number };
export interface PendingEffect {
  paidTalentGrip?:boolean;
  damageBonus?:number;kingDischarge?:boolean; abilitySourceId?:string; abilityAmount?:number;
  id: number; owner: PlayerId; source: CardInstance; targets: TargetRef[];
  mode?: 'arsenal' | 'banjo' | 'colar' | 'colar-card' | 'colar-next' | 'ability'; spellId?: string; equipmentId?: string; replaceEquipmentId?: string;
  recipient?: PlayerId; activation?: 'arsenal'; ignoreSide?: boolean;
}
export interface PlayerState {
  protagonist?:Champion;
  deck: CardInstance[];
  hand: CardInstance[];
  discard: CardInstance[];
  nexus: number;
  maxNexus: number;
  mana: number;
  maxMana: number;
  reserve: number;
  fatigue: number;
  mulliganUsed: boolean;
  board: BoardUnit[];
  deathRecords: CardInstance[];
  upgradeDiscount?:number; upgradeDiscountRound?:number; fireDiscount?:number; fireDiscountRound?:number; fireBoost?:number; fireBoostRound?:number;
  equipmentDiscountUsedRound?: number;
}
export interface AllyProgress { upgrades: number; fire: number; fireRound: number; fireRoundNumber: number; healing: number; evolved: Partial<Record<Champion, boolean>> }
export interface UpgradeChoice { owner: PlayerId; options: string[] }
export interface ExpansionProgress {deaths:number;stolen:number;music:number;executions:number;musicRound?:number;kuaraRound?:number;lazaroRound?:number}
export interface BattleState {
  relicState?:import('./relics.js').BattleRelics; encounter?:import('./encounters.js').EncounterState;laboratory?:import('./laboratory.js').LaboratoryState;laboratoryChoices?:{owner:PlayerId;sourceId:string;options:string[]}[]; publicDeckCounts?:Record<PlayerId,number>;
  talentLoadouts?:Partial<Record<PlayerId,TalentId[]>>;talentState?:Partial<Record<PlayerId,TalentBattleState>>;
  heroProgress?:Record<PlayerId,ExpansionProgress>;formChoices?:{owner:PlayerId;unitId:string}[];
  executionMarks?:Partial<Record<PlayerId,{sourceId:string;targetId:string}>>;
  deathCauses?:Record<string,PlayerId>;roundEnding?:boolean;
  runAliases?:Partial<Record<PlayerId,Record<string,string>>>; runBattleId?: string;
  allyProgress?: Record<PlayerId, AllyProgress>; choices?: UpgradeChoice[];
  version: 1;
  rngAlgorithm: 'lcg32-v1';
  players: Record<PlayerId, PlayerState>;
  round: number;
  attackOwner: PlayerId | null;
  priorityOwner: PlayerId | null;
  phase: 'opening' | 'actions' | 'ended';
  rngState: number;
  consecutivePasses: number;
  winner: PlayerId | 'draw' | null;
  definitions: CardCatalog;
  stack: PendingEffect[];
  stackReturnOwner: PlayerId | null;
  nextEffectId: number;
  combat: CombatState | null;
  attackAvailable: boolean;
  equippedIdentities: Record<PlayerId, string[]>;
  evolvedKylast: Record<PlayerId, boolean>;
  kylastEquipmentSlots: number;
  responseWindowOpened: boolean;
}
export type BattleEvent = | {type:'encounterPhase';phase:'king'}
  | { type: 'cardDrawn'; player: PlayerId; instanceId: string }
  | { type: 'cardDiscarded'; player: PlayerId; instanceId: string }
  | { type: 'fatigueDamage'; player: PlayerId; amount: number }
  | { type: 'initiativeRolled'; p1: number; p2: number }
  | { type: 'roundStarted'; round: number; attackOwner: PlayerId }
  | { type: 'battleEnded'; winner: PlayerId | 'draw' }
  | { type: 'cardPlayed'; player: PlayerId; instanceId: string }
  | { type: 'unitEntered'; player: PlayerId; instanceId: string; position: number }
  | { type: 'unitDied'; player: PlayerId; instanceId: string }
  | { type: 'attackDeclared'; player: PlayerId; attackerIds: string[] }
  | { type: 'blocksDeclared'; player: PlayerId }
  | { type: 'combatEnded' }
  | { type: 'equipmentAttached'; player: PlayerId; equipmentId: string; unitId: string }
  | { type: 'cardReturned'; player: PlayerId; instanceId: string }
  | { type: 'unitRemoved'; player: PlayerId; instanceId: string; reason: 'recall' | 'obliterate' }
  | { type: 'unitStunned'; player: PlayerId; instanceId: string }
  | { type: 'championEvolved'; player: PlayerId; champion: Champion }
  | { type: 'effectQueued'; effectId: number }
  | { type: 'cardActivated'; player: PlayerId; instanceId: string; effectId: number }
  | { type: 'effectResolved' | 'effectFizzled' | 'effectCountered'; effectId: number }
  | { type: 'damageApplied' | 'healingApplied' | 'armorApplied'; target: TargetRef; amount: number };
export type Result =
  | { ok: true; state: BattleState; events: BattleEvent[] }
  | { ok: false; state: BattleState; error: string };






