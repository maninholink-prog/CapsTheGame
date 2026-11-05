import {fullCatalog,protagonistIds} from '../content/decks.js';
import type {Champion} from '../content/schema.js';
import {matchModes,matchResults,profileFrames,topHeroes} from '../profile/matches.js';
import {collectibleIds,masteryInfo} from '../profile/profile.js';
import type {Profile} from '../profile/profile.js';
import {art,esc} from './html.js';

export function heroPortrait(id:Champion):string {
 const file=id==='arcata'?'arcata-mastery-v2.png':id==='abe'||id==='rubel'||id==='kylast'?`${id}-mastery.png`:null;
 return file?`<img class="portrait" src="/art/${file}" alt=""/>`:art(id);
}

export function renderProfileSummary(p:Profile):string {
 const available=protagonistIds.filter(id=>p.collection[id]?.count);
 const avatar=p.avatar??available[0]??'kylast';
 const frame=p.frame??'gold';
 const top=topHeroes(p);
 const levels=protagonistIds.reduce((sum,id)=>sum+masteryInfo(p.mastery[id].xp).level,0);
 return `<section data-view-panel="Resumo">
  <div class="profile-overview">
   <article class="profile-banner">
    <div class="profile-medallion frame-${frame}">${heroPortrait(avatar)}</div>
    <p class="eyebrow">BRASÃO DO COLECIONADOR</p><h2>${esc(p.name)}</h2><p>${esc(fullCatalog[avatar].name)}</p>
    <details><summary>Personalizar perfil</summary>
     <label>Apelido <input id="rename-profile" maxlength="40" value="${esc(p.name)}" autocomplete="nickname"/></label>
     <label>Retrato <select id="profile-avatar">${available.map(id=>`<option value="${id}" ${id===avatar?'selected':''}>${esc(fullCatalog[id].name)}</option>`).join('')}</select></label>
     <label>Moldura <select id="profile-frame">${Object.entries(profileFrames).map(([id,name])=>`<option value="${id}" ${id===frame?'selected':''}>${name}</option>`).join('')}</select></label>
     <button class="button" data-action="profile-rename">Salvar perfil</button>
    </details>
   </article>
   <div>
    <div class="profile-totals">
     <button class="button" data-action="hub-nav" data-id="collection"><strong>${collectibleIds.filter(id=>p.collection[id]?.count).length}/${collectibleIds.length}</strong> Cartas obtidas</button>
     <button class="button" data-action="hub-nav" data-id="mastery"><strong>${levels}</strong> Níveis de maestria</button>
    </div>
    <h2>Seus personagens mais jogados</h2>
    <p class="muted">Partidas concluídas em modos que concedem maestria.</p>
    <div class="profile-top">${top.map(({hero,played,wins},index)=>`<article>
     <div class="profile-top-art">${heroPortrait(hero)}<span>#${index+1}</span></div>
     <h3>${esc(fullCatalog[hero].name)}</h3><p>${played} partidas · ${wins} vitórias</p>
     <small>Maestria ${masteryInfo(p.mastery[hero].xp).level}</small>
    </article>`).join('')||'<p>Conclua uma partida de Aventura para começar seu Top 3.</p>'}</div>
   </div>
  </div>
  <p><button class="button" data-action="profile-export">Exportar backup</button>
  <label class="button secondary">Restaurar backup (substitui este perfil)<input type="file" id="import-save" accept="application/json,.json" hidden/></label></p>
 </section>`;
}

export function renderMatchHistory(p:Profile):string {
 return `<section data-view-panel="Histórico"><h2>Histórico de partidas</h2>
  <div class="ledger"><table><thead><tr><th>Data</th><th>Personagem</th><th>Modo</th><th>Resultado</th></tr></thead>
  <tbody>${(p.matches??[]).slice().reverse().map(m=>`<tr><td>${esc(new Date(m.time).toLocaleString('pt-BR'))}</td><td>${esc(fullCatalog[m.hero].name)}</td><td>${matchModes[m.mode]}</td><td>${matchResults[m.result]}</td></tr>`).join('')||'<tr><td colspan="4">As partidas concluídas a partir desta atualização aparecem aqui.</td></tr>'}</tbody>
  </table></div></section>`;
}
