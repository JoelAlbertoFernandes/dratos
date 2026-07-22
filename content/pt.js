window.DRATOS_CONTENT = window.DRATOS_CONTENT || {};
window.DRATOS_CONTENT.pt = {
  meta: {
    lang: "pt-BR",
    label: "PT",
    title: "DRATOS | Governança Contratual em uma Jornada Inteligente",
    description: "Conheça a jornada DRATOS: fontes de dados, requisição, autoria, negociação, Due Diligence, assinatura, obrigações e dossiê auditável."
  },
  brand: {
    name: "DRATOS",
    logo: "assets/logo/dratos-logo.png",
    tag: "Inteligência em contratos"
  },
  nav: [
    ["Visão Geral", "visao-geral"],
    ["Jornada", "jornada"],
    ["Módulos", "modulos"],
    ["Conectores", "conectores"],
    ["Segurança", "seguranca"],
    ["Planos", "planos"],
    ["Vídeos", "videos"],
    ["FAQ", "faq"]
  ],
  actions: {
    demo: "Agendar demonstração",
    journey: "Conhecer a jornada DRATOS",
    addVideo: "Adicionar vídeo deste módulo",
    watch: "Assistir demonstração",
    plan: "Conhecer este plano",
    send: "Enviar solicitação",
    close: "Fechar"
  },
  ui: {
    governed: "Governado",
    validated: "Validado",
    analyzing: "Em análise",
    videoSoon: "Vídeo explicativo em breve",
    guidedDemo: "Demo guiada",
    scatteredContract: "Contrato disperso",
    before: "Antes",
    withDratos: "Com DRATOS",
    live: "Ao vivo",
    contractJourney: "Jornada contratual",
    requests: "Requisições",
    approvals: "Aprovações",
    dossiers: "Dossiês"
  },
  hero: {
    eyebrow: "Uma demo narrativa da governança contratual",
    title: "Apresente, governe e acompanhe contratos em uma única jornada inteligente.",
    text: "A DRATOS transforma dados de ERPs, planilhas, APIs e formulários em requisições, contratos, aprovações, assinaturas, obrigações e dossiês auditáveis.",
    note: "Sem substituir seu ERP. Sem depender de planilhas paralelas. Sem perder o histórico em e-mails.",
    meeting: "Em uma reunião de demonstração, mostramos como sua empresa sai de documentos dispersos para uma jornada contratual governada de ponta a ponta.",
    statuses: ["Requisição padronizada", "Contrato com matriz aprovada", "Sala Jurídica colaborativa", "Dossiê auditável"]
  },
  problem: {
    eyebrow: "O problema que apresentamos ao cliente",
    title: "Antes da DRATOS: contratos dispersos, versões paralelas e pouca rastreabilidade.",
    items: [
      ["Solicitações por e-mail", "Demandas começam sem dados e documentos essenciais."],
      ["Dados duplicados", "Informações são redigitadas entre sistemas e contratos."],
      ["Contratos sem padrão", "Modelos antigos são reaproveitados sem governança."],
      ["Aprovações informais", "Decisões ficam espalhadas entre mensagens e reuniões."],
      ["Negociação por anexos", "Versões paralelas dificultam saber qual documento vale."],
      ["Assinatura sem visão", "Pendências e riscos não bloqueiam o envio da versão final."],
      ["Obrigações esquecidas", "Prazos deixam de ser acompanhados depois da assinatura."]
    ],
    before: {
      label: "Como normalmente acontece hoje",
      items: ["E-mail e anexos", "Copiar e colar", "Aprovação informal", "Histórico fragmentado"]
    },
    after: {
      label: "Como passa a funcionar com DRATOS",
      items: ["Intake estruturado", "Matrizes aprovadas", "Workflow rastreável", "Dossiê auditável"]
    }
  },
  journey: {
    eyebrow: "A jornada DRATOS de ponta a ponta",
    title: "Cada etapa conectada. Cada decisão preservada.",
    text: "Selecione uma etapa para destacar como a DRATOS conduz o contrato do primeiro dado ao dossiê final.",
    steps: [
      ["01", "Fontes de dados", "Dados estruturados entram na jornada."],
      ["02", "Requisição", "O pedido nasce completo e padronizado."],
      ["03", "Autoria", "A minuta nasce de uma matriz aprovada."],
      ["04", "Biblioteca e Playbooks", "O padrão jurídico orienta a operação."],
      ["05", "Sala Jurídica", "Negociação e aprovações ficam centralizadas."],
      ["06", "Due Diligence", "A contraparte é validada antes do risco."],
      ["07", "Assinatura", "A versão final segue com controle."],
      ["08", "Obrigações e Dossiê", "Execução, provas e histórico permanecem acessíveis."]
    ]
  },
  modulesIntro: {
    eyebrow: "Demonstração módulo por módulo",
    title: "Entenda o que cada funcionalidade faz e o valor que entrega.",
    text: "Cada capítulo mostra o módulo, seus usuários, o problema resolvido e o impacto gerado."
  },
  modules: [
    {
      id: "conectores",
      number: "01",
      eyebrow: "Fontes de Dados e Conectores",
      title: "Comece com os dados que sua empresa já possui.",
      text: "A DRATOS recebe dados de diferentes fontes e os transforma em entradas estruturadas para a jornada contratual. TOTVS é um conector prioritário, entre diversas possibilidades.",
      features: ["ERP", "TOTVS", "Excel / CSV", "API", "Formulário interno", "Cadastro manual", "Bases externas"],
      audience: "TI, Jurídico, Compras e Financeiro",
      problem: "Redigitação e inconsistência de dados",
      value: "Contratos nascem com dados estruturados",
      video: "assets/video/modulo-conectores.mp4",
      visual: "connectors"
    },
    {
      id: "requisicoes",
      number: "02",
      eyebrow: "Requisição Contratual",
      title: "Transforme pedidos soltos em requisições padronizadas.",
      text: "A requisição é o ponto de partida. Ela coleta os dados essenciais antes da minuta existir e direciona a demanda para o fluxo correto.",
      features: ["Contratante e contratada", "Objeto e valor", "Prazo", "Centro de custo", "Documentos", "Tipo de contrato", "Urgência", "Área solicitante"],
      audience: "Compras, Comercial, Operações e Jurídico",
      problem: "Solicitações incompletas e retrabalho",
      value: "O jurídico recebe demandas completas",
      video: "assets/video/modulo-requisicoes.mp4",
      visual: "request"
    },
    {
      id: "autoria",
      number: "03",
      eyebrow: "Autoria Contratual",
      title: "Gere contratos a partir de matrizes aprovadas.",
      text: "A DRATOS utiliza matrizes contratuais e variáveis vindas da requisição para gerar minutas padronizadas e controladas.",
      features: ["Matriz de contrato", "Campos parametrizados", "Preenchimento automático", "Controle de versões", "Minuta interna", "Minuta do fornecedor", "Biblioteca lateral"],
      audience: "Jurídico",
      problem: "Copiar e colar contratos antigos",
      value: "Padronização e velocidade",
      video: "assets/video/modulo-autoria.mp4",
      visual: "author"
    },
    {
      id: "biblioteca",
      number: "04",
      eyebrow: "Biblioteca de Cláusulas e Playbooks",
      title: "Controle o padrão jurídico sem travar a operação.",
      text: "O jurídico cadastra cláusulas aprovadas, versões e playbooks. Durante a autoria, o conteúdo pode ser aplicado com agilidade e rastreabilidade.",
      features: ["Cláusulas aprovadas", "Versionamento", "Rascunho, revisão e aprovado", "Playbooks LGPD e SLA", "Anticorrupção", "Fornecedor crítico", "Parâmetros controlados", "Trilha de auditoria"],
      audience: "Jurídico e Legal Ops",
      problem: "Cláusulas divergentes e modelos antigos",
      value: "Governança e controle jurídico",
      video: "assets/video/modulo-biblioteca.mp4",
      visual: "library"
    },
    {
      id: "sala-juridica",
      number: "05",
      eyebrow: "Sala Jurídica",
      title: "Negocie, aprove e acompanhe tudo em um único ambiente.",
      text: "A Sala Jurídica centraliza documento, comentários, pendências, versões, aprovações e negociação.",
      features: ["Comentários internos e externos", "Controle de versão", "Pendências bloqueantes", "Checklist jurídico", "Aprovação por áreas", "Preparação para assinatura"],
      audience: "Jurídico, Compras, Fornecedor e Aprovadores",
      problem: "Negociação por e-mail e anexos",
      value: "Colaboração rastreável",
      video: "assets/video/modulo-sala-juridica.mp4",
      visual: "legal"
    },
    {
      id: "due-diligence",
      number: "06",
      eyebrow: "Due Diligence",
      title: "Valide a contraparte antes de assumir riscos.",
      text: "A DRATOS permite solicitar Due Diligence conforme o tipo de contrato e sua criticidade, preservando evidências e decisões.",
      features: ["Tipo 1 Leve", "Tipo 2 Padrão", "Monitoramento", "Evidências", "Relatório", "Pendências", "Decisão com mitigação"],
      audience: "Jurídico, Compliance e Compras",
      problem: "Contratar sem visão mínima da contraparte",
      value: "Decisão mais segura e documentada",
      video: "assets/video/modulo-due-diligence.mp4",
      visual: "diligence"
    },
    {
      id: "assinatura",
      number: "07",
      eyebrow: "Workflow, Aprovações e Assinatura",
      title: "Leve o contrato certo para as pessoas certas aprovarem.",
      text: "A DRATOS organiza aprovações e só libera a assinatura quando as pendências estiverem resolvidas.",
      features: ["Aprovação jurídica", "Aprovação financeira", "Aprovação de compras", "Assinatura eletrônica", "Bloqueio por pendência", "Versão final congelada", "Evidências da assinatura"],
      audience: "Jurídico, Financeiro, Diretoria e Signatários",
      problem: "Aprovações informais e assinatura fora do fluxo",
      value: "Controle antes da assinatura",
      video: "assets/video/modulo-aprovacoes-assinatura.mp4",
      visual: "approval"
    },
    {
      id: "obrigacoes",
      number: "08",
      eyebrow: "Obrigações, Prazos e Monitoramento",
      title: "O contrato assinado vira gestão contínua.",
      text: "Depois da assinatura, a DRATOS acompanha obrigações, prazos, reajustes, vencimentos e eventos críticos.",
      features: ["Obrigações contratuais", "Responsáveis", "Alertas", "Vencimentos", "Renovações", "Reajustes", "Monitoramento da contraparte", "Histórico de eventos"],
      audience: "Jurídico, Operações, Financeiro e Gestores",
      problem: "Contratos esquecidos depois da assinatura",
      value: "Execução acompanhada e menor perda de prazo",
      video: "assets/video/modulo-obrigacoes.mp4",
      visual: "obligations"
    },
    {
      id: "dossie",
      number: "09",
      eyebrow: "Dossiê Auditável",
      title: "Prove o que foi feito, por quem, quando e com qual justificativa.",
      text: "Cada contrato gera um dossiê completo com histórico, versões, aprovações, evidências, documentos, Due Diligence, assinatura e obrigações.",
      features: ["Histórico da requisição", "Documentos anexados", "Versões", "Comentários", "Aprovações", "Assinatura", "Evidências", "Obrigações", "Logs"],
      audience: "Jurídico, Auditoria, Compliance e Diretoria",
      problem: "Dificuldade de auditoria e falta de histórico",
      value: "Rastreabilidade e governança",
      video: "assets/video/modulo-dossie.mp4",
      visual: "dossier"
    }
  ],
  security: {
    eyebrow: "Segurança e Governança",
    title: "Segurança, LGPD e controle por perfil desde a origem.",
    text: "A governança acompanha cada dado, documento, decisão e evidência durante toda a jornada.",
    items: ["Permissões por perfil", "Logs", "Trilha de auditoria", "Versionamento", "Controle de cláusulas", "Evidências", "Segregação de acesso", "LGPD"]
  },
  integrations: {
    eyebrow: "Conectores e Integrações",
    title: "A DRATOS se conecta ao ecossistema da empresa.",
    text: "TOTVS é um conector prioritário para o lançamento, mas a DRATOS foi desenhada para operar com múltiplas fontes.",
    items: ["TOTVS", "ERPs", "Planilhas", "APIs", "Webhooks", "Assinadores digitais", "Bases externas", "Armazenamento em nuvem"]
  },
  plans: {
    eyebrow: "Planos",
    title: "Uma configuração para cada estágio de maturidade.",
    text: "Escopo, volumes, módulos e integrações são definidos conforme sua operação.",
    items: [
      ["Sandbox", "Piloto orientado", ["Jornada demonstrativa", "Importação simples", "Dossiê básico"]],
      ["Essential", "A partir de", ["Requisições", "Matrizes básicas", "Excel / CSV"]],
      ["Professional", "Sob consulta", ["Sala Jurídica", "Playbooks", "Obrigações", "Due Diligence"]],
      ["Business Integrado", "Sob consulta", ["Conector assistido", "API e monitoramento", "Dossiê avançado"], true],
      ["Enterprise", "Projeto personalizado", ["Multiempresa", "SSO e SLA", "Integração avançada"]]
    ]
  },
  videos: {
    eyebrow: "Vídeos de demonstração por módulo",
    title: "Explore a DRATOS no seu ritmo.",
    text: "Cada vídeo poderá apresentar uma funcionalidade em poucos minutos.",
    items: [
      ["Visão geral", "03:00", "assets/video/dratos-demo-placeholder.mp4"],
      ["Requisições", "02:30", "assets/video/modulo-requisicoes.mp4"],
      ["Autoria", "03:15", "assets/video/modulo-autoria.mp4"],
      ["Biblioteca", "02:45", "assets/video/modulo-biblioteca.mp4"],
      ["Sala Jurídica", "03:20", "assets/video/modulo-sala-juridica.mp4"],
      ["Due Diligence", "02:40", "assets/video/modulo-due-diligence.mp4"],
      ["Assinatura", "02:20", "assets/video/modulo-aprovacoes-assinatura.mp4"],
      ["Obrigações", "03:10", "assets/video/modulo-obrigacoes.mp4"],
      ["Dossiê", "02:55", "assets/video/modulo-dossie.mp4"]
    ]
  },
  faq: {
    eyebrow: "Perguntas frequentes",
    title: "Comece com clareza.",
    items: [
      ["A DRATOS substitui meu ERP?", "Não. A DRATOS conecta a jornada contratual aos dados e sistemas que sua empresa já utiliza."],
      ["Preciso de integração para começar?", "Não. É possível começar com formulário, cadastro manual, planilha ou CSV."],
      ["A DRATOS funciona com TOTVS?", "Sim. TOTVS é um conector prioritário, mas não é a única fonte suportada."],
      ["O jurídico controla as cláusulas?", "Sim. Bibliotecas, matrizes, versões e playbooks mantêm o jurídico no controle."],
      ["A plataforma tem assinatura eletrônica?", "A DRATOS organiza o envio, congela a versão final e preserva as evidências."],
      ["O que é dossiê auditável?", "É o registro organizado de dados, documentos, decisões, versões, logs e evidências."],
      ["Como funciona a Due Diligence?", "Checklists e regras configuráveis apoiam validações, pendências e decisões documentadas."],
      ["É possível configurar os fluxos?", "Sim. Tipos de contrato, campos, alçadas, documentos e aprovações podem ser parametrizados."]
    ]
  },
  finalCta: {
    eyebrow: "Demonstração aplicada",
    title: "Vamos apresentar a DRATOS aplicada à sua realidade?",
    text: "Mostramos a jornada completa usando seus tipos de contrato, seus fluxos, suas fontes de dados e seus critérios de governança."
  },
  footer: {
    text: "Governança contratual em uma jornada inteligente, conectada e auditável.",
    contact: "contato@dratos.com.br",
    copyright: "© 2026 DRATOS. Todos os direitos reservados."
  },
  modal: {
    eyebrow: "Agendar demonstração",
    title: "Vamos aplicar a DRATOS à sua realidade.",
    text: "Conte-nos sobre sua operação. Este formulário é demonstrativo e não envia dados para um servidor.",
    fields: ["Nome", "E-mail corporativo", "Empresa", "Sistemas e fontes atuais", "Principal desafio contratual"],
    success: "Solicitação registrada nesta demonstração."
  },
  toast: {
    theme: "Tema atualizado.",
    language: "Idioma atualizado.",
    video: "Vídeo explicativo em breve.",
    plan: "Plano selecionado.",
    journey: "Etapa destacada na jornada."
  }
};
