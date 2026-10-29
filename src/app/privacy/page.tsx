import { SITE } from "@/data/site";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `Privacy · ${SITE.name}`,
  description: "What this site collects, why, and who handles it.",
  alternates: { canonical: "/privacy" },
};

const SERVICES = [
  {
    name: "Vercel Web Analytics",
    what: "Anonymous page views: which page, which site sent you, rough country, device type. No cookies.",
  },
  {
    name: "Microsoft Clarity",
    what: "Anonymous recordings of how the page is used (scrolls, taps, clicks) and heatmaps, so I can see what confuses people. What you type in forms and the chat is hidden. In the EU, UK and Switzerland it only runs if you say yes. Microsoft's privacy statement applies: privacy.microsoft.com.",
  },
  {
    name: "Project form (Web3Forms)",
    what: "When you continue past the project form, your name, email and answers are emailed to me.",
  },
  {
    name: "Booking (Cal.com)",
    what: "If you book a call, Cal.com handles the booking and sends the calendar invite.",
  },
  {
    name: "Chat (Telegram + Upstash)",
    what: "Chat messages, and the email or WhatsApp you leave, are sent to my Telegram. The conversation is stored for 30 days so my replies can reach you, then deleted.",
  },
];

export default function Privacy() {
  return (
    <main className="mx-auto max-w-[680px] px-6 py-24 md:py-32">
      <Link href="/" className="text-[15px] font-semibold text-accent hover:underline">
        ← Back to {SITE.shortName.toLowerCase()}.
      </Link>
      <h1 className="mt-8 font-display text-[clamp(36px,5vw,52px)] leading-[1.05] font-semibold tracking-[-0.035em]">Privacy</h1>
      <p className="mt-4 text-[17px] leading-relaxed text-ink-soft">
        This is a one-person portfolio. I use a few services to understand how the site is used and to hear from you.
        I don’t sell anything about you, and there are no ads.
      </p>
      <ul className="mt-10 space-y-6">
        {SERVICES.map((s) => (
          <li key={s.name}>
            <h2 className="font-display text-[20px] font-semibold tracking-[-0.01em]">{s.name}</h2>
            <p className="mt-1 leading-relaxed text-ink-soft">{s.what}</p>
          </li>
        ))}
      </ul>
      <p className="mt-10 leading-relaxed text-ink-soft">
        Want something you sent deleted, or have a question? Email{" "}
        <a href={`mailto:${SITE.email}`} className="font-semibold text-accent hover:underline">
          {SITE.email}
        </a>
        .
      </p>
    </main>
  );
}
