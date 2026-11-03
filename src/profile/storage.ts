import type {Profile} from './profile.js';
import type {RunState} from '../run/run.js';
import type {BattleSession} from '../ui/session.js';
import {validateSave} from './validation.js';
export const saveKey='caps.profile.v1';
export interface SavedGame {profile:Profile;run:RunState|null;session:BattleSession|null}
export function encodeSave(save:SavedGame){return JSON.stringify({version:1,...save});}
export function decodeSave(raw:string):SavedGame {try{const s=JSON.parse(raw);
 // Version 1 originally shipped with four protagonists. Add only the four
 // newly introduced mastery records; missing older records remain invalid.
 if(s.version===1&&s.profile?.mastery&&['kylast','abe','arcata','rubel'].every(id=>s.profile.mastery[id]))for(const id of ['youro','kuara','thalion','lazaro'])s.profile.mastery[id]??={xp:0,rewarded:false};
 validateSave(s);return {profile:s.profile,run:s.run,session:s.session};}catch{throw Error('Salvamento inválido ou incompatível. O arquivo original foi preservado.');}}
export function importSave(storage:Pick<Storage,'setItem'>,raw:string):SavedGame {const saved=decodeSave(raw);storage.setItem(saveKey,encodeSave(saved));return saved;}
