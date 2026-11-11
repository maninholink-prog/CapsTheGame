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
- [Projeção técnica](../design/PROJECAO_TECNICA.md) e planos antigos contêm estados anteriores; não atualizar apagando o histórico.Conferir documentos mais recentes e implementação.

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

## Design das cartas inspirado na referência de LoR — 05/11/2026

O autor confirmou que as artes aprovadas funcionam e autorizou aproximar o design das cartas da referência visual fornecida (guia Vandal de cartas e regiões). Novo rosto compartilhado na coleção, mão e prévia ampliada: custo em medalhão, arte em destaque, nome e descrição sobre faixa escura, região e gema na base, ataque/vida em cantos opostos; moldura dourada de campeão, recorte circular de magia e contorno próprio de equipamento. Imagens, IDs, efeitos, dados e balanceamento preservados. A revisão das demais telas permanece pausada.

TypeScript, oito testes direcionados em três arquivos, build Vite e git diff --check passaram. Inspeção parcial da coleção no navegador realizada; ajuste posterior de cor dos nomes e espaço para texto longo passou novamente nas verificações, mas não recebeu nova inspeção visual. Mão/prévia no executável e diferentes resoluções ainda aguardam conferência. Pacote local separado em release/CAPS-cartas-molduras-local-win-x64; arquivos novos do build conferidos no pacote. Nenhum commit, push, publicação ou backup. public/art/engineering.png já estava não rastreado e foi preservado.

### Equipamentos — referência complementar, 05/11/2026

Autor forneceu imagem dos equipamentos de LoR como complemento à direção visual. CSS dos equipamentos ajustado: aro circular na ilustração, moldura metálica clara, painel inferior escuro com identificação e bônus de dano junto à divisão da arte. Nenhum bônus de vida foi criado: dados atuais preservados. TypeScript, dois testes do componente, build e diff --check passaram. Inspeção visual deste ajuste no executável pendente. Novo pacote local separado: release/CAPS-equipamentos-local-win-x64, com presença do CSS novo conferida. Sem commit, push, publicação ou backup; imagens e alterações locais anteriores preservadas.

## Ícones regionais aprovados e integrados — 05/11/2026

Cinco ícones aprovados pelo autor; decisão REGIOES-01 em DECISIONS. Prancha preservada integralmente em public/art/regions/approved-symbols.png. O HTML usa janelas SVG sobre as versões monocromáticas da imagem original, sem redesenhar nem modificar os pixels; o fundo escuro é combinado por CSS. Cartas da coleção, mão, prévia e indicador expansível de região recebem os ícones, respeitando a dupla região dos protagonistas. Dados, IDs, efeitos e artes anteriores preservados.

TypeScript, quatro testes direcionados em dois arquivos, build e diff --check passaram. Prancha do pacote conferida por SHA-256 contra a fonte local; isso é verificação de empacotamento, não backup. Pacote separado: release/CAPS-regioes-local-win-x64. Leitura e enquadramento no tamanho real da interface ainda precisam de inspeção visual; integração técnica não comprova legibilidade. Sem commit, push, publicação ou backup.

## Escolha inicial e mana sobreposta — 05/11/2026

Autor aprovou a estrutura da tela de criação de perfil e pediu acabamento visual; posteriormente pediu o custo de mana sobrepondo a carta. Alterações CSS limitadas à escolha inicial e à composição compartilhada das cartas. Escolha mantém oito protagonistas, nome de perfil, ações e textos; painéis têm gradientes discretos, acentos dourados, nomes destacados, numeração decorativa, botões alinhados e foco visível. Mana recebe camada superior e deixa de ser cortada pela borda arredondada; recorte da arte continua próprio. IDs, efeitos, valores de mana e dados de perfil preservados.

TypeScript, sete testes direcionados em dois arquivos, build e diff --check passaram. Prévia isolada da escolha inicial inspecionada no navegador; Defesa Aprimorada, Cinderela e Abe mostraram medalhão inteiro à frente da carta. Prévia usa renderizadores reais sem criar/apagar perfis. Resoluções menores e mão em partida no executável ainda não conferidas. Pacote local separado release/CAPS-mana-e-escolha-local-win-x64, CSS atualizado presente. Sem commit, push, publicação ou backup.

## Letras de região e proposta de limpeza de releases — 05/11/2026

Autor pediu retirar letras junto dos símbolos e limpar pacotes antigos. Letras removidas do indicador expansível da coleção; nomes acessíveis, título e detalhes preservados. TypeScript, quatro testes em dois arquivos e build passaram. Pacote consolidado local em release/CAPS-atual-win-x64, build atualizado presente. Próximas entregas devem evitar acumular pacotes integrais de testes sem necessidade.

Limpeza preparada, ainda NÃO executada. Lista exata e tamanhos em release-cleanup-2026-11-05.json. Proposta mantém apenas o pacote atual e o ZIP público playtest.4 dentro de release; remove pacotes intermediários, ZIPs antigos e partes/concatenador redundantes. CRC de todas as 112 entradas do ZIP .4 passou; isso não equivale a backup/restauração do projeto. AGENTS exige aprovação da configuração concreta de exclusões por retenção; aguardando autor. Nenhum arquivo excluído, commit, push, publicação ou backup. Demais alterações locais preservadas.

## Pendência visual: retratos e seleção de protagonistas — 05/11/2026

Pedido do autor registrado em DECISIONS, HEROIS-VISUAL-01: mostrar retratos junto dos nomes dos heróis em Preparar aventura e selecionar protagonistas por imagens em lugar de lista textual. Somente registro nesta etapa; implementação, identificação dos seletores afetados e conferência de cobertura das artes ainda pendentes. Nenhum código, imagem, pacote ou perfil alterado nesta etapa; nenhuma execução de testes do jogo necessária para este acréscimo documental.

### Correção de estado da limpeza de releases — 05/11/2026

Após a proposta anterior, o autor aprovou explicitamente a lista de limpeza (“Pode”). A tentativa de comando foi rejeitada pela política de execução antes de iniciar; nenhum dos alvos foi excluído e a verificação prévia desse comando também não chegou a executar. Portanto, a pendência é de execução bloqueada, não de aprovação do autor. O arquivo JSON da proposta conserva o estado anterior e não constitui registro de execução. Não houve commit, push, publicação ou backup.

## Finalização das cartas e arena — 07/11/2026

Pedido retomado pelo autor: uniformizar dimensões das cartas, substituir a faixa de ações por controle circular lateral, destacar vidas, reorganizar combate e aplicar retratos/seleção por imagens do registro HEROIS-VISUAL-01. Implementado nos renderizadores e CSS existentes: prévias com altura fixa por faixa de tela, coleção com altura fixa; arte e texto não determinam mais o tamanho externo. Unidades em campo com formato horizontal, arte e ataque/vida nos cantos. Pares atacante/bloqueador permanecem vinculados e a faixa de seleção não cobre os atributos. Vidas dos Vínculos com medalhões maiores vermelho/azul; painel lateral mantém comandos e formulários existentes. Regras, efeitos, IDs e balanceamento preservados.

Retratos existentes incluídos nos painéis de escolha inicial/aventura; seletor textual de protagonista do treino substituído por oito opções visuais com radio buttons acessíveis. Kylast, Abe, Arcata e Rubel usam artes já disponíveis; Youro, Kuara, Thalion e Lázaro ainda usam marcadores provisórios por ausência de retrato aprovado no acervo consultado. Nenhuma imagem gerada ou substituída nesta etapa.

Validação desta retomada: TypeScript, 45 testes direcionados em seis arquivos, build Vite e diff --check passaram. Prévia isolada com renderizador real conferida no navegador a 1280×720: vidas, pares de combate, controle circular e seletor por imagens. Medidas reais de magia/equipamento/campeão na coleção confirmaram 220×360 em todos os três. A última redução do centro para janelas baixas e a retirada da faixa redundante de combate foram compiladas/testadas; partida completa e várias resoluções ainda não exercitadas. Pacote CAPS-atual-win-x64 atualizado no mesmo local, sem nova pasta de release; todos os arquivos do build comparados por SHA-256 com o pacote. O executável atualizado não foi aberto nesta retomada.

Documentação anterior preservada por acréscimo. Sem commit, push, publicação, backup ou novas exclusões. Limpeza antiga continua bloqueada conforme registro anterior; não declarar concluída. Próximo: conferência do autor no executável e aprovação do acabamento da arena; retratos faltantes exigem arte aprovada.

## Raios de alvo das magias — 09/11/2026

Após teste de campo com colegas, o autor pediu indicação visual do alvo das magias inimigas inspirada em LoR. A arena liga o símbolo de cada efeito pendente aos destinos conhecidos com um raio animado. Oponentes usam laranja com destaque no destino e o lado observado usa azul. O indicador cobre unidades, Vínculos, efeitos na pilha e múltiplos destinos. Efeitos de área usam os destinos atuais. Sorteios ainda ocultos não recebem um raio antecipado. A preferência por movimento reduzido mantém o indicador estático.

TypeScript, 12 testes direcionados em quatro arquivos, build Vite e diff --check passaram na retomada. A prévia isolada no navegador mostrou três raios simultâneos e três alvos destacados, incluindo duas unidades e um Vínculo. Captura em tmp/spell-target-rays.png. Pacote CAPS-atual-win-x64 atualizado no mesmo local e arquivos do build comparados por SHA-256. Partida completa no executável e magias de resolução imediata ficam fora da conferência deste indicador da pilha. Sem commit, push, publicação ou backup.

## Publicação do playtest.5 — 09/11/2026

O autor pediu a publicação da última atualização. A `main` e a tag `v0.1.0-playtest.5` apontam para `92b9c4c`. A [prévia pública](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.5) reúne os raios de alvo, o ajuste das cartas, a arena e o seletor visual. Os cinco segmentos do pacote Windows e o script de junção foram confirmados no GitHub por tamanho e SHA-256. O ZIP local passou na verificação de CRC e a junção das partes reproduziu `6e5a4d402b36080c0d97634cdb72adb282fbb2b6f9df3ed90ecf31f92c74e6e9`. TypeScript, 17 testes direcionados e build passaram nesta publicação. Partida completa no executável ainda pendente. Os registros locais anteriores, a lista de limpeza e a imagem avulsa de Engenharia ficaram fora do commit.


## Playtest dos raios — retorno do autor, 09/11/2026

O autor confirmou que os raios funcionaram no seu playtest. O relato confirma o funcionamento geral. A cobertura de múltiplos alvos, do Vínculo e do desaparecimento após a resolução ficou sem registro individual nesta rodada. A captura anterior de duas unidades e um Vínculo corresponde à prévia no navegador. O executável local abriu nesta sessão; a partida foi testada pelo autor.

## Três novos encontros do Dr. Félix — 09/11/2026

Oficina de Bobinas pressiona o Vínculo com o Carrasco equipado e a Lâmina de Bobina. Enfermaria Experimental combina suturas, proteção e cirurgias. Câmara de Descarga usa o Pulso do Laboratório para atingir os dois campos. Cada novo deck usa 20 cartas do catálogo existente. Servos, fases finais, decks anteriores e valores por dificuldade foram preservados.

Novas jornadas sorteiam entre seis encontros comuns. A leitura dos saves aceita a distribuição anterior e a atual, verificando cada uma pela semente. TypeScript, 56 testes direcionados e build passaram. Os testes incluem combate automatizado nos novos encontros e recuperação de uma batalha com a distribuição anterior. O [pacote Windows atual](../release/CAPS-atual-win-x64/C.A.P.S.exe) recebeu o build, com 36 arquivos conferidos por SHA-256. Partidas humanas no pacote e ajuste fino dos novos decks seguem pendentes. Sem commit, push, publicação ou backup.

## Retorno do playtest do Dr. Félix — 09/11/2026

O autor informou que já testou a atualização dos encontros. O relato confirma a realização do playtest, com cobertura por encontro e resultados de equilíbrio sem detalhe. O balanceamento das cartas fica para a etapa final do desenvolvimento, conforme [BALANCEAMENTO-01](DECISIONS.md#balanceamento-01--revisão-final-das-cartas--09112026).

## Design da Caveira Dourada — 09/11/2026

Rota, segredo do Capitão e 18 conceitos de cartas consolidados em [Aventura da Caveira Dourada](../design/AVENTURA_CAVEIRA_DOURADA.md). Os dois lotes somam 16 cartas e as criaturas da travessia acrescentam duas. Efeitos do Tubarão e do Megalodonte em proposta. Etapa documental, sem implementação no jogo.

Os 18 textos e as seis listas propostas estão no [design da Caveira Dourada](../design/AVENTURA_CAVEIRA_DOURADA.md#textos-de-carta-e-montagem-dos-decks--proposta-de-09112026). Conferidos os tamanhos 20/20/26/26/30/30 e o limite de duas cópias por identidade. Decks ainda sem implementação.

## Cartas da Caveira Dourada em treino — 10/11/2026

As 18 cartas inimigas e os seis decks foram integrados ao seletor Adversário do treino. Custos provisórios e atributos em [Aventura da Caveira Dourada](../design/AVENTURA_CAVEIRA_DOURADA.md#custos-provisórios-aplicados--10112026). A Maldição do Osso Roído dura até o fim da rodada seguinte à resolução. As cartas são exclusivas de encontros. O Capitão está disponível para teste no treino. Rota da aventura, pista e acesso secreto ainda pendentes.

TypeScript, 63 testes direcionados e build passaram. Os testes incluem partidas completas simuladas contra os seis decks, canhão e investida do Megalodonte, duração da maldição e recuperação de equipamento. O pacote Windows local recebeu o build com 36 arquivos conferidos por SHA-256. Inspeção manual do executável e balanceamento pendentes. Sem commit, push ou publicação.

## Aventura da Caveira Dourada — 10/11/2026

Integrados o seletor de aventura, a Travessia, a prova opcional, a elite do Megalodonte, o Duelista, o General e o desvio do Capitão. A recompensa principal é registrada antes do desvio e permanece após qualquer resultado da abordagem. A retomada do mapa e da batalha secreta é persistida. Custos, atributos e efeitos mantidos conforme instrução do autor.

TypeScript, build e 77 testes direcionados passaram. Os testes cobrem os cinco tamanhos de rota, abertura do desvio com e sem pista, vitória e derrota do Capitão, restauração e recompensa única. Uma cópia Windows com o mesmo executável e build, usando um perfil separado, validou a interface da Travessia, a prova, a vitória sobre o General em cenários preparados, a retomada do mapa e a vitória contra o Capitão com e sem a pista. A verificação no Windows usou cenários preparados para os confrontos finais. O pacote local recebeu o build com 36 arquivos conferidos por SHA-256. Sem publicação.

## Ferramentas gratuitas de UI para o Codex — 10/11/2026

- UI/UX Pro Max 2.15.0 em `.agents/skills/ui-ux-pro-max/`. O instalador publicado não oferece dry-run. A geração foi executada em pasta vazia, com autorização, e apenas a skill principal foi copiada.
- Transitions.dev em `.agents/skills/transitions-dev/`, da revisão `20d70c1262bf721c0300c2946cbe1fc7605a555c`. Foi instalada somente a skill gratuita.
- Motion AI Kit 14.2.0 em `.agents/skills/motion/`. O MCP gratuito foi registrado em `.codex/config.toml`, com somente a busca de documentação habilitada.
- Playwright MCP 0.0.85 em `tmp/caps-tooling/playwright/`, registrado na configuração local com Edge em modo headless e perfil isolado. Pacotes temporários e saídas ficam sob `tmp/caps-tooling/`. O caminho absoluto do Node fornecido pelo Codex pode precisar de atualização após uma atualização do aplicativo.

O Codex descobriu as três skills e listou os dois MCPs como habilitados. A consulta de documentação do Motion e a navegação isolada do Playwright responderam. GSAP foi avaliado e não foi instalado. Nenhuma dependência foi adicionada ao jogo ou à configuração global.

TypeScript e 77 testes direcionados passaram. O build em pasta temporária gerou 36 arquivos idênticos aos do `dist`. As duas execuções amplas foram interrompidas sem resumo após reproduzir as falhas já registradas em `tests/playtest-unlock.test.ts` e `tests/ui/map-view.test.ts`. Os hashes do código, testes, assets, builds e configuração global conferidos antes e depois da instalação coincidiram. As alterações locais preexistentes foram preservadas.

**Reversão.** Remover apenas as três pastas de skills listadas acima e os blocos `[mcp_servers.playwright]`, `[mcp_servers.playwright.env]` e `[mcp_servers.motion]` da configuração local. O arquivo `.codex/config.toml` foi criado nesta instalação e pode ser removido se ainda contiver somente esses blocos. Depois, conferir o caminho e remover apenas a pasta `tmp/caps-tooling/`, criada para esta instalação. Nenhum reset ou limpeza do Git é necessário.

## Identidade visual do tabuleiro — 10/11/2026

O autor aprovou reproduzir a disposição completa do tabuleiro de Legends of Runeterra com cores e desenhos próprios do C.A.P.S. A arena agora mostra a mão fechada de J2 no topo, fileiras e linha de combate ao centro, mão jogável na base, Vínculos à esquerda e mana, reserva, deck e ação à direita. As metades usam cobre e jade. O renderizador mantém o pareamento de combate, alvos, controles e artes existentes; nenhuma regra, ID ou balanceamento foi alterado. Plano local em [tabuleiro visual](superpowers/plans/2026-11-10-tabuleiro-visual.md).

Na prévia do navegador pelo fluxo real de Treino contra IA, a mão inicial e o início da rodada foram inspecionados em 1440×960 e 960×700. Em 960×700, a mão termina em y=674 dentro da janela; os recursos ficam separados do botão de ação. Movimento reduzido foi emulado e a transição da mão ficou em 0 s. Capturas locais: `tmp/caps-board-1440c.png` e `tmp/caps-board-960b.png`; a captura de 1440 precede o último ajuste de altura, conferido depois por medidas de DOM (mão termina em y=910 de 960). Um cenário de bloqueio preparado com dois pares foi inspecionado separadamente em 1440×960 e 960×700 (`tmp/caps-board-combat-fixture-1440.png` e `tmp/caps-board-combat-fixture-960b.png`); a primeira captura precede o ajuste que separou ação e recurso. O cenário preparado não equivale a uma partida jogada. Na verificação final, 11 testes em quatro arquivos de UI, TypeScript, build Vite temporário e `git diff --check` passaram. Partida completa no navegador e qualquer interação no executável Windows não foram feitas. Nenhum pacote, commit, push ou backup foi criado.

## Acabamento visual e opções de batalha — 11/11/2026

O autor pediu remover o fundo azul e a faixa superior da arena, usar arte mais natural e reunir os controles num menu clicável com reinício e desistência. A faixa de topo foi removida; voltar ao início, reiniciar, desistir, modo, semente, nova batalha e protagonista ficam no menu de opções. A arena recebeu o fundo próprio de santuário em jade e cobre. Reiniciar preserva a semente e o contexto da batalha; desistir encerra a sessão pela liquidação existente. Regras e balanceamento não foram alterados.

Na prévia pelo navegador, o menu foi inspecionado em 960×700; reiniciar manteve a semente e desistir abriu o resultado de derrota em treino. Isso valida a prévia e os fluxos de confirmação, não uma partida completa nem o executável Windows. TypeScript e 17 testes direcionados de UI passaram; build Vite e `git diff --check` passaram.

Pacote portátil Windows criado em [C.A.P.S.exe](../release/CAPS-20261111-visual-win-x64/C.A.P.S.exe), em nova pasta para preservar as releases anteriores. O pacote contém os 37 arquivos de build e seus SHA-256 coincidem integralmente com `dist`; executável, ícone, instruções e novo fundo estão presentes. O SHA-256 do executável é igual ao de `CAPS-atual-win-x64`. A abertura nativa não foi validada: execução isolada com `--caps-smoke` e `--version` terminou com `0x80000003`, sem produzir o arquivo smoke; acesso ao log de eventos do Windows foi negado. Portanto, pacote foi montado e conferido, mas iniciar o jogo nele continua pendente. Sem commit, push, publicação ou backup; demais alterações locais preservadas.

### Diagnóstico de abertura nativa — 11/11/2026

Investigação do `0x80000003`: o Electron oficial 45.2.1 extraído do ZIP em cache (SHA-256 do ZIP confere com `SHASUMS256.txt`), a cópia de `CAPS-atual-win-x64` e o novo `C.A.P.S.exe` falham todos antes de iniciar a aplicação, tanto em `--version` quanto no smoke. A distribuição Electron completa também falha. Node 24.22.1 executa normalmente no mesmo ambiente. Uma tentativa com Electron mínimo emitiu `Invalid file descriptor to ICU data received` porque o teste inicial isolado não tinha `icudtl.dat`; repetido com runtime completo, o sintoma foi o breakpoint. `debug.log` preexistente menciona o crash handler sem processo no pipe (`TransactNamedPipe`, 0xE9). A leitura de Application Event Log foi negada pelo sandbox.

Conclusão sustentada: não há evidência de que o defeito esteja no build visual ou seja exclusivo do pacote novo; o runtime oficial de base também não abre neste ambiente controlado. A pasta final contém runtime, locale, ICU, app e arte; os 37 arquivos do build continuam idênticos a `dist`. A hipótese mais provável é restrição/incompatibilidade do lançamento do Electron no sandbox do Codex, mas a causa raiz ainda requer executar a mesma pasta fora deste sandbox, numa sessão Windows comum. Nenhum executável foi alterado e nenhuma instalação global foi feita.

### Correção após conferência na área de trabalho Windows — 11/11/2026

A sessão remota de Windows Computer Use encontrou a janela cujo processo pertence exatamente a `release/CAPS-20261111-visual-win-x64/C.A.P.S.exe`, título `C.A.P.S. — Coleção e aventuras`. A janela foi observada na tela inicial e operada até iniciar um Duelo de treino: mão inicial preparada, iniciativa lançada e rodada 1 exibida. Capturas nativas mostraram o tabuleiro cobre/jade, nova arte de fundo e menu com Voltar ao início, Reiniciar batalha, Desistir, modo, semente e protagonista. Isso confirma execução nativa e renderização do pacote no Windows, ao contrário da conclusão provisória acima. O teste usou uma partida de treino incompleta, sem finalizar o duelo; a janela foi deixada aberta para o autor. A evidência da interface é a janela real do executável, não a prévia do navegador.

As tentativas anteriores por `Start-Process`/CLI não eram uma verificação confiável de abertura: `--version` deixou um processo gráfico persistente e o singleton do Electron pode ter encerrado as tentativas seguintes, enquanto stderr também registrou cache sem acesso no contexto de shell. A interface nativa visível demonstra que esses códigos/erros não comprovavam falha de lançamento do pacote. O `main.cjs` original foi restaurado byte a byte depois de uma tentativa diagnóstica temporária; nenhum arquivo do pacote final foi modificado. Pacote, executável e dados do perfil não foram reinstalados ou substituídos.

## Versão visível na tela inicial — 11/11/2026

Em resposta à consulta do autor sobre Alpha ou Beta, a tela inicial agora mostra `ALPHA · v0.1.0` no canto inferior direito. Alpha foi escolhido porque o app ainda está identificado como protótipo 0.1.0 e o desenvolvimento de conteúdo segue ativo; o balanceamento continua reservado para a etapa final ([DECISIONS](DECISIONS.md#classificação-atual-da-versão--11112026)). Os metadados de pacote `0.1.0` não foram alterados.

Implementado no renderizador existente e no CSS da tela inicial. A prévia isolada do navegador foi conferida em 1440×960 e 960×700; o rótulo permaneceu visível abaixo das ações, sem cobri-las. TypeScript, quatro testes de `home-view.test.ts`, build Vite e `git diff --check` passaram. O build tem 37 arquivos, todos conferidos por SHA-256 e copiados para [o pacote Windows](../release/CAPS-20261111-visual-win-x64/C.A.P.S.exe). A cópia portátil anterior não foi substituída; os arquivos antigos com nomes de hash ficaram preservados no diretório do pacote. A janela Windows já aberta mantém o código carregado anterior e não foi reiniciada para preservar o duelo incompleto; reabrir o executável carrega o rótulo novo. Sem instalação global, commit, push ou publicação.

## Menu inicial reorganizado — 11/11/2026

A faixa horizontal aprovada reúne a ação principal de Aventura à esquerda e o seletor de adversário, Duelo de treino e Marcos semanais à direita. A navegação, perfil, saldos, opções e versão `ALPHA · v0.1.0` foram preservados. O cenário permanece na camada independente atual; nenhuma animação ou arte nova foi incluída. Em largura abaixo de 850 px, a faixa empilha os grupos.

A prévia isolada do navegador foi conferida em 1440×960 e 960×700; nesta última, a faixa e a versão ficaram dentro da janela sem sobreposição. Quatro testes focados de `home-view.test.ts`, TypeScript e build Vite temporário passaram; os 37 arquivos do build foram comparados por SHA-256 com a cópia no pacote portátil `release/CAPS-20261111-visual-win-x64`. A suíte integral reproduziu falhas preexistentes em `tests/ui/map-view.test.ts` e `tests/playtest-unlock.test.ts`, depois ficou sem progresso e foi interrompida; não houve conclusão da suíte.

O executável Windows já estava aberto em um duelo incompleto. Para preservar essa sessão, não foi reiniciado; portanto a interface nativa ainda carrega o bundle anterior. Fechar e reabrir o pacote portátil carrega esta mudança. Prévia no navegador não equivale a partida verificada no executável. Sem instalação global, commit, push, publicação ou backup.

## Refinamentos do menu inicial — 11/11/2026

A pedido do autor, o topo agora mostra Opções como engrenagem, saldo de Pedras Filosofais com imagem gerada jade/cobre e quantidade, e perfil somente pelo retrato circular atual. A faixa inferior tem somente Iniciar aventura e Marcos semanais, sem painel coletivo nem bordas nos botões; o treino permanece disponível no fluxo próprio. O asset novo está em `public/art/philosophers-stone.png`.

TypeScript e quatro testes de `home-view.test.ts` passaram; build Vite temporário concluído e os 38 arquivos conferidos por SHA-256 no pacote portátil `release/CAPS-20261111-visual-win-x64`. A inspeção visual no browser não foi concluída: o Playwright isolado não alcançou o servidor Vite e o runtime alternativo falhou ao carregar. Não usar a captura da versão anterior como evidência desta mudança. O executável não foi reiniciado para preservar o duelo incompleto, portanto ainda mostra o bundle anterior. Sem instalação global, commit, push, publicação ou backup.

### Inspeção visual da prévia concluída — 11/11/2026

Após restabelecer o acesso do Playwright ao Vite local, a home foi examinada na prévia web em 960×700 e 1440×960. O retrato aparece sem moldura e sua área clicável ficou em 58×58; o ícone de pedra carregou (naturalWidth 1262), o menu de engrenagem abriu a opção Alternar tela cheia e Marcos semanais abriu a seção correspondente do Perfil. Na base restaram somente Aventura e Marcos semanais; os estilos computados mostram borda zero nos dois controles e na faixa. Em 960×700, a versão fica abaixo das ações dentro da janela; em 1440×960, todos os elementos permanecem dentro do viewport.

Capturas desta prévia: `tmp/caps-home-menu-preview-960x700.png` e `tmp/caps-home-menu-preview-1440x960.png`. TypeScript, 4 testes focados e build passaram novamente; os 38 arquivos finais foram conferidos por SHA-256 no pacote portátil. Isto verifica a prévia no navegador, não uma partida no executável Windows. A janela nativa permaneceu aberta no duelo incompleto.

## Perfil visual inspirado em LoR — 11/11/2026

O Resumo do Perfil foi reorganizado seguindo as duas referências fornecidas: navegação interna lateral, cartão do jogador/retrato e deck inicial, coluna de Maestria adaptada ao jogo, e painel de totais, regiões, cosméticos e personagens mais jogados. O seletor de foto agora abre modal com retratos circulares, destaque dourado, prévia, apelido e moldura; só oferece protagonistas já desbloqueados. Não há PvP ranqueado nem inventário de guardians/boards/emotes no C.A.P.S.; esses indicadores foram adaptados aos dados que existem, sem criar sistemas novos. Nenhuma regra, ID ou arte aprovada foi alterada.

Na prévia isolada do navegador, conferi o Resumo em 960×700 e o modal em 960×700 e 1440×960. A sessão de teste contém apenas Kylast desbloqueado; abrir e fechar o seletor foi verificado, mas seleção entre múltiplas fotos não foi observada visualmente. `profile-view.test.ts`, TypeScript, build Vite temporário e `git diff --check` passaram. Capturas: `tmp/caps-profile-lor-960x700.png`, `tmp/caps-profile-selector-960x700.png` e `tmp/caps-profile-selector-1440x960.png`. O executável/pacote Windows não foi atualizado nem reiniciado; isto não é uma partida verificada no Windows. Sem commit, push, publicação, instalação global ou backup.

## Faixa, tipografia e refinamento do Perfil — 11/11/2026

Aplicada a decisão do autor de remover por completo a faixa global superior das telas internas. O `hubShell` não gera mais `hub-header`, os estilos correspondentes foram retirados e chamadas/tipos ajustados. A tela inicial conserva seu cabeçalho próprio sobre o cenário, com retrato, saldo e opções conforme decisão anterior; batalha não recebeu espaço ou barra substituta.

Criada a fonte TTF original **C.A.P.S. Display** com mestre vetorial regenerável em `tools/fonts/build_caps_display.py`; o script usa FontTools em pasta temporária `tmp/caps-fonttools`, sem incluir dependência em `package.json` nem no runtime. Os glifos incluem alfabeto latino básico, maiúsculas, algarismos, pontuação e acentos/cedilha portugueses. Ela é aplicada a títulos e nomes; Segoe UI permanece nos textos corridos. A direção segue a preferência do autor por fantasia épica e serifada, inspirada amplamente em Legends of Runeterra, D&D e O Senhor dos Anéis, sem reproduzir suas fontes.

No Perfil, o painel estatístico agora mostra o fundo existente `public/art/battle-sanctuary-jade-copper.png` com overlay para contraste; os novos ícones SVG de cartas, protagonista, moldura, brilhante e relíquia usam a paleta jade/cobre. As ilustrações de região aprovadas não foram alteradas. A troca de abas ganhou entrada curta e desativa animação com `prefers-reduced-motion`.

Verificação: nove testes focados em `profile-view.test.ts`, `home-view.test.ts` e `visual-controls.test.ts`; TypeScript; geração da fonte com auto-checagem dos glifos; build Vite em `tmp/caps-profile-identity-build-20261111`; `git diff --check` sem erros. O Playwright confirmou a carga da fonte, ausência do cabeçalho, fundo, troca de aba e movimento reduzido. Prévia web conferida em 1440×960 e 960×700; capturas `tmp/caps-profile-identity-1440x960.png`, `tmp/caps-profile-identity-960x700.png` e `tmp/caps-profile-selector-identity-960x700.png`. O seletor isolado só tinha Kylast desbloqueado. Nenhuma partida no executável foi feita e o pacote Windows não foi atualizado. Sem commit, push, publicação ou backup.

## Fundo, ícones e moeda Korakoin — 11/11/2026

O autor pediu eliminar áreas lisas vazias, manter a composição responsiva, criar novos ícones para a navegação lateral e as abas de Perfil, remover a faixa superior redundante da batalha e trocar o texto do menu por uma engrenagem. Também pediu uma moeda de Korakoins com o símbolo de Korakarom no centro.

Foi criada a arte original de cenário `public/art/caps-world-background.png`, um santuário de fantasia jade/cobre, aplicada como fundo de janela com `cover` e escurecimento para leitura. Os contêineres que cobriam a tela com cor sólida ficaram transparentes; o cenário próprio da tela inicial e a arte própria da arena permanecem em suas camadas. A navegação e as abas de Perfil usam novos glifos SVG da interface. A moeda é um SVG com aro cobre/jade e incorpora o recorte do símbolo de Korakarom da prancha aprovada, sem duplicar ou redesenhar o brasão. Ela aparece nos saldos da aventura, mapa e loja. A faixa global de progresso deixou de ser inserida no grid de batalha; a situação da rodada, a prioridade e o menu de opções por engrenagem permanecem.

Prévia no navegador conferida em 1440×960 e 960×700. A captura da batalha veio de uma run de teste no navegador, na Ala Criogênica: mão de abertura, 2ª rodada, unidade da IA no campo; confirma a aparência do grid/menu na prévia, não uma partida nativa do executável. Capturas: `tmp/caps-world-profile-icons-1440x960.png`, `tmp/caps-world-profile-icons-960x700.png`, `tmp/caps-battle-grid-final-1440x960.png`, `tmp/caps-battle-grid-world-current.png`, `tmp/caps-korakoin-home-960x700.png` e `tmp/caps-korakoin-coin-detail.png`.

Onze testes focados em `home-view`, `visual-controls`, `profile-view` e `shop-view` passaram; TypeScript, build Vite temporário e `git diff --check` passaram. A tentativa que incluiu `tests/ui/map-view.test.ts` mostrou uma asserção antiga esperando “Mapa Comum”, enquanto o texto atual da tela segue o formato “COMUM · MAPA DE ROTAS”; já constava como teste com falha em verificações anteriores. Nenhuma instalação, atualização do pacote Windows, publicação, partida nativa, commit, push ou backup foi feita. Alterações locais não relacionadas continuam preservadas.

## Correção visual — Korakoin e tipografia — 11/11/2026

A pedido do autor, a moeda exibida de Korakoins foi trocada por uma ilustração própria jade/cobre, semelhante à Pedra Filosofal. O emblema central é o símbolo aprovado de Korakarom sobreposto ao asset, preservando a arte existente; valores e regras não mudaram. A fonte de exibição criada na etapa anterior foi removida por não agradar ao autor: títulos voltaram a Georgia e o corpo permanece em Segoe UI. Esta correção supersede DEC-011 quanto à fonte customizada; os registros anteriores foram mantidos como histórico.

Verificação após a correção: 11 testes em quatro arquivos de UI, TypeScript e build Vite passaram. O build inclui public/art/korakoin.png (1,868,078 bytes) e não inclui a fonte customizada. git diff --check passou, com avisos já existentes de normalização LF/CRLF. A prévia visual mais recente da home está em `tmp/caps-korakoin-image-final-960x700.png; a captura do grid de batalha segue em `tmp/caps-battle-grid-final-1440x960.png (web, não executável Windows). Sem atualização/instalação do pacote Windows, commit, push, publicação ou backup.

## Saldos compactos na home — 11/11/2026

Após nova orientação, removi os rótulos visíveis “Pedras Filosofais” e “Korakacoins” da área de saldo da home. Permanecem as imagens dos dois símbolos e as quantidades formatadas por `pt-BR` (ex.: `12.345`); rótulos acessíveis continuam contendo o nome completo e o saldo sem separador visual. Apliquei o mesmo formato para saldo de Pedras Filosofais sem aventura ativa e saldo de Korakoins quando há run ativa. Teste dedicado com `12.500` pedras e `12.345` Korakoins passou; home-view: cinco testes passaram, TypeScript e diff check passaram. Prévia visual e executável Windows não foram conferidos nesta alteração.

## Conferência Windows dos saldos e limpeza de QA — 11/11/2026

A cópia portátil temporária foi aberta como aplicativo nativo Windows, separada do executável instalado, e mostrou home, imagem de fundo, saldo compacto com ícones, engrenagem, navegação, ações inferiores e versão Alpha. A instância QA usou perfil temporário próprio; o executável instalado ficou aberto e intocado. Os cinco testes de `home-view.test.ts` cobrem saldos persistidos acima de 1.000 (12.500 Pedras Filosofais e 12.345 Korakoins), além de TypeScript e `git diff --check`, todos aprovados. A tentativa de alterar o save QA via Console foi bloqueada pelo aviso de autoproteção do DevTools, então não há captura Windows dos valores altos; a evidência desses valores permanece no teste automatizado. Nenhuma partida concluída foi verificada nesta retomada.

O autor autorizou excluir saves para a conferência; a decisão DEC-014 registra o escopo restrito ao perfil temporário desta sessão QA. A instância temporária foi fechada e o perfil e artefatos descartáveis de QA foram removidos. Save da instalação normal e backups não foram apagados.