import {it,expect} from 'vitest';
import {createSession} from '../../src/ui/session.js';
import {freshDraft} from '../../src/ui/forms.js';
import {combatLayout} from '../../src/ui/combat-layout.js';
import {render} from '../../src/ui/render.js';
const unit=(id:string)=>({card:{instanceId:id,definitionId:'damian'},attack:2,health:3,maxHealth:3});
it('moves draft attackers out of the bench and renders each unit once',()=>{
 const session=createSession(42),draft=freshDraft();session.state.players.p1.board=[unit('front'),unit('bench')];draft.mode='attack';draft.attackers=['front'];
 expect(combatLayout(session,draft).front.p1.has('front')).toBe(true);
 const html=render(session,draft);
 expect(html.match(/data-id="front"/g)).toHaveLength(1);
 expect(html).toContain('aria-label="Campo de batalha"');
 expect(html).toContain('Retaguarda');
 draft.attackers=[];expect(combatLayout(session,draft).front.p1.size).toBe(0);
});
it('previews blockers, respects either attack direction and restores the bench after combat',()=>{
 const session=createSession(42),draft=freshDraft();session.state.players.p2.board=[unit('attacker')];session.state.players.p1.board=[unit('blocker')];
 session.state.combat={attacker:'p2',stage:'blocking',lanes:[{attackerId:'attacker',blockerId:null,blocked:false,weapons:[]}]};
 draft.blocks.attacker='blocker';let layout=combatLayout(session,draft);
 expect(layout.front.p1.has('blocker')).toBe(true);expect(layout.front.p2.has('attacker')).toBe(true);
 expect(render(session,draft).match(/data-id="blocker"/g)).toHaveLength(1);
 session.state.combat.stage='responses';session.state.combat.lanes[0].blockerId='blocker';draft.blocks={};expect(combatLayout(session,draft).front.p1.has('blocker')).toBe(true);
 session.state.combat=null;expect(combatLayout(session,draft).lanes).toHaveLength(0);
});

it('shows pending effects in resolution order and identifies whose action it is',()=>{
 const session=createSession(42,'ai'),draft=freshDraft();
 session.state.phase='actions';
 session.state.priorityOwner='p2';
 session.state.stack.push(
  {id:1,owner:'p1',source:{instanceId:'first',definitionId:'damian'},targets:[]},
  {id:2,owner:'p2',source:{instanceId:'second',definitionId:'banjo'},targets:[],mode:'banjo'},
 );
 const html=render(session,draft);
 expect(html).toContain('priority-medallion p2');
 expect(html).toContain('Ação do oponente');
 expect(html).toContain('spell-sigil p2 next-effect');
 expect(html.indexOf('data-definition="banjo" data-id="2"')).toBeLessThan(html.indexOf('data-definition="damian" data-id="1"'));
});
