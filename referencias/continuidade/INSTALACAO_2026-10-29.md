# Ferramentas instaladas neste computador — 29/10/2026

Instalação solicitada pelo autor após incorporar os documentos de continuidade. Não foi iniciada análise do LoR nem implementação do jogo.

## Componentes

| Componente | Versão | Local / situação |
|---|---|---|
| Node.js | 24.22.1 | Runtime existente do Codex, reutilizado |
| npm / npx | 11.6.2 | tools/npm; atalhos tools/npm.cmd e tools/npx.cmd |
| REA / rea-agents | 6.8.0 | tools/rea-runtime/node_modules/rea-agents; versão fixada em package.json e lockfile |
| Ghidra | 12.1.4 PUBLIC | tools/ghidra_12.1.4_PUBLIC |
| Temurin JDK completo x64 | 21.0.13+9 | tools/jdk-21.0.13+9 |

Raiz absoluta das ferramentas: `C:/Users/Bruxo/Documents/ChatGPT/Game/tools`. O atalho `tools/rea.cmd` seleciona o Ghidra e o JDK para cada execução. Não houve alteração global de PATH ou JAVA_HOME. O runtime Node está em `C:/Users/Bruxo/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/bin/node.exe`; se for removido ou mudar de local, atualizar os atalhos e a integração.

Os arquivos tools/ são locais e foram incluídos no .gitignore. Não mover essa pasta sem atualizar o registro do MCP.

## Integração e preservação

Setup aplicado apenas ao cliente Codex, após revisar o dry-run. Configuração: `C:/Users/Bruxo/.codex/config.toml`. Backup: `C:/Users/Bruxo/.codex/config.toml.rea.backup`. Comparação TOML confirmou que as configurações anteriores foram preservadas, com acréscimo apenas do servidor REA. Caminhos verificados de Ghidra e JAVA_HOME registrados no ambiente desse servidor.

Skill correspondente instalada em `C:/Users/Bruxo/.agents/skills/reverse-engineer-anything`. A instalação da skill e o registro do servidor foram concluídos; a sessão atual ainda precisa recarregar o cliente para receber as novas ferramentas.

## Validação executada

- Downloads oficiais de Ghidra e JDK: hashes SHA-256 coincidem com os ativos oficiais do GitHub e com o documento recebido.
- Ghidra: `ddac49f903da9d5bac833e5cc79395098b9c33cfd3279be5f31bd00387d2d4db`.
- JDK: `a4dbaa05fca4bd89d84584e58c459bd732efebb1722af80ab13c6516832004f9`.
- npm: tarball conferido pelo SHA-512 integrity do registro npm antes de extrair; pacote REA instalado com npm e versão exata.
- `java -version` e `javac -version`: 21.0.13.
- `rea --version`: 6.8.0.
- `rea doctor --provider ghidra --json`: healthy=true, environment_healthy=true.
- `rea doctor --client codex --json`: healthy=true, environment_healthy=true.
- `rea mcp doctor --json`: initialize, identidade, 229 ferramentas, seis prompts e chamada binary_session aprovados via stdio. Esse teste é um cliente de diagnóstico, não prova de conexão da conversa atual.
- `support/analyzeHeadless.bat` sem argumentos: exibiu Headless Analyzer Usage. Saída 1 esperada pela ausência de argumentos, não análise de arquivo. A primeira tentativa no sandbox não conseguiu salvar preferências no AppData; o mesmo teste com acesso autorizado à pasta normal do aplicativo funcionou.

Evidências locais: tools/rea-setup-plan.json, rea-setup-result.json, rea-doctor-ghidra.json, rea-doctor-codex.json, rea-mcp-startup.json e ghidra-headless-startup.txt.

## Próxima abertura

Fechar e reabrir o Codex para carregar a integração. Na nova sessão, conferir ferramentas REA e binary_session. Não repetir instalações se o registro estiver correto. O LoR foi localizado em `C:/Riot Games/LoR`, com os dois arquivos principais presentes; não foi aberto nem alterado nesta etapa e seus hashes não foram recalculados.

## Fontes oficiais consultadas

- [REA e instruções de instalação](https://github.com/morluto/rea/blob/main/docs/installation.md).
- [Pacote exato REA 6.8.0](https://registry.npmjs.org/rea-agents/6.8.0).
- [Release Ghidra 12.1.4](https://github.com/NationalSecurityAgency/ghidra/releases/tag/Ghidra_12.1.4_build).
- [Release Temurin 21.0.13+9](https://github.com/adoptium/temurin21-binaries/releases/tag/jdk-21.0.13%2B9).
- [OpenAI: registro MCP em config.toml](https://developers.openai.com/learn/docs-mcp).
