# Mapa da landing page DRATOS

| Ordem | Seção / componente | Conteúdo | Componente visual / asset |
|---:|---|---|---|
| 1 | Header | `nav`, `actions`, `header` | Logo oficial, idioma, tema e menu |
| 2 | Hero | `hero` | Mockup executivo, métricas e elemento oficial |
| 3 | O caos invisível | `problem` | Fragmentos e evidência ilustrativa |
| 4 | Resposta DRATOS | `promise` | Comparação antes/depois |
| 5 | 16 cenas | `journey` | Helena, cards, modal, MP4/VTT/poster |
| 6 | Fontes de dados | `sources` | Hub, fontes e fluxo de normalização |
| 7 | Plataforma | `platform.modules` | Explorador com 15 módulos e vídeos contextuais |
| 8 | Performance | `performance` | Nota, SLA, entregas, modelos e vídeo real |
| 9 | Dossiê Auditável | `dossierSpotlight` | Convergência de obrigações, performance e evidências |
| 10 | Dashboard | `dashboard` | Seis visões, filtros, KPIs e vídeo real |
| 11 | Integrações | `integrations` | Ecossistema e caso TOTVS RM |
| 12 | Biblioteca de vídeos | `videoLibrary` | Onze demonstrações por funcionalidade |
| 13 | Perfis e acesso | `access` | Órbita de oito perfis e contextos |
| 14 | Segurança | `security` | Controles e acordeão de stack técnica |
| 15 | Setor público | `publicSector` | Aplicações reguladas e prestação de contas |
| 16 | Planos | `plans` | Cinco planos sem preços definitivos |
| 17 | Founding Clients | `founding` | Etapas do programa e CTA |
| 18 | FAQ | `faq` | Quinze perguntas e respostas |
| 19 | CTA final | `finalCta`, `actions` | Marca oficial e três CTAs |
| 20 | Formulário | `form`, `settings` | Validação, endpoint futuro e fallback por e-mail |
| 21 | Footer | `footer` | Logo, contato, links e privacidade |

## Código estrutural

- `index.html`: metadados-base e montagem.
- `js/content-loader.js`: estado de idioma, tema e SEO.
- `js/main.js`: renderização e interações.
- `css/style.css`: tokens, layouts, componentes, temas e breakpoints.

## Assets

- `assets/brand/dratos-logo.png`: logotipo oficial.
- `assets/brand/dratos-elemento.png`: elemento oficial.
- `assets/images/video-poster.svg`: fallback global editável.
- `assets/video/*.mp4`: 16 vídeos reais.
- `assets/video/posters/*.jpg`: posters individuais em 16:9.
- `assets/video/*.vtt`: legendas iniciais.
