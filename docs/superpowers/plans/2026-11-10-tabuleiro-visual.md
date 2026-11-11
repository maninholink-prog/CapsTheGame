# Tabuleiro visual inspirado em LoR — plano de implementação

**Objetivo:** Reorganizar a arena inteira segundo as zonas visuais aprovadas, com cores jade e cobre e sem alterar regras, dados ou artes.

**Arquitetura:** Manter `render.ts`, `forms.ts` e o motor existentes. Adicionar apenas a mão adversária fechada à apresentação e reposicionar as zonas e controles por CSS em `battle-polish.css`, com ajustes locais em `tactical.css` se necessários. Os pares de combate e os raios continuam ligados aos elementos atuais.

**Arquivos:** `src/ui/render.ts` (mão oculta e estrutura), `src/ui/battle-polish.css` (composição e responsividade), `tests/ui/visual-controls.test.ts` (zonas e ocultação), `docs/PROGRESS.md` e `docs/HANDOFF.md` (resultado real).

## Etapas

- [x] Testar que a mão adversária aparece como versos, sem nomes ou IDs das cartas, inclusive na IA.
- [x] Acrescentar a zona da mão adversária ao renderizador, sem alterar o estado da batalha.
- [x] Reposicionar Vínculos à esquerda, recursos e ação à direita, fileiras no centro e mãos no topo/base; preservar alvos, foco e controles.
- [x] Verificar TypeScript, testes de UI, build temporário e `git diff --check`.
- [x] Inspecionar no navegador em 1440×960 e 960×700, incluindo combate e movimento reduzido; registrar o que o Windows realmente recebeu ou não. Combate visto em cenário preparado, separado do treino jogado até a primeira rodada.

**Limites:** não introduzir mecânicas, assets, dependências, commits, push nem pacote Windows. A prévia no navegador não equivale a uma partida no executável.
