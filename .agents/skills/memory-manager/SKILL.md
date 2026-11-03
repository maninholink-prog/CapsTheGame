---
name: memory-manager
description: Mantém decisões, progresso e passagem de contexto do CAPS após ciclos relevantes ou quando solicitado um handoff. Evita auditoria integral em alterações simples.
---

# Memory manager — CAPS

Aplicável à raiz Game identificada por package.json com nome caps-card-roguelite e AGENTS.md. Leia docs/HANDOFF.md e docs/PROGRESS.md; use docs/INDEX.md para localizar apenas as fontes afetadas pela tarefa.

- Confira git status e o diff pertinente. No repositório sem commits, diferencie arquivos preexistentes não rastreados de arquivos criados no ciclo; não atribua todo o acervo à tarefa.
- Atualize docs/DECISIONS.md apenas com decisões aprovadas, incluindo ID, data conhecida, fonte, justificativa conhecida, impacto e status. Propostas e datas desconhecidas devem permanecer identificadas. Aponte para a especificação em vez de copiá-la.
- Atualize docs/PROGRESS.md e mantenha docs/HANDOFF.md curto: estado, última entrega, testes realmente executados, pendências e próxima ação. Preserve detalhes históricos nas fontes originais e mantenha links válidos.
- Não marque sistemas concluídos só porque existem planos; distinga implementação observada, testes desta execução e resultados históricos. Preserve falhas e limitações.
- Registre commit/push/backup somente com evidência verificável. Siga docs/BACKUP_POLICY.md; esta skill não concede autorização para push, agendamentos, exclusões ou operações destrutivas. Relate o hash no encerramento quando houver commit, evitando ciclos de commits apenas para registrar o próprio hash.
- Não crie documentos vazios, resumos paralelos de regras/lore ou auditoria completa em toda tarefa. Uma atualização pequena exige apenas os registros afetados.

## Preservação e escopo vigente

- Confirme a raiz efetiva Game antes de escrever. Um projeto listado no aplicativo não prova o cwd do chat; em operações de terminal, fixe explicitamente o diretório correto e confira Get-Location.
- Se o autor exigir preservação integral, complemente HANDOFF, PROGRESS, DECISIONS e AUDIT por acréscimos datados. Não substitua o conteúdo anterior para manter um resumo curto; a exigência do autor prevalece.
- Separe pendências de desenvolvimento do trabalho autorizado de infraestrutura. Uma tarefa pendente ou uma aprovação antiga não autoriza executá-la durante um ciclo explicitamente documental.
- Antes de modificar documentos, apresente os caminhos. Não replique especificações em vários arquivos: decisões apontam para a fonte; PROGRESS guarda o estado; HANDOFF aponta para ambos; lore/INDEX navega as fontes narrativas.
- Valide recuperação local de regra, decisão, personagem, tarefa e limite de escopo com fontes identificadas. Compare conteúdo/hash quando necessário para demonstrar preservação; isso não constitui backup.
