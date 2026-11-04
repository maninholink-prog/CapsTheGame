import type {CardDefinition} from '../content/schema.js';
import type {TalentId} from '../profile/talents.js';
import {championUnit} from './champions.js';
import {recordDamage} from './expansion.js';
import {talentDamage,talentProgress} from './kylast-talents.js';
import {addAttack,drawInto} from './narrative.js';
import {returnCard} from './state-events.js';
import {opponent,type BattleEvent,type BattleState,type PlayerId,type TargetRef} from './types.js';

export interface ArcataTalentState {used:TalentId[];combustions:number}
export function arcataHasTalent(s:BattleState,owner:PlayerId,id:TalentId):boolean {
 return s.players[owner].protagonist==='arcata'&&Boolean(s.talentLoadouts?.[owner]?.includes(id));
}
function state(s:BattleState,owner:PlayerId):ArcataTalentState {
 return talentProgress(s,owner).arcata??={used:[],combustions:0};
}
function available(s:BattleState,owner:PlayerId,id:TalentId):boolean {
 return arcataHasTalent(s,owner,id)&&!s.talentState?.[owner]?.arcata?.used.includes(id);
}
function use(s:BattleState,owner:PlayerId,id:TalentId):boolean {
 if(!available(s,owner,id))return false;
 state(s,owner).used.push(id);
 return true;
}

export function arcataSetup(s:BattleState,owner:PlayerId,events:BattleEvent[]):void {
 if(!arcataHasTalent(s,owner,'arcata-spark'))return;
 const p=s.players[owner],index=p.deck.findIndex(c=>s.definitions[c.definitionId]?.fire);
 if(index<0)return;
 const [card]=p.deck.splice(index,1);
 events.push({type:'cardDrawn',player:owner,instanceId:card.instanceId});
 if(p.hand.length<10)p.hand.push(card);
 else {
  p.discard.push(card);
  events.push({type:'cardDiscarded',player:owner,instanceId:card.instanceId});
 }
}

export function arcataCostDiscount(s:BattleState,owner:PlayerId,card:CardDefinition):number {
 const firstFire=card.fire&&available(s,owner,'arcata-discount');
 const firstFireball=(card.baseId??card.id)==='fireball'&&available(s,owner,'arcata-fireball');
 return Number(Boolean(firstFire))+Number(firstFireball);
}
export function consumeArcataCosts(s:BattleState,owner:PlayerId,card:CardDefinition):void {
 if(card.fire)use(s,owner,'arcata-discount');
 if((card.baseId??card.id)==='fireball')use(s,owner,'arcata-fireball');
}
export function arcataEvolved(s:BattleState,owner:PlayerId,events:BattleEvent[]):void {
 const p=s.players[owner];
 if(use(s,owner,'arcata-reserve'))p.reserve=Math.min(3,p.reserve+1);
 if(use(s,owner,'arcata-create'))returnCard(s,owner,{instanceId:`arcata-fire-${owner}-${s.nextEffectId++}`,definitionId:'control-flames',generated:true},events);
}

export function arcataSpellBonus(s:BattleState,owner:PlayerId,card:CardDefinition,targetCount:number){
 const id=card.baseId??card.id;
 const armor=id==='fire-shield'&&use(s,owner,'arcata-shield')?1:0;
 const reduction=id==='wall-fire'&&use(s,owner,'arcata-wall')?1:0;
 const precise=id==='burning-hands'&&use(s,owner,'arcata-hands')&&targetCount===1;
 const retaliation=id==='fire-retaliation'&&use(s,owner,'arcata-retaliation');
 return {armor,reduction,damage:precise||retaliation?1:0};
}

export function resolveCombustion(s:BattleState,owner:PlayerId,events:BattleEvent[]):void {
 const arcata=championUnit(s,owner,'arcata');
 if(!arcata)return;
 const enemy=opponent(owner),p=s.players[enemy];
 const amount=arcata.evolved&&use(s,owner,'arcata-pulse')?2:1;
 p.nexus=Math.max(0,p.nexus-amount);
 events.push({type:'damageApplied',target:{kind:'nexus',player:enemy},amount});
 if(!s.talentLoadouts?.[owner]?.length||s.players[owner].protagonist!=='arcata')return;
 const progress=state(s,owner);
 progress.combustions++;
 if(progress.combustions===1&&arcataHasTalent(s,owner,'arcata-ember'))addAttack(arcata,1,true);
 if(arcata.evolved&&use(s,owner,'arcata-persist')){
  const unit=p.board.reduce<typeof p.board[number]|undefined>((weakest,u)=>u.health>0&&(!weakest||u.health<weakest.health)?u:weakest,undefined);
  if(unit){
   const target:TargetRef={kind:'unit',player:enemy,instanceId:unit.card.instanceId};
   unit.health--;
   events.push({type:'damageApplied',target,amount:1});
   recordDamage(s,target,owner);
   talentDamage(s,enemy,unit,1,events);
  }
 }
 if(progress.combustions===2&&p.nexus>0&&arcataHasTalent(s,owner,'arcata-heat'))drawInto(s,owner,events);
}
