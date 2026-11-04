import {rubelHealBonus,rubelMaxLifeBonus,rubelHealingResolved} from './rubel-talents.js';
import {arcataSpellBonus,resolveCombustion,arcataHasTalent} from './arcata-talents.js';
import {consumeKingDischarge,finishEncounterResolution} from './encounters.js';
import {laboratoryUpgrade} from './laboratory.js';
import {stealCards,summonUnits,markWeakest,recordDamage,expandedResolved} from './expansion.js';
import {talentDamage} from './kylast-talents.js';
import {advanceRound} from './round.js';
import {narrativeResolved,addAttack,drawInto} from './narrative.js';
import { championUnit, progress, evolveAllies, fabricate } from './champions.js';
import { insertChampionCopy } from './arsenal.js';
import { isLegalTarget } from './targets.js';
import { settle, removeUnit } from './state-events.js';
import { resolveArsenal } from './arsenal.js';
import { resolveColarTrigger, resolveColarContinuation, resolveColarCard } from './colar.js';
import type { BattleEvent, BattleState, PendingEffect, PlayerId, Result } from './types.js';

export function resolveEffect(state: BattleState, pending: PendingEffect): Result {
  if (state.phase !== 'actions') return { ok: false, state, error: 'Resolution unavailable' };
  if (pending.mode === 'arsenal') return resolveArsenal(state, pending);
  if (pending.mode === 'colar') return resolveColarTrigger(state, pending);
  if (pending.mode === 'colar-next') return resolveColarContinuation(state, pending);
  if (pending.mode === 'colar-card') return resolveColarCard(state, pending, resolveEffect);
  if (pending.mode === 'banjo') {
    const next = structuredClone(state);
    const target = pending.targets[0];
    const unit = target?.kind === 'unit' ? next.players[target.player].board.find(u => u.card.instanceId === target.instanceId) : null;
    const events: BattleEvent[] = [];
    if (unit && target?.kind === 'unit') {
      unit.stunnedUntilRound = next.round;
      if (next.combat) for (const lane of next.combat.lanes) {
        if (lane.blockerId === unit.card.instanceId) { lane.blockerId = null; lane.blocked = false; }
      }
      events.push({ type: 'unitStunned', player: target.player, instanceId: unit.card.instanceId });
    }
    events.push({ type: unit ? 'effectResolved' : 'effectFizzled', effectId: pending.id });
    return { ok: true, state: next, events };
  }
  const definition = state.definitions[pending.spellId ?? pending.source.definitionId];
  if (!definition || definition.kind === 'unit' || definition.kind === 'equipment')
    return { ok: false, state, error: 'Unsupported effect definition' };
  const next = structuredClone(state);
  const events: BattleEvent[] = [];
  const rule = pending.ignoreSide ? { ...definition.target, side: 'any' as const } : definition.target;
  const areaTargets = definition.area==='all-units' ? (['p1','p2'] as const).flatMap(player=>next.players[player].board.map(u=>({kind:'unit' as const,player,instanceId:u.card.instanceId}))) : definition.area ? [ ...(definition.area==='all-friendly' ? [{kind:'nexus' as const,player:pending.owner}] : []), ...next.players[definition.area==='enemies' ? (pending.owner==='p1'?'p2':'p1') : pending.owner].board.map(u=>({kind:'unit' as const,player:definition.area==='enemies' ? (pending.owner==='p1'?'p2' as const:'p1' as const) : pending.owner,instanceId:u.card.instanceId})) ] : pending.targets;
  const valid = definition.area ? areaTargets : pending.targets.filter(target => isLegalTarget(next, pending.owner, rule, target));
  let fizzled = pending.targets.length > 0 && valid.length === 0 || definition.id==='steed-entry'&&!next.executionMarks?.[pending.owner]||definition.id==='lab-collector-draw'&&next.laboratory?.deathRounds[pending.owner]!==next.round;
  if(definition.failIfKeywordPresent&&definition.effect.type==='keyword'&&valid.every(t=>t.kind==='unit'&&next.players[t.player].board.find(u=>u.card.instanceId===t.instanceId)?.keywords?.includes((definition.effect as {keyword:import('../content/schema.js').Keyword}).keyword)))fizzled=true;
  let actualHealing=0,healedAllies=0,successfulUpgrade=true;
  if (!fizzled) {
    const effect = definition.effect;
    const extraLife=rubelMaxLifeBonus(next,pending.owner,definition);
    const bonus=arcataSpellBonus(next,pending.owner,definition,pending.targets.length);
    if(effect.type==='steal')stealCards(next,pending.owner,pending.abilityAmount??effect.amount,effect.emptyFatigue??false,events);
    if(effect.type==='summon')summonUnits(next,pending.owner,effect.unit,effect.count,events);
    if(effect.type==='mark')markWeakest(next,pending.owner,pending.abilitySourceId);
    for (const target of valid) {
      if (effect.type === 'counter' && target.kind === 'stack') {
        const index = next.stack.findIndex(e => e.id === target.effectId);
        const [countered] = next.stack.splice(index, 1);consumeKingDischarge(next,countered,events);
        if (countered.mode !== 'banjo' && countered.mode !== 'colar' && countered.mode !== 'ability') next.players[countered.owner].discard.push(countered.source);
        events.push({ type: 'effectCountered', effectId: countered.id });
      } else if (target.kind !== 'stack' && effect.type !== 'counter') {
        const player = next.players[target.player];
        const unit = target.kind === 'unit' ? player.board.find(u => u.card.instanceId === target.instanceId)! : null;
        if (effect.type === 'damage') {
          const base=definition.dynamicDamage==='attack'?Math.max(0,unit?.attack??0):definition.dynamicDamage==='equipped'&&(unit?.equipment?.length??0)>0?2:effect.amount;
          const amount=base+bonus.damage+(pending.damageBonus??0)+(definition.fire&&pending.mode!=='ability'&&championUnit(next,pending.owner,'arcata')?.evolved?1:0);
          if (unit) unit.health = Math.max(0, unit.health - amount);
          else player.nexus = Math.max(0, player.nexus - amount);
          events.push({ type: 'damageApplied', target, amount });
          if(unit)talentDamage(next,target.player,unit,amount,events);
          recordDamage(next,target,pending.owner);
          if(unit&&unit.health>0&&definition.attackReduction){const loss=Math.min(Math.max(0,unit.attack),definition.attackReduction+bonus.reduction);addAttack(unit,-loss,true);}
        } else if(effect.type==='surgery'&&unit){
          unit.health=Math.max(0,unit.health-effect.amount);recordDamage(next,target,pending.owner);talentDamage(next,target.player,unit,effect.amount,events);events.push({type:'damageApplied',target,amount:effect.amount});
          if(unit.health>0){addAttack(unit,effect.attack,effect.temporary);if(effect.quick){unit.keywords??=[];if(!unit.keywords.includes('quick')){unit.keywords.push('quick');(unit.temporaryKeywords??=[]).push('quick');}}}else successfulUpgrade=false;
        } else if((effect.type==='execute'||effect.type==='kill-marked')&&unit){
          const mark=next.executionMarks?.[pending.owner];const marked=mark?.targetId===unit.card.instanceId;
          if(effect.type==='execute'&&(!marked||mark!.sourceId!==pending.abilitySourceId))continue;
          const amount=marked?unit.health:3;unit.health=Math.max(0,unit.health-amount);recordDamage(next,target,pending.owner);events.push({type:'damageApplied',target,amount});
          talentDamage(next,target.player,unit,amount,events);
        } else if(effect.type==='weaken'&&unit){addAttack(unit,-Math.min(Math.max(0,unit.attack),effect.amount),true);
        } else if(effect.type==='keyword'&&unit){unit.keywords??=[];if(!unit.keywords.includes(effect.keyword)){unit.keywords.push(effect.keyword);if(effect.temporary)(unit.temporaryKeywords??=[]).push(effect.keyword);}
        } else if (effect.type === 'heal') {
          const amount=effect.amount*(championUnit(next,pending.owner,'rubel')?.evolved?2:1)+rubelHealBonus(next,pending,definition,target);
          const before=unit?unit.health:player.nexus;
          if (unit) unit.health = Math.min(unit.maxHealth, unit.health + amount);
          else player.nexus = Math.min(player.maxNexus, player.nexus + amount);
          if(target.player===pending.owner){const restored=(unit?unit.health:player.nexus)-before;actualHealing+=restored;if(unit&&restored>0)healedAllies++;}
          events.push({ type: 'healingApplied', target, amount });
        } else if (effect.type === 'armor' && unit) {
          if(definition.fireShield)(unit.fireShields??=[]).push({owner:pending.owner,round:next.round,bonus:pending.damageBonus??0});
          unit.maxHealth += effect.amount+bonus.armor+extraLife;
          unit.health += effect.amount;
          events.push({ type: 'armorApplied', target, amount: effect.amount });
        } else if ((effect.type === 'upgrade' || effect.type === 'reinforce') && unit) {
          if(effect.type==='reinforce'||!effect.keyword){unit.attack++;unit.health++;unit.maxHealth++;}
          else {unit.keywords??=[];unit.temporaryKeywords=unit.temporaryKeywords?.filter(k=>k!==effect.keyword);if(!unit.keywords.includes(effect.keyword))unit.keywords.push(effect.keyword);}

        } else if(effect.type==='buff'&&unit){addAttack(unit,effect.attack,effect.temporary);unit.health+=effect.health??0;unit.maxHealth+=(effect.health??0)+extraLife;
        } else if ((effect.type === 'recall' || effect.type === 'obliterate') && unit) {
          removeUnit(next, target.player, unit.card.instanceId, events, effect.type);if(effect.type==='recall'&&definition.afterRecallDraw)drawInto(next,pending.owner,events);
        } else if (effect.type === 'stun' && unit) {
          unit.stunnedUntilRound = next.round;
          events.push({ type: 'unitStunned', player: target.player, instanceId: unit.card.instanceId });
          // Generic stun removes a combatant but preserves an established block.
          if (next.combat) {
            for (const lane of next.combat.lanes) if (lane.blockerId === unit.card.instanceId) lane.blockerId = null;
          }
        }
      }
    }
  }
  if (!fizzled) {
    if(definition.effect.type==='fire-boost'){const player=next.players[pending.owner];player.fireBoost=(player.fireBoostRound===next.round?player.fireBoost??0:0)+definition.effect.amount;player.fireBoostRound=next.round;}
    if(definition.effect.type==='fabricate'||definition.fabricate)fabricate(next,pending.owner);
    if(definition.championCopy)insertChampionCopy(next,pending.owner,definition.championCopy,pending.source.instanceId);
    const p=progress(next,pending.owner);
    if(definition.upgrade&&successfulUpgrade)p.upgrades++;
    if(championUnit(next,pending.owner,'rubel'))p.healing+=actualHealing;
    if(definition.fire&&pending.mode!=='ability'){
      p.fire++;if(p.fireRoundNumber!==next.round){p.fireRoundNumber=next.round;p.fireRound=0;}p.fireRound++;
      if(p.fireRound===2)resolveCombustion(next,pending.owner,events);
      if(p.fire===3&&arcataHasTalent(next,pending.owner,'arcata-study'))drawInto(next,pending.owner,events);
    }
  }
  if(!fizzled&&actualHealing>0)rubelHealingResolved(next,pending.owner,healedAllies,events);
  // Snapshot support triggers before any draw can clone player references.
  if(!fizzled&&successfulUpgrade){laboratoryUpgrade(next,pending.owner,definition,valid,events);narrativeResolved(next,pending.owner,definition,valid,actualHealing,events,pending.mode==='ability');}
  if(!fizzled)expandedResolved(next,pending.owner,definition,pending.source,events,pending.mode==='ability');
  if(!fizzled)for(let i=0;i<(definition.draw??0);i++)drawInto(next,pending.owner,events);
  if(pending.mode!=='ability')next.players[pending.owner].discard.push(structuredClone(pending.source));
  events.push({ type: fizzled ? 'effectFizzled' : 'effectResolved', effectId: pending.id });
  // All targets were affected before deaths and Vínculo defeat are checked.
  if(next.phase!=='ended')settle(next, events);
  if(next.phase!=='ended')evolveAllies(next,pending.owner,events);
  consumeKingDischarge(next,pending,events);finishEncounterResolution(next,events);
  return { ok: true, state: next, events };
}

export function resolveStack(state: BattleState): Result {
  if (state.phase !== 'actions' || state.stackReturnOwner === null || state.consecutivePasses !== 2)
    return { ok: false, state, error: 'Resolution requires pending effects and two passes' };
  let next = structuredClone(state);
  const events: BattleEvent[] = [];
  const returnOwner = next.stackReturnOwner;
  next.consecutivePasses = 0;
  next.responseWindowOpened = false;
  while (next.stack.length && next.phase !== 'ended') {
    const pending = next.stack.pop()!;
    const result = resolveEffect(next, pending);
    if (!result.ok) return { ok: false, state, error: result.error };
    next = result.state;
    events.push(...result.events);
    if (next.responseWindowOpened || next.choices?.length) return { ok: true, state: next, events };
  }
  if (next.phase !== 'ended') {
    next.priorityOwner = returnOwner;
    next.stackReturnOwner = null;finishEncounterResolution(next,events);
    if(next.roundEnding&&!next.choices?.length&&!next.formChoices?.length){next.consecutivePasses=2;const advanced=advanceRound(next);if(advanced.ok)return {...advanced,events:[...events,...advanced.events]};}
  }
  return { ok: true, state: next, events };
}



