import {expect,it} from 'vitest';
import {renderProfileManagement} from '../../src/ui/profile-view.js';

const first={id:'4d131d2d-8d5d-4c2f-a1aa-a2200e86d739',name:'Colecionador & amiga',hero:'kylast' as const,valid:true};
const second={id:'4d131d2d-8d5d-4c2f-a1aa-a2200e86d740',name:'Perfil corrompido',hero:'abe' as const,valid:false};

it('shows the active profile and keeps invalid profiles visible but unavailable',()=>{
 const html=renderProfileManagement([first,second],first.id);
 expect(html).toContain('aria-label="Escolher perfil"');
 expect(html).toContain('aria-current="true"');
 expect(html).toContain('Colecionador &amp; amiga');
 expect(html).toContain('data-action="profile-add"');
 expect(html).toContain('data-action="profile-switch"');
 expect(html).toContain('data-id="'+second.id+'" aria-current="false" disabled');
});
