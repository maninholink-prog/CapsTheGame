# Integração das relíquias aprovadas

Fontes: CAMPANHA.md (coleção, checkpoint, raridades, chances, efeitos simultâneos) e design/RELIQUIAS_CATALOGO_PROPOSTA.md/JSON. A aprovação cobre os 47 efeitos e classificações; preservar qualificações de vínculos divinos e não inventar o 48º item. Implementar sobre o projeto atual, sem mudar pastas nem instalar dependências globais.

## Primeiro módulo concluído

- [x] Catálogo executável com 47 IDs estáveis artifact-01…artifact-47, nome, efeito, raridade, divindade textual, linha de origem e ressalva original.
- [x] Ofertas de até três identidades distintas; excluir relíquias já possuídas na run.
- [x] Tabelas aprovadas para as cinco dificuldades, raridade por opção e peso igual por identidade.
- [x] Redistribuir pesos entre raridades com opções disponíveis; devolver lista vazia para o chamador conceder a compensação aprovada.
- [x] Três testes passaram; TypeScript passou.

O módulo ainda não está conectado à interface nem ao combate. Não conceder passivos sem implementação do efeito correspondente. Não anunciar as 47 relíquias como jogáveis nesta etapa.

## Próximas entregas

- [ ] Coleção: separar descoberta de conquista, seleção inicial de até uma e compatibilidade com saves antigos.
- [ ] Run: relíquias ativas/obtidas, chefe intermediário, checkpoint e confirmação de conquista somente na vitória.
- [ ] Motor: implementar os gatilhos aprovados dos 47 efeitos, seguindo unidades antes de relíquias e ordem de aquisição; testes por família de efeito.
- [ ] Encontros: quantidade por dificuldade e exclusivas dos chefes conforme registros; apresentar decisões narrativas ainda ausentes ao autor, sem sorteá-las como se já estivessem aprovadas.
- [ ] Eventos: inserir obtenção no mapa sem alterar silenciosamente a distribuição atual de eventos; apresentar localização/variante concreta ao autor.
- [ ] UI: catálogo, seleção, ofertas, passivos visíveis e fontes dos bônus.
- [ ] Testar integração e atualizar executável apenas quando o fluxo conectado estiver jogável.

Alternativas: implementar os 47 em uma única alteração dificulta identificar conflitos de gatilhos; liberar recompensas de itens sem efeito cria escolhas enganosas. A divisão por módulo conserva todos os efeitos aprovados e mantém cada etapa verificável.

## Primeiro fluxo jogável — 02/11/2026

Coleção, seleção inicial, recompensa intermediária, checkpoint, saves e três efeitos foram integrados e verificados. Nomes/artes oficiais das três identidades confirmados pelo autor: Excalibur, Deméter e Talarian Boots. As demais entregas desta lista continuam pendentes até cobrir todos os efeitos e fontes. Registro detalhado em docs/reliquias-primeiro-lote.md.

