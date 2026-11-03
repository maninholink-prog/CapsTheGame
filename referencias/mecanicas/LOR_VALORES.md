# LoR — valores nos dados locais

Continuação: [recursos e rodadas](LOR_RECURSOS_E_RODADAS.md) resolve documentalmente mana inicial, progressão, reserva e compra, e inicia a extração de configurações de aventura. As pendências abaixo dizem respeito à recuperação desses valores nos dados/código locais.

Inspeção de 30/10/2026. Referência examinada: Legends of Runeterra. Valores abaixo descrevem registros instalados, não decisões de balanceamento de C.A.P.S. nem confirmação de regras atuais do servidor.

## Valores ligados ao modo Constructed

| Parâmetro | Valor explícito | Evidência: offset decimal no arquivo |
|---|---:|---|
| Vida inicial | 20 | BaconGameModeConfig `Constructed`, 13932775, StartingHealth |
| Cartas iniciais no mulligan | 4 para cada jogador | MulliganPhaseConfig 13021313, HandSizePerPlayer: 0→4, 1→4 |
| Máximo de cartas selecionáveis no mulligan | 4 | 13021313, MaxSelectedCards |
| Tempo configurado para redraw multilocking | 60 segundos | 13021313, TimeLimitInSecondsForRedrawMultiLocking; não garante timer visível em todas as situações |
| Capacidade da mão | 10 por jogador | RegionData P1_Hand 11631503; P2_Hand 11629667 |
| Capacidade do campo BackRow | 6 por jogador | P1_BackRow 11631910; P2_BackRow 11630595 |
| Espaços de ataque / defesa | 6 / 6 | Stack_Attack 11629783; Stack_Defense 11631073 |
| Mana máxima | 10 | AddManaPhaseConfig 13021723, MaxMana |
| Tamanho do baralho normal | 40 exatas | DeckRules 14034732, MinCards=MaxCards=40 |
| Máximo de cópias | 3 | 14034732, MaxCopies |
| Máximo de cartas de campeão | 6 | 14034732, MaximumChampions |
| Máximo de facções/regiões | 2 | 14034732, MaxFactions |

Capacidade de uma região não esclarece por si só substituição, descarte, destruição, overflow nem todas as exceções de cartas. O baralho de 40 pertence às regras normais; não deve ser imposto às aventuras.

## Ligações conferidas

O registro Constructed aponta para RootPhaseConfig de chave 2918283935 (offset 13022015), RegionConfig 3385416600 (13022167) e DeckRules 738785441 (14034732). Este último tem a chave de localização `client_Deckbuilder_RulesFilters_NormalRules`.

A raiz contém referências para MulliganPhaseConfig 13021313 e RoundPhaseConfig 13021468. A rodada contém AddManaPhaseConfig 13021723 e DrawCardPhaseConfig 13021962. O RegionConfig referencia as mãos, BackRows e regiões de ataque/defesa listadas acima. São relações serializadas; não houve observação de uma partida nem recuperação do executor das fases.

## Pendências e exceções

- Mana inicial e crescimento por rodada: campos não serializados na fase de mana ligada a Constructed; nenhum default foi inferido.
- Reserva máxima de mana de feitiço: não confirmada nesta extração. `StartingSpellMana=3` em outros registros significa valor inicial naquela configuração, não prova um teto global.
- Compra por rodada: o DrawCardPhaseConfig ligado a Constructed contém somente GUID. Quantidade depende de default ou código ainda não recuperado; ausência não significa zero.
- Há configurações alternativas com mana inicial 3 e 4, mulligan desativado e mãos assimétricas. Não foram atribuídas a modos sem resolver suas ligações.
- Adventure expõe overrides de mana, mana de feitiço, mão e tabuleiro inicial nos metadados. Vida e progressão de Path of Champions ainda precisam de investigação específica.
- Custos, atributos e curva de cartas, dano, prioridade, velocidades de feitiço e condições de término ainda não foram quantificados neste lote.

## Fonte e reprodução

Fonte: `C:/Riot Games/LoR/live/PatcherData/PatchableFiles/GamePlayData/GamePlayData.bin`, 14.049.685 bytes.

SHA-256: `7ded0a61cc39b4a29d2ba7c41d9e1480df78d80ae27f0aa36659b8bb25a9922d`.

REA forneceu nomes de tipos/campos do IL2CPP, preservados em `tmp/lor-evidence-2026-10-30.json`. O script `tools/analise/extrair_lor_valores.py` complementa essa evidência com um leitor parcial PROP v3 e associa nomes por FNV-1a minúsculo. Não é um decompilador nativo nem uma saída do decoder do REA. Variações de caixa dos nomes são preservadas no JSON; associação por hash continua sendo uma interpretação, apoiada por nomes, valores e ligações coerentes.

A travessia de 43.685 entradas terminou exatamente no tamanho do arquivo. Os 192 registros de tipos selecionados foram consumidos integralmente pelo leitor; isso valida os limites estruturais, não prova toda a semântica. Saída completa em `LOR_VALORES_VERIFICADOS.json`; os arquivos anteriores `LOR_CONFIG_REGISTROS.json` e `LOR_VALORES_EXTRAIDOS.json` são etapas parciais, superadas por esta saída.

Próxima investigação: resolver defaults de mana/compra e overrides de aventura; depois estudar custos e atributos das cartas. Nenhuma regra de C.A.P.S. foi implementada.
