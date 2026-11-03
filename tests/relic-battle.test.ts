import {it,expect} from 'vitest';
import {createSession} from '../src/ui/session.js';
import {attachRelics,relicUnitPlayed,relicRound} from '../src/battle/relics.js';
import {observeBattle,planningState} from '../src/ai/observation.js';
import {applyCommand} from '../src/battle/commands.js';
const unit=(id:string,hp=2)=>({card:{instanceId:id,definitionId:'damian'},attack:3,health:hp,maxHealth:4});
it('grants Quick only to the first played unit of each round and preserves existing permanent keywords',()=>{
 const s=createSession(42).state;s.round=1;attachRelics(s,['artifact-22']);const a=unit('a'),b=unit('b');s.players.p1.board=[a,b];
 relicUnitPlayed(s,'p1',a);relicUnitPlayed(s,'p1',b);expect(a).toMatchObject({keywords:['quick'],temporaryKeywords:['quick']});expect(b).not.toHaveProperty('keywords');
 s.round=2;const c={...unit('c'),keywords:['quick'] as ('quick')[]};relicUnitPlayed(s,'p1',c);expect(c).not.toHaveProperty('temporaryKeywords');
 const planned=planningState(observeBattle(s,'p1'));expect(planned.relicState).toEqual(s.relicState);
});
it('a played unit with entry draw retains its relic keyword after drawing',()=>{
 const s=createSession(42,'manual','arcata').state;s.phase='actions';s.round=1;s.priorityOwner='p1';s.players.p1.mana=10;s.players.p1.maxMana=10;attachRelics(s,['artifact-22']);
 s.players.p1.hand=[{instanceId:'qa-raven',definitionId:'arcata-raven'}];
 const r=applyCommand(s,{type:'play',player:'p1',instanceId:'qa-raven'});expect(r.ok).toBe(true);if(r.ok)expect(r.state.players.p1.board[0].keywords).toContain('quick');
});
it('keeps unit triggers before relic triggers and the attack owner before the other side',()=>{
 const s=createSession(42).state;s.phase='actions';s.round=3;s.attackOwner='p1';attachRelics(s,['artifact-07']);s.players.p1.board=[unit('a')];
 s.stack=[{id:1,owner:'p2',source:{instanceId:'other',definitionId:'damian'},targets:[]},{id:2,owner:'p1',source:{instanceId:'own',definitionId:'damian'},targets:[]}];s.nextEffectId=3;
 relicRound(s,[]);expect(s.stack.map(p=>p.source.definitionId)).toEqual(['damian','relic-heal-virtue','damian']);
});
it('queues healing for the wounded ally with lowest current life once per round',()=>{
 const s=createSession(42).state;s.round=3;attachRelics(s,['artifact-07']);s.players.p1.board=[unit('a',3),unit('b',1)];relicRound(s,[]);
 expect(s.stack).toHaveLength(1);expect(s.stack[0].targets).toEqual([{kind:'unit',player:'p1',instanceId:'b'}]);relicRound(s,[]);expect(s.stack).toHaveLength(1);
});
