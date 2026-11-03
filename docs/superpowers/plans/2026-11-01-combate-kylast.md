# Combate e arsenal de Kylast — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Manter checkout Game, sem alterações globais ou commits automáticos.

**Goal:** Resolver ataques/bloqueios com respostas e integrar Kylast, Espada, Alastor e Banjo.

**Architecture:** Linha de combate conserva posições, distinta do campo. Comandos declaram atacantes/armas, atribuem bloqueadores e escolhem alvos de gatilhos antes dos golpes. Custos, pilha e eventos existentes são reutilizados.

**Tech Stack:** TypeScript/Vitest locais.

**Spec:** CAMPANHA.md e design/KYLAST_DECK.md, incluindo os complementos aprovados mais recentes.

## Global Constraints

- Um ataque disponível ao receber o token; consumido ao declarar. Sem ataque vazio, IDs repetidos ou participantes atordoados.
- Um bloqueador por atacante e uma atribuição por bloqueador. Bloqueador morto deixa bloqueio; Banjo remove e abre passagem.
- Sequência de armas escolhida na declaração, antes do bloqueio. Dois golpes apenas se Kylast já evoluído ao declarar.
- Primeiro golpe evoluído com Ataque Rápido; segundo e resposta do bloqueador simultâneos se ele sobreviver. Se o primeiro o eliminar, segundo no Nexus.
- Dano lateral só em vizinhos imediatos da linha, com lacunas mantidas; Ybew duplica enquanto presente, sem acumular.
- Equipamentos usam mana comum e retornam em ordem de equipagem, respeitando mão 10. Banjo usado uma vez por cópia enquanto equipado, com reinício ao voltar à mão.
- Evolução global por quatro identidades, preserva dano/equipamentos. Novo Kylast entra evoluído durante aquela batalha.
- Sem Colar aproximado: sua sequência aleatória e janelas próprias terão entrega separada. Sem carregar os outros suportes canônicos antes dos gatilhos correspondentes.

## Review Focus

- Respostas rápidas e armaduras entre bloqueio e golpes não podem permitir unidade/Lenta ou encerrar rodada.
- Mortes simultâneas retiram todos antes de gatilhos; devolver equipamentos não concede mais de 10 cartas.
- Evolução numa resposta não acrescenta golpe à declaração já confirmada.
- Arma removida antes do golpe perde bônus sem substituir a escolha.
- Banjo como segunda arma dispara antes do primeiro golpe; anulação consome uso, sem descartar arma equipada.

## Interfaces e arquivos

- src/battle/combat.ts: declareAttack(state, AttackCommand), declareBlocks(state, BlockCommand), prepareAttackEffects(state, PrepareCommand), resolveCombat(state): Result.
- AttackCommand: type attack, player, attackers[{unitId,weapons?: (string|null)[]}]. BlockCommand: type block, player, assignments[{attackerId,blockerId}]. PrepareCommand: type prepareAttack, player, banjos[{equipmentId,targetId}].
- src/battle/equipment.ts: equipFromHand(state, owner, equipmentId, targetId, replaceEquipmentId?, free?): Result; applyEvolution e effectiveEquipmentCapacity. EquipCommand pelo play usa um alvo unit aliado, replaceEquipmentId opcional.
- src/battle/state-events.ts: settle e removeUnit trabalham apenas em clones internos; retorno ordenado de equipamento.
- src/content/kylast.ts: catálogo parcial explicitamente nomeado, só identidades cujo comportamento existe.
- src/battle/types.ts: CombatState, CombatLane, equipamentos/usos na unidade, attackAvailable, progresso de evolução e capacidade inicial 2.
- Troca de Arsenal: segunda cópia de Kylast em campo vira ação Rápida por play com equipmentId e alvo aliado; reserva paga somente a magia, equipamento usa mana comum. Resolução embaralha cópia gerada de Kylast; anulação não.

### Task 1: Combate básico

- [x] Criar tests/battle/combat.test.ts: dano não bloqueado, troca simultânea, remoção do bloqueador mantendo bloqueio, ataque zero, invalidez sem mutação, respostas rápidas/armadura e fim por Nexus.
- [x] Observar testes falharem antes de implementar.
- [x] Implementar combate, integração de comandos/prioridade e settle compartilhado. Dar acesso a Lentas/unidades só fora de combate; dois passes no combate resolvem pilha e golpes, não rodada.
- [x] Testes e tipos passam antes da próxima tarefa.

### Task 2: Equipamentos, evolução e dois golpes

- [x] Criar tests/battle/equipment.test.ts e kylast.test.ts com custos, slots, substituição/retornos, evolução por identidades e cópias, dano preservado, arma escolhida e dois golpes.
- [x] Observar falhas antes de implementar.
- [x] Implementar arsenal e catálogo parcial, Troca de Arsenal e retorno de equipamentos por morte/recall/obliteração. Tipos de efeito auxiliares stun/recall/obliterate não adicionam cartas canônicas automaticamente.
- [x] Executar testes de todo o núcleo e tipos.

### Task 3: Alastor e Banjo

- [x] Testar dano lateral, lacunas, alvos fora do combate excluídos, Ybew presente/ausente, Banjo na segunda arma, duas cópias e anulação do gatilho sem descartar equipamento.
- [x] Observar falhas antes de implementar.
- [x] Integrar gatilhos pré-golpes com respostas e usos por cópia. Limpar atordoamento ao mudar rodada.
- [x] Executar suíte e tipos; revisão independente e regressões para achados. Atualizar README, plano e registro de execução com limites reais.

## Decisões técnicas de fluxo

Após declarar ataque, defensor atribui todos os bloqueadores (lista vazia permitida). Depois, atacante escolhe alvos dos Banjos necessários via prepareAttack; sem Banjo, abre diretamente respostas com prioridade do atacante. Assim o alvo do Banjo pode ser o bloqueador já escolhido, sem mudar a sequência de armas. Cada escolha abre resposta antes de golpes. Respostas ao combate resolvem em LIFO e então os golpes, sem outra rodada. Suportes de gatilhos de entrada/equipagem e Colar ficam explicitamente fora do catálogo parcial desta entrega.
