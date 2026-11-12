import {encounterNames} from '../battle/encounters.js';
import {isCaveiraDeck} from '../content/caveira.js';
import {esc} from './html.js';
import type {BattleSession} from './session.js';

export function renderBattleIntro(session:BattleSession,training:boolean):string {
 const hero=session.state.players.p1.protagonist;
 const name=hero&&session.state.definitions[hero]?.name;
 const opponent=session.state.encounter?.id;
 const matchup=name&&opponent?`<p class="battle-matchup">${esc(name)} <span>×</span> ${esc(encounterNames[opponent])}</p>`:'';
 return `<main class="hub-main"><section class="hub-intro"><p class="eyebrow">${training?'DUELO DE TREINO':'AVENTURA'}</p><h1>Início de batalha</h1>${matchup}<p>${name&&!opponent?esc(name)+' entra em batalha. ':''}Prepare sua mão inicial.</p><button class="button" data-action="battle-intro-continue">Preparar mão</button></section></main>`;
}

export function renderBattleResult(session:BattleSession,training:boolean):string {
 const {winner,round}=session.state;
 const title=winner==='draw'?'Empate':session.opponentMode==='manual'?`Vitória do Jogador ${winner==='p1'?1:2}`:winner==='p1'?'Vitória':'Derrota';
 const outcome=winner==='draw'?'draw':winner==='p1'?'victory':'defeat';
 const encounter=session.state.encounter?.id;
 const rematch=training?`<button class="button secondary" data-action="hub-training"${isCaveiraDeck(encounter)?` data-id="${encounter}"`:''}>Novo treino</button>`:'';
 return `<main class="hub-main battle-result-page ${outcome}" data-outcome="${outcome}"><section class="hub-intro battle-result-panel"><p class="eyebrow">${training?'DUELO DE TREINO':'AVENTURA'}</p><h1>${title}</h1><p>Batalha encerrada na rodada ${round}.</p><button class="button primary" data-action="battle-result-continue">${training?'Voltar ao início':'Continuar aventura'}</button>${rematch}</section></main>`;
}
