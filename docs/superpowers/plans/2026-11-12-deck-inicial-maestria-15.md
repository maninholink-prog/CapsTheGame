# Deck Inicial por Maestria 15 — Plano de implementação

> Plano executado pelo agente atual, tarefa a tarefa, sem delegação; sem commit, conforme autorização vigente.

**Goal:** Desbloquear edição persistente do deck inicial por protagonista a partir da maestria 15, preservando seu pacote de seis cartas e todas as regras aprovadas.

**Architecture:** Um catálogo compartilhado dos pacotes de seis alimenta run e perfil. Um módulo de perfil valida composição/cópias/regiões e armazena `initialDecks` opcional; a criação de nova run consome a lista validada. O editor vive na preparação da aventura.

**Tech Stack:** TypeScript, DOM existente, Vitest, Vite.

**Spec:** `docs/superpowers/specs/2026-11-12-deck-inicial-maestria-15.md`.

## Global Constraints

- Requisito por personagem: maestria 15.
- Deck: tamanho inicial atual do protagonista; exatamente duas cópias de cada uma das três identidades do pacote característico permanecem fixas.
- Deckbuilding: máximo duas cópias por identidade; vagas livres usam cartas possuídas, com região legal, neutras Korakarom ou `enemyOnly` possuídas e regionais.
- Save antigo sem `initialDecks` continua usando listas iniciais atuais; run aberta não muda.
- `enemyOnly` permanece bloqueado em recompensa/loja e fora do editor especial.
- Preservar alterações locais; sem commit, push, publicação ou backup.

## Review Focus

- Maestria 14 versus 15 — teste de bloqueio/liberação no helper e na UI.
- Pacote de seis e tamanho por protagonista — teste para Kylast e deck padrão de outro protagonista.
- Quantidade possuída versus limite de duas cópias — teste com 1, 2 e 3 cópias na coleção.
- Região, neutralidade, exclusividade e `enemyOnly` — testes de elegibilidade e validação.
- Save legado, persistência customizada e run antiga — testes de round-trip e criação de nova run.

## Tasks

### Task 1 — Núcleo de seis cartas e validação pura

**Files:** criar `src/content/deck-packages.ts`, `src/profile/initial-decks.ts`, `tests/profile/initial-decks.test.ts`; modificar `src/run/run.ts` para importar o catálogo comum. Preservar export `packages` por compatibilidade.

**Interfaces:** `initialDeckCore(hero): string[]`, `editableInitialDeckCards(profile, hero): string[]`, `initialDeckIds(profile, hero): string[]`, `saveInitialDeck(profile, hero, ids): Profile`; `createProtagonistDeck(hero, prefix, ids?)` usa IDs expandidos quando `ids` é dado e mantém o default byte-a-byte na rota antiga.

- [x] Escrever testes para cada pacote de seis, tamanho padrão, gate 14/15, composição legal e rejeições por tamanho, cópias, posse, região e exclusividade.
- [x] Rodar `npm test -- tests/profile/initial-decks.test.ts` e confirmar falha por APIs ausentes.
- [x] Implementar catálogo compartilhado e validação mínima necessária.
- [x] Rodar o teste focado até passar.

### Task 2 — Save opcional e uso ao iniciar run

**Files:** modificar `src/profile/profile.ts`, `src/profile/validation.ts`, `src/run/run.ts`, `src/run/adventure.ts`; testar em `tests/profile/initial-decks.test.ts` e `tests/run/`.

- [x] Adicionar `Profile.initialDecks?: Partial<Record<Champion,string[]>>`; validar cada lista salva com a mesma regra de posse, pacote, tamanho e região.
- [x] Permitir lista customizada opcional na fábrica do deck/run; chamadas antigas sem lista continuam idênticas.
- [x] Cobrir save sem campo, round-trip com deck customizado, valores inválidos, lista customizada no novo run e deck default sem configuração.
- [x] Rodar os testes focados e de run.

### Task 3 — Editor na preparação da aventura

**Files:** modificar `src/ui/hub.ts`, `src/ui/main.ts`, `src/ui/hub.css`; testar em `tests/ui/initial-deck-builder.test.ts`.

- [x] Testar que só protagonistas desbloqueados com maestria 15 mostram a ação de edição.
- [x] Renderizar as seis cartas fixas, vagas restantes, seleção da coleção legal, cópias e espaços; permitir adicionar/remover cartas e salvar composição.
- [x] Validar novamente ao salvar; manter o fluxo atual para quem não editou deck; iniciar nova aventura com a composição salva.
- [x] Rodar teste UI focado, suíte completa, typecheck, build Vite temporário e `git diff --check`.

## Review after implementation

Conferir que specs e testes cobrem cada requisito. Não atualizar pacote Windows sem pedido específico; registrar limites de QA, preservar o estado Git e não alegar teste manual sem executá-lo.
