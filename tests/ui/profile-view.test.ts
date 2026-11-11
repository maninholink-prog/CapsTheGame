import {expect,it} from 'vitest';
import {createProfile} from '../../src/profile/profile.js';
import {renderProfileSummary} from '../../src/ui/profile-view.js';

it('shows the selected champion as a profile with mastery, starter deck, and relic access',()=>{
 const profile=createProfile('Colecionador','kylast',1,0);
 profile.relicCollection={'artifact-16':{conquered:true}};
 const html=renderProfileSummary(profile);
 expect(html).toContain('class="profile-player-card"');
 expect(html).toContain('profile-icon-cards');
 expect(html).toContain('profile-icon-champion');
 expect(html).toContain('profile-icon-frame');
 expect(html).toContain('profile-icon-sparkle');
 expect(html).toContain('profile-icon-relic');
 expect(html).toContain('Kylast Heathcliff');
 expect(html).toContain('class="profile-mastery-card"');
 expect(html).toContain('Deck inicial</span><strong>20 cartas</strong>');
 expect(html).toContain('data-id="relics"');
 expect(html).toContain('1 conquistadas');
 expect(html).toContain('name="profile-avatar"');
 expect(html).toContain('class="profile-customization"');
 expect(html).toContain('data-action="profile-rename"');
 expect(html).toContain('data-action="profile-export"');
});
