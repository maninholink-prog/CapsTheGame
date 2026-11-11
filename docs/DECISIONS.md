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


## Maestria de Rubel — 04/11/2026

Aprovados os quinze talentos, as conexões e a arte de Rubel. Santuário do Grupo fecha Proteção no nível 30. O autor solicitou integração e upload. [Especificação](../design/RUBEL_CURA.md).

## PERFIL-01 — Elegibilidade para o Top 3 — 04/11/2026

Aprovada pelo autor nesta conversa. O histórico distingue Aventura e Treino. O Top 3 conta partidas concluídas em modos que concedem maestria, com desempate por vitórias e XP de maestria. Aventura conta por partida, com XP ao fim da jornada. Treino atual entra somente no histórico. O futuro PvP será elegível se conceder maestria. Implementado para os modos atuais em [matches.ts](../src/profile/matches.ts).

## INICIO-01 — Cenários e ícone Windows — 04/11/2026

O autor aprovou nesta conversa a alternância entre o cenário do dragão de jade e o cânion em brasa. A alternância foi implementada por abertura, com a escolha persistida separadamente do save. Para o executável, o autor escolheu o ícone A, com o dragão de jade e a carta dourada.

## REGIOES-01 — Símbolos das cartas — 05/11/2026

Status: aprovado. Fonte: autor nesta conversa, “Aprovados os icones”, após apresentação da prancha com cinco conceitos. Norte: montanha e vento; Oeste: dragão e bigorna; Sul: árvore de raízes entrelaçadas; Leste: torre de três pontas; Korakarom: dragão azul curvado com chamas ciano, baseado na imagem fornecida pelo autor. Aprovação visual para o jogo; não estabelece brasões históricos do RPG nem altera regiões mecânicas. Prancha original preservada em [approved-symbols.png](../public/art/regions/approved-symbols.png). Versões monocromáticas da própria prancha usadas nos indicadores pequenos, conservando os desenhos aprovados.

## HEROIS-VISUAL-01 — Retratos e escolha por imagens — 05/11/2026

Status: solicitado pelo autor, implementação pendente. Fonte: mensagem “ja fica o registro”, acompanhada de captura de Preparar aventura. O autor quer retratos dos heróis junto aos seus nomes nos painéis dessa tela e que a escolha de protagonistas use imagens, em vez de lista textual. Preservar nomes para identificação, bloqueios/desbloqueios e comportamento existente; reaproveitar imagens aprovadas disponíveis, sem inventar aparência para personagens sem arte aprovada. A captura documenta a preparação da aventura; outros seletores devem ser identificados antes da aplicação, sem presumir redesenho das demais escolhas (dificuldade/relíquia). Este registro não implementa nem valida a alteração e não retoma a revisão geral da interface.

## FELIX-ENCONTROS-01 — Ampliação dos encontros comuns — 09/11/2026

O autor aprovou nesta conversa (“Pode”) Oficina de Bobinas, Enfermaria Experimental e Câmara de Descarga para variar as batalhas comuns do Dr. Félix. A seleção das novas jornadas passa de três para seis encontros comuns, com 20 cartas por deck e até duas cópias por identidade. As listas usam cartas existentes e os nomes são rótulos de jogo. As jornadas salvas preservam seus encontros. O catálogo aprovado de [inimigos e chefes](../design/INIMIGOS_E_CHEFES.md) é a referência para cartas de futuras aventuras do jogo. Seus efeitos e atributos ainda exigem definição.

## BALANCEAMENTO-01 — Revisão final das cartas — 09/11/2026

O autor decidiu nesta conversa deixar o balanceamento das cartas para a etapa final do desenvolvimento do jogo.

## CAVEIRA-DOURADA-01 — Rota secreta e lotes de cartas — 09/11/2026

O autor escolheu a Caveira Dourada como próxima aventura do jogo, com o Capitão Osso Roído como batalha secreta. A prova oferece uma pista opcional. O autor pediu manter os dois lotes de cartas, acrescentar Tubarão e Megalodonte e estender a maldição até o próximo turno. Efeitos e atribuições propostos para as criaturas estão em [Aventura da Caveira Dourada](../design/AVENTURA_CAVEIRA_DOURADA.md).

## Classificação atual da versão — 11/11/2026

Na consulta do autor sobre Alpha ou Beta, a classificação exibida para o estágio atual é **Alpha · v0.1.0**. Base observável: `package.json` e `desktop/package.json` usam `0.1.0`; o leia-me do executável chama o produto de protótipo; ainda há conteúdo em desenvolvimento e a revisão de balanceamento foi deixada para a etapa final ([BALANCEAMENTO-01](#balanceamento-01--revisão-final-das-cartas--09112026)). A versão semântica continua `0.1.0`; o sufixo Alpha indica estágio de desenvolvimento, não altera os metadados do pacote. É uma classificação do estágio atual, sujeita a revisão quando o autor decidir mudar de fase.

## DEC-011 — Faixa global removida e fonte de exibição original — 11/11/2026

Aprovada pelo autor nesta conversa: remover de todas as telas a faixa superior global que mostrava C.A.P.S., Pedras Filosofais e estado do perfil, sem criar outra faixa substituta; a tela inicial mantém seus controles próprios já aprovados. A tipografia de identidade será uma fonte de exibição original para títulos, nomes e chamadas; Segoe UI permanece no corpo e nos textos longos. A direção solicitada é épica, serifada, de fantasia, inspirada em Legends of Runeterra, Dungeons & Dragons e O Senhor dos Anéis, sem copiar letras ou artes dessas referências. A fonte cobre letras básicas, acentos portugueses, cedilha, números e pontuação usada na interface. Os símbolos regionais aprovados continuam preservados. Implementação local e verificações desta etapa em [PROGRESS](PROGRESS.md#faixa-tipografia-e-perfil--11112026); fonte editável em [build_caps_display.py](../tools/fonts/build_caps_display.py), saída em [caps-display.ttf](../public/fonts/caps-display.ttf) e proposta aprovada em [especificação](superpowers/specs/2026-11-11-identidade-tipografica-e-perfil-design.md).

## DEC-012 — Fundo contínuo, símbolos de navegação e Korakoin — 11/11/2026

O autor pediu preencher o fundo da aplicação em todos os tamanhos com uma nova imagem temática, sem áreas lisas vazias; criar ícones de identidade para a navegação principal e as seções do Perfil; retirar a faixa informativa superior da batalha, usando a engrenagem como menu e mantendo os indicadores laterais; e criar uma moeda de Korakoins com o símbolo aprovado de Korakarom ao centro. A composição visual deve seguir a identidade original jade/cobre. A moeda reutiliza o recorte do símbolo aprovado em [approved-symbols.png](../public/art/regions/approved-symbols.png); nenhuma região ou regra monetária foi alterada. Ver implementação e verificação em [PROGRESS](PROGRESS.md#fundo-ícones-e-moeda-korakoin--11112026).

## DEC-013 — Retorno tipográfico e moeda ilustrada — 11/11/2026

Correção solicitada pelo autor após a implementação de DEC-011: a fonte C.A.P.S. Display não agradou e deve ser removida. A interface retorna à tipografia anterior, Georgia nos títulos e Segoe UI no corpo; esta instrução substitui a decisão anterior sobre criar/aplicar fonte original. Para Korakoins, o autor pediu uma imagem no estilo da Pedra Filosofal. A moeda passa a usar arte ilustrada jade/cobre em `public/art/korakoin.png`, com o símbolo aprovado de Korakarom sobreposto ao centro, sem mudar a moeda ou suas regras.

## DEC-014 — Exclusão de saves temporários de QA — 11/11/2026

O autor autorizou excluir saves sem preocupação para concluir as conferências Windows. Escopo operacional deste registro: saves gerados pela instância portátil temporária e isolada de QA desta tarefa. Não inclui o perfil da instalação normal, saves do autor fora do QA, backups ou outros dados. O perfil temporário foi configurado sob `%TEMP%\CAPS-QA-profile-20261111`; a autorização não é uma política geral de retenção.

## DEC-015 — Autorização para excluir aventuras em andamento — 11/11/2026

O autor autorizou, de forma persistente, excluir aventuras que estejam em andamento quando isso for necessário para QA/playtest. Esta autorização cobre o estado salvo dessas aventuras; não autoriza excluir perfis inteiros, coleção/progresso não relacionado, backups ou outros arquivos. Não exige exclusão imediata. Fonte: mensagem explícita do autor nesta conversa (“é permitido excluir as aventuras em andamento”).

## Aventura de Júpiter — estrutura aprovada, 11/11/2026

O autor escolheu Júpiter como próxima aventura inicial de destaque por suas reviravoltas e personagens. A adaptação deve acompanhar a busca e a descoberta de sua morte antes do chefe. Após vencer o kraken filhote, o jogador escolhe “Buscar depois” (desfecho da campanha) ou “Levá-lo agora” (travessia arriscada para retirar o corpo). Se conseguir, haverá funeral digno, discurso do irmão Saturno e ícone exclusivo. Júpiter não é ressuscitado; o desfecho alternativo pertence ao jogo, não ao RPG original. A causa da morte não é atribuída ao kraken. Eventos e encontros propostos conforme [design da aventura](../design/AVENTURA_JUPITER.md); decks, números, travessia e arte do ícone ainda precisam de definição.

O autor aprovou incluir na aventura encontros com criaturas aquáticas na travessia, ratos e escaravelhos da plantação, além do kraken filhote. Ratos e escaravelhos são adaptações a partir de inimigos catalogados de outras sessões, não adversários confirmados na história de Júpiter. Para a Comum, cumprir cinco batalhas por run. As cartas devem ter mecânicas reutilizáveis em outros decks, seguindo o precedente dos piratas. Decks e efeitos ainda serão propostos; balanceamento final permanece adiado.

## Ordem para criação de decks — aprovada em 11/11/2026

O autor determinou a ordem: (1) considerar a interação das cartas com as mecânicas aprovadas dos protagonistas, adicionando efeito de sinergia quando fizer sentido ou mantendo coexistência; (2) definir custo, ataque, vida e valores de efeito, identificando-os como provisórios se o balanceamento final estiver adiado; (3) atribuir uma região única a cada carta não protagonista. Regra em [MECANICAS_COMPARTILHADAS](../design/MECANICAS_COMPARTILHADAS.md), aplicada à proposta de [AVENTURA_JUPITER](../design/AVENTURA_JUPITER.md).

## DEC-016 — Ajuste inicial de balanceamento dos decks de Júpiter — 11/11/2026

Fonte: pedido explícito do autor nesta conversa para realizar o balanceamento. Ajuste inicial, não declaração de balanceamento definitivo: Ninhada de Ratos e Enxame de Escaravelhos passam de custo 4 para 3, para viabilizar o plano de enxame dos encontros comuns mais cedo. A leitura exploratória contra oito protagonistas mostrou resultados muito dependentes do matchup; por isso não foi aplicada alteração geral de vida ou atributos. A conferência também revelou que Rato Saqueador tinha o efeito descrito no texto sem integração: foi conectado ao retorno opcional de uma unidade aliada ferida por efeito respondível. Identidades, IDs existentes, composição, regiões, artes e demais efeitos foram preservados. Valores ficam sujeitos a novos playtests manuais. Ver [design](../design/AVENTURA_JUPITER.md) e [registro de progresso](PROGRESS.md).
