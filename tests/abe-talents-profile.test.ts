import {it,expect} from 'vitest';
import {createProfile,grantMastery} from '../src/profile/profile.js';
import {allocateTalent,resetTalents,abeTalents} from '../src/profile/talents.js';
import {renderTalents} from '../src/ui/talent-view.js';
import {validateSave} from '../src/profile/validation.js';
const profile=(xp=31250)=>grantMastery(createProfile('Abe','abe',1,0),'abe',xp,0);
it('allocates all Abe branches, preserves input and validates the saved profile',()=>{
 let p=profile();const original=p;
 expect(()=>allocateTalent(p,'abe','abe-calibration',false,1)).toThrow();
 for(const t of abeTalents)p=allocateTalent(p,'abe',t.id,false,1);
 expect(p.talents?.abe).toHaveLength(15);expect(original.talents).toBeUndefined();
 expect(()=>validateSave({version:1,profile:p,run:null,session:null})).not.toThrow();
 expect(()=>allocateTalent(p,'abe','arsenal-i',false,1)).toThrow();
 for(const bad of [['abe-frame','abe-frame'],['abe-calibration'],['arsenal-i']]){
  const n=structuredClone(p);n.talents={abe:bad as any};expect(()=>validateSave({version:1,profile:n,run:null,session:null})).toThrow();
 }
});
it('gates masterpiece at 30 and refuses changes during a run',()=>{
 let p=profile(30000);for(const id of ['abe-frame','abe-tools','abe-catalog','abe-economy','abe-project','abe-research'] as const)p=allocateTalent(p,'abe',id,false,1);
 expect(()=>allocateTalent(p,'abe','abe-masterpiece',false,1)).toThrow();
 expect(()=>allocateTalent(profile(),'abe','abe-frame',true,1)).toThrow();
});
it('resets Abe for 200 stones without losing XP and renders actionable nodes',()=>{
 let p=allocateTalent(profile(),'abe','abe-frame',false,1);p.stones=200;
 const n=resetTalents(p,'abe',false,2);expect(n.stones).toBe(0);expect(n.mastery).toEqual(p.mastery);expect(n.talents?.abe).toEqual([]);expect(n.ledger.at(-1)?.reason).toContain('Abe');
 const html=renderTalents(p,'abe',true);expect(html.match(/data-action="talent-buy"/g)).toHaveLength(15);expect(html).toContain('Ferramentas Preparadas');expect(html).toContain('Requer: Estrutura Reforçada');expect(html.match(/ disabled/g)).toHaveLength(16);expect(html).not.toContain('kylast-mastery.png');
 expect(()=>validateSave({version:1,profile:profile(),run:null,session:null})).not.toThrow();
});
