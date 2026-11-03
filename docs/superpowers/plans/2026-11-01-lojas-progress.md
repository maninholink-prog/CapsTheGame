# Execução — Korakacoins e lojas

Implementação iniciada em 01/11/2026; conclusão e verificação em 02/11/2026. Mesmo checkout Game, sem novas dependências, commits, worktrees ou mudanças globais.

## Entrega

- Nomes aprovados registrados: Korakacoins temporários e Pedras Filosofais permanentes. Apenas a economia temporária implementada.
- Ganho linear aprovado, multiplicadores dos chefes, fallback de recompensa vazia e descarte do saldo ao encerrar, com resumo de obtidos/gastos.
- Lojas padrão/especializada em duas casas existentes, sem aumentar o mapa. Estoque determinístico por semente/casa, sem reroll; preços e serviços aprovados; pares, proteção de campeões, limite de três melhorias, compra especial não duplicável.
- Preço de carta melhorada é recalculado se outra oferta adicionou/removeu o par, sem cobrar a carta duas vezes. Melhorias têm alvo predeterminado.
- Variantes de definições exclusivas de J1, identidade-base preservada para evolução de armas, geração de campeão herdando melhorias, magia própria independente, compra ao entrar com mão/fadiga normais. Variantes ocultas não entram na observação da IA.
- Snapshots incluem saldo, totais, melhorias e estoque. Retry preserva entrada; checkpoint desfaz ganhos posteriores sem alterar consumo monotônico de reviver.
- Eventos genéricos ocultos como interrogação no mapa; lojas identificadas por tipo, conforme regra aprovada encontrada no registro.

## Verificação

Testes novos observados falhando antes das implementações/correções. Resultado final: 172 testes passaram em 30 arquivos; typecheck e build de produção passaram novamente em 02/11/2026. Revisão independente review_shops sem achados acionáveis; 50 testes focados executados pelo revisor. Teste de checkpoint corrigido porque a fixture pulava a primeira batalha e disparava recrutamento no intermediário; não era falha do produto.

Navegador real: servidor reiniciado em localhost:5173; interface carregou, mapa Comum abriu, saldo de zero Korakacoins e ambos os tipos de loja visíveis, eventos ocultos, captura verificada em docs/screenshots/mapa-lojas-korakacoins.png. Compras/serviços/rollback cobertos pelos testes de modelo e renderização, sem alegar uma compra manual dentro de uma run vencedora no navegador. Aba deixada no mapa inicial, pronta para jogar.

## Limites

Sem carteira permanente, boosters, maestria, salvamento ou lojas raras de Pedras Filosofais. Catálogo pequeno limita cartas elegíveis especialmente na especializada; não há preenchimento fictício. Chefes continuam encontros de teste. Não reorganizou a pasta nem configurações do projeto/aplicativo.
