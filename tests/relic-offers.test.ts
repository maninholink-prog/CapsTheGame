import {it,expect} from 'vitest';
import {relicCatalog,relicIds} from '../src/content/relics.js';
import {offerRelics,relicWeights} from '../src/run/relics.js';
it('preserves the 47 approved identities and their source qualifications',()=>{
 expect(relicIds).toHaveLength(47);expect(new Set(relicIds).size).toBe(47);
 for(const relic of Object.values(relicCatalog)){expect(['common','rare','legendary']).toContain(relic.rarity);expect(relic.effect.length).toBeGreaterThan(10);expect(relic.sourceLine).toBeGreaterThan(0);}
 expect(relicWeights.common).toEqual({common:75,rare:23,legendary:2});
 expect(relicWeights.ultradimensional).toEqual({common:10,rare:55,legendary:35});
 expect(relicCatalog['artifact-07']).toMatchObject({name:'Excalibur',legacyName:'Lança da Virtude (Vitumirim)'});
 expect(relicCatalog['artifact-16'].name).toBe('Deméter');expect(relicCatalog['artifact-22'].name).toBe('Talarian Boots');
});
it('offers three distinct relics deterministically and excludes those already held',()=>{
 const a=offerRelics(42,'common',[relicIds[0]]);
 expect(a).toEqual(offerRelics(42,'common',[relicIds[0]]));
 expect(a.ids).toHaveLength(3);expect(new Set(a.ids).size).toBe(3);expect(a.ids).not.toContain(relicIds[0]);
 expect(a.state).not.toBe(42);
});
it('redistributes weights among available rarities and returns only remaining options',()=>{
 const remaining=relicIds.filter(id=>relicCatalog[id].rarity==='legendary').slice(0,2);
 const held=relicIds.filter(id=>!remaining.includes(id));
 expect(offerRelics(9,'common',held).ids.sort()).toEqual(remaining.sort());
 const empty=offerRelics(9,'common',relicIds);expect(empty.ids).toEqual([]);expect(empty.state).toBe(9);
});
