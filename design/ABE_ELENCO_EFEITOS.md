# Abe — elenco e efeitos do deck narrativo

> **Correção regional do autor — 02/11/2026:** apenas protagonistas possuem duas regiões. Cada outra carta possui exatamente uma região, inclusive Korakarom para neutras. Pares atribuídos aos apoios nas seções anteriores estão superados: representam apenas o conjunto de regiões a partir do qual a distribuição individual será definida, não dupla região na carta. Exclusividade é regra separada. Não presumir que toda carta de Kuara seja neutra: só as atribuídas individualmente a Korakarom. Atribuições individuais já válidas de uma região ficam preservadas; novas distribuições ainda pendentes. Implementação atual precisa ser sincronizada após fechar essas atribuições.

02/11/2026. Lote aprovado integralmente pelo autor: elenco, números, efeitos, regiões, disponibilidade e composição. Substitui a lista rejeitada de tropas de Félix; não reaproveita suas identidades para o deck inicial.

## Composição aprovada

Modelo de batalha para o artífice: duas cópias de Abe, cinco tropas de apoio em duas cópias e quatro magias em duas cópias, vinte cartas. Classificação do artífice no modelo de batalha aprovada neste lote. Pacote Abe/Aranha/Projeto permanece igual, seis cartas ao recrutá-lo. Engenharia de Campo é sua magia própria, não uma quarta magia extra no deck inicial.

## Tropas

| Carta | Mana | Ataque/vida | Efeito |
|---|---:|---|---|
| Aranha Arranha | 2 | 1/3 | Mantém texto aprovado: quando recebe Upgrade, ganha +1 ataque adicional até o fim da batalha. |
| Zacarias, Aprendiz de Gremin | 1 | 1/2 | Ao entrar, reduz em 1 o custo do próximo Upgrade jogado por seu controlador nesta rodada, mínimo 1. Benefício existe após a entrada mesmo se Zacarias sair. |
| Keegan, Jovem Artífice | 3 | 2/4 | Ao entrar, fabrica: escolhe um entre três Upgrades aleatórios distintos, usando as mesmas quatro opções de Abe. |
| Lúcia, Inventora Curiosa | 3 | 2/3 | Enquanto em campo, na primeira vez por rodada que seu controlador resolve um Upgrade com sucesso, compra uma carta. |
| Gremin Ironhold, Grande Artífice | 5 | 3/6 | Enquanto em campo, no primeiro Upgrade bem-sucedido de seu controlador em cada rodada aplicado a outro aliado, concede +1 ataque/+1 vida máxima adicional à unidade-alvo, sem curar. |

Os gatilhos de Lúcia e Gremin não são retroativos. Cada cópia possui seu limite de uma ativação/rodada; duas cópias podem disparar sobre o mesmo Upgrade. Gremin não amplifica Upgrade em si próprio. Para efeito de vários alvos, escolhe um dos outros aliados que realmente receberam o Upgrade, sem multiplicar por alvo. Seu bônus é consequência do Upgrade original e não novo uso, evitando recursão com Abe/Aranha. Bônus numéricos duram a batalha; comprar segue fadiga/limite da mão.

Zacarias acumula descontos de entradas distintas com piso final 1, junto ao desconto de Abe evoluído. Desconto é gasto ao jogar o Upgrade, mesmo que seja anulado; não acumula para outra rodada. Fabricação de Keegan, como Projeto e habilidade de Abe, gera Upgrade sem contar como uso.

## Magias

| Carta | Mana | Velocidade/tipo | Efeito |
|---|---:|---|---|
| Projeto de Melhoria | 2 | Explosiva | Texto já aprovado: fabrica um Upgrade por escolha entre três opções distintas. Não é uso de Upgrade. |
| Arma Aprimorada | 2 | Explosiva; Upgrade | Concede +2 ataque a uma unidade aliada até o fim da batalha. Não exige equipamento e não cria carta de arma. |
| Defesa Aprimorada | 2 | Armadura Rápida; Upgrade | Concede +3 vida máxima a uma unidade aliada, sem curar e sem ocupar equipamento. |
| Lampejo de Genialidade | 2 | Rápida; Upgrade | Concede +2 ataque a uma unidade aliada até o fim da rodada e compra uma carta. Se o alvo ficar inválido antes de resolver, falha inteiro, sem compra nem progresso. |

Todas as novas magias são adaptações das infusões ou capacidades registradas de Abe, não descrições literais de regras de D&D. Arma Aprimorada afeta a unidade para não exigir outra carta de equipamento; o nome representa sua infusão. Defesa é armadura; Arma não concede vida. Lampejo é uma intervenção tática temporária, marcada Upgrade expressamente nesta proposta. Uma resolução conta um Upgrade, não dois por também comprar carta.

## Regiões e disponibilidade aprovadas

Aranha e Projeto mantêm Sul/Oeste e exclusividade de Abe. Propõe-se Sul/Oeste para as sete novas identidades de apoio, como atribuição de gameplay, não origem geográfica dos NPCs. As sete não seriam exclusivas: poderiam aparecer para outros decks elegíveis após desbloqueio. O deck inicial de Abe disponibiliza suas próprias cartas básicas sem exigir boosters, conforme regra geral; formas de desbloqueio para outros protagonistas seguem o sistema de coleção ainda pendente.

## Base narrativa

- [Abe](../personagens/ABE_GRAVO.md): infusões, Flash of Genius e colaboração na oficina.
- [CAPS 12](../referencias/youtube/CAPS_12.md) e [CAPS 13](../referencias/youtube/CAPS_13.md): Zacarias, Keegan, Gremin e Lúcia tiveram contato com Abe. Aranha Arranha é robô de arena, não a montaria grande.
- [Referências do autor](../referencias/drive/dragonbreath/LEITURA.md): grafias e aparências conferidas.

Papéis mecânicos propostos: Zacarias facilita recursos, Keegan compartilha conhecimento, Lúcia pesquisa e Gremin supervisiona melhorias. Esses efeitos não são poderes históricos novos nem afirmam autoria de Abe sobre os inventos alheios. Nenhum código alterado.

## Integração local — 02/11/2026

Deck completo implementado no catálogo, motor, seleção de protagonista e runs. Declarações anteriores de implementação pendente são históricas. Ver README.md e docs/superpowers/plans/2026-11-02-decks-protagonistas-progress.md. Balanceamento e raridades novas permanecem pendentes.
