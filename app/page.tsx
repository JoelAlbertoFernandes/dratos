"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";

const chapters = [
  { time: 0, label: "Visão DRATOS", index: "01" },
  { time: 23, label: "Requisição e autoria", index: "02" },
  { time: 46, label: "RiskAI e negociação", index: "03" },
  { time: 71, label: "Aprovação e assinatura", index: "04" },
  { time: 96, label: "Obrigações e performance", index: "05" },
  { time: 124, label: "Dossiê auditável", index: "06" },
  { time: 148, label: "Decisão executiva", index: "07" },
];

const dueDiligenceViews = {
  Cadastral: "Identificação e informações cadastrais disponíveis nas fontes habilitadas.",
  Societário: "Estruturas e relações societárias organizadas para apoiar a leitura da contraparte.",
  Processos: "Registros processuais disponíveis reunidos com contexto e evidências.",
  Reputacional: "Sinais reputacionais disponíveis apresentados de forma estruturada.",
  Compliance: "Evidências e pontos de atenção para apoiar a análise de conformidade.",
} as const;

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [player, setPlayer] = useState(false);
  const [demo, setDemo] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [transition, setTransition] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [analysisTarget, setAnalysisTarget] = useState("");
  const [analysisFocus, setAnalysisFocus] = useState<keyof typeof dueDiligenceViews>("Cadastral");
  const [analysisPulse, setAnalysisPulse] = useState(0);
  const [submittingDemo, setSubmittingDemo] = useState(false);
  const [demoStatus, setDemoStatus] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!player && !demo) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [player, demo]);

  useEffect(() => {
    const saved = localStorage.getItem("dratos-theme") as
      "dark" | "light" | null;
    const initial =
      saved ||
      (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("dratos-theme", next);
    document.documentElement.dataset.theme = next;
  }

  function startDueDiligence() {
    setAnalysisPulse((current) => current + 1);
  }

  function chooseDueDiligenceFocus(focus: keyof typeof dueDiligenceViews) {
    setAnalysisFocus(focus);
    setAnalysisPulse((current) => current + 1);
  }

  async function requestDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submittingDemo) return;

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setSubmittingDemo(true);
    setDemoStatus(null);

    try {
      const response = await fetch("/api/demo", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json() as { message?: string };
      if (!response.ok) throw new Error(result.message || "Não foi possível enviar agora. Tente novamente em instantes.");
      form.reset();
      setDemoStatus({ type: "success", message: result.message || "Solicitação enviada com sucesso. Em breve entraremos em contato." });
    } catch (error) {
      setDemoStatus({ type: "error", message: error instanceof Error ? error.message : "Não foi possível enviar agora. Tente novamente em instantes." });
    } finally {
      setSubmittingDemo(false);
    }
  }

  function trackVideo() {
    const time = videoRef.current?.currentTime ?? 0;
    let next = 0;
    chapters.forEach((item, i) => {
      if (time >= item.time) next = i;
    });
    if (next !== chapter) setChapter(next);
    setTransition(time - chapters[next].time < 2.6);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="DRATOS — início">
          <img src="/brand/dratos-logo.png" alt="DRATOS" />
        </a>
        <nav className={menu ? "open" : ""} aria-label="Navegação principal">
          <a href="#plataforma" onClick={() => setMenu(false)}>
            Plataforma
          </a>
          <a href="#dashboard" onClick={() => setMenu(false)}>
            Dashboard
          </a>
          <a href="#due-diligence" onClick={() => setMenu(false)}>
            Due Diligence
          </a>
          <a href="#rastreabilidade" onClick={() => setMenu(false)}>
            Rastreabilidade
          </a>
          <a href="#performance" onClick={() => setMenu(false)}>
            Performance
          </a>
          <a href="#seguranca" onClick={() => setMenu(false)}>
            Segurança
          </a>
        </nav>
        <button
          className="theme-toggle"
          onClick={toggleTheme}
          aria-label={`Ativar modo ${theme === "dark" ? "claro" : "escuro"}`}
        >
          <span>{theme === "dark" ? "☀" : "☾"}</span>
          <b>{theme === "dark" ? "Light" : "Dark"}</b>
        </button>
        <button className="header-cta" onClick={() => setDemo(true)}>
          Agendar demonstração
        </button>
        <button
          className="menu"
          onClick={() => setMenu(!menu)}
          aria-label="Abrir menu"
        >
          <span />
          <span />
        </button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-photo" aria-hidden="true" />
        <div className="hero-overlay" aria-hidden="true" />
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow">
            <span /> Governança contratual inteligente
          </p>
          <h1>
            Contratos conectados.
            <br />
            <em>Decisões seguras.</em>
          </h1>
          <p className="lead">
            A DRATOS transforma dados dispersos, aprovações e obrigações em uma
            jornada governada — com contexto, evidência e visibilidade para
            decidir.
          </p>
          <div className="hero-actions">
            <a className="button primary" href="#plataforma">
              Conhecer a plataforma <b>↓</b>
            </a>
            <button
              className="button secondary"
              onClick={() => {
                setVideoError(false);
                setPlayer(true);
              }}
            >
              <i>▶</i> Assistir apresentação <small>02:33</small>
            </button>
          </div>
        </div>
      </section>

      <section className="video-section">
        <div className="video-copy">
          <p className="eyebrow">
            <span /> Apresentação institucional
          </p>
          <h2>
            Veja a jornada
            <br />
            <em>completa.</em>
          </h2>
          <button
            className="button primary"
            onClick={() => {
              setVideoError(false);
              setPlayer(true);
            }}
          >
            Assistir agora <i>▶</i>
          </button>
        </div>
        <button
          className="poster"
          onClick={() => {
            setVideoError(false);
            setPlayer(true);
          }}
          aria-label="Assistir ao vídeo institucional"
        >
          <img
            src="/media/dratos-video-capa-inicial.png"
            alt="Cena inicial do vídeo institucional DRATOS"
          />
          <span className="poster-shade" />
          <i className="play">▶</i>
          <div>
            <small>FILME INSTITUCIONAL · 02:33</small>
            <b>Da requisição ao dossiê auditável</b>
          </div>
        </button>
      </section>

      <section className="statement" id="desafios">
        <div className="problem-intro">
          <p className="eyebrow">
            <span /> O risco da operação desconectada
          </p>
          <h2>
            O contrato foi assinado porém,
            <br />
            <em>o risco continua operando.</em>
          </h2>
          <p>
            Quando informações críticas vivem em arquivos, e-mails e sistemas
            diferentes, o problema não é apenas falta de organização. É a perda
            de contexto para decidir, agir e comprovar.
          </p>
        </div>
        <div className="pain-grid">
          <article>
            <h3>Versões paralelas</h3>
            <p>
              Minutas, anexos e alterações circulam por diferentes canais, sem
              uma fonte única de verdade. A equipe perde tempo conciliando
              arquivos e pode decidir com base em uma versão desatualizada.
            </p>
          </article>
          <article>
            <h3>Aprovações sem contexto</h3>
            <p>
              A decisão se separa da cláusula, da regra, da justificativa e do
              responsável. Sem uma trilha unificada, aprovar deixa de ser uma
              decisão governada e passa a ser apenas uma etapa.
            </p>
          </article>
          <article>
            <h3>Obrigações invisíveis</h3>
            <p>
              Prazos, reajustes, entregas e compromissos permanecem escondidos
              nos documentos. O risco só aparece quando o vencimento chegou ou a
              obrigação já foi descumprida.
            </p>
          </article>
          <article>
            <h3>Performance sem evidência</h3>
            <p>
              A diretoria enxerga contratos assinados, mas não o resultado real
              das relações. Sem indicadores e evidências, a gestão reage ao
              problema em vez de antecipá-lo.
            </p>
          </article>
        </div>
      </section>

      <section
        className="executive-showcase"
        id="dashboard"
        aria-label="Dashboard executivo da plataforma DRATOS"
      >
        <div className="showcase-copy">
          <p className="eyebrow">
            <span /> Dashboard executivo
          </p>
          <h2>
            Da operação contratual
            <br /> à <em>visão executiva.</em>
          </h2>
          <p>
            A DRATOS transforma dados contratuais em indicadores, alertas e
            prioridades para que jurídico, gestão e áreas de negócio acompanhem
            o que exige atenção e decidam com mais contexto.
          </p>
          <div className="showcase-benefits">
            <span>
              <b>✓</b>
              <strong>Indicadores</strong>
              <small>Contratos, riscos e obrigações em uma visão consolidada.</small>
            </span>
            <span>
              <b>✓</b>
              <strong>Prioridades</strong>
              <small>Alertas e eventos que exigem atenção.</small>
            </span>
            <span>
              <b>✓</b>
              <strong>Visão executiva</strong>
              <small>Informação contratual pronta para apoiar decisões.</small>
            </span>
          </div>
        </div>
        <div className="dashboard-stage">
          <span className="stage-label">DASHBOARD EXECUTIVO</span>
          <img
            src="/media/showcase/dashboard-executivo-3d.png"
            alt="Dashboard executivo tridimensional da DRATOS com carteira, contratos, SLA e obrigações"
          />
        </div>
      </section>

      <section className="ai-section due-diligence-section" id="due-diligence">
        <div className="ai-copy">
          <p className="eyebrow">
            <span /> Due Diligence integrada
          </p>
          <h2>
            Conheça a contraparte antes de <em>assumir o risco.</em>
          </h2>
          <p>
            Centralize informações, evidências e sinais relevantes para apoiar a
            análise de pessoas e empresas antes e durante a relação contratual. A
            DRATOS organiza os dados disponíveis nas fontes e integrações
            habilitadas para dar mais contexto à decisão.
          </p>
          <div className="ai-query">
            <label htmlFor="due-diligence-target">Quem você quer analisar?</label>
            <div>
              <input
                id="due-diligence-target"
                value={analysisTarget}
                onChange={(e) => setAnalysisTarget(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && startDueDiligence()}
                placeholder="Empresa / CNPJ / CPF"
              />
              <button onClick={startDueDiligence}>Iniciar análise</button>
            </div>
            <p className="query-suggestions">
              <span>Dimensões:</span>
              {(Object.keys(dueDiligenceViews) as Array<keyof typeof dueDiligenceViews>).map((focus) => (
                <button
                  key={focus}
                  className={analysisFocus === focus ? "active" : ""}
                  onClick={() => chooseDueDiligenceFocus(focus)}
                >
                  {focus}
                </button>
              ))}
            </p>
          </div>
        </div>
        <div className="answer-dashboard">
          <div className="risk-head">
            <div>
              <span>◇</span>
              <b>Dossiê de contraparte</b>
            </div>
            <small>DEMONSTRAÇÃO CONCEITUAL</small>
          </div>
          <div
            key={analysisPulse}
            className="answer-result due-diligence-result"
            role="status"
            aria-live="polite"
          >
            <p className="answer-question">{analysisTarget.trim() || "Empresa / CNPJ / CPF"}</p>
            <div className="due-diligence-focus">
              <small>DIMENSÃO SELECIONADA</small>
              <strong>{analysisFocus}</strong>
              <p>{dueDiligenceViews[analysisFocus]}</p>
            </div>
            <div className="evidence-row">
              <span>Cadastro</span>
              <span>Relações</span>
              <span>Evidências</span>
            </div>
            <small className="concept-note">Interface ilustrativa. Nenhuma consulta real é realizada nesta demonstração.</small>
          </div>
          <div className="riskai-product">
            <img
              src="/media/showcase/dratos-due-diligence.webp"
              alt="Ilustração conceitual de um dossiê corporativo de Due Diligence com evidências e relações societárias"
              loading="lazy"
            />
            <span>CADASTRO · RELAÇÕES · EVIDÊNCIAS</span>
          </div>
        </div>
      </section>

      <section className="performance-section" id="performance" aria-label="Performance contratual na DRATOS">
        <div className="performance-heading">
          <div><p className="eyebrow"><span /> Performance contratual</p><h2>Do contrato assinado<br /><em>ao resultado comprovado.</em></h2></div>
          <p>Acompanhe o desempenho real de contratos, fornecedores e obrigações em uma leitura contínua, comparável e sustentada por evidências.</p>
        </div>
        <div className="performance-board">
          <header><div><small>VISÃO CONSOLIDADA DO PORTFÓLIO</small><b>Performance executiva</b></div><span><i /> ATUALIZADO AGORA</span></header>
          <div className="performance-kpis"><article><small>ÍNDICE GERAL</small><strong>4,8<em>/5</em></strong><span>↑ 6,2% no trimestre</span></article><article><small>SLAs CUMPRIDOS</small><strong>94<em>%</em></strong><span>Meta contratual: 90%</span></article><article><small>ENTREGAS NO PRAZO</small><strong>98<em>%</em></strong><span>1.284 entregas avaliadas</span></article><article><small>VALOR MONITORADO</small><strong>R$ 86<em> mi</em></strong><span>Carteira ativa consolidada</span></article></div>
          <div className="performance-detail">
            <article className="performance-chart"><div className="performance-card-title"><span><small>EVOLUÇÃO DA PERFORMANCE</small><b>Resultado mensal</b></span><em>Últimos 6 meses</em></div><div className="chart-area"><div className="chart-grid"><i /><i /><i /><i /></div><svg viewBox="0 0 600 180" role="img" aria-label="Performance evoluiu de 78 para 94 por cento"><defs><linearGradient id="performanceFill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#60b2fa" stopOpacity=".32" /><stop offset="1" stopColor="#60b2fa" stopOpacity="0" /></linearGradient></defs><path d="M10 144 C80 136 98 111 155 118 S245 96 302 101 S390 67 438 74 S520 42 590 34 L590 180 L10 180Z" fill="url(#performanceFill)" /><path d="M10 144 C80 136 98 111 155 118 S245 96 302 101 S390 67 438 74 S520 42 590 34" fill="none" stroke="#60b2fa" strokeWidth="4" strokeLinecap="round" /><g fill="#b9e9ff" stroke="#0b2638" strokeWidth="4"><circle cx="10" cy="144" r="6" /><circle cx="155" cy="118" r="6" /><circle cx="302" cy="101" r="6" /><circle cx="438" cy="74" r="6" /><circle cx="590" cy="34" r="6" /></g></svg><div className="chart-labels"><span>MAR</span><span>ABR</span><span>MAI</span><span>JUN</span><span>JUL</span><span>AGO</span></div></div></article>
            <article className="performance-ranking"><div className="performance-card-title"><span><small>DESEMPENHO DA CARTEIRA</small><b>Contratos por faixa</b></span><em>127 ativos</em></div><div className="ranking-ring"><div><strong>82%</strong><small>alta performance</small></div></div><ul><li><i className="excellent" /><span><b>Excelente</b><small>104 contratos</small></span><strong>82%</strong></li><li><i className="attention" /><span><b>Em atenção</b><small>17 contratos</small></span><strong>13%</strong></li><li><i className="critical" /><span><b>Crítico</b><small>6 contratos</small></span><strong>5%</strong></li></ul></article>
          </div>
        </div>
        <div className="performance-pillars"><article><i>01</i><div><h3>Indicadores parametrizáveis</h3><p>KPIs, SLAs, metas, pesos e critérios definidos conforme cada contrato e categoria.</p></div></article><article><i>02</i><div><h3>Avaliação com evidência</h3><p>Cada nota se conecta à entrega, obrigação, documento e responsável que a sustenta.</p></div></article><article><i>03</i><div><h3>Ação sobre desvios</h3><p>Alertas e planos de ação transformam variações de performance em decisões rastreáveis.</p></div></article></div>
      </section>

      <section className="security" id="seguranca">
        <div>
          <p className="eyebrow">
            <span /> Segurança e governança
          </p>
          <h2>
            Enterprise by design.
            <br />
            Em todas as camadas.
          </h2>
        </div>
        <div className="security-grid">
          <article>
            <span>◎</span>
            <h3>Acesso e identidade</h3>
            <p>RBAC e segregação</p>
            <p>Coligada, filial e centro de custo</p>
            <p>Proteção restrita de rotas</p>
          </article>
          <article>
            <span>◇</span>
            <h3>Evidência e rastreabilidade</h3>
            <p>Trilha append-only</p>
            <p>Versionamento blindado</p>
            <p>Logs e auditoria preservados</p>
          </article>
          <article>
            <span>↻</span>
            <h3>Resiliência operacional</h3>
            <p>Criptografia HTTPS</p>
            <p>Webhooks e idempotência</p>
            <p>Monitoramento de processamento</p>
          </article>
        </div>
        <div className="security-stats">
          <span>
            <b>100%</b> decisões rastreáveis
          </span>
          <span>
            <b>1 linha</b> do tempo auditável
          </span>
          <span>
            <b>24/7</b> operação monitorada
          </span>
          <span>
            <b>LGPD</b> governança de acesso
          </span>
        </div>
      </section>

      <section className="ecosystem" id="plataforma">
        <div className="ecosystem-heading">
          <p className="eyebrow">
            <span /> Ecossistema conectado
          </p>
          <h2>O contrato nasce estruturado.</h2>
          <p>
            Muito antes da primeira minuta, a demanda nasce com as informações
            que sustentam toda a execução futura.
          </p>
        </div>
        <div className="ecosystem-layout">
          <figure className="ecosystem-visual">
            <img
              src="/media/showcase/dratos-platform-structured.webp"
              alt="Fluxo conceitual de dados de ERP, APIs, formulários e requisições sendo estruturados pela plataforma DRATOS"
              loading="lazy"
            />
            <figcaption>
              <span>ERP</span>
              <span>TOTVS RM</span>
              <b>CONTRATO ESTRUTURADO</b>
              <span>FORMULÁRIOS</span>
              <span>APIs</span>
            </figcaption>
          </figure>
          <div className="ecosystem-points">
            <article>
              <i>1</i>
              <div>
                <h3>Zero Redigitação</h3>
                <p>Integração nativa com ERP (TOTVS RM), APIs e formulários.</p>
              </div>
            </article>
            <article>
              <i>2</i>
              <div>
                <h3>Matrizes Contratuais</h3>
                <p>
                  Regras de encaminhamento transformam dados aprovados em
                  documentos consistentes.
                </p>
              </div>
            </article>
            <article>
              <i>3</i>
              <div>
                <h3>Playbooks Dinâmicos</h3>
                <p>
                  O conhecimento jurídico — LGPD, SLA e Anticorrupção — torna-se
                  padrão institucional operado pela ponta.
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="audit-section" id="rastreabilidade">
        <div className="audit-backdrop" aria-hidden="true" />
        <div className="audit-copy">
          <p className="eyebrow">
            <span /> Dossiê e decisão
          </p>
          <h2>
            Cada contrato deixa
            <br />
            <em>uma história verificável.</em>
          </h2>
          <p>
            Documentos, decisões, aprovações e evidências convergem em uma linha
            do tempo única — pronta para auditoria e para a próxima decisão.
          </p>
        </div>
        <figure className="traceability-visual">
          <img
            src="/media/showcase/dratos-traceability.webp"
            alt="Linha do tempo conceitual da rastreabilidade contratual, da requisição ao evento posterior, com autoria, aprovações e evidências"
            loading="lazy"
          />
          <figcaption>
            {[
              "Requisição",
              "Autoria / versão",
              "Negociação",
              "Aprovação",
              "Assinatura",
              "Obrigação / execução",
              "Evento posterior",
            ].map((stage) => (
              <span key={stage}>{stage}</span>
            ))}
          </figcaption>
        </figure>
        <div className="audit-points">
          <span>Documentos centralizados e versões preservadas</span>
          <span>Comentários, tarefas e contrapartes vinculados</span>
          <span>Aprovações, histórico e decisões registrados</span>
        </div>
      </section>

      <section className="final">
        <img src="/brand/dratos-elemento.png" alt="" />
        <p className="eyebrow">
          <span /> DRATOS
        </p>
        <h2>
          Contratos inteligentes.
          <br />
          <em>Decisões governadas.</em>
        </h2>
        <p>
          Transforme a operação contratual em uma fonte contínua de
          inteligência, transparência e performance.
        </p>
        <button className="button light" onClick={() => setDemo(true)}>
          Agendar uma demonstração <b>↗</b>
        </button>
      </section>
      <footer className="enterprise-footer">
        <div className="footer-brand">
          <img src="/brand/dratos-logo.png" alt="DRATOS" />
          <p>
            Governança contratual inteligente para operações que exigem
            contexto, controle e evidência.
          </p>
          <div className="footer-seals">
            <span>LGPD</span>
            <span>RBAC</span>
            <span>Trilha auditável</span>
          </div>
        </div>
        <div>
          <b>Plataforma</b>
          <a href="#plataforma">Visão geral</a>
          <a href="#due-diligence">Due Diligence</a>
          <a href="#performance">Performance</a>
          <a href="#dashboard">Dashboard</a>
          <a href="#rastreabilidade">Rastreabilidade</a>
          <a href="#seguranca">Segurança e governança</a>
        </div>
        <div>
          <b>Privacidade e políticas</b>
          <p>
            Tratamento de dados orientado por finalidade, necessidade, controle
            de acesso e rastreabilidade.
          </p>
          <a href="mailto:contato@dratos.com.br?subject=Solicitação%20da%20Política%20de%20Privacidade%20DRATOS">
            Política de Privacidade ↗
          </a>
          <a href="mailto:contato@dratos.com.br?subject=Solicitação%20da%20Política%20de%20Segurança%20DRATOS">
            Política de Segurança ↗
          </a>
          <a href="mailto:contato@dratos.com.br?subject=Solicitação%20dos%20Termos%20de%20Uso%20DRATOS">
            Termos de Uso ↗
          </a>
        </div>
        <div>
          <b>Fale conosco</b>
          <p>
            Converse com nossa equipe sobre seu cenário contratual, integrações
            e prioridades.
          </p>
          <a href="mailto:contato@dratos.com.br">contato@dratos.com.br</a>
          <a href="https://www.dratos.com.br">www.dratos.com.br</a>
          <button onClick={() => setDemo(true)}>Agendar demonstração ↗</button>
        </div>
        <small>
          © 2026 DRATOS · Infinita-IA Labs. Todos os direitos reservados.
        </small>
      </footer>

      {player && (
        <div
          className="modal"
          role="dialog"
          aria-modal="true"
          aria-label="Vídeo institucional DRATOS"
          onClick={() => setPlayer(false)}
        >
          <button
            className="close"
            onClick={() => setPlayer(false)}
            aria-label="Fechar vídeo"
          >
            ×
          </button>
          <div className="player-shell" onClick={(e) => e.stopPropagation()}>
            <div className="video-stage">
              <video
                ref={videoRef}
                controls
                autoPlay
                playsInline
                preload="metadata"
                poster="/media/dratos-video-capa-inicial.png"
                onTimeUpdate={trackVideo}
                onError={() => setVideoError(true)}
              >
                <source src="/media/VID.mp4?v=20260821" type="video/mp4" />
              </video>
              {videoError && (
                <div className="video-error" role="alert">
                  <b>Não foi possível iniciar o vídeo automaticamente.</b>
                  <span>Abra o arquivo diretamente ou tente novamente.</span>
                  <a
                    href="/media/VID.mp4?v=20260821"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Abrir vídeo diretamente ↗
                  </a>
                </div>
              )}
              <div
                className={transition ? "transition-fx show" : "transition-fx"}
                aria-hidden="true"
              >
                <i />
                <b />
                <span />
              </div>
              <div
                className={
                  transition ? "chapter-overlay show" : "chapter-overlay"
                }
              >
                <small>CAPÍTULO {chapters[chapter].index}</small>
                <strong>{chapters[chapter].label}</strong>
                <span />
              </div>
            </div>
          </div>
        </div>
      )}
      {demo && (
        <div
          className="modal demo-modal"
          role="dialog"
          aria-modal="true"
          aria-label="Agendar demonstração DRATOS"
          onClick={() => setDemo(false)}
        >
          <button
            className="close"
            onClick={() => setDemo(false)}
            aria-label="Fechar formulário"
          >
            ×
          </button>
          <div className="demo-shell" onClick={(e) => e.stopPropagation()}>
            <div className="demo-intro">
              <p className="eyebrow">
                <span /> Demonstração personalizada
              </p>
              <h2>Veja a DRATOS aplicada à sua operação.</h2>
              <p>
                Conte-nos um pouco sobre sua empresa. Nossa equipe preparará uma
                conversa objetiva, orientada aos seus contratos, integrações e
                prioridades.
              </p>
              <div className="demo-points">
                <span>✓ 30 minutos</span>
                <span>✓ Sem compromisso</span>
                <span>✓ Cenário personalizado</span>
              </div>
            </div>
            <form onSubmit={requestDemo}>
              <div className="form-row">
                <label>
                  Nome completo
                  <input
                    name="nome"
                    required
                    autoComplete="name"
                    placeholder="Como podemos chamar você?"
                  />
                </label>
                <label>
                  Empresa
                  <input
                    name="empresa"
                    required
                    autoComplete="organization"
                    placeholder="Nome da organização"
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  E-mail corporativo
                  <input
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    placeholder="voce@empresa.com.br"
                  />
                </label>
                <label>
                  Telefone / WhatsApp
                  <input
                    name="telefone"
                    required
                    autoComplete="tel"
                    placeholder="(19) 99999-9999"
                  />
                </label>
              </div>
              <label>
                Principal interesse
                <select name="interesse" required defaultValue="">
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  <option>Gestão completa do ciclo contratual</option>
                  <option>RiskAI e análise de riscos</option>
                  <option>Obrigações e performance</option>
                  <option>Integração com TOTVS</option>
                  <option>Parceria estratégica</option>
                </select>
              </label>
              <div className="form-row">
                <label>
                  Data preferida
                  <input name="data" type="date" required />
                </label>
                <label>
                  Horário preferido
                  <select name="horario" required defaultValue="">
                    <option value="" disabled>
                      Selecione
                    </option>
                    <option>09h às 12h</option>
                    <option>14h às 17h</option>
                    <option>Após 17h</option>
                  </select>
                </label>
              </div>
              <label>
                Contexto ou desafio atual
                <textarea
                  name="mensagem"
                  rows={3}
                  placeholder="Ex.: volume de contratos, principais dificuldades ou resultado esperado."
                />
              </label>
              <label className="form-honeypot" aria-hidden="true">
                Website
                <input name="website" tabIndex={-1} autoComplete="off" />
              </label>
              <button className="button primary form-submit" type="submit" disabled={submittingDemo}>
                {submittingDemo ? "Enviando..." : "Enviar solicitação"} <b>{submittingDemo ? "" : "↗"}</b>
              </button>
              {demoStatus && (
                <p className={`form-status ${demoStatus.type}`} role="status" aria-live="polite">
                  {demoStatus.message}
                </p>
              )}
              <small className="privacy-note">
                Seus dados serão usados exclusivamente para responder a esta solicitação.
              </small>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
