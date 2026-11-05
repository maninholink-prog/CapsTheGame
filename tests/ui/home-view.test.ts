import {hubContent,hubShell} from '../../src/ui/hub.js';
import {expect,it} from 'vitest';
import {createProfile} from '../../src/profile/profile.js';
import {createMapRun} from '../../src/run/adventure.js';
import {nextHomeScene,renderHome} from '../../src/ui/home-view.js';

it('alternates both scenes and uses the current profile and adventure',()=>{
 const profile=createProfile('<Jogador>','rubel',1,0);
 const first=nextHomeScene(null);
 const second=nextHomeScene(first);
 expect([first,second,nextHomeScene(second)]).toEqual(['jade','ember','jade']);
 const home=renderHome(profile,null,first,'');
 expect(home).toContain('scene-jade');
 expect(home).toContain('&lt;Jogador&gt;');
 expect(home).toContain('Iniciar aventura');
 expect(home).not.toContain('Korakacoins');
 const run=createMapRun(1,'rubel');
 run.coins=42;
 const resumed=renderHome(profile,run,second,'');
 expect(resumed).toContain('scene-ember');
 expect(resumed).toContain('42 Korakacoins');
 expect(resumed).toContain('Continuar aventura');
 expect(resumed).toContain('data-tab="Marcos semanais"');
});

it('retains every main destination and highlights Collection in Artifacts',()=>{
 const profile=createProfile('Teste','rubel',1,0);
 for(const page of ['home','adventure','collection','relics','mastery','boosters','profile'] as const){
  const html=hubShell(profile,page,null,'<main>Conteúdo</main>');
  expect(html).toContain('class="home-rail"');
  for(const target of ['home','adventure','collection','mastery','boosters','profile']){
   expect(html).toContain('data-action="hub-nav" data-id="'+target+'"');
  }
  expect(html).toContain('data-id="'+(page==='relics'?'collection':page)+'" aria-current="page"');
 }
});

it('puts setup behind the adventure panel and offers resume for an active run',()=>{
 const profile=createProfile('Teste','rubel',1,0);
 const filters={search:'',rarity:'',region:'',owned:''};
 const intro=hubContent(profile,'adventure',null,filters);
 expect(intro).toContain('<details class="adventure-options">');
 expect(intro).toContain('Preparar aventura');
 expect(intro.indexOf('id="run-difficulty"')).toBeGreaterThan(intro.indexOf('Preparar aventura'));
 const active=hubContent(profile,'adventure',createMapRun(1,'rubel'),filters);
 expect(active).toContain('Continuar aventura');
 expect(active).not.toContain('id="run-difficulty"');
});

it('renders a scrollable catalogue with inspectable compass badges and keeps booster actions',()=>{
 const profile=createProfile('Teste','rubel',1,0);
 const filters={search:'Rubel',rarity:'',region:'',owned:''};
 const collection=hubContent(profile,'collection',null,filters);
 expect(collection).toContain('collection-grid card-gallery');
 expect(collection).toContain('class="card-compass"');
 expect(collection).toContain('Norte · Leste');
 const boosters=hubContent(profile,'boosters',null,filters);
 expect(boosters.match(/class="booster-pack"/g)).toHaveLength(5);
 expect(boosters.match(/data-action="booster-buy"/g)).toHaveLength(5);
 expect(boosters.match(/data-action="booster-open"/g)).toHaveLength(5);
});
