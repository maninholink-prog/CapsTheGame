import {expect,it} from 'vitest';
import {createSession} from '../../src/ui/session.js';
import {spellTargetKeys} from '../../src/ui/spell-targets.js';
import {render} from '../../src/ui/render.js';
import {freshDraft} from '../../src/ui/forms.js';
import type {PendingEffect} from '../../src/battle/types.js';

it('connects enemy effects to units, nexus and other effects without changing state',()=>{
 const session=createSession(42,'ai'),state=session.state;
 const effect:PendingEffect={id:7,owner:'p2',source:{instanceId:'magic',definitionId:'banjo'},targets:[{kind:'unit',player:'p1',instanceId:'ally'},{kind:'nexus',player:'p1'},{kind:'stack',effectId:3}],mode:'banjo'};
 state.stack.push(effect);
 const before=JSON.stringify(state);
 expect(spellTargetKeys(state,effect)).toEqual(['unit:p1:ally','nexus:p1','stack:3']);
 const html=render(session,freshDraft());
 expect(html).toContain('data-spell-enemy="true"');
 expect(html).toContain('data-spell-endpoint="stack:7"');
 expect(html).toContain('data-spell-endpoint="nexus:p1"');
 expect(JSON.stringify(state)).toBe(before);
});
it('does not reveal unknown random targets',()=>{
 const state=createSession(42).state;
 for(const mode of ['colar','colar-next','colar-card'] as const){
  expect(spellTargetKeys(state,{id:1,owner:'p2',source:{instanceId:'random',definitionId:'colar'},mode,targets:[{kind:'nexus',player:'p1'}]})).toEqual([]);
 }
});
it('derives current area targets from the same sides used by the resolver',()=>{
 const state=createSession(42).state;
 state.players.p1.board=[{card:{instanceId:'ally',definitionId:'damian'},attack:2,health:3,maxHealth:3}];
 state.players.p2.board=[{card:{instanceId:'enemy',definitionId:'damian'},attack:2,health:3,maxHealth:3}];
 const effect:PendingEffect={id:2,owner:'p2',source:{instanceId:'area',definitionId:'test-area'},targets:[]};
 state.definitions['test-area']={id:'test-area',kind:'spell',cost:1,speed:'fast',target:{kind:'unit',side:'any',min:0,max:0},effect:{type:'heal',amount:1},area:'all-friendly'};
 expect(spellTargetKeys(state,effect)).toEqual(['unit:p2:enemy','nexus:p2']);
 state.definitions['test-area'].area='enemies';
 expect(spellTargetKeys(state,effect)).toEqual(['unit:p1:ally']);
 state.definitions['test-area'].area='all-units';
 expect(spellTargetKeys(state,effect)).toEqual(['unit:p1:ally','unit:p2:enemy']);
});
