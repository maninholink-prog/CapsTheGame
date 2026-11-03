# Execução — IA básica local

01/11/2026. Implementação no checkout Game existente, sem dependências novas, commits ou alterações globais.

- Observação por allowlist, clones e estado sintético sem decks/mão adversária/RNG real.
- Política heurística: mulligan, desenvolvimento, equipamentos/Troca, combate, bloqueios, Banjo e respostas.
- Controlador com timer único cancelável, validação pelo motor e pausa em falha. Contra IA padrão; modo manual preservado.
- TDD: testes observados falhando antes dos respectivos módulos; suíte final 118 testes passou. Quatro duelos automáticos completos com sementes 0, 7, 131 e 2026, verificando legalidade de cada comando.
- Typecheck e build de produção passaram. Revisão independente review_ai sem achados acionáveis.
- Navegador: mulligan automático, unidade Joia Rubra baixada por J2, ataque automático e janela humana de bloqueio/respostas, Nexus humano 20→18. Mão permaneceu J1. Nova batalha manual devolveu controle de J2; retorno ao modo IA verificado. Cancelamento e estado obsoleto também cobertos por testes de timer.
- Captura: docs/screenshots/batalha-ia.png. Mesa deixada na rodada 1 Contra IA, pronta para o jogador.

Limites: heurística inicial, sem previsão perfeita de respostas/sorteios; sem salvamento, run ou novos adversários canônicos. Detecção genérica de ciclos obrigatórios infinitos continua pendente no motor.
