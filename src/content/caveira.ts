import type {CardCatalog,CardEffect,Keyword,Region,TargetRule} from './schema.js';
import type {CardInstance} from '../battle/types.js';
import {jupiterCatalog,jupiterDecks} from './jupiter.js';

const catalog:CardCatalog={};
const enemy:TargetRule={kind:'unit',side:'enemy',min:1,max:1};
const noTarget:TargetRule={...enemy,min:0,max:0};
const wounded:TargetRule={...enemy,wounded:true};
const allyNexus:TargetRule={kind:'nexus',side:'ally',min:1,max:1};
const enemyOnly={enemyOnly:true,collectible:false};

function unit(id:string,name:string,region:Region,cost:number,attack:number,health:number,text:string,options:{pirate?:boolean;undead?:boolean;unique?:boolean;keyword?:Keyword;entryTarget?:TargetRule;entrySpell?:string}={}){
 catalog[id]={id,name,kind:'unit',regions:[region],cost,attack,health,text,...enemyOnly,...options};
}
function spell(id:string,name:string,cost:number,speed:'fast'|'slow',target:TargetRule,effect:CardEffect,text:string,region?:Region){
 catalog[id]={id,name,kind:'spell',cost,speed,target,effect,text,...enemyOnly,...(region?{regions:[region]}:{})};
}

const pirate={pirate:true};
const undead={pirate:true,undead:true};
unit('caveira-pirate','Esqueleto Pirata','north',1,1,2,'Pirata · Morto-vivo.',undead);
unit('caveira-marujo','Marujo Remendado','north',2,2,1,'Pirata · Morto-vivo. Ao morrer, invoque um Esqueleto Pirata por efeito respondível.',undead);
unit('caveira-saqueador','Saqueador de Convés','north',2,2,2,'Pirata. Ao entrar, roube a última carta do deck inimigo, sem causar fadiga.',pirate);
unit('caveira-duelist','Esqueleto Duelista','north',3,3,3,'Pirata · Morto-vivo. Ataque Rápido.',{...undead,unique:true,keyword:'quick'});
unit('caveira-general','General da Caveira Dourada','north',6,4,6,'Pirata · Morto-vivo. Ao entrar, coloque Reforços do General na pilha.',{...undead,unique:true});
unit('caveira-captain','Capitão Osso Roído','north',5,4,5,'Pirata · Morto-vivo. Ao atacar, dê +1 de ataque aos outros Piratas que atacam com ele até o fim da rodada.',{...undead,unique:true});
unit('caveira-cannon','Canhoneiro de Bombordo','east',3,2,3,'Pirata. Ao atacar, escolha uma unidade inimiga e prepare um tiro de 1 de dano antes dos golpes.',pirate);
unit('caveira-corsair','Corsário da Corda','north',2,2,1,'Pirata. Elusivo.',{...pirate,keyword:'elusive'});
unit('caveira-barrel','Marujo do Barril de Pólvora','east',2,1,2,'Pirata. Ao morrer, prepare uma explosão de 1 de dano a todas as outras unidades.',pirate);
unit('caveira-carpenter','Carpinteiro do Casco','north',2,1,3,'Pirata. Ao entrar, cure 2 do seu Vínculo.',pirate);
unit('caveira-guard','Guarda do Baú Afundado','north',3,1,4,'Pirata · Morto-vivo. Ao bloquear, ganha +2 de ataque durante aquele combate.',undead);
unit('caveira-diver','Mergulhador de Naufrágio','north',3,2,2,'Pirata. Ao entrar, pode devolver um equipamento do seu descarte à mão.',pirate);
unit('caveira-shark','Tubarão','north',3,3,2,'Ao entrar, pode preparar uma mordida de 2 de dano contra uma unidade inimiga ferida.',{entryTarget:{...wounded,min:0},entrySpell:'caveira-bite'});
unit('caveira-megalodon','Megalodonte','north',7,6,7,'Quando bloqueado, prepare uma investida de 2 de dano contra seu bloqueador antes dos golpes.',{unique:true});

spell('caveira-reinforcements','Reforços do General',4,'slow',noTarget,{type:'summon',unit:'caveira-pirate',count:2},'Invoque até 2 Esqueletos Piratas, conforme o espaço livre.','north');
spell('caveira-song','Cantiga de Abordagem',3,'fast',enemy,{type:'stun'},'Música. Atordoe uma unidade inimiga até o fim da rodada.','north');
catalog['caveira-song'].music=true;
spell('caveira-curse','Maldição do Osso Roído',3,'fast',enemy,{type:'weaken',amount:2,nextRound:true},'Dê −2 de ataque a uma unidade inimiga até o fim da próxima rodada, mínimo zero.','east');
catalog['caveira-sword']={id:'caveira-sword',name:'Espada Flamejante',kind:'equipment',regions:['east'],cost:3,damage:2,text:'Arma. Seus golpes com esta arma causam +2 de dano.',...enemyOnly};

spell('caveira-remendado-death','Tripulação Reerguida',0,'fast',noTarget,{type:'summon',unit:'caveira-pirate',count:1},'Invoque um Esqueleto Pirata.');
spell('caveira-plunder','Saque do Convés',0,'fast',noTarget,{type:'steal',amount:1},'Roube a última carta do deck inimigo.');
spell('caveira-repair','Reparo do Casco',0,'fast',allyNexus,{type:'heal',amount:2},'Cure 2 do seu Vínculo.');
spell('caveira-shot','Tiro de Bombordo',0,'fast',enemy,{type:'damage',amount:1},'Cause 1 de dano a uma unidade inimiga.');
spell('caveira-blast','Explosão de Pólvora',0,'fast',noTarget,{type:'damage',amount:1},'Cause 1 de dano a todas as unidades.');
catalog['caveira-blast'].area='all-units';
spell('caveira-bite','Mordida do Tubarão',0,'fast',wounded,{type:'damage',amount:2},'Cause 2 de dano a uma unidade inimiga ferida.');
spell('caveira-charge','Investida do Megalodonte',0,'fast',enemy,{type:'damage',amount:2},'Cause 2 de dano ao bloqueador.');

export const caveiraCatalog={...catalog,...jupiterCatalog};
const crew=['caveira-pirate','caveira-marujo','caveira-saqueador','caveira-song','caveira-corsair','caveira-barrel','caveira-carpenter'];
const deck=(name:string,nexus:number,...support:string[])=>({name,nexus,cards:[...crew,...support]});
const caveiraDeckList={
 'caveira-crossing':deck('Travessia da Caveira Dourada',20,'caveira-cannon','disguise-self','caveira-shark'),
 'caveira-island':deck('Ilha da Caveira Dourada',20,'caveira-reinforcements','caveira-guard','heat-metal'),
 'caveira-duelist':deck('Esqueleto Duelista',25,'caveira-reinforcements','caveira-sword','caveira-guard','caveira-diver','caveira-duelist','heat-metal'),
 'caveira-megalodon':deck('Megalodonte',25,'caveira-cannon','caveira-guard','caveira-shark','caveira-megalodon','heat-metal','disguise-self'),
 'caveira-general':deck('General da Caveira Dourada',30,'caveira-reinforcements','caveira-sword','caveira-cannon','caveira-guard','caveira-diver','caveira-general','heat-metal','wall-fire'),
 'caveira-captain':deck('Capitão Osso Roído',30,'caveira-cannon','caveira-guard','caveira-reinforcements','caveira-shark','caveira-captain','caveira-curse','heat-metal','disguise-self'),
};
export const caveiraDecks={...caveiraDeckList,...jupiterDecks};
export type CaveiraDeck=keyof typeof caveiraDecks;
export function isCaveiraDeck(id:string|undefined):id is CaveiraDeck{return !!id&&Object.hasOwn(caveiraDecks,id);}
export function createCaveiraDeck(id:CaveiraDeck):CardInstance[]{
 return caveiraDecks[id].cards.flatMap((definitionId,i)=>[0,1].map(copy=>({definitionId,instanceId:`j2-${i}-${copy}`})));
}
