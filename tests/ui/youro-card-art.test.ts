import {expect,it} from 'vitest';
import {createSession} from '../../src/ui/session.js';
import {freshDraft} from '../../src/ui/forms.js';
import {render} from '../../src/ui/render.js';
import {art} from '../../src/ui/html.js';

it('uses dedicated unmasked base and evolved champion artwork',()=>{
 const base=art('youro',true),evolved=art('youro',true,true);
 expect(base).toContain('src="/art/youro-card.png"');
 expect(evolved).toContain('src="/art/youro-evolved.png"');
 expect(base).not.toContain('masc');
 expect(evolved).not.toContain('masc');
});

it('shows the evolved artwork for Youro’s champion card in the battle hand',()=>{
 const session=createSession(7,'manual','youro');
 session.state.phase='actions';
 session.state.priorityOwner='p1';
 session.state.players.p1.hand=[{instanceId:'youro-card',definitionId:'youro'}];
 const ally={upgrades:0,fire:0,fireRound:0,fireRoundNumber:0,healing:0,evolved:{youro:true}};
 session.state.allyProgress={p1:ally,p2:{...ally,evolved:{}}};
 session.state.allyProgress={p1:{upgrades:0,fire:0,fireRound:0,fireRoundNumber:0,healing:0,evolved:{}},p2:{upgrades:0,fire:0,fireRound:0,fireRoundNumber:0,healing:0,evolved:{}}};
 expect(render(session,freshDraft())).toContain('src="/art/youro-card.png"');
 session.state.allyProgress.p1.evolved.youro=true;
 expect(render(session,freshDraft())).toContain('src="/art/youro-evolved.png"');
});
