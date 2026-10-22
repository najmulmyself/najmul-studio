"use client";

import { STEPS } from "@/data/site";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from "react";

// Each step gets its own stage color, like the service cards.
const STAGES = [{ bg: "#2747f0" }, { bg: "#ffd23f" }, { bg: "#e9e3ff" }];

// Children of the stage pop in one after another each time a step opens.
function Pop({ i, children, className = "" }: { i: number; children: ReactNode; className?: string }) {
  return (
    <div className={`pop ${className}`} style={{ "--d": `${120 + i * 160}ms` } as CSSProperties}>
      {children}
    </div>
  );
}

function ChatStage() {
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-2.5 text-[15px] leading-snug">
      <Pop i={0} className="max-w-[80%] self-start rounded-[20px] rounded-bl-md bg-white/20 px-4 py-2.5 text-white">
        hey, I have an app idea
      </Pop>
      <Pop i={1} className="max-w-[80%] self-start rounded-[20px] rounded-bl-md bg-white/20 px-4 py-2.5 text-white">
        it’s like Uber, but for dog walkers?
      </Pop>
      <Pop i={2} className="max-w-[80%] self-end rounded-[20px] rounded-br-md bg-white px-4 py-2.5 font-medium text-accent">
        Love it. Tell me everything.
      </Pop>
      <Pop i={3} className="self-end text-[11px] font-semibold text-white/60">
        Read just now
      </Pop>
      <Pop i={4} className="self-start rounded-[20px] rounded-bl-md bg-white/20 px-4 py-3.5">
        <span className="flex gap-1" aria-label="Typing">
          <span className="typing-dot size-1.5 rounded-full bg-white" />
          <span className="typing-dot size-1.5 rounded-full bg-white [animation-delay:0.15s]" />
          <span className="typing-dot size-1.5 rounded-full bg-white [animation-delay:0.3s]" />
        </span>
      </Pop>
    </div>
  );
}

const QUOTE_ROWS = [
  ["Scope", "Written down"],
  ["Timeline", "Agreed up front"],
  ["Price", "Fixed"],
];

function QuoteStage() {
  return (
    <Pop i={0} className="relative w-full max-w-[300px]">
      <div className="rounded-t-[22px] bg-white px-6 pt-6 pb-5 text-ink shadow-[0_24px_40px_-24px_rgba(0,0,0,0.35)]">
        <div className="flex items-baseline justify-between">
          <span className="font-display text-[20px] font-semibold tracking-[-0.02em]">Quote</span>
          <span className="font-mono text-[12px] text-muted">#001</span>
        </div>
        <dl className="mt-4 space-y-2.5 text-[14px]">
          {QUOTE_ROWS.map(([k, v], i) => (
            <Pop key={k} i={i + 1} className="flex justify-between gap-4 border-b border-dashed border-line pb-2.5">
              <dt className="text-muted">{k}</dt>
              <dd className="font-semibold">{v}</dd>
            </Pop>
          ))}
        </dl>
        <Pop i={4} className="mt-4 flex items-baseline justify-between">
          <span className="text-[13px] font-semibold">Surprise invoices</span>
          <span className="font-display text-[28px] leading-none font-semibold">0</span>
        </Pop>
      </div>
      {/* Torn receipt edge */}
      <svg viewBox="0 0 300 12" preserveAspectRatio="none" className="block h-3 w-full" aria-hidden="true">
        <path d="M0 0h300v4l-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8-10 8-10-8z" fill="#fff" />
      </svg>
      <Pop i={6} className="stamp absolute -top-4 -right-4 bg-white/80 rounded-xl border-[3px] border-[#e5484d] px-3 py-1 font-display text-[18px] font-bold tracking-[0.08em] text-[#e5484d] uppercase">
        Approved
      </Pop>
    </Pop>
  );
}

function ShipStage() {
  return (
    <div className="flex w-full max-w-[330px] flex-col gap-3">
      <Pop i={0} className="glass flex gap-3 rounded-[22px] p-3.5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-[11px] bg-gradient-to-b from-[#4aa3ff] to-[#1662e8] text-white" aria-hidden="true">
          <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M2.5 13.5 21 5l-6 16-3.5-6.5-9-1z" />
          </svg>
        </span>
        <span className="min-w-0 text-[13.5px] leading-snug">
          <span className="flex justify-between text-[12px] text-muted">
            <span className="font-semibold tracking-wide uppercase">TestFlight</span>
            <span>now</span>
          </span>
          <span className="block font-semibold">Your App · build 12 is ready</span>
          <span className="block text-ink-soft">Tap to install it on your phone.</span>
        </span>
      </Pop>
      <Pop i={1} className="self-center text-[12px] font-semibold text-[#5b3df5]">
        …a few builds later
      </Pop>
      <Pop i={2} className="flex items-center gap-3.5 rounded-[24px] bg-white p-4 shadow-[0_24px_40px_-24px_rgba(91,61,245,0.5)]">
        <span className="size-16 shrink-0 rounded-[16px] bg-[conic-gradient(from_200deg,#2747f0,#7c3aed,#ff6b9a,#ffd23f,#2747f0)] shadow-[inset_0_1px_0_rgba(255,255,255,0.4)]" aria-hidden="true" />
        <span className="min-w-0 flex-1">
          <span className="block font-display text-[17px] font-semibold tracking-[-0.01em]">Your App</span>
          <span className="block text-[12.5px] text-muted">Now on the App Store</span>
          <span className="mt-1.5 inline-flex items-center gap-1.5 text-[11.5px] font-semibold text-[#1f9d55]">
            <span className="size-1.5 rounded-full bg-[#34c759]" aria-hidden="true" /> Ready for Distribution
          </span>
        </span>
        <span className="rounded-full bg-accent px-4 py-1.5 text-[13px] font-bold text-white">GET</span>
      </Pop>
    </div>
  );
}

const STAGE_VIEWS = [ChatStage, QuoteStage, ShipStage];

export function ProcessSteps({ children }: { children?: ReactNode }) {
  const [active, setActive] = useState(0);
  // Steps advance on their own until the visitor picks one.
  const [auto, setAuto] = useState(true);
  const [hold, setHold] = useState(false);
  const [inView, setInView] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    const el = rootRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.4 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const pick = (i: number) => {
    setAuto(false);
    setActive(i);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const delta = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + STEPS.length) % STEPS.length;
    pick(next);
    tabRefs.current[next]?.focus();
  };

  const Stage = STAGE_VIEWS[active];
  const paused = hold || !inView;

  return (
    <div
      ref={rootRef}
      className="mt-14 grid items-center gap-6 md:grid-cols-[0.95fr_1.05fr] md:gap-10"
      onPointerEnter={() => setHold(true)}
      onPointerLeave={() => setHold(false)}
    >
      <div>
        <div role="tablist" aria-label="How we’ll work" aria-orientation="vertical" className="flex flex-col gap-2">
          {STEPS.map((step, i) => {
            const on = i === active;
            return (
              <button
                key={step.title}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                type="button"
                role="tab"
                id={`step-tab-${i}`}
                aria-selected={on}
                aria-controls="step-stage"
                tabIndex={on ? 0 : -1}
                onClick={() => pick(i)}
                onKeyDown={(e) => onKey(e, i)}
                className={`group relative flex gap-4 overflow-hidden rounded-[26px] p-5 text-left transition-colors duration-300 ${
                  on ? "glass" : "hover:bg-white/60"
                }`}
              >
                <span
                  className={`flex size-10 shrink-0 items-center justify-center rounded-full font-display text-[17px] font-semibold transition-colors duration-300 ${
                    on ? "text-white" : "bg-chip text-muted"
                  }`}
                  style={on ? { background: i === 1 ? "#1a1a1a" : i === 2 ? "#5b3df5" : "#2747f0" } : undefined}
                >
                  {i + 1}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block font-display text-[20px] leading-tight font-semibold tracking-[-0.02em] ${on ? "" : "text-ink-soft"}`}>
                    {step.title}
                  </span>
                  <span className={`island-panel grid ${on ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}>
                    <span className="overflow-hidden">
                      <span className="block pt-1.5 leading-relaxed text-ink-soft">{step.body}</span>
                    </span>
                  </span>
                </span>
                {on && (
                  <span aria-hidden="true" className="absolute inset-x-5 bottom-0 h-[3px] overflow-hidden rounded-full bg-black/5">
                    {auto ? (
                      <span
                        key={active}
                        data-paused={paused}
                        onAnimationEnd={() => setActive((a) => (a + 1) % STEPS.length)}
                        className="step-progress block h-full rounded-full bg-accent"
                      />
                    ) : (
                      <span className="block h-full rounded-full bg-accent" />
                    )}
                  </span>
                )}
              </button>
            );
          })}
        </div>
        {children && <div className="mt-8 hidden md:block">{children}</div>}
      </div>

      <div
        id="step-stage"
        role="tabpanel"
        aria-labelledby={`step-tab-${active}`}
        className="stage relative flex min-h-[380px] items-center justify-center overflow-hidden rounded-[36px] p-6 md:min-h-[460px] md:p-10"
        style={{ background: STAGES[active].bg }}
      >
        <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-24 size-64 rounded-full bg-white/15 blur-2xl" />
        <span aria-hidden="true" className="pointer-events-none absolute top-5 left-6 font-display text-[13px] font-semibold opacity-60" style={{ color: active === 0 ? "#fff" : "#1a1a1a" }}>
          Step {active + 1} of {STEPS.length}
        </span>
        <div key={active} className="relative flex w-full justify-center">
          <Stage />
        </div>
      </div>

      {children && <div className="text-center md:hidden">{children}</div>}
    </div>
  );
}
