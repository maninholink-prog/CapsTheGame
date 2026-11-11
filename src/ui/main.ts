import {connectSpellTargets} from './spell-targets.js';
import {fullCatalog,protagonistIds} from '../content/decks.js';
import {isCaveiraDeck} from '../content/caveira.js';
import {profileFrames,recordMatch} from '../profile/matches.js';
import type {ProfileFrame} from '../profile/matches.js';
import {connectRelicCollection} from './relic-view.js';
import {nextHomeScene} from './home-view.js';
import {fitViewport,prepareViewport,selectViewportTab} from './viewport.js';
import {renderBattleIntro,renderBattleResult} from './battle-screen.js';
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
import {heroPortrait} from './profile-view.js';
import type {HubPage,HubFilters} from './hub.js';
import type {Rarity} from '../content/schema.js';
import {esc} from './html.js';
import './hub.css';
import type {Champion} from '../content/schema.js';
import {buy,leaveShop} from '../run/shops.js';
import {createMapRun,enterNode,resolveCaveiraMap,resolveEvent,reviveRun,abandonRun} from '../run/adventure.js';
import {activeAdventure,hasOpenChart} from '../run/caveira-adventure.js';
import {effectiveDefinition} from '../battle/champions.js';
import {createRun,runBattle,finishBattle,recruit,reward,nextBattle} from '../run/run.js';
import type {RunState} from '../run/run.js';
import {focusMapPosition,renderEncounterPreview} from './map-view.js';
import {renderRun} from './run-view.js';
import './styles.css';
import './tactical.css';
import './card-face.css';
import './battle-polish.css';
import { createSession, sessionFromBattle, dispatchHuman, actingPlayer, concedeSession } from './session.js';
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
let homeScene=nextHomeScene(null);
try {homeScene=nextHomeScene(localStorage.getItem('caps.home-scene'));localStorage.setItem('caps.home-scene',homeScene);} catch { /* The default scene remains usable when storage is unavailable. */ }
let training=false;
let masteryHero:Champion|undefined;
let showMasteryDetails=false;
let battleResult:BattleSession|null=null;
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
let disconnectSpellTargets=()=>{};
function paint(): void {
  disconnectSpellTargets();
  paintScreen();
  connectRelicCollection(root);
  prepareViewport(root,page);
  focusMapPosition(root);
  disconnectSpellTargets=connectSpellTargets(root);
}
window.addEventListener('resize',()=>fitViewport(root));
root.addEventListener('toggle',()=>fitViewport(root),true);
root.addEventListener('load',()=>fitViewport(root),true);

function paintScreen(): void {
  persist();
  if(storageIssue){aiController.cancel();root.innerHTML=`<main class="hub"><h1>Salvamento protegido</h1><p class="error" role="alert">${esc(storageIssue)}</p><button class="button" data-action="profile-export">Exportar arquivo preservado</button> <button class="button" data-action="storage-retry">Tentar ler novamente</button><p>Você também pode restaurar um backup válido:</p><input type="file" id="import-save" accept="application/json,.json"/></main>`;return;}
  if(!profile){aiController.cancel();root.innerHTML=onboarding(hubError);return;}
  if(page!=='battle'){aiController.cancel();root.innerHTML=hubShell(page,hubContent(profile,page,run,filters,masteryHero,showMasteryDetails,homeScene,hubError),hubError);return;}
  const active = document.activeElement instanceof HTMLElement && root.contains(document.activeElement) ? document.activeElement : null;
  const keys = ['data-action', 'data-id', 'data-field', 'data-unit', 'data-strike', 'data-player', 'data-tab', 'data-definition', 'id', 'value'];
  const identity = active ? keys.filter(key => active.hasAttribute(key)).map(key => [key, active.getAttribute(key)!]) : [];
  const referenceOpen=root.querySelector<HTMLDetailsElement>('.battle-reference')?.open;
  const scrollAreas=['.hub:has(.tactical-battle)','.tactical-battle .action-panel','.battle-reference-content'];
  const scrollPositions=scrollAreas.map(selector=>root.querySelector<HTMLElement>(selector)?.scrollTop??0);
  const oldHand = root.querySelector<HTMLElement>('.hand-row');
  const handPosition = oldHand?.scrollLeft ?? 0;
  const oldOwner = oldHand?.dataset.player;
  const activeRun=training?null:run;
  const intro=(!activeRun||activeRun.stage==='battle')&&session.state.phase==='opening'&&!session.introSeen&&!session.state.players.p1.mulliganUsed&&!session.state.players.p2.mulliganUsed;
  if(intro||battleResult===session){
    aiController.cancel();
    root.innerHTML=hubShell('battle',intro?renderBattleIntro(session,training):renderBattleResult(session,training),hubError);
    root.querySelector<HTMLElement>('[data-action^="battle-"]')?.focus();
    return;
  }
  if(activeRun?.stage==='map'||activeRun?.stage==='shop'){
    aiController.cancel();
    root.innerHTML=renderRun(activeRun,session.error);
    return;
  }
  let body=activeRun&&activeRun.stage!=='battle'?renderRun(activeRun,session.error):render(session,draft,new Set(Object.keys(profile.collection).filter(id=>profile!.collection[id].shiny)));
  if(activeRun)body=body.replace('Sem salvamento nesta versão · recarregar reinicia o duelo','Aventura salva automaticamente · pause para voltar ao menu');
  root.innerHTML=hubShell('battle',body,hubError);
  if(training)root.querySelector('.training-options')?.insertAdjacentHTML('beforeend',protagonistSelector(selectedProtagonist));
  else root.querySelector('.training-options')?.remove();
  const reference=root.querySelector<HTMLDetailsElement>('.battle-reference');
  if(reference&&referenceOpen)reference.open=true;
  scrollAreas.forEach((selector,index)=>{
    const area=root.querySelector<HTMLElement>(selector);
    if(area)area.scrollTop=scrollPositions[index];
  });
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
  if(before.phase!=='ended'&&next.state.phase==='ended'){
    battleResult=next;
    const {winner,players}=next.state;
    if(training&&profile&&winner&&players.p1.protagonist)recordMatch(profile,players.p1.protagonist,'training',winner,Date.now());
  }
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
function showHandPreview(target:EventTarget|null):void {
  const preview=root.querySelector<HTMLElement>('.hand-preview');
  if(!preview)return;
  const card=target instanceof Element?target.closest('.hand-row .hand-card'):null;
  preview.hidden=!card;
  if(!card)return;
  preview.className='hand-preview '+[...card.classList].filter(name=>name.startsWith('rarity-')).join(' ');
  preview.replaceChildren(...[...card.children].map(node=>node.cloneNode(true)));
}
root.addEventListener('pointerover',event=>{
  if((event.target as Element).closest('.hand-card')!==(event.relatedTarget as Element|null)?.closest?.('.hand-card'))showHandPreview(event.target);
});
root.addEventListener('pointerout',event=>{
  if((event.target as Element).closest('.hand-card')!==(event.relatedTarget as Element|null)?.closest?.('.hand-card'))showHandPreview(event.relatedTarget);
});
root.addEventListener('focusin',event=>showHandPreview(event.target));
root.addEventListener('focusout',event=>showHandPreview(event.relatedTarget));
root.addEventListener('click', event => {
  const button = (event.target as Element).closest<HTMLButtonElement>('button[data-action]');
  if (!button || button.disabled) return;
  const action = button.dataset.action!;
  if(action==='toggle-fullscreen'){
    const toggle=document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
    void toggle.catch(()=>{hubError='Não foi possível alternar a tela cheia.';paint();});
    return;
  }
  if(action==='profile-customize'){root.querySelector<HTMLDialogElement>('#profile-customization')?.showModal();return;}
  if(action==='profile-customize-close'){root.querySelector<HTMLDialogElement>('#profile-customization')?.close();return;}
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
        if(next==='mastery'){showMasteryDetails=false;if(button.dataset.hero)masteryHero=button.dataset.hero as Champion;}
        if(next==='profile'&&button.dataset.tab)selectViewportTab(next,button.dataset.tab);
        page=next;
      }
      else if(action==='hub-mastery'){masteryHero=button.dataset.id as Champion;showMasteryDetails=true;}
      else if(action==='hub-mastery-back'){showMasteryDetails=false;}
      else if(action==='hub-unlock-test'){profile=unlockPlaytestHeroes(profile);page='adventure';}
      else if(action==='hub-training'){if(!training&&run?.stage==='battle')adventureSession=session;const deck=button.dataset.id??root.querySelector<HTMLSelectElement>('#caveira-training')?.value;training=true;session=createSession(crypto.getRandomValues(new Uint32Array(1))[0],'ai',selectedProtagonist,isCaveiraDeck(deck)?deck:undefined);draft=freshDraft();page='battle';}
      else if(action==='hub-start'){
        const hero=button.dataset.id as Champion;
        if(activeAdventure(run))throw Error('Encerre a aventura atual antes de iniciar outra.');
        if(!profile.collection[hero]?.count)throw Error('Protagonista bloqueado.');
        const initialRelic=root.querySelector<HTMLSelectElement>('#run-relic')?.value??'';if(initialRelic&&!profile.relicCollection?.[initialRelic]?.conquered)throw Error('Conquiste esta relíquia antes de selecioná-la.');
        const adventure=root.querySelector<HTMLSelectElement>('#run-adventure')?.value==='caveira-dourada'?'caveira-dourada':'dr-felix';
        selectedProtagonist=hero;run=createMapRun(crypto.getRandomValues(new Uint32Array(1))[0],hero,(root.querySelector<HTMLSelectElement>('#run-difficulty')?.value??'common') as Rarity,adventure);run=enableRelics(run,initialRelic||undefined);run.talents=[...(profile.talents?.[hero]??[])];run.collection=Object.keys(profile.collection);profile=startAccount(profile,run,`${now}-${run.seed}`);training=false;adventureSession=null;page='battle';draft=freshDraft();
      }
      else if(action==='hub-abandon'&&run){
        if(hasOpenChart(run)||run.caveiraAftermath==='battle')run=resolveCaveiraMap(run,'leave');
        else {const coins=run.coins,revives=run.revives;run={...structuredClone(run),stage:'lost',coins:0,revives:0};profile=settleRun(profile,run,coins,revives,now);}
        training=false;adventureSession=null;page='adventure';
      }
      else if(action==='talent-buy')profile=allocateTalent(profile,button.dataset.hero as Champion,button.dataset.id as TalentId,activeAdventure(run),now);
      else if(action==='talent-reset')profile=resetTalents(profile,button.dataset.hero as Champion,activeAdventure(run),now);
      else if(action==='booster-buy')profile=buyBooster(profile,button.dataset.id as Rarity,now);
      else if(action==='booster-open')profile=openBooster(profile,button.dataset.id as Rarity,now);
      else if(action==='weekly-claim')profile=claimWeekly(profile,Number(button.dataset.id),now);
      else if(action==='profile-rename'){const name=root.querySelector<HTMLInputElement>('#rename-profile')!.value.trim();if(!name||name.length>40)throw Error('Use um nome de 1 a 40 caracteres.');const avatar=root.querySelector<HTMLInputElement>('input[name="profile-avatar"]:checked')?.value as Champion;
        const frame=root.querySelector<HTMLSelectElement>('#profile-frame')!.value as ProfileFrame;
        if(!protagonistIds.includes(avatar)||!profile.collection[avatar]?.count||!Object.hasOwn(profileFrames,frame))throw Error('Escolha um retrato e uma moldura disponíveis.');
        profile={...profile,name,avatar,frame};}
      if(run?.collection&&profile)run.collection=Object.keys(profile.collection);
    }catch(error){hubError=error instanceof Error?error.message:'Ação indisponível.';}
    paint();
    if(action==='talent-buy'){
      const panel=root.querySelector<HTMLDetailsElement>('#talent-'+CSS.escape(button.dataset.id??'')+'-details')?.closest('details');
      if(panel){panel.open=true;panel.querySelector('summary')?.focus({preventScroll:true});}
    }
    if(action==='hub-unlock-test'){const setup=root.querySelector<HTMLDetailsElement>('.adventure-options');if(setup)setup.open=true;}
    if(action==='hub-nav'&&button.closest('.home-rail'))root.querySelector<HTMLElement>('.home-rail [aria-current]')?.focus({preventScroll:true});
    if(action==='hub-mastery'||action==='hub-mastery-back'){
      root.querySelector<HTMLElement>(showMasteryDetails?'[data-action="hub-mastery-back"]':'[data-action="hub-mastery"][aria-pressed="true"]')?.focus({preventScroll:true});
    }
    return;
  }
  if(page!=='battle')return;
  if(action==='battle-restart'){
    if(!window.confirm('Reiniciar esta batalha desde a mão inicial?'))return;
    aiController.cancel();battleResult=null;draft=freshDraft();
    if(training){const encounter=session.state.encounter?.id;session={...createSession(session.seed,session.opponentMode,selectedProtagonist,isCaveiraDeck(encounter)?encounter:undefined),introSeen:true};}
    else if(run?.stage==='battle')session={...sessionFromBattle(runBattle(run),run.battleSeed),introSeen:true};
    paint();return;
  }
  if(action==='battle-concede'){
    if(!window.confirm('Desistir desta batalha? O resultado será uma derrota.'))return;
    aiController.cancel();receive(concedeSession(session,training&&session.opponentMode==='manual'?session.viewPlayer:'p1'));return;
  }
  if(action==='battle-intro-continue'){session={...session,introSeen:true};paint();return;}
  if(action==='battle-result-continue'){battleResult=null;if(training)page='home';paint();return;}
  if(action==='shop-buy'||action==='shop-leave'){
    const shopScroll=root.querySelector<HTMLElement>('.shop-scroll')?.scrollTop??0;
    const oldCoins=run?.coins??0;
    try{if(!run)throw Error('Run indisponível.');run=action==='shop-leave'?leaveShop(run):buy(run,button.dataset.id!,root.querySelector<HTMLSelectElement>('#remove-card')?.value);session={...session,error:''};}catch(error){session={...session,error:error instanceof Error?error.message:'Compra indisponível.'};}
    if(profile&&run&&run.coins!==oldCoins)ledger(profile,run.coins-oldCoins,'Compra na loja da aventura',Date.now(),'korakacoins',run.coins);
    paint();
    const offers=root.querySelector<HTMLElement>('.shop-scroll');
    if(offers)offers.scrollTop=shopScroll;
    return;
  }
  if(action==='run-node'&&run){
    const preview=renderEncounterPreview(run,button.dataset.id!);
    if(preview){
      root.insertAdjacentHTML('beforeend',preview);
      const dialog=root.querySelector<HTMLDialogElement>('.encounter-preview')!;
      dialog.addEventListener('close',()=>dialog.remove(),{once:true});
      dialog.showModal();
      return;
    }
  }
  if(action.startsWith('run-')){
    aiController.cancel();
    const oldRun=run;
    try{
      if(action==='run-new'||action==='run-map-new'){const input=root.querySelector<HTMLInputElement>('#battle-seed');const seed=run?.seed??(input?Number(input.value):2026);run=action==='run-map-new'||run?.map?createMapRun(seed,selectedProtagonist):createRun(seed,selectedProtagonist);session=run.stage==='battle'?sessionFromBattle(runBattle(run),seed):createSession(seed,'ai');}
      else if(action==='run-exit'){page='home';}
      else if(run){if(action==='run-node'||action==='run-fight'){
        const next=enterNode(run,button.dataset.id!);
        if(next.stage==='battle')session=sessionFromBattle(runBattle(next),next.battleSeed);
        run=next;
      }
      else if(action==='run-event-accept'||action==='run-event-skip')run=resolveEvent(run,action==='run-event-accept');
      else if(action==='run-chart-inspect'||action==='run-chart-leave'||action==='run-chart-fight'){
        run=resolveCaveiraMap(run,action==='run-chart-inspect'?'inspect':action==='run-chart-fight'?'fight':'leave');
        if(run.stage==='battle')session=sessionFromBattle(runBattle(run),run.battleSeed);
      }
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
  if(action==='caveira-choice'){const player=actingPlayer(session.state);if(player)send({type:'chooseCaveira',player,targetId:button.dataset.id??''});return;}
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
  } else if (action === 'inspect-effect') {
    draft.inspectedDefinitionId=button.dataset.definition!;
    draft.sideTab='stack';
    const reference=root.querySelector<HTMLDetailsElement>('.battle-reference');
    if(reference)reference.open=true;
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
    if (command) {
      send(command);
      if(command.type==='start'){
        const result=session.history.filter(entry=>entry.message.startsWith('d20:')).at(-1)?.message;
        if(result){
          const dice=document.createElement('div');
          dice.className='dice-roll';dice.setAttribute('role','status');dice.setAttribute('aria-label',result);
          dice.innerHTML='<span aria-hidden="true">20</span>';
          root.append(dice);
          window.setTimeout(()=>{dice.textContent=result;dice.classList.add('dice-result');},window.matchMedia('(prefers-reduced-motion: reduce)').matches?0:700);
          window.setTimeout(()=>dice.remove(),2600);
        }
      }
      return;
    }
  } else if (action === 'pass') {
    const player = actingPlayer(session.state);
    if (player) { send({ type: 'pass', player }); return; }
  }
  paint();
});

root.addEventListener('change', event => {
  const input = event.target as HTMLInputElement | HTMLSelectElement;
  if(input.id==='protagonist'||input.name==='protagonist'){selectedProtagonist=input.value as Champion;return;}
  if(input.name==='profile-avatar'){
    const hero=input.value as Champion;
    if(!profile||!protagonistIds.includes(hero)||!profile.collection[hero]?.count)return;
    const preview=root.querySelector<HTMLElement>('.profile-avatar-preview');
    if(preview){preview.innerHTML=heroPortrait(hero);preview.className=`profile-avatar-preview frame-${profile.frame??'gold'}`;}
    const caption=root.querySelector<HTMLElement>('.profile-avatar-caption strong');
    if(caption)caption.textContent=fullCatalog[hero].name??hero;
    return;
  }
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
