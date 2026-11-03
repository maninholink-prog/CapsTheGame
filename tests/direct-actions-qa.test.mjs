import {it,expect} from 'vitest';
import {writeFileSync} from 'node:fs';
import {createMapRun,enterNode} from '../src/run/adventure.ts';
import {runBattle} from '../src/run/run.ts';
import {sessionFromBattle} from '../src/ui/session.ts';
import {createProfile} from '../src/profile/profile.ts';
import {startAccount} from '../src/profile/rewards.ts';
import {decodeSave,encodeSave} from '../src/profile/storage.ts';
it('builds a valid isolated backup for direct-action UI checks',()=>{
 const run=enterNode(createMapRun(42,'arcata'),'start');let profile=createProfile('QA — controles diretos','arcata',42,0);profile=startAccount(profile,run,'qa-direct');
 const session=sessionFromBattle(runBattle(run),run.battleSeed);session.opponentMode='manual';
 const s=session.state;s.phase='actions';s.round=4;s.priorityOwner='p1';s.attackOwner='p1';s.attackAvailable=true;
 for(const p of Object.values(s.players)){p.mulliganUsed=true;p.mana=10;p.maxMana=10;}
 s.players.p1.hand=['fire-shield','wall-fire'].map(id=>({instanceId:`qa-${id}`,definitionId:id}));
 s.players.p1.board=['arcata-raven','salita'].map(id=>{const d=s.definitions[id];return {card:{instanceId:`qa-${id}`,definitionId:id},attack:d.attack,health:d.health,maxHealth:d.health};});
 s.players.p2.board=[{card:{instanceId:'qa-damian',definitionId:'damian'},attack:3,health:4,maxHealth:4}];
 const raw=encodeSave({profile,run,session});expect(decodeSave(raw).session.state.round).toBe(4);
 if(process.env.CAPS_DIRECT_QA)writeFileSync(process.env.CAPS_DIRECT_QA,raw);
 s.attackOwner='p2';s.combat={attacker:'p2',stage:'blocking',lanes:[{attackerId:'qa-damian',blockerId:null,blocked:false,weapons:[]}]};
 const blockedRaw=encodeSave({profile,run,session});expect(decodeSave(blockedRaw).session.state.combat.stage).toBe('blocking');
 if(process.env.CAPS_BLOCK_QA)writeFileSync(process.env.CAPS_BLOCK_QA,blockedRaw);
});
