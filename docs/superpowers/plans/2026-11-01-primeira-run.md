# Primeira run — Implementation Plan

> REQUIRED SUB-SKILL: superpowers:executing-plans. Checkout existente, sem commits ou mudanças globais.

**Goal:** Três batalhas conectadas com recrutamento real de Abe/Arcata/Rubel.
**Architecture:** regras no motor, run independente, UI como cliente.
**Tech Stack:** TypeScript/Vitest/Vite existentes.
**Spec:** design/PRIMEIRA_RUN.md e fichas aprovadas dos três aliados.

## Tasks
- [x] Testes primeiro para aliados: fabricação/evolução, fogo, cura, magia de campeão e habilidades de combate; implementar e rodar regressões.
- [x] Testes primeiro para run: progressão, pacote, limites, regiões, vida/reset, derrota/empate e repetição; implementar controlador.
- [x] UI de run e fabricação, custos/textos/AI compatíveis; testes, navegador, tipos, build.
- [x] Revisão independente e documentação de execução.

## Review focus
Privacidade das escolhas e mão adversária; suspensão de pilha/combate; fontes de cura e dano real; estado mestre não absorve cartas geradas; transições não podem duplicar recompensas.
