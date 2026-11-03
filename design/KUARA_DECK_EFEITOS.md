# Kuara — efeitos do deck narrativo

> **Correção regional do autor — 02/11/2026:** apenas protagonistas possuem duas regiões. Cada outra carta possui exatamente uma região, inclusive Korakarom para neutras. Pares atribuídos aos apoios nas seções anteriores estão superados: representam apenas o conjunto de regiões a partir do qual a distribuição individual será definida, não dupla região na carta. Exclusividade é regra separada. Não presumir que toda carta de Kuara seja neutra: só as atribuídas individualmente a Korakarom. Atribuições individuais já válidas de uma região ficam preservadas; novas distribuições ainda pendentes. Implementação atual precisa ser sincronizada após fechar essas atribuições.

02/11/2026. Elenco aprovado, incluindo Carteira Viva como unidade. Atributos, efeitos, três magias e atribuição regional dos apoios deste lote aprovados integralmente pelo autor. Modelo de batalha: cinco tropas e quatro magias, duas cópias cada, mais duas de Kuara = vinte cartas. Mantém campeão 3 mana, 2/3 → 3/4, roubo no ataque ao Nexus uma vez/rodada, evolução após seis cartas roubadas pelo seu lado e roubo duplo evoluído.

## Tropas

| Carta | Mana | Ataque/vida | Efeito |
|---|---:|---|---|
| Chapisco | 1 | 1/2 | Ao entrar, pode dar -1 ataque a uma unidade inimiga escolhida até o fim da rodada, mínimo zero. |
| Batedor de Bolsos | 2 | 2/2 | Já aprovado: ao entrar, rouba uma carta do fundo do deck inimigo por efeito respondível. |
| Carteira Viva | 2 | 1/3 | Ao morrer, rouba uma carta do fundo do deck inimigo por efeito respondível. |
| Ymir | 4 | 2/4 | Enquanto em campo, na primeira vez por rodada que você roubar ao menos uma carta do inimigo, compra uma carta do próprio deck. |
| Balimor, o Panda | 5 | 3/5 | Na primeira carta roubada que seu controlador resolver com sucesso por rodada, enquanto estiver em campo, recebe +1 ataque/+1 vida máxima até o fim da batalha, sem curar. |

Efeitos são adaptações para o card game, não novos poderes históricos da égua, do panda ou de Ymir. Não concluir classe/divindade pelas aparências. Batedor/Carteira transferem cartas originais para mão, custo normal; excesso descartado e ainda conta como roubo. Deck vazio não causa fadiga nesses dois efeitos; exceção da magia de campeão permanece específica.

Ymir compra uma vez por rodada por cópia mesmo se a mesma resolução roubar duas cartas. Exige carta realmente roubada, não tentativa vazia. Sua compra do próprio deck pode causar a própria fadiga conforme regra geral. Não dispara retroativamente ao entrar. Balimor verifica origem roubada da carta física: jogar, ter na mão ou copiar sem resolver não basta. Unidade roubada entrando conta como resolução bem-sucedida; magia anulada/falha e equipamento inválido não contam. Cartas próprias do mesmo nome não são roubadas. Duas cópias de Ymir/Balimor podem disparar independentemente uma vez por rodada; bônus de Balimor não vira Upgrade automaticamente.

## Magias

| Carta | Mana | Velocidade | Efeito |
|---|---:|---|---|
| Mãos Ligeiras | 2 | Lenta | Já aprovada: rouba uma carta do fundo do deck inimigo. Sem cartas no momento de jogar, não pode usar. Sem carta na resolução, não rouba nem causa fadiga. |
| Disfarçar-se | 2 | Rápida | Concede Elusivo a uma unidade aliada até o fim da rodada. Não é Upgrade automaticamente. |
| Ilusão Menor | 2 | Rápida | Dá -2 ataque a uma unidade inimiga até o fim da rodada, mínimo zero. |
| Queda Suave | 1 | Rápida | Devolve uma unidade aliada à mão, seguindo regra de retorno: remove bônus/dano da batalha, retorna equipamentos separadamente e preserva melhorias da run. |

Adaptações das magias da ficha, não regras literais de D&D. Disfarçar-se ajuda o ataque de Kuara chegar ao Nexus, mas não remove bloqueio já declarado: Elusivo só altera elegibilidade de bloqueios futuros. Se alvo já tem Elusivo permanente, expiração não remove a habilidade anterior. Queda Suave não desfaz dano/efeito já resolvido e respeita limite de mão. Não criar nova mecânica-base além das oito aprovadas.

## Regiões e disponibilidade propostas

Leste/Korakarom para os nove apoios, sem exclusividade de Kuara. Como todas as cartas de Korakarom são neutras segundo a regra aprovada, atribuir essa região permite esses apoios em qualquer deck; isso é consequência explícita da proposta, não restrição apenas a Kuara. Disponibilidade ainda respeita coleção/desbloqueios. O deck inicial de Kuara é disponibilizado ao escolhê-lo sem boosters conforme regra geral. Pacote Kuara/Batedor/Mãos Ligeiras continua seis cartas, não todo o deck.

Mãos Mágicas de Kuara mantém custo 3 Lenta, duas tentativas de roubo com fadiga inimiga para cada falta e embaralha cópia de Kuara ao resolver. É magia própria, não quinta identidade adicional de magia de montagem. Nenhuma outra carta deste lote ganha a exceção de fadiga.

Sem código alterado. Rastreamento de cartas roubadas, expiração de Elusivo e interações de campeões precisam de integração completa antes de habilitar Kuara no protótipo.

## Aprovação — 02/11/2026

Autor aprovou integralmente o lote. Leste/Korakarom dos apoios implica elegibilidade neutra conforme regra geral de Korakarom. Ainda sem integração ao motor; não habilitar Kuara parcialmente.
