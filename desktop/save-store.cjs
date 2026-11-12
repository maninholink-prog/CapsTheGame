const fs=require('node:fs/promises');
const path=require('node:path');
const {randomUUID}=require('node:crypto');

const uuid=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
const heroes=['kylast','abe','arcata','rubel','youro','kuara','thalion','lazaro'];
function safeId(id){if(typeof id!=='string'||!uuid.test(id))throw Error('ID de perfil inválido.');return id.toLowerCase();}
function summary(id,raw){
 try{const data=JSON.parse(raw),profile=data?.profile;
  const hero=heroes.find(candidate=>profile?.collection?.[candidate]?.count)||'kylast';
  if(data.version!==2||!profile||typeof profile.name!=='string'||!profile.name.trim()||data.profileId!==id||!Object.hasOwn(data,'run')||!Object.hasOwn(data,'session')||!(data.run===null||typeof data.run==='object')||!(data.session===null||typeof data.session==='object'))return {id,name:'Perfil corrompido',hero,valid:false};
  return {id,name:profile.name,hero,valid:true};
 }catch{return {id,name:'Perfil corrompido',hero:'kylast',valid:false};}
}
function createSaveStore(userDataPath){
 const directory=path.join(userDataPath,'Saves');
 const file=id=>path.join(directory,`${safeId(id)}.json`);
 return {
  async list(){
   let names;try{names=await fs.readdir(directory);}catch(error){if(error.code==='ENOENT')return [];throw error;}
   const ids=names.filter(name=>name.endsWith('.json')&&uuid.test(name.slice(0,-5))).map(name=>name.slice(0,-5).toLowerCase()).sort();
   return Promise.all(ids.map(async id=>summary(id,await fs.readFile(file(id),'utf8'))));
  },
  async read(id){try{return await fs.readFile(file(id),'utf8');}catch(error){if(error.code==='ENOENT')return null;throw error;}},
  async write(id,raw){
   id=safeId(id);
   let data;try{data=JSON.parse(raw);}catch{throw Error('Save JSON inválido.');}
   if(!data||typeof data!=='object'||data.version!==2||data.profileId!==id||!data.profile||typeof data.profile.name!=='string'||!Object.hasOwn(data,'run')||!Object.hasOwn(data,'session'))throw Error('Save não corresponde ao perfil.');
   await fs.mkdir(directory,{recursive:true});
   const target=file(id),temporary=`${target}.${randomUUID()}.tmp`;
   try{await fs.writeFile(temporary,raw,{encoding:'utf8',flag:'wx'});await fs.rename(temporary,target);}
   catch(error){await fs.rm(temporary,{force:true}).catch(()=>{});throw error;}
  }
 };
}
module.exports={createSaveStore};
