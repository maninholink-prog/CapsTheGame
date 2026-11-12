import {relicCatalog,relicIds} from '../content/relics.js';
import {playableRelicIds} from '../run/relics.js';
import type {Profile} from '../profile/profile.js';
import type {RunState} from '../run/run.js';
import {esc,icon} from './html.js';
const rarityNames={common:'Comum',rare:'Rara',legendary:'Lendária'};
export function relicInitialSelector(p:Profile,selected=''){
 const owned=playableRelicIds.filter(id=>p.relicCollection?.[id]?.conquered);
 return `<label>Relíquia inicial <select id="run-relic"><option value="">Começar sem relíquia</option>${owned.map(id=>`<option value="${id}" ${selected===id?'selected':''}>${esc(relicCatalog[id].name)}</option>`).join('')}</select></label><p class="muted">Escolha até uma relíquia conquistada. ${owned.length?'As obtidas durante a run ficam ativas junto dela.':'Conquiste sua primeira ao vencer uma run com ela ativa.'}</p>`;
}
const relicSymbols:Record<string,string>={
 'artifact-07':'<path d="m5 26 5 5 6-6 3 3 4-4-3-3L30 7l1-6-6 1-14 10-3-3-4 4 3 3-6 6z" fill="#b8dded" stroke="#e8f7ff"/><path d="M12 19 27 5M6 24l3 3" stroke="#5f7ea4" stroke-width="2"/>',
 'artifact-16':'<path d="M16 30C5 25 3 14 5 6c6 0 10 3 12 7C19 6 23 3 30 2c1 13-3 23-14 28z" fill="#7bb478" stroke="#d2e9ac"/><path d="M16 29c1-8 5-15 10-21M15 24 8 12" fill="none" stroke="#315b45" stroke-width="2"/><circle cx="18" cy="16" r="3" fill="#efd782"/>',
 'artifact-22':'<path d="M10 3h13l-2 13 8 6v7H7v-7l3-8z" fill="#9873bd" stroke="#e8cfab"/><path d="m11 10-7-5 2 11-4 1 7 5m13-1 5 3M9 25h17" fill="none" stroke="#f0d99d" stroke-width="2"/>',
};
function relicSymbol(id:string):string {
 const paths=relicSymbols[id];
 return paths?`<svg viewBox="0 0 32 32" class="artifact-symbol" aria-hidden="true">${paths}</svg>`:icon('diamond','artifact-symbol');
}
export function renderRelicCollection(p:Profile,tabs=''){
 const ordered=[...playableRelicIds,...relicIds.filter(id=>!playableRelicIds.includes(id))];
 return `<main class="hub-main"><p class="eyebrow">SUA COLEÇÃO</p><h1>Artefatos</h1>${tabs}<p>Passe o mouse, selecione com o teclado ou toque em um ícone para consultar o artefato.</p><div class="artifact-grid" aria-label="Artefatos">${ordered.map(id=>{
  const d=relicCatalog[id],record=p.relicCollection?.[id],ready=playableRelicIds.includes(id);
  const status=!ready?'Em preparação':record?.conquered?'Conquistada · disponível no início':record?'Descoberta · ainda não conquistada':'Não descoberta';
  const effect=record?d.effect:'?????';
  return `<button type="button" class="artifact-icon rarity-${d.rarity}${record?'':' undiscovered'}" data-artifact="${id}" data-name="${esc(d.name)}" data-status="${esc(status)}" data-effect="${esc(effect)}" data-rarity="${rarityNames[d.rarity]}" aria-label="${esc(d.name)} · ${esc(status)}" aria-controls="artifact-detail" aria-pressed="false">${relicSymbol(id)}</button>`;
 }).join('')}</div><section id="artifact-detail" class="artifact-detail notice" aria-live="polite"><h2>Selecione um artefato</h2><p>O efeito aparece aqui depois que o artefato é descoberto.</p></section></main>`;
}

export function connectRelicCollection(root:HTMLElement):void {
 const panel=root.querySelector<HTMLElement>('#artifact-detail');
 if(!panel)return;
 const buttons=[...root.querySelectorAll<HTMLButtonElement>('[data-artifact]')];
 function show(button:HTMLButtonElement){
  if(button.getAttribute('aria-pressed')==='true')return;
  for(const item of buttons)item.setAttribute('aria-pressed',String(item===button));
  const title=document.createElement('h2');
  const status=document.createElement('p');
  const effect=document.createElement('p');
  title.textContent=button.dataset.name??'';
  status.className='muted';
  status.textContent=`${button.dataset.rarity} · ${button.dataset.status}`;
  effect.textContent=button.dataset.effect??'';
  panel!.replaceChildren(title,status,effect);
  if(button.classList.contains('undiscovered')){
   const description=document.createElement('p');
   description.className='muted';
   description.textContent='Este deus não lhe deu sua bênção.';
   panel!.append(description);
  }
 }
 for(const button of buttons){
  button.onpointerenter=()=>show(button);
  button.onfocus=()=>show(button);
  button.onclick=()=>show(button);
 }
}
export function renderRelicOffer(r:RunState){return `<p>Escolha uma relíquia para ativar imediatamente. Ela será conquistada na coleção se você concluir esta run com ela ativa.</p><div class="recruit-grid">${(r.relicRun?.offers??[]).map(id=>{const d=relicCatalog[id];return `<article class="recruit-option rarity-${d.rarity}"><small>${rarityNames[d.rarity]}</small>${d.art?`<img class="relic-art" src="${esc(d.art)}" alt="${esc(d.name)}"/>`:''}<h2>${esc(d.name)}</h2><p>${esc(d.effect)}</p><button class="button primary" data-action="run-relic" data-id="${id}">Escolher relíquia</button></article>`;}).join('')}</div>`;}
export function activeRelics(r:RunState){const ids=r.relicRun?.active??[];return ids.length?`<details class="active-relics"><summary>Relíquias ativas · ${ids.length}</summary>${ids.map(id=>`<p><strong>${esc(relicCatalog[id].name)}</strong> — ${esc(relicCatalog[id].effect)}</p>`).join('')}</details>`:'';}
