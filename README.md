# DRATOS — Landing Page Institucional

Landing page comercial e demonstrativa da plataforma **DRATOS — Contratos Inteligentes**. A experiência apresenta a jornada completa: fontes de dados, requisição, autoria, negociação, Due Diligence, aprovações, assinatura, obrigações, performance e dossiê auditável.

## Stack

- HTML5 semântico;
- CSS responsivo, temas claro/escuro e animações leves;
- JavaScript puro, sem dependências de produção;
- conteúdo externo em PT-BR, inglês e espanhol;
- publicação estática compatível com GitHub Pages.

## Executar localmente

A página funciona quando aberta diretamente, mas um servidor local oferece um teste mais fiel:

```powershell
python -m http.server 4173
```

Acesse `http://localhost:4173`.

Alternativa com Node.js:

```powershell
npx serve . -l 4173
```

Não há etapa de instalação ou build.

## Validar

```powershell
node --check content/pt.js
node --check content/en.js
node --check content/es.js
node --check js/content-loader.js
node --check js/main.js
```

Também valide manualmente:

1. navegação e menu em desktop e celular;
2. PT, EN e ES;
3. tema claro e escuro;
4. explorador de módulos e carrossel das 16 cenas;
5. modais, FAQ e formulário;
6. foco por teclado e movimento reduzido;
7. console do navegador sem erros.

## Publicar no GitHub Pages

1. Substitua a URL de exemplo em `sitemap.xml` e `robots.txt`.
2. Preencha `meta.canonical` nos três arquivos em `content/`.
3. Envie os arquivos para um repositório GitHub.
4. Em **Settings → Pages**, escolha **Deploy from a branch**.
5. Selecione a branch publicada e a pasta `/ (root)`.

Todos os caminhos são relativos e funcionam em subdiretório de projeto.

## Estrutura principal

- `index.html`: metadados, pontos de montagem e scripts.
- `content/`: textos, CTAs, links, vídeos, planos, FAQ e configurações por idioma.
- `css/style.css`: design system, layout, temas e responsividade.
- `js/content-loader.js`: idioma, tema, metadados e JSON-LD.
- `js/main.js`: componentes, renderização e interações.
- `assets/brand/`: marca oficial.
- `assets/video/`: 16 MP4s reais, legendas VTT e posters por cena.
- `COMO_EDITAR.md`: manual de manutenção de conteúdo.
- `PROJETO_INFO.md`: arquitetura e decisões técnicas.
- `MAPA_DA_LANDING_PAGE.md`: mapa de seções, conteúdo e assets.

## Formulário

Sem backend, o formulário valida os campos e prepara uma mensagem no cliente de e-mail do visitante para `contato@dratos.com.br`; o envio só acontece após confirmação da própria pessoa. Para integração direta, configure `settings.formEndpoint`. O endpoint deve aceitar JSON via `POST` e implementar consentimento, segurança, retenção e tratamento de dados adequados.

## Troubleshooting

- **Vídeo não abre**: confirme o MP4 e o poster correspondente em `assets/video/` e `assets/video/posters/`.
- **GitHub Pages abre sem estilos**: confirme que a estrutura de pastas e os caminhos relativos foram mantidos.
- **Idioma não muda**: limpe `dratos-language` no armazenamento local e recarregue.
- **Tema não muda**: limpe `dratos-theme` no armazenamento local.
- **Formulário não envia**: isso é intencional enquanto `formEndpoint` estiver vazio.
