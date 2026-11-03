import {it,expect} from 'vitest';
import {render} from '../../src/ui/render.js';
import {createSession} from '../../src/ui/session.js';
import {freshDraft} from '../../src/ui/forms.js';
it('collection shiny decorates every own copy without changing battle values',()=>{const s=createSession(1,'manual');s.state.players.p1.hand=[{definitionId:'kylast',instanceId:'a'},{definitionId:'kylast',instanceId:'b'}];s.state.players.p2.hand=[{definitionId:'kylast',instanceId:'c'}];const before=structuredClone(s);const html=render(s,freshDraft(),new Set(['kylast']));expect(html.match(/data-action="hand-card"[^>]*brilhante/g)).toHaveLength(2);expect(s).toEqual(before);expect(render({...s,viewPlayer:'p2'},freshDraft(),new Set(['kylast']))).not.toContain('cópia brilhante');});
