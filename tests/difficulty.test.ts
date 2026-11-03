import {describe,it,expect} from 'vitest';
import {difficultyRules,generateMap,maxBattlePath,routePermanentTarget,battlePermanentReward} from '../src/run/difficulty.js';
import {commonMap} from '../src/run/map.js';
import type {MapProgress} from '../src/run/map.js';
function routes(m:MapProgress):string[][] {const walk=(id:string):string[][]=>{const n=m.nodes.find(n=>n.id===id)!;return n.next.length?n.next.flatMap(x=>walk(x).map(p=>[id,...p])):[[id]];};return walk(m.nodes[0].id);}
describe('difficulty maps and rewards',()=>{
 it('preserves the common map',()=>expect(generateMap(123)).toEqual(commonMap(123)));
 for(const d of ['common','rare','epic','legendary','ultradimensional'] as const)it(d,()=>{
  const m=generateMap(37,d),r=difficultyRules[d],paths=routes(m);
  expect(m.nodes[0]).toMatchObject({id:'start',kind:'battle',row:0,column:1});expect(m.nodes.filter(n=>!m.nodes.some(x=>x.next.includes(n.id)))).toHaveLength(1);expect(paths.every(p=>p[0]==='start')).toBe(true);expect(generateMap(37,d)).toEqual(m);expect(m.nodes).toHaveLength(r.nodes);
  expect(m.nodes.filter(n=>n.kind!=='event')).toHaveLength(r.battles);
  expect(m.nodes.filter(n=>n.kind==='event')).toHaveLength(r.events);
  expect(new Set(m.nodes.map(n=>n.id)).size).toBe(r.nodes);
  expect(m.nodes.some(n=>n.event==='shop-standard')).toBe(true);expect(m.nodes.some(n=>n.event==='shop-specialized')).toBe(true);
  for(const n of m.nodes){expect([0,1,2]).toContain(n.column);for(const id of n.next)expect(m.nodes.find(x=>x.id===id)!.row).toBeGreaterThan(n.row);}
  const counts=paths.map(p=>p.filter(id=>m.nodes.find(n=>n.id===id)!.kind!=='event').length);
  expect(maxBattlePath(m)).toBe(Math.max(...counts));
  for(const p of paths){expect(p.filter(id=>m.nodes.find(n=>n.id===id)!.kind==='midboss')).toHaveLength(1);expect(m.nodes.find(n=>n.id===p.at(-1))!.kind).toBe('finalboss');const target=routePermanentTarget(m,d,p);expect(target).toBeGreaterThanOrEqual(150);expect(target).toBeLessThanOrEqual(r.cap);if(p.filter(id=>m.nodes.find(n=>n.id===id)!.kind!=='event').length===maxBattlePath(m))expect(target).toBe(r.cap);const payouts=p.slice(0,-1).map(id=>battlePermanentReward(m,d,m.nodes.find(n=>n.id===id)!));expect(target-payouts.reduce((a,b)=>a+b,0)).toBeGreaterThan(Math.max(...payouts));}
  if(d!=='common'){const longest=paths[counts.indexOf(Math.max(...counts))],shortest=paths[counts.indexOf(Math.min(...counts))];expect(routePermanentTarget(m,d,longest)).toBeGreaterThan(routePermanentTarget(m,d,shortest));}
 });
 it('uses approved kits and multipliers',()=>{expect(Object.values(difficultyRules).map(r=>r.masteryMultiplier)).toEqual([1,1.25,1.5,1.75,2]);expect(Object.values(difficultyRules).map(r=>r.boosterKit.length)).toEqual([1,2,3,4,4]);});
});


