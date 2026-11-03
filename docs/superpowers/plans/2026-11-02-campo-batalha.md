# Separação de retaguarda e campo de batalha

Pedido do autor: separar cartas na mesa das participantes do combate, seguindo a organização de LoR, deixando o acabamento visual para depois.

Implementação: projeção visual do board existente, sem transferir unidades no motor. Seleções de ataque e bloqueio aparecem na frente; cada unidade é renderizada uma vez, com os mesmos controles de inspeção, armas e seleção. Confrontos mantêm ordem da esquerda para a direita, J2 acima e J1 abaixo, independentemente de quem ataca. Bloqueio removido continua indicado como tal. Ao encerrar/cancelar a seleção, os sobreviventes aparecem novamente na retaguarda. Limite total de cinco unidades permanece compartilhado entre áreas.

- [x] Criar projeção de participantes e testes de seleção, bloqueio e retorno.
- [x] Renderizar confrontos com cartas completas e retaguarda filtrada.
- [x] Aplicar estilos e conferir prévia no navegador.
- [x] Validar testes de UI, TypeScript e build.
- [x] Atualizar pasta executável e ZIP.

Verificação: 24 testes de UI passaram. TypeScript passou após corrigir o fixture de teste; build de produção passou. Prévia visual em docs/campo-de-batalha.png. Sem mudança de regras, IA, coleção ou formato de save.
