import {progress,evolveAllies,queueHeal} from './champions.js';
import {narrativeResolved,once} from './narrative.js';
import {opponent} from './types.js';
import type {CardDefinition} from '../content/schema.js';
import type {BattleState,BattleEvent,BoardUnit,PlayerId,TargetRef,CombatLane,CombatState} from './types.js';

/** Encounter progress is owned by the current controller, not by card identity. */
export interface LaboratoryState {
 deathRounds:Partial<Record<PlayerId,number>>;
 upgrades:Partial<Record<PlayerId,number>>;
 auraUnits:Record<string,number>;
 weaponRounds:Record<string,number>;
}
type LaboratoryBattle=BattleState & {laboratory?:LaboratoryState};
type LabDefinition=CardDefinition & {experiment?:boolean;encounterSpecial?:string};
type LabLane=CombatLane & {laboratoryUsedWeapons?:string[];laboratoryAfterAttack?:boolean;laboratoryBlocked?:boolean};
function state(s:BattleState):LaboratoryState {return (s as LaboratoryBattle).laboratory??=(( {deathRounds:{},upgrades:{},auraUnits:{},weaponRounds:{}}));}
const definition=(s:BattleState,u:BoardUnit)=>s.definitions[u.card.definitionId] as LabDefinition;
const isFelix=(s:BattleState,u:BoardUnit)=>definition(s,u)?.encounterSpecial==='felix';
function queue(s:BattleState,o:PlayerId,id:string,targets:TargetRef[],events:BattleEvent[],sourceId?:string){queueHeal(s,o,id,targets,events);s.stack.at(-1)!.abilitySourceId=sourceId;}
function evolve(s:BattleState,o:PlayerId,events:BattleEvent[]){
 if((state(s).upgrades[o]??0)<4)return;
 for(const u of s.players[o].board)if(u.health>0&&isFelix(s,u)&&!u.evolved){u.evolved=true;u.attack+=2;u.health+=2;u.maxHealth+=2;}
 syncFelixAura(s);
}
/** Reconcile rather than accumulate: removal, control changes and re-entry remove the old aura. */
export function syncFelixAura(s:BattleState){
 const lab=state(s),present=new Set<string>();
 for(const o of ['p1','p2'] as const){const active=s.players[o].board.some(u=>u.health>0&&u.evolved&&isFelix(s,u));
  for(const u of s.players[o].board){const id=u.card.instanceId;present.add(id);const bonus=active&&u.health>0&&definition(s,u)?.experiment&&!isFelix(s,u)?1:0;u.attack+=bonus-(lab.auraUnits[id]??0);if(bonus)lab.auraUnits[id]=bonus;else delete lab.auraUnits[id];}
 }
 for(const id of Object.keys(lab.auraUnits))if(!present.has(id))delete lab.auraUnits[id];
}
/** Targeted entry powers are queued by the ordinary entrySpell path. */
export function laboratoryEntry(s:BattleState,o:PlayerId,u:BoardUnit,events:BattleEvent[]){
 if(definition(s,u)?.expansion==='lab-collector'&&state(s).deathRounds[o]===s.round)queue(s,o,'lab-collector-draw',[],events,u.card.instanceId);
 evolve(s,o,events);syncFelixAura(s);
}
export function laboratoryDeaths(s:BattleState,deaths:{owner:PlayerId;unit:BoardUnit}[],events:BattleEvent[]){
 const doomed=new Set(deaths.map(d=>d.unit.card.instanceId));
 for(const d of deaths){state(s).deathRounds[d.owner]=s.round;
  if(definition(s,d.unit)?.expansion==='lab-prototype'){
   const targets:TargetRef[]=[];for(const o of ['p1','p2'] as const)for(const u of s.players[o].board)if(u.health>0&&!doomed.has(u.card.instanceId))targets.push({kind:'unit',player:o,instanceId:u.card.instanceId});
   if(targets.length)queue(s,d.owner,'lab-prototype-death',targets,events,d.unit.card.instanceId);
  }
 }
 syncFelixAura(s);
}
/** Called exactly once after a successful Upgrade, sharing Abe's normal resolution path. */
export function laboratoryUpgrade(s:BattleState,o:PlayerId,d:CardDefinition,targets:TargetRef[],events:BattleEvent[]){
 if(!d.upgrade)return;
 for(const t of targets)if(t.kind==='unit'){const u=s.players[t.player].board.find(u=>u.card.instanceId===t.instanceId&&u.health>0);if(u&&definition(s,u)?.expansion==='lab-guinea-pig'&&once(s,u,'laboratory-upgrade'))u.attack++;}
 if(targets.some(t=>t.kind==='unit'&&t.player===o&&s.players[o].board.some(u=>u.card.instanceId===t.instanceId&&u.health>0))&&s.players[o].board.some(u=>u.health>0&&isFelix(s,u))){const lab=state(s);lab.upgrades[o]=(lab.upgrades[o]??0)+1;evolve(s,o,events);}
}
export function laboratoryAttack(s:BattleState,o:PlayerId,lanes:CombatLane[],events:BattleEvent[]){
 for(const lane of lanes){const u=s.players[o].board.find(u=>u.card.instanceId===lane.attackerId&&u.health>0);if(!u)continue;
  if(definition(s,u)?.expansion==='lab-executioner'&&u.equipment?.length)queue(s,o,'lab-executioner-nexus',[{kind:'nexus',player:opponent(o)}],events,u.card.instanceId);
  for(const id of new Set(lane.weapons)){const gear=u.equipment?.find(e=>e.card.instanceId===id);if(gear&&s.definitions[gear.card.definitionId]?.expansion==='lab-coil'&&state(s).weaponRounds[gear.card.instanceId]!==s.round){state(s).weaponRounds[gear.card.instanceId]=s.round;queue(s,o,'lab-coil-nexus',[{kind:'nexus',player:opponent(o)}],events,u.card.instanceId);}}
 }
}
export function laboratoryBlocked(s:BattleState,combat:CombatState,events:BattleEvent[]){
 for(const plain of combat.lanes){const lane=plain as LabLane;if(lane.laboratoryBlocked)continue;lane.laboratoryBlocked=true;if(!lane.blockerId)continue;const u=s.players[combat.attacker].board.find(u=>u.card.instanceId===lane.attackerId&&u.health>0);if(!u)continue;
  if([...new Set(lane.weapons)].some(id=>{const g=u.equipment?.find(e=>e.card.instanceId===id);return g&&s.definitions[g.card.definitionId]?.expansion==='lab-lance';}))queue(s,combat.attacker,'lab-lance-weaken',[{kind:'unit',player:opponent(combat.attacker),instanceId:lane.blockerId}],events,u.card.instanceId);
 }
}
/** Actual strikes are recorded on the lane, so canceled attacks and unused second weapons do not recoil. */
export function laboratoryAfterAttack(s:BattleState,combat:CombatState,events:BattleEvent[]){
 for(const plain of combat.lanes){const lane=plain as LabLane;if(lane.laboratoryAfterAttack)continue;lane.laboratoryAfterAttack=true;const u=s.players[combat.attacker].board.find(u=>u.card.instanceId===lane.attackerId&&u.health>0);if(!u)continue;
  if((lane.laboratoryUsedWeapons??[]).some(id=>{const g=u.equipment?.find(e=>e.card.instanceId===id);return g&&s.definitions[g.card.definitionId]?.expansion==='lab-piston';}))queue(s,combat.attacker,'lab-piston-recoil',[{kind:'unit',player:combat.attacker,instanceId:u.card.instanceId}],events,u.card.instanceId);
 }
}

export function paidEquipmentUpgrade(s:BattleState,o:PlayerId,d:CardDefinition,unitId:string,events:BattleEvent[]){if(!d.upgrade)return;const targets:TargetRef[]=[{kind:'unit',player:o,instanceId:unitId}];progress(s,o).upgrades++;laboratoryUpgrade(s,o,d,targets,events);narrativeResolved(s,o,d,targets,0,events);evolveAllies(s,o,events);}
