# Como editar a landing page DRATOS

Todo conteúdo público está em `content/pt.js`. A landing page é exclusivamente PT-BR.

## Conteúdo

- Hero: `hero` e `completeVideo`.
- Menu: `nav`.
- Botões: `actions`.
- Problema: `problem`.
- Módulos: `platform.modules`.
- Performance: `performance`.
- Dossiê: `dossierSpotlight`.
- Vídeos funcionais: `videoLibrary.sceneIndexes`.
- Formulário e fallback: `form` e `settings`.
- Rodapé e contato: `footer`.

Não coloque textos comerciais diretamente em `js/main.js`.

## Marca e Hero

- logo: `assets/brand/dratos-logo.png`;
- elemento: `assets/brand/dratos-elemento.png`;
- Hero: `assets/images/hero-helena-dratos.webp`.

Preserve proporção, nomes e dimensões. O Hero deve permanecer editorial, claro e integrado ao mockup executivo.

## Vídeos

As 16 cenas continuam em `journey.scenes` como catálogo técnico. Cada cena usa `title`, `duration`, `line`, `video`, `poster` e `status`.

Não adicione `<track>`, VTT, transcript ou direção de cena ao modal. O player deve continuar 16:9, sob demanda e sem autoplay.

Os destaques públicos são definidos por `videoLibrary.sceneIndexes`. Mantenha somente Requisição, Autoria, Biblioteca, Sala Jurídica, Due Diligence, Aprovações e Assinatura, Obrigações, Performance, Dossiê e Dashboard.

Para regenerar o vídeo completo:

```powershell
powershell -ExecutionPolicy Bypass -File scripts\gerar-video-completo.ps1
```

## Tema

O tema é controlado por `DratosContent.toggleTheme()` e persistido em `localStorage` sob `dratos-theme`. Somente `[data-theme-toggle]` pode chamar essa função.

## Formulário

```js
settings: {
  formEndpoint: "",
  mailtoFallback: "contato@dratos.com.br",
  privacyUrl: "#privacidade"
}
```

Sem endpoint, o formulário apenas prepara um `mailto:`; não informe ao visitante que houve envio automático.

## Publicação

Canonical, robots e sitemap estão preparados para `https://joelalbertofernandes.github.io/dratos/`. O repositório oficial é `https://github.com/JoelAlbertoFernandes/dratos`.
