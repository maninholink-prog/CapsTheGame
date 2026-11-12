import {deferFelixVictory} from './encounters.js';
import {laboratoryDeaths,syncFelixAura} from './laboratory.js';
import type { BattleEvent, BattleState, CardInstance, PlayerId } from './types.js';
import {talentReturn} from './kylast-talents.js';
import {kuaraStolenUnitDeath} from './kuara-talents.js';
import {beforeDeaths,cleanupMarks,evolveExpanded} from './expansion.js';

export function returnCard(state: BattleState, playerId: PlayerId, card: CardInstance, events: BattleEvent[]): void {
  const player = state.players[playerId];
  if (player.hand.length < 10) {
    player.hand.push(card);
    if(state.definitions[card.definitionId]?.kind==='equipment')talentReturn(state,playerId,card.instanceId);
    events.push({ type: 'cardReturned', player: playerId, instanceId: card.instanceId });
  } else {
    player.discard.push(card);
    events.push({ type: 'cardDiscarded', player: playerId, instanceId: card.instanceId });
  }
}

// Only call on a private mutable clone, never on caller-owned state.
export function removeUnit(state: BattleState, playerId: PlayerId, instanceId: string, events: BattleEvent[], reason: 'death' | 'recall' | 'obliterate' = 'death',batch=false): void {
  const player = state.players[playerId];
  const index = player.board.findIndex(u => u.card.instanceId === instanceId);
  if (index < 0) return;
  if(reason==='death'&&!batch){laboratoryDeaths(state,[{owner:playerId,unit:player.board[index]}],events);beforeDeaths(state,[{owner:playerId,unit:player.board[index]}],events);}
  const [unit] = player.board.splice(index, 1);
  if (reason === 'death') {
    player.deathRecords.push(structuredClone(unit.card));
    const returnStolen=kuaraStolenUnitDeath(state,playerId,unit)&&player.hand.length<10;
    if(!returnStolen)player.discard.push(unit.card);
    events.push({ type: 'unitDied', player: playerId, instanceId });
    if(returnStolen){player.hand.push(unit.card);events.push({type:'cardReturned',player:playerId,instanceId});}
  } else {
    if (reason === 'recall') returnCard(state, playerId, unit.card, events);
    events.push({ type: 'unitRemoved', player: playerId, instanceId, reason });
  }
  for (const gear of unit.equipment ?? []) returnCard(state, gear.owner ?? playerId, gear.card, events);
  if(!batch){syncFelixAura(state);cleanupMarks(state);evolveExpanded(state,playerId,events);}
}

export function settle(state: BattleState, events: BattleEvent[]): void {
  const deaths=(['p1','p2'] as const).flatMap(owner=>state.players[owner].board.filter(u=>u.health<=0).map(unit=>({owner,unit})));
  if(deaths.length){laboratoryDeaths(state,deaths,events);beforeDeaths(state,deaths,events);}
  for (const id of ['p1', 'p2'] as const) {
    for (const unit of [...state.players[id].board]) {
      if (unit.health <= 0) removeUnit(state, id, unit.card.instanceId, events,'death',true);
    }
  }
  syncFelixAura(state);cleanupMarks(state);
  if(deaths.length){for(const o of ['p1','p2'] as const)evolveExpanded(state,o,events);for(const owner of ['p1','p2'] as const){const hero=state.players[owner].board.find(u=>state.definitions[u.card.definitionId]?.kind==='unit'&&(state.definitions[u.card.definitionId] as import('../content/schema.js').CardDefinition & {kind:'unit'}).champion==='lazaro'),died=deaths.some(d=>d.owner===owner&&state.definitions[d.unit.card.definitionId]?.kind==='unit'&&(state.definitions[d.unit.card.definitionId] as import('../content/schema.js').CardDefinition & {kind:'unit'}).champion==='lazaro');if(hero?.evolved&&died&&state.talentLoadouts?.[owner]?.includes('lazaro-unbroken-oath')&&!state.talentState?.[owner]?.lazaro?.used.includes('lazaro-unbroken-oath')){state.talentState??={};const talent=state.talentState[owner]??={};talent.lazaro??={used:[]};talent.lazaro.used.push('lazaro-unbroken-oath');state.players[owner].nexus=Math.min(state.players[owner].maxNexus,state.players[owner].nexus+2);}}}
  const p1Dead = state.players.p1.nexus <= 0;
  const p2Dead = state.players.p2.nexus <= 0;
  if(deferFelixVictory(state,p1Dead,p2Dead))return;
  if (p1Dead || p2Dead) {
    state.phase = 'ended';
    state.winner = p1Dead && p2Dead ? 'draw' : p1Dead ? 'p2' : 'p1';
    state.priorityOwner = null;
    events.push({ type: 'battleEnded', winner: state.winner });
  }
}

