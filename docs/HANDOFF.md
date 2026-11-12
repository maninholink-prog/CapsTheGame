# Continuidade — 2026-11-03

- Raiz real: `C:/Users/Bruxo/Documents/ChatGPT/Game`. Início: [INDEX](INDEX.md); tarefa atual: integração de memória/documentação, sem modificar o jogo.
- Última entrega: AGENTS, prompt mestre local, índices de documentação/lore, decisões, progresso, auditoria, proposta de proteção e duas skills locais. Fontes existentes preservadas; detalhes em [AUDIT](AUDIT.md).
- Regras: [CAMPANHA](../CAMPANHA.md) e [design/](../design/); personagens: [índice existente](../personagens/INDICE.md). Não repetir leitura integral em tarefas simples. Leitura de episódios pausada.
- Pendências de produto: lote de relíquias pausado e árvores dos demais protagonistas conforme [PROGRESS](PROGRESS.md); nenhuma dessas implementações iniciada nesta sessão.
- Git: branch master, sem HEAD/commit e sem remoto na auditoria. Arquivos do jogo já estavam não rastreados. Sem commit/push nesta integração: primeiro checkpoint completo depende de revisar o acervo, segredos e binários.
- Backup: nenhum backup integral/restauração verificado; nenhuma tarefa agendada com caminho do jogo encontrada. [Política proposta](BACKUP_POLICY.md) aguarda aprovação; nenhuma automação ou retenção ativada.
- Validação desta integração: 378 arquivos originais conferidos por SHA-256, nenhum alterado/ausente; 799 links locais válidos (80 novos), recuperação de regra/decisão/personagem e estrutura básica das skills conferidas. TypeScript sem erros; 14 testes em quatro arquivos passaram. Suíte ampla não concluída: tentativa integral interrompida após cerca de dois minutos; tentativa sem profile-run também interrompida sem resumo final. Causa não determinada; não afirmar regressão nem sucesso integral. Validador oficial das skills bloqueado por falta de PyYAML; não houve instalação. Build, interface, links externos, âncoras e restauração de backup não testados. Resultados históricos não contam como execução desta sessão.
- Próximo passo: revisar primeiro checkpoint e aprovar caminhos/horários/retenção do backup. Confirmar descoberta das skills em nova sessão; não assumir ativação nesta sessão.

## Continuidade — Júpiter para playtest — 11/11/2026

O autor autorizou integrar as cartas/decks aprovados e iniciar playtest. Catálogo com 35 identidades e cinco encontros integrado ao treino isolado; números ainda provisórios. Typecheck, build Vite e 31 testes direcionados passaram, incluindo simulações dos cinco encontros. Conferência interativa em navegador não ocorreu: acesso à build local foi bloqueado pelo ambiente. Ver detalhes e limites em [PROGRESS](PROGRESS.md) e especificação em [AVENTURA_JUPITER](../design/AVENTURA_JUPITER.md). Próximo passo é playtest manual dos cinco decks; depois revisar ajustes de balanceamento. Rota completa da aventura, desfechos funerários e ícone exclusivo permanecem por implementar. Sem commit/push/publicação/backup; preserve demais alterações locais.

## Complemento de continuidade — 03/11/2026, após correção da origem do projeto

Este complemento preserva integralmente o HANDOFF anterior. Pedido vigente: somente infraestrutura e memória persistente; desenvolvimento de Abe, Cinderela e artes suspenso neste ciclo. Nenhum código do jogo, distribuição ou perfil deve ser alterado nesta tarefa.

O projeto local chamado CAPS no aplicativo passou a apontar para `C:/Users/Bruxo/Documents/ChatGPT/Game`. A consulta do chat ainda indicava cwd padrão CAPS; os comandos desta auditoria foram executados explicitamente em Game e confirmaram Get-Location antes das escritas. Não afirmar que o cwd persistente do chat foi corrigido. Próximas sessões devem verificar essa diferença antes de operar.

A infraestrutura documental e as duas skills já existiam. A revisão atual acrescenta instruções e vínculos, sem reconstruir a documentação. Pendências do produto estão em PROGRESS, na seção de desenvolvimento suspenso; detalhes e verificações desta execução estão no complemento de AUDIT. Lore permanece nas fontes originais.

Git novamente conferido: master sem HEAD/commits, sem remotos e sem arquivos rastreados. Diretórios propostos de backup e restauração inexistentes; nenhuma tarefa do Agendador com ação ligada ao caminho Game/CAPS-Game foi encontrada. Tarefas genéricas do Windows não comprovam backup deste projeto. Nenhum commit, push, backup, agendamento ou retenção foi executado.

Skills preparadas em .agents/skills, sem duplicação global. Leitura direta e recuperação documental podem ser verificadas nesta sessão; descoberta automática no seletor de skills ainda não demonstrada. PyYAML continua ausente; não houve instalação. Não reutilizar testes históricos como resultado desta auditoria documental.

## Retomada de Abe — 03/11/2026

O autor retomou explicitamente o desenvolvimento de Abe/Cinderela e aprovou as conexões da árvore. A suspensão anterior fica preservada como histórico do ciclo documental. Conexões em [proposta de Abe](../design/ABE_MAESTRIA_PROVISORIA.md); [plano técnico](superpowers/plans/2026-11-03-abe-maestria.md) preparado, sem implementação. Próximo passo: revisão do plano e execução direta na sessão. Apenas documentação alterada nesta etapa; sem testes do jogo, commits, pushes ou backups. Não retomar infraestrutura.


## Abe jogável no Windows — 04/11/2026

Entrega local em [C.A.P.S.exe](../release/CAPS-20261104-054758-win-x64/C.A.P.S.exe). Manter a pasta portátil junto do executável. A janela da versão nova abriu. Abe/Cinderela implementados e verificados com TypeScript, 62 testes direcionados, build e teste de abertura. Suíte ampla sem resultado final. Estado e limites em [PROGRESS](PROGRESS.md). A arte da maestria e a revisão futura do balanceamento continuam pendentes. Sem commit, push ou backup.


## Maestria individual e telas de batalha — 04/11/2026

O menu Maestria mostra os dados e talentos de um personagem por vez. Aventura e treino apresentam abertura antes da mão inicial e resultado antes de seguir. A aventura é liquidada e salva ao terminar o combate. O resultado é apresentado na sessão atual. Pacote local em [C.A.P.S.exe](../release/CAPS-20261104-061035-win-x64/C.A.P.S.exe).

## Interface sem rolagem — 04/11/2026

Pacote atual em [C.A.P.S.exe](../release/CAPS-20261104-062534-win-x64/C.A.P.S.exe). Abas, páginas e ajuste à janela implementados. Testes e limites em [PROGRESS](PROGRESS.md). A release pública anterior segue vinculada ao playtest de Abe.

## Maestria de Arcata — 04/11/2026

Árvore jogável no pacote [C.A.P.S.exe](../release/CAPS-20261104-113901-win-x64/C.A.P.S.exe). Decisão e conexões em [ARCATA_FOGO](../design/ARCATA_FOGO.md). Verificações em [PROGRESS](PROGRESS.md).

Prévia pública de Arcata disponível em [v0.1.0-playtest.2](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.2), vinculada ao commit 734aa67. Próximo passo: playtest manual.

## Aba Artefatos — 04/11/2026

A nova grade está em Coleção → Artefatos no [pacote Windows](../release/CAPS-20261104-123042-win-x64/C.A.P.S.exe). Verificações em [PROGRESS](PROGRESS.md). Nenhuma associação nova entre os IDs do catálogo e as artes do Drive foi aprovada nesta etapa.


## Maestria de Rubel — 04/11/2026

O pacote local [C.A.P.S.exe](../release/CAPS-20261104-124907-win-x64/C.A.P.S.exe) inclui Rubel e a aba de Artefatos. Efeitos em [RUBEL_CURA](../design/RUBEL_CURA.md). Resultados em [PROGRESS](PROGRESS.md).

## Perfil do jogador — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-perfil-local-win-x64/C.A.P.S.exe). Abra Perfil e progresso para testar Resumo e Histórico. Feche a instância anterior antes de abrir a nova. Verificações e pendências em [PROGRESS](PROGRESS.md).

## Nova tela inicial — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-inicio-local-win-x64/C.A.P.S.exe). A entrada alterna os cenários de jade e brasa a cada abertura. O executável usa o ícone do dragão de jade. Próximo passo: conferir a tela e os atalhos no Windows. Evidências em [PROGRESS](PROGRESS.md).

## Navegação lateral e revisão visual — 04/11/2026

Pacote em [C.A.P.S.exe](../release/CAPS-abas-local-win-x64/C.A.P.S.exe). A barra lateral segue o modelo de navegação do LoR e permanece nas seções do menu. A revisão das ilustrações de abertura continua pendente por feedback do autor. Ver [PROGRESS](PROGRESS.md).

## Revisão visual, etapa 1 — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-aventura-local-win-x64/C.A.P.S.exe). Testar os dois fundos, o painel de Aventura e a preparação de jornada. Etapa 2 aprovada: Coleção com rolagem e bússola, Maestria com arte e painel de talento, embalagens de Booster e vitrine de Perfil.

## Revisão visual, etapa 2 — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-revisao-visual-local-win-x64/C.A.P.S.exe). Conferir visualmente o preparo de Aventura, a rolagem e bússolas da Coleção, os painéis de talento, os boosters e o Perfil. Evidências em [PROGRESS](PROGRESS.md).

## Referência visual da Aventura — 04/11/2026

A gravação do autor foi revisada até a vitória, recompensa e volta ao mapa. [Sequência observada e propostas de interface](referencia-lor-aventura.md). Registro documental para a próxima revisão da Aventura.

## Prévia de encontro — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-encontro-local-win-x64/C.A.P.S.exe). No mapa do Dr. Félix, testar abrir o primeiro nó, voltar e confirmar com Lutar. Próxima revisão proposta: vitória, recompensa e retorno ao mapa. Referência em [gravação analisada](referencia-lor-aventura.md).

## Mapa em tela cheia — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-mapa-local-win-x64/C.A.P.S.exe). Testar entrada e retomada da jornada, rolagem, acesso ao deck e prévia de combate. Ilustração do laboratório permanece para etapa visual própria.

## Arena de batalha estável — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-arena-local-win-x64/C.A.P.S.exe). Conferir mão inicial, declaração de ataque e bloqueio em uma partida real. A arena usa arte própria com metades cobre e jade.

## Loja e mão em leque — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-loja-e-mao-local-win-x64/C.A.P.S.exe). Conferir compra e retomada na loja, mão em leque e controles abaixo da arena. Pilha, Registro, Descarte e carta em foco ficam em Informações.

## Leitura das cartas e tela cheia — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-cartas-tela-cheia-local-win-x64/C.A.P.S.exe). Conferir prévia à esquerda e Início → Opções → Alternar tela cheia.

## Indicadores da arena — 04/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-prioridade-local-win-x64/C.A.P.S.exe). Conferir troca de prioridade, sigilos de efeitos e faixa inferior em combate.

## Artes das cartas de Abe e publicação — 04/11/2026

As ilustrações aprovadas para Abe foram integradas ao renderizador compartilhado de cartas, mantendo IDs, textos e efeitos. Abe usa sua arte base e muda para a arte de maestria quando evolui; a arte anterior de Engineering foi preservada como `engineering-original.png`. Referências de continuidade e verificações em [PROGRESS](PROGRESS.md). Pacote portátil local: `release/CAPS-20261104-212508-win-x64`. Publicação remota pendente de envio deste commit e do ZIP `v0.1.0-playtest.4`.

### Complemento de publicação — v0.1.0-playtest.4

O commit `d44c701` foi enviado à `main`, e a tag `v0.1.0-playtest.4` foi criada. A release [v0.1.0-playtest.4](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.4) contém cinco partes do pacote Windows e o comando de junção. Reconstrução local das partes conferiu o SHA-256 do ZIP completo. A interface do pacote abriu; a conferência de carta na mão e prévia ampliada continua pendente porque a automação recebeu atividade do usuário.

## Molduras das cartas — 05/11/2026

Autor confirmou o funcionamento das artes aprovadas. Design das cartas adaptado à referência de LoR com recursos existentes; detalhes e limites em PROGRESS. Pacote local separado: [C.A.P.S.exe](../release/CAPS-cartas-molduras-local-win-x64/C.A.P.S.exe). TypeScript, oito testes direcionados e build passaram; inspeção visual parcial da coleção, conferência final de mão/prévia no pacote pendente. Demais telas continuam em pausa. Sem commit, push, publicação ou backup; release pública .4 preservada.

### Equipamentos — 05/11/2026

Referência adicional do autor aplicada à moldura dos equipamentos. Pacote: [C.A.P.S.exe](../release/CAPS-equipamentos-local-win-x64/C.A.P.S.exe). Validações técnicas passaram; visual ainda pendente, detalhes em PROGRESS. Sem publicação ou alteração dos atributos.

## Símbolos regionais — 05/11/2026

Autor aprovou os cinco ícones (REGIOES-01 em DECISIONS); integrados à coleção, mão e prévia. [Pacote local](../release/CAPS-regioes-local-win-x64/C.A.P.S.exe). Prancha aprovada preservada; validações e limitações em PROGRESS. TypeScript, quatro testes e build passaram. Próximo: conferir legibilidade dos símbolos pequenos. Sem commit, push, publicação ou backup.

## Escolha inicial e mana — 05/11/2026

Acabamento da escolha inicial preserva a estrutura aprovada; mana sobreposta corrigida inclusive nas molduras arredondadas. [Pacote local](../release/CAPS-mana-e-escolha-local-win-x64/C.A.P.S.exe). TypeScript, sete testes e build passaram; escolha inicial e três cartas conferidas em prévia no navegador. Limites em PROGRESS. Sem commit, push, publicação ou backup.

## Pacote atual e limpeza proposta — 05/11/2026

Letras regionais removidas; pacote consolidado em [C.A.P.S.exe](../release/CAPS-atual-win-x64/C.A.P.S.exe). TypeScript, quatro testes e build passaram. [Lista concreta de limpeza](release-cleanup-2026-11-05.json) aguarda aprovação: manter pacote atual e ZIP público .4, excluir intermediários de release. Nada excluído. Detalhes em PROGRESS; sem commit/push/publicação/backup.

## Pendências registradas — 05/11/2026

Retratos nos painéis de Preparar aventura e escolha de protagonistas por imagens solicitados para revisão futura (HEROIS-VISUAL-01 em DECISIONS); nenhuma implementação nesta etapa. Limpeza de releases já autorizada pelo autor, mas execução rejeitada pela política antes de iniciar; nada excluído. Complementos em PROGRESS preservam os registros anteriores. Sem commit, push, publicação ou backup.

## Finalização visual — 07/11/2026

[Pacote atual](../release/CAPS-atual-win-x64/C.A.P.S.exe) atualizado no mesmo local: dimensões uniformes, ação circular lateral, vidas maiores, unidades horizontais e seleção por imagens/retratos disponíveis. TypeScript, 45 testes direcionados e build passaram; prévia de combate e dimensões das cartas conferidas no navegador, arquivos empacotados comparados por SHA-256. Partida completa no executável e resoluções variadas pendentes. Quatro protagonistas ainda sem retratos aprovados. Detalhes em PROGRESS. Sem commit/push/publicação/backup; limpeza antiga permanece não executada.

## Indicadores de alvo — 09/11/2026

[Pacote atual](../release/CAPS-atual-win-x64/C.A.P.S.exe) atualizado com raios animados entre efeitos pendentes e seus destinos. Prévia no navegador mostrou três alvos simultâneos. TypeScript, 12 testes direcionados e build passaram. Arquivos do build conferidos por SHA-256 no pacote. A próxima conferência é em partida real no executável. Detalhes em PROGRESS. Sem commit, push, publicação ou backup.

## Playtest.5 publicado — 09/11/2026

[Release v0.1.0-playtest.5](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.5) publicada a partir de `92b9c4c` na `main`, com cinco partes do ZIP Windows e o script de junção. Assets confirmados por SHA-256. Testes e limites em PROGRESS.


## Raios no playtest.5 — retorno do autor, 09/11/2026

Autor confirmou o funcionamento dos raios. Os cenários específicos e os limites da conferência estão em [PROGRESS](PROGRESS.md#playtest-dos-raios--retorno-do-autor-09112026).

## Novos encontros comuns do Dr. Félix — 09/11/2026

Oficina de Bobinas, Enfermaria Experimental e Câmara de Descarga disponíveis ao iniciar novas jornadas no [pacote Windows atual](../release/CAPS-atual-win-x64/C.A.P.S.exe). Jornadas salvas mantêm os adversários. Validação e limites em [PROGRESS](PROGRESS.md#três-novos-encontros-do-dr-félix--09112026). Para cartas de aventuras futuras do jogo, partir do [catálogo aprovado de inimigos](../design/INIMIGOS_E_CHEFES.md).

## Playtest do Dr. Félix — retorno do autor, 09/11/2026

Playtest realizado pelo autor. Balanceamento das cartas adiado para a etapa final do jogo. [Registro em PROGRESS](PROGRESS.md#retorno-do-playtest-do-dr-félix--09112026).

## Próxima aventura — Caveira Dourada — 09/11/2026

O [design da Caveira Dourada](../design/AVENTURA_CAVEIRA_DOURADA.md) reúne a rota principal, a abordagem secreta e os dois lotes de cartas mais Tubarão e Megalodonte. Efeitos das criaturas ainda em proposta.

A [matriz de decks](../design/AVENTURA_CAVEIRA_DOURADA.md#listas-de-encontros) está pronta para revisão, com encontros comuns, Duelista, elite do Megalodonte, General e Capitão secreto. Textos propostos e valores de balanceamento pendentes.

## Treino da Caveira Dourada — 10/11/2026

As 18 cartas estão no jogo e os seis decks podem ser selecionados em Início → Adversário do treino → Duelo de treino no [pacote Windows atual](../release/CAPS-atual-win-x64/C.A.P.S.exe). Custos provisórios em [design](../design/AVENTURA_CAVEIRA_DOURADA.md#custos-provisórios-aplicados--10112026), verificações em [PROGRESS](PROGRESS.md#cartas-da-caveira-dourada-em-treino--10112026). Próxima etapa de conteúdo: integrar rota, pista opcional e abordagem secreta à Aventura.

## Caveira Dourada disponível em Aventura — 10/11/2026

No [pacote Windows atual](../release/CAPS-atual-win-x64/C.A.P.S.exe), abra Iniciar aventura → Preparar aventura → Caveira Dourada. Depois do General, o mapa permite seguir de volta ou descobrir a enseada. A pista da prova é opcional. Valores de cartas preservados. [Verificações em PROGRESS](PROGRESS.md#aventura-da-caveira-dourada--10112026).

## Ferramentas gratuitas do Codex — 10/11/2026

Neste projeto, o Codex encontrou UI/UX Pro Max, Transitions.dev e Motion. Os MCPs locais de configuração são Playwright (Edge isolado) e Motion (busca de documentação). Se a sessão atual ainda mostrar o catálogo antigo, abra uma sessão nova no mesmo projeto. [Versões, verificações e reversão em PROGRESS](PROGRESS.md#ferramentas-gratuitas-de-ui-para-o-codex--10112026).

## Tabuleiro visual inspirado em LoR — 10/11/2026

A disposição completa da arena foi reorganizada no código local: mão fechada de J2 acima, combate e unidades no centro, mão jogável abaixo, Vínculos à esquerda e recursos/ação à direita, em cobre e jade. A prévia do Treino no navegador foi inspecionada em 1440×960 e 960×700; o pacote Windows atual ainda não recebeu esta alteração. Resultado e limites em [PROGRESS](PROGRESS.md#identidade-visual-do-tabuleiro--10112026). Sem commit, push ou backup.

## Opções da batalha e pacote visual Windows — 11/11/2026

A remoção da faixa superior, o fundo de santuário jade/cobre e o menu de opções com reiniciar/desistir estão no [pacote portátil](../release/CAPS-20261111-visual-win-x64/C.A.P.S.exe). Prévia no navegador validou as confirmações e resultados, sem constituir partida completa. Build e hashes dos 37 arquivos web foram conferidos contra o build local. Diagnóstico: Electron 45.2.1 oficial em cache, release anterior e pacote novo falham igualmente antes do app com `0x80000003`, enquanto Node funciona no mesmo sandbox. Isso aponta para a execução isolada do Electron no sandbox; a abertura final ainda requer conferência fora dele, em Windows comum. Ver “Diagnóstico de abertura nativa” no complemento de 11/11/2026 em [PROGRESS](PROGRESS.md). Nenhum executável alterado, commit, push, publicação ou backup.

### Correção — abertura nativa confirmada, 11/11/2026

A área de trabalho Windows mostrou e operou o executável da pasta nova: tela inicial, preparo de mão, iniciativa, rodada 1 e menu de batalha confirmados no aplicativo nativo. A conclusão de que não abria foi superada; ver a correção mais recente em [PROGRESS](PROGRESS.md). O duelo de treino ficou aberto e incompleto para o autor. O build/pacote não foi alterado durante esta conferência.

## Versão Alpha na tela inicial — 11/11/2026

O autor perguntou se o C.A.P.S. está em Alpha ou Beta. O estágio atual é Alpha: o produto ainda está identificado como protótipo 0.1.0 e o conteúdo continua em desenvolvimento; ver [DECISIONS](DECISIONS.md#classificação-atual-da-versão--11112026). `ALPHA · v0.1.0` foi acrescentado no canto inferior direito da tela inicial. TypeScript, teste focado, build e prévias em 1440×960 e 960×700 passaram. O pacote portátil Windows também foi atualizado e conferido; a janela aberta permanece no duelo antigo até ser fechada e reaberta. Sem instalação global ou publicação.

## Menu inicial reorganizado — 11/11/2026

A faixa horizontal aprovada agrupa Aventura, seletor e Duelo de treino e Marcos semanais na base. Navegação, perfil, recursos, cenário atual e `ALPHA · v0.1.0` permanecem. A prévia no navegador em 1440×960 e 960×700 ficou sem sobreposição; TypeScript, quatro testes focados e build passaram, com os 37 arquivos conferidos por SHA-256 no pacote portátil. A suíte completa encontrou as falhas preexistentes de `map-view` e `playtest-unlock` e foi interrompida sem resumo. O executável continua aberto em duelo incompleto e não foi reiniciado, então sua janela ainda usa o bundle anterior; reabrir o pacote carrega o menu atualizado. Sem commit, push, publicação ou instalação global. Detalhes em [PROGRESS](PROGRESS.md).

## Refinamentos do menu inicial — 11/11/2026

Topo compacto com engrenagem, pedra filosofal ilustrada e quantidade, retrato do perfil sem texto. Base reduzida a Aventura e Marcos semanais, sem painel ou bordas de comando; treino continua no fluxo próprio. TypeScript, quatro testes e build passaram; 38 arquivos conferidos no pacote portátil. Inspeção visual do browser ficou pendente por timeout do Playwright. Janela nativa não reiniciada para manter o duelo incompleto, então ainda usa bundle anterior. Detalhes e limites em [PROGRESS](PROGRESS.md).

### Prévia visual conferida — 11/11/2026

Playwright alcançou o servidor Vite e a home foi inspecionada em 960×700 e 1440×960. Engrenagem abre opções; Marcos semanais navega corretamente; pedra carregou; retrato e ações ficam sem moldura; faixa e versão não se sobrepõem nem saem do viewport. Capturas em `tmp/caps-home-menu-preview-960x700.png` e `tmp/caps-home-menu-preview-1440x960.png`. TypeScript, 4 testes e build passaram; 38 arquivos foram hash-conferidos no pacote portátil. Apenas prévia web; o executável continuou aberto no duelo anterior.

## Perfil inspirado nas referências de LoR — 11/11/2026

Resumo do perfil e seletor de foto reorganizados em referência às imagens fornecidas. Implementação usa estatísticas já existentes do C.A.P.S. e adapta a coluna ranqueada para Maestria; não cria PvP ou cosméticos ausentes. Teste focado, typecheck e build temporário passaram. Prévia web registrada em `tmp/caps-profile-lor-960x700.png`, `tmp/caps-profile-selector-960x700.png` e `tmp/caps-profile-selector-1440x960.png`. O perfil isolado só tinha Kylast desbloqueado, limitando a inspeção visual da seleção múltipla. Pacote e executável Windows não foram modificados nem testados nesta etapa. Sem commit, push, publicação ou backup.

## Faixa global, fonte e Perfil — 11/11/2026

A faixa global superior foi removida; tela inicial mantém seus controles próprios. C.A.P.S. Display original, com mestre em `tools/fonts/build_caps_display.py`, está em `public/fonts/caps-display.ttf`; o corpo continua em Segoe UI. Perfil recebeu ícones SVG jade/cobre, fundo ilustrado existente e transição acessível. Nove testes, typecheck, build temporário e prévia Playwright passaram; detalhes e capturas em [PROGRESS](PROGRESS.md#faixa-tipografia-e-perfil--11112026). Sem atualização do pacote Windows, partida nativa, commit, push ou backup.

## Correção visual — Korakoin e tipografia — 11/11/2026

Última solicitação atendida: imagem de moeda Korakoin ao estilo da Pedra Filosofal e retorno à tipografia anterior após rejeição da fonte original. public/art/korakoin.png tem uma medalha jade/cobre; korakoinIcon() posiciona sobre ela o símbolo de Korakarom da arte aprovada. A moeda aparece no saldo da aventura, mapa e loja. Títulos usam Georgia novamente; corpo usa Segoe UI. DEC-013 supersede DEC-011 nessa preferência, sem remover o histórico.

Verificação: 11 testes de UI, TypeScript, build e diff check passaram. Prévia home em `tmp/caps-korakoin-image-final-960x700.png. O grid de batalha solicitado anteriormente pode ser visto em `tmp/caps-battle-grid-final-1440x960.png, capturado numa partida de teste na prévia do navegador, não no executável Windows. Não atualizei pacote nem instalei globalmente; não fiz commit, push, publicação ou backup. A run isolada de prévia ficou em aberto e não altera os dados da instalação nativa. Alterações locais preexistentes fora desse escopo foram preservadas.

## Saldos compactos na home — 11/11/2026

Rótulos visíveis dos dois saldos removidos a pedido do autor; ficam o ícone e a quantidade formatada no padrão pt-BR. Teste dedicado cobriu 12.500 Pedras Filosofais e 12.345 Korakoins, sem tocar no save real. home-view.test.ts (5 testes), TypeScript e git diff --check passaram. A alteração não foi conferida em prévia visual nem no executável Windows.

## Conferência Windows dos saldos e limpeza de QA — 11/11/2026

A cópia portátil temporária foi aberta como aplicativo nativo Windows, separada do executável instalado, e mostrou home, fundo temático, saldos compactos, opções por engrenagem, navegação lateral, botões inferiores e Alpha v0.1.0. O teste Windows não exibiu valores acima de mil: a alteração do save QA pelo Console foi bloqueada pela autoproteção do DevTools. O teste automatizado dedicado validou 12.500 Pedras Filosofais e 12.345 Korakoins; home-view (5 testes), TypeScript e diff check passaram. Não se concluiu uma partida Windows nesta retomada.

A autorização de exclusão de saves foi registrada em DEC-014 e limitada aos dados temporários do QA. O perfil descartável e a cópia Windows de QA foram removidos após o fechamento; instalação normal e backups permaneceram intactos.

Atualização do playtest — 11/11/2026: sessão interativa acessível em `http://127.0.0.1:5173/`. Partida isolada Abe vs. Infestação na Estrada iniciada; Zacarias e Larva de Escaravelho entraram em combate e a resolução ocorreu. O duelo permanece aberto para o autor. Simulações automatizadas cobriram os cinco decks; somente a Estrada recebeu conferência manual parcial nesta etapa. Nenhuma recompensa/save de aventura foi gerado pelo treino. O executável/release preexistente não contém a integração e permaneceu inalterado.

Nova versão Windows gerada e aberta em [C.A.P.S.exe](../release/CAPS-JUPITER-PLAYTEST-20261111-win-x64/C.A.P.S.exe), em pasta portátil paralela; release anterior preservada. A janela carregou o perfil existente com run de Abe ativa; deixei-a intacta e mantive o duelo de teste no navegador. Checksum Electron validado, build/empacotamento concluídos. Ver detalhes em [PROGRESS](PROGRESS.md). Sem commit/push/publicação/backup.
## Retomada — playtest de Júpiter — 11/11/2026

Os cinco decks possuem simulação automatizada completa aprovada pelos testes focados (31 testes em `caveira.test.ts` e `expansion-engine.test.ts`). Inspeção manual em treino: Estrada teve primeira troca/combate em registro anterior; nesta retomada, Ratos chegou à rodada 6, Escaravelhos à 3, Aquáticos à 1 e Kraken à 2; as quatro sessões foram encerradas antes do resultado. Sem travamento observado. Não chamar a cobertura manual de partidas completas. TypeScript, build Vite temporário e diff check passaram. Nenhum ajuste de balanceamento foi feito. Próximo passo autorizado: começar a etapa de balanceamento dos decks, consultando autoria/registros e mostrando propostas ao autor antes de consolidar decisões. DEC-015 guarda a permissão permanente para excluir aventuras em andamento quando necessário a QA, sem estender a exclusão a perfil/progresso não relacionado ou backups. A aventura Abe do perfil Windows permanece intacta. Sem commit/push/publicação/backup.

## Balanceamento inicial de Júpiter — 11/11/2026

Primeiro ajuste aplicado: Ninhada de Ratos e Enxame de Escaravelhos agora custam 3; o efeito descrito do Rato Saqueador foi conectado como retorno opcional respondível de aliado ferido. 32 testes focados passaram, incluindo simulação completa dos cinco decks; typecheck, build Vite temporário e diff check passaram. Não houve alteração em IDs existentes, composição, regiões ou artes. Amostra exploratória contra oito protagonistas mostrou alta variação por matchup; veja resultados e limitações no [PROGRESS](PROGRESS.md). É uma calibração inicial, com testes manuais completos ainda pendentes, não balanceamento encerrado. Próximo: rodar playtests manuais até o resultado e recalibrar conforme observação. Sem pacote Windows atualizado, commit, push, publicação ou backup.

### Build Windows de teste disponibilizada — 11/11/2026

Pacote portátil atualizado e aberto em [C.A.P.S.exe](../release/CAPS-JUPITER-BALANCE-20261111-win-x64/C.A.P.S.exe). O smoke test confirmou home e perfil em `tmp/CAPS-JUPITER-BALANCE-QA-20261111/CAPS-Game`; Abe e todos os protagonistas estão liberados somente nesse perfil descartável. A janela está em “Playtest de encontros” aguardando o autor; não fiz partidas interativas. O pacote anterior foi preservado. Sem commit, push, publicação pública ou backup; o pedido de lançamento local para teste foi atendido.

## Aprovação para entrega pública — 11/11/2026

O autor concluiu os testes no computador e autorizou commit, push, publicação e backup. Os cenários manuais não foram especificados; a build testada permanece em `release/CAPS-JUPITER-BALANCE-20261111-win-x64`. Próximo: publicar a `.6` sem incluir mudanças locais de skills/configuração; registrar links e backup após validação.

## Entrega pública v0.1.0-playtest.6 — 11/11/2026

Commit `4612b95283d482549439e0634e7b8cda40b96206` em `main`; [pré-lançamento público](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.6) com o pacote Windows e oito anexos conferidos por tamanho/digest. O autor informou que os testes no computador foram concluídos e aprovados; não especificou cenários. Backup integral e restauração de teste são a próxima ação. Quatro mudanças de interface/coleção citadas pelo autor ficam para outro chat e não fazem parte desta entrega.

## Backup integral verificado — 11/11/2026

Snapshot completo em `C:/Users/Bruxo/Documents/Backups/CAPS-Game/snapshots/20261111-173733`; manifesto e log em `C:/Users/Bruxo/Documents/Backups/CAPS-Game`. Restauração isolada em `C:/Users/Bruxo/Documents/Backups/CAPS-Game-restore-test/20261111-173733`, 33.173 hashes comparados, zero divergências. Depois do registro, documentos/metadados Git foram sincronizados no snapshot e na restauração; o manifesto foi atualizado e as mudanças foram reconferidas sem divergências. Contagem e hashes finais estão no JSON de síntese. Origem e backup ficam no mesmo disco C:.
## Quatro ajustes de UI e coleção — 11/11/2026

Seletor de aventura, badge da engrenagem, animação visual de D20 e seção de cartas inimigas implementados localmente. Verificações e limites em PROGRESS. A seção de inimigos é consulta: enemyOnly e collectible:false permanecem; não concede cartas ao jogador. Sem commit, push, publicação ou backup.

## Cartas inimigas em boosters — 11/11/2026

Raridades provisórias por custo, coleção separada e inclusão em boosters implementadas. Regra em DEC-017; cobertura e resultado em PROGRESS. enemyOnly preservado e cartas auxiliares filtradas. Próximo: build portátil e smoke test. Sem publicação, commit ou backup.


Build portátil atualizada em release/CAPS-20261111-190400-win-x64/C.A.P.S.exe; smoke isolado passou (home carregada, exit 0). Sem teste interativo nem acesso ao perfil do autor. Pacotes anteriores intactos; sem commit, push, publicação ou backup.

## Youro — árvore de maestria disponível para playtest — 11/11/2026

Os quinze talentos de Youro estão integrados ao perfil, save e motor. TypeScript e 70 testes focados em 12 arquivos passaram; pacote local em [C.A.P.S.exe](../release/CAPS-20261111-193031-win-x64/C.A.P.S.exe), com smoke Electron isolado e verificação visual da árvore a 1440×960 e 960×700. O autor pediu que a imagem anexada guie a aparência do gato (capuz verde, manto de penas e bolsa), enquanto a direção de pintura siga *Legends of Runeterra*; isso está anotado em [DECISIONS](DECISIONS.md#dec-018--aparência-e-direção-visual-de-youro). Próximo: playtest manual dos talentos e revisão de valores; depois priorizar Kuara, Thalion e Lázaro. Sem commit, push, publicação ou backup.

## Correção visual da Korakoin — 11/11/2026

Ajuste CSS do fundo preto opaco no símbolo regional sobre a moeda; pacote em release/CAPS-20261111-193831-win-x64/C.A.P.S.exe. Smoke isolado passou e janela aberta para teste com perfil separado. Conferência visual direta do emblema no executável não disponível. Sem commit/push/publicação/backup.


## Kuara — árvore disponível para playtest — 11/11/2026

A árvore aprovada, retratos e integração de combate estão no pacote local [C.A.P.S.exe](../release/CAPS-20261111-201415-win-x64/C.A.P.S.exe), pronto para abrir e testar. Kuara evoluído aparece como alter ego de máscara. Decisão e limites detalhados em [DEC-019](DECISIONS.md#dec-019--maestria-de-kuara-e-identidade-do-alter-ego) e [PROGRESS](PROGRESS.md). Próximo: testar a árvore e os gatilhos de combate manualmente. A suíte completa não terminou; veja PROGRESS para os três testes com expectativas divergentes. Sem commit, push, publicação ou backup.


## Carta de Youro — arte base e evoluída — 11/11/2026

As duas imagens da carta de campeão estão no [pacote local](../release/CAPS-20261111-203002-win-x64/C.A.P.S.exe), aberto para teste. Youro permanece sem máscara; a forma evoluída usa os ecos de Urso/Tigre já aprovados. Apenas o campeão recebeu arte. Ver [DEC-018](DECISIONS.md#dec-018--aparência-e-direção-visual-de-youro) e [PROGRESS](PROGRESS.md). Testes focados passaram; suíte completa interrompida com falhas listadas em PROGRESS. Sem commit, push, publicação ou backup.

## Build atual da carta de Youro — 11/11/2026

Pacote local em [C.A.P.S.exe](../release/CAPS-20261111-204500-win-x64/C.A.P.S.exe), aberto em Coleção → Cartas com Youro filtrado. A carta base sem máscara foi conferida visualmente; a seleção da arte evoluída passou no teste de renderização. Smoke Electron isolado, hashes dos dois assets, typecheck e diff check passaram. Suíte integral: 455/459 testes passaram; quatro falhas não relacionadas ao fluxo de Youro estão detalhadas em PROGRESS. Próximo: playtest manual da forma evoluída. Sem commit, push, publicação ou backup.

## Pré-lançamento público playtest.7 — 11/11/2026

Commit `f33c2e2` está em `main`; a [prévia v0.1.0-playtest.7](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.7) contém o pacote Windows e seis partes mais o `.cmd`. Tamanhos e SHA-256 dos sete anexos conferem com os arquivos locais; SHA-256 do ZIP montado: `82270A1CDEB9C12302C017FB3F0921798F494E2E8C5D6F08E3FC9DA6AC843A8E`. Suíte integral: 455/459 passaram, quatro falhas registradas em PROGRESS. Próximo: concluir snapshot e restauração de teste.

## Backup local do pré-lançamento playtest.7 — 11/11/2026

Snapshot em `Documents/Backups/CAPS-Game/snapshots/20261111-210441`; restauração separada em `Documents/Backups/CAPS-Game-restore-test/20261111-211500`. 34.665 arquivos regulares atuais e 29.090.662.842 bytes foram comparados por SHA-256, sem ausências ou divergências; restore idêntico ao snapshot. Os dois conservam 182 arquivos extras anteriores. O bloqueio inicial do Edge envolveu arquivos temporários do perfil Playwright; ao validar, eles já não existiam na origem. Manifestos e logs ficam no destino externo. Esse backup está no mesmo disco C: da origem.
## Suíte integral estabilizada — 11/11/2026

Quatro testes anteriormente reportados foram atualizados para os contratos atuais de raridade, navegação e mapa; os timeouts de simulações longas de IA/run foram ajustados a 15 s. TypeScript e suíte integral passaram: 84 arquivos, 459 testes. Detalhes em [PROGRESS](PROGRESS.md). Alterações locais ainda sem commit/push.
Verificação adicional após pedido do autor: 8 arquivos/67 testes focados passaram, incluindo boosters inimigos, exclusão de enemyOnly em recompensa/deck, duelos IA completos e run de três batalhas. A suíte integral segue 459/459.
## Build local de teste — 11/11/2026

Pacote em `release/CAPS-20261111-220828-win-x64/C.A.P.S.exe`; build Vite e smoke Electron isolado passaram. O smoke final usou cópia temporária e `userData` descartável. A primeira tentativa carregou o perfil padrão e atualizou arquivos de cache/sessão; não foi possível confirmar alteração no save por falta de estado anterior. Detalhes em [PROGRESS](PROGRESS.md). Sem commit/push/publicação.

## Perfis locais — 11/11/2026

DEC-020 implementada: JSON completo por UUID em `Saves`, migração v1 preservando a chave antiga, criação e alternância em Perfil e progresso. Pacote local para teste: [C.A.P.S.exe](../release/CAPS-20261111-224042-win-x64/C.A.P.S.exe). TypeScript, smoke de criação/troca na cópia isolada e 469 testes integrais passaram; depois foi acrescentado e passou um teste adicional de isolamento de run/sessão. Não houve teste de partida completa ou de falha de escrita induzida na UI. Não abrir o userData real para QA; o pacote está pronto para teste manual. Sem commit, push, publicação pública ou backup.

## Thalion: árvore proposta — 12/11/2026

Características aprovadas em DEC-021. Quinze nós e conexões em [proposta de Thalion](../design/THALION_MAESTRIA_PROPOSTA.md), ainda sem aprovação. Próxima ação: obter decisão do autor sobre a árvore; só depois criar imagem de disposição e integrar ao jogo. Nenhuma implementação, teste de jogo, commit, push, publicação ou backup nesta etapa. Preserve as alterações locais preexistentes.

### Thalion: árvore aprovada e artes propostas — 12/11/2026

DEC-022 aprova os quinze nós da [especificação](../design/THALION_MAESTRIA_PROPOSTA.md). [Disposição SVG](../design/THALION_MAESTRIA_LAYOUT.svg) criada. Três artes de personagem salvas em `public/art/thalion-card.png`, `thalion-evolved.png` e `thalion-mastery.png`; aguardam aprovação visual antes de serem integradas. Próxima ação: decisão do autor sobre as artes; depois integrar e testar a maestria no jogo. Sem commit, push, publicação ou backup.

## Thalion concluído — 12/11/2026

Árvore e artes aprovadas e integradas; detalhes e verificações em [PROGRESS](PROGRESS.md), especificação em [THALION_MAESTRIA_PROPOSTA](../design/THALION_MAESTRIA_PROPOSTA.md) e decisão visual em DEC-023. Próximo na ordem aprovada: Lázaro, começando por recuperar as características e fontes e pedir aprovação antes da proposta. TypeScript, 42 testes focados e build Vite passaram. Playwright local expirou; sem inspeção interativa, smoke Electron ou suíte integral. Sem commit, push, publicação ou backup.

## Suíte integral e pacote Windows atualizados — 12/11/2026

Vitest integral: 88 arquivos, 476/476 testes. Build portátil em [C.A.P.S.exe](../release/CAPS-20261112-thalion-win-x64/C.A.P.S.exe); SHA-256 e smoke isolado `ok:true`, exit 0, registrados em [PROGRESS](PROGRESS.md). Próximo na ordem aprovada: começar o ciclo de Lázaro recuperando fontes e pedindo aprovação das características. Sem commit, push, publicação ou backup.

### Lázaro: referência e correção autoral — 12/11/2026

DEC-024 registra a referência visual aprovada e a confirmação de Último Grito como Greatsword, preservando a nota antiga de CAPS 48. Próxima ação: apresentar a síntese das características para aprovação antes dos nós. Nada implementado nesta etapa; sem commit, push, publicação ou backup.

### Lázaro: árvore proposta — 12/11/2026

O autor aprovou as características (DEC-025). A árvore de 15 nós está proposta em [LAZARO_MAESTRIA_PROPOSTA](../design/LAZARO_MAESTRIA_PROPOSTA.md); efeitos novos continuam propostas e a aprovação da árvore está pendente. Próximo passo: aguardar decisão do autor; somente após aprovação criar imagem de disposição. Implementação e arte de jogo seguem pendentes. Alterações locais preexistentes foram preservadas. Sem testes de jogo, commit, push, publicação ou backup nesta etapa.

#### Complemento — árvore aprovada — 12/11/2026

O autor aprovou a árvore (DEC-026). A disposição está em [LAZARO_MAESTRIA_LAYOUT.svg](../design/LAZARO_MAESTRIA_LAYOUT.svg), e a especificação textual atualizada em [LAZARO_MAESTRIA_PROPOSTA.md](../design/LAZARO_MAESTRIA_PROPOSTA.md). Próxima etapa do fluxo: preparar artes de Lázaro com base na imagem de referência aprovada; obter aprovação das artes antes de integrá-las ao jogo. Nenhuma implementação foi iniciada. Sem testes de jogo, commit, push, publicação ou backup nesta etapa.

#### Complemento — direção artística e candidatas — 12/11/2026

DEC-027 registra a preferência global: cartas podem mostrar momentos épicos ou cotidianos e seguem fantasia pintada de *Legends of Runeterra*. Para Lázaro, criar candidatas base, evoluída e maestria; base em cena cotidiana e evoluída em cena épica. Nenhuma candidata será integrada antes de aprovação visual.

#### Correção de escopo — todas as cartas — 12/11/2026

O autor esclareceu que a direção de DEC-027 cobre todas as cartas, atuais e futuras, conforme DEC-028. Usar momentos cotidianos ou épicos conforme o sujeito e o contexto, na direção de fantasia pintada de *Legends of Runeterra*. Para Lázaro, a base candidata é cotidiana e a forma evoluída épica; ambas aguardam aprovação visual. Aplicar essa regra também a cartas que não sejam protagonistas.

#### Candidatas de arte de Lázaro — 12/11/2026

As três propostas estão em [design/art-proposals/lazaro](../design/art-proposals/lazaro): carta base cotidiana, carta evoluída épica e fundo da maestria. DEC-029. Aguardam aprovação antes de integração. A árvore e a imagem SVG já estão aprovadas; implementação da árvore e efeitos segue pendente.

#### Rejeição das artes — 12/11/2026

O autor rejeitou as três candidatas (DEC-030); preservar os arquivos somente como histórico e não integrar. Continuar mecânica/UI sem arte específica. Pergunta de direção para nova proposta foi enviada; nenhuma nova imagem deve ser gerada até resposta.

#### Direção revisada para as artes — 12/11/2026

O autor orientou priorizar o traço pintado de fantasia de *Legends of Runeterra*. A cena da base simples/cotidiana foi aprovada como conceito; evolução e maestria devem ser épicas. Expressão séria e postura estratégica, dentro dos limites de continuidade narrativa. DEC-031. Gerar novas candidatas e pedir aprovação antes de qualquer integração.

#### Composição de maestria única — 12/11/2026

DEC-032: cada personagem precisa de composição própria na arte de maestria. Lázaro não deve repetir palco, pose ou composição de Thalion. O conceito do novo fundo deve ser distintivo, épico e coerente com sua identidade aprovada. Não integrar arte rejeitada.

#### Cartas de Lázaro aprovadas — 12/11/2026

DEC-033 aprova a base e a forma evoluída revisadas, já salvas em `public/art/lazaro-card.png` e `public/art/lazaro-evolved.png`. Elas podem ser integradas no renderizador. Fundo de maestria não aprovado; precisa de composição própria, distinta da de Thalion. Implementação mecânica/UI ainda está pendente.

#### Candidata própria para maestria — 12/11/2026

Nova proposta em [design/art-proposals/lazaro/lazaro-mastery-candidate-v3.png](../design/art-proposals/lazaro/lazaro-mastery-candidate-v3.png), composição central de encruzilhada, registrada em DEC-034. Aguardando aprovação visual. Não integrar antes de aprovação. Base e evoluída seguem aprovadas (DEC-033).

#### Ajuste da composição — 12/11/2026

O autor gostou dos caminhos divergentes e pediu Lázaro visto de costas, sem saber qual caminho seguir (DEC-035). Criar a v4 e solicitar aprovação. Manter as artes base/evoluída aprovadas; não integrar nenhum fundo de maestria anterior.

#### Fundo de maestria aprovado — 12/11/2026

O autor aprovou v4; salva em `public/art/lazaro-mastery.png` (DEC-037). Cartas base/evoluída/fundo de maestria estão aprovadas. Podem ser integradas no renderizador. A implementação da árvore e efeitos está em andamento.

#### Complemento — integração e validação de Lázaro — 12/11/2026

DEC-038 registra o início da integração dos quinze talentos e três artes aprovadas de Lázaro. Código em `src/battle/lazaro-talents.ts`, `src/profile/talents.ts`, fluxos de batalha/UI e validador de saves. Teste focado: `tests/lazaro-mastery.test.ts`. Executar suíte total, typecheck, build e verificações de empacotamento Windows antes de concluir. Preservar o restante das alterações locais. Nenhum commit, push, publicação ou backup autorizado.

#### Fechamento — 12/11/2026

Integração de Lázaro concluída. Quinze nós aprovados, UI e artes base/evoluída/maestria aprovadas integrados; efeitos cobertos por teste focado e saves antigos seguem aceitos com o estado novo opcional. `npm run typecheck`, 7 testes focados, suíte completa (89 arquivos/483 testes), build Vite temporário, pacote Windows e `git diff --check` passaram. Pacote gerado em `release/CAPS-20261112-150303-win-x64/`; sem abertura ou partida manual. Sem commit, push, publicação ou backup. Próximo passo: iniciar o próximo protagonista com as etapas de fontes, características e aprovação, sem antecipar a árvore.

#### Conferência adicional do Windows — 12/11/2026

A pedido do autor, confirmei que o executável e os talentos estão no pacote Windows e que as artes base, evoluída e de maestria têm hashes idênticos aos arquivos aprovados do projeto. Nenhuma substituição foi necessária; o pacote já continha a versão atual. Sem execução manual do aplicativo.

#### Referência para próximas expansões — 12/11/2026

Fluxo solicitado pelo autor registrado em [PROCESSO_EXPANSAO_PERSONAGENS_E_CARTAS](../design/PROCESSO_EXPANSAO_PERSONAGENS_E_CARTAS.md) e indexado em [INDEX](INDEX.md). Usá-lo para cada novo protagonista/ciclo de cartas; continuar um personagem por vez e respeitar as aprovações de cada etapa. Ele complementa as especificações de Thalion e Lázaro sem substituir suas decisões.

## Complemento de continuidade — deck inicial por maestria 15 — 12/11/2026

Implementação aprovada em DEC-039 e especificada em [deck inicial por maestria 15](superpowers/specs/2026-11-12-deck-inicial-maestria-15.md). Editor na preparação aplica a loadout somente em novas aventuras; salva por perfil, mantendo o pacote característico de seis cartas e tamanho original do protagonista. Testes integrais (494/494), TypeScript e build passaram. Sem pacote Windows nem QA manual. Nenhum commit, push, publicação ou backup. Preservar as alterações locais preexistentes.

#### Artes aprovadas de Arcata e pacote Windows — 12/11/2026

O autor aprovou as duas artes de Arcata para as cartas base e evoluída (DEC-040). Foram integradas em `public/art/arcata-card.png` e `public/art/arcata-evolved.png`. Pacote portátil para teste: `release/CAPS-ARCATA-JUPITER-20261112-191610-win-x64/C.A.P.S.exe`, SHA-256 `96EEB14AED926FC51FB162F4BE3B9A58955338CB5E987A8E1EE8317E00C02CD0`. Typecheck, build Vite e smoke Electron isolado passaram; não houve teste automatizado nem inspeção visual jogando. Sem commit, push, publicação ou backup.

#### QA interativo concluído — deck inicial por maestria 15 — 12/11/2026

Playwright no browser local em contexto isolado `caps-deck-qa-2026-11-12`, viewport 960×700. Abe nível 15 editou deck de 20 cartas: pacote de seis permaneceu fixo, uma cópia removida/contagem corrigida, uma carta `enemyOnly` possuída e regional foi adicionada, save persistiu após reload, e nova run iniciou com as 20 cartas. O primeiro combate abriu mão inicial com essa carta na sessão do J1. A conferência detectou e corrigiu o fechamento do painel ao redesenhar, agrupamento duplicado e bloqueio incorreto da carta na validação de saves de runs. O validador permite a identidade inimiga apenas se consta no loadout inicial validado; DEC-017 segue em outros fluxos. Resultado final: 495/495 testes, TypeScript, build Vite temporário e `git diff --check` passaram; zero erros de console. Contexto descartável; nenhum save real tocado. Sem pacote Windows, commit, push, publicação ou backup.

#### Pacote Windows e fechamento do arco — 12/11/2026

Pacote portátil gerado em [C.A.P.S.exe](../release/CAPS-20261112-174458-win-x64/C.A.P.S.exe), SHA-256 `96EEB14AED926FC51FB162F4BE3B9A58955338CB5E987A8E1EE8317E00C02CD0`. Empacotador validou SHA oficial do Electron 45.2.1; bundle e seis artes Thalion/Lázaro conferidos. Smoke em cópia isolada do pacote abriu home com `ok:true`/exit 0 e saves reais comparados sem divergência. Arco do deck inicial concluído: interação no browser e smoke de abertura Windows conferidos. A partida real completa no Windows não foi jogada. Sem commit, push, publicação ou backup; preservar o status local preexistente.

#### Arraste para a mesa e declaração de ataque — 12/11/2026

Cartas podem ser arrastadas da mão ao campo para jogar sem botão extra quando a jogada estiver válida. No modo de ataque, a linha da mesa recebe unidades por arraste/clique; o painel tem somente voltar ou declarar, sem lista de nomes ou seletor de equipamento. QA real no navegador isolado declarou ataque sem erros. Suíte 499/499, typecheck, build Vite e `git diff --check` passaram. Detalhes em [PROGRESS](PROGRESS.md). Sem pacote, commit, push, publicação ou backup.

#### Atualização do pacote Windows — 12/11/2026

Pacote da correção disponível em [C.A.P.S.exe](../release/CAPS-20261112-drag-attack-win-x64/C.A.P.S.exe). SHA-256 `96EEB14AED926FC51FB162F4BE3B9A58955338CB5E987A8E1EE8317E00C02CD0`; smoke isolado abriu home (`ok:true`, exit 0). Build temporária preservou `dist`; sem commit, push, publicação ou backup.

#### Correção de cartas que não entravam ao soltar — 12/11/2026

A mesa inteira agora aceita drop de cartas durante ações normais, não apenas a área de campo próprio; a linha exclusiva do modo de ataque permanece separada. Prévia ampliada de carta removida da tela de batalha. Testes completos passaram (92 arquivos/500 testes), junto de typecheck, build e smoke Electron isolado. Pacote atualizado em `release/CAPS-20261112-DROP-FIX-win-x64/C.A.P.S.exe`. Automação do navegador excedeu o tempo, então não foi possível repetir o arraste interativo nesta rodada. Sem partida completa, commit, push, publicação ou backup.

#### Painel de batalha simplificado — 12/11/2026

Painel de ação da jogada comum agora mantém apenas os botões essenciais; nome, instruções e seletor de posição saíram. Alvos comuns são selecionados clicando no tabuleiro; escolhas que preservam regras existentes aparecem somente quando obrigatórias. “Como jogar” fica dentro do menu de opções e o menu fecha com clique externo. TypeScript/build passaram; teste automatizado e conferência interativa não executados. Pacote local: `release/CAPS-20261112-ACTION-PANEL-win-x64/C.A.P.S.exe`. Sem commit, push, publicação ou backup.

#### Escolha de aliado ilustrada — 12/11/2026

Recrutamento pós-vitória redesenhado após aprovação do autor: três ofertas ilustradas simultâneas, inspiradas na seleção de recompensa do vídeo LoR. Cada oferta mostra retrato de protagonista, regiões, pacote com miniaturas de cartas e duas cópias por identidade. Regras e pacotes permanecem iguais. TypeScript e build passaram; não houve teste automatizado nem inspeção visual interativa. Sem pacote Windows, commit, push, publicação ou backup.

Pacote Windows local para conferir o recrutamento: `release/CAPS-20261112-RECRUIT-LO-REWARD-win-x64/C.A.P.S.exe`. Build incluída conferida por SHA-256; smoke de abertura e conferência visual no Windows permanecem pendentes.

#### Continuidade — loja e mana — 12/11/2026

`src/ui/shop-view.ts` e o bloco de loja em `src/ui/hub.css` foram refinados para uma vitrine de aventura inspirada em LoR, com arte ampliada, raridade, descrição e preço; o fluxo e regras de compra seguem os existentes. O medidor da batalha usa `public/art/mana-rail.svg` em `src/ui/styles.css`, com o valor acima dos dez pips para evitar extrapolar a placa estreita. `src/ui/tactical.css` e `battle-polish.css` removem larguras fixas conflitantes dos pips. Verificados: typecheck, build temporária `tmp/shop-mana-build-20261112`, diff check. Não houve testes automatizados, inspeção no navegador/executável nem pacote Windows. Nenhum commit, push, publicação ou backup; preservar as alterações locais anteriores.

Pacote Windows para o autor testar: `release/CAPS-SHOP-MANA-20261112-190023-128-win-x64/C.A.P.S.exe`, SHA-256 `96EEB14AED926FC51FB162F4BE3B9A58955338CB5E987A8E1EE8317E00C02CD0`. Smoke em cópia descartável abriu a home com `ok:true` e exit 0; nenhuma partida/loja foi testada interativamente. Há duas pastas de tentativas incompletas (`...185832...` e `...190006-671...`); a pasta válida é `...190023-128...`. Sem commit, push, publicação ou backup.

#### Continuidade — Júpiter, hover e artes de Arcata — 12/11/2026

Júpiter passou a ser selecionável e cria uma rota usando os cinco decks aprovados; eventos narrativos e o desfecho do funeral seguem pendentes por falta de condição/regra aprovada para a travessia. Cartas da loja agora reutilizam `cardFace` na faixa de imagem. Hover/foco atualiza uma prévia lateral temporária fora do menu. Artes base/evoluída de Arcata estão apenas como candidatas em `design/art-proposals/arcata`; aprovação do autor é necessária antes da integração. Typecheck/build passaram; sem testes automatizados, inspeção visual ou pacote Windows. Sem commit, push, publicação ou backup.

## Continuidade — animação e telas de batalha — 12/11/2026

A raiz continua `C:/Users/Bruxo/Documents/ChatGPT/Game`. Foram adicionadas animação visual de ataque ao Vínculo, página de resultado inspirada na imagem de referência, painel de eventos e escolha modal central para Upgrades do Abe. DEC-041/042 registram os pedidos e limites. Typecheck, build Vite temporária e diff check passaram; prévia de três estados foi conferida no Playwright isolado. Suíte automatizada, partida com animação real, movimento reduzido e pacote Windows permanecem pendentes.

Candidatas de Rubel em `design/art-proposals/rubel/rubel-card-candidate.png` e `rubel-evolved-candidate.png`: base cotidiana simples; forma evoluída como transformação em avatar de Vitumirim. Ambas aguardam aprovação, seguem fora de `public/art` e não alteram lore. DEC-043.

Nenhum commit, push, publicação ou backup. Preservar o status Git preexistente e todas as outras alterações locais.

## Continuidade — Rubel, resultados e Kylast — 12/11/2026

Rubel aprovado/integrado como DEC-044; resultados reorganizados como DEC-046. A aprovação das duas artes de Kylast e integração base/evoluída estão registradas em DEC-047. Suíte anterior: 93 arquivos/504 testes; typecheck/build/diff-check passaram. Animação real observada no treino de Júpiter; detalhes e limitação do seed em PROGRESS. O pacote anterior `release/CAPS-20261112-200934-win-x64/C.A.P.S.exe` não contém Kylast recém-aprovado; gere e valide nova versão antes de publicar.

#### Fechamento do arco visual e lançamento — 12/11/2026

O autor aprovou as artes base/evoluída de Kylast. Foram integradas do acervo preservado de candidatas; `art()` alterna pela evolução. O lote de entrega deste arco inclui animação de ataque, telas de resultado, eventos, escolha de Upgrade do Abe, artes de Arcata/Rubel/Kylast e melhorias anteriores incluídas no pacote corrente. Rodar suíte, typecheck e build final, gerar pacote portátil Windows e validar smoke com `CAPS_SMOKE_USER_DATA` descartável. O autor autorizou commit, push e release GitHub neste chat; nenhum backup foi autorizado. Registrar hashes, tag, URL e asset após publicação. O smoke histórico que pode ter tocado metadata real está descrito acima; não repetir fora do perfil explicitamente isolado.

Nota de QA: um smoke anterior leu o `userData` real antes de se confirmar que `APPDATA` não o redirecionava; nenhuma ação de jogo ocorreu, mas o bootstrap pode ter escrito metadata de perfil ativo. Smoke final usa caminho explícito temporário. Sem commit, push, publicação ou backup. A sessão deixa mudanças locais anteriores intactas.

Resultado final local: 93 arquivos/505 testes passaram, typecheck/build/diff-check passaram. Pacote `release/CAPS-20261112-202643-win-x64/`, smoke isolado `ok:true`; executável SHA-256 `96EEB14AED926FC51FB162F4BE3B9A58955338CB5E987A8E1EE8317E00C02CD0`. ZIP portátil `release/CAPS-v0.1.0-playtest.8-win-x64.zip` (323.864.298 bytes), SHA-256 `A52C92FCCF68A75B9070583AA1C48025614F73194A2610CBE3B74745332C3B5A`. Tag planejada `v0.1.0-playtest.8`; registrar hash do commit, resultado real do push e URL/assets da Release após confirmar no GitHub.

#### Publicação concluída — 12/11/2026

Commit de produto `303847d` em `origin/main`; tag `v0.1.0-playtest.8` aponta para a versão testada. Release prévia publicada em https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.8 com ZIP portátil completo e manifesto SHA-256. O asset foi confirmado pelo endpoint público do GitHub com 323.864.298 bytes e SHA-256 `a52c92fccf68a75b9070583aa1c48025614f73194a2610cbe3b74745332c3b5a`. Nenhum backup foi feito.
