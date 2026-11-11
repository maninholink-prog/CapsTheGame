import {it,expect} from 'vitest';
import {createMapRun,enterNode,reviveRun} from '../src/run/adventure.js';
import {createRun,runBattle,eligibleCardIds} from '../src/run/run.js';
import {enemyDeckLists} from '../src/content/felix.js';
import {isCaveiraDeck} from '../src/content/caveira.js';
import {createProfile} from '../src/profile/profile.js';
import {startAccount} from '../src/profile/rewards.js';
import {decodeSave,encodeSave} from '../src/profile/storage.js';
import {sessionFromBattle} from '../src/ui/session.js';
it('new maps use real encounter lists and keep fixed identities on retry',()=>{const r=enterNode(createMapRun(42),'start'),b=runBattle(r),variant=r.encounters!.start;if(isCaveiraDeck(variant))throw Error('Unexpected Caveira encounter');expect(b.encounter?.id).toBe(variant);expect(b.players.p2.hand.length+b.players.p2.deck.length).toBe(20);expect(new Set([...b.players.p2.hand,...b.players.p2.deck].map(c=>c.definitionId))).toEqual(new Set(enemyDeckLists[variant]));r.revives=1;r.entry!.revives=1;r.stage='defeat';const retry=reviveRun(r,'retry');expect(retry.encounters).toEqual(r.encounters);expect(retry.battleSeed).not.toBe(r.battleSeed);});
it('minibosses have 26 and Felix has 30 plus a separate 30-card king deck',()=>{const r=createMapRun(1);r.stage='battle';r.map!.current='mid';let b=runBattle(r);expect(b.players.p2.hand.length+b.players.p2.deck.length).toBe(26);r.map!.current='final';b=runBattle(r);expect(b.encounter?.phase).toBe('felix');expect(b.encounter?.kingDeck).toHaveLength(30);expect(b.players.p2.hand.length+b.players.p2.deck.length).toBe(30);});
it('old runs still resume the original test encounter, enemy-only cards never leak to rewards',()=>{const r=createRun(1);expect(runBattle(r).encounter).toBeUndefined();expect(eligibleCardIds(r).some(id=>id.startsWith('lab-'))).toBe(false);const old=createMapRun(42);delete old.adventure;delete old.encounters;old.stage='battle';old.map!.current='start';expect(runBattle(old).encounter).toBeUndefined();});

it('offers all six common encounters through the first node of new adventures',()=>{
 const encounters=new Set(Array.from({length:12},(_,seed)=>runBattle(enterNode(createMapRun(seed),'start')).encounter?.id));
 expect(encounters).toEqual(new Set(['patrol','cryo','unstable','coils','infirmary','discharge']));
});

it('restores a live battle and the rest of its route from before the encounter expansion',()=>{
 const originalEncounters={start:'patrol','fork-battle':'unstable',mid:'dianamite','late-battle':'unstable',final:'felix'} as const;
 const original=createMapRun(42);
 original.encounters={...originalEncounters};
 const run=enterNode(original,'start');
 const profile=startAccount(createProfile('Teste','kylast',42,0),run,'original');
 const session=sessionFromBattle(runBattle(run),run.battleSeed);
 const saved=decodeSave(encodeSave({profile,run,session}));
 expect(saved.run?.encounters).toEqual(originalEncounters);
 expect(saved.session?.state.encounter?.id).toBe('patrol');
 run.encounters!.mid='coils';
 expect(()=>decodeSave(encodeSave({profile,run,session}))).toThrow();
});
