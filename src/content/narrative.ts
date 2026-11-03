import type {CardCatalog,TargetRule,Region} from './schema.js';
const ally:TargetRule={kind:'unit',side:'ally',min:1,max:1};
const enemy:TargetRule={kind:'unit',side:'enemy',min:1,max:1};
const none:TargetRule={kind:'unit',side:'ally',min:0,max:0};
const regional=(region:Region)=>({regions:[region],collectible:true});
const west=regional('west'),south=regional('south'),north=regional('north'),east=regional('east');
export const narrativeCatalog:CardCatalog={
 zacarias:{...west,id:'zacarias',rarity:'common',name:'Zacarias, Aprendiz de Gremin',kind:'unit',cost:1,attack:1,health:2,narrative:'zacarias',text:'Ao entrar, seu próximo Upgrade nesta rodada custa 1 a menos, mínimo 1.'},
 keegan:{...west,id:'keegan',rarity:'rare',name:'Keegan, Jovem Artífice',kind:'unit',cost:3,attack:2,health:4,narrative:'keegan',text:'Ao entrar, fabrique: escolha um entre três Upgrades.'},
 lucia:{...west,id:'lucia',rarity:'rare',name:'Lúcia, Inventora Curiosa',kind:'unit',cost:3,attack:2,health:3,narrative:'lucia',text:'Enquanto estou em campo, seu primeiro Upgrade resolvido por rodada compra uma carta.'},
 gremin:{...west,id:'gremin',rarity:'legendary',name:'Gremin Ironhold, Grande Artífice',kind:'unit',cost:5,attack:3,health:6,narrative:'gremin',text:'Seu primeiro Upgrade por rodada em outro aliado concede +1 de ataque/+1 de vida máxima adicional, sem curar.'},
 'enhanced-weapon':{...west,id:'enhanced-weapon',rarity:'common',name:'Arma Aprimorada',kind:'spell',cost:2,speed:'burst',target:ally,effect:{type:'buff',attack:2},upgrade:true,text:'Upgrade. Conceda +2 de ataque a um aliado nesta batalha.'},
 'enhanced-defense':{...west,id:'enhanced-defense',rarity:'common',name:'Defesa Aprimorada',kind:'armor',cost:2,speed:'fast',target:ally,effect:{type:'armor',amount:3},upgrade:true,text:'Upgrade. Conceda +3 de vida máxima, sem curar. Não ocupa equipamento.'},
 'flash-genius':{...south,id:'flash-genius',rarity:'rare',name:'Lampejo de Genialidade',kind:'spell',cost:2,speed:'fast',target:ally,effect:{type:'buff',attack:2,temporary:true},draw:1,upgrade:true,text:'Upgrade. Dê +2 de ataque nesta rodada a um aliado e compre uma carta.'},
 'arcata-raven':{...north,id:'arcata-raven',rarity:'common',name:'Corvo Familiar de Arcata',kind:'unit',cost:2,attack:1,health:1,entryDraw:1,text:'Ao entrar, compre uma carta.'},
 soarim:{...east,id:'soarim',rarity:'rare',name:'Soarim',kind:'unit',cost:2,attack:1,health:3,narrative:'soarim',text:'Ao entrar, sua próxima magia de Fogo nesta rodada custa 1 a menos, mínimo 1.'},
 salita:{...north,id:'salita',rarity:'rare',name:'Salita dos Sonhos',kind:'unit',cost:3,attack:1,health:4,narrative:'salita',text:'Sua primeira magia de Fogo resolvida por rodada, enquanto estou em campo, cura 1 de seu Vínculo.'},
 gwen:{...north,id:'gwen',rarity:'epic',name:'Gwen, da Corrente Quebrada',kind:'unit',cost:3,attack:2,health:4,entryTarget:{...ally,min:0},entrySpell:'gwen-entry',text:'Ao entrar, você pode devolver outra unidade aliada à mão. Permite resposta.'},
 kriv:{...east,id:'kriv',rarity:'legendary',name:'Kriv Khalmyr',kind:'unit',cost:5,attack:4,health:5,narrative:'kriv',text:'Sua primeira magia de Fogo resolvida por rodada, enquanto estou em campo, concede-me +2 de ataque nesta rodada.'},
 'control-flames':{...east,id:'control-flames',rarity:'rare',name:'Controlar Chamas',kind:'spell',cost:1,speed:'burst',target:none,effect:{type:'fire-boost',amount:1},fire:true,text:'Fogo. Sua próxima magia de Fogo que cause dano nesta rodada recebe +1 de dano por alvo.'},
 'fire-shield':{...east,id:'fire-shield',rarity:'epic',name:'Escudo de Fogo',kind:'armor',cost:3,speed:'fast',target:ally,effect:{type:'armor',amount:3},fire:true,fireShield:true,text:'Fogo. +3 vida máxima, sem curar. Nesta rodada, o primeiro inimigo que atingir o protegido com golpe sofre 2 de dano respondível.'},
 'wall-fire':{...east,id:'wall-fire',rarity:'epic',name:'Parede de Fogo',kind:'spell',cost:4,speed:'slow',target:none,area:'enemies',effect:{type:'damage',amount:1},attackReduction:1,fire:true,text:'Fogo. Causa 1 a todas as unidades inimigas e dá -1 de ataque às sobreviventes nesta rodada, mínimo zero.'},
 coroinha:{...north,id:'coroinha',rarity:'common',name:'Coroinha da Infância',kind:'unit',cost:1,attack:0,health:3,entryTarget:ally,entrySpell:'coroinha-heal',text:'Ao entrar, cure 1 de uma unidade aliada. Permite resposta.'},
 luise:{...east,id:'luise',rarity:'common',name:'Luise, a Bibliotecária',kind:'unit',cost:2,attack:1,health:2,entryDraw:1,text:'Ao entrar, compre uma carta.'},
 archibald:{...east,id:'archibald',rarity:'rare',name:'Archibald, o Comerciante',kind:'unit',cost:3,attack:2,health:4,narrative:'archibald',text:'Enquanto estou em campo, a primeira cura efetiva do seu lado por rodada compra uma carta.'},
 'faith-guardian':{...north,id:'faith-guardian',rarity:'rare',name:'Guardião da Fé',kind:'unit',cost:4,attack:2,health:6,narrative:'guardian',text:'Ao bloquear, cure 1 de seu Vínculo, uma vez por rodada por cópia. Permite resposta.'},
 mantum:{...north,id:'mantum',rarity:'epic',name:'Mantum',kind:'unit',cost:5,attack:2,health:6,narrative:'mantum',text:'No início da rodada, cure 1 de todas as suas unidades aliadas. Permite resposta.'},
 blessing:{...north,id:'blessing',rarity:'common',name:'Bênção',kind:'spell',cost:2,speed:'burst',target:{...ally,max:3},effect:{type:'buff',attack:1,temporary:true},text:'Dê +1 de ataque a até três aliados nesta rodada.'},
 aid:{...north,id:'aid',rarity:'rare',name:'Auxílio',kind:'armor',cost:3,speed:'fast',target:{...ally,max:2},effect:{type:'armor',amount:2},text:'Conceda +2 de vida máxima a até dois aliados, sem curar e sem ocupar equipamento.'},
 'sacred-flame':{...north,id:'sacred-flame',rarity:'rare',name:'Chama Sagrada',kind:'spell',cost:2,speed:'fast',target:enemy,effect:{type:'damage',amount:2},text:'Causa 2 de dano radiante a uma unidade inimiga. Não é Fogo.'},
 'gwen-entry':{id:'gwen-entry',name:'Portal de retirada de Gwen',kind:'spell',cost:0,speed:'fast',target:ally,effect:{type:'recall'}},
 'coroinha-heal':{id:'coroinha-heal',name:'Cuidado do Coroinha',kind:'spell',cost:0,speed:'fast',target:ally,effect:{type:'heal',amount:1}},
 'salita-heal':{id:'salita-heal',name:'Cura do Salita',kind:'spell',cost:0,speed:'fast',target:{kind:'nexus',side:'ally',min:1,max:1},effect:{type:'heal',amount:1}},
 'guardian-heal':{id:'guardian-heal',name:'Proteção do Guardião',kind:'spell',cost:0,speed:'fast',target:{kind:'nexus',side:'ally',min:1,max:1},effect:{type:'heal',amount:1}},
 'mantum-heal':{id:'mantum-heal',name:'Cura de Mantum',kind:'spell',cost:0,speed:'fast',target:none,area:'allies',effect:{type:'heal',amount:1}},
 'fire-retaliation':{id:'fire-retaliation',name:'Retaliação do Escudo de Fogo',kind:'spell',cost:0,speed:'fast',target:enemy,effect:{type:'damage',amount:2},fire:true},
};

