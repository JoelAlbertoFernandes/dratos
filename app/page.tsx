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

const capabilities = [
  { n:"01", icon:"⌁", title:"Requisição inteligente", text:"Dados, responsáveis, anexos e contexto estruturados desde a origem.", detail:"Formulários e integrações normalizam a demanda antes de ela seguir para análise." },
  { n:"02", icon:"✎", title:"Autoria governada", text:"Modelos, cláusulas e playbooks transformam conhecimento jurídico em padrão.", detail:"Autoria assistida com matrizes, versões e regras institucionais preservadas." },
  { n:"03", icon:"✦", title:"RiskAI explicável", text:"Pontos de atenção, divergências e recomendações com contexto e decisão humana.", detail:"Cada alerta mostra regra, motivo, evidência e ação recomendada." },
  { n:"04", icon:"◫", title:"Sala Jurídica", text:"Interação colaborativa no documento, sem depender de e-mails e mensagens paralelas.", detail:"Comentários por cláusula, anexos, tarefas, justificativas e histórico em um só lugar." },
  { n:"05", icon:"◎", title:"Due Diligence", text:"Dados e evidências do fornecedor antes da negociação e durante a relação.", detail:"Validações cadastrais, certidões, estrutura societária e histórico de performance." },
  { n:"06", icon:"✓", title:"Aprovação e assinatura", text:"Alçadas, justificativas, aprovações e assinatura eletrônica na mesma trilha.", detail:"O fluxo acompanha a versão final e registra quem decidiu, quando e por quê." },
  { n:"07", icon:"◷", title:"Obrigações e SLA", text:"Prazos, responsáveis, reajustes, entregas e evidências deixam de ficar no PDF.", detail:"Alertas preventivos e controle proativo evitam vencimentos e desvios." },
  { n:"08", icon:"↗", title:"Performance contratual", text:"Critérios, pesos e metas mostram o resultado real de cada contrato e fornecedor.", detail:"Scorecards parametrizáveis conectam qualidade, prazo, SLA, custo e ocorrências." },
  { n:"09", icon:"▤", title:"Dossiê auditável", text:"Documentos, decisões e evidências formam uma linha do tempo verificável.", detail:"Histórico consolidado, acesso restrito e trilha append-only para auditoria." },
];

const aiAnswers: Record<string, { value:string; trend:string; note:string; points:number[] }> = {
  performance: { value:"4,8 / 5", trend:"+6,2% no trimestre", note:"SLA em 94%, entregas em 98% e 2 ocorrências abertas.", points:[58,62,68,72,66,79,86,92] },
  risco: { value:"7 contratos", trend:"3 exigem ação hoje", note:"Maior exposição: reajuste, renovação automática e ausência de evidência.", points:[82,74,77,60,66,53,49,44] },
  obrigacoes: { value:"142 abertas", trend:"18 vencem em 15 dias", note:"91% possuem responsável e evidência vinculada.", points:[42,55,51,67,62,73,78,84] },
};

export default function Home() {
  const [menu, setMenu] = useState(false);
  const [player, setPlayer] = useState(false);
  const [demo, setDemo] = useState(false);
  const [chapter, setChapter] = useState(0);
  const [transition, setTransition] = useState(false);
  const [theme, setTheme] = useState<"dark"|"light">("dark");
  const [flipped, setFlipped] = useState<string | null>(null);
  const [question, setQuestion] = useState("Performance de contratos");
  const [answerKey, setAnswerKey] = useState("performance");
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!player && !demo) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [player, demo]);

  useEffect(() => {
    const saved = localStorage.getItem("dratos-theme") as "dark"|"light"|null;
    const initial = saved || (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    setTheme(initial);
    document.documentElement.dataset.theme = initial;
  }, []);

  function toggleTheme() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next); localStorage.setItem("dratos-theme", next); document.documentElement.dataset.theme = next;
  }

  function askRiskAI() {
    const value = question.toLowerCase();
    setAnswerKey(value.includes("risco") ? "risco" : value.includes("obriga") || value.includes("venc") ? "obrigacoes" : "performance");
  }

  function requestDemo(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = "Solicitação de demonstração DRATOS";
    const body = [
      "Olá, equipe DRATOS!",
      "",
      `Nome: ${data.get("nome")}`,
      `Empresa: ${data.get("empresa")}`,
      `E-mail: ${data.get("email")}`,
      `Telefone: ${data.get("telefone")}`,
      `Interesse: ${data.get("interesse")}`,
      `Data preferida: ${data.get("data")}`,
      `Horário preferido: ${data.get("horario")}`,
      "",
      `Contexto: ${data.get("mensagem") || "Não informado"}`,
    ].join("\n");
    window.location.href = `mailto:contato@dratos.com.br?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  function trackVideo() {
    const time = videoRef.current?.currentTime ?? 0;
    let next = 0;
    chapters.forEach((item, i) => { if (time >= item.time) next = i; });
    if (next !== chapter) setChapter(next);
    setTransition(time - chapters[next].time < 2.6);
  }

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#inicio" aria-label="DRATOS — início"><img src="/brand/dratos-logo.png" alt="DRATOS" /></a>
        <nav className={menu ? "open" : ""} aria-label="Navegação principal">
          <a href="#plataforma" onClick={() => setMenu(false)}>Plataforma</a>
          <a href="#jornada" onClick={() => setMenu(false)}>Jornada</a>
          <a href="#riskai" onClick={() => setMenu(false)}>RiskAI</a>
          <a href="#seguranca" onClick={() => setMenu(false)}>Segurança</a>
        </nav>
        <button className="theme-toggle" onClick={toggleTheme} aria-label={`Ativar modo ${theme === "dark" ? "claro" : "escuro"}`}><span>{theme === "dark" ? "☀" : "☾"}</span><b>{theme === "dark" ? "Light" : "Dark"}</b></button>
        <button className="header-cta" onClick={() => setDemo(true)}>Agendar demonstração</button>
        <button className="menu" onClick={() => setMenu(!menu)} aria-label="Abrir menu"><span/><span/></button>
      </header>

      <section className="hero" id="inicio">
        <div className="hero-cinematic-bg" aria-hidden="true" />
        <div className="hero-cinematic-grade" aria-hidden="true" />
        <div className="hero-glow" />
        <div className="hero-copy">
          <p className="eyebrow"><span /> Governança contratual inteligente</p>
          <h1>Do contrato à<br/><em>decisão governada.</em></h1>
          <p className="lead">A DRATOS conecta dados, pessoas, documentos, aprovações, obrigações e performance em uma única jornada — inteligente, rastreável e auditável.</p>
          <div className="hero-actions">
            <a className="button primary" href="#plataforma">Conhecer a plataforma <b>↓</b></a>
            <button className="button secondary" onClick={() => setPlayer(true)}><i>▶</i> Assistir apresentação <small>02:42</small></button>
          </div>
          <div className="trust-row"><span>Contexto preservado</span><span>Decisões rastreáveis</span><span>Performance mensurável</span></div>
        </div>
        <div className="hero-product" aria-label="Visão executiva da plataforma DRATOS">
          <div className="product-top"><span><i/> Dashboard</span><small>PORTFÓLIO · AGOSTO 2026</small></div>
          <div className="kpis">
            <article><small>Contratos ativos</small><strong>1.248</strong><em>+8,4%</em></article>
            <article><small>Obrigações abertas</small><strong>142</strong><em>18 próximas</em></article>
            <article><small>Performance média</small><strong>4,6</strong><em>de 5</em></article>
          </div>
          <div className="dashboard-grid"><div className="chart-card"><div className="chart-head"><div><small>PERFORMANCE CONTRATUAL</small><b>Índice consolidado</b></div><span>6 meses⌄</span></div><div className="chart"><svg viewBox="0 0 600 190" preserveAspectRatio="none"><path d="M0 145 C60 136 75 95 135 105 S220 145 270 87 S360 50 410 76 S520 35 600 28"/><path className="area" d="M0 145 C60 136 75 95 135 105 S220 145 270 87 S360 50 410 76 S520 35 600 28 L600 190 L0 190 Z"/></svg><div className="chart-bars"><i/><i/><i/><i/><i/><i/></div></div></div><div className="mix-card"><small>CARTEIRA POR RISCO</small><div className="donut"><b>1.397</b><span>contratos</span></div><div className="legend"><span><i className="green"/>Baixo 68%</span><span><i className="yellow"/>Médio 24%</span><span><i className="red"/>Alto 8%</span></div></div></div>
          <div className="risk-card"><span>✦</span><div><small>RISKAI · ANÁLISE ATIVA</small><b>3 variações relevantes identificadas</b></div><i>→</i></div>
        </div>
        <a className="scroll" href="#jornada">EXPLORE A JORNADA <span>↓</span></a>
      </section>

      <section className="statement" id="plataforma"><p className="eyebrow"><span/> O problema que a DRATOS resolve</p><h2>Contratos não podem continuar operando como <em>arquivos isolados.</em></h2><p>Quando versões, aprovações e evidências vivem em canais paralelos, a organização perde contexto, velocidade e capacidade de decisão.</p><div className="problem-chain"><span>Dados fragmentados</span><b>→</b><span>Decisões desconectadas</span><b>→</b><span>Risco operacional</span><b>→</b><span>Baixa visibilidade</span></div></section>

      <section className="journey" id="jornada">
        <div className="section-heading"><div><p className="eyebrow"><span/> Uma jornada contínua</p><h2>Do pedido à performance.<br/><em>Sem perder o contexto.</em></h2></div><p>Cada etapa recebe inteligência da anterior e devolve evidências para a próxima.</p></div>
        <div className="capability-grid">{capabilities.map(item => <article key={item.n} className={flipped === item.n ? "flipped" : ""}><div className="card-inner"><div className="card-face card-front"><small>{item.n}</small><div className="cap-icon">{item.icon}</div><h3>{item.title}</h3><p>{item.text}</p><button onClick={()=>setFlipped(item.n)}>Saiba mais →</button></div><div className="card-face card-back"><div className={`card-visual visual-${item.n}`}><span>{item.icon}</span><i/><b/></div><small>{item.n} · EM DETALHE</small><h3>{item.title}</h3><p>{item.detail}</p><button onClick={()=>setFlipped(null)}>← Voltar</button></div></div></article>)}</div>
      </section>

      <section className="ai-section" id="riskai"><div className="ai-copy"><p className="eyebrow"><span/> Inteligência contratual explicável</p><h2>Pergunte à operação.<br/><em>Veja a resposta governada.</em></h2><p>Consulte performance, riscos, obrigações ou qualquer informação disponível na plataforma. A resposta combina indicador, contexto e evidência.</p><div className="ai-query"><label htmlFor="ai-question">O que você quer saber?</label><div><input id="ai-question" value={question} onChange={e=>setQuestion(e.target.value)} onKeyDown={e=>e.key==="Enter"&&askRiskAI()} placeholder="Ex.: Performance de contratos"/><button onClick={askRiskAI}>Perguntar ✦</button></div><p>Experimente: <button onClick={()=>{setQuestion("Quais contratos estão em risco?");setAnswerKey("risco")}}>riscos</button> <button onClick={()=>{setQuestion("Obrigações próximas do vencimento");setAnswerKey("obrigacoes")}}>obrigações</button></p></div></div><div className="answer-dashboard"><div className="risk-head"><div><span>✦</span><b>RiskAI · Resposta executiva</b></div><small>BASE ATUALIZADA · AGORA</small></div><p className="answer-question">“{question}”</p><div className="answer-kpi"><div><small>RESULTADO PRINCIPAL</small><strong>{aiAnswers[answerKey].value}</strong><em>{aiAnswers[answerKey].trend}</em></div><div className="mini-ring"><span>94%</span></div></div><div className="answer-chart"><svg viewBox="0 0 400 120" preserveAspectRatio="none"><polyline points={aiAnswers[answerKey].points.map((p,i)=>`${i*57},${115-p}`).join(" ")}/></svg>{aiAnswers[answerKey].points.map((p,i)=><i key={i} style={{height:`${p}%`}}/>)}</div><p className="answer-note">{aiAnswers[answerKey].note}</p><div className="evidence-row"><span>✓ Evidência vinculada</span><span>✓ Fonte rastreável</span><span>✓ Decisão humana</span></div></div></section>

      <section className="video-section"><div className="video-copy"><p className="eyebrow"><span/> Apresentação institucional</p><h2>Veja a jornada<br/><em>completa.</em></h2><button className="button primary" onClick={() => setPlayer(true)}>Assistir agora <i>▶</i></button></div><button className="poster" onClick={() => setPlayer(true)} aria-label="Assistir ao vídeo institucional"><img src="https://dratos.com.br/assets/video/posters/dratos-apresentacao-completa.webp" alt="Apresentação da plataforma DRATOS"/><span className="poster-shade"/><i className="play">▶</i><div><small>FILME INSTITUCIONAL · 02:42</small><b>Da requisição ao dossiê auditável</b></div></button></section>

      <section className="security" id="seguranca"><div><p className="eyebrow"><span/> Segurança e governança</p><h2>Enterprise by design.<br/>Em todas as camadas.</h2></div><div className="security-grid"><article><span>◎</span><h3>Acesso e identidade</h3><p>RBAC e segregação</p><p>Coligada, filial e centro de custo</p><p>Proteção restrita de rotas</p></article><article><span>◇</span><h3>Evidência e rastreabilidade</h3><p>Trilha append-only</p><p>Versionamento com blindado</p><p>Logs e auditoria perpétuos</p></article><article><span>↻</span><h3>Resiliência operacional</h3><p>Criptografia HTTPS</p><p>Webhooks e idempotência</p><p>Monitoramento de processamento</p></article></div><div className="security-stats"><span><b>100%</b> decisões rastreáveis</span><span><b>1 linha</b> do tempo auditável</span><span><b>24/7</b> operação monitorada</span><span><b>LGPD</b> governança de acesso</span></div></section>

      <section className="ecosystem"><div className="section-heading"><div><p className="eyebrow"><span/> Ecossistema conectado</p><h2>A demanda entra estruturada.<br/><em>O contexto nunca se perde.</em></h2></div><p>Conecte os canais que sua operação já utiliza e devolva dados governados para o negócio.</p></div><div className="integration-flow"><div className="source-list"><span>ERP · TOTVS RM</span><span>Sistema de compras</span><span>Formulários</span><span>APIs e e-mails</span></div><div className="integration-core"><img src="/brand/dratos-elemento.png" alt=""/><b>DRATOS</b><small>Normalizar · Contextualizar · Governar</small></div><div className="destination-list"><span>Jurídico</span><span>Compras</span><span>Financeiro</span><span>Gestão executiva</span></div></div></section>

      <section className="audit-section"><div className="audit-copy"><p className="eyebrow"><span/> Dossiê e decisão</p><h2>Cada contrato deixa<br/><em>uma história verificável.</em></h2><p>Documentos, decisões, aprovações e evidências convergem em uma linha do tempo única — pronta para auditoria e para a próxima decisão.</p><div className="audit-points"><span>Documentos centralizados e versões preservadas</span><span>Comentários, tarefas e contrapartes vinculados</span><span>Aprovações, histórico e registro das decisões</span></div></div><div className="timeline-card"><header><b>Dossiê auditável</b><small>Contrato #2026-0148</small></header>{["Criação e autoria governada","Revisão RiskAI concluída","Aprovação jurídica registrada","Assinatura eletrônica concluída","Performance atualizada: 4,8/5"].map((x,i)=><div key={x}><i>{i+1}</i><span><b>{x}</b><small>{i===4 ? "Hoje · evidência atual" : `${12+i*3} AGO · trilha preservada`}</small></span></div>)}</div></section>

      <section className="final"><img src="/brand/dratos-elemento.png" alt=""/><p className="eyebrow"><span/> DRATOS</p><h2>Contratos inteligentes.<br/><em>Decisões governadas.</em></h2><p>Transforme a operação contratual em uma fonte contínua de inteligência, transparência e performance.</p><button className="button light" onClick={() => setDemo(true)}>Agendar uma demonstração <b>↗</b></button><a className="email" href="mailto:contato@dratos.com.br">contato@dratos.com.br</a></section>
      <footer><img src="/brand/dratos-logo.png" alt="DRATOS"/><p>Governança contratual inteligente.</p><span>© 2026 DRATOS · Infinita-IA Labs</span></footer>

      {player && <div className="modal" role="dialog" aria-modal="true" aria-label="Vídeo institucional DRATOS" onClick={() => setPlayer(false)}><button className="close" onClick={() => setPlayer(false)} aria-label="Fechar vídeo">×</button><div className="player-shell" onClick={e => e.stopPropagation()}><div className="video-stage"><video ref={videoRef} controls autoPlay playsInline poster="https://dratos.com.br/assets/video/posters/dratos-apresentacao-completa.webp" onTimeUpdate={trackVideo}><source src="https://dratos.com.br/assets/video/dratos-apresentacao-completa.mp4" type="video/mp4"/></video><div className={transition ? "transition-fx show" : "transition-fx"} aria-hidden="true"><i/><b/><span/></div><div className={transition ? "chapter-overlay show" : "chapter-overlay"}><small>CAPÍTULO {chapters[chapter].index}</small><strong>{chapters[chapter].label}</strong><span/></div></div><div className="chapter-nav">{chapters.map((item,i)=><button key={item.time} className={i===chapter?"active":""} onClick={()=>{if(videoRef.current){videoRef.current.currentTime=item.time;videoRef.current.play();}}}><small>{item.index}</small><span>{item.label}</span></button>)}</div></div></div>}
      {demo && <div className="modal demo-modal" role="dialog" aria-modal="true" aria-label="Agendar demonstração DRATOS" onClick={() => setDemo(false)}><button className="close" onClick={() => setDemo(false)} aria-label="Fechar formulário">×</button><div className="demo-shell" onClick={e => e.stopPropagation()}><div className="demo-intro"><p className="eyebrow"><span/> Demonstração personalizada</p><h2>Veja a DRATOS aplicada à sua operação.</h2><p>Conte-nos um pouco sobre sua empresa. Nossa equipe preparará uma conversa objetiva, orientada aos seus contratos, integrações e prioridades.</p><div className="demo-points"><span>✓ 30 minutos</span><span>✓ Sem compromisso</span><span>✓ Cenário personalizado</span></div></div><form onSubmit={requestDemo}><div className="form-row"><label>Nome completo<input name="nome" required autoComplete="name" placeholder="Como podemos chamar você?"/></label><label>Empresa<input name="empresa" required autoComplete="organization" placeholder="Nome da organização"/></label></div><div className="form-row"><label>E-mail corporativo<input name="email" type="email" required autoComplete="email" placeholder="voce@empresa.com.br"/></label><label>Telefone / WhatsApp<input name="telefone" required autoComplete="tel" placeholder="(19) 99999-9999"/></label></div><label>Principal interesse<select name="interesse" required defaultValue=""><option value="" disabled>Selecione uma opção</option><option>Gestão completa do ciclo contratual</option><option>RiskAI e análise de riscos</option><option>Obrigações e performance</option><option>Integração com TOTVS</option><option>Parceria estratégica</option></select></label><div className="form-row"><label>Data preferida<input name="data" type="date" required/></label><label>Horário preferido<select name="horario" required defaultValue=""><option value="" disabled>Selecione</option><option>09h às 12h</option><option>14h às 17h</option><option>Após 17h</option></select></label></div><label>Contexto ou desafio atual<textarea name="mensagem" rows={3} placeholder="Ex.: volume de contratos, principais dificuldades ou resultado esperado."/></label><button className="button primary form-submit" type="submit">Preparar solicitação <b>↗</b></button><small className="privacy-note">Ao continuar, seu aplicativo de e-mail abrirá com a solicitação pronta para envio à DRATOS.</small></form></div></div>}
    </main>
  );
}
