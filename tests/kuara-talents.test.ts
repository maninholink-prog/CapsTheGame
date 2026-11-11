import {it,expect} from 'vitest';
import {createProfile,grantMastery} from '../src/profile/profile.js';
import {allocateTalent,talentsFor} from '../src/profile/talents.js';
import {renderTalents} from '../src/ui/talent-view.js';
import {heroPortrait} from '../src/ui/profile-view.js';
import {art} from '../src/ui/html.js';

it('Kuara has the approved fifteen-node Pilantragem tree and can allocate it',()=>{
 const ids=['kuara-quick-hands','kuara-ready-pocket','kuara-east-breath','kuara-hidden-reserve','kuara-magic-hands','kuara-opportunity-strike','kuara-living-wallet','kuara-perfect-disguise','kuara-planned-exit','kuara-walking-vault','kuara-bottomless-eye','kuara-calculated-exhaustion','kuara-repeated-trick','kuara-pocket-queen','kuara-supreme-pilantragem'];
 expect(talentsFor('kuara').map(t=>t.id)).toEqual(ids);
 const p=grantMastery(createProfile('Teste','kuara',1,0),'kuara',31250,0);
 let saved=p;for(const t of talentsFor('kuara'))saved=allocateTalent(saved,'kuara',t.id,false,1);
 expect(saved.talents?.kuara).toHaveLength(15);
 expect(talentsFor('kuara').at(-1)).toMatchObject({minLevel:30});
});
it('Kuara tree and portrait identify the masked alter-ego evolution',()=>{
 const p=grantMastery(createProfile('Teste','kuara',1,0),'kuara',31250,0);
 const html=renderTalents(p,'kuara',false);
 expect(html.match(/class="constellation-star /g)).toHaveLength(15);
 expect(html).toContain('/art/kuara-mastery.png');
 expect(html).toContain('alter-ego mascarado');
 expect(heroPortrait('kuara')).toContain('/art/kuara.png');
 expect(art('kuara')).toContain('/art/kuara.png');
 expect(art('kuara',false,true)).toContain('/art/kuara-evolved.png');
 expect(art('kuara',false,true)).toContain('máscara');
});
