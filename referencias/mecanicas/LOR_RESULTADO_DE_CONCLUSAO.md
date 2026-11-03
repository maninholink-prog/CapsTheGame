# LoR — estrutura do resultado de conclusão

31/10/2026. Inspeção estática dirigida após o diagnóstico Frida. Nenhuma nova conexão ao processo.

## Estrutura localizada

O tipo `Adventure.Core.RunCompletedResultDto`, índice 7297 dos metadados preservados, declara **Rewards**, **Scores** e **WeeklyAdventureInfoIfApplicable**. É uma estrutura distinta de AdventureRunRewardsDto e de AdventureRunDto. Os tipos de seus campos não foram recuperados; o nome Rewards sozinho não estabelece a classe concreta do valor.

Também existem UpdateResultDto (índice 7299, sem campos próprios exportados) e WeeklyAdventureRunCompletedResultDto (7300, campos RunScore e WeeklyAdventureScoreDto). Não foi estabelecida aqui uma hierarquia de herança entre eles.

## Rotinas candidatas para seguir a origem

| Declaração | Evidência observada |
|---|---|
| AdventureServiceManager.MarkNodeComplete | parâmetros run, nodeId; método índice 42641 |
| Máquina de estados de MarkNodeComplete | campos run e nodeId; MoveNext índice 42678 |
| AdventureManager.HandleBattleCompletionForCurrentNode | método índice 49432 |
| Máquina de estados dessa rotina | campo local persistido `<updateResultDtos>5__2` |
| AdventureManager.QueueUpdatesForHandling | parâmetro updateResultDtos; índice 49435 |
| AdventureManager.QueueUpdatesForHandlingAndForget | parâmetro updateResultDtos; índice 49436 |
| AdventureManager.DoAnimationsForResultsAndThenProcess | parâmetro item; índice 49437 |
| AdventureManager.HandleUpdateResults | parâmetro item; índice 49438 |

A existência dessa lista e dos métodos de fila/processamento identifica alvos mais precisos para uma análise futura. Não demonstra que HandleBattleCompletionForCurrentNode chama MarkNodeComplete, nem que HandleUpdateResults atribui RewardsDto. São hipóteses a verificar nos corpos, não chamadas reconstruídas.

## Comparação com a execução observada

O snapshot posterior à run contém o POST de conclusão do nó e a pilha de StartRewardsRevealSequence já documentados. Uma busca textual não encontrou RunCompletedResultDto, HandleBattleCompletionForCurrentNode, HandleUpdateResults, QueueUpdatesForHandling, MarkNodeComplete, RunCompletedEvent, RewardsDto ou CreateFromDto nesse log. Isso limita o que o log comprova; não significa que as rotinas não executaram.

Portanto, há duas evidências separadas: o log registra a comunicação e a apresentação; os metadados descrevem a representação do resultado e rotinas candidatas de processamento. A ligação intermediária continua sem prova.

## Artefato e limite atual

Catálogo dirigido em `LOR_RESULTADOS_CONCLUSAO_CATALOGO.json`, com índices de tipos/métodos, nomes de campos/parâmetros e SHA-256 dos metadados. Esse catálogo permite retomar a análise nativa nos pontos certos se a associação de endereços for resolvida.

Para o objetivo de comprovar quem preenche o DTO, o limite atual permanece: associação nativa falha e instrumentação do LoR provocou falha registrada pelo Windows. Não repetir esses métodos sem uma hipótese técnica nova. Inspecionar mais nomes não transforma a hipótese em prova.

Para continuar a pesquisa de mecânicas sem depender desse bloqueio, o próximo tema útil é a composição dos packs: slots, filtros de cartas e tratamento de duplicatas, preservando dados encontrados versus regras efetivamente confirmadas. A proposta de boosters gratuitos de C.A.P.S. ainda não foi implementada.
