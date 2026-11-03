import {it,expect} from 'vitest';
import {createSession,actingPlayer} from '../../src/ui/session.js';
import {chooseAiCommand} from '../../src/ai/policy.js';
import {observeBattle,planningState} from '../../src/ai/observation.js';
import {applyCommand} from '../../src/battle/commands.js';
import {enterUnit} from '../../src/battle/units.js';
import {applyBattleTalents} from '../../src/battle/kylast-talents.js';
function ready(){const s=createSession(42,'manual','youro').state;s.phase='actions';s.round=1;s.attackOwner='p1';s.priorityOwner='p1';s.attackAvailable=false;s.players.p1.mana=10;s.players.p1.maxMana=10;return s;}
it('AI can legally steal using public deck count without hidden identities',()=>{const s=ready();s.players.p1.hand=[{instanceId:'steal',definitionId:'light-fingers'}];const o=observeBattle(s,'p1');expect(o.players.p2.deckCount).toBeGreaterThan(0);expect(planningState(o).players.p2.deck).toEqual([]);const c=chooseAiCommand(o)!.command;expect(c.type).toBe('play');expect(applyCommand(s,c).ok).toBe(true);});
it('AI preserves evolved bear when switching would kill Youro',()=>{const s=ready();enterUnit(s,'p1',{instanceId:'hero',definitionId:'youro'},0,[]);const u=s.players.p1.board[0];u.evolved=true;u.form='bear';u.formPower=4;u.health=3;u.maxHealth=9;expect(chooseAiCommand(observeBattle(s,'p1'))?.command).toMatchObject({type:'chooseForm',form:'bear'});});
it('planning keeps public talent choices and used benefits',()=>{const s=createSession(42,'manual','kylast').state;applyBattleTalents(s,'p1',['arsenal-i','precautious-smith']);s.talentState!.p1!.gripUsed=true;const o=observeBattle(s,'p2'),planned=planningState(o);expect(planned.talentLoadouts).toEqual(s.talentLoadouts);expect(planned.talentState).toEqual(s.talentState);});
for(const hero of ['youro','kuara','thalion','lazaro'] as const)it(`new hero ${hero} completes a legal duel`,()=>{let s=createSession(131,'manual',hero).state;for(let i=0;i<500&&s.phase!=='ended';i++){const actor=actingPlayer(s);const c=actor?chooseAiCommand(observeBattle(s,actor))?.command:{type:'start' as const};expect(c,`step ${i}`).toBeTruthy();const r=applyCommand(s,c!);if(!r.ok)throw Error(`${hero}: ${JSON.stringify(c)}: ${r.error}`);s=r.state;}expect(s.phase).toBe('ended');},20000);
