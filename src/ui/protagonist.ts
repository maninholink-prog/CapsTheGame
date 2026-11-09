import {protagonistIds,fullCatalog,starterLists} from '../content/decks.js';
import type {Champion} from '../content/schema.js';
import {heroPortrait} from './profile-view.js';
import {esc} from './html.js';
export function protagonistSelector(selected:Champion){return `<details class="hero-picker"><summary>Escolher protagonista</summary><fieldset><legend>Protagonista da nova batalha ou run</legend>${protagonistIds.map(id=>`<label class="hero-option"><input type="radio" name="protagonist" aria-label="${esc(fullCatalog[id].name)}" value="${id}" ${id===selected?'checked':''}/>${heroPortrait(id)}<span>${esc(fullCatalog[id].name)} · ${id==='kylast'?20:starterLists[id].length*2} cartas</span></label>`).join('')}</fieldset></details>`;}
