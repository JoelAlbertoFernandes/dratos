import assert from "node:assert/strict";
import test from "node:test";

test("renders the DRATOS landing page", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  const response = await worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  const html = await response.text();
  assert.match(
    html,
    /<title>DRATOS \| Governança Contratual Inteligente<\/title>/i,
  );
  assert.match(
    html,
    /href="#plataforma"[\s\S]*Plataforma[\s\S]*href="#dashboard"[\s\S]*Dashboard[\s\S]*href="#due-diligence"[\s\S]*Due Diligence[\s\S]*href="#rastreabilidade"[\s\S]*Rastreabilidade[\s\S]*href="#performance"[\s\S]*Performance[\s\S]*href="#seguranca"[\s\S]*Segurança/i,
  );
  assert.ok(html.indexOf("Veja a jornada") < html.indexOf('id="desafios"'));
  assert.match(html, /id="plataforma"/i);
  assert.match(html, /id="dashboard"/i);
  assert.match(html, /id="due-diligence"/i);
  assert.match(html, /id="rastreabilidade"/i);
  assert.match(html, /dratos-due-diligence\.webp/i);
  assert.match(html, /dratos-platform-structured\.webp/i);
  assert.match(html, /dratos-traceability\.webp/i);
  assert.doesNotMatch(html, /id="(?:riskai|visibilidade)"/i);
});
