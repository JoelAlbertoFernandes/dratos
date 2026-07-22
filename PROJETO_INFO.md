# Informações do projeto DRATOS

## Objetivo

Apresentar a DRATOS como plataforma de governança contratual para empresas privadas, governo, estatais e operações reguladas. TOTVS RM permanece como integração inicial prioritária, sem limitar o posicionamento da plataforma.

## Arquitetura

A aplicação é estática, sem build e sem dependências de runtime:

```text
index.html
├── content/pt.js
├── js/content-loader.js
├── js/main.js
└── css/style.css
```

`content-loader.js` aplica PT-BR, metadados e tema. `main.js` renderiza os componentes. Os caminhos relativos funcionam no subdiretório do GitHub Pages.

## Componentes

- header fixo e menu responsivo;
- Hero cinematográfico com Helena e mockup executivo;
- diagrama “Quatro rupturas críticas”;
- comparação antes/depois;
- fontes de dados e conectores;
- explorador de 15 módulos;
- Performance, Dossiê e Dashboard;
- integrações e caso TOTVS RM;
- dez demonstrações por funcionalidade;
- perfis, segurança, setor público, planos, Founding Clients, FAQ e CTA;
- modal limpo de vídeo e modal de formulário.

## Tema

O modo claro é predominante e o escuro opcional. A preferência fica em `localStorage`. Apenas o botão dedicado chama `toggleTheme()`; os demais cliques não renderizam nem alteram o tema.

## Vídeos

Os 16 MP4s individuais permanecem preservados. O vídeo `dratos-apresentacao-completa.mp4` reúne as cenas na ordem oficial. Os players são 16:9, usam controles nativos, não iniciam automaticamente e não carregam `<track>`, VTT ou transcript visual.

## Formulário e contato

O contato oficial é `contato@dratos.com.br`. Sem endpoint, o formulário abre um `mailto:` e o visitante confirma o envio. Com endpoint, o payload é JSON via `POST`.

## Acessibilidade

- link de salto e foco visível;
- menu e controles nomeados;
- diálogos com foco, contenção de Tab, `Esc`, clique externo e restauração de foco;
- scroll lock durante modal;
- suporte a movimento reduzido.

## Publicação

`.github/workflows/deploy-pages.yml` valida o código e publica um artefato estático. A URL preparada é `https://joelalbertofernandes.github.io/dratos/`. O repositório oficial é `https://github.com/JoelAlbertoFernandes/dratos`.
