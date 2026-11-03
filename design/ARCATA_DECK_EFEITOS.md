# Arcata — efeitos do deck narrativo

> **Correção regional do autor — 02/11/2026:** apenas protagonistas possuem duas regiões. Cada outra carta possui exatamente uma região, inclusive Korakarom para neutras. Pares atribuídos aos apoios nas seções anteriores estão superados: representam apenas o conjunto de regiões a partir do qual a distribuição individual será definida, não dupla região na carta. Exclusividade é regra separada. Não presumir que toda carta de Kuara seja neutra: só as atribuídas individualmente a Korakarom. Atribuições individuais já válidas de uma região ficam preservadas; novas distribuições ainda pendentes. Implementação atual precisa ser sincronizada após fechar essas atribuições.

02/11/2026. Elenco e nomes das magias aprovados, incluindo Gwen substituindo Thotph. Lote aprovado integralmente pelo autor: textos, atributos e distribuição regional, incluindo complementos abaixo. Modelo mágico aprovado: cinco tropas, cinco magias e campeão, duas cópias cada = 22 cartas. Bola de Fogo permanece magia de campeão, não sexta magia de montagem.

## Tropas

| Carta | Mana | Ataque/vida | Efeito proposto |
|---|---:|---|---|
| Corvo Familiar de Arcata | 2 | 1/1 | Ao entrar, compra uma carta. Não é Elusivo automaticamente por ser ave. |
| Soarim Khalmyr | 2 | 1/3 | Ao entrar, reduz em 1 o custo da próxima magia de Fogo jogada pelo seu controlador nesta rodada, mínimo 1. Sobrenome inferido da família para nome de carta, sujeito à correção do autor. |
| Salita dos Sonhos | 3 | 1/4 | Na primeira magia de Fogo do seu controlador resolvida por rodada enquanto estiver em campo, cura 1 de seu Nexus. |
| Gwen, da Corrente Quebrada | 3 | 2/4 | Ao entrar, pode devolver outra unidade aliada à mão de seu controlador. Entrada respondível, escolha e alvo visíveis; retorno segue regras aprovadas de remoção de bônus/dano e devolução de equipamentos. |
| Kriv Khalmyr | 5 | 4/5 | Na primeira magia de Fogo do seu controlador resolvida por rodada enquanto estiver em campo, recebe +2 ataque até o fim da rodada. |

Gatilhos de Salita/Kriv não são retroativos. Cada cópia pode disparar uma vez/rodada; sem multiplicação do limite por múltiplos alvos da magia. Não afirmam que familiares de Arcata lançam fogo: representam a relação de apoio/proteção em gameplay. Soarim fornece preparação, não cura a própria maldição nem transfere doença. Salita cura, portanto interage com Restauração conforme condições, mas seu gatilho não é nova magia de fogo. Gwen usa mobilidade/retirada inspirada em seus portais e proteção de libertos. Bônus de Kriv não é efeito de arma.

## Magias

| Carta | Mana | Velocidade/tipo | Efeito |
|---|---:|---|---|
| Raio de Fogo | 1 | Rápida; Fogo | Texto aprovado: 1 dano a unidade ou Nexus inimigo. |
| Mãos Flamejantes | 3 | Lenta; Fogo | Texto aprovado: 2 dano a até três unidades inimigas escolhidas. |
| Controlar Chamas | 1 | Explosiva; Fogo | Sua próxima magia de Fogo que cause dano nesta rodada recebe +1 dano por alvo. O bônus é gasto na próxima carta elegível jogada, mesmo se anulada; não modifica habilidades ou danos já pendentes. |
| Escudo de Fogo | 3 | Armadura Rápida; Fogo | Concede +3 vida máxima a um aliado, sem curar. Até o fim da rodada, a primeira unidade que atingir esse aliado com um golpe sofre 2 de dano de retaliação. |
| Parede de Fogo | 4 | Lenta; Fogo | Causa 1 dano a todas as unidades inimigas e dá -1 ataque às sobreviventes até o fim da rodada, mínimo zero. |

### Interações aprovadas

- Controlar Chamas não causa dano, mas sua resolução é uma magia de Fogo para Combustão/evolução. Cópias acumulam seus bônus na próxima magia elegível; não amplificam o próprio efeito. Bônus soma com o de Arcata evoluído.
- Escudo não aumenta dano do golpe recebido e não impede esse golpe. Retaliação ocorre depois do golpe e mortes, mesmo se o protegido morrer, em gatilho respondível atribuído à magia. Não dispara por dano de magia, contra Nexus ou mais de uma vez por aplicação. Dois Escudos são duas aplicações, suas vidas e retaliações acumulam; cada uma é consumida pelo primeiro golpe posterior. Se Arcata evoluído está em campo ao resolver a retaliação, seu bônus de magia de fogo aumenta 2 para 3; retaliação não conta como outra magia lançada. Controlar Chamas aplicado ao Escudo também aumenta a retaliação em 1, não sua vida máxima. Detalhes de dano posterior incluídos no lote aprovado.
- Parede aplica simultaneamente dano e redução dentro de sua resolução; não cria barreira persistente nem atinge aliados/Nexus. Arcata evoluído aumenta dano para 2 e não altera a redução.

## Regiões e composição

Propõe-se Norte/Leste para todos os novos apoios e para as magias do deck, não exclusivos de Arcata, respeitando as regras regionais/desbloqueio. Atribuição de gameplay, sem mudar origens históricas dos personagens. Deck básico disponível ao escolher Arcata conforme regra geral; isso não altera seu pacote de recrutamento de seis cartas.

Mantém campeão aprovado custo 4, 2/4 → 3/5, evolução com seis magias de fogo e Combustão. Efeitos de card game são adaptações narrativas, não novas habilidades canônicas de NPCs nem texto literal de D&D. Nenhum código alterado.

## Integração local — 02/11/2026

Deck completo implementado no catálogo, motor, seleção de protagonista e runs. Declarações anteriores de implementação pendente são históricas. Ver README.md e docs/superpowers/plans/2026-11-02-decks-protagonistas-progress.md. Balanceamento e raridades novas permanecem pendentes.
