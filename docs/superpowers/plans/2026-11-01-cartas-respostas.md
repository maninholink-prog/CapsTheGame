# Cartas, custos e respostas — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans. Implementar neste checkout, sem mover pastas ou alterar configurações globais.

**Goal:** Jogar unidades básicas e magias, pagar custos e resolver respostas com alvos válidos.

**Architecture:** Definições de cartas em dados, instâncias por cópia, comandos imutáveis e resolução de efeitos separada da prioridade. Cartas de teste não são conteúdo canônico.

**Tech Stack:** TypeScript e Vitest já instalados localmente.

**Spec:** CAMPANHA.md: velocidades, reserva, alvos, resolução, campo e dano/cura. design/PROJECAO_TECNICA.md.

## Global Constraints

- Reserva até 3, gasta primeiro somente por spell/trick/armor; unidades não usam reserva.
- Campo até 5, substituição explícita destrói a unidade anterior como derrota.
- Lenta exige pilha vazia; Rápida permite responder; Explosiva resolve sem passar prioridade.
- Duas passagens com pilha resolvem da última para primeira, sem avançar rodada.
- Pagamento não é devolvido por anulação/alvos inválidos; carta usada vai ao descarte.
- Equipamentos, campeões, combate, gatilhos e modificações da run permanecem fora deste recorte. Rejeitar tipo não suportado, sem simular um equipamento como magia.

## Review Focus

- Comando inválido preserva estado e RNG, inclusive alvo inválido e falta de mana.
- Rápidas empilhadas não confundem prioridade de resposta com prioridade após resolver a sequência.
- Mortes e Nexus são conferidos após aplicação simultânea a todos os alvos, preservando empate.
- Explosiva reinicia contagem de passes; não fecha a rodada por causa de um passe anterior.
- Catálogo inválido não pode criar mana por custos negativos nem vida infinita por atributos inválidos.

## Interfaces e arquivos

- src/content/schema.ts: CardCatalog, união CardDefinition e TargetRule; validar custo/atributos/velocidade/efeito suportado ao criar batalha com catálogo.
- src/battle/types.ts: TargetRef (unit/nexus/stack), BoardUnit, PendingEffect; estado recebe definitions, stack, stackReturnOwner e nextEffectId. Jogadores recebem board e deathRecords.
- src/battle/costs.ts: payCost(player: PlayerState, definition: CardDefinition): PlayerState | null; não modificar entrada.
- src/battle/play.ts: PlayCommand {type:'play';player;instanceId;targets?;position?;replaceUnitId?}; playCard(state, command): Result.
- src/battle/targets.ts: isLegalTarget(state, owner, rule, target): boolean; checar categoria, lado, presença.
- src/battle/effects.ts: resolveEffect(state, pending): Result e resolveStack(state): Result; dano/cura/armadura/anulação.
- src/battle/commands.ts: integrar play, passes de resposta e prioridade; src/battle/round.ts: impedir avanço com pilha pendente.

### Task 1: Dados, custos e validação

**Files:** schema.ts, types.ts, setup.ts, costs.ts e tests/battle/costs.test.ts.

- [x] Testar spell custo 4 com reserva 3/mana 2 gasta 3+1; unit custo 3 com mana 2/reserva 3 falha; zero não gasta; insuficiência não modifica entrada; catálogo rejeita negativos e NaN.
- [x] Executar teste e observar falha antes da implementação.
- [x] Implementar tipos e payCost com validação do catálogo em createBattle(decks,seed,definitions = {}).
- [x] Rodar testes existentes e typecheck; esperar aprovação integral.

### Task 2: Unidades e janelas de resposta

**Files:** play.ts, targets.ts, commands.ts, round.ts, tests/battle/play.test.ts.

- [x] Testar unidade entra na posição escolhida e passa prioridade; campo cheio exige substituição explícita; substituição cria morte; Lenta na pilha falha; Explosiva resolve mantendo prioridade; dois passes com pilha não avançam rodada; início da pilha salva a prioridade de retorno.
- [x] Executar teste e observar falha.
- [x] Implementar comandos e fluxo com validação antes de custos; integrar resolução com Task 3.
- [x] Executar a suíte conjunta e typecheck quando a resolução estiver disponível.

### Task 3: Efeitos e alvos

**Files:** effects.ts, tests/battle/effects.test.ts; documentação README e registro de execução.

- [x] Testar dano/cura/armadura; validade parcial e total de alvos; custo e descarte após anulação; resolução LIFO; cura após dano não ressuscita; dano simultâneo nos dois Nexus produz draw; vitória interrompe efeitos pendentes; Explosiva após passe reinicia passes.
- [x] Executar teste e observar falha antes da implementação.
- [x] Implementar efeitos e integrar com os fluxos da Task 2. Sem criar janelas de resposta entre efeitos da mesma sequência: resolver em ordem após os dois passes, preservando futuras janelas específicas de gatilhos para outro módulo.
- [x] Rodar `node node_modules/vitest/vitest.mjs run` e `node node_modules/typescript/bin/tsc --noEmit`; ambos devem passar. Solicitar revisão independente, corrigir achados com regressões e registrar limites.

## Decisões técnicas de escopo

Prioridade após uma sequência retorna ao adversário de quem iniciou a sequência, seguindo a alternância das ações. Novas respostas não trocam esse marcador. Catálogo é opcional apenas para compatibilidade com testes anteriores; sem definição uma carta não pode ser jogada. Não aprovar novas cartas canônicas por meio dos testes.
