# Executável Windows portátil

Pedido: abrir o jogo no computador por um executável. Escolha técnica: Electron portátil x64 com build Vite existente, sem instalar dependências globais ou alterar o fluxo de desenvolvimento. Janela própria, recursos offline e perfil persistente em AppData/CAPS-Game. O perfil do navegador permanece separado e pode ser transferido por exportar/restaurar backup.

Alternativas: launcher de navegador exigiria servidor e runtime externos; instalador acrescentaria uma instalação desnecessária para este protótipo. Pasta portátil contém runtime e recursos e precisa ser mantida inteira.

- [x] Baixar runtime oficial e conferir SHA-256.
- [x] Gerar build de produção e copiar para resources/app/dist.
- [x] Empacotar entrada desktop isolada e bloquear navegação externa.
- [x] Executar teste de inicialização do pacote, conferir janela e documentar abertura/backup.

Sem assinatura digital ou atualização automática nesta versão. Não mover a pasta do projeto, não modificar saves do navegador.
