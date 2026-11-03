# LoR — conferência da instalação

31/10/2026. Diretório: `C:/Riot Games/LoR/live`. Inventário de caminhos e tamanhos: 21.457 arquivos, 4.627.837.125 bytes (4,63 GB decimais). Não é verificação oficial de integridade nem leitura integral do conteúdo de todos os arquivos.

## Organização encontrada

| Área | Arquivos | Bytes | Conteúdo identificado / limite |
|---|---:|---:|---|
| PatcherData/PatchableFiles/AssetBundles | 21.129 | 2.327.110.535 | Pacotes de recursos e mapas de associação |
| PatcherData/PatchableFiles/Audio | 5 | 876.714.809 | Área de áudio, sem decodificação neste lote |
| PatcherData/PatchableFiles/Video | 133 | 847.373.012 | Área de vídeo, sem reprodução neste lote |
| PatcherData/PatchableFiles/GamePlayData | 19 | 91.412.476 | Gameplay, idiomas e arquivos auxiliares |
| Game/LoR_Data | 162 | 373.615.120 | Dados Unity e metadados IL2CPP |

Executáveis e bibliotecas incluem LoR.exe, GameAssembly.dll, UnityPlayer.dll, baselib.dll e stub.dll. Inspeção REA voltou a indicar Unity IL2CPP; evidência de resumo `ev_fb885eb542699955c3ad576a2d49de2134ed5fad7d94b73ec6a62b3021356303`, baseada na evidência retida `ev_82672d236eebeb04bb9a0dd26f28b61b81ca574c4cdb426c93a1572ae20c8582`. Esse resumo não substitui a conferência atual de hashes feita localmente.

## Correspondência com a pesquisa anterior

Hashes completos conferidos e iguais aos registros anteriores:

- GamePlayData.bin: `7ded0a61cc39b4a29d2ba7c41d9e1480df78d80ae27f0aa36659b8bb25a9922d`.
- LocalizedText_pt_br.bin: `86ce052dd6fd7a7cbcb9a4edd8a0a0aa8ca59dfd52b0a83e5618dc6bd2df7254`.
- global-metadata.dat: `ff241d8b71d2b008d9ba9af2e3ee7805e9f7a37f808ce871e9d286981cba1dcd`.

GameAssembly.dll também recebeu hash completo neste lote: `93673081f7c74805d1d2ffdd45bac8c101d1b7c56e007e852ccee1edc5edea9f`, 56.072.928 bytes. Não foi recuperado código nativo nem comprovada associação entre cada método dos metadados e seu endereço nativo.

## Recursos localizados

AssetToBundleMap.txt possui 100.592 linhas e relaciona caminhos de recursos a pacotes .bbq. A seleção textual por adventure, reward, loot, script, python e .lua gerou 8.753 entradas em `LOR_RECURSOS_MAPEADOS.json`. É uma seleção por nomes, não classificação semântica: por exemplo, ScriptableObjects são recursos Unity e não comprovam scripts de código-fonte disponíveis.

Os cabeçalhos de alwaysloaded.bbq e monobehavior.bbq começam com UnityFS e incluem a versão `2022.3.62f2`. Isso caracteriza esses dois pacotes; não foi generalizado por inspeção a todos os .bbq.

O mapa aponta para prefabs de resumo de recompensas no alwaysloaded.bbq, incluindo experiência de campeão, fragmentos de campeão, gemas, fragmentos nova, relíquias e melhoria de espaço de relíquia. Isso localiza representações de interface; não estabelece quantidades, regras de concessão ou disponibilidade.

Não apareceram arquivos soltos com extensão .py/.lua/.js na seleção de extensões do inventário. Isso não exclui código embutido, recursos serializados ou lógica no servidor. A pasta BurstDebugInformation contém indicação de compilação Burst; sua presença não equivale ao código-fonte completo.

## Próxima inspeção útil

Inspecionar o conteúdo serializado dos pacotes de interface de recompensa e as ligações de componentes, a partir de alwaysloaded.bbq/monobehavior.bbq e do mapa. Continuar distinguindo dados de apresentação, regras de gameplay e lógica não recuperada. Inventário completo em `LOR_ARQUIVOS_INVENTARIO.json`; nenhum arquivo da instalação foi modificado.
