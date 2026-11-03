# Integração restante Implementation Plan

> Executar com superpowers:subagent-driven-development; tarefas independentes e revisão de cada entrega, seguida de revisão do conjunto.

**Goal:** Oito protagonistas completos, árvore aprovada de Kylast aplicada e cinco mapas/dificuldades jogáveis.
**Architecture:** Módulos de expansão no motor; definições de conteúdo; módulos puros de talentos e dificuldades; UI e salvamento integrados pelo coordenador.
**Tech Stack:** TypeScript/Vitest/Vite existentes. Sem deps, commits ou worktrees.
**Spec:** docs/superpowers/specs/2026-11-02-integracao-restante.md e documentos aprovados em design/.

## Tasks
- [x] Conteúdo dos quatro novos heróis/decks/pacotes, seguindo efeitos aprovados e classificações pendentes de resposta. Arquivo próprio expansion.ts; coordenador integra schema/decks.
- [x] Dificuldades/mapas/economia pura: novos módulos e testes; coordenador integra run/UI/validation.
- [x] Núcleo puro da árvore Kylast: dados dos15nós, requisitos, custo200/reset e UI da árvore; coordenador integra perfil/run e hooks de combate.
- [x] Motor dos quatro heróis: mortes simultâneas, invocação, escolhas de forma, roubo/origem, músicas, marcas e fim de rodada; IA e UI.
- [x] Hooks dos15talentos de Kylast e fronteira perfil/run/batalha.
- [x] Migração do save, menus oito heróis/dificuldades/talentos, testes/revisão/navegador/docs.

## Review focus
Respostas de execução antes da rodada seguinte; informação oculta no roubo/IA; morte simultânea sem reviver morto; skills temporárias sem apagar permanentes; perfil antigo preservado e alterações de talento proibidas em run.

