import type {RunState} from './run.js';
import {offerPlayableRelics} from './relics.js';
import {commonCoins,grantCoins} from './economy.js';
export type RunSnapshot=Pick<RunState,'deck'|'group'|'regions'|'nexus'|'maxNexus'|'battle'|'revives'|'revivesSpent'|'coins'|'coinsEarned'|'coinsSpent'|'lastCoins'|'improvements'|'shops'|'caveiraHint'> & {current:string|null;visited:string[];activeRelics?:string[];relicRewardedNodes?:string[]};
export function snapshot(r:RunState):RunSnapshot {return structuredClone({...(r.caveiraHint?{caveiraHint:r.caveiraHint}:{}),...(r.relicRun?{activeRelics:r.relicRun.active,relicRewardedNodes:r.relicRun.rewardedNodes}:{}),coins:r.coins,coinsEarned:r.coinsEarned,coinsSpent:r.coinsSpent,lastCoins:r.lastCoins,improvements:r.improvements,shops:r.shops,deck:r.deck,group:r.group,regions:r.regions,nexus:r.nexus,maxNexus:r.maxNexus,battle:r.battle,revives:r.revives,revivesSpent:r.revivesSpent,current:r.map!.current,visited:r.map!.visited});}
export function markVisited(r:RunState){if(r.map?.current&&!r.map.visited.includes(r.map.current))r.map.visited.push(r.map.current);}
export function finishRouteReward(r:RunState){if(!r.map){r.stage='ready';return;}if(r.relicRun&&r.map.nodes.find(n=>n.id===r.map!.current)?.kind==='midboss'&&!r.relicRun.rewardedNodes.includes(r.map.current!)){
 const offer=offerPlayableRelics(r.rngState,r.difficulty??'common',r.relicRun.active);r.rngState=offer.state;r.relicRun.offers=offer.ids;
 if(offer.ids.length){r.stage='relic';return;}
 grantCoins(r,commonCoins(r));r.relicRun.rewardedNodes.push(r.map.current!);
}
r.stage='map';if(r.map.nodes.find(n=>n.id===r.map!.current)?.kind==='midboss')r.checkpoint=snapshot(r);r.entry=undefined;}
export function restore(r:RunState,s:RunSnapshot):RunState {const n=structuredClone(r);n.caveiraHint=s.caveiraHint;n.coins=s.coins;n.coinsEarned=s.coinsEarned;n.coinsSpent=s.coinsSpent;n.lastCoins=s.lastCoins;n.improvements=structuredClone(s.improvements);n.shops=structuredClone(s.shops);n.deck=structuredClone(s.deck);n.group=[...s.group];n.regions=[...s.regions];n.nexus=s.nexus;n.maxNexus=s.maxNexus;n.battle=s.battle;n.map!.current=s.current;n.map!.visited=[...s.visited];n.allies=[];n.rewards=[];if(n.relicRun){n.relicRun.active=[...(s.activeRelics??[])];n.relicRun.rewardedNodes=[...(s.relicRewardedNodes??[])];n.relicRun.offers=[];}return n;}
