# Visão tática da batalha

Pedido: aproximar a organização visual de LoR para compreender melhor a partida. Manter identidade e mecânicas de C.A.P.S., sem mover o projeto ou modificar saves.

Escolha de implementação: grade compacta da batalha, adversário acima, confrontos ao centro, jogador abaixo e mão na base; recursos junto a cada Nexus e ações/detalhes na lateral. Compactar o cabeçalho e o resumo da run durante a batalha. A alternativa de apenas recolorir preservaria o excesso de rolagem; uma reconstrução de arte/animações ultrapassaria esta etapa de leitura do jogo.

- [x] Criar estilo de batalha isolado dos menus de coleção/perfil.
- [x] Reduzir cartões em repouso, mantendo estatísticas, alvos e equipamentos legíveis; detalhes na inspeção.
- [x] Manter confirmações, controles, fronteiras entre campo/combate e mão adversária oculta.
- [x] Conferir no navegador com combate, carta selecionada e resolução de combate, em tamanhos desktop.
- [x] Rodar testes de interface, TypeScript e build; atualizar executável/ZIP e documentar limites.

Critério: visualizar ambos os lados, o confronto e a mão com menos rolagem; nenhuma carta ou ação desaparece por recorte de área fixa. Telas menores podem rolar e confrontos largos mantêm rolagem horizontal. Não inclui artes novas, drag-and-drop ou mudanças de combate.


## Conclusão — 03/11/2026

Estilo tático isolado em src/ui/tactical.css. Verificados seleção de bloqueador, confirmação, janela de respostas, retorno à retaguarda, inspeção da magia e controles do treino. Em 1440x900, o cenário de combate de QA mostrou campo e mão na mesma visão; telas menores e campos mais cheios podem exigir rolagem. A escala temporária do navegador foi restaurada.

Verificação final: 31 testes de interface passaram; TypeScript passou; build de produção gerado. Executável abriu corretamente no teste de inicialização. Hash SHA-256 do CSS de produção conferido tanto na pasta portátil quanto no ZIP. Sem mudança de regras ou saves. Captura: docs/batalha-layout-tatico.png.
