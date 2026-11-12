# Proposta — montar o deck inicial a partir da maestria 15

**Status: aprovada e implementada (DEC-039).** Registrada em 12/11/2026 após pedido do autor. O autor confirmou: manter o tamanho atual dos decks, preservar somente o pacote característico de seis cartas e permitir cartas `enemyOnly` quando possuídas e regionais.

## Contexto atual

- Os decks iniciais são definidos por protagonista; a maioria usa duas cópias por identidade, e Kylast tem uma estrutura própria. Alguns personagens têm tamanhos iniciais diferentes.
- A regra atual mantém o deck inicial fixo e usa as cartas desbloqueadas na coleção para ofertas durante a run.
- A coleção guarda quantidade por identidade (até três cópias), enquanto a montagem de deck limita a duas cópias por identidade.
- Cartas neutras de Korakarom são elegíveis em qualquer deck; demais cartas obedecem às regiões mecânicas liberadas. Cartas exclusivas de campeão continuam sujeitas à restrição de campeão.
- DEC-017 bloqueia cartas `enemyOnly` de decks de jogador. A nova solicitação é uma exceção específica para o deck inicial configurado pela maestria.

## Regra proposta

1. Ao atingir **maestria 15 no próprio protagonista**, desbloquear para esse personagem a edição do deck inicial, antes de iniciar uma nova aventura.
2. Manter o tamanho total aprovado/implementado do deck daquele protagonista. Preservar apenas seu pacote característico de seis cartas: duas cópias do próprio campeão e duas cópias de cada uma das duas cartas de assinatura aprovadas.
3. As outras vagas do deck ficam editáveis com cartas que o perfil possua na coleção. A quantidade selecionada não excede nem a quantidade possuída nem o limite atual de duas cópias daquela identidade no deck. As três cópias que podem existir na coleção não removem o limite de duas no deck.
4. Os pacotes característicos vigentes estão registrados em `src/run/run.ts` e nas fontes aprovadas: Kylast (`kylast`, `sword-kylast`, `joia-rubra`); Abe (`abe`, `aranha`, `project`); Arcata (`arcata`, `fire-bolt`, `burning-hands`); Rubel (`rubel`, `healing-word`, `prayer`); Youro (`youro`, `cycle-guardian`, `barkskin`); Kuara (`kuara`, `pocket-scout`, `light-fingers`); Thalion (`thalion`, `off-key-musician`, `tashas-laughter`); Lázaro (`lazaro`, `last-cry-acolyte`, `inflict-wounds`). Cada identidade contribui duas cópias. Para futuro protagonista, não inventar as seis cartas preservadas: exigir pacote aprovado.
5. Validar região contra as duas regiões do protagonista selecionado. Cartas neutras de Korakarom continuam elegíveis em qualquer deck. Cartas com exclusividade de campeão continuam restritas ao campeão correspondente; aliados ainda não recrutados não ampliam as regiões no deck inicial.
6. Como exceção restrita a esse editor de maestria, cartas possuídas marcadas `enemyOnly` podem ser selecionadas se forem regionais e cumprirem os demais limites. A run iniciada pode mantê-las no próprio deck e save, validando que sua identidade faz parte do loadout inicial aprovado. Isso não libera essas cartas para ofertas, recompensas, lojas ou outras formas de deckbuilding; DEC-017 continua valendo nesses fluxos.
7. Proposta de persistência: guardar a composição escolhida por perfil e protagonista. Um perfil/save legado sem composição continua usando o deck inicial atual; jornadas em andamento não mudam. A configuração é aplicada ao criar uma run nova.
8. Abaixo da maestria 15, o comportamento permanece igual ao atual. A maestria de um personagem não libera a edição dos demais.

## Fluxo e validação propostos

- Mostrar ação de editar na preparação de uma nova aventura somente quando o protagonista escolhido tiver maestria 15 ou superior.
- Exibir o núcleo de seis cartas preservadas, a coleção disponível, cartas selecionadas, cópias e espaços restantes; impedir salvar/iniciar se a composição não tiver tamanho válido, exceder cópias, remover o núcleo, usar carta não possuída, fora de região ou exclusiva para outro campeão.
- Manter o editor fora da run. Alterações de recompensas, recrutamento, lojas e regiões durante a aventura continuam seguindo as regras existentes.
- Cobrir maestria 14/15, preservação imutável das seis cartas, elegibilidade regional e neutra, exclusividade, cartas `enemyOnly` possuídas/não possuídas, limites de quantidade/cópias, tamanho fixo, persistência, save legado e isolamento de jornadas em andamento.

## Arquivos de referência

- Regra atual e limites de deck: [CAMPANHA.md](../../../CAMPANHA.md), especialmente construção de baralho, regiões de Danderian, exclusividade, coleção e limite de cópias.
- Progressão: [MAESTRIA_PROGRESSAO.md](../../../design/MAESTRIA_PROGRESSAO.md).
- Código atual: `src/content/decks.ts`, `src/profile/profile.ts`, `src/profile/validation.ts`, `src/run/run.ts` e preparação de aventura em `src/ui/`.

## Questões de implementação após aprovação

Confirmar no código os tamanhos de deck e os pacotes de seis de cada protagonista; reutilizar catálogo, validador, seleção de região e fluxo atual. Não alterar IDs, regras gerais de recompensa, composição de runs antigas ou lista base para jogadores abaixo do requisito. Implementar por mudança mínima, atualizar testes pertinentes, typecheck, suíte, build e, se solicitado, pacote/QA Windows.
