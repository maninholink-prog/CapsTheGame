import {describe,it,expect} from 'vitest';
import {fullCatalog,protagonistIds,createProtagonistDeck} from '../../src/content/decks.js';
import {validateCatalog} from '../../src/content/schema.js';
import {createRun,eligible} from '../../src/run/run.js';
describe('protagonist-only dual regions',()=>{
 it('all region-bearing supports have exactly one region; champions have two distinct regions',()=>{for(const d of Object.values(fullCatalog)){if(!d.regions)continue;expect(d.regions.length, d.id).toBe(d.kind==='unit'&&d.champion?2:1);expect(new Set(d.regions).size,d.id).toBe(d.regions.length);}});
 it('rejects dual-region support, single-region protagonist and duplicated protagonist region',()=>{expect(()=>validateCatalog({card:{id:'card',kind:'unit',cost:1,attack:1,health:1,regions:['north','east']}})).toThrow();expect(()=>validateCatalog({abe:{...fullCatalog.abe,regions:['west']}})).toThrow();expect(()=>validateCatalog({abe:{...fullCatalog.abe,regions:['west','west']}})).toThrow();});
 it('every starter card has assigned regions compatible with its protagonist',()=>{for(const hero of protagonistIds){const r=createRun(1,hero);for(const c of createProtagonistDeck(hero,'a')){const d=fullCatalog[c.definitionId];expect(d.regions,c.definitionId).toBeDefined();expect(d.regions!.some(x=>x==='korakarom'||r.regions.includes(x)),c.definitionId).toBe(true);}}});
 it('exclusive cards still have one region and Korakarom remains neutral',()=>{expect(fullCatalog['sword-kylast'].regions).toEqual(['north']);expect(fullCatalog.aranha.regions).toEqual(['west']);expect(eligible(createRun(1,'rubel'),'joia-rubra')).toBe(true);expect(eligible(createRun(1,'rubel'),'enhanced-defense')).toBe(false);expect(eligible(createRun(1,'abe'),'gwen')).toBe(false);});
});
