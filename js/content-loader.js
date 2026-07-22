(function () {
  const data = window.DRATOS_CONTENT.pt;
  const savedTheme = localStorage.getItem("dratos-theme");
  let theme = savedTheme === "dark" || savedTheme === "light"
    ? savedTheme
    : (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");

  function applyTheme() {
    document.documentElement.dataset.theme = theme;
    document.querySelector('meta[name="theme-color"]').content = theme === "dark" ? "#091326" : "#f8fafc";
  }

  function updateDocument() {
    document.documentElement.lang = "pt-BR";
    document.title = data.meta.title;
    document.querySelector('meta[name="description"]').content = data.meta.description;
    document.querySelector('meta[property="og:title"]').content = data.meta.title;
    document.querySelector('meta[property="og:description"]').content = data.meta.description;
    document.querySelector('meta[property="og:image"]').content = data.meta.socialImage;
    document.querySelector('meta[name="twitter:title"]').content = data.meta.title;
    document.querySelector('meta[name="twitter:description"]').content = data.meta.description;
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
    applyTheme();
  }

  window.DratosContent = {
    get: () => data,
    getTheme: () => theme,
    toggleTheme() {
      theme = theme === "light" ? "dark" : "light";
      localStorage.setItem("dratos-theme", theme);
      applyTheme();
      window.dispatchEvent(new CustomEvent("dratos:theme", { detail: { theme } }));
    },
    updateDocument
  };

  updateDocument();
})();
