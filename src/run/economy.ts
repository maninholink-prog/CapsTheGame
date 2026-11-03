import type {RunState} from './run.js';
import {difficultyRules} from './difficulty.js';
export function commonCoins(r:RunState){const rule=difficultyRules[r.difficulty??'common'];const row=r.map?.nodes.find(n=>n.id===r.map!.current)?.row??Math.min(7,(r.battle-1)*3.5);const last=r.map?Math.max(...r.map.nodes.map(n=>n.row)):7;return rule.coinsStart+Math.round((rule.coinsEnd-rule.coinsStart)*row/Math.max(1,last));}
export function battleCoins(r:RunState){const kind=r.map?.nodes.find(n=>n.id===r.map!.current)?.kind;return commonCoins(r)*(kind==='midboss'?2:kind==='finalboss'?3:1);}
export function grantCoins(r:RunState,amount:number){r.coins+=amount;r.coinsEarned+=amount;r.lastCoins=amount;}
