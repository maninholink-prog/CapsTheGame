import {felixEncounters} from './felix-adventure.js';
import {caveiraRoute,hasOpenChart,jupiterRoute} from './caveira-adventure.js';
import type {AdventureId} from './caveira-adventure.js';
import type {Champion} from '../content/schema.js';
import {openShop} from './shops.js';
import {createRun,offerRewards} from './run.js';
import {generateMap} from './difficulty.js';
import type {Difficulty} from './difficulty.js';
import {snapshot,restore,markVisited} from './adventure-state.js';
import {nextInt} from '../battle/random.js';
import type {RunState} from './run.js';
export function createMapRun(seed:number,protagonist:Champion='kylast',difficulty:Difficulty='common',adventure:AdventureId='dr-felix',initialDeckIds?:readonly string[]):RunState {
 const r=createRun(seed,protagonist,initialDeckIds);
 r.difficulty=difficulty;r.adventure=adventure;r.stage='map';r.battle=0;
 if(adventure==='caveira-dourada')Object.assign(r,caveiraRoute(seed,difficulty));
 else if(adventure==='jupiter')Object.assign(r,jupiterRoute(seed,difficulty));
 else {r.map=generateMap(seed,difficulty);r.encounters=felixEncounters(r.map,seed);}
 return r;
}
export function availableNodes(r:RunState){if(r.stage!=='map'||!r.map)return [];const ids=r.map.current?r.map.nodes.find(n=>n.id===r.map!.current)!.next:['start'];return r.map.nodes.filter(n=>ids.includes(n.id)&&!r.map!.visited.includes(n.id));}
function battleSeed(r:RunState){const roll=nextInt(r.rngState,0,0xffffffff);r.rngState=roll.state;r.battleSeed=roll.value;}
export function enterNode(r:RunState,id:string):RunState {
 const node=availableNodes(r).find(n=>n.id===id);if(!node)throw Error('Casa indisponível nesta rota.');const n=structuredClone(r);n.map!.current=id;
 if(node.kind==='event'){n.stage=node.event?.startsWith('shop-')?'shop':'event';if(n.stage==='shop')return openShop(n);}else {n.stage='battle';n.battle++;battleSeed(n);n.entry=snapshot(n);}
 return n;
}
export function resolveEvent(r:RunState,accept:boolean):RunState {
 if(r.stage!=='event'||!r.map)throw Error('Evento indisponível.');const node=r.map.nodes.find(n=>n.id===r.map!.current);if(!node||node.kind!=='event'||r.map.visited.includes(node.id))throw Error('Evento já resolvido.');
 const n=structuredClone(r);markVisited(n);n.stage='map';
 if(accept&&node.event==='caveira-trial')n.caveiraHint=true;
 if(accept){if(node.event==='rest')n.nexus=Math.min(n.maxNexus,n.nexus+5+(n.relicRun?.active.includes('artifact-16')?3:0));if(node.event==='rescue')n.revives=Math.min(5,n.revives+1);if(node.event==='supplies'){n.rewards=offerRewards(n);n.stage='reward';}}
 return n;
}
export function resolveCaveiraMap(r:RunState,action:'inspect'|'leave'|'fight'):RunState {
 if(action==='leave'&&r.adventure==='caveira-dourada'&&r.stage==='battle'&&r.caveiraAftermath==='battle')
  return {...structuredClone(r),stage:'won',caveiraAftermath:'lost'};
 if(r.adventure!=='caveira-dourada'||r.stage!=='won'||!hasOpenChart(r)||action==='fight'&&r.caveiraAftermath!=='cove')throw Error('Desvio indisponível.');
 const n=structuredClone(r);
 if(action==='leave')delete n.caveiraAftermath;
 else if(action==='inspect')n.caveiraAftermath='cove';
 else {n.caveiraAftermath='battle';n.stage='battle';n.battle++;battleSeed(n);}
 return n;
}
export function reviveRun(r:RunState,where:'retry'|'checkpoint'):RunState {
 if(r.stage!=='defeat'||!r.map||r.revives<1)throw Error('Reviver indisponível.');const saved=where==='checkpoint'?r.checkpoint:r.entry;if(!saved)throw Error('Ponto de retorno indisponível.');
 const n=restore(r,saved);n.revivesSpent=r.revivesSpent+1;
 n.revives=where==='checkpoint'?Math.max(0,saved.revives-(n.revivesSpent-saved.revivesSpent)):r.revives-1;
 n.nexus=n.maxNexus;
 if(where==='retry'){n.stage='battle';battleSeed(n);n.entry=snapshot(n);}else{n.stage='map';n.entry=undefined;}
 return n;
}
export function abandonRun(r:RunState):RunState {if(r.stage!=='defeat')throw Error('Derrota indisponível.');return {...structuredClone(r),stage:'lost',revives:0,coins:0};}

