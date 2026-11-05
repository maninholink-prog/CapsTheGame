import {expect,it} from 'vitest';
import {encounterNames} from '../../src/battle/encounters.js';
import {createMapRun,enterNode} from '../../src/run/adventure.js';
import {runBattle} from '../../src/run/run.js';
import {renderBattleIntro} from '../../src/ui/battle-screen.js';
import {renderRun} from '../../src/ui/run-view.js';
import {renderMap,renderEncounterPreview} from '../../src/ui/map-view.js';
import {sessionFromBattle} from '../../src/ui/session.js';

it('previews the actual encounter without entering the node or advancing its seed',()=>{
 const run=createMapRun(42,'kylast');
 const original=structuredClone(run);
 const preview=renderEncounterPreview(run,'start');
 expect(preview).toContain(encounterNames[run.encounters!.start]);
 expect(preview).toContain('data-action="run-fight" data-id="start"');
 expect(preview).toContain('Voltar ao mapa');
 expect(renderEncounterPreview(run,'final')).toBe('');
 expect(run).toEqual(original);
 const entered=enterNode(run,'start');
 const battle=runBattle(entered);
 expect(preview).toContain('<dd>'+battle.players.p2.nexus+'</dd>');
 expect(renderBattleIntro(sessionFromBattle(battle,entered.battleSeed),false)).toContain(encounterNames[run.encounters!.start]);
 expect(renderEncounterPreview(entered,'start')).toBe('');
});

it('shows the final boss rule only when its node is available',()=>{
 const run=createMapRun(42);
 const predecessor=run.map!.nodes.find(node=>node.next.includes('final'))!;
 run.map!.current=predecessor.id;
 run.map!.visited=[predecessor.id];
 expect(renderEncounterPreview(run,'final')).toContain('Duas fases');
});

it('marks the first node on entry and the resumed position with its available paths',()=>{
 const run=createMapRun(42,'kylast');
 expect(renderMap(run)).toMatch(/data-id="start"[^>]*aria-current="location"/);
 expect(renderMap(run)).not.toContain('open-route');
 run.map!.current='start';
 run.map!.visited=['start'];
 const resumed=renderRun(run);
 expect(resumed).toContain('class="expedition-map"');
 expect(resumed).toContain('class="open-route"');
 expect(resumed).toContain('Ver deck da run');
 expect(resumed.match(/Voltar ao início/g)).toHaveLength(1);
});
