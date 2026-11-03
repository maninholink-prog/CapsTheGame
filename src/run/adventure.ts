import {felixEncounters} from './felix-adventure.js';
import type {Champion} from '../content/schema.js';
import {openShop} from './shops.js';
import {createRun,offerRewards} from './run.js';
import {generateMap} from './difficulty.js';
import type {Difficulty} from './difficulty.js';
import {snapshot,restore,markVisited} from './adventure-state.js';
import {nextInt} from '../battle/random.js';
import type {RunState} from './run.js';
export function createMapRun(seed:number,protagonist:Champion='kylast',difficulty:Difficulty='common'):RunState {const r=createRun(seed,protagonist);r.difficulty=difficulty;r.map=generateMap(seed,difficulty);r.adventure='dr-felix';r.encounters=felixEncounters(r.map,seed);r.stage='map';r.battle=0;return r;}
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
 if(accept){if(node.event==='rest')n.nexus=Math.min(n.maxNexus,n.nexus+5+(n.relicRun?.active.includes('artifact-16')?3:0));if(node.event==='rescue')n.revives=Math.min(5,n.revives+1);if(node.event==='supplies'){n.rewards=offerRewards(n);n.stage='reward';}}
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

