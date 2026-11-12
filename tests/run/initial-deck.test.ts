import {expect,it} from 'vitest';
import {createProtagonistDeck} from '../../src/content/decks.js';
import {createMapRun} from '../../src/run/adventure.js';
import {createProfile,grantCard,masteryCost,unlockPlaytestHeroes} from '../../src/profile/profile.js';
import {saveInitialDeck,initialDeckCore} from '../../src/profile/initial-decks.js';
import {startAccount} from '../../src/profile/rewards.js';
import {decodeSave,encodeSave} from '../../src/profile/storage.js';

it('uses an approved custom list in a new run while calls without one keep the starter deck',()=>{
 const ids=['abe','abe','aranha','aranha','project','project',...'zacarias keegan lucia gremin cinderela enhanced-defense flash-genius'.split(' ').flatMap(id=>[id,id])];
 const custom=createMapRun(41,'abe','common','dr-felix',ids),standard=createMapRun(41,'abe');
 expect(custom.deck.map(card=>card.definitionId)).toEqual(ids);
 expect(new Set(custom.deck.map(card=>card.instanceId)).size).toBe(ids.length);
 expect(standard.deck).toEqual(createProtagonistDeck('abe','run'));
});

it('round-trips an owned regional enemy card in a custom initial deck and rejects it in the default deck',()=>{
 let profile=unlockPlaytestHeroes(createProfile('QA','abe',41,0));
 profile.mastery.abe.xp=Array.from({length:14},(_,i)=>masteryCost(i+1)).reduce((a,b)=>a+b,0);
 profile=grantCard(profile,'lab-vigia-de-corda',false,0);
 const ids=[...initialDeckCore('abe'),'zacarias','lab-vigia-de-corda',...['keegan','lucia','gremin','cinderela','enhanced-defense','flash-genius'].flatMap(id=>[id,id])];
 profile=saveInitialDeck(profile,'abe',ids);
 const run=createMapRun(41,'abe','common','dr-felix',ids),saved=startAccount(profile,run,'qa-deck');
 expect(decodeSave(encodeSave({profile:saved,run,session:null})).run?.deck.map(card=>card.definitionId)).toEqual(ids);
 const forbidden=createMapRun(42,'abe');forbidden.deck[6]={instanceId:'forbidden-enemy',definitionId:'lab-vigia-de-corda'};
 const legacy={...profile};delete legacy.initialDecks;
 expect(()=>decodeSave(encodeSave({profile:startAccount(legacy,forbidden,'qa-default'),run:forbidden,session:null}))).toThrow();
});
