# Rubel — efeitos do deck narrativo

> **Correção regional do autor — 02/11/2026:** apenas protagonistas possuem duas regiões. Cada outra carta possui exatamente uma região, inclusive Korakarom para neutras. Pares atribuídos aos apoios nas seções anteriores estão superados: representam apenas o conjunto de regiões a partir do qual a distribuição individual será definida, não dupla região na carta. Exclusividade é regra separada. Não presumir que toda carta de Kuara seja neutra: só as atribuídas individualmente a Korakarom. Atribuições individuais já válidas de uma região ficam preservadas; novas distribuições ainda pendentes. Implementação atual precisa ser sincronizada após fechar essas atribuições.

02/11/2026. Elenco e nomes das magias aprovados. Efeitos, atributos e disponibilidade aprovados pelo autor com correção regional: Leste/Norte para Rubel e os apoios deste deck, substituindo Norte/Sul. Modelo mágico aprovado: cinco tropas e cinco magias de apoio, duas cópias cada, mais duas de Rubel = 22 cartas. Cura de Ferimentos não é identidade adicional, mantém magia de campeão aprovada.

## Tropas

| Carta | Mana | Ataque/vida | Efeito proposto |
|---|---:|---|---|
| Coroinha da Infância | 1 | 0/3 | Ao entrar, cura 1 de uma unidade aliada escolhida. |
| Luise, a Bibliotecária | 2 | 1/2 | Ao entrar, compra uma carta. |
| Archibald, o Comerciante | 3 | 2/4 | Enquanto em campo, na primeira cura que recuperar vida efetivamente para seu lado em cada rodada, compra uma carta. |
| Guardião da Fé | 4 | 2/6 | Ao ser declarado bloqueador, cura 1 de seu Nexus. Uma ativação por rodada por cópia. |
| Mantum | 5 | 2/6 | No início da rodada, enquanto em campo, cura 1 de todas as suas unidades aliadas. Não cura Nexus. |

### Interações propostas

- Entradas curativas e gatilhos de bloqueio/início da rodada são respondíveis; compras seguem fadiga e mão dez. Alvo do coroinha pode ser ele mesmo se estiver válido, mas cura excedente não tem efeito.
- Archibald exige cura real, de unidade aliada ou próprio Nexus. Uma cura em área dispara uma compra, não uma por alvo; duas cópias de Archibald podem comprar uma cada. Não reage retroativamente a cura antes de sua entrada. Não exige Rubel em campo para funcionar.
- Guardião cura ao bloquear antes dos golpes, não depende de sobreviver ao combate. Não é nova regra de invulnerabilidade nem restrição de ataque: é uma unidade normal.
- Mantum cura também a si mesmo se ferido. Sua cura de área conta o total recuperado para Rubel se ele estiver em campo e é dobrada se Rubel evoluído estiver em campo conforme regra aprovada. Cura zero não produz progresso ou compra de Archibald.
- Atributos/efeitos representam adaptação do papel narrativo: cuidado e comunidade da infância, pesquisa de Luise, acolhimento de Archibald e suporte de Mantum. Não declarar que todos esses NPCs têm poderes curativos canônicos ou novas classes.

## Magias

| Carta | Mana | Tipo/velocidade | Efeito |
|---|---:|---|---|
| Palavra Curativa | 1 | Explosiva; Restauração | Texto aprovado: cura 2 de uma unidade aliada. |
| Oração de Cura | 3 | Lenta; Restauração | Texto aprovado: cura 2 de todas as unidades aliadas. |
| Bênção | 2 | Explosiva | Concede +1 ataque a até três unidades aliadas escolhidas até o fim da rodada. |
| Auxílio | 3 | Armadura Rápida | Concede +2 vida máxima a até duas unidades aliadas distintas, sem curar. Não ocupa equipamento. |
| Chama Sagrada | 2 | Rápida | Causa 2 dano radiante a uma unidade inimiga. Não atinge Nexus e não tem marca Fogo/Piromancia. |

Bênção/Auxílio requerem pelo menos um alvo válido ao jogar; perda de todos os alvos causa falha conforme regra geral. Aumentar vida máxima preserva dano e não conta como Restauração ou progresso de Rubel. Não adicionar Upgrade automaticamente às magias de proteção. Dano radiante é descrição temática de Chama Sagrada, sem nova vantagem automática contra mortos-vivos nem nova mecânica-base. Não presume bypass de redução/proteção.

## Regiões e disponibilidade aprovadas

Leste/Norte para as dez identidades de apoio, sem exclusividade de Rubel. Atribuição de gameplay, sem redefinir origem dos NPCs. Cartas do deck básico disponíveis ao escolher Rubel conforme regra geral; demais obtenções seguem coleção e regras de recompensa, ainda sem novo desbloqueio automático. Pacote Rubel/Palavra/Oração continua o mesmo, seis cartas ao recrutar.

Mantém campeão custo 4, 1/5 → 3/8, dez de cura efetiva presenciada, curas dobradas e gatilho de cura em área evoluído aprovados. Proposta ainda não implementada. Condição de salto evolutivo forte será avaliada com o conjunto em partidas; números não provam balanceamento.

## Integração local — 02/11/2026

Deck completo implementado no catálogo, motor, seleção de protagonista e runs. Declarações anteriores de implementação pendente são históricas. Ver README.md e docs/superpowers/plans/2026-11-02-decks-protagonistas-progress.md. Balanceamento e raridades novas permanecem pendentes.
