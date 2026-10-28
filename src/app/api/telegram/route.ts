import { SITE } from "@/data/site";
import { hasStore, keys, redis, TTL, type ChatItem } from "@/lib/store";
import { CHAT_ID, hasTelegram, say, telegram, webhookSecret } from "@/lib/telegram";
import { NextResponse } from "next/server";

// Telegram calls this when I message the bot. Swipe-replying to a visitor's
// message puts my reply into their chat on the site.

type TelegramMessage = {
  message_id: number;
  chat: { id: number };
  text?: string;
  caption?: string;
  reply_to_message?: { message_id: number };
};

export async function POST(req: Request) {
  if (!hasTelegram || !hasStore) return NextResponse.json({ ok: true });
  if (req.headers.get("x-telegram-bot-api-secret-token") !== (await webhookSecret())) {
    return NextResponse.json({ error: "forbidden" }, { status: 403 });
  }

  const update = (await req.json().catch(() => null)) as { update_id?: number; message?: TelegramMessage } | null;
  const msg = update?.message;
  // Only my own chat with the bot counts.
  if (!update?.update_id || !msg || String(msg.chat.id) !== String(CHAT_ID)) return NextResponse.json({ ok: true });

  // Telegram retries if we're slow, so handle each update once.
  const [fresh] = await redis(["SET", keys.update(update.update_id), 1, "NX", "EX", 86_400]);
  if (fresh !== "OK") return NextResponse.json({ ok: true });

  const text = (msg.text ?? msg.caption ?? "").trim();
  if (text.startsWith("/start")) {
    await say("Hi! Website chats show up here. Swipe to reply to one and your answer appears in that visitor's chat.");
    return NextResponse.json({ ok: true });
  }

  const replyTo = msg.reply_to_message?.message_id;
  if (!replyTo) {
    await say("Swipe to reply to a visitor’s message so I know whose chat this goes to.", { reply_to_message_id: msg.message_id });
    return NextResponse.json({ ok: true });
  }

  const [cid] = await redis(["GET", keys.telegram(replyTo)]);
  if (typeof cid !== "string") {
    await say("I can’t find that chat anymore (they expire after 30 days). Reply by email or WhatsApp instead.", {
      reply_to_message_id: msg.message_id,
    });
    return NextResponse.json({ ok: true });
  }
  if (!text) {
    await say("Only text reaches the website for now.", { reply_to_message_id: msg.message_id });
    return NextResponse.json({ ok: true });
  }

  const item: ChatItem = { id: `n${update.update_id}`, from: "najmul", text, at: Date.now() };
  await redis(
    ["RPUSH", keys.chat(cid), JSON.stringify(item)],
    ["EXPIRE", keys.chat(cid), TTL],
    // Replying to my own reply keeps the same conversation going.
    ["SET", keys.telegram(msg.message_id), cid, "EX", TTL],
  );
  await telegram("setMessageReaction", {
    chat_id: CHAT_ID,
    message_id: msg.message_id,
    reaction: [{ type: "emoji", emoji: "👍" }],
  });
  return NextResponse.json({ ok: true });
}

// Opening /api/telegram once (after deploying) connects the bot to this site.
// It only ever points the bot at this same address, so it's safe to leave open.
export async function GET() {
  if (!hasTelegram) return NextResponse.json({ ok: false, error: "Add TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID first." }, { status: 503 });
  if (!hasStore) return NextResponse.json({ ok: false, error: "Connect an Upstash Redis store first." }, { status: 503 });
  const result = await telegram<boolean>("setWebhook", {
    url: `${SITE.url}/api/telegram`,
    secret_token: await webhookSecret(),
    allowed_updates: ["message"],
  });
  return NextResponse.json(
    result
      ? { ok: true, message: "Connected. Swipe-reply to a chat message in Telegram and it will show up on the site." }
      : { ok: false, error: "Telegram refused the webhook. Check the bot token." },
  );
}
