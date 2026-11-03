import {it,expect} from 'vitest';
import {createProfile} from '../../src/profile/profile.js';
import {relicInitialSelector,renderRelicCollection,renderRelicOffer} from '../../src/ui/relic-view.js';
import {relicCatalog} from '../../src/content/relics.js';
import {enableRelics} from '../../src/run/relics.js';
import {createMapRun} from '../../src/run/adventure.js';
it('offers only conquered implemented relics at the start',()=>{
 const p=createProfile('Teste','abe',42,0);p.relicCollection={'artifact-07':{conquered:false},'artifact-16':{conquered:true},'artifact-01':{conquered:true}};
 const html=relicInitialSelector(p);expect(html).toContain('value="artifact-16"');expect(html).not.toContain('value="artifact-07"');expect(html).not.toContain('value="artifact-01"');expect(html).toContain('Começar sem relíquia');
});
it('reveals effects after discovery and labels unfinished content',()=>{
 const p=createProfile('Teste','abe',42,0);let html=renderRelicCollection(p);expect(html).not.toContain(relicCatalog['artifact-07'].effect);expect(html).toContain('Em preparação');
 p.relicCollection={'artifact-07':{conquered:false}};html=renderRelicCollection(p);expect(html).toContain(relicCatalog['artifact-07'].effect);expect(html).toContain('Descoberta · ainda não conquistada');
 const run=enableRelics(createMapRun(42));run.relicRun!.offers=['artifact-07'];expect(renderRelicOffer(run)).toContain('data-action="run-relic"');
});
