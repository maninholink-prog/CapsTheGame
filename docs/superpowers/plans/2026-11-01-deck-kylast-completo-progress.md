# Execução: 2026-11-01-deck-kylast-completo.md

## Preflight

Suportes precisam compartilhar cálculo de desconto com equipagem e Troca. Colar precisa compartilhar entrada de unidade e equipagem com play normal, mantendo fonte física e controlador do portador distintos. ResolveStack precisa interromper e retomar entre ativações; commands não deve executar combate ao receber uma resolução pausada. Internos de continuação são excluídos da seleção de alvos de anulação.

## Entregas e testes

- Task 1: complete. Suportes testados antes de implementar: Wang/Damian sem definições e descontos/robô sem efeitos, quatro falhas observadas. Entrada compartilhada, busca, descontos, gatilhos de equipar e expiração de Damian implementados. Após integração: 74 testes aprovados e tipos válidos.
- Task 2: complete. Dez testes de Colar falharam antes de implementar. Modos colar/colar-card/colar-next, escolha tardia de alvos e adversário, pausas e retomada, fontes independentes e equipagem recursiva implementados. Após primeira integração: 84 testes aprovados e tipos válidos.
- Task 3: complete. Testes de catálogo observaram factory ausente. Catálogo completo de dez identidades, factory de vinte cartas e metadados aprovados adicionados. Regressão de Troca gratuita com mão cheia detectou devolução prematura: arma selecionada agora sai da mão antes da substituição, abrindo o espaço correto. Correção observada verde. Novos cenários incluem Wang com mão cheia, desconto em nova rodada e reprodução por semente.

## Decisões e limites

- Ruling: manter checkout Game e ferramentas locais, sem commits automáticos nem vínculos/configurações do aplicativo. Custo: alterações continuam sem snapshot de commit até solicitação.
- Ruling: continuações do Colar são estado interno não anulável; cada carta sorteada é um efeito distinto e anulável. Congelar transformação em Troca quando a cópia é selecionada, como ao jogar da mão. Custo: interface deve distinguir gatilho, carta revelada e continuação, ocultando os alvos ainda não sorteados.
- Ruling: equipamento sorteado pode atingir portador adversário, mas mantém o dono físico para devoluções. Evolução observa o lado que controla o portador; robô exige equipagem em aliado do ativador. Custo: guardar proprietário de cada equipamento, não inferi-lo somente do campo.
- Ruling: para até X alvos, sortear quantidade legal entre mínimo e máximo e depois alvos distintos. Escolhas são feitas só ao resolver. Custo: a quantidade também pode variar, inclusive zero quando permitido pelo texto.
- Ruling: não atribuir regiões individuais aos equipamentos sem aprovação explícita. Exclusividade de Kylast está registrada; regiões aprovadas do campeão e suportes mantidas. Custo: ofertas futuras devem usar o vínculo exclusivo até a definição regional necessária.
- Ruling: sem detector genérico de ciclos nesta entrega. Cada ativação abre janela e pausa; não declarar empate por limite numérico de ativações. Custo: sequências obrigatórias que continuem indefinidamente entre janelas ainda exigem futura detecção formal, conforme regra de design.

## Revisão

Revisão independente review_colar confirmou agendamento, seleção tardia, alvos, propriedade, custos e suportes, sem defeito concreto adicional. Apontou inferência indevida de regiões nos equipamentos; removida. A regressão de mão cheia foi detectada localmente e corrigida antes do fechamento. Nenhum achado menor pendente reportado.

Verificação final: 90 testes em 13 arquivos aprovados. TypeScript sem erros. Comandos independentes: node node_modules/vitest/vitest.mjs run --reporter=dot; node node_modules/typescript/bin/tsc --noEmit.

## Próximo recorte

Primeira interface local de batalha para testar o deck com ações visíveis, alvos, bloqueio e janelas do Colar. Ainda sem IA, mapa, coleção, salvamento ou progressão. A detecção formal de ciclos obrigatórios permanece explicitamente pendente.
