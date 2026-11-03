# C.A.P.S. — projeção técnica

Estado em 01/11/2026: motor e primeira interface local implementados para abertura, rodadas, magias, combate e as dez identidades do deck inicial de Kylast, incluindo Colar e suportes. A interface é um duelo manual de teste, com os dois lados controlados no mesmo computador. Run, IA, coleção, progressão e detector geral de ciclos obrigatórios ainda não implementados. A arquitetura dos módulos seguintes continua uma projeção. Fonte de regras: CAMPANHA.md; correções explícitas recentes prevalecem sobre registros históricos. O complemento de ataques de Kylast desta data também é fonte aprovada, independentemente de sua posição física no arquivo.

## Primeiro resultado jogável

Uma batalha local de Kylast contra um adversário de teste, com cartas provisórias, cinco espaços por campo, mão, mana, bloqueios, respostas e evolução. O adversário de teste não representa personagem canônico. A primeira entrega técnica anterior a essa batalha será um motor sem interface que inicializa e avança rodadas com resultados reproduzíveis.

## Tecnologia proposta

TypeScript para o motor e os dados tipados; testes automatizados para regras. Interface web local posteriormente, sem vincular o motor a componentes visuais. Esta escolha permite uma primeira versão no computador sem servidor. Uma interface em Godot ou Unity continua possível por adaptação, mas não é uma integração já construída. Não instalar dependências, escolher versões ou mudar configurações globais nesta etapa.

## Módulos projetados

| Pasta futura | Responsabilidade |
|---|---|
| src/content/ | Cartas, campeões, regiões, dificuldades e Relíquias com IDs estáveis e origem da regra |
| src/battle/ | Estado da batalha, comandos legais, prioridade, custos, pilha, combate, morte e evolução |
| src/run/ | Mapa, escolhas de rota, vida persistente, deck da run, checkpoint e reviver |
| src/rewards/ | Ofertas regionais, pacotes de aliados, elegibilidade e alternativas por falta de opções |
| src/collection/ | Coleção, boosters, contadores de garantia, Brilhantes e excedentes |
| src/progression/ | Maestria, árvore de talentos e marcos semanais |
| src/save/ | Salvamento versionado e migrações explícitas |
| src/ui/ | Apresentação e envio de comandos; não decide resultados de regras |
| tests/ | Cenários determinísticos e regressões de interações aprovadas |

Separar os planos de implementação por entrega: núcleo de batalha; Kylast e equipamentos; interface da batalha; run e checkpoint; coleção e boosters; progressão. O primeiro plano está em docs/superpowers/plans/2026-11-01-nucleo-batalha.md.

## Representação de cartas e estado

- CardDefinition: identidade, nome, regiões, raridade, tipo funcional, custo, atributos base e IDs de efeitos. Posição de magia na composição não transforma equipamento em magia.
- CardInstance: ID único por cópia, identidade, dono e estado temporário. Duas cópias de Banjo precisam de usos independentes.
- BattleState: jogadores, Nexus, zonas, posições, rodada, ataque, prioridade, sequência de respostas, evolução por identidade de campeão, fila de gatilhos e RNG.
- RunState: protagonista, aliados, melhorias do deck, mapa, Relíquias ativas, vida do Nexus, moeda temporária, cargas e snapshot do checkpoint.
- ProfileState: coleção, Brilhantes, gold, maestria, conquistas de Relíquias, contadores de boosters e semanais.
- RunSnapshot não inclui ProfileState inteiro: compras permanentes e cargas consumidas não podem ser recuperadas por rollback.
- Histórico de mortes é distinto do descarte; ressurreição consome um registro elegível.
- Posições da linha de combate são distintas do campo e preservam lacunas durante o combate.

## Execução das regras

Comando do jogador → validação → pagamento de custos → mudança de estado → eventos → gatilhos ordenados → verificação de término. Efeitos com resposta aguardam a janela apropriada. A interface recebe eventos para animar, sem determinar quem morreu ou quanto dano ocorreu.

Um único serviço de sorteio reproduzível atende embaralhamento, iniciativa e efeitos aleatórios. Registrar estado do gerador junto do estado da batalha. Não usar tempos de animação nem sorteios na interface para determinar resultados. IA recebe apenas uma visão com informações permitidas, nunca o estado oculto completo do oponente.

Custos e zonas exigem resoluções específicas: equipamento com portador removido permanece na mão sem reembolso; carta do Colar sem alvo é descartada; invocação por efeito em campo cheio falha; jogar uma unidade normalmente pode substituir uma unidade própria. Não condensar essas exceções em uma única regra genérica de falha.

## Parâmetros aprovados que entram nos dados

- Nexus do jogador 20; campo 5; mão inicial 5; mão máxima 10; um mulligan gratuito.
- Mana inicial 1, máxima 10; reserva máxima 3, apenas magias, truques e armaduras.
- Apenas quem recebe o ataque compra automaticamente na rodada, inclusive o vencedor da iniciativa inicial.
- Deck inicial de batalha 20; mágico 22. Protagonista em duas cópias; limite de montagem 2 por identidade.
- Druida usa modelo de batalha; mago, clérigo e bardo usam modelo mágico.
- Kylast: Norte/Oeste, custo 5, base 3/5, evoluído 4/6; equipamento inicial 2, até 6 pela maestria.
- Aliado inicial: escolha entre 3; pacote com 3 identidades em duas cópias; até 3 campeões distintos no grupo.
- Coleção: limite 3 cópias, diferente do limite de deck.
- Relíquias: catálogo JSON existente contém propostas já aprovadas; importar apenas após validar esquema e preservar ressalvas de atribuição narrativa.

## Entregas seguintes e provas essenciais

1. Núcleo: iniciativa, mulligan, compras, reserva, rodadas, fadiga e empate reproduzíveis.
2. Combate e Kylast: respostas, bloqueador removido, dois golpes, armas escolhidas, evolução e Banjo. Testar evolução no primeiro golpe sem criar golpe retroativo.
3. Interface: mostrar somente ações legais, custos, alvos, fontes dos bônus e histórico. Testes manuais de uma batalha completa.
4. Run: vitória persiste vida; checkpoint restaura temporários, preserva despesas permanentes e consumo de cargas; escolhas respeitam limites e regiões.
5. Boosters: cinco cartas, contadores independentes, 40º novo campeão quando elegível, sexto campeão Brilhante, excedentes e migração de salvamento.
6. Progressão: concessão final de maestria, derrota a 25%, limite 30 e resgate semanal no horário aprovado.

## Pendências que precisam de decisão antes dos módulos correspondentes

- TypeScript aprovado para o núcleo e em implementação. Formato visual ainda precisa de escolha.
- Curva exata por posição para moeda temporária e gold, com arredondamento e compatibilidade entre rotas e tetos.
- Primeiro recrutamento quando nenhum campeão elegível puder completar pacote; não substituir silenciosamente essa recompensa obrigatória.
- Recuperar uma unidade morta para a mão consome também seu registro de ressurreição? Ainda não fixado explicitamente.
- Ordem entre múltiplas proteções e escudos e a regra de cópia exata para equipamentos anexados.
- Efeitos novos de silêncio, transformação ou troca de controle exigem especificação antes de serem usados por cartas.
- Identidades, atributos e decks dos demais protagonistas devem ser derivados dos registros, não inventados para preencher o protótipo.

Essas pendências não bloqueiam o núcleo inicial. Impedem afirmar que todo o jogo já tem especificação executável completa.

## Estado da IA local — 01/11/2026

Interface com Contra IA padrão e Duelo manual preservado. Política heurística recebe observação filtrada, sem mão adversária, decks ou RNG real; comandos passam pelo mesmo motor. Agendamento cancelável, proteção de mão oculta e quatro duelos completos verificados. Não inclui dificuldades avançadas, mapa ou progressão. Ver design/IA_BATALHA.md.

## Primeira run e aliados — 01/11/2026

Run curta com três batalhas e deck mestre separado, Nexus persistente, recrutamento após primeira vitória (Abe/Arcata/Rubel), recompensa após segunda e encerramento final. Os três aliados e magias próprias estão implementados com as bases aprovadas. Fabricação bloqueia comandos até escolha, sem revelar opções adversárias à IA. Não inclui mapa, economia, salvamento ou decks próprios completos dos novos protagonistas. Ver design/PRIMEIRA_RUN.md.

## Mapa Comum local — 01/11/2026

Implementado mapa de dez casas, rotas, eventos de teste aprovados, cargas de reviver e checkpoint após chefe intermediário/recompensa. Snapshot de aventura separado do combate e do contador monotônico de consumo. Não há perfil/moedas/lojas no rollback atual: integração futura exige fronteira própria para gastos permanentes. Run curta e duelos preservados. Ver design/MAPA_COMUM.md.

## Economia temporária e lojas — concluídas em 02/11/2026

Korakacoins implementados com ganho por posição, lojas padrão/especializada, seis melhorias aprovadas e snapshots de saldo/estoque. Variantes de cartas preservam isolamento de J2 e herança de cópias; IA recebe somente variantes permitidas. Moeda permanente renomeada para Pedras Filosofais pelo autor; carteira/perfil não implementados nesta etapa. Ver design/LOJAS_KORAKACOINS.md.
