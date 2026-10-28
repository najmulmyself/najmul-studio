// A tiny client for Upstash Redis over its REST API. Vercel's Upstash
// integration sets the KV_* names; a direct Upstash setup uses UPSTASH_*.
const URL_ = process.env.KV_REST_API_URL ?? process.env.UPSTASH_REDIS_REST_URL;
const TOKEN = process.env.KV_REST_API_TOKEN ?? process.env.UPSTASH_REDIS_REST_TOKEN;

export const hasStore = Boolean(URL_ && TOKEN);

// Conversations and their Telegram links expire after 30 days of quiet.
export const TTL = 60 * 60 * 24 * 30;

export type ChatItem = { id: string; from: "visitor" | "najmul"; text: string; at: number };

export const keys = {
  chat: (cid: string) => `chat:${cid}`,
  telegram: (messageId: number) => `tg:${messageId}`,
  update: (updateId: number) => `upd:${updateId}`,
};

// Conversation ids are random and unguessable; they're the only key to a chat.
export const isConversationId = (v: unknown): v is string => typeof v === "string" && /^[A-Za-z0-9_-]{20,64}$/.test(v);

// Runs several Redis commands in one request and returns their results in order.
export async function redis(...commands: (string | number)[][]): Promise<unknown[]> {
  const res = await fetch(`${URL_}/pipeline`, {
    method: "POST",
    headers: { Authorization: `Bearer ${TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify(commands),
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Redis ${res.status}`);
  const out = (await res.json()) as { result?: unknown; error?: string }[];
  return out.map((r) => {
    if (r.error) throw new Error(r.error);
    return r.result;
  });
}
