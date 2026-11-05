import {protagonistIds} from '../content/decks.js';
import type {Champion} from '../content/schema.js';
import type {Profile} from './profile.js';

export const profileFrames={gold:'Dourada',silver:'Prateada',jade:'Jade'} as const;
export type ProfileFrame=keyof typeof profileFrames;
export const matchModes={adventure:'Aventura',training:'Treino'} as const;
export const matchResults={p1:'Vitória',p2:'Derrota',draw:'Empate'} as const;
export interface Match {
 hero:Champion;
 mode:keyof typeof matchModes;
 result:keyof typeof matchResults;
 time:number;
}

export function recordMatch(profile:Profile,hero:Champion,mode:Match['mode'],result:Match['result'],time:number):void {
 (profile.matches??=[]).push({hero,mode,result,time});
}

export function topHeroes(profile:Profile) {
 const counts=new Map<Champion,{hero:Champion;played:number;wins:number}>();
 for(const match of profile.matches??[]){
  if(match.mode!=='adventure')continue;
  const row=counts.get(match.hero)??{hero:match.hero,played:0,wins:0};
  row.played++;
  if(match.result==='p1')row.wins++;
  counts.set(match.hero,row);
 }
 return [...counts.values()].sort((a,b)=>b.played-a.played||b.wins-a.wins||
  profile.mastery[b.hero].xp-profile.mastery[a.hero].xp||
  protagonistIds.indexOf(a.hero)-protagonistIds.indexOf(b.hero)).slice(0,3);
}
