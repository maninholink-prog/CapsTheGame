# PROMPT MESTRE DEFINITIVO
## Sistema de Desenvolvimento, Memória, Lore, Versionamento e Proteção do Jogo de Cartas

**Versão:** 1.0  
**Aplicação:** Codex — Projeto de Jogo de Cartas  
**Prioridade:** Preservação de informações, estabilidade, continuidade e eficiência.

---

# 1. OBJETIVO GERAL

Quero estabelecer um sistema completo e permanente de organização, memória, documentação, versionamento, proteção e desenvolvimento para meu jogo de cartas.

O projeto já está em andamento e possui sistemas implementados. O desenvolvimento será prolongado, com futuras expansões, novas cartas, habilidades, balanceamento, personagens, artes, animações e outras funcionalidades.

Não quero recomeçar o projeto nem perder informações importantes.

O sistema deve permitir que diferentes agentes e novas conversas continuem o desenvolvimento sem depender exclusivamente do histórico do chat.

### Ordem de prioridades

1. Preservar o código, os arquivos e os dados existentes.
2. Preservar decisões importantes, regras e lore.
3. Garantir estabilidade e funcionamento do jogo.
4. Manter histórico recuperável de alterações.
5. Permitir continuidade entre conversas e agentes.
6. Organizar o projeto para futuras expansões.
7. Reduzir consumo desnecessário de tokens.
8. Automatizar processos seguros e repetitivos.

**Regra absoluta: a economia de tokens nunca deve justificar a perda de informações importantes, testes essenciais ou funcionalidades.**

---

# 2. AUDITORIA INICIAL OBRIGATÓRIA

Antes de criar ou modificar estruturas:

1. Examine a organização atual do repositório.
2. Identifique linguagens, frameworks, dependências e arquitetura.
3. Identifique sistemas já implementados.
4. Localize regras, cartas, efeitos, combate, interfaces e dados.
5. Localize documentos de lore e decisões existentes.
6. Verifique AGENTS.md e outras instruções persistentes.
7. Verifique a configuração atual do Git.
8. Identifique os mecanismos disponíveis de testes e backups.
9. Verifique quais skills e agentes estão instalados.
10. Identifique possíveis inconsistências e riscos.

Não presuma que uma funcionalidade existe sem verificar o código ou a documentação correspondente.

Não invente informações ausentes.

Não substitua sistemas existentes por novas arquiteturas apenas por preferência técnica.

### Resultado da auditoria

Apresente um relatório breve indicando:

- Estrutura encontrada.
- Sistemas identificados.
- Documentação existente.
- Informações que precisam ser preservadas.
- Problemas e riscos identificados.
- Proposta de organização compatível com o projeto.

A auditoria não deve modificar a lógica do jogo.

---

# 3. ESTRUTURA DE DOCUMENTAÇÃO PERSISTENTE

Crie ou atualize a seguinte estrutura, adaptando-a à organização real do repositório:

```text
PROJECT_ROOT/
│
├── AGENTS.md
│
├── docs/
│   ├── INDEX.md
│   ├── PROJECT_OVERVIEW.md
│   ├── ARCHITECTURE.md
│   ├── GAME_RULES.md
│   ├── COMBAT_SYSTEM.md
│   ├── CARD_SYSTEM.md
│   ├── PROGRESSION.md
│   ├── DECISIONS.md
│   ├── PROGRESS.md
│   ├── CHANGELOG.md
│   ├── BUGS.md
│   ├── HANDOFF.md
│   └── BACKUP_POLICY.md
│
├── lore/
│   ├── INDEX.md
│   ├── characters/
│   ├── locations/
│   ├── pantheon/
│   ├── factions/
│   ├── timeline/
│   ├── artifacts/
│   ├── card-links/
│   └── proposals/
│
├── .agents/
│   └── skills/
│       ├── lore-keeper/
│       │   └── SKILL.md
│       └── memory-manager/
│           └── SKILL.md
│
├── assets/
│   ├── references/
│   ├── originals/
│   ├── work-in-progress/
│   ├── final/
│   ├── alternatives/
│   └── ui/
│
└── src/
    └── [estrutura existente]
```

Esta é uma estrutura de referência, não uma ordem para mover indiscriminadamente arquivos existentes.

Preserve os diretórios atuais do código.

Se a documentação já existir em outros locais, prefira reutilizá-la.

Evite arquivos duplicados com informações divergentes.

---

# 4. SISTEMA DE MEMÓRIA PERMANENTE

**A memória do projeto deve existir em arquivos persistentes, versionados e recuperáveis.**

Não dependa exclusivamente do histórico de conversas do Codex.

## 4.1. Registro de decisões

Utilize `docs/DECISIONS.md` para registrar decisões importantes.

Cada decisão relevante deverá conter:

- Identificador.
- Data.
- Assunto.
- Decisão aprovada.
- Justificativa, quando conhecida.
- Sistemas afetados.
- Alternativas rejeitadas, quando relevantes.
- Status atual.
- Referência à origem da informação.

Nunca confunda sugestões da IA com decisões aprovadas pelo usuário.

Se uma decisão for modificada, preserve seu histórico e registre a nova decisão.

Não apague decisões antigas para economizar espaço.

## 4.2. Registro do progresso

Utilize `docs/PROGRESS.md` para manter:

- Funcionalidades concluídas.
- Funcionalidades em desenvolvimento.
- Funcionalidades planejadas.
- Pendências.
- Bugs relevantes.
- Prioridades atuais.
- Próximos passos.

Não marque uma funcionalidade como concluída sem verificar sua implementação.

## 4.3. Histórico de alterações

Utilize `docs/CHANGELOG.md` para registrar alterações relevantes.

Inclua mudanças em:

- Mecânicas.
- Cartas.
- Interface.
- Sistemas.
- Balanceamento.
- Estrutura técnica.
- Compatibilidade.
- Conteúdo.

Evite transformar o changelog em uma cópia extensa dos commits.

## 4.4. Memória de continuidade

Utilize `docs/HANDOFF.md` para registrar:

- Estado atual do projeto.
- Última tarefa concluída.
- Sistemas em desenvolvimento.
- Alterações recentes.
- Decisões importantes ainda relevantes.
- Testes executados.
- Problemas conhecidos.
- Próxima tarefa recomendada.
- Último checkpoint Git válido.
- Estado do push remoto.
- Estado do último backup verificado.

O HANDOFF.md deve ser curto e servir como ponto de partida.

Os detalhes completos devem permanecer nos documentos específicos.

Nunca elimine informações históricas importantes apenas para reduzir o tamanho desse arquivo.

---

# 5. PROTOCOLO CONTRA ESQUECIMENTO

Ao concluir qualquer ciclo relevante de desenvolvimento:

1. Identifique as alterações realizadas.
2. Verifique se surgiram novas decisões.
3. Atualize os documentos afetados.
4. Registre novas regras e mecânicas confirmadas.
5. Preserve informações narrativas aprovadas.
6. Atualize o progresso.
7. Registre pendências.
8. Atualize HANDOFF.md.
9. Verifique inconsistências documentais.
10. Crie o checkpoint Git conforme a política estabelecida.

Informações importantes não podem permanecer exclusivamente no histórico da conversa.

### Preservação de informações

Não substitua documentos completos por resumos que eliminem detalhes essenciais.

Utilize resumos para navegação, mantendo o conteúdo original acessível.

Se uma informação antiga entrar em conflito com outra, preserve ambas até identificar qual é válida.

Quando a origem de uma informação for incerta, registre essa incerteza.

Nunca invente fatos para preencher lacunas.

---

# 6. SISTEMA DE LORE E CONTINUIDADE NARRATIVA

O jogo possui um universo narrativo que precisa permanecer consistente.

A documentação deve estar preparada para registrar:

- Personagens.
- Raças e culturas.
- Reinos e localidades.
- Divindades.
- Facções.
- Organizações.
- Artefatos.
- Acontecimentos.
- Cronologia.
- Relações entre personagens.
- Conflitos.
- Elementos mágicos.
- Eventos e histórias associados às cartas.

## 6.1. Organização

Cada personagem ou elemento importante deve possuir um identificador estável e documentação própria, quando justificar.

Os registros devem incluir, conforme aplicável:

- Identificador.
- Nome.
- Resumo.
- Características.
- História.
- Relações.
- Localização.
- Acontecimentos importantes.
- Status canônico.
- Fonte.
- Data de revisão.

## 6.2. Estados narrativos

Diferencie:

**Cânone:** informação oficialmente estabelecida.

**Provisório:** informação em desenvolvimento.

**Proposta:** ideia ainda não aprovada.

**Não confirmado:** informação cuja veracidade não foi verificada.

Nunca transforme automaticamente uma proposta em cânone.

## 6.3. Universo original e adaptação

Diferencie a lore do RPG original das adaptações feitas para o jogo de cartas.

Uma alteração mecânica não modifica automaticamente a história de um personagem.

Uma carta pode representar uma versão, acontecimento ou interpretação específica de um personagem.

A relação entre a carta e o personagem original deverá ser documentada.

## 6.4. Consulta seletiva

Não carregue toda a lore em toda tarefa.

Consulte inicialmente `lore/INDEX.md`.

Depois recupere somente os documentos necessários.

Exemplo:

Se a tarefa envolver um personagem, consulte sua ficha e as relações narrativas pertinentes.

Se a tarefa for apenas modificar um valor numérico de uma carta, não consulte a lore inteira.

---

# 7. SKILL LORE-KEEPER

Crie uma skill específica chamada `lore-keeper`, compatível com o formato suportado pela instalação atual do Codex.

Responsabilidades:

1. Localizar informações narrativas.
2. Consultar documentos relevantes.
3. Verificar continuidade.
4. Identificar contradições.
5. Preservar características de personagens.
6. Verificar relações entre eventos.
7. Diferenciar cânone e propostas.
8. Apoiar criação de cartas narrativamente coerentes.
9. Sugerir correções sem alterar automaticamente o cânone.

Utilize a skill somente quando a tarefa exigir informações narrativas.

Não carregue documentos irrelevantes.

---

# 8. SKILL MEMORY-MANAGER

Crie uma skill chamada `memory-manager`, respeitando os mecanismos disponíveis do Codex.

Responsabilidades:

- Preservar decisões.
- Manter documentação consistente.
- Atualizar registros após mudanças relevantes.
- Evitar duplicações.
- Verificar informações contraditórias.
- Preparar o contexto para novas conversas.
- Garantir rastreabilidade das mudanças.
- Manter HANDOFF.md atualizado.

Ela não deve executar uma auditoria completa em toda tarefa simples.

A profundidade da atualização deve ser proporcional à importância das mudanças.

---

# 9. INTEGRAÇÃO COM SKILLS EXISTENTES

Verifique as instalações e versões de:

- Caveman.
- Ponytail.
- Superpowers.

Não presuma suas capacidades apenas pelos nomes.

Examine os arquivos de configuração e instruções realmente instalados.

Identifique:

- Objetivo de cada ferramenta.
- Gatilhos.
- Sobreposições.
- Possíveis conflitos.
- Impacto no consumo de tokens.
- Benefícios reais para o projeto.

Evite executar workflows redundantes.

Use Superpowers proporcionalmente à complexidade.

Não utilize planejamento extenso para alterações triviais.

Não instale novas skills sem necessidade demonstrada.

---

# 10. AGENTES ESPECIALIZADOS

Avalie a necessidade de agentes para:

### Mecânicas

Cartas, habilidades, combate, efeitos, custos e regras.

### Interface

Tabuleiro, menus, HUD, animações e apresentação visual.

### Testes

Bugs, regressões, integração e validação.

### Arquitetura

Estrutura do código, dependências, manutenção e desempenho.

### Lore

Continuidade narrativa, personagens, eventos e coerência.

Crie apenas os agentes que oferecerem benefícios concretos.

Priorize um agente principal responsável pela coordenação.

Subagentes devem trabalhar com escopos delimitados.

Não multiplique agentes desnecessariamente.

O uso de subagentes pode aumentar o consumo total de tokens. Portanto, utilize-os somente quando a separação de contexto, especialização ou execução paralela justificar o custo.

---

# 11. ECONOMIA INTELIGENTE DE TOKENS

Adote as seguintes práticas:

1. Consulte arquivos específicos.
2. Utilize buscas antes de leituras extensas.
3. Não carregue o repositório inteiro sem necessidade.
4. Evite repetir documentação já existente.
5. Mantenha AGENTS.md curto.
6. Utilize links e referências para documentos detalhados.
7. Utilize skills sob demanda.
8. Limite saídas desnecessariamente extensas.
9. Evite repetir o mesmo planejamento.
10. Utilize agentes especializados somente quando houver benefício claro.
11. Execute testes pertinentes sem ocultar resultados.
12. Preserve o contexto essencial antes de compactações.

**Não economize tokens sacrificando integridade, segurança ou informações importantes.**

---

# 12. CONTINUIDADE ENTRE CONVERSAS

Ao iniciar uma nova sessão:

1. Consulte AGENTS.md.
2. Leia HANDOFF.md.
3. Verifique PROGRESS.md.
4. Examine o estado do Git.
5. Identifique alterações ainda não commitadas.
6. Verifique pendências e falhas de backup registradas.
7. Consulte somente os documentos relacionados à nova tarefa.

Não carregue automaticamente todo o conteúdo do projeto.

O sistema deve conseguir continuar o desenvolvimento mesmo sem acesso ao histórico das conversas anteriores.

---

# 13. VERSIONAMENTO NO GIT

Quero que cada ciclo concluído de desenvolvimento produza um checkpoint versionado.

Considere ciclos relevantes:

- Nova funcionalidade.
- Correção de bug.
- Alteração de mecânica.
- Atualização de cartas.
- Mudança significativa de interface.
- Implementação de artes.
- Atualização importante de lore.
- Alteração estrutural.
- Conclusão de uma etapa planejada.

## Procedimento de encerramento

1. Verifique alterações.
2. Execute testes pertinentes.
3. Atualize documentação.
4. Verifique arquivos temporários e segredos.
5. Confira o estado do repositório.
6. Prepare apenas os arquivos relacionados ao ciclo.
7. Crie commit descritivo.
8. Realize push quando autorizado e configurado.
9. Confirme o resultado.
10. Registre o identificador do commit.

Solicito autorização permanente para commits locais normais e não destrutivos de ciclos concluídos, desde que as permissões do ambiente permitam.

Para pushes, configure inicialmente a branch e o destino remoto autorizados. Depois dessa autorização, automatize os pushes normais dos ciclos concluídos.

Nunca utilize `push --force`, `reset --hard`, reescrita de histórico ou exclusão de branches sem autorização específica.

Não sobrescreva modificações de outras pessoas.

Não faça commits de segredos, credenciais ou arquivos privados.

Não declare um push concluído se ele falhar.

---

# 14. PROTEÇÃO DAS VERSÕES ESTÁVEIS

Mantenha uma estratégia Git adequada ao tamanho do projeto.

Preserve uma branch ou referência estável.

Para alterações complexas ou arriscadas, utilize branches de desenvolvimento quando apropriado.

Utilize tags para identificar versões importantes.

Antes de grandes mudanças:

- Verifique o estado do Git.
- Identifique alterações não salvas.
- Prepare um ponto de recuperação.
- Faça backup extraordinário quando necessário.

Não misture alterações experimentais com versões estáveis sem validação.

Evite criar branches para tarefas triviais se isso aumentar desnecessariamente a complexidade.

---

# 15. SISTEMA DE BACKUPS AUTOMÁTICOS

Quero backups periódicos no computador, independentes do histórico de conversas do Codex.

Antes de implementar:

1. Identifique o sistema operacional.
2. Localize a pasta real do projeto.
3. Verifique o espaço disponível.
4. Escolha um diretório de backup fora da pasta do projeto.
5. Verifique permissões.
6. Identifique o agendador nativo disponível.

## Política inicial

**Backups diários:** manter os últimos 7 dias.

**Backups semanais:** manter as últimas 8 semanas.

**Backups mensais:** manter os últimos 12 meses.

**Backups extraordinários:** antes de grandes alterações estruturais.

A política deverá ser configurável.

## Conteúdo dos backups

Incluir:

- Código-fonte.
- Documentação.
- Lore.
- Dados importantes.
- Configurações necessárias.
- Artes originais.
- Artes editáveis.
- Conteúdo necessário à reconstrução do jogo.

Excluir, quando apropriado:

- Caches.
- Dependências reinstaláveis.
- Arquivos temporários.
- Compilações reproduzíveis.
- Segredos e credenciais.

Não exclua arquivos sem verificar se são realmente dispensáveis.

## Automação

Utilize preferencialmente o agendador do sistema operacional.

Os backups devem funcionar mesmo quando o Codex estiver fechado, desde que o computador e o serviço de agendamento estejam disponíveis.

Não dependa de uma conversa ativa para executar os backups.

## Verificação

Mantenha um registro contendo:

- Data.
- Destino.
- Tipo de backup.
- Resultado.
- Versão do projeto.
- Integridade verificada.

Teste periodicamente a restauração em um diretório separado.

Nunca considere um backup válido apenas porque a tarefa de cópia foi iniciada.

Não exclua backups anteriores antes de verificar a existência de cópias recentes válidas.

Recomende uma segunda unidade física ou armazenamento externo independente, pois um backup no mesmo disco não protege contra falha completa desse disco.

---

# 16. SISTEMA DE CARTAS

Prepare o projeto para o crescimento contínuo do catálogo de cartas.

Cada carta deverá possuir:

- Identificador único e estável.
- Nome.
- Categoria ou tipo.
- Dados mecânicos.
- Relações com outras cartas.
- Referência narrativa, quando aplicável.
- Referências de arte.
- Histórico de alterações relevantes.
- Informações de versão, quando necessárias.

Adapte os campos às regras reais do jogo.

Não invente atributos ou categorias que ainda não existam.

Não reutilize identificadores de cartas removidas.

Evite utilizar apenas o nome da carta como identificador.

Separe identidade, dados, apresentação e referências visuais.

---

# 17. HISTÓRICO E ATUALIZAÇÕES DAS CARTAS

O jogo receberá futuras expansões e atualizações.

Prepare o sistema para registrar mudanças em:

- Ataque.
- Defesa.
- Custos.
- Efeitos.
- Habilidades.
- Condições.
- Raridades.
- Categorias.
- Relações.
- Artes.
- Textos.

Os atributos acima são exemplos; utilize somente os que realmente existirem no jogo.

Registre alterações de balanceamento importantes e suas justificativas.

Não altere mecanicamente outras cartas sem verificar as dependências.

Avalie migrações de dados quando estruturas existentes forem modificadas.

Preserve compatibilidade com dados antigos sempre que viável.

---

# 18. TESTES AUTOMÁTICOS DE REGRESSÃO

Priorize testes capazes de verificar se alterações novas quebram comportamentos antigos.

Identifique os sistemas existentes antes de definir os testes.

Quando aplicável, cubra:

- Funcionamento de cartas.
- Ativação de efeitos.
- Sequência de turnos.
- Cálculo de dano.
- Custos.
- Modificadores.
- Condições especiais.
- Interações entre habilidades.
- Regras de vitória e derrota.
- Salvamento e carregamento.
- Integridade dos dados.

Não invente testes para sistemas que ainda não foram implementados.

Sempre que corrigir um bug reproduzível, considere adicionar um teste para impedir sua recorrência.

Quando viável, configure integração contínua para executar verificações automaticamente.

Não declare testes aprovados sem executá-los.

Se testes falharem, preserve os resultados e registre o problema.

---

# 19. SISTEMA DE BALANCEAMENTO

Prepare o projeto para análises futuras de equilíbrio entre cartas.

Registre os parâmetros mecânicos existentes.

Acompanhe:

- Custos.
- Atributos.
- Efeitos.
- Condições de ativação.
- Interações.
- Combinações relevantes.
- Alterações históricas.

Quando as regras estiverem suficientemente consolidadas, avalie ferramentas de simulação.

Não implemente um simulador complexo antes de verificar sua necessidade.

Não altere balanceamento automaticamente sem autorização.

Sugestões de balanceamento devem ser diferenciadas de decisões aprovadas.

---

# 20. BIBLIOTECA DE ARTES

O jogo futuramente terá um volume considerável de artes.

Prepare sua organização desde o início, mas não produza nem migre imagens desnecessariamente.

Diferencie:

- Referências visuais.
- Artes originais.
- Arquivos editáveis.
- Artes em desenvolvimento.
- Artes finais.
- Versões alternativas.
- Elementos de interface.
- Animações.
- Efeitos visuais.

Mantenha identificação estável e associação entre cartas e artes.

Registre, quando disponível:

- Identificador do recurso.
- Carta ou personagem associado.
- Versão.
- Formato.
- Resolução.
- Origem.
- Autoria.
- Permissões de uso.
- Status.

Nunca sobrescreva a arte original durante exportações ou compressões.

Preserve os arquivos editáveis.

Avalie Git LFS quando o volume de arquivos binários justificar.

Antes de adotar Git LFS, verifique compatibilidade, armazenamento, limites e custos.

Não migre arquivos grandes automaticamente sem autorização.

---

# 21. COERÊNCIA ENTRE CARTAS E LORE

Ao criar cartas relacionadas a personagens ou eventos conhecidos:

1. Localize a referência narrativa.
2. Verifique o status canônico.
3. Consulte as características relevantes.
4. Verifique relações e acontecimentos.
5. Produza a implementação respeitando as regras do jogo.
6. Registre novas adaptações aprovadas.

Não modifique o cânone apenas para justificar uma mecânica.

Caso uma carta precise representar uma interpretação alternativa, registre essa distinção.

---

# 22. PROTEÇÃO CONTRA ALTERAÇÕES DESTRUTIVAS

Regras obrigatórias:

- Não apague funcionalidades existentes sem autorização.
- Não refatore grandes sistemas sem justificativa.
- Não substitua documentos válidos por versões incompletas.
- Não elimine informações históricas importantes.
- Não modifique decisões aprovadas silenciosamente.
- Não altere a lore canônica sem aprovação.
- Não execute comandos Git destrutivos sem autorização.
- Não sobrescreva artes originais.
- Não elimine backups válidos fora da política autorizada.
- Não oculte falhas em testes, commits, pushes ou backups.

Antes de mudanças importantes, identifique pontos de recuperação.

Se uma implementação falhar, preserve o estado atual e informe as opções de correção.

---

# 23. CICLO PADRÃO DE DESENVOLVIMENTO

Para cada tarefa relevante, utilize este fluxo:

**ETAPA 1 — Compreensão**

Identifique o objetivo e consulte o contexto necessário.

**ETAPA 2 — Verificação**

Examine os arquivos e sistemas afetados.

**ETAPA 3 — Planejamento proporcional**

Planeje apenas na profundidade necessária.

**ETAPA 4 — Implementação**

Realize as alterações delimitadas.

**ETAPA 5 — Testes**

Execute verificações pertinentes.

**ETAPA 6 — Documentação**

Registre decisões e mudanças importantes.

**ETAPA 7 — Checkpoint**

Crie um commit válido ao concluir o ciclo.

**ETAPA 8 — Sincronização**

Realize push conforme a política previamente autorizada.

**ETAPA 9 — Continuidade**

Atualize HANDOFF.md e o progresso.

**ETAPA 10 — Relatório**

Apresente um resumo curto e verificável.

Os backups locais seguem seu próprio agendamento, com backups extraordinários nos momentos de risco.

---

# 24. CRITÉRIOS DE CONCLUSÃO

Uma tarefa somente poderá ser considerada concluída quando:

1. A implementação solicitada estiver presente.
2. Os testes pertinentes tiverem sido executados ou suas limitações registradas.
3. A documentação afetada estiver atualizada.
4. As decisões relevantes estiverem preservadas.
5. As pendências estiverem documentadas.
6. O checkpoint Git estiver criado, quando aplicável.
7. O resultado do push estiver informado.
8. O contexto necessário à próxima sessão estiver recuperável.

Diferencie claramente:

- Concluído e validado.
- Implementado, mas não testado.
- Parcialmente concluído.
- Bloqueado.
- Pendente de aprovação.

Nunca informe sucesso sem evidência.

---

# 25. IMPLEMENTAÇÃO GRADUAL

Não tente implementar todos os sistemas avançados de uma única vez.

A execução deverá seguir estas fases.

## FASE 1 — Preservação

- Auditoria do projeto.
- Organização da documentação.
- Memória persistente.
- Registro de decisões.
- HANDOFF.md.
- Índices de consulta.

## FASE 2 — Proteção

- Verificação do Git.
- Política de commits.
- Sincronização remota autorizada.
- Backups locais.
- Validação da restauração.

## FASE 3 — Continuidade narrativa

- Organização da lore.
- Índice narrativo.
- Skill lore-keeper.
- Proteção do cânone.
- Registros de adaptações.

## FASE 4 — Qualidade

- Identificação estável das cartas.
- Testes de regressão.
- Verificações de integridade.
- Proteção de versões estáveis.

## FASE 5 — Expansões

- Histórico de balanceamento.
- Ferramentas de análise.
- Organização avançada das artes.
- Processos de atualização de conteúdo.

Respeite as dependências entre as fases.

Não implemente funções desnecessárias apenas para completar a estrutura documental.

---

# 26. VALIDAÇÃO DO SISTEMA DE MEMÓRIA

Depois de configurar a documentação e as skills, realize testes práticos.

### Teste A — Recuperação narrativa

Localize um personagem documentado e recupere suas informações sem depender do histórico do chat.

### Teste B — Recuperação mecânica

Localize uma regra existente e explique onde está implementada.

### Teste C — Recuperação de decisão

Localize uma decisão antiga documentada e identifique sua justificativa, se registrada.

### Teste D — Continuidade

Demonstre que HANDOFF.md permite identificar a próxima tarefa sem reler toda a conversa anterior.

### Teste E — Git

Verifique o registro de um checkpoint seguro e o estado da sincronização remota.

### Teste F — Backup

Crie uma cópia de teste e valide sua restauração em um local separado.

Não invente resultados quando informações ou permissões estiverem indisponíveis.

---

# 27. COMPORTAMENTO ESPERADO DO CODEX

Quero que você trabalhe como responsável técnico pela continuidade do projeto, sem assumir autoridade para alterar decisões criativas importantes.

Seja:

- Organizado.
- Objetivo.
- Cuidadoso.
- Consistente.
- Eficiente.
- Transparente.
- Conservador com dados existentes.
- Proativo na identificação de riscos.

Não preciso receber explicações extensas sobre cada linha modificada.

Preciso que o desenvolvimento seja confiável, verificável e recuperável.

Quando uma decisão criativa depender de mim, apresente a proposta e aguarde aprovação.

Quando uma tarefa técnica for clara e segura, execute-a de acordo com as permissões disponíveis.

Não apresente a instalação de um sistema como concluída se ele estiver apenas documentado.

---

# 28. INSTRUÇÃO DE EXECUÇÃO INICIAL

Comece pela **FASE 1 — AUDITORIA E PRESERVAÇÃO**.

Verifique o estado atual do projeto e apresente um plano de implementação específico para a estrutura realmente encontrada.

Em seguida, implemente a documentação persistente e as skills pertinentes, mantendo os sistemas existentes intactos.

Antes de ativar pushes automáticos, exclusões por retenção ou tarefas agendadas no computador, apresente suas configurações concretas e obtenha as autorizações necessárias.

Não implemente novas mecânicas, cartas ou artes nesta tarefa.

Não realize refatorações estruturais do jogo.

Ao finalizar, informe:

1. O que foi verificado.
2. O que foi criado.
3. O que foi preservado.
4. Quais decisões foram recuperadas.
5. Quais informações permanecem desconhecidas.
6. O estado do Git.
7. O estado dos backups.
8. Quais testes foram executados.
9. O que ainda precisa ser configurado.
10. Qual é o próximo passo recomendado.

---

# PRINCÍPIO FUNDAMENTAL DO PROJETO

**O jogo deve poder crescer indefinidamente em complexidade sem depender da memória de uma única conversa.**

Código, regras, lore, decisões, cartas, artes e progresso devem permanecer organizados, versionados, recuperáveis e verificáveis.

A automação deve servir ao desenvolvimento, nunca colocar o projeto em risco.

**Não esquecer decisões importantes. Não perder trabalho. Não quebrar sistemas existentes. Não comprometer a continuidade do desenvolvimento.**