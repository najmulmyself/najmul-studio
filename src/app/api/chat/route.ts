import { hasStore, isConversationId, keys, redis, TTL, type ChatItem } from "@/lib/store";
import { hasTelegram, say } from "@/lib/telegram";
import { NextResponse } from "next/server";

// The chat bubble talks to this route. POST forwards a visitor's message to
// my Telegram; GET lets their chat pick up my replies. Without a Redis store
// the chat still works one way (messages reach me, replies go by email).

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
  if (!hasTelegram) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  let body: Record<string, unknown>;
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
  const id = typeof body.id === "string" ? body.id.slice(0, 40) : crypto.randomUUID();
  const cid = isConversationId(body.cid) ? body.cid : null;
  // The contact is optional; without it I can only answer in the site chat.
  if (!message || message.length > MAX_MESSAGE || contact.length > MAX_CONTACT) {
    return NextResponse.json({ error: "invalid" }, { status: 400 });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (tooMany(ip)) return NextResponse.json({ error: "rate_limited" }, { status: 429 });

  const twoWay = hasStore && cid !== null;
  let firstInChat = true;
  if (twoWay) {
    const [length] = await redis(["LLEN", keys.chat(cid)]).catch(() => [0]);
    firstInChat = !length;
  }

  const text = firstInChat
    ? [
        "New chat on najmulmyself.com",
        `From: ${contact || (twoWay ? "no contact left (reply here, they see it while on the site)" : "no contact left")}`,
        ...(timezone ? [`Time zone: ${timezone}`] : []),
        "",
        message,
        ...(twoWay ? ["", "↩️ Swipe to reply and it shows up in their chat."] : []),
      ].join("\n")
    : `${contact || "Visitor"} again:\n\n${message}`;

  const sent = await say(text);
  if (!sent) return NextResponse.json({ error: "send_failed" }, { status: 502 });

  if (twoWay) {
    const item: ChatItem = { id, from: "visitor", text: message, at: Date.now() };
    // Remember the conversation, and which conversation this Telegram message
    // belongs to, so a reply to it can find its way back.
    await redis(
      ["RPUSH", keys.chat(cid), JSON.stringify(item)],
      ["EXPIRE", keys.chat(cid), TTL],
      ["SET", keys.telegram(sent.message_id), cid, "EX", TTL],
    ).catch(() => null);
  }

  return NextResponse.json({ ok: true, twoWay });
}

export async function GET(req: Request) {
  if (!hasStore) return NextResponse.json({ error: "no_store" }, { status: 503 });
  const params = new URL(req.url).searchParams;
  const cid = params.get("cid");
  const after = Math.max(0, Number(params.get("after")) || 0);
  if (!isConversationId(cid)) return NextResponse.json({ error: "invalid" }, { status: 400 });

  const [items] = await redis(["LRANGE", keys.chat(cid), after, -1]).catch(() => [null]);
  if (!Array.isArray(items)) return NextResponse.json({ error: "store_failed" }, { status: 502 });
  const messages = items.flatMap((raw) => {
    try {
      return [JSON.parse(String(raw)) as ChatItem];
    } catch {
      return [];
    }
  });
  return NextResponse.json({ messages, total: after + items.length }, { headers: { "Cache-Control": "no-store" } });
}
