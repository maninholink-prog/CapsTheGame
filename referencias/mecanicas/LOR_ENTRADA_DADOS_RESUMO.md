# LoR — entrada de dados e componente real do resumo

31/10/2026. Continuação da inspeção estática de fim de aventura.

## Componente real confirmado

O prefab `Assets/AssetLibrary/UI/CardMetaProgression/EndOfRun/CMPRunSummaryOverlay.prefab` tem GameObject raiz chamado CMPRunSummaryOverlay, mas o MonoScript anexado é **CMPEndOfRunSummaryOverlay**, PathID `2075471722224558753`. Ele está no pacote `c8/159ec68f6a63c7f0691de93f77a2a8.bbq`.

Essa diferença explica a ausência da classe CMPRunSummaryOverlay na seleção anterior. As duas classes existem nos metadados; a instância verificada usa CMPEndOfRunSummaryOverlay. Não foi necessário presumir que o prefab estivesse ausente ou quebrado.

Campos configurados incluem retrato do campeão, carta destacada, botão de continuar, tempo atual, melhor tempo, indicador de novo recorde, saúde e classificação de conclusão. DynamicValueLabels contém cinco entradas com ValueType 4, 21, 18, 2 e 1; seus significados não foram deduzidos da ordem numérica.

## Parâmetros recuperados

Os nomes e vínculos de parâmetros estavam na exportação REA, embora tipos de parâmetros, tipos de campos e retornos estejam vazios. Assim, abaixo são nomes de parâmetros, **não assinaturas C# completas**.

| Método | Parâmetros na ordem exportada |
|---|---|
| AdventureRun.CreateFromDto | dto, dataLoader, rgdsDatabase |
| CMPRunRewardsOverlay.Init | localizationManager, dataLoader, playerName, adventureConfig, run, onContinueClicked |
| CMPRewardCard.Init | grantable, count, progressDelta, skipPlayable |
| CMPRewardRendererBase.InitializeRewardVisuals | lootObject, count, progressionDelta |
| CMPEndOfRunSummaryOverlay.Init | onFinished |
| CMPRunEndOverlayLoader.OnRunComplete | nenhum parâmetro declarado |
| CMPRunEndOverlayLoader.OnRunEndAsync | nenhum parâmetro declarado |

Isso confirma que a tela de recompensas possui uma entrada explícita chamada run e que a apresentação individual recebe quantidade e mudança de progressão. O Init do resumo estatístico, por sua vez, não recebe parâmetro run nessa declaração; seus metadados declaram dependências AdventureManager e AdventureServiceManager, além de RefreshUI e OnRunInitialized. Não foi observado como ou quando essas dependências são consultadas.

## Estrutura do estado da partida

AdventureRun declara RewardsDto, FinalScores, DynamicValues, CardCodeToState, Playable e DisplayableAdventureConfig. AdventureRunDto declara Rewards e FinalScores, entre outros campos. AdventureRunRewardsDto declara ProcessedLootList, CardMasteryChangeList, CardMetaProgressionChangeList e QuestRelicRewards.

Esses nomes e CreateFromDto indicam uma estrutura de conversão e transporte de dados de partida. Não provam a atribuição `RewardsDto = dto.Rewards`, o tipo exato dos campos, nem que o serviço ou servidor efetua uma concessão nesse momento.

## Fluxo sustentado e lacuna restante

- Confirmado no prefab: o loader referencia as telas de recompensa e resumo.
- Confirmado nas declarações: o Init de recompensas recebe run; os componentes de recompensa recebem count e delta de progressão.
- Confirmado no prefab: a tela de resumo usa CMPEndOfRunSummaryOverlay e tem campos de estatísticas próprios.
- Hipótese ainda sem corpo de método: o loader obtém CurrentRun do AdventureManager e o passa ao Init da tela de recompensas.
- Não confirmado: quem popula o DTO, qual resposta de serviço o contém, ordem das chamadas e momento efetivo da concessão.

## Evidência e reprodução

`tools/analise/localizar_controlador_lor.py` agora inclui CMPEndOfRunSummaryOverlay, AdventureRun, AdventureRunDto e os parâmetros associados aos métodos selecionados. Saída atualizada: `LOR_CONTROLADOR_FIM_AVENTURA.json`. Foram localizados três componentes-alvo, sem erros de leitura de MonoBehaviour na seleção. Hashes de pacotes e identidades de scripts estão preservados.

Próximo ponto útil: localizar as declarações de resposta/conclusão do serviço e seus campos, ou recuperar chamadas nativas com correspondência validada. Uma nova leitura dos mesmos nomes não bastará para provar o fluxo. Nenhuma regra ou interface de C.A.P.S. foi implementada.

## Tentativa de comprovação — 31/10/2026

Foi solicitada explicitamente ao REA a associação do global-metadata.dat a `C:/Riot Games/LoR/live/Game/GameAssembly.dll`. A operação recusou a associação: `invalid-method-pointer: method 6 points outside unambiguous executable file data at 0x1802ef840`. Observação parcial retida: `ev_0bc269d37014cf44f9c48c9ed7f14731877cc2ba0f0794113896c2c019ee75a6`.

Esse resultado reproduz o limite registrado na continuidade anterior. Não significa que o método 6 seja um controlador de recompensas, que todos os métodos estejam corrompidos ou que o fluxo proposto tenha sido refutado. Significa que não temos correspondência validada entre os nomes e os endereços nativos para seguir essas chamadas com este método. Não foram modificados flags PE, ponteiros ou bytes para forçar aceitação.

A consulta `Get-Process -Name LoR` não encontrou processo do jogo nessa execução. Portanto, também não havia uma sessão de jogo disponível para observar o término da aventura. A ausência nessa consulta é pontual, não uma afirmação sobre sessões anteriores.

Uma conferência adicional encontrou a declaração da máquina de estados `<MarkNodeComplete>d__43`, com campos `run` e `nodeId`, e `WeeklyAdventureRunCompletedResultDto`, com RunScore e WeeklyAdventureScoreDto. Nada disso prova que esses métodos preencham Rewards ou disparem a apresentação; não foi acrescentado nenhum elo confirmado ao fluxo por inferência.

**Resultado:** autoria do preenchimento e sequência real de chamadas permanecem não comprovadas. Próxima condição necessária para a via dinâmica: uma sessão local de LoR em execução, com transição de fim de aventura reproduzível. Ainda será necessário verificar se a ferramenta de observação consegue resolver/instrumentar os métodos; apenas ver a tela final não comprova atribuições internas. Não afirmar antecipadamente que abrir o jogo eliminará o limite técnico.

## Tentativa com jogo aberto — 31/10/2026

O usuário abriu o LoR para continuar a investigação. Confirmado processo PID 22244, caminho `C:/Riot Games/LoR/live/Game/LoR.exe`. A consulta de módulos encontrou GameAssembly.dll, UnityPlayer.dll e stub.dll carregados. Isso estabelece presença em memória, não correspondência de métodos.

O REA listou o dispositivo Frida `local`. Foi tentado `start_frida_session` com `mode=attach`, `device_id=local`, `pid=22244`. A ferramenta retornou capability_unavailable, não repetível: `Process with pid 22244 either refused to load frida-agent, or terminated during injection`.

A consulta subsequente `Get-Process -Name LoR` não encontrou processo. O encerramento ocorreu temporalmente após a tentativa, mas o resultado não distingue rejeição de carga, falha de injeção ou outra causa. Não foi afirmada a existência de um mecanismo específico de proteção. Nenhum identificador de sessão foi devolvido e nenhum script de rastreamento foi carregado por nós; não houve captura de chamadas nem sessão estabelecida que pudesse ser fechada por ID.

A tentativa não foi repetida. Não alterar proteções nem insistir na injeção como próximo passo. Para avançar sem esse método, priorizar inspeção estática de código com associação validada e logs existentes que não exponham credenciais. Logs de eventos ou imagens da interface, isoladamente, não comprovam atribuições de campos internas. A sequência real e o populador do DTO continuam não demonstrados.
