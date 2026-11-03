# Primeira run jogável

Escopo autorizado pelo usuário: sequência curta com Kylast, aliado entre três opções após primeira vitória, pacote de seis cartas, recompensas e vida persistente. Os três aliados foram definidos antes de implementar: Abe, Arcata e Rubel, conforme documentos próprios aprovados.

Decisão técnica: três batalhas de teste contra deck de Kylast da IA, claramente identificadas como testes, sem inventar inimigos canônicos. 20 cartas iniciais; primeiro pacote substitui recompensa comum; segunda vitória oferece até três identidades elegíveis para escolher duas cópias ou recusar; terceira encerra run. Empate vale como vitória; Nexus zero em empate recebe mínimo 1 para permitir seguir, exceção confirmada pelo autor nesta sessão. Não conceder moedas/maestria/perfil. Sem mapa, checkpoint ou salvamento nesta etapa. Duelo manual e contra IA isolado continuam disponíveis.

Estado de run independente do estado de batalha: deck mestre de identidades/cópias, grupo, regiões, vida, etapa e RNG de recompensas separados. Novas batalhas reconstroem cartas físicas, resetam temporários e preservam somente Nexus e deck mestre; cartas geradas não são incorporadas. Bloquear transições duplicadas e comandos fora da etapa.

Implementar aliados com suas mecânicas aprovadas. Escolhas de fabricação bloqueiam progressão até decisão, sem expor opções adversárias. Entradas de Rubel exigem alvo explícito; via Colar sorteia alvo ao resolver. Ataque Rápido só ofensivo, Elusivo bloqueável por Elusivo, Duplo não acumula com Kylast. Evoluções preservam dano, contagem por batalha. Regiões individuais de magias não exclusivas usam como decisão provisória o par do campeão, documentado; não altera origem narrativa.
