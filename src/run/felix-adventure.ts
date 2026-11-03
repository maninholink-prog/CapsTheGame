import type {MapProgress} from './map.js';
import type {EnemyDeckVariant} from '../content/felix.js';
export function felixEncounters(map:MapProgress,seed:number):Record<string,EnemyDeckVariant>{const result:Record<string,EnemyDeckVariant>={};for(const n of map.nodes){if(n.kind==='event')continue;let hash=seed>>>0;for(const c of n.id)hash=(Math.imul(hash,31)+c.charCodeAt(0))>>>0;result[n.id]=n.kind==='finalboss'?'felix':n.kind==='midboss'?(['labotomia','tornado','dianamite'] as const)[hash%3]:(['patrol','cryo','unstable'] as const)[hash%3];}return result;}
