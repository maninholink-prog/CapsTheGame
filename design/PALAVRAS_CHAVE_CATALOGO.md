# Palavras-chave de C.A.P.S. — catálogo em elaboração

03/11/2026. Autor aprovou incluir Barreira, Sobrepujar, Desafiar, Regeneração e Roubo de Vida, além das palavras-chave já existentes. Aprovação de inclusão não equivale a implementação ou fechamento de todas as interações.

## Já presentes no motor

src/content/schema.ts define Keyword como elusive, quick e double. Upgrades fabricados de Abe podem conceder Elusivo, Ataque Rápido e Ataque Duplo. Reforço Estrutural concede atributos, não uma palavra-chave.

## Novas inclusões aprovadas

Descrições abaixo são a base de referência de LoR para adaptação; interações finais de C.A.P.S. ainda precisam ser consolidadas.

| Palavra-chave | Base de funcionamento |
|---|---|
| Barreira | Anula a próxima ocorrência de dano à unidade; expira no fim da rodada se não usada. Não acumula cargas. |
| Sobrepujar | Ao atacar, dano que excede a vida do bloqueador vai ao Vínculo adversário. |
| Desafiar | Ao declarar ataque, permite escolher qual unidade inimiga bloqueará o atacante. |
| Regeneração | Cura a unidade até sua vida máxima no início da rodada. |
| Roubo de Vida | Dano causado pela unidade cura seu próprio Vínculo; dano impedido não concede cura. |

Fonte oficial consultada: https://support.riotgames.com/en-us/legends-of-runeterra/gameplay/keywords-and-game-vocab-legends-of-runeterra/

## Interações para fechar antes da implementação

- Sobrepujar com Barreira, bloqueador removido e cada golpe de Ataque Duplo; calcular usando o dano de armas do C.A.P.S., não apenas ataque base.
- Desafiar com Elusivo, atordoamento, efeitos que impedem bloquear e efeitos de relíquias que também escolhem bloqueadores. Não presumir que as restrições atuais de C.A.P.S. são idênticas às exceções de LoR.
- Regeneração e Roubo de Vida com Rubel, amplificação de cura, limites máximos, dano prevenido, fontes de dano secundárias e mortes simultâneas. Fixar momento de resolução e prioridade/respostas.
- Duração quando concedidas por uma carta ou Upgrade; Barreira continua consumível/temporária. Não confundir duração do efeito concedente com duração da proteção.
- Persistência em save durante a batalha, informação pública da IA e descrições na interface.

## Relação com Abe e os protagonistas

Essas habilidades são compartilháveis por cartas de diversos protagonistas conforme história e efeito aprovado. Não se tornam exclusivas de Abe. Custos, nomes de novos Upgrades, escolha aleatória e inclusão no conjunto de fabricação ainda não foram definidos; preservar por enquanto os quatro fabricáveis existentes. Maestria de Abe permanece provisória em ABE_MAESTRIA_PROVISORIA.md. Novos efeitos próprios dos protagonistas serão tratados separadamente, sem transformar toda habilidade narrativa em palavra-chave universal.

Nenhuma dessas cinco palavras-chave foi implementada nesta etapa.

Atualização de nomenclatura — 03/11/2026: o autor escolheu Vínculo no lugar de Nexus. Descrições e novas cartas devem usar Vínculo.
