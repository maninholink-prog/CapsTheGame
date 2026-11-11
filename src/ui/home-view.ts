import {protagonistIds} from '../content/decks.js';
import {activeAdventure} from '../run/caveira-adventure.js';
import type {Profile} from '../profile/profile.js';
import type {RunState} from '../run/run.js';
import {esc,icon,korakoinIcon} from './html.js';
import {heroPortrait} from './profile-view.js';

export function nextHomeScene(previous:string|null):'jade'|'ember' {
 return previous==='jade'?'ember':'jade';
}

const gameVersion='ALPHA · v0.1.0';

const links=[
 ['home','Início','menu-home'],
 ['adventure','Aventura','menu-adventure'],
 ['collection','Coleção','menu-collection'],
 ['mastery','Maestria','menu-mastery'],
 ['boosters','Boosters','menu-boosters'],
 ['profile','Perfil','menu-profile'],
] as const;

export function renderHubRail(current:string):string {
 return `<nav class="home-rail" aria-label="Menu principal">
   <img class="home-emblem" src="/art/caps-emblem.png" alt="C.A.P.S." width="68" height="68"/>
   ${links.map(([page,label,symbol])=>`<button class="button" data-action="hub-nav" data-id="${page}" ${page===current||page==='collection'&&current==='relics'?'aria-current="page"':''}>${icon(symbol)}<span>${label}</span></button>`).join('')}
  </nav>`;
}

export function renderHome(p:Profile,run:RunState|null,scene:'jade'|'ember',error:string):string {
 const active=activeAdventure(run);
 const avatar=p.avatar??protagonistIds.find(id=>p.collection[id]?.count)??'kylast';
 return `<main class="home-lobby scene-${scene}">
  <div class="home-stage">
   <header class="home-player">
    <button class="button home-profile" data-action="hub-nav" data-id="profile" aria-label="Perfil e progresso">
     <span class="profile-medallion frame-${p.frame??'gold'}">${heroPortrait(avatar)}</span>
    </button>
    <div class="home-top-right">
     <div class="home-balances"><span class="home-stones" aria-label="${p.stones} Pedras Filosofais"><img src="/art/philosophers-stone.png" alt=""/><b>${p.stones.toLocaleString('pt-BR')}</b></span>${active&&run?`<span class="home-korakoins" aria-label="${run.coins} Korakacoins">${korakoinIcon()}<b>${run.coins.toLocaleString('pt-BR')}</b></span>`:''}</div>
     <details class="display-options"><summary aria-label="Opções de exibição">${icon('settings')}</summary><button type="button" class="button secondary" data-action="toggle-fullscreen">Alternar tela cheia</button></details>
    </div>
   </header>
   ${error?`<p class="error" role="alert">${esc(error)}</p>`:''}
   <div class="home-bottom">
    <section class="home-actions" aria-label="Ações do jogo">
     <button class="button home-adventure" data-action="hub-nav" data-id="${active?'battle':'adventure'}">
      <span class="eyebrow">SEU PRÓXIMO CAPÍTULO</span><strong>${active?'Continuar aventura':'Iniciar aventura'}</strong>
     </button>
     <button class="button home-milestones" data-action="hub-nav" data-id="profile" data-tab="Marcos semanais">Marcos semanais</button>
    </section>
    <small class="home-version" aria-label="Versão ${gameVersion}">${gameVersion}</small>
   </div>
  </div>
 </main>`;
}
