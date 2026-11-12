# Perfis e pasta de saves — plano de implementação

> **Para agentes implementadores:** seguir `superpowers:executing-plans` tarefa por tarefa. Cada etapa tem testes antes da implementação. Este plano não autoriza commit, push, publicação ou backup.

**Objetivo:** permitir criar e alternar perfis locais independentes, armazenando cada `SavedGame` completo como um JSON em `%APPDATA%\CAPS-Game\Saves\<uuid>.json`.

**Arquitetura:** Electron expõe por preload uma API estreita de listagem/leitura/gravação sob a pasta `Saves`; o renderer usa a mesma interface com fallback de navegador em chaves namespaced. O save v2 inclui `profileId` e mantém `profile`, `run` e `session`; a migração v1 valida, grava, relê e só então seleciona o arquivo, sem apagar a chave legada.

**Stack:** TypeScript, DOM/Vite, Electron CJS/IPC, Vitest e `node:fs/promises`.

**Especificação:** [Perfis locais e pasta de saves](../specs/2026-11-11-perfis-e-pasta-de-saves.md)

## Restrições globais

- Uma pasta `Saves` dentro do `userData` existente; sem caminho arbitrário vindo do renderer.
- Um arquivo completo por perfil; sem slots, exclusão, renomeação, cloud ou backup automático.
- A chave legada `caps.profile.v1` nunca é apagada; migração repetida não duplica perfis.
- Saves v1 e backups JSON atuais continuam legíveis; IDs de cartas, progresso e regras não mudam.
- Falha/corrupção de leitura ou escrita nunca inicializa silenciosamente um perfil vazio nem sobrescreve o último save válido.
- Testes de arquivo e smoke usam diretórios temporários; não abrem `%APPDATA%\CAPS-Game` real.
- Preservar todas as alterações locais preexistentes; não commitar, fazer push, publicar ou criar backup.

## Pontos de revisão

1. **Save v1 legado sem pasta `Saves`:** migrar uma vez e preservar byte a byte a chave legada — Task 2.
2. **Save v1/v2 malformado:** recusar carregar e manter o arquivo — Tasks 1 e 2.
3. **Falha entre criar UUID e gravar:** não registrar perfil parcialmente criado — Tasks 1 e 3.
4. **Troca com gravação pendente ou recusada:** salvar o perfil atual antes da troca; em falha, permanecer nele — Task 3.
5. **Diretório `Saves` com perfis corrompidos ou IDs inválidos:** não ler caminhos fora da pasta e manter os outros perfis acessíveis — Task 1.

## Task 1: Armazenamento Electron restrito

**Arquivos:** criar `desktop/save-store.cjs`, `desktop/preload.cjs`, `tests/desktop/save-store.test.mjs`; modificar `desktop/main.cjs`.

**Interfaces:**

- `createSaveStore(userDataPath)` retorna `list(): Promise<SaveSummary[]>`, `read(id: string): Promise<string | null>` e `write(id: string, raw: string): Promise<void>`.
- `SaveSummary` contém somente `id`, `name`, `hero` e `valid`; não inclui o conteúdo completo do save na listagem.
- Preload expõe `window.capsSaves.list/read/write`; não expõe `ipcRenderer`, `fs` nem caminhos.
- IDs aceitos são UUIDs; arquivos ficam exclusivamente em `path.join(userDataPath, 'Saves', id + '.json')`.

- [x] Escrever testes de listagem vazia, gravação/leitura, atualização, JSON inválido, UUID/path traversal, arquivo corrompido e preservação de outros perfis; usar diretório temporário; rodar e confirmar falha inicial por módulo ausente.
- [x] Implementar `desktop/save-store.cjs` com operações assíncronas, escrita em temporário e rename, validação do JSON/perfil e nomes gerados exclusivamente pelo UUID validado.
- [x] Implementar preload com a lista explícita de três operações e validação dos argumentos no handler IPC em `main.cjs`.
- [x] Configurar `webPreferences.preload` mantendo `sandbox:true`, `contextIsolation:true` e `nodeIntegration:false`.
- [x] Rodar `node node_modules/vitest/vitest.mjs run tests/desktop/save-store.test.mjs`; os três testes passam e usam diretório temporário.

## Task 2: Formato v2, adapter e migração v1

**Arquivos:** criar `src/profile/save-store.ts`, `src/ui/electron-api.d.ts`, `tests/profile/save-store.test.ts`; modificar `src/profile/storage.ts`.

**Interfaces:**

- `SaveSummary = {id: string; name: string; hero: Champion; valid: boolean}`.
- `SaveStore = {list(): Promise<SaveSummary[]>; read(id: string): Promise<string | null>; write(id: string, raw: string): Promise<void>}`.
- `createBrowserSaveStore(storage: Storage): SaveStore` usa chaves `caps.profile.v2.<uuid>` e não usa a chave v1 para gravações novas.
- `loadProfiles(store, legacyStorage, activeId)` valida saves, lê o último perfil selecionado, migra `caps.profile.v1` apenas se ainda não houver perfis e retorna perfil ativo + lista.
- `SavedGame` v2 acrescenta `profileId`; `decodeSave` continua aceitando versão 1 e devolve dados v2 normalizados sem alterar `Profile`, `RunState` ou `BattleSession`.

- [x] Escrever testes de armazenamento namespaced, listagem por UUID, round-trip v2, leitura de v1 e migração idempotente que mantém a chave legada; confirmar falha inicial por módulo ausente.
- [x] Implementar o adapter de navegador e os tipos globais mínimos do preload.
- [x] Estender codec/validação para v2 e compatibilidade v1; rejeitar `profileId` inválido, perfil inválido e versões desconhecidas.
- [x] Implementar migração: validar legado, criar UUID, gravar v2, reler e validar, depois selecionar. Nunca remover `caps.profile.v1`.
- [x] Testar falha na gravação/read-back: erro preserva chave v1 e não retorna um perfil vazio.
- [x] Rodar testes de armazenamento, perfil e integração; 40 testes passaram após as verificações adicionais de run/sessão.

## Task 3: Inicialização, gravação e gerenciamento na UI

**Arquivos:** modificar `src/ui/main.ts`, `src/ui/hub.ts`, `src/ui/profile-view.ts`, `src/ui/hub.css`; criar/estender testes de perfil UI e integração.

**Interfaces:** `main.ts` seleciona `window.capsSaves` em Electron e `createBrowserSaveStore(localStorage)` no navegador; `profile-view` recebe lista resumida + ID ativo; uma função de switch aguarda `flush()` antes de validar e aplicar o próximo save.

- [x] Escrever testes de UI para perfil ativo, perfis alternativos, botão **Criar perfil**, seleção por teclado e criação por nome/protagonista; conferir semântica de botões e navegação por teclado no navegador.
- [x] Fazer bootstrap assíncrono com estado de carregamento: listar/carregar ou migrar antes de `paint()`/`persist()`; em erro, mostrar estado protegido sem onboarding vazio.
- [x] Serializar gravações por perfil. `lastGood` avança apenas depois de write bem-sucedido; `flush()` rejeita em falha e bloqueia troca até resolução.
- [x] Adicionar lista e seleção a Perfil e progresso; mostrar o ativo; nova criação reutiliza onboarding com ação de cancelar/voltar e começa selecionada somente após gravar/verificar o novo arquivo.
- [x] Antes de alternar, persistir o atual; carregar/validar o escolhido e só depois atualizar `caps.active-profile.v1` e estado da UI.
- [x] Preservar import/export JSON atual, treinamentos, runs e sessão em andamento; não remover perfil nem limpar coleção ao alternar.
- [x] Testar dois perfis com carteiras, coleções e estado de run/sessão distintos; navegador verificou criação, troca e reabertura. Falha de escrita na troca não foi injetada em runtime; falha de migração está coberta por teste.
- [x] Rodar testes focados de armazenamento, perfil, UI e save/run; 40 testes passaram e os dois perfis permaneceram isolados.

## Task 4: Verificação final e continuidade

**Arquivos:** `docs/DECISIONS.md`, `docs/PROGRESS.md`, `docs/HANDOFF.md`, spec e este plano.

- [x] Rodar typecheck, testes focados e suíte completa; 87 arquivos/469 testes passaram. Um novo teste de isolamento também passou em execução focada posterior.
- [x] Rodar build Vite temporário e build portátil após a suíte verde.
- [x] Smoke Electron em cópia isolada com `userData` confirmado; onboarding, criação de dois saves por fixture UI e alternância passaram. Perfil padrão não foi aberto.
- [x] Revisar `git diff --check` e preservar arquivos locais anteriores.
- [x] Registrar decisão aprovada, resultado, limitações e estado sem commit/push/publicação/backup.

## Revisão do plano

- Cobertura: migração, create/switch, storage nativo e fallback, compatibilidade, escrita segura e recuperação estão associados às Tasks 1–4.
- A operação de excluir perfis e a separação física de progresso foram excluídas conforme escopo aprovado.
- A gravação não altera regras, IDs, recompensas nem conteúdo de jogo.

## Registro da execução

- A interface de `loadProfiles` lê o último UUID diretamente de `legacyStorage` usando `activeProfileKey`, em vez de receber `activeId` como argumento. Isso mantém a preferência num único lugar e segue a especificação, que define a preferência separada do arquivo do perfil.
- O smoke Electron automatizado rodou numa cópia temporária do pacote, usando `CAPS_QA_USERDATA`; nenhum perfil real foi usado.
- A suíte integral foi 469/469 antes de adicionar um teste focado que também passou; por isso o total de 470 observações não significa uma nova execução integral 470/470.
- A troca após falha de escrita foi verificada pelo fluxo `flush` no código e pela falha de migração em teste, mas a falha de escrita da UI não foi induzida em runtime.
- Sem commit, push, publicação pública ou backup, conforme o escopo aprovado.
