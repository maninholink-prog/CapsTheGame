import {felixEncounters} from '../run/felix-adventure.js';
import {caveiraRoute,jupiterRoute} from '../run/caveira-adventure.js';
import {relicIds} from '../content/relics.js';
import {playableRelicIds} from '../run/relics.js';
import {encounterNames} from '../battle/encounters.js';
import {matchModes,matchResults,profileFrames} from './matches.js';
import {fullCatalog,protagonistIds} from '../content/decks.js';
import {validateCatalog} from '../content/schema.js';
import {generateMap} from '../run/difficulty.js';
import {talentsFor} from './talents.js';
import {masteryInfo} from './profile.js';
import {improvements} from '../run/improvements.js';
import {collectibleIds,rarities,milestones} from './profile.js';
import {validateInitialDeck} from './initial-decks.js';
// Validate nested state before rendering it or replacing any existing save.
function check(ok:unknown):asserts ok {if(!ok)throw Error('Invalid save');}
const integer=(x:unknown,min=0,max=Number.MAX_SAFE_INTEGER)=>Number.isSafeInteger(x)&&Number(x)>=min&&Number(x)<=max;
const text=(x:unknown)=>typeof x==='string'&&x.length>0;
const object=(x:unknown)=>!!x&&typeof x==='object'&&!Array.isArray(x);
const player=(x:unknown)=>x==='p1'||x==='p2';
const regions=['north','east','south','west','korakarom'];
function strings(x:any,allowed?:string[]){check(Array.isArray(x)&&x.every((v:any)=>text(v)&&(!allowed||allowed.includes(v))));}
function unique(x:any[]){check(new Set(x).size===x.length);}
function card(c:any,catalog:any){check(object(c)&&text(c.instanceId)&&text(c.definitionId)&&!!catalog[c.definitionId]);}
function relicList(value:any,allowed=playableRelicIds){strings(value,allowed);unique(value);}
function shopState(shops:any){check(object(shops));for(const shop of Object.values(shops) as any[]){check(object(shop)&&['standard','specialized'].includes(shop.type)&&Array.isArray(shop.offers));for(const o of shop.offers)check(object(o)&&text(o.id)&&['card','improvement','heal5','healAll','revive','remove'].includes(o.kind)&&integer(o.price)&&typeof o.bought==='boolean'&&(!o.cardId||!!fullCatalog[o.cardId])&&(!o.improvement||!!improvements[o.improvement as keyof typeof improvements]));}}
function runBase(r:any,initialDeck?:string[]){
 check(object(r));for(const k of ['coins','coinsEarned','coinsSpent','lastCoins','battle','revivesSpent'])check(integer(r[k]));check(integer(r.revives,0,5)&&integer(r.nexus)&&integer(r.maxNexus,1)&&r.nexus<=r.maxNexus);
 strings(r.group,protagonistIds);unique(r.group);check(r.group.length>=1&&r.group.length<=3);strings(r.regions,regions);unique(r.regions);
 check(Array.isArray(r.deck)&&r.deck.length>=5);const identities=new Map<string,number>();for(const c of r.deck){card(c,fullCatalog);identities.set(c.definitionId,(identities.get(c.definitionId)??0)+1);if(fullCatalog[c.definitionId].enemyOnly)check(initialDeck?.includes(c.definitionId));}unique(r.deck.map((c:any)=>c.instanceId));check([...identities].every(([id,n])=>initialDeck?.includes(id)?n<=2:n===2));for(const id of r.group)check(identities.get(id)===2);
 check(object(r.improvements));for(const [id,list] of Object.entries(r.improvements)){check(!!fullCatalog[id]);strings(list,Object.keys(improvements));check((list as string[]).length<=3);}
 shopState(r.shops);
}
function target(t:any){check(object(t)&&['unit','nexus','stack'].includes(t.kind));if(t.kind==='stack')check(integer(t.effectId));else check(player(t.player)&&(t.kind!=='unit'||text(t.instanceId)));}
function battleSession(s:any){
 check(object(s)&&integer(s.seed,0,0xffffffff)&&['ai','manual'].includes(s.opponentMode)&&player(s.viewPlayer)&&typeof s.error==='string'&&integer(s.nextLogId)&&Array.isArray(s.history));for(const row of s.history)check(object(row)&&integer(row.id)&&typeof row.message==='string'&&integer(row.round));
 const b=s.state;check(object(b)&&b.version===1&&b.rngAlgorithm==='lcg32-v1'&&['opening','actions','ended'].includes(b.phase)&&integer(b.round)&&integer(b.rngState,0,0xffffffff)&&integer(b.consecutivePasses)&&integer(b.nextEffectId));
 for(const k of ['priorityOwner','attackOwner','stackReturnOwner'])check(b[k]===null||player(b[k]));check(b.winner===null||player(b.winner)||b.winner==='draw');
 for(const k of ['attackAvailable','responseWindowOpened'])check(typeof b[k]==='boolean');check(integer(b.kylastEquipmentSlots,1,6)&&object(b.players)&&object(b.definitions));validateCatalog(b.definitions);
 check(object(b.equippedIdentities)&&object(b.evolvedKylast));
 for(const id of ['p1','p2']){
  const p=b.players[id];check(object(p));check(p.protagonist===undefined||protagonistIds.includes(p.protagonist));for(const k of ['deck','hand','discard','deathRecords']){check(Array.isArray(p[k]));for(const c of p[k])card(c,b.definitions);}
  check(integer(p.maxNexus,1)&&Number.isSafeInteger(p.nexus)&&p.nexus<=p.maxNexus&&integer(p.mana,0,10)&&integer(p.maxMana,0,10)&&integer(p.reserve,0,3)&&integer(p.fatigue)&&typeof p.mulliganUsed==='boolean'&&Array.isArray(p.board)&&p.board.length<=5);
  for(const u of p.board){check(object(u));card(u.card,b.definitions);check(b.definitions[u.card.definitionId].kind==='unit'&&integer(u.attack)&&integer(u.maxHealth,1)&&Number.isSafeInteger(u.health)&&u.health<=u.maxHealth);if(u.equipment!==undefined){check(Array.isArray(u.equipment));for(const e of u.equipment){card(e.card,b.definitions);check(typeof e.used==='boolean');}}if(u.keywords)strings(u.keywords,['quick','double','elusive']);if(u.temporaryKeywords)strings(u.temporaryKeywords,['quick','double','elusive']);if(u.timedAttackLoss!==undefined){check(Array.isArray(u.timedAttackLoss));for(const loss of u.timedAttackLoss)check(object(loss)&&integer(loss.until,b.round,b.round+1)&&integer(loss.amount));}check(u.combatAttackBonus===undefined||u.combatAttackBonus===2);check(u.sanctuary===undefined||typeof u.sanctuary==='boolean');check(u.form===undefined||['bear','tiger'].includes(u.form));check(u.formPower===undefined||u.formPower===2||u.formPower===4);}
  strings(b.equippedIdentities[id]);check(typeof b.evolvedKylast[id]==='boolean');
 }
 check(Array.isArray(b.stack));for(const e of b.stack){check(object(e)&&integer(e.id)&&player(e.owner)&&Array.isArray(e.targets));card(e.source,b.definitions);for(const t of e.targets)target(t);for(const k of ['rubelEvolution','paidTalentGrip','paidTalentLazaro'])check(e[k]===undefined||typeof e[k]==='boolean');if(e.spellId)check(!!b.definitions[e.spellId]);}
 if(b.combat!==null){const c=b.combat;check(object(c)&&player(c.attacker)&&['blocking','triggers','responses'].includes(c.stage)&&Array.isArray(c.lanes));for(const l of c.lanes){check(object(l)&&text(l.attackerId)&&(l.blockerId===null||text(l.blockerId))&&typeof l.blocked==='boolean'&&Array.isArray(l.weapons)&&l.weapons.every((w:any)=>w===null||text(w)));}}
 check(b.publicDeckCounts===undefined);check(b.roundEnding===undefined||typeof b.roundEnding==='boolean');
 if(b.talentLoadouts!==undefined){check(object(b.talentLoadouts));for(const [o,ids] of Object.entries(b.talentLoadouts)){check(player(o));strings(ids,talentsFor(b.players[o].protagonist??'kylast').map(n=>n.id));unique(ids as string[]);}}
 if(b.talentState!==undefined){check(object(b.talentState));for(const [o,t] of Object.entries(b.talentState) as [string,any][]){check(player(o)&&object(t));for(const k of ['setup','entryDraw','entryArmor','gripUsed','survivalUsed','firstAttack'])check(t[k]===undefined||typeof t[k]==='boolean');for(const k of ['versatilityRound','returnedRound','maintenanceUsedRound'])check(t[k]===undefined||integer(t[k]));if(t.youro!==undefined){check(b.players[o].protagonist==='youro'&&object(t.youro));strings(t.youro.used,talentsFor('youro').map(n=>n.id));unique(t.youro.used);check(integer(t.youro.witnessedDeaths));}if(t.kuara!==undefined){check(b.players[o].protagonist==='kuara'&&object(t.kuara));strings(t.kuara.used,['first-nexus-hit','first-pilantragem','evolved-pilantragem','emptied-enemy-deck','first-stolen-play','first-stolen-unit','first-stolen-death','first-enemy-fatigue']);unique(t.kuara.used);for(const k of ['eastDiscountRound','walletDiscountRound','playedDiscountRound'])check(t.kuara[k]===undefined||integer(t.kuara[k],1,b.round));}if(t.arcata!==undefined){check(object(t.arcata));strings(t.arcata.used,talentsFor('arcata').map(n=>n.id));unique(t.arcata.used);check(integer(t.arcata.combustions));}if(t.rubel!==undefined){strings(t.rubel,talentsFor('rubel').map(n=>n.id));unique(t.rubel);}if(t.thalion!==undefined){check(b.players[o].protagonist==='thalion');strings(t.thalion,talentsFor('thalion').map(n=>n.id));unique(t.thalion);}if(t.lazaro!==undefined){check(b.players[o].protagonist==='lazaro'&&object(t.lazaro));strings(t.lazaro.used,talentsFor('lazaro').map(n=>n.id));unique(t.lazaro.used);check(t.lazaro.spellDiscountRound===undefined||integer(t.lazaro.spellDiscountRound,1,b.round));}check(t.returnedCard===undefined||text(t.returnedCard));if(t.abe!==undefined){const a=t.abe;check(object(a));for(const k of ['fabricated','projectUsed','armor','inspired','complete','shared'])check(a[k]===undefined||typeof a[k]==='boolean');for(const k of ['upgradePaidRound','upgradeResolvedRound'])check(a[k]===undefined||integer(a[k],0,b.round));if(a.units!==undefined){check(object(a.units));for(const [id,n] of Object.entries(a.units))check(text(id)&&integer(n,1));}}}}
 if(b.relicState!==undefined){const r=b.relicState;check(object(r)&&object(r.active)&&object(r.playedRound)&&object(r.healedRound));for(const o of ['p1','p2']){relicList(r.active[o]);check(r.playedRound[o]===undefined||integer(r.playedRound[o],0,b.round));check(r.healedRound[o]===undefined||integer(r.healedRound[o],0,b.round));}}
 if(b.encounter!==undefined){const e=b.encounter;check(object(e)&&Object.hasOwn(encounterNames,e.id)&&['single','felix','king'].includes(e.phase)&&integer(e.kingNexus,1)&&integer(e.energy,0,6)&&integer(e.activatedRound));for(const k of ['pendingKing','shutdownPending'])check(e[k]===undefined||typeof e[k]==='boolean');if(e.kingDeck!==undefined){check(Array.isArray(e.kingDeck)&&e.kingDeck.length===30);for(const c of e.kingDeck)card(c,b.definitions);}check(e.dischargeRound===undefined||integer(e.dischargeRound));}
 if(b.laboratory!==undefined){check(object(b.laboratory));for(const key of ['deathRounds','upgrades','auraUnits','weaponRounds']){check(object(b.laboratory[key]));for(const value of Object.values(b.laboratory[key]))check(integer(value));}}
 if(b.laboratoryChoices!==undefined){check(Array.isArray(b.laboratoryChoices));for(const c of b.laboratoryChoices){check(player(c.owner)&&text(c.sourceId));strings(c.options);check(c.kind===undefined||c.kind==='cannon'||c.kind==='salvage');}}
 if(b.formChoices!==undefined){check(Array.isArray(b.formChoices));for(const c of b.formChoices)check(player(c.owner)&&b.players[c.owner].board.some((u:any)=>u.card.instanceId===c.unitId&&b.definitions[u.card.definitionId].champion==='youro'));}
 if(b.heroProgress!==undefined){check(object(b.heroProgress));for(const o of ['p1','p2'])for(const key of ['deaths','stolen','music','executions'])check(integer(b.heroProgress[o]?.[key]));}
 if(b.executionMarks!==undefined){check(object(b.executionMarks));for(const [o,m] of Object.entries(b.executionMarks) as [string,any][]){check(player(o)&&object(m)&&text(m.sourceId)&&text(m.targetId));}}
 if(b.choices!==undefined){check(Array.isArray(b.choices));for(const c of b.choices){check(player(c.owner));strings(c.options,Object.keys(b.definitions));unique(c.options);check(c.remaining===undefined||integer(c.remaining,1,2)&&c.remaining<=c.options.length);}}
 if(b.allyProgress!==undefined){check(object(b.allyProgress));for(const id of ['p1','p2']){const a=b.allyProgress[id];check(object(a)&&object(a.evolved));for(const k of ['upgrades','fire','fireRound','fireRoundNumber','healing'])check(integer(a[k]));}}
}
export function validateSave(s:any){
 check(object(s)&&(s.version===1||s.version===2));
 if(s.version===2)check(typeof s.profileId==='string'&&/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s.profileId));
 const p=s.profile;
 check(object(p)&&text(p.name)&&p.name.trim().length<=40&&integer(p.created)&&integer(p.stones)&&integer(p.rng,0,0xffffffff)&&integer(p.serial)&&integer(p.pity,0,39)&&integer(p.championShiny,0,5)&&object(p.collection)&&object(p.boosters)&&object(p.mastery)&&object(p.weekly)&&Array.isArray(p.ledger));
 if(p.relicCollection!==undefined){check(object(p.relicCollection));for(const [id,item] of Object.entries(p.relicCollection) as [string,any][])check(relicIds.includes(id)&&object(item)&&typeof item.conquered==='boolean');}
 for(const [id,c] of Object.entries(p.collection) as [string,any][])check(collectibleIds.includes(id)&&object(c)&&integer(c.count,1,3)&&typeof c.shiny==='boolean');check(protagonistIds.some(id=>p.collection[id]?.count));
 if(p.initialDecks!==undefined){check(object(p.initialDecks));for(const [hero,ids] of Object.entries(p.initialDecks) as [string,any][]){check(protagonistIds.includes(hero as import('../content/schema.js').Champion)&&Array.isArray(ids));try{validateInitialDeck(p,hero as import('../content/schema.js').Champion,ids);}catch{check(false);}}}
 for(const r of rarities)check(integer(p.boosters[r]));for(const id of protagonistIds)check(object(p.mastery[id])&&integer(p.mastery[id].xp,0,31250)&&typeof p.mastery[id].rewarded==='boolean');
 check(integer(p.weekly.points)&&Number.isSafeInteger(p.weekly.key)&&Array.isArray(p.weekly.claimed));unique(p.weekly.claimed);for(const n of p.weekly.claimed)check(milestones.some(m=>m.points===n)&&n<=p.weekly.points);
 check(p.avatar===undefined||protagonistIds.includes(p.avatar)&&!!p.collection[p.avatar]?.count);
 check(p.frame===undefined||Object.hasOwn(profileFrames,p.frame));
 if(p.matches!==undefined){
  check(Array.isArray(p.matches));
  for(const m of p.matches)check(object(m)&&protagonistIds.includes(m.hero)&&Object.hasOwn(matchModes,m.mode)&&Object.hasOwn(matchResults,m.result)&&integer(m.time,0,8640000000000000));
 }
 for(const l of p.ledger)check(object(l)&&integer(l.id,1,p.serial)&&['stones','korakacoins'].includes(l.currency)&&Number.isSafeInteger(l.amount)&&integer(l.balance)&&typeof l.reason==='string'&&integer(l.time));unique(p.ledger.map((l:any)=>l.id));
 check(p.lastOpening===null||object(p.lastOpening));if(p.lastOpening){const o=p.lastOpening;check(integer(o.serial,1,p.serial)&&rarities.includes(o.type)&&integer(o.time)&&Array.isArray(o.cards)&&o.cards.length===5);for(const c of o.cards)check(object(c)&&collectibleIds.includes(c.id)&&['shiny','rolledShiny','newCard'].every(k=>typeof c[k]==='boolean')&&integer(c.excess));}
 if(p.talents!==undefined){check(object(p.talents));for(const [hero,list] of Object.entries(p.talents) as [string,any][]){check(hero==='kylast'||hero==='abe'||hero==='arcata'||hero==='rubel'||hero==='youro'||hero==='kuara'||hero==='thalion'||hero==='lazaro');strings(list,talentsFor(hero as import('../content/schema.js').Champion).map(n=>n.id));unique(list);check(list.length<=masteryInfo(p.mastery[hero].xp).points&&!!p.collection[hero]?.count);for(const id of list){const node=talentsFor(hero as import('../content/schema.js').Champion).find(n=>n.id===id)!;check((!node.parent||list.includes(node.parent))&&masteryInfo(p.mastery[hero].xp).level>=(node.minLevel??1));}}}
 if(s.run===null){check(s.session===null&&p.account===null);return;}
 const r=s.run,initialDeck=p.initialDecks?.[r.group?.[0]];runBase(r,initialDeck);if(r.talents!==undefined){strings(r.talents,talentsFor(r.group[0]).map(n=>n.id));unique(r.talents);}check(integer(r.seed,0,0xffffffff)&&integer(r.rngState,0,0xffffffff)&&integer(r.battleSeed,0,0xffffffff)&&['relic','battle','recruit','reward','ready','won','lost','map','event','defeat','shop'].includes(r.stage));strings(r.allies,protagonistIds);strings(r.rewards,collectibleIds);if(r.collection!==undefined)strings(r.collection,collectibleIds);
 check(r.difficulty===undefined||rarities.includes(r.difficulty));
 const caveira=r.adventure==='caveira-dourada'?caveiraRoute(r.seed,r.difficulty??'common'):undefined;
 const jupiter=r.adventure==='jupiter'?jupiterRoute(r.seed,r.difficulty??'common'):undefined;
 const expectedMap=caveira?.map??jupiter?.map??generateMap(r.seed,r.difficulty??'common');
 check(object(r.map)&&JSON.stringify(r.map.nodes)===JSON.stringify(expectedMap.nodes));
 const ids=expectedMap.nodes.map(node=>node.id);
 if(caveira)check(JSON.stringify(r.encounters)===JSON.stringify(caveira.encounters));
 else if(jupiter)check(JSON.stringify(r.encounters)===JSON.stringify(jupiter.encounters));
 else if(r.adventure!==undefined){
  const encounters=JSON.stringify(r.encounters);
  check(r.adventure==='dr-felix'&&(encounters===JSON.stringify(felixEncounters(r.map,r.seed))||encounters===JSON.stringify(felixEncounters(r.map,r.seed,'original'))));
 }
 strings(r.map.visited,ids);unique(r.map.visited);check(r.map.current===null||ids.includes(r.map.current));
 const final=expectedMap.nodes.find(node=>node.kind==='finalboss')?.id;
 const trial=expectedMap.nodes.find(node=>node.event==='caveira-trial')?.id;
 if(r.caveiraHint!==undefined)check(caveira&&r.caveiraHint===true&&r.map.visited.includes(trial));
 if(r.caveiraAftermath!==undefined){
  check(caveira&&['chart','cove','battle','won','lost'].includes(r.caveiraAftermath)&&r.map.current===final&&r.map.visited.includes(final));
  check(r.stage===(r.caveiraAftermath==='battle'?'battle':'won'));
 }
 if(r.relicRun!==undefined){const rr=r.relicRun;check(object(rr));for(const k of ['active','seen','offers'])relicList(rr[k]);strings(rr.rewardedNodes,ids);unique(rr.rewardedNodes);check(rr.active.every((id:string)=>rr.seen.includes(id)));check(rr.offers.length<=3&&rr.offers.every((id:string)=>!rr.active.includes(id)));if(r.stage==='relic')check(rr.offers.length>0&&r.map.nodes.find((n:any)=>n.id===r.map.current)?.kind==='midboss');else check(rr.offers.length===0);}else check(r.stage!=='relic');
 for(const snap of [r.entry,r.checkpoint])if(snap!==undefined){runBase(snap,initialDeck);if(snap.activeRelics!==undefined)relicList(snap.activeRelics);if(snap.relicRewardedNodes!==undefined){strings(snap.relicRewardedNodes,ids);unique(snap.relicRewardedNodes);}strings(snap.visited,ids);check(snap.current===null||ids.includes(snap.current));if(snap.caveiraHint!==undefined)check(caveira&&snap.caveiraHint===true&&snap.visited.includes(trial));}
 const a=p.account;check(object(a)&&text(a.id)&&integer(a.earned)&&typeof a.settled==='boolean'&&a.hero===r.group[0]&&!!p.collection[a.hero]?.count);strings(a.paidNodes,ids);unique(a.paidNodes);strings(a.seenBattles);unique(a.seenBattles);check(a.settled===(['won','lost'].includes(r.stage)||r.caveiraAftermath==='battle'));
 if(r.caveiraAftermath!==undefined)check(a.paidNodes.includes(final));
 if(r.stage==='battle'){battleSession(s.session);if(r.relicRun)check(JSON.stringify(s.session.state.relicState?.active.p1)===JSON.stringify(r.relicRun.active));check(s.session.state.runBattleId===`run-${r.seed}-battle-${r.battle}-${r.battleSeed}`&&s.session.state.phase!=='ended'&&s.session.seed===r.battleSeed);}else check(s.session===null);
 if(r.caveiraAftermath==='battle')check(s.session.state.encounter?.id==='caveira-captain');
}



