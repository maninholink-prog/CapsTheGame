# Dr. Félix — fechamento para integração

02/11/2026. Objetivo atual autorizado: substituir encontros de teste pela aventura já aprovada e testar uma run completa. As20cartas e a matriz de8decks estão aprovadas. Este lote consolida exclusivamente as escolhas ainda pendentes; não aprova implicitamente o texto antigo superseded.

## 1. Cartas especiais

| Carta | Mana | Ataque/vida | Evoluída |
|---|---:|---|---|
| Labotomia | 3 | 2/4 | Não evolui |
| Tornado | 3 | 1/5 | Não evolui |
| Dianamite | 4 | 3/5 | Não evolui |
| Dr. Félix | 5 | 2/6 | 4/8 |

Duas cópias por identidade no deck, dentro dos20/26/30aprovados. Só uma da mesma carta especial em campo por controlador; não são protagonistas e cópias extras não viram magia de campeão. Não entram gratuitamente em campo. Poderes exigem a respectiva carta presente. Cirurgia deLabotomia custa0mana, uma vez/rodada, usa ação e permite resposta. Félix conta os Upgrades resolvidos com sucesso por seu lado enquanto estiver emcampo; progresso persiste entre cópias. Evolução preserva dano e a aura +1ataque só existe enquanto Félix evoluído estiver emcampo.

## 2. Transição Félix → rei

- O gatilho é zerar o Nexus dafaseFélix. Derrotar só acarta não troca fase.
- Terminar o ataque/efeito emresolução e suas consequências imediatas antes datroca. Se ambosNexus caírem, manter empate/vitória darun; não criar fase comjogador morto. Excedente nãovaza para novoNexus.
- Jogador mantém Nexus,mão,deck,campo,mana,reserva,rodada,marcas própriasválidasetalentos; nenhumarecompensa oumulligan intermediário.
- Limpar campo,mão,deck edescarte inimigos semgatilhos demorte/descarte; retirar marcasligadas a unidadesretiradas. Nova listade30 dorei e mão5embaralhada. Preservar manacomum disponível,maxmana,token eataquedisponível; reserva inimiga0. Nãofazernovainiciativa oucompra extra.
- Nexus dorei usa abase dechefefinal dadificuldade (30/32/35/38/40), cheio. Mesmo númerousado parafaseFélix. Rei éNexus/poder, nãounidade.

## 3. Energia do rei

6energias. Primeiradescarga aofim daprimeirarodada completa iniciadadepois datransição. Cadaumaabre resposta ecausa1atodasunidades dojogador, nunca Nexus. Gastar1energia apósresolver ouseranulada. Ao gastarsexta, verificar mortes/derrotas e sóentão darvitória porsobrevivência. Tambémvence aozerar Nexusdorei. Nenhumacartarecarrega energia.

## 4. Uma região por carta

Classificação de gameplay dentro deSul/Lestejáaprovados; nãoredefine origens da campanha.

- **Sul:** Vigia deCorda, Coletor deSucata, Assistente deSuturas, Cobaia Reforçada, Protótipo Instável, Incisão Experimental, Placas deContenção, Reflexos Alterados, Cirurgia Reconstrutiva, Sobrecarga Forçada, Bisturi Mecânico, Braço dePistão; Labotomia, Dianamite eFélix.
- **Leste:** Servidor Criogênico, Autômato deContenção, Carrasco deEngrenagens, Jato Criogênico, Descarga deBobina, Pulso doLaboratório, Lança Criogênica, Lâmina deBobina; Tornado.

## 5. Disponibilidade nesta entrega

Estas20cartas e4especiais serão de encontro inimigo, fora dosboosters/recompensas comuns atédefinir raridades eaquisição. Kuara pode roubar e jogar seus originais normalmente durante abatalha, sem ganhopermanente. Não criar raridades provisórias artificialmente nem desbloqueios de coleção. Listas, habilidadesdas20cartas, mapa/Nexus/lojas/progressão jáaprovados mantidos.

## Implementação

Escolha recomendada: integrar módulos de encontro nomotor atual, comnovo identificador deaventura emnovasruns. Savesanteriores continuam retomáveis; não reescrever batalhas antigas emandamento. Alternativa deencontrosautônomos foi descartadapeloautor aoescolher Félix+rei nomsmoobatalha.
