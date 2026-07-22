(function () {
  const app = document.querySelector("#app");
  const modalRoot = document.querySelector("#modal-root");
  const toastRoot = document.querySelector("#toast-root");
  let lastFocusedElement = null;

  const icon = (name) => {
    const paths = {
      arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
      play: '<path d="m9 7 8 5-8 5V7Z"/>',
      sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
      moon: '<path d="M20.5 14.2A8.5 8.5 0 0 1 9.8 3.5 8.5 8.5 0 1 0 20.5 14.2Z"/>',
      menu: '<path d="M4 7h16M4 12h16M4 17h16"/>',
      close: '<path d="m6 6 12 12M18 6 6 18"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      shield: '<path d="M12 3 5 6v5c0 4.6 2.9 8 7 10 4.1-2 7-5.4 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-5"/>',
      chart: '<path d="M4 19V9m6 10V5m6 14v-7m4 7H2"/>',
      database: '<ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v6c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 11v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6"/>',
      document: '<path d="M7 3h7l4 4v14H7V3Z"/><path d="M14 3v5h5M10 12h5m-5 4h5"/>',
      spark: '<path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/>',
      link: '<path d="M10 13a5 5 0 0 0 7.5.5l2-2a5 5 0 0 0-7-7l-1.1 1.1"/><path d="M14 11a5 5 0 0 0-7.5-.5l-2 2a5 5 0 0 0 7 7l1.1-1.1"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>'
    };
    return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.spark}</svg>`;
  };

  const button = (label, className = "btn btn-primary", attrs = "") => `<button class="${className}" ${attrs}><span>${label}</span>${icon("arrow")}</button>`;
  const chips = (items, className = "") => `<div class="chip-list ${className}">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
  const layerHeading = (section, align = "") => `<div class="layer-heading ${align} reveal"><div class="layer-kicker"><span>${section.layer}</span><p>${section.eyebrow}</p></div><h2>${section.title}</h2>${section.text ? `<p class="layer-lead">${section.text}</p>` : ""}</div>`;
  const frame = (src, alt, className = "", eager = false) => `<figure class="cinematic-frame ${className} reveal"><img src="${src}" alt="${alt}" width="1280" height="720" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'}><span class="frame-grid" aria-hidden="true"></span><span class="frame-glow" aria-hidden="true"></span></figure>`;
  const flow = (items, className = "flow-line") => `<div class="${className}">${items.map((item, index) => `<span><i>${String(index + 1).padStart(2, "0")}</i><b>${item}</b></span>`).join("")}</div>`;
  const logo = (c, light = false) => `<a class="brand ${light ? "brand-light" : ""}" href="#top" aria-label="${c.visual.brand}"><img src="${c.assets.logo}" alt="${c.visual.brand}" width="174" height="34"><span>${c.visual.descriptor}</span></a>`;

  function riskCheckDetail(check) {
    const labels = DratosContent.get().ui.riskDetail;
    return `<div class="risk-detail-head"><span class="risk-severity">${check.severity}</span><strong>${check.state}</strong></div>
      <blockquote>${check.excerpt}</blockquote>
      <dl><div><dt>${labels.rule}</dt><dd>${check.rule}</dd></div><div><dt>${labels.reason}</dt><dd>${check.reason}</dd></div><div><dt>${labels.action}</dt><dd>${check.action}</dd></div><div><dt>${labels.owner}</dt><dd>${check.owner}</dd></div></dl>`;
  }

  function aiResult(result, demoLabel) {
    const max = Math.max(...result.values.map((item) => item.value), 1);
    let visualization = "";
    if (result.type === "line") {
      const points = result.values.map((item, index) => `${18 + (index * 164) / Math.max(result.values.length - 1, 1)},${104 - (item.value / max) * 76}`).join(" ");
      visualization = `<div class="ai-line-chart"><svg viewBox="0 0 200 118" role="img" aria-label="${result.title}"><path d="M18 104H184"/><polyline points="${points}"/>${result.values.map((item, index) => `<circle cx="${18 + (index * 164) / Math.max(result.values.length - 1, 1)}" cy="${104 - (item.value / max) * 76}" r="3"/>`).join("")}</svg><div style="--columns:${result.values.length}">${result.values.map((item) => `<span>${item.label}<b>${item.value}</b></span>`).join("")}</div></div>`;
    } else if (result.type === "bars") {
      visualization = `<div class="ai-bars">${result.values.map((item) => `<div><i style="--value:${(item.value / max) * 100}%"></i><span>${item.label}</span><b>${item.value}</b></div>`).join("")}</div>`;
    } else {
      visualization = `<div class="ai-rows ${result.type}">${result.values.map((item, index) => `<div><span>${String(index + 1).padStart(2, "0")}</span><b>${item.label}</b><em>${item.value}</em></div>`).join("")}</div>`;
    }
    return `<div class="ai-result-head"><div><small>${demoLabel}</small><h3>${result.title}</h3><p>${result.summary}</p></div><span>${icon("chart")}</span></div>${visualization}`;
  }

  function render() {
    const c = DratosContent.get();
    const theme = DratosContent.getTheme();
    const firstCheck = c.riskAI.checks[0];
    const firstResult = c.quickAI.results[0];

    app.innerHTML = `
      <header class="site-header" data-header>
        <div class="container header-inner">
          ${logo(c)}
          <nav id="site-nav" aria-label="${c.accessibility.primaryNavigation}">${c.nav.map(([label, id]) => `<a href="#${id}">${label}</a>`).join("")}</nav>
          <div class="header-tools">
            <button class="icon-btn" type="button" data-theme-toggle aria-label="${c.accessibility.toggleTheme}">${icon(theme === "dark" ? "sun" : "moon")}</button>
            <button class="btn btn-primary btn-header" type="button" data-demo>${c.actions.demo}</button>
            <button class="icon-btn menu-btn" type="button" data-menu aria-expanded="false" aria-controls="site-nav" aria-label="${c.accessibility.openMenu}">${icon("menu")}</button>
          </div>
        </div>
      </header>

      <aside class="layer-progress" aria-label="${c.accessibility.layerNavigation}"><span data-layer-current>01</span><i></i><small>20</small></aside>

      <main id="main-content">
        <section class="layer hero-layer" id="top" data-layer="01">
          <img class="hero-watermark" src="${c.assets.element}" alt="" width="700" height="700">
          <div class="hero-ambient" aria-hidden="true"></div>
          <div class="container hero-grid">
            <div class="hero-copy reveal">
              <div class="layer-kicker"><span>${c.hero.layer}</span><p>${c.hero.eyebrow}</p></div>
              <h1>${c.hero.title}</h1>
              <p class="hero-lead">${c.hero.text}</p>
              <div class="actions">
                ${button(c.actions.platform, "btn btn-primary", 'type="button" data-scroll="plataforma"')}
                <button class="btn btn-ghost" type="button" data-video-complete>${icon("play")}<span>${c.actions.presentation}</span></button>
                ${button(c.actions.demo, "btn btn-outline", 'type="button" data-demo')}
              </div>
              <p class="hero-statement">${c.hero.statement}</p>
              ${chips(c.hero.signals, "hero-signals")}
            </div>
            <div class="hero-media reveal">
              ${frame(c.assets.frames.hero, c.hero.title, "hero-frame", true)}
              <button class="hero-play" type="button" data-video-complete aria-label="${c.accessibility.playVideo}"><i>${icon("play")}</i><span><small>${c.institutional.duration}</small><b>${c.actions.presentation}</b></span></button>
              <div class="hero-console">
                <div class="console-top"><span></span><span></span><span></span><b>${c.hero.panel.label}</b></div>
                <div class="console-metrics">${c.hero.panel.metrics.map((metric) => `<article><small>${metric.label}</small><strong>${metric.value}</strong></article>`).join("")}</div>
                <div class="console-flow">${c.hero.panel.stages.map((stage, index) => `<span class="${index < 3 ? "done" : ""}"><i>${index + 1}</i>${stage}</span>`).join("")}</div>
              </div>
            </div>
          </div>
          <a class="scroll-cue" href="#dor"><span>${c.actions.explore}</span><i></i></a>
        </section>

        <section class="layer problem-layer" id="dor" data-layer="02">
          <div class="container problem-layout">
            <div>${layerHeading(c.problem)}<div class="cause-chain reveal">${c.problem.chain.map((item, index) => `<span><i>${index + 1}</i>${item}</span>`).join("")}</div></div>
            <div class="rupture-network reveal">${c.problem.ruptures.map((item, index) => `<article style="--i:${index}"><span>0${index + 1}</span><i>${icon(index === 0 ? "document" : index === 1 ? "shield" : index === 2 ? "clock" : "chart")}</i><h3>${item.title}</h3><p>${item.text}</p></article>`).join("")}<div class="network-core"><b>DRATOS</b><small>${c.visual.stageLabel}</small></div></div>
          </div>
        </section>

        <section class="layer transformation-layer" id="plataforma" data-layer="03">
          <div class="container">
            ${layerHeading(c.transformation, "center")}
            <div class="journey-stage reveal">
              ${frame(c.assets.frames.journey, c.transformation.title, "journey-frame")}
              <div class="journey-ribbon">${c.transformation.stages.map((stage, index) => `<span><i>${String(index + 1).padStart(2, "0")}</i><b>${stage}</b></span>`).join("")}</div>
            </div>
          </div>
        </section>

        <section class="layer sources-layer" id="fontes" data-layer="04">
          <div class="container sources-layout">
            <div>${layerHeading(c.sources)}<div class="source-outcome reveal">${c.sources.outcome.map((item) => `<span>${icon("arrow")}<b>${item}</b></span>`).join("")}</div></div>
            <div class="connector-map reveal"><div class="connector-core"><img src="${c.assets.element}" alt="" width="88" height="88"><b>${c.visual.brand}</b></div>${c.sources.items.map((item, index) => `<span style="--i:${index}"><i>${icon(index % 2 ? "link" : "database")}</i><b>${item}</b></span>`).join("")}</div>
          </div>
        </section>

        <section class="layer feature-layer requisition-layer" id="jornada" data-layer="05">
          <div class="container feature-split">
            <div class="feature-copy">${layerHeading(c.requisition)}${chips(c.requisition.fields, "field-cloud")}<p class="feature-proof">${c.requisition.proof}</p></div>
            <div class="feature-media">${frame(c.assets.frames.requisition, c.requisition.title, "feature-frame")}<div class="request-card reveal">${c.requisition.fields.slice(0, 6).map((field, index) => `<span><i class="${index < 4 ? "ready" : ""}"></i>${field}</span>`).join("")}</div></div>
          </div>
        </section>

        <section class="layer feature-layer authoring-layer" id="autoria" data-layer="06">
          <div class="container feature-split reverse">
            <div class="feature-media">${frame(c.assets.frames.authoring, c.authoring.title, "feature-frame")}<div class="document-stack reveal"><span>v1</span><span>v2</span><span>v3</span><b>${c.visual.brand}</b></div></div>
            <div class="feature-copy">${layerHeading(c.authoring)}${flow(c.authoring.flow, "compact-flow")}${chips(c.authoring.items)}</div>
          </div>
        </section>

        <section class="layer feature-layer library-layer" id="biblioteca" data-layer="07">
          <div class="container feature-split">
            <div class="feature-copy">${layerHeading(c.library)}${chips(c.library.items)}<div class="clause-stack reveal">${c.library.clauses.map((clause, index) => `<button type="button" tabindex="-1" style="--i:${index}"><span>${icon("document")}</span><b>${clause}</b><i>${icon("arrow")}</i></button>`).join("")}</div></div>
            <div class="feature-media">${frame(c.assets.frames.library, c.library.title, "feature-frame tall-frame")}<div class="clause-target"><span>${icon("check")}</span><b>${c.library.clauses[0]}</b></div></div>
          </div>
        </section>

        <section class="layer risk-layer" id="riskai" data-layer="08">
          <div class="risk-aurora" aria-hidden="true"></div>
          <div class="container">
            ${layerHeading(c.riskAI)}
            <div class="risk-layout reveal">
              <div class="risk-summary"><div class="risk-brand"><span>${icon("spark")}</span><b>${c.visual.riskLabel}</b><small>${c.ui.assistedAnalysis}</small></div>${chips(c.riskAI.insights, "risk-insights")}<p>${c.riskAI.governance}</p></div>
              <div class="risk-checks"><div class="risk-check-list" role="tablist" aria-label="${c.riskAI.title}">${c.riskAI.checks.map((check, index) => `<button type="button" role="tab" aria-selected="${index === 0}" class="${index === 0 ? "active" : ""}" data-risk-check="${index}"><span>${check.severity}</span><b>${check.name}</b><em>${check.state}</em></button>`).join("")}</div><div class="risk-detail" role="tabpanel" tabindex="0" data-risk-detail>${riskCheckDetail(firstCheck)}</div></div>
            </div>
          </div>
        </section>

        <section class="layer legal-layer" id="sala-juridica" data-layer="09">
          <div class="container legal-layout">
            <div>${layerHeading(c.legalRoom)}${chips(c.legalRoom.participants, "participant-list")}${frame(c.assets.frames.legalRoom, c.legalRoom.title, "legal-frame")}</div>
            <div class="legal-workspace reveal"><div class="legal-document"><span>${c.visual.brand} / ${c.ui.contractLabel}</span>${Array.from({ length: 10 }, (_, index) => `<i class="${index === 4 ? "flagged" : ""}"></i>`).join("")}<div class="risk-inline">${icon("spark")}<b>${c.visual.riskLabel}</b><small>${c.riskAI.checks[2].state}</small></div></div><div class="legal-events">${c.legalRoom.events.map((event, index) => `<span><i>${index + 1}</i><b>${event}</b></span>`).join("")}</div></div>
          </div>
        </section>

        <section class="layer diligence-layer" id="due-diligence" data-layer="10">
          <div class="container">
            ${layerHeading(c.dueDiligence, "center")}
            <div class="diligence-showcase reveal">${frame(c.assets.frames.diligence, c.dueDiligence.title, "diligence-frame")}<div class="diligence-modes">${c.dueDiligence.modes.map((mode, index) => `<article><span>0${index + 1}</span><h3>${mode.name}</h3><p>${mode.text}</p></article>`).join("")}</div></div>
            ${chips(c.dueDiligence.items, "diligence-tags")}<p class="section-disclaimer">${c.dueDiligence.disclaimer}</p>
          </div>
        </section>

        <section class="layer approval-layer" id="aprovacao" data-layer="11">
          <div class="container approval-layout"><div>${layerHeading(c.approval)}${chips(c.approval.items)}</div><div class="approval-flow reveal">${c.approval.flow.map((item, index) => `<article class="${index === c.approval.flow.length - 1 ? "complete" : ""}"><span>${index < c.approval.flow.length - 1 ? icon("check") : icon("document")}</span><div><small>${c.ui.stepLabel} ${String(index + 1).padStart(2, "0")}</small><b>${item}</b></div><i>${icon("arrow")}</i></article>`).join("")}</div></div>
        </section>

        <section class="layer obligations-layer" id="obrigacoes" data-layer="12">
          <div class="container obligations-layout"><div>${layerHeading(c.obligations)}${chips(c.obligations.items, "obligation-cloud")}</div><div class="obligation-panel reveal"><div class="obligation-orbit"><span>${icon("document")}</span>${c.obligations.items.slice(0, 6).map((item, index) => `<i style="--i:${index}"><b>${item}</b></i>`).join("")}</div><div class="obligation-timeline">${c.obligations.timeline.map((item, index) => `<span><i class="${index === 0 ? "active" : ""}"></i><b>${item}</b></span>`).join("")}</div></div></div>
        </section>

        <section class="layer performance-layer" id="performance" data-layer="13">
          <div class="container performance-layout">
            <div class="performance-media">${frame(c.assets.frames.performance, c.performance.title, "performance-frame")}<div class="score-card reveal"><strong>${c.performance.metrics[0].value}</strong><span>★★★★★</span><small>${c.performance.metrics[0].label}</small></div></div>
            <div class="performance-copy">${layerHeading(c.performance)}<div class="metric-list reveal">${c.performance.metrics.map((metric) => `<article><div><b>${metric.label}</b><span>${metric.value} <small>${metric.unit}</small></span></div><i><em style="--progress:${metric.progress}%"></em></i></article>`).join("")}</div>${chips(c.performance.models, "model-list")}${chips(c.performance.values, "value-list")}<p class="section-disclaimer">${c.performance.disclaimer}</p></div>
          </div>
        </section>

        <section class="layer quick-ai-layer" id="consulta" data-layer="14">
          <div class="container">
            ${layerHeading(c.quickAI)}
            <div class="quick-ai-layout reveal"><div class="query-panel"><div class="query-label">${icon("search")}<span>${c.visual.riskLabel} / ${c.ui.queryLabel}</span></div><div class="query-list" role="tablist">${c.quickAI.questions.map((question, index) => `<button type="button" role="tab" aria-selected="${index === 0}" class="${index === 0 ? "active" : ""}" data-ai-query="${index}"><span>${String(index + 1).padStart(2, "0")}</span><b>${question}</b></button>`).join("")}</div><p>${c.quickAI.disclaimer}</p></div><div class="ai-result" role="tabpanel" tabindex="0" data-ai-result>${aiResult(firstResult, c.visual.demoLabel)}</div></div>
          </div>
        </section>

        <section class="layer dossier-layer" id="dossie" data-layer="15">
          <div class="container dossier-layout"><div>${layerHeading(c.dossier)}${frame(c.assets.frames.dossier, c.dossier.title, "dossier-frame")}</div><div class="dossier-convergence reveal"><div class="dossier-core"><img src="${c.assets.element}" alt="" width="108" height="108"><b>${c.ui.dossierLabel}</b><small>${c.ui.auditableLabel}</small></div>${c.dossier.items.map((item, index) => `<span style="--i:${index}"><i></i><b>${item}</b></span>`).join("")}</div></div>
        </section>

        <section class="layer dashboard-layer" id="dashboard" data-layer="16">
          <div class="container">
            ${layerHeading(c.dashboard)}
            <div class="executive-board reveal"><div class="board-media">${frame(c.assets.frames.dashboard, c.dashboard.title, "dashboard-frame")}<div class="dashboard-kpis">${c.dashboard.kpis.map((kpi) => `<article><small>${kpi.label}</small><strong>${kpi.value}</strong><em>${kpi.delta}</em></article>`).join("")}</div></div><div class="board-side"><div class="dimension-list">${c.dashboard.dimensions.map((item) => `<span>${item}<i>${icon("arrow")}</i></span>`).join("")}</div><div class="risk-prompt"><span>${icon("spark")}</span><b>${c.dashboard.riskPrompt}</b>${c.dashboard.riskAnswer.map((item) => `<small>${item}</small>`).join("")}</div><p>${c.dashboard.disclaimer}</p></div></div>
          </div>
        </section>

        <section class="layer security-layer" id="seguranca" data-layer="17">
          <div class="container">
            ${layerHeading(c.security, "center")}
            <div class="security-grid reveal">${c.security.groups.map((group, index) => `<article><div><span>${icon(index === 0 ? "shield" : index === 1 ? "document" : "link")}</span><small>${c.ui.layerLabel} 0${index + 1}</small></div><h3>${group.title}</h3>${group.items.map((item) => `<p>${icon("check")}<b>${item}</b></p>`).join("")}</article>`).join("")}</div>
          </div>
        </section>

        <section class="layer integrations-layer" id="integracoes" data-layer="18">
          <div class="container integrations-layout"><div>${layerHeading(c.integrations)}<div class="integration-note"><span>${icon("link")}</span><p>${c.integrations.text}</p></div></div><div class="integration-orbit reveal"><div class="integration-core"><img src="${c.assets.element}" alt="" width="92" height="92"><b>${c.visual.brand}</b></div>${c.integrations.items.map((item, index) => `<article style="--i:${index}"><span>${item.name.slice(0, 2).toUpperCase()}</span><div><b>${item.name}</b><small>${item.type}</small></div></article>`).join("")}</div></div>
        </section>

        <section class="layer institutional-layer" id="video" data-layer="19">
          <div class="container video-layout"><div>${layerHeading(c.institutional)}<div class="video-meta"><span>${icon("clock")}${c.institutional.duration}</span><span>${icon("play")}${c.actions.presentation}</span></div></div><button class="institutional-video reveal" type="button" data-video-complete aria-label="${c.accessibility.playVideo}"><img src="${c.institutional.poster}" alt="" width="1280" height="720" loading="lazy"><span class="video-shade"></span><i>${icon("play")}</i><div><small>${c.institutional.duration}</small><b>${c.institutional.title}</b></div></button></div>
        </section>

        <section class="layer final-layer" id="contato" data-layer="20">
          <img class="final-watermark" src="${c.assets.element}" alt="" width="900" height="900" loading="lazy">
          <div class="container final-content reveal"><div class="layer-kicker"><span>${c.finalCta.layer}</span><p>${c.finalCta.eyebrow}</p></div><img src="${c.assets.logo}" alt="${c.visual.brand}" width="230" height="45" loading="lazy"><h2>${c.finalCta.title}</h2><p>${c.finalCta.text}</p><div class="actions">${button(c.actions.demo, "btn btn-light", 'type="button" data-demo')}${button(c.actions.diagnose, "btn btn-outline-light", 'type="button" data-demo')}<a class="btn btn-outline-light" href="mailto:${c.footer.contact}"><span>${c.actions.contact}</span>${icon("arrow")}</a></div><strong>${c.finalCta.signature}</strong></div>
        </section>
      </main>

      <footer class="site-footer" id="privacidade"><div class="container footer-grid"><div>${logo(c, true)}<p>${c.footer.text}</p></div><div class="footer-links">${c.footer.links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div><div><small>${c.footer.contactLabel}</small><a href="mailto:${c.footer.contact}">${c.footer.contact}</a></div></div><div class="container footer-bottom"><div><span>${c.footer.copyright}</span><p>${c.footer.privacyNote}</p></div><a href="${c.settings.privacyUrl}">${c.footer.privacy}</a></div></footer>`;

    bindEvents();
    observeLayers();
    const initialAnchor = location.hash.slice(1);
    if (initialAnchor) requestAnimationFrame(() => document.getElementById(initialAnchor)?.scrollIntoView());
  }

  function bindEvents() {
    const c = DratosContent.get();
    const menuControl = document.querySelector("[data-menu]");
    const nav = document.querySelector("#site-nav");
    const setMenuState = (open) => {
      nav?.classList.toggle("open", open);
      menuControl?.setAttribute("aria-expanded", String(open));
      menuControl?.setAttribute("aria-label", open ? c.accessibility.closeMenu : c.accessibility.openMenu);
      if (menuControl) menuControl.innerHTML = icon(open ? "close" : "menu");
    };
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      DratosContent.toggleTheme();
      showToast(c.toast.theme);
    });
    menuControl?.addEventListener("click", () => setMenuState(!nav?.classList.contains("open")));
    document.querySelectorAll("#site-nav a").forEach((link) => link.addEventListener("click", () => setMenuState(false)));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && nav?.classList.contains("open") && !modalRoot.querySelector("[role='dialog']")) setMenuState(false);
    });
    document.querySelectorAll("[data-demo]").forEach((element) => element.addEventListener("click", openForm));
    document.querySelectorAll("[data-scroll]").forEach((element) => element.addEventListener("click", () => document.querySelector(`#${element.dataset.scroll}`)?.scrollIntoView({ behavior: "smooth" })));
    document.querySelectorAll("[data-video-complete]").forEach((element) => element.addEventListener("click", openCompleteVideo));
    document.querySelectorAll("[data-risk-check]").forEach((element) => element.addEventListener("click", () => selectRiskCheck(Number(element.dataset.riskCheck))));
    document.querySelectorAll("[data-ai-query]").forEach((element) => element.addEventListener("click", () => selectAiQuery(Number(element.dataset.aiQuery))));
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  function updateHeader() {
    document.querySelector("[data-header]")?.classList.toggle("scrolled", scrollY > 24);
  }

  function observeLayers() {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const reveals = document.querySelectorAll(".reveal");
    if (reduced || !("IntersectionObserver" in window)) {
      reveals.forEach((item) => item.classList.add("visible"));
    } else {
      const revealObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      }), { threshold: 0.08, rootMargin: "0px 0px -8%" });
      reveals.forEach((item) => revealObserver.observe(item));
    }

    if ("IntersectionObserver" in window) {
      const layerObserver = new IntersectionObserver((entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const current = document.querySelector("[data-layer-current]");
          if (current) current.textContent = entry.target.dataset.layer;
        }
      }), { threshold: 0.36 });
      document.querySelectorAll("[data-layer]").forEach((layer) => layerObserver.observe(layer));
    }
  }

  function selectRiskCheck(index) {
    const c = DratosContent.get();
    const check = c.riskAI.checks[index];
    const detail = document.querySelector("[data-risk-detail]");
    if (!check || !detail) return;
    document.querySelectorAll("[data-risk-check]").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
      button.setAttribute("aria-selected", String(buttonIndex === index));
    });
    detail.innerHTML = riskCheckDetail(check);
  }

  function selectAiQuery(index) {
    const c = DratosContent.get();
    const result = c.quickAI.results[index];
    const panel = document.querySelector("[data-ai-result]");
    if (!result || !panel) return;
    document.querySelectorAll("[data-ai-query]").forEach((button, buttonIndex) => {
      button.classList.toggle("active", buttonIndex === index);
      button.setAttribute("aria-selected", String(buttonIndex === index));
    });
    panel.innerHTML = aiResult(result, c.visual.demoLabel);
    showToast(c.toast.query);
  }

  function modalShell(content, label, variant = "") {
    const c = DratosContent.get();
    lastFocusedElement = document.activeElement;
    modalRoot.innerHTML = `<div class="modal-backdrop ${variant}" data-modal-backdrop><section class="modal ${variant}" role="dialog" aria-modal="true" aria-label="${label}"><button type="button" class="modal-close icon-btn" data-modal-close aria-label="${c.accessibility.closeModal}">${icon("close")}</button>${content}</section></div>`;
    document.body.classList.add("modal-open");
    const backdrop = modalRoot.querySelector("[data-modal-backdrop]");
    backdrop.addEventListener("click", (event) => { if (event.target === backdrop) closeModal(); });
    modalRoot.querySelector("[data-modal-close]").addEventListener("click", closeModal);
    document.addEventListener("keydown", modalKeydown);
    requestAnimationFrame(() => modalRoot.querySelector("button, input, select, textarea, video")?.focus());
  }

  function modalKeydown(event) {
    if (event.key === "Escape") closeModal();
    if (event.key !== "Tab") return;
    const focusable = [...modalRoot.querySelectorAll("button:not([disabled]), input, select, textarea, a[href], video[controls]")];
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }

  function closeModal() {
    modalRoot.querySelector("video")?.pause();
    modalRoot.innerHTML = "";
    document.body.classList.remove("modal-open");
    document.removeEventListener("keydown", modalKeydown);
    if (lastFocusedElement instanceof HTMLElement) lastFocusedElement.focus({ preventScroll: true });
    lastFocusedElement = null;
  }

  function openCompleteVideo() {
    const c = DratosContent.get();
    const video = c.institutional;
    modalShell(`<div class="premium-player"><video controls playsinline preload="none" poster="${video.poster}" aria-label="${video.title}" tabindex="0"><source src="${video.video}" type="video/mp4"></video></div>`, video.title, "video-only-modal");
  }

  function fieldMarkup(name, field) {
    const id = `form-${name}`;
    if (name === "privacy") return `<label class="check-field" for="${id}"><input id="${id}" name="${name}" type="checkbox" ${field.required ? "required" : ""}><span>${field.label}</span></label>`;
    if (field.options) return `<label for="${id}"><span>${field.label}${field.required ? " *" : ""}</span><select id="${id}" name="${name}" ${field.required ? "required" : ""}><option value="">${field.placeholder}</option>${field.options.map((option) => `<option>${option}</option>`).join("")}</select></label>`;
    if (name === "challenge") return `<label class="full-field" for="${id}"><span>${field.label} *</span><textarea id="${id}" name="${name}" placeholder="${field.placeholder}" rows="3" required></textarea></label>`;
    const type = name === "email" ? "email" : name === "phone" ? "tel" : "text";
    return `<label for="${id}"><span>${field.label}${field.required ? " *" : ""}</span><input id="${id}" name="${name}" type="${type}" placeholder="${field.placeholder}" ${field.required ? "required" : ""}></label>`;
  }

  function openForm() {
    const c = DratosContent.get();
    modalShell(`<div class="form-modal"><p class="eyebrow">${c.finalCta.eyebrow}</p><h2>${c.form.title}</h2><p>${c.form.text}</p><form id="demo-form" novalidate><div class="form-grid">${Object.entries(c.form.fields).map(([name, field]) => fieldMarkup(name, field)).join("")}</div><div class="form-status" data-form-status role="status"></div>${button(c.actions.send, "btn btn-primary btn-submit", 'type="submit"')}</form></div>`, c.form.title);
    modalRoot.querySelector("#demo-form").addEventListener("submit", submitForm);
  }

  async function submitForm(event) {
    event.preventDefault();
    const c = DratosContent.get();
    const form = event.currentTarget;
    const status = form.querySelector("[data-form-status]");
    if (!form.checkValidity()) {
      status.textContent = c.form.validation;
      status.className = "form-status error";
      form.reportValidity();
      return;
    }
    const payload = Object.fromEntries(new FormData(form).entries());
    payload.privacy = form.elements.privacy.checked;
    payload.locale = "pt-BR";
    payload.createdAt = new Date().toISOString();
    const submit = form.querySelector("[type=submit]");
    submit.disabled = true;
    try {
      if (c.settings.formEndpoint) {
        const response = await fetch(c.settings.formEndpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error("request-failed");
        status.textContent = c.form.sendSuccess;
        status.className = "form-status success";
        form.reset();
      } else {
        location.href = `mailto:${c.settings.mailtoFallback}?subject=${encodeURIComponent(c.form.title)}&body=${encodeURIComponent(JSON.stringify(payload, null, 2))}`;
        status.textContent = c.form.demoSuccess;
        status.className = "form-status success";
      }
    } catch (_) {
      status.textContent = c.form.error;
      status.className = "form-status error";
    } finally {
      submit.disabled = false;
    }
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastRoot.appendChild(toast);
    setTimeout(() => toast.remove(), 2800);
  }

  function updateThemeControl() {
    const control = document.querySelector("[data-theme-toggle]");
    if (control) control.innerHTML = icon(DratosContent.getTheme() === "dark" ? "sun" : "moon");
  }

  window.addEventListener("dratos:theme", updateThemeControl);
  render();
})();
