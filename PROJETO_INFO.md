# Informações do projeto DRATOS

## Objetivo

Apresentar a DRATOS como plataforma universal de governança contratual para empresas privadas, governo, estatais e operações reguladas. TOTVS RM aparece como integração inicial prioritária, sem dominar o posicionamento da marca.

## Arquitetura

A landing page é uma aplicação estática, sem build ou dependências externas:

```text
index.html
├── content/*.js
├── js/content-loader.js
├── js/main.js
└── css/style.css
```

`content-loader.js` seleciona idioma e tema, persiste preferências e atualiza metadados. `main.js` transforma o conteúdo em componentes sem manter textos comerciais próprios. A renderização é integral no cliente e usa âncoras, por isso não exige fallback de rotas no GitHub Pages.

## Componentes

- header fixo e menu responsivo;
- hero com mockup executivo;
- problema e transformação antes/depois;
- carrossel narrativo das 16 cenas;
- mapa de fontes de dados;
- explorador de 15 módulos;
- painel e vídeo destacado de Performance;
- Dossiê Auditável entre Performance e Dashboard;
- dashboard executivo;
- integrações e caso TOTVS RM;
- perfis, segurança e arquitetura;
- setor público e regulados;
- planos, Founding Clients, FAQ e CTA final;
- biblioteca de demonstrações por funcionalidade;
- modal de vídeo e formulário de demonstração.

## Conteúdo e idiomas

PT-BR é o idioma padrão. Inglês e espanhol possuem conteúdo completo para todas as áreas visíveis. Ativos, configurações técnicas e dados que não requerem tradução são herdados da configuração-base. A preferência é salva em `localStorage`.

## Temas

O modo claro é predominante. O modo escuro é opcional e usa tokens CSS próprios. A preferência é persistida. A folha respeita `prefers-reduced-motion`.

## Vídeos

Os 16 vídeos reais possuem MP4, VTT, poster individual, título, duração, transcript, direção e status. O player usa moldura premium, proporção 16:9, `preload="metadata"`, controles nativos e nunca inicia automaticamente com som. Caso um arquivo futuro não exista, o fallback visual permanece disponível.

## Formulário

Campos HTML nativos fornecem validação. Sem endpoint, o formulário abre um `mailto:` endereçado a `contato@dratos.com.br`, e o usuário confirma o envio no próprio cliente de e-mail. Quando configurado, o envio usa `POST` JSON. Segurança, consentimento, rate limiting e retenção devem ser implementados no backend de produção.

## SEO

- title e description localizados;
- Open Graph e Twitter Card;
- canonical configurável;
- JSON-LD `Organization`;
- `robots.txt`, `sitemap.xml` e manifest;
- headings semânticos e conteúdo navegável.

## Acessibilidade

- link de salto;
- foco visível;
- labels e validação de formulário;
- diálogos com foco inicial, Escape e contenção de Tab;
- controles com nomes acessíveis;
- contraste e tema escuro;
- movimento reduzido;
- vídeos preparados para legendas e transcript.

## Performance

- zero bibliotecas de runtime;
- imagens secundárias com lazy loading;
- vídeos carregados apenas sob demanda;
- animações em transform e opacity;
- dimensões declaradas para assets;
- CSS e JavaScript locais;
- compatibilidade com cache estático do GitHub Pages.

## Deploy

Arquivos e links internos usam caminhos relativos. Antes de produção, configure canonical, sitemap, robots, endpoint do formulário, política de privacidade e vídeos definitivos.
