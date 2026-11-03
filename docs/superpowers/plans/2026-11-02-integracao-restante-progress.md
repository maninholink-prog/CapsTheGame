# Integração restante — execução e verificação

02/11/2026. Autorização: aplicar pendências; autor acrescentou os demais heróis e aprovou as37classificações. Projeto preservado no mesmo local, sem commits, instalações ou alterações globais.

## Entregue

- Oito protagonistas: novos Youro/Kuara/Thalion/Lázaro com37apoios, quatro magias próprias, seis cartas por pacote e decks iniciais20/20/22/20. Coleção agora83identidades; tokens/internos/gerados não viram recompensas de montagem.
- Motor: formas deYouro com escolha, preservação de dano e mortes simultâneas; roubo físico, origem e fadiga específica deKuara; Músicas explícitas deThalion, descontos e gatilhos; marcas deLázaro/Nerion com comparação, autoria deabates, frenesi/evolução e respostas nofimdarodada antes deavançar.
- Quinze talentos deKylast: dados, pontos/pré-requisitos, reset200Pedras fora darun, captura doloadout e efeitos no motor. Capacidade2→6 porjogador, descontos, compras, bônus, cura/armadura respondíveis.
- Cinco mapas/dificuldades: totaisaprovados, start/mid/finalobrigatórios, bifurcações/convergência, moedas,Nexusinimigo,kits,semanais,XP econclusão porrota. Lojas reconhecem asnovasIDs.
- UI: oitoheróis, seletordificuldade, árvoredetalentos, formchoices, contadores/formas/marcas visíveis. IA conhece campos públicos novos e usaquantidade pública dodeck semidentidades ocultas.
- Salvamento: migraçãoaditiva dasquatronovasmaestrias; validaçãodetalhada deformas,talentos,dificuldade e origemantesderestaurar. Perfilanterior preservado, semliberargratuitamente novoscampeões. Treinopermite todos8.

## Decisões técnicas

Ruling: mapas superiores são DAGs determinísticos por camadas, com4/6/8/10bifurcações, preservando contagens e osdoischefes — concretiza tabelas que nãofixavamtopologia — custos deajuste isoladosemdifficulty.ts.

Ruling: rota mínima superior paga50%doteto (nuncamenos150), rota máximapaga100%; intermediáriasinterpolamporbatalhas. Préfinalpagaaté30%doteto, restonaúltimavitória — garante maisbatalhasmaispagamento e finalmaiorfonte — fórmula éimplementaçãoajustável, nãofalaoriginaldoautor.

Ruling: Manutençãoconsome desconto naprimeira reequipagem da instância escolhida na rodada; retornosrepetidos não renovam. Empunhadura reserva desconto numúnicoArsenalpendente; custosjá pagos não sãorecalculados apósrespostas. Falhar/anular liberareservapara jogadasfuturas; sucessoconsomebenefício — impede desconto duploe reuso ilimitado.

## Revisões

Conteúdo+talentosdados: sem bloqueadores. Dificuldades:14testes e revisãoaprovados. Motor expansão: duasfalhasIA corrigidascomRED→GREEN (MãosLigeiras indevidamentebloqueada por deckredigido; Youroevoluído escolhiaformaquematava). Talentoscombate: doisdescontoscorrigidoscomregressões (Manutençãorepetida; reservaEmpunhadura). ObservaçãoIAagorapreserva loadouts/usos públicos. Revisãoampla final sembloqueadores; sugestãodavalidaçãodosnovoscampos incorporadacomregressão.

## Navegador

PerfilBruxo: nome,0Pedras,10cartas eAbe preservados; outrosprotagonistas seguem bloqueadosnaaventura conforme coleção, mas todos8 listadosnotreino. Históricoexistenteinclui encerramento deAbeàs15:41.

QAisoladoemlocalhost: backupdedesenvolvimento comtodos8eKylast30, semmodificar127.0.0.1. Investiu ponto, redistribuiu400→200Pedras, completou15nós; mapaRaro18casas/10batalhas/8eventos, inimigo22Nexus e6cartasnamão peloArmeiro. Resetindisponível durantearun. CenáriodeYouro geradoporjogadaslegais domotor foi restauradopelainterface, escolheuUrso (2/4→2/6), pausou/recarregoueretomoucomforma intacta. Screenshot: docs/screenshots/youro-forma.png. QAfechado.

## Limites remanescentes

Árvores dosdemaiscampeões nãoforam inventadas; precisamdesenharseus15nós. Relíquias,eventosnarrativosd20,lojarara permanenteeFélix/chefescanônicos seguemfuturos. DeckinimigoatualétestedeKylast20cartas, ainda semtemplates26/30/relíquias ou políticasestratégicasespecíficaspor dificuldade. Saveslocais, semcontaremota. Arte nova permanece símboloprovisório.

## Verificação final

**289 testes em44arquivos passaram**; `tsc --noEmit` e `vite build` passaram. Suiteinclui dueloslegaisdosnovosheróis, restauraçãoa cadaação dos8protagonistas, migraçãolegada, topologias cobertas pelossubtestes de1.364rotas, 15talentosecustos, fimderodadacomresposta e recompensas. Referênciadequantidadederotas: testes/difficulty.test.ts (semdependerdenúmeroaproximado nesteregistro). Navegadormarcadoem127.0.0.1nomenuAventura, comtreinodeYouroconferido;perfilBruxopreservado.

