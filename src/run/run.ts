import {attachRelics} from '../battle/relics.js';
import type {RunRelics} from './relics.js';
import {createEnemyDeck} from '../content/felix.js';
import {createCaveiraDeck,isCaveiraDeck} from '../content/caveira.js';
import type {CaveiraDeck} from '../content/caveira.js';
import type {AdventureId} from './caveira-adventure.js';
import type {EnemyDeckVariant} from '../content/felix.js';
import {initEncounter} from '../battle/encounters.js';
import {applyBattleTalents} from '../battle/kylast-talents.js';
import type {TalentId} from '../profile/talents.js';
import {difficultyRules} from './difficulty.js';
import type {Difficulty} from './difficulty.js';
import {startingPackages} from '../content/deck-packages.js';
import {fullCatalog,createProtagonistDeck} from '../content/decks.js';
import {battleCoins,commonCoins,grantCoins} from './economy.js';
import {battleVariants} from './improvements.js';
import type {ImprovementId} from './improvements.js';
import type {ShopState} from './shops.js';
import type {MapProgress} from './map.js';
import type {RunSnapshot} from './adventure-state.js';
import {markVisited,finishRouteReward} from './adventure-state.js';
import {createBattle} from '../battle/setup.js';
import {shuffle,nextInt} from '../battle/random.js';
import {createKylastDeck,kylastCatalog} from '../content/kylast.js';
import {allyCatalog} from '../content/allies.js';
import type {Champion,Region} from '../content/schema.js';
import type {BattleState,CardInstance} from '../battle/types.js';
export const runCatalog=fullCatalog;
export const packages:Record<string,string[]>=startingPackages;
export interface RunState {relicRun?:RunRelics;adventure?:AdventureId;encounters?:Record<string,EnemyDeckVariant|CaveiraDeck>;caveiraHint?:true;caveiraAftermath?:'chart'|'cove'|'battle'|'won'|'lost';talents?:TalentId[];difficulty?:Difficulty;collection?:string[];coins:number;coinsEarned:number;coinsSpent:number;lastCoins:number;improvements:Record<string,ImprovementId[]>;shops:Record<string,ShopState>;map?:MapProgress;checkpoint?:RunSnapshot;entry?:RunSnapshot;revives:number;revivesSpent:number;seed:number;rngState:number;battle:number;battleSeed:number;stage:'relic'|'battle'|'recruit'|'reward'|'ready'|'won'|'lost'|'map'|'event'|'defeat'|'shop';deck:CardInstance[];group:Champion[];regions:Region[];nexus:number;maxNexus:number;allies:string[];rewards:string[];}
export function createRun(seed:number,protagonist:Champion='kylast',initialDeckIds?:readonly string[]):RunState {
 if(!Number.isInteger(seed)||seed<0||seed>0xffffffff)throw Error('Invalid run seed');
 return {coins:0,coinsEarned:0,coinsSpent:0,lastCoins:0,improvements:{},shops:{},revives:0,revivesSpent:0,seed,rngState:seed,battle:1,battleSeed:seed,stage:'battle',deck:createProtagonistDeck(protagonist,'run',initialDeckIds),group:[protagonist],regions:[...runCatalog[protagonist].regions!],nexus:20,maxNexus:20,allies:[],rewards:[]};
}
function battleId(r:RunState){return `run-${r.seed}-battle-${r.battle}-${r.battleSeed}`;}
export function encounterHealth(r:RunState,nodeId:string){
 const kind=r.map?.nodes.find(node=>node.id===nodeId)?.kind;
 return difficultyRules[r.difficulty??'common'].enemyNexus[kind==='finalboss'?2:kind==='midboss'||r.encounters?.[nodeId]==='caveira-megalodon'?1:0];
}
export function runBattle(r:RunState):BattleState {
 if(r.stage!=='battle')throw Error('Battle unavailable');
 const variants=battleVariants(runCatalog,r.improvements);
 const nodeId=r.map?.current??'';
 const encounter=r.caveiraAftermath==='battle'?'caveira-captain':r.adventure?r.encounters?.[nodeId]:undefined;
 const enemy=isCaveiraDeck(encounter)?createCaveiraDeck(encounter):encounter?createEnemyDeck(encounter,'-p2'):createKylastDeck('-p2');
 const b=createBattle({p1:r.deck.map((c,i)=>({...c,definitionId:variants.aliases[c.definitionId]??c.definitionId,instanceId:`${battleId(r)}-p1-${i}`})),p2:enemy},r.battleSeed,variants.definitions);
 const enemyNexus=encounterHealth(r,nodeId);b.players.p2.nexus=enemyNexus;b.players.p2.maxNexus=enemyNexus;
 applyBattleTalents(b,'p1',r.talents??[]);
 b.runAliases={p1:variants.aliases,p2:{}};
 b.runBattleId=battleId(r);if(encounter)initEncounter(b,encounter,enemyNexus);b.players.p1.nexus=r.nexus;b.players.p1.maxNexus=r.maxNexus;if(r.relicRun)attachRelics(b,r.relicRun.active);return b;
}
function isChampion(id:string){const d=runCatalog[id];return d.kind==='unit'&&!!d.champion;}
function count(r:RunState,id:string){return r.deck.filter(c=>c.definitionId===id).length;}
export function eligible(r:RunState,id:string){const d=runCatalog[id];return !!d&&!d.enemyOnly&&(!r.collection||r.collection.includes(id)||!!d.exclusiveChampion&&r.group.includes(d.exclusiveChampion))&&count(r,id)===0&&!!d.regions?.some(x=>x==='korakarom'||r.regions.includes(x))&&(!d.exclusiveChampion||r.group.includes(d.exclusiveChampion));}
function sample(r:RunState,ids:string[]){const x=shuffle(ids,r.rngState);r.rngState=x.state;return x.items.slice(0,3);}
export function finishBattle(r:RunState,b:BattleState):RunState {
 if(r.stage!=='battle'||b.phase!=='ended'||b.runBattleId!==battleId(r)||!b.winner)throw Error('Invalid battle completion');
 if(r.caveiraAftermath==='battle')return {...structuredClone(r),stage:'won',caveiraAftermath:b.winner==='p2'?'lost':'won'};
 const n=structuredClone(r);n.nexus=Math.max(b.winner==='draw'?1:0,b.players.p1.nexus);n.maxNexus=b.players.p1.maxNexus;
 if(b.winner==='p2'){n.stage=n.map&&n.revives>0?'defeat':'lost';if(n.stage==='lost')n.coins=0;return n;}
 grantCoins(n,battleCoins(n));
 markVisited(n);
 if(n.map?n.map.nodes.find(x=>x.id===n.map!.current)?.kind==='finalboss':n.battle===3){
  n.stage='won';n.coins=0;n.revives=0;n.entry=undefined;
  if(n.adventure==='caveira-dourada')n.caveiraAftermath='chart';
  return n;
 }
 if(n.battle===1){n.allies=sample(n,Object.keys(packages).filter(id=>!n.group.includes(id as Champion)));n.stage='recruit';}
 else {n.rewards=offerRewards(n);n.stage='reward';}
 return n;
}
export function addPair(r:RunState,id:string){if(count(r,id)!==0)throw Error('Card copy limit');for(let i=0;i<2;i++){let serial=r.deck.length;while(r.deck.some(c=>c.instanceId===`run-card-${serial}`))serial++;r.deck.push({instanceId:`run-card-${serial}`,definitionId:id});}}
export function recruit(r:RunState,champion:string):RunState {
 if(r.stage!=='recruit'||!r.allies.includes(champion)||r.group.length>=3)throw Error('Invalid recruit');
 const n=structuredClone(r);const def=runCatalog[champion];if(def.kind!=='unit'||!def.champion)throw Error('Not a champion');
 n.group.push(def.champion);n.regions=[...new Set([...n.regions,...def.regions??[]])];
 for(const id of packages[champion]){let selected=id;if(count(n,id)>=2){const replacement=Object.keys(runCatalog).find(x=>eligible(n,x)&&!isChampion(x)&&runCatalog[x].regions?.some(v=>def.regions?.includes(v))&&!runCatalog[x].championCopy&&(!runCatalog[x].upgrade||runCatalog[x].collectible===true)&&!x.startsWith('rubel-'));if(!replacement)throw Error('No legal package replacement');selected=replacement;}addPair(n,selected);}
 n.allies=[];finishRouteReward(n);return n;
}
export function reward(r:RunState,id:string|null):RunState {if(r.stage!=='reward'||id!==null&&(!r.rewards.includes(id)||!eligible(r,id)))throw Error('Invalid reward');const n=structuredClone(r);if(id)addPair(n,id);else if(!n.rewards.length)grantCoins(n,commonCoins(n));n.rewards=[];finishRouteReward(n);return n;}
export function nextBattle(r:RunState):RunState {if(r.stage!=='ready')throw Error('Next battle unavailable');const n=structuredClone(r);n.battle++;const roll=nextInt(n.rngState,0,0xffffffff);n.rngState=roll.state;n.battleSeed=roll.value;n.stage='battle';return n;}

export function offerRewards(r:RunState){return sample(r,Object.keys(runCatalog).filter(id=>eligible(r,id)&&!isChampion(id)).filter(id=>!runCatalog[id].championCopy&&(!runCatalog[id].upgrade||runCatalog[id].collectible===true)&&!id.startsWith('rubel-')));}

export function eligibleCardIds(r:RunState){return Object.keys(runCatalog).filter(id=>eligible(r,id)&&!isChampion(id)&&!runCatalog[id].championCopy&&(!runCatalog[id].upgrade||runCatalog[id].collectible===true)&&!id.startsWith('rubel-'));}





