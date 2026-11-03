import {shuffle} from '../battle/random.js';
export type EventKind='rest'|'supplies'|'rescue'|'shop-standard'|'shop-specialized';
export interface MapNode {id:string;kind:'battle'|'event'|'midboss'|'finalboss';event?:EventKind;next:string[];row:number;column:number;}
export interface MapProgress {nodes:MapNode[];current:string|null;visited:string[];}
export function commonMap(seed:number):MapProgress {
 const nodes:MapNode[]=[
 {id:'start',kind:'battle',next:['fork-event','fork-battle'],row:0,column:1},
 {id:'fork-event',kind:'event',next:['merge-event'],row:1,column:0},
 {id:'fork-battle',kind:'battle',next:['merge-event'],row:1,column:2},
 {id:'merge-event',kind:'event',next:['mid'],row:2,column:1},
 {id:'mid',kind:'midboss',next:['after-event'],row:3,column:1},
 {id:'after-event',kind:'event',next:['late-event','late-battle'],row:4,column:1},
 {id:'late-event',kind:'event',next:['last-event'],row:5,column:0},
 {id:'late-battle',kind:'battle',next:['last-event'],row:5,column:2},
 {id:'last-event',kind:'event',next:['final'],row:6,column:1},
 {id:'final',kind:'finalboss',next:[],row:7,column:1},
 ];
 const events=shuffle<EventKind>(['rest','supplies','rescue'],seed).items;let i=0;for(const n of nodes)if(n.kind==='event')n.event=n.id==='merge-event'?'shop-standard':n.id==='last-event'?'shop-specialized':events[i++];
 return {nodes,current:null,visited:[]};
}
