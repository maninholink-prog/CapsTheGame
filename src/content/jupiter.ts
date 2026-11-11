import type {CardCatalog,CardDefinition,CardEffect,Region,TargetRule} from './schema.js';
import type {CardInstance} from '../battle/types.js';

const catalog:CardCatalog={};
const enemy:TargetRule={kind:'unit',side:'enemy',min:1,max:1};
const wounded:TargetRule={...enemy,wounded:true};
const alliedWounded:TargetRule={kind:'unit',side:'ally',wounded:true,min:0,max:1};
const none:TargetRule={...enemy,min:0,max:0};
const enemyOnly={enemyOnly:true,collectible:false,expansion:'jupiter'};
function unit(id:string,name:string,region:Region,cost:number,attack:number,health:number,text:string,options:Partial<CardDefinition>={}){catalog[id]={id,name,kind:'unit',regions:[region],cost,attack,health,text,...enemyOnly,...options} as CardDefinition;}
function spell(id:string,name:string,region:Region,cost:number,speed:'fast'|'slow',target:TargetRule,effect:CardEffect,text:string){catalog[id]={id,name,kind:'spell',regions:[region],cost,speed,target,effect,text,...enemyOnly};}

unit('jupiter-rat','Rato da Lavoura','north',1,1,1,'Rato.');
unit('jupiter-burrower','Rato Escavador','south',2,2,1,'Rato. Elusivo.',{keyword:'elusive'});
unit('jupiter-gnawer','Rato Roedor','north',2,2,1,'Rato. Ao entrar, prepara uma mordida respondível de 1 de dano contra uma unidade inimiga ferida.',{entryTarget:{...wounded,min:0},entrySpell:'jupiter-bite'});
unit('jupiter-scavenger','Rato Catador','north',2,1,2,'Rato. Ao entrar, compre uma carta.',{entryDraw:1});
spell('jupiter-rat-brood','Ninhada de Ratos','north',3,'slow',none,{type:'summon',unit:'jupiter-rat',count:2},'Invoque até 2 Ratos da Lavoura.');
unit('jupiter-scout','Rato Batedor','south',2,1,3,'Rato. Ao entrar, dê −1 de ataque a uma unidade inimiga até o fim da rodada.',{entryTarget:enemy,entrySpell:'jupiter-weaken-1'});
unit('jupiter-raider','Rato Saqueador','west',3,2,2,'Rato. Ao entrar, pode devolver uma unidade aliada ferida à mão do dono.',{entryTarget:alliedWounded,entrySpell:'jupiter-raider-return'});
unit('jupiter-fierce-rat','Rato Feroz','south',3,3,2,'Rato. Ataque Rápido.',{keyword:'quick'});
spell('jupiter-pack-bite','Mordida em Bando','south',2,'fast',enemy,{type:'damage',amount:1},'Cause 1 de dano a uma unidade inimiga.');
unit('jupiter-watch-rat','Rato Vigia','north',3,2,3,'Rato. Ao entrar, dê −2 de ataque a uma unidade inimiga até o fim da rodada.',{entryTarget:enemy,entrySpell:'jupiter-weaken-2'});

unit('jupiter-scarab','Escaravelho de Casco','south',2,1,4,'Escaravelho.');
unit('jupiter-winged','Escaravelho Alado','east',2,2,1,'Escaravelho. Elusivo.',{keyword:'elusive'});
unit('jupiter-sprout','Escaravelho Broto','south',3,2,3,'Escaravelho. Último suspiro: invoque uma Larva de Escaravelho se houver espaço.',{deathSpell:'jupiter-sprout-death'});
unit('jupiter-larva','Larva de Escaravelho','south',1,1,1,'Escaravelho.');
spell('jupiter-protective-shell','Casca Protetora','west',2,'fast',{kind:'unit',side:'ally',min:1,max:1},{type:'buff',attack:0,health:2,temporary:true},'Conceda +2 de vida a uma unidade aliada até o fim da rodada.');
unit('jupiter-chisel','Escaravelho Cinzelador','east',3,2,3,'Escaravelho. Ao entrar, dê −2 de ataque a uma unidade inimiga até o fim da rodada.',{entryTarget:enemy,entrySpell:'jupiter-weaken-2'});
unit('jupiter-shield-beetle','Besouro Escudo','east',3,2,3,'Escaravelho. Ataque Rápido.',{keyword:'quick'});
unit('jupiter-digger','Escaravelho Escavador','south',3,2,3,'Escaravelho. Ao entrar, compre uma carta.',{entryDraw:1});
spell('jupiter-hardened-shell','Carapaça Reforçada','east',3,'fast',{kind:'unit',side:'ally',min:1,max:1},{type:'buff',attack:2,health:2,temporary:true},'Conceda +2/+2 a uma unidade aliada até o fim da rodada.');
spell('jupiter-swarm','Enxame de Escaravelhos','south',3,'slow',none,{type:'summon',unit:'jupiter-larva',count:2},'Invoque até 2 Larvas de Escaravelho.');

unit('jupiter-pool-hunter','Caçador de Poças','north',2,2,2,'Criatura aquática.');
unit('jupiter-eel','Enguia de Corrente','east',3,2,2,'Criatura aquática. Ataque Rápido.',{keyword:'quick'});
unit('jupiter-wounded-predator','Predador de Feridos','north',4,3,3,'Criatura aquática. Ao entrar, prepara 2 de dano respondível contra unidade inimiga ferida.',{entryTarget:{...wounded,min:0},entrySpell:'jupiter-aqua-bite'});
spell('jupiter-school-bite','Cardume Cortante','east',2,'fast',wounded,{type:'damage',amount:2},'Cause 2 de dano a uma unidade inimiga ferida.');
spell('jupiter-whirlpool','Redemoinho','east',2,'fast',enemy,{type:'weaken',amount:2},'Dê −2 de ataque a uma unidade inimiga até o fim da rodada.');
unit('jupiter-moray','Moreia da Caverna','north',4,3,4,'Criatura aquática. Ao entrar, compre uma carta.',{entryDraw:1});
unit('jupiter-crab','Caranguejo de Rocha','west',3,1,4,'Criatura aquática. Elusivo.',{keyword:'elusive'});
unit('jupiter-crevice-octopus','Polvo das Fendas','south',4,3,4,'Criatura aquática. Último suspiro: invoque uma cópia de si se houver espaço.',{deathSpell:'jupiter-octopus-death'});
unit('jupiter-ray','Arraia das Profundezas','east',4,3,3,'Criatura aquática. Ao entrar, dê −2 de ataque a uma unidade inimiga até o fim da rodada.',{entryTarget:enemy,entrySpell:'jupiter-weaken-2'});
spell('jupiter-backwash','Ressaca','west',3,'slow',wounded,{type:'recall'},'Retorne uma unidade inimiga ferida à mão do dono.');

unit('jupiter-kraken','Kraken Filhote','north',7,6,7,'Kraken. Ao entrar, prepara Tentacleada respondível de 2 de dano contra uma unidade inimiga.',{unique:true,rarity:'legendary',entryTarget:{...enemy,min:0},entrySpell:'jupiter-tentacle-strike'});
spell('jupiter-tentacle-strike','Tentacleada','north',2,'fast',enemy,{type:'damage',amount:2},'Cause 2 de dano a uma unidade inimiga.');
spell('jupiter-grab','Agarrão','south',3,'fast',enemy,{type:'recall'},'Retorne uma unidade inimiga à mão do dono.');
spell('jupiter-ink','Jato de Tinta','east',2,'fast',enemy,{type:'weaken',amount:2},'Dê −2 de ataque a uma unidade inimiga até o fim da rodada.');
unit('jupiter-tentacle','Tentáculo do Kraken','north',3,2,3,'Kraken. Último suspiro: invoque uma cópia de si se houver espaço.',{deathSpell:'jupiter-tentacle-death'});

spell('jupiter-bite','Mordida','north',0,'fast',wounded,{type:'damage',amount:1},'Cause 1 de dano a uma unidade inimiga ferida.');
spell('jupiter-aqua-bite','Mordida das Profundezas','north',0,'fast',wounded,{type:'damage',amount:2},'Cause 2 de dano a uma unidade inimiga ferida.');
spell('jupiter-sprout-death','Último Suspiro: Escaravelho','south',0,'fast',none,{type:'summon',unit:'jupiter-larva',count:1},'Invoque uma Larva de Escaravelho.');
spell('jupiter-octopus-death','Último Suspiro: Polvo','south',0,'fast',none,{type:'summon',unit:'jupiter-crevice-octopus',count:1},'Invoque um Polvo das Fendas.');
spell('jupiter-tentacle-death','Último Suspiro: Tentáculo','north',0,'fast',none,{type:'summon',unit:'jupiter-tentacle',count:1},'Invoque um Tentáculo do Kraken.');
spell('jupiter-weaken-1','Investida','north',0,'fast',enemy,{type:'weaken',amount:1},'Dê −1 de ataque a uma unidade inimiga até o fim da rodada.');
spell('jupiter-weaken-2','Correnteza','north',0,'fast',enemy,{type:'weaken',amount:2},'Dê −2 de ataque a uma unidade inimiga até o fim da rodada.');
spell('jupiter-raider-return','Resgate do Saqueador','west',0,'fast',{...alliedWounded,min:1},{type:'recall'},'Retorne uma unidade aliada ferida à mão do dono.');

export const jupiterCatalog=catalog;
export const jupiterDecks={
 'jupiter-road':{name:'Infestação na Estrada',nexus:20,cards:['jupiter-rat','jupiter-burrower','jupiter-gnawer','jupiter-scavenger','jupiter-scarab','jupiter-winged','jupiter-sprout','jupiter-larva','jupiter-protective-shell','jupiter-shield-beetle']},
 'jupiter-rats':{name:'Ratos da Plantação',nexus:20,cards:['jupiter-rat','jupiter-burrower','jupiter-gnawer','jupiter-scavenger','jupiter-rat-brood','jupiter-scout','jupiter-raider','jupiter-fierce-rat','jupiter-pack-bite','jupiter-watch-rat']},
 'jupiter-scarabs':{name:'Escaravelhos da Plantação',nexus:20,cards:['jupiter-scarab','jupiter-winged','jupiter-sprout','jupiter-larva','jupiter-protective-shell','jupiter-chisel','jupiter-shield-beetle','jupiter-digger','jupiter-hardened-shell','jupiter-swarm']},
 'jupiter-aquatic':{name:'Criaturas da Travessia',nexus:20,cards:['jupiter-pool-hunter','jupiter-eel','jupiter-wounded-predator','jupiter-school-bite','jupiter-whirlpool','jupiter-moray','jupiter-crab','jupiter-crevice-octopus','jupiter-ray','jupiter-backwash']},
 'jupiter-kraken':{name:'Kraken Filhote',nexus:30,cards:['jupiter-pool-hunter','jupiter-eel','jupiter-wounded-predator','jupiter-school-bite','jupiter-whirlpool','jupiter-moray','jupiter-crab','jupiter-crevice-octopus','jupiter-ray','jupiter-backwash','jupiter-kraken','jupiter-tentacle-strike','jupiter-grab','jupiter-ink','jupiter-tentacle']},
} as const;
export type JupiterDeck=keyof typeof jupiterDecks;
export function isJupiterDeck(id:string|undefined):id is JupiterDeck{return !!id&&Object.hasOwn(jupiterDecks,id);}
export function createJupiterDeck(id:JupiterDeck):CardInstance[]{return jupiterDecks[id].cards.flatMap((definitionId,i)=>[0,1].map(copy=>({definitionId,instanceId:`jp-${id}-${i}-${copy}`})));}
