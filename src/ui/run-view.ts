import {renderRelicOffer,activeRelics} from './relic-view.js';
import {encounterNames} from '../battle/encounters.js';
import {description} from './presentation.js';
import {rarityNames} from '../profile/profile.js';
import {renderShop} from './shop-view.js';
import {commonCoins} from '../run/economy.js';
import {improvements} from '../run/improvements.js';
import {renderMap,renderEvent,renderDefeat} from './map-view.js';
import {esc,icon} from './html.js';
import {runCatalog,packages} from '../run/run.js';
import type {RunState} from '../run/run.js';
const names:Record<string,string>={north:'Norte',south:'Sul',east:'Leste',west:'Oeste',korakarom:'Korakarom'};
function card(id:string){const d=runCatalog[id];return `<div class="reward-card rarity-${esc(d.rarity??'common')}"><span class="eyebrow">${d.cost} MANA · ${d.kind==='unit'?'UNIDADE':d.kind==='equipment'?'EQUIPAMENTO':'MAGIA'}</span><h3>${esc(d.name??id)}</h3>${d.kind==='unit'?`<strong>${d.attack}/${d.health}</strong>`:''}<p>${esc(description(d))}</p><span class="muted">Duas cópias</span></div>`;}
export function runBanner(r:RunState){return `<section class="run-banner" aria-label="Progresso da run"><div><span class="eyebrow">${r.map?rarityNames[r.difficulty??'common'].toLocaleUpperCase('pt-BR')+' · MAPA DE ROTAS':'RUN CURTA'} · BATALHA ${r.battle}${r.map?'':'/3'}</span><strong>${r.nexus}/${r.maxNexus} de vida ${r.stage==='battle'?'na entrada':'restante'} · ${r.deck.length} cartas</strong><p><strong>${r.coins} Korakacoins</strong> · Reviver ${r.revives}/5</p><p>Grupo: ${r.group.map(id=>esc(runCatalog[id].name??id)).join(' · ')} | ${r.regions.map(x=>names[x]).join(' / ')}</p></div><div><span>${r.adventure==='dr-felix'?`Aventura de Dr. Félix · ${r.encounters?.[r.map?.current??'']?encounterNames[r.encounters[r.map!.current!]]:'Laboratório'} · IA`:'Adversário de teste: deck de Kylast · IA'}</span><p>Vida persiste. Mana, campo e efeitos reiniciam a cada batalha.</p>${activeRelics(r)}</div></section>`;}
export function renderRun(r:RunState,error=''):string {
 const counts=new Map<string,number>();for(const c of r.deck)counts.set(c.definitionId,(counts.get(c.definitionId)??0)+1);
 const deck=`<details class="panel deck-list"><summary>Ver deck da run · ${r.deck.length} cartas</summary><ul>${[...counts].map(([id,n])=>`<li>${esc(runCatalog[id].name??id)} <strong>×${n}</strong>${r.improvements[id]?.length?`<small> · ${r.improvements[id].map(x=>improvements[x].name).join(' · ')}</small>`:''}</li>`).join('')}</ul></details>`;
 if(r.stage==='map')return renderMap(r,deck,error);
 let title='',body='';
 if(r.stage==='shop')return renderShop(r,deck,error);
 if(r.stage==='event'){title='Encontro no caminho';body=renderEvent(r);}
 if(r.stage==='defeat'){title='Seu Vínculo caiu';body=renderDefeat(r);}
 if(r.stage==='recruit'){title='Escolha seu aliado';body=`<p>A primeira vitória concede um pacote de seis cartas e substitui a recompensa comum. Seu deck passará a ${r.deck.length+6} cartas.</p><div class="recruit-grid">${r.allies.map(id=>`<article class="recruit-option"><span class="eyebrow">${runCatalog[id].regions!.map(x=>names[x]).join(' / ')}</span><h2>${esc(runCatalog[id].name??id)}</h2>${packages[id].map(card).join('')}<button class="button primary" data-action="run-recruit" data-id="${id}">Recrutar ${esc(runCatalog[id].name??id)}</button></article>`).join('')}</div>`;}
 if(r.stage==='relic'){title='Escolha sua relíquia';body=renderRelicOffer(r);}
 if(r.stage==='reward'){title=r.map?.nodes.find(n=>n.id===r.map!.current)?.kind==='event'?'Suprimentos encontrados':'Recompensa de batalha';body=`${!r.rewards.length?`<p>Sem novas cartas elegíveis. Você receberá ${commonCoins(r)} Korakacoins.</p>`:'<p>Escolha uma carta para acrescentar duas cópias ao deck ou recuse.</p>'}<p>Ofertas respeitam suas regiões, exclusividades e o limite de duas cópias.</p><div class="recruit-grid">${r.rewards.map(id=>`<article class="recruit-option">${card(id)}<button class="button primary" data-action="run-reward" data-id="${id}">Escolher ${esc(runCatalog[id].name??id)}</button></article>`).join('')}</div><button class="button secondary" data-action="run-skip">${r.rewards.length?'Recusar recompensa':'Receber Korakacoins'}</button>`;}
 if(r.stage==='ready'){title='Prepare-se para a próxima batalha';body=`<p>Seu Vínculo começa a próxima batalha com <strong>${r.nexus} de vida</strong>. O deck completo será embaralhado, com nova mão inicial e mulligan.</p><button class="button primary" data-action="run-next">Próxima batalha · ${r.battle+1}/3</button>`;}
 if(r.stage==='won'||r.stage==='lost'){title=r.stage==='won'?'Run concluída!':'A run terminou';body=`<p>${r.stage==='won'?(r.map?'Você venceu o chefe final e concluiu sua rota.':'Você venceu as três batalhas.'):'Seu Vínculo caiu. Tente outro aliado ou outra sequência de jogadas.'}</p><p>${r.deck.length} cartas no deck final · ${r.nexus} de vida restante</p><p class="muted">${r.coinsEarned} Korakacoins obtidos · ${r.coinsSpent} gastos. Saldo temporário encerrado. Sem Pedras Filosofais ou maestria nesta versão.</p><button class="button primary" data-action="run-new">Jogar outra run</button>`;}
 if(r.adventure==='dr-felix'&&r.stage==='won')body+= '<p>Félix foi derrotado e os prisioneiros foram resgatados.</p>';
 const html=`<div class="app-shell"><header class="topbar"><div class="brand"><div class="brand-mark">${icon('diamond')}</div><div><h1>C.A.P.S.</h1><p>${r.map?'MAPA '+rarityNames[r.difficulty??'common'].toLocaleUpperCase('pt-BR'):'PRIMEIRA RUN'}</p></div></div><button class="button secondary" data-action="run-new">Recomeçar run</button><button class="button secondary" data-action="run-exit">Voltar ao duelo</button></header>${runBanner(r)}<main class="run-content"><section class="panel run-panel"><h1>${title}</h1>${error?`<div role="alert" class="error-message">${esc(error)}</div>`:''}${body}</section>${deck}<p class="muted">Sem salvamento: recarregar reinicia. Coleção de teste disponível apenas nesta sessão; não concede desbloqueios permanentes.</p></main></div>`;
 if(!r.collection)return html;
 return html.replaceAll('<button class="button secondary" data-action="run-new">Recomeçar run</button>','')
 .replace('data-action="run-exit">Voltar ao duelo','data-action="run-exit">Voltar ao início')
 .replace('<button class="button primary" data-action="run-new">Jogar outra run</button>','<button class="button primary" data-action="hub-nav" data-id="adventure">Escolher próxima aventura</button>')
 .replace('Sem Pedras Filosofais ou maestria nesta versão.','Pedras Filosofais e maestria registradas no perfil. Confira o extrato e seus boosters no menu.')
 .replace('Sem salvamento: recarregar reinicia. Coleção de teste disponível apenas nesta sessão; não concede desbloqueios permanentes.','Progresso salvo automaticamente neste navegador. Recompensas comuns respeitam as cartas desbloqueadas da sua coleção. Aliados recrutados são temporários nesta run.');}
