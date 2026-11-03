# LoR — diagnóstico da tentativa Frida

31/10/2026. Investigação sem nova conexão ao jogo.

## Evidência de falha encontrada no Windows

O log Application contém evento 1000 em 31/10/2026 09:17:43 (America/Sao_Paulo) e evento WER 1001 às 09:17:48. O primeiro identifica:

- Aplicativo: LoR.exe, versão 2022.3.62.32686.
- PID: 0x56E4, equivalente a 22244, mesmo alvo da tentativa registrada anteriormente.
- Módulo da falha: frida-agent.dll, carregado de diretório temporário Frida x86_64.
- Código de exceção: 0xc0000409.
- Deslocamento no módulo: 0xFA389D.

O WER classifica o evento como BEX64. Esses dados confirmam falha do processo com o agente como módulo apontado pelo Windows. Não permitem concluir sozinhos que houve bloqueio por proteção, estouro de buffer específico, erro do jogo ou incompatibilidade precisa. A interpretação causal continua aberta.

Evidência preservada em `runtime/FRIDA_FALHA_WINDOWS.json`. Nenhum dump de memória foi copiado ou processado.

## Controle em processo descartável

O pacote Frida instalado em `tools/rea-runtime/node_modules/frida` é 17.23.2, mesma versão declarada como dependência pelo REA local. O teste usou esse pacote diretamente e o Node v24.22.1 x64 do ambiente.

`tools/analise/testar_frida_controle.mjs` criou um processo Node próprio, conectou via Frida, carregou um script que informa arquitetura/PID/quantidade de módulos, recebeu a resposta (x64, 41 módulos), descarregou o script e desconectou. O processo filho permaneceu vivo após detach e foi então encerrado pelo próprio teste. Nenhum PID de jogo foi usado no teste.

Resultado preservado em `runtime/FRIDA_CONTROLE.json`. A consulta posterior ao LoR mostrou PID 17940 respondendo.

## Conclusão delimitada

O Frida instalado consegue executar attach, script e detach em pelo menos um alvo local x64. Portanto, ausência de bindings, indisponibilidade geral do dispositivo local ou incapacidade universal de injeção não explicam a falha observada. O teste não cobre todos os executáveis, políticas de processo ou a camada de sessão do REA: foi realizado diretamente com o pacote local.

A diferença relevante está na interação com o alvo LoR ou nas condições daquela execução. A causa raiz ainda não foi isolada. Não há evidência suficiente para escolher atualização/downgrade, alterar configurações do jogo ou repetir injeção. Nenhuma dessas mudanças foi feita.

O caminho produtivo disponível continua sendo análise estática e logs passivos, que já demonstraram parte da apresentação de recompensas. Uma nova tentativa Frida só deve ser considerada após surgir uma hipótese testável e uma mudança justificada; não repetir simplesmente porque o jogo foi reaberto.
