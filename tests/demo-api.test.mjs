import assert from "node:assert/strict";
import test from "node:test";
import { handleDemoRequest } from "../server/demo.ts";

const baseEnv = {
  HOSTINGER_SMTP_PASSWORD: "smtp-test-password",
};

const validPayload = {
  nome: "Maria Silva",
  empresa: "Empresa Exemplo",
  email: "maria@empresa.example",
  telefone: "+55 11 99999-0000",
  interesse: "RiskAI e análise de riscos",
  data: "2026-11-10",
  horario: "14h às 17h",
  mensagem: "Queremos conhecer a plataforma.",
  website: "",
};

function demoRequest(payload = validPayload) {
  return new Request("http://localhost/api/demo", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload),
  });
}

test("POST /api/demo sends through Hostinger SMTP with client Reply-To", async () => {
  let smtpOptions;
  let message;
  const transportFactory = (options) => {
    smtpOptions = options;
    return {
      async sendMail(mail) {
        message = mail;
        return { messageId: "smtp-test" };
      },
    };
  };

  const response = await handleDemoRequest(demoRequest(), baseEnv, transportFactory);

  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(smtpOptions.host, "smtp.hostinger.com");
  assert.equal(smtpOptions.port, 465);
  assert.equal(smtpOptions.secure, true);
  assert.equal(smtpOptions.auth.user, "contato@dratos.com.br");
  assert.equal(smtpOptions.auth.pass, baseEnv.HOSTINGER_SMTP_PASSWORD);
  assert.equal(message.to, "contato@dratos.com.br");
  assert.equal(message.replyTo, validPayload.email);
  assert.equal(message.from, "DRATOS <contato@dratos.com.br>");
  assert.equal(message.subject, `Solicitação de demonstração DRATOS — ${validPayload.empresa}`);
});

test("POST /api/demo silently accepts the honeypot without sending", async () => {
  let called = false;
  const response = await handleDemoRequest(
    demoRequest({ ...validPayload, website: "https://spam.example" }),
    baseEnv,
    () => {
      called = true;
      return { sendMail: async () => ({}) };
    },
  );

  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(called, false);
});

test("POST /api/demo rejects invalid customer data", async () => {
  const response = await handleDemoRequest(demoRequest({ ...validPayload, email: "invalid" }), baseEnv);

  assert.equal(response.status, 400);
  assert.equal((await response.json()).ok, false);
});

test("POST /api/demo rejects missing SMTP configuration", async () => {
  const response = await handleDemoRequest(demoRequest(), {});
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.equal(body.ok, false);
  assert.equal(body.message, "Não foi possível enviar agora. Tente novamente em instantes.");
});

test("POST /api/demo handles SMTP failures without exposing credentials", async () => {
  const response = await handleDemoRequest(
    demoRequest(),
    baseEnv,
    () => ({ sendMail: async () => { throw new Error("SMTP rejected credentials"); } }),
  );
  const body = await response.json();

  assert.equal(response.status, 502);
  assert.equal(body.ok, false);
  assert.equal(body.message, "Não foi possível enviar agora. Tente novamente em instantes.");
  assert.equal(JSON.stringify(body).includes(baseEnv.HOSTINGER_SMTP_PASSWORD), false);
});
