# Publicação e domínio

## Hospedagem atual

A aplicação está publicada pelo Sites sobre Cloudflare Workers.

Endereço público:

`https://dratos-inteligencia-contratos.joelfernandes.chatgpt.site`

## Domínio oficial

O domínio cadastrado é `dratos.com.br`. A ativação depende da validação dos registros DNS fornecidos pela hospedagem.

Registros solicitados em 04/08/2026:

| Tipo | Nome | Valor |
| --- | --- | --- |
| A | @ | 162.159.143.30 |
| A | @ | 172.66.3.26 |
| TXT | _openai-site-verification | openai-site-verification=5mF_BOo2OfuykgoBU8OCnDowa0LrEI8MRznaa572Q7w |
| TXT | _cf-custom-hostname | d248cd70-0629-40ad-85b4-83969af1ba63 |

Remova apenas os registros conflitantes do domínio raiz que apontavam para a hospedagem anterior. Preserve MX, SPF, DKIM, DMARC e demais registros de e-mail.

## GitHub

O GitHub é a fonte documental e de versionamento. A hospedagem pública não deve depender do GitHub Pages enquanto o projeto utilizar Vinext e Cloudflare Worker.

## Fluxo recomendado

1. Alterar o código em uma branch.
2. Validar localmente.
3. Revisar a diferença.
4. Fazer merge na branch principal.
5. Criar uma nova publicação.
6. Confirmar o domínio e o certificado SSL.
