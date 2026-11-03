import type {CardCatalog,CardDefinition,Champion,Region,Rarity,TargetRule,CardEffect} from './schema.js';
const ally:TargetRule={kind:'unit',side:'ally',min:1,max:1};
const enemy:TargetRule={kind:'unit',side:'enemy',min:1,max:1};
const none:TargetRule={kind:'unit',side:'ally',min:0,max:0};
const nexus:TargetRule={kind:'nexus',side:'ally',min:1,max:1};
const cards:CardCatalog={};
function troop(id:string,name:string,cost:number,attack:number,health:number,region:Region,rarity:Rarity,text:string,extra:Partial<CardDefinition>={}){
 cards[id]={id,name,kind:'unit',cost,attack,health,regions:[region],rarity,collectible:true,expansion:id,text,...extra} as CardDefinition;
}
function spell(id:string,name:string,cost:number,speed:'slow'|'fast',target:TargetRule,effect:CardEffect,extra:Partial<CardDefinition>={}){
 cards[id]={id,name,kind:'spell',cost,speed,target,effect,...extra} as CardDefinition;
}
function support(id:string,name:string,cost:number,speed:'slow'|'fast',target:TargetRule,effect:CardEffect,region:Region,rarity:Rarity,text:string,extra:Partial<CardDefinition>={}){
 spell(id,name,cost,speed,target,effect,{regions:[region],rarity,collectible:true,text,...extra});
}
const heroes: Array<[Champion,string,number,number,number,Region[],string]>=[
 ['youro','Youro',4,2,4,['south','north'],'Escolha Urso (+2 vida máxima, sem curar) ou Tigre (+2 ataque). Evoluo ao presenciar 4 mortes aliadas: 3/5 e bônus de forma +4.'],
 ['kuara','Kuara',3,2,3,['east','korakarom'],'Uma vez por rodada, ao atingir o Vínculo atacando, roube uma carta do fundo do deck inimigo. Evoluo após seu lado roubar 6 cartas: 3/4 e roubo duplo.'],
 ['thalion','Thalion',4,2,5,['south','east'],'Dissonância: sua primeira Música resolvida por rodada enquanto estou em campo causa 1 ao Vínculo inimigo por efeito respondível. Evoluo após 6 Músicas: 3/6 e dano adicional 2.'],
 ['lazaro','Lázaro',5,4,5,['north','west'],'Execução: seu primeiro abate por rodada enquanto estou em campo marca o inimigo mais fraco. No fim da rodada, execute minha vítima por efeito respondível. Evoluo ao presenciar 2 abates marcados: 5/6. Cada marcado abatido por seu lado enquanto estou em campo concede-me +1 ataque.'],
];
for(const [id,name,cost,attack,health,regions,text] of heroes)cards[id]={id,name,kind:'unit',champion:id,cost,attack,health,regions,rarity:'ultradimensional',text,expansion:id};

troop('cycle-guardian','Guardião do Ciclo',2,1,3,'south','common','Ao morrer, invoque um Broto Vivo 1/1, se houver espaço.');
troop('judite','Judite',1,1,2,'north','common','Ao entrar, pode dar +1 ataque a outro aliado nesta rodada. Permite resposta.',{entryTarget:{...ally,min:0},entrySpell:'judite-entry'});
troop('spirit-tiger','Tigre Espiritual',3,3,2,'south','rare','Quando outro aliado morre enquanto estou em campo, ganho +1 ataque nesta batalha.');
troop('baru','Baru',4,2,5,'north','legendary','Na primeira morte de outro aliado que presencio por rodada, conceda +1 vida máxima a todos os seus aliados sobreviventes, sem curar.');
troop('fire-elemental','Elemental de Fogo',5,4,4,'south','epic','Ao morrer, cause 1 dano de fogo a todas as unidades inimigas por efeito respondível.');
support('barkskin','Pele de Árvore',2,'fast',ally,{type:'armor',amount:3},'north','common','Conceda +3 vida máxima a um aliado, sem curar ou ocupar equipamento.',{kind:'armor'});
support('entangle','Entrelaçar',2,'fast',{...enemy,max:2},{type:'weaken',amount:2},'south','rare','Dê -2 ataque a até dois inimigos nesta rodada, mínimo zero.');
support('moonbeam','Raio Lunar',3,'fast',enemy,{type:'damage',amount:3},'north','rare','Cause 3 dano radiante a uma unidade inimiga.');
support('summon-beast','Convocar Fera',4,'slow',none,{type:'summon',unit:'spirit-tiger',count:1},'south','epic','Invoque um Tigre Espiritual, se houver espaço.');

troop('chapisco','Chapisco',1,1,2,'east','common','Ao entrar, pode dar -1 ataque a um inimigo nesta rodada.',{entryTarget:{...enemy,min:0},entrySpell:'chapisco-entry'});
troop('pocket-scout','Batedor de Bolsos',2,2,2,'east','common','Ao entrar, roube uma carta do fundo do deck inimigo. Sem carta, não aplica fadiga.',{entrySpell:'pocket-scout-entry'});
troop('living-wallet','Carteira Viva',2,1,3,'korakarom','rare','Ao morrer, roube uma carta do fundo do deck inimigo por efeito respondível, sem fadiga.');
troop('ymir','Ymir',4,2,4,'east','legendary','Na primeira vez por rodada que você roubar ao menos uma carta enquanto estou em campo, compre uma carta.');
troop('balimor','Balimor, o Panda',5,3,5,'korakarom','epic','Na primeira carta roubada que você resolver por rodada enquanto estou em campo, ganho +1 ataque/+1 vida máxima nesta batalha, sem curar.');
support('light-fingers','Mãos Ligeiras',2,'slow',none,{type:'steal',amount:1},'east','common','Roube uma carta do fundo do deck inimigo. Não pode jogar contra deck vazio.',{requiresEnemyDeck:true});
support('disguise-self','Disfarçar-se',2,'fast',ally,{type:'keyword',keyword:'elusive',temporary:true},'east','rare','Conceda Elusivo a um aliado nesta rodada.');
support('minor-illusion','Ilusão Menor',2,'fast',enemy,{type:'weaken',amount:2},'korakarom','common','Dê -2 ataque a um inimigo nesta rodada, mínimo zero.');
support('feather-fall','Queda Suave',1,'fast',ally,{type:'recall'},'east','rare','Devolva um aliado à mão.');

troop('illusory-instrument','Instrumento Ilusório',1,0,2,'south','common','Sua primeira Música jogada por rodada enquanto estou em campo custa 1 a menos, mínimo 1.');
troop('off-key-musician','Instrumentista Desafinado',2,1,3,'south','common','Sua primeira Música resolvida por rodada enquanto estou em campo concede-me +2 ataque nesta rodada.');
troop('brawling-satyr','Sátira Brigona',3,3,3,'east','rare','Ao entrar, pode dar -2 ataque a um inimigo nesta rodada.',{entryTarget:{...enemy,min:0},entrySpell:'brawling-satyr-entry'});
troop('guild-administrator','Administradora da Guilda',3,2,4,'south','rare','Ao entrar, compre a primeira Música encontrada no seu deck; sem Música, não compra nem aplica fadiga.');
troop('rock','Rock, o Barqueiro',4,2,5,'east','epic','Ao entrar, pode devolver outro aliado à mão; se devolver, compre uma carta.',{entryTarget:{...ally,min:0},entrySpell:'rock-entry'});
support('tashas-laughter','Risada de Tasha',3,'fast',enemy,{type:'stun'},'south','rare','Música. Atordoe um inimigo.',{music:true});
support('heat-metal','Esquentar Metal',2,'fast',enemy,{type:'damage',amount:1},'east','rare','Música. Fogo. Cause 1 dano a um inimigo; 2 se ele estiver equipado ao resolver.',{music:true,fire:true,dynamicDamage:'equipped'});
support('blindness','Cegueira',2,'fast',enemy,{type:'weaken',amount:3},'east','common','Música. Dê -3 ataque a um inimigo nesta rodada, mínimo zero.',{music:true});
support('charm-monster','Enfeitiçar Monstro',4,'slow',{...enemy,max:2},{type:'stun'},'south','epic','Música. Atordoe até dois inimigos distintos.',{music:true});
support('pride-curse','Maldição do Orgulho',4,'slow',enemy,{type:'damage',amount:0},'east','legendary','Música. Cause dano igual ao ataque atual do alvo, calculado ao resolver.',{music:true,dynamicDamage:'attack'});

troop('lyari','Lyari Amastacia',1,0,3,'north','common','Ao entrar, cure 1 de seu Vínculo por efeito respondível.',{entrySpell:'lyari-heal'});
troop('last-cry-acolyte','Acólito do Último Grito',2,2,3,'west','common','Quando seu lado abate um inimigo marcado por Execução, ganho +1 ataque nesta batalha.');
troop('nerion','Nerion Liadon',3,3,3,'west','epic','Ao entrar, sem marca ativa do seu lado, marque o inimigo mais fraco. No fim da rodada, execute minha vítima por efeito respondível.',{entrySpell:'nerion-mark'});
troop('shadow-steed','Corcel Sombrio',3,3,2,'west','rare','Ao entrar, se seu lado possuir um inimigo marcado por Execução, compre uma carta.');
troop('loumar','Loumar Valkren',4,3,5,'north','legendary','No primeiro abate inimigo marcado por seu lado por rodada enquanto estou em campo, cure 2 de seu Vínculo por efeito respondível.');
support('inflict-wounds','Infligir Ferimentos',3,'fast',enemy,{type:'damage',amount:3},'west','common','Cause 3 dano a um inimigo.');
cards['last-cry']={id:'last-cry',name:'Último Grito',kind:'equipment',cost:3,damage:2,expansion:'last-cry',regions:['west'],rarity:'epic',collectible:true,text:'Arma +2 dano. Ao golpear um inimigo marcado por Execução do seu lado usando esta arma, cause +1 dano integrado ao golpe.'};
support('shield-of-faith','Escudo da Fé',2,'fast',ally,{type:'armor',amount:3},'north','common','Conceda +3 vida máxima a um aliado, sem curar ou ocupar equipamento.',{kind:'armor'});
support('withering-smite','Punição Murchante',3,'fast',enemy,{type:'damage',amount:2},'north','rare','Cause 2 dano a um inimigo e dê -2 ataque nesta rodada se sobreviver.',{attackReduction:2});

spell('conjure-animals','Conjurar Animais',4,'slow',none,{type:'summon',unit:'spirit-wolf',count:2},{championCopy:'youro',text:'Invoque até dois Lobos Espirituais 2/2 conforme espaço. Embaralhe uma cópia de Youro no deck.'});
spell('kuara-magic-hands','Mãos Mágicas de Kuara',3,'slow',none,{type:'steal',amount:2,emptyFatigue:true},{championCopy:'kuara',text:'Faça duas tentativas de roubo do fundo do deck inimigo. Cada falta aplica a fadiga escalonável inimiga. Embaralhe uma cópia de Kuara no deck.'});
spell('vicious-mockery','Zombaria Viciosa',2,'fast',enemy,{type:'damage',amount:1},{championCopy:'thalion',music:true,attackReduction:2,text:'Música. Cause 1 dano e dê -2 ataque ao alvo nesta rodada. Embaralhe uma cópia de Thalion no deck.'});
spell('shadow-smite','Punição Sombria',4,'fast',enemy,{type:'kill-marked'},{championCopy:'lazaro',text:'Se o alvo estiver marcado por Execução do seu lado ao resolver, mate-o; caso contrário, cause 3 dano. Embaralhe uma cópia de Lázaro no deck.'});
for(const [id,name,attack,health] of [['living-sprout','Broto Vivo',1,1],['spirit-wolf','Lobo Espiritual',2,2]] as const)cards[id]={id,name,kind:'unit',cost:0,attack,health,collectible:false};
spell('judite-entry','Companheirismo de Judite',0,'fast',ally,{type:'buff',attack:1,temporary:true});
spell('chapisco-entry','Distração de Chapisco',0,'fast',enemy,{type:'weaken',amount:1});
spell('pocket-scout-entry','Roubo do Batedor',0,'fast',none,{type:'steal',amount:1});
spell('living-wallet-steal','Roubo da Carteira Viva',0,'fast',none,{type:'steal',amount:1});
spell('fire-elemental-death','Explosão do Elemental',0,'fast',none,{type:'damage',amount:1},{area:'enemies',fire:true});
spell('brawling-satyr-entry','Provocação da Sátira',0,'fast',enemy,{type:'weaken',amount:2});
spell('rock-entry','Travessia de Rock',0,'fast',ally,{type:'recall'},{afterRecallDraw:true});
spell('lyari-heal','Cuidado de Lyari',0,'fast',nexus,{type:'heal',amount:1});
spell('nerion-mark','Marca de Nerion',0,'fast',none,{type:'mark'});
spell('execution','Execução',0,'fast',enemy,{type:'execute'});
spell('loumar-heal','Cuidado de Loumar',0,'fast',nexus,{type:'heal',amount:2});
spell('thalion-dissonance','Dissonância de Thalion',0,'fast',{kind:'nexus',side:'enemy',min:1,max:1},{type:'damage',amount:1});
spell('guardian-sprout','Broto do Guardião',0,'fast',none,{type:'summon',unit:'living-sprout',count:1});
spell('kuara-strike','Pilantragem de Kuara',0,'fast',none,{type:'steal',amount:1});
spell('steed-entry','Presságio do Corcel',0,'fast',none,{type:'buff',attack:0},{draw:1});
export const expansionCatalog:CardCatalog=cards;
export const expansionStarters={
 youro:['youro','cycle-guardian','judite','spirit-tiger','baru','fire-elemental','barkskin','entangle','moonbeam','summon-beast'],
 kuara:['kuara','chapisco','pocket-scout','living-wallet','ymir','balimor','light-fingers','disguise-self','minor-illusion','feather-fall'],
 thalion:['thalion','illusory-instrument','off-key-musician','brawling-satyr','guild-administrator','rock','tashas-laughter','heat-metal','blindness','charm-monster','pride-curse'],
 lazaro:['lazaro','lyari','last-cry-acolyte','nerion','shadow-steed','loumar','inflict-wounds','last-cry','shield-of-faith','withering-smite'],
};
export const expansionPackages={youro:['youro','cycle-guardian','barkskin'],kuara:['kuara','pocket-scout','light-fingers'],thalion:['thalion','off-key-musician','tashas-laughter'],lazaro:['lazaro','last-cry-acolyte','inflict-wounds']};
export const expansionChampionSpells={youro:'conjure-animals',kuara:'kuara-magic-hands',thalion:'vicious-mockery',lazaro:'shadow-smite'};

