import assert from "node:assert/strict";
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import test from "node:test";
import { handleDemoRequest } from "../server/demo.ts";

const API_TOKEN = "mail-api-test-token";
const MAILBOX_ID = "ACDratosMailbox123";
const baseEnv = { HOSTINGER_MAIL_API_TOKEN: API_TOKEN };
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

function demoRequest(payload = validPayload, method = "POST") {
  return new Request("http://localhost/api/demo", {
    method,
    headers: { "content-type": "application/json" },
    body: method === "POST" ? JSON.stringify(payload) : undefined,
  });
}

function mockMailApi({
  meStatus = 200,
  sendStatus = 204,
  mailboxes = [
    { resourceId: "ACOtherMailbox123", address: "outro@dratos.com.br" },
    { resourceId: MAILBOX_ID, address: "contato@dratos.com.br" },
  ],
} = {}) {
  const calls = [];
  const fetch = async (input, init = {}) => {
    const url = String(input);
    calls.push({ url, init });

    if (url.endsWith("/api/v1/me")) {
      return new Response(
        JSON.stringify(meStatus === 200
          ? { data: { orderResourceId: "ORDratos123", mailboxes } }
          : { error: "Authentication failed", code: "ERR_UNAUTHORIZED", params: {} }),
        { status: meStatus, headers: { "content-type": "application/json" } },
      );
    }

    if (url.endsWith(`/api/v1/mailboxes/${MAILBOX_ID}/send`)) {
      return sendStatus === 204
        ? new Response(null, { status: 204 })
        : new Response(
            JSON.stringify({ error: "Mail API failure", code: `ERR_${sendStatus}`, params: {} }),
            { status: sendStatus, headers: { "content-type": "application/json" } },
          );
    }

    return new Response(JSON.stringify({ code: "ERR_NOT_FOUND" }), { status: 404 });
  };

  return { fetch, calls };
}

function dependencies(fetch, mailboxCache = {}) {
  return { fetch, mailboxCache };
}

test("POST /api/demo sends through the authorized Hostinger mailbox with the official schema", async () => {
  const api = mockMailApi();
  const response = await handleDemoRequest(demoRequest(), baseEnv, dependencies(api.fetch));
  const result = await response.json();

  assert.equal(response.status, 200);
  assert.equal(result.ok, true);
  assert.equal(result.message, "Solicitação enviada com sucesso. Em breve entraremos em contato.");
  assert.equal(api.calls.length, 2);
  assert.equal(api.calls[0].url, "https://api.mail.hostinger.com/api/v1/me");
  assert.equal(api.calls[0].init.headers.authorization, `Bearer ${API_TOKEN}`);
  assert.equal(api.calls[1].url, `https://api.mail.hostinger.com/api/v1/mailboxes/${MAILBOX_ID}/send`);
  assert.equal(api.calls[1].init.method, "POST");
  assert.equal(api.calls[1].init.headers.authorization, `Bearer ${API_TOKEN}`);

  const message = JSON.parse(api.calls[1].init.body);
  assert.deepEqual(message.to, ["contato@dratos.com.br"]);
  assert.equal(message.displayName, "DRATOS");
  assert.equal(message.subject, `Solicitação de demonstração DRATOS — ${validPayload.empresa}`);
  assert.match(message.text, /Nome completo:\nMaria Silva/);
  assert.match(message.text, /E-mail:\nmaria@empresa\.example/);
  assert.match(message.text, /Contexto ou desafio atual:\nQueremos conhecer a plataforma\./);
  assert.match(message.html, /E-mail do prospect — responda para este endereço/);
  assert.match(message.html, /maria@empresa\.example/);
  assert.equal(Object.hasOwn(message, "replyTo"), false);
});

test("mailbox discovery is cached within the Worker instance", async () => {
  const api = mockMailApi();
  const mailboxCache = {};
  await handleDemoRequest(demoRequest(), baseEnv, dependencies(api.fetch, mailboxCache));
  await handleDemoRequest(demoRequest(), baseEnv, dependencies(api.fetch, mailboxCache));

  assert.equal(api.calls.filter((call) => call.url.endsWith("/api/v1/me")).length, 1);
  assert.equal(api.calls.filter((call) => call.url.endsWith("/send")).length, 2);
});

test("POST /api/demo rejects missing required fields", async () => {
  const api = mockMailApi();
  const response = await handleDemoRequest(demoRequest({ ...validPayload, empresa: "" }), baseEnv, dependencies(api.fetch));
  assert.equal(response.status, 400);
  assert.equal(api.calls.length, 0);
});

test("POST /api/demo rejects an invalid prospect email", async () => {
  const api = mockMailApi();
  const response = await handleDemoRequest(demoRequest({ ...validPayload, email: "invalid" }), baseEnv, dependencies(api.fetch));
  assert.equal(response.status, 400);
  assert.equal(api.calls.length, 0);
});

test("POST /api/demo silently accepts the honeypot without calling Hostinger", async () => {
  const api = mockMailApi();
  const response = await handleDemoRequest(
    demoRequest({ ...validPayload, website: "https://spam.example" }),
    baseEnv,
    dependencies(api.fetch),
  );
  assert.equal(response.status, 200);
  assert.equal((await response.json()).ok, true);
  assert.equal(api.calls.length, 0);
});

test("POST /api/demo rejects an oversized payload even without a Content-Length header", async () => {
  const api = mockMailApi();
  const response = await handleDemoRequest(
    demoRequest({ ...validPayload, mensagem: "x".repeat(21_000) }),
    baseEnv,
    dependencies(api.fetch),
  );
  assert.equal(response.status, 413);
  assert.equal(api.calls.length, 0);
});

test("POST /api/demo rejects missing HOSTINGER_MAIL_API_TOKEN", async () => {
  const api = mockMailApi();
  const response = await handleDemoRequest(demoRequest(), {}, dependencies(api.fetch));
  const body = await response.json();
  assert.equal(response.status, 503);
  assert.equal(body.message, "Não foi possível enviar agora. Tente novamente em instantes.");
  assert.equal(api.calls.length, 0);
});

test("POST /api/demo safely handles a Hostinger 401 response", async () => {
  const api = mockMailApi({ meStatus: 401 });
  const response = await handleDemoRequest(demoRequest(), baseEnv, dependencies(api.fetch));
  const body = await response.json();
  assert.equal(response.status, 502);
  assert.equal(body.ok, false);
  assert.equal(JSON.stringify(body).includes(API_TOKEN), false);
});

test("POST /api/demo safely handles a Hostinger 429 response", async () => {
  const api = mockMailApi({ sendStatus: 429 });
  const response = await handleDemoRequest(demoRequest(), baseEnv, dependencies(api.fetch));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).message, "Não foi possível enviar agora. Tente novamente em instantes.");
});

test("POST /api/demo safely handles a Hostinger 5xx response", async () => {
  const api = mockMailApi({ sendStatus: 502 });
  const response = await handleDemoRequest(demoRequest(), baseEnv, dependencies(api.fetch));
  assert.equal(response.status, 503);
  assert.equal((await response.json()).message, "Não foi possível enviar agora. Tente novamente em instantes.");
});

test("POST /api/demo rejects a token without access to contato@dratos.com.br", async () => {
  const api = mockMailApi({ mailboxes: [{ resourceId: "ACOtherMailbox123", address: "outro@dratos.com.br" }] });
  const response = await handleDemoRequest(demoRequest(), baseEnv, dependencies(api.fetch));
  assert.equal(response.status, 502);
  assert.equal(api.calls.length, 1);
});

test("/api/demo accepts only POST", async () => {
  const api = mockMailApi();
  const response = await handleDemoRequest(demoRequest(validPayload, "GET"), baseEnv, dependencies(api.fetch));
  assert.equal(response.status, 405);
  assert.equal(api.calls.length, 0);
});

test("HTML values are sanitized before sending", async () => {
  const api = mockMailApi();
  await handleDemoRequest(
    demoRequest({ ...validPayload, mensagem: "<script>alert('x')</script>" }),
    baseEnv,
    dependencies(api.fetch),
  );
  const message = JSON.parse(api.calls[1].init.body);
  assert.doesNotMatch(message.html, /<script>/);
  assert.match(message.html, /&lt;script&gt;/);
});

test("the public bundle contains no Hostinger credential", async () => {
  const clientRoot = fileURLToPath(new URL("../dist/client", import.meta.url));
  const files = await readdir(clientRoot, { recursive: true });
  const publicText = (await Promise.all(
    files
      .filter((file) => /\.(?:css|html|js|json|txt)$/i.test(file))
      .map((file) => readFile(path.join(clientRoot, file), "utf8")),
  )).join("\n");

  assert.equal(publicText.includes(API_TOKEN), false);
  assert.equal(publicText.includes("HOSTINGER_MAIL_API_TOKEN"), false);
});
