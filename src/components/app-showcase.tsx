"use client";

import { ArrowUpRight } from "@/components/ui";
import { APPS, type AppCard } from "@/data/site";
import { track } from "@/lib/analytics";
import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";

function initials(name: string) {
  return name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
}

function AppIcon({ app, className = "size-14 rounded-[16px] text-lg" }: { app: AppCard; className?: string }) {
  if (app.icon) return <Image src={app.icon} alt="" width={128} height={128} className={`max-w-none shrink-0 object-cover ${className}`} />;
  return (
    <span
      aria-hidden="true"
      className={`flex shrink-0 items-center justify-center font-display font-bold shadow-[inset_0_1px_0_rgba(255,255,255,0.45)] ${className}`}
      style={{ background: app.color, color: app.onColor }}
    >
      {initials(app.name)}
    </span>
  );
}

/* ---------- Mock screens: a quick sketch of each app, drawn in code ---------- */

function Shirt({ color, stripe }: { color: string; stripe?: string }) {
  return (
    <svg viewBox="0 0 40 36" className="w-full" aria-hidden="true">
      <path d="M13 2h14l11 7-5 8-4-2v19H11V15l-4 2-5-8z" fill={color} />
      {stripe && <path d="M18 2h4v32h-4z" fill={stripe} />}
      <path d="M16 2a4 4 0 0 0 8 0" fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth="1.5" />
    </svg>
  );
}

function DreamKitScreen() {
  const kits: [string, string?][] = [
    ["#e11d48", "#fff"],
    ["#f8fafc", "#0f172a"],
    ["#2563eb"],
    ["#facc15", "#15803d"],
    ["#111827", "#3DDC84"],
    ["#7c3aed", "#fde047"],
  ];
  return (
    <div className="flex h-full flex-col bg-[#0d1711] px-4 pt-14 pb-6 text-white">
      <p className="text-[11px] font-semibold text-[#3DDC84]">Season 25</p>
      <p className="font-display text-[22px] leading-tight font-semibold">Pick your kit</p>
      <div className="mt-3 rounded-full bg-white/10 px-3 py-2 text-[11px] text-white/50">Search 2,000+ kits…</div>
      <div className="mt-4 grid grid-cols-3 gap-2">
        {kits.map(([c, s], i) => (
          <div key={i} className="rounded-2xl bg-white/[0.06] p-2.5">
            <Shirt color={c} stripe={s} />
          </div>
        ))}
      </div>
      <div className="mt-4 rounded-full bg-[#3DDC84] py-2.5 text-center text-[13px] font-bold text-[#0B1A10]">Download kit</div>
      <div className="mt-auto flex items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 text-[10px] text-white/50">
        <span className="rounded bg-[#facc15] px-1 font-bold text-black">Ad</span>
        This little banner pays for my coffee.
      </div>
    </div>
  );
}

function GoldScreen() {
  return (
    <div className="flex h-full flex-col bg-[#15120a] px-4 pt-14 pb-6 text-white">
      <p className="font-display text-[22px] leading-tight font-semibold">My gold</p>
      <div className="mt-3 rounded-[22px] bg-gradient-to-br from-[#F5C542] to-[#c9921a] p-4 text-[#1F1600]">
        <p className="text-[11px] font-semibold opacity-70">Total saved</p>
        <p className="font-display text-[30px] leading-none font-bold">
          2.45<span className="text-[16px]"> g</span>
        </p>
        <svg viewBox="0 0 200 50" className="mt-3 w-full" aria-hidden="true">
          <path d="M0 44 L30 40 L60 36 L90 30 L120 26 L150 16 L200 6" fill="none" stroke="#1F1600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <div className="mt-3 flex items-center justify-between rounded-2xl bg-white/[0.06] px-3.5 py-3">
        <span className="text-[12px] leading-tight">
          <span className="block font-semibold">Auto-Save</span>
          <span className="text-white/50">Every week via bKash</span>
        </span>
        <span className="flex h-6 w-10 items-center justify-end rounded-full bg-[#34c759] p-0.5" aria-hidden="true">
          <span className="size-5 rounded-full bg-white" />
        </span>
      </div>
      <div className="mt-2 flex items-center justify-between rounded-2xl bg-white/[0.06] px-3.5 py-3 text-[12px]">
        <span className="text-white/60">Next save</span>
        <span className="font-semibold">Friday</span>
      </div>
      <div className="mt-auto rounded-full bg-[#F5C542] py-2.5 text-center text-[13px] font-bold text-[#1F1600]">Buy gold</div>
    </div>
  );
}

function SkillScreen() {
  const skillFinesse = APPS.find((a) => a.name === "Skill Finesse");
  const lessons = [
    ["Intro to Design", 100],
    ["Colors that work", 70],
    ["Type on screens", 30],
  ] as const;
  return (
    <div className="relative flex h-full flex-col bg-[#120d22] px-4 pt-14 pb-6 text-white">
      <div className="pop absolute inset-x-2.5 top-10 z-10 flex gap-2.5 rounded-[18px] border border-white/15 bg-white/15 p-2.5 backdrop-blur-xl [--d:700ms]">
        {skillFinesse ? (
          <AppIcon app={skillFinesse} className="size-8 rounded-[9px] text-[10px]" />
        ) : (
          <span className="size-8 shrink-0 rounded-[9px] bg-[#A78BFA]" />
        )}
        <span className="min-w-0 text-[11px] leading-snug">
          <span className="block font-semibold">Skill Finesse</span>
          <span className="block text-white/70">10 minutes today keeps the streak alive.</span>
        </span>
      </div>
      <p className="mt-14 font-display text-[22px] leading-tight font-semibold">Keep going</p>
      <p className="text-[11px] text-[#A78BFA]">5-day streak</p>
      <div className="mt-4 space-y-2">
        {lessons.map(([t, p]) => (
          <div key={t} className="rounded-2xl bg-white/[0.06] px-3.5 py-3">
            <div className="flex justify-between text-[12px]">
              <span className="font-semibold">{t}</span>
              <span className="text-white/50">{p}%</span>
            </div>
            <div className="mt-2 h-1.5 rounded-full bg-white/10">
              <div className="h-full rounded-full bg-[#A78BFA]" style={{ width: `${p}%` }} />
            </div>
          </div>
        ))}
      </div>
      <div className="mt-auto rounded-full bg-[#A78BFA] py-2.5 text-center text-[13px] font-bold text-[#150B33]">Continue lesson</div>
    </div>
  );
}

function StayScreen() {
  return (
    <div className="flex h-full flex-col bg-[#1a0d10] text-white">
      <div className="relative h-[210px] shrink-0 overflow-hidden bg-gradient-to-b from-[#ffb199] to-[#FB7185]">
        <svg viewBox="0 0 200 120" className="absolute bottom-0 w-full" aria-hidden="true">
          <circle cx="150" cy="42" r="16" fill="#fff4d6" />
          <path d="M20 120V60h50v60zM80 120V35h60v85zM150 120V70h40v50z" fill="#2A0710" opacity="0.85" />
          <path d="M90 45h8v8h-8zM106 45h8v8h-8zM122 45h8v8h-8zM90 62h8v8h-8zM106 62h8v8h-8zM122 62h8v8h-8zM90 79h8v8h-8zM122 79h8v8h-8zM30 70h8v8h-8zM50 70h8v8h-8zM30 88h8v8h-8z" fill="#ffd27a" />
        </svg>
      </div>
      <div className="flex flex-1 flex-col px-4 pt-4 pb-6">
        <p className="font-display text-[20px] leading-tight font-semibold">Seaside Suite</p>
        <p className="mt-1 flex items-center gap-1.5 text-[11px] text-[#86efac]">
          <span className="size-1.5 rounded-full bg-[#34c759]" /> 2 rooms left tonight
        </p>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[11px]">
          <div className="rounded-xl bg-white/[0.06] px-3 py-2">
            <span className="block text-white/50">Check in</span>
            <span className="font-semibold">Fri</span>
          </div>
          <div className="rounded-xl bg-white/[0.06] px-3 py-2">
            <span className="block text-white/50">Check out</span>
            <span className="font-semibold">Sun</span>
          </div>
        </div>
        <p className="mt-auto mb-2 flex items-center justify-center gap-1.5 text-[10px] text-white/50">
          <svg viewBox="0 0 24 24" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
            <rect x="5" y="11" width="14" height="10" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
          Secure payment
        </p>
        <div className="rounded-full bg-[#FB7185] py-2.5 text-center text-[13px] font-bold text-[#2A0710]">Book now</div>
      </div>
    </div>
  );
}

function GenericScreen({ app }: { app: AppCard }) {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-3 bg-[#0c0c0f] px-6 text-center text-white">
      <AppIcon app={app} className="size-20 rounded-[22px] text-2xl" />
      <p className="font-display text-[20px] font-semibold">{app.name}</p>
      <p className="text-[12px] text-white/60">{app.tagline}</p>
    </div>
  );
}

const SCREENS: Record<string, () => ReactNode> = {
  "Dream Kit 25": DreamKitScreen,
  "Gold Kinen": GoldScreen,
  "Skill Finesse": SkillScreen,
  Stayverz: StayScreen,
};

/* ---------- The showcase ---------- */

export function AppShowcase() {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(false);
  const phoneRef = useRef<HTMLDivElement>(null);
  const switchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const touched = useRef(false);

  // Open the first app on its own the first time the phone scrolls into view.
  useEffect(() => {
    const el = phoneRef.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let t: ReturnType<typeof setTimeout>;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        io.disconnect();
        t = setTimeout(() => !touched.current && setOpen(true), 900);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      clearTimeout(t);
    };
  }, []);

  useEffect(() => () => clearTimeout(switchTimer.current), []);

  // Like iOS: close the current app to the home screen, then launch the next one.
  const launch = (i: number) => {
    touched.current = true;
    track(`App opened: ${APPS[i].name}`);
    clearTimeout(switchTimer.current);
    if (open && i === active) return;
    if (!open) {
      setActive(i);
      setOpen(true);
      return;
    }
    setOpen(false);
    switchTimer.current = setTimeout(() => {
      setActive(i);
      setOpen(true);
    }, 280);
  };

  const goHome = () => {
    touched.current = true;
    clearTimeout(switchTimer.current);
    setOpen(false);
  };

  const onKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const delta = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + APPS.length) % APPS.length;
    launch(next);
    tabRefs.current[next]?.focus();
  };

  const app = APPS[active];
  const Screen = SCREENS[app.name];
  const cols = 4;
  const origin = `${((active % cols) + 0.5) * (100 / cols)}% ${16 + Math.floor(active / cols) * 16}%`;

  return (
    <div className="mt-12 grid gap-10 md:mt-14 md:grid-cols-[auto_1fr] md:gap-x-16 md:gap-y-8">
      {/* App picker: above the phone on small screens, beside it on large ones */}
      <div role="tablist" aria-label="Apps" className="flex flex-wrap justify-center gap-2 md:col-start-2 md:row-start-1 md:self-end md:justify-start">
        {APPS.map((a, i) => {
          const on = i === active;
          return (
            <button
              key={a.name}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              type="button"
              role="tab"
              id={`app-tab-${i}`}
              aria-selected={on}
              aria-controls="app-panel"
              tabIndex={on ? 0 : -1}
              onClick={() => launch(i)}
              onKeyDown={(e) => onKey(e, i)}
              className={`flex items-center gap-2 rounded-full border py-1.5 pr-4 pl-1.5 text-[14px] font-semibold transition-colors duration-300 ${
                on ? "border-white/25 bg-white/12 text-white" : "border-white/10 text-night-muted hover:bg-white/[0.06] hover:text-white"
              }`}
            >
              <AppIcon app={a} className="size-7 rounded-[9px] text-[10px]" />
              {a.name}
            </button>
          );
        })}
      </div>

      {/* Phone */}
      <div ref={phoneRef} className="relative mx-auto w-[288px] shrink-0 md:col-start-1 md:row-span-2 md:row-start-1 md:self-center">
        <div
          aria-hidden="true"
          className="absolute -inset-16 -z-10 rounded-full opacity-40 blur-3xl transition-colors duration-700"
          style={{ background: open ? app.color : "#2747f0" }}
        />
        <div className="relative rounded-[50px] bg-gradient-to-b from-[#56565c] via-[#1d1d20] to-[#3b3b40] p-[3px] shadow-[0_50px_90px_-40px_rgba(0,0,0,0.8)]">
          <span aria-hidden="true" className="absolute top-28 -left-[3px] h-8 w-[3px] rounded-l bg-[#2a2a2e]" />
          <span aria-hidden="true" className="absolute top-40 -left-[3px] h-14 w-[3px] rounded-l bg-[#2a2a2e]" />
          <span aria-hidden="true" className="absolute top-36 -right-[3px] h-20 w-[3px] rounded-r bg-[#2a2a2e]" />
          <div className="rounded-[47px] bg-black p-[9px]">
            <div className="relative h-[568px] overflow-hidden rounded-[38px] bg-[#07080d] text-white">
              {/* Home screen */}
              <div
                className={`phone-home absolute inset-0 px-4 pt-14 ${open ? "scale-[0.94] opacity-40 blur-[2px]" : ""}`}
                inert={open}
              >
                <div aria-hidden="true" className="absolute inset-0 -z-0">
                  <div className="absolute -top-10 -left-16 size-64 rounded-full bg-accent/50 blur-3xl" />
                  <div className="absolute top-1/2 -right-20 size-56 rounded-full bg-[#7c3aed]/35 blur-3xl" />
                  <div className="absolute -bottom-10 left-0 size-52 rounded-full bg-[#ff8a3d]/25 blur-3xl" />
                </div>
                <div className="relative grid grid-cols-4 gap-x-2 gap-y-4">
                  {APPS.map((a, i) => (
                    <button
                      key={a.name}
                      type="button"
                      tabIndex={-1}
                      onClick={() => launch(i)}
                      className="flex flex-col items-center gap-1.5 transition-transform active:scale-90"
                    >
                      <AppIcon app={a} className="size-[54px] rounded-[15px] text-[15px]" />
                      <span className="w-full truncate text-center text-[10px] text-white/85">{a.name}</span>
                    </button>
                  ))}
                </div>
                <div className="relative mt-6 rounded-[24px] border border-white/15 bg-white/10 p-4 backdrop-blur-xl">
                  <p className="text-[11px] font-semibold text-white/60">Shipped</p>
                  <p className="font-display text-[34px] leading-none font-semibold">
                    {APPS.length} <span className="text-[15px] font-medium text-white/60">apps, on real stores</span>
                  </p>
                  <p className="mt-3 text-[11px] text-white/60">Tap one to open it.</p>
                </div>
              </div>

              {/* Open app */}
              <div
                className={`phone-app absolute inset-0 overflow-hidden rounded-[38px] ${open ? "" : "pointer-events-none scale-[0.18] opacity-0"}`}
                style={{ transformOrigin: origin }}
                aria-hidden={!open}
              >
                {Screen ? <Screen /> : <GenericScreen app={app} />}
              </div>

              {/* Island and status bar */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between px-7 pt-[18px] text-[12px] font-semibold">
                <span>9:41</span>
                <span className="flex items-center gap-1">
                  <svg viewBox="0 0 18 12" className="h-2.5 w-4" fill="currentColor">
                    <rect x="0" y="8" width="3" height="4" rx="1" />
                    <rect x="5" y="5" width="3" height="7" rx="1" />
                    <rect x="10" y="2" width="3" height="10" rx="1" />
                    <rect x="15" y="0" width="3" height="12" rx="1" opacity="0.4" />
                  </svg>
                  <span className="h-2.5 w-5 rounded-[3px] border border-current p-[1px]">
                    <span className="block h-full w-3/4 rounded-[1px] bg-current" />
                  </span>
                </span>
              </div>
              <div className="pointer-events-none absolute top-3 left-1/2 z-20 h-[26px] w-[92px] -translate-x-1/2 rounded-full bg-black" />

              {/* Home indicator: tap it to go back home */}
              <button
                type="button"
                onClick={goHome}
                tabIndex={open ? 0 : -1}
                aria-label="Back to the home screen"
                className={`absolute bottom-0 left-1/2 z-20 flex h-6 w-40 -translate-x-1/2 items-center justify-center transition-opacity ${open ? "opacity-100" : "pointer-events-none opacity-0"}`}
              >
                <span className="h-[5px] w-28 rounded-full bg-white/80" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="min-w-0 md:col-start-2 md:row-start-2 md:self-start">
        <div id="app-panel" role="tabpanel" aria-labelledby={`app-tab-${active}`} key={active}>
          <div className="pop flex flex-wrap items-center gap-2 text-[11px] font-semibold tracking-wider uppercase">
            {app.platforms.map((p) => (
              <span key={p} className="rounded-md bg-white/10 px-2 py-1" style={{ color: app.color }}>
                {p}
              </span>
            ))}
            {app.tags.map((t) => (
              <span key={t} className="rounded-md bg-white/[0.06] px-2 py-1 text-night-muted">
                {t}
              </span>
            ))}
          </div>
          <h3 className="pop mt-4 font-display text-[clamp(36px,4.4vw,56px)] leading-[1] font-semibold tracking-[-0.035em] [--d:60ms]">
            {app.name}
          </h3>
          <p className="pop mt-3 max-w-md text-[18px] leading-relaxed text-white/80 [--d:120ms]">{app.tagline}</p>
          <p className="pop mt-2 text-[13px] text-night-muted [--d:160ms]">{app.stack}</p>

          <dl className="mt-7 grid max-w-lg grid-cols-3 gap-2.5">
            {app.stats.map((s, i) => (
              <div
                key={s.label}
                className="pop flex flex-col rounded-[20px] border border-white/10 bg-white/[0.04] px-3 py-4"
                style={{ ["--d" as string]: `${200 + i * 70}ms` }}
              >
                <dt className="text-[12px] text-night-muted">{s.label}</dt>
                <dd className="order-first font-display text-[clamp(20px,2vw,26px)] leading-tight font-semibold" style={{ color: app.color }}>
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="pop mt-7 flex flex-wrap items-center gap-4 [--d:420ms]">
            <a
              href={app.href}
              data-track={`Store link: ${app.name}`}
              target="_blank"
              rel="noopener noreferrer"
              className="sheen inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ background: app.color, color: app.onColor }}
            >
              Open on {app.store} <ArrowUpRight />
            </a>
            <button
              type="button"
              onClick={() => launch((active + 1) % APPS.length)}
              className="text-[15px] font-semibold text-night-muted transition-colors hover:text-white"
            >
              Next app →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
