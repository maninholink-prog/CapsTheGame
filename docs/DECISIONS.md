# Decisões — índice rastreável

Registro iniciado em 2026-11-03. As datas abaixo são as das fontes quando disponíveis; não representam nova aprovação. Detalhes completos permanecem nas fontes. Não apague decisões superadas: acrescente referência à substituta.

| ID | Data / origem | Decisão e status | Justificativa / impacto | Fonte |
|---|---|---|---|---|
| DEC-001 | 2026-11-03, pedido do usuário nesta integração | Game é a raiz real; integração restrita a memória, documentação e skills. Confirmada. | Preservar informações sem alterar lógica, interface ou mecânicas. | Pedido desta sessão; [auditoria](AUDIT.md) |
| DEC-002 | Data original não determinada; registrada em CAMPANHA | Todo booster contém cinco cartas; campeão ocupa uma dessas posições. Confirmada na fonte. | Boosters melhores mudam qualidade/probabilidades, não quantidade; afeta coleção e abertura. | [CAMPANHA](../CAMPANHA.md), seção “Decisões confirmadas pelo autor”; implementação em [boosters.ts](../src/profile/boosters.ts) |
| DEC-003 | 2026-11-01, especificação do mapa | Mapa Comum tem dez casas no total; caminhos visitam parte do mapa. Confirmada na fonte. | Bifurcações e reencontros; não confundir total do mapa com casas obrigatórias de uma rota. | [MAPA_COMUM](../design/MAPA_COMUM.md) |
| DEC-004 | 2026-10-30, estado final de leitura | Leitura de episódios encerrada/pausada a pedido do autor; sem nova automação. Confirmada na fonte. | Voltar ao desenvolvimento do jogo, mantendo lacunas e registros históricos. | [LEITURA](../referencias/youtube/LEITURA.md), primeira seção |
| DEC-005 | 2026-11-03, registro do próximo lote | Próximo lote de relíquias pausado; seleção sugerida não equivale a aprovação de nomes/artes/implementação. Confirmada na fonte. | Autor sem acesso ao Drive; priorizar árvores e maestrias na retomada de desenvolvimento, sem iniciá-las nesta integração. | [Lote pendente](reliquias-proximo-lote-pendente.md) |

Pendente: completar este índice sob demanda a partir das fontes, sem copiar o catálogo inteiro. Autorização de remoto/branch para push e aprovação operacional dos backups ainda não existem nesta integração. Nenhuma proposta de infraestrutura abaixo é uma decisão aprovada por silêncio.

## Complemento de decisões — 03/11/2026

As entradas abaixo são acréscimos; preservam DEC-001 a DEC-005 e não reclassificam sugestões como aprovações.

| ID | Data / origem | Decisão e status | Justificativa / impacto | Fonte |
|---|---|---|---|---|
| DEC-006 | 03/11/2026, pedido explícito do autor nesta conversa | Escopo atual exclusivamente infraestrutura e memória em Game; sem código, artes, commits, pushes ou backups | Suspende execução das pendências de produto neste ciclo, sem apagar decisões anteriores | Mensagem iniciada por “Esta conversa é exclusivamente para configurar a infraestrutura e memória persistente”; complemento de [HANDOFF](HANDOFF.md) |
| DEC-007 | 03/11/2026, autor: “Gostei de Vinculo” | Nome de apresentação Vínculo aprovado no lugar de Nexus; decisão já registrada na fonte | Manter identificadores internos e compatibilidade de saves | [CAMPANHA](../CAMPANHA.md), “Nome do objetivo de vida — aprovado em 03/11/2026”; não houve nova implementação nesta auditoria |
| DEC-008 | 03/11/2026, autor: “Gosto da proposta, aprovada” | Cinderela aprovada conforme proposta apresentada; execução suspensa por DEC-006 | Equipamento de Abe com fortalecimento pós-evolução; requisito de evolução por seis Upgrades preservado | Aprovação nesta conversa; resumo de estado em [PROGRESS](PROGRESS.md), sem criar nova especificação paralela |
| DEC-009 | 03/11/2026, autor: “Por enquanto mantemos” | Maestria de Abe mantida provisoriamente; revisão futura com novos Upgrades | Não promover os quinze talentos a cânone ou alegar implementação | [Proposta provisória existente](../design/ABE_MAESTRIA_PROVISORIA.md) |

## Retomada de Abe — 03/11/2026

O autor pediu continuar o desenvolvimento de Abe em Game, sem voltar a infraestrutura ou Git, e aprovou com “Sim” as conexões propostas. DEC-006 descreve o ciclo anterior e não impede esta retomada explícita. A proibição de commit/push/backup permanece preservada. DEC-010: conexões aprovadas em [ABE_MAESTRIA_PROVISORIA](../design/ABE_MAESTRIA_PROVISORIA.md#conexões-aprovadas--03112026); os quinze efeitos continuam provisórios. Plano técnico em [2026-11-03-abe-maestria](superpowers/plans/2026-11-03-abe-maestria.md), preparado, ainda não executado. Cinderela conserva a aprovação de DEC-008.


## Aplicação de DEC-008 e DEC-010 — 04/11/2026

Cinderela e conexões de maestria aplicadas. Os efeitos mantêm o status provisório de DEC-009. A [proposta de Abe](../design/ABE_MAESTRIA_PROVISORIA.md) registra o comportamento na evolução fora do campo e na fabricação dupla. Nenhuma decisão narrativa nova.


## Telas de batalha — 04/11/2026

O autor solicitou consulta de maestria por personagem e telas de início, vitória e derrota. Confirmou no chat que as telas se aplicam à aventura e ao duelo de treino. A implementação também apresenta o empate já previsto pelo jogo.

## Maestria de Arcata — 04/11/2026

O autor aprovou os quinze talentos e escolheu Combustão como ramo principal. Chama Persistente exige nível 30. [Registro da árvore](../design/ARCATA_FOGO.md).
