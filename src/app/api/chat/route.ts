import { NextResponse } from "next/server";

// Forwards a chat-bubble message to my Telegram. The bot token and chat id
// live in Vercel environment variables, never in the browser.
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

const MAX_MESSAGE = 2000;
const MAX_CONTACT = 120;

// Best-effort flood guard: a few messages per minute per visitor. It lives in
// memory, so it resets whenever Vercel starts a fresh instance.
const WINDOW_MS = 60_000;
const LIMIT = 5;
const recent = new Map<string, number[]>();

function tooMany(ip: string) {
  const now = Date.now();
  const hits = (recent.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  hits.push(now);
  recent.set(ip, hits);
  return hits.length > LIMIT;
}

export async function POST(req: Request) {
  if (!TOKEN || !CHAT_ID) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  let body: { message?: unknown; contact?: unknown; website?: unknown; timezone?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  // Honeypot: a hidden field people never fill in.
  if (body.website) return NextResponse.json({ ok: true });

  const message = typeof body.message === "string" ? body.message.trim() : "";
  const contact = typeof body.contact === "string" ? body.contact.trim() : "";
  const timezone = typeof body.timezone === "string" ? body.timezone.slice(0, 60) : "";
  if (!message || message.length > MAX_MESSAGE || !contact || contact.length > MAX_CONTACT) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const text = [
    "New chat on najmulmyself.com",
    `From: ${contact}`,
    ...(timezone ? [`Time zone: ${timezone}`] : []),
    "",
    message,
  ].join("\n");

  const res = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: CHAT_ID, text, disable_web_page_preview: true }),
  }).catch(() => null);

  if (!res?.ok) return NextResponse.json({ error: "send_failed" }, { status: 502 });
  return NextResponse.json({ ok: true });
}
