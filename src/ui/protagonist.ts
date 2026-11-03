import {protagonistIds,fullCatalog,starterLists} from '../content/decks.js';
import type {Champion} from '../content/schema.js';
export function protagonistSelector(selected:Champion){return `<label class="mode-choice"><span>PROTAGONISTA</span><select id="protagonist" aria-label="Protagonista da nova batalha ou run">${protagonistIds.map(id=>`<option value="${id}" ${id===selected?'selected':''}>${fullCatalog[id].name} · ${id==='kylast'?20:starterLists[id].length*2} cartas</option>`).join('')}</select></label>`;}
