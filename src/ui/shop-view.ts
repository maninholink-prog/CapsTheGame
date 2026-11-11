import {art,esc,icon,korakoinIcon} from './html.js';
import {runCatalog} from '../run/run.js';
import {improvements,improveDefinition} from '../run/improvements.js';
import {offerPrice,offerError,type ShopOffer} from '../run/shops.js';
import type {RunState} from '../run/run.js';
export function renderShop(r:RunState,deck='',error=''){const s=r.shops[r.map!.current!];const removable=[...new Set(r.deck.map(c=>c.definitionId))].filter(id=>{const d=runCatalog[id];return d.kind!=='unit'||!d.champion;});

 const renderOffers=(offers:ShopOffer[])=>offers.map(o=>{const d=o.cardId?improveDefinition(runCatalog[o.cardId],r.improvements[o.cardId]??[]):null;const label=o.kind==='card'?`${d?.name} · duas cópias`:o.kind==='improvement'?`${d?.name} · ${improvements[o.improvement!].name}`:o.kind==='heal5'?'Curar 5 de vida':o.kind==='healAll'?'Curar toda a vida':o.kind==='revive'?'Uma carga de reviver':'Remover duas cópias';const error=offerError(r,o,o.kind==='remove'?removable[0]:undefined);const price=offerPrice(r,o);return `<article class="shop-offer ${o.bought?'purchased':''}"><div class="shop-offer-art">${o.cardId?art(o.cardId,true):icon(o.kind==='revive'?'shield':o.kind==='remove'?'book':'diamond')}</div><div class="shop-offer-copy"><h3>${esc(label)}</h3>${d?`<p>${d.cost} mana${d.kind==='unit'?` · ${d.attack}/${d.health}`:''}</p>`:''}${o.kind==='improvement'?`<p>${r.deck.some(c=>c.definitionId===o.cardId)?'Melhora o par existente':'Adiciona um novo par já melhorado'} · ${(r.improvements[o.cardId!]??[]).length}/3 melhorias atuais</p>`:''}${o.kind==='remove'?`<label class="field"><span>Carta a remover</span><select id="remove-card" aria-label="Carta a remover">${removable.map(id=>`<option value="${esc(id)}">${esc(runCatalog[id].name??id)}</option>`).join('')}</select></label>`:''}<strong>${price} Korakacoins</strong><button class="button primary" data-action="shop-buy" data-id="${esc(o.id)}" ${error?'disabled':''}>${o.bought?'Comprado':'Comprar'}</button>${error?`<p class="muted">${esc(error)}</p>`:''}${o.kind==='heal5'||o.kind==='remove'?'<small>Serviço repetível</small>':''}</div></article>`;}).join('');
 const cards=s.offers.filter(o=>o.kind==='card'||o.kind==='improvement');
 const services=s.offers.filter(o=>o.kind!=='card'&&o.kind!=='improvement');
 return `<main class="expedition-shop">
  <header class="shop-heading"><div><p class="eyebrow">PARADA DA AVENTURA</p><h1>Loja ${s.type==='standard'?'padrão':'especializada'}</h1></div>
  <div class="shop-wallet"><strong>${korakoinIcon()} ${r.coins} Korakacoins</strong><small>Vínculo ${r.nexus}/${r.maxNexus} · Reviver ${r.revives}/5</small></div></header>
  <div class="shop-scroll">
   ${error?`<p role="alert" class="shop-error">${esc(error)}</p>`:''}
   <section aria-label="Cartas e melhorias"><h2>Cartas e melhorias</h2><p>Cartas entram em pares. Cada identidade aceita até três melhorias.</p>
   <div class="shop-grid">${renderOffers(cards)}</div>
   ${s.type==='specialized'&&!cards.some(o=>o.kind==='card')?'<p>Não há novas cartas Épicas ou Lendárias elegíveis nesta loja.</p>':''}</section>
   ${services.length?`<section aria-label="Serviços"><h2>Serviços</h2><div class="shop-grid">${renderOffers(services)}</div></section>`:''}
  </div>
  <footer class="shop-footer"><button class="button secondary" data-action="run-exit">Pausar aventura</button>${deck}<button class="button primary" data-action="shop-leave">Sair da loja e seguir →</button></footer>
 </main>`;
}
