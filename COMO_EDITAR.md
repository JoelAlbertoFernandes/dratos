# Como editar a landing page DRATOS

Todo conteúdo público permanece em `content/pt.js`. A landing é exclusivamente PT-BR.

## Conteúdo por camada

As chaves seguem a jornada: `hero`, `problem`, `transformation`, `sources`, `requisition`, `authoring`, `library`, `riskAI`, `legalRoom`, `dueDiligence`, `approval`, `obligations`, `performance`, `quickAI`, `dossier`, `dashboard`, `security`, `integrations`, `institutional` e `finalCta`.

Não insira textos comerciais em `index.html` ou `js/main.js`.

## RiskAI

- `riskAI.insights`: temas de análise;
- `riskAI.checks`: nome, estado, severidade, trecho, regra, motivo, ação e responsável;
- `riskAI.governance`: aviso obrigatório de decisão humana;
- `quickAI.questions` e `quickAI.results`: simulação visual com dados fictícios.

Não descreva o RiskAI como substituto do Jurídico ou como decisão automática.

## Marca e tipografia

- logo: `assets/brand/dratos-logo.png`;
- elemento: `assets/brand/dratos-elemento.png`;
- tokens oficiais: `DesignsystemDratos.txt`;
- títulos: Plus Jakarta Sans;
- corpo: Inter.

## Frames e vídeo

Os caminhos editáveis ficam em `assets.frames` e `institutional`. Use somente imagens extraídas do vídeo completo.

O runtime deve manter somente:

```text
assets/video/dratos-apresentacao-completa.mp4
```

Não recoloque cenas individuais, `<track>`, VTT, transcript, autoplay ou preload de vídeo. Os MP4s individuais são apenas preservados como material-fonte.

## Tema e movimento

O tema é persistido em `localStorage` sob `dratos-theme`; somente `[data-theme-toggle]` chama `toggleTheme()`. Movimentos devem usar transform/opacity e sempre respeitar `prefers-reduced-motion`.

## Formulário

```js
settings: {
  formEndpoint: "",
  mailtoFallback: "contato@dratos.com.br",
  privacyUrl: "#privacidade"
}
```

Sem endpoint, o envio permanece sob confirmação do visitante no cliente de e-mail.

## Publicação

Canonical, robots e sitemap usam `https://joelalbertofernandes.github.io/dratos/`. Todos os caminhos de runtime devem continuar relativos.
