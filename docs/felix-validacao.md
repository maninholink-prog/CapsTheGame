# Aventura de Dr. Félix — validação

Fechamento aprovado e implementação em 02/11/2026. Novas runs usam três encontros comuns, três chefes intermediários possíveis e Félix seguido do rei mecanizado. Listas de 20/26/30 cartas; 20 apoios e quatro unidades especiais exclusivas dos encontros. As cartas roubadas podem ser usadas durante a batalha, sem liberação permanente.

O motor compartilha Upgrade com Abe, implementa os poderes dos especiais e preserva o jogador na transição de fase. Descargas respondíveis gastam energia inclusive quando anuladas. A sexta aguarda suas consequências antes de conceder vitória. Testes cobrem empate, dano excedente de ataque duplo, fadiga após anulação, evolução/aura, armas, recrutamento, reviver e saves antigos.

## Simulação

32 aventuras Comuns, oito protagonistas e sementes 1–4, usando decisões reais da IA dos dois lados. Coleção inicial restrita ao protagonista, recrutamento, recompensas, eventos, compras, reviver e liquidação do perfil. Rota escolhe a primeira casa disponível; portanto não representa todas as rotas ou dificuldades. Saves ativos são validados a cada 25 ações.

| Protagonista | Vitórias / 4 |
|---|---:|
| Kylast | 4 |
| Abe | 3 |
| Arcata | 2 |
| Rubel | 1 |
| Youro | 3 |
| Kuara | 2 |
| Thalion | 3 |
| Lázaro | 3 |

Total: 21 vitórias, 23 chegadas ao rei, nenhuma simulação presa. Todas as vitórias verificam 150 Pedras Filosofais e um booster Comum. Dados em `felix-balance-report.json`. A amostra pequena e a política da IA impedem concluir equilíbrio entre heróis; Rubel merece atenção em partidas humanas. Não alteramos os atributos aprovados com base só nesses resultados.

A simulação revelou preparação infinita da IA com Espada Kylast gratuita e Damian. A decisão agora encerra a preparação quando o ataque já basta contra o campo e Nexus visíveis. Banjo e Colar também deixam de receber incentivo sem benefício. As combinações legais do jogador foram preservadas; teste de regressão confirma isso.

## Interface e compatibilidade

Teste no navegador em `localhost:5173`, separado do perfil real em `127.0.0.1:5173`. Importação pública de backup, abertura e restauração da Patrulha Mecânica após reload, além da segunda fase capturada em uma run simulada real. Confirmados rei com 30 de Nexus, energia 6/6, nova mão/deck e campo do jogador preservado. Os contadores ausentes encontrados na inspeção foram corrigidos e receberam regressão automatizada. Capturas: `felix-ui.png` e `felix-king-ui.png`.

Uma aventura anterior do perfil de QA continuou mostrando seus adversários antigos. Perfil real não foi substituído. Os encontros novos só entram em novas aventuras. TypeScript e build passaram na verificação final. A suíte geral passou com 317 testes em 51 arquivos, usando um trabalhador para evitar concorrência de CPU com as simulações. Depois da correção visual, os nove testes direcionados de interface, fases e preparação da IA passaram novamente, incluindo a nova regressão dos contadores. A simulação das 32 runs foi executada separadamente e passou.

Relíquias, arte definitiva dos inimigos e talentos dos demais protagonistas permanecem fora desta entrega. Não houve revisão independente final porque os agentes auxiliares ficaram indisponíveis por limite de uso; revisão de integração feita pelo coordenador.
