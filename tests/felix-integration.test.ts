import {it,expect} from 'vitest';
import {fullCatalog,createProtagonistDeck} from '../src/content/decks.js';
import {createEnemyDeck,enemyDeckLists} from '../src/content/felix.js';
import type {EnemyDeckVariant} from '../src/content/felix.js';
import {createBattle} from '../src/battle/setup.js';
import {initEncounter} from '../src/battle/encounters.js';
import {applyCommand} from '../src/battle/commands.js';
import {observeBattle} from '../src/ai/observation.js';
import {chooseAiCommand} from '../src/ai/policy.js';
import {actingPlayer} from '../src/ui/session.js';
import {enterUnit} from '../src/battle/units.js';
import {resolveEffect} from '../src/battle/effects.js';
import {equipFromHand} from '../src/battle/equipment.js';
function battle(variant:EnemyDeckVariant='felix'){const s=createBattle({p1:createProtagonistDeck('abe','a'),p2:createEnemyDeck(variant,'b')},42,fullCatalog);initEncounter(s,variant,30);return s;}
it('surgery fails for Upgrade progress on a dead target; paid weapons share Abe Upgrade',()=>{let s=battle();s.phase='actions';s.round=1;s.priorityOwner='p1';s.players.p1.mana=10;enterUnit(s,'p1',{instanceId:'hero',definitionId:'abe'},0,[]);s.choices=[];enterUnit(s,'p1',{instanceId:'target',definitionId:'lab-cobaia-reforcada'},1,[]);s.players.p1.board[1].health=1;const r=resolveEffect(s,{id:1,owner:'p1',source:{definitionId:'lab-incisao-experimental',instanceId:'spell'},targets:[{kind:'unit',player:'p1',instanceId:'target'}]});expect(r.ok).toBe(true);if(!r.ok)return;s=r.state;expect(s.allyProgress?.p1.upgrades??0).toBe(0);s.players.p1.hand.push({instanceId:'knife',definitionId:'lab-bisturi-mecanico'});const gear=equipFromHand(s,'p1','knife','hero');expect(gear.ok).toBe(true);if(gear.ok)expect(gear.state.allyProgress?.p1.upgrades).toBe(1);});
it('Labotomia ability is once per round and Tornado target choice is public',()=>{const s=battle('labotomia');s.phase='actions';s.round=1;s.priorityOwner='p2';enterUnit(s,'p2',{definitionId:'enemy-labotomia',instanceId:'surgeon'},0,[]);const r=applyCommand(s,{type:'surgery',player:'p2',targetId:'surgeon'});expect(r.ok).toBe(true);if(r.ok){const again={...r.state,priorityOwner:'p2' as const,stack:[],stackReturnOwner:null};expect(applyCommand(again,{type:'surgery',player:'p2',targetId:'surgeon'}).ok).toBe(false);}enterUnit(s,'p1',{definitionId:'damian',instanceId:'enemy'},0,[]);enterUnit(s,'p2',{definitionId:'enemy-tornado',instanceId:'ice'},1,[]);expect(s.laboratoryChoices?.[0].options).toEqual(['enemy']);expect(chooseAiCommand(observeBattle(s,'p2'))?.command).toMatchObject({type:'chooseTornado',targetId:'enemy'});});
for(const variant of Object.keys(enemyDeckLists) as EnemyDeckVariant[])it(`completes legal automated encounter ${variant}`,()=>{let s=battle(variant);let sawKing=false;for(let i=0;i<700&&s.phase!=='ended';i++){const actor=actingPlayer(s);const command=actor?chooseAiCommand(observeBattle(s,actor))?.command:{type:'start' as const};expect(command,`no action ${i} ${s.round}`).toBeDefined();const result=applyCommand(s,command!);if(!result.ok)throw Error(`${variant}: ${JSON.stringify(command)}: ${result.error}`);s=result.state;sawKing||=s.encounter?.phase==='king';}expect(s.phase).toBe('ended');expect(s.winner).toBeTruthy();},20000);
