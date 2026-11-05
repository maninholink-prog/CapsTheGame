import {expect,it} from 'vitest';
import {createProfile} from '../src/profile/profile.js';
import {recordMatch,topHeroes} from '../src/profile/matches.js';
import {decodeSave,encodeSave} from '../src/profile/storage.js';

it('keeps training in the save and ranks only matches that grant mastery',()=>{
 const p=createProfile('Teste','rubel',1,0);
 const roundTrip=()=>decodeSave(encodeSave({profile:p,run:null,session:null})).profile;
 expect(topHeroes(roundTrip())).toEqual([]);
 recordMatch(p,'abe','training','p1',1);
 recordMatch(p,'rubel','adventure','draw',2);
 recordMatch(p,'arcata','adventure','p1',3);
 expect(topHeroes(roundTrip()).map(row=>row.hero)).toEqual(['arcata','rubel']);
 expect(roundTrip().matches).toHaveLength(3);
 p.avatar='rubel';
 p.frame='jade';
 expect(roundTrip()).toMatchObject({avatar:'rubel',frame:'jade'});
 p.avatar='abe';
 expect(roundTrip).toThrow('Salvamento inválido');
});
