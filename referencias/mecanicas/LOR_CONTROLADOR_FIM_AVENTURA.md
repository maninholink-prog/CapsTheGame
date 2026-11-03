# LoR — controlador da apresentação no fim da aventura

Atualização: [entrada de dados do resumo](LOR_ENTRADA_DADOS_RESUMO.md) identifica o componente real do prefab como CMPEndOfRunSummaryOverlay e recupera os nomes dos parâmetros de inicialização. A saída JSON deste relatório foi ampliada para três componentes; o texto abaixo preserva a primeira inspeção.

31/10/2026. Controlador localizado em prefab e declarações IL2CPP. Não houve execução de partida, recuperação de corpos nativos ou prova de fluxo por chamadas.

## Controlador localizado

**CMPRunEndOverlayLoader**, PathID `-8864795573315344068`, está no pacote `00/c9c611ea0ea0edab3e23b11d6abe53.bbq`, associado ao prefab `Assets/AssetLibrary/Adventure/UI/Prefabs/CMPRunEndOverlayLoader.prefab`.

Seu componente serializado referencia diretamente:

| Campo | Prefab apontado |
|---|---|
| RewardsOverlaySoftRef | UI/CardMetaProgression/EndOfRun/CMPRunRewardsOverlay.prefab |
| RewardsChestOverlaySoftRef | Adventure/UI/Prefabs/CMPRunRewardsChestOverlay.prefab |
| RunSummaryOverlaySoftRef | UI/CardMetaProgression/EndOfRun/CMPRunSummaryOverlay.prefab |
| QuestRelicOverlaySoftRef | Adventure/UI/Prefabs/CMPRunQuestRelicOverlay.prefab |
| MailOverlaySoftRef | UI/CardMetaProgression/EndOfRun/CMPRunRewardsMailOverlay.prefab |

Os caminhos são relativos a Assets/AssetLibrary. Também estão configurados banner, rótulos da aventura, vitória/derrota, jogador e nível de lenda.

Nos metadados, essa classe declara AdventureManager, MethodQueue e métodos OnRunComplete, OnRunEndAsync, LoadRunEndOverlays, InstantiateRewardsOverlay, ShowRewardsOverlay, ShowRunSummary e ProcessMethodQueue, entre outros. Em conjunto com os vínculos de prefab, isso identifica o coordenador da apresentação. Os nomes não provam a ordem das chamadas nem o momento de concessão dos recursos.

## Quem apresenta os dados de recompensa

**CMPRunRewardsOverlay**, PathID `467968965494115368`, foi localizado no pacote `fc/bbddbcfd1ac916f42b21fc77365ea0.bbq`. O componente contém RewardCardLayout, prefabs de experiência normal/extra do campeão, prefab de experiência de lenda e **13 entradas RewardAssets**, cada uma associando um LootType numérico a RewardCardPrefab.

Os códigos serializados são 47, 51, 44, 12, 48, 61, 64, 65, 66, 67, 54, 70 e 55. Não foram traduzidos para nomes de enum sem conferir seus valores. Há referências externas a outros pacotes; nem todas foram resolvidas nesta seleção. Essa tabela estabelece a configuração da seleção visual, não taxas ou quantidades de recompensa.

Timing declara RewardsEntryDelayInMilliseconds=0, RewardsStaggerInMilliseconds=300 e NestedLootDelayInMilliseconds=500000. São valores instalados: não afirmar espera visível de 500 segundos sem verificar a condição de uso e o executor. A classe declara Init, StartRewardsRevealSequence e FinilizeRewardsSequence (grafia presente nos metadados), além de InventoryServiceManager e acompanhamento de progresso de curvas de nível.

## Origem dos dados: o que foi localizado e o que falta

AdventureManager declara CurrentRun e RunCompletedEvent, além de EndCurrentRun, RetireRun e HandleRunLoss. AdventureRunRewardsDto declara:

- ProcessedLootList;
- CardMasteryChangeList;
- CardMetaProgressionChangeList;
- QuestRelicRewards.

**Hipótese estrutural apoiada pelos nomes e dependências:** o estado/evento de término em AdventureManager alimenta o coordenador, que prepara as telas; o DTO representa recompensas e mudanças de progressão usadas nesse processo. Ainda não foi provado que esse DTO é o argumento de uma chamada específica de Init, nem qual serviço/populador o constrói. Não apresentar essa hipótese como call graph recuperado.

CMPRewardCard declara Init, e a base dos renderers declara InitializeRewardVisuals. Isso é compatível com a composição de apresentação confirmada nos prefabs do lote anterior, mas não comprova o encadeamento de chamadas.

## Cobertura e reprodução

Script `tools/analise/localizar_controlador_lor.py`; saída `LOR_CONTROLADOR_FIM_AVENTURA.json`. Contém hashes dos quatro pacotes carregados, os dois componentes localizados e o catálogo dirigido de classes, campos e métodos obtidos na evidência REA anterior.

Os MonoBehaviours dos pacotes selecionados foram inspecionados sem erros de leitura/resolução de script. A seleção buscou CMPRunEndOverlayLoader, CMPRunRewardsOverlay e CMPRunSummaryOverlay; somente as duas primeiras classes foram encontradas como componentes. A referência ao prefab de resumo está confirmada, mas não foi confirmada nesta seleção uma instância da classe CMPRunSummaryOverlay. Existem declarações de outras classes de resumo nos metadados; não foram equiparadas automaticamente.

Próximo: identificar o componente real do prefab de resumo e recuperar assinaturas/fluxo entre CurrentRun, RunCompletedEvent, AdventureRunRewardsDto e Init. A inspeção local permanece separada do desenho de C.A.P.S.
