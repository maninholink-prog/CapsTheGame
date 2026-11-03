import type {Champion} from '../content/schema.js';
import {credit,masteryInfo,type Profile} from './profile.js';

export type TalentId='arsenal-i'|'arsenal-ii'|'arsenal-iii'|'arsenal-maintenance'|'martial-versatility'|'complete-arsenal'|'precautious-smith'|'grip-adjustment'|'recovered-arsenal'|'iron-constitution'|'warrior-stamina'|'campaign-armor'|'prepared-strike'|'calculated-switch'|'master-of-all';
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
export function getTalents(profile:Profile):TalentAllocation {return profile.talents??{};}
function assertEditable(profile:Profile,hero:Champion,runActive:boolean){
 if(runActive)throw Error('Talentos só podem ser alterados fora da run.');
 if(!profile.collection[hero]?.count)throw Error('Protagonista bloqueado.');
 if(hero!=='kylast')throw Error('Árvore de talentos em preparação.');
}
export function allocateTalent(profile:Profile,hero:Champion,id:TalentId,runActive:boolean,now:number):Profile {
 assertEditable(profile,hero,runActive);
 const node=kylastTalents.find(t=>t.id===id),owned=getTalents(profile)[hero]??[],info=masteryInfo(profile.mastery[hero].xp);
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
 const p=structuredClone(profile);credit(p,-200,'Redistribuição de talentos: Kylast',now);p.talents={...getTalents(p),[hero]:[]};return p;
}
