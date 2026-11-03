# LoR — fim de aventura observado no log

31/10/2026. O usuário concluiu uma run nesta sessão. Observação passiva do log local, sem Frida, sem emissão de requisições e sem alteração do jogo.

## Identidade e cobertura

Snapshot anterior: `runtime/log_20261031T184028Z.json`, 1.789 linhas. Snapshot posterior: `runtime/log_20261031T185441Z.json`, 14.264 linhas. O prefixo de bytes do snapshot posterior foi comparado ao SHA-256 anterior e é idêntico; trata-se de continuação do mesmo log. O processo LoR PID 17940 continuava respondendo na consulta posterior.

Trechos relevantes, com IDs de partida e host omitidos: `runtime/FIM_RUN_20261031_EVIDENCIA.json`. O arquivo não é captura completa de chamadas e não contém corpos de respostas de rede. Linhas abaixo referem-se ao log original identificado pelos snapshots.

## Sequência temporal efetivamente registrada

Horários convertidos de UTC para America/Sao_Paulo (UTC−3):

| Horário local | Evidência |
|---|---|
| 15:54:05,310 | EoGRewardsModel começa a percorrer ProcessedLootList (linha 13917). |
| 15:54:05,311 | Registra 200 de DefaultSource e percorre CardMasteryChangeList (13919, 13925). |
| 15:54:05,313 | EoGStateRecorder registra HandleGameEndRewardsEvent e recebimento de GameRewardsEndMessage (13932). |
| 15:54:24,095 | Cliente registra POST para `/adventure/v1/run/[ID]/node/14/complete` (14136). |
| 15:54:24,526 | Resposta HTTP 200 dessa operação (14145). |
| 15:54:24,692–24,726 | Respostas HTTP 200 de `/pve/v1/user` e `/progression/v1/user/pve/progression/[ID]` (14147–14148). |
| 15:54:34,750 | Mensagem de localização identifica instâncias CMPRunEndOverlayLoader → CMPRunRewardsOverlay → CMP_Reward_ChampExperience na hierarquia da interface (14161). |
| 15:54:36,585–37,114 | Cliente registra DELETE da run e resposta HTTP 200 (14195, 14203). |
| 15:54:37,120 | Solicitação de navegação para WorldMap (14205). |

O LootId registrado para as 200 unidades foi comparado internamente com o inventário: corresponde ao recurso Experience, offset 8247440, CapCurrencyId `bacon.currency.experience.base`. Não é prova de 200 de experiência de campeão. A sequência de EoG precede a conclusão do nó e deve permanecer distinguida do resumo da aventura. O log não prova uma relação direta entre essas 200 unidades e o cartão visual de experiência de campeão.

## Pilha de execução real recuperada

A mensagem TextFoundMislocalized trouxe uma pilha, linhas 14162–14191. Nela aparecem, do chamador mais externo para o ponto de registro, omitindo parte da infraestrutura:

`BaconTimeline.OnTimelineStopped` → `BaconPlayable.SetDone` → `SetHandleDone` → conclusão/continuações de Task → `<StartRewardsRevealSequence>d__32.MoveNext` → `UnityEngine.Object.Instantiate` → `BaconBehaviour.Awake`/configuração de dependências → atualização de localização → registro de erro de tradução.

Os metadados identificam o tipo de máquina de estados de índice 300, `<StartRewardsRevealSequence>d__32`, como aninhado em CMPRunRewardsOverlay (índice 301). Ele declara campos rewardsDto, dataLoader, onContinueClicked e progressDeltaDto. Assim, a pilha confirma execução da sequência de revelação dessa tela e instanciação de objeto durante ela. A hierarquia citada no mesmo erro identifica o ramo de experiência de campeão.

Isso é mais forte que apenas encontrar nomes nos metadados, mas é uma pilha pontual durante uma continuação assíncrona, não uma gravação completa de todo o encerramento. Não se pode inserir OnRunComplete, Init ou CreateFromDto como chamadas observadas se não aparecem nessa pilha.

## O que está comprovado e o que continua aberto

**Comprovado por esta observação:** comunicação de conclusão do nó com resposta de sucesso; atualização de progressão; presença real da hierarquia de recompensas; execução de StartRewardsRevealSequence e instanciação durante a apresentação; posterior solicitação de remoção da run e retorno ao mapa.

**Ainda não comprovado:** quem atribui `AdventureRun.RewardsDto`, quem preenche cada campo do DTO, qual payload contém as recompensas de aventura, chamada exata de Init e momento autoritativo da concessão. O sucesso HTTP não revela o corpo da resposta. A cronologia sugere participação do serviço no fechamento, mas não prova atribuições internas do cliente nem o processamento do servidor.

O erro de localização é evidência diagnóstica incidental. Ele não prova falha na concessão de recompensas, nem justifica alterar o cliente.

## Reprodução

`tools/analise/registrar_fim_run_lor.py` valida os hashes dos snapshots e exporta 42 linhas selecionadas com remoção de identificadores. Caso o log seja rotacionado ou removido, a evidência sanitizada já está preservada; o script não refaz a run.

Próxima decisão de pesquisa: o fluxo de apresentação já tem confirmação parcial em execução. Para provar o populador do DTO será necessária outra fonte que mostre atribuição/corpo de resposta, ou análise nativa validada; repetir runs sem novos marcadores não garante progresso.
