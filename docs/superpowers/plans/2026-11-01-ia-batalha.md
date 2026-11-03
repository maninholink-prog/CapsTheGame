# IA básica local — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Mesmo checkout Game e ferramentas locais; sem mudanças globais ou commits automáticos.

**Goal:** Jogar contra J2 automático, preservando o duelo manual.

**Architecture:** Observação sem dados ocultos, política heurística que só recebe essa observação, validação final pelo motor e agendamento cancelável na UI.

**Tech Stack:** TypeScript/Vitest/Vite existentes, sem dependências novas.

**Spec:** design/IA_BATALHA.md, regras aprovadas de IA em CAMPANHA.md, motor existente.

## Global Constraints

- Sem mão adversária, decks ou RNG real na entrada da política.
- Sem custos reduzidos, cartas extras, decisões no turno errado ou alteração de sorteios para a IA.
- Banjo/Colar e janelas obrigatórias usam o motor existente.
- UI em modo IA mantém mão humana, sem botão para comandar ou inspecionar mão oculta de J2.
- Estado e RNG recebidos permanecem imutáveis durante planejamento.

## Review Focus

- Alterar conteúdo oculto sem mudar dados públicos não muda decisão.
- Decks sintéticos de planejamento não são usados para prever compras ou resultados do Colar.
- Janelas de bloqueio/Banjo não podem ser respondidas com passe inválido.
- Recomeçar ou trocar de modo invalida timer antigo.
- UI e histórico não revelam a mão da IA ao transferir prioridade.

### Task 1: Observação

**Files:** src/ai/observation.ts, tests/ai/observation.test.ts.
**Interfaces:** observeBattle(state,player): AiObservation; planningState(observation): BattleState. Observação tem ownHand, jogadores públicos com contagens, definições e fases públicas; sem campos privados.

- [x] Testes de campos excluídos, clones independentes e não interferência; observar falha antes de implementar.
- [x] Construir observação por allowlist e estado sintético de validação, sem passar BattleState real à política.
- [x] Rodar testes e tipos.

### Task 2: Política e combate

**Files:** src/ai/policy.ts, src/ai/tactics.ts, tests/ai/policy.test.ts, tests/ai/duels.test.ts.
**Interfaces:** chooseAiCommand(observation): {command,reason}|null; auxiliares de valor/trade/bloqueio, sem estado real externo.

- [x] Testar mulligan, unidade/equipagem/Troca, resposta letal, bloqueio letal, Banjo, comando fora da vez e observações idênticas.
- [x] Observar falhas; implementar candidatos válidos e heurísticas limitadas, sem procurar em dados ocultos.
- [x] Exercitar sementes fixas em duelos completos e verificar cada comando no estado real. Corrigir regressões antes da UI.

### Task 3: Controle automático e UI

**Files:** src/ui/session.ts, src/ui/ai-controller.ts, src/ui/main.ts, src/ui/forms.ts, src/ui/render.ts, src/ui/styles.css, tests/ui/ai-controller.test.ts.

- [x] Testar agendamento único/cancelável, restrições humanas e manutenção da mão J1 com prioridade J2.
- [x] Integrar modo Contra IA/manual, indicação de processamento e mensagens de falha sem repetição infinita.
- [x] Navegador real: mulligan, ações automáticas, ataque/bloqueio e cancelamento por nova batalha. Rodar suíte, tipos e build; revisão independente, documentação e registro de execução.

## Decisões

O usuário autorizou a implementação proposta; não repetir confirmação. A IA inicial é heurística e usa somente informação pública/propria. Não implementar dificuldade avançada ou run nesta entrega.
