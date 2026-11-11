import type {CardCatalog,CardDefinition,CardEffect,Region,TargetRule} from './schema.js';
import type {CardInstance} from '../battle/types.js';
const ally:TargetRule={kind:'unit',side:'ally',min:1,max:1};
const enemy:TargetRule={kind:'unit',side:'enemy',min:1,max:1};
const none:TargetRule={kind:'unit',side:'ally',min:0,max:0};
const nexus:TargetRule={kind:'nexus',side:'enemy',min:1,max:1};
const cards:CardCatalog={};
function unit(id:string,name:string,cost:number,attack:number,health:number,region:Region,text:string,extra:Partial<CardDefinition>={}){
 cards[id]={id,name,kind:'unit',cost,attack,health,regions:[region],text,collectible:false,enemyOnly:true,expansion:id,...extra} as CardDefinition;
}
function spell(id:string,name:string,cost:number,speed:'fast'|'slow',target:TargetRule,effect:CardEffect,region?:Region,extra:Partial<CardDefinition>={}){
 cards[id]={id,name,kind:'spell',cost,speed,target,effect,collectible:false,...(region?{regions:[region],enemyOnly:true,expansion:id}:{}),...extra} as CardDefinition;
}
unit('lab-vigia-de-corda','Vigia de Corda',1,1,2,'south','Experimento.',{experiment:true});
unit('lab-coletor-de-sucata','Coletor de Sucata',2,2,2,'south','Experimento. Ao entrar, compre uma carta se outra unidade aliada foi derrotada nesta rodada.',{experiment:true,entrySpell:'lab-collector-draw'});
unit('lab-assistente-de-suturas','Assistente de Suturas',2,1,3,'south','Experimento. Ao entrar, cure 1 de uma unidade aliada escolhida.',{experiment:true,entryTarget:ally,entrySpell:'lab-assistant-heal'});
unit('lab-cobaia-reforcada','Cobaia Reforçada',3,2,4,'south','Experimento. No primeiro Upgrade que receber por rodada, ganhe +1 ataque adicional.',{experiment:true});
unit('lab-servidor-criogenico','Servidor Criogênico',3,2,3,'east','Experimento. Ao entrar, dê -1 ataque a um inimigo nesta rodada, mínimo zero.',{experiment:true,entryTarget:{...enemy,min:0},entrySpell:'lab-cryo-entry'});
unit('lab-automato-de-contencao','Autômato de Contenção',4,2,6,'east','Experimento.',{experiment:true});
unit('lab-prototipo-instavel','Protótipo Instável',4,4,3,'south','Experimento. Ao morrer, cause 1 dano a todas as outras unidades de ambos os lados.',{experiment:true});
unit('lab-carrasco-de-engrenagens','Carrasco de Engrenagens',6,5,6,'east','Experimento. Ao declarar ataque equipado, cause 1 dano ao Vínculo inimigo.',{experiment:true});
spell('lab-incisao-experimental','Incisão Experimental',1,'fast',ally,{type:'surgery',amount:1,attack:2},'south',{upgrade:true,text:'Upgrade. Cause 1 dano a um aliado; se sobreviver, conceda +2 ataque.'});
spell('lab-placas-de-contencao','Placas de Contenção',2,'fast',ally,{type:'armor',amount:3},'south',{kind:'armor',upgrade:true,text:'Upgrade. Conceda +3 vida máxima, sem curar.'});
spell('lab-reflexos-alterados','Reflexos Alterados',2,'fast',ally,{type:'keyword',keyword:'quick',temporary:true},'south',{upgrade:true,failIfKeywordPresent:true,text:'Upgrade. Conceda Ataque Rápido nesta rodada. Falha para progresso se já possuir.'});
spell('lab-cirurgia-reconstrutiva','Cirurgia Reconstrutiva',3,'slow',ally,{type:'buff',attack:1,health:2},'south',{upgrade:true,text:'Upgrade. Conceda +1 ataque e +2 vida máxima, sem curar.'});
spell('lab-jato-criogenico','Jato Criogênico',2,'fast',enemy,{type:'weaken',amount:3},'east',{text:'Dê -3 ataque a um inimigo nesta rodada, mínimo zero.'});
spell('lab-descarga-de-bobina','Descarga de Bobina',2,'fast',enemy,{type:'damage',amount:2},'east',{text:'Cause 2 dano a uma unidade inimiga.'});
spell('lab-sobrecarga-forcada','Sobrecarga Forçada',3,'fast',ally,{type:'surgery',amount:1,attack:3,temporary:true,quick:true},'south',{upgrade:true,text:'Upgrade. Cause 1 dano a um aliado; se sobreviver, conceda +3 ataque e Ataque Rápido nesta rodada.'});
spell('lab-pulso-do-laboratorio','Pulso do Laboratório',5,'slow',none,{type:'damage',amount:2},'east',{area:'all-units',text:'Cause 2 dano a todas as unidades de ambos os lados.'});
for(const [id,name,cost,damage,region,text] of [
 ['lab-bisturi-mecanico','Bisturi Mecânico',1,1,'south','Upgrade. Arma +1 dano.'],
 ['lab-braco-de-pistao','Braço de Pistão',3,3,'south','Upgrade. Arma +3 dano. Após terminar um ataque usando esta arma, cause 1 dano ao portador.'],
 ['lab-lanca-criogenica','Lança Criogênica',3,1,'east','Upgrade. Arma +1 dano. Ao atacar, dê -2 ataque ao próprio bloqueador nesta rodada antes dos golpes.'],
 ['lab-lamina-de-bobina','Lâmina de Bobina',4,2,'east','Upgrade. Arma +2 dano. Na primeira declaração de ataque por rodada usando esta arma, cause 1 dano ao Vínculo inimigo.'],
] as const)cards[id]={id,name,kind:'equipment',cost,damage,regions:[region],upgrade:true,enemyOnly:true,collectible:false,expansion:id,text};
unit('enemy-labotomia','Labotomia',3,2,4,'south','Uma vez por rodada: Cirurgia (0 mana), usando ação e permitindo resposta.',{unique:true,encounterSpecial:'labotomia'});
unit('enemy-tornado','Tornado',3,1,5,'east','Meu poder exige minha presença em campo.',{unique:true,encounterSpecial:'tornado'});
unit('enemy-dianamite','Dianamite',4,3,5,'south','Meu poder exige minha presença em campo.',{unique:true,encounterSpecial:'dianamite'});
unit('enemy-felix','Dr. Félix',5,2,6,'south','Evoluo após presenciar quatro Upgrades aliados resolvidos com sucesso: 4/8. Evoluído, seus Experimentos têm +1 ataque enquanto estou em campo.',{unique:true,encounterSpecial:'felix'});
spell('lab-collector-draw','Reciclagem do Coletor',0,'fast',none,{type:'buff',attack:0},undefined,{draw:1,expansion:'lab-coletor-de-sucata'});
spell('lab-assistant-heal','Sutura',0,'fast',ally,{type:'heal',amount:1});
spell('lab-cryo-entry','Frio do Servidor',0,'fast',enemy,{type:'weaken',amount:1});
spell('lab-prototype-death','Explosão do Protótipo',0,'fast',none,{type:'damage',amount:1},undefined,{area:'all-units'});
spell('lab-executioner-nexus','Ataque do Carrasco',0,'fast',nexus,{type:'damage',amount:1});
spell('lab-piston-recoil','Recuo do Pistão',0,'fast',ally,{type:'damage',amount:1});
spell('lab-lance-weaken','Frio da Lança',0,'fast',enemy,{type:'weaken',amount:2});
spell('lab-coil-nexus','Descarga da Lâmina',0,'fast',nexus,{type:'damage',amount:1});
spell('lab-surgery','Cirurgia de Labotomia',0,'fast',ally,{type:'surgery',amount:1,attack:2},undefined,{upgrade:true});
spell('lab-tornado-entry','Gelo de Tornado',0,'fast',enemy,{type:'weaken',amount:2});
spell('lab-king-discharge','Descarga do Rei',0,'fast',none,{type:'damage',amount:1},undefined,{area:'enemies'});
spell('lab-dianamite-recoil','Desgaste de Dianamite',0,'fast',ally,{type:'damage',amount:1});
const tags:Record<string,string>={'lab-coletor-de-sucata':'lab-collector','lab-assistente-de-suturas':'lab-assistant','lab-servidor-criogenico':'lab-cryo-server','lab-cobaia-reforcada':'lab-guinea-pig','lab-prototipo-instavel':'lab-prototype','lab-carrasco-de-engrenagens':'lab-executioner','lab-braco-de-pistao':'lab-piston','lab-lanca-criogenica':'lab-lance','lab-lamina-de-bobina':'lab-coil'};
for(const [id,tag] of Object.entries(tags))cards[id].expansion=tag;
export const felixCatalog:CardCatalog=cards;
const ids=['vigia-de-corda','coletor-de-sucata','assistente-de-suturas','cobaia-reforcada','servidor-criogenico','automato-de-contencao','prototipo-instavel','carrasco-de-engrenagens','incisao-experimental','placas-de-contencao','reflexos-alterados','cirurgia-reconstrutiva','jato-criogenico','descarga-de-bobina','sobrecarga-forcada','pulso-do-laboratorio','bisturi-mecanico','braco-de-pistao','lanca-criogenica','lamina-de-bobina'];
const select=(indices:number[],special?:string)=>[...indices.map(n=>`lab-${ids[n-1]}`),...(special?[`enemy-${special}`]:[])];
export const enemyDeckLists={
 patrol:select([1,2,4,6,8,10,14,17,18,20]),
 cryo:select([1,2,3,5,6,10,13,14,17,19]),
 unstable:select([1,2,3,4,7,9,11,14,15,18]),
 coils:select([1,2,6,8,9,11,14,17,19,20]),
 infirmary:select([1,2,3,4,6,9,10,12,14,17]),
 discharge:select([1,2,3,5,6,7,10,13,14,16]),
 labotomia:select([1,2,3,4,6,9,10,11,12,14,17,18],'labotomia'),
 tornado:select([1,2,3,5,6,8,10,12,13,14,17,19],'tornado'),
 dianamite:select([1,2,3,4,7,8,9,11,14,15,17,20],'dianamite'),
 felix:select([1,2,3,4,5,6,7,9,10,11,12,15,17,18],'felix'),
 king:select([1,2,3,4,5,6,7,8,10,12,13,14,16,19,20]),
};
export type EnemyDeckVariant=keyof typeof enemyDeckLists;
export function createEnemyDeck(variant:EnemyDeckVariant,prefix:string):CardInstance[]{
 return enemyDeckLists[variant].flatMap((definitionId,i)=>[0,1].map(copy=>({definitionId,instanceId:`${prefix}-${i}-${copy}`})));
}

