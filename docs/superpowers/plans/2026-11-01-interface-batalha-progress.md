# Execução: 2026-11-01-interface-batalha.md

## Estado e retomada

Interface concluída em 01/11/2026. Queda de energia interrompeu a conferência no navegador; arquivos e dependências foram preservados. Servidor local foi reiniciado na mesma pasta Game/porta 5173 e os testes retomados, sem alterar vínculos, fontes ou configurações do aplicativo.

## Entregas

- Task 1: complete. Sessão de apresentação, atuação/mulligan, histórico público, erros em português e pilha filtrada. Testes observaram módulo ausente e depois passaram. O histórico não revela nomes de compras ocultas. A identidade física da cópia transformada em Troca permanece no motor.
- Task 2: complete. Vite direto na versão já instalada, scripts locais, arte original de Kylast copiada para public/art, mesa responsiva, cartas, unidades/equipamentos, ações, inspeção, registro/descarte e formulários de ataque/bloqueio/Banjo/Troca. Nenhum framework extra. Build passou; removida uma importação CSS vazia que produzia aviso.
- Task 3: complete. Testes no navegador real, revisão independente, tipos, suíte e build. Servidor ligado em http://127.0.0.1:5173/; aba mantida como entrega e retornada à mão inicial. Iniciar batalha.cmd permite abrir o servidor após reiniciar o computador.

## Verificação no navegador

- Semente 2026: selecionada substituição de Banjo no mulligan, confirmadas mãos de J1 e J2, iniciativa e compra inicial. Rodadas e reservas atualizadas.
- Joias jogadas em ambos os lados; espada descontada para zero equipada. Ataque armado bloqueado: defensor derrotado, equipamento devolvido, atacante sobrevivente com um de vida. Opção explícita Sem arma preservada.
- Semente 131, sem mulligan: Wang entrou e buscou equipamento; Joia e Damian entraram pelo outro lado. Banjo equipado em Wang, ataque declarado e bloqueado por Joia; alvo do Banjo escolhido depois do bloqueio, resposta aberta e resolvida antes do golpe, Nexus adversário recebeu um dano.
- Colar substituiu Banjo em campo cheio de equipamento; botão permaneceu indisponível até escolher a devolução. Gatilho apareceu na pilha, carta de J1 revelada sem alvos, resolução e só então carta de J2 revelada com nova janela. Ambas as cartas do cenário foram robôs; combate e prioridade continuaram corretamente.
- Passagens legais adicionais levaram o duelo ao encerramento por fadiga, com vencedor exibido e sem ações posteriores.
- Tela estreita de 390×844 testada: largura útil e scrollWidth iguais a 375, mesa e painel em coluna única de 351px. Tamanho normal restaurado. Captura do duelo em docs/screenshots/batalha-local.png.
- Navegação por teclado testada com Enter e seletores, incluindo opção Sem arma. Alguns cliques automatizados em cartas fora da área horizontal visível não acionaram seleção; a navegação por teclado alcançou os controles. Preservação de foco e rolagem da mão adicionada para atualizações no mesmo lado.

## Correções e revisão

- Regressão no construtor de ataque: null explícito era convertido no primeiro equipamento por coalescência. Teste observado falhando; distinção entre undefined e null corrigida e aprovada.
- Revisão independente review_battle_ui não encontrou defeitos bloqueadores de gameplay/privacidade. Achado latente em controles de alvo de magias comuns: foco não distinguia checkboxes por valor; acrescentado value à identidade de foco. O deck atual não possui essas magias comuns, mas o caminho genérico foi corrigido.
- Arte e símbolos provisórios não alteram definições de cartas. Raio, dano, alvos, custos, prioridade e sorteios continuam decididos apenas pelo motor.

## Decisões de execução

- Ruling: duelo manual dos dois lados, sem IA ou inimigo canônico inventado. Custo: autor precisa conduzir o adversário também nesta versão.
- Ruling: usar DOM/TypeScript e Vite já presente, sem framework adicional. Custo: renderização é substituída a cada ação; foco e scroll são preservados explicitamente.
- Ruling: validar comandos de formulário com applyCommand sobre o estado imutável, exibindo somente validade/erro e nunca resultados de sorteios antecipados. Custo: prévia usa clonagem do motor, aceitável neste protótipo pequeno.
- Ruling: sem salvamento de batalha nesta entrega. Custo: recarregar/fechar página ou reinicializar o computador perde o duelo; aviso visível. Perfil e progresso de run ainda não existem.
- Ruling: servidor apenas em loopback com porta fixa e strictPort. Nenhuma publicação, mudança global, worktree, commit ou alteração de vínculo do projeto.

## Checks finais

Comandos executados independentemente, todos saída 0:

- node node_modules/vitest/vitest.mjs run --reporter=dot — 98 testes aprovados em 15 arquivos.
- node node_modules/typescript/bin/tsc --noEmit — sem erros.
- node node_modules/vite/bin/vite.js build — build de produção concluído, sem aviso CSS.

## Limites que permanecem

Sem IA, run/mapa, coleção/boosters, perfil, salvamento ou detector formal de ciclos obrigatórios. A interface permite testar as regras e as dez identidades do deck de Kylast; não representa ainda o roguelite completo.
