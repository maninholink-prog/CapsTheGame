# Interface local de batalha

01/11/2026. Escopo autorizado: primeira interface sobre o motor existente, sem alterar gameplay, pastas ou configurações do aplicativo.

## Experiência

Duelo de teste em um computador, com os dois lados controlados manualmente e o deck inicial de Kylast em ambos. Esta foi a primeira entrega manual; a extensão Contra IA está descrita em IA_BATALHA.md. Não há adversário canônico inventado. Campos de J2 no alto e J1 embaixo permanecem estáveis; a mão acompanha quem precisa agir, com opção explícita de inspecionar o outro lado no modo local de teste.

Mesa escura, detalhes de bronze/ouro, indicadores de mana azuis e raridades com as cores aprovadas. Cartas com nome, custo, atributos e resumo; painel lateral mostra o texto completo e a ação atual. Usar a referência original de Kylast fornecida pelo autor, sem geração de novas artes. Outros retratos podem usar símbolos provisórios consistentes.

## Fluxos

1. Mão inicial: selecionar substituições para J1 e J2, confirmar cada mão e rolar iniciativa.
2. Ações: escolher carta, alvos/posição/substituição quando necessários e confirmar. Mana/reserva e motivo de uma ação indisponível visíveis.
3. Ataque: selecionar participantes em ordem e arma de cada golpe; confirmar. Defensor atribui bloqueadores ou confirma nenhum.
4. Banjo: escolher alvo para cada cópia exigida pelo motor, depois abrir respostas.
5. Respostas: mão e prioridade indicadas; passar uma vez por lado. Pilha exibe fontes e alvos conhecidos, sem revelar os alvos aleatórios do Colar antes da resolução nem as continuações internas.
6. Término: vencedor/empate e nova batalha com semente informada.

## Limites e verificação

Sem mapa, boosters, perfil ou salvamento. IA adicionada na entrega seguinte, mantendo este modo manual. Recarregar a página reinicia a batalha; informar isso na interface/documentação. Não expor um editor de estado nem colocar o estado completo em window para testes. Testar fluxos no navegador real, build de produção, tipos e regressões do motor. Responsividade e navegação por teclado são requisitos básicos.
