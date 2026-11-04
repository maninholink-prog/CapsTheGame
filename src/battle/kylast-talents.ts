import {rubelSetup} from './rubel-talents.js';
import {arcataSetup} from './arcata-talents.js';
import {abeSetup} from './abe-talents.js';
import {talentsFor} from '../profile/talents.js';
import type {TalentId} from '../profile/talents.js';
import {queueHeal} from './champions.js';
import type {BattleState,BattleEvent,BoardUnit,PlayerId,CombatLane} from './types.js';
export interface TalentBattleState {rubel?:TalentId[];arcata?:import('./arcata-talents.js').ArcataTalentState;abe?:import('./abe-talents.js').AbeTalentState;setup?:boolean;entryDraw?:boolean;entryArmor?:boolean;gripUsed?:boolean;survivalUsed?:boolean;firstAttack?:boolean;versatilityRound?:number;returnedRound?:number;returnedCard?:string;maintenanceUsedRound?:number}
export function hasTalent(s:BattleState,o:PlayerId,id:TalentId){return s.players[o].protagonist==='kylast'&&Boolean(s.talentLoadouts?.[o]?.includes(id));}
export function talentProgress(s:BattleState,o:PlayerId):TalentBattleState {s.talentState??={};return s.talentState[o]??=( {} );}
export function isKylast(s:BattleState,u:BoardUnit){const d=s.definitions[u.card.definitionId];return d?.kind==='unit'&&d.champion==='kylast';}
function drawEquipment(s:BattleState,o:PlayerId,events:BattleEvent[]){const p=s.players[o],i=p.deck.findIndex(c=>s.definitions[c.definitionId]?.kind==='equipment');if(i<0)return;const [c]=p.deck.splice(i,1);events.push({type:'cardDrawn',player:o,instanceId:c.instanceId});if(p.hand.length<10)p.hand.push(c);else {p.discard.push(c);events.push({type:'cardDiscarded',player:o,instanceId:c.instanceId});}}
// Setup mutates the newly created battle before opening; repeated application never grants another draw.
export function applyBattleTalents(s:BattleState,o:PlayerId,ids:TalentId[],events:BattleEvent[]=[]){
 const hero=s.players[o].protagonist;if(!hero)return;const allowed=talentsFor(hero);const selected=[...new Set(ids)].filter(id=>allowed.some(t=>t.id===id));
 if(!allowed.length||(hero!=='kylast'&&ids.length>0&&!selected.length))return;
 s.talentLoadouts??={};s.talentLoadouts[o]=selected;const p=talentProgress(s,o);if(p.setup)return;p.setup=true;
 if(hero==='abe')abeSetup(s,o,events);
 if(hero==='arcata')arcataSetup(s,o,events);
 if(hero==='rubel')rubelSetup(s,o,events);
 if(hasTalent(s,o,'precautious-smith'))drawEquipment(s,o,events);
}
export function talentCapacity(s:BattleState,o:PlayerId){for(const [id,n] of [['complete-arsenal',6],['arsenal-iii',5],['arsenal-ii',4],['arsenal-i',3]] as const)if(hasTalent(s,o,id))return n;return 2;}
export function talentEntry(s:BattleState,o:PlayerId,u:BoardUnit,events:BattleEvent[]){if(!isKylast(s,u))return;const p=talentProgress(s,o);
 if(hasTalent(s,o,'recovered-arsenal')&&!p.entryDraw){p.entryDraw=true;drawEquipment(s,o,events);}
 if(hasTalent(s,o,'campaign-armor')&&!p.entryArmor){p.entryArmor=true;queueTalentEffect(s,o,u,'armor',events);}
}
function queueTalentEffect(s:BattleState,o:PlayerId,u:BoardUnit,kind:'heal'|'armor',events:BattleEvent[]){const id=`kylast-talent-${kind}`;s.definitions[id]={id,kind:kind==='armor'?'armor':'spell',speed:'fast',cost:0,target:{kind:'unit',side:'ally',min:1,max:1},effect:{type:kind,amount:2}};queueHeal(s,o,id,[{kind:'unit',player:o,instanceId:u.card.instanceId}],events);}
export function talentDamage(s:BattleState,o:PlayerId,u:BoardUnit,amount:number,events:BattleEvent[]){if(amount<=0||u.health<=0||!isKylast(s,u)||!hasTalent(s,o,'warrior-stamina'))return;const p=talentProgress(s,o);if(p.survivalUsed)return;p.survivalUsed=true;queueTalentEffect(s,o,u,'heal',events);}
export function talentReturn(s:BattleState,o:PlayerId,cardId:string){if(!hasTalent(s,o,'arsenal-maintenance'))return;const p=talentProgress(s,o);if(p.returnedRound===s.round)return;p.returnedRound=s.round;p.returnedCard=cardId;}
export function talentGripAvailable(s:BattleState,o:PlayerId,unitId?:string){const u=s.players[o].board.find(u=>u.card.instanceId===unitId);return Boolean(u&&isKylast(s,u)&&hasTalent(s,o,'grip-adjustment')&&!s.talentState?.[o]?.gripUsed&&!s.stack.some(effect=>effect.owner===o&&effect.mode==='arsenal'&&effect.paidTalentGrip));}
export function talentEquipmentDiscount(s:BattleState,o:PlayerId,unitId?:string,cardId?:string){const p=s.talentState?.[o];return (talentGripAvailable(s,o,unitId)?1:0)+(hasTalent(s,o,'arsenal-maintenance')&&cardId&&p?.returnedRound===s.round&&p.returnedCard===cardId&&p.maintenanceUsedRound!==s.round?1:0);}
export function consumeTalentEquipmentCost(s:BattleState,o:PlayerId,unitId?:string,cardId?:string){const u=s.players[o].board.find(u=>u.card.instanceId===unitId);if(u&&isKylast(s,u)&&hasTalent(s,o,'grip-adjustment'))talentProgress(s,o).gripUsed=true;const p=s.talentState?.[o];if(cardId&&p?.returnedRound===s.round&&p.returnedCard===cardId)p.maintenanceUsedRound=s.round;}
export function talentAttached(s:BattleState,o:PlayerId,u:BoardUnit,previousIdentities:string[],newIdentity:string){if(!isKylast(s,u)||!hasTalent(s,o,'martial-versatility')||previousIdentities.includes(newIdentity))return;const p=talentProgress(s,o);if(p.versatilityRound===s.round)return;p.versatilityRound=s.round;u.attack++;u.roundAttackBonus=(u.roundAttackBonus??0)+1;}
export function markTalentAttack(s:BattleState,o:PlayerId,lane:CombatLane){const u=s.players[o].board.find(u=>u.card.instanceId===lane.attackerId);if(!u||!isKylast(s,u))return;const p=talentProgress(s,o);if(!p.firstAttack){p.firstAttack=true;lane.talentPrepared=hasTalent(s,o,'prepared-strike');}}
export function talentStrikeBonus(s:BattleState,o:PlayerId,u:BoardUnit,lane:CombatLane,strike:number){if(!isKylast(s,u))return 0;let bonus=strike===0&&lane.talentPrepared?1:0;
 const c=u.equipment?.find(e=>e.card.instanceId===lane.weapons[strike])?.card;
 const identity=c?(s.definitions[c.definitionId].baseId??c.definitionId):undefined;
 if(strike===0)lane.talentFirstWeapon=identity;
 if(strike===1&&u.evolved&&hasTalent(s,o,'calculated-switch')&&lane.talentFirstWeapon&&identity&&lane.talentFirstWeapon!==identity)bonus++;
 return bonus;
}
