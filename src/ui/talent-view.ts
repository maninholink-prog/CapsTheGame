import type {Champion} from '../content/schema.js';
import {masteryInfo,type Profile} from '../profile/profile.js';
import {getTalents,talentsFor,type Talent} from '../profile/talents.js';
import {esc} from './html.js';

// Positions on the approved 1672 × 941 artwork, in catalogue order.
const kylastPositions=[[39.7,77],[39.8,68.2],[39.5,59.9],[40.1,50.7],[41.4,40.9],[44.5,24.8],[19.3,48.7],[14.7,38.9],[12.1,32.5],[31.3,40.5],[51.8,39.7],[58.5,53],[65.7,58.7],[77.9,57.7],[83.9,52]];

const abePositions=[[51,63],[48,54],[42,47],[36,51],[31,54],[34,61],[37,66],[60,52],[65,45],[68,37],[68,29],[57,69],[62,75],[70,73],[80,69]];

const arcataPositions=[[31,79],[34,64],[39,48],[24,48],[16,52],[13,62],[10,75],[46,66],[54,68],[61,63],[68,59],[45,85],[60,88],[76,80],[92,62]];

export function renderTalents(profile:Profile,hero:Champion,runActive:boolean):string {
 const talents=talentsFor(hero);
 if(!talents.length)return '<section class="talent-tree" aria-label="Talentos"><h3>Talentos</h3><p>Árvore de talentos em preparação para este protagonista.</p></section>';
 const abe=hero==='abe',name=abe?'Abe':hero==='arcata'?'Arcata':'Kylast',positions=abe?abePositions:hero==='arcata'?arcataPositions:kylastPositions;
 const artAlt=hero==='arcata'?'Arcata lança uma espiral de fogo':abe?'Abe trabalhando na oficina com um cristal azul':'Kylast atacando com a espada e a foice Alastor';
 const owned=getTalents(profile)[hero]??[],info=masteryInfo(profile.mastery[hero].xp),locked=!profile.collection[hero]?.count;
 const available=(t:Talent)=>!runActive&&!locked&&!owned.includes(t.id)&&owned.length<info.points&&info.level>=(t.minLevel??1)&&(!t.parent||owned.includes(t.parent));
 const initial=talents.find(available)?.id??talents[0].id;
 const path=hero!=='kylast'?talents.flatMap((t,i)=>{
  if(!t.parent)return [];
  const [x,y]=positions[i], [px,py]=positions[talents.findIndex(n=>n.id===t.parent)];
  return `M${px*16.72} ${py*9.41} L${x*16.72} ${y*9.41}`;
 }).join(' '):'M664 725 L665 642 L660 564 L671 477 L692 385 L744 233 M671 477 C610 478 566 397 524 381 S379 498 322 458 S259 398 245 366 L202 306 M671 477 C774 480 802 383 866 374 S932 473 978 499 S1060 548 1098 552 S1223 583 1302 543 L1403 489';
 const nodes=talents.map((t,i)=>{
  const acquired=owned.includes(t.id),parent=talents.find(n=>n.id===t.parent),enabled=available(t);
  const state=acquired?'Adquirido':enabled?'Disponível':'Bloqueado';
  return `<li><details name="${hero}-constellation"${t.id===initial?' open':''}><summary class="constellation-star ${acquired?'acquired':enabled?'available':'locked'}" style="--x:${positions[i][0]}%;--y:${positions[i][1]}%" aria-label="${esc(t.name)} — ${state}" aria-describedby="talent-${t.id}-details"><span class="star-core" aria-hidden="true"></span><span class="star-name">${esc(t.name)}</span></summary><div class="constellation-detail" id="talent-${t.id}-details"><h4>${esc(t.name)} <small>· ${state}</small></h4><p>${esc(t.text)}</p><p class="muted">${parent?`Requer: ${esc(parent.name)}.`:'Início da árvore.'}${t.minLevel?' Maestria 30.':''}</p><button type="button" data-action="talent-buy" data-hero="${hero}" data-id="${t.id}" aria-pressed="${acquired}" aria-describedby="talent-${t.id}-details"${enabled?'':' disabled'}>${acquired?'Adquirido':'Adquirir talento — 1 ponto'}</button></div></details></li>`;
 }).join('');
 return `<section class="talent-tree kylast-constellation" aria-label="Árvore de talentos de ${name}"><h3>Maestria de ${name}</h3><p>Gastos: ${owned.length} / 15 · Disponíveis: ${Math.max(0,info.points-owned.length)} · Maestria ${info.level}</p><p>${abe?'Efeitos provisórios. ':''}Selecione uma estrela para consultar o talento e seus pré-requisitos. Um ponto por nível par; todos os talentos podem ser adquiridos no nível 30.</p>${runActive?'<p role="status">Alterações indisponíveis durante a run.</p>':''}<div class="constellation-scroll"><div class="constellation-art"><img src="/art/${hero}-mastery${hero==='arcata'?'-v2':''}.png" alt="${artAlt}" width="1672" height="941"/><svg class="constellation-flow" viewBox="0 0 1672 941" aria-hidden="true"><path d="${path}"/></svg><ol class="constellation-nodes" aria-label="15 talentos de ${name}">${nodes}</ol></div></div><p class="constellation-legend"><span>✦ Disponível</span><span>✓ Adquirido</span><span>◇ Bloqueado</span></p><button type="button" data-action="talent-reset" data-hero="${hero}"${runActive||locked||!owned.length||profile.stones<200?' disabled':''}>Redistribuir talentos — 200 Pedras Filosofais</button><p>Redistribuir devolve os pontos gastos e preserva sua experiência.</p></section>`;
}
