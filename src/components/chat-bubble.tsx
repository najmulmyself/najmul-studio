"use client";

import { SITE } from "@/data/site";
import Image from "next/image";
import { useEffect, useRef, useState, type FormEvent } from "react";

const SHOW_LAUNCHER_MS = 6_000;
const TEASER_MS = 120_000;
const TEASER_KEY = "chat-teaser-seen";
const CONTACT_KEY = "chat-contact";

const STARTERS = ["How much would my app cost?", "Can you start this month?", "I need an automation"];

type Msg = { id: number; from: "me" | "them"; text: string; status?: "sending" | "sent" | "failed" };

// Browser storage can be blocked (private mode, previews), so every use is guarded.
function load(key: string) {
  try {
    return sessionStorage.getItem(key) ?? "";
  } catch {
    return "";
  }
}
function save(key: string, value: string) {
  try {
    sessionStorage.setItem(key, value);
  } catch {}
}

function whatsappLink(text: string) {
  return `https://wa.me/${SITE.whatsapp}?text=${encodeURIComponent(text || `Hi ${SITE.shortName}! I found you on najmulmyself.com.`)}`;
}

function Avatar({ size }: { size: number }) {
  return (
    <Image
      src="/avatar-pixel.png"
      alt=""
      width={size}
      height={size}
      unoptimized
      className="shrink-0 rounded-full [image-rendering:pixelated]"
      style={{ width: size, height: size }}
    />
  );
}

// A small chat in the corner. Messages go to my Telegram through /api/chat;
// WhatsApp is offered as a second way to reach me when a number is set.
export function ChatBubble() {
  const [launcher, setLauncher] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [open, setOpen] = useState(false);
  const [contact, setContact] = useState("");
  const [contactSaved, setContactSaved] = useState(false);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [needContact, setNeedContact] = useState(false);
  const nextId = useRef(1);
  const threadRef = useRef<HTMLDivElement>(null);
  const draftRef = useRef<HTMLTextAreaElement>(null);
  const contactRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const saved = load(CONTACT_KEY);
    if (saved) {
      setContact(saved);
      setContactSaved(true);
    }
    const a = setTimeout(() => setLauncher(true), SHOW_LAUNCHER_MS);
    const b = load(TEASER_KEY) ? undefined : setTimeout(() => setTeaser(true), TEASER_MS);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, []);

  // Once the visitor opens the chat or closes the teaser, don't nag again this visit.
  useEffect(() => {
    if (open) {
      setTeaser(false);
      save(TEASER_KEY, "1");
      requestAnimationFrame(() => (contactSaved ? draftRef : contactRef).current?.focus());
    }
  }, [open, contactSaved]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpen(false);
      launcherRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    threadRef.current?.scrollTo({ top: threadRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs]);

  const push = (m: Omit<Msg, "id">) => {
    const id = nextId.current++;
    setMsgs((all) => [...all, { ...m, id }]);
    return id;
  };
  const mark = (id: number, status: Msg["status"]) =>
    setMsgs((all) => all.map((m) => (m.id === id ? { ...m, status } : m)));

  const send = async (e?: FormEvent) => {
    e?.preventDefault();
    const text = draft.trim();
    if (!text) return;
    if (!contact.trim()) {
      setNeedContact(true);
      contactRef.current?.focus();
      return;
    }
    const firstMessage = !msgs.some((m) => m.from === "me" && m.status === "sent");
    setDraft("");
    setContactSaved(true);
    save(CONTACT_KEY, contact.trim());
    const id = push({ from: "me", text, status: "sending" });

    const website = panelRef.current?.querySelector<HTMLInputElement>('[name="website"]')?.value ?? "";
    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: text,
        contact: contact.trim(),
        website,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      }),
    }).catch(() => null);

    if (res?.ok) {
      mark(id, "sent");
      if (firstMessage) {
        setTimeout(() => push({ from: "them", text: `Got it! I’ll reply to ${contact.trim()} soon.` }), 700);
      }
    } else {
      mark(id, "failed");
    }
  };

  const failed = msgs.find((m) => m.status === "failed");
  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent("Hi from your website")}&body=${encodeURIComponent(
    `${failed?.text ?? ""}\n\n${contact}`,
  )}`;

  return (
    <div className="fixed right-4 bottom-4 z-40 flex flex-col items-end gap-3 md:right-6 md:bottom-6">
      {open && (
        <div
          ref={panelRef}
          role="dialog"
          aria-label={`Chat with ${SITE.shortName}`}
          className="chat-panel flex h-[min(540px,calc(100dvh-110px))] w-[min(380px,calc(100vw-32px))] flex-col overflow-hidden rounded-[28px] border border-white/80 bg-white/[0.97] text-ink shadow-[0_30px_80px_-24px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-2xl backdrop-saturate-[1.8]"
        >
          <div className="flex items-center gap-3 border-b border-black/5 px-4 py-3">
            <Avatar size={38} />
            <div className="min-w-0 flex-1">
              <p className="leading-tight font-semibold">{SITE.name}</p>
              <p className="flex items-center gap-1.5 text-[12px] text-muted">
                <span className="size-1.5 rounded-full bg-[#34c759]" aria-hidden="true" /> {SITE.status}
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                launcherRef.current?.focus();
              }}
              aria-label="Close chat"
              className="flex size-9 items-center justify-center rounded-full bg-black/5 text-ink-soft transition-colors hover:bg-black/10"
            >
              <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </button>
          </div>

          <div ref={threadRef} role="log" aria-live="polite" className="flex flex-1 flex-col gap-2 overflow-y-auto px-4 py-4">
            <div className="flex items-end gap-2">
              <Avatar size={26} />
              <p className="max-w-[80%] rounded-[18px] rounded-bl-md bg-[#e9e9eb] px-3.5 py-2.5 text-[14.5px] leading-snug">
                Hey! I’m {SITE.shortName}. Ask me anything about your app or automation idea. A real human reads this.
              </p>
            </div>

            {msgs.map((m) =>
              m.from === "them" ? (
                <div key={m.id} className="pop flex items-end gap-2">
                  <Avatar size={26} />
                  <p className="max-w-[80%] rounded-[18px] rounded-bl-md bg-[#e9e9eb] px-3.5 py-2.5 text-[14.5px] leading-snug">{m.text}</p>
                </div>
              ) : (
                <div key={m.id} className="pop flex flex-col items-end gap-1">
                  <p
                    className={`max-w-[80%] rounded-[18px] rounded-br-md px-3.5 py-2.5 text-[14.5px] leading-snug whitespace-pre-line text-white ${
                      m.status === "failed" ? "bg-[#d93025]/85" : "bg-accent"
                    } ${m.status === "sending" ? "opacity-70" : ""}`}
                  >
                    {m.text}
                  </p>
                  <span className="text-[11px] font-semibold text-faint">
                    {m.status === "sending" ? "Sending…" : m.status === "sent" ? "Delivered" : "Not delivered"}
                  </span>
                </div>
              ),
            )}

            {failed && (
              <p className="pop mt-1 rounded-2xl bg-[#d93025]/8 px-3.5 py-2.5 text-[13px] leading-snug text-ink-soft">
                That didn’t go through.{" "}
                <a href={mailto} className="font-semibold text-accent underline-offset-2 hover:underline">
                  Email it instead
                </a>
                {SITE.whatsapp && (
                  <>
                    {" or "}
                    <a href={whatsappLink(failed.text)} target="_blank" rel="noopener noreferrer" className="font-semibold text-accent underline-offset-2 hover:underline">
                      send it on WhatsApp
                    </a>
                  </>
                )}
                .
              </p>
            )}

            {msgs.length === 0 && (
              <div className="mt-auto flex flex-wrap justify-end gap-1.5 pt-3">
                {STARTERS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => {
                      setDraft(s);
                      draftRef.current?.focus();
                    }}
                    className="rounded-full border border-accent/25 bg-white px-3 py-1.5 text-[13px] font-semibold text-accent transition-colors hover:bg-accent/5"
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <form onSubmit={send} className="border-t border-black/5 bg-white/60 px-3 pt-3 pb-3">
            <input type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            {!contactSaved ? (
              <div className="mb-2">
                <label htmlFor="chat-contact" className="sr-only">
                  Your email or WhatsApp, so I can reply
                </label>
                <input
                  id="chat-contact"
                  ref={contactRef}
                  value={contact}
                  onChange={(e) => {
                    setContact(e.target.value);
                    setNeedContact(false);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      draftRef.current?.focus();
                    }
                  }}
                  autoComplete="email"
                  placeholder="Your email or WhatsApp, so I can reply"
                  aria-invalid={needContact}
                  className="block w-full rounded-2xl border border-black/10 bg-white px-3.5 py-2.5 text-[15px] placeholder:text-faint focus-visible:border-accent focus-visible:outline-none aria-[invalid=true]:border-[#d93025]"
                />
                {needContact && <p className="mt-1 px-1 text-[12px] font-medium text-[#d93025]">Where should I reply? Add an email or WhatsApp.</p>}
              </div>
            ) : (
              <p className="mb-2 px-1 text-[12px] text-muted">
                Replying to {contact}.{" "}
                <button type="button" onClick={() => setContactSaved(false)} className="font-semibold text-accent hover:underline">
                  Change
                </button>
              </p>
            )}
            <div className="flex items-end gap-2">
              <label htmlFor="chat-message" className="sr-only">
                Message
              </label>
              <textarea
                id="chat-message"
                ref={draftRef}
                rows={1}
                value={draft}
                maxLength={2000}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    send();
                  }
                }}
                placeholder="Message"
                className="max-h-28 min-h-11 flex-1 resize-none rounded-[22px] border border-black/10 bg-white px-4 py-2.5 text-[15px] leading-snug [field-sizing:content] placeholder:text-faint focus-visible:border-accent focus-visible:outline-none"
              />
              <button
                type="submit"
                aria-label="Send"
                disabled={!draft.trim()}
                className="flex size-11 shrink-0 items-center justify-center rounded-full bg-accent text-white transition-[opacity,transform] active:scale-95 disabled:opacity-40"
              >
                <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </button>
            </div>
            {SITE.whatsapp && (
              <a
                href={whatsappLink(draft.trim())}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex items-center justify-center gap-1.5 text-[12.5px] font-semibold text-[#1f9d55] hover:underline"
              >
                <svg viewBox="0 0 24 24" className="size-4" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.2 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.3-.7-2.8-1.1-4.6-4-4.7-4.2-.1-.2-1.1-1.5-1.1-2.9s.7-2 1-2.3c.2-.3.5-.3.7-.3h.5c.2 0 .4 0 .6.5l.8 2c.1.2.1.4 0 .5l-.4.6-.3.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.1.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.4.1.1.1.7-.1 1.3Z" />
                </svg>
                or chat on WhatsApp
              </a>
            )}
          </form>
        </div>
      )}

      {teaser && !open && (
        <div className="chat-teaser relative flex max-w-[260px] items-start gap-2 rounded-[20px] rounded-br-md border border-white/80 bg-white/[0.97] py-3 pr-9 pl-3.5 text-[14px] leading-snug shadow-[0_18px_40px_-18px_rgba(0,0,0,0.35)] backdrop-blur-xl">
          <button type="button" onClick={() => setOpen(true)} className="text-left">
            <span className="block font-semibold">Got a question?</span>
            <span className="text-ink-soft">I’m one message away. No forms, no sales call.</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setTeaser(false);
              save(TEASER_KEY, "1");
            }}
            aria-label="Dismiss"
            className="absolute top-2 right-2 flex size-6 items-center justify-center rounded-full text-faint transition-colors hover:bg-black/5 hover:text-ink"
          >
            <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6 6 18" />
            </svg>
          </button>
        </div>
      )}

      <button
        ref={launcherRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close chat" : `Chat with ${SITE.shortName}`}
        className={`chat-launcher relative flex size-15 items-center justify-center rounded-full border-2 border-white bg-accent shadow-[0_16px_36px_-12px_rgba(39,71,240,0.7)] transition-[opacity,transform] duration-500 hover:scale-105 active:scale-95 ${
          launcher || open ? "opacity-100" : "pointer-events-none translate-y-4 scale-75 opacity-0"
        }`}
      >
        {open ? (
          <svg viewBox="0 0 24 24" className="size-6 text-white" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" aria-hidden="true">
            <path d="M6 9l6 6 6-6" />
          </svg>
        ) : (
          <>
            <Avatar size={56} />
            <span className="absolute right-0 bottom-0 size-4 rounded-full border-[3px] border-white bg-[#34c759]" aria-hidden="true" />
          </>
        )}
      </button>
    </div>
  );
}
