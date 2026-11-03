import {relicCatalog,relicIds} from '../content/relics.js';
import type {RelicRarity} from '../content/relics.js';
import type {Difficulty} from './difficulty.js';
import {nextInt} from '../battle/random.js';
import type {RunState} from './run.js';
import {finishRouteReward} from './adventure-state.js';
export const playableRelicIds=['artifact-07','artifact-16','artifact-22'];
export interface RunRelics {active:string[];seen:string[];rewardedNodes:string[];offers:string[]}

export const relicWeights:Record<Difficulty,Record<RelicRarity,number>>={
 common:{common:75,rare:23,legendary:2},
 rare:{common:60,rare:35,legendary:5},
 epic:{common:40,rare:50,legendary:10},
 legendary:{common:25,rare:55,legendary:20},
 ultradimensional:{common:10,rare:55,legendary:35},
};
/** Each option rolls a rarity, then an equally weighted eligible identity.
 * Empty rarity pools are removed and remaining weights renormalized.
 * An empty result lets the reward caller apply the approved coin fallback.
 */
export function offerRelics(seed:number,difficulty:Difficulty,held:readonly string[],catalogIds:readonly string[]=relicIds){
 let state=seed;
 const excluded=new Set(held),ids:string[]=[];
 for(let slot=0;slot<3;slot++){
  const pools=(['common','rare','legendary'] as const).map(rarity=>({rarity,weight:relicWeights[difficulty][rarity],ids:catalogIds.filter(id=>!excluded.has(id)&&relicCatalog[id].rarity===rarity)})).filter(p=>p.ids.length);
  if(!pools.length)break;
  const roll=nextInt(state,1,pools.reduce((sum,p)=>sum+p.weight,0));state=roll.state;
  let value=roll.value;const pool=pools.find(p=>{value-=p.weight;return value<=0;})!;
  const pick=nextInt(state,0,pool.ids.length-1);state=pick.state;
  const id=pool.ids[pick.value];ids.push(id);excluded.add(id);
 }
 return {ids,state};
}
export const offerPlayableRelics=(seed:number,difficulty:Difficulty,held:readonly string[])=>offerRelics(seed,difficulty,held,playableRelicIds);
export function enableRelics(run:RunState,initial?:string):RunState {
 if(initial&&!playableRelicIds.includes(initial))throw Error('Relíquia inicial indisponível.');
 const n=structuredClone(run);n.relicRun={active:initial?[initial]:[],seen:initial?[initial]:[],offers:[],rewardedNodes:[]};return n;
}
export function takeRelic(run:RunState,id:string):RunState {
 if(run.stage!=='relic'||!run.relicRun?.offers.includes(id)||run.relicRun.active.includes(id)||!playableRelicIds.includes(id))throw Error('Relíquia indisponível.');
 const n=structuredClone(run),r=n.relicRun!;r.active.push(id);if(!r.seen.includes(id))r.seen.push(id);r.offers=[];r.rewardedNodes.push(n.map!.current!);finishRouteReward(n);return n;
}
