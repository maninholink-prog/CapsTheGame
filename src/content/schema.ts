export type Champion = 'kylast' | 'abe' | 'arcata' | 'rubel' | 'youro' | 'kuara' | 'thalion' | 'lazaro';
export type Keyword = 'elusive' | 'quick' | 'double';
export type Region = 'north' | 'east' | 'south' | 'west' | 'korakarom';
export type Rarity = 'common' | 'rare' | 'epic' | 'legendary' | 'ultradimensional';
export function encounterRarity(cost:number):Rarity { return cost<=2?'common':cost<=4?'rare':cost===5?'epic':'legendary'; }
export type NarrativeAbility = 'zacarias' | 'keegan' | 'lucia' | 'gremin' | 'soarim' | 'salita' | 'kriv' | 'archibald' | 'guardian' | 'mantum';
interface CardBase { enemyOnly?:boolean;experiment?:boolean;unique?:boolean;encounterSpecial?:'labotomia'|'tornado'|'dianamite'|'felix';failIfKeywordPresent?:boolean; expansion?:string; music?:boolean; dynamicDamage?:'equipped'|'attack'; afterRecallDraw?:boolean; requiresEnemyDeck?:boolean; deathSpell?:string;
  draw?: number; attackReduction?: number; fireShield?: boolean;
  id: string; baseId?:string; runImprovementText?:string; drawOnEntry?:boolean;
  entryDraw?:number; collectible?: boolean; narrative?: NarrativeAbility; entrySpell?: string;
  cost: number;
  name?: string; regions?: Region[]; rarity?: Rarity; exclusiveChampion?: Champion; text?: string; fire?: boolean; upgrade?: boolean; fabricate?: boolean; championCopy?: Champion; area?: 'allies' | 'enemies' | 'all-friendly' | 'all-units';
}
export interface TargetRule {
  kind: 'unit' | 'nexus' | 'character' | 'stack';
  wounded?: boolean;
  side: 'ally' | 'enemy' | 'any';
  min: number;
  max: number;
}
export type CardEffect = {type:'surgery';amount:number;attack:number;temporary?:boolean;quick?:boolean} | {type:'steal';amount:number;emptyFatigue?:boolean}|{type:'summon';unit:string;count:number}|{type:'weaken';amount:number;nextRound?:boolean}|{type:'keyword';keyword:Keyword;temporary?:boolean}|{type:'kill-marked'|'mark'|'execute'} | { type: 'damage' | 'heal' | 'armor'; amount: number } | { type: 'counter' | 'stun' | 'recall' | 'obliterate' | 'fabricate' } | { type: 'buff'; attack: number; health?: number; temporary?: boolean } | { type: 'fire-boost'; amount: number } | { type: 'reinforce' } | { type: 'upgrade'; keyword?: Keyword };
export type CardDefinition = CardBase & (
  | { kind: 'unit'; attack: number; health: number; champion?: Champion; entryTarget?: TargetRule; keyword?: Keyword; pirate?:boolean; undead?:boolean; ability?: 'ybew' | 'wang' | 'joia' | 'damian' | 'robot' | 'spider' }
  | { kind: 'spell' | 'trick' | 'armor'; speed: 'slow' | 'fast' | 'burst'; target: TargetRule; effect: CardEffect }
  | { kind: 'equipment'; damage?: number; ability?: 'alastor' | 'banjo' | 'colar' }
);
export type CardCatalog = Record<string, CardDefinition>;

export function validateCatalog(catalog: CardCatalog): void {
  const integer = (n: number, min = 0) => Number.isSafeInteger(n) && n >= min;
  for (const [id, card] of Object.entries(catalog)) {
    if (id !== card.id || !id || !integer(card.cost)) throw new Error('Invalid card identity or cost');
    if (card.regions && (!card.regions.length || card.regions.some(region => !['north', 'east', 'south', 'west', 'korakarom'].includes(region))))
      throw new Error('Invalid card region');
    if(card.regions&&(new Set(card.regions).size!==card.regions.length||card.regions.length!==(card.kind==='unit'&&card.champion?2:1)))throw new Error('Only protagonists may have two regions; supports require one');
    if (card.rarity && !['common', 'rare', 'epic', 'legendary', 'ultradimensional'].includes(card.rarity)) throw new Error('Invalid rarity');
    if (card.kind === 'unit') {
      if (!integer(card.attack) || !integer(card.health, 1)) throw new Error('Invalid unit attributes');
      if(card.keyword!==undefined&&!['quick','double','elusive'].includes(card.keyword))throw new Error('Unsupported unit keyword');
      if([card.pirate,card.undead].some(flag=>flag!==undefined&&typeof flag!=='boolean'))throw new Error('Invalid unit category');
      if(card.entryTarget?.wounded!==undefined&&(typeof card.entryTarget.wounded!=='boolean'||card.entryTarget.kind!=='unit'))throw new Error('Invalid wounded entry target');
      if (card.champion !== undefined && !['kylast', 'abe', 'arcata', 'rubel', 'youro', 'kuara', 'thalion', 'lazaro'].includes(card.champion)) throw new Error('Unsupported champion');
      if (card.ability !== undefined && !['ybew', 'wang', 'joia', 'damian', 'robot', 'spider'].includes(card.ability)) throw new Error('Unsupported unit ability');
    } else if (card.kind === 'equipment') {
      if (card.damage !== undefined && !integer(card.damage)) throw new Error('Invalid equipment damage');
      if (card.ability !== undefined && !['alastor', 'banjo', 'colar'].includes(card.ability)) throw new Error('Unsupported equipment ability');
    } else {
      if (!['spell', 'trick', 'armor'].includes(card.kind) || !['slow', 'fast', 'burst'].includes(card.speed))
        throw new Error('Unsupported card kind or speed');
      const rule = card.target;
      if (!rule || !['unit', 'nexus', 'character', 'stack'].includes(rule.kind) ||
        !['ally', 'enemy', 'any'].includes(rule.side) || !integer(rule.min) || !integer(rule.max) || rule.min > rule.max)
        throw new Error('Invalid target rule');
      if(rule.wounded!==undefined&&(typeof rule.wounded!=='boolean'||rule.kind!=='unit'))throw new Error('Invalid wounded target');
      if (!card.effect || !['damage', 'heal', 'armor', 'counter', 'stun', 'recall', 'obliterate', 'fabricate', 'reinforce', 'upgrade', 'buff', 'fire-boost','steal','summon','weaken','keyword','kill-marked','mark','execute','surgery'].includes(card.effect.type)) throw new Error('Unsupported effect');
      if ('amount' in card.effect && !integer(card.effect.amount)) throw new Error('Invalid effect amount');
      if(card.effect.type==='weaken'&&card.effect.nextRound!==undefined&&typeof card.effect.nextRound!=='boolean')throw new Error('Invalid weaken duration');
      if ((card.effect.type === 'counter') !== (rule.kind === 'stack')) throw new Error('Counter requires stack targets');
      if (card.effect.type === 'armor' && rule.kind !== 'unit') throw new Error('Armor requires unit targets');
      if (['stun', 'recall', 'obliterate'].includes(card.effect.type) && rule.kind !== 'unit') throw new Error('Unit effect requires unit targets');
      if (card.kind === 'armor' && card.speed !== 'fast') throw new Error('Armor cards must be fast');
    }
  }
}


