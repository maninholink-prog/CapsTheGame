# Relíquias — primeiro fluxo jogável

02/11/2026. Integração em lotes do catálogo de 47 efeitos aprovado. As três primeiras são Comuns; portanto as ofertas deste lote são redistribuídas entre Comuns elegíveis. Isso não substitui as probabilidades aprovadas para o catálogo completo.

## Entregue

- Excalibur (artifact-07): cura 1 da unidade própria ferida com menor vida atual no início da rodada; empate aleatório. Efeito permite resposta e interage com a cura de Rubel. A ordenação coloca as unidades do mesmo lado antes da relíquia.
- Deméter (artifact-16): descanso aceito cura mais 3 do Nexus, limitado à vida máxima. Recusar não cura.
- Talarian Boots (artifact-22): primeira unidade jogada por rodada recebe Ataque Rápido temporário. Invocações de tokens não consomem esse primeiro uso; habilidades permanentes existentes são preservadas.

Nomes e imagens confirmados expressamente pelo autor; aliases anteriores ficam preservados no catálogo. IDs e efeitos permanecem estáveis. Fonte das artes e inventário das 53 imagens em referencias/drive/reliquias/LEITURA.md.

Novas aventuras iniciadas no menu habilitam o fluxo. Saves de aventuras anteriores continuam com o comportamento que tinham; não receberão novas regras no meio da run.

Na tela Relíquias: três implementadas primeiro, estado de descoberta/conquista e arte local. Efeitos de relíquias não descobertas ficam ocultos nessa coleção. As demais 44 estão marcadas como preparação e associação de identidade pendente; não são oferecidas enquanto seus efeitos não funcionam.

Após a recompensa normal de cartas do chefe intermediário, escolher uma entre até três relíquias elegíveis; com nenhuma, receber a compensação de Korakacoins aprovada. Não repetir relíquia ativa. O checkpoint só é concluído após a escolha. Relíquias ficam fora do deck e ativas imediatamente; seleção inicial permite até uma já conquistada.

Descobertas permanecem registradas ao reviver. O checkpoint restaura a lista ativa daquele momento. Derrota não conquista relíquias novas; vitória confirma apenas as ainda ativas, preservando conquistas anteriores. Saves, perfil, IA e batalha carregam o novo estado opcional.

## Verificação

Suíte geral: 339 testes em 59 arquivos, sem a simulação longa; depois, testes direcionados de identidade/arte, UI e saves passaram. TypeScript e build passaram. Duas runs Comuns completas de Kylast com Deméter inicial, escolha no chefe e segundo passivo ativo terminaram em vitória; conquista e pagamento final verificados. Resultado em relic-run-report.json. Não é medição final de balanceamento.

QA no navegador em localhost, separado do perfil real em 127.0.0.1 e do executável: importação de um estado da simulação, oferta com artes, seleção de Excalibur, checkpoint ativo, coleção após reload, derrota sem nova conquista e nova aventura iniciada com Deméter previamente conquistada. Captura em reliquias-colecao.png.

## Ainda pendente

Outros 44 efeitos, associações de nomes/artes restantes, fontes em eventos e relíquias dos adversários/chefes. Não foram adicionados eventos nem exclusivas de Félix sem fechamento específico. A disponibilidade é compartilhada pelos oito protagonistas, mas a validação de run completa deste lote foi com Kylast.

Decisão técnica: habilitação explícita em novas runs do menu preserva os testes e a API legada de aventura sem relíquias. Aplicação de Botas é marcada no ato de jogar, antes de compras de entrada, para sobreviver à cópia de estado feita pela compra. Cura é um efeito interno sem raridade/região e não entra na coleção de cartas.
