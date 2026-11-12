# Processo de expansão de personagens, maestrias e cartas

Referência de continuidade registrada em 12/11/2026, a pedido do autor, após os ciclos de Thalion e Lázaro. Aplicar a futuras expansões de protagonistas e cartas, um personagem por vez. Este fluxo organiza aprovações; não aprova conteúdo novo, não cria cânone e não substitui as fontes do projeto.

## 1. Fontes e características

1. Confirmar raiz do repositório, `git status` e instruções locais; ler HANDOFF e PROGRESS e preservar mudanças locais.
2. Consultar somente as fontes pertinentes: índice de lore, registros narrativos autorizados, decisões, especificações de design, cartas e código atual. Respeitar pausas de leitura de episódios e demais limites vigentes.
3. Apresentar a síntese do personagem com rótulos claros: cânone/RPG original, adaptação aprovada do C.A.P.S., proposta ainda não aprovada e informação ausente ou incerta. Referência visual aprovada informa apenas os traços autorizados e não vira lore.
4. Não preencher lacunas com lore, personalidade, regras ou números inventados. Apontar conflitos de fontes e correções autorais, preservando os registros históricos.
5. Pedir aprovação explícita das características antes de propor a árvore. A aprovação das características não aprova talentos ou balanceamento.

## 2. Proposta e aprovação da maestria

1. Consultar a progressão comum e os sistemas em vigor. Para árvores de protagonistas, propor os 15 nós de um ponto dentro da estrutura aprovada, sem alterar regras comuns, IDs ou conteúdo existente.
2. Para cada nó registrar nome, caminho, nível mínimo, pré-requisito/conexão direta e efeito/frequência. Distinguir efeitos existentes de novas adaptações propostas; indicar limites, interações e valores ainda sujeitos a balanceamento.
3. Aguardar aprovação explícita da árvore inteira antes de produzir sua imagem de disposição ou implementar qualquer efeito.
4. Depois de aprovada, criar uma imagem de referência que mostre os nós e as ligações. A especificação textual aprovada continua sendo a fonte de dados; a imagem guia somente o layout.

## 3. Direção visual e aprovação das artes

- Para todas as cartas atuais e futuras — não apenas protagonistas — preferir cenas cotidianas ou épicas conforme a carta, o sujeito e seu contexto. Usar fantasia pintada/ilustrada de *Legends of Runeterra* como referência de direção, sem copiar ilustrações ou personagens.
- Para um protagonista, planejar artes distintas para carta base, forma evoluída e fundo da maestria quando esse conjunto fizer parte do escopo. A cena deve transmitir a personalidade já sustentada pelas fontes, sem criar novos fatos narrativos.
- Cada fundo de maestria deve ter composição própria para o personagem: variar enquadramento, cenário, gesto e organização visual; não repetir a composição de outro protagonista.
- Tratar cada arte gerada como candidata. Mostrar as imagens para aprovação e registrar rejeições e ajustes sem integrar as versões rejeitadas. Só copiar arte aprovada para os recursos do jogo e referenciá-la na UI.

## 4. Integração

Após as aprovações necessárias, seguir os padrões existentes e fazer a menor mudança completa:

- registrar os talentos no catálogo e ligar seus efeitos ao ponto correto do fluxo de batalha;
- integrar a interface de talentos e as artes aprovadas;
- validar serialização e leitura de saves antigos; manter estado novo opcional ou migrar explicitamente, sem perda de dados;
- preservar IDs de cartas, regras base, compatibilidade e comportamento de outros protagonistas;
- adicionar testes focados dos gatilhos, limites de uso, combate, evolução, cura/descontos e round-trip de save que se apliquem à árvore.

Não implementar propostas ainda não aprovadas, nem alterar outros personagens ou cartas fora do escopo autorizado.

## 5. Verificação e pacote Windows

1. Rodar typecheck, testes focados, suíte completa e build apropriado à mudança. Inspecionar `git diff --check` e registrar falhas e avisos reais.
2. Atualizar o pacote Windows quando isso estiver incluído no pedido ativo. Confirmar qual diretório foi produzido, a presença do executável e dos assets aprovados; comparar hashes dos arquivos de arte empacotados com os arquivos-fonte quando aplicável.
3. Distinguir verificação de conteúdo do pacote de execução manual: só afirmar que o executável abriu ou que uma partida funcionou se isso foi testado.
4. Ao encerrar, atualizar DECISIONS apenas para decisões autorais, PROGRESS com evidências e limitações, e HANDOFF com o estado e próximo passo. Preservar os registros anteriores.

## 6. Limites de autorização

A aprovação de conteúdo ou de arte permite apenas as etapas indicadas nesta referência e no pedido ativo. Não equivale a autorização para commit, push, publicação ou backup. Essas ações exigem autorização explícita no chat; nunca inferir que a política escrita ou a geração de um pacote autoriza publicá-lo.

## Ciclos de referência

- [Thalion — especificação aprovada e processo registrado](THALION_MAESTRIA_PROPOSTA.md).
- [Lázaro — especificação aprovada e processo registrado](LAZARO_MAESTRIA_PROPOSTA.md).
- Decisões visuais globais para cartas: [DEC-028](../docs/DECISIONS.md#dec-028--direção-artística-de-todas-as-cartas--12112026).
