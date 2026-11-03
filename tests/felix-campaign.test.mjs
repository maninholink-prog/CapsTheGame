import {it,expect} from 'vitest';
import {validateSave} from '../src/profile/validation.ts';
import {writeFileSync} from 'node:fs';
import {protagonistIds} from '../src/content/decks.ts';
import {createProfile} from '../src/profile/profile.ts';
import {startAccount,settleBattle,settleRun} from '../src/profile/rewards.ts';
import {createMapRun,enterNode,availableNodes,resolveEvent,reviveRun,abandonRun} from '../src/run/adventure.ts';
import {runBattle,finishBattle,recruit,reward} from '../src/run/run.ts';
import {buy,leaveShop,offerError,offerPrice} from '../src/run/shops.ts';
import {sessionFromBattle,actingPlayer,dispatch} from '../src/ui/session.ts';
import {chooseAiCommand} from '../src/ai/policy.ts';
import {observeBattle} from '../src/ai/observation.ts';
import {encodeSave,decodeSave} from '../src/profile/storage.ts';
import {enableRelics,takeRelic} from '../src/run/relics.ts';
import {discoverRelics} from '../src/profile/relics.ts';
it('plays complete Felix adventures with real decisions and records balance evidence',()=>{
 const results=[];let capturedKing=false;
 for(const hero of protagonistIds.filter(h=>!process.env.CAPS_FELIX_HERO||h===process.env.CAPS_FELIX_HERO))for(const seed of (process.env.CAPS_FELIX_SEEDS??'1,2,3,4').split(',').map(Number)){
  let run=createMapRun(seed,hero),profile=createProfile(`Teste ${hero}`,hero,seed,0);if(process.env.CAPS_TEST_RELICS){run=enableRelics(run,'artifact-16');profile.relicCollection={'artifact-16':{conquered:true}};}run.collection=Object.keys(profile.collection);profile=startAccount(profile,run,`${hero}-${seed}`);let enteredKing=false,endedKing=false,steps=0,battles=0;
  while(!['won','lost'].includes(run.stage)&&steps++<35){
   if(run.stage==='map')run=enterNode(run,availableNodes(run)[0].id);
   else if(run.stage==='event')run=resolveEvent(run,true);
   else if(run.stage==='shop'){
    for(let i=0;i<4;i++){const offers=run.shops[run.map.current].offers;const item=offers.find(o=>o.kind==='healAll'&&run.maxNexus-run.nexus>5&&!offerError(run,o))??offers.find(o=>o.kind==='heal5'&&run.nexus<run.maxNexus&&!offerError(run,o))??offers.filter(o=>o.kind==='improvement'&&run.deck.some(c=>c.definitionId===o.cardId)&&!offerError(run,o)).sort((a,b)=>offerPrice(run,a)-offerPrice(run,b))[0];if(!item)break;run=buy(run,item.id);}
    run=leaveShop(run);
   }else if(run.stage==='recruit'){const prefer=['rubel','kylast','abe','arcata','youro','lazaro','thalion','kuara'];run=recruit(run,prefer.find(id=>run.allies.includes(id)));}
   else if(run.stage==='relic'){
    if(process.env.CAPS_RELIC_QA)writeFileSync(process.env.CAPS_RELIC_QA,encodeSave({profile,run,session:null}));
    run=takeRelic(run,run.relicRun.offers[0]);profile=discoverRelics(profile,run);
   }
   else if(run.stage==='reward')run=reward(run,run.rewards[0]??null);
   else if(run.stage==='defeat'){if(run.revives)run=reviveRun(run,'retry');else{const before=run;run=abandonRun(run);profile=settleRun(profile,run,before.coins,before.revives,0);}}
   else if(run.stage==='battle'){
    let session=sessionFromBattle(runBattle(run),run.battleSeed),moves=0;
    while(session.state.phase!=='ended'&&moves++<900){const actor=actingPlayer(session.state),command=actor?chooseAiCommand(observeBattle(session.state,actor))?.command:{type:'start'};expect(command,`${hero}/${seed} missing action`).toBeTruthy();session=dispatch(session,command);expect(session.error,`${hero}/${seed} ${JSON.stringify(command)}`).toBe('');enteredKing||=session.state.encounter?.phase==='king';if(process.env.CAPS_FELIX_KING_UI&&!capturedKing&&session.state.encounter?.phase==='king'&&session.state.phase!=='ended'){const raw=encodeSave({profile,run,session});decodeSave(raw);writeFileSync(process.env.CAPS_FELIX_KING_UI,raw);capturedKing=true;}if(moves%25===0&&session.state.phase!=='ended'){const raw=encodeSave({profile,run,session});try{decodeSave(raw);}catch(error){writeFileSync('tmp/felix-invalid-save.json',raw);validateSave(JSON.parse(raw));throw error;}}}
    if(session.state.phase!=='ended')writeFileSync('tmp/felix-stalled.json',encodeSave({profile,run,session}));
    expect(session.state.phase,`${hero}/${seed} battle did not finish on round ${session.state.round}`).toBe('ended');endedKing||=session.state.encounter?.phase==='king'&&session.state.winner==='p1';battles++;const before=run;run=finishBattle(run,session.state);profile=settleBattle(profile,before,run,session.state,0);
   }
  }
  expect(['won','lost']).toContain(run.stage);expect(()=>decodeSave(encodeSave({profile,run,session:null}))).not.toThrow();
  results.push({hero,seed,result:run.stage,battles,enteredKing,endedKing,nexus:run.nexus,stones:profile.stones,xp:profile.mastery[hero].xp});
  if(run.stage==='won'){if(run.relicRun)for(const id of run.relicRun.active)expect(profile.relicCollection[id].conquered).toBe(true);expect(endedKing).toBe(true);expect(profile.stones).toBe(150);expect(profile.boosters.common).toBe(1);}
 }
 const report={attempts:results.length,victories:results.filter(r=>r.result==='won').length,kingPhases:results.filter(r=>r.enteredKing).length,results};
 if(process.env.CAPS_FELIX_REPORT)writeFileSync(process.env.CAPS_FELIX_REPORT,JSON.stringify(report,null,2));
 expect(report.kingPhases).toBeGreaterThan(0);expect(report.victories).toBeGreaterThan(0);
},600000);



