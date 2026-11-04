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

## Maestria de Rubel — 04/11/2026

O autor respondeu “Gostei destes efeitos” à proposta de quinze talentos. A evolução continua exigindo dez pontos de cura efetiva enquanto Rubel está em campo. Bônus fixos de cura são acrescentados depois da duplicação de Rubel evoluído.

- Base: Mãos Preparadas compra a primeira magia de cura do deck no início da batalha, se houver → Vigor do Guardião concede +1 de vida base a Rubel → Sinal de Esperança compra uma carta na primeira cura efetiva com Rubel em campo.
- Cura, a partir de Sinal de Esperança: Palavra Acolhedora concede até +1 de cura na primeira Palavra Curativa resolvida → Oração Preparada reduz o custo da primeira Oração de Cura jogada em 1, mínimo 1 → Prece do Vínculo concede até +1 de cura na primeira Cura de Ferimentos resolvida no próprio Vínculo → Mãos Estendidas compra uma carta na primeira cura que recuperar vida de pelo menos três unidades aliadas de uma vez.
- Proteção, a partir de Vigor do Guardião: Auxílio Reforçado dá +1 de vida máxima adicional a cada alvo do primeiro Auxílio resolvido, sem curar → Bênção da Guarda dá +1 de vida máxima aos alvos da primeira Bênção resolvida, sem curar → Guarda Firme reduz em 1 o dano do primeiro golpe que atingir Rubel → Santuário do Grupo, nível 30, dá a cada unidade aliada presente na evolução de Rubel, incluindo ele, redução de até 2 no próximo golpe que receber naquela batalha.
- Evolução, a partir de Mãos Preparadas: Devoção concede até +1 de cura à primeira cura de entrada de Rubel → Fôlego Renovado recupera 1 de mana de magia ao evoluir, respeitando o limite → Alívio Imediato concede até +1 de cura ao próprio Vínculo na onda da evolução → Prece Renovada cria uma Palavra Curativa na mão ao evoluir.

Referência visual fornecida pelo autor: Rubel é de Vitumirim, segue a Luz e aparece no auge de seu poder enfrentando uma horda. Variante de maestria em [rubel-mastery.png](../public/art/rubel-mastery.png), gerada com imagegen integrado. Arte proposta e efeitos registrados. Integração ao jogo ainda pendente.


## Aprovação e integração — 04/11/2026

O autor aprovou a arte e pediu integrar e publicar. A árvore liga Base no peito, Cura e Evolução nas asas e Proteção no arco inferior. Santuário do Grupo e Guarda Firme somam suas reduções no primeiro golpe de Rubel quando ambos estão disponíveis.
