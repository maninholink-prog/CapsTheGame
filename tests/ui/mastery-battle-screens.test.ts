import {expect,it} from 'vitest';
import {createProfile} from '../../src/profile/profile.js';
import {hubContent} from '../../src/ui/hub.js';
import {createSession} from '../../src/ui/session.js';
import {renderBattleIntro,renderBattleResult} from '../../src/ui/battle-screen.js';

it('shows only the selected hero tree and keeps talent trees off the profile',()=>{
 const profile=createProfile('Teste','abe',1,0);
 const filters={search:'',rarity:'',region:'',owned:''};
 expect(hubContent(profile,'mastery',null,filters,'abe',true)).toContain('Maestria de Abe');
 expect(hubContent(profile,'mastery',null,filters,'abe',true)).not.toContain('Maestria de Kylast');
 expect(hubContent(profile,'mastery',null,filters,'kylast',true)).toContain('Maestria de Kylast');
 expect(hubContent(profile,'profile',null,filters)).not.toContain('talent-buy');
});

it('renders battle entry and each result with the correct next action',()=>{
 const session=createSession(1,'ai','abe');
 expect(renderBattleIntro(session,false)).toContain('Preparar mão');
 expect(renderBattleIntro(session,true)).toContain('DUELO DE TREINO');
 for(const [winner,title] of [['p1','Vitória'],['p2','Derrota'],['draw','Empate']] as const){
  session.state.winner=winner;
  expect(renderBattleResult(session,false)).toContain('<h1>'+title+'</h1>');
 }
 expect(renderBattleResult(session,false)).toContain('Continuar aventura');
 expect(renderBattleResult(session,true)).toContain('Novo treino');
});
