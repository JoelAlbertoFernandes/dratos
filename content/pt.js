window.DRATOS_CONTENT = window.DRATOS_CONTENT || {};

window.DRATOS_CONTENT.pt = {
  meta: {
    lang: "pt-BR",
    label: "PT",
    title: "DRATOS | Governança Contratual Inteligente",
    description: "Conecte dados, pessoas, documentos, aprovações, assinaturas, obrigações, performance e evidências em uma jornada contratual governada.",
    canonical: "https://fernandesjoel.github.io/Dratos/",
    socialImage: "assets/images/hero-helena-dratos.webp",
    organization: {
      name: "DRATOS — Contratos Inteligentes",
      description: "Plataforma de governança do ciclo de vida contratual.",
      email: "contato@dratos.com.br"
    }
  },
  assets: {
    logo: "assets/brand/dratos-logo.png",
    element: "assets/brand/dratos-elemento.png",
    videoPoster: "assets/images/video-poster.svg",
    hero: "assets/images/hero-helena-dratos.webp"
  },
  settings: {
    formEndpoint: "",
    mailtoFallback: "contato@dratos.com.br",
    privacyUrl: "#privacidade",
    social: []
  },
  accessibility: {
    skip: "Pular para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    changeLanguage: "Alterar idioma",
    toggleTheme: "Alternar tema",
    closeModal: "Fechar janela",
    previous: "Anterior",
    next: "Próximo",
    primaryNavigation: "Navegação principal"
  },
  visual: {
    brand: "DRATOS",
    productLabel: "DRATOS / EXECUTIVO",
    live: "AO VIVO",
    presenterInitial: "H",
    accessCore: "RBAC",
    totvsSource: "TOTVS RM"
  },
  nav: [
    ["Visão geral", "visao-geral"],
    ["Plataforma", "plataforma"],
    ["Performance", "performance"],
    ["Integrações", "integracoes"],
    ["Segurança", "seguranca"],
    ["Demonstrações", "videos"],
    ["Planos", "planos"]
  ],
  actions: {
    demo: "Agendar demonstração",
    platform: "Conhecer a plataforma",
    fullPresentation: "Assistir à apresentação completa",
    watch: "Assistir ao vídeo",
    diagnose: "Solicitar diagnóstico",
    program: "Participar do programa",
    details: "Ver detalhes",
    technical: "Explorar arquitetura",
    send: "Gerar solicitação",
    back: "Voltar",
    close: "Fechar",
    play: "Reproduzir"
  },
  header: {
    descriptor: "Governança Contratual Inteligente"
  },
  hero: {
    eyebrow: "Contratos Inteligentes · Governança Contratual",
    title: "Do dado disperso à decisão governada.",
    text: "A DRATOS conecta requisições, contratos, aprovações, assinaturas, obrigações, performance e evidências em uma única jornada contratual.",
    note: "A DRATOS não substitui o ERP. Ela conecta e governa a jornada a partir dos dados que sua organização já possui.",
    stageLabel: "Jornada contratual em tempo real",
    stages: ["Dados", "Requisição", "Autoria", "Aprovação", "Assinatura", "Gestão", "Performance"],
    metrics: [
      { label: "SLA demonstrativo", value: "94%", trend: "+6,2%" },
      { label: "Entregas realizadas", value: "98%", trend: "+4,8%" },
      { label: "Avaliação geral", value: "4,8", trend: "★★★★★" }
    ],
    status: ["Fluxo rastreável", "Evidências conectadas", "Acesso por contexto"],
    trust: ["Empresas privadas", "Governo e estatais", "Organizações reguladas", "Operações multiempresa"]
  },
  completeVideo: {
    title: "Apresentação completa da DRATOS",
    duration: "02:42",
    video: "assets/video/dratos-apresentacao-completa.mp4",
    poster: "assets/video/posters/dratos-apresentacao-completa.webp"
  },
  problem: {
    eyebrow: "O caos invisível",
    title: "Os dados estão nos sistemas. O contrato ainda está espalhado.",
    text: "E-mails, planilhas, versões paralelas e aprovações fora do fluxo reduzem visibilidade e tornam a auditoria mais difícil.",
    diagramTitle: "Quatro rupturas críticas",
    diagramNote: "Quando informação, decisão, prazo e indicador se separam, o risco percorre toda a jornada contratual.",
    items: [
      { number: "01", title: "Versões paralelas", text: "A minuta correta se perde entre anexos e cópias locais." },
      { number: "02", title: "Decisões sem contexto", text: "Aprovações e ressalvas ficam separadas do documento." },
      { number: "03", title: "Prazos esquecidos", text: "Obrigações começam depois da assinatura, mas o acompanhamento não." },
      { number: "04", title: "Indicadores tardios", text: "O desempenho do contrato chega quando já é difícil agir." }
    ]
  },
  promise: {
    eyebrow: "A resposta DRATOS",
    title: "Um contrato vivo, da requisição à performance.",
    text: "A plataforma transforma arquivos isolados em uma operação conectada, parametrizável e verificável.",
    before: { label: "Antes", title: "Arquivo estático", items: ["Dados duplicados", "Histórico fragmentado", "Gestão reativa"] },
    after: { label: "Com DRATOS", title: "Jornada governada", items: ["Contexto único", "Regras configuráveis", "Evidências e indicadores"] }
  },
  journey: {
    eyebrow: "Demonstração guiada",
    title: "Uma história completa em 16 cenas.",
    text: "Helena, apresentadora oficial da DRATOS, conduz a narrativa com identidade, ambiente e linguagem cinematográfica consistentes.",
    presenter: "Helena · Apresentadora oficial",
    presenterNote: "Mesmo rosto, cabelo castanho-escuro, figurino executivo, ambiente premium e tom consultivo em todas as cenas.",
    scenes: [
      { id: "abertura", number: "01", title: "Abertura", duration: "00:08", line: "Imagine transformar dados, contratos, aprovações e evidências em uma única jornada inteligente e totalmente rastreável.", screen: "ERP → Contrato → Aprovação → Assinatura → Governança", movement: "Dolly lento da esquerda para a direita.", video: "assets/video/01-abertura.mp4", status: "Em produção" },
      { id: "caos", number: "02", title: "O caos invisível", duration: "00:08", line: "Em muitas empresas, os dados estão nos sistemas, mas os contratos continuam espalhados entre e-mails, planilhas e documentos.", screen: "Dados organizados. Contratos dispersos.", movement: "Aproximação cinematográfica e linhas quebradas.", video: "assets/video/02-caos-invisivel.mp4", status: "Em produção" },
      { id: "custo", number: "03", title: "O custo oculto", duration: "00:08", line: "Versões paralelas, aprovações perdidas, prazos esquecidos e riscos difíceis de rastrear.", screen: "Retrabalho · Perda de visibilidade · Risco operacional", movement: "Órbita suave com alertas de atenção.", video: "assets/video/03-custo-oculto.mp4", status: "Em produção" },
      { id: "nasce", number: "04", title: "Nasce a DRATOS", duration: "00:08", line: "Foi para transformar essa complexidade em uma jornada estruturada que nasceu a DRATOS.", screen: "Governança Contratual Inteligente", movement: "Travelling em direção ao hub conectado.", video: "assets/video/04-nasce-dratos.mp4", status: "Em produção" },
      { id: "hub", number: "05", title: "O hub central", duration: "00:08", line: "A DRATOS conecta os dados que sua empresa já possui e transforma essas informações em uma jornada contratual integrada.", screen: "Conecte · Governe · Evolua", movement: "Abertura ampla do ecossistema.", video: "assets/video/05-hub-central.mp4", status: "Em produção" },
      { id: "requisicao", number: "06", title: "Requisição contratual", duration: "00:08", line: "Tudo começa com uma requisição estruturada, reunindo informações, documentos e responsáveis.", screen: "Dados completos · Processo organizado · Menos retrabalho", movement: "Campos recebem validações progressivas.", video: "assets/video/06-requisicao.mp4", status: "Em produção" },
      { id: "autoria", number: "07", title: "Autoria contratual", duration: "00:08", line: "Com os dados aprovados, a DRATOS gera uma minuta baseada em matrizes, cláusulas padronizadas e regras jurídicas.", screen: "Padronização · Velocidade · Governança", movement: "A requisição se transforma em contrato.", video: "assets/video/07-autoria.mp4", status: "Em produção" },
      { id: "biblioteca", number: "08", title: "Biblioteca e playbooks", duration: "00:08", line: "O jurídico mantém o controle através de cláusulas aprovadas, playbooks e versões governadas.", screen: "Biblioteca Jurídica", movement: "Cláusulas são incorporadas à minuta.", video: "assets/video/08-biblioteca.mp4", status: "Em produção" },
      { id: "sala", number: "09", title: "Sala Jurídica", duration: "00:08", line: "Todas as interações permanecem centralizadas em um ambiente colaborativo e rastreável.", screen: "Negociação · Colaboração · Rastreabilidade", movement: "Travelling entre comentários e versões.", video: "assets/video/09-sala-juridica.mp4", status: "Em produção" },
      { id: "diligence", number: "10", title: "Due Diligence", duration: "00:08", line: "Informações relevantes da contraparte e evidências apoiam decisões mais seguras e documentadas.", screen: "Evidências · Contexto · Governança", movement: "Aproximação do painel de validação.", video: "assets/video/10-due-diligence.mp4", status: "Em produção" },
      { id: "assinatura", number: "11", title: "Aprovações e assinatura", duration: "00:08", line: "A versão correta segue para assinatura após as aprovações, com total rastreabilidade.", screen: "APROVADO → CONCLUÍDO", movement: "Aproximação sem cortes bruscos.", video: "assets/video/11-aprovacoes-assinatura.mp4", status: "Em produção" },
      { id: "contrato-vivo", number: "12", title: "Obrigações e monitoramento", duration: "00:08", line: "A assinatura é o início da gestão contínua de obrigações, prazos e compromissos.", screen: "Contrato Vivo", movement: "Calendário, alertas e obrigações orbitam o contrato.", video: "assets/video/12-contrato-vivo.mp4", status: "Em produção" },
      { id: "performance", number: "13", title: "Performance contratual", duration: "00:08", line: "Cada contrato possui seu próprio modelo de avaliação, acompanhando entregas, níveis de serviço e resultados.", screen: "4,8 estrelas · 94% SLA · 98% entregas", movement: "Foco cinematográfico nos indicadores.", video: "assets/video/13-performance.mp4", status: "Em produção" },
      { id: "dossie", number: "14", title: "Dossiê auditável", duration: "00:08", line: "Cada decisão, documento, aprovação e evidência permanece registrada em um único histórico auditável.", screen: "Histórico · Evidências · Rastreabilidade", movement: "Convergência dos elementos para o dossiê.", video: "assets/video/14-dossie.mp4", status: "Em produção" },
      { id: "dashboard", number: "15", title: "Dashboard executivo", duration: "00:08", line: "Informações conectadas oferecem uma visão executiva da operação contratual em tempo real.", screen: "Governança · Transparência · Eficiência · Performance", movement: "Movimento lateral pelos indicadores.", video: "assets/video/15-dashboard.mp4", status: "Em produção" },
      { id: "encerramento", number: "16", title: "Encerramento", duration: "00:08", line: "A DRATOS transforma contratos em governança, performance, transparência e decisões mais seguras.", screen: "Da requisição ao desempenho contratual", movement: "Travelling lento com o ecossistema conectado.", video: "assets/video/16-encerramento.mp4", status: "Em produção" }
    ]
  },
  sources: {
    eyebrow: "Fontes de dados e conectores",
    title: "Comece com os dados que sua organização já possui.",
    text: "Integrações progressivas reduzem redigitação e dependência de planilhas paralelas sem substituir os sistemas corporativos.",
    flow: ["Fontes de dados", "Normalização", "Requisição", "Jornada contratual"],
    items: ["ERP", "TOTVS RM", "Sistema de compras", "Planilhas", "CSV", "APIs", "Formulários", "Cadastro manual", "Bases externas"],
    users: ["TI", "Compras", "Jurídico", "Financeiro", "Controladoria"]
  },
  platform: {
    eyebrow: "Plataforma completa",
    title: "Cada etapa preserva o contexto da anterior.",
    text: "Explore os módulos da jornada. Recursos dependentes de fornecedores ou integrações são apresentados com seu status configurável.",
    modules: [
      { id: "solicitacoes", number: "01", title: "Solicitações de contrato", tagline: "O contrato começa com uma demanda completa, e não com um arquivo vazio.", summary: "Filtros, busca, paginação e status organizam solicitações originadas em Compras ou na Plataforma.", features: ["Fornecedor, centro de custo e período", "Dados bancários e financeiros", "Representantes e testemunhas", "Anexos PDF/DOCX", "Homologação e rejeição com motivo", "Arquivamento com motivo", "Itens dinâmicos e autocomplete", "CNPJ, vigência, objeto e pagamento"], status: "Disponível conforme configuração" },
      { id: "kanban", number: "02", title: "Kanban de contratos", tagline: "A jornada inteira visível em um único quadro.", summary: "Cards conectam Autoria, Sala Jurídica, Assinatura e Concluído.", features: ["Fornecedor, número, valor e data", "Colunas retráteis", "Acesso direto à etapa", "Atualização em tempo real conforme integração"], status: "Configurável" },
      { id: "autoria", number: "03", title: "Autoria contratual", tagline: "Transforme uma requisição aprovada em uma minuta governada, sem começar do zero.", summary: "Requisição → Matriz → Parametrização → Minuta.", features: ["Minuta interna ou do fornecedor", "Editor e versionamento", "Campos parametrizados", "Anexos e PDF final", "Bypass jurídico configurável", "Rejeição com motivo", "Documento original preservado"], status: "Configurável" },
      { id: "biblioteca", number: "04", title: "Matrizes, cláusulas e playbooks", tagline: "O Jurídico mantém o padrão sem travar a operação.", summary: "Bibliotecas reutilizáveis com textos aprovados e parâmetros controlados.", features: ["Drag-and-drop", "Rascunho, revisão e aprovado", "Versões descontinuadas", "Histórico e trilha de auditoria", "Playbooks LGPD e SLA", "Confidencialidade e anticorrupção", "Due Diligence e fornecedor crítico"], status: "Configurável" },
      { id: "sala-juridica", number: "05", title: "Sala Jurídica", tagline: "Negociação, revisão e decisão em um ambiente colaborativo e auditável.", summary: "Documento, mensagens e decisões permanecem no mesmo contexto.", features: ["Visualizador e mensagens", "Comentários por cláusula", "Histórico e versões", "Aprovação ou retorno à autoria", "Observações e pendências", "Rastreabilidade"], status: "Disponível conforme configuração" },
      { id: "due-diligence", number: "06", title: "Due Diligence", tagline: "Informações estruturadas para apoiar decisões mais seguras e documentadas.", summary: "Análises Tipo 1, Tipo 2 e monitoramento reúnem contexto sem substituir a decisão humana.", features: ["Dados cadastrais e estrutura societária", "Certidões e informações públicas", "Evidências e relatórios", "Pendências e mitigação", "Histórico e monitoramento"], status: "Disponível conforme integração" },
      { id: "ressalvas", number: "07", title: "Ressalvas contratuais", tagline: "Pontos de atenção formais, vinculados ao contrato.", summary: "Registro controlado de ressalvas ativas e históricas.", features: ["Título e descrição", "Classificação e prioridade", "Anexo", "Ativa ou inativa", "Histórico", "Exclusão lógica"], status: "Configurável" },
      { id: "assinatura", number: "08", title: "Aprovações e assinatura", tagline: "A versão correta chega às pessoas certas, na ordem definida.", summary: "Workflow conecta aprovadores, signatários e documento final.", features: ["Jurídico, Financeiro e Gestor", "Ordem de aprovação", "Representantes e testemunhas", "Suspensão e retorno à Sala Jurídica", "Reenvio e sincronização", "Webhooks e contingência por consulta", "Documento assinado", "Assinatura avulsa de PDF"], status: "Disponível conforme integração" },
      { id: "concluido", number: "09", title: "Contrato concluído", tagline: "O documento final é apenas uma parte do histórico completo.", summary: "Um stepper preserva solicitações, signatários, parcelas, visualizações e o histórico final.", features: ["Solicitações vinculadas", "Signatários", "Parcelas financeiras", "Documento assinado", "Auditoria de visualização", "Histórico final"], status: "Disponível conforme configuração" },
      { id: "obrigacoes", number: "10", title: "Obrigações e monitoramento", tagline: "A assinatura não encerra a jornada. Ela inicia a execução governada.", summary: "Prazos, responsáveis e evidências transformam o contrato em rotina acompanhável.", features: ["Calendário e alertas", "Reajustes e vencimentos", "Entregas e SLA", "Renovações e compromissos", "Evidências", "Monitoramento da contraparte"], status: "Em evolução" },
      { id: "performance-modulo", number: "11", title: "Performance contratual", tagline: "Cada contrato pode ser avaliado pelo que realmente importa.", summary: "Critérios, pesos, escalas e ciclos configuráveis por contrato.", features: ["Modelos próprios ou existentes", "Justificativas e evidências", "Comparação entre ciclos", "Consolidação por fornecedor", "Estrelas, nota, percentual e SLA", "Checklist e critérios ponderados"], status: "Em evolução" },
      { id: "dossie", number: "12", title: "Dossiê auditável", tagline: "Da requisição à performance, cada decisão permanece em um histórico verificável.", summary: "Solicitações, versões, aprovações, documentos, evidências e logs convergem em uma linha do tempo.", features: ["Matriz e cláusulas", "Sala Jurídica e Due Diligence", "Ressalvas e aprovações", "Assinatura e obrigações", "Performance e evidências", "Trilha append-only"], status: "Configurável" },
      { id: "juridico", number: "13", title: "Central e Consulta Jurídica", tagline: "O Jurídico centraliza contratos e demandas consultivas sem perder contexto.", summary: "Consultas e contratos compartilham urgência, histórico e acesso por perfil.", features: ["Assunto, descrição e urgência", "Anexo e chat", "Histórico e finalização", "Demandas consolidadas", "Volume e acesso rápido"], status: "Disponível conforme configuração" },
      { id: "notificacoes", number: "14", title: "Notificações", tagline: "Cada pessoa recebe o que é relevante para seu contexto.", summary: "E-mail e notificações in-app mantêm pessoas informadas sem perder o vínculo com o evento.", features: ["SMTP e templates", "Perfis e contexto", "Logs e teste", "Sino e badge", "Lida ou não lida", "Link direto e eventos automáticos"], status: "Configurável" },
      { id: "configuracoes", number: "15", title: "Central de configurações", tagline: "Regras operacionais administradas em um único lugar.", summary: "Matrizes, usuários, notificações, tarefas e integrações podem ser governadas por perfis autorizados.", features: ["Matrizes de contrato", "Usuários e perfis", "SMTP e notificações", "Tarefas agendadas", "Integração TOTVS RM", "Dados de teste em ambientes controlados"], status: "Disponível conforme perfil" }
    ]
  },
  performance: {
    eyebrow: "Performance contratual",
    title: "Cada contrato pode ser avaliado pelo que realmente importa.",
    text: "Selecione um modelo, defina critérios, pesos, escala, periodicidade e responsáveis. Exija justificativas, anexe evidências e acompanhe a evolução por ciclo e fornecedor.",
    disclaimer: "Valores meramente demonstrativos.",
    flow: ["Obrigações", "Evidências", "Performance", "Decisão"],
    publicValue: "Fiscalização objetiva, transparência, acompanhamento de fornecedores e prestação de contas para operações públicas e reguladas.",
    videoScene: 12,
    score: { label: "Avaliação geral", value: "4,8", scale: "de 5", stars: "★★★★★" },
    indicators: [
      { label: "SLA cumprido", value: "94%", progress: 94 },
      { label: "Entregas realizadas", value: "98%", progress: 98 },
      { label: "Ocorrências", value: "2", progress: 18 }
    ],
    models: ["1 a 5 estrelas", "Nota de 0 a 10", "Percentual", "SLA cumprido, parcial ou não cumprido", "Excelente a crítico", "Checklist", "Critérios ponderados", "Avaliação qualitativa", "Indicadores próprios"],
    examples: [
      { title: "Segurança", items: ["Cobertura de postos", "Tempo de resposta", "Ocorrências", "Qualidade da equipe", "SLA"] },
      { title: "Limpeza", items: ["Qualidade", "Frequência", "Reclamações", "Conformidade", "Auditorias"] },
      { title: "Tecnologia", items: ["Disponibilidade", "Incidentes", "Tempo de resolução", "Experiência", "SLA"] },
      { title: "Governo e regulados", items: ["Metas", "Entregas", "Indicadores", "Fiscalização", "Evidências"] }
    ]
  },
  dossierSpotlight: {
    eyebrow: "Dossiê Auditável",
    title: "A performance também vira evidência.",
    text: "Solicitação, matriz, versões, decisões, Due Diligence, ressalvas, assinatura, obrigações e ciclos de avaliação convergem em um histórico verificável.",
    items: ["Decisões e aprovações", "Documentos e versões", "Obrigações e prazos", "Performance e evidências", "Logs append-only"],
    proof: "Da requisição à execução: contexto preservado para auditoria, fiscalização e prestação de contas.",
    videoScene: 13
  },
  dashboard: {
    eyebrow: "Visão executiva",
    title: "Da operação ao indicador, sem perder o detalhe.",
    text: "Seis perspectivas conectam contratos, fornecedores, custos, vencimentos e dados para apoiar decisões.",
    views: ["Menu Executivo", "Fornecedores", "Centro de Custo", "Categoria e Natureza", "Vencimentos", "Base de Dados"],
    filters: ["Coligada", "Filial", "Múltiplas filiais", "Centro de custo", "Período", "Drilldown", "Exportação"],
    kpis: [
      { label: "Contratos ativos", value: "1.248", delta: "+8,4%" },
      { label: "Valor total", value: "R$ 84,2 mi", delta: "+3,1%" },
      { label: "Em negociação", value: "86", delta: "12 críticos" },
      { label: "Performance média", value: "4,6", delta: "de 5" },
      { label: "Obrigações abertas", value: "142", delta: "18 próximas" },
      { label: "SLA crítico", value: "7", delta: "requer atenção" }
    ],
    disclaimer: "Dados fictícios para demonstração visual.",
    videoScene: 14
  },
  integrations: {
    eyebrow: "Ecossistema conectado",
    title: "Integre progressivamente, sem limitar a plataforma a um fornecedor.",
    text: "TOTVS RM é uma integração inicial prioritária e uma prova concreta da capacidade de conexão — não uma limitação da DRATOS.",
    items: [
      { name: "TOTVS RM", type: "ERP prioritário", status: "Disponível conforme projeto" },
      { name: "TOTVS Assinatura Eletrônica", type: "Assinador inicial", status: "Disponível conforme integração" },
      { name: "Sistema de Compras", type: "Origem de demandas", status: "Configurável" },
      { name: "APIs REST", type: "Integração", status: "Configurável" },
      { name: "Webhooks", type: "Eventos", status: "Configurável" },
      { name: "SMTP", type: "Comunicação", status: "Configurável" },
      { name: "Planilhas e CSV", type: "Importação", status: "Configurável" },
      { name: "Outros ERPs e assinadores", type: "Ecossistema", status: "Planejado conforme projeto" }
    ],
    totvs: {
      title: "Integração inicial com TOTVS RM",
      text: "Consultas e sincronizações podem conectar fornecedores, produtos e serviços, coligadas, filiais, centros de custo, usuários, contratos e status.",
      features: ["Transporte de contratos", "Sincronização de status", "Webhooks quando disponíveis", "Consulta como contingência", "Rastreabilidade da integração"]
    }
  },
  videoLibrary: {
    eyebrow: "Demonstrações por funcionalidade",
    title: "Veja as funcionalidades essenciais em ação.",
    text: "Demonstrações objetivas mostram como cada etapa preserva contexto, decisão e evidência — sem painéis editoriais ou textos sobre o vídeo.",
    sceneIndexes: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14]
  },
  access: {
    eyebrow: "Perfis e controle de acesso",
    title: "A pessoa certa, no contexto certo, com a permissão certa.",
    text: "RBAC e segregação contextual controlam acesso no frontend e backend, sem expor detalhes sensíveis da implementação.",
    profiles: ["ADMIN", "ESPECIALISTA", "JURÍDICO", "GESTOR", "ASSINANTE", "INDICADORES", "AUDITORIA", "COMPRAS"],
    contexts: ["Coligada", "Filial", "Centro de custo", "Múltiplos centros", "Acesso interno e externo"]
  },
  security: {
    eyebrow: "Segurança e arquitetura",
    title: "Controles enterprise em toda a jornada.",
    text: "A arquitetura combina autenticação, segregação, auditoria e resiliência. O desenho final depende do ambiente e das integrações de cada organização.",
    items: ["JWT", "RBAC", "Segregação por contexto", "Trilha append-only", "Logs e auditoria", "Idempotência e hash", "Webhooks e retries", "Polling de contingência", "Timeouts e cache", "Rotas protegidas", "Armazenamento documental", "Multiempresa e multifilial"],
    stackTitle: "Stack técnica",
    stackText: "Área técnica secundária",
    stack: ["React", "Tailwind CSS", "React Router", "TinyMCE", "Node.js", "Express", "SQL Server", "Sequelize", "JWT", "SMTP", "Integrações REST"],
    stackNote: "Stack da plataforma DRATOS. Esta landing page usa HTML, CSS e JavaScript puros para publicação estática."
  },
  publicSector: {
    eyebrow: "Setor público e organizações reguladas",
    title: "Governança, transparência e performance para operações que exigem prestação de contas.",
    text: "Estruture contratos de serviços contínuos, metas, fiscalização, SLA, evidências e desempenho com múltiplas unidades e centros de custo.",
    items: ["Fornecedores e serviços contínuos", "Metas e entregas", "Fiscalização e SLA", "Evidências e auditoria", "Múltiplas unidades", "Histórico e prestação de contas"]
  },
  plans: {
    eyebrow: "Planos",
    title: "Uma configuração para cada estágio de maturidade.",
    text: "Volumes, módulos, integrações e serviços são definidos após o diagnóstico.",
    items: [
      { name: "Sandbox", price: "Teste orientado", description: "Conheça a jornada com um cenário demonstrativo.", features: ["Ambiente guiado", "Dados demonstrativos", "Sessão de diagnóstico"] },
      { name: "Essential", price: "A partir de", description: "Organize solicitações, autoria e documentos.", features: ["Requisições", "Matrizes básicas", "Planilhas e CSV"] },
      { name: "Professional", price: "Sob consulta", description: "Amplie a governança jurídica e pós-assinatura.", features: ["Sala Jurídica", "Playbooks", "Obrigações", "Due Diligence"] },
      { name: "Business Integrado", price: "Sob consulta", description: "Conecte a jornada aos sistemas corporativos.", features: ["Conector assistido", "APIs e monitoramento", "Dossiê avançado"], featured: true },
      { name: "Enterprise", price: "Projeto personalizado", description: "Arquitetura para operações complexas.", features: ["Multiempresa", "Perfis avançados", "Integrações e SLA"] }
    ]
  },
  founding: {
    eyebrow: "Programa de lançamento",
    title: "DRATOS Founding Clients",
    text: "Construa um caso aplicado com diagnóstico, implantação orientada e acompanhamento dos primeiros resultados.",
    items: ["Diagnóstico do fluxo contratual", "Matriz e playbook inicial", "Integração e importação de dados", "Treinamento", "Acompanhamento", "Construção de caso", "Avaliação de resultados"]
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    title: "Comece com clareza.",
    items: [
      ["A DRATOS substitui o ERP?", "Não. A DRATOS conecta e governa a jornada contratual usando dados que a organização já possui."],
      ["Preciso ter TOTVS para usar?", "Não. TOTVS RM é uma integração inicial prioritária, mas a plataforma aceita outras fontes e integrações."],
      ["É possível começar com planilha?", "Sim. Planilhas e CSV podem apoiar uma implantação progressiva."],
      ["Como os dados entram na plataforma?", "Por formulários, cadastro manual, importações, APIs ou conectores configurados para o cenário."],
      ["O Jurídico controla matrizes e cláusulas?", "Sim. Matrizes, versões, status e playbooks mantêm a governança jurídica."],
      ["Como funciona a Sala Jurídica?", "Ela centraliza documento, comentários, versões, pendências e decisões em um ambiente rastreável."],
      ["A plataforma possui assinatura eletrônica?", "A jornada integra assinatura eletrônica conforme o assinador e o projeto de integração."],
      ["Como funciona a Due Diligence?", "Reúne dados, evidências e pendências para apoiar análise e decisão humana documentada."],
      ["O que é Performance Contratual?", "É a avaliação recorrente de entregas, níveis de serviço, critérios e resultados de cada contrato."],
      ["Cada contrato pode ter indicadores próprios?", "Sim. Modelos, critérios, pesos, escalas e periodicidades podem ser parametrizados."],
      ["O que é o Dossiê Auditável?", "É o histórico verificável de documentos, versões, decisões, aprovações, evidências e eventos."],
      ["Como funcionam as permissões?", "Perfis e contextos como empresa, filial e centro de custo delimitam o acesso."],
      ["A DRATOS atende governo?", "A plataforma pode apoiar operações públicas e reguladas que demandam evidências, fiscalização e prestação de contas."],
      ["É possível integrar outros ERPs?", "Sim. O desenho prevê APIs, webhooks, importações e conectores conforme cada projeto."],
      ["Como funciona o piloto?", "O piloto começa com diagnóstico, cenário priorizado, configuração orientada e critérios de avaliação definidos em conjunto."]
    ]
  },
  finalCta: {
    eyebrow: "Demonstração aplicada",
    title: "Vamos apresentar a DRATOS aplicada à realidade da sua organização?",
    text: "Mostramos a jornada completa utilizando seus contratos, fontes de dados, áreas, critérios de aprovação, obrigações e indicadores de performance.",
    signature: "Da requisição à performance contratual."
  },
  form: {
    title: "Agende uma demonstração aplicada",
    text: "Conte um pouco sobre sua operação. Sem um endpoint configurado, a confirmação abrirá seu cliente de e-mail com destino a contato@dratos.com.br.",
    fields: {
      name: { label: "Nome", placeholder: "Seu nome", required: true },
      company: { label: "Empresa", placeholder: "Nome da organização", required: true },
      role: { label: "Cargo", placeholder: "Sua função", required: true },
      email: { label: "E-mail corporativo", placeholder: "nome@empresa.com", required: true },
      phone: { label: "Telefone (opcional)", placeholder: "+55 (00) 00000-0000", required: false },
      erp: { label: "ERP atual", placeholder: "Selecione", required: true, options: ["TOTVS RM", "SAP", "Oracle", "Outro ERP", "Planilhas / sem ERP"] },
      volume: { label: "Volume aproximado de contratos", placeholder: "Selecione", required: true, options: ["Até 100", "101 a 500", "501 a 2.000", "2.001 a 10.000", "Mais de 10.000"] },
      challenge: { label: "Principal desafio", placeholder: "Descreva brevemente o cenário", required: true },
      interest: { label: "Interesse", placeholder: "Selecione", required: true, options: ["Demonstração", "Diagnóstico", "Programa Founding Clients", "Integração", "Parceria"] },
      privacy: { label: "Concordo com o uso destes dados para retorno sobre esta solicitação.", required: true }
    },
    demoSuccess: "Seu cliente de e-mail foi aberto com a solicitação endereçada a contato@dratos.com.br. Revise a mensagem antes de enviar.",
    sendSuccess: "Solicitação enviada com sucesso.",
    error: "Não foi possível enviar agora. Revise os dados ou tente novamente.",
    validation: "Preencha os campos obrigatórios e aceite a declaração de privacidade."
  },
  footer: {
    descriptor: "Governança Contratual Inteligente",
    text: "Dados, decisões e performance em uma jornada verificável.",
    contactLabel: "Contato",
    contact: "contato@dratos.com.br",
    links: [["Demonstrações", "#videos"], ["Plataforma", "#plataforma"], ["Segurança", "#seguranca"], ["FAQ", "#faq"]],
    copyright: "© 2026 DRATOS. Todos os direitos reservados.",
    privacy: "Privacidade",
    privacyNote: "Nesta demonstração, sem endpoint configurado, o formulário apenas prepara uma mensagem no cliente de e-mail do visitante. O envio só ocorre após confirmação da própria pessoa."
  },
  videoModal: {
    production: "Vídeo em produção",
    productionText: "Este vídeo ainda não está disponível."
  },
  toast: {
    theme: "Tema atualizado.",
    copied: "Conteúdo copiado.",
    plan: "Plano selecionado para a conversa."
  }
};

window.DRATOS_CONTENT.pt.journey.scenes.forEach((scene) => {
  scene.duration = "00:10";
  scene.status = "Disponível";
  scene.poster = scene.video.replace("assets/video/", "assets/video/posters/").replace(".mp4", ".jpg");
});

const DRATOS_PT_MODULE_VIDEO = {
  solicitacoes: 5,
  autoria: 6,
  biblioteca: 7,
  "sala-juridica": 8,
  "due-diligence": 9,
  assinatura: 10,
  concluido: 11,
  obrigacoes: 11,
  "performance-modulo": 12,
  dossie: 13
};

window.DRATOS_CONTENT.pt.platform.modules.forEach((module) => {
  module.videoScene = DRATOS_PT_MODULE_VIDEO[module.id] ?? null;
});
