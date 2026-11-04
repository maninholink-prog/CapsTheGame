import {felixCatalog} from './felix.js';
import {expansionCatalog,expansionStarters} from './expansion.js';
import {kylastCatalog,createKylastDeck} from './kylast.js';
import {allyCatalog} from './allies.js';
import {narrativeCatalog} from './narrative.js';
import type {Champion} from './schema.js';
import type {CardInstance} from '../battle/types.js';
export const fullCatalog={...kylastCatalog,...allyCatalog,...narrativeCatalog,...expansionCatalog,...felixCatalog};
export const protagonistIds:Champion[]=['kylast','abe','arcata','rubel','youro','kuara','thalion','lazaro'];
export const starterLists:Record<Exclude<Champion,'kylast'>,string[]>={...expansionStarters,
 abe:['abe','aranha','zacarias','keegan','lucia','gremin','project','cinderela','enhanced-defense','flash-genius'],
 arcata:['arcata','arcata-raven','soarim','salita','gwen','kriv','fire-bolt','burning-hands','control-flames','fire-shield','wall-fire'],
 rubel:['rubel','coroinha','luise','archibald','faith-guardian','mantum','healing-word','prayer','blessing','aid','sacred-flame'],
};
export function createProtagonistDeck(champion:Champion,prefix:string):CardInstance[]{
 if(!protagonistIds.includes(champion))throw Error('Protagonista não implementado');
 if(champion==='kylast')return createKylastDeck(prefix);
 return starterLists[champion].flatMap((definitionId,i)=>[0,1].map(copy=>({definitionId,instanceId:`${prefix}-${i}-${copy}`})));
}


