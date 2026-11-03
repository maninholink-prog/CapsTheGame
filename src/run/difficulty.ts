import type {Rarity} from '../content/schema.js';
import {commonMap} from './map.js';
import type {MapNode,MapProgress,EventKind} from './map.js';
import {shuffle} from '../battle/random.js';
export type Difficulty=Rarity;
export interface DifficultyRule {nodes:number;battles:number;events:number;cap:number;coinsStart:number;coinsEnd:number;enemyNexus:[number,number,number];weeklyWin:number;weeklyFinish:number;masteryMultiplier:number;boosterKit:Rarity[];}
const kit:Rarity[]=['common','rare','epic','legendary'];
export const difficultyRules:Record<Difficulty,DifficultyRule>={
 common:{nodes:10,battles:5,events:5,cap:150,coinsStart:20,coinsEnd:35,enemyNexus:[20,25,30],weeklyWin:10,weeklyFinish:50,masteryMultiplier:1,boosterKit:kit.slice(0,1)},
 rare:{nodes:18,battles:10,events:8,cap:450,coinsStart:25,coinsEnd:45,enemyNexus:[22,27,32],weeklyWin:15,weeklyFinish:100,masteryMultiplier:1.25,boosterKit:kit.slice(0,2)},
 epic:{nodes:26,battles:15,events:11,cap:800,coinsStart:30,coinsEnd:55,enemyNexus:[25,30,35],weeklyWin:20,weeklyFinish:150,masteryMultiplier:1.5,boosterKit:kit.slice(0,3)},
 legendary:{nodes:34,battles:20,events:14,cap:1150,coinsStart:35,coinsEnd:65,enemyNexus:[28,33,38],weeklyWin:25,weeklyFinish:200,masteryMultiplier:1.75,boosterKit:kit.slice()},
 ultradimensional:{nodes:40,battles:25,events:15,cap:1500,coinsStart:40,coinsEnd:80,enemyNexus:[30,35,40],weeklyWin:30,weeklyFinish:250,masteryMultiplier:2,boosterKit:kit.slice()},
};
export function generateMap(seed:number,difficulty:Difficulty='common'):MapProgress {
 if(difficulty==='common')return commonMap(seed);
 const rule=difficultyRules[difficulty],forks={rare:4,epic:6,legendary:8,ultradimensional:10}[difficulty];
 // Every layer connects to the entire next layer: all alternatives reconverge at each boss.
 const layers:MapNode[][]=[];let serial=0;
 const add=(kinds:MapNode['kind'][])=>layers.push(kinds.map((kind,i)=>({id:`node-${serial++}`,kind,next:[],row:layers.length,column:kinds.length===1?1:i*2})));
 add(['battle']);layers[0][0].id='start';
 const forced:MapNode['kind'][]=[...Array<MapNode['kind']>(rule.battles-forks-3).fill('battle'),...Array<MapNode['kind']>(rule.events-forks).fill('event')];
 const singles=shuffle(forced,seed).items;
 const stages:MapNode['kind'][][]=Array.from({length:forks},()=>['event','battle']);
 for(let i=0;i<singles.length;i++)stages.splice(Math.floor((i+1)*stages.length/(singles.length+1)),0,[singles[i]]);
 const middle=Math.floor(stages.length/2);
 for(let i=0;i<stages.length;i++){if(i===middle)add(['midboss']);add(stages[i]);}add(['finalboss']);
 for(let i=0;i<layers.length-1;i++)for(const n of layers[i])n.next=layers[i+1].map(x=>x.id);
 const nodes=layers.flat(),events=nodes.filter(n=>n.kind==='event');
 const pool=shuffle<EventKind>(['rest','supplies','rescue'],seed).items;
 events.forEach((n,i)=>n.event=i===0?'shop-standard':i===events.length-1?'shop-specialized':pool[(i-1)%pool.length]);
 return {nodes,current:null,visited:[]};
}
function pathBattleRange(map:MapProgress):[number,number] {
 const cache=new Map<string,[number,number]>();
 const visit=(id:string):[number,number]=>{const old=cache.get(id);if(old)return old;const n=map.nodes.find(n=>n.id===id)!;const own=Number(n.kind!=='event'),children=n.next.map(visit);const value:[number,number]=children.length?[own+Math.min(...children.map(x=>x[0])),own+Math.max(...children.map(x=>x[1]))]:[own,own];cache.set(id,value);return value;};
 return visit(map.nodes[0].id);
}
export function maxBattlePath(map:MapProgress):number{return pathBattleRange(map)[1];}
/** Total victory payout, including stones already earned. The coordinator grants only the difference. */
export function routePermanentTarget(map:MapProgress,difficulty:Difficulty,visited:readonly string[]):number {
 const cap=difficultyRules[difficulty].cap;if(difficulty==='common')return cap;
 const [min,max]=pathBattleRange(map),count=new Set(visited.filter(id=>map.nodes.some(n=>n.id===id&&n.kind!=='event'))).size;
 const floor=Math.max(150,Math.floor(cap/2));return Math.round(floor+(cap-floor)*Math.max(0,Math.min(1,(count-min)/Math.max(1,max-min))));
}
/** Pre-final payout only; final victory is settled against routePermanentTarget. */
export function battlePermanentReward(map:MapProgress,difficulty:Difficulty,node:MapNode):number {
 if(node.kind==='event')return 0;
 const last=Math.max(...map.nodes.map(n=>n.row)),position=node.row/Math.max(1,last);
 if(difficulty==='common')return 10+Math.round(10*position);
 const budget=Math.floor(difficultyRules[difficulty].cap*.3),weight=1+position;
 // A row contributes at most one battle to a route. Final settlement stays the largest payment.
 const rows=new Map<number,number>();for(const n of map.nodes)if(n.kind!=='event'&&n.kind!=='finalboss')rows.set(n.row,1+n.row/Math.max(1,last));
 return node.kind==='finalboss'?0:Math.floor(budget*weight/[...rows.values()].reduce((a,b)=>a+b,0));
}

