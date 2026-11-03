# LoR — primeira inspeção das mecânicas

Atualização: a etapa numérica posterior está em [LOR_VALORES.md](LOR_VALORES.md), com vida, mão, campo, mana máxima e regras do baralho ligados ao modo Constructed. As pendências descritas abaixo refletem a primeira inspeção; consulte essa atualização para o estado atual.

30/10/2026. Alvo local: C:/Riot Games/LoR/live/Game. REA inspecionou instalação e global-metadata.dat versão 31, SHA-256 ff241d8b71d2b008d9ba9af2e3ee7805e9f7a37f808ce871e9d286981cba1dcd. Evidência completa preservada em ../../tmp/lor-evidence-2026-10-30.json. Evidência de metadados ev_091819e1d08e1cf435b09ebe3468b50d0c5a0df48cb43639f14b286e5a7ef2f5. Catálogo dirigido em LOR_COMBATE_CATALOGO.json, 30 tipos Shared com métodos associados por índice.

## Observado nos metadados

- Mana: EventAddMana, EventAddMaxMana, EventAddSpellMana, EventBankMana, EventRefillMana e EventSpendMana são eventos separados, com ApplyState. Distinção estrutural entre mana atual, máxima, de feitiço, reserva e reposição; limites numéricos não recuperados.
- EventPayArbitraryManaCost declara GetManaCost, CanSpendSpellMana, GetDevManaCost, GetSpellManaCost e GetLifeCost. Existe interface de custos com componentes distintos; não demonstra todas as cartas usando vida nem ordem de pagamento.
- Rodada: EventRoundBegin, EventRoundReady, EventRoundEnd, EventRoundComplete, EventDrawingCardAtRoundBegin e EventClearBuffsAtRoundEnd. Nomes distinguem fases/gatilhos; ordem de execução ainda não verificada.
- Ataque: EventGrantAttackToken declara PlayerID, Grant, IsRally e IsScout. Sinaliza tratamento explícito da concessão de ataque e suas variantes, sem confirmar regras completas só pelo nome.
- Combate: eventos gerais e por lane, ResolveCombatGameplayMoment, remoção de combate e retorno de carta após combate. Indica representação própria de combate e posicionamento; ordem/dano não recuperados.
- Há tipos de Adventure para mapas, nós, poderes, recompensas e reroll na instalação. Inventário específico da jornada ainda pendente.

## Consequências para investigação

Prioridade: localizar controlador de ações/prioridade e resolução de feitiços; depois cruzar eventos com dados concretos e comportamento observado. Catálogo de declarações não é código-fonte recuperado. Não houve execução, instrumentação, alteração do jogo nem recuperação de corpos nativos. Falha antiga de associação a GameAssembly.dll registrada na continuidade não foi repetida nesta etapa. Valores de mana, tamanho de mão, ordem de resolução e balanceamento permanecem sem validação por esta análise.

Decisões de C.A.P.S. continuam abertas: este documento descreve evidência do jogo de referência, não regras aprovadas para o nosso jogo.
