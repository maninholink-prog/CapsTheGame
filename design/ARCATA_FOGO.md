# Arcata — magias de fogo

01/11/2026. Base de design aprovada pelo autor; ainda não implementada ou balanceada em partidas.

## Campeão aprovado

O autor definiu magias de fogo como mecânica principal, substituindo a proposta de Premonição como foco central. Isso é uma adaptação de gameplay e não apaga sua adivinhação na história.

- Custo 4, atributos iniciais 2/4.
- Combustão: enquanto Arcata estiver em campo, a segunda magia de fogo que o jogador resolver em cada rodada causa 1 de dano ao Nexus inimigo.
- Evolução: resolver seis magias de fogo nesta batalha; conta mesmo com Arcata fora do campo.
- Forma evoluída 3/5. Enquanto Arcata evoluído estiver em campo, suas magias de fogo que causam dano recebem +1 de dano.
- Fogo será uma categoria explícita nas cartas, distinguindo essas magias de outros tipos de dano.

O autor respondeu “Gostei” ao lote completo. Atributos e efeitos são propostas aceitas para o jogo, não números ou poderes históricos inferidos.

## Pacote de recrutamento — aprovado

Lote aprovado pelo autor em 01/11/2026. Magias inspiradas em D&D, com números e efeitos adaptados para o card game.

| Carta | Mana | Velocidade | Efeito |
|---|---:|---|---|
| Arcata | 4 | Unidade | Campeão 2/4 conforme a base acima. |
| Raio de Fogo | 1 | Rápida | Causa 1 de dano a uma unidade ou Nexus inimigo. Categoria Fogo. |
| Mãos Flamejantes | 3 | Lenta | Causa 2 de dano a até três unidades inimigas escolhidas. Categoria Fogo. |

Duas cópias de cada identidade: seis cartas adicionadas. Não adicionar Bola de Fogo como quarta identidade.

**Magia de campeão — Bola de Fogo:** custo 5, Lenta, categoria Fogo. Causa 3 de dano a todas as unidades inimigas. Ao resolver, embaralha uma cópia de Arcata no deck. Substitui a cópia de Arcata na mão quando já houver um Arcata aliado em campo; não integra as três identidades do pacote.

## Fechamento aprovado

Lote aprovado pelo autor em 01/11/2026:

1. Regiões Norte e Leste, como escolha de gameplay.
2. Raio de Fogo e Mãos Flamejantes não são exclusivos; disponíveis pelas regiões. Bola de Fogo permanece sua magia de campeão. A atribuição regional individual dessas magias não foi especificada separadamente.
3. Combustão conta as magias da rodada inteira, inclusive antes da entrada de Arcata. Ele precisa estar em campo quando a segunda resolver; não há disparo retroativo.
4. O bônus evoluído acrescenta +1 ao dano em cada alvo: Mãos Flamejantes causa 3 por alvo e Bola de Fogo causa 4.
5. Combustão continua causando 1: é habilidade do campeão, não dano de magia.
6. Magias anuladas ou que falhem por perder todos os alvos não contam. Magia com vários alvos conta apenas uma vez.
7. A sexta magia usa o bônus que Arcata já tinha antes dela; a evolução ocorre depois da resolução, preservando dano sofrido.

Base de design de Arcata e pacote aprovada. Implementação e balanceamento em partidas ainda pendentes. Regras futuras de múltiplos acertos, cópias e transformação não devem ser presumidas a partir deste lote.

## Implementação local — 01/11/2026

Base e pacote implementados como aliado na primeira run curta. Declarações anteriores de implementação pendente descrevem a fase de aprovação. Balanceamento continua pendente. Ver design/PRIMEIRA_RUN.md e registro de execução.

## Deck inicial completo aprovado — 02/11/2026

Lote em [ARCATA_DECK_EFEITOS.md](ARCATA_DECK_EFEITOS.md) aprovado integralmente: cinco tropas (Kriv, Soarim, Gwen, Corvo Familiar e Salita) e cinco magias (Raio de Fogo, Mãos Flamejantes, Controlar Chamas, Escudo de Fogo e Parede de Fogo), duas cópias de cada, mais duas de Arcata = 22. Apoios Norte/Leste não exclusivos. Thotph fica fora das tropas por ser divindade, conforme autor. Deck completo ainda não implementado; campeão/pacote existentes não significam implementação dos novos apoios.

## Maestria aprovada — 04/11/2026

O autor aprovou os quinze efeitos e o fechamento em Combustão. A base é Faísca Inicial → Fôlego da Fornalha → Estudo das Chamas. Preparação parte de Estudo das Chamas, Controle parte de Fôlego da Fornalha e Combustão parte de Faísca Inicial. Chama Persistente é o nó de nível 30. Fornalha Viva segue os pré-requisitos normais. Os efeitos e os pré-requisitos individuais constam no [catálogo de talentos](../src/profile/talents.ts). A arte aprovada está em [arcata-mastery-v2.png](../public/art/arcata-mastery-v2.png).

Para talentos de evolução, a primeira entrada já evoluída recebe os benefícios se Arcata atingiu seis magias fora do campo. Em empate de vida entre alvos de Chama Persistente, vale a ordem do campo.
