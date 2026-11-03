# Quatro protagonistas — próximo lote de efeitos

02/11/2026. Lote aprovado explicitamente pelo autor. Não substitui as definições oficiais em IDENTIDADES_DOS_PROTAGONISTAS.md. Custos, atributos, regiões, decks, magias de campeão e implementação ficam para etapas posteriores.

## 1. Youro — Metamorfose Fúnebre

Condição já aprovada: ver quatro aliados morrerem. Habilidade aprovada: ao entrar e no início de cada rodada, escolher forma de Urso (+2 vida máxima) ou Tigre (+2 ataque). Evoluído, os bônus das formas passam a +4. Escolha muda a mesma unidade, sem invocar outra; apenas uma forma ativa, sem acumular bônus ao alternar. Preserva dano sofrido, equipamentos e Upgrades; trocar forma não cura e pode derrotá-lo se a vida atual cair a zero ao perder vida máxima. Ao sair do campo perde forma e bônus temporários, como demais unidades. Formas adicionais futuras podem ser definidas individualmente.

Contagem aprovada: cada outra unidade aliada morta enquanto Youro estiver em campo conta uma, inclusive unidades invocadas; morte simultânea com Youro conta para progresso compartilhado, mas não ressuscita nem evolui uma carta já morta. Progresso fica entre suas cópias naquela batalha, não entre batalhas. Detalhamento incluído no lote aprovado.

## 2. Kuara — Pilantragem

Base já aprovada: retirar carta original do deck inimigo para sua mão, usando custo normal. Habilidade aprovada: quando Kuara causar dano de ataque ao Nexus inimigo, roubar uma carta, no máximo uma ativação por rodada. Evolui quando seu lado tiver roubado seis cartas nesta batalha, mesmo com Kuara fora do campo. Evoluído, o mesmo gatilho rouba duas cartas.

Roubo pega a carta do fundo do deck, sem examinar a ordem oculta; pode roubar campeão. Falta de carta não causa fadiga imediatamente: só a compra sem cartas provoca fadiga conforme regra geral. Mão cheia descarta a carta roubada por excesso, mas ela continua removida do deck e conta como roubada. Cada carta transferida conta uma, não cada ativação. Restrições de região valem na montagem; não impedem usar a carta roubada durante a batalha. Demais colisões de efeitos de campeão serão detalhadas antes de implementação.

## 3. Thalion — Dissonância

Base já aprovada: cada música aplica um prejuízo próprio ao inimigo. Habilidade aprovada: a primeira música de seu controlador resolvida com sucesso por rodada, enquanto Thalion estiver em campo, também causa 1 de dano ao Nexus inimigo. Evolui após seis músicas resolvidas com sucesso por seu lado na batalha, mesmo fora do campo. Evoluído, esse dano adicional passa a 2, mantendo uma ativação por rodada.

Música é marca explícita de carta, não toda magia ou som. Uma carta pode ter Dissonância e outra mecânica quando os textos justificarem. Música anulada ou que perde todos os alvos não conta. A sexta música resolve usando estado anterior; evolução ocorre depois. Dano adicional é um gatilho respondível, não aumento automático de todos os debuffs da música.

## 4. Lázaro — Execução

Base já aprovada: sua Execução concede +1 ataque até o fim da batalha. Regra aprovada: unidade inimiga previamente ferida, derrotada por um golpe ou efeito de Lázaro, ativa sua Execução; execuções de aliados não concedem esse +1 a ele. Efeito sem fonte atribuída a Lázaro não vira execução dele.

Evolui ao ver seu lado realizar quatro Execuções. As próprias contam, mas aliados com Execução também podem contribuir. Enquanto evoluído, cada golpe de Lázaro causa +1 de dano à unidade que ele atingir; o dano adicional integra o golpe, não é segundo acerto e não se aplica ao Nexus. Bônus de ataque já acumulados permanecem na evolução. Dano fatal contra unidade inicialmente com vida cheia não é Execução; ela precisava estar ferida antes desse golpe/efeito.

## Limites

Números aprovados como pontos de partida para teste, sujeitos a balanceamento. Uma mecânica compartilhada não concede os efeitos próprios acima a toda carta que possuir a marca. Revisão de design apenas, sem mudanças de código.

## Atributos aprovados e revisão de Lázaro — 02/11/2026

Autor aprovou mana e atributos-base/evoluídos: Youro 4 mana, 2/4 → 3/5 (antes das formas); Kuara 3 mana, 2/3 → 3/4; Thalion 4 mana, 2/5 → 3/6; Lázaro 5 mana, 4/5 → 5/6. Bônus de forma/ataque somam à base e evolução preserva dano.

Ressalva explícita: Lázaro deve usar sistema de execução semelhante à Kindred de LoR. A regra anterior de Execução de inimigos previamente feridos, o limiar de quatro e o +1 de dano dos golpes ficam em revisão, não devem ser implementados como definitivos. Novo detalhe em LAZARO_EXECUCAO.md ainda aguarda aprovação. Os demais protagonistas permanecem aprovados.
