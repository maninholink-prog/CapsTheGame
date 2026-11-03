import { effectiveDefinition, cardCost } from '../battle/champions.js';
import { applyCommand } from '../battle/commands.js';
import { targetKey } from '../battle/targets.js';
import { equipmentPrice } from '../battle/supports.js';
import type { Command } from '../battle/commands.js';
import type { BattleState, CardInstance, PlayerId, TargetRef } from '../battle/types.js';
import type { CardDefinition } from '../content/schema.js';

export const playerName = (id: PlayerId) => id === 'p1' ? 'Jogador 1' : 'Jogador 2';
export const cardName = (state: BattleState, id: string) => state.definitions[id]?.name ?? id;
export const rarityNames: Record<string, string> = { common: 'Comum', rare: 'Rara', epic: 'Épica', legendary: 'Lendária', ultradimensional: 'Ultradimensional' };
export function handCardMode(state: BattleState, owner: PlayerId, card: CardInstance): 'unit' | 'equipment' | 'arsenal' | 'spell' {
  const def = state.definitions[card.definitionId];
  if (def?.kind === 'unit') {
    if (def.champion === 'kylast' && state.players[owner].board.some(unit => {
      const field = state.definitions[unit.card.definitionId];
      return field?.kind === 'unit' && field.champion === def.champion;
    })) return 'arsenal';
    return effectiveDefinition(state,owner,card).kind==='unit'?'unit':'spell';
  }
  return def?.kind === 'equipment' ? 'equipment' : 'spell';
}

export const descriptions: Record<string, string> = {
  kylast: 'Escolha uma arma por golpe. Evoluo quando você equipar 4 armas diferentes em aliados nesta batalha. Evoluído: dois golpes no mesmo ataque; o primeiro tem Ataque Rápido.',
  'sword-kylast': 'A espada longa recebida de seu tio. A arma escolhida concede +1 de dano ao golpe que a utiliza.',
  alastor: 'A arma escolhida concede +2 de dano. Ao golpear uma unidade, causa 1 de raio aos vizinhos imediatos dela na linha de combate.',
  banjo: 'Ao atacar com este Banjo, atordoe um inimigo antes dos golpes. Permite resposta. Uma ativação por cópia equipada; voltar à mão renova seu uso.',
  colar: 'Ao equipar, ative gratuitamente uma carta aleatória da sua mão e depois da mão adversária. Cada carta permite resposta; os alvos são sorteados ao resolver e podem atingir qualquer lado.',
  ybew: 'Enquanto Ybew estiver em campo, o dano lateral de Alastor passa de 1 para 2. Cópias de Ybew não acumulam esse efeito.',
  'wang-jianxi': 'Ao entrar em campo, compre um equipamento do seu deck. Se não houver equipamento, a busca termina sem causar fadiga.',
  'joia-rubra': 'O primeiro equipamento com redução efetiva nesta rodada custa 1 mana a menos. Duas Joias somam os descontos. Custo mínimo zero.',
  damian: 'Sempre que for equipado, recebe +1 de ataque até o fim da rodada. Equipagens sucessivas acumulam esse bônus.',
  'robot-campeao': 'Na primeira vez que você equipar um aliado a cada rodada, este robô recebe +1 de ataque durante a batalha. Cada cópia tem sua própria ativação.',
};
export const arsenalText = 'Rápida. Equipe uma arma da mão em um aliado. Pague 1 pela magia e o custo da arma com mana comum. Ao resolver com sucesso, embaralhe uma cópia de Kylast no deck.';
export function description(def: CardDefinition): string {
  if(def.runImprovementText)return description({...def,runImprovementText:undefined})+` Melhorias da run: ${def.runImprovementText}.`;
  if(def.text)return def.text.replace(/\bNexus\b/g,'Vínculo');
  if (descriptions[def.baseId??def.id]) return descriptions[def.baseId??def.id];
  if (def.kind === 'unit') return 'Unidade de batalha.';
  if (def.kind === 'equipment') return `Concede +${def.damage ?? 0} ao golpe que usa este equipamento.`;
  const effects: Record<string, string> = { damage: 'Causa dano aos alvos.', heal: 'Recupera vida dos alvos.', armor: 'Acrescenta vida atual e máxima.', counter: 'Anula o efeito escolhido.', recall: 'Devolve a unidade à mão.', stun: 'Atordoa até o fim da rodada.', obliterate: 'Remove a unidade desta batalha.' };
  return effects[def.effect.type] ?? 'Efeito de magia.';
}
export function findCard(state: BattleState, instanceId: string): CardInstance | undefined {
  for (const p of Object.values(state.players)) {
    const card = [...p.hand, ...p.deck, ...p.discard, ...p.board.map(u => u.card), ...p.board.flatMap(u => (u.equipment ?? []).map(e => e.card))].find(c => c.instanceId === instanceId);
    if (card) return card;
  }
  return state.stack.find(p => p.source.instanceId === instanceId)?.source;
}
export function instanceName(state: BattleState, instanceId: string): string {
  const card = findCard(state, instanceId);
  return card ? cardName(state, card.definitionId) : 'Unidade';
}
export function targetLabel(state: BattleState, target: TargetRef): string {
  if (target.kind === 'nexus') return `Vínculo · ${playerName(target.player)}`;
  if (target.kind === 'unit') return `${instanceName(state, target.instanceId)} · J${target.player.slice(1)}`;
  const effect = state.stack.find(p => p.id === target.effectId);
  return effect ? `${cardName(state, effect.spellId??effect.source.definitionId)} · efeito ${effect.id}` : 'Efeito que saiu da pilha';
}
export function visibleEffects(state: BattleState) {
  return state.stack.filter(p => p.mode !== 'colar-next').reverse().map(p => ({
    id: p.id, sourceId: p.source.instanceId, definitionId: p.spellId??p.source.definitionId, owner: p.owner,
    title: p.mode === 'arsenal' || p.activation === 'arsenal' ? 'Troca de Arsenal' : cardName(state, p.spellId??p.source.definitionId),
    badge: p.mode === 'colar-card' ? 'Carta sorteada' : p.mode === 'colar' ? 'Gatilho do Colar' : p.mode === 'banjo' ? 'Atordoamento' : 'Resposta',
    targetsText: p.mode === 'colar-card' ? 'Alvos sorteados ao resolver' : p.targets.length ? p.targets.map(t => targetLabel(state, t)).join(', ') : 'Aguardando resolução',
  }));
}
export function manaCost(state: BattleState, owner: PlayerId, card: CardInstance): number {
  const def = state.definitions[card.definitionId];
  if (handCardMode(state, owner, card) === 'arsenal') return 1;
  return def.kind === 'equipment' ? equipmentPrice(state, owner, def,undefined,card.instanceId) : cardCost(state,owner,effectiveDefinition(state,owner,card));
}
export function errorText(error: string): string {
  const exact: Record<string, string> = {
    'Both players must confirm mulligan': 'Confirme a mão inicial dos dois jogadores antes de começar.',
    'Mulligan unavailable': 'Essa mão inicial já foi confirmada.',
    'Not your action': 'Este lado precisa aguardar sua vez de agir.', 'Not your priority': 'Este lado precisa aguardar sua vez de agir.',
    'Insufficient mana': 'Mana insuficiente para esta carta.', 'Insufficient equipment mana': 'Falta mana comum para o equipamento.',
    'Insufficient mana for spell and equipment': 'Falta mana para pagar a magia e o equipamento separadamente.',
    'Invalid unit entry targets': 'Escolha um alvo válido para o efeito de entrada.',
    'Invalid spell targets': 'Escolha a quantidade correta de alvos válidos.',
    'Equipment slot replacement required': 'Escolha qual equipamento voltará à mão para abrir espaço.',
    'Full board requires an explicit replacement': 'O campo está cheio. Escolha uma unidade para substituir.',
    'Arsenal requires equipment and an allied bearer': 'Escolha uma arma da mão e o aliado que vai recebê-la.',
    'Equipment requires an allied bearer outside combat': 'Escolha um aliado. Equipamentos comuns são jogados fora do combate.',
    'Slow spell cannot respond': 'Magias Lentas só podem ser jogadas fora do combate e das respostas.',
    'Unit cannot be played as a response or with targets': 'Unidades não podem ser jogadas como resposta.',
    'Attack unavailable': 'O ataque não está disponível para este lado agora.',
    'Invalid attackers': 'Selecione pelo menos um atacante, sem repetir unidades.',
    'Invalid attacker or equipment sequence': 'A unidade não pode atacar ou a sequência de armas é inválida.',
    'Invalid equipment sequence': 'Escolha uma arma válida para cada golpe.',
    'Choose an equipment sequence': 'Escolha a sequência de armas antes de atacar.',
    'Duplicate block assignment': 'Cada unidade pode bloquear um único atacante.',
    'Choose a valid target for each Banjo': 'Escolha um inimigo para cada Banjo ativado.',
    'Combat selection required': 'Conclua primeiro a escolha de bloqueadores ou dos alvos do Banjo.',
    'Battle ended': 'Esta batalha já terminou.',
    'Invalid equipment or bearer': 'Escolha uma arma da mão e um portador válido.',
    'Invalid board position': 'Escolha uma posição válida no campo.',
    'Equipment is reserved by a pending spell': 'Essa arma já está comprometida com uma resposta pendente.',
  };
  return exact[error] ?? 'Essa ação não está disponível com as escolhas atuais.';
}
export function preview(state: BattleState, command: Command): { ok: boolean; reason: string } {
  const result = applyCommand(state, command);
  return result.ok ? { ok: true, reason: '' } : { ok: false, reason: errorText(result.error) };
}
export { targetKey };

