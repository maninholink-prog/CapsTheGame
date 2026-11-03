# Execução: 2026-11-01-combate-kylast.md

## Preflight e execução

- Task 1: complete. Testes de ataque/bloqueio observaram Command not yet supported antes da implementação. Linha separada do campo, token, bloqueios únicos, resposta com armadura, dano simultâneo e interrupção por Nexus. Após integração: 46 testes aprovados e tipos válidos.
- Task 2: complete. Testes de equipamento/Kylast observaram catálogo ausente antes de implementar. Arsenal, slots, devoluções, evolução global, dois golpes e Troca de Arsenal integrados. Ajustes de tipos em esquema discriminado e assinatura de custos. Após integração: 55 testes e tipos aprovados.
- Task 3: complete. Testes observaram raios ausentes e comando de gatilhos não suportado. Alastor, Ybew e Banjo integrados; uso de Banjo marcado ao enfileirar, sem descartar a arma na resolução/anulação. Regressores adicionais de retornos, capacidade e interação com evolução incluídos.

## Decisões técnicas e limites

- Ruling: manter o checkout Game, sem branch/worktree novo, sem commits nem configurações globais, conforme instrução do autor. Custo: trabalho permanece local até um commit solicitado.
- Ruling: catálogo canônico parcial explicitamente separado; não incluir Colar nem suportes com gatilhos ainda ausentes. Custo: o deck inicial completo de Kylast ainda não pode ser carregado. Testes usam equipamento fictício para a quarta identidade, sem criar artefato canônico.
- Ruling: armas são declaradas antes do bloqueio; alvos de Banjo são escolhidos depois dos bloqueios via prepareAttack e antes das respostas/golpes. Custo: cliente futuro precisa representar essa seleção adicional; preserva a regra de escolher o bloqueador como alvo sem alterar armas.
- Ruling: sem unidade inimiga não se exige alvo de Banjo nem se consome uso; não há atordoamento possível para ativar. Custo se o autor desejar consumo mesmo sem alvo: ajustar coleta de gatilhos e teste desse caso.
- Ruling: Troca com todos os alvos inválidos usa a regra geral de falha de efeito, sem geração de campeão. Custo se o autor quiser embaralhamento independente da equipagem: separar esse subefeito e revisar o teste/documentação. Nenhum reembolso de magia/arma; equipamento fica na mão.
- Ruling: dano principal e resposta simultânea do golpe são aplicados antes da verificação de mortes; em seguida, o raio já disparado usa os vizinhos ainda presentes e a aura atual. Custo: gatilhos adicionais futuros precisam preservar essa ordem. A morte do último Ybew antes do raio remove o bônus sem desfazer danos passados.
- Ruling: capacidade técnica de Kylast é limitada a seis; valores são estado interno de configuração, não desbloqueios de maestria já concedidos. Custo: futura camada de perfil deve calcular a capacidade válida a partir da árvore.

## Revisão

Revisor independente review_combat: nenhum defeito confirmado. Suspeita de geração na Troca sem alvo foi retirada após conferir regra geral de todos os alvos inválidos. Lacunas de cobertura apontadas foram cobertas: duas auras Ybew não acumulam, mesmo Banjo usado nos dois golpes gera um único gatilho, último Ybew morre antes dos raios seguintes, arma substituída não altera sequência, perda de portador não reembolsa Troca, retorno/reentrada de Kylast evoluído e renovação de Banjo. Um teste novo supunha mão vazia, mas a preparação da evolução devolvia outros equipamentos; corrigida a asserção para verificar os dois últimos retornos.

Verificação final: 70 testes em 10 arquivos aprovados; TypeScript sem erros. Comandos independentes: node node_modules/vitest/vitest.mjs run --reporter=dot e node node_modules/typescript/bin/tsc --noEmit.

## Próximo recorte

Colar com sequência aleatória e janelas próprias, gatilhos de Wang/Joia/Damian/robô e primeira interface. Ainda sem IA, mapa, coleção, salvamento e progressão. Não alegar deck completo ou jogo visual entregue.
