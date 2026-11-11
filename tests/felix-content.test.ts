import {describe,it,expect} from 'vitest';
import {felixCatalog,enemyDeckLists,createEnemyDeck} from '../src/content/felix.js';
import {validateCatalog} from '../src/content/schema.js';
describe('approved Félix encounter content',()=>{
 it('keeps twenty supports and four unique encounter specials outside collection',()=>{
  expect(()=>validateCatalog(felixCatalog)).not.toThrow();
  const supports=Object.values(felixCatalog).filter(c=>c.enemyOnly&&c.id.startsWith('lab-'));
  expect(supports).toHaveLength(20);
  for(const c of Object.values(felixCatalog)){expect(c.rarity).toBeUndefined();expect(c.collectible).toBe(false);}
  for(const id of new Set(Object.values(enemyDeckLists).flat())){const c=felixCatalog[id];expect(c.enemyOnly).toBe(true);expect(c.regions).toHaveLength(1);}
  for(const id of ['labotomia','tornado','dianamite','felix'])expect(felixCatalog[`enemy-${id}`]).toMatchObject({unique:true,encounterSpecial:id});
 });
 it('keeps the encounter lists at their approved sizes with two copies per identity',()=>{
  for(const [variant,list] of Object.entries(enemyDeckLists)){
   const deck=createEnemyDeck(variant as keyof typeof enemyDeckLists,'test');
   expect(list).toHaveLength(['felix','king'].includes(variant)?15:['labotomia','tornado','dianamite'].includes(variant)?13:10);
   expect(new Set(list).size).toBe(list.length);expect(deck).toHaveLength(list.length*2);
   expect(new Set(deck.map(c=>c.instanceId)).size).toBe(deck.length);
   for(const id of list)expect(deck.filter(c=>c.definitionId===id)).toHaveLength(2);
  }
  expect(enemyDeckLists.king).toContain('lab-pulso-do-laboratorio');expect(enemyDeckLists.felix).not.toContain('lab-descarga-de-bobina');
  expect(enemyDeckLists.dianamite).not.toContain('lab-braco-de-pistao');
 });
 it('encodes response windows, surgery and no-heal maximum health',()=>{
  expect(felixCatalog['lab-assistente-de-suturas']).toMatchObject({entryTarget:{min:1,side:'ally'},entrySpell:'lab-assistant-heal'});
  expect(felixCatalog['lab-servidor-criogenico']).toMatchObject({entryTarget:{min:0,side:'enemy'}});
  expect(felixCatalog['lab-incisao-experimental']).toMatchObject({upgrade:true,effect:{type:'surgery',amount:1,attack:2}});
  expect(felixCatalog['lab-sobrecarga-forcada']).toMatchObject({effect:{type:'surgery',amount:1,attack:3,temporary:true,quick:true}});
  expect(felixCatalog['lab-placas-de-contencao']).toMatchObject({kind:'armor',effect:{type:'armor',amount:3}});
  expect(felixCatalog['lab-reflexos-alterados']).toMatchObject({failIfKeywordPresent:true,effect:{type:'keyword',keyword:'quick',temporary:true}});
  expect(felixCatalog['lab-prototype-death']).toMatchObject({area:'all-units',effect:{type:'damage',amount:1}});
 });
});

