import {decodeSave,encodeSave,saveKey} from './storage.js';
import type {SavedGame} from './storage.js';
import {protagonistIds} from '../content/decks.js';
import type {Champion} from '../content/schema.js';

export const activeProfileKey='caps.active-profile.v1';
export type SaveSummary={id:string;name:string;hero:Champion;valid:boolean};
export type SaveStore={list():Promise<SaveSummary[]>;read(id:string):Promise<string|null>;write(id:string,raw:string):Promise<void>};
const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const browserKey=(id:string)=>`caps.profile.v2.${id}`;
function summary(id:string,raw:string|null):SaveSummary {
 try{if(!raw)throw Error();const saved=decodeSave(raw);if(saved.profileId!==id)throw Error();const hero=protagonistIds.find(candidate=>saved.profile.collection[candidate]?.count)??'kylast';return {id,name:saved.profile.name,hero,valid:true};}
 catch{return {id,name:'Perfil corrompido',hero:'kylast',valid:false};}
}
export function createBrowserSaveStore(storage:Storage):SaveStore {
 return {
  async list(){const ids:string[]=[];for(let i=0;i<storage.length;i++){const key=storage.key(i);if(key?.startsWith('caps.profile.v2.')&&uuid.test(key.slice(16)))ids.push(key.slice(16));}return ids.sort().map(id=>summary(id,storage.getItem(browserKey(id))));},
  async read(id){if(!uuid.test(id))throw Error('ID de perfil inválido.');return storage.getItem(browserKey(id.toLowerCase()));},
  async write(id,raw){if(!uuid.test(id))throw Error('ID de perfil inválido.');id=id.toLowerCase();const saved=decodeSave(raw);if(saved.profileId!==id)throw Error('Save não corresponde ao perfil.');storage.setItem(browserKey(id),raw);}
 };
}
export function createProfileId(){return crypto.randomUUID();}
async function listProfiles(store:SaveStore):Promise<SaveSummary[]> {
 return Promise.all((await store.list()).map(async item=>{
  if(!item.valid)return item;
  try{const raw=await store.read(item.id);if(!raw)throw Error();const saved=decodeSave(raw);if(saved.profileId!==item.id)throw Error();const hero=protagonistIds.find(candidate=>saved.profile.collection[candidate]?.count)??'kylast';return {id:item.id,name:saved.profile.name,hero,valid:true};}
  catch{return {...item,name:'Perfil corrompido',valid:false};}
 }));
}
export async function loadProfiles(store:SaveStore,storage:Pick<Storage,'getItem'|'setItem'>):Promise<{activeId:string|null;profiles:SaveSummary[];saved:SavedGame|null;raw:string}> {
 let profiles=await listProfiles(store);
 if(!profiles.length){
  const legacy=storage.getItem(saveKey);
  if(legacy){const old=decodeSave(legacy),id=createProfileId(),raw=encodeSave({...old,profileId:id});await store.write(id,raw);const verify=await store.read(id);if(verify!==raw||decodeSave(verify??'').profileId!==id)throw Error('Não foi possível confirmar a migração do perfil. O save original foi preservado.');storage.setItem(activeProfileKey,id);profiles=await listProfiles(store);}
 }
 if(!profiles.length)return {activeId:null,profiles,saved:null,raw:''};
 const requested=storage.getItem(activeProfileKey),selected=requested?profiles.find(item=>item.id===requested):undefined;
 if(selected&&!selected.valid)throw Error('O perfil ativo está corrompido. O arquivo original foi preservado.');
 const choice=selected??profiles.find(item=>item.valid);
 if(!choice)throw Error('Nenhum perfil salvo pode ser carregado. Os arquivos foram preservados.');
 const raw=await store.read(choice.id);if(!raw)throw Error('O arquivo do perfil ativo não foi encontrado.');
 const saved=decodeSave(raw);if(saved.profileId!==choice.id)throw Error('O arquivo do perfil não corresponde ao seu identificador.');
 storage.setItem(activeProfileKey,choice.id);
 return {activeId:choice.id,profiles,saved,raw};
}
