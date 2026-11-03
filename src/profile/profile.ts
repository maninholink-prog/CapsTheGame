import type {Champion,Rarity} from '../content/schema.js';
import {fullCatalog,createProtagonistDeck,protagonistIds} from '../content/decks.js';
export const rarities:Rarity[]=['common','rare','epic','legendary','ultradimensional'];
export const rarityNames:Record<Rarity,string>={common:'Comum',rare:'Raro',epic:'Épico',legendary:'Lendário',ultradimensional:'Ultradimensional'};
export const prices:Record<Rarity,number>={common:100,rare:250,epic:500,legendary:700,ultradimensional:1000};
export const duplicateValues:Record<Rarity,number>={common:5,rare:10,epic:20,legendary:50,ultradimensional:100};
export const collectibleIds=Object.keys(fullCatalog).filter(id=>fullCatalog[id].rarity&&!fullCatalog[id].championCopy);
export interface OwnedCard {count:number;shiny:boolean}
export interface OpeningCard {id:string;rolledShiny:boolean;shiny:boolean;excess:number;newCard:boolean}
export interface Opening {serial:number;type:Rarity;cards:OpeningCard[];time:number}
export interface LedgerEntry {id:number;currency:'stones'|'korakacoins';amount:number;balance:number;reason:string;time:number}
export interface Account {id:string;paidNodes:string[];seenBattles:string[];earned:number;settled:boolean;hero:Champion}
export interface Profile {relicCollection?:Record<string,{conquered:boolean}>;talents?:Partial<Record<Champion,import('./talents.js').TalentId[]>>;name:string;created:number;stones:number;collection:Record<string,OwnedCard>;boosters:Record<Rarity,number>;pity:number;championShiny:number;rng:number;serial:number;mastery:Record<Champion,{xp:number;rewarded:boolean}>;weekly:{key:number;points:number;claimed:number[]};ledger:LedgerEntry[];account:Account|null;lastOpening:Opening|null}
export const milestones:{points:number;type:Rarity;count:number}[]=[{points:50,type:'common',count:1},{points:150,type:'rare',count:1},{points:300,type:'epic',count:1},{points:450,type:'legendary',count:1},{points:600,type:'rare',count:2},{points:750,type:'epic',count:1},{points:900,type:'ultradimensional',count:1},{points:1050,type:'common',count:1},{points:1500,type:'ultradimensional',count:1}];
export function weekKey(now:number){return Math.floor((now-Date.UTC(1970,0,5,11))/(7*86400000));}
export function nextReset(now:number){return Date.UTC(1970,0,5,11)+(weekKey(now)+1)*7*86400000;}
export function syncWeek(p:Profile,now:number):void {const key=weekKey(now);if(p.weekly.key!==key)p.weekly={key,points:0,claimed:[]};}
export function ledger(p:Profile,amount:number,reason:string,time:number,currency:'stones'|'korakacoins'='stones',balance=p.stones){p.ledger.push({id:++p.serial,currency,amount,balance,reason,time});}
export function credit(p:Profile,amount:number,reason:string,time:number){if(!Number.isSafeInteger(amount)||p.stones+amount<0)throw Error('Saldo insuficiente.');p.stones+=amount;ledger(p,amount,reason,time);}
export function grantStarter(p:Profile,hero:Champion){for(const c of createProtagonistDeck(hero,'unlock')){if(c.definitionId===hero)continue;const old=p.collection[c.definitionId];p.collection[c.definitionId]={count:Math.max(2,old?.count??0),shiny:old?.shiny??false};}}
export function unlockPlaytestHeroes(profile:Profile):Profile {
 const p=structuredClone(profile);
 for(const hero of protagonistIds){const old=p.collection[hero];p.collection[hero]={count:Math.max(2,old?.count??0),shiny:old?.shiny??false};grantStarter(p,hero);}
 return p;
}
export function createProfile(name:string,hero:Champion,seed:number,now:number):Profile {if(!name.trim()||name.trim().length>40||!protagonistIds.includes(hero))throw Error('Escolha um nome e um protagonista.');const p:Profile={name:name.trim(),created:now,stones:0,collection:{[hero]:{count:2,shiny:false}},boosters:{common:0,rare:0,epic:0,legendary:0,ultradimensional:0},pity:0,championShiny:0,rng:seed>>>0,serial:0,mastery:Object.fromEntries(protagonistIds.map(id=>[id,{xp:0,rewarded:false}])) as Profile['mastery'],weekly:{key:weekKey(now),points:0,claimed:[]},ledger:[],account:null,lastOpening:null};grantStarter(p,hero);return p;}
export function grantCard(profile:Profile,id:string,shiny:boolean,now:number):Profile {if(!collectibleIds.includes(id))throw Error('Carta não colecionável.');const p=structuredClone(profile),old=p.collection[id]??{count:0,shiny:false};const rarity=fullCatalog[id].rarity!;if(old.count===3)credit(p,duplicateValues[rarity]*(shiny?2:1),`Excedente: ${fullCatalog[id].name}${shiny?' brilhante':''}`,now);p.collection[id]={count:Math.min(3,old.count+1),shiny:old.shiny||shiny};if(rarity==='ultradimensional'&&old.count===0)grantStarter(p,id as Champion);return p;}
export function masteryCost(level:number){return 25*Math.ceil((100+12*(level-1)+3*(level-1)**2)/25);}
export function masteryInfo(xp:number){let level=1,base=0;while(level<30&&xp>=base+masteryCost(level)){base+=masteryCost(level);level++;}return {level,points:Math.floor(level/2),progress:level===30?0:xp-base,next:level===30?0:masteryCost(level)};}
export function grantMastery(profile:Profile,hero:Champion,amount:number,now:number){const p=structuredClone(profile),m=p.mastery[hero];m.xp=Math.min(31250,m.xp+Math.max(0,Math.floor(amount)));if(m.xp===31250&&!m.rewarded){m.rewarded=true;if(p.collection[hero]?.shiny){p.boosters.ultradimensional++;ledger(p,0,`Maestria 30: booster Ultradimensional (${hero})`,now);}else {p.collection[hero]={count:p.collection[hero]?.count??1,shiny:true};ledger(p,0,`Maestria 30: ${hero} brilhante`,now);}}return p;}
export function claimWeekly(profile:Profile,points:number,now:number){const p=structuredClone(profile);syncWeek(p,now);const m=milestones.find(x=>x.points===points);if(!m||p.weekly.points<points||p.weekly.claimed.includes(points))throw Error('Marco indisponível.');p.weekly.claimed.push(points);p.boosters[m.type]+=m.count;ledger(p,0,`Marco semanal ${points}: ${m.count} booster ${rarityNames[m.type]}`,now);return p;}

