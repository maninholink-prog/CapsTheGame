import type {TalentId} from '../profile/talents.js';
import {championUnit} from './champions.js';
import {addAttack} from './narrative.js';
import type {BattleState,BoardUnit,PlayerId} from './types.js';

export interface YouroTalentState {used:TalentId[];witnessedDeaths:number}
export function youroHasTalent(s:BattleState,o:PlayerId,id:TalentId){return s.players[o].protagonist==='youro'&&Boolean(s.talentLoadouts?.[o]?.includes(id));}
function state(s:BattleState,o:PlayerId):YouroTalentState {const p=(s.talentState??={})[o]??={};return p.youro??={used:[],witnessedDeaths:0};}
function use(s:BattleState,o:PlayerId,id:TalentId){if(!youroHasTalent(s,o,id))return false;const p=state(s,o);if(p.used.includes(id))return false;p.used.push(id);return true;}
export function youroBaseLife(s:BattleState,o:PlayerId){return Number(youroHasTalent(s,o,'youro-forest-guardian'));}
export function youroFormBonus(s:BattleState,o:PlayerId,form:'bear'|'tiger'){return Number(youroHasTalent(s,o,form==='bear'?'youro-bear-body':'youro-tiger-claws'));}
export function youroReduceDamage(s:BattleState,o:PlayerId,u:BoardUnit,amount:number){
 if(amount<=0)return amount;
 const youro=championUnit(s,o,'youro');if(!youro||youro.health<=0||youro.form!=='bear')return amount;
 const talent=u.card.instanceId===youro.card.instanceId?'youro-protective-roots':'youro-pack-shelter';
 return use(s,o,talent)?amount-1:amount;
}
export function youroStrikeBonus(s:BattleState,o:PlayerId,u:BoardUnit){
 const youro=championUnit(s,o,'youro');return youro?.card.instanceId===u.card.instanceId&&youro.form==='tiger'&&use(s,o,'youro-precise-hunt')?1:0;
}
export function youroCombatKill(s:BattleState,o:PlayerId,u:BoardUnit,victim:BoardUnit){
 const youro=championUnit(s,o,'youro');if(youro?.card.instanceId===u.card.instanceId&&youro.form==='tiger'&&victim.health<=0&&use(s,o,'youro-predator-step'))addAttack(u,1,true);
}
export function youroEvolved(s:BattleState,o:PlayerId,u:BoardUnit){
 if(youroHasTalent(s,o,'youro-feral-evolution')){u.attack++;u.health++;u.maxHealth++;}
 if(u.form==='bear'&&youroHasTalent(s,o,'youro-still-guardian'))u.maxHealth++;
 if(u.form==='tiger'&&youroHasTalent(s,o,'youro-hunt-king'))u.attack++;
}
export function youroBeforeDeaths(s:BattleState,deaths:{owner:PlayerId;unit:BoardUnit}[]){
 for(const o of ['p1','p2'] as const){
  const u=championUnit(s,o,'youro');if(!u||u.health<=0||deaths.some(d=>d.owner===o&&d.unit.card.instanceId===u.card.instanceId))continue;
  if(!['youro-pack-hunt','youro-strengthened-grief','youro-shared-cycle','youro-pack-strength','youro-guardian-spirit'].some(id=>youroHasTalent(s,o,id as TalentId)))continue;
  const count=deaths.filter(d=>d.owner===o&&d.unit.card.instanceId!==u.card.instanceId).length;if(!count)continue;
  const p=state(s,o),before=p.witnessedDeaths;p.witnessedDeaths+=count;
  if(before===0&&youroHasTalent(s,o,'youro-strengthened-grief'))addAttack(u,1,true);
  if(u.form==='tiger'&&use(s,o,'youro-pack-hunt'))addAttack(u,1,true);
  if(before<2&&p.witnessedDeaths>=2&&youroHasTalent(s,o,'youro-shared-cycle'))u.maxHealth++;
  if(before<3&&p.witnessedDeaths>=3&&youroHasTalent(s,o,'youro-pack-strength'))for(const ally of s.players[o].board){if(ally.health<=0||s.definitions[ally.card.definitionId]?.id!=='spirit-tiger')continue;ally.attack++;ally.health++;ally.maxHealth++;}
  if(u.evolved&&youroHasTalent(s,o,'youro-guardian-spirit')&&!p.used.includes('youro-guardian-spirit')){p.used.push('youro-guardian-spirit');u.maxHealth++;}
 }
}
