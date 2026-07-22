(function () {
  const app = document.querySelector("#app");
  const modalRoot = document.querySelector("#modal-root");
  const toastRoot = document.querySelector("#toast-root");
  let activeModule = 0;
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
      spark: '<path d="m12 2 1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2Z"/><path d="m19 15 .7 2.3L22 18l-2.3.7L19 21l-.7-2.3L16 18l2.3-.7L19 15Z"/>'
    };
    return `<svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">${paths[name] || paths.spark}</svg>`;
  };

  const button = (label, className = "btn btn-primary", attrs = "") => `<button class="${className}" ${attrs}><span>${label}</span>${icon("arrow")}</button>`;
  const heading = (section, center = false) => `<div class="section-heading${center ? " center" : ""} reveal"><p class="eyebrow">${section.eyebrow}</p><h2>${section.title}</h2>${section.text ? `<p class="lead">${section.text}</p>` : ""}</div>`;
  const tags = (items, className = "tag-list") => `<div class="${className}">${items.map((item) => `<span>${item}</span>`).join("")}</div>`;
  const logo = (c, light = false) => `<a class="brand${light ? " brand-light" : ""}" href="#top" aria-label="${c.visual.brand}"><img src="${c.assets.logo}" alt="${c.visual.brand}" width="174" height="34"><span>${c.header.descriptor}</span></a>`;
  const videoPreview = (c, sceneIndex, className = "") => {
    if (sceneIndex === null || sceneIndex === undefined) return "";
    const scene = c.journey.scenes[sceneIndex];
    if (!scene) return "";
    return `<button type="button" class="video-preview ${className}" data-video="${sceneIndex}" aria-label="${c.actions.watch}: ${scene.title}">
      <img src="${scene.poster || c.assets.videoPoster}" alt="" loading="lazy" width="960" height="540">
      <span class="video-preview-shade"></span>
      <span class="video-preview-play">${icon("play")}</span>
      <span class="video-preview-copy"><small>${scene.duration}</small><b>${scene.title}</b><span>${scene.line}</span></span>
    </button>`;
  };

  function render() {
    const c = DratosContent.get();
    const theme = DratosContent.getTheme();
    const module = c.platform.modules[activeModule] || c.platform.modules[0];
    app.innerHTML = `
      <header class="site-header" data-header>
        <div class="container header-inner">
          ${logo(c)}
          <nav id="site-nav" aria-label="${c.accessibility.primaryNavigation}">
            ${c.nav.map(([label, id]) => `<a href="#${id}">${label}</a>`).join("")}
          </nav>
          <div class="header-tools">
            <button class="icon-btn" type="button" data-theme-toggle aria-label="${c.accessibility.toggleTheme}">${icon(theme === "dark" ? "sun" : "moon")}</button>
            <button class="btn btn-primary btn-header" type="button" data-demo>${c.actions.demo}</button>
            <button class="icon-btn menu-btn" type="button" data-menu aria-expanded="false" aria-controls="site-nav" aria-label="${c.accessibility.openMenu}">${icon("menu")}</button>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section class="hero" id="top">
          <img class="brand-element hero-element" src="${c.assets.element}" alt="" width="420" height="420" fetchpriority="high">
          <div class="container hero-grid">
            <div class="hero-copy reveal">
              <p class="eyebrow">${c.hero.eyebrow}</p>
              <h1>${c.hero.title}</h1>
              <p class="lead">${c.hero.text}</p>
              <div class="actions">
                ${button(c.actions.platform, "btn btn-primary", "type=\"button\" data-scroll=\"plataforma\"")}
                <button class="btn btn-secondary" type="button" data-video-complete><span>${icon("play")}${c.actions.fullPresentation}</span></button>
                ${button(c.actions.demo, "btn btn-primary", "type=\"button\" data-demo")}
              </div>
              <p class="hero-note"><span>${icon("database")}</span>${c.hero.note}</p>
            </div>
            <div class="hero-visual reveal" aria-label="${c.hero.stageLabel}">
              <div class="orb orb-one"></div><div class="orb orb-two"></div>
              <div class="hero-cinematic" aria-label="${c.hero.stageLabel}">
                <img src="${c.assets.hero}" alt="Helena apresenta a plataforma DRATOS em um ambiente corporativo contemporâneo" width="1280" height="720" fetchpriority="high">
              </div>
              <button type="button" class="hero-presentation" data-video-complete aria-label="${c.actions.fullPresentation}">
                <i>${icon("play")}</i><span><small>${c.completeVideo.duration}</small><b>${c.actions.fullPresentation}</b></span>
              </button>
              <div class="product-window">
                <div class="product-bar"><span></span><span></span><span></span><b>${c.visual.productLabel}</b></div>
                <div class="product-layout">
                  <div class="product-nav"><img src="${c.assets.element}" alt="" width="26" height="26">${Array.from({ length: 6 }, (_, i) => `<i class="${i === 0 ? "active" : ""}"></i>`).join("")}</div>
                  <div class="product-main">
                    <div class="product-heading"><div><small>${c.hero.stageLabel}</small><strong>${c.dashboard.title}</strong></div><span>${c.visual.live}</span></div>
                    <div class="mini-kpis">${c.hero.metrics.map((m) => `<article><small>${m.label}</small><strong>${m.value}</strong><em>${m.trend}</em></article>`).join("")}</div>
                    <div class="hero-chart"><div class="chart-head"><span>${c.performance.eyebrow}</span><b>${c.performance.score.value}</b></div><div class="chart-bars">${[42, 58, 51, 76, 67, 84, 92, 88, 96, 94].map((height, i) => `<i style="--h:${height}%" class="${i > 7 ? "hot" : ""}"></i>`).join("")}</div></div>
                    <div class="journey-strip">${c.hero.stages.map((stage, i) => `<span class="${i < 5 ? "done" : ""}"><i>${i < 5 ? "✓" : i + 1}</i>${stage}</span>`).join("")}</div>
                  </div>
                </div>
              </div>
              ${c.hero.status.map((status, i) => `<div class="floating-status status-${i + 1}"><i></i>${status}</div>`).join("")}
            </div>
          </div>
          <div class="container trust-row">${c.hero.trust.map((item) => `<span>${item}</span>`).join("")}</div>
        </section>

        <section class="section problem-section" id="visao-geral">
          <div class="container problem-grid">
            <div class="problem-visual reveal">
              <div class="rupture-diagram">
                <p>${c.problem.diagramTitle}</p>
                <div class="rupture-nodes">${c.problem.items.map((item, index) => `<article style="--i:${index}"><i>${icon(index === 0 ? "document" : index === 1 ? "shield" : index === 2 ? "spark" : "chart")}</i><span>${item.number}</span><b>${item.title}</b></article>`).join("")}</div>
                <div class="rupture-flow" aria-hidden="true"><span></span><span></span><span></span></div>
                <small>${c.problem.diagramNote}</small>
              </div>
            </div>
            <div>
              ${heading(c.problem)}
              <div class="problem-list">${c.problem.items.map((item) => `<article class="reveal"><span>${item.number}</span><div><h3>${item.title}</h3><p>${item.text}</p></div></article>`).join("")}</div>
            </div>
          </div>
        </section>

        <section class="section promise-section">
          <div class="container">
            ${heading(c.promise, true)}
            <div class="before-after reveal">
              <article><span>${c.promise.before.label}</span><h3>${c.promise.before.title}</h3><div class="static-doc">${icon("document")}<i></i><i></i></div><ul>${c.promise.before.items.map((x) => `<li>${x}</li>`).join("")}</ul></article>
              <div class="transform-core"><img src="${c.assets.element}" alt="" width="92" height="92"><i></i></div>
              <article class="after"><span>${c.promise.after.label}</span><h3>${c.promise.after.title}</h3><div class="living-hub"><b>${c.visual.brand}</b>${Array.from({ length: 6 }, (_, i) => `<i style="--i:${i}"></i>`).join("")}</div><ul>${c.promise.after.items.map((x) => `<li>${x}</li>`).join("")}</ul></article>
            </div>
          </div>
        </section>

        <section class="section sources-section">
          <div class="container sources-grid">
            <div>${heading(c.sources)}${tags(c.sources.users, "user-tags")}</div>
            <div class="source-map reveal">
              <div class="source-cloud" data-brand="${c.visual.brand}">${c.sources.items.map((item, i) => `<span style="--i:${i}">${item}</span>`).join("")}</div>
              <div class="source-flow">${c.sources.flow.map((item, i) => `<div><i>${i + 1}</i><b>${item}</b></div>`).join("")}</div>
            </div>
          </div>
        </section>

        <section class="section platform-section" id="plataforma">
          <div class="container">
            ${heading(c.platform)}
            <div class="module-explorer reveal">
              <div class="module-index" role="tablist" aria-label="${c.platform.title}">
                ${c.platform.modules.map((item, index) => `<button type="button" role="tab" aria-selected="${index === activeModule}" class="${index === activeModule ? "active" : ""}" data-module="${index}"><span>${item.number}</span><b>${item.title}</b><i>${icon("arrow")}</i></button>`).join("")}
              </div>
              <article class="module-detail ${module.videoScene !== null ? "has-video" : ""}" role="tabpanel" tabindex="0">
                <div class="module-detail-top"><span>${module.number}</span><em>${module.status}</em></div>
                <p class="eyebrow">${module.title}</p><h3>${module.tagline}</h3><p>${module.summary}</p>
                <ul>${module.features.map((feature) => `<li>${icon("check")}<span>${feature}</span></li>`).join("")}</ul>
                ${module.videoScene !== null ? videoPreview(c, module.videoScene, "module-video-preview") : `<div class="module-visual" aria-hidden="true"><div class="doc-stack">${Array.from({ length: 3 }, (_, i) => `<i style="--i:${i}"></i>`).join("")}</div><div class="module-nodes">${Array.from({ length: 5 }, (_, i) => `<span style="--i:${i}"></span>`).join("")}</div><b>${c.visual.brand} / ${module.number}</b></div>`}
              </article>
            </div>
          </div>
        </section>

        <section class="section performance-section" id="performance">
          <div class="container">
            <div class="performance-flow reveal">${c.performance.flow.map((item, index) => `<span><i>${index + 1}</i>${item}</span>`).join("")}</div>
            <div class="performance-grid">
              <div class="performance-copy">${heading(c.performance)}${tags(c.performance.models)}<p class="public-value">${c.performance.publicValue}</p><p class="disclaimer">${c.performance.disclaimer}</p></div>
              <div class="performance-panel reveal">
                <div class="panel-top"><div><small>${c.performance.score.label}</small><strong>${c.performance.score.value}</strong><span>${c.performance.score.scale}</span></div><b>${c.performance.score.stars}</b></div>
                <div class="performance-rows">${c.performance.indicators.map((item) => `<div><span><b>${item.label}</b><strong>${item.value}</strong></span><i><em style="--progress:${item.progress}%"></em></i></div>`).join("")}</div>
                <div class="performance-examples">${c.performance.examples.map((example) => `<article><b>${example.title}</b><small>${example.items.join(" · ")}</small></article>`).join("")}</div>
              </div>
            </div>
            ${videoPreview(c, c.performance.videoScene, "performance-video")}
          </div>
        </section>

        <section class="section dossier-section">
          <div class="container dossier-grid">
            <div class="dossier-copy">${heading(c.dossierSpotlight)}${tags(c.dossierSpotlight.items)}<p class="dossier-proof">${c.dossierSpotlight.proof}</p></div>
            <div class="dossier-media reveal">${videoPreview(c, c.dossierSpotlight.videoScene, "dossier-video")}<div class="dossier-stack" aria-hidden="true">${c.dossierSpotlight.items.map((item, index) => `<span style="--i:${index}">${item}</span>`).join("")}<b>${c.visual.brand}</b></div></div>
          </div>
        </section>

        <section class="section dashboard-section">
          <div class="container">
            ${heading(c.dashboard)}
            <div class="dashboard-frame reveal">
              <div class="dashboard-sidebar"><img src="${c.assets.element}" alt="" loading="lazy" width="42" height="42">${c.dashboard.views.map((view, i) => `<span class="${i === 0 ? "active" : ""}"><i></i>${view}</span>`).join("")}</div>
              <div class="dashboard-content"><div class="dashboard-filters">${c.dashboard.filters.map((filter) => `<span>${filter}<i>⌄</i></span>`).join("")}</div><div class="dashboard-kpis">${c.dashboard.kpis.map((kpi) => `<article><small>${kpi.label}</small><strong>${kpi.value}</strong><em>${kpi.delta}</em></article>`).join("")}</div><div class="dashboard-bottom"><div class="large-chart">${[35, 52, 44, 65, 58, 78, 70, 89, 82, 94, 88, 97].map((h) => `<i style="--h:${h}%"></i>`).join("")}</div><div class="donut"><b>94%</b></div></div><p>${c.dashboard.disclaimer}</p></div>
            </div>
            ${videoPreview(c, c.dashboard.videoScene, "dashboard-video")}
          </div>
        </section>

        <section class="section integrations-section" id="integracoes">
          <div class="container integrations-grid">
            <div>${heading(c.integrations)}<div class="integration-list">${c.integrations.items.map((item) => `<article><span>${item.name.slice(0, 2).toUpperCase()}</span><div><b>${item.name}</b><small>${item.type}</small></div><em>${item.status}</em></article>`).join("")}</div></div>
            <div class="totvs-case reveal"><span class="case-label">${c.visual.totvsSource} × ${c.visual.brand}</span><h3>${c.integrations.totvs.title}</h3><p>${c.integrations.totvs.text}</p><ul>${c.integrations.totvs.features.map((x) => `<li>${icon("check")}${x}</li>`).join("")}</ul><div class="connector-visual"><b>${c.visual.totvsSource}</b><i></i><img src="${c.assets.element}" alt="" loading="lazy" width="90" height="90"><strong>${c.visual.brand}</strong></div></div>
          </div>
        </section>

        <section class="section video-library-section" id="videos">
          <div class="container">
            ${heading(c.videoLibrary)}
            <div class="video-library-grid">${c.videoLibrary.sceneIndexes.map((sceneIndex) => videoPreview(c, sceneIndex, "library-video")).join("")}</div>
          </div>
        </section>

        <section class="section access-section">
          <div class="container access-grid"><div>${heading(c.access)}${tags(c.access.contexts)}</div><div class="profile-orbit reveal"><div class="profile-core">${icon("shield")}<b>${c.visual.accessCore}</b></div>${c.access.profiles.map((profile, i) => `<span style="--i:${i}">${profile}</span>`).join("")}</div></div>
        </section>

        <section class="section security-section" id="seguranca">
          <div class="container">
            ${heading(c.security, true)}
            <div class="security-grid reveal">${c.security.items.map((item, i) => `<article><span>${String(i + 1).padStart(2, "0")}</span><b>${item}</b></article>`).join("")}</div>
            <details class="tech-details"><summary>${c.actions.technical}<span>${icon("arrow")}</span></summary><div><p class="eyebrow">${c.security.stackText}</p><h3>${c.security.stackTitle}</h3>${tags(c.security.stack)}<p>${c.security.stackNote}</p></div></details>
          </div>
        </section>

        <section class="section public-section">
          <img class="brand-element public-element" src="${c.assets.element}" alt="" loading="lazy" width="460" height="460">
          <div class="container public-grid"><div>${heading(c.publicSector)}${button(c.actions.diagnose, "btn btn-light", "type=\"button\" data-demo")}</div><div class="public-list reveal">${c.publicSector.items.map((item, i) => `<article><span>${String(i + 1).padStart(2, "0")}</span><b>${item}</b></article>`).join("")}</div></div>
        </section>

        <section class="section plans-section" id="planos">
          <div class="container">
            ${heading(c.plans, true)}
            <div class="plans-grid">${c.plans.items.map((plan) => `<article class="plan-card reveal ${plan.featured ? "featured" : ""}"><span>${plan.name}</span><h3>${plan.price}</h3><p>${plan.description}</p><ul>${plan.features.map((x) => `<li>${icon("check")}${x}</li>`).join("")}</ul>${button(c.actions.details, plan.featured ? "btn btn-primary" : "btn btn-secondary", `type="button" data-plan="${plan.name}"`)}</article>`).join("")}</div>
          </div>
        </section>

        <section class="section founding-section">
          <div class="container founding-card reveal"><div>${heading(c.founding)}${button(c.actions.program, "btn btn-primary", "type=\"button\" data-demo")}</div><div class="founding-steps">${c.founding.items.map((item, i) => `<span><i>${i + 1}</i>${item}</span>`).join("")}</div></div>
        </section>

        <section class="section faq-section" id="faq">
          <div class="container faq-grid"><div>${heading(c.faq)}</div><div class="faq-list">${c.faq.items.map(([question, answer], i) => `<details class="reveal" ${i === 0 ? "open" : ""}><summary><span>${String(i + 1).padStart(2, "0")}</span><b>${question}</b><i>+</i></summary><p>${answer}</p></details>`).join("")}</div></div>
        </section>

        <section class="section final-section">
          <img class="brand-element final-element" src="${c.assets.element}" alt="" loading="lazy" width="600" height="600">
          <div class="container final-content reveal"><img src="${c.assets.logo}" alt="${c.visual.brand}" loading="lazy" width="230" height="45"><p class="eyebrow">${c.finalCta.eyebrow}</p><h2>${c.finalCta.title}</h2><p class="lead">${c.finalCta.text}</p><div class="actions">${button(c.actions.demo, "btn btn-light", "type=\"button\" data-demo")}<button class="btn btn-outline-light" type="button" data-video-complete><span>${c.actions.fullPresentation}</span>${icon("play")}</button>${button(c.actions.diagnose, "btn btn-outline-light", "type=\"button\" data-demo")}</div><strong>${c.finalCta.signature}</strong></div>
        </section>
      </main>

      <footer class="site-footer" id="privacidade">
        <div class="container footer-grid"><div>${logo(c, true)}<p>${c.footer.text}</p></div><div class="footer-links">${c.footer.links.map(([label, href]) => `<a href="${href}">${label}</a>`).join("")}</div><div><small>${c.footer.contactLabel}</small><a href="mailto:${c.footer.contact}">${c.footer.contact}</a></div></div>
        <div class="container footer-bottom"><div><span>${c.footer.copyright}</span><p>${c.footer.privacyNote}</p></div><a href="${c.settings.privacyUrl}">${c.footer.privacy}</a></div>
      </footer>`;

    bindEvents();
    observeReveals();
  }

  function bindEvents() {
    const c = DratosContent.get();
    document.querySelector("[data-theme-toggle]")?.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      DratosContent.toggleTheme();
      showToast(c.toast.theme);
    });
    document.querySelector("[data-menu]")?.addEventListener("click", (event) => {
      const nav = document.querySelector("#site-nav");
      const open = nav.classList.toggle("open");
      event.currentTarget.setAttribute("aria-expanded", String(open));
      event.currentTarget.setAttribute("aria-label", open ? c.accessibility.closeMenu : c.accessibility.openMenu);
      event.currentTarget.innerHTML = icon(open ? "close" : "menu");
    });
    document.querySelectorAll("#site-nav a").forEach((link) => link.addEventListener("click", () => document.querySelector("#site-nav").classList.remove("open")));
    document.querySelectorAll("[data-demo]").forEach((element) => element.addEventListener("click", openForm));
    document.querySelectorAll("[data-scroll]").forEach((element) => element.addEventListener("click", () => document.querySelector(`#${element.dataset.scroll}`)?.scrollIntoView({ behavior: "smooth" })));
    document.querySelectorAll("[data-video]").forEach((element) => element.addEventListener("click", () => openVideo(Number(element.dataset.video))));
    document.querySelectorAll("[data-video-complete]").forEach((element) => element.addEventListener("click", openCompleteVideo));
    document.querySelectorAll("[data-module]").forEach((element) => element.addEventListener("click", () => { activeModule = Number(element.dataset.module); render(); document.querySelector("#plataforma")?.scrollIntoView({ block: "start" }); document.querySelector(".module-detail")?.focus({ preventScroll: true }); }));
    document.querySelectorAll("[data-plan]").forEach((element) => element.addEventListener("click", () => { showToast(c.toast.plan); openForm({ currentTarget: element }); }));
    document.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
  }

  function updateHeader() {
    document.querySelector("[data-header]")?.classList.toggle("scrolled", scrollY > 20);
  }

  function observeReveals() {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal").forEach((item) => item.classList.add("visible"));
      return;
    }
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
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
    requestAnimationFrame(() => modalRoot.querySelector("button, input, select, textarea")?.focus());
  }

  function modalKeydown(event) {
    if (event.key === "Escape") closeModal();
    if (event.key !== "Tab") return;
    const focusable = [...modalRoot.querySelectorAll("button:not([disabled]), input, select, textarea, a[href]")];
    if (!focusable.length) return;
    const first = focusable[0], last = focusable[focusable.length - 1];
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

  function openVideo(index) {
    const c = DratosContent.get();
    const scene = c.journey.scenes[index] || c.journey.scenes[0];
    const available = scene.status.toLowerCase().includes("dispon") || scene.status.toLowerCase().includes("available");
    const media = available && scene.video
      ? `<div class="premium-player"><video controls playsinline preload="metadata" poster="${scene.poster || c.assets.videoPoster}" aria-label="${scene.title}"><source src="${scene.video}" type="video/mp4"></video></div>`
      : `<div class="video-placeholder"><img src="${c.assets.element}" alt="" width="150" height="150"><button type="button" class="play-orb" disabled>${icon("play")}</button><b>${c.videoModal.production}</b><p>${c.videoModal.productionText}</p></div>`;
    modalShell(media, scene.title, "video-only-modal");
  }

  function openCompleteVideo() {
    const c = DratosContent.get();
    const video = c.completeVideo;
    modalShell(`<div class="premium-player"><video controls playsinline preload="metadata" poster="${video.poster}" aria-label="${video.title}"><source src="${video.video}" type="video/mp4"></video></div>`, video.title, "video-only-modal");
  }

  function fieldMarkup(name, field) {
    const id = `form-${name}`;
    if (name === "privacy") return `<label class="check-field" for="${id}"><input id="${id}" name="${name}" type="checkbox" ${field.required ? "required" : ""}><span>${field.label}</span></label>`;
    if (field.options) return `<label for="${id}"><span>${field.label}${field.required ? " *" : ""}</span><select id="${id}" name="${name}" ${field.required ? "required" : ""}><option value="">${field.placeholder}</option>${field.options.map((option) => `<option>${option}</option>`).join("")}</select></label>`;
    if (name === "challenge") return `<label class="full-field" for="${id}"><span>${field.label} *</span><textarea id="${id}" name="${name}" placeholder="${field.placeholder}" rows="3" required></textarea></label>`;
    const type = name === "email" ? "email" : name === "phone" ? "tel" : "text";
    return `<label for="${id}"><span>${field.label}${field.required ? " *" : ""}</span><input id="${id}" name="${name}" type="${type}" placeholder="${field.placeholder}" ${field.required ? "required" : ""}></label>`;
  }

  function openForm(event) {
    const c = DratosContent.get();
    const selectedPlan = event?.currentTarget?.dataset?.plan || "";
    modalShell(`<div class="form-modal"><p class="eyebrow">${c.finalCta.eyebrow}</p><h2>${c.form.title}</h2><p>${c.form.text}</p><form id="demo-form" novalidate><div class="form-grid">${Object.entries(c.form.fields).map(([name, field]) => fieldMarkup(name, field)).join("")}</div><input type="hidden" name="selectedPlan" value="${selectedPlan}"><div class="form-status" data-form-status role="status"></div>${button(c.actions.send, "btn btn-primary btn-submit", "type=\"submit\"")}</form></div>`, c.form.title);
    modalRoot.querySelector("#demo-form").addEventListener("submit", submitForm);
  }

  async function submitForm(event) {
    event.preventDefault();
    const c = DratosContent.get();
    const form = event.currentTarget;
    const status = form.querySelector("[data-form-status]");
    if (!form.checkValidity()) { status.textContent = c.form.validation; status.className = "form-status error"; form.reportValidity(); return; }
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
      } else if (c.settings.mailtoFallback) {
        location.href = `mailto:${c.settings.mailtoFallback}?subject=${encodeURIComponent(c.form.title)}&body=${encodeURIComponent(JSON.stringify(payload, null, 2))}`;
        status.textContent = c.form.demoSuccess;
        status.className = "form-status success";
      } else {
        sessionStorage.setItem("dratos-demo-payload", JSON.stringify(payload));
        status.textContent = c.form.demoSuccess;
        status.className = "form-status success";
      }
    } catch (_) {
      status.textContent = c.form.error;
      status.className = "form-status error";
    } finally { submit.disabled = false; }
  }

  function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    toastRoot.appendChild(toast);
    setTimeout(() => toast.remove(), 3200);
  }

  function updateThemeControl() {
    const control = document.querySelector("[data-theme-toggle]");
    if (control) control.innerHTML = icon(DratosContent.getTheme() === "dark" ? "sun" : "moon");
  }

  window.addEventListener("dratos:theme", updateThemeControl);
  render();
})();
