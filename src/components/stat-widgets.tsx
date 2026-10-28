"use client";

import { useEffect, useRef, useState, type PointerEvent, type ReactNode } from "react";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// True once the element has scrolled into view (stays true).
function useSeen<T extends Element>() {
  const ref = useRef<T>(null);
  const [seen, setSeen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setSeen(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSeen(true);
          io.disconnect();
        }
      },
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return { ref, seen };
}

// Counts from 0 to `to` once `start` is true.
function useCountUp(to: number, start: boolean, reduced: boolean, ms = 1400) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    if (reduced) {
      setValue(to);
      return;
    }
    let frame = 0;
    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / ms);
      setValue(Math.round(to * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [to, start, reduced, ms]);
  return value;
}

// A widget card that tilts toward the pointer, with a glare that follows it.
function Widget({
  className,
  children,
  label,
  reduced,
}: {
  className: string;
  children: ReactNode;
  label: string;
  reduced: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (reduced || e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    ref.current.style.setProperty("--rx", `${(0.5 - y) * 10}deg`);
    ref.current.style.setProperty("--ry", `${(x - 0.5) * 12}deg`);
    ref.current.style.setProperty("--gx", `${x * 100}%`);
    ref.current.style.setProperty("--gy", `${y * 100}%`);
  };
  const onLeave = () => {
    if (!ref.current) return;
    ref.current.style.setProperty("--rx", "0deg");
    ref.current.style.setProperty("--ry", "0deg");
  };
  return (
    <div className="h-full [perspective:900px]">
      <div
        ref={ref}
        role="group"
        aria-label={label}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className={`widget group relative flex h-full min-h-[200px] flex-col overflow-hidden rounded-[30px] p-4 sm:aspect-square sm:rounded-[34px] sm:p-5 md:p-6 ${className}`}
      >
        {children}
        <span aria-hidden="true" className="widget-glare pointer-events-none absolute inset-0" />
      </div>
    </div>
  );
}

const SPARK = "M2 52 L18 49 L32 46 L46 40 L60 37 L74 28 L88 22 L102 13 L118 4";

export function StatWidgets() {
  const reduced = usePrefersReducedMotion();
  const { ref, seen } = useSeen<HTMLDivElement>();
  const downloads = useCountUp(100, seen, reduced);
  const years = useCountUp(3, seen, reduced, 900);
  const coverage = useCountUp(80, seen, reduced);
  const yearMarks = ["2022", "2023", "2024", "2025", "Now"];
  const ring = 2 * Math.PI * 42;

  return (
    <div ref={ref} className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-4">
      {/* Downloads */}
      <Widget reduced={reduced} label="100k+ downloads on one solo app" className="bg-accent text-white">
        <div className="flex items-center justify-between text-[13px] font-semibold text-white/85">
          <span>Downloads</span>
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7 17 17 7M8 7h9v9" />
          </svg>
        </div>
        <p aria-hidden="true" className="mt-1 font-display text-[clamp(34px,4vw,48px)] leading-none font-semibold tracking-[-0.04em] tabular-nums">
          {downloads}k+
        </p>
        <svg viewBox="0 0 120 56" className="mt-auto w-full overflow-visible" aria-hidden="true">
          <path d={`${SPARK} L118 56 L2 56 Z`} fill="rgba(255,255,255,0.14)" />
          <path
            d={SPARK}
            fill="none"
            stroke="#fff"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            pathLength={1}
            strokeDasharray="1"
            strokeDashoffset={seen || reduced ? 0 : 1}
            className="spark"
          />
          <circle cx="118" cy="4" r="4.5" fill="#fff" className={seen || reduced ? "opacity-100" : "opacity-0"} />
        </svg>
        <p className="mt-2 text-[12.5px] text-white/85">Dream Kit 25 · built solo</p>
      </Widget>

      {/* Years */}
      <Widget reduced={reduced} label="3+ years shipping apps to the stores" className="glass text-ink">
        <span className="text-[13px] font-semibold text-muted">Shipping since 2022</span>
        <p aria-hidden="true" className="mt-1 font-display text-[clamp(34px,4vw,48px)] leading-none font-semibold tracking-[-0.04em] tabular-nums">
          {years}+ <span className="text-[0.55em] text-muted">yrs</span>
        </p>
        <ol className="mt-auto grid grid-cols-5 gap-1.5" aria-hidden="true">
          {yearMarks.map((y, i) => (
            <li key={y} className="flex flex-col gap-1.5">
              <span
                className="year-bar h-9 rounded-lg"
                style={{
                  background: i === yearMarks.length - 1 ? "#2747f0" : "#1a1a1a",
                  opacity: seen || reduced ? 1 - (yearMarks.length - 1 - i) * 0.15 : 0.08,
                  transitionDelay: `${i * 120}ms`,
                }}
              />
              <span className="text-center text-[10px] font-semibold text-muted">{y}</span>
            </li>
          ))}
        </ol>
        <p className="mt-2 text-[12.5px] text-muted">App Store + Play Store</p>
      </Widget>

      {/* Test coverage ring */}
      <Widget reduced={reduced} label="80%+ test coverage on payment code" className="bg-ink text-white">
        <span className="text-[13px] font-semibold text-white/60">Test coverage</span>
        <div className="relative mx-auto my-3 aspect-square w-[72%] sm:my-auto sm:w-[68%]">
          <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden="true">
            <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(52,199,89,0.2)" strokeWidth="11" />
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="#34c759"
              strokeWidth="11"
              strokeLinecap="round"
              strokeDasharray={ring}
              strokeDashoffset={ring * (1 - (seen || reduced ? 0.8 : 0))}
              className="ring-progress"
            />
          </svg>
          <p aria-hidden="true" className="absolute inset-0 flex items-center justify-center font-display text-[clamp(22px,2.6vw,30px)] font-semibold tracking-[-0.03em] tabular-nums">
            {coverage}%+
          </p>
        </div>
        <p className="text-[12.5px] text-white/60">on payment code, TDD</p>
      </Widget>

      {/* Meetings */}
      <Widget reduced={reduced} label="1 developer, no meetings about meetings" className="bg-[#ffd23f] text-ink">
        <a
          href="#contact"
          data-start-project="call"
          className="absolute inset-0 z-10 rounded-[inherit]"
          aria-label="Okay, one meeting: with you. Book a free call"
        />
        <div className="-mx-4 -mt-4 flex items-center justify-between bg-[#ff3b30] px-4 py-2.5 text-[12px] font-bold tracking-[0.12em] text-white uppercase sm:-mx-5 sm:-mt-5 sm:px-5 md:-mx-6 md:-mt-6 md:px-6">
          <span>Today</span>
          <span>1 dev</span>
        </div>
        <div className="relative my-auto h-[4.5em] py-3 font-display leading-none sm:py-0">
          <p className="meet-default absolute inset-x-0 top-0">
            <span className="block text-[clamp(44px,5vw,60px)] font-semibold tracking-[-0.04em]">0</span>
            <span className="block text-[15px] font-semibold">meetings today</span>
          </p>
          <p className="meet-hover absolute inset-x-0 top-0">
            <span className="block text-[clamp(26px,2.8vw,32px)] font-semibold tracking-[-0.03em]">…okay, one.</span>
            <span className="block text-[15px] font-semibold">With you? →</span>
          </p>
        </div>
        <p className="text-[12.5px] text-ink/70">No meetings about meetings.</p>
      </Widget>
    </div>
  );
}
