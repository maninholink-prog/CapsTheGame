import {it,expect} from 'vitest';
import {createProfile} from '../src/profile/profile.js';
import {startAccount,settleBattle} from '../src/profile/rewards.js';
import {decodeSave,encodeSave} from '../src/profile/storage.js';
import {createMapRun,enterNode,availableNodes,resolveEvent} from '../src/run/adventure.js';
import {runBattle,finishBattle,recruit,reward} from '../src/run/run.js';
import {leaveShop} from '../src/run/shops.js';
import {sessionFromBattle,actingPlayer,dispatch} from '../src/ui/session.js';
import {chooseAiCommand} from '../src/ai/policy.js';
import {observeBattle} from '../src/ai/observation.js';
it('completes a real automated Common route and restores rewards for purchase/open QA',()=>{
 let winningSave='';
 for(let seed=1;seed<=20&&!winningSave;seed++){
  let r=createMapRun(seed,'rubel'),p=createProfile('QA — Recompensas','rubel',seed,Date.now());r.collection=Object.keys(p.collection);p=startAccount(p,r,`qa-${seed}`);let routeSteps=0;
  while(!['won','lost'].includes(r.stage)&&routeSteps++<30){
   if(r.stage==='map')r=enterNode(r,availableNodes(r)[0].id);
   else if(r.stage==='event')r=resolveEvent(r,true);
   else if(r.stage==='shop')r=leaveShop(r);
   else if(r.stage==='recruit')r=recruit(r,r.allies.includes('arcata')?'arcata':r.allies[0]);
   else if(r.stage==='reward')r=reward(r,r.rewards[0]??null);
   else if(r.stage==='defeat')break;
   else if(r.stage==='battle'){
    let session=sessionFromBattle(runBattle(r),r.battleSeed),steps=0;
    while(session.state.phase!=='ended'&&steps++<400){const actor=actingPlayer(session.state);const command=!actor?{type:'start' as const}:actor==='p2'?(session.state.phase==='opening'?{type:'mulligan' as const,player:actor,instanceIds:[]}:session.state.combat?.stage==='blocking'?{type:'block' as const,player:actor,assignments:[]}:{type:'pass' as const,player:actor}):chooseAiCommand(observeBattle(session.state,actor))!.command;session=dispatch(session,command);expect(session.error).toBe('');}
    expect(session.state.phase).toBe('ended');const before=r;r=finishBattle(r,session.state);p=settleBattle(p,before,r,session.state,Date.now());
   }
   expect(()=>decodeSave(encodeSave({profile:p,run:r,session:r.stage==='battle'?sessionFromBattle(runBattle(r),r.battleSeed):null}))).not.toThrow();
  }
  if(r.stage==='won'){expect(p.stones).toBe(150);expect(p.boosters.common).toBe(1);expect(p.mastery.rubel.xp).toBeGreaterThan(0);winningSave=encodeSave({profile:p,run:r,session:null});}
 }
 expect(winningSave).not.toBe('');
},60000);

