# Organização do menu inicial — proposta de design

## Pedido

Reorganizar o menu inicial do C.A.P.S. usando a referência enviada como inspiração, sem copiar sua identidade visual. Preservar as cores jade e cobre e as artes atuais. Deixar a composição preparada para que os fundos possam receber animação numa etapa futura.

## Proposta escolhida pelo autor

O autor escolheu o arranjo A: agrupar as ações na base da tela.

- **Navegação:** manter a barra vertical atual à esquerda, com todos os destinos e ícones.
- **Identidade e recursos:** manter perfil, opções e saldos numa faixa compacta no topo.
- **Cenário:** conservar a arte de fundo atual ocupando a área principal, sem filtros ou assets novos que mudem sua identidade.
- **Ações:** trocar a coluna atual por uma faixa horizontal na base. Aventura segue como ação principal; seleção do adversário e Duelo de treino ficam agrupados; Marcos semanais permanece como atalho secundário.
- **Versão:** preservar `ALPHA · v0.1.0` no canto inferior direito, abaixo da faixa.
- **Fundo futuro:** manter a imagem isolada na camada/propriedade visual do cenário. Nenhuma animação, imagem nova ou dependência será criada neste ciclo.
- **Adaptação:** a faixa deve caber em 1440×960 e 960×700; em larguras menores, seus grupos podem empilhar sem cobrir a arte ou perder foco de teclado.

## Preservações

Sem mudanças em destinos, textos funcionais, saldos, perfil, regras, IDs, dados, artes ou balanceamento. A referência serve apenas para hierarquia e posicionamento de navegação, cenário e ações.

## Verificação proposta

Vitest focado em `tests/ui/home-view.test.ts`, TypeScript e build Vite temporário; conferir a prévia no navegador em 1440×960 e 960×700. Se o pacote portátil local for atualizado, comparar os hashes dos arquivos do build. A prévia não será descrita como partida no executável.

## Complemento visual aprovado — 11/11/2026

Após ver a prévia, o autor pediu: Opções como engrenagem sem texto; Pedras Filosofais como imagem gerada e apenas quantidade; perfil como ícone circular sem nome; ações inferiores limitadas a Aventura e Marcos semanais; controles inferiores sem bordas. Esta solicitação substitui, para a tela inicial, a composição anterior que agrupava o seletor e o Duelo de treino. O fluxo de Treino continua disponível nas telas próprias do jogo.

Implementado com asset transparente `public/art/philosophers-stone.png`, retrato atual do perfil sem moldura, engrenagem e layout inferior sem caixa/bordas dos botões. TypeScript, quatro testes focados e build Vite passaram; 38 arquivos foram conferidos por SHA-256 após cópia ao pacote portátil. A inspeção visual automatizada não foi possível nesta rodada: o navegador isolado teve timeout ao acessar o Vite local e o runtime Playwright alternativo não carregou. O executável permaneceu aberto em um duelo incompleto, por isso não foi reiniciado; a tela nativa ainda usa o bundle anterior. Sem instalação global, commit, push ou publicação.
