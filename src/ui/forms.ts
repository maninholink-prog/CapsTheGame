import {entryRule,entryTargets} from '../battle/narrative.js';
import {effectiveDefinition,strikes,canBlock,cardCost} from '../battle/champions.js';
import type { Command } from '../battle/commands.js';
import type { BattleSession } from './session.js';
import { actingPlayer, isAiTurn } from './session.js';
import { requiredBanjos } from '../battle/attack-triggers.js';
import { effectiveEquipmentCapacity } from '../battle/equipment.js';
import { isLegalTarget, targetKey } from '../battle/targets.js';
import type { BattleState, PlayerId, TargetRef } from '../battle/types.js';
import type { TargetRule } from '../content/schema.js';
import { cardName, handCardMode, instanceName, playerName, preview, targetLabel } from './presentation.js';
import { esc, icon } from './html.js';

export interface Draft {
  mode: 'card' | 'attack'; selectedCardId: string | null; mulligan: string[];
  targetId: string; targetKeys: string[]; equipmentId: string; replaceEquipmentId: string; replaceUnitId: string; position: string;
  attackers: string[]; weapons: Record<string, (string | null)[]>; blocks: Record<string, string>; banjos: Record<string, string>;
  inspectedDefinitionId: string | null;
  sideTab: 'stack' | 'history' | 'discard';
  blockAttackerId?:string;
}
export function directTargets(session:BattleSession,draft:Draft):{options:TargetRef[];min:number;max:number;equipment:boolean}|null {
 const {state,viewPlayer}=session;
 if(isAiTurn(session)||actingPlayer(state)!==viewPlayer||state.phase!=='actions'||draft.mode==='attack'||state.combat?.stage==='blocking'||state.choices?.length||state.formChoices?.length||state.laboratoryChoices?.length)return null;
 const card=state.players[viewPlayer].hand.find(c=>c.instanceId===draft.selectedCardId);if(!card)return null;
 const mode=handCardMode(state,viewPlayer,card),def=effectiveDefinition(state,viewPlayer,card);
 if(mode==='equipment'||mode==='arsenal')return {options:state.players[viewPlayer].board.map(u=>({kind:'unit',player:viewPlayer,instanceId:u.card.instanceId})),min:1,max:1,equipment:true};
 const rule=mode==='unit'?entryRule(state.definitions[card.definitionId]):def.kind!=='unit'&&def.kind!=='equipment'?def.target:null;
 return rule?{options:mode==='unit'?entryTargets(state,viewPlayer,card):targetOptions(state,viewPlayer,rule),min:rule.min,max:rule.max,equipment:false}:null;
}
export function chooseDirectTarget(session:BattleSession,draft:Draft,target:TargetRef):boolean {
 const selection=directTargets(session,draft),key=targetKey(target);
 if(!selection?.options.some(t=>targetKey(t)===key))return false;
 if(selection.equipment){if(target.kind!=='unit')return false;draft.targetId=target.instanceId;draft.replaceEquipmentId='';return true;}
 if(draft.targetKeys.includes(key))draft.targetKeys=draft.targetKeys.filter(k=>k!==key);
 else if(selection.max===1)draft.targetKeys=[key];
 else if(draft.targetKeys.length<selection.max)draft.targetKeys.push(key);
 return true;
}
export function chooseBlockUnit(session:BattleSession,draft:Draft,owner:PlayerId,id:string):boolean {
 const {state,viewPlayer}=session,combat=state.combat;
 if(!combat||combat.stage!=='blocking'||isAiTurn(session)||actingPlayer(state)!==viewPlayer)return false;
 if(owner===combat.attacker){if(!combat.lanes.some(l=>l.attackerId===id))return false;draft.blockAttackerId=id;return true;}
 const attackerId=draft.blockAttackerId??combat.lanes[0]?.attackerId;
 const attacker=state.players[combat.attacker].board.find(u=>u.card.instanceId===attackerId),blocker=state.players[viewPlayer].board.find(u=>u.card.instanceId===id);
 if(!attacker||!blocker||(blocker.stunnedUntilRound??-1)>=state.round||!canBlock(attacker,blocker))return false;
 if(draft.blocks[attackerId]===id)delete draft.blocks[attackerId];
 else {for(const key of Object.keys(draft.blocks))if(draft.blocks[key]===id)delete draft.blocks[key];draft.blocks[attackerId]=id;}
 draft.blockAttackerId=attackerId;return true;
}
export function freshDraft(): Draft {
  return { mode: 'card', selectedCardId: null, mulligan: [], targetId: '', targetKeys: [], equipmentId: '', replaceEquipmentId: '', replaceUnitId: '', position: '',
    attackers: [], weapons: {}, blocks: {}, banjos: {}, inspectedDefinitionId: null, sideTab: 'stack' };
}
export function targetOptions(state: BattleState, player: PlayerId, rule: TargetRule): TargetRef[] {
  const refs: TargetRef[] = state.stack.filter(p => p.mode !== 'colar-next').map(p => ({ kind: 'stack', effectId: p.id }));
  for (const side of ['p1', 'p2'] as const) {
    refs.push({ kind: 'nexus', player: side });
    for (const u of state.players[side].board) refs.push({ kind: 'unit', player: side, instanceId: u.card.instanceId });
  }
  return refs.filter(t => isLegalTarget(state, player, rule, t));
}
export function selectedWeapons(state: BattleState, player: PlayerId, unitId: string, draft: Draft): (string | null)[] {
  const unit = state.players[player].board.find(u => u.card.instanceId === unitId)!;
  const def = state.definitions[unit.card.definitionId];
  const count = strikes(state,unit);
  return Array.from({ length: count }, (_, i) => draft.weapons[unitId]?.[i] !== undefined ? draft.weapons[unitId][i] : unit.equipment?.[0]?.card.instanceId ?? null);
}
export function actionCommand(session: BattleSession, draft: Draft): Command | null {
  const { state } = session;
  const player = actingPlayer(state);
  if (state.phase === 'ended') return null;
  if (isAiTurn(session)) return null;
  if(state.choices?.length||state.formChoices?.length)return null;
  if (state.phase === 'opening') return player ? { type: 'mulligan', player, instanceIds: [...draft.mulligan] } : { type: 'start' };
  if (!player || session.viewPlayer !== player) return null;
  if (state.combat?.stage === 'blocking') return { type: 'block', player, assignments: state.combat.lanes.flatMap(l => draft.blocks[l.attackerId]
    ? [{ attackerId: l.attackerId, blockerId: draft.blocks[l.attackerId] }] : []) };
  if (state.combat?.stage === 'triggers') return { type: 'prepareAttack', player,
    banjos: requiredBanjos(state).map(b => ({ equipmentId: b.instanceId, targetId: draft.banjos[b.instanceId] ?? '' })) };
  if (draft.mode === 'attack') return { type: 'attack', player,
    attackers: draft.attackers.map(unitId => ({ unitId, weapons: selectedWeapons(state, player, unitId, draft) })) };
  const card = state.players[player].hand.find(c => c.instanceId === draft.selectedCardId);
  if (!card) return null;
  const mode = handCardMode(state, player, card);
  if (mode === 'unit') return { type: 'play', player, instanceId: card.instanceId,
    ...(entryRule(state.definitions[card.definitionId])?{targets:entryTargets(state,player,card).filter(t=>draft.targetKeys.includes(targetKey(t)))}:{}),
    ...(draft.replaceUnitId ? { replaceUnitId: draft.replaceUnitId } : {}), ...(draft.position !== '' ? { position: Number(draft.position) } : {}) };
  if (mode === 'equipment' || mode === 'arsenal') return { type: 'play', player, instanceId: card.instanceId,
    targets: draft.targetId ? [{ kind: 'unit', player, instanceId: draft.targetId }] : [],
    ...(mode === 'arsenal' && draft.equipmentId ? { equipmentId: draft.equipmentId } : {}),
    ...(draft.replaceEquipmentId ? { replaceEquipmentId: draft.replaceEquipmentId } : {}) };
  const def = effectiveDefinition(state,player!,card);
  const targets = def.kind !== 'unit' && def.kind !== 'equipment' ? targetOptions(state, player, def.target).filter(t => draft.targetKeys.includes(targetKey(t))) : [];
  return { type: 'play', player, instanceId: card.instanceId, targets };
}

function select(field: string, label: string, value: string, options: { value: string; label: string; disabled?: boolean }[], placeholder = 'Escolha uma opção', extra = ''): string {
  return `<label class="field"><span>${esc(label)}</span><select data-field="${esc(field)}" ${extra}><option value="">${esc(placeholder)}</option>${options.map(o => `<option value="${esc(o.value)}" ${value === o.value ? 'selected' : ''} ${o.disabled ? 'disabled' : ''}>${esc(o.label)}</option>`).join('')}</select></label>`;
}
function directTargetGuide(session:BattleSession,draft:Draft):string {
 const selection=directTargets(session,draft);if(!selection)return '';
 if(selection.max===0)return '<p class="muted">Esta carta não exige alvo. Seu efeito será aplicado automaticamente ao jogar.</p>';
 const keys=selection.equipment?(draft.targetId?[`unit:${session.viewPlayer}:${draft.targetId}`]:[]):draft.targetKeys;
 const selected=selection.options.filter(t=>keys.includes(targetKey(t)));
 const special=selection.options.filter(t=>t.kind==='stack'||t.kind==='unit'&&!session.state.players[t.player].board.some(u=>u.card.instanceId===t.instanceId));
 return `<p class="muted">Clique nos alvos destacados na mesa${selection.max>1?` · até ${selection.max} alvos`:''}. Clique novamente para desmarcar.</p><p class="target-summary">${selected.length?selected.map(t=>esc(targetLabel(session.state,t))).join(' · '):selection.max===0?'Esta carta não exige alvo.':'Nenhum alvo selecionado.'}</p>${special.map(t=>`<button class="chip ${keys.includes(targetKey(t))?'chosen':''}" data-action="field-target" data-key="${esc(targetKey(t))}">${esc(t.kind==='unit'?'A própria unidade ao entrar':targetLabel(session.state,t))}</button>`).join('')}`;
}
const primary = (label: string, disabled: boolean) => `<button class="button primary" data-action="confirm" ${disabled ? 'disabled' : ''}>${esc(label)}${icon('chevron')}</button>`;

export function renderActionPanel(session: BattleSession, draft: Draft): string {
  const { state } = session;
  if (isAiTurn(session)) return `<div class="phase-title">Computador · J2</div><h2>A IA está pensando</h2><p class="muted">O computador está escolhendo uma ação com as informações que pode conhecer. Sua mão permanece oculta.</p><div class="ai-thinking" role="status"><i></i><span>${state.combat?.stage === 'blocking' ? 'Escolhendo bloqueadores' : state.combat?.stage === 'triggers' ? 'Escolhendo alvos do Banjo' : state.phase === 'opening' ? 'Preparando a mão inicial' : state.stackReturnOwner !== null || state.combat ? 'Avaliando respostas' : 'Avaliando o campo'}</span></div>`;
  const tornado=state.laboratoryChoices?.[0];
  if(tornado?.kind){
    const salvage=tornado.kind==='salvage';
    return `<div class="phase-title">${salvage?'MERGULHADOR DE NAUFRÁGIO':'TIRO DE BOMBORDO'}</div><h2>${salvage?'Escolha um equipamento do descarte':'Escolha uma unidade inimiga'}</h2>${tornado.options.map(id=>`<button class="button secondary" data-action="caveira-choice" data-id="${esc(id)}">${esc(instanceName(state,id))}</button>`).join('')}${salvage?'<button class="button secondary" data-action="caveira-choice" data-id="">Não recuperar</button>':''}`;
  }
  if(tornado)return `<div class="phase-title">GELO DE TORNADO</div><h2>Escolha um inimigo</h2><p>Reduz seu ataque em 2 nesta rodada, mínimo zero. O efeito permite resposta.</p>${tornado.options.map(id=>`<button class="button secondary" data-action="tornado-choice" data-id="${esc(id)}">${esc(instanceName(state,id))}</button>`).join('')}`;
  const form=state.formChoices?.[0];
  if(form)return `<div class="phase-title">METAMORFOSE FÚNEBRE · YOURO</div><h2>Escolha sua forma</h2><p>Uma forma ativa. Preserva dano e melhorias; perder vida máxima pode derrotar Youro.</p><button class="button secondary" data-action="form-choice" data-id="bear">Urso · +${state.players[form.owner].board.find(u=>u.card.instanceId===form.unitId)?.evolved?4:2} vida máxima</button><button class="button secondary" data-action="form-choice" data-id="tiger">Tigre · +${state.players[form.owner].board.find(u=>u.card.instanceId===form.unitId)?.evolved?4:2} ataque</button>`;
  const choice=state.choices?.[0];
  if(choice)return `<div class="phase-title">FABRICAÇÃO · ABE</div><h2>Escolha um Upgrade</h2><p>${(choice.remaining??1)>1?'Obra-Prima: escolha dois Upgrades distintos, um de cada vez.':'Escolha um Upgrade entre as opções restantes.'} O limite da mão é dez cartas.</p>${choice.options.map(id=>`<button class="button secondary" data-action="upgrade-choice" data-id="${esc(id)}">${esc(cardName(state,id))} · ${cardCost(state,choice.owner,state.definitions[id])} mana</button><p class="muted">${esc(state.definitions[id].text??'')}</p>`).join('')}`;
  const player = actingPlayer(state);
  const command = actionCommand(session, draft);
  const check = command ? preview(state, command) : { ok: false, reason: '' };
  let body = ''; let title = ''; let label = '';
  if (state.phase === 'ended') {
    return `<div class="phase-title">Duelo encerrado</div><h2>${state.winner === 'draw' ? 'Empate' : `${session.opponentMode === 'ai' ? state.winner === 'p1' ? 'Você' : 'Computador' : playerName(state.winner!)} venceu`}</h2><p class="muted">Inicie uma nova batalha no topo para testar outra sequência.</p>`;
  }
  if (state.phase === 'opening') {
    title = player ? `Mão inicial · J${player.slice(1)}` : 'Lançamento de iniciativa';
    label = player ? `Confirmar mão${draft.mulligan.length ? ` · trocar ${draft.mulligan.length}` : ''}` : 'Rolar d20 e começar';
    body = `<p class="muted">${player ? 'Marque as cartas da mão que deseja substituir. Você tem uma troca gratuita.' : 'As duas mãos estão prontas. O maior resultado recebe o ataque e compra uma carta.'}</p>`;
    if (player && session.viewPlayer !== player) return `<h2>${esc(title)}</h2><p class="muted">Você está inspecionando o outro lado.</p><button class="button primary" data-action="follow">Voltar ao lado ativo</button>`;
  } else if (player && session.viewPlayer !== player) {
    return `<div class="phase-title">Inspeção local</div><h2>Vez de ${playerName(player)}</h2><p class="muted">Você está vendo a outra mão. As ações continuam com o lado ativo.</p><button class="button primary" data-action="follow">Voltar ao lado ativo</button>`;
  } else if (state.combat?.stage === 'blocking') {
    title = 'Defina seus bloqueios'; label = 'Confirmar bloqueios';
    const focused=draft.blockAttackerId??state.combat.lanes[0]?.attackerId;
    body = `<details class="battle-help"><summary>Como bloquear</summary><p>Clique no atacante e depois em uma unidade sua. Clique novamente no bloqueador para removê-lo.</p></details><p class="block-target">Alvo: <strong>${focused?esc(instanceName(state,focused)):'nenhum'}</strong></p><button class="button secondary" data-action="clear-block">Deixar este ataque passar</button>`;
  } else if (state.combat?.stage === 'triggers') {
    title = 'A música vem primeiro'; label = 'Ativar Banjo e abrir respostas';
    body = `<p class="muted">Escolha um inimigo para cada Banjo. O atordoamento permite resposta antes dos golpes.</p>${requiredBanjos(state).map((b, i) => select('banjo', `Banjo ${i + 1} · alvo`, draft.banjos[b.instanceId] ?? '',
      state.players[player === 'p1' ? 'p2' : 'p1'].board.map(u => ({ value: u.card.instanceId, label: cardName(state, u.card.definitionId) })), 'Escolha o inimigo', `data-unit="${esc(b.instanceId)}"`)).join('')}`;
  } else if (draft.mode === 'attack') {
    title = 'Prepare seu ataque'; label = 'Declarar ataque';
    body = `<p class="muted">Selecione as unidades no campo ou abaixo. A ordem define a linha de combate.</p><div class="attacker-toggles">${state.players[player!].board.map(u => `<button class="chip ${draft.attackers.includes(u.card.instanceId) ? 'chosen' : ''}" data-action="toggle-attacker" data-id="${esc(u.card.instanceId)}" ${(u.stunnedUntilRound ?? -1) >= state.round ? 'disabled' : ''}>${esc(cardName(state, u.card.definitionId))}</button>`).join('')}</div>${draft.attackers.map((id, index) => {
      const unit = state.players[player!].board.find(u => u.card.instanceId === id)!;
      return `<div class="attack-choice"><div class="choice-heading"><strong>${index + 1}. ${esc(cardName(state, unit.card.definitionId))}</strong><div><button class="mini-button" data-action="order-left" data-id="${esc(id)}" aria-label="Mover atacante para a esquerda" ${index === 0 ? 'disabled' : ''}>←</button><button class="mini-button" data-action="order-right" data-id="${esc(id)}" aria-label="Mover atacante para a direita" ${index === draft.attackers.length - 1 ? 'disabled' : ''}>→</button></div></div>${selectedWeapons(state, player!, id, draft).map((weapon, strike) => select('weapon', `Golpe ${strike + 1}`, weapon ?? '', (unit.equipment ?? []).map(g => ({ value: g.card.instanceId, label: cardName(state, g.card.definitionId) })), 'Sem arma', `data-unit="${esc(id)}" data-strike="${strike}"`)).join('')}</div>`;
    }).join('')}<button class="text-button" data-action="cancel-attack">Voltar às cartas</button>`;
  } else {
    const card = state.players[player!].hand.find(c => c.instanceId === draft.selectedCardId);
    title = card ? handCardMode(state, player!, card) === 'arsenal' ? 'Troca de Arsenal' : effectiveDefinition(state,player!,card).name??cardName(state,card.definitionId) : 'Sua próxima ação';
    label = 'Jogar carta';
    if (!card) body = `<details class="battle-help"><summary>Como jogar</summary><p>Escolha uma carta da mão para jogar ou passe a ação.</p></details>`;
    else {
      const mode = handCardMode(state, player!, card);
      const units = state.players[player!].board;
      if (mode === 'unit') {
        const rule=entryRule(state.definitions[card.definitionId]);
        if(rule)body+=directTargetGuide(session,draft);
        if (units.length >= 5) body += select('replaceUnitId', 'Unidade a substituir · será derrotada', draft.replaceUnitId, units.map(u => ({ value: u.card.instanceId, label: cardName(state, u.card.definitionId) })));
        const size = units.length - (draft.replaceUnitId ? 1 : 0);
        body += select('position', 'Posição de entrada', draft.position, Array.from({ length: size + 1 }, (_, i) => ({ value: `${i}`, label: `${i + 1}${i === size ? ' · à direita' : ''}` })), 'À direita do campo');
      } else if (mode === 'equipment' || mode === 'arsenal') {
        if (mode === 'arsenal') {
          body += `<p class="muted">1 mana de magia + custo da arma em mana comum.</p>`;
          body += select('equipmentId', 'Arma da mão', draft.equipmentId, state.players[player!].hand.filter(c => state.definitions[c.definitionId]?.kind === 'equipment').map(c => ({ value: c.instanceId, label: `${cardName(state, c.definitionId)} · ${state.definitions[c.definitionId].cost} mana base` })));
        }
        body += directTargetGuide(session,draft);
        const target = units.find(u => u.card.instanceId === draft.targetId);
        if (target && (target.equipment ?? []).length >= effectiveEquipmentCapacity(state, target)) body += select('replaceEquipmentId', 'Equipamento que volta à mão', draft.replaceEquipmentId,
          (target.equipment ?? []).map(g => ({ value: g.card.instanceId, label: cardName(state, g.card.definitionId) })));
      } else {
        const def = effectiveDefinition(state,player!,card);
        if (def.kind !== 'unit' && def.kind !== 'equipment') body += directTargetGuide(session,draft);
      }
    }
  }
  const canAttack = state.phase === 'actions' && !state.combat && state.stackReturnOwner === null && state.attackAvailable && state.attackOwner === player;
  const passCheck = player ? preview(state, { type: 'pass', player }) : { ok: false };
  const surgery=state.phase==='actions'&&!state.combat&&!state.stack.length&&state.stackReturnOwner===null&&player&&state.players[player].board.some(u=>state.definitions[u.card.definitionId].encounterSpecial==='labotomia')?state.players[player].board.map(u=>`<button class="button secondary" data-action="lab-surgery" data-id="${esc(u.card.instanceId)}" ${state.laboratory?.weaponRounds[`special-surgery-${player}`]===state.round?'disabled':''}>Cirurgia · ${esc(cardName(state,u.card.definitionId))}</button>`).join(''):'';
  return `<div class="phase-title">${player ? playerName(player) : 'Preparação'}</div><h2>${esc(title)}</h2>${body}
    ${surgery}
    ${command ? primary(label, !check.ok) : ''}${command && !check.ok ? `<p class="action-hint">${esc(check.reason)}</p>` : ''}
    ${state.phase === 'actions' && !state.combat && draft.mode !== 'attack' ? `<button class="button attack" data-action="attack-mode" ${!canAttack ? 'disabled' : ''}>${icon('sword')}Preparar ataque</button>` : ''}
    ${state.phase === 'actions' ? `<button class="button secondary" data-action="pass" ${!passCheck.ok ? 'disabled' : ''}>${state.combat || state.stackReturnOwner !== null ? 'Passar resposta' : 'Passar ação'}<span>${state.consecutivePasses}/2</span></button>` : ''}`;
}
