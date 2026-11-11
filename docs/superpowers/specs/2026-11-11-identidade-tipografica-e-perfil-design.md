# Tipografia e perfil — proposta de design

## Intenção

Consolidar uma identidade própria do C.A.P.S. antes de fechar o redesenho do Perfil. O autor determinou que a faixa superior mostrada na captura não deve permanecer em nenhuma tela do jogo e que o C.A.P.S. deve ter uma fonte tipográfica própria.

## Proposta

- Remover o `hub-header` compartilhado das telas internas. A tela inicial conserva seus controles próprios e o saldo já mostrado junto ao retrato; nenhum cabeçalho horizontal substituto será criado.
- Criar uma fonte de exibição original do C.A.P.S. para títulos, nomes de protagonistas e chamadas de interface. Os textos longos permanecem em Segoe UI, fonte de interface existente no Windows, até haver base para avaliar uma família completa. A fonte própria deve cobrir português (incluindo acentos e cedilha), pontuação e algarismos usados pelo jogo. O desenho terá serifa de fantasia sombria, mas priorizará leitura em tamanhos pequenos e não copiará a tipografia de Legends of Runeterra.
- Manter o layout do Perfil baseado nas referências: cartão de jogador e deck, Maestria na coluna lateral, estatísticas, regiões e cosméticos. O painel de estatísticas recebe o fundo `public/art/battle-sanctuary-jade-copper.png`, com escurecimento localizado atrás do conteúdo para contraste.
- Desenhar ícones vetoriais próprios para os indicadores do Perfil, usando jade e cobre. Símbolos aprovados das regiões continuam usando a arte existente e não serão redesenhados.
- Suavizar a troca entre seções do Perfil com uma transição breve, sem mover elementos durante leitura e respeitando `prefers-reduced-motion`.
- Registrar a remoção do cabeçalho e a tipografia como decisões de identidade em `docs/DECISIONS.md`, em complemento aditivo.

## Limites

- Sem alteração de regras, IDs, dados, balanceamento, estado do jogador ou compatibilidade de saves.
- Sem nova dependência de runtime ou substituição das artes aprovadas.
- O cabeçalho global e seus textos serão removidos por inteiro; não serão duplicados em outra tela.
- A fonte será um arquivo de projeto com fonte-mestre editável e saída distribuível. O processo de geração local precisa ser escolhido antes de produzir o arquivo; o checkout não contém hoje uma fonte própria nem ferramenta de autoria tipográfica instalada.

## Verificação

Adicionar ou atualizar teste para confirmar ausência do cabeçalho nas telas internas e presença da fonte/ícones no Perfil. Rodar typecheck, teste de UI e build Vite temporário. Inspecionar prévia isolada em 1440×960 e 960×700, inclusive abertura/fechamento do deck e troca de abas, e verificar legibilidade do fundo com texto real. A prévia web será descrita separadamente de uma partida no executável Windows. Não atualizar pacote, instalar ferramenta de autoria, criar backup, commitar ou publicar sem tratar essas ações como passos explícitos.

## Aprovação

Escopo aprovado pelo autor em 11/11/2026: fonte original de exibição, mantendo Segoe UI nos textos longos. A fonte deverá ser um artefato tipográfico real com fonte-mestre editável, não uma imagem de letras. O projeto não continha fonte própria nem ferramenta tipográfica instalada; o plano de implementação usa ferramenta de autoria temporária, fora das dependências de runtime e do `package.json`.

### Complemento de direção — 11/11/2026

O autor esclareceu que a fonte própria é central para a identidade do jogo e deve ter caráter épico, inspirado em Legends of Runeterra, Dungeons & Dragons e O Senhor dos Anéis. Essa influência define o tom de fantasia serifada; letras e artes permanecem originais.
