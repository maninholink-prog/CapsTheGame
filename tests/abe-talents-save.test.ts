import {it,expect} from 'vitest';
import {createProfile,grantMastery} from '../src/profile/profile.js';
import {abeTalents,allocateTalent} from '../src/profile/talents.js';
import {startAccount} from '../src/profile/rewards.js';
import {createMapRun,enterNode} from '../src/run/adventure.js';
import {runBattle} from '../src/run/run.js';
import {enterUnit} from '../src/battle/units.js';
import {chooseUpgrade} from '../src/battle/champions.js';
import {sessionFromBattle} from '../src/ui/session.js';
import {encodeSave,decodeSave} from '../src/profile/storage.js';
function saved(){
 let p=grantMastery(createProfile('Abe','abe',42,0),'abe',31250,0);for(const t of abeTalents)p=allocateTalent(p,'abe',t.id,false,0);
 let r=createMapRun(42,'abe');r.talents=[...p.talents!.abe!];r=enterNode(r,'start');p=startAccount(p,r,'abe-save');
 const b=runBattle(r);b.phase='actions';b.round=1;enterUnit(b,'p1',{instanceId:'abe-field',definitionId:'abe'},0,[]);
 return {profile:p,run:r,session:sessionFromBattle(b,r.battleSeed)};
}
it('restores a double choice halfway through and never repeats setup or first fabrication',()=>{
 const s=saved(),b=s.session.state;const first=b.choices![0].options[0];expect(b.choices![0].remaining).toBe(2);expect(chooseUpgrade(b,'p1',first,[])).toBe(true);
 const restored=decodeSave(encodeSave(s)),n=restored.session!.state;expect(n.choices![0].remaining).toBe(1);expect(n.choices![0].options).not.toContain(first);expect(n.talentState?.p1?.abe?.fabricated).toBe(true);
 const hand=n.players.p1.hand.length;expect(chooseUpgrade(n,'p1',n.choices![0].options[0],[])).toBe(true);expect(n.players.p1.hand.length).toBe(Math.min(10,hand+1));expect(n.choices).toHaveLength(0);
 for(const change of [(x:any)=>x.session.state.choices[0].remaining=3,(x:any)=>x.session.state.talentState.p1.abe.upgradePaidRound=-1,(x:any)=>x.run.talents=['arsenal-i'],(x:any)=>x.session.state.talentLoadouts.p1=['arsenal-i']]){
  const bad=structuredClone(s);change(bad);expect(()=>decodeSave(encodeSave(bad))).toThrow();
 }
});
it('keeps an old starter deck and collection when loading an existing Abe run',()=>{
 const s=saved();s.profile.talents=undefined;s.run.talents=undefined;s.session.state.talentLoadouts=undefined;s.session.state.talentState=undefined;s.session.state.choices=[];
 for(const c of s.run.deck)if(c.definitionId==='cinderela')c.definitionId='enhanced-weapon';delete s.profile.collection.cinderela;
 expect(decodeSave(encodeSave(s)).run!.deck.filter(c=>c.definitionId==='enhanced-weapon')).toHaveLength(2);
});
