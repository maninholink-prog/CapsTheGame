# Integração — execução e validação

02/11/2026. Pedido: integrar decks narrativos aprovados de Abe, Arcata e Rubel antes de continuar Youro. Implementado no checkout existente, sem commits, instalações ou mudanças de projeto.

- Catálogo e fábrica de decks: Abe20, Arcata22, Rubel22, duas cópias; Kylast20 preservado. Rubel/apoios Norte/Leste.
- Efeitos de todos os novos apoios e magias, entradas respondíveis, descontos e compras, alvos de Gwen/Coroinha, rodada, bloqueio e Escudo de Fogo com retaliação respondível e retomada do combate. Captura de bônus de Controlar Chamas ao jogar; Colar também funciona, inclusive sobre aliados/adversários.
- Seletor no duelo/run/mapa; cabeçalhos e progresso por protagonista. Regiões e filtros de recompensa atualizados para Upgrades colecionáveis.
- Usuário aprovou por resposta assíncrona pacote Kylast + Espada Kylast + Joia Rubra (duas cópias cada), permitindo sempre três aliados após a primeira vitória.
- Artes referenciais de quatro NPCs de Abe copiadas para public/art; sem gerar artes novas.

## Testes e revisão

Teste inicial falhou por fábrica de decks ausente, antes de implementação. Novos testes cobrem listas, regiões, entradas, Upgrade de armadura/magia, limitações por cópia/rodada, cura real, aliases e compras, desconto zero, Colar e bônus de fogo, Escudo sobre inimigo, bloqueio com Banjo e três duelos completos de IA com decks novos. Regressão de cabeçalho observada falhar e corrigida. Revisão independente read-only identificou três problemas: custo zero aumentado por desconto, bônus de fogo no Colar, retaliação com lado invertido pelo Colar. Todos corrigidos com testes; conferência final do revisor sem novos achados.

Checks finais: vitest201/31, tsc --noEmit e vite build passaram. Navegador: seletor e abertura de Abe20 com artes; Rubel22 Norte/Leste, Coroinha jogado no campo vazio visando si mesmo e cura visível na pilha; mapa Arcata22 com grupo/regiões corretos. Duelos completos foram automatizados, não jogados manualmente até o final. Sem alegar balanceamento final.

Ruling: desconto nunca eleva custo já reduzido a zero por melhorias da run; preservar custo original se piso mínimo de um resultaria em aumento. Ruling: ataques com retaliação conservam cursor de lane/golpe para retomar após respostas sem novo ataque/golpe duplicado. Ruling: Coroinha pode visar a própria entrada, evitando torná-lo injogável em campo vazio; nenhum outro alvo ilegal liberado. Ruling: efeitos de bloqueio do Guardião aguardam seleção de Banjo antes de abrir respostas, evitando impasse.

Limites: raridades dos novos apoios não aprovadas (fallback anterior da interface/lojas), balanceamento pendente, oponente permanece Kylast de teste, sem salvamento, coleção permanente, Youro ou chefes de Félix. Nenhuma dependência/configuração global alterada.
