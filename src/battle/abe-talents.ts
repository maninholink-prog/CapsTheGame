import type {TalentId} from '../profile/talents.js';
import type {CardDefinition} from '../content/schema.js';
import {championUnit,fabricate,progress,queueHeal} from './champions.js';
import {drawInto} from './narrative.js';
import type {BattleState,BattleEvent,BoardUnit,PlayerId,TargetRef} from './types.js';
export interface AbeTalentState {fabricated?:boolean;projectUsed?:boolean;upgradePaidRound?:number;upgradeResolvedRound?:number;armor?:boolean;inspired?:boolean;complete?:boolean;shared?:boolean;units?:Record<string,number>}
export function abeHasTalent(s:BattleState,o:PlayerId,id:TalentId){return s.players[o].protagonist==='abe'&&Boolean(s.talentLoadouts?.[o]?.includes(id));}
function state(s:BattleState,o:PlayerId):AbeTalentState {s.talentState??={};const p=s.talentState[o]??={};return p.abe??={};}
export function abeSetup(s:BattleState,o:PlayerId,events:BattleEvent[]){
 if(!abeHasTalent(s,o,'abe-tools'))return;
 const p=s.players[o],i=p.deck.findIndex(c=>s.definitions[c.definitionId]?.upgrade);if(i<0)return;
 const [c]=p.deck.splice(i,1);events.push({type:'cardDrawn',player:o,instanceId:c.instanceId});
 if(p.hand.length<10)p.hand.push(c);else{p.discard.push(c);events.push({type:'cardDiscarded',player:o,instanceId:c.instanceId});}
}
export function abeCostDiscount(s:BattleState,o:PlayerId,d:CardDefinition){
 const p=s.talentState?.[o]?.abe;
 return (d.upgrade&&abeHasTalent(s,o,'abe-economy')&&p?.upgradePaidRound!==s.round?1:0)+((d.baseId??d.id)==='project'&&abeHasTalent(s,o,'abe-project')&&!p?.projectUsed?1:0);
}
export function consumeAbeCosts(s:BattleState,o:PlayerId,d:CardDefinition){
 if(d.upgrade&&abeHasTalent(s,o,'abe-economy'))state(s,o).upgradePaidRound=s.round;
 if((d.baseId??d.id)==='project'&&abeHasTalent(s,o,'abe-project'))state(s,o).projectUsed=true;
}
export function abeFabricationCount(s:BattleState,o:PlayerId){
 if(!abeHasTalent(s,o,'abe-masterpiece'))return 1;
 const p=state(s,o);if(p.fabricated)return 1;p.fabricated=true;return 2;
}
export function abeEvolved(s:BattleState,o:PlayerId,u:BoardUnit){
 if(abeHasTalent(s,o,'abe-experienced')){u.attack++;u.health++;u.maxHealth++;}
 if(abeHasTalent(s,o,'abe-inspiration')&&!state(s,o).inspired){state(s,o).inspired=true;fabricate(s,o);}
}
export function abeEntry(s:BattleState,o:PlayerId,u:BoardUnit,events:BattleEvent[]){
 const d=s.definitions[u.card.definitionId];if(d.kind!=='unit'||d.champion!=='abe')return;
 if(abeHasTalent(s,o,'abe-protection')&&!state(s,o).armor){
  state(s,o).armor=true;const id='abe-talent-armor';s.definitions[id]={id,kind:'armor',cost:0,speed:'fast',target:{kind:'unit',side:'ally',min:1,max:1},effect:{type:'armor',amount:2}};
  queueHeal(s,o,id,[{kind:'unit',player:o,instanceId:u.card.instanceId}],events);
 }
}
export function abeUpgradeResolved(s:BattleState,o:PlayerId,targets:TargetRef[],events:BattleEvent[]){
 if(s.players[o].protagonist!=='abe'||!s.talentLoadouts?.[o]?.length)return;
 const p=state(s,o),count=progress(s,o).upgrades,firstRound=p.upgradeResolvedRound!==s.round;p.upgradeResolvedRound=s.round;
 const seen=new Set<string>();
 let draws=abeHasTalent(s,o,'abe-research')&&count===3?1:0;
 for(const target of targets){
  if(target.kind!=='unit'||seen.has(target.instanceId))continue;
  const id=target.instanceId;seen.add(id);
  const u=s.players[target.player].board.find(u=>u.card.instanceId===id);if(!u||u.health<=0)continue;
  if(count===1&&abeHasTalent(s,o,'abe-reinforcement'))u.maxHealth++;
  if(firstRound&&abeHasTalent(s,o,'abe-calibration')){u.attack++;u.roundAttackBonus=(u.roundAttackBonus??0)+1;}
  if(abeHasTalent(s,o,'abe-shared')||abeHasTalent(s,o,'abe-complete')){
   p.units??={};p.units[id]=(p.units[id]??0)+1;
   if(!p.shared&&Object.keys(p.units).length===3&&abeHasTalent(s,o,'abe-shared')){p.shared=true;draws++;}
   if(!p.complete&&p.units[id]===3&&abeHasTalent(s,o,'abe-complete')){p.complete=true;u.attack++;u.maxHealth++;}
  }
 }
 const abe=championUnit(s,o,'abe');if(firstRound&&abe&&abe.health>0&&abeHasTalent(s,o,'abe-repair')){
  const amount=Math.min(1,abe.maxHealth-abe.health);abe.health+=amount;events.push({type:'healingApplied',target:{kind:'unit',player:o,instanceId:abe.card.instanceId},amount});
 }
 for(let i=0;i<draws&&s.phase!=='ended';i++)drawInto(s,o,events);
}
