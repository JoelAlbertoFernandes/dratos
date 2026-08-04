# DRATOS — Inteligência em Contratos

Landing page institucional da DRATOS, plataforma de governança contratual inteligente da Infinita-IA Labs.

## Site publicado

- Endereço temporário: https://dratos-inteligencia-contratos.joelfernandes.chatgpt.site
- Domínio oficial em configuração: https://dratos.com.br
- Contato: contato@dratos.com.br

## Proposta da landing page

A página apresenta a jornada contratual da requisição ao dossiê auditável, conectando dados, pessoas, documentos, aprovações, obrigações, riscos e performance.

Principais experiências:

- hero cinematográfica com movimento sutil;
- dashboard executivo com indicadores e gráficos;
- alternância entre modos claro e escuro;
- nove capacidades com cards interativos;
- consulta simulada ao RiskAI com resposta executiva;
- vídeo institucional organizado por capítulos;
- segurança, governança e rastreabilidade enterprise;
- integrações com ERP, TOTVS RM, compras, APIs e formulários;
- dossiê auditável em linha do tempo;
- formulário para solicitar demonstração.

## Tecnologias

- React 19
- Next.js 16
- TypeScript 5
- Vinext e Vite
- Cloudflare Workers
- CSS responsivo e acessível
- Drizzle ORM preparado para futura persistência D1

## Estrutura principal

```text
app/
  layout.tsx          Metadados e estrutura global
  page.tsx            Conteúdo e interações da landing page
  globals.css         Sistema visual e responsividade
public/
  brand/              Logotipo e elemento gráfico
  images/             Imagens cinematográficas da hero
docs/
  ARQUITETURA.md       Arquitetura e responsabilidades
  CONTEUDO-E-SECOES.md Mapa completo da narrativa
  PUBLICACAO.md        Publicação, domínio e DNS
  MANUTENCAO.md        Guia para alterações futuras
worker/                Entrada do Worker
scripts/               Instalação, build e validação
tests/                 Verificações do HTML renderizado
```

## Desenvolvimento local

Pré-requisitos:

- Node.js 22.13 ou superior
- npm

Instalação:

```bash
npm install
```

Execução local:

```bash
npm run dev
```

Build validado:

```bash
npm run build
```

Testes:

```bash
npm test
```

## Edição rápida

- Textos, cards, perguntas RiskAI e capítulos do vídeo: `app/page.tsx`
- Cores, temas, movimentos e responsividade: `app/globals.css`
- Título, descrição e metadados: `app/layout.tsx`
- Logos e imagens: `public/`
- Configuração da hospedagem: `.openai/hosting.json`

Leia [docs/MANUTENCAO.md](docs/MANUTENCAO.md) antes de alterações estruturais.

## Segurança e operação

- Nenhuma senha ou token deve ser versionado.
- O formulário de demonstração abre uma mensagem para `contato@dratos.com.br`.
- O modo visual escolhido é salvo apenas no navegador do visitante.
- A decisão sugerida pelo RiskAI permanece apresentada como humana, autorizada e rastreável.

## Histórico

A landing page estática anterior permanece recuperável pelo histórico do GitHub anterior à migração de agosto de 2026. Os materiais de referência preservados estão em `docs/referencias/`.

## Direitos

© 2026 DRATOS · Infinita-IA Labs. Todos os direitos reservados.
