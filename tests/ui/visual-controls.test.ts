import {expect,it} from 'vitest';
import {protagonistSelector} from '../../src/ui/protagonist.js';
import {createSession} from '../../src/ui/session.js';
import {render} from '../../src/ui/render.js';
import {freshDraft} from '../../src/ui/forms.js';
import {hubShell} from '../../src/ui/hub.js';
import {createProfile} from '../../src/profile/profile.js';

it('offers all eight protagonists as labelled radio choices with one selection',()=>{
 const html=protagonistSelector('abe');
 expect(html.match(/type="radio"/g)).toHaveLength(8);
 expect(html.match(/ checked/g)).toHaveLength(1);
 expect(html).toContain('value="abe" checked');
 expect(html).not.toContain('<select');
 expect(html).toContain('/art/abe-mastery.png');
});
it('retains battle actions and current life in the compact field presentation',()=>{
 const session=createSession(42,'manual','abe');
 session.state.phase='actions';session.state.priorityOwner='p1';
 session.state.players.p1.nexus=13;
 session.state.players.p1.board=[{card:{instanceId:'test-unit',definitionId:'aranha'},attack:3,health:1,maxHealth:4}];
 const html=render(session,freshDraft());
 expect(html).toContain('ataque 3, vida 1 de 4');
 expect(html).toContain('data-action="pass"');
 expect(html).toContain('data-action="unit"');
 expect(html).toContain('<strong>13</strong>');
});
it('places a concealed opponent hand above the board without exposing its cards',()=>{
 const session=createSession(42,'ai');
 const html=render(session,freshDraft());
 expect(html).toContain('class="opponent-hand"');
 expect(html.indexOf('class="opponent-hand"')).toBeLessThan(html.indexOf('class="battle-table"'));
 expect(html.indexOf('class="battle-table"')).toBeLessThan(html.indexOf('class="hand-section"'));
 expect(html.match(/class="opponent-card-back"/g)).toHaveLength(session.state.players.p2.hand.length);
 for(const card of session.state.players.p2.hand)expect(html).not.toContain(`data-id="${card.instanceId}"`);
});
it('keeps battle navigation and training setup inside information without a top strip',()=>{
 const html=render(createSession(42,'ai'),freshDraft());
 expect(html).not.toContain('class="topbar"');
 expect(html).toContain('class="battle-options"');
 expect(html).toContain('aria-label="Menu da batalha"');
 expect(html).toContain('circle cx="12" cy="12" r="3"');
 expect(html).not.toContain('>Menu<');
 expect(html).toContain('data-action="hub-nav" data-id="home"');
 expect(html).toContain('id="battle-seed"');
 expect(html).toContain('id="opponent-mode"');
 const profile=createProfile('Teste','kylast',42,0);
 expect(hubShell('battle',html)).not.toContain('class="hub-header"');
});
