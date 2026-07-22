# Informações do projeto DRATOS

## Objetivo

Apresentar a DRATOS como uma jornada de governança contratual para organizações privadas, públicas e reguladas. TOTVS RM aparece como integração existente e relevante, sem limitar o posicionamento da plataforma.

## Arquitetura

A aplicação é estática, sem build e sem dependências de runtime:

```text
index.html
├── content/pt.js
├── js/content-loader.js
├── js/main.js
└── css/style.css
```

Os caminhos relativos são compatíveis com `/dratos/` no GitHub Pages.

## Design System aplicado

Fonte oficial: `DesignsystemDratos.txt`.

| Token | Valor | Uso |
|---|---|---|
| Deep Void | `#0B0D10` | fundos premium e camadas escuras |
| Surface Tech | `#161A22` | painéis, modais e cards técnicos |
| Dratos Cyan | `#3A96DD` | ação primária e conexão |
| Electric Glow | `#60B2FA` | realce, foco e motion luminoso |
| Success Emerald | `#10B981` | conformidade e conclusão |
| Slate Gray | `#94A3B8` | texto secundário |

Tipografia: Plus Jakarta Sans 600–800 para títulos; Inter 400–700 para corpo e interface.

## Extensões coerentes

Itens não definidos no arquivo oficial foram derivados para acessibilidade e alternância de tema:

- fundo claro `#F6F9FC`;
- texto claro `#0B1628`;
- atenção `#FBBF24`;
- risco `#F97373`;
- raios de 12, 20 e 32 px;
- sombras suaves e profundas baseadas em azul-marinho/preto;
- grid técnico com baixa opacidade;
- movimento contínuo entre 12 e 30 segundos, limitado a escala 1.035 e deslocamentos inferiores a 12 px.

## Componentes

- header transformável e menu responsivo;
- 20 camadas narrativas com atmosferas distintas;
- Hero cinematográfico e frames extraídos do vídeo;
- RiskAI com checks explicáveis;
- consulta rápida simulada com SVG, barras e listas geradas pelo frontend;
- Performance parametrizável, Dossiê Auditável e Dashboard Executivo;
- modal de vídeo, formulário e tema claro/escuro acessíveis.

## Mídia e performance

O runtime referencia apenas `dratos-apresentacao-completa.mp4`, com `preload="none"`. Onze frames WebP 1280×720 usam lazy loading, exceto o Hero. Os 16 MP4s individuais permanecem no repositório e são removidos apenas do artefato publicado.

As animações usam transform/opacity e são desativadas em `prefers-reduced-motion`. Não há canvas ou biblioteca de animação.

## Limitações de frontend

- RiskAI e consulta rápida são demonstrações visuais com dados fictícios;
- envio direto do formulário depende de endpoint;
- gráficos não consultam dados reais;
- integrações, checks e alertas dependem das APIs e regras da plataforma;
- nenhuma certificação de segurança é declarada.

## Publicação

Repositório oficial: `https://github.com/JoelAlbertoFernandes/dratos`.

GitHub Pages: `https://joelalbertofernandes.github.io/dratos/`.
