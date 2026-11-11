import {expect,it} from 'vitest';
import {actingPlayer,createSession} from '../src/ui/session.js';
import {collectibleIds} from '../src/profile/profile.js';
import {applyCommand} from '../src/battle/commands.js';
import type {Command} from '../src/battle/commands.js';
import type {BattleState,BoardUnit} from '../src/battle/types.js';
import {chooseAiCommand} from '../src/ai/policy.js';
import {observeBattle} from '../src/ai/observation.js';
import {caveiraDecks} from '../src/content/caveira.js';
import type {CaveiraDeck} from '../src/content/caveira.js';

function apply(state:BattleState,command:Command):BattleState {
 const result=applyCommand(state,command);
 if(!result.ok)throw Error(JSON.stringify(command)+': '+result.error);
 return result.state;
}
function actionState(){
 const {state}=createSession(42,'ai','kylast','caveira-captain');
 state.phase='actions';state.round=1;state.attackOwner='p2';state.attackAvailable=true;state.priorityOwner='p2';
 state.players.p2.mana=10;
 return state;
}
function unit(id:string,definitionId:string,attack:number,health:number,maxHealth=health):BoardUnit{
 return {card:{instanceId:id,definitionId},attack,health,maxHealth};
}
function passPair(state:BattleState){
 for(let i=0;i<2;i++)state=apply(state,{type:'pass',player:state.priorityOwner!});
 return state;
}

it('starts a playable Caveira Dourada training encounter with its own enemy-only deck',()=>{
 const {state}=createSession(42,'ai','kylast','caveira-captain');
 const cards=[...state.players.p2.hand,...state.players.p2.deck];
 expect(cards).toHaveLength(30);
 expect(cards.filter(c=>c.definitionId==='caveira-curse')).toHaveLength(2);
 expect(state.encounter?.id).toBe('caveira-captain');
 expect(collectibleIds).not.toContain('caveira-curse');
});

it.each(Object.entries(caveiraDecks).filter(([id])=>id.startsWith('jupiter-')))('starts Jupiter playtest deck %s with approved size and copies',id=>{
 const {state}=createSession(42,'ai','kylast',id as CaveiraDeck);
 const cards=[...state.players.p2.hand,...state.players.p2.deck];
 expect(cards).toHaveLength(id==='jupiter-kraken'?30:20);
 expect(new Set(cards.map(c=>c.definitionId)).size).toBe(id==='jupiter-kraken'?15:10);
 expect(cards.every(c=>state.definitions[c.definitionId].enemyOnly)).toBe(true);
 expect(state.encounter?.id).toBe(id);
});

it('Jupiter Raider can return a wounded allied unit on entry through a response window',()=>{
 let state=actionState();
 state.players.p2.hand=[{instanceId:'raider',definitionId:'jupiter-raider'}];
 state.players.p2.board=[unit('wounded-ally','caveira-pirate',1,1,2)];
 state=apply(state,{type:'play',player:'p2',instanceId:'raider',targets:[{kind:'unit',player:'p2',instanceId:'wounded-ally'}]});
 expect(state.stack.at(-1)?.source.definitionId).toBe('jupiter-raider-return');
 state=passPair(state);
 expect(state.players.p2.board.map(u=>u.card.instanceId)).toEqual(['raider']);
 expect(state.players.p2.hand.some(c=>c.instanceId==='wounded-ally')).toBe(true);
});

it.each(Object.keys(caveiraDecks) as CaveiraDeck[])('finishes a simulated match against %s',encounter=>{
 let {state}=createSession(42,'ai','kylast',encounter);
 for(let i=0;i<550&&state.phase!=='ended';i++){
  const actor=actingPlayer(state);
  const command=actor?chooseAiCommand(observeBattle(state,actor))?.command:{type:'start' as const};
  expect(command).toBeDefined();
  state=apply(state,command!);
 }
 expect(state.phase).toBe('ended');
},20000);

it('keeps the curse through the next round and expires it without retaining a round buff',()=>{
 let state=actionState();
 state.players.p2.hand=[{instanceId:'curse',definitionId:'caveira-curse'}];
 state.players.p1.board=[{...unit('victim','caveira-pirate',3,2),roundAttackBonus:2}];
 state=apply(state,{type:'play',player:'p2',instanceId:'curse',targets:[{kind:'unit',player:'p1',instanceId:'victim'}]});
 state=passPair(state);
 expect(state.players.p1.board[0].attack).toBe(1);
 state=passPair(state);
 expect(state.round).toBe(2);
 expect(state.players.p1.board[0].attack).toBe(0);
 state=passPair(state);
 expect(state.round).toBe(3);
 expect(state.players.p1.board[0].attack).toBe(1);
});

it('gives the cannon and Megalodonte separate response windows before combat damage',()=>{
 let state=actionState();
 state.players.p2.board=[unit('cannon','caveira-cannon',2,3),unit('mega','caveira-megalodon',6,7)];
 state.players.p1.board=[unit('target','caveira-guard',1,4)];
 state=apply(state,{type:'attack',player:'p2',attackers:[{unitId:'cannon'},{unitId:'mega'}]});
 expect(state.laboratoryChoices?.[0].kind).toBe('cannon');
 state=apply(state,{type:'chooseCaveira',player:'p2',targetId:'target'});
 expect(state.stack.at(-1)?.source.definitionId).toBe('caveira-shot');
 state=passPair(state);
 expect(state.combat?.stage).toBe('blocking');
 expect(state.players.p1.board[0].health).toBe(3);
 state=apply(state,{type:'block',player:'p1',assignments:[{attackerId:'mega',blockerId:'target'}]});
 expect(state.stack.at(-1)?.source.definitionId).toBe('caveira-charge');
 expect(state.players.p1.board[0].health).toBe(3);
 state=passPair(state);
 expect(state.players.p1.board).toHaveLength(0);
 expect(state.players.p1.nexus).toBe(18);
});

it('can salvage a specific sword and cannot bite an unwounded unit',()=>{
 let state=actionState();
 state.players.p2.hand=[{instanceId:'diver',definitionId:'caveira-diver'},{instanceId:'shark',definitionId:'caveira-shark'}];
 state.players.p2.discard=[{instanceId:'sword',definitionId:'caveira-sword'}];
 state.players.p1.board=[unit('victim','caveira-pirate',1,2)];
 const bite:Command={type:'play',player:'p2',instanceId:'shark',targets:[{kind:'unit',player:'p1',instanceId:'victim'}]};
 expect(applyCommand(state,bite).ok).toBe(false);
 state=apply(state,{type:'play',player:'p2',instanceId:'diver'});
 state=apply(state,{type:'chooseCaveira',player:'p2',targetId:'sword'});
 expect(state.players.p2.hand.some(card=>card.instanceId==='sword')).toBe(true);
 expect(state.players.p2.discard).toHaveLength(0);
});
