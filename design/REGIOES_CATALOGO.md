# Regiões do catálogo implementado

02/11/2026. Regra explícita do autor: só protagonistas têm duas regiões, demais cartas uma. Pedido posterior: registrar no código. Distribuição abaixo feita na implementação dentro das regiões dos conjuntos anteriormente aprovados; são escolhas de gameplay ajustáveis, não novas afirmações de origem canônica dos NPCs.

## Protagonistas — pares preservados

Kylast Norte/Oeste; Abe Sul/Oeste; Arcata Norte/Leste; Rubel Norte/Leste. Os demais protagonistas mantêm seus pares no design, mas ainda não fazem parte do catálogo executável.

## Apoios implementados — uma região

| Região | Cartas |
|---|---|
| Norte | Espada Kylast, Banjo Pirata, Colar do Deus Enganador, Damian; Corvo Familiar de Arcata, Salita dos Sonhos, Gwen; Palavra Curativa, Oração de Cura, Cura de Ferimentos, Coroinha da Infância, Guardião da Fé, Mantum, Bênção, Auxílio, Chama Sagrada. |
| Oeste | Ybew, Wang Jianxi, robô Campeão, Alastor; Aranha Arranha, Projeto de Melhoria, Engenharia de Campo e os quatro Upgrades fabricados; Zacarias, Keegan, Lúcia, Gremin Ironhold, Arma Aprimorada, Defesa Aprimorada. |
| Leste | Raio de Fogo, Mãos Flamejantes, Bola de Fogo, Soarim, Kriv, Controlar Chamas, Escudo de Fogo, Parede de Fogo; Luise e Archibald. |
| Sul | Lampejo de Genialidade. |
| Korakarom | Joia Rubra, preservada como neutra. |

Exclusividade permanece independente: armas exclusivas de Kylast e Aranha/Projeto de Abe mantêm sua restrição mesmo com uma região. Magias próprias e Upgrades gerados recebem uma região para consistência, sem virar recompensas/identidades extras automaticamente. Gatilhos internos de pilha, que não são cartas obtidas/jogadas pelo jogador, não recebem região nem passam a aparecer nas recompensas.

## Validação e testes

`validateCatalog` rejeita regiões duplicadas, protagonistas com uma/mais de duas regiões atribuídas e apoios com duas regiões. Testes conferem o catálogo e todos os decks iniciais: todas as cartas iniciais possuem região compatível com o protagonista, com duas cópias preservadas. Korakarom continua elegível para qualquer deck; cartas de outras regiões agora deixam de aparecer quando o grupo não tem acesso.

Um teste de compra/melhoria usava Raio de Fogo num grupo Norte/Oeste; após a atribuição exclusiva ao Leste, passou corretamente a rejeitar compra. Cenário de preço foi atualizado para Palavra Curativa (Norte, mesmo preço), preservando a verificação de cobrança única. Novo teste confere rejeição de apoio fora das regiões do grupo.

Verificação final: 205 testes em 32 arquivos, tsc --noEmit e vite build passaram. Sem novas dependências ou alterações de pastas/configuração global. As cartas ainda não implementadas de Youro/Kuara/Thalion/Lázaro e de Félix continuam com distribuição individual de design pendente; não foram incluídas artificialmente no motor neste ajuste.
