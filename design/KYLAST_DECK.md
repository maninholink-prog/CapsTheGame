# Kylast Heathcliff — ficha consolidada v1

01/11/2026. Consolidação das decisões do autor em CAMPANHA.md. Versão de design, ainda sem implementação ou teste de balanceamento. Correções mais recentes prevalecem sobre propostas históricas.

## Campeão

**Regiões: Norte e Oeste.** Unidades de apoio não são exclusivas do Kylast; equipamentos exclusivos são liberados por sua presença como protagonista ou campeão recrutado no grupo.

| Forma | Mana | Ataque base | Vida base |
|---|---:|---:|---:|
| Inicial | 5 | 3 | 5 |
| Evoluída | 5 | 4 | 6 |

Kylast começa com dois espaços de equipamento e chega a seis pela maestria. É a única carta capaz de manter mais de um equipamento. Espada, Alastor, Banjo e Colar ocupam esses espaços e contam para sua evolução.

**Evoluir:** equipar quatro identidades diferentes de armas/equipamentos em unidades controladas pelo jogador durante a partida. A contagem é global, mesmo com Kylast fora do campo. Cópias e reequipamentos da mesma identidade não repetem a contagem. Não exige quatro equipamentos simultâneos.

**Escolha de arma:** selecionar gratuitamente qual equipamento já equipado usar em cada golpe. Os bônus de dano abaixo pertencem ao golpe que utiliza aquele equipamento; não somar automaticamente o dano de todo o arsenal.

**Evoluído:** dois golpes na mesma ação de ataque, podendo usar equipamentos diferentes. A sequência das armas é escolhida antes de atacar, sem custo adicional. Primeiro golpe com Ataque Rápido. Se matar o bloqueador, o segundo atinge o Nexus. Se o bloqueador sobreviver, responde simultaneamente ao segundo golpe. Não concede um segundo token de ataque nem transfere automaticamente dano excedente do primeiro golpe ao Nexus.

## Deck inicial — 20 cartas

Todas as dez identidades abaixo têm **duas cópias**, limite por carta no deck. Campeão fica fora das 18 cartas de suporte. As quatro identidades de equipamento ocupam as posições de magia da composição inicial, sem mudar automaticamente seu tipo funcional.

| Carta | Cópias | Mana | Ataque/Vida ou bônus de dano |
|---|---:|---:|---|
| Kylast Heathcliff | 2 | 5 | 3/5; evoluído 4/6 |
| Wang Jianxi | 2 | 2 | 1/3 |
| Joia Rubra | 2 | 2 | 2/3 |
| Damian | 2 | 3 | 3/4 |
| Campeão, o robô | 2 | 4 | 3/5 |
| Ybew | 2 | 5 | 5/6 |
| Espada Kylast | 2 | 1 | +1 no golpe que a utiliza |
| Alastor | 2 | 3 | +2 no golpe que a utiliza |
| Banjo Pirata | 2 | 3 | +0 no golpe que o utiliza |
| Colar do Deus Enganador | 2 | 2 | +0 no golpe que o utiliza |

+0 não elimina o ataque base do portador. O pacote do primeiro aliado é escolhido entre três opções aleatórias após a primeira vitória e acrescenta seis cartas (três identidades, duas cópias de cada, incluindo o aliado), sujeito ao limite por identidade. Sem sobreposições ou outras mudanças, o deck passa a 26 cartas.

## Unidades de apoio

- **Wang Jianxi:** ao entrar, compre um equipamento do seu deck. Forjador, portador da Forja do Martelo Kanayago no Kama.
- **Joia Rubra:** primeiro equipamento jogado em cada rodada custa 1 mana a menos, mínimo zero. Dois em campo somam redução de 2. Ferreiro kobold de Korakarom.
- **Damian:** ao ser equipado, ganha +1 de ataque nesta rodada. Tio de Kylast.
- **Campeão:** na primeira vez que você equipar um aliado em cada rodada, recebe +1 de ataque permanente nesta batalha. É o robô de Kylast, não outra carta da categoria campeão.
- **Ybew:** enquanto estiver em campo, dobra o efeito de raio de Alastor: dano lateral passa de 1 para 2. Não acumula entre cópias; saindo o último Ybew, termina o bônus. Minotauro e aprendiz que forjou Alastor.

Efeitos de cartas são adaptações aprovadas, não reprodução automática das habilidades narrativas.

## Equipamentos

### Espada Kylast

Espada longa comum recebida do tio. +1 de dano no golpe; sem efeito especial aprovado.

### Alastor

Cada golpe com a foice que atinge uma unidade causa 1 de dano de raio às unidades imediatamente à esquerda e à direita do alvo na linha de combate, ou 2 com Ybew presente. Pode ativar nos dois golpes se usada em ambos. Golpes no Nexus não causam dano lateral.

### Banjo Pirata

Ao usá-lo para atacar, escolha qualquer unidade inimiga para atordoar. O efeito permite resposta e resolve antes dos golpes. Atordoamento dura até o fim da rodada e impede atacar/bloquear. Se atingir o bloqueador de Kylast, remove-o do combate e permite atingir o Nexus.

**Uso único por cópia**, sem renovar por rodada. Usar a mesma cópia nos dois golpes não repete o atordoamento. Depois do uso, continua equipada. Correção do autor: ao voltar à mão, o uso consumido é reiniciado; reequipar a mesma cópia permite ativar o atordoamento novamente. Sem esse retorno, não há renovação por rodada. A regra mais recente substitui todas as versões anteriores de uma ativação por rodada.

### Colar do Deus Enganador

Ao equipar, dispara um efeito que funciona como magia e permite resposta. Ativa gratuitamente uma carta aleatória da mão de cada jogador, de qualquer tipo:

1. Sorteia a carta de quem equipou o Colar e abre respostas.
2. Na resolução, sorteia os alvos usando o campo atual. Os jogadores responderam sem conhecer os alvos.
3. Concluída a primeira carta e suas respostas, sorteia a carta adversária da mão que existir naquele momento.
4. A segunda carta também permite resposta e sorteia os alvos na resolução.

O sorteio ignora a distinção aliado/inimigo: dano pode atingir aliados e benefícios podem favorecer o oponente. Não foi aprovada remoção de restrições de categoria ou imunidades. Sem alvo possível, a carta sai da mão e é consumida sem efeito. Unidade sorteada com campo cheio também é consumida sem efeito. A gratuidade das cartas ativadas não elimina o custo de equipar o Colar.

## Ciclo de equipamento e mão

- Equipar ou reequipar paga o custo normal, sujeito a descontos aprovados.
- Com espaços cheios, escolher um equipamento anterior para retornar à mão e colocar o novo em seu lugar.
- Ao morrer o portador, equipamentos retornam à mão do mais antigo ao mais recentemente equipado.
- Mão comporta dez cartas. Retornos entram em ordem, descartando os últimos que não couberem. Compras e criações excedentes também são descartadas.
- Armaduras são efeitos sem ocupar espaço: acrescentam vida atual e máxima igualmente, não contam como cura, acumulam e duram durante a batalha. Podem ser usadas como respostas Rápidas e anuladas antes da resolução. Não retornam como equipamentos por morte do portador.

## Maestria

[Árvore de 15 talentos e conexões aprovadas](KYLAST_MAESTRIA.md). Máximo nível 30, um ponto nos níveis pares, um ponto por nó, todos desbloqueáveis. Redistribuir custa 200 gold, somente fora da run. Arsenal Completo exige maestria 30 e permite seis equipamentos, substituindo a ideia antiga de oito.

## Pendências reais para um teste completo

Não reabrir os números e regras aprovados acima. Ainda precisam ser definidos:

- Momento de ativar Banjo quando selecionado apenas para o segundo golpe. A sequência de armas já é escolhida antes de atacar; não reabrir essa decisão.
- Custos e efeitos ao equipar, reaplicações e persistência de modificações; efeitos de duas cópias do mesmo equipamento em Kylast.
- Comportamento do Colar com mão vazia, cartas sem alvo, ativações recursivas e vitória/derrota durante a primeira resolução; destino de cartas consumidas sem efeito.
- Empilhamento de descontos/talentos, falha de busca sem equipamento no deck e ajuste de vida ao evoluir.
- Regras globais de partida foram definidas posteriormente em CAMPANHA.md: 20 de vida inicial, cinco unidades por campo, cinco cartas iniciais e um mulligan gratuito, compra apenas de quem recebe o ataque, mana de 1 até 10 para ambos e reserva de três exclusiva de magias/truques/armaduras. Fadiga crescente mantém o contador após reposição de cartas; empate por Nexus simultâneos vale como vitória da run. Somente uma cópia de cada campeão em campo; outra cópia vira efeito de magia, ainda a detalhar.

Essas pendências não impedem revisar a ficha; impedem afirmar que já existe uma simulação completa e inequívoca.

## Segunda cópia — Troca de Arsenal

Aprovada pelo autor: com Kylast em campo, sua outra cópia na mão vira **Troca de Arsenal**. Se Kylast sair de campo, a cópia ainda na mão volta a ser campeão. O efeito permite **equipar uma arma da mão em um aliado como resposta, pagando o custo da arma**. Jogar a magia também coloca uma cópia de Kylast no deck, conforme regra geral de magias de campeão. **Custo próprio: 1 mana, além do custo da arma; velocidade Rápida. A cópia de Kylast é embaralhada no deck quando a magia resolve; se for anulada, não é inserida.**

A transformação não acrescenta cartas à composição inicial: continua sendo a mesma cópia no deck de 20 cartas. **O limite de duas cópias aplica-se à montagem e às adições entre batalhas; efeitos durante a batalha podem ultrapassá-lo.**

## Reinício entre batalhas

Vida do Nexus é mantida. Estado de combate das cartas é reiniciado: dano das unidades, armaduras e bônus temporários não passam ao próximo encontro. Kylast volta à forma inicial com evolução zerada. Cartas geradas por efeitos de batalha, incluindo Troca de Arsenal, desaparecem ao final do encontro. O Banjo segue o mesmo reinício normal das cartas, sem exceção. Deck e progressão da run são preservados.

## Crescimento do deck nas vitórias

Primeira vitória oferece o pacote de aliado no lugar da recompensa comum. Nas demais vitórias, escolher uma carta entre três opções aleatórias adiciona duas cópias; é permitido recusar. Identidades já no limite de duas cópias não aparecem como opção de adição. Ofertas respeitam regiões e desbloqueios da coleção. Essa regra de construção da run não altera a geração temporária de cartas por efeitos de batalha.

## Regiões das unidades e acesso

Damian: Norte. Wang Jianxi, Ybew e Campeão: Oeste. Joia Rubra: Korakarom/neutra. Classificações aprovadas. As vinte cartas básicas ficam disponíveis automaticamente ao escolher Kylast como protagonista, sem exigir boosters. Ao recrutá-lo como aliado, seus exclusivos ficam elegíveis para ofertas durante a run mesmo sem desbloqueio prévio na coleção; isso não concede posse permanente.

## Raridades do deck inicial de Kylast — aprovadas

| Carta | Raridade |
|---|---|
| Kylast Heathcliff | Ultradimensional |
| Espada Kylast | Comum |
| Damian | Comum |
| Joia Rubra | Rara |
| Campeão, o robô | Rara |
| Alastor | Épica |
| Banjo Pirata | Épica |
| Ybew | Épica |
| Wang Jianxi | Lendária |
| Colar do Deus Enganador | Lendária |

Todas aprovadas pelo autor. Raridade não altera os custos/atributos aprovados nem dispensa as restrições de região/exclusividade. As vinte cartas básicas permanecem acessíveis automaticamente ao escolher Kylast; isso não implica obter variantes Brilhantes automaticamente.


## Evolução — complemento aprovado

Aplica-se após resolver o efeito ou golpe que completa a condição. Preserva dano sofrido (3/5 vira 4/6), equipamentos, armaduras e melhorias da run. Todas as cópias ficam evoluídas até o fim da batalha, inclusive após retorno à mão ou ressurreição; os demais resets desses movimentos continuam válidos. Nova batalha reinicia a evolução.


## Custos, buscas e bônus — complemento aprovado

Descontos somam, mínimo zero; uso limitado só é consumido se houver redução efetiva. Busca de equipamento sem resultado não causa fadiga. Bônus numéricos diretamente na arma são somados antes do multiplicador do Capacete; ataque e bônus da unidade ficam fora desse multiplicador, assim como efeitos secundários. Alastor +2 com melhoria +1 e Capacete fornece +6 ao golpe.


## Posições e Alastor — complemento aprovado

Alastor atinge os vizinhos imediatos do alvo na linha de combate no momento do golpe, excluindo unidades fora do combate. Posições de participantes que saem ficam vazias até o fim desse combate; não aproximar automaticamente outros alvos. O atacante ordena os participantes antes de confirmar e o defensor atribui bloqueadores. Entrada permite escolher posição no campo, mas não há reorganização livre de unidades já presentes.


## Colar — complemento aprovado

Mão vazia pula somente a ativação daquele jogador. Carta consumida sem efeito vai ao descarte e não conta como unidade derrotada. Remover o Colar não cancela seu efeito já disparado; anulação apropriada pode cancelá-lo. Equipamento ativado pelo Colar dispara seu efeito de entrada, com respostas normais. Ciclo obrigatório que repete exatamente o mesmo estado sem possibilidade de terminar encerra a batalha em empate, que vale como vitória da run.


## Interações de equipamentos — complemento aprovado

Kylast pode portar duas cópias iguais em espaços distintos, com usos próprios; apenas a arma escolhida fornece dano e efeitos ao golpe. Alvo removido antes da equipagem resolver mantém o equipamento na mão, sem devolver mana nem ativar gatilhos de equipar. Transferência exige efeito específico e, com destino cheio, devolve à mão um equipamento escolhido do destino. Obliterar o portador devolve os equipamentos, salvo texto que também os oblitere.
## Ataques — complemento aprovado

Banjo selecionado para o segundo golpe dispara antes dos golpes, com resposta. Arma removida após confirmar o ataque faz o golpe correspondente usar apenas o ataque da unidade, sem substituição automática. Evolução durante um ataque não acrescenta um segundo golpe retroativo; vale para o próximo ataque. Aura de Ybew termina assim que o último Ybew sai, sem desfazer raios já resolvidos.

