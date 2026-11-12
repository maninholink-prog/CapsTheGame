import {it,expect} from 'vitest';
import {createProfile,unlockPlaytestHeroes} from '../src/profile/profile.js';
import {protagonistIds,createProtagonistDeck} from '../src/content/decks.js';
import {hubContent} from '../src/ui/hub.js';
it('unlocks every starter for testing without resetting existing progress',()=>{
 const original=createProfile('Teste','abe',42,0);original.stones=123;original.mastery.abe.xp=450;original.collection.abe={count:3,shiny:true};
 const result=unlockPlaytestHeroes(original);
 for(const hero of protagonistIds)for(const card of createProtagonistDeck(hero,'test'))expect(result.collection[card.definitionId].count).toBeGreaterThanOrEqual(2);
 expect(result.stones).toBe(123);expect(result.mastery).toEqual(original.mastery);expect(result.collection.abe).toEqual({count:3,shiny:true});
 expect(original.collection.kylast).toBeUndefined();expect(unlockPlaytestHeroes(result)).toEqual(result);
});
it('offers the test unlock on the home and adventure screens',()=>{
 const p=createProfile('Teste','abe',42,0),filters={search:'',rarity:'',region:'',owned:''};
 expect(hubContent(p,'home',null,filters)).not.toContain('data-action="hub-unlock-test"');
 expect(hubContent(p,'adventure',null,filters)).toContain('data-action="hub-unlock-test"');
 const html=hubContent(unlockPlaytestHeroes(p),'adventure',null,filters);
 expect(html).not.toContain('>Bloqueado</button>');
 expect(html.match(/data-action="hub-start"/g)).toHaveLength(8);
});
