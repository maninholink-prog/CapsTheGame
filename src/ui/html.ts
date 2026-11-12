export function esc(value: unknown): string {
  return String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!);
}
export function icon(name: string, className = ''): string {
  const paths: Record<string, string> = {
    sword: '<path d="m5 19 4-4M3 17l4 4m1-8L19 2l3 1-1 3L10 17m-2-4 3 3"/>',
    forge: '<path d="M3 8h18l-5 5H7L3 8Zm5 5v4h8v-4m-9 7h10M10 3h4"/>',
    banjo: '<circle cx="9" cy="16" r="6"/><path d="m13 12 7-10m-3 1 4 3M7 14l4 4M6 17l3-3"/>',
    colar: '<path d="M5 3c-3 9 0 14 7 14S22 12 19 3M9 17l3 5 3-5m-3-6v5"/><circle cx="12" cy="9" r="2"/>',
    scythe: '<path d="m6 22 9-16M3 9C7-1 19 0 22 8c-6-4-10-3-15 0m6 1 3 2"/>',
    horn: '<path d="M7 9C3 9 2 5 3 2c2 3 5 2 6 6m8 1c4 0 5-4 4-7-2 3-5 2-6 6M7 9l-1 9 6 4 6-4-1-9-5-3-5 3Zm2 5h1m4 0h1m-5 4h4"/>',
    robot: '<rect x="4" y="7" width="16" height="14" rx="2"/><path d="M12 7V3m-3 0h6M8 12h1m6 0h1M8 17h8M1 11v6m22-6v6"/>',
    shield: '<path d="m12 2 8 4v7c0 5-8 9-8 9s-8-4-8-9V6l8-4Zm0 4v11m-4-7h8"/>',
    compass: '<circle cx="12" cy="12" r="10"/><path d="m16 8-2 6-6 2 2-6Z"/>',
    diamond: '<path d="m12 2 9 8-9 12L3 10l9-8Zm-9 8h18M8 6l4 16 4-16"/>',
    settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.7a7.8 7.8 0 0 1-1.5.9l-.3 1.8h-2.8l-.3-1.8a7.8 7.8 0 0 1-1.5-.9l-1.7.7-1.4-2.4 1.4-1.1a7.5 7.5 0 0 1 0-1.8l-1.4-1.1 1.4-2.4 1.7.7a7.8 7.8 0 0 1 1.5-.9l.3-1.8h2.8l.3 1.8a7.8 7.8 0 0 1 1.5.9l1.7-.7 1.4 2.4-1.4 1.1a7.5 7.5 0 0 1 0 1.8Z"/>',
    chevron: '<path d="m8 5 7 7-7 7"/>',
    book: '<path d="M12 5c-3-3-7-3-10-1v15c3-2 7-2 10 1 3-3 7-3 10-1V4c-3-2-7-2-10 1Zm0 0v15"/>',
    cards: '<path d="M7 3h11a2 2 0 0 1 2 2v13M5 6h11a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2Z"/><path d="M8 10h7m-7 4h7m-7 4h4"/>',
    champion: '<path d="m5 8 3-4h8l3 4-2 8-5 5-5-5-2-8Z"/><path d="M8 11h8m-4-7v13m-4-4h8"/>',
    frame: '<path d="M7 2h10l5 5v10l-5 5H7l-5-5V7l5-5Z"/><path d="M7 7h10v10H7z"/><path d="m12 8 1.4 2.6 2.8.4-2 2 .5 2.8-2.7-1.4-2.7 1.4.5-2.8-2-2 2.8-.4L12 8Z"/>',
    sparkle: '<path d="m12 2 2.2 7.8L22 12l-7.8 2.2L12 22l-2.2-7.8L2 12l7.8-2.2L12 2Z"/><path d="m19 2 .8 2.2L22 5l-2.2.8L19 8l-.8-2.2L16 5l2.2-.8L19 2Z"/>',
    relic: '<path d="M7 3h10l4 5-9 14L3 8l4-5Z"/><path d="M3 8h18M7 3l5 19 5-19M8 12h8"/>',
    'menu-home': '<path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V10Z"/><path d="M7 10h10M12 3v3m-2 12h4"/><circle cx="12" cy="11" r="1"/>',
    'menu-adventure': '<circle cx="12" cy="12" r="9"/><path d="m15 9-2 5-5 2 2-5 5-2Zm-3-6v2m0 14v2m9-9h-2M5 12H3"/>',
    'menu-collection': '<path d="M4 5.5c3-1.5 5.5-1 8 1 2.5-2 5-2.5 8-1V20c-3-1.5-5.5-1-8 1-2.5-2-5-2.5-8-1V5.5Z"/><path d="M12 6.5V21M7 9h2m-2 3h2m6-3h2m-2 3h2"/>',
    'menu-mastery': '<path d="M3 14h18l-3 4H7l-4-4Zm4 4v3h10v-3M9 10c0-2 3-3 3-6 3 3 4 5 3 8m-6-2c-1-2 0-4 2-5"/><path d="M5 21h14"/>',
    'menu-boosters': '<path d="m12 2 8 5v10l-8 5-8-5V7l8-5Z"/><path d="m4 7 8 5 8-5m-8 5v10m-4-13 4-7 4 7"/><circle cx="12" cy="12" r="2"/>',
    'menu-profile': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="9" r="3"/><path d="M6.5 18c1-3 3-4 5.5-4s4.5 1 5.5 4M8 4l4-2 4 2"/>',
    'profile-summary': '<path d="m12 2 8 4v6c0 5-5 8-8 10-3-2-8-5-8-10V6l8-4Z"/><path d="m8 12 2.5 2.5L16 9m-4-5v3"/>',
    'profile-history': '<path d="M5 4h14v16H5zM8 8h8m-8 4h8m-8 4h5"/><path d="M3 7v12a2 2 0 0 0 2 2m14-17 2 2v12a2 2 0 0 1-2 2"/>',
    'profile-milestones': '<path d="M8 3h8v4a4 4 0 0 1-8 0V3Zm4 8v5m-4 5h8m-6-5h4v5H10zM8 5H4v2a4 4 0 0 0 4 4m8-6h4v2a4 4 0 0 1-4 4"/><path d="m12 4 1 2 2 .3-1.5 1.5.4 2.2-1.9-1-1.9 1 .4-2.2L9 6.3l2-.3 1-2Z"/>',
    'profile-ledger': '<path d="M5 3h14v18H5zM8 7h8m-8 4h8m-8 4h5"/><path d="M3 6h2m-2 5h2m-2 5h2m10 1 2 2 3-4"/>',
  };
  return `<svg class="icon ${esc(className)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.diamond}</svg>`;
}
export function korakoinIcon():string {
 return `<span class="korakoin-icon" role="img" aria-label="Korakoin"><img src="/art/korakoin.png" alt=""/><span class="korakoin-emblem">${regionSymbol('korakarom')}</span></span>`;
}
export const artIcon: Record<string, string> = { kylast: 'shield', 'sword-kylast': 'sword', alastor: 'scythe', banjo: 'banjo', colar: 'colar', ybew: 'horn', 'wang-jianxi': 'forge', 'joia-rubra': 'diamond', damian: 'sword', 'robot-campeao': 'robot', abe:'forge', arcata:'diamond', rubel:'shield', aranha:'robot', zacarias:'forge', keegan:'forge', lucia:'book', gremin:'forge' };
export function regionSymbol(region:'north'|'west'|'south'|'east'|'korakarom'):string {
  const symbols={north:[70,'Norte'],west:[390,'Oeste'],south:[740,'Sul'],east:[1075,'Leste'],korakarom:[1410,'Korakarom']} as const;
  const [x,name]=symbols[region];
  return `<svg class="region-symbol" viewBox="${x} 580 280 200" role="img" aria-label="${name}"><image href="/art/regions/approved-symbols.png" width="1752" height="897"/></svg>`;
}
export function art(id: string, small = false, evolved = false): string {
  if(id==='thalion')return `<img class="portrait ${small?'small':''}" src="/art/thalion-${evolved?'evolved':'card'}.png" alt="Thalion ${evolved?'evoluído em uma apresentação dissonante':'tocando violino em uma taverna'}"/>`;
  if(id==='arcata')return `<img class="portrait ${small?'small':''}" src="/art/arcata-${evolved?'evolved':'card'}.png" alt="Arcata ${evolved?'evoluído, conduzindo uma espiral de chamas':'praticando um pequeno fogo controlado'}"/>`;
  if(id==='lazaro')return `<img class="portrait ${small?'small':''}" src="/art/lazaro-${evolved?'evolved':'card'}.png" alt="Lázaro ${evolved?'evoluído com Último Grito':'com expressão séria e armadura ornamentada'}"/>`;
  if(id==='rubel')return `<img class="portrait ${small?'small':''}" src="/art/rubel-${evolved?'evolved':'card'}.png" alt="Rubel ${evolved?'em sua forma evoluída como avatar de Vitumirim':'em uma forma simples e cotidiana'}"/>`;
  if(id==='kylast')return `<img class="portrait ${small?'small':''}" src="/art/kylast-${evolved?'evolved':'card'}.png" alt="Kylast Heathcliff ${evolved?'em sua forma evoluída':'em sua forma base'}"/>`;
  if(id==='youro')return `<img class="portrait ${small?'small':''}" src="/art/youro${evolved?'-evolved':'-card'}.png" alt="Youro ${evolved?'evoluído, sem máscara, com ecos espirituais de Urso e Tigre':'em sua forma base, sem máscara'}"/>`;
  if(id==='kuara'&&evolved)return `<img class="portrait ${small?'small':''}" src="/art/kuara-evolved.png" alt="Kuara evoluído, usando a máscara de seu alter-ego"/>`;
  if(id==='kuara')return `<img class="portrait ${small?'small':''}" src="/art/kuara.png" alt="Kuara Yacy, sem máscara"/>`;
  if(id==='abe'&&evolved)return `<img class="portrait" src="/art/abe-mastery.png" alt="Abe Gravo evoluído"/>`;
  if(id==='cinderela')return `<img class="portrait ${small?'small':''}" src="/art/cinderela.png" alt="Pistola Cinderela, com cristal azul"/>`;
  if(id==='engineering')return `<img class="portrait ${small?'small':''}" src="/art/engineering-v2.png" alt="Reforço mecânico sendo instalado no braço de um aliado"/>`;
  if(id==='aranha')return `<img class="portrait ${small?'small':''}" src="/art/aranha.png" alt="Aranha Arranha, pequeno robô mecânico de olhos azuis"/>`;
  if(id==='abe')return `<img class="portrait ${small?'small':''}" src="/art/abe.png" alt="Abe Gravo, artífice gnomo em sua forma base"/>`;
  if(id==='zacarias')return `<img class="portrait ${small?'small':''}" src="/art/zacarias-v2.png" alt="Zacarias, aprendiz reptiliano de artífice"/>`;
  if(id==='keegan')return `<img class="portrait ${small?'small':''}" src="/art/keegan-v2.png" alt="Keegan, jovem artífice felino"/>`;
  if(id==='gremin')return `<img class="portrait ${small?'small':''}" src="/art/gremin-v2.png" alt="Gremin Ironhold em sua armadura mecânica"/>`;
  if(id==='lucia')return `<img class="portrait ${small?'small':''}" src="/art/lucia-v2.png" alt="Lúcia observa um cristal enquanto uma abelha mecânica registra uma peça"/>`;
  if(id==='enhanced-defense')return `<img class="portrait ${small?'small':''}" src="/art/enhanced-defense.png" alt="Armadura reforçada por uma proteção mágica azul e dourada"/>`;
  if(id==='project')return `<img class="portrait ${small?'small':''}" src="/art/project.png" alt="Três protótipos de Upgrade na oficina de Abe"/>`;
  if(id==='flash-genius')return `<img class="portrait ${small?'small':''}" src="/art/flash-genius.png" alt="Aliado recebe um impulso de Upgrade enquanto compra uma carta"/>`;
  if(['keegan','gremin','lucia','zacarias'].includes(id))return `<img class="portrait ${small?'small':''}" src="/art/${id}.jpg" alt="Referência do personagem ${esc(id)} fornecida pelo autor"/>`;
  return id === 'kylast'
    ? `<img class="portrait ${small ? 'small' : ''}" src="/art/kylast.png" alt="Kylast Heathcliff, guerreiro de cabelo azul e armadura pesada"/>`
    : `<div class="sigil-art art-${esc(id)}" aria-hidden="true">${icon(artIcon[id] ?? 'book')}<span class="orbit"></span></div>`;
}
