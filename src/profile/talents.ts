import type {Champion} from '../content/schema.js';
import {credit,masteryInfo,type Profile} from './profile.js';

export type TalentId='arcata-spark'|'arcata-life'|'arcata-study'|'arcata-discount'|'arcata-reserve'|'arcata-fireball'|'arcata-create'|'arcata-shield'|'arcata-retaliation'|'arcata-wall'|'arcata-hands'|'arcata-ember'|'arcata-heat'|'arcata-pulse'|'arcata-persist'|'abe-frame'|'abe-tools'|'abe-catalog'|'abe-economy'|'abe-project'|'abe-research'|'abe-masterpiece'|'abe-reinforcement'|'abe-calibration'|'abe-shared'|'abe-complete'|'abe-protection'|'abe-repair'|'abe-experienced'|'abe-inspiration'|'arsenal-i'|'arsenal-ii'|'arsenal-iii'|'arsenal-maintenance'|'martial-versatility'|'complete-arsenal'|'precautious-smith'|'grip-adjustment'|'recovered-arsenal'|'iron-constitution'|'warrior-stamina'|'campaign-armor'|'prepared-strike'|'calculated-switch'|'master-of-all';
export type TalentAllocation=Partial<Record<Champion,TalentId[]>>;
export interface Talent {id:TalentId;name:string;parent?:TalentId;minLevel?:number;text:string}
export const kylastTalents:Talent[]=[
 {id:'arsenal-i',name:'Porte de Arsenal I',text:'Capacidade de 3 armas.'},
 {id:'arsenal-ii',name:'Porte de Arsenal II',parent:'arsenal-i',text:'Capacidade de 4 armas.'},
 {id:'arsenal-iii',name:'Porte de Arsenal III',parent:'arsenal-ii',text:'Capacidade de 5 armas.'},
 {id:'arsenal-maintenance',name:'Manutenção de Arsenal',parent:'arsenal-iii',text:'Primeiro equipamento que voltar à sua mão em cada rodada custa 1 a menos para reequipar naquela rodada.'},
 {id:'martial-versatility',name:'Versatilidade Marcial',parent:'arsenal-maintenance',text:'Uma vez por rodada, equipar em Kylast uma arma diferente das que já carrega concede +1 de ataque nessa rodada.'},
 {id:'complete-arsenal',name:'Arsenal Completo',parent:'martial-versatility',minLevel:30,text:'Capacidade de 6 armas.'},
 {id:'precautious-smith',name:'Armeiro Precavido',parent:'arsenal-i',text:'No início da batalha, compre um equipamento do deck.'},
 {id:'grip-adjustment',name:'Ajuste de Empunhadura',parent:'precautious-smith',text:'Primeiro equipamento colocado em Kylast na batalha custa 1 mana a menos.'},
 {id:'recovered-arsenal',name:'Arsenal Recuperado',parent:'grip-adjustment',text:'Uma vez por batalha, quando Kylast entra em campo, compre um equipamento do deck.'},
 {id:'iron-constitution',name:'Constituição de Ferro',parent:'arsenal-ii',text:'+1 de vida base de Kylast nas duas formas.'},
 {id:'warrior-stamina',name:'Fôlego de Guerreiro',parent:'iron-constitution',text:'Uma vez por batalha, ao sobreviver a dano, Kylast recupera 2 de vida.'},
 {id:'campaign-armor',name:'Armadura de Campanha',parent:'warrior-stamina',text:'Primeira entrada de Kylast na batalha concede +2 de vida como efeito de armadura.'},
 {id:'prepared-strike',name:'Golpe Preparado',parent:'arsenal-iii',text:'Primeiro golpe do primeiro ataque de Kylast na batalha recebe +1 de dano.'},
 {id:'calculated-switch',name:'Troca Calculada',parent:'prepared-strike',text:'Evoluído, usar armas diferentes nos dois golpes concede +1 de dano ao segundo.'},
 {id:'master-of-all',name:'Mestre de Todas',parent:'calculated-switch',text:'Ao evoluir, Kylast recebe +1 de ataque permanente naquela batalha.'},
];
export const abeTalents:Talent[]=[
 {id:'abe-frame',name:'Estrutura Reforçada',text:'Abe recebe +1 de vida base.'},
 {id:'abe-tools',name:'Ferramentas Preparadas',parent:'abe-frame',text:'No início da batalha, compre um Upgrade do deck, se houver.'},
 {id:'abe-catalog',name:'Catálogo Ampliado',parent:'abe-tools',text:'Fabricações oferecem os quatro Upgrades existentes.'},
 {id:'abe-economy',name:'Montagem Econômica',parent:'abe-catalog',text:'Primeiro Upgrade jogado por rodada custa 1 a menos, mínimo 1.'},
 {id:'abe-project',name:'Projeto Eficiente',parent:'abe-economy',text:'Primeiro Projeto de Melhoria da batalha custa 1 a menos.'},
 {id:'abe-research',name:'Pesquisa Aplicada',parent:'abe-project',text:'Ao resolver o terceiro Upgrade da batalha, compre uma carta.'},
 {id:'abe-masterpiece',name:'Obra-Prima',parent:'abe-research',minLevel:30,text:'Na primeira fabricação da batalha, escolha dois Upgrades distintos entre as opções.'},
 {id:'abe-reinforcement',name:'Reforço Inicial',parent:'abe-tools',text:'Primeiro Upgrade resolvido na batalha concede também +1 de vida máxima ao alvo, sem curar.'},
 {id:'abe-calibration',name:'Calibração Ofensiva',parent:'abe-reinforcement',text:'Primeiro Upgrade resolvido por rodada concede também +1 de ataque ao alvo naquela rodada.'},
 {id:'abe-shared',name:'Engenharia Compartilhada',parent:'abe-calibration',text:'Ao melhorar a terceira unidade diferente da batalha, compre uma carta, uma vez.'},
 {id:'abe-complete',name:'Aperfeiçoamento Completo',parent:'abe-shared',text:'Primeira unidade que receber três Upgrades na batalha ganha +1/+1 adicional, sem curar.'},
 {id:'abe-protection',name:'Proteção de Oficina',parent:'abe-frame',text:'Primeira entrada de Abe concede a ele +2 de vida como armadura.'},
 {id:'abe-repair',name:'Autorreparável',parent:'abe-protection',text:'Primeiro Upgrade aliado resolvido por rodada cura 1 de Abe, se estiver em campo.'},
 {id:'abe-experienced',name:'Inventor Experiente',parent:'abe-repair',text:'Ao evoluir, Abe recebe +1/+1 adicional, preservando o dano sofrido.'},
 {id:'abe-inspiration',name:'Inspiração Renovada',parent:'abe-experienced',text:'Ao evoluir pela primeira vez na batalha, Abe fabrica um Upgrade.'},
];
export const arcataTalents:Talent[]=[
 {id:'arcata-spark',name:'Faísca Inicial',text:'Na abertura da batalha, compre uma magia de Fogo do deck, se houver.'},
 {id:'arcata-life',name:'Fôlego da Fornalha',text:'Arcata tem +1 de vida base.',parent:'arcata-spark'},
 {id:'arcata-study',name:'Estudo das Chamas',text:'Ao resolver a terceira magia de Fogo da batalha, compre uma carta.',parent:'arcata-life'},
 {id:'arcata-discount',name:'Ignição Econômica',text:'A primeira magia de Fogo jogada na batalha custa 1 a menos, mínimo 1.',parent:'arcata-study'},
 {id:'arcata-reserve',name:'Chama Reservada',text:'Quando Arcata evolui pela primeira vez, recupere 1 de mana de magia, respeitando o limite.',parent:'arcata-discount'},
 {id:'arcata-fireball',name:'Bola de Fogo Preparada',text:'A primeira Bola de Fogo jogada na batalha custa 1 a menos.',parent:'arcata-reserve'},
 {id:'arcata-create',name:'Fornalha Viva',text:'Ao evoluir pela primeira vez, crie um Controlar Chamas na mão.',parent:'arcata-fireball'},
 {id:'arcata-shield',name:'Escudo Reforçado',text:'O primeiro Escudo de Fogo resolvido concede +1 de vida máxima ao protegido.',parent:'arcata-life'},
 {id:'arcata-retaliation',name:'Retaliação Quente',text:'A primeira retaliação de Escudo de Fogo na batalha causa +1 de dano.',parent:'arcata-shield'},
 {id:'arcata-wall',name:'Parede Sufocante',text:'A primeira Parede de Fogo dá −2 de ataque às sobreviventes em vez de −1.',parent:'arcata-retaliation'},
 {id:'arcata-hands',name:'Mãos Precisas',text:'As primeiras Mãos Flamejantes causam +1 de dano se você escolher exatamente um alvo.',parent:'arcata-wall'},
 {id:'arcata-ember',name:'Brasa Firme',text:'A primeira Combustão dá +1 de ataque a Arcata até o fim da rodada.',parent:'arcata-spark'},
 {id:'arcata-heat',name:'Calor Crescente',text:'Na segunda Combustão da batalha, compre uma carta.',parent:'arcata-ember'},
 {id:'arcata-pulse',name:'Pulso da Fornalha',text:'A primeira Combustão com Arcata evoluído causa 2 de dano ao Vínculo em vez de 1.',parent:'arcata-heat'},
 {id:'arcata-persist',name:'Chama Persistente',text:'A primeira Combustão com Arcata evoluído também causa 1 de dano à unidade inimiga com menos vida.',parent:'arcata-pulse',minLevel:30},
];
export function talentsFor(hero:Champion):Talent[]{return hero==='kylast'?kylastTalents:hero==='abe'?abeTalents:hero==='arcata'?arcataTalents:[];}
export function getTalents(profile:Profile):TalentAllocation {return profile.talents??{};}
function assertEditable(profile:Profile,hero:Champion,runActive:boolean){
 if(runActive)throw Error('Talentos só podem ser alterados fora da run.');
 if(!profile.collection[hero]?.count)throw Error('Protagonista bloqueado.');
 if(!talentsFor(hero).length)throw Error('Árvore de talentos em preparação.');
}
export function allocateTalent(profile:Profile,hero:Champion,id:TalentId,runActive:boolean,now:number):Profile {
 assertEditable(profile,hero,runActive);
 const node=talentsFor(hero).find(t=>t.id===id),owned=getTalents(profile)[hero]??[],info=masteryInfo(profile.mastery[hero].xp);
 if(!node)throw Error('Talento desconhecido.');
 if(owned.includes(id))throw Error('Talento já adquirido.');
 if(node.parent&&!owned.includes(node.parent))throw Error('Adquira o talento anterior.');
 if(info.level<(node.minLevel??1))throw Error('Maestria 30 necessária.');
 if(owned.length>=info.points)throw Error('Pontos de talento insuficientes.');
 const p=structuredClone(profile);p.talents={...getTalents(p),[hero]:[...owned,id]};
 return p;
}
export function resetTalents(profile:Profile,hero:Champion,runActive:boolean,now:number):Profile {
 assertEditable(profile,hero,runActive);
 if(!(getTalents(profile)[hero]?.length))throw Error('Nenhum talento para redistribuir.');
 const p=structuredClone(profile);credit(p,-200,`Redistribuição de talentos: ${hero==='abe'?'Abe':hero==='arcata'?'Arcata':'Kylast'}`,now);p.talents={...getTalents(p),[hero]:[]};return p;
}
