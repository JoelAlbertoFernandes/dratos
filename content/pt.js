window.DRATOS_CONTENT = window.DRATOS_CONTENT || {};

window.DRATOS_CONTENT.pt = {
  meta: {
    lang: "pt-BR",
    title: "DRATOS | Governança Contratual Inteligente",
    description: "A DRATOS conecta requisições, contratos, cláusulas, aprovações, assinaturas, obrigações, performance e evidências em uma única jornada contratual.",
    canonical: "https://joelalbertofernandes.github.io/dratos/",
    socialImage: "https://joelalbertofernandes.github.io/dratos/assets/images/video-frames/hero-helena.webp",
    organization: {
      name: "DRATOS — Governança Contratual Inteligente",
      description: "Plataforma de governança do ciclo de vida contratual.",
      email: "contato@dratos.com.br"
    }
  },
  assets: {
    logo: "assets/brand/dratos-logo.png",
    element: "assets/brand/dratos-elemento.png",
    frames: {
      hero: "assets/images/video-frames/hero-helena.webp",
      journey: "assets/images/video-frames/jornada-dratos.webp",
      requisition: "assets/images/video-frames/requisicao.webp",
      authoring: "assets/images/video-frames/autoria.webp",
      library: "assets/images/video-frames/biblioteca.webp",
      legalRoom: "assets/images/video-frames/sala-juridica.webp",
      diligence: "assets/images/video-frames/due-diligence.webp",
      performance: "assets/images/video-frames/performance.webp",
      dossier: "assets/images/video-frames/dossie.webp",
      dashboard: "assets/images/video-frames/dashboard.webp",
      closing: "assets/images/video-frames/encerramento.webp"
    }
  },
  settings: {
    formEndpoint: "",
    mailtoFallback: "contato@dratos.com.br",
    privacyUrl: "#privacidade"
  },
  accessibility: {
    skip: "Pular para o conteúdo",
    openMenu: "Abrir menu",
    closeMenu: "Fechar menu",
    toggleTheme: "Alternar tema",
    closeModal: "Fechar janela",
    primaryNavigation: "Navegação principal",
    layerNavigation: "Progresso da jornada",
    playVideo: "Assistir à apresentação institucional"
  },
  visual: {
    brand: "DRATOS",
    descriptor: "Governança Contratual Inteligente",
    demoLabel: "Dados demonstrativos",
    stageLabel: "Jornada contratual",
    riskLabel: "RiskAI"
  },
  ui: {
    assistedAnalysis: "Análise assistida",
    contractLabel: "Contrato",
    stepLabel: "Etapa",
    queryLabel: "Consulta",
    layerLabel: "Camada",
    dossierLabel: "Dossiê",
    auditableLabel: "Auditável",
    riskDetail: {
      rule: "Regra relacionada",
      reason: "Motivo do alerta",
      action: "Ação recomendada",
      owner: "Responsável"
    }
  },
  nav: [
    ["Plataforma", "plataforma"],
    ["Jornada", "jornada"],
    ["RiskAI", "riskai"],
    ["Performance", "performance"],
    ["Integrações", "integracoes"],
    ["Segurança", "seguranca"],
    ["Vídeo", "video"],
    ["Contato", "contato"]
  ],
  actions: {
    platform: "Conhecer a plataforma",
    presentation: "Assistir à apresentação",
    demo: "Agendar demonstração",
    diagnose: "Solicitar diagnóstico",
    contact: "Entrar em contato",
    send: "Preparar solicitação",
    explore: "Explorar a jornada"
  },
  hero: {
    layer: "01",
    eyebrow: "DRATOS · Governança Contratual Inteligente",
    title: "Do dado disperso à decisão governada.",
    text: "A DRATOS conecta dados, pessoas, documentos, inteligência, aprovações, obrigações e performance em uma única jornada contratual.",
    statement: "Contratos deixam de ser arquivos isolados e passam a gerar governança, inteligência, transparência e performance.",
    signals: ["Contexto preservado", "Decisões rastreáveis", "Performance mensurável"],
    panel: {
      label: "Operação conectada",
      stages: ["Requisição", "Autoria", "RiskAI", "Decisão", "Execução"],
      metrics: [
        { label: "SLA demonstrativo", value: "94%" },
        { label: "Entregas", value: "98%" },
        { label: "Avaliação", value: "4,8" }
      ]
    }
  },
  problem: {
    layer: "02",
    eyebrow: "A dor",
    title: "Contratos ainda operam fora dos sistemas.",
    text: "Mesmo quando dados corporativos estão organizados, decisões, versões e evidências continuam fragmentadas em canais paralelos.",
    ruptures: [
      { title: "Versões paralelas", text: "A minuta correta se perde entre anexos, cópias e alterações sem contexto." },
      { title: "Aprovações sem contexto", text: "Decisões ficam separadas do trecho, da regra e do responsável." },
      { title: "Prazos esquecidos", text: "Obrigações e renovações aparecem tarde demais para uma ação preventiva." },
      { title: "Indicadores tardios", text: "A diretoria enxerga o efeito depois que o risco já percorreu a operação." }
    ],
    chain: ["Dados fragmentados", "Decisões desconectadas", "Risco operacional", "Baixa visibilidade"]
  },
  transformation: {
    layer: "03",
    eyebrow: "A transformação",
    title: "Uma única jornada. Do pedido à performance.",
    text: "Cada etapa recebe contexto da anterior e devolve evidências para a próxima, formando uma operação contratual contínua.",
    stages: ["Solicitação", "Autoria", "Biblioteca", "Sala Jurídica", "Due Diligence", "Aprovação", "Assinatura", "Obrigações", "Performance", "Dossiê", "Dashboard"]
  },
  sources: {
    layer: "04",
    eyebrow: "Fontes de dados e conectores",
    title: "Comece com os dados que a organização já possui.",
    text: "A DRATOS conecta fontes existentes de forma progressiva. TOTVS é uma integração importante, não o posicionamento central da plataforma.",
    items: ["ERP", "TOTVS RM", "Sistema de compras", "Planilhas", "APIs", "Formulários", "Cadastros internos", "Bases externas"],
    outcome: ["Normalizar", "Contextualizar", "Governar"]
  },
  requisition: {
    layer: "05",
    eyebrow: "Requisição contratual",
    title: "O contrato começa antes da minuta.",
    text: "A demanda nasce estruturada, com as informações que sustentam autoria, aprovação, execução e análise futura.",
    fields: ["Contratante", "Contratada", "Objeto", "Valor", "Prazo", "Centro de custo", "Anexos", "Responsáveis", "Origem da solicitação"],
    proof: "Demanda completa · menos redigitação · contexto desde a origem"
  },
  authoring: {
    layer: "06",
    eyebrow: "Autoria e matrizes",
    title: "Da requisição aprovada à minuta governada.",
    text: "Matrizes, parâmetros e regras de encaminhamento transformam dados aprovados em documentos consistentes.",
    flow: ["Dados", "Matriz", "Parametrização", "Minuta"],
    items: ["Matrizes contratuais", "Campos automáticos", "Minuta interna", "Minuta do fornecedor", "Versões", "Anexos", "PDF final", "Regras de encaminhamento"]
  },
  library: {
    layer: "07",
    eyebrow: "Biblioteca e playbooks",
    title: "O conhecimento jurídico se transforma em padrão institucional.",
    text: "Cláusulas aprovadas e variantes controladas entram na minuta com rastreabilidade, sem bloquear a adaptação ao contexto.",
    items: ["Cláusulas aprovadas", "Versões", "Parâmetros controlados", "Drag-and-drop"],
    clauses: ["LGPD", "SLA", "Anticorrupção", "Confidencialidade", "Fornecedor Crítico", "Compliance"]
  },
  riskAI: {
    layer: "08",
    eyebrow: "Inteligência contratual explicável",
    title: "RiskAI · inteligência aplicada à análise contratual.",
    text: "Uma camada de inteligência que ajuda a identificar pontos de atenção, conferir cláusulas, organizar evidências e responder perguntas sobre contratos e portfólios.",
    insights: ["Pontos de atenção", "Divergências", "Obrigações relevantes", "Datas críticas", "Valores", "Riscos contextuais", "Dependências", "Sugestões de revisão"],
    governance: "O RiskAI apoia a análise. A decisão permanece com os responsáveis autorizados.",
    checks: [
      { name: "Cláusula obrigatória", state: "Presente", severity: "Conforme", excerpt: "Proteção de dados e deveres das partes definidos na cláusula 14.", rule: "Playbook LGPD · versão 3", reason: "O texto obrigatório foi localizado e corresponde à variante aprovada.", action: "Manter para revisão final.", owner: "Jurídico" },
      { name: "Índice de reajuste", state: "Ausente", severity: "Alto", excerpt: "O contrato prevê reajuste anual, mas não informa índice de referência.", rule: "Política de reajuste · regra 08", reason: "Há periodicidade sem critério objetivo de cálculo.", action: "Definir índice e data-base antes da aprovação.", owner: "Compras + Jurídico" },
      { name: "Prazo de renovação", state: "Conflitante", severity: "Médio", excerpt: "Renovação automática com aviso de 15 dias.", rule: "Playbook de vigência · antecedência mínima de 30 dias", reason: "A antecedência está abaixo do padrão institucional.", action: "Revisar a antecedência ou registrar exceção justificada.", owner: "Gestor do contrato" },
      { name: "Responsável pela obrigação", state: "Não definido", severity: "Médio", excerpt: "Relatório mensal deverá ser entregue até o quinto dia útil.", rule: "Checklist de obrigações", reason: "A entrega foi identificada sem responsável interno associado.", action: "Atribuir responsável e evidência esperada.", owner: "Área demandante" },
      { name: "SLA", state: "Incompleto", severity: "Atenção", excerpt: "Atendimento em prazo razoável conforme criticidade.", rule: "Playbook SLA · matriz de serviços", reason: "Não há meta, escala de criticidade nem consequência mensurável.", action: "Parametrizar tempos por severidade.", owner: "Operação" }
    ]
  },
  legalRoom: {
    layer: "09",
    eyebrow: "Sala Jurídica",
    title: "Revisão, negociação e decisão em um único ambiente.",
    text: "Documento, comentários por cláusula, versões e decisões permanecem no mesmo contexto, com checks discretos do RiskAI.",
    participants: ["Financeiro", "Compras", "Jurídico", "Gestor", "Fornecedor"],
    events: ["Comentário vinculado à cláusula", "Versão comparada", "Ressalva registrada", "Aprovação documentada", "Trilha preservada"]
  },
  dueDiligence: {
    layer: "10",
    eyebrow: "Due Diligence",
    title: "Evidências para conhecer melhor a contraparte.",
    text: "Dados cadastrais, estrutura societária, certidões e histórico apoiam uma decisão documentada — nunca uma conclusão automática.",
    modes: [
      { name: "Tipo 1 · Leve", text: "Validação cadastral e evidências essenciais para cenários de menor complexidade." },
      { name: "Tipo 2 · Padrão", text: "Análise ampliada, pendências, histórico e medidas de mitigação." },
      { name: "Monitoramento", text: "Atualizações periódicas e registro de mudanças relevantes." }
    ],
    items: ["Dados cadastrais", "Estrutura societária", "Certidões", "Evidências", "Histórico", "Pendências", "Mitigação"],
    disclaimer: "O RiskAI pode resumir achados; a decisão permanece humana e autorizada."
  },
  approval: {
    layer: "11",
    eyebrow: "Aprovação e assinatura",
    title: "A versão correta chega às pessoas certas.",
    text: "Workflow, aprovadores e signatários compartilham a mesma versão final, com status e evidências de cada decisão.",
    flow: ["Jurídico", "Financeiro", "Gestor", "Signatários", "Documento concluído"],
    items: ["Ordem definida", "Versão final", "Assinatura eletrônica", "Status por pessoa", "Evidência de conclusão"]
  },
  obligations: {
    layer: "12",
    eyebrow: "Obrigações",
    title: "A assinatura inicia a execução governada.",
    text: "Compromissos deixam o PDF e passam a ter responsáveis, prazos, alertas e evidências de cumprimento.",
    items: ["Obrigações", "Prazos", "Alertas", "Reajustes", "Vencimentos", "Responsáveis", "Entregas", "Evidências", "Renovações", "SLA"],
    timeline: ["Hoje · contrato ativo", "D+15 · primeira entrega", "D+30 · evidência mensal", "D+90 · ciclo de performance"]
  },
  performance: {
    layer: "13",
    eyebrow: "Performance contratual",
    title: "Cada contrato pode ser medido pelo que realmente importa.",
    text: "Critérios, pesos, metas, periodicidade e responsáveis são parametrizados por contrato, com justificativas, evidências e histórico.",
    metrics: [
      { label: "Avaliação geral", value: "4,8", unit: "de 5", progress: 96 },
      { label: "SLA", value: "94%", unit: "cumprido", progress: 94 },
      { label: "Entregas", value: "98%", unit: "realizadas", progress: 98 },
      { label: "Ocorrências", value: "2", unit: "no ciclo", progress: 18 }
    ],
    models: ["Estrelas de 1 a 5", "Nota de 0 a 10", "Percentual", "SLA", "Checklist", "Excelente a crítico", "Modelo personalizado"],
    values: ["Fiscalização", "Prestação de contas", "Transparência", "Acompanhamento de fornecedores", "Melhoria contínua"],
    disclaimer: "Valores meramente demonstrativos."
  },
  quickAI: {
    layer: "14",
    eyebrow: "Consulta rápida à IA",
    title: "Pergunte à DRATOS. Visualize a resposta.",
    text: "Uma simulação visual mostra como perguntas em linguagem natural podem ser transformadas em respostas executivas.",
    disclaimer: "Dados demonstrativos · experiência frontend sem conexão com modelo real.",
    questions: [
      "Mostre a performance dos contratos de limpeza dos últimos seis meses.",
      "Compare os fornecedores por SLA e qualidade.",
      "Quais contratos possuem obrigações vencidas?",
      "Mostre contratos com avaliação inferior a três estrelas.",
      "Liste cláusulas de reajuste divergentes do playbook.",
      "Crie um gráfico com os contratos próximos do vencimento.",
      "Mostre a evolução da performance do fornecedor por trimestre."
    ],
    results: [
      { type: "line", title: "Performance · contratos de limpeza", summary: "Evolução consistente, com queda pontual no quarto mês.", values: [{ label: "Jan", value: 74 }, { label: "Fev", value: 79 }, { label: "Mar", value: 83 }, { label: "Abr", value: 76 }, { label: "Mai", value: 88 }, { label: "Jun", value: 94 }] },
      { type: "bars", title: "Comparativo de fornecedores", summary: "Fornecedor Aurora lidera o índice combinado de SLA e qualidade.", values: [{ label: "Aurora", value: 94 }, { label: "Nexa", value: 87 }, { label: "Vértice", value: 81 }, { label: "Atlas", value: 73 }] },
      { type: "list", title: "Obrigações vencidas", summary: "Quatro obrigações exigem ação dos responsáveis.", values: [{ label: "CTR-1048 · relatório mensal", value: 4 }, { label: "CTR-1182 · certidão", value: 3 }, { label: "CTR-0921 · evidência SLA", value: 2 }, { label: "CTR-1204 · reajuste", value: 1 }] },
      { type: "ranking", title: "Contratos abaixo de três estrelas", summary: "Três contratos estão abaixo do limite configurado.", values: [{ label: "CTR-0914", value: 28 }, { label: "CTR-1102", value: 24 }, { label: "CTR-0837", value: 19 }] },
      { type: "checklist", title: "Reajustes fora do playbook", summary: "Divergências agrupadas por índice, periodicidade e antecedência.", values: [{ label: "Índice ausente", value: 6 }, { label: "Periodicidade divergente", value: 4 }, { label: "Data-base conflitante", value: 3 }] },
      { type: "bars", title: "Contratos próximos do vencimento", summary: "A concentração aumenta nos próximos 60 dias.", values: [{ label: "0–30 dias", value: 38 }, { label: "31–60 dias", value: 72 }, { label: "61–90 dias", value: 49 }, { label: "91–120 dias", value: 27 }] },
      { type: "line", title: "Evolução trimestral do fornecedor", summary: "O índice consolidado avançou 18 pontos em quatro ciclos.", values: [{ label: "T1", value: 68 }, { label: "T2", value: 74 }, { label: "T3", value: 81 }, { label: "T4", value: 86 }] }
    ]
  },
  dossier: {
    layer: "15",
    eyebrow: "Dossiê Auditável",
    title: "Da requisição à performance, cada etapa permanece registrada.",
    text: "Documentos, decisões e evidências convergem em uma linha do tempo verificável para auditoria e prestação de contas.",
    items: ["Solicitação", "Matriz", "Contrato", "Versões", "Comentários", "Checks", "RiskAI", "Due Diligence", "Aprovações", "Assinatura", "Obrigações", "Performance", "Evidências", "Logs"]
  },
  dashboard: {
    layer: "16",
    eyebrow: "Dashboard executivo",
    title: "A operação contratual em uma visão executiva.",
    text: "Indicadores conectados permitem navegar do portfólio ao contrato sem perder origem, contexto ou evidência.",
    kpis: [
      { label: "Contratos ativos", value: "1.248", delta: "+8,4%" },
      { label: "Valor total", value: "R$ 84,2 mi", delta: "+3,1%" },
      { label: "Em negociação", value: "86", delta: "12 críticos" },
      { label: "Obrigações abertas", value: "142", delta: "18 próximas" },
      { label: "Performance média", value: "4,6", delta: "de 5" },
      { label: "SLA crítico", value: "7", delta: "requer atenção" }
    ],
    dimensions: ["Fornecedores", "Vencimentos", "Due Diligence", "Centros de custo", "Filiais", "Categorias", "Performance", "Assinaturas"],
    riskPrompt: "RiskAI: mostre as três maiores variações de performance deste mês.",
    riskAnswer: ["Limpeza · −8,2%", "Tecnologia · +6,4%", "Segurança · −4,1%"],
    disclaimer: "Dados fictícios para demonstração visual."
  },
  security: {
    layer: "17",
    eyebrow: "Segurança e governança",
    title: "Controles enterprise em toda a jornada.",
    text: "A arquitetura combina identidade, segregação, rastreabilidade e resiliência sem prometer certificações ainda não comprovadas.",
    groups: [
      { title: "Acesso", items: ["RBAC", "Coligada", "Filial", "Centro de custo", "Segregação", "Proteção de rotas"] },
      { title: "Evidência", items: ["Trilha append-only", "Auditoria", "Logs", "Versionamento", "Evidências"] },
      { title: "Resiliência", items: ["Idempotência", "HTTPS", "Webhooks", "Retries", "Controle de acesso"] }
    ]
  },
  integrations: {
    layer: "18",
    eyebrow: "Integrações",
    title: "Um ecossistema contratual conectado.",
    text: "A DRATOS integra fontes, assinadores e serviços corporativos conforme o contexto da organização.",
    items: [
      { name: "TOTVS RM", type: "ERP · integração existente" },
      { name: "TOTVS Assinatura Eletrônica", type: "Assinatura" },
      { name: "Compras", type: "Origem de demandas" },
      { name: "SMTP", type: "Comunicação" },
      { name: "APIs", type: "Integração" },
      { name: "Webhooks", type: "Eventos" },
      { name: "Planilhas", type: "Importação" },
      { name: "Outros ERPs e assinadores", type: "Ecossistema" }
    ]
  },
  institutional: {
    layer: "19",
    eyebrow: "Vídeo institucional",
    title: "Veja a jornada completa da DRATOS.",
    text: "Conheça a jornada DRATOS em uma apresentação cinematográfica que percorre problema, plataforma, execução e visão executiva.",
    duration: "02:42",
    video: "assets/video/dratos-apresentacao-completa.mp4",
    poster: "assets/video/posters/dratos-apresentacao-completa.webp"
  },
  finalCta: {
    layer: "20",
    eyebrow: "Demonstração aplicada",
    title: "Vamos aplicar a DRATOS à realidade da sua organização?",
    text: "Apresentamos a jornada usando seus contratos, fluxos, áreas, critérios de aprovação, obrigações e indicadores de performance.",
    signature: "Governança contratual que conecta contexto, decisão e resultado."
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
      interest: { label: "Interesse", placeholder: "Selecione", required: true, options: ["Demonstração", "Diagnóstico", "RiskAI", "Performance", "Integração", "Parceria"] },
      privacy: { label: "Concordo com o uso destes dados para retorno sobre esta solicitação.", required: true }
    },
    demoSuccess: "Seu cliente de e-mail foi aberto com a solicitação endereçada a contato@dratos.com.br. Revise a mensagem antes de enviar.",
    sendSuccess: "Solicitação enviada com sucesso.",
    error: "Não foi possível enviar agora. Revise os dados ou tente novamente.",
    validation: "Preencha os campos obrigatórios e aceite a declaração de privacidade."
  },
  footer: {
    text: "Dados, decisões e performance em uma jornada verificável.",
    contactLabel: "Contato",
    contact: "contato@dratos.com.br",
    links: [["Plataforma", "#plataforma"], ["RiskAI", "#riskai"], ["Segurança", "#seguranca"], ["Vídeo", "#video"]],
    copyright: "© 2026 DRATOS. Todos os direitos reservados.",
    privacy: "Privacidade",
    privacyNote: "Nesta demonstração, sem endpoint configurado, o formulário apenas prepara uma mensagem no cliente de e-mail do visitante. O envio só ocorre após confirmação da própria pessoa."
  },
  toast: {
    theme: "Tema atualizado.",
    query: "Consulta demonstrativa atualizada."
  }
};
