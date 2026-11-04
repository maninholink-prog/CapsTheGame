import {it,expect} from 'vitest';
import {createBattle} from '../../src/battle/setup.js';
import {fullCatalog,createProtagonistDeck} from '../../src/content/decks.js';
import {abeTalents} from '../../src/profile/talents.js';
import {applyBattleTalents} from '../../src/battle/kylast-talents.js';
import {enterUnit} from '../../src/battle/units.js';
import {cardCost,fabricate,chooseUpgrade,evolveAllies,progress} from '../../src/battle/champions.js';
import {resolveEffect} from '../../src/battle/effects.js';
import {applyCommand} from '../../src/battle/commands.js';
import {resolveCombat} from '../../src/battle/combat.js';
import {damageWith} from '../../src/ai/tactics.js';
import {observeBattle} from '../../src/ai/observation.js';
import {chooseAiCommand} from '../../src/ai/policy.js';
import type {BattleState,Result,TargetRef} from '../../src/battle/types.js';
const ok=(r:Result)=>{if(!r.ok)throw Error(r.error);return r.state;};
function fixture(ids=abeTalents.map(t=>t.id)){
 const s=createBattle({p1:createProtagonistDeck('abe','a'),p2:createProtagonistDeck('kylast','b')},1,fullCatalog);
 s.players.p1.hand=[];applyBattleTalents(s,'p1',ids);s.phase='actions';s.round=1;s.priorityOwner=s.attackOwner='p1';s.attackAvailable=true;s.players.p1.mana=s.players.p1.maxMana=10;s.players.p1.hand=[];return s;
}
function unit(s:BattleState,id='abe',instance=id){enterUnit(s,'p1',{instanceId:instance,definitionId:id},s.players.p1.board.length,[]);return s.players.p1.board.find(u=>u.card.instanceId===instance)!;}
const target=(instanceId:string):TargetRef=>({kind:'unit',player:'p1',instanceId});
function upgrade(s:BattleState,id='enhanced-weapon',targets=[target('aranha')]){s.choices=[];return ok(resolveEffect(s,{id:99,owner:'p1',source:{instanceId:'spell',definitionId:id},targets}));}
it('draws one Upgrade at setup without changing other deck order, once, and grants base life',()=>{
 const s=fixture([]);s.talentState=undefined;s.players.p1.deck=[{instanceId:'a',definitionId:'abe'},{instanceId:'u',definitionId:'enhanced-weapon'},{instanceId:'b',definitionId:'abe'}];s.players.p1.hand=[];
 applyBattleTalents(s,'p1',['abe-tools','abe-frame']);applyBattleTalents(s,'p1',['abe-tools','abe-frame']);
 expect(s.players.p1.hand.map(c=>c.instanceId)).toEqual(['u']);expect(s.players.p1.deck.map(c=>c.instanceId)).toEqual(['a','b']);expect(unit(s).maxHealth).toBe(6);
});
it('fabricates four options and two distinct first choices, then single choices; AI sees only its own',()=>{
 const s=fixture();fabricate(s,'p1');fabricate(s,'p1');expect(s.choices![0].options).toHaveLength(4);
 expect(observeBattle(s,'p1').choices![0].remaining).toBe(2);
 const first=s.choices![0].options[0];expect(chooseUpgrade(s,'p1',first,[])).toBe(true);expect(s.choices).toHaveLength(2);expect(s.choices![0].options).not.toContain(first);expect(chooseUpgrade(s,'p1',first,[])).toBe(false);
 const decision=chooseAiCommand(observeBattle(s,'p1'));expect(decision?.command.type).toBe('chooseUpgrade');expect(observeBattle(s,'p2').choices?.every(c=>c.options.length===0)).toBe(true);
 expect(chooseUpgrade(s,'p1',s.choices![0].options[0],[])).toBe(true);expect(s.choices).toHaveLength(1);expect(chooseUpgrade(s,'p1',s.choices![0].options[0],[])).toBe(true);expect(s.choices).toHaveLength(0);expect(s.players.p1.hand).toHaveLength(3);expect(s.allyProgress?.p1.upgrades??0).toBe(0);
});
it('consumes upgrade and project discounts on payment, stacks evolved discount, and preserves zero costs',()=>{
 let s=fixture();unit(s,'aranha');s.choices=[];expect(cardCost(s,'p1',s.definitions.project)).toBe(1);s.players.p1.hand=[{instanceId:'p',definitionId:'project'}];s=ok(applyCommand(s,{type:'play',player:'p1',instanceId:'p'}));expect(s.players.p1.mana).toBe(9);expect(cardCost(s,'p1',s.definitions.project)).toBe(2);
 s.choices=[];s.priorityOwner='p1';s.players.p1.hand=[{instanceId:'u',definitionId:'enhanced-weapon'}];s=ok(applyCommand(s,{type:'play',player:'p1',instanceId:'u',targets:[target('aranha')]}));expect(s.players.p1.mana).toBe(8);expect(cardCost(s,'p1',s.definitions['enhanced-weapon'])).toBe(2);
 s.round++;expect(cardCost(s,'p1',s.definitions['enhanced-weapon'])).toBe(1);unit(s).evolved=true;expect(cardCost(s,'p1',{...s.definitions['enhanced-weapon'],cost:3})).toBe(1);expect(cardCost(s,'p1',{...s.definitions['enhanced-weapon'],cost:0})).toBe(0);
});
it('adds no-heal max life and temporary attack once, heals Abe once per round, and draws on third upgrade',()=>{
 let s=fixture(['abe-reinforcement','abe-calibration','abe-repair','abe-research']);unit(s).health=2;unit(s,'aranha').health=1;s.players.p1.deck=[{instanceId:'draw',definitionId:'abe'}];
 s=upgrade(s);expect(s.players.p1.board[1]).toMatchObject({attack:5,health:1,maxHealth:4,roundAttackBonus:1});expect(s.players.p1.board[0].health).toBe(3);
 s=upgrade(s);expect(s.players.p1.board[0].health).toBe(3);expect(s.players.p1.hand).toHaveLength(0);s=upgrade(s);expect(s.players.p1.hand.map(c=>c.instanceId)).toEqual(['draw']);expect(s.players.p1.board[1].maxHealth).toBe(4);
 s.round++;s=upgrade(s);expect(s.players.p1.board[0].health).toBe(4);
});
it('draws once for three different units and grants first three-upgrade unit +1/+1 without healing',()=>{
 let s=fixture(['abe-shared','abe-complete']);unit(s,'aranha','x');unit(s,'aranha','y');unit(s,'aranha','z');s.players.p1.board[0].health=1;s.players.p1.deck=[{instanceId:'draw',definitionId:'abe'},{instanceId:'other',definitionId:'abe'}];
 s=upgrade(s,'enhanced-weapon',[target('x')]);s=upgrade(s,'enhanced-weapon',[target('y')]);s=upgrade(s,'enhanced-weapon',[target('z')]);expect(s.players.p1.hand.map(c=>c.instanceId)).toEqual(['draw']);
 s=upgrade(s,'enhanced-weapon',[target('x')]);s=upgrade(s,'enhanced-weapon',[target('x')]);expect(s.players.p1.board[0]).toMatchObject({attack:11,health:1,maxHealth:4});
 s=upgrade(s,'enhanced-weapon',[target('y')]);s=upgrade(s,'enhanced-weapon',[target('y')]);expect(s.players.p1.board[1].maxHealth).toBe(3);expect(s.players.p1.hand).toHaveLength(1);
});
it('queues entry armor once and adds evolution bonus preserving damage, with one inspiration',()=>{
 let s=fixture(['abe-protection','abe-experienced','abe-inspiration']);unit(s);expect(s.stack).toHaveLength(1);s=ok(resolveEffect(s,s.stack.pop()!));expect(s.players.p1.board[0]).toMatchObject({health:7,maxHealth:7});s.players.p1.board[0].health=3;s.choices=[];
 progress(s,'p1').upgrades=6;evolveAllies(s,'p1',[]);expect(s.players.p1.board[0]).toMatchObject({attack:4,health:5,maxHealth:9,evolved:true});expect(s.choices).toHaveLength(1);evolveAllies(s,'p1',[]);expect(s.choices).toHaveLength(1);
 s.players.p1.board=[];s.choices=[];unit(s);expect(s.stack).toHaveLength(0);expect(s.choices).toHaveLength(1);expect(s.players.p1.board[0]).toMatchObject({attack:4,health:7,maxHealth:7});
});
it('applies evolution talents on first evolved entry when six upgrades resolved off field',()=>{
 const s=fixture(['abe-experienced','abe-inspiration']);progress(s,'p1').upgrades=6;evolveAllies(s,'p1',[]);unit(s);expect(s.players.p1.board[0]).toMatchObject({attack:4,health:7,maxHealth:7,evolved:true});expect(s.choices).toHaveLength(2);
});
it('does not grant upgrade talents on a removed target or lethal surgery and isolates owners',()=>{
 let s=fixture(['abe-research','abe-reinforcement']);s=upgrade(s,'enhanced-weapon',[target('missing')]);expect(s.allyProgress?.p1.upgrades??0).toBe(0);unit(s,'aranha').health=1;
 s.definitions.surgery={id:'surgery',kind:'spell',cost:1,speed:'burst',upgrade:true,target:{kind:'unit',side:'ally',min:1,max:1},effect:{type:'surgery',amount:2,attack:2}};
 s=upgrade(s,'surgery');expect(progress(s,'p1').upgrades).toBe(0);
 s.players.p1.board=[];unit(s,'aranha');s=upgrade(s);expect(s.players.p1.board[0].maxHealth).toBe(4);expect(s.talentLoadouts?.p2).toBeUndefined();
});
it('Cinderela replaces only new starter weapons and increases damage only for evolved Abe',()=>{
 const deck=createProtagonistDeck('abe','test');expect(deck.filter(c=>c.definitionId==='cinderela')).toHaveLength(2);expect(deck.some(c=>c.definitionId==='enhanced-weapon')).toBe(false);expect(fullCatalog['enhanced-weapon']).toBeDefined();
 let s=fixture([]);const u=unit(s);u.equipment=[{card:{instanceId:'c',definitionId:'cinderela'},used:false}];s.choices=[];
 expect(damageWith(s,u,'c')).toBe(3);u.evolved=true;expect(damageWith(s,u,'c')).toBe(5);
 s.combat={attacker:'p1',stage:'responses',lanes:[{attackerId:'abe',blockerId:null,blocked:false,weapons:['c']}]};s=ok(resolveCombat(s));expect(s.players.p2.nexus).toBe(15);
 const v=unit(s,'aranha');v.evolved=true;v.equipment=[{card:{instanceId:'c2',definitionId:'cinderela'},used:false}];expect(damageWith(s,v,'c2')).toBe(2);
});

it('discounts paid Upgrade equipment with floor one and counts only successful attachment',()=>{
 let s=fixture(['abe-economy','abe-reinforcement']);unit(s,'aranha');s.definitions['upgrade-gear']={id:'upgrade-gear',kind:'equipment',cost:2,damage:1,upgrade:true};
 s.players.p1.hand=[{instanceId:'g',definitionId:'upgrade-gear'}];s=ok(applyCommand(s,{type:'play',player:'p1',instanceId:'g',targets:[target('aranha')]}));expect(s.players.p1.mana).toBe(9);expect(progress(s,'p1').upgrades).toBe(1);expect(s.players.p1.board[0].maxHealth).toBe(4);expect(cardCost(s,'p1',s.definitions['upgrade-gear'])).toBe(2);
});

it('applies target bonuses to a redirected Upgrade without borrowing the enemy talents',()=>{
 let s=fixture(['abe-reinforcement','abe-calibration']);enterUnit(s,'p2',{instanceId:'enemy',definitionId:'aranha'},0,[]);
 s=ok(resolveEffect(s,{id:77,owner:'p1',source:{instanceId:'redirected',definitionId:'enhanced-weapon'},targets:[{kind:'unit',player:'p2',instanceId:'enemy'}],ignoreSide:true}));
 expect(s.players.p2.board[0]).toMatchObject({attack:5,health:3,maxHealth:4,roundAttackBonus:1});expect(s.talentState?.p2).toBeUndefined();
});
