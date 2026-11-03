# Execução: 2026-11-01-nucleo-batalha.md

## Decisões de execução

- Ruling: manter checkout Game conforme instrução explícita do usuário, sem novo worktree nem troca de branch. Sem commits automáticos; arquivos preexistentes não foram incluídos em commit. Custo: alterações permanecem locais e sem snapshot Git até um commit solicitado.
- Ruling: npm ausente do PATH; extrair npm 12.2.1 do registro oficial, verificar integridade SHA-512 e executar localmente em tmp/npm-bootstrap. Sem alterar PATH persistente ou instalar ferramentas globais. Dependências locais e package-lock.json preservados. Custo: nesta máquina os comandos diretos do README substituem npm no terminal.
- Ruling: decks sintéticos com pelo menos cinco cartas são aceitos no núcleo; mulligan com substitutas insuficientes retorna erro antes de modificar estado/RNG. Decks reais de início 20/22 serão validados na camada de conteúdo. Custo: regras de montagem ainda não são garantidas por createBattle.

## Preflight

Task 1 fornece tipos/RNG para Task 2. Task 2 fornece estado/comandos para Task 3. Acrescentados ao estado passes consecutivos, descarte e resultado de batalha, necessários aos consumidores. Interfaces mantidas.

## Entregas

- Task 1: complete. Tipos, conteúdo mínimo e RNG LCG32-v1 com embaralhamento sem mutação. Testes inicialmente falharam por módulo ausente. Regressão adicional detectou correlação dos bits baixos no d20; conversão por faixas com rejeição corrigiu empates naturais. Quatro testes de RNG aprovados.
- Task 2: complete. Abertura, iniciativa, mulligan físico e confirmação por ambos. Testes inicialmente falharam por módulos ausentes e passaram após implementação. Decks de entrada e estados são clonados para impedir mutação.
- Task 3: complete. Compras, excesso de mão, fadiga persistente, passes, reserva e rodadas. Testes inicialmente falharam por módulo ausente; passaram após implementação. Compra inicial reaproveita drawOne.

## Revisão e verificação final

Revisão independente review_core: um P2, mulligan com deck curto reduzindo mão. Regressão observada falhando e correção adicionada antes do fechamento. Nenhum outro problema concreto reportado no escopo. Nenhuma pendência menor reportada.

Checks finais: node node_modules/vitest/vitest.mjs run — 17 testes em 3 arquivos aprovados. node node_modules/typescript/bin/tsc --noEmit — código 0.

## Limites da entrega

Sem interface, jogar cartas, ataque/bloqueio, pagamento, efeitos/gatilhos, Kylast, IA, mapa, boosters, checkpoint ou salvamento de perfil. Estado RNG serializável não equivale a um sistema de salvamento entregue. Operações drawOne/advanceRound são internas, não comandos livres do jogador. Eventos privados precisam de filtragem antes da integração com IA. Não alegar vitória por empate simultâneo implementada: nenhum comando deste recorte produz dano simultâneo.
