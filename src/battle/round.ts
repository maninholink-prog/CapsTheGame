import {relicRound} from './relics.js';
import {narrativeRound} from './narrative.js';
import {expandedRound,startRoundEnding} from './expansion.js';
import { roundAllies } from './champions.js';
import { drawOne } from './draw.js';
import { opponent } from './types.js';
import type { BattleState, Result } from './types.js';

// A round only advances once combat, pending effects and mandatory choices are settled.
export function advanceRound(state: BattleState): Result {
  if (state.phase !== 'actions' || !state.attackOwner || state.consecutivePasses !== 2 || state.stack.length || state.stackReturnOwner !== null || state.combat)
    return { ok: false, state, error: 'Round requires two consecutive passes' };
  const next = structuredClone(state);
  const endingEvents:import('./types.js').BattleEvent[]=[];
  if(startRoundEnding(next,endingEvents))return {ok:true,state:next,events:endingEvents};
  next.roundEnding=false;
  for (const player of Object.values(next.players)) {
    player.reserve = Math.min(3, player.reserve + player.mana);
    player.maxMana = Math.min(10, player.maxMana + 1);
    player.mana = player.maxMana;
  }
  next.attackOwner = opponent(state.attackOwner);
  next.attackAvailable = true;
  next.priorityOwner = next.attackOwner;
  next.consecutivePasses = 0;
  next.round++;
  for (const player of Object.values(next.players)) for (const unit of player.board) {
    if(unit.temporaryKeywords){unit.keywords=unit.keywords?.filter(k=>!unit.temporaryKeywords!.includes(k));unit.temporaryKeywords=[];}
    unit.fireShields=[];
    unit.attack -= unit.roundAttackBonus ?? 0;
    delete unit.roundAttackBonus;
    if(unit.timedAttackLoss){
      for(const curse of unit.timedAttackLoss)unit.attack+=curse.amount;
      unit.timedAttackLoss=unit.timedAttackLoss.filter(curse=>curse.until>=next.round);
      for(const curse of unit.timedAttackLoss){
        curse.amount=Math.min(Math.max(0,unit.attack),curse.amount);
        unit.attack-=curse.amount;
      }
      if(!unit.timedAttackLoss.length)delete unit.timedAttackLoss;
    }
    if ((unit.stunnedUntilRound ?? Infinity) < next.round) delete unit.stunnedUntilRound;
  }
  const drawn = drawOne(next, next.attackOwner);
  if (!drawn.ok) return { ok: false, state, error: drawn.error };
  const events = [{ type: 'roundStarted' as const, round: next.round, attackOwner: next.attackOwner }, ...drawn.events];
  if(drawn.state.phase !== 'ended'){roundAllies(drawn.state,events);narrativeRound(drawn.state,events);expandedRound(drawn.state);relicRound(drawn.state,events);}
  return { ok:true,state:drawn.state,events }; 
}
