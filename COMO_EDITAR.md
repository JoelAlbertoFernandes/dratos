# Como editar a landing page DRATOS

Todo conteúdo comercial editável fica fora dos componentes:

- `content/pt.js` — português brasileiro e configuração principal;
- `content/en.js` — tradução completa em inglês;
- `content/es.js` — tradução completa em espanhol.

Ao mudar a estrutura de uma seção, replique a alteração nos três idiomas.

## Textos e CTAs

- Hero: `hero`.
- Menu: `nav`.
- Rótulos de botões: `actions`.
- Seções: objetos como `problem`, `sources`, `performance` e `security`.
- CTA final: `finalCta`.
- Rodapé e contato: `footer`.

Não escreva texto comercial diretamente em `js/main.js`.

## Logo e elemento gráfico

- Logo oficial: `assets/brand/dratos-logo.png`.
- Elemento oficial: `assets/brand/dratos-elemento.png`.

Os caminhos ficam em `assets` dentro de cada arquivo de conteúdo. Substitua apenas por versões oficiais, preserve a proporção e mantenha os nomes para evitar ajustes adicionais.

## Imagens

Coloque imagens em `assets/images/`, preferencialmente em AVIF ou WebP. Inclua o caminho no objeto `assets` ou na seção correspondente dos três idiomas. Informe dimensões no HTML gerado para evitar deslocamento de layout.

## Vídeos, poster, legenda e transcript

As 16 cenas ficam em `journey.scenes`. Cada cena contém:

- `title` e `duration`;
- `line` — transcript curto;
- `movement` — direção de cena;
- `screen` — texto de tela;
- `video` — caminho do MP4;
- `captions` — caminho do VTT;
- `status` — “Em produção” ou “Disponível”;
- `poster` — thumbnail real extraída do vídeo.

Para publicar um vídeo:

1. coloque o MP4 em `assets/video/` e o poster 16:9 em `assets/video/posters/`;
2. confira `video` e `captions` em `content/pt.js`;
3. traduza o VTT quando necessário e aponte o idioma correspondente;
4. altere `status` para “Disponível”, `Available` e `Disponible`;
5. use `assets/images/video-poster.svg` apenas como fallback global.

Nenhum vídeo inicia automaticamente com som. O player é carregado somente após a interação do visitante.

## Formulário e endpoint

Campos e mensagens ficam em `form`. A configuração fica em `settings`:

```js
settings: {
  formEndpoint: "https://seu-endpoint.example/demos",
  mailtoFallback: "contato@dratos.com.br",
  privacyUrl: "https://example.com/privacidade"
}
```

Com `formEndpoint` vazio, o formulário prepara um `mailto:` para `contato@dratos.com.br`. O visitante revisa e confirma o envio no próprio cliente de e-mail. Para não usar esse fallback, deixe `mailtoFallback` vazio.

## Planos, FAQ, módulos e integrações

- Planos: `plans.items`.
- FAQ: `faq.items`.
- Módulos: `platform.modules`.
- Integrações: `integrations.items` e `integrations.totvs`.
- Métricas demonstrativas: `hero.metrics`, `performance` e `dashboard.kpis`.

Status recomendados: “Configurável”, “Em evolução”, “Disponível conforme integração” ou “Planejado”. Não transforme funcionalidades planejadas em promessas operacionais.

## Nova integração

1. adicione um item em `integrations.items` nos três idiomas;
2. informe nome, tipo e status real;
3. se houver detalhes, crie um objeto específico como `integrations.totvs`;
4. não utilize logotipo de terceiro sem autorização.

## Cores, temas e layout

Tokens globais estão no início de `css/style.css`. O tema escuro usa `[data-theme="dark"]`. Componentes e breakpoints ficam no mesmo arquivo.

## Canonical, sitemap e GitHub Pages

1. defina `meta.canonical` nos três idiomas;
2. substitua a URL de exemplo em `sitemap.xml` e `robots.txt`;
3. publique a raiz do repositório em **Settings → Pages**.
