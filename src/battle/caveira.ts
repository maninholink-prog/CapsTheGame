import {queueHeal} from './champions.js';
import {addAttack} from './narrative.js';
import {returnCard} from './state-events.js';
import {opponent} from './types.js';
import type {BattleEvent,BattleState,BoardUnit,CombatState,PlayerId} from './types.js';

export function caveiraEntry(s:BattleState,owner:PlayerId,unit:BoardUnit,events:BattleEvent[]){
 const id=s.definitions[unit.card.definitionId].baseId??unit.card.definitionId;
 if(id==='caveira-general')queueHeal(s,owner,'caveira-reinforcements',[],events);
 if(id==='caveira-saqueador')queueHeal(s,owner,'caveira-plunder',[],events);
 if(id==='caveira-carpenter')queueHeal(s,owner,'caveira-repair',[{kind:'nexus',player:owner}],events);
 if(id==='caveira-diver'){
  const options=s.players[owner].discard.filter(card=>s.definitions[card.definitionId].kind==='equipment').map(card=>card.instanceId);
  if(options.length)(s.laboratoryChoices??=[]).push({kind:'salvage',owner,sourceId:unit.card.instanceId,options});
 }
}

export function caveiraAttack(s:BattleState,combat:CombatState){
 const owner=combat.attacker;
 const attackers=s.players[owner].board.filter(unit=>combat.lanes.some(lane=>lane.attackerId===unit.card.instanceId));
 const options=s.players[opponent(owner)].board.map(unit=>unit.card.instanceId);
 for(const unit of attackers){
  const id=s.definitions[unit.card.definitionId].baseId??unit.card.definitionId;
  if(id==='caveira-captain')for(const ally of attackers){
   const definition=s.definitions[ally.card.definitionId];
   if(ally!==unit&&definition.kind==='unit'&&definition.pirate)addAttack(ally,1,true);
  }
  if(id==='caveira-cannon'&&options.length)(s.laboratoryChoices??=[]).push({kind:'cannon',owner,sourceId:unit.card.instanceId,options});
 }
}

export function chooseCaveira(s:BattleState,owner:PlayerId,targetId:string,events:BattleEvent[]):boolean{
 const choice=s.laboratoryChoices?.[0];
 if(!choice?.kind||choice.owner!==owner||(!choice.options.includes(targetId)&&!(choice.kind==='salvage'&&targetId==='')))return false;
 if(choice.kind==='cannon'){
  if(!s.players[opponent(owner)].board.some(unit=>unit.card.instanceId===targetId))return false;
  queueHeal(s,owner,'caveira-shot',[{kind:'unit',player:opponent(owner),instanceId:targetId}],events);
 }else if(targetId){
  const discard=s.players[owner].discard;
  const index=discard.findIndex(card=>card.instanceId===targetId&&s.definitions[card.definitionId].kind==='equipment');
  if(index<0)return false;
  const [card]=discard.splice(index,1);
  returnCard(s,owner,card,events);
 }
 s.laboratoryChoices!.shift();
 return true;
}

export function caveiraBlocked(s:BattleState,combat:CombatState,events:BattleEvent[]){
 for(const lane of combat.lanes){
  const attacker=s.players[combat.attacker].board.find(unit=>unit.card.instanceId===lane.attackerId);
  if(attacker&&lane.blockerId&&(s.definitions[attacker.card.definitionId].baseId??attacker.card.definitionId)==='caveira-megalodon')
   queueHeal(s,combat.attacker,'caveira-charge',[{kind:'unit',player:opponent(combat.attacker),instanceId:lane.blockerId}],events);
 }
}

export function guardBlocks(s:BattleState,unit:BoardUnit){
 const definition=s.definitions[unit.card.definitionId];
 if((definition.baseId??definition.id)!=='caveira-guard')return;
 unit.combatAttackBonus=2;
 addAttack(unit,2);
}

export function endCaveiraCombat(s:BattleState){
 for(const player of Object.values(s.players))for(const unit of player.board){
  if(!unit.combatAttackBonus)continue;
  addAttack(unit,-unit.combatAttackBonus);
  delete unit.combatAttackBonus;
  // Reductions applied to the blocking bonus must not leave attack below zero.
  if(unit.attack<0)addAttack(unit,-unit.attack,true);
 }
}
