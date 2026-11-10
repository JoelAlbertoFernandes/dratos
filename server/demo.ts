type DemoEnvironment = {
  HOSTINGER_MAIL_API_TOKEN?: string;
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

type MailboxCache = { resourceId?: string };
type DemoDependencies = {
  fetch?: typeof fetch;
  mailboxCache?: MailboxCache;
};

type HostingerErrorBody = { code?: unknown };
type HostingerMeBody = {
  data?: {
    mailboxes?: Array<{ resourceId?: unknown; address?: unknown }>;
  };
};

const HOSTINGER_MAIL_API = "https://api.mail.hostinger.com";
const MAILBOX_ADDRESS = "contato@dratos.com.br";
const MAX_PAYLOAD_BYTES = 20_000;
const MAIL_API_TIMEOUT_MS = 10_000;
const defaultMailboxCache: MailboxCache = {};
const jsonHeaders = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

class MailApiError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message = "Hostinger Mail API request failed") {
    super(message);
    this.status = status;
    this.code = code;
  }
}

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

async function errorCode(response: Response) {
  try {
    const body = await response.json() as HostingerErrorBody;
    return typeof body.code === "string" ? body.code.slice(0, 120) : "UNKNOWN";
  } catch {
    return "UNKNOWN";
  }
}

async function resolveMailboxResourceId(
  token: string,
  apiFetch: typeof fetch,
  cache: MailboxCache,
  signal: AbortSignal,
) {
  if (cache.resourceId) return cache.resourceId;

  const response = await apiFetch(`${HOSTINGER_MAIL_API}/api/v1/me`, {
    headers: {
      accept: "application/json",
      authorization: `Bearer ${token}`,
    },
    signal,
  });

  if (!response.ok) {
    throw new MailApiError(response.status, await errorCode(response));
  }

  const body = await response.json() as HostingerMeBody;
  const mailbox = body.data?.mailboxes?.find((candidate) =>
    typeof candidate.address === "string" &&
    candidate.address.toLowerCase() === MAILBOX_ADDRESS &&
    typeof candidate.resourceId === "string" &&
    /^AC[A-Za-z0-9]+$/.test(candidate.resourceId)
  );

  if (!mailbox || typeof mailbox.resourceId !== "string") {
    throw new MailApiError(404, "MAILBOX_NOT_AUTHORIZED");
  }

  cache.resourceId = mailbox.resourceId;
  return mailbox.resourceId;
}

export async function handleDemoRequest(
  request: Request,
  env: DemoEnvironment,
  dependencies: DemoDependencies = {},
) {
  if (request.method !== "POST") {
    return json({ ok: false, message: "Método não permitido." }, 405);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return json({ ok: false, message: "Solicitação inválida." }, 400);
  }

  if (new TextEncoder().encode(rawBody).byteLength > MAX_PAYLOAD_BYTES) {
    return json({ ok: false, message: "Solicitação inválida." }, 413);
  }

  let payload: DemoRequest;
  try {
    payload = JSON.parse(rawBody) as DemoRequest;
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

  const token = env.HOSTINGER_MAIL_API_TOKEN?.trim();
  if (!token) {
    console.error("Demo request endpoint is missing its Hostinger Mail API configuration.");
    return json({ ok: false, message: "Não foi possível enviar agora. Tente novamente em instantes." }, 503);
  }

  const textBody = [
    "Nova solicitação de demonstração DRATOS",
    "",
    "Nome completo:", fields.nome,
    "",
    "Empresa:", fields.empresa,
    "",
    "E-mail:", fields.email,
    "",
    "Telefone / WhatsApp:", fields.telefone,
    "",
    "Principal interesse:", fields.interesse,
    "",
    "Data preferida:", fields.data,
    "",
    "Horário preferido:", fields.horario,
    "",
    "Contexto ou desafio atual:", fields.mensagem,
  ].join("\n");

  const rows = Object.entries({
    "Nome completo": fields.nome,
    Empresa: fields.empresa,
    "E-mail do prospect — responda para este endereço": fields.email,
    "Telefone / WhatsApp": fields.telefone,
    "Principal interesse": fields.interesse,
    "Data preferida": fields.data,
    "Horário preferido": fields.horario,
    "Contexto ou desafio atual": fields.mensagem,
  }).map(([label, value]) => `<tr><th align="left" style="padding:8px 12px;border-bottom:1px solid #dbe7ee">${escapeHtml(label)}</th><td style="padding:8px 12px;border-bottom:1px solid #dbe7ee">${escapeHtml(value)}</td></tr>`).join("");

  const apiFetch = dependencies.fetch ?? fetch;
  const cache = dependencies.mailboxCache ?? defaultMailboxCache;
  const signal = AbortSignal.timeout(MAIL_API_TIMEOUT_MS);

  try {
    const mailboxResourceId = await resolveMailboxResourceId(token, apiFetch, cache, signal);
    const response = await apiFetch(
      `${HOSTINGER_MAIL_API}/api/v1/mailboxes/${encodeURIComponent(mailboxResourceId)}/send`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify({
          to: [MAILBOX_ADDRESS],
          displayName: "DRATOS",
          subject: `Solicitação de demonstração DRATOS — ${fields.empresa}`,
          text: textBody,
          html: `<h1>Nova solicitação de demonstração DRATOS</h1><table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px">${rows}</table>`,
        }),
        signal,
      },
    );

    if (response.status !== 204) {
      if ([401, 403, 404].includes(response.status)) delete cache.resourceId;
      throw new MailApiError(response.status, await errorCode(response));
    }

    return json({ ok: true, message: "Solicitação enviada com sucesso. Em breve entraremos em contato." });
  } catch (error) {
    if (error instanceof MailApiError) {
      console.error("Hostinger Mail API request failed.", { status: error.status, code: error.code });
      const status = error.status === 429 || error.status >= 500 ? 503 : 502;
      return json({ ok: false, message: "Não foi possível enviar agora. Tente novamente em instantes." }, status);
    }

    const timedOut = error instanceof Error && error.name === "TimeoutError";
    console.error(timedOut ? "Hostinger Mail API request timed out." : "Hostinger Mail API request could not be completed.");
    return json({ ok: false, message: "Não foi possível enviar agora. Tente novamente em instantes." }, timedOut ? 504 : 502);
  }
}
