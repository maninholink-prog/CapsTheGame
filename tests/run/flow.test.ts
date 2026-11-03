import {it,expect} from 'vitest';
import {createRun,runBattle,finishBattle,recruit,reward,nextBattle} from '../../src/run/run.js';
import {applyCommand} from '../../src/battle/commands.js';
import {observeBattle} from '../../src/ai/observation.js';
import {chooseAiCommand} from '../../src/ai/policy.js';
import {actingPlayer} from '../../src/ui/session.js';
function play(r:ReturnType<typeof createRun>){let b=runBattle(r);for(let i=0;i<500&&b.phase!=='ended';i++){const owner=actingPlayer(b);const cmd=b.phase==='opening'&&!owner?{type:'start' as const}:owner==='p2'?(b.phase==='opening'?{type:'mulligan' as const,player:owner,instanceIds:[]}:b.combat?.stage==='blocking'?{type:'block' as const,player:owner,assignments:[]}:{type:'pass' as const,player:owner}):chooseAiCommand(observeBattle(b,owner!))?.command;if(!cmd)throw Error('No decision');const result=applyCommand(b,cmd);if(!result.ok)throw Error(result.error);b=result.state;}expect(b.phase).toBe('ended');return finishBattle(r,b);}
for(const ally of ['abe','arcata','rubel'])it(`three battle flow with ${ally} against a passive legal opponent reaches victory`,()=>{let r=createRun(2);while(r.stage==='battle'){r=play(r);if(r.stage==='recruit')r=nextBattle(recruit({...r,allies:[ally]},ally));else if(r.stage==='reward')r=nextBattle(reward(r,r.rewards[0]??null));}expect(r.stage).toBe('won');expect(r.battle).toBe(3);expect(r.group).toContain(ally);expect(r.deck.length).toBe(28);});

