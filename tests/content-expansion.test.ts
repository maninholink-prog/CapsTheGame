import {describe,it,expect} from 'vitest';
import {expansionCatalog,expansionStarters,expansionPackages,expansionChampionSpells} from '../src/content/expansion.js';
import {validateCatalog} from '../src/content/schema.js';

describe('approved four-protagonist content',()=>{
 it('validates all cards and classifies exactly 37 collectible supports',()=>{
  expect(()=>validateCatalog(expansionCatalog)).not.toThrow();
  const supports=Object.values(expansionCatalog).filter(c=>c.collectible);
  expect(supports).toHaveLength(37);
  for(const card of supports){expect(card.regions).toHaveLength(1);expect(card.rarity).toBeTruthy();expect(card.exclusiveChampion).toBeUndefined();}
 });
 it('keeps complete starter identities and six-card recruitment packages',()=>{
  for(const hero of ['youro','kuara','thalion','lazaro'] as const){
   expect(expansionStarters[hero]).toHaveLength(hero==='thalion'?11:10);
   expect(new Set(expansionStarters[hero]).size).toBe(expansionStarters[hero].length);
   expect(expansionPackages[hero]).toHaveLength(3);
   expect(expansionPackages[hero][0]).toBe(hero);
   for(const id of [...expansionStarters[hero],...expansionPackages[hero]])expect(expansionCatalog[id]).toBeDefined();
   expect(expansionStarters[hero]).not.toContain(expansionChampionSpells[hero]);
   expect(expansionCatalog[expansionChampionSpells[hero]].championCopy).toBe(hero);
  }
 });
 it('preserves approved regional distribution and generated-token isolation',()=>{
  expect(expansionCatalog['living-wallet'].regions).toEqual(['korakarom']);
  expect(expansionCatalog.balimor.regions).toEqual(['korakarom']);
  expect(expansionCatalog['minor-illusion'].regions).toEqual(['korakarom']);
  expect(expansionCatalog.chapisco.regions).toEqual(['east']);
  for(const id of ['living-sprout','spirit-wolf']){expect(expansionCatalog[id].rarity).toBeUndefined();expect(expansionCatalog[id].collectible).toBe(false);}
 });
 it('encodes fatigue exception, music, damage variants and optional entries',()=>{
  expect(expansionCatalog['kuara-magic-hands'].kind!=='unit'&&expansionCatalog['kuara-magic-hands'].kind!=='equipment'&&expansionCatalog['kuara-magic-hands'].effect).toEqual({type:'steal',amount:2,emptyFatigue:true});
  expect(expansionCatalog['light-fingers'].requiresEnemyDeck).toBe(true);
  expect(expansionCatalog['heat-metal']).toMatchObject({music:true,fire:true,dynamicDamage:'equipped'});
  expect(expansionCatalog['pride-curse']).toMatchObject({music:true,dynamicDamage:'attack'});
  for(const id of ['judite','chapisco','brawling-satyr','rock'])expect(expansionCatalog[id]).toMatchObject({entryTarget:{min:0,max:1}});
  expect(expansionCatalog['last-cry']).toMatchObject({kind:'equipment',damage:2,expansion:'last-cry'});
 });
});
