# DRATOS — Landing Page Institucional

Landing page estática da plataforma DRATOS — Contratos Inteligentes. A publicação apresenta requisição, autoria, negociação, Due Diligence, aprovações, assinatura, obrigações, performance, Dossiê Auditável e Dashboard Executivo.

## Versão oficial

O projeto oficial é mantido em:

```text
J:\Meu Drive\Dratos Landing-page\Demo Cliente TOTVS
```

O conteúdo público é exclusivamente português brasileiro. Não há etapa de instalação ou build.

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

Teste também Hero, menu, tema, módulos, Performance, Dossiê, Dashboard, formulário e todos os players em desktop e mobile. Somente o botão de tema pode alterar `data-theme`.

## Vídeos

- `assets/video/dratos-apresentacao-completa.mp4`: apresentação institucional com as 16 cenas.
- `assets/video/01-*.mp4` a `16-*.mp4`: cenas individuais preservadas.
- dez cenas essenciais aparecem em “Demonstrações por funcionalidade”.
- o modal contém somente o vídeo 16:9 e o botão de fechar.
- não há `<track>`, caption automática ou transcript visual.

O comando reprodutível fica em `scripts/gerar-video-completo.ps1`.

## Formulário

Sem backend, o formulário prepara um e-mail para `contato@dratos.com.br`. O visitante revisa e confirma o envio no cliente de e-mail. Para envio direto, configure `settings.formEndpoint` em `content/pt.js` e implemente segurança, consentimento, rate limiting e retenção no backend.

## GitHub Pages

O workflow `.github/workflows/deploy-pages.yml` valida o JavaScript, monta um artefato estático e publica pelo GitHub Pages. Todos os caminhos de runtime são relativos e compatíveis com o subdiretório `/dratos/`.

Repositório oficial: `https://github.com/JoelAlbertoFernandes/dratos`.

Destino previsto: `https://joelalbertofernandes.github.io/dratos/`.

## Estrutura

- `index.html`: metadados e pontos de montagem.
- `content/pt.js`: conteúdo, mídias, contato e configurações.
- `js/content-loader.js`: metadados e tema persistido.
- `js/main.js`: componentes e interações.
- `css/style.css`: design system e responsividade.
- `assets/brand/`: marca oficial.
- `assets/images/`: Hero e imagens auxiliares.
- `assets/video/`: vídeos completos e individuais.
- `scripts/`: geração reprodutível do vídeo institucional.

## Troubleshooting

- Vídeo não abre: confirme MP4 e poster e execute por servidor HTTP.
- Tema muda em outro clique: verifique listeners; apenas `[data-theme-toggle]` pode chamar `toggleTheme()`.
- Pages sem estilos: mantenha os caminhos relativos e confira o artefato `_site` no workflow.
- Formulário não envia sozinho: comportamento esperado enquanto `formEndpoint` estiver vazio.
