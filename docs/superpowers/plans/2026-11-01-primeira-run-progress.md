# Execução — primeira run curta

01/11/2026, checkout Game existente. Sem dependências novas, commits, worktrees ou mudanças de configuração do aplicativo/sistema.

## Entrega

- Schema/catálogo para Abe, Arcata, Rubel, pacotes e magias; keywords e custos efetivos.
- Estado de progresso por batalha, fabricação por escolha, resoluções de fogo/cura, evolução com dano preservado, janelas respondíveis de Rubel e conversão de cópia em magia de campeão.
- Run independente do estado de batalha: três combates de teste, recrutamento seis cartas, recompensa duas cópias ou recusa, regiões e limites, derrota/vitória, vida persistente e reset temporário.
- UI de recrutamento/recompensa/encerramento, inspeção do deck e fabricação; IA usa somente observação permitida, inclusive escolhas próprias.

## Decisões e limites

- Usuário preferiu definir aliados reais antes de pacotes fictícios; todos os lotes estão em CAMPANHA.md e documentos individuais.
- Exceção de empate com Nexus zero: autor escolheu continuar com 1 de vida.
- Motor concedido após declaração: autor escolheu valer no próximo ataque.
- Decisão técnica: três batalhas contra deck de Kylast, sem inventar inimigos canônicos; conjunto de coleção de teste, sem perfil/economia. Regiões individuais ainda não atribuídas usam provisoriamente o par do campeão. Recompensas comuns desta demonstração não incluem recrutamento adicional de campeões.
- Não há salvamento, mapa, lojas, checkpoints ou reviver; não constitui balanceamento final nem decks completos próprios de Abe/Arcata/Rubel.

## Verificação

Testes novos observados falhando antes da implementação. Suíte inclui evoluções, cura efetiva, dano/área/fogo, geração e descarte de Upgrades, janelas, cópias, Elusivo/Rápido/Duplo, fronteira oculta e fluxos de run. Três duelos completos com aliados contra a IA, além dos quatro duelos existentes. Três fluxos completos de run com adversário passivo legal para verificar vitória e transições, separadamente do balanceamento da IA.

Revisão independente review_first_run: corrigidos Rubel via Colar com alvo inimigo e exibição de magia de campeão na pilha. Terceiro achado sobre Motor virou decisão explícita do autor e teste de regressão. Oferta comum também exclui campeões para não inserir membros sem atualização de grupo.

Navegador: botão de run, abertura/mulligan/d20, jogadas humanas de unidades/equipamentos, combate/Banjo/Colar, IA automática e encerramento por derrota confirmados. O percurso vencedor/recrutamento é coberto pelos testes de integração e renderização; não alegar partida vencedora manual no navegador. Captura final e resultados finais registrados ao concluir.

## Resultado final

147 testes passaram em 25 arquivos; typecheck e build de produção passaram após correção de codificação UTF-8 em session.ts. Captura docs/screenshots/primeira-run.png verificada visualmente. Navegador deixado na abertura da primeira batalha, run semente 2026, aguardando mulligan humano. Nenhuma mudança global ou reorganização de pasta.
