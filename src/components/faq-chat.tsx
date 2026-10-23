"use client";

import { FAQ, SITE } from "@/data/site";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const TYPING_MS = 900;

function Avatar() {
  return (
    <Image
      src="/avatar-pixel.png"
      alt=""
      width={28}
      height={28}
      unoptimized
      className="size-7 shrink-0 rounded-full [image-rendering:pixelated]"
    />
  );
}

// The FAQ as a Messages thread: visitors tap a question, I "type" and answer.
// The first question comes pre-answered so the thread never starts empty.
export function FaqChat() {
  const [asked, setAsked] = useState<number[]>([0]);
  const [typing, setTyping] = useState(false);
  const threadRef = useRef<HTMLDivElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  // Keep the newest message in view inside the thread (never scrolls the page).
  useEffect(() => {
    const el = threadRef.current;
    if (el && asked.length > 1) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [asked, typing]);

  const ask = (i: number) => {
    if (typing) return;
    setAsked((a) => [...a, i]);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    setTyping(true);
    timer.current = setTimeout(() => setTyping(false), TYPING_MS);
  };

  const left = FAQ.map((_, i) => i).filter((i) => !asked.includes(i));

  return (
    <div className="glass mx-auto mt-12 max-w-[680px] overflow-hidden rounded-[32px] text-left">
      <div className="flex items-center gap-3 border-b border-black/5 bg-white/50 px-5 py-3.5">
        <Image
          src="/avatar-pixel.png"
          alt=""
          width={40}
          height={40}
          unoptimized
          className="size-10 rounded-full [image-rendering:pixelated]"
        />
        <div className="min-w-0 flex-1">
          <p className="leading-tight font-semibold">{SITE.name}</p>
          <p className="flex items-center gap-1.5 text-[12.5px] text-muted">
            <span className="size-1.5 rounded-full bg-[#34c759]" aria-hidden="true" /> {SITE.status}
          </p>
        </div>
        <span className="text-[12px] font-semibold text-faint">iMessage</span>
      </div>

      <div
        ref={threadRef}
        role="log"
        aria-live="polite"
        aria-label="Questions and answers"
        className="flex max-h-[460px] min-h-[300px] flex-col gap-2 overflow-y-auto px-4 py-5 md:px-6"
      >
        <p className="mb-1 text-center text-[11.5px] font-semibold text-faint">Today</p>
        {asked.map((qi, n) => {
          const last = n === asked.length - 1;
          const waiting = last && typing;
          const item = FAQ[qi];
          return (
            <div key={qi} className="flex flex-col gap-2">
              <p className={`${n > 0 ? "pop" : ""} mt-2 max-w-[78%] self-end rounded-[20px] rounded-br-md bg-accent px-4 py-2.5 text-[15px] leading-snug text-white`}>
                {item.q}
              </p>
              {waiting ? (
                <div className="flex items-end gap-2">
                  <Avatar />
                  <span className="pop flex gap-1 rounded-[20px] rounded-bl-md bg-[#e9e9eb] px-4 py-3.5 [--d:150ms]" aria-label={`${SITE.shortName} is typing`}>
                    <span className="typing-dot size-1.5 rounded-full bg-[#8e8e93]" />
                    <span className="typing-dot size-1.5 rounded-full bg-[#8e8e93] [animation-delay:0.15s]" />
                    <span className="typing-dot size-1.5 rounded-full bg-[#8e8e93] [animation-delay:0.3s]" />
                  </span>
                </div>
              ) : (
                <div className="flex items-end gap-2">
                  <Avatar />
                  <p className={`${n > 0 ? "pop" : ""} max-w-[78%] rounded-[20px] rounded-bl-md bg-[#e9e9eb] px-4 py-2.5 text-[15px] leading-snug text-ink`}>
                    {item.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="border-t border-black/5 bg-white/50 px-4 py-4 md:px-6">
        <p className="text-[12px] font-semibold text-muted">{left.length ? "Tap to ask" : "That’s every question I get."}</p>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {left.map((i) => (
            <button
              key={i}
              type="button"
              onClick={() => ask(i)}
              disabled={typing}
              className="rounded-full border border-accent/25 bg-white px-3.5 py-2 text-left text-[14px] font-semibold text-accent transition-[background-color,transform,opacity] hover:bg-accent/5 active:scale-[0.97] disabled:opacity-50"
            >
              {FAQ[i].q}
            </button>
          ))}
          <a
            href="#contact"
            className="rounded-full bg-ink px-3.5 py-2 text-[14px] font-semibold text-white transition-[background-color,transform] hover:bg-ink-soft active:scale-[0.97]"
          >
            {left.length ? "Something else? Ask me →" : "Got another one? Ask me →"}
          </a>
        </div>
      </div>
    </div>
  );
}
