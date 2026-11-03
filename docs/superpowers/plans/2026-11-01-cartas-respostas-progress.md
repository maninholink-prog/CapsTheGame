# Execução: 2026-11-01-cartas-respostas.md

- Preflight: custos consomem CardDefinition/PlayerState; play consome custos/alvos; comandos consomem play/resolução. Efeitos e jogar cartas compartilham PendingEffect/Result. Integração Task 2/3 feita após testes vermelhos de ambas, evitando módulos provisórios de resolução.
- Task 1: complete. Catálogo discriminado, validação de custo/atributos/efeitos, pagamento imutável com reserva primeiro para spell/trick/armor. Teste falhou por módulo ausente; após implementar, 20 testes e tipos aprovados.
- Task 2: complete. Comando play, unidades básicas com posições/substituição e janelas slow/fast/burst. Testes observaram Command not yet supported antes da implementação.
- Task 3: complete. Alvos por categoria/lado, cardinalidade e identidade; resolução LIFO; anulação, dano simultâneo, cura, armadura, mortes e término. Testes vermelhos antes da implementação e verdes depois. Correção de tipo na construção de comando de teste com targets opcional.

## Decisões técnicas

- Ruling: manter a prioridade de retorno da sequência separada da prioridade de cada resposta. Volta ao adversário de quem iniciou a sequência. Custo se mudar a especificação de alternância: ajustar esse marcador e seus testes, sem alterar efeitos individuais.
- Ruling: representar janela de respostas por stackReturnOwner, além do conteúdo da pilha. Uma anulação Explosiva pode remover o último efeito sem fechar a janela nem passar a ação; dois passes fecham essa janela sem avançar rodada. Custo: uma janela vazia continua exigindo passes, em vez de retornar automaticamente às ações normais. Caso de fronteira documentado, não nova carta canônica.
- Ruling: catálogo opcional para manter a API inicial; sem definição não se joga a carta. Equipamento explicitamente rejeitado até seu módulo. Custo: cliente futuro deve fornecer catálogo completo e validar composição, ainda não entregue.
- Ruling: a entrega aceita somente unidades básicas e efeitos direcionados implementados. Nenhum efeito de campeão ou gatilho é aproximado silenciosamente. Custo: ainda não permite carregar o deck real de Kylast.

## Revisão e resultado

Revisão independente review_cards encontrou apenas P2 da janela vazia após anulação Explosiva, também detectado localmente. Teste de regressão observado falhando e depois aprovado após separar janela de pilha. Nenhum outro achado concreto nem menor reportado.

Verificação final: node node_modules/vitest/vitest.mjs run — 39 testes aprovados em 6 arquivos. node node_modules/typescript/bin/tsc --noEmit — saída 0. Inclui regressões do núcleo anterior.

Sem commits, mudanças globais ou alterações de vínculos/fontes do aplicativo. Próxima entrega: combate e equipamentos/Kylast, com plano e testes próprios. Limitações detalhadas no README.
