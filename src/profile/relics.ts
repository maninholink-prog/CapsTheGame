import type {Profile} from './profile.js';
import type {RunState} from '../run/run.js';
export function discoverRelics(profile:Profile,run:RunState):Profile {
 const p=structuredClone(profile);
 for(const id of run.relicRun?.seen??[]){p.relicCollection??={};p.relicCollection[id]??={conquered:false};}
 return p;
}
export function conquerRelics(profile:Profile,run:RunState):Profile {
 const p=discoverRelics(profile,run);
 if(run.stage==='won')for(const id of run.relicRun?.active??[]){p.relicCollection??={};p.relicCollection[id]={conquered:true};}
 return p;
}
