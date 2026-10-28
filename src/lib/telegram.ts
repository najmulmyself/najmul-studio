// Talks to my Telegram bot. The token and chat id live in Vercel env vars.
const TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const API = process.env.TELEGRAM_API_BASE ?? "https://api.telegram.org";

export const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
export const hasTelegram = Boolean(TOKEN && CHAT_ID);

export async function telegram<T>(method: string, body: Record<string, unknown>): Promise<T | null> {
  const res = await fetch(`${API}/bot${TOKEN}/${method}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
    cache: "no-store",
  }).catch(() => null);
  if (!res?.ok) return null;
  const data = (await res.json()) as { ok: boolean; result: T };
  return data.ok ? data.result : null;
}

export const say = (text: string, extra: Record<string, unknown> = {}) =>
  telegram<{ message_id: number }>("sendMessage", { chat_id: CHAT_ID, text, disable_web_page_preview: true, ...extra });

// Telegram sends this with every webhook call so the site knows it's really
// Telegram. It's derived from the bot token, so there's nothing extra to set up.
export async function webhookSecret() {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(`webhook:${TOKEN}`));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0"))
    .join("")
    .slice(0, 48);
}
