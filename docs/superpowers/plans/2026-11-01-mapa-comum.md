# Mapa Comum — Implementation Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Mesmo checkout, sem commits automáticos.

**Goal:** Avanço em rotas, eventos de teste e reviver/checkpoint utilizáveis.
**Architecture:** topologia pura; estado de aventura separado do combate; snapshots sem RNG de drops ou contador de gastos.
**Tech Stack:** TypeScript/Vitest/Vite existentes.
**Spec:** design/MAPA_COMUM.md, CAMPANHA.md.

## Tasks
- [x] Testes primeiro de topologia (10/5/5, chefes obrigatórios, acessibilidade, DAG), navegação e eventos; implementar gerador e adaptador de run.
- [x] Testes primeiro de morte/retry/checkpoint (zero/cap5, vida cheia, rollback, consumo nunca reembolsado, novo sorteio, identidade velha rejeitada); implementar snapshots.
- [x] UI de mapa com ligações/legenda, eventos, reviver, retorno ao mapa e seleção de modos; testes/render e navegador.
- [x] Revisão independente, regressões/tipos/build e documentação de limites.

## Review focus
Rota inacessível nunca pode ser selecionada; nenhuma recompensa repetida; snapshot após recompensa do chefe; retry preserva entrada; regressões do modo curto e IA; nenhum estado econômico futuro recuperável indevidamente.
