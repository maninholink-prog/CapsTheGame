# LoR — composição de packs, filtros e duplicatas

31/10/2026. Referência de pesquisa, sem definir regras de boosters para C.A.P.S.

## Composições descritas nos textos instalados

| Conteúdo | Descrição localizada | Chave do registro selecionado |
|---|---|---:|
| Cápsula básica | 4 cartas comuns e 1 rara | 351351332 |
| Cápsula épica | 2 comuns, 2 raras e 1 épica | 3611485835 |
| Cápsula de campeão | 3 raras, 1 épica e 1 campeão | 2118361039 |
| Baú de prata | 2 comuns, 1 rara e quantidade média de fragmentos | 1492536877 |

Esses são conteúdos declarados na localização. Não demonstram todas as melhorias aleatórias, conteúdo atual do servidor ou resultado de uma abertura real.

## Relação com os slots serializados

As configurações selecionadas das três cápsulas têm cinco entradas CardSlots:

- Básica, configuração 1717405452, offset 7226860: tabela 4246306962 repetida quatro vezes e 1205026831 uma vez.
- Épica, configuração 3425447235, offset 7226480: 4246306962 duas vezes, 1205026831 duas e 3999126182 uma.
- Campeão, configuração 1892344687, offset 7225528: 1205026831 três vezes, 3999126182 uma e 2260307036 uma.

As repetições são coerentes com as raridades descritas. Entretanto, os recursos finais das quatro tabelas (4228852341, 587922982, 2630586121, 784712495) não foram localizados como registros de topo no GamePlayData.bin. Logo, a correspondência tabela→raridade é uma inferência por composição/texto, não identidade final recuperada do recurso.

Há outra CardPack chamada Capsule, chave 1285997336, com a mesma descrição localizada, mas configuração 529359996 contendo somente uma referência CardSlots, além de FactionPacks no pack. Isso impede concluir que todo slot representa diretamente uma única carta. Podem existir intermediários; a expansão dessa variante não foi resolvida.

Esses exemplos têm BonusLoot aninhado com PercentChanceToRollNothing=100.0. O campo diz respeito ao bônus daquela configuração, não a chance de receber o conteúdo principal. Nenhuma taxa de upgrade foi inferida.

## Filtros

O CardPack de baú de prata 1492536877 contém CardSetFilter com CardSet=927867954. É um filtro concreto no registro; a identificação do conjunto e sua combinação com filtros globais permanecem pendentes.

Os metadados também declaram CardFactionFilter (CardFaction, PrimaryFactionOnly), CardFactionsAnyFilter, CardTagFilter, CardFormatFilter e CardListFilter. A declaração de um filtro não prova que ele esteja ativo em todos os packs. CardPack possui campos Filters, FactionPacks e UseGlobalFilters; sua lógica de combinação não foi recuperada.

## Duplicatas: confirmação documental

A [documentação oficial da Riot](https://support.riotgames.com/en-us/legends-of-runeterra/gameplay/duplicate-protection-and-shard-conversion-in-legends-of-runeterra), datada de 30/04/2023 e consultada em 31/10/2026, descreve proteção contra uma quarta cópia. Comuns e raras excedentes viram fragmentos. Épicas e campeões excedentes são substituídos por cartas elegíveis da raridade correspondente; a documentação das trilhas regionais prevê buscar outra região quando necessário e converter em fragmentos quando a coleção elegível se esgota.

Valores documentados de conversão: comum 15, rara 60, épica 250, campeão 750 fragmentos. Esses números são documentação de cartas de coleção, não valores recuperados do executor local e não regras de fragmentos de campeão/relíquias de Path of Champions. Não foram transplantados para C.A.P.S.

## Evidência e próxima investigação

`LOR_PACKS_COMPOSICAO_CASOS.json` preserva cinco casos: registros completos de pack, configurações, tabelas de slot distintas e textos localizados. A identidade do gameplay está no SHA-256 da saída; as fontes integrais são `LOR_TODOS_REGISTROS.json` e `LOR_LOCALIZACAO_PT_BR.json`.

A pesquisa distingue três questões: o conteúdo declarado do pacote, a elegibilidade de cartas e o destino de excedentes. A origem exata dos recursos finais, a aplicação dos filtros, upgrades e proteção em código continuam pendentes. Próximo passo: localizar LootZone e os recursos não resolvidos para entender como os slots selecionam cartas.
