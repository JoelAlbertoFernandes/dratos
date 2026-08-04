# Manutenção e alterações futuras

## Alterar textos

Edite `app/page.tsx`. Mantenha textos curtos nos cards para preservar equilíbrio e responsividade.

## Alterar funcionalidades

O array `capabilities` controla os nove cards. Cada item possui número, ícone, título, resumo e detalhamento do verso.

## Alterar respostas do RiskAI

O objeto `aiAnswers` possui respostas demonstrativas para performance, risco e obrigações. Para dados reais, substitua a função `askRiskAI` por uma chamada autenticada à API da plataforma.

## Alterar vídeo

- capítulos: array `chapters` em `app/page.tsx`;
- endereço do vídeo e poster: elementos `<source>` e `<img>`;
- transições: classes `.transition-fx` e `.chapter-overlay`.

## Alterar a hero

- imagem principal: `.hero-cinematic-bg` em `app/globals.css`;
- intensidade de transparência: `.hero-cinematic-grade`;
- movimento: animação `heroCinema`;
- gráficos: bloco `.hero-product` em `app/page.tsx`.

## Alterar temas

O modo claro é definido pelos seletores `[data-theme="light"]`. O tema escolhido fica em `localStorage` com a chave `dratos-theme`.

## Verificação antes de publicar

1. Testar desktop e celular.
2. Abrir e fechar vídeo e formulário.
3. Virar os nove cards.
4. Testar as perguntas do RiskAI.
5. Alternar claro/escuro.
6. Confirmar links e e-mail.
7. Executar `npm run build` e `npm test`.

## Recuperação

A versão estática anterior pode ser recuperada pelo histórico do GitHub. Nunca apague ou reescreva o histórico para desfazer uma alteração.
