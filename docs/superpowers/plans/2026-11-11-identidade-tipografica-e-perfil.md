# Tipografia e Perfil — Plano de Implementação

> **Para agentes de implementação:** executar as tarefas na ordem. Manter as mudanças desta tarefa limitadas aos arquivos listados.

**Objetivo:** criar uma fonte própria de exibição para o C.A.P.S., remover a faixa superior compartilhada e finalizar o Perfil com ícones vetoriais, fundo ilustrado e transições discretas.

**Arquitetura:** gerar um arquivo TTF local a partir de um mestre editável, sem dependência no runtime. Integrar a fonte pelo CSS existente; manter Segoe UI para leitura longa. Reutilizar a arte de santuário já existente e os contratos atuais de perfil.

**Stack:** TypeScript, CSS, Vitest, Vite e ferramenta Python temporária de autoria tipográfica.

**Especificação:** [Tipografia e perfil](../specs/2026-11-11-identidade-tipografica-e-perfil-design.md), aprovada pelo autor em 11/11/2026.

## Restrições globais

- Sem alteração de regras, IDs, dados, balanceamento, estado ou formato de saves.
- Remover `hub-header` de todas as telas; não criar outro cabeçalho horizontal para substituí-lo.
- Usar fonte original apenas em títulos, nomes e chamadas; Segoe UI continua em texto longo.
- Preservar os símbolos regionais aprovados e usar o fundo `public/art/battle-sanctuary-jade-copper.png` com overlay de contraste.
- Não incluir ferramenta tipográfica nem outra dependência no runtime ou em `package.json`.
- Não atualizar pacote Windows, instalar globalmente, commitar, publicar ou criar backup.

## Foco de revisão

1. Letras portuguesas acentuadas e cedilha devem carregar com a fonte própria; conferir caracteres faltando em nomes reais.
2. Fonte de exibição deve ser legível em 14–18 px e não substituir a fonte do corpo.
3. Sem `hub-header` em Perfil, Coleção, Maestria, Boosters ou outras telas internas; saldo e perfil da tela inicial permanecem.
4. Arte de fundo não pode reduzir contraste de números, legendas, botões ou símbolos aprovados.
5. Transição de abas não anima com `prefers-reduced-motion` e não altera rolagem/foco.

### Tarefa 1: Criar a fonte de exibição C.A.P.S.

**Arquivos:** criar `tools/fonts/build_caps_display.py`, `public/fonts/caps-display.ttf`; modificar `src/ui/styles.css`; adicionar teste de carregamento tipográfico no fluxo de UI.

- [x] Verificar a ferramenta de geração tipográfica disponível dentro do ambiente Python temporário; não alterar `package.json` nem dependências de runtime.
- [x] Criar mestre vetorial editável e gerar fonte TTF original com alfabeto latino básico, algarismos, pontuação e caracteres pré-compostos usados em português (`áàâãéêíóôõúüç` e maiúsculas correspondentes).
- [x] Escrever `@font-face` local e token CSS `--font-display`; atribuir a `h1`, `h2`, `h3` e nome do protagonista. Manter Segoe UI no restante.
- [x] Verificar a carga real no navegador e cobertura dos nomes “Cinderela”, “Lázaro”, “Lúcia”, “Korakarom” e “Colecionadores de Artefatos”.

### Tarefa 2: Remover o cabeçalho superior global

**Arquivos:** modificar `src/ui/hub.ts`, `src/ui/hub.css`, `src/ui/tactical.css`; adicionar asserção em `tests/ui/home-view.test.ts`.

- [x] Testar que as páginas internas geradas por `hubShell` não incluem `hub-header` e que a tela inicial ainda exibe perfil, opções e saldo.
- [x] Remover a montagem compartilhada do cabeçalho e suas regras CSS, incluindo os seletores táticos que dependiam dele.
- [x] Confirmar que a arena conserva seus próprios controles e não ganha novo espaço reservado ao topo.

### Tarefa 3: Refinar o Perfil

**Arquivos:** modificar `src/ui/html.ts`, `src/ui/viewport.ts`, `src/ui/profile-view.ts` e `src/ui/hub.css`; atualizar `tests/ui/profile-view.test.ts`.

- [x] Adicionar SVGs originais em cobre/jade para cartas, protagonista, moldura, brilho e relíquia; manter `regionSymbol()` apontando à arte aprovada.
- [x] Aplicar o fundo do santuário no painel de estatísticas com gradiente/overlay escuro localizado.
- [x] Animar a entrada da aba visível com deslocamento curto e opacidade, desativando movimento para `prefers-reduced-motion`.
- [x] Verificar funcionamento do deck expansível, navegação de abas e foco visível.

### Tarefa 4: Verificar e registrar

**Arquivos:** complementar `docs/DECISIONS.md`, `docs/PROGRESS.md` e `docs/HANDOFF.md` por acréscimo, sem remover histórico.

- [x] Rodar testes focados do Perfil/menu, TypeScript e build Vite em diretório temporário.
- [x] Inspecionar prévia no navegador isolado em 1440×960 e 960×700; conferir fonte carregada, contraste do fundo e transição reduzida.
- [x] Registrar capturas e limites com distinção explícita entre navegador e executável Windows.
- [x] Executar `git diff --check`; não atualizar o pacote portátil nesta tarefa.
