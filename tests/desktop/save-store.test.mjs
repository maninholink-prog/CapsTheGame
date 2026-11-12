import {mkdtemp,readFile,readdir,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {afterEach,expect,it} from 'vitest';
import {createSaveStore} from '../../desktop/save-store.cjs';

const dirs=[];
afterEach(async()=>{await Promise.all(dirs.splice(0).map(dir=>rm(dir,{recursive:true,force:true})));});
async function store(){const dir=await mkdtemp(path.join(tmpdir(),'caps-saves-'));dirs.push(dir);return {dir,store:createSaveStore(dir)};}
const id='4d131d2d-8d5d-4c2f-a1aa-a2200e86d739';
const save=(profileId=id,name='Colecionador')=>JSON.stringify({version:2,profileId,profile:{name,collection:{kylast:{count:2}}},run:null,session:null});

it('lists an empty dedicated Saves directory and round-trips profiles',async()=>{
 const {dir,store:s}=await store();
 expect(await s.list()).toEqual([]);
 await s.write(id,save());
 expect(await s.read(id)).toBe(save());
 await s.write(id,save(id,'Atualizado'));
 expect((await s.read(id))).toContain('Atualizado');
 expect(await s.list()).toEqual([{id,name:'Atualizado',hero:'kylast',valid:true}]);
 expect(await readdir(path.join(dir,'Saves'))).toEqual([`${id}.json`]);
});
it('rejects invalid IDs, mismatched profile IDs and malformed JSON without replacing a good file',async()=>{
 const {dir,store:s}=await store();await s.write(id,save());
 await expect(s.read('../escape')).rejects.toThrow();
 await expect(s.write(id,save('11111111-1111-4111-8111-111111111111'))).rejects.toThrow();
 await expect(s.write(id,'{')).rejects.toThrow();
 expect(await s.read(id)).toBe(save());
 await expect(readFile(path.join(dir,'escape.json'))).rejects.toThrow();
});
it('keeps corrupt files visible as invalid and leaves other profiles readable',async()=>{
 const {dir,store:s}=await store();const other='4d131d2d-8d5d-4c2f-a1aa-a2200e86d740';
 await s.write(id,save());await s.write(other,save(other,'Outro'));
 await import('node:fs/promises').then(({writeFile})=>writeFile(path.join(dir,'Saves',`${id}.json`),'broken'));
 expect(await s.read(id)).toBe('broken');
 expect(await s.list()).toEqual([{id,name:'Perfil corrompido',hero:'kylast',valid:false},{id:other,name:'Outro',hero:'kylast',valid:true}]);
});
