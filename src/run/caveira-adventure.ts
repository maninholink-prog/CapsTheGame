import type {CaveiraDeck} from '../content/caveira.js';
import {generateMap} from './difficulty.js';
import type {Difficulty} from './difficulty.js';
import type {RunState} from './run.js';
import {jupiterDecks} from '../content/jupiter.js';

export type AdventureId='dr-felix'|'caveira-dourada'|'jupiter';
export const adventureNames:Record<AdventureId,string>={'dr-felix':'Laboratório do Dr. Félix','caveira-dourada':'Caveira Dourada','jupiter':'Aventura de Júpiter'};
export const caveiraVerse='Quando o mar se cala, a coroa mostra o caminho.';

export function jupiterRoute(seed:number,difficulty:Difficulty){
 const map=generateMap(seed,difficulty),encounters:Record<string,keyof typeof jupiterDecks>={};let routeBattle=0;
 for(const node of map.nodes){
  if(node.kind==='event')continue;
  if(node.kind==='finalboss')encounters[node.id]='jupiter-kraken';
  else if(node.id==='start')encounters[node.id]='jupiter-road';
  else {encounters[node.id]=routeBattle===0?'jupiter-rats':node.kind==='midboss'||routeBattle===1?'jupiter-scarabs':'jupiter-aquatic';routeBattle++;}
 }
 return {map,encounters};
}

export function caveiraRoute(seed:number,difficulty:Difficulty){
 const map=generateMap(seed,difficulty);
 const byId=new Map(map.nodes.map(node=>[node.id,node]));
 const forks=map.nodes.map(node=>node.next.map(id=>byId.get(id)!));
 const fork=forks.find(nodes=>nodes.some(node=>node.kind==='battle')&&nodes.some(node=>node.kind==='event'&&!node.event?.startsWith('shop-')))!;
 const trial=fork.find(node=>node.kind==='event')!;
 const elite=fork.find(node=>node.kind==='battle')!;
 trial.event='caveira-trial';
 const encounters:Record<string,CaveiraDeck>={};
 for(const node of map.nodes){
  if(node.kind==='event')continue;
  if(node===elite)encounters[node.id]='caveira-megalodon';
  else if(node.id==='start')encounters[node.id]='caveira-crossing';
  else if(node.kind==='midboss')encounters[node.id]='caveira-duelist';
  else if(node.kind==='finalboss')encounters[node.id]='caveira-general';
  else encounters[node.id]='caveira-island';
 }
 return {map,encounters};
}

export function hasOpenChart(run:RunState){
 return run.caveiraAftermath==='chart'||run.caveiraAftermath==='cove';
}

export function activeAdventure(run:RunState|null){
 return !!run&&(!['won','lost'].includes(run.stage)||hasOpenChart(run));
}
