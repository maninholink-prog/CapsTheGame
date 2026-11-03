# LoR — recursos, rodadas e primeiras diferenças de aventura

Atualização posterior: [feitiços e encontros](LOR_FEITICOS_E_ENCONTROS.md). O bloqueio do tipo 130 descrito neste registro histórico foi resolvido; a seleção ampliada de 5.061 registros foi consumida integralmente, e o exemplo de offset 2220763 foi ligado à variante interna Jinx_MiniBoss_Tier_10.

Registro de 30/10/2026. Sem propostas de alteração para C.A.P.S.

## Regras documentadas pela Riot

O jogo básico começa com uma gema de mana. Nas rodadas seguintes, a mana é reabastecida e uma gema adicional é desbloqueada. Mana não usada pode formar uma reserva de até 3 para feitiços; o pagamento de feitiços consome essa reserva antes da mana comum. Fonte: [Let's Talk About Mana](https://support.riotgames.com/en-us/legends-of-runeterra/gameplay/let-s-talk-about-mana), artigo datado de 30/07/2022, consultado em 30/10/2026.

Cada jogador compra uma carta no começo da rodada. Os jogadores alternam ações; quem começa com o ataque faz a primeira. Dois passes consecutivos encerram a rodada, e ataque e defesa alternam. Ações podem permitir resposta: invocar uma unidade antes de atacar pode dar ao adversário oportunidade de preparar um bloqueador. Feitiços em resposta ao ataque resolvem antes do combate das unidades. Atacantes sem bloqueador atingem o Nexus. Fonte: [Round FAQ](https://support.riotgames.com/en-us/legends-of-runeterra/gameplay/round-faq), artigo datado de 30/07/2022, consultado em 30/10/2026.

Essas são regras da documentação pública, não defaults recuperados do executável. O teto de 10 de mana foi localizado separadamente na configuração instalada de Constructed. A documentação introdutória não substitui a investigação das exceções, velocidades de feitiço ou ordem exata de todos os gatilhos.

## Evidência instalada de aventuras

A extração dirigida encontrou 1.613 registros do tipo AdventureScalableBattleEncounterData. Somente 279 foram consumidos integralmente pelo leitor atual; os demais pararam em estruturas de tipo 130 ainda não suportadas. Os campos lidos antes dessa estrutura estão preservados com offsets. Não se trata de 1.613 encontros únicos ou disponíveis: podem existir variantes, testes e conteúdo antigo.

Exemplo concreto, offset 2220763 no GamePlayData.bin:

| Campo | Valor serializado |
|---|---:|
| StartingEnemyHealth | 30 |
| StartingEnemyMana | 2 |
| StartingEnemyHandSize | 4 |
| AiDifficulty | 2 |

Esse registro também referencia um baralho e habilidades. Sua leitura para no offset 2220841; a identidade do encontro e sua disponibilidade não foram resolvidas. O valor de dificuldade é um código interno, sem tradução para dificuldade exibida ao jogador.

Nos campos legíveis dessa seleção há diferentes valores de mana inicial inimiga (0, 2, 3, 4, 5, 6, 7 e 8) e tamanhos de mão (0, 2, 3, 4 e 5). Não inferir que um campo ausente vale zero nem transformar a amostra em limites universais. Valores de vida incomuns também existem; sem identidade do encontro, não devem ser apresentados como balanceamento de chefes.

Não foi lido nenhum StartingEnemySpellMana explícito nessa seleção parcial. Isso não prova ausência de mana de feitiço, pois defaults, outros objetos e modificadores ainda podem fornecê-la.

## Reprodução e continuidade

- Script: `tools/analise/extrair_lor_valores.py --adventure`.
- Saída: `LOR_AVENTURA_REGISTROS.json`, com hash da fonte, campos, offsets e ponto de interrupção por registro.
- Sem argumento: reproduz os 192 registros anteriores em `LOR_VALORES_VERIFICADOS.json`.
- Metadados e identidade da fonte: ver `LOR_VALORES.md` e `LOR_ANALISE.md`.
- Próximo: suportar estruturas aninhadas e ligar encontros a seus nomes/variantes; registrar velocidades de feitiço e regras de resposta. Defaults nativos seguem não recuperados, embora mana e compra básicas já tenham confirmação documental.
