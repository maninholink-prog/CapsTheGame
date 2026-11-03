# Dr. Félix Implementation Plan

> Execução com superpowers:subagent-driven-development para conteúdo/decks independentes e revisão das entregas; coordenador integra motor, IA e UI.

**Goal:** Aventura narrativa jogável de Félix comencontros próprios20/26/30cartas e confrontoFélix→rei, validada numaruncompleta.
**Architecture:** Conteúdoenemy-only e listasmecanicamentevalidadas; módulobattle/encontros para gatilhos/controledefase; nodosdarun fixam encontros determinísticos; UI e salvamento contêm identidade/fase/energia. MecânicaUpgrade compartilhada aproveita osgatilhosdeAbe.
**Tech Stack:** TypeScript/Vite/Vitest existentes, semnovasdeps, commits oumovimentação deprojeto.
**Spec:** design/CARTAS_DR_FELIX.md,DECKS_DR_FELIX.md,AVENTURA_DR_FELIX.md e docs/superpowers/specs/2026-11-02-felix-fechamento.md (fechamento aprovado pelo autor).

## Global constraints
- Preservar perfil/run/batalhas já salvos. Ativar aventuraFélix emnovasruns; não migrarinimigos duma batalhaantiga emandamento.
- Não incluir novasraridades,boosters,recompensas ouprotagonistas. Cartasenemy-only podemserroubadascomefeitosduranteabatalha.
- Até2cópias, exatamente20/26/30segundomatrizaprovada. Sul/Leste, apoiosregiãoúnica conforme aprovação.
- Semrecompensaintermediária entreFélix e rei; seisdescargasrespondíveis eenergianãorecarregável.

## Tasks
- [x] 1. TDD conteúdo/listas:20cartas,suasespeciais quandofechadas,matrix8decks,padrões20/26/30,IDsestáveis,enemyOnly,compatibilidaderegional.
- [x] 2. TDD efeitoscompartilhados:Upgradedanoseguido debuff,keywordstemporáriosfalhaquandojátem,entradas,compraporaliadomorto,experimentos,armasautodano/gelobloqueador/bobina.
- [x] 3. TDD especiais:açõesLabotomia,Tornadoalvo,Dianamitedeclaraçãoedesgaste,Félix4Upgrades e aura dinâmica.
- [x] 4. TDD fasefinal:limiarNexus,terminarefeito/combate,limpezasemgatilhos,conservarjogador/rodada/mana,30cartas/mão5,energia/respostas/anulação/empate/vitória.
- [x] 5. EncontrosnoMapa e IA:variantescomuns,trêsminibosses,finalFélixrei; preservarlistaseembaralharaoreviver; log/previewnomes/especiais/energia,actionssegurassemvercartasocultas.
- [x] 6. Savevalidation+perfil,duelos/runcompleta,8protagonistas/replay,review,navegador,documentação/resultadosdebalanceamentosemdeclararnúmerosfinais.

## Review focus
Lethalemprimeirogolpenãoabortasegundogolpenemcarregadanoparafase2; empate nãocriabatalhacomjogadormorto; counterdeenergiaécontado; buffsdelequipamentoscomoUpgrade sócontamquandopagos; aura nãoretemataqueapóssair; mortespluraisdeProtótipo nãoresgatammortos; dadosdoencontro persistememo reload.


## Validação de 02/11/2026

Conteúdo, motor, IA, mapa, interface e compatibilidade de saves integrados. Resultado e limites em docs/felix-validacao.md. Revisão final feita pelo coordenador: os agentes auxiliares ficaram indisponíveis por limite de uso; não houve revisão independente final. Nenhuma dependência, alteração de pasta ou mudança global.
