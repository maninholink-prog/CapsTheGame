import {finishEncounterResolution} from './encounters.js';
import {chooseTornado,useSurgery} from './lab-specials.js';
import { chooseUpgrade } from './champions.js';
import {chooseForm} from './expansion.js';
import { nextInt, shuffle } from './random.js';
import { drawOne } from './draw.js';
import { advanceRound } from './round.js';
import { opponent } from './types.js';
import { playCard } from './play.js';
import { resolveStack } from './effects.js';
import type { PlayCommand } from './play.js';
import { declareAttack, declareBlocks, resolveCombat } from './combat.js';
import type { AttackCommand, BlockCommand } from './combat.js';
import type { PrepareCommand } from './combat.js';
import { prepareAttackEffects } from './attack-triggers.js';
import type { BattleEvent, BattleState, PlayerId, Result } from './types.js';

export type Command = | {type:'chooseTornado';player:PlayerId;targetId:string} | {type:'surgery';player:PlayerId;targetId:string}
  | {type:'chooseForm';player:PlayerId;form:'bear'|'tiger'}
  | { type: 'mulligan'; player: PlayerId; instanceIds: string[] }
  | { type: 'start' }
  | { type: 'chooseUpgrade'; player: PlayerId; definitionId: string }
  | { type: 'pass'; player: PlayerId }
  | PlayCommand | AttackCommand | BlockCommand | PrepareCommand;

export function applyCommand(state:BattleState,command:Command):Result {const r=applyInternal(state,command);if(r.ok)finishEncounterResolution(r.state,r.events);return r;}
function applyInternal(state: BattleState, command: Command): Result {
  const invalid = (error: string): Result => ({ ok: false, state, error });
  if (state.phase === 'ended') return invalid('Battle ended');
  if(command.type==='chooseTornado'){const next=structuredClone(state),events:BattleEvent[]=[];return chooseTornado(next,command.player,command.targetId,events)?{ok:true,state:next,events}:invalid('Invalid Tornado target');}
  if(state.laboratoryChoices?.length)return invalid('Tornado choice required');
  if(command.type==='chooseForm'){const next=structuredClone(state),events:BattleEvent[]=[];return chooseForm(next,command.player,command.form,events)?{ok:true,state:next,events}:invalid('Invalid form choice');}
  if(state.formChoices?.length)return invalid('Form choice required');
  if (command.type === 'chooseUpgrade') {
    const next=structuredClone(state); const events:BattleEvent[]=[];
    return chooseUpgrade(next,command.player,command.definitionId,events)?{ok:true,state:next,events}:invalid('Invalid upgrade choice');
  }
  if (state.choices?.length) return invalid('Upgrade choice required');
  if(command.type==='surgery')return useSurgery(state,command.player,command.targetId);
  if (command.type === 'play') return playCard(state, command);
  if (command.type === 'attack') return declareAttack(state, command);
  if (command.type === 'block') return declareBlocks(state, command);
  if (command.type === 'prepareAttack') return prepareAttackEffects(state, command);
  if (command.type === 'mulligan') {
    const player = state.players[command.player];
    if (state.phase !== 'opening' || player.mulliganUsed) return invalid('Mulligan unavailable');
    if (new Set(command.instanceIds).size !== command.instanceIds.length ||
      command.instanceIds.some(id => !player.hand.some(c => c.instanceId === id))) return invalid('Invalid mulligan selection');
    if (command.instanceIds.length > player.deck.length) return invalid('Not enough cards for mulligan replacements');
    const next = structuredClone(state);
    const target = next.players[command.player];
    const selected = new Set(command.instanceIds);
    const returned = target.hand.filter(c => selected.has(c.instanceId));
    target.hand = target.hand.filter(c => !selected.has(c.instanceId));
    // Returned copies are unavailable while drawing replacements.
    target.hand.push(...target.deck.splice(0, returned.length));
    if (returned.length) {
      const shuffled = shuffle([...target.deck, ...returned], next.rngState);
      target.deck = shuffled.items;
      next.rngState = shuffled.state;
    }
    target.mulliganUsed = true;
    return { ok: true, state: next, events: [] };
  }
  if (command.type === 'start') {
    if (state.phase !== 'opening' || !state.players.p1.mulliganUsed || !state.players.p2.mulliganUsed)
      return invalid('Both players must confirm mulligan');
    const next = structuredClone(state);
    const events: BattleEvent[] = [];
    let p1: number, p2: number;
    do {
      const a = nextInt(next.rngState, 1, 20);
      const b = nextInt(a.state, 1, 20);
      next.rngState = b.state;
      p1 = a.value; p2 = b.value;
      events.push({ type: 'initiativeRolled', p1, p2 });
    } while (p1 === p2);
    const winner: PlayerId = p1 > p2 ? 'p1' : 'p2';
    next.attackOwner = winner;
    next.priorityOwner = winner;
    next.round = 1;
    next.phase = 'actions';
    next.attackAvailable = true;
    events.push({ type: 'roundStarted', round: 1, attackOwner: winner });
    const drawn = drawOne(next, winner);
    if (!drawn.ok) return invalid(drawn.error);
    return { ok: true, state: drawn.state, events: [...events, ...drawn.events] };
  }
  if (command.type === 'pass') {
    if (state.phase !== 'actions' || state.priorityOwner !== command.player) return invalid('Not your priority');
    if (state.combat && state.combat.stage !== 'responses') return invalid('Combat selection required');
    const next = structuredClone(state);
    next.consecutivePasses++;
    if (next.consecutivePasses === 2) {
      if (next.combat) {
        const resolved = next.stackReturnOwner !== null ? resolveStack(next) : { ok: true as const, state: next, events: [] };
        if (!resolved.ok || resolved.state.phase === 'ended' || resolved.state.responseWindowOpened || resolved.state.choices?.length||resolved.state.formChoices?.length||resolved.state.laboratoryChoices?.length) return resolved;
        if(resolved.state.combat?.awaitingBlocks){resolved.state.combat.awaitingBlocks=false;resolved.state.combat.stage='blocking';resolved.state.priorityOwner=opponent(resolved.state.combat.attacker);resolved.state.consecutivePasses=0;return resolved;}
        const fought = resolveCombat(resolved.state);
        return fought.ok ? { ...fought, events: [...resolved.events, ...fought.events] } : fought;
      }
      return next.stackReturnOwner !== null ? resolveStack(next) : advanceRound(next);
    }
    next.priorityOwner = opponent(command.player);
    return { ok: true, state: next, events: [] };
  }
  return invalid('Command not yet supported');
}



