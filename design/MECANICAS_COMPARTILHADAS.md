# Mecânicas compartilhadas dos protagonistas

## Regiões — regra oficial corrigida em 02/11/2026

**Somente protagonistas têm duas regiões. Toda carta não protagonista tem uma única região.** Korakarom é uma região única e suas cartas continuam neutras, elegíveis para qualquer deck. Exclusividade de campeão é independente da região. Regiões de protagonistas não são herdadas como par por suas tropas, magias, armaduras ou equipamentos. Cartas geradas e magias próprias não ganham duas regiões automaticamente; quando houver atribuição regional de carta não protagonista, deve ser única. Não alterar acesso às cartas de campeão convertidas em magia por essa regra.

Isso corrige as atribuições duplas anteriores dos apoios e das cartas do arco de Félix. Distribuir cada identidade individualmente entre as regiões elegíveis do conjunto; não escolher arbitrariamente nem trocar região histórica canônica só pela mecânica. Apoios já aprovados de Kylast com uma região permanecem válidos. Catálogo atual contém apoios duplos e precisa ser ajustado com a distribuição antes da próxima integração.

Diretriz explícita do autor, aprovada em 02/11/2026: protagonistas possuem efeitos próprios únicos; suas mecânicas são bases para outras cartas. Criar suportes e sinergias, sem nomes diferentes para a mesma mecânica apenas por pertencerem a personagens diferentes.

## Nomes oficiais e escopo — aprovados em 02/11/2026

| Protagonista | Mecânica | Base |
|---|---|---|
| Kylast | Arsenal | Equipamentos e sinergias de armas. |
| Abe | Upgrade | Melhorias de atributos e habilidades. |
| Arcata | Piromancia | Magias e sinergias de fogo. |
| Rubel | Restauração | Cura efetiva de vida perdida. |
| Youro | Metamorfose Fúnebre | Mortes de aliados alimentam transformações. |
| Kuara Yacy | Pilantragem | Rouba cartas do deck inimigo para a própria mão. |
| Thalion | Dissonância | Músicas causam efeitos negativos nos inimigos. |
| Lázaro | Execução | Benefícios por derrotar inimigos previamente feridos. |

Este é o conjunto de mecânicas-base até o surgimento de novos protagonistas. Cartas e inimigos futuros devem reutilizar essas bases quando aplicáveis; não criar uma nova mecânica-base apenas para diferenciar outro conjunto. Isso não elimina habilidades, tipos de carta ou palavras-chave gerais já aprovadas, como Ataque Rápido, nem obriga toda carta a ter uma dessas marcas. Os nomes não concedem efeitos numéricos universais: o texto de cada carta determina sua aplicação.

- Abe: Upgrade é compartilhado por outras cartas, incluindo as antigas Modificações do conjunto de Félix e a cirurgia de Labotomia. Um Upgrade usado pelo controlador de Abe pode alimentar sua evolução e outros gatilhos compatíveis; Upgrades adversários não contam para ele. O desconto de Abe evoluído respeita o texto aprovado e o mínimo de um.
- Upgrade não implica fabricar, nem velocidade Explosiva: os quatro Upgrades fabricados de Abe são Explosivos, mas outras cartas podem ter tipos, velocidades e durações diferentes. O conjunto de fabricação de Abe não é ampliado automaticamente.
- Arcata: outras cartas podem usar fogo e alimentar suas sinergias conforme seus textos. Isso não transfere automaticamente Combustão ou sua evolução para outras unidades.
- Rubel: outras cartas podem curar e contribuir para seu progresso conforme as condições aprovadas. Sua evolução e aura de cura dobrada continuam próprias dele.
- Kylast: armas, equipamentos e suportes podem existir em outras cartas e decks; equipar múltiplas armas na mesma unidade permanece exclusivo de Kylast conforme a regra já aprovada.
- Youro: morte e transformação; precisa ver quatro aliados morrerem para evoluir. Efeitos e interações restantes ainda pendentes.
- Kuara: roubo de cartas do inimigo e esgotamento de seu deck; substitui a proposta de Emboscada. Origem aprovada: deck inimigo; destino: própria mão; carta original removida, não cópia; custo normal para jogar. Seleção, restrições, excesso de mão e evolução ainda pendentes.
- Thalion: Música irritante; todas as suas músicas causam algum efeito negativo nos inimigos. Substitui a proposta de Inspiração como mecânica central; efeitos específicos e evolução ainda pendentes.
- Lázaro: Execução aprovada, recompensando derrotar inimigos previamente feridos, com frenesi/punição divina próprios. Cada Execução de Lázaro concede +1 de ataque até o fim da batalha, conforme lote aprovado. Frequência e evolução ainda pendentes.
- Registro detalhado e distinção entre decisões e pendências em [IDENTIDADES_DOS_PROTAGONISTAS.md](IDENTIDADES_DOS_PROTAGONISTAS.md). Mesma orientação para protagonistas futuros, sem presumir mecânicas ainda não definidas.

Compartilhar mecânica não remove exclusividades explícitas de cartas, restrições regionais ou regras de aquisição. Não aprova automaticamente a inclusão de todas as cartas inimigas na coleção. Efeitos não marcados como Upgrade não passam a contar só por concederem atributos.

Atualização de design, ainda sem alteração do motor. A implementação atual de Abe deverá ser conferida ao integrar novas cartas, pois os Upgrades anteriores eram apenas magias específicas.

## Efeitos próprios aprovados — 02/11/2026

Lote completo de Youro, Kuara, Thalion e Lázaro aprovado em [PROTAGONISTAS_EFEITOS_PROPOSTA.md](PROTAGONISTAS_EFEITOS_PROPOSTA.md), com síntese em IDENTIDADES_DOS_PROTAGONISTAS.md. Esse lote resolve as pendências de efeitos e evolução citadas anteriormente quando cobertas pelo texto. Os gatilhos exclusivos de cada protagonista não se tornam efeitos universais das mecânicas compartilhadas. Custos, atributos-base, regiões e decks desses quatro ainda serão definidos.

## Revisão posterior de Lázaro — 02/11/2026

Autor pediu substituir o sistema de Execução por uma adaptação da Kindred de LoR. As descrições anteriores de execução por ferimento, quatro Execuções e bônus de golpe não são definitivas após esta correção; nova proposta em LAZARO_EXECUCAO.md. Mana/atributos aprovados dos quatro em PROTAGONISTAS_EFEITOS_PROPOSTA.md.

## Lázaro — Execução por marca aprovada (02/11/2026)

Versão atual aprovada em [LAZARO_EXECUCAO.md](LAZARO_EXECUCAO.md): em campo, primeiro abate provocado por seu lado na rodada marca o inimigo mais fraco restante; no fim da rodada executa o marcado por efeito respondível. Evolui ao presenciar dois abates de inimigos marcados por seu lado. Cada marcado abatido por seu lado com Lázaro em campo concede +1 ataque até o fim da batalha. Sair de campo remove sua marca; vítima que sai também perde a marca. Mantém custo 5, 4/5 → 5/6, preservando bônus acumulados na evolução. Substitui integralmente o antigo requisito de vítima ferida, evolução por quatro e bônus de dano dos golpes. Detalhes de contagem, comparação de força e limites constam no documento aprovado. Ainda sem implementação.

## Decks iniciais — critério narrativo obrigatório (02/11/2026)

Correção explícita do autor ao rejeitar a primeira lista de Abe: decks iniciais precisam de cartas ligadas à história do protagonista e personagens com quem teve contato no RPG. Sinergia mecânica e região por si não justificam inclusão. Priorizar relações documentadas, criações próprias, equipamentos e magias pertinentes, separando adaptação de efeito de fato narrativo. A diretriz de compartilhar mecânicas continua valendo para outras cartas, sem obrigar sua inclusão no deck inicial. Não sugerir outros protagonistas como tropas comuns para completar a lista.

## Correção regional de Rubel — 02/11/2026

Autor aprovou deck narrativo com Rubel e seus apoios em **Leste/Norte**, substituindo Norte/Sul anterior. Fonte de efeitos: RUBEL_DECK_EFEITOS.md. Protagonistas restantes mantêm seus pares aprovados; correção ainda não integrada ao código.

## Regra regional aplicada ao código — 02/11/2026

A pedido do autor, catálogo executável corrigido: só quatro protagonistas implementados têm dois valores em regions; apoios e cartas geradas jogáveis têm uma região. Distribuição em REGIOES_CATALOGO.md. Validador rejeita apoios duplos e pares duplicados/incompletos de protagonistas quando regiões atribuídas. Testes de compatibilidade dos decks e elegibilidade atualizados; 205 testes, tsc e build passaram. Afirmações anteriores de catálogo duplo descrevem estado anterior à correção; conjuntos ainda não implementados precisam de atribuição individual ao integrar.
