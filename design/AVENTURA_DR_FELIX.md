# Aventura do Dr. Félix

## Estrutura aprovada — 02/11/2026

Entrada e exploração com experimentos/mecanizados menores; encontros especiais com Labotomia, Tornado e Dianamite; confronto final único com Félix e sua transformação, seguido pelo despertar do rei mecanizado; encerramento com resgate dos prisioneiros.

O autor escolheu manter Félix e o rei como duas fases do mesmo confronto, em vez de duas batalhas independentes. A transformação de Félix ocorre dentro da primeira fase. Condições de transição, decks, atributos e preservação de recursos ainda serão detalhados.

## Identidades mecânicas aprovadas — 02/11/2026

| Inimigo | Identidade |
|---|---|
| Labotomia | Cirurgias fortalecem suas unidades e causam dano nelas como custo. |
| Tornado | Dispositivos de gelo reduzem temporariamente o ataque dos adversários. |
| Dianamite | Superaquecimento: fica mais perigoso conforme combate, mas sofre desgaste. |
| Dr. Félix | Modifica experimentos; ao cumprir condição de evolução, transforma-se e passa a pressionar diretamente o combate. |
| Rei mecanizado | Desperta após a derrota de Félix; energia limitada alimenta descargas. É possível vencer enfrentando-o ou resistindo até seu desligamento. |

Aprovação explícita do autor para essas identidades, ainda sem valores. São adaptações do jogo, não novas afirmações históricas sobre poderes usados na sessão. Fontes e limites em [LEITURA.md](../referencias/aventuras/dr-felix/LEITURA.md) e [CAPS 5](../referencias/youtube/CAPS_05.md).

## Efeitos aprovados — 02/11/2026

1. Labotomia: uma vez por rodada, usa ação respondível em uma unidade própria: causa 1 de dano e, se ela sobreviver, concede +2 de ataque até o fim da batalha. Não aumenta vida nem cura. Pode repetir na mesma unidade em rodadas seguintes, acumulando ataque.
2. Tornado: na primeira invocação de unidade por ele em cada rodada, dispara efeito respondível que dá -2 de ataque a uma unidade adversária escolhida até o fim da rodada, mínimo zero. Só o primeiro disparo por rodada; não é atordoamento.
3. Dianamite: ao declarar ataque, ganha +1 de ataque permanente na batalha; após resolver esse ataque, sofre 1 de dano. Dispara uma vez por declaração, mesmo com Ataque Duplo. Números iniciais de custo/ataque/vida ainda pendentes.
4. Félix: conta Upgrades bem-sucedidos em suas unidades; no quarto, evolui. Efeitos que falham ou são anulados não contam. Ao evoluir, preserva dano sofrido e, enquanto evoluído em campo, seus outros experimentos têm +1 de ataque. Definição exata das cartas que contam como Upgrade permanece para o lote de deck.
5. Transição final: ao derrotar a fase de Félix, começa a fase do rei na mesma batalha, preservando Nexus, mão, deck, campo, mana e rodada do jogador; sem recompensa intermediária. Rei começa com 6 de energia. No fim de cada rodada da fase, uma descarga respondível causa 1 a todas as unidades do jogador, então gasta 1 energia; ao resolver a sexta descarga, desliga e concede vitória se o jogador sobreviver. Também é possível vencer esgotando a vida do Nexus inimigo antes. Vida da segunda fase e estado do lado inimigo na transição ainda pendentes. Aprovação deste lote define o design; implementação ainda não iniciada.

## Próximo lote — atributos e transição, proposto

Atualização de 02/11/2026: para a distribuição solicitada, prevalecem os tamanhos e Nexus previamente aprovados: comuns 20 cartas/20 Nexus, intermediários 26/25, final 30/30 no Comum. Especial em duas cópias dentro do total. Isso substitui os números de Nexus e a sugestão de uma cópia dos servos abaixo, que nunca foram aprovados. Ver [DECKS_DR_FELIX.md](DECKS_DR_FELIX.md). Os demais detalhes desta seção permanecem propostos.

Valores para a dificuldade Comum, sujeitos a testes:

| Carta especial inimiga | Mana | Ataque | Vida |
|---|---|---|---|
| Labotomia | 3 | 2 | 4 |
| Tornado | 3 | 1 | 5 |
| Dianamite | 4 | 3 | 5 |
| Félix | 5 | 2 | 6 |
| Félix evoluído | 5 | 4 | 8 |

1. Habilidades dos três servos exigem a presença da respectiva carta em campo. Os servos são unidades especiais com uma cópia por deck inimigo, sem evolução nem conversão em magia de campeão. Não começam em campo gratuitamente. A ação de Labotomia custa zero mana, usa a prioridade e admite resposta.
2. Nexus dos encontros: menores 15; encontro especial de cada servo 20; fase de Félix 25; fase do rei 20. Félix também precisa estar em campo para contar Upgrades; progresso persiste se sair. Evolução preserva dano sofrido.
3. Fase muda quando o Nexus de Félix chega a zero, não pela derrota isolada da carta. Após terminar o ataque ou efeito em resolução e suas consequências imediatas, se o jogador estiver vivo, substituir o lado inimigo pela fase do rei: limpar suas unidades, mão e deck sem efeitos de morte ou descarte, remover reserva de magia, e instalar deck próprio do rei com mão de cinco cartas. Mana comum já disponível e token de ataque são preservados; não há compra extra de rodada. Estado do jogador permanece. Dano excedente não atravessa para o novo Nexus. Casos de empate mantêm a regra geral de vitória da batalha/run e não abrem fase com jogador derrotado.
4. Rei é representado pelo Nexus e poder da segunda fase, não por unidade que pode ser atordoada ou removida. Energia é recurso do encontro; descargas não atingem Nexus. Primeira descarga somente ao fim da primeira rodada completa iniciada após sua ativação, garantindo preparação. Anular descarga impede dano, mas ainda consome uma energia; sexta energia gasta encerra a fase, após resolver consequências e verificar sobrevivência. Isso detalha a condição de desligamento do lote anterior.
5. Upgrades de Félix usam a mesma mecânica de Abe: reforços mecânicos e cirurgias explicitamente marcados como Upgrade, não qualquer buff. Uma resolução bem-sucedida conta um Upgrade, mesmo com vários alvos. Cirurgia de Labotomia conta se Labotomia participar do deck de Félix e o alvo sobreviver. Se o alvo morrer no custo/dano, não conta.

Esse lote ainda não foi aprovado e não autoriza tratar números como balanceamento final.

## Correção aprovada — mecânicas compartilhadas (02/11/2026)

O autor aprovou as vinte cartas com a troca da marca Modificação por Upgrade, a mesma mecânica de Abe. Isso também se aplica à cirurgia de Labotomia e ao progresso de Félix. Os protagonistas têm efeitos próprios únicos, mas suas mecânicas servem como base para outras cartas. Ver [MECANICAS_COMPARTILHADAS.md](MECANICAS_COMPARTILHADAS.md). O lote anterior de atributos e transição permanece pendente; aprovação das cartas não o aprova implicitamente.
