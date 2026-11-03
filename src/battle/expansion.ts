import {queueKingDischarge} from './encounters.js';
import {championUnit,progress,queueHeal} from './champions.js';
import {addAttack,drawInto,once} from './narrative.js';
import {returnCard,settle} from './state-events.js';
import {enterUnit} from './units.js';
import {opponent} from './types.js';
import type {BattleState,BattleEvent,BoardUnit,CardInstance,ExpansionProgress,PlayerId,TargetRef} from './types.js';
import type {CardDefinition} from '../content/schema.js';
export function heroProgress(s:BattleState,owner:PlayerId):ExpansionProgress {const empty=()=>({deaths:0,stolen:0,music:0,executions:0});s.heroProgress??={p1:empty(),p2:empty()};return s.heroProgress[owner];}
const alive=(s:BattleState,o:PlayerId)=>s.players[o].board.filter(u=>u.health>0);
const ability=(s:BattleState,u:BoardUnit)=>s.definitions[u.card.definitionId]?.expansion;
export function queueExpansion(s:BattleState,o:PlayerId,id:string,targets:TargetRef[],events:BattleEvent[],sourceId?:string){queueHeal(s,o,id,targets,events);const p=s.stack.at(-1)!;p.abilitySourceId=sourceId;return p;}
export function setForm(s:BattleState,o:PlayerId,u:BoardUnit,form:'bear'|'tiger'){
 const old=u.formPower??0;if(u.form==='bear'){u.maxHealth-=old;u.health-=old;}else if(u.form==='tiger')u.attack-=old;
 const power=u.evolved?4:2;u.form=form;u.formPower=power;
 if(form==='bear'){u.maxHealth+=power;u.health+=power;}else u.attack+=power;
}
export function chooseForm(s:BattleState,o:PlayerId,form:'bear'|'tiger',events:BattleEvent[]):boolean {const c=s.formChoices?.[0];if(!c||c.owner!==o||!['bear','tiger'].includes(form))return false;const u=s.players[o].board.find(u=>u.card.instanceId===c.unitId);s.formChoices!.shift();if(!u)return false;setForm(s,o,u,form);settle(s,events);return true;}
export function evolveExpanded(s:BattleState,o:PlayerId,events:BattleEvent[]){const p=heroProgress(s,o);for(const [hero,ready] of [['youro',p.deaths>=4],['kuara',p.stolen>=6],['thalion',p.music>=6],['lazaro',p.executions>=2]] as const){if(!ready)continue;progress(s,o).evolved[hero]=true;const u=championUnit(s,o,hero);if(!u||u.evolved||u.health<=0)continue;u.evolved=true;u.attack++;u.health++;u.maxHealth++;if(hero==='youro'&&u.form)setForm(s,o,u,u.form);events.push({type:'championEvolved',player:o,champion:hero});}}
export function stealCards(s:BattleState,o:PlayerId,amount:number,emptyFatigue:boolean,events:BattleEvent[]){let stolen=0;const enemy=opponent(o);for(let i=0;i<amount&&s.phase!=='ended';i++){const c=s.players[enemy].deck.pop();if(c){c.stolenFrom=enemy;returnCard(s,o,c,events);heroProgress(s,o).stolen++;stolen++;}else if(emptyFatigue){const p=s.players[enemy];p.fatigue++;p.nexus=Math.max(0,p.nexus-p.fatigue);events.push({type:'fatigueDamage',player:enemy,amount:p.fatigue});settle(s,events);}}
 if(stolen)for(const id of alive(s,o).filter(u=>ability(s,u)==='ymir').map(u=>u.card.instanceId)){const u=s.players[o].board.find(u=>u.card.instanceId===id);if(u&&once(s,u,'steal'))drawInto(s,o,events);if(s.phase==='ended')break;}
 if(s.phase!=='ended')evolveExpanded(s,o,events);
}
export function musicDiscount(s:BattleState,o:PlayerId,d:CardDefinition){return d.music?alive(s,o).filter(u=>ability(s,u)==='illusory-instrument'&&u.triggerRounds?.['music-cost']!==s.round).length:0;}
export function consumeMusicDiscount(s:BattleState,o:PlayerId,d:CardDefinition){if(d.music)for(const u of alive(s,o))if(ability(s,u)==='illusory-instrument')once(s,u,'music-cost');}
function tutorMusic(s:BattleState,o:PlayerId,events:BattleEvent[]){const p=s.players[o],i=p.deck.findIndex(c=>s.definitions[c.definitionId].music);if(i<0)return;const [c]=p.deck.splice(i,1);events.push({type:'cardDrawn',player:o,instanceId:c.instanceId});if(p.hand.length<10)p.hand.push(c);else{p.discard.push(c);events.push({type:'cardDiscarded',player:o,instanceId:c.instanceId});}}
export function expandedEntry(s:BattleState,o:PlayerId,u:BoardUnit,events:BattleEvent[]){const a=ability(s,u);
 if(a==='youro')(s.formChoices??=[]).push({owner:o,unitId:u.card.instanceId});
 if(a==='pocket-scout')queueExpansion(s,o,'pocket-scout-entry',[],events);
 if(a==='lyari')queueExpansion(s,o,'lyari-heal',[{kind:'nexus',player:o}],events);
 if(a==='nerion')queueExpansion(s,o,'nerion-mark',[],events,u.card.instanceId);
 if(a==='shadow-steed')queueExpansion(s,o,'steed-entry',[],events);
 if(a==='guild-administrator')tutorMusic(s,o,events);
 evolveExpanded(s,o,events);
}
export function expandedRound(s:BattleState){for(const o of ['p1','p2'] as const)for(const u of alive(s,o))if(ability(s,u)==='youro')(s.formChoices??=[]).push({owner:o,unitId:u.card.instanceId});}
export function expandedResolved(s:BattleState,o:PlayerId,d:CardDefinition,source:CardInstance,events:BattleEvent[],isAbility=false){
 if(!isAbility&&source.stolenFrom===opponent(o))for(const u of alive(s,o))if(ability(s,u)==='balimor'&&once(s,u,'stolen-resolved')){u.attack++;u.health++;u.maxHealth++;}
 if(d.music&&!isAbility){const hero=championUnit(s,o,'thalion');if(hero&&hero.health>0&&heroProgress(s,o).musicRound!==s.round){heroProgress(s,o).musicRound=s.round;const pending=queueExpansion(s,o,'thalion-dissonance',[{kind:'nexus',player:opponent(o)}],events);pending.damageBonus=hero.evolved?1:0;}
 for(const u of alive(s,o))if(ability(s,u)==='off-key-musician'&&once(s,u,'music'))addAttack(u,2,true);
 heroProgress(s,o).music++;evolveExpanded(s,o,events);}
}
export function nexusStrike(s:BattleState,o:PlayerId,u:BoardUnit,amount:number,events:BattleEvent[]){if(amount<=0||ability(s,u)!=='kuara'||heroProgress(s,o).kuaraRound===s.round)return;heroProgress(s,o).kuaraRound=s.round;queueExpansion(s,o,'kuara-strike',[],events).abilityAmount=u.evolved?2:1;}
export function cleanupMarks(s:BattleState){for(const o of ['p1','p2'] as const){const m=s.executionMarks?.[o];if(m&&(!s.players[o].board.some(u=>u.card.instanceId===m.sourceId)||!s.players[opponent(o)].board.some(u=>u.card.instanceId===m.targetId)))delete s.executionMarks![o];}if(s.formChoices)s.formChoices=s.formChoices.filter(c=>s.players[c.owner].board.some(u=>u.card.instanceId===c.unitId));}
export function markWeakest(s:BattleState,o:PlayerId,sourceId:string|undefined){cleanupMarks(s);if(!sourceId||s.executionMarks?.[o]||!alive(s,o).some(u=>u.card.instanceId===sourceId))return;const enemy=alive(s,opponent(o));const victim=enemy.map((u,index)=>({u,index})).sort((a,b)=>a.u.attack-b.u.attack||a.u.health-b.u.health||s.definitions[a.u.card.definitionId].cost-s.definitions[b.u.card.definitionId].cost||a.index-b.index)[0]?.u;if(victim)(s.executionMarks??={})[o]={sourceId,targetId:victim.card.instanceId};}
export interface Death {owner:PlayerId;unit:BoardUnit}
// All doomed units are snapshotted before any are removed. Buffs never rescue them.
export function beforeDeaths(s:BattleState,deaths:Death[],events:BattleEvent[]){
 for(const o of ['p1','p2'] as const){const hero=championUnit(s,o,'youro');if(hero)heroProgress(s,o).deaths+=deaths.filter(d=>d.owner===o&&d.unit.card.instanceId!==hero.card.instanceId).length;}
 for(const d of deaths){const o=d.owner,u=d.unit,a=ability(s,u),cause=s.deathCauses?.[u.card.instanceId];
  if(a==='cycle-guardian')queueExpansion(s,o,'guardian-sprout',[],events);
  if(a==='living-wallet')queueExpansion(s,o,'living-wallet-steal',[],events);
  if(a==='fire-elemental')queueExpansion(s,o,'fire-elemental-death',[],events);
  for(const other of alive(s,o)){if(other.card.instanceId===u.card.instanceId)continue;const b=ability(s,other);if(b==='spirit-tiger')other.attack++;if(b==='baru'&&once(s,other,'death'))for(const ally of alive(s,o)){ally.maxHealth++;ally.health++;}}
  if(!cause)continue;const mark=s.executionMarks?.[cause],marked=mark?.targetId===u.card.instanceId;
  const lazaro=championUnit(s,cause,'lazaro');
  if(marked){delete s.executionMarks![cause];if(lazaro){heroProgress(s,cause).executions++;if(lazaro.health>0)lazaro.attack++;}for(const ally of alive(s,cause)){const b=ability(s,ally);if(b==='last-cry-acolyte')ally.attack++;if(b==='loumar'&&once(s,ally,'execution'))queueExpansion(s,cause,'loumar-heal',[{kind:'nexus',player:cause}],events);}}
  if(lazaro&&lazaro.health>0&&!s.roundEnding&&heroProgress(s,cause).lazaroRound!==s.round){heroProgress(s,cause).lazaroRound=s.round;queueExpansion(s,cause,'nerion-mark',[],events,lazaro.card.instanceId);}
 }
}
export function recordDamage(s:BattleState,target:TargetRef,owner:PlayerId){if(target.kind!=='unit')return;const u=s.players[target.player].board.find(u=>u.card.instanceId===target.instanceId);if(u&&u.health<=0)(s.deathCauses??={})[u.card.instanceId]=owner;}
export function startRoundEnding(s:BattleState,events:BattleEvent[]){if(s.roundEnding)return false;s.roundEnding=true;cleanupMarks(s);for(const o of ['p1','p2'] as const){const m=s.executionMarks?.[o];if(m)queueExpansion(s,o,'execution',[{kind:'unit',player:opponent(o),instanceId:m.targetId}],events,m.sourceId);}queueKingDischarge(s,events);return s.stack.length>0;}
export function summonUnits(s:BattleState,o:PlayerId,id:string,count:number,events:BattleEvent[]){for(let i=0;i<count&&s.players[o].board.length<5&&s.phase!=='ended';i++)enterUnit(s,o,{definitionId:id,instanceId:`summon-${o}-${s.nextEffectId++}`,generated:true},s.players[o].board.length,events);}

