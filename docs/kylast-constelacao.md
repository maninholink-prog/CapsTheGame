# Kylast — constelação corporal aplicada

03/11/2026. Visual aprovado pelo autor: Kylast com espada e Alastor; quinze pontos seguindo abdômen, peito, cabeça e braços. Todos os talentos continuam adquiríveis no nível 30.

Implementação: src/ui/talent-view.ts e estilos escopados em src/ui/hub.css. Seis estrelas centrais, quatro no braço da espada e cinco no braço da foice. Seleção nativa por details/summary, navegável por teclado, com descrição, estado, pré-requisito e botão de aquisição. Estrelas bloqueadas continuam consultáveis. Tela estreita (até 1000px) usa lista legível para evitar alvos sobrepostos. O fluxo corporal é visual; requisitos reais continuam explicitados nas descrições, sem mudança no grafo aprovado.

Preservados: IDs, efeitos, pré-requisitos, pontos nos níveis pares, Arsenal Completo no nível 30, redistribuição por 200 Pedras Filosofais fora da run e formato de salvamento. Nenhuma alteração nos perfis do jogador. Prévia de desenvolvimento em tmp/kylast-qa.html usa perfil apenas em memória, sem localStorage.

Arte local: public/art/kylast-mastery.png. Gerada com a ferramenta integrada image_gen a partir da prévia aprovada exec-7c136f20-12a7-46e7-aea9-c3bc9b1e6328.png. Original preservado; fundo limpo permite desenhar exatamente quinze elementos funcionais e estados reais, sem rótulo fixo de nível.

Prompt usado: Production clean background extraction from this approved mastery screen image. Preserve the underlying illustration EXACTLY: same Kylast face, haircut, scar, two arms, pose, armor, sword, electrically charged scythe, lighting, blue storm background, framing, colors and dimensions. Remove ONLY all gold UI elements: all 15 glowing golden body stars and their gold connecting lines, and all title/typography in the top left. Seamlessly restore the armor and background underneath. Keep blue lightning and all original non-gold atmosphere. Do not change or reinterpret any character artwork. Output artwork only, no text, no gold lines or nodes. This clean background will receive the exact 15 functional talent buttons and paths as a separate coded overlay in the game.

Verificação: teste novo falhou antes da implementação; depois sete testes direcionados passaram. Suíte completa: 344 testes em 62 arquivos passaram. tsc --noEmit e vite build passaram. Revisão independente estática sem bloqueadores. Interferência do estilo global de details foi corrigida com regra escopada.

Distribuição: dist e release/CAPS-0.1.0-win-x64/resources/app/dist atualizados, com index e arte conferidos por SHA-256. ZIP release/CAPS-0.1.0-Windows.zip recriado.

Limitação: revisão visual e teste de clique por navegador não concluídos. A ferramenta de computador encerrou o acesso por não conseguir determinar a URL atual do navegador no Windows com confiança suficiente. Não houve tentativa de contornar o bloqueio. Os testes automatizados cobrem renderização, quantidade de estrelas, ações existentes, estados e regras de compra/reset.
