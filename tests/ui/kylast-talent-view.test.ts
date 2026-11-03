import {describe,it,expect} from 'vitest';
import {createProfile,grantMastery} from '../../src/profile/profile.js';
import {allocateTalent,kylastTalents} from '../../src/profile/talents.js';
import {renderTalents} from '../../src/ui/talent-view.js';

const profile=()=>grantMastery(createProfile('Teste','kylast',1,0),'kylast',31250,0);
describe('constelação de Kylast',()=>{
 it('renders exactly fifteen inspectable stars and their existing purchase hooks',()=>{
  const html=renderTalents(profile(),'kylast',false);
  expect(html.match(/class="constellation-star /g)).toHaveLength(15);
  expect(html.match(/<summary /g)).toHaveLength(15);
  expect(html).toContain('/art/kylast-mastery.png');
  for(const t of kylastTalents){
   expect(html.match(new RegExp(`data-action="talent-buy" data-hero="kylast" data-id="${t.id}"`,'g'))).toHaveLength(1);
   expect(html).toContain(t.text);
  }
 });
 it('keeps acquired and run-locked stars inspectable without permitting purchases',()=>{
  const p=allocateTalent(profile(),'kylast','arsenal-i',false,1);
  const html=renderTalents(p,'kylast',true);
  expect(html).toContain('class="constellation-star acquired"');
  expect(html.match(/ disabled/g)).toHaveLength(16);
  expect(html).not.toMatch(/<summary[^>]* disabled/);
  expect(html).toContain('Requer: Porte de Arsenal I.');
  expect(html).toContain('Alterações indisponíveis durante a run.');
 });
});
