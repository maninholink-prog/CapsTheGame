import {championUnit,fabricate,progress,queueHeal} from './champions.js';
import {isLegalTarget} from './targets.js';
import {drawOne} from './draw.js';
import type {CardDefinition,TargetRule} from '../content/schema.js';
import type {BattleEvent,BattleState,BoardUnit,PlayerId,TargetRef} from './types.js';
export function ability(state:BattleState,u:BoardUnit){const d=state.definitions[u.card.definitionId];return d.narrative;}
export function once(state:BattleState,u:BoardUnit,key:string){u.triggerRounds??={};if(u.triggerRounds[key]===state.round)return false;u.triggerRounds[key]=state.round;return true;}
export function drawInto(state:BattleState,owner:PlayerId,events:BattleEvent[]){if(state.phase==='ended')return;const r=drawOne(state,owner);if(r.ok){Object.assign(state,r.state);events.push(...r.events);}}
export function addAttack(u:BoardUnit,amount:number,temporary=false){u.attack+=amount;if(temporary)u.roundAttackBonus=(u.roundAttackBonus??0)+amount;}
export function entryRule(d:CardDefinition):TargetRule|undefined {if(d.kind!=='unit')return;return d.champion==='rubel'?{kind:'character',side:'ally',min:1,max:1}:d.entryTarget;}
export function entryTargets(s:BattleState,owner:PlayerId,card:{instanceId:string;definitionId:string}):TargetRef[]{
 const d=s.definitions[card.definitionId];const rule=entryRule(d);if(!rule)return [];
 const pool:TargetRef[]=[];
 for(const player of ['p1','p2'] as const){pool.push({kind:'nexus',player});pool.push(...s.players[player].board.map(u=>({kind:'unit' as const,player,instanceId:u.card.instanceId})));}
 const refs=pool.filter(t=>isLegalTarget(s,owner,rule,t));
 if(d.kind==='unit'&&['coroinha-heal','lab-assistant-heal'].includes(d.entrySpell??''))refs.push({kind:'unit',player:owner,instanceId:card.instanceId});
 return refs;
}
export function narrativeEntry(s:BattleState,owner:PlayerId,u:BoardUnit,events:BattleEvent[],targets:TargetRef[]=[],ignoreSide=false){
 const d=s.definitions[u.card.definitionId];const p=s.players[owner];
 if(d.narrative==='zacarias'){p.upgradeDiscount=(p.upgradeDiscountRound===s.round?p.upgradeDiscount??0:0)+1;p.upgradeDiscountRound=s.round;}
 if(d.narrative==='soarim'){p.fireDiscount=(p.fireDiscountRound===s.round?p.fireDiscount??0:0)+1;p.fireDiscountRound=s.round;}
 if(d.narrative==='keegan')fabricate(s,owner);
 if(d.entrySpell==='coroinha-heal'&&ignoreSide&&!targets.length)targets=[{kind:'unit',player:owner,instanceId:u.card.instanceId}];
 if(d.entrySpell&&targets.length)queueHeal(s,owner,d.entrySpell,targets,events,ignoreSide);
}
export function consumeNarrativeCosts(s:BattleState,owner:PlayerId,d:CardDefinition){const p=s.players[owner];
 if(d.upgrade&&p.upgradeDiscountRound===s.round)p.upgradeDiscount=0;
 if(d.fire&&d.kind!=='unit'&&d.kind!=='equipment'){
  if(p.fireDiscountRound===s.round)p.fireDiscount=0;
  if((d.effect.type==='damage'||d.fireShield)&&p.fireBoostRound===s.round){const bonus=p.fireBoost??0;p.fireBoost=0;return bonus;}
 }return 0;
}
export function narrativeResolved(s:BattleState,owner:PlayerId,d:CardDefinition,targets:TargetRef[],actualHealing:number,events:BattleEvent[],isAbility=false){
 if(d.upgrade){
  for(const t of targets)if(t.kind==='unit'){const u=s.players[t.player].board.find(x=>x.card.instanceId===t.instanceId);if(u&&s.definitions[u.card.definitionId].kind==='unit'&&'ability' in s.definitions[u.card.definitionId]&&(s.definitions[u.card.definitionId] as {ability?:string}).ability==='spider')u.attack++;}
  for(const id of s.players[owner].board.map(u=>u.card.instanceId)){
   const u=s.players[owner].board.find(x=>x.card.instanceId===id);if(!u)continue;const a=ability(s,u);
   if(a==='gremin') {const t=targets.find(t=>t.kind==='unit'&&t.player===owner&&t.instanceId!==id&&s.players[owner].board.some(v=>v.card.instanceId===t.instanceId));if(t?.kind==='unit'&&once(s,u,'upgrade')){const v=s.players[owner].board.find(v=>v.card.instanceId===t.instanceId)!;v.attack++;v.health++;v.maxHealth++;}}
   if(a==='lucia'&&once(s,u,'upgrade'))drawInto(s,owner,events);
   if(s.phase==='ended')return;
  }
 }
 if(actualHealing>0){for(const id of s.players[owner].board.filter(u=>ability(s,u)==='archibald').map(u=>u.card.instanceId)){const u=s.players[owner].board.find(v=>v.card.instanceId===id)!;if(once(s,u,'heal'))drawInto(s,owner,events);if(s.phase==='ended')return;}}
 if(d.fire&&!isAbility){for(const u of s.players[owner].board){const a=ability(s,u);if((a==='salita'||a==='kriv')&&once(s,u,'fire')){if(a==='kriv')addAttack(u,2,true);else queueHeal(s,owner,'salita-heal',[{kind:'nexus',player:owner}],events);}}}
}
export function narrativeRound(s:BattleState,events:BattleEvent[]){for(const owner of ['p1','p2'] as const)for(const u of s.players[owner].board)if(ability(s,u)==='mantum')queueHeal(s,owner,'mantum-heal',[],events);}
export function narrativeBlock(s:BattleState,owner:PlayerId,ids:string[],events:BattleEvent[]){for(const id of ids){const u=s.players[owner].board.find(x=>x.card.instanceId===id);if(u&&ability(s,u)==='guardian'&&once(s,u,'block'))queueHeal(s,owner,'guardian-heal',[{kind:'nexus',player:owner}],events);}}
export function shieldTriggers(s:BattleState,u:BoardUnit,enemy:TargetRef){const shields=(u.fireShields??[]).filter(x=>x.round===s.round);u.fireShields=[];return shields.map(x=>({...x,target:enemy}));}
export function queueShields(s:BattleState,triggers:ReturnType<typeof shieldTriggers>,events:BattleEvent[]){if(s.phase==='ended')return;for(const t of triggers){queueHeal(s,t.owner,'fire-retaliation',[t.target],events,true);s.stack.at(-1)!.damageBonus=t.bonus;}}

