type DemoEnvironment = {
  RESEND_API_KEY?: string;
  DEMO_REQUEST_RECIPIENT?: string;
};

type DemoRequest = {
  nome?: unknown;
  empresa?: unknown;
  email?: unknown;
  telefone?: unknown;
  interesse?: unknown;
  data?: unknown;
  horario?: unknown;
  mensagem?: unknown;
  website?: unknown;
};

const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

function json(body: Record<string, unknown>, status = 200) {
  return new Response(JSON.stringify(body), { status, headers: jsonHeaders });
}

function text(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 254;
}

export async function handleDemoRequest(request: Request, env: DemoEnvironment) {
  if (request.method !== "POST") {
    return json({ ok: false, message: "Método não permitido." }, 405);
  }

  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 20_000) {
    return json({ ok: false, message: "Solicitação inválida." }, 413);
  }

  let payload: DemoRequest;
  try {
    payload = await request.json() as DemoRequest;
  } catch {
    return json({ ok: false, message: "Solicitação inválida." }, 400);
  }

  // Honeypot: bots receive a neutral success response without sending e-mail.
  if (text(payload.website, 200)) {
    return json({ ok: true, message: "Solicitação recebida com sucesso." });
  }

  const fields = {
    nome: text(payload.nome, 120),
    empresa: text(payload.empresa, 160),
    email: text(payload.email, 254).toLowerCase(),
    telefone: text(payload.telefone, 60),
    interesse: text(payload.interesse, 180),
    data: text(payload.data, 20),
    horario: text(payload.horario, 80),
    mensagem: text(payload.mensagem, 2_000) || "Não informado",
  };

  if (!fields.nome || !fields.empresa || !validEmail(fields.email) || !fields.telefone || !fields.interesse || !fields.data || !fields.horario) {
    return json({ ok: false, message: "Confira os campos obrigatórios e tente novamente." }, 400);
  }

  const apiKey = env.RESEND_API_KEY?.trim();
  const recipient = env.DEMO_REQUEST_RECIPIENT?.trim();
  if (!apiKey || !recipient || !validEmail(recipient)) {
    console.error("Demo request endpoint is missing its e-mail configuration.");
    return json({ ok: false, message: "Não foi possível enviar agora. Tente novamente em instantes." }, 503);
  }

  const lines = [
    `Nome: ${fields.nome}`,
    `Empresa: ${fields.empresa}`,
    `E-mail: ${fields.email}`,
    `Telefone: ${fields.telefone}`,
    `Interesse: ${fields.interesse}`,
    `Data preferida: ${fields.data}`,
    `Horário preferido: ${fields.horario}`,
    "",
    `Contexto: ${fields.mensagem}`,
  ];

  const rows = Object.entries({
    Nome: fields.nome,
    Empresa: fields.empresa,
    "E-mail": fields.email,
    Telefone: fields.telefone,
    Interesse: fields.interesse,
    "Data preferida": fields.data,
    "Horário preferido": fields.horario,
    Contexto: fields.mensagem,
  }).map(([label, value]) => `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #dbe7ee">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #dbe7ee">${escapeHtml(value)}</td></tr>`).join("");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        authorization: `Bearer ${apiKey}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        from: "DRATOS <contato@dratos.com.br>",
        to: [recipient],
        reply_to: fields.email,
        subject: `Solicitação de demonstração DRATOS — ${fields.empresa}`,
        text: lines.join("\n"),
        html: `<h1>Nova solicitação de demonstração</h1><table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows}</table>`,
      }),
    });

    if (!response.ok) {
      console.error(`Resend rejected a demo request with status ${response.status}.`);
      return json({ ok: false, message: "Não foi possível enviar agora. Tente novamente em instantes." }, 502);
    }

    return json({ ok: true, message: "Solicitação enviada com sucesso. Em breve entraremos em contato." });
  } catch {
    console.error("Resend could not be reached while sending a demo request.");
    return json({ ok: false, message: "Não foi possível enviar agora. Tente novamente em instantes." }, 502);
  }
}
