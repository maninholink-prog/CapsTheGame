# LoR — poderes e recompensas: estrutura instalada

Continuação: [textos e recompensas resolvidas](LOR_TEXTOS_E_RECOMPENSAS_RESOLVIDAS.md). As referências Mutator e VictoryLoot abaixo foram resolvidas no lote seguinte; este documento preserva o estado da primeira inspeção.

Registro de 30/10/2026. Nenhuma adaptação de C.A.P.S. definida.

## Cobertura

Nova seleção em `LOR_PROGRESSAO_REGISTROS.json`: 4.439 registros, dos quais 4.438 consumidos integralmente. Composição: 2.462 AdventurePowerRank, 1.605 SpeAbilityDefinition, 199 AdventurePowerRankList, 161 AdventureConfig e 12 ModsGenericAbilityDefinition. Contagens incluem variantes e possíveis registros antigos/de teste; não representam conteúdo disponível ao jogador.

Um SpeAbilityDefinition, offset 354658, permanece parcial por tipo PROP 15 não suportado. O leitor ganhou suporte a vetores de floats para ler WorldMapPosition; valores de posição não foram interpretados como balanceamento.

## Recompensa dentro da aventura

O encontro de offset 3486814, DevName `BattleReward Twisted Fates Favor Nightmare`, contém:

- AdventureChoiceData → AdventureRewardChoiceData → ChoiceReward do tipo AdventurePowerChoiceData.
- SuppressReroll=true na escolha.
- RGDSPath `ReforgedCampaigns/Encounters/Non-combat/SpecialEncounters/Event/RogueHeistNightmare/SpecialEncounter_RecruitTwistedFate/BattleReward`.

Isso confirma uma escolha de recompensa de poder com configuração explícita de supressão de reroll nessa variante. Não prova que todas as recompensas proíbem reroll, nem quantos poderes são oferecidos, qual é o conjunto elegível ou o efeito concedido. O objeto AdventurePowerChoiceData está serializado sem campos; não significa recompensa vazia.

Foram encontrados 140 objetos aninhados com nomes de tipo contendo Reward na seleção de encontros. Não são necessariamente 140 recompensas distintas. Exemplo rastreável acima preservado integralmente em `LOR_AVENTURA_REGISTROS.json`.

## Poder e progressão são registros distintos

No offset 209025 há um SpeAbilityDefinition com DevName `SBTeemo Star 3 Power`, AbilityCode `P0642`, Rarity=2 e ExposeDataDragon=true. O nome e a descrição são chaves de localização (`SBTeemo_star_3_name` e `SBTeemo_star_3_blurb`), não texto de efeito recuperado. Rarity=2 permanece código interno nesta análise; ExposeDataDragon não prova publicação atual.

Separadamente, AdventurePowerRank no offset 208287, DevName `SBTeemo Star 2`, contém uma habilidade GrantMutatorLinkAbility que referencia Mutator de chave 3678909144. Essa chave não foi resolvida na seleção atual. Não confundir esse rank de estrela 2 com o poder de estrela 3 acima; eles exemplificam camadas diferentes do modelo.

Inferência estrutural: a definição de um poder, a progressão que concede habilidades e a escolha de recompensa são objetos distintos. Efeitos executados, condições de desbloqueio e persistência precisam de outras referências ou observação.

## Recompensa de vitória

AdventureConfig de offset 11059938, DevName `XP1_Jinx`, contém Rank=1.0 e VictoryLoot de chave 1580241544, além de referências separadas para mapa e personagens jogáveis. A recompensa de vitória está ligada à configuração da aventura; seu conteúdo e quantidade ainda não foram resolvidos. O prefixo XP1 não foi usado para afirmar que essa aventura é atual. Rank=1.0 não foi convertido automaticamente em estrelas.

Os metadados também declaram AdventureMetaRewardData e AdventureScoreAchievementMetaRewardData; nenhum registro de topo desses tipos foi encontrado nesta seleção. Isso não prova ausência de metarrecompensas: podem estar aninhadas, em tipos derivados, outros arquivos ou no servidor.

## Reprodução e próximo passo

Executar `tools/analise/extrair_lor_valores.py --progression`. A saída preserva SHA-256, offsets, tipos, campos e erros. Fonte é o mesmo GamePlayData.bin identificado em `LOR_VALORES.md`; nomes vêm dos metadados REA já preservados. Nenhum executável foi alterado ou comportamento de partida observado.

Próximo: resolver as chaves de localização dos poderes e os alvos Mutator/VictoryLoot por identidade no arquivo, antes de buscar fórmulas de preço, chances ou raridade. Valores ausentes continuam desconhecidos.
