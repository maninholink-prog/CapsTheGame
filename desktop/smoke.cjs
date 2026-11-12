const path=require('node:path');

function resolveSmokeUserData(appData,smoke,override){
 return smoke&&override?path.resolve(override):path.join(appData,'CAPS-Game');
}

async function waitForSmokeText(readText,timeoutMs=10000){
 const deadline=Date.now()+timeoutMs;
 let text='';
 do{
  text=await readText();
  if(text.includes('Sua coleção começa aqui.')||text.includes('SEU PRÓXIMO CAPÍTULO'))return text;
  await new Promise(resolve=>setTimeout(resolve,50));
 }while(Date.now()<deadline);
 return text;
}

module.exports={resolveSmokeUserData,waitForSmokeText};
