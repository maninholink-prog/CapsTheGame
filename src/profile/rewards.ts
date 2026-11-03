import {conquerRelics} from './relics.js';
import {difficultyRules,routePermanentTarget,battlePermanentReward} from '../run/difficulty.js';
import type {Profile} from './profile.js';
import {credit,ledger,grantMastery,syncWeek} from './profile.js';
import type {RunState} from '../run/run.js';
import type {BattleState} from '../battle/types.js';
import {battleCoins} from '../run/economy.js';
export function startAccount(profile:Profile,r:RunState,id:string){const p=structuredClone(profile);p.account={id,paidNodes:[],seenBattles:[],earned:0,settled:false,hero:r.group[0]};return p;}
export function settleRun(profile:Profile,r:RunState,remainingCoins:number,remainingRevives:number,now:number):Profile {
 if(!profile.account||profile.account.settled||!r.map||!['won','lost'].includes(r.stage))return profile;
 let p=conquerRelics(profile,r);syncWeek(p,now);p.account!.settled=true;
 const victory=r.stage==='won',difficulty=r.difficulty??'common',rule=difficultyRules[difficulty];
 if(victory){const target=routePermanentTarget(r.map,difficulty,r.map.visited),extra=Math.max(0,target-p.account!.earned);credit(p,extra,'Conclusão da aventura',now);p.account!.earned+=extra;for(const type of rule.boosterKit)p.boosters[type]++;p.weekly.points+=rule.weeklyFinish;ledger(p,0,`Conclusão: ${rule.boosterKit.length} booster(s) e ${rule.weeklyFinish} pontos semanais`,now);}
 const battles=r.map.visited.map(id=>r.map!.nodes.find(n=>n.id===id)!).reduce((s,n)=>s+(n.kind==='midboss'?60:n.kind==='finalboss'?100:n.kind==='battle'?20:0),0);
 const xp=Math.floor((battles*rule.masteryMultiplier+remainingCoins/10+20*remainingRevives)*(victory?1:.25));
 p=grantMastery(p,p.account!.hero,xp,now);ledger(p,0,`Fim da run: +${xp} XP de maestria (${p.account!.hero})`,now);
 if(remainingCoins)ledger(p,-remainingCoins,'Fim da run: Korakacoins convertidas em maestria',now,'korakacoins',0);
 return p;
}
export function settleBattle(profile:Profile,before:RunState,after:RunState,b:BattleState,now:number):Profile {
 if(!before.map||!profile.account||profile.account.settled||!b.runBattleId||profile.account.seenBattles.includes(b.runBattleId))return profile;
 let p=structuredClone(profile);syncWeek(p,now);p.account!.seenBattles.push(b.runBattleId);
 const win=b.winner==='p1'||b.winner==='draw',node=before.map.nodes.find(n=>n.id===before.map!.current)!;
 if(win){p.weekly.points+=difficultyRules[before.difficulty??'common'].weeklyWin;if(!p.account!.paidNodes.includes(node.id)){const amount=battlePermanentReward(before.map,before.difficulty??'common',node);credit(p,amount,`Vitória na casa ${node.id}`,now);p.account!.earned+=amount;p.account!.paidNodes.push(node.id);}ledger(p,battleCoins(before),`Vitória na casa ${node.id}`,now,'korakacoins',before.coins+battleCoins(before));}
 return settleRun(p,after,before.coins+(win?battleCoins(before):0),before.revives,now);
}
