import {expect,it} from 'vitest';
import {cardFace} from '../../src/ui/card-face.js';
import {fullCatalog} from '../../src/content/decks.js';
import {regionSymbol} from '../../src/ui/html.js';

it('uses each approved symbol and retains both regions of a protagonist',()=>{
 for(const region of ['north','west','south','east','korakarom'] as const){
  expect(regionSymbol(region)).toContain('/art/regions/approved-symbols.png');
  expect(regionSymbol(region)).toContain('role="img"');
 }
 const abe=cardFace(fullCatalog.abe);
 expect(abe).toContain('aria-label="Sul"');
 expect(abe).toContain('aria-label="Oeste"');
 expect(abe.match(/class="region-symbol"/g)).toHaveLength(2);
});

it('distinguishes champion, ally, spell and equipment without changing their data',()=>{
 for(const [id,kind] of [['abe','champion'],['aranha','unit'],['engineering','spell'],['cinderela','equipment']]){
  const def=fullCatalog[id],before=JSON.stringify(def),html=cardFace(def);
  expect(html).toContain(`caps-card-${kind}`);
  expect(html).toContain(`Custo ${def.cost}`);
  expect(JSON.stringify(def)).toBe(before);
  expect(html.includes('caps-health')).toBe(def.kind==='unit');
 }
});
it('preserves escaped rules and the effective display used by the hand preview',()=>{
 const html=cardFace(fullCatalog.abe,{title:'<Abe>',body:'Texto & efeito',cost:1});
 expect(html).toContain('&lt;Abe&gt;');
 expect(html).toContain('Texto &amp; efeito');
 expect(html).toContain('Custo 1');
 const spell=cardFace(fullCatalog.kylast,{arsenal:true});
 expect(spell).toContain('caps-card-spell');
 expect(spell).not.toContain('caps-health');
});
