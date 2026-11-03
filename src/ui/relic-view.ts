import {relicCatalog,relicIds} from '../content/relics.js';
import {playableRelicIds} from '../run/relics.js';
import type {Profile} from '../profile/profile.js';
import type {RunState} from '../run/run.js';
import {esc} from './html.js';
const rarityNames={common:'Comum',rare:'Rara',legendary:'Lendária'};
export function relicInitialSelector(p:Profile){
 const owned=playableRelicIds.filter(id=>p.relicCollection?.[id]?.conquered);
 return `<label>Relíquia inicial <select id="run-relic"><option value="">Começar sem relíquia</option>${owned.map(id=>`<option value="${id}">${esc(relicCatalog[id].name)}</option>`).join('')}</select></label><p class="muted">Escolha até uma relíquia conquistada. ${owned.length?'As obtidas durante a run ficam ativas junto dela.':'Conquiste sua primeira ao vencer uma run com ela ativa.'}</p>`;
}
export function renderRelicCollection(p:Profile){
 const ordered=[...playableRelicIds,...relicIds.filter(id=>!playableRelicIds.includes(id))];
 return `<main class="hub-main"><p class="eyebrow">ARTEFATOS DA CAMPANHA</p><h1>Relíquias</h1><p>Passivos fora do deck, compartilhados entre protagonistas. ${playableRelicIds.length} das ${relicIds.length} relíquias estão jogáveis neste lote. O restante aguarda implementação dos efeitos.</p><p>O chefe intermediário oferece uma escolha. Vitória conquista permanentemente as relíquias ainda ativas; derrota mantém apenas a descoberta das novas.</p><div class="collection-grid">${ordered.map(id=>{
  const d=relicCatalog[id],record=p.relicCollection?.[id],ready=playableRelicIds.includes(id);
  return `<article class="collection-card rarity-${d.rarity}"><small>${rarityNames[d.rarity]} · ${esc(d.godSource)}</small>${d.art?`<img class="relic-art" src="${esc(d.art)}" alt="${esc(d.name)}" loading="lazy"/>`:''}<h3>${esc(d.name)}</h3><strong>${!ready?'Em preparação':record?.conquered?'Conquistada · disponível no início':record?'Descoberta · ainda não conquistada':'Não descoberta'}</strong>${!d.legacyName?'<p class="muted">Associação ao nome oficial e à arte pendente.</p>':''}${record?`<p>${esc(d.effect)}</p>`:'<p>Descubra este artefato durante suas aventuras.</p>'}</article>`;
 }).join('')}</div></main>`;
}
export function renderRelicOffer(r:RunState){return `<p>Escolha uma relíquia para ativar imediatamente. Ela será conquistada na coleção se você concluir esta run com ela ativa.</p><div class="recruit-grid">${(r.relicRun?.offers??[]).map(id=>{const d=relicCatalog[id];return `<article class="recruit-option rarity-${d.rarity}"><small>${rarityNames[d.rarity]}</small>${d.art?`<img class="relic-art" src="${esc(d.art)}" alt="${esc(d.name)}"/>`:''}<h2>${esc(d.name)}</h2><p>${esc(d.effect)}</p><button class="button primary" data-action="run-relic" data-id="${id}">Escolher relíquia</button></article>`;}).join('')}</div>`;}
export function activeRelics(r:RunState){const ids=r.relicRun?.active??[];return ids.length?`<details class="active-relics"><summary>Relíquias ativas · ${ids.length}</summary>${ids.map(id=>`<p><strong>${esc(relicCatalog[id].name)}</strong> — ${esc(relicCatalog[id].effect)}</p>`).join('')}</details>`:'';}
