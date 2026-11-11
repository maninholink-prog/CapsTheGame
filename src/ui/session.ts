import {fullCatalog,createProtagonistDeck} from '../content/decks.js';
import {caveiraDecks,createCaveiraDeck} from '../content/caveira.js';
import type {CaveiraDeck} from '../content/caveira.js';
import {initEncounter} from '../battle/encounters.js';
import type {Champion} from '../content/schema.js';
import { createBattle } from '../battle/setup.js';
import { applyCommand } from '../battle/commands.js';
import { createKylastDeck, kylastCatalog } from '../content/kylast.js';
import { cardName, errorText, instanceName, playerName, targetLabel } from './presentation.js';
import type { Command } from '../battle/commands.js';
import type { BattleEvent, BattleState, PlayerId } from '../battle/types.js';
export interface HistoryRow { id: number; message: string; round: number }
export type OpponentMode = 'manual' | 'ai';
export interface BattleSession { introSeen?: boolean; state: BattleState; seed: number; opponentMode: OpponentMode; viewPlayer: PlayerId; history: HistoryRow[]; error: string; nextLogId: number }
export function actingPlayer(state: BattleState): PlayerId | null {
  if (state.phase === 'ended') return null;
  if(state.laboratoryChoices?.length)return state.laboratoryChoices[0].owner;
  if(state.formChoices?.length)return state.formChoices[0].owner;
  if(state.choices?.length)return state.choices[0].owner;
  if (state.phase === 'opening') return !state.players.p1.mulliganUsed ? 'p1' : !state.players.p2.mulliganUsed ? 'p2' : null;
  return state.priorityOwner;
}
export function isAiTurn(session: BattleSession): boolean { return session.opponentMode === 'ai' && actingPlayer(session.state) === 'p2'; }
export function createSession(seed: number, opponentMode: OpponentMode = 'manual',protagonist:Champion='kylast',encounter?:CaveiraDeck): BattleSession {
  const state=createBattle({p1:createProtagonistDeck(protagonist,'j1'),p2:encounter?createCaveiraDeck(encounter):createKylastDeck('j2')},seed,fullCatalog);
  if(encounter){
    const nexus=caveiraDecks[encounter].nexus;
    state.players.p2.nexus=state.players.p2.maxNexus=nexus;
    initEncounter(state,encounter,nexus);
  }
  return { state,
    seed, opponentMode, viewPlayer: 'p1', history: [{ id: 0, message: opponentMode === 'ai' ? 'Duelo contra o computador preparado. Escolha sua mão inicial.' : 'Duelo local preparado. Escolha sua mão inicial.', round: 0 }], error: '', nextLogId: 1 };
}
export function concedeSession(session:BattleSession,player:PlayerId):BattleSession {
 if(session.state.phase==='ended')return session;
 return {...session,state:{...session.state,phase:'ended',winner:player==='p1'?'p2':'p1',priorityOwner:null,stackReturnOwner:null,combat:null,stack:[]},history:[...session.history,{id:session.nextLogId,message:`${playerName(player)} desistiu da batalha.`,round:session.state.round}],nextLogId:session.nextLogId+1};
}
function message(state: BattleState, event: BattleEvent): string | null {
  const name = (id: string) => instanceName(state, id);
  switch (event.type) {
    case 'encounterPhase': return 'Félix caiu. O rei mecanizado despertou com 6 energias; seu estado foi preservado.';
    case 'initiativeRolled': return `d20: J1 tirou ${event.p1}; J2 tirou ${event.p2}${event.p1 === event.p2 ? ' — novo lançamento' : ''}.`;
    case 'roundStarted': return `Rodada ${event.round}. ${playerName(event.attackOwner)} recebe o ataque.`;
    case 'cardDrawn': return `${playerName(event.player)} comprou uma carta.`;
    case 'cardPlayed': return `${playerName(event.player)} jogou ${name(event.instanceId)}.`;
    case 'cardActivated': return `Colar revelou ${name(event.instanceId)} da mão de ${playerName(event.player)}.`;
    case 'unitEntered': return `${name(event.instanceId)} entrou em campo.`;
    case 'unitDied': return `${name(event.instanceId)} foi derrotado.`;
    case 'cardDiscarded': return `${name(event.instanceId)} foi para o descarte.`;
    case 'cardReturned': return `${name(event.instanceId)} voltou à mão de ${playerName(event.player)}.`;
    case 'equipmentAttached': return `${name(event.unitId)} recebeu ${name(event.equipmentId)}.`;
    case 'championEvolved': return `${event.champion === 'kylast' ? 'Kylast' : event.champion === 'abe' ? 'Abe' : event.champion === 'arcata' ? 'Arcata' : event.champion === 'rubel' ? 'Rubel' : event.champion === 'youro' ? 'Youro' : event.champion === 'kuara' ? 'Kuara' : event.champion === 'thalion' ? 'Thalion' : 'Lázaro'} de ${playerName(event.player)} evoluiu!`;
    case 'attackDeclared': return `${playerName(event.player)} declarou ${event.attackerIds.length} atacante(s).`;
    case 'blocksDeclared': return `${playerName(event.player)} confirmou os bloqueios.`;
    case 'combatEnded': return 'Combate encerrado.';
    case 'unitStunned': return `${name(event.instanceId)} foi atordoado nesta rodada.`;
    case 'unitRemoved': return `${name(event.instanceId)} ${event.reason === 'recall' ? 'retornou à mão' : 'foi obliterado'}.`;
    case 'effectCountered': return `O efeito ${event.effectId} foi anulado.`;
    case 'effectFizzled': return `O efeito ${event.effectId} terminou sem efeito.`;
    case 'fatigueDamage': return `${playerName(event.player)} sofreu ${event.amount} de fadiga.`;
    case 'damageApplied': return `${targetLabel(state, event.target)} recebeu ${event.amount} de dano.`;
    case 'healingApplied': return `${targetLabel(state, event.target)} recuperou vida (até ${event.amount}).`;
    case 'armorApplied': return `${targetLabel(state, event.target)} recebeu +${event.amount} de vida por armadura.`;
    case 'battleEnded': return event.winner === 'draw' ? 'A batalha terminou em empate.' : `${playerName(event.winner)} venceu a batalha!`;
    default: return null;
  }
}
export function dispatch(session: BattleSession, command: Command): BattleSession {
  const result = applyCommand(session.state, command);
  if (!result.ok) return { ...session, error: errorText(result.error) };
  let nextLogId = session.nextLogId;
  const rows = result.events.flatMap(event => {
    const text = message(result.state, event);
    return text ? [{ id: nextLogId++, message: text, round: result.state.round }] : [];
  });
  if (command.type === 'mulligan') rows.push({ id: nextLogId++, message: `${playerName(command.player)} confirmou a mão inicial.`, round: 0 });
  return { ...session, state: result.state, error: '', nextLogId, viewPlayer: session.opponentMode === 'ai' ? 'p1' : actingPlayer(result.state) ?? session.viewPlayer,
    history: [...session.history, ...rows].slice(-100) };
}
export function dispatchHuman(session: BattleSession, command: Command): BattleSession {
  if (session.opponentMode === 'ai' && ('player' in command ? command.player === 'p2' : isAiTurn(session)))
    return { ...session, error: 'O computador controla esse lado. Aguarde a ação da IA.' };
  return dispatch(session, command);
}
export function sessionFromBattle(state:BattleState,seed:number):BattleSession {return {state,seed,opponentMode:'ai',viewPlayer:'p1',history:[{id:0,message:'Batalha da run preparada. Escolha sua mão inicial.',round:0}],error:'',nextLogId:1};}


