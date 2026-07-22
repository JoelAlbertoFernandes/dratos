# Plataforma de Gestão de Contratos — Funcionalidades Completas

> **Objetivo deste documento:** Servir como referência completa das funcionalidades da plataforma para o desenvolvimento de uma landing page institucional/comercial.

---

## Visão Geral da Plataforma

A **Plataforma de Gestão de Contratos** é um sistema corporativo completo para gerenciar todo o ciclo de vida de contratos — desde a solicitação inicial até a conclusão com assinatura digital. Integrada ao ERP TOTVS RM, oferece controle de acesso granular por perfil, rastreabilidade completa via auditoria, assinatura eletrônica integrada e notificações inteligentes.

### Proposta de Valor

- **Digitalização completa** do fluxo contratual (zero papel)
- **Rastreabilidade total** com auditoria append-only de todas as ações
- **Assinatura eletrônica** integrada (TOTVS Assinatura Eletrônica)
- **Integração nativa** com TOTVS RM (ERP)
- **Controle de acesso granular** por perfil, coligada, filial e centro de custo
- **Notificações inteligentes** — cada pessoa recebe apenas o que é relevante para seu contexto

---

## Ciclo de Vida do Contrato

O contrato percorre um fluxo estruturado de etapas, cada uma com controles, validações e responsáveis definidos:

```
┌─────────────┐    ┌──────────┐    ┌───────────────┐    ┌────────────┐    ┌────────────┐
│ Solicitação │───▶│ Autoria  │───▶│ Sala Jurídica │───▶│ Assinatura │───▶│ Concluído  │
│  (Pendente) │    │ (Editor) │    │  (Revisão)    │    │   (TAE)    │    │  (Ativo)   │
└─────────────┘    └──────────┘    └───────────────┘    └────────────┘    └────────────┘
       │                │                 │                   │
       ▼                ▼                 ▼                   ▼
   Arquivar         Rejeitar          Devolver            Suspender
                                    para Autoria        Retornar p/ SJ
```

---

## Funcionalidades Detalhadas

### 1. Dashboard Executivo

**O que é:** Painel central de indicadores e análises sobre o portfólio de contratos da organização.

**Características:**
- 6 abas analíticas: Menu Executivo, Fornecedores, Centro de Custo, Categoria e Natureza, Vencimentos, Base de Dados
- Indicadores agregados em cards (total de contratos, valor total, contratos ativos, vencendo)
- Gráfico de barras por mês com drilldown interativo
- Ranking de fornecedores por volume e valor
- Distribuição por centro de custo com visualização proporcional
- Contratos próximos do vencimento com alertas visuais
- Base de dados completa com exportação
- Filtros por contexto (coligada, filial) com suporte a múltiplas filiais simultâneas
- Dados em tempo real via consultas SQL dinâmicas ao ERP

---

### 2. Solicitações de Contrato

**O que é:** Ponto de entrada para toda demanda contratual. Solicitações podem vir do sistema de Compras (integração automática) ou ser criadas diretamente na plataforma.

**Características:**
- Listagem com filtros por status, fornecedor, centro de custo e período
- Paginação e busca global
- Badges visuais de status (Pendente, Homologação, Autoria, Contrato, Arquivada, Rejeitada)
- Consulta de solicitações arquivadas
- Detalhamento com dados do fornecedor, itens, valores, dados bancários e financeiros
- Representantes e testemunhas vinculados
- Gestão de anexos (upload, download, exclusão com streaming binário)
- Ações: Enviar para Autoria, Homologar, Rejeitar (com motivo obrigatório), Arquivar (com motivo obrigatório)
- Duas origens: `COMPRAS` (integração por tabela) e `PLATAFORMA` (formulário na UI)

---

### 3. Nova Solicitação pela Plataforma

**O que é:** Formulário completo para criar solicitações diretamente na plataforma, sem depender do sistema de Compras.

**Características:**
- Formulário multi-seção: Fornecedor, Contrato, Financeiro, Itens
- Busca de fornecedor com autocomplete via GCONSSQL (nome, CNPJ, código)
- Upload opcional de PDF ou DOCX (minuta do fornecedor)
- Solicitante identificado automaticamente via login
- Dados bancários, formas de pagamento, vigência e objeto
- Adição dinâmica de itens com tipo, descrição, quantidade, valor e natureza

---

### 4. Kanban de Contratos

**O que é:** Visualização panorâmica de todos os contratos organizados por etapa do fluxo.

**Características:**
- Colunas por status: Autoria, Sala Jurídica, Assinatura, Concluído
- Cards com informações resumidas (número, fornecedor, valor, data)
- Colunas retráteis para foco em etapas específicas
- Clique no card navega diretamente para a etapa correspondente
- Atualização em tempo real

---

### 5. Autoria de Contrato (Minuta Interna)

**O que é:** Editor de documentos para elaboração da minuta contratual, com versionamento automático e templates reutilizáveis.

**Características:**
- Editor de texto rico (TinyMCE) com formatação avançada
- Versionamento automático (cada salvamento incrementa a versão)
- Geração de conteúdo a partir de matrizes/templates pré-configuradas
- Upload e gestão de anexos (limite 20MB, armazenamento binário)
- Encaminhamento para Sala Jurídica ou direto para Assinatura (bypass jurídico configurável)
- Rejeição com motivo obrigatório
- Renderização do documento final (contrato + anexos selecionados → PDF)

---

### 6. Autoria (Minuta do Fornecedor)

**O que é:** Modo de visualização para contratos cujo documento original foi fornecido pelo contratado.

**Características:**
- Viewer read-only para PDF e DOCX
- Sem geração por matriz (documento já fornecido)
- Mesmas regras de encaminhamento e rejeição da minuta interna
- Preservação do documento original sem alterações

---

### 7. Sala Jurídica

**O que é:** Ambiente de revisão e análise jurídica com canal de comunicação integrado entre as áreas.

**Características:**
- Visualizador do documento contratual (read-only)
- Canal de diálogo por mensagens com referência de cláusula
- Mensagens persistidas com histórico completo
- Aprovação jurídica (muda status para Assinatura)
- Devolução para Autoria com observações
- Rastreabilidade de quem aprovou e quando

---

### 8. Assinatura Digital (TAE)

**O que é:** Módulo de assinatura eletrônica integrado com TOTVS Assinatura Eletrônica (TAE) para coleta de assinaturas digitais.

**Características:**
- Gerenciamento de signatários: nome, e-mail, CPF/CNPJ, tipo (representante/testemunha), origem (contratante/contratada)
- Definição de ordem de assinatura (workflow sequencial)
- Envio idempotente para o TAE (upload de documento → criação de envelope → publicação)
- Acompanhamento de status de cada signatário em tempo real
- Webhooks para recebimento automático de eventos de assinatura
- Polling automático (fallback a cada 1 hora) para garantir sincronização
- Suspensão com motivo obrigatório (cancela envelope, reseta ciclo)
- Retorno para Sala Jurídica (cancela assinatura ativa)
- Conclusão automática quando 100% assinado (download do PDF assinado)
- Reenvio de notificações para signatários pendentes
- Sincronização manual de status
- Suporte a ambientes staging e produção

---

### 9. Contrato Concluído

**O que é:** Visão completa do contrato finalizado com todas as evidências e documentos.

**Características:**
- Stepper visual com todas as etapas completas
- Solicitações vinculadas (via agrupamento)
- Lista de signatários com status de assinatura
- Parcelas financeiras (expansível, via GCONSSQL)
- Modal de visualização do documento assinado (streaming binário via iframe)
- Auditoria de visualização (registra quem acessou)

---

### 10. Assinatura Avulsa

**O que é:** Módulo independente para assinatura de documentos que não estão vinculados a contratos ou solicitações.

**Características:**
- Upload de PDF para assinatura
- CRUD completo (criar, editar título/descrição, excluir rascunho)
- Gerenciamento de signatários com dados diretos
- Integração com TAE (mesma engine de assinatura dos contratos)
- Status: Rascunho → Assinatura → Concluído / Cancelado / Rejeitado / Expirado
- Envio, suspensão, notificação, sincronização e conclusão
- Listagem com filtros e busca

---

### 11. Consulta Jurídica

**O que é:** Canal de comunicação independente entre gestores e equipe jurídica, sem vínculo obrigatório com contratos.

**Características:**
- Criação com assunto, descrição, nível de urgência e anexo opcional
- Chat compartilhado entre gestor e jurídico
- Status: Em andamento → Finalizada
- Histórico completo de mensagens
- Anexos e documentos vinculados
- Acessível por múltiplos perfis (ADMIN, JURÍDICO, ESPECIALISTA, GESTOR)

---

### 12. Central Jurídica

**O que é:** Visão consolidada de todas as demandas jurídicas (contratos em sala jurídica + consultas jurídicas) para a equipe do departamento jurídico.

**Características:**
- Lista unificada de demandas pendentes
- Indicadores de volume e urgência
- Acesso rápido a cada demanda

---

### 13. Notificações por E-mail

**O que é:** Sistema de notificações automáticas por e-mail para manter todos os envolvidos informados sobre o andamento dos contratos.

**Características:**
- Configuração SMTP pela interface (host, porta, usuário, senha, remetente)
- Tipos de notificação configuráveis por perfil RBAC
- Templates HTML profissionais
- Flags globais: solicitante sempre recebe, gestor sempre recebe, mestre recebe tudo
- Log completo de envios com status (sucesso/erro), destinatário, tipo e data
- E-mail de teste com debug detalhado (tempo de envio, configuração SMTP)
- **Filtragem contextual**: cada pessoa recebe apenas notificações do seu contexto (coligada + filial + centro de custo)

---

### 14. Notificações In-App (Widget)

**O que é:** Sistema de notificações em tempo real dentro da plataforma, com ícone de sino na barra superior.

**Características:**
- Sino com badge de contagem de notificações não-lidas
- Listagem paginada por usuário
- Marcar como lida (individual ou todas)
- Cada notificação contém: tipo, título, mensagem, link direto para a tela relevante
- Notificações criadas automaticamente nos eventos do sistema

---

### 15. Ressalvas de Contrato

**O que é:** Registro de pontos de atenção, riscos e observações importantes vinculados a contratos específicos.

**Características:**
- CRUD completo: criar, editar, visualizar, inativar (soft delete)
- Campos: título, descrição, classificação, prioridade
- Upload de anexo (documento binário)
- Status: Ativa / Inativa
- Histórico preservado (soft delete, nunca exclui)

---

### 16. Matrizes de Contrato (Templates)

**O que é:** Biblioteca de modelos/templates de contratos reutilizáveis para agilizar a autoria.

**Características:**
- CRUD completo de matrizes
- Editor TinyMCE para criação e edição de templates
- Seleção de matriz durante a autoria para pré-popular o documento
- Padronização de cláusulas e termos

---

### 17. Gestão de Usuários e Perfis (RBAC)

**O que é:** Sistema completo de controle de acesso baseado em perfis com granularidade por coligada, filial e centro de custo.

**Características:**
- 8 perfis configuráveis: ADMIN, ESPECIALISTA, JURÍDICO, GESTOR, ASSINANTE, INDICADORES, AUDITORIA, COMPRAS
- Vinculação de perfil por usuário × coligada × filial × centro de custo
- Seleção de múltiplos centros de custo por vínculo (com botão "Selecionar Todos")
- Perfis com CC obrigatório vs. acesso total (apenas ADMIN acessa todos os CCs)
- Permissões por funcionalidade configuráveis pela UI (10 funcionalidades)
- Backend dinâmico: as permissões configuradas na UI são respeitadas tanto no frontend (menus) quanto no backend (rotas da API)
- Sincronização automática de gestores do ERP TOTVS RM
- Suporte a usuários internos e externos
- Seed automático do usuário mestre no startup
- Tela de acesso restrito amigável para funcionalidades não permitidas

---

### 18. Integração TOTVS RM

**O que é:** Integração bidirecional com o ERP TOTVS RM para consulta de dados corporativos e transporte de contratos.

**Características:**
- **Queries GCONSSQL:** Consultas SQL dinâmicas ao RM (centros de custo, coligadas, filiais, usuários, fornecedores, produtos/serviços)
- **VIEW_CONTRATOS:** View SQL Server com UNION ALL entre contratos legados (RM) e novos (plataforma)
- **XmlCtrContrato (Transporte RM):** Transporte de dados de contratos concluídos para tabelas intermediárias do RM
  - Verificação de pendências antes do transporte
  - Pipeline de status: Rascunho → Pendente RM → Processando → Integrado | Erro
  - Ações: Transportar, Submeter, Retentar, Cancelar, Excluir
  - Polling automático no frontend (15s) para status pendentes

---

### 19. Configurações

**O que é:** Central de administração da plataforma com 6 módulos de configuração.

**Abas disponíveis:**
1. **Matrizes de Contrato** — Templates reutilizáveis
2. **Usuários e Perfis** — RBAC completo
3. **Notificações** — E-mail + SMTP + Configuração por perfil
4. **Tarefas Agendadas** — Gestão do Cron TAE (polling de assinaturas)
5. **Integração TOTVS RM** — XmlCtrContrato (transporte)
6. **Dados de Teste** — Seed/teardown para desenvolvimento

---

## Integrações

| Sistema | Tipo | Status | Descrição |
|---------|------|:------:|-----------|
| **TOTVS RM (ERP)** | SQL (GCONSSQL) + Views + XmlCtr | ✅ Ativo | Dados corporativos, sincronização e transporte de contratos |
| **TOTVS Assinatura Eletrônica (TAE)** | API HTTP + Webhooks + Cron | ✅ Ativo | Assinatura digital de documentos |
| **Sistema de Compras** | Integração por tabela (escrita direta) | ✅ Ativo | Recebimento automático de solicitações |
| **E-mail (SMTP)** | Nodemailer | ✅ Ativo | Notificações automáticas |

---

## Perfis de Usuário

| Perfil | Descrição | Contexto de acesso |
|--------|-----------|-------------------|
| **ADMIN** | Acesso total à plataforma, incluindo configurações e gestão de usuários | Todos os centros de custo |
| **ESPECIALISTA** | Acesso a todo o fluxo de contratos, assinaturas avulsas e consultas | Por centro de custo |
| **JURÍDICO** | Análise e pareceres na sala jurídica, contratos e consultas | Por centro de custo |
| **GESTOR** | Solicitações, contratos, assinaturas avulsas e consultas do seu contexto | Por centro de custo |
| **ASSINANTE** | Acesso limitado a dashboard, solicitações e contratos | Por centro de custo |
| **INDICADORES** | Apenas dashboard para visualização de indicadores | Por centro de custo |
| **AUDITORIA** | Acesso de leitura a solicitações, contratos e consultas | Por centro de custo |
| **COMPRAS** | Dashboard e solicitações criadas pelo sistema de compras | Por centro de custo |

---

## Diferenciais Técnicos

| Diferencial | Descrição |
|-------------|-----------|
| **Auditoria completa** | Tabela append-only (`MAN_CNT_HISTORICO_ACOES`) com 16+ tipos de ação, correlação por requestId, timeline visual |
| **Segurança** | JWT + RBAC dinâmico + controle por coligada/filial/CC + proteção de rotas frontend e backend |
| **Multi-tenant** | Suporte a múltiplas coligadas e filiais com seletor de contexto (single, multi ou "todos") |
| **Armazenamento binário** | Documentos em VARBINARY(MAX) no SQL Server (sem dependência de file system) |
| **Idempotência** | Operações de assinatura TAE idempotentes (SHA256 para deduplicação de webhooks) |
| **Resiliência** | Webhooks + polling como fallback, timeouts configuráveis (2-5 min), retries com backoff |
| **Performance** | Cache de permissões RBAC (TTL 5min), lazy loading, paginação server-side |

---

## Stack Tecnológica

| Camada | Tecnologia |
|--------|-----------|
| **Frontend** | React + Tailwind CSS + React Router |
| **Editor de documentos** | TinyMCE |
| **Ícones** | Material Symbols (Google) |
| **Backend** | Node.js + Express (API REST) |
| **Autenticação** | JWT |
| **Banco de dados** | SQL Server via Sequelize |
| **Assinatura digital** | TOTVS Assinatura Eletrônica (TAE) |
| **E-mail** | Nodemailer (SMTP) |
| **ERP** | TOTVS RM (GCONSSQL + Views + XmlCtr) |
