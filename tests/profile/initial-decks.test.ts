import {describe,expect,it} from 'vitest';
import type {Champion} from '../../src/content/schema.js';
import {createProtagonistDeck} from '../../src/content/decks.js';
import {createProfile,grantCard,masteryCost,unlockPlaytestHeroes} from '../../src/profile/profile.js';
import {decodeSave,encodeSave} from '../../src/profile/storage.js';
import {addInitialDeckCard,editableInitialDeckCards,initialDeckCore,initialDeckIds,removeInitialDeckCard,saveInitialDeck} from '../../src/profile/initial-decks.js';

function profileAt(hero:Champion,level:number){
 const p=unlockPlaytestHeroes(createProfile('Teste',hero,1,0));
 p.mastery[hero].xp=Array.from({length:level-1},(_,i)=>masteryCost(i+1)).reduce((a,b)=>a+b,0);
 return p;
}
function legalDeck(p:ReturnType<typeof profileAt>,hero:Champion){
 const ids=initialDeckCore(hero),base=initialDeckIds(p,hero),size=base.length;
 for(const id of editableInitialDeckCards(p,hero).filter(id=>!ids.includes(id))){
  const owned=p.collection[id]?.count??0;
  for(let n=0;n<Math.min(2,owned)&&ids.length<size;n++)ids.push(id);
 }
 return ids;
}

describe('deck inicial por maestria',()=>{
 it('mantém duas cópias das três identidades características e o tamanho original por protagonista',()=>{
  for(const hero of ['kylast','abe','arcata','rubel','youro','kuara','thalion','lazaro'] as const){
   const core=initialDeckCore(hero);
   expect(core).toHaveLength(6);
   expect(Object.values(core.reduce<Record<string,number>>((counts,id)=>({...counts,[id]:(counts[id]??0)+1}),{}))).toEqual([2,2,2]);
   expect(initialDeckIds(profileAt(hero,15),hero)).toHaveLength(createProtagonistDeck(hero,'expected').length);
  }
 });

 it('libera a edição no nível 15 e lista cartas possuídas, regionais e neutras, incluindo enemyOnly',()=>{
  const p=grantCard(profileAt('abe',15),'lab-vigia-de-corda',false,0);
  expect(editableInitialDeckCards(p,'abe')).toContain('lab-vigia-de-corda');
  expect(editableInitialDeckCards(p,'abe')).toContain('joia-rubra');
  expect(editableInitialDeckCards(p,'abe')).not.toContain('lab-automato-de-contencao');
  expect(editableInitialDeckCards(profileAt('abe',14),'abe')).toEqual([]);
 });

 it('salva um deck regional válido e devolve a configuração persistida',()=>{
  const p=profileAt('abe',15),ids=legalDeck(p,'abe');
  expect(ids).toHaveLength(createProtagonistDeck('abe','expected').length);
  const saved=saveInitialDeck(p,'abe',ids);
  expect(initialDeckIds(saved,'abe')).toEqual(ids);
 });

 it('adiciona e remove uma cópia livre, sem permitir alterar as seis cartas fixas',()=>{
  const p=grantCard(profileAt('abe',15),'lab-vigia-de-corda',false,0),ids=initialDeckCore('abe');
  const one=addInitialDeckCard(p,'abe',ids,'lab-vigia-de-corda');
  expect(one.filter(id=>id==='lab-vigia-de-corda')).toHaveLength(1);
  expect(removeInitialDeckCard('abe',one,'lab-vigia-de-corda')).toEqual(ids);
  expect(()=>removeInitialDeckCard('abe',ids,'abe')).toThrow();
 });

 it('rejeita decks que removem o núcleo, alteram o tamanho ou usam cópias não possuídas',()=>{
  const p=profileAt('abe',15),ids=legalDeck(p,'abe');
  expect(()=>saveInitialDeck(p,'abe',ids.slice(1))).toThrow();
  expect(()=>saveInitialDeck(p,'abe',[...ids,'abe'])).toThrow();
  const unowned=ids.map((id,i)=>i===6?'lab-vigia-de-corda':id);
  expect(()=>saveInitialDeck(p,'abe',unowned)).toThrow();
 });

 it('rejeita cartas fora da região ou exclusivas de outro campeão',()=>{
  const p=grantCard(grantCard(profileAt('abe',15),'lab-vigia-de-corda',false,0),'lab-automato-de-contencao',false,0),ids=legalDeck(p,'abe');
  const wrongRegion=ids.map((id,i)=>i===6?'lab-automato-de-contencao':id);
  expect(()=>saveInitialDeck(p,'abe',wrongRegion)).toThrow();
  const wrongExclusive=ids.map((id,i)=>i===6?'sword-kylast':id);
  expect(()=>saveInitialDeck(p,'abe',wrongExclusive)).toThrow();
 });

 it('preserva loadouts no save e continua aceitando saves antigos sem o campo',()=>{
  const p=profileAt('abe',15),ids=legalDeck(p,'abe'),saved=saveInitialDeck(p,'abe',ids);
  const restored=decodeSave(encodeSave({profile:saved,run:null,session:null}));
  expect(restored.profile.initialDecks?.abe).toEqual(ids);
  const legacy={...p};delete (legacy as Partial<typeof legacy>).initialDecks;
  expect(decodeSave(encodeSave({profile:legacy,run:null,session:null})).profile.initialDecks).toBeUndefined();
 });

 it('rejeita um loadout inválido carregado do save',()=>{
  const p=grantCard(grantCard(profileAt('abe',15),'lab-vigia-de-corda',false,0),'lab-automato-de-contencao',false,0),ids=legalDeck(p,'abe');
  const invalid=ids.map((id,i)=>i===6?'lab-automato-de-contencao':id);
  expect(()=>decodeSave(encodeSave({profile:{...p,initialDecks:{abe:invalid}},run:null,session:null}))).toThrow();
 });
});
