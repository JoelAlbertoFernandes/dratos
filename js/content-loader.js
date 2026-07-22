(function () {
  const supported = ["pt", "en", "es"];
  const savedLanguage = localStorage.getItem("dratos-language");
  const browserLanguage = (navigator.language || "pt").slice(0, 2);
  let language = supported.includes(savedLanguage) ? savedLanguage : (supported.includes(browserLanguage) ? browserLanguage : "pt");
  let theme = localStorage.getItem("dratos-theme") || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function content() {
    return window.DRATOS_CONTENT[language] || window.DRATOS_CONTENT.pt;
  }

  function updateDocument() {
    const data = content();
    document.documentElement.lang = data.meta.lang;
    document.documentElement.dataset.theme = theme;
    document.title = data.meta.title;
    document.querySelector('meta[name="description"]').content = data.meta.description;
    document.querySelector('meta[property="og:title"]').content = data.meta.title;
    document.querySelector('meta[property="og:description"]').content = data.meta.description;
    document.querySelector('meta[property="og:image"]').content = data.meta.socialImage;
    document.querySelector('meta[name="twitter:title"]').content = data.meta.title;
    document.querySelector('meta[name="twitter:description"]').content = data.meta.description;
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#091326" : "#f8fafc";
    document.querySelector(".skip-link").textContent = data.accessibility.skip;
    const canonical = document.querySelector("#canonical");
    canonical.href = data.meta.canonical || location.href.split("#")[0];
    document.querySelector("#structured-data").textContent = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Organization",
      name: data.meta.organization.name,
      description: data.meta.organization.description,
      email: data.meta.organization.email,
      url: data.meta.canonical || location.href.split("#")[0]
    });
  }

  window.DratosContent = {
    get: content,
    getLanguage: () => language,
    getTheme: () => theme,
    setLanguage(next) {
      if (!supported.includes(next)) return;
      language = next;
      localStorage.setItem("dratos-language", language);
      updateDocument();
      window.dispatchEvent(new CustomEvent("dratos:content"));
    },
    toggleTheme() {
      theme = theme === "light" ? "dark" : "light";
      localStorage.setItem("dratos-theme", theme);
      updateDocument();
      window.dispatchEvent(new CustomEvent("dratos:theme"));
    },
    updateDocument
  };

  updateDocument();
})();
