# Índice de documentação — C.A.P.S.

Leia seletivamente. Este índice aponta para fontes existentes; não substitui seu conteúdo.

## Continuidade e proteção

- [HANDOFF](HANDOFF.md): entrada curta para a próxima sessão.
- [PROGRESS](PROGRESS.md): estado verificável e pendências.
- [DECISIONS](DECISIONS.md): índice de decisões com suas fontes, sem reproduzir as especificações.
- [Auditoria de integração](AUDIT.md): inventário, limitações e recuperação de informações.
- [Git e proposta de backups](BACKUP_POLICY.md).
- [Prompt mestre](../PROMPT_MESTRE.md): política detalhada; executar somente o escopo solicitado.

## Jogo e arquitetura existente

- [README](../README.md): execução, comandos de verificação e descrição do jogo.
- [CAMPANHA](../CAMPANHA.md): decisões do autor e histórico; procurar correções posteriores sobre o mesmo tema.
- [design/](../design/): especificações mecânicas e propostas, preservadas nos nomes originais.
- [Projeção técnica histórica](../design/PROJECAO_TECNICA.md): não representa sozinha o estado atual. Código atual em [src/](../src/): battle, content, run, profile, ai e ui; cenários em [tests/](../tests/).
- [Mapa Comum](../design/MAPA_COMUM.md), [mecânicas compartilhadas](../design/MECANICAS_COMPARTILHADAS.md), [maestria](../design/MAESTRIA_PROGRESSAO.md), [catálogo de relíquias](../design/RELIQUIAS_CATALOGO_PROPOSTA.md).
- [Processo de expansão de personagens, maestrias e cartas](../design/PROCESSO_EXPANSAO_PERSONAGENS_E_CARTAS.md): fluxo reutilizável de fontes, aprovações, arte, integração, testes e pacote Windows.
- [Deck inicial por maestria 15](superpowers/specs/2026-11-12-deck-inicial-maestria-15.md): decisão DEC-039 e especificação da implementação.
- [Planos e registros históricos](superpowers/plans/), [especificações de integração](superpowers/specs/). Um plano marcado concluído não substitui verificar o código e testes.
- [Constelação de Kylast](kylast-constelacao.md), [primeiro lote de relíquias](reliquias-primeiro-lote.md), [lote pausado](reliquias-proximo-lote-pendente.md), [validação de Félix](felix-validacao.md).

## Narrativa, fontes e apresentação

- [Índice de lore](../lore/INDEX.md): personagens e fontes; não duplica as alas existentes.
- [referencias/](../referencias/): pesquisa, transcrições, mecânicas externas, continuidade e imagens. Evidência de outro jogo não é regra aprovada do CAPS.
- [public/](../public/): recursos usados pelo jogo; [desktop/](../desktop/): empacotamento Windows. Não reorganizar originais para atender uma estrutura idealizada.

Não foram criados documentos paralelos de arquitetura, regras, cartas ou changelog: README, CAMPANHA, design e registros existentes já cobrem esses assuntos. Novos documentos só quando resolverem uma lacuna concreta.

## Complemento de navegação — 03/11/2026

- [PROGRESS — desenvolvimento suspenso](PROGRESS.md#pendencias-de-desenvolvimento--execucao-suspensa-neste-ciclo): tarefas de produto separadas da infraestrutura, sem execução automática.
- [AUDIT — revisão complementar](AUDIT.md#revisao-complementar-de-infraestrutura--03112026): verificações desta execução, limites de Git/backups e preservação do conteúdo anterior.
- [DECISIONS](DECISIONS.md): complementos DEC-006 em diante registram o escopo vigente e decisões recuperadas desta conversa.
- Skills locais: [memory-manager](../.agents/skills/memory-manager/SKILL.md) e [lore-keeper](../.agents/skills/lore-keeper/SKILL.md). Fontes narrativas continuam acessíveis pelo [índice de lore](../lore/INDEX.md), sem fichas duplicadas.
