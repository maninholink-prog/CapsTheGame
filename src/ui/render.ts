import {spellTargetKeys} from './spell-targets.js';
import {cardFace} from './card-face.js';
import {targetKey} from '../battle/targets.js';
import {directTargets} from './forms.js';
import {encounterNames} from '../battle/encounters.js';
import {isCaveiraDeck} from '../content/caveira.js';
import {isJupiterDeck} from '../content/jupiter.js';
import {combatLayout} from './combat-layout.js';
import {heroProgressText} from './hero-progress.js';
import { canBlock, effectiveDefinition } from '../battle/champions.js';
import { actingPlayer } from './session.js';
import type { BattleSession } from './session.js';
import type { Draft } from './forms.js';
import { renderActionPanel } from './forms.js';
import { art, esc, icon } from './html.js';
import { arsenalText, cardName, description, handCardMode, instanceName, manaCost, playerName, rarityNames, visibleEffects } from './presentation.js';
import { effectiveEquipmentCapacity } from '../battle/equipment.js';
import type { BattleState, BoardUnit, CardInstance, PlayerId } from '../battle/types.js';

function unitCard(session: BattleSession, owner: PlayerId, unit: BoardUnit, draft: Draft, shinyIds:ReadonlySet<string>): string {
  const state=session.state;
  const selection=directTargets(session,draft),key=`unit:${owner}:${unit.card.instanceId}`;
  const targetable=selection&&selection.max>0&&selection.options.some(t=>targetKey(t)===key);
  const targeted=selection&&(selection.equipment?owner===session.viewPlayer&&draft.targetId===unit.card.instanceId:draft.targetKeys.includes(key));
  const blocking=state.combat?.stage==='blocking'&&actingPlayer(state)===session.viewPlayer&&!(session.opponentMode==='ai'&&session.viewPlayer==='p2');
  const blockFocus=blocking&&state.combat?.attacker===owner&&(draft.blockAttackerId??state.combat.lanes[0]?.attackerId)===unit.card.instanceId;
  const focusId=draft.blockAttackerId??state.combat?.lanes[0]?.attackerId;
  const attackingUnit=state.combat&&state.players[state.combat.attacker].board.find(u=>u.card.instanceId===focusId);
  const blockable=blocking&&owner===session.viewPlayer&&attackingUnit&&(unit.stunnedUntilRound??-1)<state.round&&canBlock(attackingUnit,unit);
  const assignedTo=blocking&&owner===session.viewPlayer?state.combat?.lanes.findIndex(l=>draft.blocks[l.attackerId]===unit.card.instanceId)??-1:-1;
  const def = state.definitions[unit.card.definitionId];
  const combatLane = state.combat?.lanes.find(l => l.attackerId === unit.card.instanceId || l.blockerId === unit.card.instanceId);
  const marked=Object.entries(state.executionMarks??{}).filter(([,m])=>m?.targetId===unit.card.instanceId).map(([o])=>o);
  const stunned = (unit.stunnedUntilRound ?? -1) >= state.round;
  const selected = draft.attackers.includes(unit.card.instanceId);
  const draggable=owner===session.viewPlayer&&owner===actingPlayer(state)&&draft.mode==='attack'&&!state.combat;
  const gear = unit.equipment ?? [];
  const shiny=owner==='p1'&&shinyIds.has(def.baseId??def.id);
  const champion = def.kind === 'unit' && (def.champion||def.encounterSpecial);
  return `<article class="unit ${targetable||blockable?'targetable':''} ${targeted?'target-selected':''} ${blockFocus?'block-focus':''} ${shiny?'shiny':''} rarity-${esc(def.enemyOnly?'encounter':def.rarity ?? 'common')} ${selected ? 'selected-attacker' : ''} ${stunned ? 'stunned' : ''}">
    <button class="unit-face" data-spell-endpoint="${esc(key)}" data-action="unit" data-owner="${owner}" data-id="${esc(unit.card.instanceId)}" ${draggable?'draggable="true" data-drag-unit="true"':''} aria-label="${esc(cardName(state, unit.card.definitionId))}, ataque ${unit.attack}, vida ${unit.health} de ${unit.maxHealth}">
      <div class="unit-art">${art(def.baseId??unit.card.definitionId, true, unit.evolved)}${champion ? `<span class="unit-crown">${unit.evolved ? 'EVOLUÍDO' : def.encounterSpecial?'ESPECIAL':'CAMPEÃO'}</span>` : ''}${stunned ? '<span class="stun-label">ATORDOADO</span>' : ''}${combatLane ? '<span class="in-combat">EM COMBATE</span>' : ''}${targeted?'<span class="selection-badge">ALVO SELECIONADO</span>':assignedTo>=0?`<span class="selection-badge">BLOQUEIO ${assignedTo+1}</span>`:blockFocus?'<span class="selection-badge">ESCOLHA UM BLOQUEADOR</span>':''}</div>
      ${marked.length?`<span class="execution-mark">Marcado por ${marked.map(o=>o.toUpperCase()).join(' / ')}</span>`:''}${unit.form?`<span class="form-label">${unit.form==='bear'?'Urso':'Tigre'}</span>`:''}${unit.sanctuary?'<span class="form-label" title="Reduz em até 2 o dano do próximo golpe de combate">Santuário</span>':''}<strong class="unit-name">${esc(cardName(state, unit.card.definitionId))}</strong>${def.kind==='unit'&&def.champion&&def.champion!=='kylast'?`<small class="evolution-progress">${esc(heroProgressText(state,owner,def.champion))}</small>`:''}<div class="unit-stats"><span class="attack-stat" title="Ataque atual da unidade, antes da arma escolhida"><small>ATAQUE ATUAL</small><b>${icon('sword')}${unit.attack}</b></span><span class="life-stat ${unit.health < unit.maxHealth ? 'damaged' : ''}" title="Vida atual / máxima"><small>VIDA ATUAL</small><b>${unit.health}<em> / ${unit.maxHealth}</em></b></span></div>
    </button>
    <div class="equipped">${(unit.keywords??[]).map(k=>`<span class="gear-chip">${k==='elusive'?'Elusivo':k==='quick'?'Ataque Rápido':'Ataque Duplo'}</span>`).join('')}${gear.map(g => `<button class="gear-chip ${g.used ? 'spent' : ''}" data-action="inspect" data-definition="${esc(g.card.definitionId)}" title="${esc(cardName(state, g.card.definitionId))}${g.used ? ' · ativação usada' : ''}">${icon(g.card.definitionId === 'alastor' ? 'scythe' : g.card.definitionId === 'banjo' ? 'banjo' : g.card.definitionId === 'colar' ? 'colar' : 'sword')}<span>${esc(cardName(state, g.card.definitionId))}</span>${g.used ? '<b>✓</b>' : ''}</button>`).join('')}${!gear.length ? '<span class="no-gear">Sem equipamento</span>' : ''}<span class="slot-count">${gear.length}/${effectiveEquipmentCapacity(state, unit)}</span></div>
  </article>`;
}
function playerField(session: BattleSession, owner: PlayerId, draft: Draft, shinyIds:ReadonlySet<string>): string {
  const state = session.state;
  const p = state.players[owner];
  const bench=p.board.filter(u=>!combatLayout(session,draft).front[owner].has(u.card.instanceId));
  const actor = actingPlayer(state);
  const attack = state.attackOwner === owner;
  const nexusKey=`nexus:${owner}`,targets=directTargets(session,draft);
  const nexusTargetable=targets?.options.some(t=>targetKey(t)===nexusKey);
  const nexusHtml=`<${nexusTargetable?'button':'div'} class="nexus ${p.nexus<=5?'critical':''} ${nexusTargetable?'targetable':''} ${draft.targetKeys.includes(nexusKey)?'target-selected':''}" ${nexusTargetable?`data-action="field-nexus" data-owner="${owner}"`:''} data-spell-endpoint="${nexusKey}" title="Vida atual do Vínculo"><strong>${p.nexus}</strong><span>VÍNCULO</span></${nexusTargetable?'button':'div'}>`;
  const hero=p.protagonist??'kylast';const definition=state.definitions[hero];const progress=state.allyProgress?.[owner];
  const encounter=owner==='p2'?state.encounter:undefined;
  const caveira=isCaveiraDeck(encounter?.id);
  const status=encounter?(isJupiterDeck(encounter.id)?'Aventura de Júpiter':caveira?'Caveira Dourada':encounter.phase==='king'?`Energia ${encounter.energy}/6 · sobreviva às descargas`:encounter.phase==='felix'?`Upgrades ${state.laboratory?.upgrades[owner]??0}/4`:'Laboratório de Félix'):heroProgressText(state,owner,hero);
  const regionNames:Record<string,string>={north:'NORTE',east:'LESTE',south:'SUL',west:'OESTE',korakarom:'KORAKAROM'};
  const regions=encounter?(isJupiterDeck(encounter.id)?'NORTE / SUL / LESTE / OESTE':caveira?'NORTE / LESTE':'SUL / LESTE'):(definition?.regions??['north','west']).map(r=>regionNames[r]).join(' / ');
  return `<section class="player-field ${actor === owner ? 'has-priority' : ''} ${owner}" aria-label="Campo do ${playerName(owner)}">
    <div class="field-header"><div class="player-identity">${nexusHtml}<div><div class="eyebrow">${session.opponentMode === 'ai' && owner === 'p2' ? 'Computador · J2' : playerName(owner)} ${actor === owner ? '<span class="live-dot"></span>' : ''}</div><h2>${esc(encounter?encounterNames[encounter.phase==='king'?'king':encounter.id]:definition?.name??'Kylast Heathcliff')}</h2><div class="player-sub"><span>${esc(status)}</span><span class="region-tag">${esc(regions)}</span></div></div></div><div class="field-meta"><span class="attack-token ${attack && state.attackAvailable ? 'ready' : ''}">${icon('sword')}${attack ? state.attackAvailable ? 'Ataque disponível' : 'Ataque usado' : 'Defesa'}</span></div></div>
    <div class="player-resources"><div class="mana-line"><span>MANA <b>${p.mana}<small>/${p.maxMana}</small></b></span><div class="mana-pips" aria-label="${p.mana} de ${p.maxMana} mana">${Array.from({ length: 10 }, (_, i) => `<i class="${i < p.mana ? 'filled' : i < p.maxMana ? 'available' : ''}"></i>`).join('')}</div></div><div class="reserve-line"><span>RESERVA</span><div>${Array.from({ length: 3 }, (_, i) => `<i class="reserve-pip ${i < p.reserve ? 'filled' : ''}"></i>`).join('')}</div><b>${p.reserve}</b></div><div class="deck-tally">${icon('book')}<span>${p.deck.length} no deck · ${p.hand.length} na mão</span></div></div>
    <div class="bench-caption"><strong>Retaguarda · J${owner.slice(1)}</strong><span>${bench.length} na retaguarda · ${p.board.length}/5 unidades em campo</span></div>
    <div class="unit-grid">${bench.map(u => unitCard(session, owner, u, draft, shinyIds)).join('')}${Array.from({ length: Math.max(0, 5 - bench.length) }, (_, i) => `<div class="empty-slot" aria-label="Espaço vazio na retaguarda ${i+1}"><span>${icon('diamond')}</span></div>`).join('')}</div>
  </section>`;
}
function combatLine(session: BattleSession, draft: Draft, shinyIds:ReadonlySet<string>): string {
  const state = session.state;
  const {lanes,attacker,defender}=combatLayout(session,draft);
  const effects=visibleEffects(state);
  const sigils=effects.length?`<div class="spell-sigils" aria-label="Efeitos pendentes, primeiro a resolver à esquerda">${effects.map((effect,i)=>`<button type="button" class="spell-sigil ${effect.owner} ${i===0?'next-effect':''}" data-action="inspect-effect" data-definition="${esc(effect.definitionId)}" data-id="${esc(effect.id)}" data-spell-endpoint="stack:${effect.id}" data-spell-enemy="${effect.owner!==session.viewPlayer}" data-spell-targets="${esc(JSON.stringify(spellTargetKeys(state,state.stack.find(p=>p.id===effect.id)!)))}" title="${esc(effect.title+' · '+effect.targetsText)}" aria-label="${esc((i+1)+'. '+effect.title+' · '+effect.targetsText)}">${icon(effect.badge==='Atordoamento'?'banjo':'diamond')}<small>${i+1}</small></button>`).join('')}</div>`:'';

  if (!state.combat && draft.mode !== 'attack') return `<section class="combat-line resting" aria-label="Campo de batalha">${sigils||'<span>Campo de batalha</span>'}</section>`;
  const label = state.combat?.stage === 'blocking' ? 'Escolha os bloqueadores' : state.combat?.stage === 'triggers' ? 'Escolha os alvos do Banjo' : state.combat ? 'Janela de respostas aberta' : 'Organize o ataque';
  const face=(owner:PlayerId,id:string|null,role:string,blocked:boolean)=>{
   const unit=state.players[owner].board.find(u=>u.card.instanceId===id);
   return `<div class="front-card ${owner}"><span class="front-role">${role} · J${owner.slice(1)}</span>${unit?unitCard(session,owner,unit,draft,shinyIds):`<div class="front-empty">${id?'Unidade derrotada':blocked?'Bloqueador removido':role==='Defesa'?'Sem bloqueador · Vínculo':'Sem atacante'}</div>`}</div>`;
  };
  return `<section class="combat-line active" ${draft.mode==='attack'&&!state.combat?'data-drop="attack"':''} aria-label="Campo de batalha"><div class="combat-label">${icon('sword')}<strong>${label}</strong><span>Confrontos da esquerda para a direita</span>${sigils}</div><div class="battle-front">${lanes.length?lanes.map((l,i)=>{
   const attack=face(attacker,l.attackerId,'Ataque',false),block=face(defender,l.blockerId??null,'Defesa',l.blocked);
   return `<div class="battle-lane" aria-label="Confronto ${i+1}">${attacker==='p2'?attack:block}<div class="lane-divider">${i+1} · ${attacker==='p2'?'↓':'↑'}</div>${attacker==='p1'?attack:block}</div>`;
  }).join(''):'<p class="front-guide">Selecione unidades na retaguarda para colocá-las na linha de ataque.</p>'}</div></section>`;
}
function handCard(session: BattleSession, card: CardInstance, draft: Draft, shinyIds:ReadonlySet<string>, fan:number): string {
  const { state, viewPlayer } = session;
  const def = effectiveDefinition(state,viewPlayer,card);
  const mode = handCardMode(state, viewPlayer, card);
  const original=state.definitions[card.definitionId];const shiny=viewPlayer==='p1'&&shinyIds.has(original.baseId??original.id);
  const isMulligan = state.phase === 'opening' && !state.players[viewPlayer].mulliganUsed && actingPlayer(state) === viewPlayer;
  const marked = isMulligan ? draft.mulligan.includes(card.instanceId) : card.instanceId === draft.selectedCardId;
  const title = mode === 'arsenal' ? 'Troca de Arsenal' : def.name??cardName(state,card.definitionId);
  const evolved = def.kind === 'unit' && (def.champion === 'kylast' ? state.evolvedKylast[viewPlayer] : def.champion==='arcata'&&Boolean(state.allyProgress?.[viewPlayer]?.evolved.arcata)||def.champion==='kuara'&&Boolean(state.allyProgress?.[viewPlayer]?.evolved.kuara)||def.champion==='youro'&&Boolean(state.allyProgress?.[viewPlayer]?.evolved.youro));
  const body = mode === 'arsenal' ? arsenalText : description(def);
  const draggable=state.phase==='actions'&&actingPlayer(state)===viewPlayer&&!state.combat&&state.stackReturnOwner===null&&!state.choices?.length&&!state.formChoices?.length&&!state.laboratoryChoices?.length;
  return `<button style="--fan:${fan}" class="hand-card ${shiny?'shiny':''} rarity-${esc(def.enemyOnly?'encounter':def.rarity ?? 'common')} ${marked ? 'selected' : ''} ${isMulligan && marked ? 'mulligan-marked' : ''}" data-action="hand-card" data-id="${esc(card.instanceId)}" ${draggable?'draggable="true"':''} aria-label="${esc(title)}${shiny?', cópia brilhante':''}, custo ${manaCost(state, viewPlayer, card)}${marked ? ', selecionada' : ''}" aria-pressed="${marked}">
    ${cardFace(def, {cost:manaCost(state,viewPlayer,card), title, body, arsenal:mode==='arsenal', evolved, marked:isMulligan&&marked})}
  </button>`;
}
function renderHand(session: BattleSession, draft: Draft, shinyIds:ReadonlySet<string>): string {
  const { state, viewPlayer } = session;
  const count = state.players[viewPlayer].hand.length;
  return `<section class="hand-section" aria-label="Mão de ${playerName(viewPlayer)}"><div class="section-heading"><div><span class="eyebrow">SUAS CARTAS</span><h2>Mão do ${playerName(viewPlayer)} <small>${count}/10</small></h2><span class="hand-guide">Clique na carta para ver o efeito e jogar.</span></div>${session.opponentMode==='manual'?`<div class="view-switch" aria-label="Lado inspecionado">${(['p1','p2'] as const).map(p => `<button data-action="view" data-player="${p}" class="${viewPlayer === p ? 'active' : ''}" aria-pressed="${viewPlayer === p}">J${p.slice(1)}</button>`).join('')}</div>`:''}</div><div class="hand-row" style="--hand-count:${count}" data-player="${viewPlayer}">${count ? state.players[viewPlayer].hand.map((c,i) => handCard(session,c,draft,shinyIds,i-(count-1)/2)).join('') : '<div class="empty-hand">Sua mão está vazia. Você ainda pode atacar ou passar quando essas ações estiverem disponíveis.</div>'}</div><p class="local-note">${session.opponentMode === 'ai' ? 'Você controla J1. O computador conduz J2 e mantém a mão oculta.' : 'Duelo de teste: você controla os dois lados. A mão acompanha quem precisa agir.'}</p></section>`;
}
function sideContent(session: BattleSession, draft: Draft): string {
  const state = session.state;
  if (draft.sideTab === 'history') return `<ol class="history-list">${session.history.slice().reverse().map(row => `<li><span class="log-round">${row.round ? `R${row.round}` : '—'}</span><span>${esc(row.message)}</span></li>`).join('')}</ol>`;
  if (draft.sideTab === 'discard') return (['p1', 'p2'] as const).map(p => {
    const counts = new Map<string, number>();
    for (const card of state.players[p].discard) counts.set(card.definitionId, (counts.get(card.definitionId) ?? 0) + 1);
    return `<div class="discard-group"><h3>${playerName(p)}</h3><p class="muted">${state.players[p].discard.length} descartadas · ${state.players[p].deathRecords.length} derrotas registradas</p>${counts.size ? [...counts].map(([id, count]) => `<button class="discard-item" data-action="inspect" data-definition="${esc(id)}"><span>${esc(cardName(state, id))}</span><b>×${count}</b></button>`).join('') : '<p class="empty-message">Nenhuma carta no descarte.</p>'}</div>`;
  }).join('');
  const effects = visibleEffects(state);
  return effects.length ? `<p class="stack-guide">O efeito do topo resolve primeiro.</p><ol class="stack-list">${effects.map((effect, i) => `<li class="stack-item ${i === 0 ? 'top-effect' : ''}"><div class="stack-index">${i + 1}</div><div><span class="eyebrow">${esc(effect.badge)} · J${effect.owner.slice(1)}</span><button class="stack-title" data-action="inspect" data-definition="${esc(effect.definitionId)}">${esc(effect.title)}</button><p>${esc(effect.targetsText)}</p></div></li>`).join('')}</ol>` : `<div class="empty-stack">${icon('diamond')}<strong>Nenhum efeito pendente</strong><p>Cartas e gatilhos que permitem resposta aparecem aqui.</p></div>`;
}
function inspector(session: BattleSession, draft: Draft): string {
  const id = draft.inspectedDefinitionId;
  const def = id && session.state.definitions[id];
  if (!def) return `<div class="inspect-empty">${icon('book')}<p>Selecione uma carta ou equipamento para consultar seu efeito.</p></div>`;
  const selected = session.state.players[session.viewPlayer].hand.find(c => c.instanceId === draft.selectedCardId);
  const arsenal = selected?.definitionId === id && handCardMode(session.state, session.viewPlayer, selected) === 'arsenal';
  return `<div class="inspected-card rarity-${esc(def.enemyOnly?'encounter':def.rarity ?? 'common')}"><div class="inspect-icon">${icon(arsenal ? 'forge' : id === 'kylast' ? 'shield' : id === 'alastor' ? 'scythe' : id === 'banjo' ? 'banjo' : id === 'colar' ? 'colar' : 'diamond')}</div><div><span class="eyebrow">${esc(def.enemyOnly?'Encontro':rarityNames[def.rarity ?? 'common'])}</span><h3>${esc(arsenal ? 'Troca de Arsenal' : cardName(session.state, id))}</h3></div></div><p class="full-description">${esc(arsenal ? arsenalText : description(def))}</p>${id === 'kylast' && !arsenal ? '<p class="inspector-foot">Forma inicial 3/5 · Evoluído 4/6<br/>Equipamentos iniciais: 2 espaços.</p>' : ''}`;
}

function upgradeChoiceOverlay(session:BattleSession):string{
 const choice=session.state.choices?.[0];
 if(!choice||choice.owner!==session.viewPlayer||session.opponentMode==='ai'&&choice.owner==='p2')return '';
 const multi=(choice.remaining??1)>1;
 return `<dialog class="upgrade-choice-overlay" aria-labelledby="upgrade-choice-title"><section class="upgrade-choice-dialog"><span class="eyebrow">FABRICAÇÃO · ABE</span><h2 id="upgrade-choice-title">Escolha um Upgrade</h2><p>${multi?'Obra-Prima: escolha dois Upgrades distintos, um de cada vez.':'Escolha uma das cartas disponíveis.'} O limite da mão é dez cartas.</p><div class="upgrade-choice-options">${choice.options.map((id,index)=>{const def=session.state.definitions[id];return `<button class="upgrade-choice-card" data-action="upgrade-choice" data-id="${esc(id)}" ${index===0?'autofocus':''} aria-label="Escolher ${esc(cardName(session.state,id))}">${cardFace(def)}</button>`;}).join('')}</div></section></dialog>`;
}

export function render(session: BattleSession, draft: Draft, shinyIds:ReadonlySet<string>=new Set()): string {
  if (session.opponentMode === 'ai' && session.viewPlayer !== 'p1') session = { ...session, viewPlayer: 'p1' };
  const state = session.state;
  const actor = actingPlayer(state);
  const canReceiveCard=state.phase==='actions'&&draft.mode!=='attack'&&!state.combat&&state.stackReturnOwner===null&&actor===session.viewPlayer&&!state.choices?.length&&!state.formChoices?.length&&!state.laboratoryChoices?.length;
  const turnLabel=actor?(session.opponentMode==='ai'?(actor==='p1'?'Sua ação':'Ação do oponente'):playerName(actor)):(state.phase==='opening'?'Iniciativa':'Encerrado');
  const status = state.phase === 'opening' ? 'Escolha sua mão inicial' : state.phase === 'ended' ? 'Batalha encerrada' : state.combat?.stage === 'blocking' ? 'Defina os bloqueadores' : state.combat?.stage === 'triggers' ? 'Escolha os alvos do Banjo' : state.stackReturnOwner !== null || state.combat ? 'Janela de respostas' : `${actor ? session.opponentMode === 'ai' && actor === 'p2' ? 'Computador' : playerName(actor) : ''} tem a ação`;
  return `<div class="app-shell tactical-battle"><main class="battle-layout"><div class="table-column"><div class="turn-strip"><div class="round-medallion"><span>${state.round || '—'}</span><small>${state.round ? 'RODADA' : 'PREPARO'}</small></div><div><span class="eyebrow">${state.phase === 'opening' ? 'ANTES DO PRIMEIRO GOLPE' : state.combat ? 'COMBATE EM ANDAMENTO' : 'O DESTINO ESTÁ NAS CARTAS'}</span><h2>${esc(status)}</h2></div><span class="turn-status priority-medallion ${actor??'neutral'}" aria-live="polite">${esc(turnLabel)}</span><details class="battle-reference"><summary aria-label="Menu da batalha" title="Menu da batalha">${icon('settings')}${visibleEffects(state).length?`<span class="menu-count">${visibleEffects(state).length}</span>`:''}</summary><div class="battle-reference-content"><div class="battle-options"><button class="button secondary" data-action="hub-nav" data-id="home">Voltar ao início</button><button class="button secondary" data-action="battle-restart">Reiniciar batalha</button><button class="button secondary" data-action="battle-concede">Desistir</button><div class="training-options"><label class="mode-choice">Modo <select id="opponent-mode" aria-label="Modo da nova batalha"><option value="ai" ${session.opponentMode === 'ai' ? 'selected' : ''}>Contra IA</option><option value="manual" ${session.opponentMode === 'manual' ? 'selected' : ''}>Duelo manual</option></select></label><div class="new-game"><label for="battle-seed">Semente</label><input id="battle-seed" type="number" inputmode="numeric" min="0" max="4294967295" step="1" value="${session.seed}" aria-label="Semente da nova batalha"/><button class="button secondary" data-action="new">Nova batalha</button></div></div></div><details class="battle-help"><summary>Como jogar</summary><p>Arraste uma carta da mão para o tabuleiro para jogá-la ou passe a ação.</p></details><section class="inspector-panel panel" aria-label="Carta em foco"><div class="panel-caption">CARTA EM FOCO</div>${inspector(session, draft)}</section><section class="activity-panel panel"><div class="panel-tabs" role="group" aria-label="Informações da batalha">${(['stack', 'history', 'discard'] as const).map(tab => `<button data-action="tab" data-tab="${tab}" class="${draft.sideTab === tab ? 'active' : ''}" aria-pressed="${draft.sideTab === tab}">${tab === 'stack' ? `Pilha${visibleEffects(state).length ? ` (${visibleEffects(state).length})` : ''}` : tab === 'history' ? 'Registro' : 'Descarte'}</button>`).join('')}</div><div class="activity-content">${sideContent(session, draft)}</div></section></div></details></div>
    <div class="opponent-hand" aria-label="Mão do Jogador 2: ${state.players.p2.hand.length} cartas fechadas"><span class="opponent-hand-count">${state.players.p2.hand.length} cartas</span>${state.players.p2.hand.map(() => '<span class="opponent-card-back" aria-hidden="true"></span>').join('')}</div><div class="battle-table" ${canReceiveCard?'data-drop-field="true"':''}>${playerField(session, 'p2', draft, shinyIds)}${combatLine(session, draft, shinyIds)}${playerField(session, 'p1', draft, shinyIds)}</div>${renderHand(session, draft, shinyIds)}<section class="action-panel panel" aria-label="Ação atual">${session.error ? `<div class="error-message" role="alert">${esc(session.error)}</div>` : ''}${renderActionPanel(session, draft)}</section></div>${upgradeChoiceOverlay(session)}
</main>
    <aside class="card-hover-preview" aria-label="Prévia da carta" aria-live="polite" hidden></aside><footer class="app-footer"><span>${icon('shield')}PROTÓTIPO DE COMBATE · DECKS DE PROTAGONISTAS</span><span>Sem salvamento nesta versão · recarregar reinicia o duelo</span></footer></div>`;
}
