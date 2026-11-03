# Núcleo de batalha — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [x]`) syntax for tracking.

**Goal:** Entregar um motor sem interface que inicializa uma batalha e processa compras, mulligan e rodadas de forma reproduzível.

**Architecture:** Estado explícito, comandos validados e eventos de saída. Conteúdo e sorteio separados do fluxo; sem interface nem IA neste primeiro recorte.

**Tech Stack:** Proposta: TypeScript, Node e Vitest locais ao projeto; versões devem ser verificadas no início da implementação. Nenhuma instalação realizada.

**Spec:** design/PROJECAO_TECNICA.md e CAMPANHA.md, seções aprovadas sobre partida e rodadas.

## Global Constraints

- Trabalhar em C:/Users/Bruxo/Documents/ChatGPT/Game. Não mover pastas, modificar vínculos do aplicativo nem configurações globais.
- Nexus do jogador: 20; mão inicial: 5; mão máxima: 10; um mulligan gratuito.
- Mana inicial: 1; máxima: 10; reserva: 3.
- Compra automática apenas de quem recebe o ataque. Primeira rodada permanece com uma mana.
- Nenhuma alteração de regra para facilitar o código. Estados de combate ainda não suportados devem ser rejeitados explicitamente.
- Este plano implementa apenas a primeira entrega; não promete combate completo, cartas especiais, economia ou checkpoint.

## Review Focus

- IDs físicos diferentes para cópias da mesma carta: substituir uma cópia não exclui a outra do mulligan.
- Empate no d20: repetir ambos os dados, sem favorecer um jogador.
- Reserva preservada entre rodadas e limitada a 3, sem contar mana recarregada como sobra.
- Compra com mão cheia consome a carta do deck; compra com deck vazio aumenta fadiga.
- Comando inválido não altera estado nem avança RNG.

## Arquivos e interfaces projetados

- src/content/schema.ts: CardDefinition { id: string; cost: number; kind: 'unit' | 'spell' | 'trick' | 'armor' | 'equipment' }.
- src/battle/types.ts: PlayerId = 'p1' | 'p2'; CardInstance { instanceId: string; definitionId: string }; PlayerState com deck, hand, nexus, mana, maxMana, reserve, fatigue, mulliganUsed. BattleState com players, round, attackOwner, priorityOwner, phase e rngState. Phase inicial: 'opening' | 'actions' | 'ended'.
- src/battle/random.ts: nextInt(state: number, min: number, max: number): { value: number; state: number }; shuffle<T>(items: readonly T[], state: number): { items: T[]; state: number }.
- src/battle/setup.ts: createBattle(decks: Record<PlayerId, CardInstance[]>, seed: number): BattleState.
- src/battle/commands.ts: Command = { type: 'mulligan'; player: PlayerId; instanceIds: string[] } | { type: 'start' } | { type: 'pass'; player: PlayerId }; Result = { ok: true; state: BattleState; events: BattleEvent[] } | { ok: false; state: BattleState; error: string }. applyCommand(state: BattleState, command: Command): Result.
- src/battle/draw.ts: drawOne(state: BattleState, player: PlayerId): Result.
- src/battle/round.ts: advanceRound(state: BattleState): Result. Apenas para o recorte sem pilha, combate ou gatilhos pendentes; fases futuras acrescentarão suas condições.
- BattleEvent é união discriminada: cardDrawn(player, instanceId), cardDiscarded(player, instanceId), fatigueDamage(player, amount), initiativeRolled(p1, p2), roundStarted(round, attackOwner), battleEnded(winner: PlayerId | 'draw').

Os nomes entre parênteses acima são os campos dos eventos; cada evento tem um campo type com o nome indicado. Não expor eventos de mão privada a uma futura IA sem filtrar a visão.

### Task 1: Estado e sorteio reproduzível

**Files:** criar package.json, tsconfig.json, src/content/schema.ts, src/battle/types.ts, src/battle/random.ts, tests/battle/random.test.ts.

**Interfaces:** produz tipos e funções random descritos acima. PRNG não criptográfico com algoritmo fixo e versionado; semente zero válida. Embaralhamento Fisher–Yates, sem modificar entrada.

- [x] Escrever testes: shuffle preserva todos os instanceId, não modifica entrada e repete resultado com mesma semente; nextInt respeita intervalo inclusivo; duas cópias com definitionId igual mantêm instanceId diferentes.
- [x] Instalar ferramentas somente locais ao projeto e executar `npm exec vitest run tests/battle/random.test.ts`; confirmar falha por implementação ausente.
- [x] Implementar interfaces e configurar `npm run typecheck` como `tsc --noEmit`.
- [x] Executar o teste e typecheck; ambos devem passar. Revisar diff sem incluir dados ou arquivos preexistentes alheios à entrega.

### Task 2: Abertura, mulligan e iniciativa

**Files:** criar src/battle/setup.ts, src/battle/commands.ts, tests/battle/opening.test.ts.

**Interfaces:** consome tipos e random da Task 1; produz createBattle e applyCommand. createBattle embaralha e distribui 5 para cada lado, Nexus 20 e mana 1. Mulligan devolve cópias físicas apenas após comprar substitutas e embaralha; cada lado confirma uma vez, inclusive escolhendo zero. start exige ambos confirmados, rola d20 para ambos até desempatar e compra uma carta para o vencedor. round passa a 1 sem incrementar mana.

- [x] Testar: abertura 5/5; após start vencedor tem 6 e outro 5; ambos com mana 1; empate repete ambos os dados usando sequência de RNG controlada no teste; mulligan permite outra cópia da mesma identidade e impede a devolvida entre as substitutas; segunda confirmação e IDs duplicados ou inexistentes falham sem mudar estado/RNG.
- [x] Executar `npm exec vitest run tests/battle/opening.test.ts` e confirmar falhas antes da implementação.
- [x] Implementar createBattle e comandos mulligan/start, com validação antes de sortear.
- [x] Reexecutar testes de abertura e random e `npm run typecheck`; esperar todos aprovados.

### Task 3: Compra, rodada e término

**Files:** criar src/battle/draw.ts, src/battle/round.ts, tests/battle/round.test.ts; modificar src/battle/commands.ts para pass.

**Interfaces:** drawOne e advanceRound conforme mapa acima. Passes consecutivos dos dois lados em actions avançam a rodada deste recorte. Mana não gasta vai à reserva até 3 antes da recarga; nova mana máxima cresce até 10. Trocar ataque, comprar só para novo portador, manter prioridade com ele. Fadiga incrementa por tentativa vazia e causa esse dano, sem reset após reposição. ended bloqueia comandos posteriores.

- [x] Testar: mana máxima 10 não cresce; reserva existente 2 e sobra 2 resulta em 3; só novo portador compra; mão cheia descarta a compra e reduz o deck; deck vazio causa danos 1, 2, 3; adicionar carta e esvaziar novamente não reinicia fadiga; compra letal encerra antes de novas ações; passe fora de prioridade não altera estado/RNG.
- [x] Executar `npm exec vitest run tests/battle/round.test.ts` e confirmar falhas antes de implementar.
- [x] Implementar compra, rodada e passes com eventos e verificações de término. Empate simultâneo será testado na entrega de dano simultâneo, pois não é produzido pelos comandos deste recorte.
- [x] Executar `npm exec vitest run tests/battle` e `npm run typecheck`; esperar aprovação integral. Registrar limites: ainda sem jogar cartas, combate ou gatilhos de rodada.

## Continuação

Após esse recorte, detalhar um plano separado de prioridade, pagamento e resolução de cartas, depois combate e Kylast. Não adaptar o protótipo visual antes dessas interfaces estarem verificadas. Fazer commits apenas se solicitado; não incluir toda a pasta histórica no primeiro commit incidentalmente.
