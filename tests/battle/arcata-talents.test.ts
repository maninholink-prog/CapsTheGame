import {expect,it} from 'vitest';
import {createBattle} from '../../src/battle/setup.js';
import {createProtagonistDeck,fullCatalog} from '../../src/content/decks.js';
import {applyBattleTalents} from '../../src/battle/kylast-talents.js';
import {cardCost,progress} from '../../src/battle/champions.js';
import {enterUnit} from '../../src/battle/units.js';
import {resolveEffect} from '../../src/battle/effects.js';
import {playCard} from '../../src/battle/play.js';
import {allocateTalent,arcataTalents} from '../../src/profile/talents.js';
import {createProfile,grantMastery} from '../../src/profile/profile.js';
import {validateSave} from '../../src/profile/validation.js';
import {renderTalents} from '../../src/ui/talent-view.js';
import type {BattleState,PlayerId,Result,TargetRef} from '../../src/battle/types.js';

function fixture(){
 const s=createBattle({p1:createProtagonistDeck('arcata','a'),p2:createProtagonistDeck('kylast','k')},7,fullCatalog);
 s.phase='actions';s.round=1;s.priorityOwner='p1';
 s.players.p1.hand=[];s.players.p1.mana=10;
 s.players.p1.deck=[{instanceId:'spark-draw',definitionId:'fire-bolt'},{instanceId:'study-draw',definitionId:'arcata'},{instanceId:'heat-draw',definitionId:'arcata'}];
 applyBattleTalents(s,'p1',arcataTalents.map(t=>t.id));
 enterUnit(s,'p1',{instanceId:'mage',definitionId:'arcata'},0,[]);
 return s;
}
const ok=(r:Result)=>{if(!r.ok)throw Error(r.error);return r.state;};
const target=(player:PlayerId,instanceId:string):TargetRef=>({kind:'unit',player,instanceId});
function spell(s:BattleState,id='control-flames',targets:TargetRef[]=[],ability=false){
 return ok(resolveEffect(s,{id:99,owner:'p1',source:{instanceId:id,definitionId:id},targets,mode:ability?'ability':undefined}));
}

it('saves all fifteen nodes with only the Combustão capstone at level 30',()=>{
 let p=grantMastery(createProfile('Arcata','arcata',1,0),'arcata',31250,0);
 for(const t of arcataTalents)p=allocateTalent(p,'arcata',t.id,false,1);
 expect(p.talents?.arcata).toHaveLength(15);
 expect(arcataTalents.filter(t=>t.minLevel===30).map(t=>t.id)).toEqual(['arcata-persist']);
 expect(()=>validateSave({version:1,profile:p,run:null,session:null})).not.toThrow();
 expect(renderTalents(p,'arcata',false)).toContain('/art/arcata-mastery-v2.png');
});

it('draws a Fire spell, grants base health, consumes both discounts on a paid Fireball',()=>{
 const s=fixture();
 expect(s.players.p1.hand.map(c=>c.instanceId)).toEqual(['spark-draw']);
 expect(s.players.p1.board[0].maxHealth).toBe(5);
 expect(cardCost(s,'p1',s.definitions['fire-bolt'])).toBe(1);
 expect(cardCost(s,'p1',s.definitions.fireball)).toBe(3);
 s.players.p1.hand.push({instanceId:'fireball-copy',definitionId:'arcata'});
 const next=ok(playCard(s,{type:'play',player:'p1',instanceId:'fireball-copy'}));
 expect(next.players.p1.mana).toBe(7);
 expect(cardCost(next,'p1',next.definitions.fireball)).toBe(5);
});

it('rewards the third Fire spell, the second Combustion and evolution at six',()=>{
 let s=fixture();
 s=spell(spell(s));
 expect(s.players.p2.nexus).toBe(19);
 expect(s.players.p1.board[0].roundAttackBonus).toBe(1);
 s.round++;s=spell(s);
 expect(s.players.p1.hand.some(c=>c.instanceId==='study-draw')).toBe(true);
 s=spell(s);
 expect(s.players.p1.hand.some(c=>c.instanceId==='heat-draw')).toBe(true);
 s.round++;s=spell(spell(s));
 expect(s.players.p1.board[0].evolved).toBe(true);
 expect(s.players.p1.reserve).toBe(1);
 expect(s.players.p1.hand.some(c=>c.definitionId==='control-flames')).toBe(true);
});

it('adds both capstone bonuses only on the first evolved Combustion',()=>{
 let s=fixture();
 progress(s,'p1').fire=6;
 s.players.p1.board[0].evolved=true;
 enterUnit(s,'p2',{instanceId:'tough',definitionId:'kylast'},0,[]);
 enterUnit(s,'p2',{instanceId:'weak',definitionId:'arcata-raven'},1,[]);
 s=spell(spell(s));
 expect(s.players.p2.nexus).toBe(18);
 expect(s.players.p2.board.map(u=>u.card.instanceId)).toEqual(['tough']);
 s.round++;s=spell(spell(s));
 expect(s.players.p2.nexus).toBe(17);
 expect(s.players.p2.board[0].health).toBe(5);
});

it('applies shield, retaliation, wall and precise hands bonuses once',()=>{
 let s=fixture();
 enterUnit(s,'p2',{instanceId:'defender',definitionId:'kylast'},0,[]);
 const defender=target('p2','defender');
 s=spell(s,'fire-shield',[target('p1','mage')]);
 expect(s.players.p1.board[0].maxHealth).toBe(9);
 s=spell(s,'fire-shield',[target('p1','mage')]);
 expect(s.players.p1.board[0].maxHealth).toBe(12);
 s=spell(s,'fire-retaliation',[defender],true);
 expect(s.players.p2.board[0].health).toBe(2);
 s=spell(s,'wall-fire');
 expect(s.players.p2.board[0].attack).toBe(1);
 s.players.p2.board[0].health=10;
 s=spell(s,'burning-hands',[defender]);
 expect(s.players.p2.board[0].health).toBe(7);
 s=spell(s,'burning-hands',[defender]);
 expect(s.players.p2.board[0].health).toBe(5);
});
