import {it,expect} from 'vitest';
import {createMapRun,resolveEvent} from '../src/run/adventure.js';
import {enableRelics,takeRelic,offerPlayableRelics} from '../src/run/relics.js';
import {finishRouteReward,snapshot,restore} from '../src/run/adventure-state.js';
import {createProfile} from '../src/profile/profile.js';
import {discoverRelics,conquerRelics} from '../src/profile/relics.js';
it('offers a relic after the midboss reward and saves its checkpoint only after choosing',()=>{
 const r=enableRelics(createMapRun(42));r.map!.current='mid';r.stage='reward';finishRouteReward(r);
 expect(r.stage).toBe('relic');expect(r.relicRun!.offers).toHaveLength(3);expect(r.checkpoint).toBeUndefined();
 const id=r.relicRun!.offers[0],n=takeRelic(r,id);expect(n.stage).toBe('map');expect(n.checkpoint!.activeRelics).toEqual([id]);expect(n.relicRun!.seen).toEqual([id]);
});
it('retains discovery after rollback, conquers only active relics on victory and preserves older conquests',()=>{
 const r=enableRelics(createMapRun(42),'artifact-16');r.map!.current='start';const saved=snapshot(r);
 r.relicRun!.active.push('artifact-22');r.relicRun!.seen.push('artifact-22');
 let p=createProfile('Teste','kylast',42,0);p=discoverRelics(p,r);expect(p.relicCollection!['artifact-22'].conquered).toBe(false);
 const rolled=restore(r,saved);expect(rolled.relicRun!.active).toEqual(['artifact-16']);expect(rolled.relicRun!.seen).toContain('artifact-22');
 p=conquerRelics(p,{...rolled,stage:'won'});expect(p.relicCollection!['artifact-16'].conquered).toBe(true);expect(p.relicCollection!['artifact-22'].conquered).toBe(false);
 p=conquerRelics(p,{...r,stage:'lost'});expect(p.relicCollection!['artifact-16'].conquered).toBe(true);expect(p.relicCollection!['artifact-22'].conquered).toBe(false);
});
it('only offers implemented effects and grants the approved extra rest healing',()=>{
 expect(offerPlayableRelics(42,'common',[]).ids.sort()).toEqual(['artifact-07','artifact-16','artifact-22']);
 const r=enableRelics(createMapRun(42),'artifact-16');const rest=r.map!.nodes.find(n=>n.event==='rest')!;r.map!.current=rest.id;r.stage='event';r.nexus=5;
 expect(resolveEvent(r,true).nexus).toBe(13);expect(resolveEvent(r,false).nexus).toBe(5);
});
