import {expect,it} from 'vitest';
import {createBattle} from '../../src/battle/setup.js';
import {createProtagonistDeck,fullCatalog} from '../../src/content/decks.js';
import {applyBattleTalents} from '../../src/battle/kylast-talents.js';
import {cardCost,progress} from '../../src/battle/champions.js';
import {enterUnit} from '../../src/battle/units.js';
import {resolveEffect} from '../../src/battle/effects.js';
import {playCard} from '../../src/battle/play.js';
import {resolveCombat} from '../../src/battle/combat.js';
import {allocateTalent,rubelTalents} from '../../src/profile/talents.js';
import {createProfile,grantMastery} from '../../src/profile/profile.js';
import {validateSave} from '../../src/profile/validation.js';
import {renderTalents} from '../../src/ui/talent-view.js';
import type {BattleState,Result,TargetRef} from '../../src/battle/types.js';

function fixture(){
 const s=createBattle({p1:createProtagonistDeck('rubel','r'),p2:createProtagonistDeck('kylast','k')},7,fullCatalog);
 s.phase='actions';s.round=1;s.priorityOwner='p1';s.players.p1.mana=10;
 s.players.p1.hand=[];
 s.players.p1.deck=[{instanceId:'healing-draw',definitionId:'healing-word'},{instanceId:'hope-draw',definitionId:'rubel'},{instanceId:'reach-draw',definitionId:'rubel'}];
 applyBattleTalents(s,'p1',rubelTalents.map(t=>t.id));
 enterUnit(s,'p1',{instanceId:'cleric',definitionId:'rubel'},0,[]);
 s.stack=[];s.stackReturnOwner=null;s.priorityOwner='p1';
 return s;
}
const ok=(r:Result)=>{if(!r.ok)throw Error(r.error);return r.state;};
const target=(instanceId:string):TargetRef=>({kind:'unit',player:'p1',instanceId});
const nexus:TargetRef={kind:'nexus',player:'p1'};
function spell(s:BattleState,id:string,targets:TargetRef[]=[],evolution=false){
 return ok(resolveEffect(s,{id:99,owner:'p1',source:{instanceId:id,definitionId:id},targets,rubelEvolution:evolution,mode:id.startsWith('rubel-')?'ability':undefined}));
}

it('allocates and validates all fifteen nodes with Santuário at 30',()=>{
 let p=grantMastery(createProfile('Rubel','rubel',1,0),'rubel',31250,0);
 for(const t of rubelTalents)p=allocateTalent(p,'rubel',t.id,false,1);
 expect(p.talents?.rubel).toHaveLength(15);
 expect(rubelTalents.filter(t=>t.minLevel===30).map(t=>t.id)).toEqual(['rubel-sanctuary']);
 expect(()=>validateSave({version:1,profile:p,run:null,session:null})).not.toThrow();
 expect(renderTalents(p,'rubel',false)).toContain('/art/rubel-mastery.png');
});

it('draws a healing spell, grants base health and consumes the Prayer discount on payment',()=>{
 let s=fixture();
 expect(s.players.p1.hand.map(c=>c.instanceId)).toEqual(['healing-draw']);
 expect(s.players.p1.board[0].maxHealth).toBe(6);
 expect(cardCost(s,'p1',s.definitions.prayer)).toBe(2);
 s.players.p1.hand.push({instanceId:'paid-prayer',definitionId:'prayer'});
 s=ok(playCard(s,{type:'play',player:'p1',instanceId:'paid-prayer'}));
 expect(s.players.p1.mana).toBe(8);
 expect(cardCost(s,'p1',s.definitions.prayer)).toBe(3);
});

it('counts real healing, grants the first bonuses and rewards three allies healed at once',()=>{
 let s=fixture();
 s.players.p1.nexus=16;
 s=spell(s,'rubel-entry',[nexus]);
 expect(s.players.p1.nexus).toBe(19);
 expect(s.players.p1.hand.some(c=>c.instanceId==='hope-draw')).toBe(true);
 s.players.p1.board[0].health=2;
 s=spell(s,'healing-word',[target('cleric')]);
 expect(s.players.p1.board[0].health).toBe(5);
 expect(progress(s,'p1').healing).toBe(6);
 for(const id of ['luise','mantum']){
  enterUnit(s,'p1',{instanceId:id,definitionId:id},s.players.p1.board.length,[]);
  s.players.p1.board.at(-1)!.health=1;
 }
 s.players.p1.board[0].health=2;
 // Luise draws on entry. Add a new card to verify Mãos Estendidas.
 s.players.p1.deck.push({instanceId:'group-draw',definitionId:'rubel'});
 s=spell(s,'prayer');
 expect(s.players.p1.hand.some(c=>c.instanceId==='group-draw')).toBe(true);
});

it('awards evolution protection, reserve and a generated card, then adds one after doubling the wave',()=>{
 let s=fixture();
 enterUnit(s,'p1',{instanceId:'mantum',definitionId:'mantum'},1,[]);
 progress(s,'p1').healing=9;
 s.players.p1.nexus=10;
 s=spell(s,'cure-wounds',[nexus]);
 expect(s.players.p1.nexus).toBe(15);
 expect(s.players.p1.board[0].evolved).toBe(true);
 expect(s.players.p1.board.every(u=>u.sanctuary)).toBe(true);
 expect(s.players.p1.reserve).toBe(1);
 expect(s.players.p1.hand.some(c=>c.generated&&c.definitionId==='healing-word')).toBe(true);
 s.players.p1.nexus=10;
 s=ok(resolveEffect(s,s.stack.at(-1)!));
 expect(s.players.p1.nexus).toBe(15);
 s.players.p1.nexus=10;
 s=spell(s,'rubel-wave');
 expect(s.players.p1.nexus).toBe(14);
});

it('adds max life without curing and spends Santuário and Guarda on the first combat hit',()=>{
 let s=fixture();
 s.players.p1.board[0].health=5;
 s=spell(s,'aid',[target('cleric')]);
 expect(s.players.p1.board[0].maxHealth).toBe(9);
 expect(s.players.p1.board[0].health).toBe(7);
 s=spell(s,'blessing',[target('cleric')]);
 expect(s.players.p1.board[0].maxHealth).toBe(10);
 expect(s.players.p1.board[0].health).toBe(7);
 s.players.p1.board[0].sanctuary=true;
 enterUnit(s,'p2',{instanceId:'enemy',definitionId:'kylast'},0,[]);
 s.players.p2.board[0].attack=4;
 const combat=()=>({stage:'responses' as const,attacker:'p2' as const,lanes:[{attackerId:'enemy',blockerId:'cleric',blocked:true,weapons:[null]}]});
 s.combat=combat();s=ok(resolveCombat(s));
 expect(s.players.p1.board[0].health).toBe(6);
 expect(s.players.p1.board[0].sanctuary).toBeUndefined();
 s.combat=combat();s=ok(resolveCombat(s));
 expect(s.players.p1.board[0].health).toBe(2);
});
