import type {TalentId} from '../profile/talents.js';
import {addAttack,drawInto} from './narrative.js';
import type {BattleEvent,BattleState,BoardUnit,PlayerId} from './types.js';

export interface LazaroTalentState {used:TalentId[];spellDiscountRound?:number}
export function lazaroHasTalent(s:BattleState,o:PlayerId,id:TalentId){return s.players[o].protagonist==='lazaro'&&Boolean(s.talentLoadouts?.[o]?.includes(id));}
export function lazaroBaseLife(s:BattleState,o:PlayerId){return Number(lazaroHasTalent(s,o,'lazaro-survival'));}
function used(s:BattleState,o:PlayerId){s.talentState??={};const t=s.talentState[o]??={};return t.lazaro??={used:[]};}
export function lazaroUse(s:BattleState,o:PlayerId,id:TalentId){const t=used(s,o);if(!lazaroHasTalent(s,o,id)||t.used.includes(id))return false;t.used.push(id);return true;}
export function lazaroUnused(s:BattleState,o:PlayerId,id:TalentId){return lazaroHasTalent(s,o,id)&&!s.talentState?.[o]?.lazaro?.used.includes(id);}
export function lazaroCommitStrike(s:BattleState,o:PlayerId,u:BoardUnit,targetId:string,weaponId:string|null,events:BattleEvent[]){const weapon=weaponId&&u.equipment?.find(e=>e.card.instanceId===weaponId),def=weapon?s.definitions[weapon.card.definitionId]:undefined;if(def?.kind==='equipment'&&def.expansion==='last-cry'&&s.executionMarks?.[o]?.targetId===targetId){lazaroUse(s,o,'lazaro-execution-blow');if(lazaroUse(s,o,'lazaro-prepared-blade'))drawInto(s,o,events);}}
export function lazaroMarkApplied(s:BattleState,o:PlayerId,sourceId:string,events:BattleEvent[]){const source=s.players[o].board.find(u=>u.card.instanceId===sourceId),def=source&&s.definitions[source.card.definitionId];if((def?.baseId??source?.card.definitionId)==='nerion'&&lazaroUse(s,o,'lazaro-nerion-call'))drawInto(s,o,events);if(def?.kind==='unit'&&def.champion==='lazaro'&&lazaroUse(s,o,'lazaro-hunter-sign')&&source)addAttack(source,1,true);}

export function lazaroWeaponKill(s:BattleState,o:PlayerId,attacker:BoardUnit,victim:BoardUnit,weaponId:string|null){if(!weaponId||s.executionMarks?.[o]?.targetId!==victim.card.instanceId)return;const equipment=attacker.equipment?.find(e=>e.card.instanceId===weaponId),def=equipment?s.definitions[equipment.card.definitionId]:undefined;if(def?.kind==='equipment'&&def.expansion==='last-cry'&&lazaroUse(s,o,'lazaro-steel-inclement'))attacker.attack++;}
export function lazaroMarkedKill(s:BattleState,o:PlayerId,hero:BoardUnit|null,events:BattleEvent[]){if(hero&&lazaroUse(s,o,'lazaro-frenzy'))hero.attack++;if(hero&&lazaroUse(s,o,'lazaro-witness'))drawInto(s,o,events);}
export function lazaroEvolved(s:BattleState,o:PlayerId){if(lazaroUse(s,o,'lazaro-unbroken-oath'))s.players[o].nexus=Math.min(s.players[o].maxNexus,s.players[o].nexus+2);}
export function lazaroEquipmentDiscount(s:BattleState,o:PlayerId,unitId?:string){const unit=s.players[o].board.find(u=>u.card.instanceId===unitId),def=unit&&s.definitions[unit.card.definitionId],isLazaro=def?.kind==='unit'&&def.champion==='lazaro';return Boolean(isLazaro&&lazaroUnused(s,o,'lazaro-arsenal-oath')&&!s.stack.some(p=>p.owner===o&&p.mode==='arsenal'&&p.paidTalentLazaro));}
export function lazaroEquipmentAttached(s:BattleState,o:PlayerId,u:BoardUnit,definitionId:string){const hero=s.definitions[u.card.definitionId];if(hero?.kind!=='unit'||hero.champion!=='lazaro')return;if((s.definitions[definitionId]?.baseId??definitionId)==='last-cry'&&lazaroUse(s,o,'lazaro-greatsword-fist'))addAttack(u,1,true);if(lazaroUnused(s,o,'lazaro-arsenal-oath'))lazaroUse(s,o,'lazaro-arsenal-oath');}
export function lazaroHealing(s:BattleState,o:PlayerId,id:string){return id==='lyari-heal'&&lazaroUse(s,o,'lazaro-shared-blood')||id==='loumar-heal'&&lazaroUse(s,o,'lazaro-loumar-mercy')?1:0;}
export function lazaroSteedResolved(s:BattleState,o:PlayerId){if(s.executionMarks?.[o]&&lazaroUse(s,o,'lazaro-shadow-reins')){const t=used(s,o);t.spellDiscountRound=s.round;t.used=t.used.filter(id=>id!=='lazaro-shadow-reins');}}
export function lazaroCardCostDiscount(s:BattleState,o:PlayerId,d:{kind:string}){return d.kind!=='unit'&&d.kind!=='equipment'&&s.talentState?.[o]?.lazaro?.spellDiscountRound===s.round&&lazaroUnused(s,o,'lazaro-shadow-reins')?1:0;}
export function consumeLazaroSpellCost(s:BattleState,o:PlayerId,d:{kind:string}){if(lazaroCardCostDiscount(s,o,d))lazaroUse(s,o,'lazaro-shadow-reins');}
