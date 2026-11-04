import type {CardDefinition} from '../content/schema.js';
import type {TalentId} from '../profile/talents.js';
import {championUnit} from './champions.js';
import {talentProgress} from './kylast-talents.js';
import {drawInto} from './narrative.js';
import {returnCard} from './state-events.js';
import type {BattleEvent,BattleState,BoardUnit,PendingEffect,PlayerId,TargetRef} from './types.js';

export function rubelHasTalent(s:BattleState,owner:PlayerId,id:TalentId):boolean {
 return s.players[owner].protagonist==='rubel'&&Boolean(s.talentLoadouts?.[owner]?.includes(id));
}
function available(s:BattleState,owner:PlayerId,id:TalentId):boolean {
 return rubelHasTalent(s,owner,id)&&!s.talentState?.[owner]?.rubel?.includes(id);
}
function use(s:BattleState,owner:PlayerId,id:TalentId):boolean {
 if(!available(s,owner,id))return false;
 (talentProgress(s,owner).rubel??=[]).push(id);
 return true;
}

export function rubelSetup(s:BattleState,owner:PlayerId,events:BattleEvent[]):void {
 if(!rubelHasTalent(s,owner,'rubel-prepared'))return;
 const p=s.players[owner],index=p.deck.findIndex(c=>{
  const card=s.definitions[c.definitionId];
  return card?.kind==='spell'&&card.effect.type==='heal';
 });
 if(index<0)return;
 const [card]=p.deck.splice(index,1);
 events.push({type:'cardDrawn',player:owner,instanceId:card.instanceId});
 if(p.hand.length<10)p.hand.push(card);
 else {
  p.discard.push(card);
  events.push({type:'cardDiscarded',player:owner,instanceId:card.instanceId});
 }
}
export function rubelCostDiscount(s:BattleState,owner:PlayerId,card:CardDefinition):number {
 return (card.baseId??card.id)==='prayer'&&available(s,owner,'rubel-prayer')?1:0;
}
export function consumeRubelCosts(s:BattleState,owner:PlayerId,card:CardDefinition):void {
 if((card.baseId??card.id)==='prayer')use(s,owner,'rubel-prayer');
}
export function rubelHealBonus(s:BattleState,pending:PendingEffect,card:CardDefinition,target:TargetRef):number {
 const id=card.baseId??card.id,owner=pending.owner;
 if(id==='healing-word')return Number(use(s,owner,'rubel-word'));
 if(id==='rubel-entry')return Number(use(s,owner,'rubel-devotion'));
 if(target.kind!=='nexus'||target.player!==owner)return 0;
 if(id==='cure-wounds')return Number(use(s,owner,'rubel-bond'));
 if(id==='rubel-wave'&&pending.rubelEvolution)return Number(use(s,owner,'rubel-relief'));
 return 0;
}
export function rubelMaxLifeBonus(s:BattleState,owner:PlayerId,card:CardDefinition):number {
 const id=card.baseId??card.id;
 if(id==='aid')return Number(use(s,owner,'rubel-aid'));
 if(id==='blessing')return Number(use(s,owner,'rubel-blessing'));
 return 0;
}
export function rubelHealingResolved(s:BattleState,owner:PlayerId,healedAllies:number,events:BattleEvent[]):void {
 const hope=Boolean(championUnit(s,owner,'rubel'))&&use(s,owner,'rubel-hope');
 const reach=healedAllies>=3&&use(s,owner,'rubel-reach');
 if(hope)drawInto(s,owner,events);
 if(reach)drawInto(s,owner,events);
}
export function rubelEvolved(s:BattleState,owner:PlayerId,events:BattleEvent[]):void {
 const p=s.players[owner];
 if(use(s,owner,'rubel-reserve'))p.reserve=Math.min(3,p.reserve+1);
 if(use(s,owner,'rubel-renewal'))returnCard(s,owner,{instanceId:`rubel-word-${owner}-${s.nextEffectId++}`,definitionId:'healing-word',generated:true},events);
 if(use(s,owner,'rubel-sanctuary'))for(const unit of p.board)if(unit.health>0)unit.sanctuary=true;
}
export function reduceRubelStrike(s:BattleState,owner:PlayerId,unit:BoardUnit,amount:number):number {
 if(amount<=0)return amount;
 const ward=unit.sanctuary?2:0;
 if(ward)delete unit.sanctuary;
 const card=s.definitions[unit.card.definitionId];
 const guard=card?.kind==='unit'&&card.champion==='rubel'&&use(s,owner,'rubel-guard')?1:0;
 return Math.max(0,amount-ward-guard);
}
