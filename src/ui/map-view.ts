import {heroPortrait} from './profile-view.js';
import {fullCatalog} from '../content/decks.js';
import {difficultyRules} from '../run/difficulty.js';
import {encounterNames} from '../battle/encounters.js';
import {rarityNames} from '../profile/profile.js';
import {esc,icon} from './html.js';
import {availableNodes} from '../run/adventure.js';
import type {RunState} from '../run/run.js';
import type {MapNode} from '../run/map.js';
export function nodeName(n:MapNode){return n.kind==='midboss'?'Chefe intermediário':n.kind==='finalboss'?'Chefe final':n.kind==='battle'?'Batalha':n.event==='shop-standard'?'Loja padrão':n.event==='shop-specialized'?'Loja especializada':'Evento desconhecido';}
export function renderMap(r:RunState,deck='',error=''):string {
 const map=r.map!;
 const rows=Math.max(...map.nodes.map(node=>node.row))+1;
 const columns=Math.max(...map.nodes.map(node=>node.column))+1;
 const available=new Set(availableNodes(r).map(node=>node.id));
 const visited=new Set(map.visited);
 const current=map.current??'start';
 const hero=r.group[0];
 const name=esc(fullCatalog[hero].name);
 const paths=map.nodes.flatMap(node=>node.next.map(id=>{
  const target=map.nodes.find(candidate=>candidate.id===id)!;
  const state=visited.has(node.id)&&visited.has(id)?'traveled':node.id===current&&available.has(id)?'open-route':'';
  return `<line x1="${node.column+.5}" y1="${node.row+.5}" x2="${target.column+.5}" y2="${target.row+.5}" class="${state}"/>`;
 })).join('');
 return `<main class="expedition-map">
  <header class="expedition-header">
   <button class="button secondary" data-action="run-exit">← Voltar ao início</button>
   <div><p class="eyebrow">${rarityNames[r.difficulty??'common']} · ${map.nodes.length} casas · MAPA DA AVENTURA</p><h1>${r.adventure==='dr-felix'?'Laboratório do Dr. Félix':'Rota da aventura'}</h1></div>
  </header>
  ${error?`<p class="expedition-error" role="alert">${esc(error)}</p>`:''}
  <div class="expedition-scroll" tabindex="0" aria-label="Rota da aventura. Role para explorar.">
   <div class="route-map expedition-route" style="--route-rows:${rows};--route-columns:${columns}">
    <svg viewBox="0 0 ${columns} ${rows}" preserveAspectRatio="none" aria-hidden="true">${paths}</svg>
    ${map.nodes.map(node=>{
     const open=available.has(node.id),seen=visited.has(node.id),here=node.id===current;
     const shop=node.event?.startsWith('shop-');
     const label=shop?'Loja':node.kind==='event'?'Evento':node.kind==='battle'?'Combate':'Chefe';
     const enemy=r.encounters?.[node.id];
     const status=here?'Posição atual':seen?'Visitada':open?'Disponível':'Bloqueada';
     return `<button class="map-node ${node.kind}${open?' available':''}${seen?' visited':''}${here?' current':''}"
       style="grid-row:${node.row+1};grid-column:${node.column+1}" data-action="run-node" data-id="${esc(node.id)}"
       aria-label="${esc(nodeName(node)+(enemy?' · '+encounterNames[enemy]:'')+' · '+status)}" ${here?'aria-current="location"':''} ${open?'':'disabled'}>
       ${here?`<span class="expedition-marker" aria-hidden="true">${heroPortrait(hero)}</span>`:''}
       <span class="expedition-node-icon" aria-hidden="true">${seen?'✓':shop?icon('diamond'):node.kind==='event'?'?':icon(node.kind==='battle'?'sword':'shield')}</span>
       <strong>${label}</strong>${open?'<small>Disponível</small>':''}
      </button>`;
    }).join('')}
   </div>
  </div>
  <footer class="expedition-footer">
   <div class="expedition-hero"><span class="expedition-avatar">${heroPortrait(hero)}</span><strong>${name}</strong></div>
   <dl><div><dt>Vínculo</dt><dd>${r.nexus}/${r.maxNexus}</dd></div><div><dt>Korakacoins</dt><dd>${r.coins}</dd></div><div><dt>Reviver</dt><dd>${r.revives}/5</dd></div></dl>
   ${deck}
  </footer>
 </main>`;
}

export function focusMapPosition(root:HTMLElement):void {
 const viewport=root.querySelector<HTMLElement>('.expedition-scroll');
 const current=viewport?.querySelector<HTMLElement>('[aria-current="location"]');
 if(!viewport||!current)return;
 const top=current.getBoundingClientRect().top-viewport.getBoundingClientRect().top;
 viewport.scrollTop+=top-viewport.clientHeight*.32;
}
export function renderEvent(r:RunState){const n=r.map!.nodes.find(x=>x.id===r.map!.current)!;const label=n.event==='rest'?'Recuperar 5 de vida':n.event==='supplies'?'Escolher uma carta':'Receber 1 carga de reviver';const detail=n.event==='rest'?`Seu Vínculo está em ${r.nexus}/${r.maxNexus}. Recupera até 5, sem ultrapassar o máximo.`:n.event==='supplies'?'Escolha entre cartas elegíveis para adicionar duas cópias; também poderá recusar.':`Você tem ${r.revives}/5 cargas. Reviver restaura toda a vida e pode repetir a batalha ou voltar ao checkpoint ativo.`;return `<span class="eyebrow">EVENTO DE TESTE · GRATUITO</span><h2>${n.event==='rest'?'Descanso':n.event==='supplies'?'Suprimentos':'Resgate'}</h2><p>${detail}</p><button class="button primary" data-action="run-event-accept" ${n.event==='rescue'&&r.revives>=5?'disabled':''}>${label}</button><button class="button secondary" data-action="run-event-skip">Seguir sem aceitar</button>`;}
export function renderDefeat(r:RunState){return `<p>Você tem ${r.revives} carga(s). Cada retorno consome uma carga e restaura toda a vida.</p><button class="button primary" data-action="run-retry">Repetir batalha · 1 carga</button>${r.checkpoint?'<button class="button secondary" data-action="run-checkpoint">Voltar ao checkpoint · 1 carga</button><p>O retorno desfaz cartas, eventos e ganhos posteriores ao chefe. Cargas já consumidas não voltam.</p>':''}<button class="button secondary" data-action="run-abandon">Encerrar a run</button>`;}


export function renderEncounterPreview(r:RunState,id:string):string {
 const node=availableNodes(r).find(candidate=>candidate.id===id);
 const encounter=r.adventure==='dr-felix'?r.encounters?.[id]:undefined;
 if(!node||node.kind==='event'||!encounter)return '';
 const health=difficultyRules[r.difficulty??'common'].enemyNexus[node.kind==='midboss'?1:node.kind==='finalboss'?2:0];
 return `<dialog class="encounter-preview" aria-labelledby="encounter-preview-title">
  <div class="encounter-preview-mark" aria-hidden="true">${icon('sword')}</div>
  <p class="eyebrow">LABORATÓRIO DO DR. FÉLIX · ${nodeName(node)}</p>
  <h2 id="encounter-preview-title">${esc(encounterNames[encounter])}</h2>
  <dl><div><dt>Vínculo inimigo</dt><dd>${health}</dd></div><div><dt>Seu Vínculo</dt><dd>${r.nexus}/${r.maxNexus}</dd></div></dl>
  ${encounter==='felix'?'<p><strong>Duas fases</strong> · Ao derrotar Dr. Félix, você enfrenta o Rei Mecanizado.</p>':''}
  <form method="dialog" class="encounter-preview-actions">
   <button class="button secondary" autofocus>Voltar ao mapa</button>
   <button type="button" class="button primary" data-action="run-fight" data-id="${esc(id)}">Lutar</button>
  </form>
 </dialog>`;
}
