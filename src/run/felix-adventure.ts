import type {MapProgress} from './map.js';
import type {EnemyDeckVariant} from '../content/felix.js';
const originalCommon=['patrol','cryo','unstable'] as const;
const expandedCommon=[...originalCommon,'coils','infirmary','discharge'] as const;
const midbosses=['labotomia','tornado','dianamite'] as const;

export function felixEncounters(map:MapProgress,seed:number,pool:'original'|'expanded'='expanded'):Record<string,EnemyDeckVariant>{
 const common=pool==='original'?originalCommon:expandedCommon;
 const result:Record<string,EnemyDeckVariant>={};
 for(const node of map.nodes){
  if(node.kind==='event')continue;
  let hash=seed>>>0;
  for(const c of node.id)hash=(Math.imul(hash,31)+c.charCodeAt(0))>>>0;
  result[node.id]=node.kind==='finalboss'?'felix':node.kind==='midboss'?midbosses[hash%midbosses.length]:common[hash%common.length];
 }
 return result;
}
