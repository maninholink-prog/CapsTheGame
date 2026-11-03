# Execução — mapa Comum

01/11/2026. Mesmo checkout Game. Sem dependências novas, commits, alterações globais ou salvamento.

## Entrega

- Topologia fixa com distribuição de eventos por semente, dez casas: cinco batalhas/cinco eventos. Duas bifurcações, reencontros e chefes obrigatórios.
- Apenas adjacências legais permitem avanço. Recompensas existentes e recrutamento mantidos; final depende do nó de chefe final, não do terceiro combate.
- Eventos aprovados: descanso cinco, suprimentos em pares e resgate uma carga, todos recusáveis.
- Reviver de zero até cinco, retry com snapshot de entrada e Nexus cheio; checkpoint após recompensa do chefe, rollback de deck/grupo/regiões/visitação/ganhos com contador monotônico de gastos. RNG de drops não volta ao snapshot.
- Modo curto e duelos preservados; novo botão de mapa. UI mostra ligações, disponibilidade, visitação e chefes; eventos e destinos de reviver separados.

## Provas

Testes novos observados falhando antes de implementar. 157 testes passaram em 27 arquivos; tipos e build passaram. Novos casos cobrem acessibilidade/DAG/contagens, todas as quatro rotas, eventos/recusa/cap, retry antes do checkpoint, stale battle rejeitada, restauração real do deck, consumo não reembolsável e término descartando cargas.

Revisão independente review_map sem achados bloqueantes. Ajustado título de suprimentos para não indicar recompensa de batalha. Não dependemos de npm no PATH; checks executados por Node com CLIs locais.

Navegador real: mapa com dez casas, só entrada habilitada, seleção de casa leva ao mulligan e iniciativa; IA assume sua prioridade. Não alegar execução manual de uma rota vencedora; transições completas e rollback cobertos por testes. Captura final em docs/screenshots/mapa-comum.png.

## Limites

Chefes e batalhas continuam encontros de teste com deck de Kylast; sem enredo inventado ou balanceamento próprio. Mapa todo visível provisoriamente. Sem lojas, economia, perfil, demais dificuldades ou salvamento. Snapshots deverão ser estendidos para moeda temporária e preservar gastos permanentes fora deles quando a economia existir. Checkpoint não concede carga automaticamente; resgate fornece carga conforme aprovação.
