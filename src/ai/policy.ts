import {entryRule,entryTargets} from '../battle/narrative.js';
import {effectiveDefinition} from '../battle/champions.js';
import { applyCommand } from '../battle/commands.js';
import { opponent } from '../battle/types.js';
import { isLegalTarget } from '../battle/targets.js';
import { equipmentPrice } from '../battle/supports.js';
import { planningState } from './observation.js';
import { attackCandidates, banjoCommand, blockCommand, unitValue } from './tactics.js';
import type { AiObservation } from './observation.js';
import type { Command } from '../battle/commands.js';
import type { BattleState, BoardUnit, TargetRef } from '../battle/types.js';
import type { CardDefinition, TargetRule } from '../content/schema.js';

export interface AiDecision { command: Command; reason: string }
interface Candidate extends AiDecision { score: number }

function targetsFor(state: BattleState, self: AiObservation['self'], rule: TargetRule): TargetRef[] {
  const refs: TargetRef[] = state.stack.map(effect => ({ kind: 'stack', effectId: effect.id }));
  for (const player of ['p1', 'p2'] as const) {
    refs.push({ kind: 'nexus', player });
    for (const unit of state.players[player].board) refs.push({ kind: 'unit', player, instanceId: unit.card.instanceId });
  }
  return refs.filter(target => isLegalTarget(state, self, rule, target));
}
function threat(state: BattleState, self: AiObservation['self'], effectId: number): number {
  const pending = state.stack.find(p => p.id === effectId);
  if (!pending) return 0;
  const sign = pending.owner === self ? -1 : 1;
  const def = state.definitions[pending.source.definitionId];
  if (pending.mode === 'banjo') return 8 * sign;
  if (pending.mode === 'colar' || pending.mode === 'colar-card' || def?.kind === 'unit' || def?.kind === 'equipment') return 3 * sign;
  if (def?.effect.type === 'damage' && pending.targets.some(t => t.kind === 'nexus' && t.player === self && def.effect.type === 'damage' && def.effect.amount >= state.players[self].nexus)) return 100000;
  return sign * (4 + (def && 'amount' in def.effect ? def.effect.amount : 0));
}
function effectScore(state: BattleState, self: AiObservation['self'], def: Extract<CardDefinition, { kind: 'spell' | 'trick' | 'armor' }>, target: TargetRef): number {
  const effect = def.effect;
  if((effect.type==='upgrade'||effect.type==='reinforce'||effect.type==='buff')&&target.kind==='unit')return target.player===self?4: -4;
  if (target.kind === 'stack') return effect.type === 'counter' ? threat(state, self, target.effectId) : -100;
  const ally = target.player === self;
  const unit = target.kind === 'unit' ? state.players[target.player].board.find(u => u.card.instanceId === target.instanceId) : undefined;
  if (effect.type === 'damage') {
    const amount=def.dynamicDamage==='attack'?Math.max(0,unit?.attack??0):def.dynamicDamage==='equipped'&&unit?.equipment?.length?2:effect.amount;
    if (target.kind === 'nexus') return (ally ? -1 : 1) * (amount >= state.players[target.player].nexus ? 100000 : amount * 1.8);
    return (ally ? -1 : 1) * (amount * .5 + (unit && amount >= unit.health ? unitValue(state, unit) * 1.5 : 0));
  }
  if(effect.type==='weaken')return (ally?-1:1)*Math.min(unit?.attack??0,effect.amount)*1.2;
  if(effect.type==='keyword')return ally?3:-3;
  if(effect.type==='kill-marked')return ally?-8:(unit?unitValue(state,unit):0)*1.5;
  if(effect.type==='surgery')return ally&&unit&&unit.health>effect.amount?effect.attack*1.6+(def.upgrade?1:0)-effect.amount:-8;
  if (effect.type === 'heal') return (ally ? 1 : -1) * Math.min(effect.amount, unit ? unit.maxHealth - unit.health : state.players[target.player].maxNexus - state.players[target.player].nexus) * 1.3;
  if (effect.type === 'armor') {
    const lethal = unit && state.stack.some(p => p.targets.some(t => t.kind === 'unit' && t.instanceId === unit.card.instanceId) && (() => {
      const d = state.definitions[p.source.definitionId]; return d && d.kind !== 'unit' && d.kind !== 'equipment' && d.effect.type === 'damage' && d.effect.amount >= unit.health && d.effect.amount < unit.health + effect.amount;
    })());
    return (ally ? 1 : -1) * (effect.amount * .8 + (lethal && unit ? unitValue(state, unit) * 2 : 0));
  }
  if (effect.type === 'stun') {
    const attacking = state.combat?.lanes.some(l => l.attackerId === unit?.card.instanceId);
    const blocking = state.combat?.lanes.some(l => l.blockerId === unit?.card.instanceId);
    return (ally ? -1 : 1) * (attacking ? 8 + (unit?.attack ?? 0) * 2 : blocking ? 8 : .2);
  }
  if (effect.type === 'recall' || effect.type === 'obliterate') return (ally ? -.7 : 1) * (unit ? unitValue(state, unit) : 0);
  return 0;
}
function gearScore(o: AiObservation, state: BattleState, def: Extract<CardDefinition, { kind: 'equipment' }>, bearer: BoardUnit, replacement?: string): number {
  const gear = bearer.equipment ?? [];
  const damage = (id: string) => { const d = state.definitions[id]; return d?.kind === 'equipment' ? d.damage ?? 0 : 0; };
  const before = Math.max(0, ...gear.map(g => damage(g.card.definitionId)));
  const after = Math.max(def.damage ?? 0, ...gear.filter(g => g.card.instanceId !== replacement).map(g => damage(g.card.definitionId)));
  const fresh = !state.equippedIdentities[o.self].includes(def.baseId??def.id);
  const progress = fresh && !state.evolvedKylast[o.self] ? state.equippedIdentities[o.self].length === 3 ? 9 : 1.5 : 0;
  const removed = gear.find(g => g.card.instanceId === replacement);
  const removedDef = removed && state.definitions[removed.card.definitionId];
  const removedStun = removed && !removed.used && removedDef?.kind === 'equipment' && removedDef.ability === 'banjo' ? (state.players[opponent(o.self)].board.length?4:1) : 0;
  const banjo = def.ability === 'banjo' ? state.players[opponent(o.self)].board.length ? 4 : 1 : 0;
  const hasPayload=o.players[opponent(o.self)].handCount>0||o.ownHand.some(c=>o.definitions[c.definitionId]?.kind!=='equipment'||(o.definitions[c.definitionId] as {ability?:string}).ability!=='colar');
  const colar = def.ability === 'colar'&&hasPayload ? 1.8 + Math.max(0, o.ownHand.length - 1) * .3 - o.players[opponent(o.self)].handCount * .18 : 0;
  const bearerDef = state.definitions[bearer.card.definitionId];
  const sufficientAttack=state.players[opponent(o.self)].nexus+Math.max(0,...state.players[opponent(o.self)].board.map(u=>u.health));
  const damian = bearerDef?.kind === 'unit' && bearerDef.ability === 'damian'&&bearer.attack<sufficientAttack ? 1.8 : 0;
  const robots = state.players[o.self].board.filter(u => {
    const d = state.definitions[u.card.definitionId]; return d?.kind === 'unit' && d.ability === 'robot' && u.firstEquipRound !== state.round;
  }).length * 1.5;
  return (after - before) * 3 + progress + banjo + colar + damian + robots - removedStun - equipmentPrice(state, o.self, def,bearer.card.instanceId,o.ownHand.find(c=>c.definitionId===def.id)?.instanceId) * .25 + (after > before || banjo > 0 ? bearer.health * .04 : 0);
}

export function chooseAiCommand(observation: AiObservation): AiDecision | null {
  const o = observation;
  if (o.phase === 'ended') return null;
  if(o.laboratoryChoices?.length){const c=o.laboratoryChoices[0];const candidates=o.players[opponent(c.owner)].board.filter(u=>c.options.includes(u.card.instanceId)).sort((a,b)=>b.attack-a.attack);return c.owner===o.self&&candidates[0]?{command:{type:'chooseTornado',player:o.self,targetId:candidates[0].card.instanceId},reason:'Reduzir o ataque de uma ameaça visível.'}:null;}
  if(o.formChoices?.length){const c=o.formChoices[0];const u=o.players[c.owner].board.find(u=>u.card.instanceId===c.unitId);return c.owner===o.self?{command:{type:'chooseForm',player:o.self,form:u&&(u.health<=(u.form==='bear'?u.formPower??2:2)||o.attackOwner!==o.self)?'bear':'tiger'},reason:'Escolher forma usando o campo público.'}:null;}
  if(o.choices?.length){const c=o.choices[0];return c.owner===o.self?{command:{type:'chooseUpgrade',player:o.self,definitionId:c.options[0]},reason:'Fabricar um Upgrade disponível.'}:null;}
  if (o.phase === 'opening') {
    const actor = !o.players.p1.mulliganUsed ? 'p1' : !o.players.p2.mulliganUsed ? 'p2' : null;
    if (actor !== o.self) return null;
    const cheapUnits = o.ownHand.filter(c => { const d = o.definitions[c.definitionId]; return d.kind === 'unit' && d.cost <= 3; });
    const keepChampion = cheapUnits.length >= 2 ? o.ownHand.find(c => { const d = o.definitions[c.definitionId]; return d.kind === 'unit' && d.champion; })?.instanceId : undefined;
    const ids = o.ownHand.filter(c => {
      const d = o.definitions[c.definitionId];
      return c.instanceId !== keepChampion && (d.cost > 3 || d.kind === 'equipment' && (!cheapUnits.length || d.cost > 1));
    }).map(c => c.instanceId);
    return { command: { type: 'mulligan', player: o.self, instanceIds: ids }, reason: 'Preparar uma mão com unidades iniciais.' };
  }
  if (o.priorityOwner !== o.self) return null;
  const state = planningState(o);
  if (o.combat?.stage === 'blocking') return { command: blockCommand(state, o.self), reason: 'Proteger o Vínculo e buscar trocas favoráveis.' };
  if (o.combat?.stage === 'triggers') return { command: banjoCommand(state), reason: 'Escolher alvos para os Banjos do ataque.' };
  const candidates: Candidate[] = [];
  const add = (command: Command, score: number, reason: string) => {
    if (score > .2 && applyCommand(state, command).ok) candidates.push({ command, score, reason });
  };
  if(state.players[o.self].board.some(u=>state.definitions[u.card.definitionId].encounterSpecial==='labotomia'))for(const u of state.players[o.self].board)if(u.health>1)add({type:'surgery',player:o.self,targetId:u.card.instanceId},3+Math.min(u.health,4)*.1,'Fortalecer um aliado que sobreviverá à cirurgia.');
  for (const card of o.ownHand) {
    const def = effectiveDefinition(state,o.self,card);
    if (!def) continue;
    const arsenal = def.kind === 'unit' && def.champion === 'kylast' && state.players[o.self].board.some(u => {
      const field = state.definitions[u.card.definitionId]; return field?.kind === 'unit' && field.champion === def.champion;
    });
    if (def.kind === 'equipment' || arsenal) {
      const weapons = arsenal ? o.ownHand.filter(c => o.definitions[c.definitionId]?.kind === 'equipment') : [card];
      for (const weapon of weapons) {
        const gear = o.definitions[weapon.definitionId]; if (gear.kind !== 'equipment') continue;
        for (const unit of state.players[o.self].board) for (const replacement of [undefined, ...(unit.equipment ?? []).map(g => g.card.instanceId)]) {
          add({ type: 'play', player: o.self, instanceId: card.instanceId, targets: [{ kind: 'unit', player: o.self, instanceId: unit.card.instanceId }],
            ...(arsenal ? { equipmentId: weapon.instanceId } : {}), ...(replacement ? { replaceEquipmentId: replacement } : {}) },
          gearScore(o, state, gear, unit, replacement) - (arsenal ? .25 : 0), 'Equipar um aliado com benefício conhecido.');
        }
      }
    } else if (def.kind === 'unit') {
      const replacements = state.players[o.self].board.length < 5 ? [undefined] : state.players[o.self].board.map(u => u.card.instanceId);
      const evolved = def.champion === 'kylast' && o.evolvedKylast[o.self] ? 1 : 0;
      const unit: BoardUnit = { card, attack: def.attack + evolved, health: def.health + evolved, maxHealth: def.health + evolved };
      for (const replacement of replacements) {
        const old = state.players[o.self].board.find(u => u.card.instanceId === replacement);
        const entry=entryRule(def);const targets=entry?entryTargets(state,o.self,card):[];
        const options=entry?[...(entry.min===0?[[]]:[]),...targets.map(t=>[t])]:[[]];
        for(const chosen of options)add({type:'play',player:o.self,instanceId:card.instanceId,...(replacement?{replaceUnitId:replacement}:{}),targets:chosen},
          (unitValue(state,unit)-(old?unitValue(state,old):0))*1.3-def.cost*.15+(def.entrySpell==='gwen-entry'&&chosen.length?-1:0),'Desenvolver o campo com uma unidade útil.');
      }
    } else {
      if(def.target.max===0){add({type:'play',player:o.self,instanceId:card.instanceId,targets:[]},def.effect.type==='fabricate'?3:def.effect.type==='fire-boost'?1:def.area?4:def.effect.type==='steal'?4:def.effect.type==='summon'?5:0,'Usar magia sem alvo escolhido.');continue;}
      const ranked = targetsFor(state, o.self, def.target).map(target => ({ target, score: effectScore(state, o.self, def, target) })).sort((a, b) => b.score - a.score);
      const max = Math.min(def.target.max, ranked.length);
      if (ranked.length < def.target.min) continue;
      for (let count = Math.max(1, def.target.min); count <= max; count++) {
        const group = ranked.slice(0, count);
        add({ type: 'play', player: o.self, instanceId: card.instanceId, targets: group.map(g => g.target) },
          group.reduce((sum, g) => sum + g.score, 0) - def.cost * .2, 'Responder a uma ameaça ou aproveitar um alvo visível.');
      }
    }
  }
  for (const attack of attackCandidates(state, o.self)) add(attack.command, attack.score, 'Atacar considerando apenas o campo conhecido.');
  candidates.sort((a, b) => b.score - a.score);
  if (candidates[0]) return { command: candidates[0].command, reason: candidates[0].reason };
  return { command: { type: 'pass', player: o.self }, reason: 'Aguardar: nenhuma jogada útil e legal.' };
}




