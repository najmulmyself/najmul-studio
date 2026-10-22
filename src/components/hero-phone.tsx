import { SITE } from "@/data/site";
import Image from "next/image";

const glassBubble =
  "border border-white/15 bg-white/12 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-xl";

// A phone showing a short chat with me. Messages arrive on a CSS loop;
// with reduced motion they are simply all shown.
export function HeroPhone() {
  return (
    <div className="relative mx-auto w-[288px] shrink-0">
      {/* Soft light behind the phone so its glass has something to catch. */}
      <div aria-hidden="true" className="absolute -inset-20 -z-10">
        <div className="absolute top-10 left-6 size-56 rounded-full bg-accent/25 blur-3xl" />
        <div className="absolute right-0 bottom-16 size-48 rounded-full bg-[#ffb36b]/30 blur-3xl" />
      </div>

      {/* Titanium frame with side buttons. */}
      <div className="relative rounded-[50px] bg-gradient-to-b from-[#56565c] via-[#1d1d20] to-[#3b3b40] p-[3px] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.6)]">
        <span aria-hidden="true" className="absolute top-28 -left-[3px] h-8 w-[3px] rounded-l bg-[#2a2a2e]" />
        <span aria-hidden="true" className="absolute top-40 -left-[3px] h-14 w-[3px] rounded-l bg-[#2a2a2e]" />
        <span aria-hidden="true" className="absolute top-36 -right-[3px] h-20 w-[3px] rounded-r bg-[#2a2a2e]" />

        <div
          role="img"
          aria-label={`A chat with ${SITE.shortName}: got an app idea stuck in your Notes app? Tell me about it and I'll send you a free build plan.`}
          className="rounded-[47px] bg-black p-[9px]"
        >
          <div className="relative flex h-[568px] flex-col overflow-hidden rounded-[38px] bg-[#07080d] text-white">
            {/* Wallpaper */}
            <div aria-hidden="true" className="absolute inset-0">
              <div className="absolute -top-16 -left-10 size-64 rounded-full bg-accent/45 blur-3xl" />
              <div className="absolute top-1/2 -right-16 size-56 rounded-full bg-[#7c3aed]/30 blur-3xl" />
              <div className="absolute -bottom-10 left-6 size-48 rounded-full bg-[#ff8a3d]/20 blur-3xl" />
            </div>

            <div className="absolute top-3 left-1/2 z-10 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />

            <div className="relative flex items-center gap-2.5 border-b border-white/10 bg-white/5 px-4 pt-12 pb-3 backdrop-blur-xl">
              <Image
                src={SITE.photo}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-full object-cover object-top ring-1 ring-white/20"
              />
              <div className="min-w-0">
                <p className="text-[14px] leading-tight font-semibold">{SITE.name}</p>
                <p className="flex items-center gap-1.5 text-[11px] text-white/60">
                  <span className="size-1.5 rounded-full bg-[#34c759]" /> iOS dev · {SITE.location}
                </p>
              </div>
            </div>

            <div className="relative flex flex-1 flex-col gap-2.5 px-3.5 py-4 text-[13px] leading-snug">
              <p className={`bubble msg-1 max-w-[82%] rounded-[20px] rounded-bl-md px-3.5 py-2.5 ${glassBubble}`}>
                Got an app idea stuck in your Notes app?
              </p>
              <p className="bubble msg-2 max-w-[82%] self-end rounded-[20px] rounded-br-md bg-accent px-3.5 py-2.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]">
                Kinda. A booking app for my gym.
              </p>
              <p className={`bubble msg-3 max-w-[82%] rounded-[20px] rounded-bl-md px-3.5 py-2.5 ${glassBubble}`}>
                Love it. Tell me more and I’ll send you a free build plan.
              </p>
              <div className={`bubble msg-4 flex w-fit gap-1 rounded-[20px] rounded-bl-md px-3.5 py-3 ${glassBubble}`}>
                <span className="typing-dot size-1.5 rounded-full bg-white" />
                <span className="typing-dot size-1.5 rounded-full bg-white [animation-delay:150ms]" />
                <span className="typing-dot size-1.5 rounded-full bg-white [animation-delay:300ms]" />
              </div>
            </div>

            <div className={`relative m-3 flex items-center justify-between rounded-full py-2 pr-2 pl-4 text-[13px] text-white/50 ${glassBubble}`}>
              Message
              <span className="flex size-7 items-center justify-center rounded-full bg-accent text-white">
                <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              </span>
            </div>
            <div aria-hidden="true" className="relative mx-auto mb-2 h-1 w-28 rounded-full bg-white/50" />
          </div>
        </div>
      </div>
    </div>
  );
}
