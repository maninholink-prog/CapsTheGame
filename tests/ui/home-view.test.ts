import {hubContent,hubShell} from '../../src/ui/hub.js';
import {expect,it} from 'vitest';
import {createProfile} from '../../src/profile/profile.js';
import {createMapRun} from '../../src/run/adventure.js';
import {nextHomeScene,renderHome} from '../../src/ui/home-view.js';
import {icon} from '../../src/ui/html.js';

it('alternates both scenes and uses the current profile and adventure',()=>{
 const profile=createProfile('<Jogador>','rubel',1,0);
 const first=nextHomeScene(null);
 const second=nextHomeScene(first);
 expect([first,second,nextHomeScene(second)]).toEqual(['jade','ember','jade']);
 const home=renderHome(profile,null,first,'');
 expect(home).toContain('scene-jade');
 expect(home).toContain('ALPHA · v0.1.0');
 expect(home).toContain('<section class="home-actions" aria-label="Ações do jogo">');
 expect(home).not.toContain('id="caveira-training"');
 expect(home).not.toContain('data-action="hub-training"');
 expect(home).toContain('aria-label="Opções de exibição"');
 expect(home).toContain('aria-label="Perfil e progresso"');
 expect(home).toContain('src="/art/philosophers-stone.png"');
 expect(home).toContain('aria-label="0 Pedras Filosofais"');
 expect(home).toContain('>0</b></span>');
 expect(home).toContain('data-tab="Marcos semanais"');
 expect(home).toContain('aria-label="Perfil e progresso"');
 expect(home).toContain('Iniciar aventura');
 expect(home).not.toContain('Korakacoins');
 const rail=hubShell('home','');
 for(const symbol of ['menu-home','menu-adventure','menu-collection','menu-mastery','menu-boosters','menu-profile'])expect(rail).toContain(icon(symbol));
 const run=createMapRun(1,'rubel');
 run.coins=42;
 const resumed=renderHome(profile,run,second,'');
 expect(resumed).toContain('scene-ember');
 expect(resumed).toContain('<section class="home-actions" aria-label="Ações do jogo">');
 expect(resumed).not.toContain('data-action="hub-training"');
 expect(resumed).toContain('class="korakoin-icon"');
 expect(resumed).toContain('aria-label="Korakoin"');
 expect(resumed).toContain('src="/art/korakoin.png"');
 expect(resumed).toContain('href="/art/regions/approved-symbols.png"');
 expect(resumed).toContain('42</b>');
 expect(resumed).not.toContain('>Korakacoins</span>');
 expect(resumed).toContain('aria-label="42 Korakacoins"');
 expect(resumed).toContain('Continuar aventura');
 expect(resumed).toContain('data-tab="Marcos semanais"');
});

it('shows large saved balances as icon and localized quantity only',()=>{
 const profile=createProfile('Teste','rubel',1,0);
 profile.stones=12500;
 const run=createMapRun(1,'rubel');
 run.coins=12345;
 const home=renderHome(profile,run,'jade','');
 expect(home).toContain('aria-label="12500 Pedras Filosofais"');
 expect(home).toContain('>12.500</b></span>');
 expect(home).toContain('aria-label="12345 Korakacoins"');
 expect(home).toContain('>12.345</b>');
 expect(home).not.toContain('>Korakacoins</span>');
});

it('retains every main destination and highlights Collection in Artifacts',()=>{
 const profile=createProfile('Teste','rubel',1,0);
 for(const page of ['home','adventure','collection','relics','mastery','boosters','profile'] as const){
  const html=hubShell(page,'<main>Conteúdo</main>');
  expect(html).toContain('class="home-rail"');
  expect(html).not.toContain('class="hub-header"');
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

it('shows only portraits, mastery and accessible start actions in the adventure roster',()=>{
 const profile=createProfile('Teste','rubel',1,0);
 const html=hubContent(profile,'adventure',null,{search:'',rarity:'',region:'',owned:''});
 const roster=html.split('class="hero-grid adventure-roster">')[1].split('</div>\n     ')[0];
 expect(roster).toContain('Maestria 1');
 expect(roster).toContain('aria-label="Iniciar aventura com Rubel, maestria 1"');
 expect(roster).not.toContain('Restauração · cure e evolua');
 expect(roster).not.toContain('<small>');
});

it('shows enemy encounter cards in the collection without making them player cards',()=>{
 const profile=createProfile('Teste','rubel',1,0);
 const html=hubContent(profile,'collection',null,{search:'Rato da Lavoura',rarity:'',region:'',owned:''});
 expect(html).toContain('Cartas de inimigos');
 expect(html).toContain('Rato da Lavoura');
 expect(html).toContain('exclusivas dos inimigos');
 expect(html).not.toContain('cópias</strong>');
});
