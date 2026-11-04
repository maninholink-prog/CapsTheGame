import {esc} from './html.js';
import type {BattleSession} from './session.js';

export function renderBattleIntro(session:BattleSession,training:boolean):string {
 const hero=session.state.players.p1.protagonist;
 const name=hero&&session.state.definitions[hero]?.name;
 return `<main class="hub-main"><section class="hub-intro"><p class="eyebrow">${training?'DUELO DE TREINO':'AVENTURA'}</p><h1>Início de batalha</h1><p>${name?esc(name)+' entra em batalha. ':''}Prepare sua mão inicial.</p><button class="button" data-action="battle-intro-continue">Preparar mão</button></section></main>`;
}

export function renderBattleResult(session:BattleSession,training:boolean):string {
 const {winner,round}=session.state;
 const title=winner==='draw'?'Empate':session.opponentMode==='manual'?`Vitória do Jogador ${winner==='p1'?1:2}`:winner==='p1'?'Vitória':'Derrota';
 return `<main class="hub-main"><section class="hub-intro"><p class="eyebrow">${training?'DUELO DE TREINO':'AVENTURA'}</p><h1>${title}</h1><p>Batalha encerrada na rodada ${round}.</p><button class="button" data-action="battle-result-continue">${training?'Voltar ao início':'Continuar aventura'}</button>${training?'<button class="button secondary" data-action="hub-training">Novo treino</button>':''}</section></main>`;
}
