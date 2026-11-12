# Perfis locais e pasta de saves — proposta

**Estado:** aprovado e implementado em 11/11/2026 conforme [plano](../plans/2026-11-11-perfis-pasta-saves.md); validações e limites estão em [PROGRESS](../../PROGRESS.md#perfis-locais-independentes--11112026).

## Objetivo

Permitir criar e alternar perfis locais independentes. O save do perfil ativo deve ficar em uma pasta dedicada do jogo, fora do diretório de instalação/build, para que atualizar ou trocar o executável não misture os dados.

## Como funciona hoje

- `localStorage['caps.profile.v1']` contém um `SavedGame` v1 com `profile`, `run` e `session`; portanto mistura progresso permanente e aventura ativa em uma chave.
- `main.ts` lê essa chave ao iniciar e `paint()` chama `persist()`, que sincroniza a semana e pode escrever novamente na inicialização.
- A criação de perfil só ocorre no onboarding inicial; não há lista nem alternância depois.
- `desktop/main.cjs` fixa `userData` em `%APPDATA%\CAPS-Game`. O renderer usa contexto isolado e ainda não tem uma ponte nativa para arquivos.

## Estrutura proposta

- Salvar cada perfil como um JSON completo, com identificador UUID, em `%APPDATA%\CAPS-Game\Saves\<uuid>.json`.
- Um arquivo contém o progresso permanente (`Profile`) e a jornada atual (`RunState` e sessão de batalha), usando a estrutura validada que já existe. Não haverá uma segunda pasta de progresso nem vários slots de aventura nesta etapa.
- Manter o último UUID ativo numa preferência separada do save. Cada perfil terá nome e protagonista inicial dentro dos dados já existentes.
- Usar uma ponte Electron com operações restritas a listar, carregar e gravar arquivos sob `Saves`; o renderer não recebe acesso arbitrário ao sistema de arquivos. A prévia no navegador mantém armazenamento local separado por UUID.
- Gravar por arquivo temporário e substituição segura. Se um arquivo estiver inválido ou uma gravação falhar, preservar o arquivo anterior e exibir erro; nunca criar silenciosamente um perfil vazio no lugar dele.

## Fluxo de uso

1. No primeiro início, se não houver arquivo de perfil mas existir `caps.profile.v1`, validar e migrar esse save para um UUID em `Saves`.
2. Confirmar que o JSON gravado pode ser relido antes de selecionar o perfil migrado. Manter a chave legada intacta como recuperação; parar de gravá-la depois da migração.
3. Abrir o perfil migrado normalmente. Se não existir save legado nem arquivo, manter o onboarding atual.
4. Em Perfil e progresso, oferecer **Criar perfil** e a lista dos perfis existentes. Criar pede nome e protagonista inicial; alternar primeiro conclui a gravação pendente do atual e então carrega o arquivo do escolhido.
5. Ao iniciar novamente, retomar o último perfil usado para preservar o fluxo atual; a tela de Perfil permite alternar quando necessário.

## Compatibilidade e limites

- Continuar aceitando saves v1 existentes e os backups JSON exportados atualmente.
- O formato nativo poderá adicionar `profileId` no nível superior sem alterar IDs de cartas, estrutura de `Profile`, regras, recompensas ou formato interno de `RunState`.
- Criar e alternar perfis não duplica, limpa nem concede coleção, moedas, maestria ou progresso.
- Esta etapa não inclui excluir ou renomear perfis, slots múltiplos, sincronização em nuvem, retenção/backup automático nem mudança de regras de jogo.
- A pasta `Saves` é armazenamento do jogo, não um backup independente. Arquivos existentes e a chave legada não serão removidos automaticamente.

## Verificações de aceite

- Uma instalação com save v1 migra exatamente coleção, progresso, jornada e sessão; segunda inicialização não duplica a migração.
- Criar dois perfis e alternar entre eles conserva nome, coleção, moedas, maestria e jornada de cada um sem cruzamento.
- Reiniciar seleciona o último perfil ativo; save sem jornada continua com `run: null` e `session: null`.
- Save v1 importado continua validável; perfil corrompido ou escrita interrompida não sobrescreve o arquivo válido anterior.
- Testes cobrem caminho restrito da ponte Electron e armazenamento de fallback no navegador, sem tocar no `%APPDATA%\CAPS-Game` real.

## Aprovação

O autor aprovou um arquivo completo por perfil na pasta `Saves` e aprovou esta proposta para implementação. A escolha mantém progresso e aventura juntos no mesmo arquivo por perfil; não cria uma segunda pasta `Profiles`.
