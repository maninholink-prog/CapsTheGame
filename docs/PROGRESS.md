# Progresso e pendências

Atualizado em 2026-11-03. Escopo desta sessão: infraestrutura documental, sem alterações no jogo.

## Verificado no projeto

- TypeScript/Vite/Vitest em [package.json](../package.json); módulos reais em [src/](../src/) e testes em [tests/](../tests/).
- Existem batalha, conteúdo, perfil/boosters, aventura/mapa, IA e interface nos respectivos módulos. Isso confirma presença de implementação, não valida todos os comportamentos descritos no [README](../README.md).
- Documentação de regras em [CAMPANHA](../CAMPANHA.md) e [design/](../design/); narrativa em [personagens/](../personagens/) e [referencias/](../referencias/). Fontes originais preservadas.
- Índices, decisões e continuidade criados nesta integração. Skills locais: lore-keeper e memory-manager; validação registrada no [HANDOFF](HANDOFF.md). Nenhum agente adicional configurado: o agente principal e as duas skills atendem ao escopo.

## Pendências confirmadas pelas fontes

- [Próximo lote de relíquias](reliquias-proximo-lote-pendente.md): pausado; confirmar nomes e artes com o autor antes de implementar.
- [README](../README.md): árvores dos demais protagonistas, 44 relíquias adicionais e fontes em eventos/relíquias inimigas descritas como pendentes. Reavaliar o código específico antes de retomar cada item.
- [Leitura narrativa](../referencias/youtube/LEITURA.md): cobertura ampla, não integral; episódio 46 ausente do inventário e lacunas preservadas. Não retomar automaticamente.
- [Projeção técnica](../design/PROJECAO_TECNICA.md) e planos antigos contêm estados anteriores; não atualizar apagando o histórico. Conferir documentos mais recentes e implementação.

## Infraestrutura ainda pendente

- Primeiro checkpoint integral do jogo: Git sem commits; arquivos preexistentes não rastreados. Revisar segredos, arquivos privados, binários e exclusões antes de adicioná-los.
- Remoto e branch de push autorizados: não configurados.
- Aprovar destino, horários e política de backup; implementar, executar e testar restauração somente em etapa posterior. Ver [proposta](BACKUP_POLICY.md).
- Confirmar descoberta das skills em nova sessão do Codex; os arquivos locais não provam ativação automática na sessão já aberta.
- Investigar em tarefa própria a suíte ampla que não concluiu nesta sessão, inclusive após excluir profile-run. Os 14 testes direcionados e TypeScript passaram; não há validação integral do jogo nesta entrega. Validador oficial das skills requer PyYAML, ausente no Python utilizado.

Próxima ação de infraestrutura: revisar o conjunto do primeiro checkpoint e aprovar a proposta de backup; não avançar mecânicas durante essa etapa.

## Pendencias de desenvolvimento — execucao suspensa neste ciclo

Complemento datado de 03/11/2026. Preserva os registros anteriores. O autor restringiu esta conversa à infraestrutura e memória; a lista abaixo serve apenas para recuperação futura, sem iniciar tarefas.

| Pendência | Status recuperado | Fonte e limite |
|---|---|---|
| Cinderela no deck de Abe | Proposta aprovada pelo autor nesta conversa; implementação não observada nos arquivos consultados | Aprovação após proposta de equipamento de custo 2, Oeste/Épica, +1 de dano normalmente e +3 total quando usada por Abe evoluído; substitui as duas Armas Aprimoradas no starter, mantendo a carta antiga no catálogo. Evolução permanece por seis Upgrades. Este resumo é referência de aprovação, não mudança no jogo. |
| Árvore de Abe | Quinze efeitos mantidos provisoriamente; aplicação não observada | [Documento existente](../design/ABE_MAESTRIA_PROVISORIA.md). O usuário forneceu duas referências visuais nesta conversa; desenhos posteriores exigem recuperar essas fontes, não inventar aparência. Não copiar aqui os quinze efeitos. |
| Cinco novas palavras-chave | Inclusão aprovada; interações e implementação pendentes | [Catálogo existente](../design/PALAVRAS_CHAVE_CATALOGO.md): Barreira, Sobrepujar, Desafiar, Regeneração e Roubo de Vida. Aplicação em cartas existentes foi adiada pelo autor. |
| Relíquias seguintes | Lote pausado e associações ao Drive pendentes | [Registro preservado](reliquias-proximo-lote-pendente.md). Não inferir nomes/artes por aparência. |
| Outras maestrias e conteúdo | Pendências históricas, a reavaliar quando autorizadas | [README](../README.md), design/ e fontes indexadas. Não tratar descrição antiga como diagnóstico atual. |
| Diagnóstico da suíte ampla | Limitação registrada na integração documental anterior | [AUDIT](AUDIT.md). Os resultados históricos de testes de outras entregas não substituem nova execução quando necessária. |

## Complemento da revisão documental — 03/11/2026

Somente os oito documentos/caminhos anunciados ao autor receberam complementos. Conteúdo anterior preservado; organização por links e seções, sem duplicar lore, regras ou políticas. Git/backups novamente consultados, sem ativação de proteção. A instalação local das skills continua sem dependências adicionais. A verificação final de preservação e recuperação está no complemento de [AUDIT](AUDIT.md).

Próxima ação deste escopo: conferir o relatório documental e o cwd persistente do chat. Checkpoints, pushes e backups permanecem proibidos neste ciclo; desenvolvimento exige retomada explícita do autor.

## Retomada de desenvolvimento de Abe — 03/11/2026

Pedido explícito do autor retoma Abe e Cinderela; a suspensão de produto acima pertence ao ciclo documental anterior. Conexões da árvore aprovadas e acrescentadas à [proposta existente](../design/ABE_MAESTRIA_PROVISORIA.md). [Plano de aplicação](superpowers/plans/2026-11-03-abe-maestria.md) preparado; implementação pendente. Nesta etapa somente documentação foi alterada. Nenhum teste do jogo executado, commit, push ou backup realizado.


## Maestria de Abe e pacote Windows — 04/11/2026

Abe tem os quinze talentos provisórios no Perfil e na aventura. Cinderela substitui Arma Aprimorada em novos starters, preservando decks salvos. Checagem TypeScript, 62 testes direcionados em seis arquivos e build Vite passaram. Suíte ampla interrompida sem resumo final, inclusive na tentativa sem profile-run. O pacote [C.A.P.S.exe](../release/CAPS-20261104-054758-win-x64/C.A.P.S.exe) passou no teste de abertura e teve a janela nativa confirmada. Compra e redistribuição foram verificadas em testes, sem exercício manual na janela. Sem commit, push ou backup.


## Interface de maestria e batalha — 04/11/2026

Adicionados menu de Maestria por personagem e telas de início, vitória, derrota e empate na aventura e no treino. As telas usam os componentes do menu existente. TypeScript, 28 testes direcionados e geração do pacote Windows passaram. Interação completa no executável ainda não foi exercitada.


Arte da oficina fornecida pelo autor, com 15 nós interativos e ligações geradas pelos pré-requisitos. Em telas menores, os talentos aparecem como lista. TypeScript e 12 testes de maestria, salvamento e telas passaram após essa alteração. O pacote final inclui a imagem original.

A prévia pública de Abe e Cinderela foi publicada como [v0.1.0-playtest.1](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.1), vinculada ao commit 7b1e447. O ZIP portátil teve integridade e SHA-256 conferidos. As telas novas e a imagem de maestria fazem parte do pacote local posterior.

## Interface sem rolagem — 04/11/2026

O autor aprovou novas abas para acomodar o conteúdo na janela. Perfil tem abas de dados, marcos e registro. Coleção, relíquias e listas longas usam páginas. Maestria separa retratos e árvore, com detalhes ao lado da arte em janelas largas. O conteúdo se ajusta à altura e à largura da janela. TypeScript, 29 testes direcionados e empacotamento passaram. A inspeção visual em diferentes tamanhos continua pendente. Pacote local em [C.A.P.S.exe](../release/CAPS-20261104-062534-win-x64/C.A.P.S.exe). O tutorial do Windows foi publicado no README no commit dd8ff37.

## Maestria de Arcata — 04/11/2026

Quinze talentos aprovados e implementados. Chama Persistente encerra Combustão no nível 30. A árvore utiliza a arte aprovada, e o motor mantém a evolução por seis magias de Fogo. TypeScript, 64 testes direcionados, build e presença da árvore no pacote passaram. A inspeção visual do executável ainda está pendente. Sem commit ou push desta atualização.

Publicação de Arcata: código no commit 734aa67 e [prévia pública v0.1.0-playtest.2](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.2). ZIP verificado por integridade, tamanho e SHA-256 após o envio.

## Aba Artefatos — 04/11/2026

A coleção ganhou a aba Artefatos. A grade usa ícones compactos e um painel de detalhes acionado por mouse, teclado ou toque. Efeitos continuam ocultos até a descoberta. Excalibur, Deméter e Talarian Boots receberam símbolos próprios de interface. Os demais usam um marcador até a definição de suas artes. TypeScript, 23 testes direcionados e build passaram. A inspeção visual no executável ainda está pendente.


## Maestria de Rubel e Artefatos — 04/11/2026

Quinze talentos integrados com a arte aprovada. Coleção → Artefatos usa ícones provisórios e esconde o efeito até a descoberta com ????? e a mensagem de bênção. TypeScript, 71 testes direcionados, build e integridade do ZIP passaram. Conferência visual manual pendente.

## Perfil do jogador — 04/11/2026

Resumo com apelido, retrato e moldura persistentes, totais de cartas e maestria e Top 3 por partidas elegíveis. Histórico separado do registro de recompensas, com Aventura e Treino a partir da atualização. TypeScript, 31 testes direcionados e build passaram. Pacote Windows local montado com o Electron em cache após conferência de SHA-256. Playtest manual e inspeção visual do novo pacote pendentes. Sem commit, push ou backup.

## Nova tela inicial — 04/11/2026

Menu lateral, brasão do perfil, moedas reais e atalhos para Aventura, Treino e Marcos semanais. As duas artes aprovadas se alternam a cada abertura. TypeScript, 23 testes direcionados e build passaram. O pacote inclui ambas as artes e os sete tamanhos do ícone foram conferidos nos recursos internos do executável. Inspeção visual no Windows pendente. Entrega local.

## Navegação lateral e revisão visual — 04/11/2026

Menu lateral compartilhado entre Início, Aventura, Coleção, Maestria, Boosters e Perfil. Artefatos mantém Coleção destacada. Ajustados os rótulos, o foco por teclado, a área de conteúdo e o enquadramento das artes provisórias. TypeScript, build e 26 testes direcionados passaram. Teste interativo no navegador bloqueado pela política de execução e conferência visual do executável pendente. O autor pediu revisão futura da qualidade gráfica dos dois fundos. Entrega local.

## Revisão visual, etapa 1 — 04/11/2026

Artes Jade e Brasa em composição 16:9, alternadas por abertura. Símbolo do dragão de jade na barra e ícones maiores. Aventura abre com um painel e revela protagonista, dificuldade e artefato inicial em Preparar aventura. Uma jornada ativa exibe protagonista, dificuldade, saldo e retomada. TypeScript, 27 testes direcionados e build passaram; assets presentes no pacote local. Inspeção visual e interação no executável pendentes.

## Revisão visual, etapa 2 — 04/11/2026

Preparação de Aventura com retratos existentes e cartões compactos; alinhamento da barra lateral. Coleção com rolagem e bússolas de região e raridade. Maestrias com arte em largura integral, painel de talento sobreposto em janela larga e detalhes junto da lista em janela estreita. Boosters com embalagem e ações existentes. Perfil com brasão e retratos maiores. TypeScript, 30 testes direcionados e build passaram. Pacote Windows local gerado; inspeção visual manual pendente.

## Prévia de encontro — 04/11/2026

Nós disponíveis de combate da rota do Dr. Félix abrem uma prévia com adversário e vida dos Vínculos. O chefe final explica suas duas fases. A confirmação usa a entrada de batalha existente e a apresentação mostra o confronto antes da mão inicial. TypeScript, build e 30 testes direcionados passaram. Pacote Windows local gerado. Interação e visual no executável pendentes.

## Mapa em tela cheia — 04/11/2026

Mapa sem redução global, com rolagem, enquadramento do primeiro nó ou posição atual, retrato do protagonista, destaque de caminhos disponíveis e rodapé de recursos e deck. Mantida a prévia de combate. TypeScript, 35 testes direcionados nas cinco dificuldades e build passaram. Pacote Windows local gerado. Conferência visual e interação manual pendentes.

## Arena de batalha estável — 04/11/2026

Retaguardas, faixa de combate e mão têm dimensões reservadas pela janela. A rolagem do painel lateral e dos confrontos substitui o redimensionamento global por conteúdo. TypeScript, build e 33 testes direcionados passaram. Medições em Electron isolado a 1440×960 e 960×700 confirmaram a geometria estável após selecionar carta e preencher a faixa com cinco confrontos simulados. Partida completa e inspeção visual manual pendentes. Entrega local.

## Loja e mão em leque — 04/11/2026

Loja em tela própria, saldo no cabeçalho, ofertas e serviços separados e ações de saída fixas. Na batalha, a coluna lateral virou comandos abaixo da mão e painel Informações sob demanda. Mão em leque, sem J1 contra IA; barras visíveis da mão e do campo retiradas. TypeScript, build e 24 testes direcionados passaram. Electron isolado em 1440×960 e 960×700 verificou a geometria, a confirmação da mão e a ausência das barras visíveis apontadas. Compra e partida completa no pacote ainda aguardam conferência manual.

## Leitura das cartas e tela cheia — 04/11/2026

Mão em leque com descrição compacta e prévia completa por ponteiro ou foco. A orientação da ação padrão passa pelo botão Como jogar. Tela cheia habilitada somente para a janela local do jogo. TypeScript, build e 15 testes direcionados passaram. Electron isolado verificou a prévia em duas resoluções e entrada e saída de tela cheia. Conferência visual no pacote pendente. Entrega local.

## Indicadores da arena — 04/11/2026

Medalhão e destaque do lado com prioridade. Efeitos pendentes em sigilos numerados na faixa central, com inspeção pela pilha. Faixa inferior simplificada e instrução de bloqueio recolhida. TypeScript, build e 12 testes direcionados passaram. Inspeção visual manual pendente.

## Artes de Abe e pacote de publicação — 04/11/2026

Integração das artes aprovadas em Cinderela, Engineering, Aranha Arranha, Abe (base e evoluído), Zacarias, Keegan, Gremin, Lúcia, Defesa Aprimorada, Projeto e Gênio Relâmpago. O renderizador reaproveitado atende coleção, carta, mão e prévia; a forma evoluída de Abe usa `abe-mastery.png`. Arte editável anterior de Engineering preservada. IDs, efeitos e balanceamento não foram alterados.

TypeScript (`tsc --noEmit`) e build Vite passaram. Pacote Windows gerado em `release/CAPS-20261104-212508-win-x64`. A tela inicial abriu no Electron. A interação da janela foi interrompida por atividade do usuário; a inspeção manual das cartas na mão e na prévia ampliada permanece pendente. A suíte ampla anterior terminou com 379/381 testes: dois testes de UI esperam rótulos/ações antigos (`hub-unlock-test` e `Mapa Comum`); sem alterações para acomodar essas expectativas nesta entrega. ZIP `.4` será publicado junto com o commit.

### Complemento de publicação — v0.1.0-playtest.4

Código publicado na `main` (commit `d44c701`); release de playtest e tag disponíveis em [GitHub](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.4). Devido à interrupção de uploads grandes, o ZIP de 217 MB foi dividido em cinco assets abaixo de 50 MB e acompanhado pelo `.cmd` de junção. Os seis assets aparecem como `uploaded`; tamanhos e digests retornados pelo GitHub foram comparados localmente. A concatenação das cinco partes recriou o mesmo SHA-256 do ZIP original. README e notas da release explicam a montagem. Sem backup; publicação remota concluída.
