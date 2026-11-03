import {shuffle} from '../battle/random.js';
import {runCatalog,eligibleCardIds,eligible,addPair} from './run.js';
import {compatible,improvements} from './improvements.js';
import {markVisited} from './adventure-state.js';
import type {ImprovementId} from './improvements.js';
import type {RunState} from './run.js';
export interface ShopOffer {id:string;kind:'card'|'improvement'|'heal5'|'healAll'|'revive'|'remove';price:number;cardId?:string;improvement?:ImprovementId;bought:boolean;}
export interface ShopState {type:'standard'|'specialized';offers:ShopOffer[];}
export const cardPrices:Record<string,number>={common:40,rare:70,epic:110,legendary:160};
export function makeShop(r:RunState,nodeId:string):ShopState {
 const type=r.map?.nodes.find(n=>n.id===nodeId)?.event==='shop-specialized'?'specialized':'standard';let salt=0;for(const c of nodeId)salt=(Math.imul(salt,31)+c.charCodeAt(0))>>>0;
 let seed=(r.seed^salt)>>>0;const pick=<T>(items:T[])=>{const x=shuffle(items,seed);seed=x.state;return x.items;};
 const cards=pick(eligibleCardIds(r).filter(id=>type==='standard'||['epic','legendary'].includes(runCatalog[id].rarity??'common'))).slice(0,3);
 const offers:ShopOffer[]=cards.map(id=>({id:`card-${id}`,kind:'card',cardId:id,price:cardPrices[runCatalog[id].rarity??'common'],bought:false}));
 const candidates:{cardId:string;improvement:ImprovementId}[]=[];
 const pool=[...new Set([...r.deck.map(c=>c.definitionId),...eligibleCardIds(r)])];
 for(const cardId of pool)for(const improvement of Object.keys(improvements) as ImprovementId[]){const d=runCatalog[cardId];if((type==='standard'||improvements[improvement].tier!=='common')&&compatible(d,improvement,r.improvements[cardId]??[]))candidates.push({cardId,improvement});}
 for(const c of pick(candidates).slice(0,type==='standard'?2:3))offers.push({id:`improve-${c.cardId}-${c.improvement}`,kind:'improvement',...c,price:improvements[c.improvement].price+(r.deck.some(x=>x.definitionId===c.cardId)?0:cardPrices[runCatalog[c.cardId].rarity??'common']),bought:false});
 if(type==='standard')for(const [id,price] of [['heal5',40],['healAll',100],['revive',180],['remove',60]] as const)offers.push({id,kind:id,price,bought:false});
 return {type,offers};
}
export function openShop(r:RunState):RunState {if(r.stage!=='shop'||!r.map)throw Error('Loja indisponível.');const n=structuredClone(r);const id=n.map!.current!;if(!n.map!.nodes.find(x=>x.id===id)?.event?.startsWith('shop-'))throw Error('Esta casa não é uma loja.');n.shops[id]??=makeShop(n,id);return n;}
export function offerPrice(r:RunState,o:ShopOffer){return o.kind==='improvement'?improvements[o.improvement!].price+(r.deck.some(c=>c.definitionId===o.cardId)?0:cardPrices[runCatalog[o.cardId!].rarity??'common']):o.price;}
export function offerError(r:RunState,o:ShopOffer,targetId?:string):string {
 if(r.stage!=='shop')return 'Loja indisponível.';if(o.bought)return 'Oferta já comprada.';if(r.coins<offerPrice(r,o))return 'Korakacoins insuficientes.';
 if(o.kind==='card'&&!eligible(r,o.cardId!))return 'Carta já está no deck ou não é elegível.';
 if(o.kind==='improvement'&&!compatible(runCatalog[o.cardId!],o.improvement!,r.improvements[o.cardId!]??[]))return 'Limite de melhorias ou efeito já presente.';
 if(o.kind==='improvement'&&!r.deck.some(c=>c.definitionId===o.cardId)&&!eligible(r,o.cardId!))return 'Carta não elegível.';
 if((o.kind==='heal5'||o.kind==='healAll')&&r.nexus>=r.maxNexus)return 'Seu Vínculo já está com vida cheia.';
 if(o.kind==='revive'&&r.revives>=5)return 'Limite de cinco cargas.';
 if(o.kind==='remove'){const def=targetId&&runCatalog[targetId];if(!def||!r.deck.some(c=>c.definitionId===targetId))return 'Escolha uma carta do deck.';if(def.kind==='unit'&&def.champion)return 'Campeões do grupo não podem ser removidos.';if(r.deck.length-2<5)return 'O deck precisa permitir a mão inicial.';}
 return '';
}
export function buy(r:RunState,offerId:string,targetId?:string):RunState {
 const node=r.map?.current;const offer=node&&r.shops[node]?.offers.find(o=>o.id===offerId);if(!offer)throw Error('Oferta indisponível.');const error=offerError(r,offer,targetId);if(error)throw Error(error);const n=structuredClone(r);const o=n.shops[node!].offers.find(x=>x.id===offerId)!;
 const price=offerPrice(n,o);n.coins-=price;n.coinsSpent+=price;
 if(o.kind==='card')addPair(n,o.cardId!);
 if(o.kind==='improvement'){if(!n.deck.some(c=>c.definitionId===o.cardId))addPair(n,o.cardId!);(n.improvements[o.cardId!]??=[]).push(o.improvement!);}
 if(o.kind==='heal5')n.nexus=Math.min(n.maxNexus,n.nexus+5);
 if(o.kind==='healAll')n.nexus=n.maxNexus;
 if(o.kind==='revive')n.revives++;
 if(o.kind==='remove'){n.deck=n.deck.filter(c=>c.definitionId!==targetId);delete n.improvements[targetId!];}
 if(o.kind!=='heal5'&&o.kind!=='remove')o.bought=true;return n;
}
export function leaveShop(r:RunState):RunState {if(r.stage!=='shop')throw Error('Loja indisponível.');const n=structuredClone(r);markVisited(n);n.stage='map';return n;}
