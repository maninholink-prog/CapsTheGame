# Mapa Comum — primeiro mapa jogável

01/11/2026. Continuidade autorizada da implementação, sem salvamento ou alterações globais. Base de regras em CAMPANHA.md.

## Escopo

Mapa inteiro com 10 casas, cinco batalhas (incluindo chefe intermediário e final obrigatórios) e cinco eventos. Poucas bifurcações, reencontros, avanço sem retorno. Topologia técnica: batalha inicial → dois caminhos (evento ou batalha) → evento de convergência → chefe intermediário → evento → dois caminhos (evento ou batalha) → evento de convergência → chefe final. Assim os caminhos visitam parte do mapa, não dez casas obrigatórias. Conteúdo de combate continua deck de Kylast/IA, identificado como teste, sem inventar chefes canônicos ou atributos especiais.

Eventos de teste aprovados pelo autor: descanso cura até 5 do Nexus, suprimentos oferecem carta elegível (duas cópias segundo regra geral), resgate concede carga de reviver (máximo cinco); todos podem ser recusados. Sem custos ocultos nesses eventos gratuitos. Distribuição reproduzível por semente entre cinco casas. Mapa todo visível como apresentação provisória; ainda não é regra definitiva de visibilidade.

Carga inicial zero. Morte com carga abre escolha de repetir encontro, ou retornar ao checkpoint se ativo; desistir encerra run. Reviver consome carga e restaura Nexus cheio. Checkpoint ativa somente após vencer intermediário e concluir recompensa; inclui deck, grupo, regiões, visitação e cargas disponíveis. Retorno desfaz ganhos posteriores e preserva consumo de cargas (contador monotônico separado). Conteúdo dos nós não muda; RNG de drops atual não volta ao snapshot. Retry restaura entrada do encontro com vida cheia. Chefe final encerra sem checkpoint. Sem economia permanente ou lojas neste lote; quando implementadas, exigirão fronteira própria fora do rollback.

Preservar run curta de três batalhas e duelos como modos de teste. Novo botão principal abre mapa Comum. Estado de mapa separado das cartas físicas da batalha. Recompensas de primeira vitória e adições em pares continuam inalteradas. Não conceder gold/maestria/boosters sem perfil. Sem outras dificuldades, lojas, testes d20 narrativos ou enredo inventado nesta etapa.
