import {expect,it} from 'vitest';
import {createSession,concedeSession} from '../../src/ui/session.js';

it('concedes to the other side without mutating the battle',()=>{
 const session=createSession(42,'manual');
 const conceded=concedeSession(session,'p1');
 expect(conceded.state.phase).toBe('ended');
 expect(conceded.state.winner).toBe('p2');
 expect(conceded.state.priorityOwner).toBeNull();
 expect(conceded.history.at(-1)?.message).toContain('desistiu');
 expect(session.state.phase).toBe('opening');
});
