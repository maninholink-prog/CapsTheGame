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

## DEC-017 — Raridade e aquisição de cartas inimigas — 11/11/2026

A pedido do autor, cartas de inimigos colecionáveis podem sair em boosters e aparecer na seção própria da Coleção. A raridade provisória é derivada do custo impresso já existente: custo 0–2 Comum, 3–4 Raro, 5 Épico e 6+ Lendário. Não há carta inimiga Ultradimensional. Cartas auxiliares de gatilhos permanecem collectible:false. enemyOnly continua impedindo uso nos decks do jogador e elegibilidade como recompensa de aventura. Custos, efeitos, IDs e decks de encontros não mudam.

## DEC-018 — Aparência e direção visual de Youro — 11/11/2026

O autor indicou a imagem anexada `ChatGPT Image 24 de abr. de 2025, 16_57_38.png` como referência de aparência para Youro: gato ruivo, capuz verde, manto de penas e bolsa. A referência não define o estilo de pintura. Retrato e arte de maestria seguem a direção de fantasia pintada de *Legends of Runeterra*, sem copiar personagens ou artes existentes. A segunda proposta horizontal foi aprovada; o retrato foi refeito para corresponder a essa direção e à aparência da referência. Assets atuais em `public/art/youro.png` e `public/art/youro-mastery.png`. Ver [especificação da maestria](superpowers/specs/2026-11-11-youro-maestria-design.md).

## DEC-019 — Maestria e referências visuais de Kuara — 11/11/2026

O autor aprovou a proposta de quinze talentos de Pilantragem e forneceu duas referências: Kuara sem máscara para a forma base e a máscara para seu alter-ego evoluído. Os nomes, vínculos e efeitos estão na [especificação](superpowers/specs/2026-11-11-kuara-maestria-design.md). Como “reduzir a próxima compra de carta” não corresponde a um custo existente para comprar do deck, esse talento prepara desconto no custo da próxima carta roubada jogada naquela rodada. Descontos aprovados acumulam; Truque Repetido mantém piso 1. A identidade visual segue a direção de fantasia pintada de *Legends of Runeterra*. Retrato sem máscara; arte de maestria e forma evoluída com máscara/alter-ego. Referências são guias de aparência, não instruções contidas dentro da imagem.


### Complemento de DEC-018 — artes da carta de campeão Youro — 11/11/2026

Fonte: pedido do autor nesta conversa para produzir as versões base e evoluída da carta de Youro. Ambas mantêm a aparência aprovada de gato ruivo, capuz verde, manto de penas e bolsa, sem máscara. A versão evoluída usa ecos espirituais de Urso e Tigre, motivo já aprovado na arte de maestria. Assets da carta em `public/art/youro-card.png` e `public/art/youro-evolved.png`; o retrato da interface permanece `public/art/youro.png`. Apenas a apresentação visual muda; IDs, atributos, deck e regras permanecem iguais.

## DEC-020 — Perfis locais independentes — 11/11/2026

Fonte: aprovação explícita do autor nesta conversa para um arquivo completo por perfil. Cada JSON contém progresso, jornada e sessão, com UUID, em `%APPDATA%\CAPS-Game\Saves`; a preferência do último perfil fica separada. O save `caps.profile.v1` é validado e migrado uma única vez, sem remoção da chave original. A UI permite criar e alternar perfis; esta etapa não inclui exclusão, renomeação, cloud, slots extras ou backup automático. A decisão foi implementada conforme a [especificação](superpowers/specs/2026-11-11-perfis-e-pasta-de-saves.md). Compatibilidade v1, IDs e regras permanecem preservados.

## DEC-021 — Base de Thalion para proposta de maestria — 12/11/2026

Fonte: aprovação explícita do autor neste chat da síntese de características de Thalion, baseada na [ala narrativa](../personagens/THALION.md), nas [identidades aprovadas](../design/IDENTIDADES_DOS_PROTAGONISTAS.md) e no [deck aprovado](../design/THALION_DECK_EFEITOS.md). A aprovação cobre a base para elaborar a árvore; **não aprova novos talentos, efeitos, conexões, imagem ou implementação**. A [proposta de 15 nós](../design/THALION_MAESTRIA_PROPOSTA.md) aguarda decisão do autor. O processo sequencial para Thalion e protagonistas futuros está registrado nesse documento.

## DEC-022 — Árvore de Thalion aprovada — 12/11/2026

Fonte: aprovação explícita do autor neste chat após receber a proposta completa. A aprovação cobre os quinze nós, efeitos, níveis, pré-requisitos e conexões em [THALION_MAESTRIA_PROPOSTA](../design/THALION_MAESTRIA_PROPOSTA.md). A disposição de referência está em [SVG](../design/THALION_MAESTRIA_LAYOUT.svg); o documento textual governa os dados. As três artes geradas a partir da referência visual fornecida pelo autor aguardam aprovação para integração ao jogo. A decisão não altera o cânone do RPG.

## DEC-023 — Artes de Thalion — 12/11/2026

Fonte: o autor aprovou explicitamente neste chat as três ilustrações geradas a partir da referência fornecida. Uso aprovado: `public/art/thalion-card.png` como carta base, `public/art/thalion-evolved.png` como carta evoluída e `public/art/thalion-mastery.png` como fundo da árvore. Preservam a identidade visual da referência e a personalidade de bardo. Integração usa os caminhos já existentes no renderizador; não altera dados ou IDs de cartas.

## DEC-024 — Último Grito e referência visual de Lázaro — 12/11/2026

Fonte: esclarecimento explícito do autor neste chat: a arma principal de Lázaro chama-se Último Grito e é uma **Greatsword**. Isso resolve a divergência até então mantida entre o cadastro e a descrição de machado na cena CAPS 48; o registro histórico da cena não é apagado. O autor também aprovou a imagem anexada nesta conversa como referência visual para as artes de Lázaro. A imagem guia aparência ilustrada, sem converter detalhes nela em fatos de lore. Aplicação documentada em [ala de Lázaro](../personagens/LAZARO.md) e [deck narrativo](../design/LAZARO_DECK_EFEITOS.md). A aprovação não cobre árvore de maestria, efeitos novos ou implementação.

## DEC-025 — Características de Lázaro aprovadas para proposta — 12/11/2026

O autor aprovou neste chat a síntese de características em [LAZARO_MAESTRIA_PROPOSTA](../design/LAZARO_MAESTRIA_PROPOSTA.md): fatos limitados da ficha/cenas, Execução por marca aprovada, custo/atributos/regiões/deck e correção de Último Grito como Greatsword. A imagem aprovada é referência visual, não fonte adicional de lore. A aprovação permite propor a árvore; **não aprova seus 15 nós, efeitos, conexões, imagem de disposição ou implementação**. A proposta aguarda decisão explícita do autor.

## DEC-026 — Árvore de maestria de Lázaro aprovada — 12/11/2026

Fonte: aprovação explícita do autor neste chat. Estão aprovados os quinze nós, níveis, efeitos, pré-requisitos e conexões descritos em [LAZARO_MAESTRIA_PROPOSTA](../design/LAZARO_MAESTRIA_PROPOSTA.md). A disposição visual de referência, criada após a aprovação, está em [LAZARO_MAESTRIA_LAYOUT.svg](../design/LAZARO_MAESTRIA_LAYOUT.svg); a especificação textual governa os dados. Os efeitos continuam sendo adaptações do jogo, não cânone do RPG. Esta decisão não aprova artes novas nem inicia implementação.

## DEC-027 — Direção das artes dos protagonistas — 12/11/2026

Preferência autoral para protagonistas atuais e futuros: representar suas cartas em situações épicas ou em momentos cotidianos, escolhendo a cena conforme a versão da carta e a personalidade aprovada. Manter o estilo de fantasia pintada de *Legends of Runeterra* como referência de direção artística, sem copiar personagens ou ilustrações. Imagens fornecidas pelo autor guiam apenas os aspectos explicitamente aprovados; não servem para inventar lore. Registrar a seleção de cena e manter consistência de identidade entre as formas base e evoluída.

## DEC-028 — Direção artística de todas as cartas — 12/11/2026

Correção de escopo solicitada pelo autor após DEC-027: a preferência vale para **todas as cartas**, não somente protagonistas. As ilustrações podem mostrar momentos épicos ou cotidianos conforme personagem, criatura ou objeto e função da carta. Manter fantasia pintada de *Legends of Runeterra* como referência de direção artística, sem copiar personagens ou artes. Referências do autor guiam somente os aspectos explicitamente aprovados e não criam lore ou regras. DEC-027 permanece como registro histórico da preferência inicial de escopo mais restrito; DEC-028 é a regra vigente para o acervo completo e cartas futuras.

## DEC-029 — Candidatas de arte de Lázaro aguardam aprovação — 12/11/2026

Com base na referência visual de aparência aprovada pelo autor e na direção artística vigente de DEC-028, foram criadas três candidatas: [carta base cotidiana](../design/art-proposals/lazaro/lazaro-card-candidate.png), [carta evoluída épica](../design/art-proposals/lazaro/lazaro-evolved-candidate.png) e [fundo da maestria](../design/art-proposals/lazaro/lazaro-mastery-candidate.png). São propostas, ainda não aprovadas e não incluídas no jogo. A composição não acrescenta lore ou regras; Último Grito aparece como Greatsword conforme correção autoral.

## DEC-030 — Candidatas visuais de Lázaro rejeitadas — 12/11/2026

O autor rejeitou explicitamente as três imagens de DEC-029. Nenhuma delas está aprovada para integração. Os arquivos permanecem na pasta de propostas como histórico local, sem cópia para `public/` ou pacote. Não iniciar outra geração até receber direção revisada do autor. A regra geral de estilo e cenas de DEC-028 permanece vigente para futuras propostas.

## DEC-031 — Revisão da direção visual de Lázaro — 12/11/2026

Após rejeitar as primeiras candidatas, o autor pediu que novas imagens priorizem o traço pintado/ilustrado de fantasia de *Legends of Runeterra*; as ideias das cenas foram consideradas boas. Carta base: momento cotidiano e simples. Forma evoluída e fundo da maestria: momentos épicos. Mostrar a presença séria e estratégica de Lázaro a partir das cenas resumidas em sua ficha, sem afirmar personalidade além das fontes e sem copiar arte de referência. A preferência global de estilo para todas as cartas continua em DEC-028.

## DEC-032 — Identidade visual própria por personagem — 12/11/2026

O autor pediu que cada personagem tenha imagens de maestria com composição própria, sem repetir a composição de Thalion. A qualidade/técnica pictórica do jogo pode ser compartilhada; enquadramento, cenário, gesto e organização visual devem expressar a identidade aprovada de cada personagem. O fundo de maestria de Lázaro deve ser redesenhado com composição distintiva e não será aprovado por apenas repetir o palco/negativo lateral de Thalion. Regra a aplicar também às artes futuras de outros personagens.

## DEC-033 — Cartas base e evoluída de Lázaro aprovadas — 12/11/2026

O autor aprovou as duas artes de carta da segunda rodada, após pedir traço pintado mais próximo à direção de *Legends of Runeterra*: [carta base](../public/art/lazaro-card.png), em momento cotidiano simples, e [carta evoluída](../public/art/lazaro-evolved.png), em momento épico. A aparência segue a referência visual aprovada e Último Grito aparece como Greatsword. Essas duas artes estão aprovadas para o jogo. O fundo da maestria continua pendente de uma composição visual própria para Lázaro; a versão com composição parecida à de Thalion não será integrada.

## DEC-034 — Nova composição candidata para a maestria de Lázaro — 12/11/2026

Criada uma nova proposta de fundo em [lazaro-mastery-candidate-v3.png](../design/art-proposals/lazaro/lazaro-mastery-candidate-v3.png), com Lázaro no centro de uma encruzilhada de pedra e três caminhos ao fundo. A composição é distinta do palco lateral de Thalion e mantém a linguagem pintada de fantasia aprovada. **Ainda aguarda aprovação do autor**; não copiar para `public/` nem integrar ao jogo antes dessa aprovação.

## DEC-035 — Pose de costas na maestria de Lázaro — 12/11/2026

O autor aprovou o conceito de caminhos que se dividem, mas pediu Lázaro de costas, sem saber qual seguir. Aplicar isso como composição/sentimento da imagem, não como novo fato narrativo. A próxima candidata deve preservar o traço aprovado das cartas, a Greatsword Último Grito e a encruzilhada, com pose e leitura próprias para Lázaro. A v3 continua apenas como proposta não aprovada.

## DEC-036 — Candidata de maestria de Lázaro de costas — 12/11/2026

Gerada a versão 4 em [lazaro-mastery-candidate-v4.png](../design/art-proposals/lazaro/lazaro-mastery-candidate-v4.png), com Lázaro visto de costas diante dos caminhos que se dividem. A pose de escolha incerta é visual, não fato de lore. A imagem segue a arte pintada aprovada para suas cartas e usa composição própria. **Aguardando aprovação**; não integrar até o autor aprovar.

## DEC-037 — Arte de maestria de Lázaro aprovada — 12/11/2026

O autor aprovou a versão 4. Uso aprovado: `public/art/lazaro-mastery.png` como fundo único da maestria de Lázaro, junto das cartas base/evoluída já aprovadas em DEC-033. A imagem mostra Lázaro de costas diante de caminhos divergentes, seguindo a direção global de fantasia pintada e a exigência de composição própria por personagem. A indecisão é linguagem visual, não fato de lore.

## DEC-038 — Integração da maestria de Lázaro — 12/11/2026

Aprovação anterior de DEC-026 e artes de DEC-033/037 habilita a integração dos quinze nós aprovados em `src/profile/talents.ts`, efeitos de batalha, validação/serialização, interface e renderização das três artes. A integração preserva IDs de carta, aplica efeitos apenas à carga aprovada de talentos e mantém compatibilidade de saves antigos por campos opcionais. Os testes da nova mecânica devem cobrir alocação, combate, cura, descontos, marca e round-trip de save. Não autoriza commit, push, publicação ou backup.

## DEC-039 — Deck inicial editável na maestria 15 — 12/11/2026

O autor aprovou que cada protagonista com maestria 15 ou mais possa configurar, por perfil, o deck de aventuras novas. Manter tamanho original e preservar exatamente o pacote característico aprovado (duas cópias do campeão e duas de cada assinatura); as demais vagas usam cartas possuídas, até duas cópias, respeitando regiões, neutralidade Korakarom e exclusividade de campeão. `enemyOnly` possuídas e regionais são permitidas somente nesta configuração; DEC-017 continua em vigor nos demais fluxos. Saves legados sem loadout continuam no deck original e jornadas abertas não mudam. Detalhes em [especificação](superpowers/specs/2026-11-12-deck-inicial-maestria-15.md). Implementação não autoriza commit, push, publicação, atualização de pacote Windows ou backup.

## DEC-040 — Artes de carta de Arcata — 12/11/2026

O autor aprovou as artes base e evoluída propostas para Arcata. Integração usa `public/art/arcata-card.png` e `public/art/arcata-evolved.png`; não acrescenta lore ou regras de jogo.

## DEC-041 — Apresentação do combate e resultado — 12/11/2026

Pedido explícito do autor: ataques que realmente reduzirem o Vínculo devem mostrar o atacante sem bloqueio avançando até ele e retornando; o Vínculo recebe destaque visual no impacto. É animação de apresentação após a resolução do motor, sem alteração de dano, bloqueios ou regras. A tela de vitória/derrota recebe tratamento visual inspirado na referência LoR fornecida, preservando mensagens e ações atuais.

## DEC-042 — Escolhas de Upgrade e eventos da aventura — 12/11/2026

Por pedido do autor, escolhas de fabricação de Abe aparecem como cartas em diálogo central com foco inicial, seguindo o padrão de escolha de cartas. A página de eventos da aventura recebe hierarquia visual e ações agrupadas, inspiradas na referência fornecida. Custos, opções, eventos e efeitos não mudam.

## DEC-043 — Candidatas de carta de Rubel — 12/11/2026

O autor pediu Rubel simples na carta base e se tornando um avatar de Vitumirim na evoluída. As candidatas foram criadas em `design/art-proposals/rubel/rubel-card-candidate.png` e `design/art-proposals/rubel/rubel-evolved-candidate.png`, usando a arte aprovada de maestria como referência de identidade. São propostas visuais, não fatos novos de lore; aguardam aprovação antes de cópia para `public/art` ou integração.

## DEC-044 — Artes de Rubel aprovadas e integradas — 12/11/2026

O autor aprovou a primeira candidata como arte base e a terceira como arte evoluída. Foram copiadas para `public/art/rubel-card.png` e `public/art/rubel-evolved.png`, e o helper compartilhado de cartas passa a escolher entre elas conforme o estado evoluído. A imagem evoluída representa visualmente Rubel como avatar de Vitumirim, conforme direção do autor; não acrescenta lore, habilidade ou regra.

## DEC-045 — Novas propostas de arte para Kylast — 12/11/2026

Por pedido do autor para ajustar as duas artes de Kylast, foram criadas propostas de carta base e evoluída em `design/art-proposals/kylast/kylast-card-candidate.png` e `kylast-evolved-candidate.png`. Ambas mantêm os traços de identidade e equipamentos documentados em [KYLAST_DECK.md](../design/KYLAST_DECK.md); luz azul e ação são escolhas de representação para distinguir a forma evoluída, não novas regras ou fatos narrativos. Permanecem candidatas: não substituem `public/art/kylast.png` nem entram no jogo até aprovação explícita.

## DEC-046 — Resumo visual dos resultados da run — 12/11/2026

A tela de conclusão e derrota organiza deck final, vida restante e Korakacoins em cartões de resumo, preservando dados, mensagens e ações existentes. A apresentação responsiva usa o estado real da run; não muda recompensas nem progressão.

## DEC-047 — Artes de Kylast aprovadas e integradas — 12/11/2026

O autor aprovou as duas candidatas de DEC-045. Uso aprovado: `public/art/kylast-card.png` para a carta base e `public/art/kylast-evolved.png` para a evoluída. A renderização escolhe a arte conforme a evolução; propostas originais permanecem em `design/art-proposals/kylast/`. Não altera lore, regras ou IDs.
