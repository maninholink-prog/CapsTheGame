import {it,expect} from 'vitest';
import {createRun,runBattle,finishBattle,recruit} from '../../src/run/run.js';
import {renderRun} from '../../src/ui/run-view.js';
import {render} from '../../src/ui/render.js';
import {freshDraft} from '../../src/ui/forms.js';
import {sessionFromBattle} from '../../src/ui/session.js';
it('run offers only three real allies, full packages, then next battle',()=>{let r=createRun(3);const b=runBattle(r);b.phase='ended';b.winner='p1';r=finishBattle(r,b);const html=renderRun(r);expect(r.allies).toHaveLength(3);for(const id of r.allies)expect(html).toContain(`data-id="${id}"`);expect(html).toContain('26 cartas');r=recruit(r,r.allies[0]);expect(renderRun(r)).toContain('Próxima batalha');});
it('only own fabrication choices rendered and champion duplicate is a spell',()=>{const r=createRun(3);const b=runBattle(r);b.phase='actions';b.priorityOwner='p2';b.choices=[{owner:'p2',options:['upgrade-double','upgrade-quick','upgrade-elusive']}];const html=render(sessionFromBattle(b,3),freshDraft());expect(html).not.toContain('data-action="upgrade-choice"');b.choices=[{owner:'p1',options:['upgrade-double','upgrade-quick','upgrade-elusive']}];expect(render(sessionFromBattle(b,3),freshDraft())).toContain('Escolha um Upgrade');});

import {visibleEffects} from '../../src/ui/presentation.js';
import {descriptions} from '../../src/ui/presentation.js';
it('Kylast recruitment shows all three descriptions and identifies his sword as equipment',()=>{
 const r=createRun(3,'abe');r.stage='recruit';r.allies=['kylast'];const html=renderRun(r);
 for(const id of ['kylast','sword-kylast','joia-rubra'])expect(html).toContain(descriptions[id]);
 expect(html).toContain('1 MANA · EQUIPAMENTO');
});
it('stack exposes actual champion spell for inspection',()=>{const b=runBattle(createRun(1));b.stack=[{id:1,owner:'p1',source:{instanceId:'hero',definitionId:'arcata'},spellId:'fireball',targets:[]}];expect(visibleEffects(b)[0]).toMatchObject({definitionId:'fireball',title:'Bola de Fogo'});});


