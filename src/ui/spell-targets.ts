import type {BattleState,PendingEffect,TargetRef} from '../battle/types.js';
import {targetKey} from '../battle/targets.js';

export function spellTargetKeys(state:BattleState,effect:PendingEffect):string[]{
 if(effect.mode==='colar-card'||effect.mode==='colar-next'||effect.mode==='colar')return [];
 const definition=state.definitions[effect.spellId??effect.source.definitionId];
 if(!definition?.area||effect.mode==='banjo'||effect.mode==='arsenal')return effect.targets.map(targetKey);
 const owners=definition.area==='all-units'?['p1','p2'] as const:[definition.area==='enemies'?(effect.owner==='p1'?'p2':'p1'):effect.owner] as const;
 const targets:TargetRef[]=owners.flatMap(player=>state.players[player].board.map(unit=>({kind:'unit' as const,player,instanceId:unit.card.instanceId})));
 if(definition.area==='all-friendly')targets.push({kind:'nexus',player:effect.owner});
 return targets.map(targetKey);
}

export function connectSpellTargets(root:HTMLElement):()=>void{
 const table=root.querySelector<HTMLElement>('.battle-table');
 if(!table)return ()=>{};
 const svg=document.createElementNS('http://www.w3.org/2000/svg','svg');
 svg.classList.add('spell-target-rays');svg.setAttribute('aria-hidden','true');table.append(svg);
 let frame=0;
 const draw=()=>{
  frame=0;svg.replaceChildren();
  root.querySelectorAll('.incoming-spell-target').forEach(el=>el.classList.remove('incoming-spell-target'));
  const bounds=table.getBoundingClientRect();
  svg.setAttribute('viewBox',`0 0 ${bounds.width} ${bounds.height}`);
  const endpoints=[...table.querySelectorAll<HTMLElement>('[data-spell-endpoint]')];
  const center=(el:HTMLElement)=>{
   const rect=el.getBoundingClientRect(),x=rect.x+rect.width/2,y=rect.y+rect.height/2;
   if(!rect.width||!rect.height||x<bounds.left||x>bounds.right||y<bounds.top||y>bounds.bottom)return null;
   for(let parent=el.parentElement;parent&&parent!==table;parent=parent.parentElement){
    if(/auto|scroll|hidden|clip/.test(getComputedStyle(parent).overflow)){
     const clip=parent.getBoundingClientRect();if(x<clip.left||x>clip.right||y<clip.top||y>clip.bottom)return null;
    }
   }
   return {x:x-bounds.x,y:y-bounds.y};
  };
  table.querySelectorAll<HTMLElement>('[data-spell-targets]').forEach(source=>{
   const start=center(source);if(!start)return;
   const keys:string[]=JSON.parse(source.dataset.spellTargets!);
   for(const key of keys){
    const target=endpoints.find(el=>el.dataset.spellEndpoint===key),end=target&&center(target);
    if(!target||!end)continue;
    const enemy=source.dataset.spellEnemy==='true';
    if(enemy)target.classList.add('incoming-spell-target');
    const group=document.createElementNS(svg.namespaceURI,'g');group.setAttribute('class',enemy?'enemy-ray':'friendly-ray');
    const path=document.createElementNS(svg.namespaceURI,'path');
    path.setAttribute('d',`M ${start.x} ${start.y} Q ${(start.x+end.x)/2+45} ${(start.y+end.y)/2} ${end.x} ${end.y}`);
    const dot=document.createElementNS(svg.namespaceURI,'circle');dot.setAttribute('cx',String(end.x));dot.setAttribute('cy',String(end.y));dot.setAttribute('r','13');
    group.append(path,dot);svg.append(group);
   }
  });
 };
 const schedule=()=>{if(!frame)frame=requestAnimationFrame(draw);};
 const observer=new ResizeObserver(schedule);observer.observe(table);
 root.addEventListener('scroll',schedule,true);window.addEventListener('resize',schedule);schedule();
 return ()=>{observer.disconnect();cancelAnimationFrame(frame);root.removeEventListener('scroll',schedule,true);window.removeEventListener('resize',schedule);svg.remove();root.querySelectorAll('.incoming-spell-target').forEach(el=>el.classList.remove('incoming-spell-target'));};
}
