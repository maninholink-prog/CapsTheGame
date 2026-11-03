import {enableRelics,takeRelic} from '../run/relics.js';
import {discoverRelics} from '../profile/relics.js';
import {targetKey} from '../battle/targets.js';
import {directTargets} from './forms.js';
import {allocateTalent,resetTalents} from '../profile/talents.js';
import type {TalentId} from '../profile/talents.js';
import {protagonistSelector} from './protagonist.js';
import {unlockPlaytestHeroes,createProfile,claimWeekly,ledger,syncWeek} from '../profile/profile.js';
import type {Profile} from '../profile/profile.js';
import {buyBooster,openBooster} from '../profile/boosters.js';
import {startAccount,settleBattle,settleRun} from '../profile/rewards.js';
import {saveKey,decodeSave,encodeSave,importSave} from '../profile/storage.js';
import {hubShell,hubContent,onboarding} from './hub.js';
import type {HubPage,HubFilters} from './hub.js';
import type {Rarity} from '../content/schema.js';
import {esc} from './html.js';
import './hub.css';
import type {Champion} from '../content/schema.js';
import {buy,leaveShop} from '../run/shops.js';
import {createMapRun,enterNode,resolveEvent,reviveRun,abandonRun} from '../run/adventure.js';
import {effectiveDefinition} from '../battle/champions.js';
import {createRun,runBattle,finishBattle,recruit,reward,nextBattle} from '../run/run.js';
import type {RunState} from '../run/run.js';
import {renderRun,runBanner} from './run-view.js';
import './styles.css';
import './tactical.css';
import { createSession, sessionFromBattle, dispatchHuman, actingPlayer } from './session.js';
import { createAiController } from './ai-controller.js';
import type { BattleSession, OpponentMode } from './session.js';
import { chooseBlockUnit, chooseDirectTarget, freshDraft, actionCommand, selectedWeapons } from './forms.js';
import { render } from './render.js';
import { handCardMode } from './presentation.js';
import type { PlayerId } from '../battle/types.js';
import type { Command } from '../battle/commands.js';

const root = document.querySelector<HTMLDivElement>('#app')!;
let session = createSession(2026, 'ai');
let selectedProtagonist:Champion='kylast';
let draft = freshDraft();
let run:RunState|null=null;
let profile:Profile|null=null;
let page:HubPage='home';
let training=false;
let adventureSession:BattleSession|null=null;
let lastGood='';
let rawSave='';
let storageIssue='';
let hubError='';
const filters:HubFilters={search:'',rarity:'',region:'',owned:''};
try {rawSave=localStorage.getItem(saveKey)??'';if(rawSave){const saved=decodeSave(rawSave);profile=saved.profile;run=saved.run;adventureSession=saved.session;if(saved.session)session=saved.session;lastGood=rawSave;if(run)selectedProtagonist=run.group[0];}}
catch(error){storageIssue=error instanceof Error?error.message:'Não foi possível ler o salvamento.';}
function download(raw:string,name:string){const url=URL.createObjectURL(new Blob([raw],{type:'application/json'}));const a=document.createElement('a');a.href=url;a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);}
function persist(){
 if(!profile||storageIssue)return;
 syncWeek(profile,Date.now());
 const next=encodeSave({profile,run:run?.map?run:null,session:run?.map&&run.stage==='battle'?(training?adventureSession:session):null});
 if(next===lastGood)return;
 try{localStorage.setItem(saveKey,next);lastGood=next;rawSave=next;}
 catch{if(lastGood){const old=decodeSave(lastGood);profile=old.profile;run=old.run;adventureSession=old.session;if(old.session)session=old.session;}storageIssue='Não foi possível salvar no navegador. A última versão salva foi preservada; exporte um backup antes de continuar.';}
}
function paint(): void {
  persist();
  if(storageIssue){aiController.cancel();root.innerHTML=`<main class="hub"><h1>Salvamento protegido</h1><p class="error" role="alert">${esc(storageIssue)}</p><button class="button" data-action="profile-export">Exportar arquivo preservado</button> <button class="button" data-action="storage-retry">Tentar ler novamente</button><p>Você também pode restaurar um backup válido:</p><input type="file" id="import-save" accept="application/json,.json"/></main>`;return;}
  if(!profile){aiController.cancel();root.innerHTML=onboarding(hubError);return;}
  if(page!=='battle'){aiController.cancel();root.innerHTML=hubShell(profile,page,run,hubContent(profile,page,run,filters),hubError);return;}
  const active = document.activeElement instanceof HTMLElement && root.contains(document.activeElement) ? document.activeElement : null;
  const keys = ['data-action', 'data-id', 'data-field', 'data-unit', 'data-strike', 'data-player', 'data-tab', 'data-definition', 'id', 'value'];
  const identity = active ? keys.filter(key => active.hasAttribute(key)).map(key => [key, active.getAttribute(key)!]) : [];
  const oldHand = root.querySelector<HTMLElement>('.hand-row');
  const handPosition = oldHand?.scrollLeft ?? 0;
  const oldOwner = oldHand?.dataset.player;
  const activeRun=training?null:run;
  let body=activeRun&&activeRun.stage!=='battle'?renderRun(activeRun,session.error):render(session,draft,new Set(Object.keys(profile.collection).filter(id=>profile!.collection[id].shiny))).replace('<main',`${activeRun?runBanner(activeRun):''}<main`);
  if(activeRun)body=body.replace('Sem salvamento nesta versão · recarregar reinicia o duelo','Aventura salva automaticamente · pause para voltar ao menu');
  root.innerHTML=hubShell(profile,'battle',run,body,hubError);
  if(training)root.querySelector('.topbar')?.insertAdjacentHTML('beforeend',protagonistSelector(selectedProtagonist));
  else {root.querySelector('.new-game')?.remove();root.querySelector('.mode-choice')?.remove();}
  const newHand = root.querySelector<HTMLElement>('.hand-row');
  if (newHand && newHand.dataset.player === oldOwner) newHand.scrollLeft = handPosition;
  if (identity.length) {
    const replacement = [...root.querySelectorAll<HTMLElement>('button,input,select')].find(el => identity.every(([key, value]) => el.getAttribute(key) === value));
    replacement?.focus({ preventScroll: true });
  }
  if(!training&&run&&run.stage!=='battle')aiController.cancel();else aiController.schedule();
}
function receive(next: BattleSession): void {
  const before = session.state;
  session = next;
  if(!training&&run?.stage==='battle'&&session.state.phase==='ended'){const beforeRun=run;run=finishBattle(run,session.state);if(profile&&run.map)profile=settleBattle(profile,beforeRun,run,session.state,Date.now());}
  if (session.state !== before) {
    const { inspectedDefinitionId, sideTab } = draft;
    draft = { ...freshDraft(), inspectedDefinitionId, sideTab };
  }
  paint();
}
function send(command: Command): void { receive(dispatchHuman(session, command)); }
const aiController = createAiController({ getSession: () => session, commit: receive });
function toggleAttacker(id: string): void {
  draft.attackers = draft.attackers.includes(id) ? draft.attackers.filter(a => a !== id) : [...draft.attackers, id];
}
root.addEventListener('click', event => {
  const button = (event.target as Element).closest<HTMLButtonElement>('button[data-action]');
  if (!button || button.disabled) return;
  const action = button.dataset.action!;
  if(action==='profile-export'){download(storageIssue?rawSave:lastGood,'caps-backup.json');return;}
  if(action==='storage-retry'){location.reload();return;}
  if(storageIssue)return;
  if(action==='profile-create'||action.startsWith('hub-')||action.startsWith('booster-')||action==='weekly-claim'||action==='profile-rename'||action.startsWith('talent-')){
    aiController.cancel();hubError='';
    try {
      const now=Date.now();
      if(action==='profile-create'){profile=createProfile(root.querySelector<HTMLInputElement>('#profile-name')!.value,button.dataset.id as Champion,crypto.getRandomValues(new Uint32Array(1))[0],now);}
      else if(!profile)throw Error('Crie seu perfil primeiro.');
      else if(action==='hub-nav'){
        const next=button.dataset.id as HubPage;
        if(!training&&run?.stage==='battle')adventureSession=session;
        if(next==='battle'){if(!run)throw Error('Nenhuma aventura em andamento.');training=false;if(adventureSession)session=adventureSession;}
        page=next;
      }
      else if(action==='hub-unlock-test'){profile=unlockPlaytestHeroes(profile);page='adventure';}
      else if(action==='hub-training'){if(!training&&run?.stage==='battle')adventureSession=session;training=true;session=createSession(crypto.getRandomValues(new Uint32Array(1))[0],'ai',selectedProtagonist);draft=freshDraft();page='battle';}
      else if(action==='hub-start'){
        const hero=button.dataset.id as Champion;
        if(run&&!['won','lost'].includes(run.stage))throw Error('Encerre a aventura atual antes de iniciar outra.');
        if(!profile.collection[hero]?.count)throw Error('Protagonista bloqueado.');
        const initialRelic=root.querySelector<HTMLSelectElement>('#run-relic')?.value??'';if(initialRelic&&!profile.relicCollection?.[initialRelic]?.conquered)throw Error('Conquiste esta relíquia antes de selecioná-la.');
        selectedProtagonist=hero;run=createMapRun(crypto.getRandomValues(new Uint32Array(1))[0],hero,(root.querySelector<HTMLSelectElement>('#run-difficulty')?.value??'common') as Rarity);run=enableRelics(run,initialRelic||undefined);run.talents=[...(profile.talents?.[hero]??[])];run.collection=Object.keys(profile.collection);profile=startAccount(profile,run,`${now}-${run.seed}`);training=false;adventureSession=null;page='battle';draft=freshDraft();
      }
      else if(action==='hub-abandon'&&run){const coins=run.coins,revives=run.revives;run={...structuredClone(run),stage:'lost',coins:0,revives:0};profile=settleRun(profile,run,coins,revives,now);training=false;page='adventure';}
      else if(action==='talent-buy')profile=allocateTalent(profile,button.dataset.hero as Champion,button.dataset.id as TalentId,!!run&&!['won','lost'].includes(run.stage),now);
      else if(action==='talent-reset')profile=resetTalents(profile,button.dataset.hero as Champion,!!run&&!['won','lost'].includes(run.stage),now);
      else if(action==='booster-buy')profile=buyBooster(profile,button.dataset.id as Rarity,now);
      else if(action==='booster-open')profile=openBooster(profile,button.dataset.id as Rarity,now);
      else if(action==='weekly-claim')profile=claimWeekly(profile,Number(button.dataset.id),now);
      else if(action==='profile-rename'){const name=root.querySelector<HTMLInputElement>('#rename-profile')!.value.trim();if(!name||name.length>40)throw Error('Use um nome de 1 a 40 caracteres.');profile={...profile,name};}
      if(run?.collection&&profile)run.collection=Object.keys(profile.collection);
    }catch(error){hubError=error instanceof Error?error.message:'Ação indisponível.';}
    paint();return;
  }
  if(page!=='battle')return;
  if(action==='shop-buy'||action==='shop-leave'){
    const oldCoins=run?.coins??0;
    try{if(!run)throw Error('Run indisponível.');run=action==='shop-leave'?leaveShop(run):buy(run,button.dataset.id!,root.querySelector<HTMLSelectElement>('#remove-card')?.value);session={...session,error:''};}catch(error){session={...session,error:error instanceof Error?error.message:'Compra indisponível.'};}
    if(profile&&run&&run.coins!==oldCoins)ledger(profile,run.coins-oldCoins,'Compra na loja da aventura',Date.now(),'korakacoins',run.coins);
    paint();return;
  }
  if(action.startsWith('run-')){
    aiController.cancel();
    const oldRun=run;
    try{
      if(action==='run-new'||action==='run-map-new'){const input=root.querySelector<HTMLInputElement>('#battle-seed');const seed=run?.seed??(input?Number(input.value):2026);run=action==='run-map-new'||run?.map?createMapRun(seed,selectedProtagonist):createRun(seed,selectedProtagonist);session=run.stage==='battle'?sessionFromBattle(runBattle(run),seed):createSession(seed,'ai');}
      else if(action==='run-exit'){page='home';}
      else if(run){if(action==='run-node'){run=enterNode(run,button.dataset.id!);if(run.stage==='battle')session=sessionFromBattle(runBattle(run),run.battleSeed);}
      else if(action==='run-event-accept'||action==='run-event-skip')run=resolveEvent(run,action==='run-event-accept');
      else if(action==='run-retry'||action==='run-checkpoint'){run=reviveRun(run,action==='run-retry'?'retry':'checkpoint');session=run.stage==='battle'?sessionFromBattle(runBattle(run),run.battleSeed):{...session,state:{...session.state,phase:'ended',priorityOwner:null}};}
      else if(action==='run-abandon'){const beforeRun=run;run=abandonRun(run);if(profile)profile=settleRun(profile,run,beforeRun.coins,beforeRun.revives,Date.now());}
      else if(action==='run-relic'){run=takeRelic(run,button.dataset.id!);if(profile)profile=discoverRelics(profile,run);}
      else if(action==='run-recruit')run=recruit(run,button.dataset.id!);else if(action==='run-reward')run=reward(run,button.dataset.id!);else if(action==='run-skip')run=reward(run,null);else if(action==='run-next'){run=nextBattle(run);session=sessionFromBattle(runBattle(run),run.battleSeed);}}
      if(profile&&run&&oldRun&&action!=='run-abandon'&&run.coins!==oldRun.coins)ledger(profile,run.coins-oldRun.coins,action==='run-checkpoint'?'Retorno ao checkpoint':action==='run-retry'?'Reviver na batalha':'Recompensa da aventura',Date.now(),'korakacoins',run.coins);
      session={...session,error:''};draft=freshDraft();
    }catch(error){session={...session,error:error instanceof Error?error.message:'Não foi possível avançar a run.'};}
    paint();return;
  }
  if(action==='tornado-choice'||action==='lab-surgery'){const player=actingPlayer(session.state);if(player)send({type:action==='tornado-choice'?'chooseTornado':'surgery',player,targetId:button.dataset.id!});return;}
  if(action==='form-choice'){const owner=actingPlayer(session.state);if(owner)send({type:'chooseForm',player:owner,form:button.dataset.id as 'bear'|'tiger'});return;}
  if(action==='upgrade-choice'){const owner=actingPlayer(session.state);if(owner)send({type:'chooseUpgrade',player:owner,definitionId:button.dataset.id!});return;}
  if (action === 'new') {
    const value = root.querySelector<HTMLInputElement>('#battle-seed')!.value;
    const seed = Number(value);
    if (!/^\d+$/.test(value) || !Number.isSafeInteger(seed) || seed < 0 || seed > 0xffffffff) {
      session = { ...session, error: 'Informe uma semente inteira entre 0 e 4294967295.' };
    } else {
      const mode = root.querySelector<HTMLSelectElement>('#opponent-mode')!.value as OpponentMode;
      aiController.cancel(); session = createSession(seed, mode,selectedProtagonist); draft = freshDraft();
    }
  } else if (action === 'view' || action === 'follow') {
    const player = action === 'follow' ? actingPlayer(session.state) : button.dataset.player as PlayerId;
    if (player && (session.opponentMode !== 'ai' || player === 'p1')) { session = { ...session, viewPlayer: player, error: '' }; draft = { ...freshDraft(), sideTab: draft.sideTab }; }
  } else if (action === 'tab') {
    draft.sideTab = button.dataset.tab as typeof draft.sideTab;
  } else if (action === 'inspect') {
    draft.inspectedDefinitionId = button.dataset.definition!;
  } else if (action === 'hand-card') {
    const id = button.dataset.id!;
    const card = session.state.players[session.viewPlayer].hand.find(c => c.instanceId === id)!;
    draft.inspectedDefinitionId = effectiveDefinition(session.state,session.viewPlayer,card).id;
    if (session.state.phase === 'opening') {
      if (actingPlayer(session.state) === session.viewPlayer && !session.state.players[session.viewPlayer].mulliganUsed)
        draft.mulligan = draft.mulligan.includes(id) ? draft.mulligan.filter(c => c !== id) : [...draft.mulligan, id];
    } else {
      draft.mode = 'card'; draft.selectedCardId = id; draft.targetKeys = []; draft.equipmentId = ''; draft.replaceEquipmentId = ''; draft.replaceUnitId = ''; draft.position = '';
      const mode = handCardMode(session.state, session.viewPlayer, card);
      draft.targetId = '';
    }
  } else if (action === 'unit') {
    const owner = button.dataset.owner as PlayerId;
    const id = button.dataset.id!;
    const unit = session.state.players[owner].board.find(u => u.card.instanceId === id)!;
    draft.inspectedDefinitionId = unit.card.definitionId;
    if(chooseBlockUnit(session,draft,owner,id)){} 
    else if(chooseDirectTarget(session,draft,{kind:'unit',player:owner,instanceId:id})){} 
    else if (draft.mode === 'attack' && owner === session.viewPlayer && owner === actingPlayer(session.state)) toggleAttacker(id);
  } else if(action==='field-nexus') {
    chooseDirectTarget(session,draft,{kind:'nexus',player:button.dataset.owner as PlayerId});
  } else if(action==='field-target') {
    const key=button.dataset.key!;
    const target=directTargets(session,draft)?.options.find(t=>targetKey(t)===key);
    if(target)chooseDirectTarget(session,draft,target);
  } else if(action==='clear-block') {
    const id=draft.blockAttackerId??session.state.combat?.lanes[0]?.attackerId;if(id)delete draft.blocks[id];
  } else if (action === 'attack-mode') {
    draft.mode = 'attack'; draft.selectedCardId = null; draft.attackers = []; draft.weapons = {};
  } else if (action === 'cancel-attack') {
    draft.mode = 'card'; draft.attackers = [];
  } else if (action === 'toggle-attacker') {
    toggleAttacker(button.dataset.id!);
  } else if (action === 'order-left' || action === 'order-right') {
    const index = draft.attackers.indexOf(button.dataset.id!);
    const target = index + (action === 'order-left' ? -1 : 1);
    if (target >= 0 && target < draft.attackers.length) [draft.attackers[index], draft.attackers[target]] = [draft.attackers[target], draft.attackers[index]];
  } else if (action === 'confirm') {
    const command = actionCommand(session, draft);
    if (command) { send(command); return; }
  } else if (action === 'pass') {
    const player = actingPlayer(session.state);
    if (player) { send({ type: 'pass', player }); return; }
  }
  paint();
});

root.addEventListener('change', event => {
  const input = event.target as HTMLInputElement | HTMLSelectElement;
  if(input.id==='protagonist'){selectedProtagonist=input.value as Champion;return;}
  if(input.id==='import-save'){
    const file=(input as HTMLInputElement).files?.[0];if(!file)return;
    void file.text().then(raw=>{const saved=importSave(localStorage,raw);profile=saved.profile;run=saved.run;adventureSession=saved.session;session=saved.session??createSession(2026,'ai');lastGood=raw;rawSave=raw;storageIssue='';hubError='';page='home';training=false;paint();}).catch(error=>{hubError=error instanceof Error?error.message:'Falha na restauração.';if(storageIssue)storageIssue=hubError;paint();});return;
  }
  if(input.id.startsWith('collection-')){const key=input.id.slice(11) as keyof HubFilters;filters[key]=input.value;paint();return;}
  const field = input.dataset.field;
  const value = input.value;
  if (field === 'block') draft.blocks[input.dataset.unit!] = value;
  else if (field === 'banjo') draft.banjos[input.dataset.unit!] = value;
  else if (field === 'weapon') {
    const id = input.dataset.unit!;
    const choices = selectedWeapons(session.state, session.viewPlayer, id, draft);
    choices[Number(input.dataset.strike)] = value || null;
    draft.weapons[id] = choices;
  } else if (field === 'spell-target') {
    draft.targetKeys = (input as HTMLInputElement).checked ? [...draft.targetKeys, value] : draft.targetKeys.filter(t => t !== value);
  } else if (field && ['targetId', 'equipmentId', 'replaceEquipmentId', 'replaceUnitId', 'position'].includes(field)) {
    (draft as unknown as Record<string, unknown>)[field] = value;
    if (field === 'targetId') draft.replaceEquipmentId = '';
    if (field === 'replaceUnitId') draft.position = '';
  }
  if (field) paint();
});
paint();




