import type {BattleState,BattleEvent,BoardUnit,PlayerId} from './types.js';
import {queueHeal} from './champions.js';
import {nextInt} from './random.js';
export interface BattleRelics {active:Record<PlayerId,string[]>;playedRound:Partial<Record<PlayerId,number>>;healedRound:Partial<Record<PlayerId,number>>}
export function attachRelics(s:BattleState,ids:string[]){
 s.relicState={active:{p1:[...ids],p2:[]},playedRound:{},healedRound:{}};
 s.definitions['relic-heal-virtue']={id:'relic-heal-virtue',name:'Excalibur',kind:'spell',cost:0,speed:'fast',target:{kind:'unit',side:'ally',min:1,max:1},effect:{type:'heal',amount:1}};
}
export function relicUnitPlayed(s:BattleState,o:PlayerId,u:BoardUnit){
 const r=s.relicState;if(!r?.active[o].includes('artifact-22')||r.playedRound[o]===s.round)return;
 r.playedRound[o]=s.round;u.keywords??=[];
 if(!u.keywords.includes('quick')){u.keywords.push('quick');(u.temporaryKeywords??=[]).push('quick');}
}
export function relicRound(s:BattleState,events:BattleEvent[]){
 const r=s.relicState;if(!r||s.phase==='ended')return;
 for(const o of [s.attackOwner??'p1',s.attackOwner==='p1'?'p2':'p1'] as PlayerId[]){
  if(!r.active[o].includes('artifact-07')||r.healedRound[o]===s.round)continue;r.healedRound[o]=s.round;
  const wounded=s.players[o].board.filter(u=>u.health>0&&u.health<u.maxHealth);if(!wounded.length)continue;
  const min=Math.min(...wounded.map(u=>u.health)),ties=wounded.filter(u=>u.health===min);
  let index=0;if(ties.length>1){const pick=nextInt(s.rngState,0,ties.length-1);s.rngState=pick.state;index=pick.value;}
  queueHeal(s,o,'relic-heal-virtue',[{kind:'unit',player:o,instanceId:ties[index].card.instanceId}],events);
  // Stack resolves from the end: units of this side precede its relic;
  // the attack owner's effects precede the other side's effects.
  const pending=s.stack.pop()!;
  const insertAt=o===s.attackOwner?s.stack.reduce((last,p,i)=>p.owner!==o?i+1:last,0):0;
  s.stack.splice(insertAt,0,pending);
 }
}
