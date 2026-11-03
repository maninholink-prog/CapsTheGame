import type {Champion} from '../content/schema.js';
import type {BattleState,PlayerId} from '../battle/types.js';
export function heroProgressText(s:BattleState,o:PlayerId,hero:Champion):string {
 const p=s.allyProgress?.[o],h=s.heroProgress?.[o];
 if(hero==='kylast')return s.evolvedKylast[o]?'Campeão evoluído':`Arsenal ${Math.min(4,s.equippedIdentities[o].length)}/4`;
 if(hero==='abe')return `Upgrades ${Math.min(6,p?.upgrades??0)}/6`;
 if(hero==='arcata')return `Fogo ${Math.min(6,p?.fire??0)}/6`;
 if(hero==='rubel')return `Cura ${Math.min(10,p?.healing??0)}/10`;
 if(hero==='youro')return `Mortes presenciadas ${Math.min(4,h?.deaths??0)}/4`;
 if(hero==='kuara')return `Roubadas ${Math.min(6,h?.stolen??0)}/6`;
 if(hero==='thalion')return `Músicas ${Math.min(6,h?.music??0)}/6`;
 return `Execuções ${Math.min(2,h?.executions??0)}/2`;
}
