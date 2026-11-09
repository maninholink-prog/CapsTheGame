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
    chevron: '<path d="m8 5 7 7-7 7"/>',
    book: '<path d="M12 5c-3-3-7-3-10-1v15c3-2 7-2 10 1 3-3 7-3 10-1V4c-3-2-7-2-10 1Zm0 0v15"/>',
  };
  return `<svg class="icon ${esc(className)}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] ?? paths.diamond}</svg>`;
}
export const artIcon: Record<string, string> = { kylast: 'shield', 'sword-kylast': 'sword', alastor: 'scythe', banjo: 'banjo', colar: 'colar', ybew: 'horn', 'wang-jianxi': 'forge', 'joia-rubra': 'diamond', damian: 'sword', 'robot-campeao': 'robot', abe:'forge', arcata:'diamond', rubel:'shield', aranha:'robot', zacarias:'forge', keegan:'forge', lucia:'book', gremin:'forge' };
export function regionSymbol(region:'north'|'west'|'south'|'east'|'korakarom'):string {
  const symbols={north:[70,'Norte'],west:[390,'Oeste'],south:[740,'Sul'],east:[1075,'Leste'],korakarom:[1410,'Korakarom']} as const;
  const [x,name]=symbols[region];
  return `<svg class="region-symbol" viewBox="${x} 580 280 200" role="img" aria-label="${name}"><image href="/art/regions/approved-symbols.png" width="1752" height="897"/></svg>`;
}
export function art(id: string, small = false, evolved = false): string {
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
