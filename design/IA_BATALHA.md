# IA básica de batalha

Escopo autorizado: o computador controla J2 na mesa local. Sem serviço externo, novas cartas, vantagem de mana ou alteração de sorteios. Duelo manual permanece disponível para testes.

## Informação

A política recebe AiObservation, construída por lista explícita de campos permitidos: própria mão; campo, vida, mana, quantidades de cartas e descarte de ambos; estado público do combate, evolução e efeitos revelados. Não recebe mãos adversárias, conteúdo ou ordem de nenhum deck, semente ou RNG real. Continuações internas do Colar ficam fora dessa visão.

Comandos candidatos são validados sobre um estado de planejamento reconstruído somente dessa observação, com decks vazios e mão inimiga vazia. A política não avalia resultados aleatórios de Colar/busca nem respostas ocultas. A decisão final passa pelo motor real antes de alterar a batalha.

## Comportamento

- Mulligan busca unidades iniciais e evita mão excessivamente cara ou só de equipamento.
- Joga unidades, escolhe portadores/substituições e usa Troca quando traz benefício.
- Compara ataques e armas usando campo conhecido e bloqueios plausíveis; busca dano letal e evita trocas ruins.
- Bloqueia para evitar derrota e buscar trocas favoráveis. Escolhe alvos dos Banjos exigidos.
- Responde a ameaças visíveis com cartas próprias legais; passa quando não há benefício.
- Não prevê alvos aleatórios do Colar. Resultados dele são resolvidos pelo motor normal.

É uma heurística inicial, não uma IA de dificuldade alta nem busca perfeita. Repetir observação produz a mesma decisão, sem consumir RNG do jogo.

## Interface

Modo Contra IA é o padrão ao abrir a mesa; J1 humano, J2 computador. Mão adversária oculta e controles de J2 indisponíveis ao humano. Ações automáticas ocorrem com pequeno intervalo, uma por vez. Nova batalha cancela ação pendente; modo manual é selecionado para a próxima batalha. A IA confirma seu mulligan; o humano continua podendo rolar o d20 após as duas mãos prontas.

## Verificação

Testar não interferência de dados ocultos, comandos sempre legais, proteção contra letal, alvos de respostas e Banjo, equipagens/Troca e duelos completos com sementes fixas. Timer deve poder ser cancelado sem agir na batalha nova. Nenhuma execução automática depois de término ou fora da prioridade do computador.
