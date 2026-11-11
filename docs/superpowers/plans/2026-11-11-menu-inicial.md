# Menu inicial C.A.P.S. — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reorganizar a tela inicial com navegação vertical, cenário atual em tela cheia e faixa horizontal de ações na base.

**Architecture:** Reaproveitar `renderHome` e os estilos existentes em `hub.css`; manter estados e ações atuais. A versão Alpha continua no rodapé direito e as artes seguem numa camada de cenário independente dos controles, sem animação neste ciclo.

**Tech Stack:** TypeScript, HTML renderizado, CSS, Vitest e Vite.

**Spec:** [proposta de design](2026-11-11-menu-inicial-design.md)

## Global Constraints

- Preservar a barra vertical, destinos, perfil, opções, saldos, ações e seletor de adversário existentes.
- Manter a identidade jade/cobre, as imagens atuais e `ALPHA · v0.1.0`.
- Não alterar regras, IDs, dados, artes ou balanceamento; não adicionar animações, imagens ou dependências.
- Manter legibilidade e acesso por teclado em 1440×960 e 960×700; abaixo disso, empilhar a faixa quando necessário.

## Review Focus

- **Largura mínima:** a ação principal, seletor e atalhos precisam caber sem sobreposição em 960×700; cobrir na prévia com essa viewport.
- **Perfil com aventura ativa:** o texto muda para “Continuar aventura” e moedas aparecem; manter a hierarquia e cobertura no teste de `renderHome` com jornada.
- **Acesso por teclado:** botões mantêm indicador de foco existente; conferir que nenhuma regra de layout o recorta na prévia.
- **Fundo futuro:** estilos não podem acoplar transformações do cenário ao painel de ações; manter `--scene` isolado e sem animação.
- **Controles existentes:** o seletor e `data-action` não mudam; cobrir sua presença no teste atual da home.

---

### Task 1: Faixa de ações da tela inicial

**Files:**
- Modify: `src/ui/home-view.ts` — agrupar a aventura principal, seleção/entrada de treino e Marcos semanais na seção identificada `Ações do jogo`; manter a versão na faixa inferior.
- Modify: `src/ui/hub.css` — faixa horizontal jade/cobre e quebra responsiva sem tocar na camada de fundo.
- Test: `tests/ui/home-view.test.ts` — estrutura, versão e preservação das ações em home sem e com jornada.
- Modify: `release/CAPS-20261111-visual-win-x64/resources/app/dist/` — somente depois do build, atualizar os assets do pacote portátil e conferir hashes; manter a versão antiga do executável e não reiniciar a janela de treino já aberta.
- Modify: `docs/PROGRESS.md`, `docs/HANDOFF.md` — acrescentar registro do design e da verificação, preservando histórico.

**Interfaces:**
- Consome: `renderHome(profile, run, scene, error)` e os `data-action` atuais de `hub.ts`.
- Produz: marcação da home com grupos de ação sem novos handlers nem mudanças nas assinaturas.

- [x] **Step 1: Cobrir no teste o nome acessível e a continuidade dos controles** — afirmar a seção acessível `Ações do jogo`, versão, CTA de Aventura/Continuar, seletor do treino, botão Duelo e Marcos semanais em home sem e com jornada.
- [x] **Step 2: Executar teste focado** — `node node_modules/vitest/vitest.mjs run tests/ui/home-view.test.ts`; esperado: as novas asserções falham antes da implementação por ausência da faixa.
- [x] **Step 3: Implementar a estrutura mínima em `home-view.ts` e CSS em `hub.css`** — identificar acessivelmente as ações; ação principal à esquerda; seleção e ações secundárias agrupadas ao lado; versão abaixo à direita; empilhar em viewport estreita; manter a arte na camada atual.
- [x] **Step 4: Executar verificações** — TypeScript, teste focado e build Vite em diretório temporário; esperado: todos passam.
- [x] **Step 5: Conferir prévia** — inspecionar no navegador a tela inicial em 1440×960 e 960×700; verificar hierarquia, sem sobreposição, foco e rótulo. Registrar explicitamente como prévia.
- [x] **Step 6: Atualizar pacote local** — copiar o build verificado para o pacote portátil, comparar SHA-256 de cada arquivo e preservar arquivos antigos com nomes hash; não declarar instalação global nem partida nativa.
- [x] **Step 7: Registrar a entrega** — acrescentar documentação do layout e limites do teste; `git diff --check`.
