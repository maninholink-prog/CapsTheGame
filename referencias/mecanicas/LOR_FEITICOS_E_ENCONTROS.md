# LoR — velocidades e ligação de encontros

Registro de 30/10/2026. Regras de referência, sem alterações para C.A.P.S.

## Velocidades documentadas

| Velocidade | Janela de uso | Resposta adversária antes do efeito |
|---|---|---|
| Burst | Com iniciativa, inclusive em combate | Não; efeito imediato |
| Focus | Fora de combate e sem responder a um feitiço | Não; efeito imediato |
| Fast | Inclusive em combate ou em resposta a Fast/Slow | Sim |
| Slow | Na própria ação, sem combate nem sequência de feitiços em andamento | Sim |

Burst e Focus permitem continuar jogando enquanto houver recursos. Porém, jogar somente Burst/Focus e passar permite que o oponente encerre a rodada ao passar também. A Riot documenta essa mudança desde o patch 3.6. Não tratar qualquer carta jogada como garantia de mais uma oportunidade de agir.

Fast aguarda a sequência de respostas. Quando ambos deixam de acrescentar feitiços, a documentação descreve resolução visual da esquerda para a direita. Isso não demonstra a representação interna da pilha nem todos os gatilhos intermediários.

Fonte principal: [Types of Spell Cards and How They Work](https://support.riotgames.com/en-us/legends-of-runeterra/gameplay/types-of-spell-cards-and-how-they-work), de 28/09/2023, consultada em 30/10/2026. Para a restrição de Slow durante uma sequência: [Card Types and How They Work](https://support.riotgames.com/en-us/legends-of-runeterra/gameplay/card-types-and-how-they-work), de 04/07/2023. O artigo geral lista apenas três velocidades; a página específica inclui Focus e foi preferida para o catálogo.

## Estruturas de aventura agora legíveis

O leitor passou a suportar objetos aninhados PROP (tipos 130/131). A seleção ampliada contém 5.061 registros: 1.956 AdventureEncounterData, 1.492 AdventureBattleEncounterData e 1.613 AdventureScalableBattleEncounterData. Todos foram consumidos até seus limites serializados. Isso supera a leitura parcial do lote anterior, mas não comprova disponibilidade, unicidade ou comportamento em execução.

Foi resolvida uma ligação completa para o exemplo antes anônimo:

1. AdventureEncounterData no offset 2220301: DevName `Jinx_MiniBoss_Tier_10`, RGDSPath `ReforgedCampaigns/Encounters/Combat/PZ/NightmareMiniBoss/Enemy_Jinx_Tier_10` e NameKey `card_01PZ040_Name`.
2. Sua escolha contém AdventureBattleChoiceData → BattleData de chave 76939359, encontrado no offset 2220702.
3. BattleEntries contém uma entrada com Level=10 → EncounterData de chave 2065208059, offset 2220763.
4. Essa configuração declara vida inimiga 30, mana inicial inimiga 2 e mão inicial inimiga 4.

Portanto, esses números pertencem a uma variante interna identificada como miniboss Jinx, Tier/Level 10. Não são valores universais de Jinx nem prova de uma aventura atualmente acessível. O significado de Level=10 não foi convertido para estrelas ou nível de campeão. O nome visível localizado ainda não foi extraído.

## Verificação e próximos registros

Extração reproduzível: `tools/analise/extrair_lor_valores.py --adventure`, saída `LOR_AVENTURA_REGISTROS.json`. Cada estrutura aninhada tem verificação de tamanho; a travessia externa termina no tamanho exato do arquivo. Fonte e SHA-256 permanecem os de `LOR_VALORES.md`.

Sem argumento, a seleção de 192 configurações básicas continua separada. Nenhum arquivo do jogo foi alterado e nenhuma partida foi instrumentada.

Pendências: localizar os nomes exibidos e a escala dos encontros; investigar poderes/recompensas e equipamentos de aventura; documentar habilidades, alvos inválidos e exceções de combate. As regras de velocidade acima são confirmação documental, não corpos nativos recuperados.
