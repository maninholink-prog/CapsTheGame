import {createProtagonistDeck,fullCatalog,protagonistIds} from '../content/decks.js';
import type {Champion} from '../content/schema.js';
import {matchModes,matchResults,profileFrames,topHeroes} from '../profile/matches.js';
import {collectibleIds,masteryInfo} from '../profile/profile.js';
import type {Profile} from '../profile/profile.js';
import type {SaveSummary} from '../profile/save-store.js';
import {art,esc,icon,regionSymbol} from './html.js';
import {playableRelicIds} from '../run/relics.js';

export function heroPortrait(id:Champion):string {
 const file=id==='youro'?'youro.png':id==='kuara'?'kuara.png':id==='thalion'?'thalion-card.png':id==='arcata'?'arcata-mastery-v2.png':id==='abe'||id==='rubel'||id==='kylast'?`${id}-mastery.png`:null;
 return file?`<img class="portrait" src="/art/${file}" alt=""/>`:art(id);
}

export function renderProfileSummary(p:Profile,profiles:SaveSummary[]=[],activeId:string|null=null):string {
 const available=protagonistIds.filter(id=>p.collection[id]?.count);
 const avatar=p.avatar??available[0]??'kylast';
 const frame=p.frame??'gold';
 const top=topHeroes(p);
 const levels=protagonistIds.reduce((sum,id)=>sum+masteryInfo(p.mastery[id].xp).level,0);
 const champion=fullCatalog[avatar],mastery=masteryInfo(p.mastery[avatar].xp);
 const deck=createProtagonistDeck(avatar,'profile-preview');
 const deckCounts=new Map<string,number>();
 for(const card of deck)deckCounts.set(card.definitionId,(deckCounts.get(card.definitionId)??0)+1);
 const totalCards=collectibleIds.reduce((sum,id)=>sum+(p.collection[id]?.count??0),0);
 const relicCount=playableRelicIds.filter(id=>p.relicCollection?.[id]?.conquered).length;
 const shinyCount=collectibleIds.filter(id=>p.collection[id]?.shiny).length;
 const regions=[...new Set(available.flatMap(id=>fullCatalog[id].regions??[]))];
 return `<section data-view-panel="Resumo">${renderProfileManagement(profiles,activeId)}
  <div class="profile-overview">
   <article class="profile-player-card">
    <header><h2>${esc(p.name)}</h2><button class="button profile-edit" data-action="profile-customize" aria-label="Editar foto e dados do perfil">${icon('settings')}</button></header>
    <div class="profile-player-crest frame-${frame}">${heroPortrait(avatar)}</div>
    <p class="eyebrow">PROTAGONISTA FAVORITO</p><strong class="profile-champion-name">${esc(champion.name??avatar)}</strong>
    <details class="profile-deck"><summary><span>Deck inicial</span><strong>${deck.length} cartas</strong></summary><ul>${[...deckCounts].map(([id,count])=>`<li><span>${esc(fullCatalog[id].name??id)}</span><b>×${count}</b></li>`).join('')}</ul></details>
    <div class="profile-backups"><button class="button" data-action="profile-export">Exportar backup</button><label class="button secondary">Restaurar backup<input type="file" id="import-save" accept="application/json,.json" hidden/></label></div>
   </article>
   <aside class="profile-mastery-card">
    <p class="eyebrow">MAESTRIA</p><strong class="profile-mastery-level">${mastery.level}</strong><span>NÍVEL DO PROTAGONISTA</span>
    <progress aria-label="Progresso de maestria" max="${mastery.next||1}" value="${mastery.next?mastery.progress:1}"></progress>
    <small>${mastery.next?`${mastery.progress}/${mastery.next} XP`:'Nível máximo'}</small>
    <hr/><strong>${levels}</strong><span>NÍVEIS TOTAIS</span><small>${mastery.points}/15 pontos neste protagonista</small>
    <button class="button" data-action="hub-nav" data-id="mastery" data-hero="${avatar}">Ver maestria</button>
   </aside>
   <div class="profile-statistics">
    <div class="profile-stat-grid">
     <article><span class="profile-stat-label">${icon('cards','profile-icon-cards')}TOTAL DE CARTAS</span><strong>${totalCards}</strong><small>${collectibleIds.filter(id=>p.collection[id]?.count).length}/${collectibleIds.length} identidades</small></article>
     <article><span class="profile-stat-label">${icon('champion','profile-icon-champion')}PROTAGONISTAS</span><strong>${available.length}</strong><small>de ${protagonistIds.length} desbloqueados</small></article>
    </div>
    <section class="profile-regions"><h2>REGIÕES</h2><div>${regions.map(regionSymbol).join('')||'<p>Nenhuma região descoberta</p>'}</div></section>
    <section class="profile-cosmetics"><h2>COSMÉTICOS</h2><div><article><span class="profile-art-icon frame-${frame}">${icon('frame','profile-icon-frame')}</span><strong>Moldura</strong><small>${profileFrames[frame]}</small></article><article><span class="profile-art-icon jade">${icon('sparkle','profile-icon-sparkle')}</span><strong>Brilhantes</strong><small>${shinyCount} cartas</small></article><button class="button" data-action="hub-nav" data-id="relics"><span class="profile-art-icon copper">${icon('relic','profile-icon-relic')}</span><strong>Relíquias</strong><small>${relicCount} conquistadas</small></button></div></section>
    <section class="profile-most-played"><h2>PERSONAGENS MAIS JOGADOS</h2><div class="profile-top">${top.map(({hero,played,wins},index)=>`<article>
     <div class="profile-top-art">${heroPortrait(hero)}<span>#${index+1}</span></div>
     <h3>${esc(fullCatalog[hero].name)}</h3><p>${played} partidas · ${wins} vitórias</p>
     <small>Maestria ${masteryInfo(p.mastery[hero].xp).level}</small>
    </article>`).join('')||'<p>Conclua uma partida de Aventura para começar seu Top 3.</p>'}</div></section>
   </div>
  </div>
  <dialog class="profile-customization" id="profile-customization" aria-labelledby="profile-customization-title">
   <button type="button" class="button profile-customization-close" data-action="profile-customize-close" aria-label="Fechar">×</button>
   <h2 id="profile-customization-title">PERSONALIZAR PERFIL</h2>
   <label class="profile-name-field">Apelido<input id="rename-profile" maxlength="40" value="${esc(p.name)}" autocomplete="nickname"/></label>
   <fieldset class="profile-avatar-grid"><legend>FOTO DE PERFIL</legend>${available.map(id=>`<label class="profile-avatar-option" title="${esc(fullCatalog[id].name)}"><input type="radio" name="profile-avatar" value="${id}" aria-label="${esc(fullCatalog[id].name)}" ${id===avatar?'checked':''}/><span>${heroPortrait(id)}</span></label>`).join('')}</fieldset>
   <footer><div class="profile-avatar-preview frame-${frame}">${heroPortrait(avatar)}</div><div class="profile-avatar-caption"><strong>${esc(champion.name??avatar)}</strong><small>Ícone de protagonista</small></div><label>Moldura<select id="profile-frame">${Object.entries(profileFrames).map(([id,name])=>`<option value="${id}" ${id===frame?'selected':''}>${name}</option>`).join('')}</select></label><button class="button primary" data-action="profile-rename">Salvar perfil</button></footer>
  </dialog>
 </section>`;
}

export function renderProfileManagement(profiles:SaveSummary[],activeId:string|null):string {
 return `<section class="profile-management" aria-labelledby="profiles-title"><div><p class="eyebrow">SALVOS LOCAIS</p><h2 id="profiles-title">Perfis</h2><p>Progresso e aventura ficam juntos no arquivo de cada perfil.</p></div><button class="button primary" data-action="profile-add">Criar perfil</button><div class="profile-list" role="group" aria-label="Escolher perfil">${profiles.map(item=>`<button class="profile-choice" data-action="profile-switch" data-id="${esc(item.id)}" aria-current="${item.id===activeId?'true':'false'}" ${item.valid?'':'disabled'}><strong>${esc(item.name)}</strong><small>${esc(fullCatalog[item.hero].name??item.hero)}${item.id===activeId?' · Ativo':''}</small></button>`).join('')}</div></section>`;
}

export function renderMatchHistory(p:Profile):string {
 return `<section data-view-panel="Histórico"><h2>Histórico de partidas</h2>
  <div class="ledger"><table><thead><tr><th>Data</th><th>Personagem</th><th>Modo</th><th>Resultado</th></tr></thead>
  <tbody>${(p.matches??[]).slice().reverse().map(m=>`<tr><td>${esc(new Date(m.time).toLocaleString('pt-BR'))}</td><td>${esc(fullCatalog[m.hero].name)}</td><td>${matchModes[m.mode]}</td><td>${matchResults[m.result]}</td></tr>`).join('')||'<tr><td colspan="4">As partidas concluídas a partir desta atualização aparecem aqui.</td></tr>'}</tbody>
  </table></div></section>`;
}
