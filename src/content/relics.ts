// Approved catalogue; retain unresolved lore qualifications verbatim.
export type RelicRarity='common'|'rare'|'legendary';
export interface RelicDefinition {id:string;name:string;rarity:RelicRarity;effect:string;godSource:string;sourceLine:number;classificationNote:string;legacyName?:string;art?:string}
export const relicCatalog:Record<string,RelicDefinition> = {
  "artifact-02": {
    "id": "artifact-02",
    "name": "Capacete do Véu Emanhecido (Garandonim)",
    "rarity": "legendary",
    "effect": "Primeira vez por batalha que seu campeão principal seria alvo de magia adversária, essa magia perde esse alvo; demais alvos permanecem.",
    "godSource": "Garandonim",
    "sourceLine": 9,
    "classificationNote": "Lendária"
  },
  "artifact-16": {
    "id": "artifact-16",
    "name": "Um Banquete em uma Gota",
    "rarity": "common",
    "effect": "Ao entrar no nó de descanso, a primeira cura recebida ali recupera 3 de vida adicional do Vínculo, limitada à vida máxima.",
    "godSource": "Mulian",
    "sourceLine": 115,
    "classificationNote": "Comum"
  },
  "artifact-32": {
    "id": "artifact-32",
    "name": "Pequeno Golem",
    "rarity": "common",
    "effect": "Ao começar a batalha, crie na mão um Pequeno Golem 1/3 de custo 1, temporário e sem tipo campeão.",
    "godSource": "Medurian",
    "sourceLine": 231,
    "classificationNote": "Comum sugerida — trio incompleto"
  },
  "artifact-05": {
    "id": "artifact-05",
    "name": "Olhos do Fundo da Alma (Kizamurim)",
    "rarity": "rare",
    "effect": "No início da primeira rodada de ataque do portador, atordoa uma unidade adversária aleatória até o fim da rodada.",
    "godSource": "Kizamurim",
    "sourceLine": 34,
    "classificationNote": "Rara"
  },
  "artifact-28": {
    "id": "artifact-28",
    "name": "Máscara dos 9 Abundantes",
    "rarity": "legendary",
    "effect": "No início da sua rodada de ataque, todas as suas unidades recebem +1 de ataque e +1 de vida até o fim da rodada; bônus de vida não é cura.",
    "godSource": "Bazigueno",
    "sourceLine": 203,
    "classificationNote": "Lendária sugerida — trio incompleto"
  },
  "artifact-11": {
    "id": "artifact-11",
    "name": "Peitoral do Orgulho",
    "rarity": "rare",
    "effect": "Campeão principal do portador não pode ser atordoado; em encontro sem campeão, protege a unidade inimiga principal designada.",
    "godSource": "Sperimir",
    "sourceLine": 78,
    "classificationNote": "Rara"
  },
  "artifact-47": {
    "id": "artifact-47",
    "name": "O Fragmento do Infinito",
    "rarity": "legendary",
    "effect": "Primeira magia de custo pago 5 ou maior resolvida pelo portador em cada batalha cria uma cópia temporária dela na mão com custo zero nessa rodada; cópia não dispara este efeito.",
    "godSource": "Entidade primordial não nomeada",
    "sourceLine": 340,
    "classificationNote": "Lendária sugerida — vínculo pendente"
  },
  "artifact-43": {
    "id": "artifact-43",
    "name": "A Criatura Refeita",
    "rarity": "rare",
    "effect": "Na primeira rodada, crie na mão duas Criaturas Refeitas 2/2 de custo 1, temporárias e sem tipo campeão; respeite a mão máxima.",
    "godSource": "Saol",
    "sourceLine": 310,
    "classificationNote": "Rara sugerida — trio incompleto"
  },
  "artifact-10": {
    "id": "artifact-10",
    "name": "Colar da Esperança",
    "rarity": "common",
    "effect": "Reduz em 2 a primeira ocorrência de dano ao próprio Vínculo em cada batalha, mínimo zero.",
    "godSource": "Sperimir",
    "sourceLine": 71,
    "classificationNote": "Comum"
  },
  "artifact-08": {
    "id": "artifact-08",
    "name": "Lágrimas da Deusa",
    "rarity": "legendary",
    "effect": "Primeira unidade própria não campeã que morrer retorna ao campo com 1 de vida, uma vez por batalha.",
    "godSource": "Vitumirim",
    "sourceLine": 55,
    "classificationNote": "Lendária"
  },
  "artifact-33": {
    "id": "artifact-33",
    "name": "Olhos de Águia",
    "rarity": "common",
    "effect": "Primeiro golpe de uma unidade própria equipada em cada rodada causa +1 de dano ao bloqueador; não aumenta dano ao Vínculo.",
    "godSource": "Virdurian",
    "sourceLine": 240,
    "classificationNote": "Comum"
  },
  "artifact-40": {
    "id": "artifact-40",
    "name": "Mercúrio",
    "rarity": "common",
    "effect": "Fim de cada rodada: causa 1 de dano a uma unidade adversária aleatória e 1 ao próprio Vínculo; sem unidade adversária, mantém o dano ao próprio Vínculo.",
    "godSource": "Garandonim",
    "sourceLine": 289,
    "classificationNote": "Reserva — Comum sugerida"
  },
  "artifact-25": {
    "id": "artifact-25",
    "name": "Chapéu da Rainha das Fadas",
    "rarity": "legendary",
    "effect": "Primeira magia própria de cura ou de armadura em cada rodada custa 1 mana a menos, mínimo zero, e aumenta em 1 sua cura ou vida concedida.",
    "godSource": "Nily",
    "sourceLine": 178,
    "classificationNote": "Lendária sugerida — trio incompleto"
  },
  "artifact-18": {
    "id": "artifact-18",
    "name": "Flauta da Princesa da Natureza",
    "rarity": "rare",
    "effect": "Primeira unidade adversária não campeã que entrar em campo em cada rodada tem −2 de ataque naquela rodada, mínimo zero.",
    "godSource": "Mulian",
    "sourceLine": 129,
    "classificationNote": "Reserva — Rara sugerida"
  },
  "artifact-20": {
    "id": "artifact-20",
    "name": "Rapieira do Príncipe Belo",
    "rarity": "rare",
    "effect": "Primeira vez por rodada que uma unidade própria sobrevive a dano de magia adversária, causa 2 de dano ao Vínculo adversário.",
    "godSource": "Guifidiam",
    "sourceLine": 143,
    "classificationNote": "Rara"
  },
  "artifact-35": {
    "id": "artifact-35",
    "name": "Pique do Vento",
    "rarity": "rare",
    "effect": "Primeira unidade adversária que sobreviver ao golpe do campeão principal em cada rodada recebe −2 de ataque até o fim da rodada, mínimo zero.",
    "godSource": "Virdurian",
    "sourceLine": 254,
    "classificationNote": "Rara"
  },
  "artifact-24": {
    "id": "artifact-24",
    "name": "A Espada que Flui como Ar",
    "rarity": "legendary",
    "effect": "Primeira vez em cada batalha que o campeão principal atacar, ele não pode ser bloqueado por unidades com ataque menor que o dele nessa declaração; demais regras permanecem.",
    "godSource": "Govinam",
    "sourceLine": 171,
    "classificationNote": "Lendária"
  },
  "artifact-23": {
    "id": "artifact-23",
    "name": "Colar de Pedras Salinas",
    "rarity": "rare",
    "effect": "Início de batalha: crie na mão um Auxiliar Tritão 2/2 de custo 1, temporário, sem tipo campeão. Não inicia em campo.",
    "godSource": "Govinam",
    "sourceLine": 164,
    "classificationNote": "Rara"
  },
  "artifact-13": {
    "id": "artifact-13",
    "name": "Martelo do Fogo Berrante",
    "rarity": "rare",
    "effect": "Primeiro equipamento do portador em cada rodada recebe +1 de dano adicional durante a batalha.",
    "godSource": "Bizento",
    "sourceLine": 94,
    "classificationNote": "Rara"
  },
  "artifact-22": {
    "id": "artifact-22",
    "name": "Botas Leves como o Ar",
    "rarity": "common",
    "effect": "Primeira unidade jogada por rodada recebe Ataque Rápido até o fim da rodada.",
    "godSource": "Govinam",
    "sourceLine": 157,
    "classificationNote": "Comum"
  },
  "artifact-34": {
    "id": "artifact-34",
    "name": "Manto das Asas da Rainha",
    "rarity": "legendary",
    "effect": "Primeiro ataque do campeão principal em cada rodada permite ao portador designar seu bloqueador entre unidades adversárias aptas a bloquear, antes das demais escolhas de bloqueio. Sem alvo elegível, não força bloqueio.",
    "godSource": "Virdurian",
    "sourceLine": 247,
    "classificationNote": "Lendária"
  },
  "artifact-07": {
    "id": "artifact-07",
    "name": "Lança da Virtude (Vitumirim)",
    "rarity": "common",
    "effect": "No início de cada rodada, cura 1 da unidade própria ferida com menor vida atual; empate aleatório.",
    "godSource": "Vitumirim",
    "sourceLine": 48,
    "classificationNote": "Comum"
  },
  "artifact-39": {
    "id": "artifact-39",
    "name": "O Sol",
    "rarity": "legendary",
    "effect": "Primeira vez que o campeão principal atacar em cada batalha, causa 3 de dano a todas as unidades adversárias antes dos golpes.",
    "godSource": "Solas",
    "sourceLine": 282,
    "classificationNote": "Lendária sugerida — trio incompleto"
  },
  "artifact-03": {
    "id": "artifact-03",
    "name": "Luvas do Tear Sombrio (Garandonim)",
    "rarity": "rare",
    "effect": "Primeira unidade jogada em cada rodada recebe +2 de ataque naquela rodada; seu Vínculo sofre 1 de dano.",
    "godSource": "Garandonim",
    "sourceLine": 19,
    "classificationNote": "Rara"
  },
  "artifact-01": {
    "id": "artifact-01",
    "name": "Rapier de Nygash (Garandonim)",
    "rarity": "common",
    "effect": "Primeiro golpe de uma unidade equipada por rodada reduz em 1 o ataque do alvo até o fim da rodada, se ele sobreviver.",
    "godSource": "Garandonim",
    "sourceLine": 1,
    "classificationNote": "Comum"
  },
  "artifact-45": {
    "id": "artifact-45",
    "name": "O Relógio da Desintegração Temporal",
    "rarity": "rare",
    "effect": "Primeira vez por batalha que o campeão principal sobreviver a dano, restaura a vida dele ao valor imediatamente anterior àquela ocorrência; não desfaz outros efeitos nem mortes.",
    "godSource": "Divindade não nomeada na fonte",
    "sourceLine": 326,
    "classificationNote": "Rara sugerida — vínculo pendente"
  },
  "artifact-15": {
    "id": "artifact-15",
    "name": "Capacete da Fúria Bárbara",
    "rarity": "legendary",
    "effect": "Dobra o bônus numérico de dano das armas utilizadas; não dobra ataque base nem efeitos secundários.",
    "godSource": "Bizento",
    "sourceLine": 108,
    "classificationNote": "Lendária"
  },
  "artifact-12": {
    "id": "artifact-12",
    "name": "Rosas da Coroa Passada",
    "rarity": "legendary",
    "effect": "Primeira entrada de um campeão na batalha concede +2 de ataque às outras unidades próprias presentes até o fim da batalha.",
    "godSource": "Sperimir",
    "sourceLine": 85,
    "classificationNote": "Lendária"
  },
  "artifact-21": {
    "id": "artifact-21",
    "name": "Tomo da Luz",
    "rarity": "common",
    "effect": "Primeira magia própria resolvida em cada rodada concede +1 de ataque a uma unidade própria aleatória até o fim da rodada.",
    "godSource": "Guifidiam",
    "sourceLine": 150,
    "classificationNote": "Comum"
  },
  "artifact-38": {
    "id": "artifact-38",
    "name": "O Vortece",
    "rarity": "rare",
    "effect": "Primeiro inimigo não campeão que bloquear o campeão principal na batalha fica atordoado até o fim da rodada seguinte, após resolver esse combate; não cancela seu bloqueio já resolvido.",
    "godSource": "Garandonim",
    "sourceLine": 275,
    "classificationNote": "Reserva — Rara sugerida"
  },
  "artifact-42": {
    "id": "artifact-42",
    "name": "Artefato: O Coração de Saol",
    "rarity": "legendary",
    "effect": "Primeira entrada do campeão principal em cada batalha cura 3 do próprio Vínculo e causa 3 de dano a uma unidade adversária aleatória, se houver.",
    "godSource": "Saol",
    "sourceLine": 303,
    "classificationNote": "Lendária sugerida — trio incompleto"
  },
  "artifact-31": {
    "id": "artifact-31",
    "name": "Colar do Imortal em Pedra",
    "rarity": "legendary",
    "effect": "Primeira morte do campeão principal na batalha invoca em seu lugar um Golem de Pedra 3/6 sem tipo campeão, se houver espaço; equipamentos do campeão retornam normalmente.",
    "godSource": "Medurian",
    "sourceLine": 224,
    "classificationNote": "Lendária sugerida — trio incompleto"
  },
  "artifact-09": {
    "id": "artifact-09",
    "name": "Luz aos Cegos",
    "rarity": "rare",
    "effect": "Primeira unidade própria que seria atordoada em cada batalha ignora esse atordoamento.",
    "godSource": "Vitumirim",
    "sourceLine": 62,
    "classificationNote": "Rara"
  },
  "artifact-44": {
    "id": "artifact-44",
    "name": "A Pena da Vida",
    "rarity": "rare",
    "effect": "Primeira unidade própria não campeã morta em cada batalha retorna com vida cheia, uma vez por batalha, sujeito a espaço livre.",
    "godSource": "Solas",
    "sourceLine": 317,
    "classificationNote": "Rara sugerida — trio incompleto"
  },
  "artifact-19": {
    "id": "artifact-19",
    "name": "Fios do Cabelo de Guifidiam",
    "rarity": "legendary",
    "effect": "Primeira unidade adversária não campeã morta em cada batalha concede 50 moedas temporárias ao portador; nunca gold permanente.",
    "godSource": "Guifidiam",
    "sourceLine": 136,
    "classificationNote": "Lendária"
  },
  "artifact-29": {
    "id": "artifact-29",
    "name": "Zarabatana da Pele do Rei",
    "rarity": "rare",
    "effect": "Primeiro golpe de uma unidade própria equipada por rodada causa 1 de dano adicional às unidades imediatamente adjacentes ao alvo, sem efeito lateral no Vínculo.",
    "godSource": "Bazigueno",
    "sourceLine": 210,
    "classificationNote": "Rara sugerida — trio incompleto"
  },
  "artifact-46": {
    "id": "artifact-46",
    "name": "A Máscara do Abismo",
    "rarity": "common",
    "effect": "Primeira magia adversária que tenha o campeão principal como alvo custa 1 mana adicional; custo informado antes da confirmação.",
    "godSource": "Deuses antigos — sem nome individual",
    "sourceLine": 333,
    "classificationNote": "Comum sugerida — vínculo pendente"
  },
  "artifact-27": {
    "id": "artifact-27",
    "name": "Manto dos Pequenos Seres",
    "rarity": "rare",
    "effect": "Primeira vez por batalha que o campeão principal sobreviver a dano, retorna à mão; equipamentos seguem as regras normais de retorno. Não se aplica se morrer pelo dano.",
    "godSource": "Mulian",
    "sourceLine": 196,
    "classificationNote": "Reserva — Rara sugerida"
  },
  "artifact-36": {
    "id": "artifact-36",
    "name": "Katana do Pesadelo",
    "rarity": "legendary",
    "effect": "Primeiro golpe do campeão principal contra unidade não campeã em cada batalha destrói o alvo se causar ao menos 1 de dano; sem efeito contra Vínculo.",
    "godSource": "Garandonim",
    "sourceLine": 261,
    "classificationNote": "Reserva — Lendária sugerida"
  },
  "artifact-17": {
    "id": "artifact-17",
    "name": "A Lança do Sol do Amanhecer",
    "rarity": "legendary",
    "effect": "Primeira vez que uma unidade equipada atacar em cada rodada, cura 2 de vida de todas as suas unidades antes dos golpes.",
    "godSource": "Mulian",
    "sourceLine": 122,
    "classificationNote": "Lendária"
  },
  "artifact-06": {
    "id": "artifact-06",
    "name": "O Destino Brinca (Kizamurim)",
    "rarity": "common",
    "effect": "Na primeira rodada, cada lado concede aleatoriamente +1 ou −1 de ataque a uma unidade própria aleatória, só nessa rodada; mínimo zero.",
    "godSource": "Kizamurim",
    "sourceLine": 41,
    "classificationNote": "Comum"
  },
  "artifact-41": {
    "id": "artifact-41",
    "name": "Phoenix",
    "rarity": "legendary",
    "effect": "Primeira morte do campeão principal na batalha o faz retornar com vida cheia e causa 1 de dano às unidades adversárias, uma vez por batalha, sujeito a espaço livre.",
    "godSource": "Autoria não nomeada — fênix primordial",
    "sourceLine": 296,
    "classificationNote": "Lendária sugerida — vínculo pendente"
  },
  "artifact-37": {
    "id": "artifact-37",
    "name": "A Anulação",
    "rarity": "legendary",
    "effect": "Anula a primeira magia adversária da batalha que teria uma unidade própria como alvo; vale para o efeito inteiro e não se repete naquela batalha.",
    "godSource": "Garandonim",
    "sourceLine": 268,
    "classificationNote": "Reserva — Lendária sugerida"
  },
  "artifact-26": {
    "id": "artifact-26",
    "name": "Cajados de Tulipas",
    "rarity": "common",
    "effect": "No fim da rodada, cura 1 de vida de uma unidade própria ferida aleatória.",
    "godSource": "Mulian",
    "sourceLine": 185,
    "classificationNote": "Reserva — Comum sugerida"
  },
  "artifact-30": {
    "id": "artifact-30",
    "name": "Guardião da Natureza",
    "rarity": "rare",
    "effect": "Em cada rodada, reduz em 1 o primeiro dano que cada unidade própria receberia, mínimo zero.",
    "godSource": "Mulian",
    "sourceLine": 217,
    "classificationNote": "Rara"
  },
  "artifact-04": {
    "id": "artifact-04",
    "name": "Colar do Deus Enganador (Kizamurim)",
    "rarity": "legendary",
    "effect": "Na primeira equipagem de cada lado por batalha, ativa o efeito caótico de uma carta aleatória da mão de cada jogador, seguindo a sequência e as respostas do Colar de Kylast. Esse disparo não pode gerar outro disparo desta Relíquia.",
    "godSource": "Kizamurim",
    "sourceLine": 26,
    "classificationNote": "Lendária"
  },
  "artifact-14": {
    "id": "artifact-14",
    "name": "Braveheart, o Machado Adaptativo",
    "rarity": "common",
    "effect": "Primeira evolução de um campeão na batalha concede a ele +1 de ataque e +1 de vida até o fim da batalha.",
    "godSource": "Bizento",
    "sourceLine": 101,
    "classificationNote": "Comum"
  }
};
export const relicIds=Object.keys(relicCatalog).sort();
// Exact associations confirmed by the author; retain existing save IDs/effects.
const confirmedArt:Record<string,{name:string;art:string}>={
 'artifact-07':{name:'Excalibur',art:'/relic-art/1RH-jgd-wxbJIH4zbZFMJiOML-Xf30WxW.jpg'},
 'artifact-16':{name:'Deméter',art:'/relic-art/1RsAmrDnPjzQRcGVfIhaRmkw7_5OQOJaC.jpg'},
 'artifact-22':{name:'Talarian Boots',art:'/relic-art/1Qt8pvlp2RfzVCopRcd-PDD64cT76aC5c.jpg'},
};
for(const [id,identity] of Object.entries(confirmedArt))Object.assign(relicCatalog[id],{legacyName:relicCatalog[id].name,...identity});

