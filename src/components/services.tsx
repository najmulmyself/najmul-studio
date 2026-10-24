import { SERVICES, SITE } from "@/data/site";
import Image from "next/image";
import type { ReactNode } from "react";

// Pixel-art robot, drawn from a character map so it stays crisp at any size.
const ROBOT = [
  ".....rr.....",
  ".....kk.....",
  "..kkkkkkkk..",
  ".kwwwwwwwwk.",
  ".kwbbwwbbwk.",
  ".kwbbwwbbwk.",
  "kkwwwwwwwwkk",
  "kkwwkkkkwwkk",
  ".kwwwwwwwwk.",
  "..kkkkkkkk..",
  "...kk..kk...",
  "...kk..kk...",
];
const ROBOT_COLORS: Record<string, string> = { k: "#1a1a1a", w: "#ffffff", b: "#2747f0", r: "#ff4d4d" };

function PixelRobot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 12 12" shapeRendering="crispEdges" className={className} aria-hidden="true">
      {ROBOT.flatMap((row, y) =>
        [...row].map((c, x) =>
          c === "." ? null : <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={ROBOT_COLORS[c]} />,
        ),
      )}
    </svg>
  );
}

function Icon({ children, className = "size-5" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {children}
    </svg>
  );
}

function Pill({ project, children, className }: { project: string; children: ReactNode; className: string }) {
  return (
    <a
      href="#contact"
      data-start-project={project}
      className={`inline-flex min-h-12 items-center gap-2 rounded-full px-6 font-semibold transition-transform duration-200 hover:-translate-y-0.5 active:scale-[0.97] ${className}`}
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

/* ---------- Card 1: from napkin to App Store ---------- */

const STOPS = [
  { label: "Napkin sketch", icon: <path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" /> },
  { label: "Build", icon: <path d="m8 9-4 3 4 3M16 9l4 3-4 3M13.5 6l-3 12" /> },
  { label: "TestFlight", icon: <path d="M2.5 13.5 21 5l-6 16-3.5-6.5-9-1z" /> },
  { label: "App Store", icon: <path d="M12 4 6.5 19M12 4l5.5 15M8.5 14h7" /> },
];
const BARS = [10, 16, 22, 31, 44, 62, 100];

function AppCard() {
  const s = SERVICES[0];
  return (
    <article className="flex flex-col overflow-hidden rounded-[32px] bg-accent p-7 text-white md:col-span-7 md:p-9">
      <p className="font-display text-sm font-semibold text-white/70">01 · iOS apps</p>
      <h3 className="mt-3 max-w-md font-display text-[clamp(28px,3vw,36px)] leading-[1.05] font-semibold tracking-[-0.03em]">
        {s.title}
      </h3>

      <figure className="mt-8" aria-label="From napkin sketch to build, TestFlight and the App Store">
        <ol className="relative grid grid-cols-4">
          <span aria-hidden="true" className="absolute top-[22px] right-[12.5%] left-[12.5%] h-0.5 bg-white/30" />
          {STOPS.map((stop, i) => {
            const last = i === STOPS.length - 1;
            return (
              <li key={stop.label} className="relative flex flex-col items-center gap-2 text-center">
                <span
                  className={`flex size-11 items-center justify-center rounded-full border-2 ${
                    last ? "border-white bg-white text-accent" : "border-white/40 bg-accent text-white"
                  }`}
                >
                  <Icon>{stop.icon}</Icon>
                </span>
                <span className={`text-[12px] leading-tight sm:text-[13px] ${last ? "font-semibold" : "text-white/75"}`}>
                  {stop.label}
                </span>
              </li>
            );
          })}
        </ol>
      </figure>

      <div className="mt-8 flex items-end gap-5 rounded-3xl bg-white/10 p-5">
        <div className="shrink-0">
          <p className="font-display text-[44px] leading-none font-semibold tracking-[-0.03em]">100k+</p>
          <p className="mt-1 text-sm text-white/75">downloads, one solo app</p>
        </div>
        <div aria-hidden="true" className="flex h-20 flex-1 items-end gap-1.5">
          {BARS.map((h, i) => (
            <span
              key={i}
              className="bar flex-1 origin-bottom rounded-t-md"
              style={{
                height: `${h}%`,
                background: i === BARS.length - 1 ? "#ffffff" : `rgba(255,255,255,${0.2 + i * 0.07})`,
                transitionDelay: `${i * 70}ms`,
              }}
            />
          ))}
        </div>
      </div>

      <p className="mt-6 max-w-lg leading-relaxed text-white/85">{s.body}</p>
      <div className="mt-6">
        <Pill project="app" className="sheen bg-white text-accent">
          {s.cta}
        </Pill>
      </div>
    </article>
  );
}

/* ---------- Card 2: an automation flow ---------- */

function FlowLine() {
  return (
    <svg viewBox="0 0 2 28" className="mx-auto h-7 w-0.5 overflow-visible" aria-hidden="true">
      <line x1="1" y1="0" x2="1" y2="28" stroke="#1a1a1a" strokeWidth="2" className="flow-dash" />
    </svg>
  );
}

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-2xl border-2 border-ink bg-white px-3 py-2 text-[13px] font-semibold shadow-[3px_3px_0_#1a1a1a]">
      {children}
    </span>
  );
}

function AutomationCard() {
  const s = SERVICES[1];
  return (
    <article className="flex flex-col rounded-[32px] bg-[#ffd23f] p-7 text-ink md:col-span-5 md:p-9">
      <p className="font-display text-sm font-semibold text-ink/60">02 · AI automation</p>
      <h3 className="mt-3 font-display text-[clamp(28px,3vw,36px)] leading-[1.05] font-semibold tracking-[-0.03em]">
        {s.title}
      </h3>

      <figure
        className="mt-8 flex flex-col items-center"
        aria-label="An example flow: a new email arrives, a robot reads it, adds a row to a sheet and pings you when done"
      >
        <Chip>
          <Icon className="size-4">
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="m3 7 9 6 9-6" />
          </Icon>
          New invoice email
        </Chip>
        <FlowLine />
        <div className="flex items-center gap-3 rounded-2xl bg-ink px-4 py-3 text-white">
          <PixelRobot className="size-9" />
          <span className="text-[13px] leading-tight">
            <span className="block font-semibold">Robot reads it</span>
            <span className="text-white/65">and files it for you</span>
          </span>
        </div>
        <FlowLine />
        <div className="flex flex-wrap justify-center gap-2">
          <Chip>
            <Icon className="size-4">
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 10h18M9 4v16" />
            </Icon>
            Row added to sheet
          </Chip>
          <Chip>
            <span className="flex size-4 items-center justify-center rounded-full bg-[#1f9d55] text-white">
              <Icon className="size-3">
                <path d="m5 12 5 5 9-10" />
              </Icon>
            </span>
            You get pinged
          </Chip>
        </div>
      </figure>

      <p className="mt-8 flex-1 leading-relaxed text-ink/80">
        {s.body}
        {SITE.automationExample && ` ${SITE.automationExample}`}
      </p>
      <div className="mt-6">
        <Pill project="automation" className="sheen bg-ink text-[#ffd23f]">
          {s.cta}
        </Pill>
      </div>
    </article>
  );
}

/* ---------- Card 3: your team, plus me ---------- */

const BRINGS = ["Clean Architecture", "80%+ test coverage", "TestFlight to App Store", "Remote, GMT+6"];

function TeamCard() {
  const s = SERVICES[2];
  return (
    <article className="grid items-center gap-10 rounded-[32px] bg-[#e9e3ff] p-7 text-ink md:col-span-12 md:grid-cols-[1fr_1.1fr] md:p-9">
      <div>
        <p className="font-display text-sm font-semibold text-[#5b3df5]">03 · Contract & remote roles</p>
        <h3 className="mt-3 font-display text-[clamp(28px,3vw,36px)] leading-[1.05] font-semibold tracking-[-0.03em]">
          {s.title}
        </h3>
        <p className="mt-4 max-w-md leading-relaxed text-ink/75">{s.body}</p>
        <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
          <Pill project="team" className="sheen bg-[#5b3df5] text-white">
            {s.cta}
          </Pill>
          <a
            href={SITE.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-[#5b3df5] underline-offset-4 hover:underline"
          >
            Résumé (PDF)
          </a>
        </div>
      </div>

      <figure className="rounded-[28px] bg-white/70 p-6" aria-label={`Your team, plus ${SITE.shortName}`}>
        <div className="flex items-center justify-center gap-3">
          <div className="flex -space-x-3" aria-hidden="true">
            {["#c9bdff", "#b3a4ff", "#9d8bff"].map((c) => (
              <span
                key={c}
                className="flex size-14 items-center justify-center rounded-full border-[3px] border-white text-white"
                style={{ background: c }}
              >
                <Icon className="size-6">
                  <circle cx="12" cy="9" r="3.5" />
                  <path d="M5.5 19a6.5 6.5 0 0 1 13 0" />
                </Icon>
              </span>
            ))}
          </div>
          <span className="font-display text-3xl font-semibold text-[#5b3df5]" aria-hidden="true">
            +
          </span>
          <Image
            src="/avatar-pixel.png"
            alt=""
            width={64}
            height={64}
            unoptimized
            className="size-16 rounded-full border-[3px] border-[#5b3df5] [image-rendering:pixelated]"
          />
        </div>
        <figcaption className="mt-3 text-center text-sm text-ink/60">
          your team <span className="mx-1">+</span> {SITE.shortName.toLowerCase()}
        </figcaption>
        <ul className="mt-6 grid gap-2 sm:grid-cols-2">
          {BRINGS.map((item) => (
            <li key={item} className="flex items-center gap-2.5 rounded-2xl bg-[#f4f1ff] px-3.5 py-2.5 text-[14px] font-semibold">
              <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-[#5b3df5] text-white" aria-hidden="true">
                <Icon className="size-3">
                  <path d="m5 12 5 5 9-10" />
                </Icon>
              </span>
              {item}
            </li>
          ))}
        </ul>
      </figure>
    </article>
  );
}

export function ServiceCards() {
  return (
    <div className="mt-14 grid gap-4 md:grid-cols-12">
      <AppCard />
      <AutomationCard />
      <TeamCard />
    </div>
  );
}
