"use client";

import { SITE } from "@/data/site";
import { useEffect, useRef, useState } from "react";

// Ideas the empty note cycles through, to show the kind of sentence I mean.
const EXAMPLES = [
  "Uber, but for dog walkers.",
  "An app that reminds me to drink water, but rudely.",
  "Automate the invoices I copy into Excel every Friday.",
  "A booking app for my gym, so I can stop using WhatsApp.",
];
const STARTERS = ["A booking app", "A habit tracker", "Automate a boring task"];
const ONE_SENTENCE = 160;

// A note from the iPhone Notes app where visitors write their idea, then
// send it to me as a ready-made email.
export function IdeaNote() {
  const [idea, setIdea] = useState("");
  const [example, setExample] = useState(0);
  const [nudge, setNudge] = useState(false);
  const fieldRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (idea || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setExample((i) => (i + 1) % EXAMPLES.length), 3200);
    return () => clearInterval(id);
  }, [idea]);

  const text = idea.trim();
  const subject = `App idea: ${text.length > 60 ? `${text.slice(0, 57)}…` : text}`;
  const body = `Hi ${SITE.shortName},\n\n${text}\n\nCan you tell me how you'd build it?\n`;
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  const start = (s: string) => {
    setIdea(`${s} that `);
    setNudge(false);
    requestAnimationFrame(() => {
      const el = fieldRef.current;
      if (!el) return;
      el.focus();
      el.setSelectionRange(el.value.length, el.value.length);
    });
  };

  return (
    <div className="mx-auto mt-12 w-full max-w-[560px] text-left">
      <div className="relative overflow-hidden rounded-[30px] bg-white shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3),0_0_0_1px_rgba(0,0,0,0.04)] transition-shadow duration-300 has-[textarea:focus-visible]:shadow-[0_30px_60px_-30px_rgba(0,0,0,0.3),0_0_0_4px_rgba(39,71,240,0.18)]">
        <div className="flex items-center justify-between px-5 pt-4 text-[15px] text-[#e0a100]" aria-hidden="true">
          <span className="flex items-center gap-1 font-medium">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="m15 5-7 7 7 7" />
            </svg>
            Notes
          </span>
          <span className="flex items-center gap-4">
            <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 3v12M7 8l5-5 5 5M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
            </svg>
            <span className="font-semibold">Done</span>
          </span>
        </div>

        <div className="px-6 pt-4 pb-6 md:px-7">
          <p className="text-center text-[12px] text-faint" aria-live="polite">
            {text ? "Edited just now" : "Last edited March 2023 · gathering dust"}
          </p>
          <label htmlFor="idea" className="mt-3 block font-display text-[26px] leading-tight font-semibold tracking-[-0.02em]">
            My app idea
          </label>
          <textarea
            id="idea"
            ref={fieldRef}
            rows={3}
            value={idea}
            onChange={(e) => {
              setIdea(e.target.value);
              setNudge(false);
            }}
            placeholder={EXAMPLES[example]}
            className="mt-2 block w-full resize-none bg-transparent text-[18px] leading-relaxed text-ink placeholder:text-faint focus-visible:outline-none"
          />
          <p className="h-5 text-[13px] text-muted" aria-live="polite">
            {nudge
              ? "Write one sentence first. Typos welcome."
              : text.length > ONE_SENTENCE
                ? "That’s more than one sentence. I love it anyway."
                : ""}
          </p>

          {!text && (
            <div className="mt-2 flex flex-wrap gap-2">
              {STARTERS.map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => start(s)}
                  className="rounded-full bg-chip px-3.5 py-1.5 text-[13px] font-semibold text-ink-soft transition-colors hover:bg-line"
                >
                  {s}…
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line bg-paper/70 px-5 py-4 md:px-6">
          <p className="text-[13px] text-muted">
            Free build plan{SITE.replyTime ? `, back within ${SITE.replyTime}` : ""}. No strings.
          </p>
          <a
            href={text ? mailto : "#idea"}
            onClick={(e) => {
              if (text) return;
              e.preventDefault();
              setNudge(true);
              fieldRef.current?.focus();
            }}
            className={`sheen inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full sm:w-auto px-5 text-[15px] font-semibold transition-[background-color,transform,opacity] duration-200 active:scale-[0.97] ${
              text ? "bg-accent text-white hover:bg-accent-hover" : "bg-ink/80 text-white"
            }`}
          >
            Send it to {SITE.shortName}
            <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M2.5 13.5 21 5l-6 16-3.5-6.5-9-1z" />
            </svg>
          </a>
        </div>
      </div>
      <p className="mt-4 text-center text-[13px] text-faint">It opens your email with the note already in it.</p>
    </div>
  );
}
