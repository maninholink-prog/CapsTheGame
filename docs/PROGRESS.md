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
