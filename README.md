# DRATOS — Landing Page Institucional

Apresentação executiva interativa da plataforma DRATOS. A experiência percorre 20 camadas, do problema contratual à visão executiva, com RiskAI, Performance, Dossiê Auditável, integrações e governança.

## Versão oficial

```text
J:\Meu Drive\Dratos Landing-page\Demo Cliente TOTVS
```

Repositório: `https://github.com/JoelAlbertoFernandes/dratos`

GitHub Pages: `https://joelalbertofernandes.github.io/dratos/`

## Executar localmente

```powershell
python -m http.server 4173 --bind 127.0.0.1
```

Acesse `http://127.0.0.1:4173/`.

## Validar

```powershell
node --check content/pt.js
node --check js/content-loader.js
node --check js/main.js
git diff --check
```

Valide também tema, menu, RiskAI, consulta demonstrativa, modal, formulário, desktop, tablet, mobile e ausência de overflow horizontal.

## Design System

`DesignsystemDratos.txt` é a referência oficial. A landing usa:

- Deep Void `#0B0D10`;
- Surface Tech `#161A22`;
- Dratos Cyan `#3A96DD`;
- Electric Glow `#60B2FA`;
- Success Emerald `#10B981`;
- Slate Gray `#94A3B8`;
- Plus Jakarta Sans para títulos;
- Inter para corpo e interface.

## Mídia

- `assets/video/dratos-apresentacao-completa.mp4`: único vídeo utilizado no runtime;
- `assets/video/posters/dratos-apresentacao-completa.webp`: poster institucional;
- `assets/images/video-frames/`: onze WebP extraídos do vídeo completo;
- `assets/video/01-*.mp4` a `16-*.mp4`: arquivos preservados no repositório, sem carregamento ou publicação no artefato do Pages.

O vídeo usa `preload="none"`, abre somente sob demanda e não possui transcript, track ou autoplay.

## Estrutura

- `index.html`: metadados, fontes e pontos de montagem;
- `content/pt.js`: fonte única de conteúdo público em PT-BR;
- `js/content-loader.js`: SEO e tema persistido;
- `js/main.js`: renderização e interações;
- `css/style.css`: Design System, camadas, motion e responsividade;
- `.github/workflows/deploy-pages.yml`: validação e publicação estática.

## Formulário

Sem backend, o formulário prepara uma mensagem para `contato@dratos.com.br`. Para envio direto, configure `settings.formEndpoint` e implemente consentimento, proteção contra abuso, retenção e segurança no backend.
