# Thalion — maestria proposta

12/11/2026. **Etapas 1 e 2 aprovadas pelo autor neste chat:** características e os quinze nós abaixo, com efeitos, níveis, pré-requisitos e conexões. [Imagem de referência da disposição](THALION_MAESTRIA_LAYOUT.svg) criada depois dessa aprovação. A imagem não substitui os dados desta especificação. O autor também aprovou as três ilustrações e elas foram integradas nas cartas base, evoluída e na árvore.

## Características aprovadas e fontes

- RPG original: Thalion é bardo Disembodied na ficha parcial; inspiração, distração, cura, flauta/violino e cabeça destacável constam em [sua ala](../personagens/THALION.md). Entrada anterior ao episódio 48 e história pregressa não confirmadas. A barda dos episódios iniciais é outra pessoa.
- Adaptação aprovada: Dissonância, músicas com prejuízos individuais, sem aplicar todos os prejuízos a cada carta. Primeira Música resolvida por rodada enquanto Thalion está em campo produz dano respondível de 1 ao Vínculo inimigo, ou 2 se evoluído. Seis Músicas resolvidas com sucesso por seu lado o evoluem, incluindo resoluções sem Thalion em campo. Fonte: [identidades](IDENTIDADES_DOS_PROTAGONISTAS.md) e [efeitos aprovados](PROTAGONISTAS_EFEITOS_PROPOSTA.md).
- Deck aprovado: Thalion 4 mana, 2/5 → 3/6, Sul/Leste; cinco tropas e cinco Músicas de apoio, duas cópias de cada identidade, mais duas de Thalion. Zombaria Viciosa é magia de campeão. Fonte: [deck](THALION_DECK_EFEITOS.md) e `src/content/expansion.ts`.
- Progressão comum aprovada: nível inicial 1, máximo 30, ponto a cada nível par, 15 nós de um ponto, todos adquiríveis; conexão anterior exigida; redistribuição por 200 gold fora da run. Fonte: [CAMPANHA](../CAMPANHA.md) e [progressão](MAESTRIA_PROGRESSAO.md).

## Etapa 2 — nós e conexões propostos

Todos os efeitos abaixo são **adaptação aprovada pelo autor em 12/11/2026**, não cânone do RPG. Cada nó custa um ponto. O nível mínimo de todos é 2, exceto **Grande Finale**, que exige 30. A conexão indicada é o pré-requisito direto; nenhum ramo lateral precisa ser concluído para avançar em outro. A compra depende também dos pontos obtidos nos níveis pares.

| Nº | Caminho | Nó | Pré-requisito | Efeito proposto |
|---:|---|---|---|---|
| 1 | Raiz | Voz Persistente | — | Thalion recebe +1 de vida base nas duas formas. |
| 2 | Repertório | Partitura Preparada | Voz Persistente | No início da batalha, compre a primeira Música do seu deck, se houver. |
| 3 | Repertório | Compasso Leve | Partitura Preparada | A primeira Música que você jogar em cada batalha custa 1 a menos, mínimo 1. |
| 4 | Repertório | Refrão Estudado | Compasso Leve | Ao resolver com sucesso sua terceira Música na batalha, compre uma carta do próprio deck. |
| 5 | Repertório | Fôlego de Palco | Refrão Estudado | Ao evoluir Thalion pela primeira vez na batalha, recupere 1 de mana de magia, respeitando o limite. |
| 6 | Repertório | Grande Finale | Fôlego de Palco; maestria 30 | A primeira Dissonância disparada por Thalion evoluído em cada batalha causa +1 de dano ao Vínculo inimigo. |
| 7 | Controle | Risada Demorada | Voz Persistente | A primeira Risada de Tasha resolvida na batalha também dá -1 de ataque ao alvo até o fim da rodada, mínimo zero. |
| 8 | Controle | Cegueira Profunda | Risada Demorada | A primeira Cegueira resolvida na batalha reduz o ataque do alvo em 1 adicional nesta rodada, mínimo zero. |
| 9 | Controle | Metal Ressonante | Cegueira Profunda | O primeiro Esquentar Metal resolvido na batalha causa +1 de dano ao alvo. |
| 10 | Controle | Encanto Prolongado | Metal Ressonante | O primeiro Enfeitiçar Monstro resolvido na batalha pode atordoar até três unidades inimigas distintas, em vez de duas. |
| 11 | Controle | Orgulho Ferido | Encanto Prolongado | A primeira Maldição do Orgulho resolvida na batalha causa +1 de dano ao alvo após calcular o dano pelo ataque atual dele. |
| 12 | Conjunto | Instrumento Afinado | Voz Persistente | Instrumento Ilusório recebe +1 de vida base. |
| 13 | Conjunto | Entrada em Cena | Instrumento Afinado | Na primeira entrada de um Instrumentista Desafinado aliado em cada batalha, compre uma carta do próprio deck. |
| 14 | Conjunto | Apoio de Palco | Entrada em Cena | O primeiro bônus de ataque concedido pelo Instrumentista Desafinado em cada batalha aumenta de +2 para +3 naquela ativação. |
| 15 | Conjunto | Vozes Unidas | Apoio de Palco | Ao evoluir Thalion pela primeira vez na batalha, conceda +1 de ataque até o fim da rodada aos outros aliados em campo. |

Estrutura aprovada: `Voz Persistente → Partitura Preparada → Compasso Leve → Refrão Estudado → Fôlego de Palco → Grande Finale`; da raiz saem também `Risada Demorada → Cegueira Profunda → Metal Ressonante → Encanto Prolongado → Orgulho Ferido` e `Instrumento Afinado → Entrada em Cena → Apoio de Palco → Vozes Unidas`. São 1 + 5 + 5 + 4 = 15 nós. A disposição visual está em [THALION_MAESTRIA_LAYOUT.svg](THALION_MAESTRIA_LAYOUT.svg).

## Processo para este e futuros protagonistas

1. Reunir identidade, história e mecânicas aprovadas; distinguir RPG original, adaptação, proposta e lacunas; obter aprovação das características.
2. Propor 15 nomes, efeitos, pré-requisitos, níveis e conexões conforme regras comuns; obter aprovação explícita da árvore.
3. Criar imagem de referência das ligações aprovadas, mantendo esta especificação como fonte dos dados.
4. Integrar catálogo, batalha, save, interface e arte aprovada; verificar regras, testes, build e superfícies pertinentes. Registrar resultados reais e pendências.

Aplicar a sequência a um protagonista por vez. Após Thalion, Lázaro é o próximo na ordem aprovada em [CAMPANHA](../CAMPANHA.md). Não alterar IDs existentes nem balanceamento aprovado durante a proposta.

Direção visual aprovada para todas as cartas, atuais e futuras (DEC-028): usar cenas épicas ou cotidianas de acordo com o sujeito e o contexto, mantendo fantasia pintada de *Legends of Runeterra*. Referências visuais aprovadas guiam aparência sem criar lore.
