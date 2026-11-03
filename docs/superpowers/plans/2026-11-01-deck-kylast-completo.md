# Deck de Kylast: Colar e suportes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: superpowers:executing-plans. Mesmo checkout Game, sem alterações globais ou commits automáticos.

**Goal:** Completar as dez identidades do deck inicial e as janelas próprias do Colar no motor sem interface.

**Architecture:** Gatilhos de suporte operam sobre clones internos; Colar usa continuações internas não anuláveis para suspender e retomar a pilha entre cartas sorteadas. Cada carta ativada abre resposta própria, incluindo unidades/equipamentos/Explosivas.

**Tech Stack:** TypeScript e Vitest locais.

**Spec:** CAMPANHA.md e design/KYLAST_DECK.md, complementos recentes prevalecendo sobre pendências históricas.

## Global Constraints

- Wang compra equipamento do deck ao entrar; falha de busca não provoca fadiga.
- Joias somam desconto de 1 cada no primeiro equipamento com redução efetiva da rodada; custo mínimo zero. Custo zero não gasta esse benefício.
- Damian recebe +1 ataque na rodada a cada equipagem. Robô recebe +1 ataque pela primeira equipagem em aliado a cada rodada; cópias independentes.
- Colar dispara a cada equipagem, inclusive se ativado por Colar. Gatilho pode ser anulado; remover a fonte não cancela o já disparado.
- Primeiro carta do dono do Colar, depois do adversário, sorteada somente após terminar a primeira e suas respostas/efeitos.
- Carta selecionada abre resposta, alvos sorteados apenas ao resolver, ignorando lado mas preservando categoria e alvos distintos.
- Unidade em campo cheio e carta sem alvo são consumidas sem efeito. Mão vazia pula apenas aquele lado. Gratuidade inclui todas as cartas ativadas.
- Terminou a batalha, não continuar sorteios/efeitos. Sem interface, run ou progressão nesta entrega.

## Review Focus

- Seleção do adversário não usa a mão antiga nem ocorre antes de respostas que a alteram.
- Equipamento fonte do Colar não é descartado quando seu gatilho é anulado.
- Continuadores internos não podem ser alvos de anulação nem cartas jogadas.
- Pausa do Colar em combate não resolve golpes antes de terminar todas as janelas.
- Colar em alvo adversário mantém dono físico do equipamento e não oferece escolha de alvos antecipada.

## Interfaces e arquivos

- src/battle/supports.ts: equipmentPrice(state,owner,definition), consumeEquipmentDiscount, onEquipmentAttached e onUnitEntered; mutações somente em clones.
- src/battle/units.ts: enterUnit(state,owner,source,position,events), compartilhado por play normal e ativação gratuita.
- src/battle/colar.ts: resolveColarTrigger, resolveColarContinuation, resolveColarCard; recebe resolvedor de magia por callback para evitar ciclo de dependências.
- PendingEffect modos colar, colar-card e colar-next; activation pode congelar Troca de Arsenal no momento da seleção. Janela nova marca responseWindowOpened; resolveStack pausa em vez de consumir todas as cartas na mesma passagem.
- Equipagem compartilhada aceita origem física e controlador do alvo distintos; retornos usam o dono do equipamento. Evolução acompanha unidades controladas pelo lado do portador.
- src/content/kylast.ts: catálogo completo kylastCatalog e createKylastDeck(prefix) com duas cópias das dez identidades. Export antigo preservado para compatibilidade com testes anteriores.

### Task 1: Suportes e custo de equipamento

- [x] Criar tests/battle/supports.test.ts cobrindo Wang/busca vazia/mão cheia, Joia cumulativa/zero/novo turno, Damian cumulativo/expiração e robô por cópia/rodada.
- [x] Observar falhas antes de implementar.
- [x] Implementar gatilhos, custo e entrada compartilhada, integrar pagamento de Troca sem duplicar consumo do desconto.
- [x] Suíte e tipos aprovados antes de concluir a tarefa.

### Task 2: Colar sequencial

- [x] Criar tests/battle/colar.test.ts para gatilho anulável, carta revelada sem alvos, resposta a Explosiva/unidade, seleção tardia do segundo lado, alvo aliado possível, mão vazia, campo cheio, equipagem recursiva e interrupção por vitória.
- [x] Observar falhas antes de implementar.
- [x] Implementar agendamento com continuações internas, pausas e retomada; seleção aleatória determinística e sem alvo antecipado.
- [x] Testar integração com combate e Troca, revisar e corrigir achados.

### Task 3: Catálogo e entrega

- [x] Completar dez definições e criar deck de vinte cartas com IDs físicos únicos; testar contagens/custos/metadados e evolução sem equipamento fictício.
- [x] Rodar testes e typecheck como comandos independentes, solicitar revisão e atualizar documentação/registro.

## Limites

Não implementar detector genérico de ciclos infinitos por limite arbitrário de ativações: o fluxo do Colar pausa em cada janela e não pode travar uma chamada em loop sem interação. Detecção formal de ciclos obrigatórios do jogo completo continua pendente, sem declarar empate por mera repetição de animação/contadores. Maestria, Relíquias e construção da run não fazem parte deste plano.
