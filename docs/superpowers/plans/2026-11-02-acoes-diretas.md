# Ações diretas na mesa e descrições de recrutamento

Solicitado pelo autor: remover listas de bloqueadores/alvos, selecionar diretamente nas cartas e distinguir melhor ataque e vida atuais; corrigir pacote de Kylast sem descrição.

- [x] Bloqueio: atacante em foco, clique no defensor, remover por novo clique, mover defensor entre confrontos sem duplicá-lo, respeitar atordoamento e Elusivo. Confirmar mantém a janela de respostas do motor.
- [x] Magias/armaduras/equipamentos: destacar alvos legais, selecionar/desmarcar, substituir alvo único e respeitar limite de múltiplos alvos. Nexus clicável quando elegível. Efeitos de entrada na própria unidade e alvos da pilha usam botões específicos, pois não há carta correspondente na mesa ainda.
- [x] Cartas sem alvo, como Parede de Fogo, informam aplicação automática. Removidos checkboxes de alvo e selects de bloqueio/portador; confirmação e escolhas de arma/substituição continuam explícitas.
- [x] Estatísticas: ataque atual (antes da arma escolhida) e vida atual/máxima maiores, com rótulos; alvos e bloqueadores destacados.
- [x] Recrutamento e recompensas usam descrição compartilhada; Espada Kylast identificada como equipamento.
- [x] Testes de UI, TypeScript e build; teste manual em perfil isolado de QA comprovou seleção e envio da armadura e do bloqueio.
- [x] Atualizar executável e ZIP.

Sem alterar regras de combate, perfil ou formato de saves. Não implementa arrastar e soltar. Imagem de QA: docs/alvos-diretos.png.
