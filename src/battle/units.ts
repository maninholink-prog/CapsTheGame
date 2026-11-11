import {rubelHasTalent} from './rubel-talents.js';
import {arcataHasTalent} from './arcata-talents.js';
import {abeHasTalent} from './abe-talents.js';
import {relicUnitPlayed} from './relics.js';
import {laboratoryEntry} from './laboratory.js';
import {tornadoEntry} from './lab-specials.js';
import {narrativeEntry} from './narrative.js';
import {hasTalent} from './kylast-talents.js';
import {expandedEntry} from './expansion.js';
import {caveiraEntry} from './caveira.js';
import {drawOne} from './draw.js';
import { onAllyEntered } from './champions.js';
import { onUnitEntered } from './supports.js';
import type { BattleEvent, BattleState, CardInstance, PlayerId, TargetRef } from './types.js';

// Internal mutation helper. The caller owns the clone and validates source/position.
export function enterUnit(state: BattleState, owner: PlayerId, source: CardInstance, position: number, events: BattleEvent[], targets?: TargetRef[], ignoreSide=false,played=false): boolean {
  const definition = state.definitions[source.definitionId];
  if (definition?.kind !== 'unit' || state.players[owner].board.length >= 5) return false;
  if(definition.unique&&state.players[owner].board.some(u=>(state.definitions[u.card.definitionId].baseId??u.card.definitionId)===(definition.baseId??definition.id)))return false;
  if (definition.champion && state.players[owner].board.some(unit => {
    const def = state.definitions[unit.card.definitionId];
    return def?.kind === 'unit' && def.champion === definition.champion;
  })) return false;
  const evolved = definition.champion === 'kylast' && state.evolvedKylast[owner];
  const life=(definition.champion==='kylast'&&hasTalent(state,owner,'iron-constitution')||definition.champion==='abe'&&abeHasTalent(state,owner,'abe-frame')||definition.champion==='arcata'&&arcataHasTalent(state,owner,'arcata-life')||definition.champion==='rubel'&&rubelHasTalent(state,owner,'rubel-vigor'))?1:0;
  const mastery=evolved&&hasTalent(state,owner,'master-of-all')?1:0;
  const unit = { card: source, attack: definition.attack + (evolved ? 1 : 0)+mastery, health: definition.health + (evolved ? 1 : 0)+life,
    maxHealth: definition.health + (evolved ? 1 : 0)+life, evolved, ...(definition.keyword?{keywords:[definition.keyword]}:{}) };
  state.players[owner].board.splice(position, 0, unit);
  events.push({ type: 'unitEntered', player: owner, instanceId: source.instanceId, position });
  onUnitEntered(state, owner, unit, events);
  onAllyEntered(state, owner, unit, events, targets,ignoreSide);
  narrativeEntry(state,owner,unit,events,targets,ignoreSide);
  expandedEntry(state,owner,unit,events);laboratoryEntry(state,owner,unit,events);tornadoEntry(state,owner);
  caveiraEntry(state,owner,unit,events);
  if(played)relicUnitPlayed(state,owner,unit);
  for(let i=0;i<(definition.entryDraw??0)+(definition.drawOnEntry?1:0)&&state.phase!=='ended';i++){const drawn=drawOne(state,owner);if(drawn.ok){Object.assign(state,drawn.state);events.push(...drawn.events);}}
  return true;
}

