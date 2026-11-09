import type {CardDefinition} from '../content/schema.js';
import {art,esc,regionSymbol} from './html.js';
import {description} from './presentation.js';

const regions={north:'Norte',east:'Leste',south:'Sul',west:'Oeste',korakarom:'Korakarom'};
export function cardFace(def:CardDefinition, display:{cost?:number;title?:string;body?:string;arsenal?:boolean;evolved?:boolean;marked?:boolean}={}):string {
 const kind=display.arsenal?'spell':def.kind==='unit'?(def.champion?'champion':'unit'):def.kind==='equipment'?'equipment':'spell';
 const speed=display.arsenal?'Rápida':'speed' in def?{slow:'Lenta',fast:'Rápida',burst:'Explosiva'}[def.speed]:'';
 return `<div class="caps-card caps-card-${kind}">
  <div class="caps-art">${art(def.baseId??def.id,false,display.evolved)}</div>
  <span class="caps-cost" aria-label="Custo ${display.cost??def.cost}">${display.cost??def.cost}</span>
  ${display.marked?'<span class="swap-tag">TROCAR</span>':''}
  <div class="caps-copy"><strong class="caps-name">${esc(display.title??def.name??def.id)}</strong>
   <span class="caps-type">${kind==='champion'?'Campeão':kind==='unit'?'Aliado':kind==='equipment'?'Equipamento':`Magia · ${speed}`}</span>
   <p class="caps-rules">${esc(display.body??description(def))}</p>
  </div>
  <div class="caps-footer"><span class="caps-region" title="${esc((def.regions??[]).map(r=>regions[r]).join(' / '))}">${(def.regions??[]).map(regionSymbol).join('')}</span><span class="caps-gem" title="Raridade"></span></div>
  ${def.kind==='unit'&&!display.arsenal?`<span class="caps-attack" aria-label="Ataque ${def.attack+(display.evolved?1:0)}">${def.attack+(display.evolved?1:0)}</span><span class="caps-health" aria-label="Vida ${def.health+(display.evolved?1:0)}">${def.health+(display.evolved?1:0)}</span>`:def.kind==='equipment'?`<span class="caps-attack" aria-label="Dano adicional">+${def.damage??0}</span>`:''}
 </div>`;
}
