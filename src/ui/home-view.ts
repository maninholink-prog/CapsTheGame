import {protagonistIds} from '../content/decks.js';
import type {Profile} from '../profile/profile.js';
import type {RunState} from '../run/run.js';
import {esc,icon} from './html.js';
import {heroPortrait} from './profile-view.js';

export function nextHomeScene(previous:string|null):'jade'|'ember' {
 return previous==='jade'?'ember':'jade';
}

const links=[
 ['home','Início','shield'],
 ['adventure','Aventura','sword'],
 ['collection','Coleção','book'],
 ['mastery','Maestria','forge'],
 ['boosters','Boosters','diamond'],
 ['profile','Perfil','shield'],
] as const;

export function renderHubRail(current:string):string {
 return `<nav class="home-rail" aria-label="Menu principal">
   <img class="home-emblem" src="/art/caps-emblem.png" alt="C.A.P.S." width="68" height="68"/>
   ${links.map(([page,label,symbol])=>`<button class="button" data-action="hub-nav" data-id="${page}" ${page===current||page==='collection'&&current==='relics'?'aria-current="page"':''}>${icon(symbol)}<span>${label}</span></button>`).join('')}
  </nav>`;
}

export function renderHome(p:Profile,run:RunState|null,scene:'jade'|'ember',error:string):string {
 const active=run&&!['won','lost'].includes(run.stage);
 const avatar=p.avatar??protagonistIds.find(id=>p.collection[id]?.count)??'kylast';
 return `<main class="home-lobby scene-${scene}">
  <div class="home-stage">
   <header class="home-player">
    <button class="button home-profile" data-action="hub-nav" data-id="profile">
     <span class="profile-medallion frame-${p.frame??'gold'}">${heroPortrait(avatar)}</span>
     <span>${esc(p.name)}<small>Perfil e progresso</small></span>
    </button>
    <details class="display-options"><summary>Opções</summary><button type="button" class="button secondary" data-action="toggle-fullscreen">Alternar tela cheia</button></details><div class="home-balances"><span>◆ ${p.stones} Pedras Filosofais</span>${active?`<span>${run.coins} Korakacoins</span>`:''}</div>
   </header>
   ${error?`<p class="error" role="alert">${esc(error)}</p>`:''}
   <section class="home-actions" aria-label="Jogar">
    <button class="button home-adventure" data-action="hub-nav" data-id="${active?'battle':'adventure'}">
     <span class="eyebrow">SEU PRÓXIMO CAPÍTULO</span><strong>${active?'Continuar aventura':'Iniciar aventura'}</strong>
    </button>
    <div class="home-shortcuts">
     <button class="button" data-action="hub-training">Duelo de treino</button>
     <button class="button" data-action="hub-nav" data-id="profile" data-tab="Marcos semanais">Marcos semanais</button>
    </div>
   </section>
  </div>
 </main>`;
}
