# Interface de batalha local — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Implementar neste checkout, sem mover pastas nem mudanças globais.

**Goal:** Jogar uma batalha de teste pelo navegador local com os comandos existentes.

**Architecture:** Sessão de apresentação separada do motor, UI em DOM/TypeScript e CSS, Vite local para servir/compilar. Toda ação é validada por applyCommand; apresentação não decide dano, custos nem sorteios.

**Tech Stack:** TypeScript, Vite já presente (adicionar como dependência direta), Vitest existente; sem framework adicional.

**Spec:** design/INTERFACE_BATALHA_LOCAL.md, motor src/battle e catálogo src/content/kylast.ts.

## Global Constraints

- Manter C:/Users/Bruxo/Documents/ChatGPT/Game; servidor somente 127.0.0.1, porta fixa com strictPort.
- Duelo local manual; nenhuma IA improvisada. Deck de vinte cartas por lado.
- Alvos do Colar não são pré-selecionados/revelados na apresentação; esconder continuações internas.
- Não atribuir novas regras, personagens ou estatísticas para melhorar a aparência.
- Build e ferramentas locais; nenhuma publicação ou configuração do aplicativo.

## Review Focus

- Interface não deve permitir confirmar a carta quando faltam alvos, mana ou substituição obrigatória.
- Campo cheio e Kylast transformado em Troca exigem formulários diferentes de unidade normal.
- Respostas do Colar mantêm combate pendente, sem botão que pule diretamente aos golpes.
- Passagem de prioridade muda a mão selecionada, sem vazar nomes de compras no histórico público.
- Bloqueios duplicados, armas inválidas e ataques vazios continuam rejeitados pelo motor.

### Task 1: Sessão e apresentação de regras

**Files:** src/ui/session.ts, src/ui/presentation.ts, tests/ui/session.test.ts.

**Interfaces:** createSession(seed): BattleSession; dispatch(session,command): BattleSession; actingPlayer(state): PlayerId|null; handCardMode(state,owner,card): unit/equipment/arsenal/spell; visibleEffects(state) sem marcadores internos; preview(state,command) com erro traduzido.

- [x] Escrever testes integrados de mulligan/iniciativa, prioridade, comando inválido imutável, transformação em Troca e pilha do Colar sem alvos/marcadores ocultos.
- [x] Observar falha antes de implementar; implementar sessão com histórico de eventos em português sem nomes de compras ocultas.
- [x] Rodar testes e tipos.

### Task 2: Mesa e controles

**Files:** index.html, src/ui/main.ts, src/ui/render.ts, src/ui/forms.ts, src/ui/styles.css, public/art/kylast.png; package.json/package-lock.json.

**Interfaces:** render(session,draft): HTML; controls geram Command, dispatch decide resultado. Draft contém escolhas de cartas, participantes/armas, bloqueios e Banjos, sem mutar BattleState.

- [x] Adicionar Vite direto/scripts dev/build e copiar referência original de Kylast para public/art.
- [x] Construir campos, mão, indicadores, inspeção, pilha, histórico e controles para todos os comandos.
- [x] Build de produção e typecheck passam; revisar renderização no navegador local.

### Task 3: Verificação visual e funcional

- [x] Navegador real: mulligan dos dois lados, iniciativa, passar rodadas, jogar unidade/equipamento, ataque/bloqueio e respostas do Colar.
- [x] Conferir viewport grande e estreito, teclado e erros; corrigir regressões reproduzíveis.
- [x] Rodar suíte completa, tipos e build como comandos independentes; revisão de código e documentação de inicialização/limites. Deixar URL local disponível ao autor.

## Decisões de execução

O usuário já autorizou implementação e pediu evitar novas confirmações repetitivas. Seguir a estrutura local existente. Uma sessão de batalha não substitui o futuro sistema de salvamento; atualizar/recarregar descarta o teste atual. Não instalar ferramentas globais nem criar worktrees.
