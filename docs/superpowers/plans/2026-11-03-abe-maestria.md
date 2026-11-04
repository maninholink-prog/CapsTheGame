# Abe — plano de implementação

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Execução proposta na sessão atual, sem agentes adicionais.

**Goal:** Aplicar os quinze talentos provisórios com conexões aprovadas e incluir a Cinderela aprovada no deck inicial de Abe.

**Architecture:** Reutilizar alocação de talentos, snapshot da run, escolhas de fabricação e pontos de entrada/resolução existentes. Acrescentar um módulo de efeitos de talentos de Abe, sem reestruturar Kylast. Validação, observação da IA e interface acompanham o estado necessário.

**Tech Stack:** TypeScript, Vite, Vitest; nenhuma dependência nova.

**Spec:** [Abe — maestria provisória e conexões aprovadas](../../../design/ABE_MAESTRIA_PROVISORIA.md). Cinderela: [PROGRESS](../../PROGRESS.md), seção de pendências recuperadas, e DEC-008 em [DECISIONS](../../DECISIONS.md).

## Restrições

- Raiz exclusiva: C:/Users/Bruxo/Documents/ChatGPT/Game.
- Sem commit, push, backup, infraestrutura, novas palavras-chave ou artes neste trabalho.
- Preservar IDs existentes, saves anteriores, catálogo de Arma Aprimorada e histórico documental.
- Quinze talentos de um ponto, nível máximo 30, Obra-Prima no nível 30, redistribuição fora da run por 200 Pedras Filosofais.
- Fabricação continua limitada aos quatro Upgrades atuais; não conta como Upgrade resolvido. Evolução continua por seis Upgrades.
- A imagem de maestria de Abe não está aprovada; usar os componentes textuais de talentos já estilizados, com nomes, efeitos, requisitos e controles acessíveis.

## Pontos de revisão

1. Saves antigos sem talentos de Abe continuam aceitos; IDs de outro protagonista, duplicações e pré-requisitos inválidos são rejeitados.
2. Descontos são consumidos no pagamento, gatilhos de resolução apenas em Upgrades bem-sucedidos; custo zero preexistente não aumenta.
3. Contadores de batalha/rodada e escolhas pendentes sobrevivem ao salvamento sem repetir recompensas ou vazar opções adversárias.
4. Compras podem clonar o estado e encerrar a batalha por fadiga; não usar referências antigas nem continuar efeitos após o encerramento.
5. Cinderela usa o portador e sua evolução no momento do golpe, inclusive após substituição ou retorno à mão.

## 1. Catálogo de talentos, perfil e interface

**Arquivos:** src/profile/talents.ts, src/profile/validation.ts, src/ui/talent-view.ts, src/ui/hub.ts; tests/talents.test.ts e testes de salvamento existentes.

**Interfaces:** exportar abeTalents:Talent[] e talentsFor(hero:Champion):Talent[]. Preservar IDs de Kylast; acrescentar IDs estáveis de Abe. allocateTalent e resetTalents mantêm suas assinaturas.

- [ ] Criar testes de quinze nós, conexões exatas da especificação, bloqueio de Obra-Prima abaixo do nível 30, compra e redistribuição por 200, recusa durante run e isolamento por protagonista; executá-los e confirmar falha.
- [ ] Generalizar seleção de catálogo e validação por protagonista, inclusive perfil, run e battle loadouts. Descrição do débito de redistribuição deve identificar Abe.
- [ ] Exibir árvore textual de Abe no perfil, reaproveitando classes talent-nodes/talent-node; manter a constelação de Kylast. Testar quinze botões, requisitos, bloqueios e ausência de imagem inventada.
- [ ] Validar round-trip de save com ambos os protagonistas, save anterior sem talentos de Abe e rejeição de talentos cruzados/duplicados. Executar testes direcionados.

## 2. Efeitos na batalha e fabricação

**Arquivos:** criar src/battle/abe-talents.ts; modificar src/battle/kylast-talents.ts (despacho de setup), src/battle/champions.ts, src/battle/units.ts, src/battle/narrative.ts, src/battle/play.ts, src/battle/types.ts e src/profile/validation.ts; conferir caminhos em src/battle/effects.ts e src/battle/laboratory.ts. Testes novos: tests/battle/abe-talents.test.ts.

**Interfaces propostas:** abeHasTalent(state,owner,id), abeSetup(state,owner,events), abeEntry(state,owner,unit,events), abeUpgradeResolved(state,owner,targets,events), abeCostDiscount(state,owner,definition), consumeAbeCosts(state,owner,definition). Tipos derivados de BattleState, PlayerId, BoardUnit, TargetRef e CardDefinition existentes. Estado opcional por jogador, persistido; observação da IA acompanha campos necessários sem revelar cartas privadas.

- [ ] Escrever testes para os quinze efeitos antes da implementação e confirmar falha: +1 vida base; compra direcionada de Upgrade sem embaralhar o restante; quatro opções; descontos de primeiro Upgrade por rodada e primeiro Projeto por batalha; compra no terceiro Upgrade; dois Upgrades distintos na primeira fabricação; bônus de vida máxima no primeiro Upgrade; ataque temporário no primeiro da rodada; compra ao terceiro alvo diferente; bônus na primeira unidade com três Upgrades; armadura na primeira entrada; cura de Abe no primeiro Upgrade aliado da rodada; bônus de evolução preservando dano; fabricação na primeira evolução.
- [ ] Reutilizar o caminho comum de Upgrade bem-sucedido também para equipamentos marcados e cirurgias; não contar anulação, alvo removido ou cirurgia letal. Não duplicar gatilhos existentes de Lúcia, Gremin ou laboratório.
- [ ] Aplicar bônus de vida máxima explicitamente sem cura como definidos na tabela. Não alterar regras gerais de armadura/Upgrade para implementar talentos específicos.
- [ ] Estender a escolha de fabricação com número de seleções restantes: após a primeira seleção de Obra-Prima, remover a opção escolhida e manter a escolha pendente para a segunda. Escolhas antigas sem esse campo continuam com uma seleção. Reutilizar comandos existentes de escolha, interface e IA.
- [ ] Testar fabricação enfileirada, mão cheia, ausência de Upgrade no deck, Abe fora do campo, reentrada, evolução já alcançada fora do campo, rodada seguinte, múltiplos alvos e isolamento p1/p2. Limites uma vez por batalha persistem após retorno/morte; os requisitos de resolução seguem o texto do talento.
- [ ] Testar save/restore com escolha dupla pela metade e contadores de talentos; teste de IA confirma escolha legal e ocultação de opções inimigas. Conferir consumidores em src/ai e src/ui para custos e escolhas.
- [ ] Executar testes de Abe, narrativa, laboratório, aliados, IA e regressões de talentos de Kylast.

## 3. Cinderela

**Arquivos:** src/content/narrative.ts, src/content/decks.ts, src/battle/combat.ts; conferir cálculo/visualização de dano em src/ai e src/ui. Testes: tests/battle/abe-talents.test.ts e tests/battle/narrative-decks.test.ts.

**Contrato:** novo ID cinderela; equipamento custo 2, região west, raridade epic, +1 dano e +3 total quando o portador for Abe evoluído. Não marcar como Upgrade nem impor exclusividade não aprovada.

- [ ] Escrever testes de catálogo e starter: vinte cartas, duas Cinderelas substituem duas Armas Aprimoradas, carta antiga continua no catálogo. Confirmar falha.
- [ ] Incluir carta e calcular dano com base no portador atual. Reutilizar cálculo entre combate, prévias e IA onde necessário, sem criar motor paralelo de equipamentos.
- [ ] Testar Abe antes/depois de evoluir com arma já equipada, outro portador evoluído, cópia com melhoria de run, devolução e substituição; executar regressões de combate/equipamentos.
- [ ] Saves antigos preservam seu deck existente; a troca se aplica a novos starters, sem migração destrutiva ou remoção de coleção.

## 4. Verificação e continuidade

- [ ] Executar npm run typecheck, testes direcionados citados e npm run build. Executar suíte integral com acompanhamento; se não concluir, registrar duração e limitação sem declarar sucesso integral.
- [ ] Conferir interface do perfil, compra/reset e fabricação dupla no navegador quando disponível; distinguir teste de HTML de inspeção visual real.
- [ ] Rever diff apenas dos arquivos alterados e conferir preservação dos documentos anteriores.
- [ ] Acrescentar resultados reais, limitações e estado da implementação em design/ABE_MAESTRIA_PROVISORIA.md, docs/DECISIONS.md, docs/PROGRESS.md e docs/HANDOFF.md. Sem commit/push/backup.

## Estado do plano — 03/11/2026

Conexões aprovadas pelo autor. Plano preparado e revisado contra as fontes e consumidores encontrados; nenhuma etapa de implementação executada. As interfaces de código acima são propostas técnicas, não regras novas do RPG. Execução direta na sessão atual é a recomendação, por compartilhar estado entre perfil, batalha e salvamento.


## Registro de execução — 03/11/2026

- Plano aprovado pelo autor com “Sim”; execução direta iniciada na raiz explícita Game, preservando alterações documentais preexistentes.
- Ruling: usar o checkout atual e não criar worktree/branch — o autor fixou a raiz exclusiva e suspendeu operações Git; não executar scripts da skill que dependam de commits. Registro mantido neste plano, sem diretório descartável.
- Pre-flight: tarefas 1/2 compartilham TalentId, catálogo e validação; tarefa 3 usa combate e não conta como Upgrade. IDs de Abe recebem prefixo abe- para impedir cruzamento com Kylast.
- Testes de perfil novos falharam nos três casos esperados: catálogo ausente e árvore indisponível. npm/npx ausentes do PATH; executar CLIs locais via node (runtime disponível).


## Resultado da execução — 04/11/2026

- Catálogo, perfil, salvamento, fabricação, combate e Cinderela integrados. O teste de IA primeiro revelou que a observação omitia a contagem de escolhas. A contagem agora acompanha a escolha do próprio jogador. O teste de redirecionamento confirmou que bônus de alvo precisam acompanhar a unidade atingida.
- Ruling: primeira entrada evoluída dispara Inspiração Renovada quando o sexto Upgrade resolve fora de campo. O disparo fica disponível uma vez por batalha. A identidade da unidade acompanha a cópia física para contagem de Upgrades distintos.
- Ruling: manter a revisão de código e a geração do pacote na raiz indicada, sem commits nem criação de branch.
- TypeScript, 62 testes direcionados, Vite e abertura do Electron aprovados. Tentativas amplas interrompidas sem resultado final. Janela nativa do pacote atualizado confirmada. Compra e redistribuição verificadas por testes de perfil e HTML.
