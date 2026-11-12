import {afterEach,describe,expect,it,vi} from 'vitest';
import {createProfile,credit} from '../../src/profile/profile.js';
import {startAccount} from '../../src/profile/rewards.js';
import {createMapRun,enterNode} from '../../src/run/adventure.js';
import {runBattle} from '../../src/run/run.js';
import {sessionFromBattle} from '../../src/ui/session.js';
import {decodeSave,encodeSave,saveKey} from '../../src/profile/storage.js';
import {activeProfileKey,createBrowserSaveStore,loadProfiles} from '../../src/profile/save-store.js';

class MemoryStorage implements Storage {
 private values=new Map<string,string>();
 get length(){return this.values.size;}
 clear(){this.values.clear();}
 getItem(key:string){return this.values.get(key)??null;}
 key(index:number){return [...this.values.keys()][index]??null;}
 removeItem(key:string){this.values.delete(key);}
 setItem(key:string,value:string){this.values.set(key,String(value));}
}
const id1='4d131d2d-8d5d-4c2f-a1aa-a2200e86d739';
const id2='4d131d2d-8d5d-4c2f-a1aa-a2200e86d740';
const saved=(name:string)=>({profile:createProfile(name,'kylast',1,0),run:null,session:null});

describe('profile save storage',()=>{
 afterEach(()=>vi.restoreAllMocks());
 it('stores and lists browser profiles under UUID-specific keys',async()=>{
  const storage=new MemoryStorage(),store=createBrowserSaveStore(storage);
  await store.write(id1,encodeSave({...saved('Um'),profileId:id1}));
  await store.write(id2,encodeSave({...saved('Dois'),profileId:id2}));
  expect(await store.list()).toEqual([
   {id:id1,name:'Um',hero:'kylast',valid:true},
   {id:id2,name:'Dois',hero:'kylast',valid:true},
  ]);
  expect(storage.getItem(`caps.profile.v2.${id1}`)).toContain('"profileId":"'+id1+'"');
 });
 it('loads the last active profile without mixing its run or progress',async()=>{
  const storage=new MemoryStorage(),store=createBrowserSaveStore(storage);
  await store.write(id1,encodeSave({...saved('Um'),profileId:id1}));
  await store.write(id2,encodeSave({...saved('Dois'),profileId:id2}));
  storage.setItem(activeProfileKey,id2);
  const loaded=await loadProfiles(store,storage);
  expect(loaded.activeId).toBe(id2);
  expect(loaded.saved?.profile.name).toBe('Dois');
 });
 it('keeps wallet, collection, active run and battle session isolated between profiles',async()=>{
  const storage=new MemoryStorage(),store=createBrowserSaveStore(storage),run=enterNode(createMapRun(51,'abe'),'start'),journey=startAccount(createProfile('Jornada','abe',51,0),run,'run-save'),session=sessionFromBattle(runBattle(run),run.battleSeed),other=createProfile('Coleção','kylast',52,0);credit(other,25,'seed',0);
  await store.write(id1,encodeSave({profileId:id1,profile:journey,run,session}));
  await store.write(id2,encodeSave({profileId:id2,profile:other,run:null,session:null}));
  storage.setItem(activeProfileKey,id1);
  const loaded=await loadProfiles(store,storage);
  expect(loaded.profiles).toHaveLength(2);
  expect(loaded.saved).toEqual({profileId:id1,profile:journey,run,session});
  storage.setItem(activeProfileKey,id2);
  const switched=await loadProfiles(store,storage);
  expect(switched.saved).toEqual({profileId:id2,profile:other,run:null,session:null});
 });
 it('migrates a v1 save once and preserves the original key',async()=>{
  const storage=new MemoryStorage(),store=createBrowserSaveStore(storage),legacy=encodeSave(saved('Legado'));
  storage.setItem(saveKey,legacy);
  const first=await loadProfiles(store,storage),second=await loadProfiles(store,storage);
  expect(first.activeId).toMatch(/^[0-9a-f-]{36}$/i);
  expect(first.saved?.profile.name).toBe('Legado');
  expect(second.profiles).toHaveLength(1);
  expect(storage.getItem(saveKey)).toBe(legacy);
  expect(storage.getItem(activeProfileKey)).toBe(first.activeId);
  expect(decodeSave(first.raw).profile.name).toBe('Legado');
 });
 it('keeps the legacy key intact and refuses to create an empty profile when migration write fails',async()=>{
  const storage=new MemoryStorage(),store=createBrowserSaveStore(storage),legacy=encodeSave(saved('Legado'));
  storage.setItem(saveKey,legacy);
  vi.spyOn(store,'write').mockRejectedValue(new Error('disk full'));
  await expect(loadProfiles(store,storage)).rejects.toThrow();
  expect(storage.getItem(saveKey)).toBe(legacy);
  expect(storage.getItem(activeProfileKey)).toBeNull();
 });
 it('rejects a v2 save whose profile ID does not match its filename',async()=>{
  const storage=new MemoryStorage(),store=createBrowserSaveStore(storage);
  await expect(store.write(id1,encodeSave({...saved('Inválido'),profileId:id2}))).rejects.toThrow();
 });
 it('marks a malformed native profile unavailable while preserving a different valid profile',async()=>{
  const storage=new MemoryStorage(),raw=encodeSave({...saved('Certo'),profileId:id1});
  storage.setItem(activeProfileKey,id1);
  const store={
   list:async()=>[{id:id1,name:'Certo',hero:'kylast' as const,valid:true},{id:id2,name:'Danificado',hero:'abe' as const,valid:true}],
   read:async(id:string)=>id===id1?raw:'{"version":2,"profileId":"'+id2+'","profile":{}',
   write:async()=>{}
  };
  const loaded=await loadProfiles(store,storage);
  expect(loaded.activeId).toBe(id1);
  expect(loaded.profiles[1]).toMatchObject({id:id2,name:'Perfil corrompido',valid:false});
 });
});
