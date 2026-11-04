import assert from "node:assert/strict";
import test from "node:test";

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("demo-test", `${process.pid}-${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const ctx = {
  waitUntil() {},
  passThroughOnException() {},
};

const baseEnv = {
  ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
  RESEND_API_KEY: "re_test_key",
  DEMO_REQUEST_RECIPIENT: "internal@example.com",
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

test("POST /api/demo sends through Resend with client Reply-To", async () => {
  const originalFetch = globalThis.fetch;
  let resendRequest;
  globalThis.fetch = async (input, init) => {
    resendRequest = { input: String(input), init };
    return Response.json({ id: "email_test" });
  };

  try {
    const response = await worker.fetch(new Request("http://localhost/api/demo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(validPayload),
    }), baseEnv, ctx);

    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    assert.equal(resendRequest.input, "https://api.resend.com/emails");
    const message = JSON.parse(resendRequest.init.body);
    assert.deepEqual(message.to, ["internal@example.com"]);
    assert.equal(message.reply_to, validPayload.email);
    assert.equal(message.from, "DRATOS <contato@dratos.com.br>");
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("POST /api/demo silently accepts the honeypot without sending", async () => {
  const originalFetch = globalThis.fetch;
  let called = false;
  globalThis.fetch = async () => {
    called = true;
    return Response.json({ id: "should-not-send" });
  };

  try {
    const response = await worker.fetch(new Request("http://localhost/api/demo", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ ...validPayload, website: "https://spam.example" }),
    }), baseEnv, ctx);

    assert.equal(response.status, 200);
    assert.equal((await response.json()).ok, true);
    assert.equal(called, false);
  } finally {
    globalThis.fetch = originalFetch;
  }
});

test("POST /api/demo rejects invalid customer data", async () => {
  const response = await worker.fetch(new Request("http://localhost/api/demo", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ ...validPayload, email: "invalid" }),
  }), baseEnv, ctx);

  assert.equal(response.status, 400);
  assert.equal((await response.json()).ok, false);
});
