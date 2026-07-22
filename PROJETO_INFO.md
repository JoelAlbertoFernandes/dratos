# Informações do projeto - V3

## Objetivo

Apresentar a DRATOS como uma demonstração comercial guiada da plataforma, conduzindo clientes e parceiros do problema inicial até cada módulo da jornada contratual.

## Posicionamento

A DRATOS não é apresentada como produto para TOTVS. Ela se conecta aos dados atuais da organização, incluindo ERPs, TOTVS, planilhas, APIs, formulários e bases externas.

## Estrutura narrativa

1. Apresentação da plataforma.
2. Problemas anteriores à DRATOS.
3. Jornada contratual clicável.
4. Demonstração dos nove módulos.
5. Segurança e governança.
6. Conectores e integrações.
7. Planos e vídeos por módulo.
8. FAQ e convite para demonstração aplicada.

## Arquitetura

O projeto utiliza HTML, CSS e JavaScript puros, sem dependências externas obrigatórias.

- `index.html` contém apenas metadados, pontos de montagem e referências aos arquivos.
- `content/*.js` contém os textos editáveis.
- `js/content-loader.js` controla idioma e persistência local.
- `js/main.js` renderiza componentes e controla as interações.
- `css/style.css` contém tokens, componentes, responsividade e temas.

## Padrão visual

A versão V3 preserva a linguagem enterprise futurista predominantemente clara:

- Objetos 3D recriados em CSS.
- Vidro fosco, metal leve, azul, prata e ciano.
- Diagramas com hubs, órbitas, conexões e fluxos.
- Seções amplas inspiradas em apresentações premium SaaS e Legal Tech.
- Uma narrativa visual dominante por seção, evitando grids genéricos repetitivos.
- Logo oficial utilizado como arquivo original em todas as aparições institucionais.
- Capítulos amplos com explicação, mockup, vídeo e resultados de cada módulo.

## Interações implementadas

- Navegação por âncoras.
- Menu responsivo.
- Alternância light/dark.
- Alternância PT/EN/ES.
- FAQ expansível.
- Modal de demonstração.
- Seleção de plano.
- Formulário mockado.
- Feedback por toast.
- Animações de entrada.
- Jornada clicável.
- Diretório de módulos.
- Placeholders individuais para vídeos explicativos.
- Biblioteca de vídeos por módulo.

## Manutenção

O conteúdo textual deve permanecer em `content/`. Elementos estruturais e composições visuais ficam em `js/main.js`; tokens e estilos ficam em `css/style.css`. Ao adicionar uma nova seção, inclua o conteúdo nos três idiomas e mantenha os caminhos relativos para compatibilidade com GitHub Pages.

## Publicação

Todos os caminhos são relativos, permitindo abrir `index.html` localmente e publicar a pasta em serviços estáticos como GitHub Pages, Cloudflare Pages e Netlify.
