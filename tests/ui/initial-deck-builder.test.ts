import {expect,it} from 'vitest';
import type {Champion} from '../../src/content/schema.js';
import {createProfile,grantCard,masteryCost} from '../../src/profile/profile.js';
import {initialDeckCore} from '../../src/profile/initial-decks.js';
import {hubContent} from '../../src/ui/hub.js';
import {renderInitialDeckEditor} from '../../src/ui/initial-deck-view.js';

const filters={search:'',rarity:'',region:'',owned:''};
function profileAt(level:number){
 const p=createProfile('Teste','abe',1,0) as ReturnType<typeof createProfile>;
 p.mastery.abe.xp=Array.from({length:level-1},(_,i)=>masteryCost(i+1)).reduce((a,b)=>a+b,0);
 return grantCard(p,'lab-vigia-de-corda',false,0);
}

it('shows the edit action only when the selected protagonist has mastery 15',()=>{
 expect(hubContent(profileAt(15),'adventure',null,filters)).toContain('data-action="hub-deck-edit" data-id="abe"');
 expect(hubContent(profileAt(14),'adventure',null,filters)).not.toContain('data-action="hub-deck-edit" data-id="abe"');
});

it('renders the locked six-card package and only selectable owned regional extras',()=>{
 const p=profileAt(15),html=renderInitialDeckEditor(p,'abe',[...initialDeckCore('abe'),'zacarias','zacarias','lab-vigia-de-corda']);
 expect(html).toContain('Pacote característico · 6 cartas');
 expect(html).toContain('data-action="hub-deck-add"');
 expect(html).toContain('lab-vigia-de-corda');
 expect(html).toContain('Cartas de inimigos');
 expect(html.match(/data-id="zacarias"/g)).toHaveLength(1);
 expect(html).toContain('×1</strong>');
 expect(html).toContain('×2</strong>');
 expect(html).not.toContain('data-action="hub-deck-remove" data-id="abe"');
 expect(html).toContain('data-action="hub-deck-save"');
});
