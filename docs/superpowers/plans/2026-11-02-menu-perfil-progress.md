# Menu e perfil — registro de execução

02/11/2026. Execução inline do plano `2026-11-02-menu-perfil.md`, sem instalações, mudanças globais, commits ou movimentação do projeto.

## Implementado

- Raridades das 23 cartas aprovadas aplicadas no catálogo. Coleção real de 42 identidades.
- Núcleo puro em `src/profile/`: perfil, carteira/extrato, boosters, garantias, maestria, semana, liquidação e validação de salvamento.
- Hub em `src/ui/hub.ts`/`hub.css`: cinco destinos, criação de perfil, coleção filtrada, compra/abertura, nome, backup, progresso e marcos.
- Persistência versionada integrada em `main.ts`: aventura/batalha, pausa da IA, treino separado, exportação e restauração validada.
- Recompensas comuns filtradas pela coleção; exceção das exclusivas do aliado recrutado preservada. Brilho visual na coleção, abertura, mão e unidades próprias no campo, sem efeitos de regra.
- Vitórias e encerramento liquidam moedas, maestria e semana uma vez. Recursos permanentes não fazem parte do snapshot de checkpoint.

## Decisões de implementação

Ruling: a carteira usa casas pagas por aventura para impedir duplicação de Pedras por retorno; vitórias repetidas ainda concedem pontos semanais por identificador de batalha — evita ganho duplicado por reload/rollback — se a economia desejada mudar, esta política é isolada em rewards.ts.

Ruling: aliado temporário pode estar bloqueado na coleção e libera suas exclusivas durante a run, conforme CAMPANHA.md. Não concede posse permanente.

Ruling: árvores de talento não são implementadas neste lote de menu/carteira; o perfil apresenta os pontos conquistados e informa a integração futura. Outras dificuldades não são simuladas: só o mapa Comum existente paga progressão.

## Revisão e correções

Revisão independente `/root/review_profile_menu`: dois achados corrigidos com regressões RED→GREEN. Importação agora valida perfil, mapa, snapshots, batalha e consistência dos IDs antes de substituir o arquivo. Exclusivas de aliados recrutados respeitam a exceção aprovada.

## Verificação pela interface

- Perfil Bruxo com Abe, 0 Pedras, 10 identidades liberadas e outros três protagonistas bloqueados na Aventura.
- Coleção, preços dos boosters, inventário vazio, maestrias, reset e marcos conferidos.
- Aventura iniciada, primeira batalha e mão preservadas após recarga do código. Mulligan confirmado, menu pausado, treino separado aberto e retorno manteve a mão e o estado Pronto para d20.
- Teste separado no origin localhost (perfil QA — Recompensas) recebeu backup gerado por uma aventura completa jogada automaticamente pelo motor/IA, sem modificar o perfil Bruxo em 127.0.0.1.
- Pela interface: 150 Pedras e 1 booster de conclusão; compra Comum → 50 Pedras e 2 boosters; abertura → cinco cartas e 1 booster restante. Reload preservou saldo, contador 1/40 e exatamente o mesmo resultado. Marco semanal 50 foi resgatado uma vez, com extrato e maestria conferidos.
- Screenshot menu: `docs/screenshots/menu-perfil.png`. Abertura de QA: `docs/screenshots/boosters-perfil-qa.png`. Aba de QA fechada; menu do perfil Bruxo mantido, aventura de Abe pausada antes do d20.

## Limites

Salvamento local por origin/navegador; sem conta remota. Backup JSON exportável. Somente quatro protagonistas e mapa Comum. Chefes ainda são o adversário de teste; relíquias, árvores e demais dificuldades seguem futuras. Maestrias calculadas e pontos conquistados já persistem.

## Verificação final

**231 testes em 36 arquivos passaram**, incluindo percurso Comum completo com decisões reais da IA, restauração a cada ação dos quatro protagonistas, garantias/duplicatas, marcos e validação de importação. `tsc --noEmit` e build Vite passaram. Revisão final teve seus dois achados corrigidos. Capturas de navegador conferidas; nenhuma configuração de sistema/projeto alterada.
