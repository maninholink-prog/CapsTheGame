import {it,expect} from 'vitest';
import {createMapRun,enterNode} from '../src/run/adventure.js';
import {enableRelics,takeRelic} from '../src/run/relics.js';
import {finishRouteReward} from '../src/run/adventure-state.js';
import {runBattle} from '../src/run/run.js';
import {createProfile} from '../src/profile/profile.js';
import {startAccount} from '../src/profile/rewards.js';
import {discoverRelics} from '../src/profile/relics.js';
import {encodeSave,decodeSave} from '../src/profile/storage.js';
import {sessionFromBattle} from '../src/ui/session.js';
it('round trips a pending offer, chosen checkpoint and active battle with relic state',()=>{
 let r=enableRelics(createMapRun(42));let p=startAccount(createProfile('Teste','kylast',42,0),r,'save-relic');r.map!.current='mid';r.map!.visited=['start','mid'];r.stage='reward';finishRouteReward(r);
 expect(decodeSave(encodeSave({profile:p,run:r,session:null})).run!.stage).toBe('relic');
 r=takeRelic(r,'artifact-22');p=discoverRelics(p,r);expect(()=>decodeSave(encodeSave({profile:p,run:r,session:null}))).not.toThrow();
 r=enableRelics(createMapRun(43),'artifact-22');r=enterNode(r,'start');p=startAccount(p,r,'new');
 const session=sessionFromBattle(runBattle(r),r.battleSeed);expect(()=>decodeSave(encodeSave({profile:p,run:r,session}))).not.toThrow();
 session.state.relicState!.active.p1=[];expect(()=>decodeSave(encodeSave({profile:p,run:r,session}))).toThrow();
});
