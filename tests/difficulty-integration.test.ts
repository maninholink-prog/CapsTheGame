import {describe,it,expect} from 'vitest';
import {createMapRun,enterNode,availableNodes} from '../src/run/adventure.js';
import {runBattle,finishBattle} from '../src/run/run.js';
import {battleCoins} from '../src/run/economy.js';
import {difficultyRules} from '../src/run/difficulty.js';
import {createProfile} from '../src/profile/profile.js';
import {startAccount,settleBattle} from '../src/profile/rewards.js';
import {makeShop} from '../src/run/shops.js';
import {renderMap} from '../src/ui/map-view.js';
describe('difficulty integration',()=>{
 it('defaults to Common and preserves its coin positions',()=>{const r=createMapRun(1);expect(r.difficulty).toBe('common');for(const [id,expected] of [['start',20],['mid',52],['final',105]] as const){r.map!.current=id;expect(battleCoins(r)).toBe(expected);}});
 for(const d of ['common','rare','epic','legendary','ultradimensional'] as const)it(`integrates ${d}`,()=>{let r=createMapRun(1,'kylast',d),p=startAccount(createProfile('Test','kylast',1,0),r,'id');expect(availableNodes(r).map(n=>n.id)).toEqual(['start']);expect(renderMap(r)).toContain(`${difficultyRules[d].nodes} casas`);const shop=r.map!.nodes.find(n=>n.event==='shop-specialized')!;expect(makeShop(r,shop.id).type).toBe('specialized');
 // Select the maximum-battle route without simulating unrelated recruitment choices.
 while(r.stage!=='won'){const node=availableNodes(r).find(n=>n.kind!=='event')??availableNodes(r)[0];r=enterNode(r,node.id);if(node.kind==='event'){r.map!.visited.push(node.id);r.stage='map';continue;}const before=r,b=runBattle(r),index=node.kind==='midboss'?1:node.kind==='finalboss'?2:0;expect(b.players.p2.nexus).toBe(difficultyRules[d].enemyNexus[index]);b.phase='ended';b.winner='p1';r=finishBattle(r,b);p=settleBattle(p,before,r,b,0);expect(settleBattle(p,before,r,b,0)).toEqual(p);if(r.stage!=='won')r.stage='map';}
 expect(p.account!.earned).toBe(difficultyRules[d].cap);expect(p.stones).toBe(difficultyRules[d].cap);expect(p.weekly.points).toBe(r.battle*difficultyRules[d].weeklyWin+difficultyRules[d].weeklyFinish);for(const type of difficultyRules[d].boosterKit)expect(p.boosters[type]).toBe(1);
 });
 it('never repays a node after returning to a prior route state',()=>{const r=enterNode(createMapRun(2,'kylast','rare'),'start'),b=runBattle(r);b.phase='ended';b.winner='p1';const after=finishBattle(r,b),p=settleBattle(startAccount(createProfile('T','kylast',1,0),r,'id'),r,after,b,0);b.runBattleId+='-retry';const replay=settleBattle(p,r,after,b,0);expect(replay.stones).toBe(p.stones);expect(replay.account!.earned).toBe(p.account!.earned);expect(replay.weekly.points).toBe(p.weekly.points+15);});
});
