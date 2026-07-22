# Como editar a landing page DRATOS V3

Todo conteúdo textual principal está nos arquivos:

- `content/pt.js`
- `content/en.js`
- `content/es.js`

## Alterar textos e CTAs

Abra o arquivo do idioma desejado e edite a propriedade correspondente. Por exemplo:

```js
hero: {
  title: "Novo título",
  text: "Nova descrição"
}
```

As listas de cards, módulos, benefícios, planos e FAQs também são controladas nesses arquivos.

## Alterar links

Os links internos do menu estão na propriedade `nav`. Cada item possui o texto e o identificador da seção.

O e-mail de contato está em `footer.contact`.

## Adicionar vídeo

Cada módulo possui um caminho de vídeo configurável em `content/pt.js`, dentro de `modules`.

Exemplo:

```js
video: "assets/video/modulo-sala-juridica.mp4"
```

Vídeos previstos:

- `modulo-conectores.mp4`
- `modulo-requisicoes.mp4`
- `modulo-autoria.mp4`
- `modulo-biblioteca.mp4`
- `modulo-sala-juridica.mp4`
- `modulo-due-diligence.mp4`
- `modulo-aprovacoes-assinatura.mp4`
- `modulo-obrigacoes.mp4`
- `modulo-dossie.mp4`

Enquanto o arquivo não existir, a página exibe um placeholder premium. Para habilitar reprodução real, conecte o caminho a uma tag `<video>` em `js/main.js`.

## Logo oficial

O logo original utilizado em toda a landing page está em:

`assets/logo/dratos-logo.png`

Substitua somente por uma nova versão oficial da marca, preservando o mesmo nome de arquivo. Não recrie o símbolo em CSS.

## Adicionar imagens

Coloque imagens em `assets/images/` e referencie seus caminhos nos arquivos de conteúdo ou em `js/main.js`. Recomenda-se WebP ou PNG otimizado.

Espaços previstos para substituições futuras:

- `hero-dashboard.png`
- `totvs-integration.png`
- `workflow-contracts.png`
- `audit-dossier.png`
- `sala-juridica.png`
- `autoria-contratual.png`
- `biblioteca-clausulas.png`

A versão atual utiliza objetos 3D, interfaces e diagramas construídos em CSS para permanecer leve e funcionar sem dependências externas.

## Alterar planos

Edite `plans.items` em cada arquivo de conteúdo. Preço, descrição, recursos e plano recomendado são editáveis.

## Alterar módulos

Os nove capítulos da demonstração ficam em `modules`, no arquivo de conteúdo. Cada módulo contém:

- título e explicação;
- funcionalidades;
- quem usa;
- problema resolvido;
- valor gerado;
- caminho do vídeo;
- tipo de mockup visual.

## Alterar cores e aparência

As cores principais estão nas variáveis do início de `css/style.css`. Os temas claro e escuro possuem tokens separados. Os objetos 3D, hubs, fluxos, escudo e diagramas também são controlados nesse arquivo.

## Formulário

O formulário de demonstração é mockado e não envia dados. Para produção, conecte o evento de envio em `js/main.js` a um CRM, formulário ou endpoint seguro.

## Publicar no GitHub Pages

1. Envie todo o conteúdo da pasta `landing-page` para um repositório.
2. Acesse `Settings > Pages`.
3. Escolha a branch e a pasta raiz.
4. Salve e aguarde a URL pública.

Não são necessários build, backend ou instalação de pacotes.
