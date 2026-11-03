# Menu e progressão local

Escopo escolhido explicitamente pelo autor: menu e progressão completa, não telas vazias. Início aprovado: escolher um dos quatro protagonistas implementados, deck básico liberado, zero Pedras Filosofais; demais campeões via boosters. Treino mantém os quatro. Fórmula Comum aprovada: 10–20 Pedras por vitória conforme posição, completar 150 no chefe final; derrota mantém acumulado.

## Estrutura

Hub com Início, Aventura, Coleção, Boosters e Perfil/Progresso. Carteira permanente visível, Korakacoins da aventura separados. Aventura usa o mapa Comum existente e protagonistas desbloqueados. Treino/duelo curto sem progressão permanente. Perfil inclui nome local, maestrias até30, pontos conquistados, marcos semanais e histórico de moedas. Coleção filtra cartas reais implementadas; nada de conceder protagonistas ainda sem motor.

## Persistência e integridade

Salvar localmente em envelope versionado perfil+aventura+batalha. Retomar run pelo menu sem continuar IA em segundo plano. Salvar a transação antes de mostrar saldo/recompensa; JSON exportável como backup. Falha de salvamento não deve fingir sucesso. Não apagar perfil existente silenciosamente. Identificadores de resultados evitam duplicação após recarregar. Checkpoint restaura somente recursos temporários/contagem de maestria, nunca carteira permanente ou pontos semanais.

## Economia e coleção

Implementar tabelas aprovadas em CAMPANHA.md: preços100/250/500/700/1000, cinco cartas, chance de campeão por booster, extras condicionais/3, garantia40, Ultra exatamente1campeão, contadorShiny6, tabelas de raridade e brilho, máximo3cópias, peso25%no limite, excedentes5/10/20/50/100 (dobro se resultado sorteiaShiny), aparência permanente. Desbloquear campeão libera seus suportes básicos; deck inicial usa duas cópias conforme regra, independentemente de possuir só uma identidade de campeão na coleção.

Raridades das23cartas novas aprovadas por resposta assíncrona: comuns Zacarias/ArmaAprimorada/DefesaAprimorada/Corvo/Coroinha/Luise/Bênção; raras Keegan/Lúcia/Lampejo/Soarim/Salita/ControlarChamas/Archibald/Guardião/Auxílio/ChamaSagrada; épicas Gwen/EscudoFogo/ParedeFogo/Mantum; lendárias Gremin/Kriv. Preservar raridades existentes; Ultra exclusiva de campeões.

Gold permanente na Comum por nó vencido é entregue uma vez por run, evitando farm de moeda permanente por rollback; repetição ainda pontua semanal conforme regra explícita. Final completa150. Maestria só no encerramento, pesos20/60/100, conversão moedas/10 e reviver20, derrota25%, curva31250até30 e prêmioBrilhante/Ultraalternativo uma vez. Mostrar pontos de talento conquistados; árvores de talentos não fazem parte deste pedido de menu/carteira e não inventar árvores dos outros protagonistas. Não afirmar que bônus de árvores estejam implementados.

Semanais: segunda08Brasília, pontosComum10/vitória+50conclusão, reset e resgate manual dos nove marcos aprovados, até doisUltra. Não conceder marcos vencidos automaticamente.

## Alternativas e escolha

Menu com telas preparadas ou menu+progressão real. Autor escolheu a segunda. Preservar Vite/TypeScript e interface local, sem servidor, conta remota ou dependências. Outras dificuldades continuam futuras, não simular mapas inexistentes. Regras econômicas recebem estrutura para cinco raridades.

## Validação

Testes de sorteios/garantias/duplicatas/brilho, transações insuficientes, reset semanal, evolução múltipla e teto, liquidação uma vez, checkpoint e salvamento inválido. UI verificada em navegador com perfil real, compra/abertura após recompensa de aventura e retomada. Arquivos de teste temporários não alteram dados reais do navegador.
