# Git e backups — estado e proposta

2026-11-03. Proposta para aprovação, não automação instalada.

## Estado auditado

- Windows; raiz `C:/Users/Bruxo/Documents/ChatGPT/Game`; cerca de 134 GB livres em C: no momento da consulta.
- Git inicializado em master, sem commits/HEAD, sem remotos e sem configuração local de branch remota. Todo o jogo já estava não rastreado antes da integração.
- .gitignore existente exclui tools, node_modules, coverage, dist e tmp/npm-bootstrap; não exclui todo tmp nem release. Não foi alterado. Não executar `git add .` antes de revisar arquivos privados, temporários, tamanhos e segredos.
- Não foram encontradas tarefas do Agendador cujo nome mencione CAPS/backup/Game, nem ações que mencionem o caminho Game ou CAPS-Game. Busca por esses indicadores não prova ausência de um backup genérico externo.
- Exportação JSON de perfil descrita no [README](../README.md) é backup de progresso do jogador, não do projeto. Pacote release não substitui código, lore e originais.
- Nenhum destino de backup integral, cópia íntegra ou restauração foi verificado. Não declarar proteção ativa.

## Fluxo de commits proposto

1. Antes do primeiro checkpoint, revisar o acervo inteiro, segredos/privacidade e arquivos grandes; decidir explicitamente o que versionar e o que guardar em backup. Preservar materiais únicos em tmp/tools que sejam necessários à reconstrução.
2. A cada ciclo concluído, revisar somente o diff da tarefa, executar verificações pertinentes e atualizar os documentos afetados e HANDOFF.
3. Adicionar caminhos explícitos; revisar `git diff --cached` e criar commit local descritivo conforme autorização aplicável. Registrar hash e resultado no relatório de encerramento.
4. Push somente após o usuário autorizar URL do remoto e branch. Conferir configuração e resultado real; não usar force, reset destrutivo ou reescrita de histórico.

Não foi criado commit documental isolado nesta integração: isso não produziria um checkpoint recuperável do jogo, que ainda está inteiramente não rastreado. Não existe remoto autorizado para push.

## Backup local proposto — aguarda aprovação

| Parâmetro | Proposta concreta |
|---|---|
| Origem | `C:/Users/Bruxo/Documents/ChatGPT/Game` |
| Destino | `C:/Users/Bruxo/Documents/Backups/CAPS-Game` (fora da origem; não criado nem validado) |
| Diários | 22:00 America/Sao_Paulo, sete snapshots diários válidos |
| Semanais | Domingo 22:15, oito snapshots semanais válidos |
| Mensais | Dia 1 às 22:30, doze snapshots mensais válidos |
| Extraordinários | Antes de mudanças estruturais, sem expiração automática até política específica |
| Agendamento | Agendador de Tarefas do Windows, independente do Codex; recuperar execução perdida na próxima oportunidade |
| Logs/manifests | Subpastas logs e manifests no destino; data, classe, origem, hash/versão, contagem, bytes, resultado e validação |
| Restauração de teste | `C:/Users/Bruxo/Documents/Backups/CAPS-Game-restore-test`, sem sobrescrever dados existentes |

Incluir fontes, .git, .agents, documentos, lore, referências, configurações e artes originais/editáveis. Excluir dependências reinstaláveis e caches somente após confirmar reconstrução; revisar tmp, tools e release individualmente, pois podem conter material único. Excluir segredos e credenciais identificados, sem descartá-los silenciosamente da estratégia de recuperação.

Cada snapshot deve ser independente: sem espelhamento com exclusão da origem/destino. Copiar para staging exclusivo, calcular manifesto SHA-256, verificar completude e promover a válido somente após conferência. Fazer nova tentativa se arquivos mudarem durante a cópia. Em falha, registrar e preservar a última cópia válida.

Testar a primeira restauração antes de ativar retenção e repetir mensalmente em diretório separado; comparar hashes e verificar arquivos necessários à reconstrução. Não restaurar por cima do jogo. Retenção só pode apagar snapshots validados da mesma classe, após existir substituto recente verificado, respeitando a política aprovada.

Este destino usa o mesmo disco da origem e não protege contra falha física do disco. Recomenda-se segunda cópia em unidade independente; caminho ainda não definido. Antes de instalar, validar permissões de escrita, espaço e conta de execução e apresentar script/tarefas concretos para aprovação. Não foram criados scripts, pastas de backup, tarefas ou exclusões.
