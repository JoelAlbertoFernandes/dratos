(function () {
  const saved = localStorage.getItem("dratos-language");
  window.DratosContent = {
    language: window.DRATOS_CONTENT[saved] ? saved : "pt",
    get() {
      return window.DRATOS_CONTENT[this.language];
    },
    set(language) {
      if (!window.DRATOS_CONTENT[language]) return;
      this.language = language;
      localStorage.setItem("dratos-language", language);
      document.documentElement.lang = this.get().meta.lang;
      window.dispatchEvent(new CustomEvent("dratos:language"));
    }
  };
})();
