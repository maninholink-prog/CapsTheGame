import {expect,it} from 'vitest';
import {protagonistSelector} from '../../src/ui/protagonist.js';
import {createSession} from '../../src/ui/session.js';
import {render} from '../../src/ui/render.js';
import {freshDraft} from '../../src/ui/forms.js';

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
