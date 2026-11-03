import {queueHeal} from './champions.js';
import {opponent} from './types.js';
import type {BattleState,BattleEvent,PlayerId,Result} from './types.js';
function rounds(s:BattleState){s.laboratory??={deathRounds:{},upgrades:{},auraUnits:{},weaponRounds:{}};return s.laboratory.weaponRounds;}
export function tornadoEntry(s:BattleState,o:PlayerId){if(!s.players[o].board.some(u=>u.health>0&&s.definitions[u.card.definitionId].encounterSpecial==='tornado'))return;const key=`special-tornado-${o}`;if(rounds(s)[key]===s.round)return;rounds(s)[key]=s.round;const source=s.players[o].board.find(u=>s.definitions[u.card.definitionId].encounterSpecial==='tornado')!;const options=s.players[opponent(o)].board.filter(u=>u.health>0).map(u=>u.card.instanceId);if(options.length)(s.laboratoryChoices??=[]).push({owner:o,sourceId:source.card.instanceId,options});}
export function chooseTornado(s:BattleState,o:PlayerId,targetId:string,events:BattleEvent[]){const c=s.laboratoryChoices?.[0];if(!c||c.owner!==o||!c.options.includes(targetId)||!s.players[opponent(o)].board.some(u=>u.card.instanceId===targetId))return false;s.laboratoryChoices!.shift();queueHeal(s,o,'lab-tornado-entry',[{kind:'unit',player:opponent(o),instanceId:targetId}],events);return true;}
export function useSurgery(s:BattleState,o:PlayerId,targetId:string):Result {
 const bad=(error:string):Result=>({ok:false,state:s,error});
 if(s.phase!=='actions'||s.priorityOwner!==o||s.combat||s.stack.length||s.stackReturnOwner!==null)return bad('Surgery requires an ordinary action');
 if(!s.players[o].board.some(u=>u.health>0&&s.definitions[u.card.definitionId].encounterSpecial==='labotomia')||!s.players[o].board.some(u=>u.card.instanceId===targetId))return bad('Invalid surgery source or target');
 if(s.laboratory?.weaponRounds[`special-surgery-${o}`]===s.round)return bad('Surgery already used this round');
 const n=structuredClone(s),events:BattleEvent[]=[];rounds(n)[`special-surgery-${o}`]=n.round;queueHeal(n,o,'lab-surgery',[{kind:'unit',player:o,instanceId:targetId}],events);return {ok:true,state:n,events};
}
