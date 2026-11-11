import type { TargetRule } from '../content/schema.js';
import type { BattleState, PlayerId, TargetRef } from './types.js';

export function targetKey(target: TargetRef): string {
  if (target.kind === 'stack') return `stack:${target.effectId}`;
  return target.kind === 'unit' ? `unit:${target.player}:${target.instanceId}` : `nexus:${target.player}`;
}

export function isLegalTarget(state: BattleState, owner: PlayerId, rule: TargetRule, target: TargetRef): boolean {
  let targetOwner: PlayerId;
  if (target.kind === 'stack') {
    if (rule.kind !== 'stack') return false;
    const effect = state.stack.find(e => e.id === target.effectId);
    if (!effect || effect.mode === 'colar-next') return false;
    targetOwner = effect.owner;
  } else {
    if (rule.kind !== target.kind && rule.kind !== 'character') return false;
    targetOwner = target.player;
    const player = state.players[targetOwner];
    if (target.kind === 'unit' && !player.board.some(u => u.card.instanceId === target.instanceId && (!rule.wounded || u.health < u.maxHealth))) return false;
    if (target.kind === 'nexus' && player.nexus <= 0) return false;
  }
  return rule.side === 'any' || (rule.side === 'ally' ? targetOwner === owner : targetOwner !== owner);
}
