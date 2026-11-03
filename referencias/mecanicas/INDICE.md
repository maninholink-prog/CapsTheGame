# Mecânicas da referência — índice

Referência em análise: Legends of Runeterra. As adaptações para C.A.P.S. ficam para uma etapa posterior.

1. [Inspeção REA e catálogo estrutural](LOR_ANALISE.md): metadados, eventos e limites da análise nativa.
2. [Valores instalados](LOR_VALORES.md): configurações de Constructed, ligações e offsets.
3. [Recursos e rodadas](LOR_RECURSOS_E_RODADAS.md): confirmação documental de mana e compra; primeira leitura de aventura.
4. [Feitiços e encontros](LOR_FEITICOS_E_ENCONTROS.md): quatro velocidades, passes e primeiro encontro ligado aos valores.
5. [Poderes e recompensas](LOR_PODERES_E_RECOMPENSAS.md): escolha de poder com supressão de reroll, definições de poderes, ranks e referência de recompensa de vitória. Seleção nova: 4.438 de 4.439 registros integralmente consumidos; um parcial explícito.
6. [Textos e recompensas resolvidas](LOR_TEXTOS_E_RECOMPENSAS_RESOLVIDAS.md): 1.605 poderes ligados a textos em português, cadeia de poder de SBTeemo resolvida e recompensa XP1_Jinx identificada como 500 de experiência base. Seleção de progressão ampliada para 7.616 completos de 7.617; localização com 7.157 registros completos.
7. [Cartas e tabelas de recompensa](LOR_CARTAS_E_TABELAS_DE_RECOMPENSA.md): carta associada ao poder de SBTeemo identificada como Cogumelo Venenoso; 2.990 registros de cartas e 2.235 registros de listas/tabelas completos. Pesos encontrados não equivalem a probabilidades confirmadas.
8. [Situações de recompensa](LOR_SITUACOES_DE_RECOMPENSA.md): 318 tabelas com referências localizadas; cadeias de evento, prólogo e oferta. CardPack também representa curinga; tabelas aninhadas possuem parâmetros adicionais.
9. [Mapa da instalação](LOR_MAPA_DA_INSTALACAO.md): inventário de 21.457 arquivos, hashes das fontes reconferidos e localização de pacotes Unity e interfaces de recompensa.
10. [Componentes das interfaces de recompensa](LOR_UI_RECOMPENSAS.md): 10 prefabs inspecionados, 2.568 registros de objetos percorridos e oito renderers especializados ligados à base CMPRewardCard.
11. [Controlador de fim de aventura](LOR_CONTROLADOR_FIM_AVENTURA.md): CMPRunEndOverlayLoader localizado, referências para cinco telas e CMPRunRewardsOverlay com 13 associações de tipos de recompensa a prefabs. Origem/fluxo exatos dos dados ainda não provados por chamadas.
12. [Entrada de dados do resumo](LOR_ENTRADA_DADOS_RESUMO.md): componente real CMPEndOfRunSummaryOverlay identificado, parâmetro run na tela de recompensas e parâmetros de quantidade/progressão recuperados. Tipos completos e chamadas executadas continuam pendentes.
13. [Fim de run observado](LOR_FIM_RUN_OBSERVADO.md): comparação de logs antes/depois da run concluída pelo usuário; conclusão de nó, progressão e pilha real de StartRewardsRevealSequence → Instantiate confirmadas. Populador do DTO continua não comprovado.
14. [Diagnóstico Frida](LOR_DIAGNOSTICO_FRIDA.md): Windows identifica frida-agent.dll na falha do PID da tentativa; teste em processo descartável funciona. Causa específica no LoR ainda não isolada; nenhuma nova injeção no jogo.
15. [Resultado de conclusão](LOR_RESULTADO_DE_CONCLUSAO.md): RunCompletedResultDto localizado, com Rewards/Scores e rotinas candidatas de fila/processamento. O elo entre a resposta e o preenchimento do DTO continua sem comprovação.
16. [Packs, filtros e duplicatas](LOR_PACKS_FILTROS_DUPLICATAS.md): composições localizadas de cápsulas, cinco casos de dados preservados, filtro de conjunto e proteção/conversão documentada pela Riot. Recursos finais e executor seguem pendentes.

Estado atual: 192 registros básicos e 5.061 registros de aventura consumidos integralmente pelo leitor parcial PROP. Isso não significa análise de todos os dados do jogo, prova de disponibilidade no servidor ou confirmação de todo comportamento. Os relatórios preservam a distinção entre documentação oficial, dados instalados e pendências.

Próximo lote: recursos ausentes/LootZone, filtros de packs, flag de concessão de conteúdo e condições de avanço. Resolvedor CardRef e preços/chances efetivos seguem pendentes. Não implementar o jogo nesta etapa.
