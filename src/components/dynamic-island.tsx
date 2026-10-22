"use client";

import { SITE } from "@/data/site";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

type Variant = "solid" | "glass" | "glass-dark" | "glass-light";
type Look = Exclude<Variant, "glass">;

// "glass" adapts like iOS: light glass over light sections, dark glass over
// sections marked data-island-dark. Compare other looks with
// ?island=solid, ?island=glass-dark or ?island=glass-light.
const DEFAULT_VARIANT: Variant = "glass";
const VARIANTS: Variant[] = ["solid", "glass", "glass-dark", "glass-light"];

const LINKS: { label: string; hint: string; href: string; tint: string; icon: ReactNode }[] = [
  {
    label: "Services",
    hint: "What I can build",
    href: "#services",
    tint: "#2747f0",
    icon: <path d="M13 2 4 14h7l-1 8 9-12h-7z" />,
  },
  {
    label: "Work",
    hint: "Apps I shipped",
    href: "#work",
    tint: "#1f9d55",
    icon: (
      <>
        <rect x="6" y="2" width="12" height="20" rx="3" />
        <path d="M11 18h2" />
      </>
    ),
  },
  {
    label: "Process",
    hint: "How we’ll work",
    href: "#process",
    tint: "#7c3aed",
    icon: <path d="M4 6h16M4 12h10M4 18h6" />,
  },
  {
    label: "FAQ",
    hint: "Before you ask",
    href: "#faq",
    tint: "#ea580c",
    icon: (
      <>
        <circle cx="12" cy="12" r="9" />
        <path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .8-1 1.5V14M12 17.5h.01" />
      </>
    ),
  },
];

const STYLES: Record<Look, { shell: string; text: string; muted: string; tile: string; close: string }> = {
  solid: {
    shell: "bg-[#0b0b0c] shadow-[0_16px_40px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)]",
    text: "text-white",
    muted: "text-white/60",
    tile: "bg-white/[0.07] hover:bg-white/[0.13]",
    close: "bg-white/10 hover:bg-white/20",
  },
  "glass-dark": {
    shell:
      "border border-white/15 bg-[rgba(18,18,22,0.52)] backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_16px_40px_-14px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.22),inset_0_-1px_0_rgba(255,255,255,0.05)]",
    text: "text-white",
    muted: "text-white/65",
    tile: "border border-white/10 bg-white/[0.08] hover:bg-white/[0.15]",
    close: "bg-white/12 hover:bg-white/20",
  },
  "glass-light": {
    shell:
      "border border-white/80 bg-white/60 backdrop-blur-2xl backdrop-saturate-[1.8] shadow-[0_16px_40px_-16px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,1),inset_0_-1px_0_rgba(0,0,0,0.04)]",
    text: "text-ink",
    muted: "text-ink/60",
    tile: "border border-white/70 bg-white/60 hover:bg-white/90",
    close: "bg-black/5 hover:bg-black/10",
  },
};

function useDhakaTime() {
  const [time, setTime] = useState<string | null>(null);
  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Dhaka", hour: "numeric", minute: "2-digit" }).format(
        new Date(),
      );
    setTime(format());
    const id = setInterval(() => setTime(format()), 30_000);
    return () => clearInterval(id);
  }, []);
  return time;
}

function PixelAvatar({ size }: { size: number }) {
  return (
    <Image
      src="/avatar-pixel.png"
      alt=""
      width={size}
      height={size}
      unoptimized
      priority
      className="shrink-0 rounded-full ring-2 ring-white/25 [image-rendering:pixelated]"
      style={{ width: size, height: size }}
    />
  );
}

// The site header, shaped like the iPhone's Dynamic Island: a small pill with
// a pixel avatar and my name that springs open on tap into the site menu.
export function DynamicIsland() {
  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState<Variant>(DEFAULT_VARIANT);
  const islandRef = useRef<HTMLDivElement>(null);
  const [overDark, setOverDark] = useState(false);
  const time = useDhakaTime();
  const look: Look = variant === "glass" ? (overDark ? "glass-dark" : "glass-light") : variant;
  const s = STYLES[look];

  useEffect(() => {
    const requested = new URLSearchParams(window.location.search).get("island") as Variant | null;
    if (requested && VARIANTS.includes(requested)) setVariant(requested);
  }, []);

  // Watch which section sits under the island so adaptive glass can switch tone.
  useEffect(() => {
    if (variant !== "glass") return;
    let frame = 0;
    const check = () => {
      frame = 0;
      const y = 40;
      const dark = Array.from(document.querySelectorAll("[data-island-dark]")).some((el) => {
        const r = el.getBoundingClientRect();
        return r.top <= y && r.bottom >= y;
      });
      setOverDark(dark);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [variant]);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    const onPointer = (e: PointerEvent) => {
      if (islandRef.current && !islandRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open, close]);

  return (
    <header className="fixed top-3 left-1/2 z-50 -translate-x-1/2">
      <div
        ref={islandRef}
        data-open={open}
        className={`island overflow-hidden ${s.shell} ${s.text} ${
          open ? "w-[min(440px,calc(100vw-24px))] rounded-[32px]" : "w-auto rounded-[26px]"
        }`}
      >
        <button
          type="button"
          aria-expanded={open}
          aria-controls="island-panel"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="flex w-full items-center gap-2.5 rounded-[26px] p-[6px] pr-4 text-left"
        >
          <PixelAvatar size={open ? 44 : 34} />
          <span className="min-w-0 flex-1">
            <span className="block font-display text-[17px] leading-tight font-bold tracking-tight whitespace-nowrap">
              {open ? SITE.name : "najmul"}
              <span className="text-accent">.</span>
            </span>
            {open && (
              <span className={`block text-[12.5px] ${s.muted}`}>
                Indie iOS dev · Dhaka{time && <span suppressHydrationWarning> {time}</span>}
              </span>
            )}
          </span>
          {open && (
            <span aria-hidden="true" className={`flex size-8 items-center justify-center rounded-full ${s.close}`}>
              <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
                <path d="M6 6l12 12M18 6 6 18" />
              </svg>
            </span>
          )}
        </button>

        <div
          id="island-panel"
          inert={!open}
          className={`island-panel grid w-0 min-w-full ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <nav aria-label="Main" className="grid grid-cols-2 gap-2 px-2.5 pt-1.5">
              {LINKS.map((link, i) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={close}
                  style={{ transitionDelay: open ? `${80 + i * 40}ms` : "0ms" }}
                  className={`island-item flex items-center gap-3 rounded-[20px] p-3 transition-colors ${s.tile}`}
                >
                  <span
                    aria-hidden="true"
                    className="flex size-9 shrink-0 items-center justify-center rounded-full text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.35)]"
                    style={{ background: link.tint }}
                  >
                    <svg viewBox="0 0 24 24" className="size-[18px]" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      {link.icon}
                    </svg>
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[15px] leading-tight font-semibold">{link.label}</span>
                    <span className={`block truncate text-[12px] ${s.muted}`}>{link.hint}</span>
                  </span>
                </a>
              ))}
            </nav>
            <div className="p-2.5 pt-2">
              <a
                href="#contact"
                onClick={close}
                style={{ transitionDelay: open ? "260ms" : "0ms" }}
                className="island-item sheen flex min-h-12 items-center justify-between rounded-full bg-accent pr-2 pl-5 font-semibold text-white transition-[background-color,transform] hover:bg-accent-hover active:scale-[0.98]"
              >
                <span className="flex items-center gap-2">
                  <span className="size-2 rounded-full bg-[#34c759] shadow-[0_0_8px_#34c759]" aria-hidden="true" />
                  Hire me
                  <span className="font-normal text-white/75">· {SITE.status.toLowerCase()}</span>
                </span>
                <span aria-hidden="true" className="flex size-8 items-center justify-center rounded-full bg-white/20">
                  <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M7 17 17 7M8 7h9v9" />
                  </svg>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
