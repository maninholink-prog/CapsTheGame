# Maestria de Youro — proposta de design

**Estado:** árvore e direção visual aprovadas pelo autor em 11/11/2026; implementação e assets integrados. Valores sujeitos a playtest.

## Intenção

Completar para Youro o mesmo pacote já usado pelas outras árvores: quinze talentos conectados, retrato próprio e arte horizontal para o painel de maestria. A progressão deve ampliar as mecânicas de formas e mortes já aprovadas para o deck de Youro, sem adicionar fatos à narrativa.

## Abordagens

- **Escolhida pelo autor:** aprofundar formas de Urso/Tigre, mortes presenciadas e evolução, no padrão das árvores existentes.
- Criar uma nova mecânica central para a maestria. Rejeitada porque se afastaria do kit já aprovado.
- Fazer talentos genéricos sem relação com as formas. Rejeitada porque diluiria a identidade mecânica de Youro.

## Regras e limites

- Base já aprovada: Youro custa 4, começa 2/4, evolui após presenciar quatro mortes aliadas e passa a 3/5; Urso concede +2 de vida máxima e Tigre +2 de ataque, passando a +4 após evolução. O deck possui Guardião do Ciclo, que invoca Broto Vivo ao morrer, Tigre Espiritual, que cresce quando outros aliados morrem, e Baru, cuja proteção aumenta vida máxima sem curar.
- Os quinze talentos abaixo foram aprovados para implementação; números adicionais permanecem sujeitos à revisão e playtest. Não reduzem o requisito de quatro mortes, não mudam o elenco nem os efeitos das cartas aprovadas.
- Manter as regras existentes: mortes simultâneas são verificadas antes dos gatilhos; retornar à mão ou obliterar não é morrer; Youro não conta a própria morte como morte aliada; limite de campo impede substituir unidades.
- Não usar episódios além dos registros já indexados. A leitura de episódios continua pausada.
- Arte: duas imagens inéditas, um retrato para seleção/interface e uma ilustração horizontal 1672×941 para a árvore. A imagem enviada pelo autor em 11/11/2026 é referência para a aparência de Youro: gato ruivo, capuz verde, manto de penas e bolsa. Ela não define o estilo visual. A direção de arte deve seguir a linguagem de pintura de fantasia de *Legends of Runeterra*, sem copiar artes ou personagens existentes. A ilustração horizontal será uma composição única, sem texto ou nós desenhados; os quinze nós e conexões continuam sendo renderizados pela interface. A cena pode representar as formas de Urso e Tigre como ecos espirituais, sem afirmar que sejam três corpos simultâneos na história.

## Árvore proposta

IDs abaixo são identificadores de trabalho, não IDs de cartas. Nomes, números e efeitos aguardam aprovação.

| # | Talento | Pré-requisito | Efeito proposto |
|---:|---|---|---|
| 1 | Guardião da Floresta | — | Youro recebe +1 de vida base. |
| 2 | Corpo de Urso | Guardião da Floresta | A forma de Urso concede +1 de vida máxima adicional; acompanha o valor atual da forma e não constitui cura separada. |
| 3 | Raízes Protetoras | Corpo de Urso | Na primeira vez por batalha que Youro em forma de Urso receber dano, reduza esse dano em 1. |
| 4 | Abrigo do Bando | Raízes Protetoras | A primeira vez por batalha que uma unidade aliada diferente de Youro receber dano enquanto Youro estiver em forma de Urso, reduza esse dano em 1. |
| 5 | Guardião Imóvel | Abrigo do Bando | Ao evoluir em forma de Urso, Youro recebe +1 de vida máxima adicional, sem restaurar essa vida. |
| 6 | Garras do Tigre | Guardião da Floresta | A forma de Tigre concede +1 de ataque adicional. |
| 7 | Caçada Precisa | Garras do Tigre | O primeiro golpe de Youro em forma de Tigre a cada batalha causa +1 de dano. |
| 8 | Passo do Predador | Caçada Precisa | A primeira vez por batalha que Youro em forma de Tigre abater uma unidade em combate, recebe +1 de ataque até o fim da rodada. |
| 9 | Caçada em Bando | Passo do Predador | Na primeira morte de outra unidade aliada que Youro presenciar em forma de Tigre, Youro recebe +1 de ataque até o fim da rodada. |
| 10 | Rei da Caçada | Caçada em Bando | Ao evoluir em forma de Tigre, Youro recebe +1 de ataque adicional permanente nesta batalha. |
| 11 | Luto que Fortalece | Guardião da Floresta | A primeira morte aliada presenciada por Youro em cada batalha concede +1 de ataque a Youro até o fim da rodada. |
| 12 | Ciclo Compartilhado | Luto que Fortalece | A segunda morte aliada presenciada por Youro na batalha concede a ele +1 de vida máxima, sem cura. |
| 13 | Força da Alcateia | Ciclo Compartilhado | A terceira morte aliada presenciada por Youro na batalha concede +1/+1 ao Tigre Espiritual aliado em campo; não invoca uma cópia. |
| 14 | Evolução Feral | Força da Alcateia | A evolução de Youro concede +1/+1 adicional, preservando dano já sofrido. |
| 15 | Espírito Guardião | Evolução Feral, nível 30 | A primeira morte de um aliado diferente de Youro após sua evolução concede +1 de vida máxima a Youro, sem cura. |

Talentos 4, 7–9, 11–13 e 15 acrescentam gatilhos específicos às regras aprovadas; se mantidos, precisarão de estado de batalha validado e testes para morte simultânea, forma ativa, respostas e save/retomada. Eles não são considerados regras existentes.

## Escopo de implementação após aprovação

- Adicionar os quinze nós e seus pré-requisitos a `src/profile/talents.ts`, integrar o herói à validação compatível de saves e fazê-los aparecer no seletor/árvore já existente.
- Aplicar efeitos no fluxo de combate de expansão e nos pontos de dano/ataque/morte necessários, preservando ordem de resolução, saves e comportamento sem talentos.
- Criar `youro.png` e `youro-mastery.png` sem sobrescrever artes existentes; ligar o retrato à interface e a arte horizontal ao renderer de talentos.
- Cobrir compra/redistribuição, save antigo/novo, efeitos e regras de morte/forma com testes focados. Fazer typecheck, testes afetados, build Vite e conferência visual em janela comum, 960×700 e movimento reduzido.
- Atualizar a build portátil local para teste após a validação. Sem commit, push, publicação ou backup.

## Questões abertas para aprovação

1. Aprovar ou corrigir os quinze efeitos, em especial os talentos 4, 7–9 e 11–15, que acrescentam gatilhos de batalha.
2. Aprovar a direção das duas artes e a representação do retrato como gato com ecos das formas de Urso/Tigre.
3. Confirmar se os valores adicionais devem permanecer provisórios até playtest, como nas outras árvores.
