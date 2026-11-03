# LoR — referências de cartas e tabelas de recompensa

Registro de 31/10/2026. Continuação da pesquisa instalada; sem regras novas de C.A.P.S.

## Carta associada ao poder de SBTeemo

O poder P0641 (`SBTeemo Star 2 Power`, offset 210212) declara AssociatedCardForFan=2814749311. Essa chave foi localizada como CardData no offset 9180884, com CardCode `01PZ022`, nome interno `Poison Puffcap` e caminho `Cards/Set1/Piltover/Tokens/PoisonPuffcap`.

A chave localizada `card_01PZ022_Name` contém **Cogumelo Venenoso**; a descrição `card_01PZ022_Description` é `Causa {Damage:1} de dano ao seu Nexus.` O número declarado no texto é 1, mas o token de formatação Damage ainda não foi avaliado em execução.

Isso confirma a associação explícita do poder à carta. Não prova que o mecanismo de interpolação de `{CardRef:self, 5}` utiliza AssociatedCardForFan: o resolvedor do marcador e o significado do argumento 5 continuam pendentes. A identificação do cogumelo é evidência independente que apoia essa interpretação, não uma substituição automática do marcador original.

## Cobertura de cartas

Foram selecionados 2.990 registros CardData/ClientCardData e todos foram consumidos integralmente pelo leitor. Saída: `LOR_CARTAS_REGISTROS.json`. Os campos incluem custos, atributos e chaves de texto quando serializados. Essa contagem não representa cartas colecionáveis únicas: existem tokens, variantes e campos ausentes cujos defaults não foram inferidos.

## Tabelas de recompensa

Nova seleção em `LOR_LOOT_REGISTROS.json`: 2.235 registros integralmente consumidos, sendo 321 LootTable e 1.914 LootListWrapper. A seleção atravessa dados gerais do jogo; não foi atribuída integralmente a Path of Champions.

Em 144 das 321 tabelas há pelo menos uma entrada com RelativeWeight explícito. Nenhuma dessas tabelas serializa PercentChanceToRollNothing explicitamente. Isso não significa chance zero: o default ou comportamento do executor ainda não foi recuperado.

Exemplo rastreável: LootTable offset 7359084, chave 24273101, contém uma entrada LootTableEntry com Loot=2963824156, RelativeWeight=1.0 e IsBaseReward=true. O conteúdo referenciado e o contexto de uso dessa tabela ainda não foram resolvidos. Peso 1.0 não foi convertido em 100%: faltam algoritmo, tratamento de recompensa base, filtros, defaults e eventual composição com outras tabelas.

Portanto, este lote estabelece que existem listas e tabelas de recompensa com pesos e marcação de recompensa base. Não estabelece taxas efetivas, raridade, preço ou proteção contra duplicatas para aventuras ou boosters.

## Reprodução e continuidade

- `tools/analise/extrair_lor_valores.py --cards`: registros de cartas.
- `tools/analise/extrair_lor_valores.py --loot`: tabelas e listas.
- Cada saída preserva o SHA-256 do GamePlayData.bin, offsets e completude. As ligações usam as chaves serializadas, e os nomes de campos vêm da exportação de metadados REA já preservada.
- Localização e sua identidade estão em `LOR_TEXTOS_E_RECOMPENSAS_RESOLVIDAS.md` e `LOR_LOCALIZACAO_PT_BR.json`.

Próximo: seguir quem referencia as tabelas de recompensa e identificar os recursos de suas entradas; investigar o resolvedor de CardRef e condições de elegibilidade. Nenhuma fórmula de chance foi adotada para C.A.P.S.
