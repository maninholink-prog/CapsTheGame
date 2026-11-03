import type {BattleSession} from './session.js';
import type {Draft} from './forms.js';
import type {PlayerId} from '../battle/types.js';

/** Presentation only: combatants remain on the engine's board. */
export function combatLayout(session:BattleSession,draft:Draft){
 const combat=session.state.combat;
 const attacker:PlayerId=combat?.attacker??session.viewPlayer;
 const defender:PlayerId=attacker==='p1'?'p2':'p1';
 const lanes=combat?combat.lanes.map(l=>({...l,blockerId:combat.stage==='blocking'?(draft.blocks[l.attackerId]??null):l.blockerId})):draft.mode==='attack'?draft.attackers.map(attackerId=>({attackerId,blockerId:null,blocked:false,weapons:[]})):[];
 const front={p1:new Set<string>(),p2:new Set<string>()};
 for(const lane of lanes){front[attacker].add(lane.attackerId);if(lane.blockerId)front[defender].add(lane.blockerId);}
 return {attacker,defender,lanes,front};
}
