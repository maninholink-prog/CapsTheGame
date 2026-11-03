# LoR — textos de poderes e referências resolvidas

Registro de 30/10/2026. Dados instalados; não são regras aprovadas para C.A.P.S.

## Textos recuperados

O arquivo `LocalizedText_pt_br.bin` contém 7.157 registros TRAFile, todos consumidos integralmente pelo leitor PROP. SHA-256: `86ce052dd6fd7a7cbcb9a4edd8a0a0aa8ca59dfd52b0a83e5618dc6bd2df7254`. Origem: `C:/Riot Games/LoR/live/PatcherData/PatchableFiles/GamePlayData/LocalizedText_pt_br.bin`.

Foram ligados 1.605 registros SpeAbilityDefinition a nomes e descrições locais. A saída `LOR_PODERES_TEXTOS_PT_BR.json` preserva código, chave, offset de gameplay, offsets das traduções e todas as correspondências por chave, sem sobrescrever duplicatas. Não equivale a 1.605 poderes únicos disponíveis: inclui variantes e possíveis conteúdos antigos/de teste. Um registro de gameplay continua parcialmente decodificado, embora suas chaves de texto tenham sido recuperadas.

Os textos brutos conservam tags, quebras e referências dinâmicas. Texto traduzido descreve intenção; não comprova execução ou valores alterados por scripts. Caracteres ou placeholders problemáticos não foram corrigidos silenciosamente.

## Exemplo: progressão de SBTeemo

Ligação resolvida para estrela 2:

`AdventurePowerRank` offset 208287 → `GrantMutatorLinkAbility.Mutator` chave 3678909144 → `AdventureBaseMutatorData` offset 210587 → objeto aninhado `AdventurePowerMutator.PowerToAttach` chave 1012596595 → `SpeAbilityDefinition` offset 210212, código P0641.

O nome localizado é **Hehehe**. A descrição informa +1 de mana inicial e um gatilho ao jogar uma carta Roubada ou quando um aliado Roubado golpeia o Nexus inimigo: plantar 3 unidades da referência `{CardRef:self, 5}` no deck inimigo. A carta dessa referência ainda não foi resolvida; não foi substituída por um nome presumido.

Para estrela 3, código P0642, offset 209025, o nome é **Vou Pegar Isso Também**. A descrição diz que ativar uma das suas armadilhas cria na mão uma cópia exata e Fugaz da carta com armadilha, reduzindo seu custo em duas vezes o número de armadilhas nela. Isso é a descrição instalada, sem validação do script nem das regras de arredondamento ou piso do custo.

São dois poderes distintos. A ligação de estrela 2 não foi usada para atribuir a ela o efeito de estrela 3.

## Recompensa de vitória identificada

`AdventureConfig` offset 11059938, DevName `XP1_Jinx` → VictoryLoot chave 1580241544 → `LootListWrapper` offset 10743571 → LootList → LootConstant com Count=500 e Loot chave 2409786792 → `Experience` offset 8247440.

O recurso declara `CapCurrencyId=bacon.currency.experience.base` e `InsightsName=Experience`. Portanto, o registro configura **500 unidades de experiência base**. Não é ouro nem moeda de booster. Não foi confirmado se a aventura está disponível, se a concessão ocorre apenas uma vez ou se existem modificadores externos. Também não se deve tratar automaticamente essa experiência base como experiência de campeão.

## Reprodução e limites

1. `tools/analise/extrair_lor_valores.py --localized`: extrai as traduções.
2. `tools/analise/extrair_lor_valores.py --progression`: 7.617 registros selecionados, 7.616 completos; inclui wrappers de modificadores, listas de loot e Experience.
3. `tools/analise/ligar_textos_lor.py`: liga os 1.605 poderes aos textos e preserva a identidade das fontes.

O único registro parcial de progressão continua no offset 354658, por tipo PROP 15 não suportado. As duas cadeias documentadas acima estão em registros completos. Não houve execução, instrumentação ou alteração do jogo.

Próximas pendências: resolver referências dinâmicas CardRef, localizar a elegibilidade e seleção de recompensas, custos/chances e condições de concessão. A mecânica própria de boosters com moeda gratuita permanece registrada em CAMPANHA.md, separada destas regras de referência.
