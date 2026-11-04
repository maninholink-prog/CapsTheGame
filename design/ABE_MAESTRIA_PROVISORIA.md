# Abe — maestria provisória

03/11/2026. O autor decidiu manter por enquanto a proposta abaixo e revisá-la quando houver mais tipos de Upgrades. Não está implementada. São adaptações de gameplay, sem acrescentar fatos ao cânone.

## Base mantida

Nível máximo 30, quinze talentos de um ponto, todos adquiríveis no nível 30. Redistribuição fora da run por 200 Pedras Filosofais. Visual proposto: circuito de invenção acompanhando peito, braços, mãos e ferramentas; ainda não desenhado nem aprovado como imagem. Conexões e pré-requisitos individuais ainda não foram definidos.

| Caminho | Talento | Benefício proposto |
|---|---|---|
| Base | Estrutura Reforçada | Abe recebe +1 de vida base. |
| Base | Ferramentas Preparadas | No início da batalha, compre um Upgrade do deck, se houver. |
| Base | Catálogo Ampliado | Fabricações passam a oferecer os quatro Upgrades existentes, em vez de três. |
| Fabricação | Montagem Econômica | Primeiro Upgrade jogado por rodada custa 1 a menos, mínimo 1. |
| Fabricação | Projeto Eficiente | Primeiro Projeto de Melhoria da batalha custa 1 a menos. |
| Fabricação | Pesquisa Aplicada | Ao resolver o terceiro Upgrade da batalha, compre uma carta. |
| Fabricação | Obra-Prima — nível 30 | Na primeira fabricação da batalha, escolha dois Upgrades distintos entre as opções. |
| Aliados | Reforço Inicial | Primeiro Upgrade resolvido na batalha concede também +1 de vida máxima ao alvo, sem curar. |
| Aliados | Calibração Ofensiva | Primeiro Upgrade resolvido por rodada concede também +1 de ataque ao alvo naquela rodada. |
| Aliados | Engenharia Compartilhada | Ao melhorar a terceira unidade diferente da batalha, compre uma carta, uma vez. |
| Aliados | Aperfeiçoamento Completo | Primeira unidade que receber três Upgrades na batalha ganha +1/+1 adicional, sem curar. |
| Sustentação | Proteção de Oficina | Primeira entrada de Abe concede a ele +2 de vida como armadura. |
| Sustentação | Autorreparável | Primeiro Upgrade aliado resolvido por rodada cura 1 de Abe, se estiver em campo. |
| Sustentação | Inventor Experiente | Ao evoluir, Abe recebe +1/+1 adicional, preservando o dano sofrido. |
| Sustentação | Inspiração Renovada | Ao evoluir pela primeira vez na batalha, Abe fabrica um Upgrade. |

Correção apenas ortográfica do nome anteriormente apresentado como “Autor reparável”: Autorreparável. Fabricações não contam como Upgrades resolvidos. Descontos de Upgrades respeitam mínimo 1.

## Efeitos possivelmente faltantes — investigação aberta

O autor observou que ainda acredita haver efeitos faltantes. Isso não é confirmação de um defeito específico nem autorização para inventar habilidades. Conferência inicial do código: quatro Upgrades fabricáveis já definidos em src/content/allies.ts — Reforço Estrutural (+1/+1), Propulsores (Elusivo), Reflexos Mecânicos (Ataque Rápido) e Motor de Combate (Ataque Duplo). Fabricação oferece três opções em src/battle/champions.ts. Upgrades adicionais Arma Aprimorada, Defesa Aprimorada e Lampejo de Genialidade, além de Zacarias, Keegan, Lúcia e Gremin, constam do código e de tests/battle/narrative-decks.test.ts. A presença de código/testes não equivale a auditoria completa de comportamento.

Separar na próxima revisão: efeitos já aprovados ausentes ou incorretos no jogo; novas habilidades para futuros Upgrades; efeitos ainda faltantes na elaboração das maestrias. Não ampliar automaticamente o conjunto de fabricação quando novos Upgrades forem criados. Os quinze talentos acima seguem provisórios.

## Conexões aprovadas — 03/11/2026

O autor respondeu “Sim” à organização abaixo nesta retomada do desenvolvimento. Este complemento define os pré-requisitos antes ausentes; preserva os efeitos provisórios e o histórico acima. Aprovação de conexões não equivale a implementação ou aprovação de arte.

- Base: Estrutura Reforçada → Ferramentas Preparadas → Catálogo Ampliado.
- Fabricação, a partir de Catálogo Ampliado: Montagem Econômica → Projeto Eficiente → Pesquisa Aplicada → Obra-Prima (nível 30).
- Aliados, a partir de Ferramentas Preparadas: Reforço Inicial → Calibração Ofensiva → Engenharia Compartilhada → Aperfeiçoamento Completo.
- Sustentação, a partir de Estrutura Reforçada: Proteção de Oficina → Autorreparável → Inventor Experiente → Inspiração Renovada.

A retomada autoriza desenvolver e aplicar a árvore de Abe e a Cinderela já aprovada, sem retomar infraestrutura ou Git. Implementação ainda pendente neste registro; plano em [2026-11-03-abe-maestria.md](../docs/superpowers/plans/2026-11-03-abe-maestria.md).


## Aplicação no jogo — 04/11/2026

Os quinze efeitos provisórios e os pré-requisitos aprovados estão disponíveis no Perfil e nas novas aventuras de Abe. A interface apresenta os talentos em texto até haver arte aprovada. Se o sexto Upgrade resolver com Abe fora do campo, a primeira entrada na forma evoluída dispara Inspiração Renovada. Os talentos de alvo seguem o alvo válido quando um Upgrade é redirecionado. A Cinderela entrou no starter no lugar de Arma Aprimorada, que permanece no catálogo e nos decks antigos já salvos.
