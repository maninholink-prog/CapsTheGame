import {createEnemyDeck} from '../content/felix.js';
import {caveiraDecks} from '../content/caveira.js';
import type {CaveiraDeck} from '../content/caveira.js';
import type {EnemyDeckVariant} from '../content/felix.js';
import {shuffle} from './random.js';
import {queueHeal} from './champions.js';
import {cleanupMarks} from './expansion.js';
import {syncFelixAura} from './laboratory.js';
import type {BattleState,BattleEvent,CardInstance,PendingEffect} from './types.js';
export interface EncounterState {id:EnemyDeckVariant|CaveiraDeck;phase:'single'|'felix'|'king';kingNexus:number;kingDeck?:CardInstance[];energy:number;activatedRound:number;pendingKing?:boolean;shutdownPending?:boolean;dischargeRound?:number;}
export const encounterNames:Record<EnemyDeckVariant|CaveiraDeck,string>={patrol:'Patrulha Mecânica',cryo:'Ala Criogênica',unstable:'Experimentos Instáveis',coils:'Oficina de Bobinas',infirmary:'Enfermaria Experimental',discharge:'Câmara de Descarga',labotomia:'Labotomia',tornado:'Tornado',dianamite:'Dianamite',felix:'Dr. Félix',king:'Rei Mecanizado',...Object.fromEntries(Object.entries(caveiraDecks).map(([id,deck])=>[id,deck.name]))} as Record<EnemyDeckVariant|CaveiraDeck,string>;
export function initEncounter(s:BattleState,id:EnemyDeckVariant|CaveiraDeck,enemyNexus:number){s.encounter={id,phase:id==='felix'?'felix':'single',kingNexus:enemyNexus,energy:6,activatedRound:0,...(id==='felix'?{kingDeck:createEnemyDeck('king',`${s.runBattleId??'encounter'}-king`)}:{})};}
export function deferFelixVictory(s:BattleState,p1Dead:boolean,p2Dead:boolean){if(!p1Dead&&p2Dead&&s.encounter?.phase==='felix'){s.encounter.pendingKing=true;return true;}return false;}
export function finishEncounterResolution(s:BattleState,events:BattleEvent[]){
 const e=s.encounter;if(!e||s.phase==='ended'||s.stack.length||s.combat||s.formChoices?.length||s.choices?.length||s.laboratoryChoices?.length)return;
 if(e.pendingKing&&s.players.p1.nexus>0){
  const old=s.players.p2,deck=shuffle(e.kingDeck??[],s.rngState);s.rngState=deck.state;
  s.players.p2={deck:deck.items.slice(5),hand:deck.items.slice(0,5),discard:[],board:[],deathRecords:[],nexus:e.kingNexus,maxNexus:e.kingNexus,mana:old.mana,maxMana:old.maxMana,reserve:0,fatigue:0,mulliganUsed:true};
  s.equippedIdentities.p2=[];s.evolvedKylast.p2=false;
  if(s.allyProgress)s.allyProgress.p2={upgrades:0,fire:0,fireRound:0,fireRoundNumber:0,healing:0,evolved:{}};
  if(s.heroProgress)s.heroProgress.p2={deaths:0,stolen:0,music:0,executions:0};
  if(s.laboratory){s.laboratory.upgrades.p2=0;delete s.laboratory.deathRounds.p2;}
  if(s.executionMarks)delete s.executionMarks.p2;
  cleanupMarks(s);syncFelixAura(s);e.phase='king';e.pendingKing=false;e.energy=6;e.activatedRound=s.round;e.dischargeRound=undefined;s.responseWindowOpened=false;
  events.push({type:'encounterPhase',phase:'king'});
 }
 if(e.phase==='king'&&e.shutdownPending&&s.players.p1.nexus>0){s.phase='ended';s.winner='p1';s.priorityOwner=null;events.push({type:'battleEnded',winner:'p1'});}
}
export function queueKingDischarge(s:BattleState,events:BattleEvent[]){const e=s.encounter;if(!e||e.phase!=='king'||e.energy<=0||s.round<=e.activatedRound||e.dischargeRound===s.round)return false;e.dischargeRound=s.round;queueHeal(s,'p2','lab-king-discharge',[],events);s.stack.at(-1)!.kingDischarge=true;return true;}
export function consumeKingDischarge(s:BattleState,p:PendingEffect,events:BattleEvent[]){const e=s.encounter;if(!p.kingDischarge||!e||e.phase!=='king')return;e.energy=Math.max(0,e.energy-1);if(e.energy===0)e.shutdownPending=true;}
