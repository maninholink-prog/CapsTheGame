import {it,expect} from 'vitest';
import {createProfile,grantMastery} from '../src/profile/profile.js';
import {encodeSave,decodeSave} from '../src/profile/storage.js';
import {createMapRun,enterNode} from '../src/run/adventure.js';
import {runBattle} from '../src/run/run.js';
import {sessionFromBattle} from '../src/ui/session.js';
import {startAccount} from '../src/profile/rewards.js';
it('migrates four-hero profiles without altering ownership, wallet or original hero XP',()=>{const p=createProfile('Legado','abe',42,0);p.stones=71;p.mastery.abe.xp=350;const raw=JSON.parse(encodeSave({profile:p,run:null,session:null}));for(const id of ['youro','kuara','thalion','lazaro'])delete raw.profile.mastery[id];const saved=decodeSave(JSON.stringify(raw));expect(saved.profile.collection).toEqual(p.collection);expect(saved.profile.stones).toBe(71);expect(saved.profile.mastery.abe.xp).toBe(350);expect(saved.profile.mastery.youro).toEqual({xp:0,rewarded:false});});
it('rejects corrupted new talent battle state before importing',()=>{const r=enterNode(createMapRun(42,'kylast','rare'),'start'),p=startAccount(grantMastery(createProfile('a','kylast',42,0),'kylast',31250,0),r,'x');const state={profile:p,run:r,session:sessionFromBattle(runBattle(r),r.battleSeed)};const bad=JSON.parse(encodeSave(state));bad.session.state.talentState={p1:true};expect(()=>decodeSave(JSON.stringify(bad))).toThrow();bad.session.state.talentState={};bad.run.talents='broken';expect(()=>decodeSave(JSON.stringify(bad))).toThrow();expect(decodeSave(encodeSave(state))).toEqual(state);});
