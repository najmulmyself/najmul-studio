# najmul-studio

Client-facing portfolio for Najmul Huda: indie iOS development and AI automation for freelance and contract work.

Built with Next.js 15 (App Router), TypeScript, Tailwind CSS 4 and the Geist font family.

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Edit the content

All copy and data live in `src/data/site.ts`. Optional fields hide the part of the page that uses them while they are empty:

| Field | Shows |
|---|---|
| `SITE.url` | The live address (www.najmulmyself.com). Used for link previews, the sitemap and search engines |
| `SITE.calLink` | Your Cal.com event (e.g. `najmul/discovery-call`). Every hire / call button opens the project form, then this calendar with the details pre-filled. Empty: the form ends with a pre-filled email instead |
| `SITE.web3formsKey` | Web3Forms access key. Each project form is emailed to you when the visitor continues, even if they never book. Empty turns it off |
| `SITE.whatsapp` | Your WhatsApp number, digits only with country code (e.g. `8801XXXXXXXXX`). Shows "or chat on WhatsApp" in the chat bubble. Empty hides it |
| `PROJECT_FORM` | The "what do you need", timeline and budget choices in that form |
| `SITE.replyTime` | Reply time under the contact buttons |
| `SITE.quoteTime` | "a fixed quote within …" in the process |
| `SITE.startingPrice` | Starting price in the cost FAQ |
| `SITE.automationExample` | A real example in the automation service |
| `FEATURED_APP.screenshot` | Dream Kit 25 screenshot (put the image in `public/`) |
| `TESTIMONIALS` | The "Kind words" section |

## Branches

- `main`: what is live.
- `develop`: work in progress. Merged into `main` only when approved.

## Chat bubble ↔ Telegram

The chat bubble in the corner sends messages to your Telegram (`src/app/api/chat/route.ts`).
Swipe-reply to one in Telegram and your answer appears in that visitor's chat on the site
(`src/app/api/telegram/route.ts`). Set it up in Vercel, then redeploy:

| Setting | What it is |
| --- | --- |
| `TELEGRAM_BOT_TOKEN` | The token @BotFather gives you when you create a bot |
| `TELEGRAM_CHAT_ID` | Your own Telegram user id (ask @userinfobot). Tap Start in your bot's chat once |
| Upstash Redis | Vercel → Storage → Upstash for Redis (free). Connecting it to the project adds `KV_REST_API_URL` and `KV_REST_API_TOKEN` |

After deploying, open `https://www.najmulmyself.com/api/telegram` once. It connects the bot to the site and says "Connected".

- Without Upstash the chat still works one way: messages reach Telegram and you reply by email or WhatsApp.
- Conversations expire after 30 days of quiet. Visitors see replies while the page is open or when they come back in the same browser.
- Never put the token in the code; it only lives in Vercel.
