(function () {
  const app = document.getElementById("app");
  const modalRoot = document.getElementById("modal-root");
  const toastRoot = document.getElementById("toast-root");
  const esc = value => String(value).replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char]);
  const button = (label, attrs = "", style = "primary") => `<button class="btn btn-${style}" ${attrs}>${label}<span>↗</span></button>`;
  const heading = (eyebrow, title, text = "", align = "") => `<div class="section-heading ${align}"><p class="eyebrow">${eyebrow}</p><h2>${title}</h2>${text ? `<p class="lead">${text}</p>` : ""}</div>`;
  const logo = c => `<a class="logo logo-original" href="#visao-geral" aria-label="${c.brand.name}"><img src="${c.brand.logo}" alt="DRATOS - Inteligência em Contratos"></a>`;

  function moduleMockup(c, module) {
    const rows = module.features.slice(0, 6).map((item, index) => `<div class="mock-row"><i class="${index < 3 ? "done" : ""}"></i><span>${item}</span><em>${index < 3 ? c.ui.validated : c.ui.analyzing}</em></div>`).join("");
    return `<div class="module-interface visual-${module.visual}">
      <div class="interface-bar"><span></span><span></span><span></span><b>${module.eyebrow}</b></div>
      <div class="interface-layout">
        <div class="interface-nav">${Array(6).fill("<i></i>").join("")}</div>
        <div class="interface-main"><div class="interface-heading"><strong>${module.title}</strong><em>${c.ui.governed}</em></div>${rows}</div>
      </div>
      <div class="interface-light"></div>
    </div>`;
  }

  function videoPlaceholder(c, title, path, compact = false) {
    return `<div class="video-placeholder ${compact ? "compact" : ""}" data-video-path="${esc(path)}">
      <div class="video-grid"></div><div class="video-play">▶</div>
      <div class="video-meta"><span>${title}</span><small>${c.ui.videoSoon}</small></div>
      ${compact ? "" : button(c.actions.addVideo, `data-video="${esc(path)}"`, "glass small")}
    </div>`;
  }

  function renderModule(c, module, index) {
    return `<article class="guided-module ${index % 2 ? "reverse" : ""}" id="${module.id}">
      <div class="module-chapter reveal">
        <span class="chapter-number">${module.number}</span>
        <p class="eyebrow">${module.eyebrow}</p><h2>${module.title}</h2><p class="lead">${module.text}</p>
        <div class="feature-cloud">${module.features.map(item => `<span>${item}</span>`).join("")}</div>
      </div>
      <div class="module-media reveal">
        ${moduleMockup(c, module)}
        ${videoPlaceholder(c, module.eyebrow, module.video)}
      </div>
      <div class="module-outcomes reveal">
        <div><span>Quem usa</span><strong>${module.audience}</strong></div>
        <div><span>Problema que resolve</span><strong>${module.problem}</strong></div>
        <div><span>Valor gerado</span><strong>${module.value}</strong></div>
      </div>
    </article>`;
  }

  function render() {
    const c = window.DratosContent.get();
    document.title = c.meta.title || "DRATOS";
    document.querySelector('meta[name="description"]').content = c.meta.description || c.hero.text;
    document.querySelector('meta[property="og:title"]').content = c.meta.title || "DRATOS";
    document.querySelector('meta[property="og:description"]').content = c.meta.description || c.hero.text;

    app.innerHTML = `
      <header class="site-header">
        <div class="container header-inner">
          ${logo(c)}
          <nav id="main-nav">${c.nav.map(([label, id]) => `<a href="#${id}">${label}</a>`).join("")}</nav>
          <div class="header-tools">
            <select id="language-select" aria-label="Idioma"><option value="pt">PT</option><option value="en">EN</option><option value="es">ES</option></select>
            <button class="icon-btn" data-theme aria-label="Alternar tema">◐</button>
            <button class="icon-btn menu-btn" data-menu aria-label="Abrir menu">☰</button>
            ${button(c.actions.demo, "data-demo", "primary small")}
          </div>
        </div>
      </header>

      <main>
        <section class="hero hero-v3" id="visao-geral">
          <div class="container hero-grid">
            <div class="hero-copy reveal">
              <p class="eyebrow">${c.hero.eyebrow}</p><h1>${c.hero.title}</h1><p class="lead">${c.hero.text}</p>
              <div class="actions">${button(c.actions.demo, "data-demo")}<a class="btn btn-quiet" href="#jornada">${c.actions.journey}<span>↓</span></a></div>
              <p class="hero-note"><i></i>${c.hero.note}</p>
            </div>
            <div class="hero-machine reveal" aria-label="Mockup da plataforma DRATOS">
              <div class="halo halo-a"></div><div class="halo halo-b"></div>
              <div class="hero-platform"><div class="platform-glow"></div><div class="platform-screen">
                <div class="screen-nav"><img src="${c.brand.logo}" alt="">${Array(5).fill("<i></i>").join("")}</div>
                <div class="screen-body"><div class="screen-top"><span>${c.ui.contractJourney}</span><em>${c.ui.live}</em></div>
                <div class="screen-kpis"><div><small>${c.ui.requests}</small><b>32</b></div><div><small>${c.ui.approvals}</small><b>18</b></div><div><small>${c.ui.dossiers}</small><b>148</b></div></div>
                <div class="screen-chart">${[44, 70, 54, 88, 68, 95, 76, 82].map(v => `<i style="height:${v}%"></i>`).join("")}</div></div>
              </div></div>
              ${c.hero.statuses.map((x, i) => `<div class="hero-status status-${i + 1}"><i></i>${x}</div>`).join("")}
            </div>
          </div>
          <div class="container meeting-note reveal"><span>${c.ui.guidedDemo}</span><p>${c.hero.meeting}</p></div>
        </section>

        <section class="section problem-v3">
          <div class="container">
            ${heading(c.problem.eyebrow, c.problem.title, "", "center")}
            <div class="problem-orbit reveal"><div class="problem-core">${c.ui.scatteredContract}</div>${c.problem.items.map((item, i) => `<article class="problem-node problem-${i + 1}"><span>0${i + 1}</span><h3>${item[0]}</h3><p>${item[1]}</p></article>`).join("")}</div>
            <div class="comparison reveal"><article><span>${c.ui.before}</span><h3>${c.problem.before.label}</h3>${c.problem.before.items.map(item => `<p><i>×</i>${item}</p>`).join("")}</article><div class="comparison-arrow">→</div><article class="after"><span>${c.ui.withDratos}</span><h3>${c.problem.after.label}</h3>${c.problem.after.items.map(item => `<p><i>✓</i>${item}</p>`).join("")}</article></div>
          </div>
        </section>

        <section class="section journey-v3" id="jornada"><div class="container">
          ${heading(c.journey.eyebrow, c.journey.title, c.journey.text, "center")}
          <div class="journey-selector reveal">${c.journey.steps.map(([n, title, text], i) => `<button class="journey-step ${i === 0 ? "active" : ""}" data-journey-step="${i}"><span>${n}</span><b>${title}</b><small>${text}</small></button>`).join("")}</div>
          <div class="journey-detail"><span id="journey-detail-number">${c.journey.steps[0][0]}</span><div><strong id="journey-detail-title">${c.journey.steps[0][1]}</strong><p id="journey-detail-text">${c.journey.steps[0][2]}</p></div></div>
        </div></section>

        <section class="section modules-intro" id="modulos"><div class="container">${heading(c.modulesIntro.eyebrow, c.modulesIntro.title, c.modulesIntro.text, "center")}<div class="module-directory">${c.modules.map(module => `<a href="#${module.id}"><span>${module.number}</span>${module.eyebrow}</a>`).join("")}</div></div></section>

        <section class="guided-modules"><div class="container">${c.modules.map((module, index) => renderModule(c, module, index)).join("")}</div></section>

        <section class="section security-v3" id="seguranca"><div class="container security-grid">
          <div><p class="eyebrow">${c.security.eyebrow}</p><h2>${c.security.title}</h2><p class="lead">${c.security.text}</p><div class="security-items">${c.security.items.map(item => `<article class="reveal"><i>✓</i><strong>${item}</strong></article>`).join("")}</div></div>
          <div class="shield-stage reveal"><div class="shield-radar"></div><div class="shield"><img src="${c.brand.logo}" alt="DRATOS"></div><div class="shield-base"></div></div>
        </div></section>

        <section class="section integrations-v3"><div class="container">
          ${heading(c.integrations.eyebrow, c.integrations.title, c.integrations.text, "center")}
          <div class="integration-map reveal"><div class="integration-hub"><img src="${c.brand.logo}" alt="DRATOS"></div>${c.integrations.items.map((item, i) => `<div class="integration-node integration-${i + 1}"><i></i><b>${item}</b></div>`).join("")}</div>
        </div></section>

        <section class="section plans-section" id="planos"><div class="container">
          ${heading(c.plans.eyebrow, c.plans.title, c.plans.text, "center")}
          <div class="plans">${c.plans.items.map(([name, price, items, featured]) => `<article class="plan ${featured ? "featured" : ""} reveal"><span class="plan-light"></span><h3>${name}</h3><strong>${price}</strong><ul>${items.map(x => `<li>${x}</li>`).join("")}</ul>${button(c.actions.plan, `data-plan="${esc(name)}"`, featured ? "primary small" : "quiet small")}</article>`).join("")}</div>
        </div></section>

        <section class="section videos-v3" id="videos"><div class="container">
          ${heading(c.videos.eyebrow, c.videos.title, c.videos.text, "center")}
          <div class="video-library">${c.videos.items.map(([title, duration, path]) => `<article class="video-card reveal">${videoPlaceholder(c, title, path, true)}<div><h3>${title}</h3><span>${duration}</span><button data-video="${esc(path)}">${c.actions.watch}</button></div></article>`).join("")}</div>
        </div></section>

        <section class="section faq-section" id="faq"><div class="container faq-grid"><div>${heading(c.faq.eyebrow, c.faq.title)}</div><div class="faqs">${c.faq.items.map(([q, a]) => `<article><button class="faq-question"><span>${q}</span><i>+</i></button><div class="faq-answer"><p>${a}</p></div></article>`).join("")}</div></div></section>

        <section class="final-cta"><div class="container reveal">${logo(c)}<p class="eyebrow">${c.finalCta.eyebrow}</p><h2>${c.finalCta.title}</h2><p>${c.finalCta.text}</p>${button(c.actions.demo, "data-demo")}</div></section>
      </main>
      <footer><div class="container footer-grid">${logo(c)}<p>${c.footer.text}</p><a href="mailto:${c.footer.contact}">${c.footer.contact}</a><span>${c.footer.copyright}</span></div></footer>`;
    bind(c);
  }

  function bind(c) {
    const language = document.getElementById("language-select");
    language.value = window.DratosContent.language;
    language.addEventListener("change", event => { window.DratosContent.set(event.target.value); toast(c.toast.language); });
    document.querySelector("[data-menu]").addEventListener("click", () => document.getElementById("main-nav").classList.toggle("open"));
    document.querySelectorAll("#main-nav a").forEach(link => link.addEventListener("click", () => document.getElementById("main-nav").classList.remove("open")));
    document.querySelector("[data-theme]").addEventListener("click", () => {
      const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
      document.documentElement.dataset.theme = next; localStorage.setItem("dratos-theme", next); toast(c.toast.theme);
    });
    document.querySelectorAll("[data-demo]").forEach(item => item.addEventListener("click", () => openModal(c)));
    document.querySelectorAll("[data-plan]").forEach(item => item.addEventListener("click", () => { toast(c.toast.plan); openModal(c, item.dataset.plan); }));
    document.querySelectorAll("[data-video]").forEach(item => item.addEventListener("click", () => toast(`${c.toast.video} ${item.dataset.video || ""}`.trim())));
    document.querySelectorAll(".faq-question").forEach(item => item.addEventListener("click", () => item.closest("article").classList.toggle("open")));
    document.querySelectorAll("[data-journey-step]").forEach(item => item.addEventListener("click", () => {
      const step = c.journey.steps[Number(item.dataset.journeyStep)];
      document.querySelectorAll("[data-journey-step]").forEach(button => button.classList.remove("active"));
      item.classList.add("active");
      document.getElementById("journey-detail-number").textContent = step[0];
      document.getElementById("journey-detail-title").textContent = step[1];
      document.getElementById("journey-detail-text").textContent = step[2];
    }));
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add("visible"); observer.unobserve(entry.target); } }), { threshold: .07 });
    document.querySelectorAll(".reveal").forEach(item => observer.observe(item));
  }

  function openModal(c, plan = "") {
    document.body.classList.add("modal-open");
    modalRoot.innerHTML = `<div class="modal-backdrop"><div class="modal"><button class="modal-close" data-close>×</button><p class="eyebrow">${c.modal.eyebrow}</p><h2>${c.modal.title}</h2><p>${c.modal.text}</p><form>${c.modal.fields.map((field, i) => `<label><span>${field}</span>${i === 4 ? "<textarea required></textarea>" : `<input ${i === 1 ? 'type="email"' : 'type="text"'} value="${i === 3 ? esc(plan) : ""}" required>`}</label>`).join("")}<div class="modal-actions"><button type="button" class="btn btn-quiet" data-close>${c.actions.close}</button>${button(c.actions.send, 'type="submit"')}</div></form></div></div>`;
    modalRoot.querySelectorAll("[data-close]").forEach(item => item.addEventListener("click", closeModal));
    modalRoot.querySelector(".modal-backdrop").addEventListener("click", event => { if (event.target === event.currentTarget) closeModal(); });
    modalRoot.querySelector("form").addEventListener("submit", event => { event.preventDefault(); closeModal(); toast(c.modal.success); });
  }
  function closeModal() { document.body.classList.remove("modal-open"); modalRoot.innerHTML = ""; }
  function toast(text) { const item = document.createElement("div"); item.className = "toast"; item.textContent = text; toastRoot.appendChild(item); setTimeout(() => item.remove(), 3200); }

  window.addEventListener("scroll", () => document.querySelector(".site-header")?.classList.toggle("scrolled", scrollY > 15));
  window.addEventListener("dratos:language", render);
  document.documentElement.dataset.theme = localStorage.getItem("dratos-theme") || "light";
  render();
})();
