# Lázaro — proposta de maestria

12/11/2026. **Etapas 1 e 2 aprovadas pelo autor neste chat:** síntese das características e quinze nós com níveis, efeitos, pré-requisitos e conexões abaixo. A [imagem de referência da disposição](LAZARO_MAESTRIA_LAYOUT.svg) foi criada após a aprovação da árvore. A imagem guia o layout; esta especificação textual governa os dados. Implementação ainda não iniciada.

## Características aprovadas e fontes

- **RPG original:** ficha parcial registra Lázaro como dhampir, executor e paladino do Juramento da Matança, devoto de Garandonim; foi escravizado por Frida Volmer, escapou com auxílio divino e persegue vampiros. Renegou o nome Brilho Prateado. A biografia e limites da personalidade são incompletos. Fonte: [ala de personagem](../personagens/LAZARO.md), que resume CAPS 48 e 51–53. A leitura de episódios não foi ampliada nesta etapa.
- **Correção autoral:** sua arma principal chama-se **Último Grito** e é uma **Greatsword**. A anotação de machado em CAPS 48 permanece no registro histórico da fonte, superada para a especificação atual. A imagem anexada pelo autor foi aprovada como referência visual de aparência; detalhes nela não acrescentam lore.
- **Adaptação aprovada:** Execução por marca. Enquanto Lázaro está em campo, seu primeiro abate elegível por rodada marca o inimigo mais fraco restante. No fim da rodada, a execução é respondível; deixar o campo remove a marca de Lázaro e a vítima que sai também perde a marca. Evolui ao presenciar dois abates de inimigos marcados pelo seu lado; abater um marcado com Lázaro em campo dá +1 ataque até o fim da batalha. Ver [regras completas](LAZARO_EXECUCAO.md).
- **Estatísticas e regiões aprovadas:** custo 5, 4/5 → 5/6; Norte/Oeste. Fonte: [deck e efeitos](LAZARO_DECK_EFEITOS.md), [identidades](IDENTIDADES_DOS_PROTAGONISTAS.md) e [catálogo atual](../src/content/expansion.ts).
- **Deck aprovado:** inclui Acólito do Último Grito, Lyari Amastacia, Nerion Liadon, Corcel Sombrio, Loumar Valkren e suportes como Último Grito (arma equipável +2 dano, com +1 dano integrado ao golpe contra marcado), Escudo da Fé e Punição Murchante. Os números e gatilhos existentes ficam preservados nesta proposta. Fonte: [LAZARO_DECK_EFEITOS](LAZARO_DECK_EFEITOS.md).
- **Progressão comum aprovada:** nível inicial 1, máximo 30, um ponto a cada nível par, 15 nós de um ponto e requisito de conexão direta. A árvore abaixo marca o nó final como nível 30; os demais ficam disponíveis a partir do nível 2, sujeitos também aos pontos e pré-requisitos. Fonte: [progressão](MAESTRIA_PROGRESSAO.md) e padrão aplicado em [Thalion](THALION_MAESTRIA_PROPOSTA.md).
- **Direção artística geral aprovada:** representar cartas em cenas épicas ou cotidianas conforme sujeito e contexto, em fantasia pintada de *Legends of Runeterra*, preservando os traços confirmados sem acrescentar lore. Regra vigente para todas as cartas em [DEC-028](../docs/DECISIONS.md#dec-028--direção-artística-de-todas-as-cartas--12112026); DEC-027 registra o escopo inicial mais restrito.

## Candidatas de arte — rejeitadas pelo autor

O autor rejeitou as três propostas iniciais — [carta base](art-proposals/lazaro/lazaro-card-candidate.png), [carta evoluída](art-proposals/lazaro/lazaro-evolved-candidate.png) e [fundo da maestria](art-proposals/lazaro/lazaro-mastery-candidate.png) — e pediu revisão do traço, preservando os conceitos de cena. Os arquivos ficam apenas como histórico; não integrar. Nova direção: fantasia pintada mais próxima da arte ilustrada de *Legends of Runeterra*; base simples/cotidiana, evolução e maestria épicas; expressão séria e postura estratégica sem inventar personalidade. O autor também pediu composição própria para maestria de cada personagem, distinta da de Thalion (DEC-032). Registros: DEC-029, [DEC-030](../docs/DECISIONS.md#dec-030--candidatas-visuais-de-lázaro-rejeitadas--12112026), [DEC-031](../docs/DECISIONS.md#dec-031--revisão-da-direção-visual-de-lázaro--12112026) e [DEC-032](../docs/DECISIONS.md#dec-032--identidade-visual-própria-por-personagem--12112026).

As cartas da segunda rodada foram aprovadas e salvas em [lazaro-card.png](../public/art/lazaro-card.png) e [lazaro-evolved.png](../public/art/lazaro-evolved.png) (DEC-033). Apenas o fundo da maestria continua pendente; a próxima proposta deve usar composição própria para Lázaro.

Nova candidata de fundo com composição central na encruzilhada: [lazaro-mastery-candidate-v3.png](art-proposals/lazaro/lazaro-mastery-candidate-v3.png). Aguardando aprovação; não integrada. [DEC-034](../docs/DECISIONS.md#dec-034--nova-composição-candidata-para-a-maestria-de-lázaro--12112026).

O autor gostou dos caminhos, mas pediu Lázaro de costas diante deles, indeciso sobre qual tomar. A v3 não está aprovada; a próxima versão seguirá a orientação de [DEC-035](../docs/DECISIONS.md#dec-035--pose-de-costas-na-maestria-de-lázaro--12112026).

O autor aprovou a v4. Arte integrada em [lazaro-mastery.png](../public/art/lazaro-mastery.png), registrada em [DEC-037](../docs/DECISIONS.md#dec-037--arte-de-maestria-de-lázaro-aprovada--12112026).

## Etapa 2 — árvore aprovada

Todos os efeitos desta tabela são **propostas novas de adaptação para o jogo**, não cânone do RPG e não regras já aprovadas. Cada nó custa um ponto; seus efeitos ativam apenas se o talento estiver desbloqueado e Lázaro for o protagonista usado. O nó terminal de nível 30 exige também seus pré-requisitos. Valores e frequência ficam sujeitos a balanceamento. A proposta não muda as regras base de Execução, os textos das cartas aprovados, IDs ou saves.

| Nº | Caminho | Nó | Nível mínimo | Pré-requisito | Efeito proposto |
|---:|---|---|---:|---|---|
| 1 | Raiz | Vontade de Sobreviver | 2 | — | Lázaro recebe +1 de vida base nas duas formas. |
| 2 | Último Grito | Punho da Greatsword | 2 | Vontade de Sobreviver | Quando Lázaro equipa Último Grito pela primeira vez na batalha, recebe +1 de ataque até o fim da rodada. |
| 3 | Último Grito | Lâmina Preparada | 2 | Punho da Greatsword | A primeira vez por batalha que Lázaro atinge uma unidade marcada com Último Grito, compre uma carta do próprio deck. |
| 4 | Último Grito | Golpe do Carrasco | 2 | Lâmina Preparada | O primeiro golpe de Lázaro com Último Grito contra uma unidade marcada em cada batalha causa +1 de dano adicional integrado ao golpe. Soma-se ao bônus aprovado da arma. |
| 5 | Último Grito | Aço Inclemente | 2 | Golpe do Carrasco | Quando Lázaro abate uma unidade marcada usando Último Grito, recebe mais +1 de ataque até o fim da batalha, além do bônus aprovado de Execução. |
| 6 | Último Grito | Arsenal Juramentado | 2 | Aço Inclemente | O primeiro equipamento jogado em Lázaro em cada batalha custa 1 a menos, mínimo 1. |
| 7 | Aliados | Sangue Compartilhado | 2 | Vontade de Sobreviver | A primeira cura de Lyari Amastacia em cada batalha restaura +1 adicional ao Vínculo aliado. |
| 8 | Aliados | Acólito Incansável | 2 | Sangue Compartilhado | O primeiro abate de inimigo marcado por seu lado em cada batalha dá ao Acólito do Último Grito +1 ataque adicional nesta batalha. |
| 9 | Aliados | Chamado de Nerion | 2 | Acólito Incansável | A primeira vez por batalha que Nerion Liadon marca um inimigo, compre uma carta do próprio deck. |
| 10 | Aliados | Rédeas Sombrias | 2 | Chamado de Nerion | A primeira entrada do Corcel Sombrio em cada batalha, se houver marca de Execução aliada ativa, reduz em 1 o custo da próxima magia jogada nesta rodada, mínimo 1. |
| 11 | Aliados | Misericórdia de Loumar | 2 | Rédeas Sombrias | A primeira cura de Loumar Valkren em cada batalha restaura +1 adicional ao Vínculo aliado. |
| 12 | Execução | Sinal do Caçador | 2 | Vontade de Sobreviver | Quando Lázaro aplica sua primeira marca em cada batalha, recebe +1 ataque até o fim da rodada. |
| 13 | Execução | Testemunha do Abate | 2 | Sinal do Caçador | O primeiro abate de inimigo marcado por seu lado em cada batalha, enquanto Lázaro está em campo, compra uma carta do próprio deck. |
| 14 | Execução | Frenesi do Carrasco | 2 | Testemunha do Abate | No primeiro abate de inimigo marcado por seu lado em cada batalha enquanto Lázaro está em campo, o bônus normal de Execução passa de +1 para +2 de ataque até o fim da batalha. Bônus separados de outros talentos acumulam com ele. |
| 15 | Execução | Juramento Inquebrável | 30 | Frenesi do Carrasco | Na primeira evolução de Lázaro em cada batalha, restaure 2 de vida ao Vínculo aliado. |

### Conexões propostas

- Raiz comum: `Vontade de Sobreviver`.
- Último Grito: `Vontade de Sobreviver → Punho da Greatsword → Lâmina Preparada → Golpe do Carrasco → Aço Inclemente → Arsenal Juramentado`.
- Aliados: `Vontade de Sobreviver → Sangue Compartilhado → Acólito Incansável → Chamado de Nerion → Rédeas Sombrias → Misericórdia de Loumar`.
- Execução: `Vontade de Sobreviver → Sinal do Caçador → Testemunha do Abate → Frenesi do Carrasco → Juramento Inquebrável` (nível 30).

São 1 + 5 + 5 + 4 = 15 nós. O autor aprovou a árvore integralmente; a disposição correspondente está em [LAZARO_MAESTRIA_LAYOUT.svg](LAZARO_MAESTRIA_LAYOUT.svg). A especificação textual aprovada continua sendo a fonte dos nomes, efeitos e ligações.

## Processo para este e futuros protagonistas

1. Reunir fontes pertinentes; classificar cânone, adaptação, proposta e lacunas; pedir aprovação das características.
2. Propor 15 nós com nomes, efeitos, níveis, pré-requisitos e conexões, distinguindo regras já aprovadas das propostas; pedir aprovação da árvore.
3. Após aprovação, criar a imagem de disposição como guia visual, sem substituir esta especificação.
4. Com as artes aprovadas, integrar catálogo, batalha, save e interface; preservar IDs/compatibilidade e executar verificações pertinentes.

Processar um protagonista por vez. Lázaro segue Thalion na sequência aprovada. Não implementar antes da aprovação da árvore e das artes necessárias. Sem commit, push, publicação ou backup.
