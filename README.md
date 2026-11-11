# C.A.P.S. — coleção e aventuras

Protótipo local em TypeScript: combate inspirado em LoR, decks narrativos dos oito protagonistas, cinco dificuldades com rotas, coleção permanente, boosters e perfil salvo no navegador. Os adversários e chefes ainda usam o deck de teste de Kylast.

## Jogar no Windows

1. Abra a [release v0.1.0-playtest.7](https://github.com/maninholink-prog/CapsTheGame/releases/tag/v0.1.0-playtest.7) e baixe as seis partes `CAPS-0.1.0-playtest.7-Windows-x64.zip.001` a `.006` e o arquivo `JUNTAR-CAPS-0.1.0-playtest.7.cmd`.
2. Deixe os sete arquivos na mesma pasta e execute `JUNTAR-CAPS-0.1.0-playtest.7.cmd`; ele monta o ZIP.
3. Clique com o botão direito no ZIP montado e escolha **Extrair Tudo**. Abra a pasta extraída e execute **C.A.P.S.exe**. Mantenha os arquivos juntos.
4. Na primeira abertura, dê um nome ao perfil e escolha um protagonista. Em **Aventura**, escolha uma dificuldade e entre na primeira casa do mapa. Para praticar, escolha **Duelo de treino** em **Início**.

O pacote portátil abre direto no Windows e salva o perfil automaticamente. As versões disponíveis ficam em [Releases](https://github.com/maninholink-prog/CapsTheGame/releases).

## Rodar pelo código-fonte

No Windows, execute **Iniciar batalha.cmd** nesta pasta. Ele inicia o servidor local e abre o navegador. Deixe a janela do servidor aberta enquanto joga; Ctrl+C encerra. Não modifica configurações do sistema nem vínculos de projetos.

Endereço: **http://127.0.0.1:5173/**. Use esse mesmo endereço/navegador para encontrar seu perfil: `localhost` e `127.0.0.1` têm salvamentos separados.

```powershell
node node_modules/vite/bin/vite.js --host 127.0.0.1 --port 5173 --strictPort
```

## Menu e perfil

- **Início:** resumo e retomada da aventura, além do duelo de treino.
- **Aventura:** escolha entre protagonistas desbloqueados e escolha uma das cinco dificuldades e comece o mapa. É possível encerrar a aventura como derrota pelo menu.
- **Coleção:** 83 identidades implementadas, com busca e filtros por região, raridade, posse e brilho. Só protagonistas têm duas regiões. Máximo de três cópias na coleção e duas no deck.
- **Boosters:** compra com Pedras Filosofais, inventário, abertura de cinco cartas, resultado persistido e contadores das garantias.
- **Perfil e progresso:** nome, maestrias, pontos de talento conquistados, marcos semanais com resgate manual, histórico das duas moedas e exportação de backup JSON.

Na primeira abertura, escolha um dos oito protagonistas: ele e seus suportes básicos são liberados, com zero Pedras Filosofais. Os demais protagonistas são desbloqueados em boosters. Recrutamento durante a run pode oferecer um protagonista ainda não obtido; isso não o concede permanentemente. Suas exclusivas ficam elegíveis enquanto ele faz parte do grupo.

A aventura e a batalha são salvas automaticamente a cada ação. Voltar ao menu pausa a IA. Treino permite os oito protagonistas, não concede recompensas permanentes e preserva a aventura em andamento; o duelo de treino não é salvo. A antiga run curta continua disponível na API/testes, não como entrada de progressão no menu.

Exporte um backup no Perfil para guardar outra cópia. Um backup pode ser restaurado na escolha inicial ou na tela de recuperação. Salvamento incompatível não é apagado silenciosamente; a tela permite exportar o arquivo preservado. Falha ao gravar bloqueia a continuação, preservando a última versão salva.

## Economia e progressão

**Pedras Filosofais** persistem entre runs. Na aventura Comum, cada casa de batalha vencida paga uma vez de 10 a 20 conforme sua posição; a conclusão completa o total de 150 e concede um booster Comum. Derrota mantém o que foi recebido. Repetir uma casa após checkpoint não duplica o pagamento permanente. Uma nova vitória repetida ainda pontua semanalmente.

**Korakacoins** são temporárias: 20–35 por batalha conforme a posição; chefe intermediário paga 2× e final 3×. Lojas padrão/especializada usam essa moeda para cartas, melhorias, cura, reviver e remoção. Checkpoints restauram recursos temporários, sem rebobinar a carteira permanente ou os pontos semanais. Recursos restantes contribuem para maestria ao encerrar a run e desaparecem.

Boosters custam **100 / 250 / 500 / 700 / 1000** Pedras. Todos têm cinco cartas; Ultra contém exatamente um protagonista. Garantia compartilhada no 40º booster e brilho no sexto protagonista sem brilho. Duplicatas acima de três convertem em **5 / 10 / 20 / 50 / 100** Pedras, dobradas se aquela carta foi sorteada brilhante. Identidades completas mantêm 25% do peso normal. O visual brilhante vale para todas as cópias, sem bônus de jogo.

Maestria é concedida apenas ao encerrar a run e só ao protagonista. Derrota recebe 25%. A curva crescente soma 31.250 XP até o nível 30, com 15 pontos de talento conquistáveis. Nível 30 concede o visual brilhante do protagonista; se já o possui, concede um booster Ultra. **A árvore de Kylast tem os 15 nós integrados ao combate.** Investir e redistribuir só fora da run; redistribuição custa 200 Pedras. Árvores dos demais protagonistas ainda precisam de seus nós definidos.

Semanais reiniciam às **08h de segunda-feira, Brasília**. Na Comum: 10 pontos por vitória e 50 extras pela conclusão. Os nove marcos precisam ser resgatados antes do reset seguinte; os dois últimos marcos Ultra ficam em 900 e 1500 pontos.

## Combate e mapa

Confirme a mão inicial, faça um mulligan se desejar e role o d20. Selecione a carta, seus alvos e portador antes de jogar. Prepare ataques escolhendo participantes, ordem e arma de cada golpe; o defensor escolhe os bloqueadores. Pilha, histórico e descarte ficam no painel lateral. Passes alternados resolvem efeitos e avançam rodadas.

Vida inicial 20, campo de cinco unidades, mão máxima dez, mana até dez e reserva três para magias/truques/armaduras. Fadiga cresce quando o deck acaba. Kylast/Abe/Youro/Kuara/Lázaro começam com 20 cartas; Arcata/Rubel/Thalion com 22. Primeiro aliado acrescenta seis cartas. Vida do Vínculo persiste entre batalhas; demais recursos de combate reiniciam. Empate vale vitória com pelo menos uma vida na próxima batalha.

O mapa Comum possui dez casas no total (cinco batalhas e cinco eventos), incluindo dois chefes obrigatórios. Rotas se reencontram. Descanso cura cinco, suprimentos oferecem carta elegível e resgate oferece uma carga de reviver, limite cinco. O checkpoint é ativado depois do chefe intermediário e de sua recompensa. Retorno permite escolher nova rota, consome carga e não devolve cargas gastas.

Os oito protagonistas e cinco dificuldades estão integrados. Novas aventuras usam os encontros de Dr. Félix: três patrulhas com 20 cartas, três variantes de chefe intermediário com 26 e o confronto final com 30. Ao vencer Félix, o rei mecanizado inicia uma segunda fase na mesma batalha, preservando o jogador. Suas seis descargas permitem resposta e consomem energia mesmo quando anuladas. As 24 cartas de encontro ficam fora da coleção, boosters e recompensas permanentes. Aventuras antigas mantêm seus adversários anteriores.

O primeiro lote de relíquias está jogável em novas aventuras: Excalibur, Deméter e Talarian Boots, com imagens oficiais, coleção, escolha inicial, recompensa do chefe intermediário e checkpoint. As outras 44, fontes em eventos, relíquias inimigas e árvores dos demais protagonistas continuam pendentes. Detalhes em docs/reliquias-primeiro-lote.md. Não há conta remota ou sincronização entre dispositivos.

## Verificar e consultar

```powershell
node node_modules/vitest/vitest.mjs run --reporter=dot
node node_modules/typescript/bin/tsc --noEmit
node node_modules/vite/bin/vite.js build
```

Dificuldades: Comum 10 casas/5 batalhas, Rara 18/10, Épica 26/15, Lendária 34/20, Ultradimensional 40/25. Tetos de Pedras:150/450/800/1150/1500; nas superiores o total varia conforme batalhas da rota, com chefe final pagando a maior parte. Kits de conclusão chegam a Comum+Raro+Épico+Lendário. Vínculo inimigo e moedas temporárias também escalam conforme tabelas aprovadas. Topologia e interpolação dos ganhos são concretizações técnicas documentadas.

Novos heróis: Youro escolhe Urso/Tigre e evolui por quatro mortes presenciadas; Kuara rouba originais e evolui com seis cartas; Thalion usa Músicas e evolui com seis resoluções; Lázaro marca e executa, com resposta antes da nova rodada, e evolui com dois abates marcados. Magias próprias, pacotes e decks completos estão incluídos. Excesso de mão, formas, marcas e cartas roubadas acompanham a batalha salva.

Sem novas dependências nesta integração. Regras aprovadas: `CAMPANHA.md` e `design/`. Detalhes atuais: `docs/superpowers/specs/2026-11-02-integracao-restante.md` e `docs/superpowers/plans/2026-11-02-integracao-restante-progress.md`. Arte de Kylast e referências de Keegan/Gremin/Lúcia/Zacarias fornecidas pelo autor; demais artes são símbolos provisórios.


## Executável Windows

Pacote portátil em release/CAPS-0.1.0-win-x64: abra C.A.P.S.exe e mantenha a pasta inteira. ZIP para transporte: release/CAPS-0.1.0-Windows.zip. Não exige Node ou servidor. Perfil próprio em %APPDATA%/CAPS-Game; transfira o perfil anterior com Exportar backup / Restaurar backup. Instruções em desktop/LEIA-ME.txt. Para gerar outra versão: powershell -File desktop/empacotar.ps1. Runtime Electron oficial 45.2.1 com SHA-256 conferido, sem instalação global. Teste do pacote confirmou carregamento da tela inicial; janela nativa também localizada em execução.


### Visão tática da batalha

Batalha com cabeçalho compacto, Vínculo e mana junto aos campos, confrontos centralizados e mão na base. A carta selecionada mostra o texto completo na lateral. Os controles do treino continuam disponíveis. Layout atualizado também no pacote Windows; reabra C.A.P.S.exe para carregar a nova versão. Em janelas menores ou com muitos equipamentos, use a rolagem das áreas correspondentes.

