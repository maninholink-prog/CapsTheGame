# Menu e progressão — plano de implementação

**Goal:** Hub local com aventura, coleção, boosters, carteira e maestrias persistentes.
**Architecture:** Funções puras em src/profile para estado/transações/boosters/recompensas; envelope de salvamento; componentes do hub em src/ui. Integrar a liquidação no único ponto finishBattle e preservar motor já aprovado.
**Spec:** docs/superpowers/specs/2026-11-02-menu-perfil-design.md e tabelas aprovadas CAMPANHA.md/design/MAESTRIA_PROGRESSAO.md/design/RECOMPENSAS_SEMANAIS_PROPOSTA.md.
**Tech Stack:** TypeScript/Vitest/Vite existentes, localStorage/JSON. Sem dependências, mudanças globais ou worktree nova.

## Tasks

- [x] Testes primeiro: perfil, armazenamento, compras, boosters e garantias, maestria, semana e liquidação idempotente.
- [x] Catálogo de raridades aprovado e núcleo puro profile/{profile,boosters,rewards,storage}.ts.
- [x] Fluxo de perfil inicial, desbloqueio, menus e carteira; coleção pesquisável, boosters e histórico, maestrias/semanais.
- [x] Integrar aventura persistente, recompensa por vitória e encerramento, preservando rollback, treino e IA; filtrar recompensas pela coleção real.
- [x] Suite, tipos, build, revisão independente, navegador, screenshots e documentação.

Review focus: nenhum débito/abertura duplicado, Ultra sempre5cartas, garantia após coleção completa, moeda permanente não restaurada por checkpoint, falha no armazenamento não sobrescreve perfil, IA pausada fora da batalha.

