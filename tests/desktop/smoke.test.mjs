import {expect,it} from 'vitest';
import {resolveSmokeUserData,waitForSmokeText} from '../../desktop/smoke.cjs';

it('waits for the first app screen before reporting smoke text',async()=>{
 let reads=0;
 const text=await waitForSmokeText(async()=>++reads<3?'':'Sua coleção começa aqui.');
 expect(reads).toBe(3);
 expect(text).toContain('Sua coleção começa aqui.');
});
it('uses the disposable userData override only for smoke mode',()=>{
 expect(resolveSmokeUserData('C:\\appData',true,'C:\\qa\\CAPS-Game')).toBe('C:\\qa\\CAPS-Game');
 expect(resolveSmokeUserData('C:\\appData',false,'C:\\qa\\CAPS-Game')).toBe('C:\\appData\\CAPS-Game');
});
