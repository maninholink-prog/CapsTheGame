# Integração dos decks de Abe, Arcata e Rubel

**Goal:** Jogar os três decks narrativos aprovados na interface local e nas runs.
**Architecture:** Expandir catálogo tipado e efeitos reutilizáveis; módulo de suportes narrativos para gatilhos; fábrica de decks compartilhada por sessão/run; preservar Kylast e pacotes existentes.
**Tech Stack:** TypeScript, Vite, Vitest já instalados.
**Spec:** design/ABE_ELENCO_EFEITOS.md, design/ARCATA_DECK_EFEITOS.md, design/RUBEL_DECK_EFEITOS.md, CAMPANHA.md.

## Restrições

Não mover projeto, instalar dependências, alterar configurações globais, fazer commits ou implementar Youro. Decks 20/22/22, duas cópias; Rubel Norte/Leste. Recrutamento permanece seis cartas. Usar execução local na pasta existente, já autorizada pelo pedido de integração.

## Review focus

Efeitos de entrada com alvo também em Colar/IA; Upgrades de outros tipos; dano retardado de Escudo e interrupção do combate; compra que causa fadiga fatal; aliases de melhorias e filtros de recompensas que não podem esconder todos os Upgrades colecionáveis.

## Tasks

- [x] Testes primeiro de listas/regiões/seleção e efeitos numéricos aprovados; executar e observar falha.
- [x] Catálogo em src/content/narrative.ts e decks.ts, extensões schema/types; distinguir cartas geradas/habilidades das cartas colecionáveis.
- [x] Motor: buffs, compras, descontos, gatilhos de Upgrade/Fogo/cura, entradas com alvo, rodadas/bloqueio e retaliação respondível; testes de fadiga/morte/limites/aliases/Colar.
- [x] Run/UI/IA: escolha do protagonista, lista/regiões/catálogo completos, alvos de entrada genéricos, elegibilidade de recompensas e apresentação das cartas novas.
- [x] Suite completa, tsc e build; inspeção visual local; revisão independente final e correções; atualizar documentação com limites reais.

Ruling: raridades novas não foram aprovadas. Cartas ficam sem raridade, tratadas pelo fallback existente de loja; sem inventar distribuição de raridade. Informar limite de balanceamento.
Ruling: preserve assinatura padrão Kylast nas APIs; adicionar parâmetro opcional de protagonista. Oponente permanece deck de teste, sem implementar chefes de Félix nesta solicitação.
