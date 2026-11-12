import type {TalentId} from '../profile/talents.js';
import type {CardDefinition} from '../content/schema.js';
import {drawInto,addAttack} from './narrative.js';
import type {BattleState,BattleEvent,BoardUnit,PlayerId} from './types.js';

export function thalionHasTalent(s:BattleState,o:PlayerId,id:TalentId){return s.players[o].protagonist==='thalion'&&Boolean(s.talentLoadouts?.[o]?.includes(id));}
function used(s:BattleState,o:PlayerId,id:TalentId){const p=s.talentState??={};const t=p[o]??={};return t.thalion??=[];}
export function thalionUse(s:BattleState,o:PlayerId,id:TalentId){if(!thalionHasTalent(s,o,id)||used(s,o,id).includes(id))return false;used(s,o,id).push(id);return true;}
export function thalionUnused(s:BattleState,o:PlayerId,id:TalentId){return thalionHasTalent(s,o,id)&&!s.talentState?.[o]?.thalion?.includes(id);}
export function thalionSetup(s:BattleState,o:PlayerId,events:BattleEvent[]){if(!thalionHasTalent(s,o,'thalion-score'))return;const p=s.players[o],i=p.deck.findIndex(c=>s.definitions[c.definitionId]?.music);if(i<0)return;const [c]=p.deck.splice(i,1);events.push({type:'cardDrawn',player:o,instanceId:c.instanceId});if(p.hand.length<10)p.hand.push(c);else{p.discard.push(c);events.push({type:'cardDiscarded',player:o,instanceId:c.instanceId});}}
export function thalionEntry(s:BattleState,o:PlayerId,u:BoardUnit,events:BattleEvent[]){const id=s.definitions[u.card.definitionId]?.baseId??u.card.definitionId;if(id==='off-key-musician'&&thalionUse(s,o,'thalion-stage-entrance'))drawInto(s,o,events);}
export function thalionEvolved(s:BattleState,o:PlayerId,u:BoardUnit){if(thalionUse(s,o,'thalion-breath'))s.players[o].reserve=Math.min(3,s.players[o].reserve+1);if(thalionUse(s,o,'thalion-united-voices'))for(const ally of s.players[o].board)if(ally!==u&&ally.health>0)addAttack(ally,1,true);}
export function thalionMusicResolved(s:BattleState,o:PlayerId,events:BattleEvent[]){if(s.heroProgress?.[o]?.music===3&&thalionUse(s,o,'thalion-refrain'))drawInto(s,o,events);}
export function thalionTargetRule(s:BattleState,o:PlayerId,d:CardDefinition){return d.kind!=='unit'&&d.kind!=='equipment'&&d.id==='charm-monster'&&thalionUnused(s,o,'thalion-long-charm')?{...d.target,max:3}:d.kind!=='unit'&&d.kind!=='equipment'?d.target:null;}
