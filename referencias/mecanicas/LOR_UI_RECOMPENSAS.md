# LoR — componentes das interfaces de recompensa

31/10/2026. Inspeção estática, sem abrir uma partida ou modificar pacotes.

## Método e cobertura

REA não expôs ferramenta específica de leitura UnityFS nesta sessão. Foi usado UnityPy 1.25.4, instalado isoladamente em `tmp/unity-inspect`, conforme sua [documentação oficial](https://github.com/K0lb3/UnityPy), para complementar os metadados já obtidos com REA.

Pacotes em `C:/Riot Games/LoR/live/PatcherData/PatchableFiles/AssetBundles`:

- alwaysloaded.bbq: SHA-256 `c60c08f57a005df6f5205b17a9a74a6f4c0c67a06241d6997a9d2b064e980016`.
- monobehavior.bbq: SHA-256 `53cdecacd6b1ef0fb6552f54274f87ebbf105bb77dcd88469aadd89a70c173eb`.

O alwaysloaded contém 26.653 objetos inventariados. O ambiente com os dois pacotes expôs 2.992 entradas no container. Foram selecionados os 10 prefabs sob EndOfRunSummaryRewards e percorridos seus GameObjects, componentes e filhos Transform/RectTransform. Resultado: 2.568 registros de objetos dentro dessas travessias, sem erros de leitura nem resolução de m_Script. Essa soma não é contagem global de objetos únicos: dependências podem reaparecer entre prefabs.

Não se percorreu toda dependência arbitrária de cada componente, nem todos os recursos da instalação. Nenhuma imagem final foi renderizada; a análise é da composição serializada.

## Estrutura comum

Nove prefabs possuem CMPRewardCard. Esse componente tem referências Playable e RewardRenderer. No prefab base CMP_Reward, RewardRenderer tem PathID=0. Nos oito prefabs especializados, o ponteiro resolve para o renderer específico do mesmo prefab, conforme a tabela abaixo. A referência nula da base não prova um erro: não foi observado o comportamento de instanciação.

TooltipModalSpawner, componentes BaconTimeline/BaconTimelineEffect e componentes Unity de imagens/texto também aparecem nas hierarquias. Isso confirma infraestrutura de apresentação, tooltip e timeline; não confirma ordem, duração ou disparo em execução.

| Prefab especializado | Componente ligado por RewardRenderer | Campos configurados |
|---|---|---|
| BasicCurrency | CMPRewardRendererBasicCurrency | QuantityLabel, NameLabel, TextureLoader |
| ChampExperience | CMPRewardRendererChampionExperience | QuantityLabel, ChampionPortraitIcon, ChampLevelUpIndicator |
| ChampFragment | CMPRewardRendererChampFragment | ChampDisplayNode, FragmentCount |
| Gemstone | ConstellationRewardRendererChampionEssence | QuantityLabel, LootTypeTitle, ConstellationCurrencyWidget |
| NovaFragment | ConstellationRewardRendererNovaFragment | QuantityLabel, LootTypeTitle, ConstellationCurrencyWidget |
| Relic | CMPRewardRendererRelic | RelicDisplay |
| RelicSlotUpgrade | CMPRewardRendererSlotUpgrade | RelicSocket, RarityLabel |
| StarCrystal | ConstellationRewardRendererStarCrystal | QuantityLabel, LootTypeTitle, ConstellationCurrencyWidget |

O décimo prefab, EOR CelestialBurst, teve 48 objetos percorridos e nenhum MonoBehaviour na hierarquia selecionada. Seu nome não foi usado para deduzir uma regra de recompensa.

## O que isso estabelece

A apresentação de recompensas usa uma base comum e componentes específicos por categoria. Quantidade, identidade do campeão, ícone e indicação de evolução têm pontos de ligação distintos. O renderer de experiência de campeão é diferente do renderer de moeda básica; isso reforça a necessidade de não confundir a experiência base identificada em XP1_Jinx com experiência de campeão.

Os campos são referências de interface, não valores de concessão. A presença de QuantityLabel não define quantas unidades o jogador recebe; ChampLevelUpIndicator não define a fórmula de nível. Não foram recuperados corpos de métodos nem a chamada que entrega/preenche os dados.

## Evidência e continuidade

Script: `tools/analise/inspecionar_ui_lor.py`. Saída: `LOR_UI_RECOMPENSAS_COMPONENTES.json`, com caminho do prefab, arquivo serializado, PathID, tipo, campos e identidade do MonoScript de cada componente resolvido. O script usa somente leitura e não salva pacotes Unity.

Próximo: relacionar esses componentes aos métodos declarados nos metadados e localizar o controlador do resumo de fim de aventura, distinguindo apresentação de concessão efetiva. Nenhuma interface de C.A.P.S. foi implementada ou copiada.
