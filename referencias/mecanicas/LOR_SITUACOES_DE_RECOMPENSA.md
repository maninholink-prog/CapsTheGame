# LoR — situações ligadas às tabelas de recompensa

31/10/2026. Ligações estáticas de dados instalados, não observação de concessão em partida ou confirmação de disponibilidade atual.

## Resultado do rastreamento

A extração de todo o GamePlayData.bin examinou 43.685 registros: 43.642 completos e 43 parciais. O grafo usa referências PROP tipadas (132), inclusive em objetos e contêineres, sem procurar coincidências brutas de números nos bytes. Campos ainda não lidos nos registros parciais e referências por GUID/string podem conter outras ligações.

Das 321 LootTable de topo, 318 têm referências diretas identificadas. São 355 ligações, todas originadas de CardPackConfig na cobertura decodificada. As outras três não têm referências tipadas encontradas; isso não prova desuso. Essas tabelas não devem ser tratadas como tabelas gerais de recompensa pós-combate de Path of Champions.

## 1. Progressão de evento

Cadeia resolvida:

`ChapteredLevelCurve` chave 3220898741, offset 6357076, DisplayName `DarkinBegins Battle Event` → Chapters/LevelList → `SeasonLevel` → Reward `CardPack` chave 435214581, offset 6892422, InsightsName `Set6CChampionCapsule` → CardPackConfig chave 2191288913, offset 7225648 → CardSlots → LootTable chave 24273101, offset 7359084.

O mesmo pack é referenciado por seis SeasonLevel dessa curva. Na lista interna, índices começando em zero 5 e 43 têm RequiredGrantableForPremium=642170988. Os índices 14, 19, 34 e 52 não serializam esse campo. Ausência não foi convertida em confirmação de acesso gratuito; numeração interna não foi convertida em nível exibido ao usuário.

O pack declara filtros CardSetFilter e CardTagFilter. A tabela tem entrada RelativeWeight=1.0 e IsBaseReward=true, mas seu Loot de chave 2963824156 não está entre os registros de topo deste arquivo. Não se pode nomear o recurso final ou calcular sua chance só com essa cadeia. A curva declara IsEvent=true e uma referência de Schedule, ainda não interpretada em datas.

**Situação estabelecida:** recompensa associada a patamares de uma progressão de evento, alguns com requisito premium explicitamente serializado. Critério exato de avanço, atividade atual e execução da entrega continuam não demonstrados.

## 2. Progressão inicial / prólogo

`OnboardingLevel` chave 2803143679, offset 7219905 → Reward `CardPack` chave 3553760135, offset 7407652, InsightsName `NewPrologueReward6` → CardPackConfig 4124699813 → LootTable 3142932507.

**Situação estabelecida:** configuração de recompensa de progressão inicial. O registro OnboardingLevel contém um inteiro 200 em campo de hash 1579752833 ainda sem nome resolvido. Não chamá-lo de experiência necessária, preço ou quantidade. O nome interno Reward6 não comprova qual etapa aparece na interface.

## 3. Oferta de loja

`LootOffer` chave 2510484919, offset 8049466, Name `mgs_store_offer_common_wildcard_bundle` → LootListAnd → LootConstant (Count=50) → CardPack chave 3775968358, offset 6937659, InsightsName `CommonWildcard` → CardPackConfig 1365723162 → LootTable 997622438.

A oferta possui PaymentOptionsOr com Amount=200 e Currency=2187874865, cuja identidade não foi resolvida neste lote. Não interpretar como dinheiro real, ouro ou preço atual. O pack declara **PreventGrantingContainedLoot=true**. Isso mostra que CardPack é uma representação interna também usada para curinga; seguir suas ligações não significa que o conteúdo da tabela será imediatamente sorteado/concedido.

**Situação estabelecida:** uma oferta configurada com pagamento e uma lista de concessão. Disponibilidade, efeitos do curinga e aplicação da flag precisam de observação/código.

## Tabelas aninhadas e limites de chance

O CardPackConfig 2191288913 também contém BonusLoot como uma LootTable aninhada com PercentChanceToRollNothing=100.0. A constatação anterior de nenhum campo explícito desse nome valia somente para as 321 tabelas de topo; tabelas aninhadas ampliam a cobertura. O dado descreve o bônus dessa configuração, não o slot principal, e não foi usado para calcular chance global.

As três cadeias foram preservadas em `LOR_LOOT_CASOS.json`, com todos os registros selecionados e caminhos de referências. O panorama das 321 tabelas está em `LOR_LOOT_LIGACOES.json`.

## Reprodução e continuidade

1. `tools/analise/extrair_lor_valores.py --all` → `LOR_TODOS_REGISTROS.json`.
2. `tools/analise/rastrear_loot_lor.py` → ligações e casos.

Todos usam a identidade SHA-256 preservada do GamePlayData.bin. A leitura completa de um registro comprova seus limites estruturais, não a semântica do executor. Nenhum arquivo do jogo foi alterado.

Próximo: resolver recursos ausentes em LootZone/outros arquivos, interpretar filtros e a flag PreventGrantingContainedLoot e ligar condições de avanço às curvas. A mecânica de boosters gratuitos de C.A.P.S. continua como requisito separado; nenhuma monetização ou regra da loja de LoR foi adotada.
