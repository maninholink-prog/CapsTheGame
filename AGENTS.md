# C.A.P.S. — continuidade do projeto

Esta é a raiz real do jogo. Consulte [docs/INDEX.md](docs/INDEX.md) para navegar e [PROMPT_MESTRE.md](PROMPT_MESTRE.md) apenas para detalhes da política; ele não autoriza executar fases fora da tarefa solicitada.

- Ao iniciar: leia [HANDOFF](docs/HANDOFF.md) e [PROGRESS](docs/PROGRESS.md), confira `git status` e preserve alterações preexistentes. Carregue somente as fontes pertinentes.
- Preserve código, dados, documentação, histórico, decisões e artes originais/editáveis. Faça a menor mudança completa, reutilizando a arquitetura. Antes de mudanças arriscadas, identifique recuperação. Não sobrescreva trabalho alheio nem apague funcionalidades sem autorização.
- Não invente regras, lore ou resultados. Distinga cânone, provisório, proposta e não confirmado; separe RPG original de adaptação. Não altere cânone, decisões criativas ou balanceamento sem autorização. Preserve IDs de cartas e compatibilidade dos dados.
- Regras e decisões históricas estão em CAMPANHA.md e design/. Verifique datas e correções posteriores: registros antigos de pendências podem ter sido superados. Não promova propostas a decisões; registre fontes e incertezas em [DECISIONS](docs/DECISIONS.md).
- Para narrativa, comece por [lore/INDEX.md](lore/INDEX.md). Não copie as fichas de personagens/. A leitura de episódios está pausada por pedido do autor; retome somente mediante solicitação.
- Use as skills locais [.agents/skills/lore-keeper/SKILL.md](.agents/skills/lore-keeper/SKILL.md) para continuidade narrativa e [.agents/skills/memory-manager/SKILL.md](.agents/skills/memory-manager/SKILL.md) para memória de ciclos relevantes. Não carregue ambas automaticamente em tarefas simples. Use outras skills e agentes somente quando apropriados; não crie agentes especializados sem benefício concreto.
- Execute verificações pertinentes; nunca declare sucesso sem execução e evidência. Ao encerrar ciclos relevantes, atualize documentos afetados, decisões, progresso e HANDOFF sem apagar detalhes históricos. Economia de contexto não justifica perda de informação, segurança ou testes essenciais.
- Siga o fluxo Git e a proposta de backups em [BACKUP_POLICY](docs/BACKUP_POLICY.md). Commits devem conter somente mudanças relacionadas e nenhum segredo. Push exige remoto e branch autorizados; Git destrutivo exige autorização específica. Agendamentos e exclusões por retenção dependem de aprovação da configuração concreta.
- Relate alterações, validação e limitações, pendências e estado de commit/push/backup quando aplicável. Política escrita não equivale a backup ou automação funcionando.

## Complemento de escopo e raiz — 03/11/2026

- Raiz obrigatória desta integração: `C:/Users/Bruxo/Documents/ChatGPT/Game`. Confirme o diretório efetivo antes de operar e forneça-o explicitamente como workdir nos comandos. Não escreva na pasta CAPS. A pasta de origem do projeto no aplicativo e a pasta padrão de um chat antigo podem divergir; declarar o projeto corrigido não prova que o cwd do chat foi atualizado.
- Escopo vigente solicitado pelo autor: infraestrutura, memória persistente, skills e auditoria documental. Não executar pendências de Abe, Cinderela, cartas, maestrias ou artes neste ciclo. A autorização antiga de desenvolvimento fica preservada no histórico, mas sua execução está suspensa neste escopo.
- O autor proibiu commits, pushes e backups neste ciclo. A política proposta em docs/BACKUP_POLICY.md não substitui autorização operacional.
- Preserve integralmente HANDOFF, PROGRESS e documentos anteriores. Nesta integração, registre complementos datados por acréscimo, contextualizando divergências sem apagar, substituir ou compactar registros existentes.
- Não reutilize identificadores de cartas removidas. Backups só podem ser declarados verificados após conferência e restauração de teste em local separado; não presumir isso por existir release ou política escrita.
- Skills de repositório existentes: lore-keeper e memory-manager, em .agents/skills. Leia seus SKILL.md quando pertinentes. Não duplique globalmente nem reinstale plugins para resolver o cwd de um chat. O acesso por caminho explícito funciona para leitura das instruções, mas não prova descoberta automática no seletor.
