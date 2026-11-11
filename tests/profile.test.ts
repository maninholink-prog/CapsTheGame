import {describe,it,expect} from 'vitest';
import {createProfile,grantCard,masteryCost,grantMastery,weekKey,claimWeekly} from '../src/profile/profile.js';
import {buyBooster,openBooster} from '../src/profile/boosters.js';
import {encodeSave,decodeSave} from '../src/profile/storage.js';
import {startAccount,settleBattle} from '../src/profile/rewards.js';
import {createMapRun,enterNode} from '../src/run/adventure.js';
import {runBattle,finishBattle} from '../src/run/run.js';
import {fullCatalog} from '../src/content/decks.js';
import {eligible} from '../src/run/run.js';
import {collectibleIds} from '../src/profile/profile.js';
describe('perfil permanente',()=>{
 it('starts with one chosen champion, its real deck and no currency',()=>{const p=createProfile('Bruxo','abe',42,0);expect(p.stones).toBe(0);expect(p.collection.abe.count).toBe(2);expect(p.collection.gremin.count).toBe(2);expect(p.collection.kylast).toBeUndefined();expect(fullCatalog.gremin.rarity).toBe('legendary');});
 it('converts only excess copies, doubles rolled shiny and upgrades all appearances',()=>{let p=createProfile('a','kylast',1,0);p=grantCard(p,'damian',false,0);p=grantCard(p,'damian',true,0);expect(p.collection.damian).toEqual({count:3,shiny:true});expect(p.stones).toBe(10);p=grantCard(p,'damian',false,0);expect(p.stones).toBe(15);});
 it('collects enemy cards from boosters while keeping them out of player decks',()=>{
  const enemies=collectibleIds.filter(id=>fullCatalog[id].enemyOnly);
  expect(enemies.length).toBeGreaterThan(0);
  expect(enemies.every(id=>!!fullCatalog[id].rarity)).toBe(true);
  expect(collectibleIds).not.toContain('lab-collector-draw');
  let found=false;
  for(let seed=1;seed<=30&&!found;seed++){
   const p=createProfile('a','abe',seed,0);p.boosters.common=1;
   const n=openBooster(p,'common',0);
   found=n.lastOpening!.cards.some(c=>fullCatalog[c.id].enemyOnly);
  }
  expect(found).toBe(true);
  let p=createProfile('a','abe',1,0);p=grantCard(p,enemies[0],false,0);
  expect(p.collection[enemies[0]].count).toBe(1);
  const run=createMapRun(2,'abe');run.collection=[enemies[0]];
  expect(eligible(run,enemies[0])).toBe(false);
 });
 it('rejects unaffordable purchase without mutation',()=>{const p=createProfile('a','abe',1,0);expect(()=>buyBooster(p,'common',0)).toThrow();expect(p.boosters.common).toBe(0);});
 it('opens five cards, guarantees one Ultra champion, consumes inventory and keeps deterministic receipt',()=>{let p=createProfile('a','abe',123,0);p.boosters.ultradimensional=1;const n=openBooster(p,'ultradimensional',0);expect(n.lastOpening?.cards).toHaveLength(5);expect(n.lastOpening?.cards.filter(c=>fullCatalog[c.id].rarity==='ultradimensional')).toHaveLength(1);expect(n.boosters.ultradimensional).toBe(0);expect(openBooster(p,'ultradimensional',0)).toEqual(n);expect(()=>openBooster(n,'ultradimensional',0)).toThrow();});
 it('40th booster guarantees a missing champion and sixth champion shiny',()=>{const p=createProfile('a','abe',42,0);p.boosters.common=1;p.pity=39;p.championShiny=5;const n=openBooster(p,'common',0);const c=n.lastOpening!.cards.find(c=>fullCatalog[c.id].rarity==='ultradimensional')!;expect(c).toBeDefined();expect(c.id).not.toBe('abe');expect(c.rolledShiny).toBe(true);expect(n.pity).toBe(0);expect(n.championShiny).toBe(0);});
 it('progressive mastery costs total 31250 and level30 shiny does not change pity',()=>{expect(Array.from({length:29},(_,i)=>masteryCost(i+1)).reduce((a,b)=>a+b,0)).toBe(31250);let p=createProfile('a','abe',1,0);p=grantMastery(p,'abe',40000,0);expect(p.mastery.abe.xp).toBe(31250);expect(p.collection.abe.shiny).toBe(true);expect(p.championShiny).toBe(0);expect(grantMastery(p,'abe',100,0)).toEqual(p);});
 it('Monday 08 Brasília reset, manual claim once',()=>{const before=Date.parse('2026-11-02T10:59:59Z'),after=before+1000;expect(weekKey(before)).not.toBe(weekKey(after));let p=createProfile('a','abe',1,after);p.weekly.points=50;p=claimWeekly(p,50,after);expect(p.boosters.common).toBe(1);expect(()=>claimWeekly(p,50,after)).toThrow();expect(()=>claimWeekly(p,150,after)).toThrow();});
 it('roundtrips envelope and refuses corruption',()=>{const p=createProfile('a','abe',1,0);expect(decodeSave(encodeSave({profile:p,run:null,session:null})).profile).toEqual(p);expect(()=>decodeSave('{bad')).toThrow();expect(()=>decodeSave('{"version":1,"profile":{}}')).toThrow();});
 it('settles a battle only once, preserves earned wallet through repeated node victories',()=>{let r=enterNode(createMapRun(1,'abe'),'start');let p=startAccount(createProfile('a','abe',1,0),r,'test-run');const b=runBattle(r);b.phase='ended';b.winner='p1';const n=finishBattle(r,b);p=settleBattle(p,r,n,b,0);expect(p.stones).toBe(10);expect(p.weekly.points).toBe(10);expect(settleBattle(p,r,n,b,0)).toEqual(p);r.battleSeed++;const again=runBattle(r);again.phase='ended';again.winner='p1';p=settleBattle(p,r,finishBattle(r,again),again,0);expect(p.stones).toBe(10);expect(p.weekly.points).toBe(20);});
});
