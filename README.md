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
