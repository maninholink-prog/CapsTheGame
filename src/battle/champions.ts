import {rubelCostDiscount,rubelEvolved} from './rubel-talents.js';
import {arcataCostDiscount,arcataEvolved} from './arcata-talents.js';
import {abeHasTalent,abeCostDiscount,abeFabricationCount,abeEvolved,abeEntry} from './abe-talents.js';
import {musicDiscount} from './expansion.js';
import {kuaraCardCostDiscount} from './kuara-talents.js';
import { shuffle } from './random.js';
import { returnCard } from './state-events.js';
import { opponent } from './types.js';
import { championSpells, upgradeIds } from '../content/allies.js';
import type { Champion, CardDefinition } from '../content/schema.js';
import type { AllyProgress, BattleEvent, BattleState, BoardUnit, CardInstance, PlayerId, TargetRef } from './types.js';
export function progress(state:BattleState,owner:PlayerId):AllyProgress {
 const empty=():AllyProgress=>({upgrades:0,fire:0,fireRound:0,fireRoundNumber:0,healing:0,evolved:{}});
 state.allyProgress??={p1:empty(),p2:empty()};return state.allyProgress[owner];
}
export function championUnit(state:BattleState,owner:PlayerId,champion:Champion){return state.players[owner].board.find(u=>{const d=state.definitions[u.card.definitionId];return d?.kind==='unit'&&d.champion===champion;});}
export function effectiveDefinition(state:BattleState,owner:PlayerId,card:CardInstance):CardDefinition {
 const def=state.definitions[card.definitionId];
 if(def?.kind==='unit'&&def.champion&&championSpells[def.champion]&&championUnit(state,owner,def.champion))return state.definitions[championSpells[def.champion]];
 return def;
}
export function cardCost(state:BattleState,owner:PlayerId,def:CardDefinition,card?:CardInstance):number{const p=state.players[owner];let discount=def.upgrade&&championUnit(state,owner,'abe')?.evolved?1:0;if(def.upgrade&&p.upgradeDiscountRound===state.round)discount+=p.upgradeDiscount??0;if(def.fire&&p.fireDiscountRound===state.round)discount+=p.fireDiscount??0;discount+=musicDiscount(state,owner,def)+abeCostDiscount(state,owner,def)+arcataCostDiscount(state,owner,def)+rubelCostDiscount(state,owner,def)+kuaraCardCostDiscount(state,owner,card);return discount?Math.min(def.cost,Math.max(1,def.cost-discount)):def.cost;}
export function fabricate(state:BattleState,owner:PlayerId){const rolled=shuffle(upgradeIds,state.rngState);state.rngState=rolled.state;const remaining=abeFabricationCount(state,owner);(state.choices??=[]).push({owner,options:rolled.items.slice(0,abeHasTalent(state,owner,'abe-catalog')?4:3),...(remaining===2?{remaining}: {})});}
export function chooseUpgrade(state:BattleState,owner:PlayerId,id:string,events:BattleEvent[]):boolean {
 const choice=state.choices?.[0];if(!choice||choice.owner!==owner||!choice.options.includes(id))return false;
 if((choice.remaining??1)>1){choice.remaining=1;choice.options=choice.options.filter(option=>option!==id);}else state.choices!.shift();returnCard(state,owner,{instanceId:`upgrade-${owner}-${state.nextEffectId++}`,definitionId:id,generated:true},events);return true;
}
export function queueHeal(state:BattleState,owner:PlayerId,id:string,targets:TargetRef[],events:BattleEvent[],ignoreSide=false){
 const effectId=state.nextEffectId++;state.stack.push({id:effectId,owner,source:{instanceId:`ability-${owner}-${effectId}`,definitionId:id,generated:true},targets,mode:'ability',ignoreSide});
 state.stackReturnOwner??=state.priorityOwner??owner;state.priorityOwner=opponent(owner);state.consecutivePasses=0;state.responseWindowOpened=true;events.push({type:'effectQueued',effectId});
}
export function evolveAllies(state:BattleState,owner:PlayerId,events:BattleEvent[]){
 const p=progress(state,owner);
 for(const [champion,ready,atk,hp] of [['abe',p.upgrades>=6,1,1],['arcata',p.fire>=6,1,1],['rubel',p.healing>=10,2,3]] as const){
  if(!ready)continue;p.evolved[champion]=true;const u=championUnit(state,owner,champion);if(!u||u.evolved)continue;
  u.evolved=true;u.attack+=atk;u.health+=hp;u.maxHealth+=hp;events.push({type:'championEvolved',player:owner,champion});
  if(champion==='abe')abeEvolved(state,owner,u);
  if(champion==='arcata')arcataEvolved(state,owner,events);
  if(champion==='rubel'){
   rubelEvolved(state,owner,events);
   queueHeal(state,owner,'rubel-wave',[],events);
   state.stack.at(-1)!.rubelEvolution=true;
  }
 }
}
export function onAllyEntered(state:BattleState,owner:PlayerId,unit:BoardUnit,events:BattleEvent[],targets?:TargetRef[],ignoreSide=false){
 const def=state.definitions[unit.card.definitionId];if(def.kind!=='unit'||!def.champion)return;
 const p=progress(state,owner);if(p.evolved[def.champion]){unit.evolved=true;const atk=def.champion==='rubel'?2:1;const hp=def.champion==='rubel'?3:1;unit.attack+=atk;unit.health+=hp;unit.maxHealth+=hp;if(def.champion==='abe')abeEvolved(state,owner,unit);if(def.champion==='arcata')arcataEvolved(state,owner,events);}
 abeEntry(state,owner,unit,events);
 if(def.champion==='abe')fabricate(state,owner);
 if(def.champion==='rubel')queueHeal(state,owner,'rubel-entry',targets??[{kind:'nexus',player:owner}],events,ignoreSide);
}
export function roundAllies(state:BattleState,events:BattleEvent[]){for(const owner of ['p1','p2'] as const){if(championUnit(state,owner,'abe'))fabricate(state,owner);if(championUnit(state,owner,'rubel')?.evolved)queueHeal(state,owner,'rubel-wave',[],events);}}
export function strikes(state:BattleState,unit:BoardUnit){const d=state.definitions[unit.card.definitionId];return unit.keywords?.includes('double')||d?.kind==='unit'&&d.champion==='kylast'&&unit.evolved?2:1;}
export function canBlock(attacker:BoardUnit,blocker:BoardUnit){return !attacker.keywords?.includes('elusive')||!!blocker.keywords?.includes('elusive');}

