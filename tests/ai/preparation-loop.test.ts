import {it,expect} from 'vitest';
import {createSession} from '../../src/ui/session.js';
import {chooseAiCommand} from '../../src/ai/policy.js';
import {observeBattle} from '../../src/ai/observation.js';
import {applyCommand} from '../../src/battle/commands.js';
it('AI stops repeating free equipment buffs once current attack exceeds visible lethal needs, while player may continue',()=>{const s=createSession(1,'manual').state;s.phase='actions';s.round=3;s.attackOwner='p2';s.priorityOwner='p1';s.attackAvailable=true;s.equippedIdentities.p1=['sword-kylast'];s.definitions['sword-kylast'].cost=0;s.players.p1.mana=0;s.players.p1.hand=[{definitionId:'sword-kylast',instanceId:'next'}];s.players.p1.board=[{card:{definitionId:'damian',instanceId:'damian'},attack:80,health:4,maxHealth:4,equipment:[{card:{definitionId:'sword-kylast',instanceId:'old'},used:false}]}];expect(applyCommand(s,{type:'play',player:'p1',instanceId:'next',targets:[{kind:'unit',player:'p1',instanceId:'damian'}],replaceEquipmentId:'old'}).ok).toBe(true);expect(chooseAiCommand(observeBattle(s,'p1'))?.command.type).toBe('pass');});

