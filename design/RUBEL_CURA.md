# Rubel — cura

01/11/2026. Base de design aprovada pelo autor; ainda não implementada ou balanceada em partidas.

## Direção do autor

Cura é a mecânica central de Rubel. Evolui ao curar um total de dez pontos de vida. O autor quer que seu salto de poder na evolução seja o mais forte entre os protagonistas e que a evolução seja uma das mais difíceis de alcançar. Essa intenção precisa ser verificada em balanceamento, não constitui uma comparação já demonstrada com todos os campeões futuros.

## Campeão aprovado

| Forma | Mana | Atributos | Habilidade |
|---|---:|---|---|
| Inicial | 4 | 1/5 | Ao entrar, cure 2 de vida de um aliado ou do seu Nexus. |
| Evoluída | 4 | 3/8 | Suas curas são dobradas. Ao evoluir e no início de cada rodada, cure 2 de todos os aliados e do seu Nexus. |

A cura em área da forma evoluída também é dobrada: recupera até quatro de cada alvo.

## Evolução — interações aprovadas

1. Contam somente pontos de vida realmente recuperados. Excesso de cura e aumento de vida máxima não contam.
2. Rubel precisa estar em campo para acompanhar os dez pontos; progresso obtido permanece se ele sair.
3. Contam suas curas em unidades aliadas e no próprio Nexus. Curas em vários alvos somam o total efetivamente recuperado.
4. A cura que completa os dez pontos usa o valor normal; depois Rubel evolui e dispara sua cura em área.

O autor aprovou o lote com “Ficou bom”. São adaptações de gameplay, não poderes históricos automaticamente inferidos.

## Pacote e magia de campeão — aprovados

Lote aprovado pelo autor em 01/11/2026. Adaptações de magias de D&D para o card game.

| Carta do pacote | Mana | Velocidade | Efeito |
|---|---:|---|---|
| Rubel | 4 | Unidade | Campeão 1/5 conforme a base acima. |
| Palavra Curativa | 1 | Explosiva | Cura 2 de uma unidade aliada. |
| Oração de Cura | 3 | Lenta | Cura 2 de todas as unidades aliadas. |

Duas cópias de cada identidade: seis cartas adicionadas. Oração exige unidades feridas para aproveitar o potencial de cura e de progresso da evolução.

**Magia de campeão — Cura de Ferimentos:** custo 3, Rápida. Cura 4 de uma unidade aliada ou do próprio Nexus. Ao resolver, embaralha uma cópia de Rubel no deck. Substitui Rubel na mão quando já houver um Rubel aliado em campo. Não integra as três identidades do pacote.

## Fechamento aprovado

Lote aprovado pelo autor em 01/11/2026:

1. Regiões Norte e Sul, como escolha de gameplay.
2. Palavra Curativa e Oração de Cura não são exclusivas, disponíveis pelas regiões; Cura de Ferimentos permanece magia de campeão. Regiões individuais das magias não foram atribuídas separadamente.
3. Evolução preserva dano sofrido: de 1/5 com 2 de vida, passa a 3/8 com 5 de vida. Aumento não conta como cura.
4. Progresso dos dez pontos é compartilhado pelas cópias e zera entre batalhas.
5. Cura de entrada permite resposta, com alvo e valor visíveis. Se Rubel sair antes de resolver, a cura acontece mas não avança sua evolução.
6. Ao atingir dez, se Rubel continuar em campo, evolui e coloca cura em área em nova janela de resposta. Curas futuras dobram enquanto ele evoluído estiver em campo.

Base de design e pacote aprovados; implementação e balanceamento pendentes.

## Implementação local — 01/11/2026

Base e pacote implementados como aliado na primeira run curta. Declarações anteriores de implementação pendente descrevem a fase de aprovação. Balanceamento continua pendente. Ver design/PRIMEIRA_RUN.md e registro de execução.

## Deck narrativo e correção regional — aprovados em 02/11/2026

Autor aprovou integralmente [RUBEL_DECK_EFEITOS.md](RUBEL_DECK_EFEITOS.md), com mudança para **Leste/Norte** em Rubel e apoios, substituindo Norte/Sul. Vinte e duas cartas: cinco tropas (Coroinha, Luise, Archibald, Guardião da Fé, Mantum), cinco magias (Palavra, Oração, Bênção, Auxílio, Chama Sagrada) e campeão, duas de cada. Apoios não exclusivos. Atributos e complementos conforme documento. O catálogo do protótipo ainda usa a região antiga: atualizar ao integrar o deck; não alegar correção de código já feita.
