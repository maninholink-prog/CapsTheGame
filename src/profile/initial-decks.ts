import type {Champion} from '../content/schema.js';
import {fullCatalog,createProtagonistDeck,protagonistIds} from '../content/decks.js';
import {startingPackages} from '../content/deck-packages.js';
import {collectibleIds,masteryInfo} from './profile.js';
import type {Profile} from './profile.js';

export function initialDeckCore(hero:Champion):string[]{return startingPackages[hero].flatMap(id=>[id,id]);}
export function initialDeckIds(profile:Profile,hero:Champion):string[]{return profile.initialDecks?.[hero]??createProtagonistDeck(hero,'initial').map(c=>c.definitionId);}
export function editableInitialDeckCards(profile:Profile,hero:Champion):string[]{
 if(!protagonistIds.includes(hero)||masteryInfo(profile.mastery[hero].xp).level<15||!profile.collection[hero]?.count)return [];
 const regions=fullCatalog[hero].regions??[];
 return collectibleIds.filter(id=>{
  const card=fullCatalog[id];
  return !!profile.collection[id]?.count&&(!card.exclusiveChampion||card.exclusiveChampion===hero)&&!!card.regions?.some(region=>region==='korakarom'||regions.includes(region));
 });
}
export function validateInitialDeck(profile:Profile,hero:Champion,ids:readonly string[]):void{
 if(!editableInitialDeckCards(profile,hero).length)throw Error('A edição do deck exige protagonista desbloqueado e maestria 15.');
 const size=createProtagonistDeck(hero,'validate').length,core=initialDeckCore(hero),counts=new Map<string,number>();
 if(ids.length!==size)throw Error('O deck precisa manter o tamanho inicial deste protagonista.');
 for(const id of ids)counts.set(id,(counts.get(id)??0)+1);
 if(core.some(id=>counts.get(id)!==2))throw Error('O pacote característico de seis cartas não pode ser alterado.');
 if([...counts.values()].some(count=>count>2))throw Error('O deck permite no máximo duas cópias por carta.');
 for(const [id,count] of counts){
  if(!collectibleIds.includes(id))throw Error('A carta não está disponível para o deck.');
  if(core.includes(id))continue;
  if((profile.collection[id]?.count??0)<count)throw Error('O deck excede as cópias da coleção.');
  const card=fullCatalog[id],regions=fullCatalog[hero].regions??[];
  if(card.exclusiveChampion&&card.exclusiveChampion!==hero)throw Error('Esta carta é exclusiva de outro protagonista.');
  if(!card.regions?.some(region=>region==='korakarom'||regions.includes(region)))throw Error('A carta não pertence a uma região permitida.');
 }
}
export function addInitialDeckCard(profile:Profile,hero:Champion,ids:readonly string[],id:string):string[]{
 if(!editableInitialDeckCards(profile,hero).includes(id))throw Error('A carta precisa estar na coleção e respeitar as regiões.');
 if(ids.length>=createProtagonistDeck(hero,'validate').length)throw Error('O deck já está completo.');
 if(ids.filter(card=>card===id).length>=Math.min(2,profile.collection[id]?.count??0))throw Error('Não há cópias disponíveis para adicionar.');
 return [...ids,id];
}
export function removeInitialDeckCard(hero:Champion,ids:readonly string[],id:string):string[]{
 if(initialDeckCore(hero).includes(id))throw Error('O pacote característico de seis cartas é fixo.');
 const index=ids.lastIndexOf(id);if(index<0)throw Error('A carta não está no deck.');
 return ids.filter((_,i)=>i!==index);
}
export function saveInitialDeck(profile:Profile,hero:Champion,ids:string[]):Profile{
 validateInitialDeck(profile,hero,ids);
 return {...profile,initialDecks:{...profile.initialDecks,[hero]:[...ids]}};
}
