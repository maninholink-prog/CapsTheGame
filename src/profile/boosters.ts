import type {Rarity,Champion} from '../content/schema.js';
import {fullCatalog,protagonistIds} from '../content/decks.js';
import {nextInt} from '../battle/random.js';
import {collectibleIds,prices,rarityNames,credit,ledger,grantCard,duplicateValues} from './profile.js';
import type {Profile,OpeningCard} from './profile.js';
export const championChances:Record<Rarity,number>={common:.0045,rare:.025,epic:.05,legendary:.1,ultradimensional:1};
export const rarityWeights:Record<Rarity,number[]>={common:[80,17,2.5,.5],rare:[55,35,8,2],epic:[25,40,28,7],legendary:[10,25,45,20],ultradimensional:[5,15,45,35]};
export const shinyChances:Record<Rarity,number[]>={common:[3,2,1,.5,.25],rare:[5,3.5,2,1,.5],epic:[8,6,4,2,1],legendary:[12,9,6,4,2],ultradimensional:[20,15,10,7,5]};
function roll(p:Profile){const r=nextInt(p.rng,0,0xffffffff);p.rng=r.state;return r.value/0x100000000;}
export function cardWeight(p:Profile,id:string){return p.collection[id]?.count===3?.25:1;}
function pick(p:Profile,ids:string[]){if(!ids.length)throw Error('Nenhuma carta disponível nesta raridade.');const total=ids.reduce((s,id)=>s+cardWeight(p,id),0);let r=roll(p)*total;for(const id of ids){r-=cardWeight(p,id);if(r<0)return id;}return ids[ids.length-1];}
export function buyBooster(profile:Profile,type:Rarity,now:number):Profile {if(!(type in prices))throw Error('Booster inválido.');const p=structuredClone(profile);credit(p,-prices[type],`Compra de booster ${rarityNames[type]}`,now);p.boosters[type]++;return p;}
export function openBooster(profile:Profile,type:Rarity,now:number):Profile {
 if(!profile.boosters[type])throw Error('Você não possui este booster.');
 let p=structuredClone(profile);p.boosters[type]--;p.pity++;
 const guaranteed=p.pity>=40,missing=protagonistIds.filter(id=>!p.collection[id]?.count),champion=guaranteed||roll(p)<championChances[type];
 let champions=champion?1:0;
 if(champion&&type!=='ultradimensional')while(champions<5&&roll(p)<championChances[type]/3**champions)champions++;
 const cards:OpeningCard[]=[];
 for(let i=0;i<5;i++){
  let id:string;
  if(i<champions)id=pick(p,guaranteed&&i===0&&missing.length?missing:protagonistIds);
  else {let r=roll(p)*100,index=0;const weights=rarityWeights[type];while(index<3&&r>=weights[index])r-=weights[index++];const rarity=(['common','rare','epic','legendary'] as Rarity[])[index];id=pick(p,collectibleIds.filter(x=>fullCatalog[x].rarity===rarity));}
  const rarity=fullCatalog[id].rarity!,isChampion=rarity==='ultradimensional',index=['common','rare','epic','legendary','ultradimensional'].indexOf(rarity);
  const rolledShiny=(isChampion&&p.championShiny>=5)||roll(p)<shinyChances[type][index]/100;
  const old=p.collection[id],newCard=!old?.count,excess=old?.count===3?duplicateValues[rarity]*(rolledShiny?2:1):0;
  if(isChampion){p.championShiny=rolledShiny?0:p.championShiny+1;if(newCard||missing.length===0)p.pity=0;}
  p=grantCard(p,id,rolledShiny,now);
  cards.push({id,rolledShiny,shiny:p.collection[id].shiny,excess,newCard});
 }
 p.lastOpening={serial:++p.serial,type,cards,time:now};ledger(p,0,`Abertura de booster ${rarityNames[type]}`,now);return p;
}
