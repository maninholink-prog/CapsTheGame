import {it,expect} from 'vitest';
import {chooseAiCommand} from '../../src/ai/policy.js';
import {observeBattle} from '../../src/ai/observation.js';
import {createBattle} from '../../src/battle/setup.js';
import {applyCommand} from '../../src/battle/commands.js';
import {createKylastDeck} from '../../src/content/kylast.js';
import {runCatalog,packages} from '../../src/run/run.js';
import {actingPlayer} from '../../src/ui/session.js';
for(const ally of ['abe','arcata','rubel'])it(`complete legal duel with ${ally} recruited and no hidden choice leak`,()=>{
 const deck=[...createKylastDeck('j1'),...packages[ally].flatMap((definitionId,i)=>[0,1].map(n=>({instanceId:`ally-${i}-${n}`,definitionId})))];
 let s=createBattle({p1:deck,p2:createKylastDeck('j2')},131,runCatalog);
 for(let i=0;i<500&&s.phase!=='ended';i++){
  const actor=actingPlayer(s);const command=s.phase==='opening'&&!actor?{type:'start' as const}:chooseAiCommand(observeBattle(s,actor!))?.command;
  expect(command,`no command at step ${i}`).toBeTruthy();const r=applyCommand(s,command!);if(!r.ok)throw Error(`${ally}: ${JSON.stringify(command)}: ${r.error}`);s=r.state;
 }
 expect(s.phase).toBe('ended');
});
it('opponent fabrication choices remain hidden',()=>{const s=createBattle({p1:createKylastDeck('a'),p2:createKylastDeck('b')},1,runCatalog);s.choices=[{owner:'p1',options:['upgrade-quick','upgrade-double','upgrade-elusive']}];expect(observeBattle(s,'p2').choices![0].options).toEqual([]);});
