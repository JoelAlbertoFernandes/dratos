# Arquitetura da landing page

## Visão geral

A página é uma aplicação React de rota única, preparada para execução em Cloudflare Workers pelo Vinext. A interface é renderizada pelo componente principal e utiliza estado local somente para interações de apresentação.

## Camadas

### Interface

`app/page.tsx` contém:

- navegação e cabeçalho;
- alternância claro/escuro;
- dashboard da hero;
- cards reversíveis de capacidades;
- consulta demonstrativa ao RiskAI;
- vídeo e capítulos;
- formulário de demonstração;
- seções de segurança, integrações e auditoria.

### Sistema visual

`app/globals.css` centraliza:

- variáveis de cor;
- composição cinematográfica;
- animações discretas;
- dashboards e gráficos CSS/SVG;
- estados de interação e foco;
- temas claro e escuro;
- breakpoints para desktop, tablet e celular;
- redução de movimento conforme preferência de acessibilidade.

### Assets

`public/brand/` contém elementos oficiais da marca. `public/images/` contém as imagens PNG cinematográficas usadas na hero.

### Execução

`worker/index.ts` é a entrada Cloudflare Worker. `vite.config.ts` integra Vinext, Vite, Sites e bindings opcionais. O build precisa gerar `dist/server/index.js` com `default.fetch` executável.

### Dados futuros

`db/`, `drizzle.config.ts` e `drizzle/` deixam o projeto preparado para D1. A landing page atual não depende de banco de dados.

## Estados locais

- `theme`: modo visual escolhido;
- `menu`: navegação móvel;
- `player`: modal do vídeo;
- `demo`: formulário de demonstração;
- `chapter`: capítulo ativo;
- `flipped`: card de capacidade virado;
- `question` e `answerKey`: demonstração da consulta RiskAI.

## Dependências externas

- vídeo institucional e poster hospedados em `dratos.com.br`;
- abertura do cliente de e-mail para envio da solicitação de demonstração;
- fontes do sistema, sem dependência de provedor de fontes.

## Decisões de arquitetura

- aplicação de rota única para manter a narrativa fluida;
- interações sem banco de dados para reduzir complexidade operacional;
- imagens locais para estabilidade visual;
- CSS nativo para evitar bibliotecas visuais pesadas;
- acessibilidade por rótulos, foco visível e respeito a movimento reduzido.
