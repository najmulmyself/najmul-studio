import { SITE } from "@/data/site";
import Image from "next/image";

// A phone showing a short chat with me. Messages arrive on a CSS loop;
// with reduced motion they are simply all shown.
export function HeroPhone() {
  return (
    <div className="relative mx-auto w-[280px] shrink-0">
      <div
        aria-hidden="true"
        className="absolute -inset-16 -z-10 rounded-full bg-[radial-gradient(closest-side,rgba(26,26,26,0.14),transparent)]"
      />
      <div
        role="img"
        aria-label={`A chat with ${SITE.shortName}: got an app idea stuck in your Notes app? Tell me about it and I'll send you a free build plan.`}
        className="rounded-[46px] border border-black/80 bg-[#111] p-2.5 shadow-[0_40px_80px_-30px_rgba(0,0,0,0.55)]"
      >
        <div className="relative flex h-[560px] flex-col overflow-hidden rounded-[38px] bg-[#0c0c0d] text-white">
          <div className="absolute top-2.5 left-1/2 h-6 w-24 -translate-x-1/2 rounded-full bg-black" />

          <div className="flex items-center gap-2.5 border-b border-white/10 px-4 pt-12 pb-3">
            <Image
              src={SITE.photo}
              alt=""
              width={36}
              height={36}
              className="size-9 rounded-full object-cover object-top"
            />
            <div className="min-w-0">
              <p className="text-[14px] leading-tight font-semibold">{SITE.name}</p>
              <p className="text-[11px] text-white/55">iOS dev · {SITE.location}</p>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.5 px-3.5 py-4 text-[13px] leading-snug">
            <p className="bubble msg-1 max-w-[82%] rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2.5">
              Got an app idea stuck in your Notes app?
            </p>
            <p className="bubble msg-2 max-w-[82%] self-end rounded-2xl rounded-br-md bg-accent px-3.5 py-2.5">
              Kinda. A booking app for my gym.
            </p>
            <p className="bubble msg-3 max-w-[82%] rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-2.5">
              Love it. Tell me more and I’ll send you a free build plan.
            </p>
            <div className="bubble msg-4 flex w-fit gap-1 rounded-2xl rounded-bl-md bg-white/10 px-3.5 py-3">
              <span className="typing-dot size-1.5 rounded-full bg-white" />
              <span className="typing-dot size-1.5 rounded-full bg-white [animation-delay:150ms]" />
              <span className="typing-dot size-1.5 rounded-full bg-white [animation-delay:300ms]" />
            </div>
          </div>

          <div className="m-3 flex items-center justify-between rounded-full border border-white/10 bg-white/5 py-2 pr-2 pl-4 text-[13px] text-white/45">
            Message
            <span className="flex size-7 items-center justify-center rounded-full bg-accent text-white">
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M12 19V5M5 12l7-7 7 7" />
              </svg>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
