# Thalion — efeitos do deck narrativo

> **Correção regional do autor — 02/11/2026:** apenas protagonistas possuem duas regiões. Cada outra carta possui exatamente uma região, inclusive Korakarom para neutras. Pares atribuídos aos apoios nas seções anteriores estão superados: representam apenas o conjunto de regiões a partir do qual a distribuição individual será definida, não dupla região na carta. Exclusividade é regra separada. Não presumir que toda carta de Kuara seja neutra: só as atribuídas individualmente a Korakarom. Atribuições individuais já válidas de uma região ficam preservadas; novas distribuições ainda pendentes. Implementação atual precisa ser sincronizada após fechar essas atribuições.

02/11/2026. Elenco aprovado. Efeitos, atributos, regiões individuais e disponibilidade deste lote aprovados integralmente pelo autor. Modelo mágico: cinco tropas e cinco magias de apoio, duas cópias cada, mais duas de Thalion = 22 cartas. Magia de campeão Zombaria Viciosa continua fora das cinco identidades de montagem.

## Tropas

| Carta | Mana | Ataque/vida | Efeito |
|---|---:|---|---|
| Instrumento Ilusório | 1 | 0/2 | Enquanto em campo, a primeira Música que seu controlador jogar em cada rodada custa 1 a menos, mínimo 1. |
| Instrumentista Desafinado | 2 | 1/3 | Aprovado: a primeira Música resolvida pelo seu controlador em cada rodada enquanto em campo concede +2 ataque a ele até o fim da rodada. |
| Sátira Brigona | 3 | 3/3 | Ao entrar, pode dar -2 ataque a uma unidade inimiga escolhida até o fim da rodada, mínimo zero. |
| Administradora da Guilda | 3 | 2/4 | Ao entrar, compra a primeira carta com marca Música encontrada no seu deck, se houver. Sem Música, não compra nem sofre fadiga. |
| Rock, o Barqueiro | 4 | 2/5 | Ao entrar, pode devolver outro aliado à mão; se conseguir devolvê-lo, compra uma carta do próprio deck. |

### Interações propostas

- Instrumentos distintos acumulam descontos; piso nunca aumenta custo que já seja zero por outra melhoria. O desconto é consumido quando a Música é jogada, mesmo anulada depois, não quando resolve. Não é retroativo: uma cópia que entra após uma Música jogada anteriormente na rodada pode descontar o primeiro uso enquanto estiver em campo. Cada cópia acompanha seu gatilho por rodada. Não desconta efeito de unidade, só carta explicitamente marcada Música.
- Instrumentista exige resolução bem-sucedida; habilidade própria não é Música. Sátira tem entrada opcional respondível para não impedir entrada em campo inimigo vazio. Redução expira, não afeta vida e não cria Música por si.
- Busca da Administradora retira a carta real do deck, sem criar cópia, e respeita mão dez/descarte por excesso. Não revela cartas alheias nem garante uma identidade específica de magia por consulta à mão inimiga. Carta encontrada é do próprio deck; não é Pilantragem.
- Rock tem entrada opcional respondível; não pode visar a si mesmo. Alvo inválido na resolução não retorna nem compra. Se a unidade volta e é descartada por mão cheia, ainda houve retorno, então compra normalmente e pode descartar a compra por excesso. Equipamentos retornam conforme regra geral e bônus/dano de batalha são removidos. Compra do próprio deck pode provocar sua fadiga.
- Efeitos de suporte são adaptações de jogo, não confirmação de poderes musicais da sátira, biblioteconomia mágica da administradora ou magia própria de Rock. Instrumento Ilusório é criação mágica baseada na ficha, sem nova personalidade histórica.

## Músicas — todas Dissonância

| Carta | Mana | Velocidade | Efeito |
|---|---:|---|---|
| Risada de Tasha | 3 | Rápida | Aprovada: atordoa uma unidade inimiga. |
| Esquentar Metal | 2 | Rápida | Causa 1 dano a uma unidade inimiga; se ela estiver equipada ao resolver, causa 2 em vez de 1. Também tem marca Fogo/Piromancia. |
| Cegueira | 2 | Rápida | Dá -3 ataque a uma unidade inimiga até o fim da rodada, mínimo zero. |
| Enfeitiçar Monstro | 4 | Lenta | Atordoa até duas unidades inimigas distintas escolhidas. Não toma controle das unidades. |
| Maldição do Orgulho | 4 | Lenta | Causa a uma unidade inimiga dano igual ao ataque atual dela, calculado na resolução. Não é golpe nem ataque. |

Adaptações musicais de capacidades da ficha/sessões. Cada resolução bem-sucedida conta uma Música, mesmo com vários alvos. Esquentar Metal também conta uma magia de Fogo para Arcata, se estiver no grupo; seus bônus de dano de fogo somam ao dano base determinado por equipamento. Vida máxima concedida por armadura não ocupa slot de equipamento e não basta para dobrar dano de Esquentar Metal. Maldição do Orgulho não é Fogo; ataque reduzido a zero causa zero dano, mas uma resolução válida ainda conta como Música.

Nenhuma Música aplica simultaneamente todos os prejuízos da tabela. Zombaria mantém seu dano/redução próprios. Os gatilhos de Thalion e sua evolução por seis Músicas permanecem aprovados; suas habilidades adicionais não são novas cartas de Música e não criam recursão.

## Regiões e disponibilidade propostas

Sul/Leste para os dez apoios. Instrumentista Desafinado e Risada de Tasha não exclusivos, resolvendo essa pendência do pacote; demais apoios também não exclusivos. Deck básico disponível ao escolher Thalion sem boosters; demais aquisições seguem coleção e regiões. Pacote Thalion/Instrumentista/Risada continua seis cartas.

Sem código alterado. Não altera os decks já integrados. Novos efeitos de busca, desconto de Música e entrada composta precisam de testes ao integrar Thalion.

## Aprovação — 02/11/2026

Autor aprovou integralmente o lote, incluindo Sul/Leste dos apoios e ausência de exclusividade. Deck ainda não implementado.
