"use client";

import { SITE } from "@/data/site";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";

const LINKS = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "Process", href: "#process" },
  { label: "FAQ", href: "#faq" },
];

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

// The site header, shaped like the iPhone's Dynamic Island: a small pill that
// springs open on hover (or tap) to show the time and the section links.
export function DynamicIsland() {
  const [open, setOpen] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const islandRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const time = useDhakaTime();

  useEffect(() => {
    setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

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

  const onEnter = () => {
    if (!canHover) return;
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  };
  const onLeave = () => {
    if (!canHover) return;
    closeTimer.current = setTimeout(close, 180);
  };

  return (
    <header className="fixed top-3 left-1/2 z-50 -translate-x-1/2">
      <div
        ref={islandRef}
        onMouseEnter={onEnter}
        onMouseLeave={onLeave}
        className={`island overflow-hidden bg-[#0b0b0c] text-white shadow-[0_14px_40px_-12px_rgba(0,0,0,0.55),inset_0_1px_0_rgba(255,255,255,0.08)] ${
          open ? "w-[min(560px,calc(100vw-24px))] rounded-[30px]" : "w-auto rounded-[26px]"
        }`}
      >
        <div className="flex h-[52px] items-center gap-2 pr-[7px] pl-[7px]">
          <button
            type="button"
            aria-expanded={open}
            aria-controls="island-panel"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
            className="flex min-w-0 items-center gap-2.5 rounded-full py-1 pr-2 focus-visible:outline-offset-1"
          >
            <Image
              src={SITE.photo}
              alt=""
              width={38}
              height={38}
              priority
              className="size-[38px] shrink-0 rounded-full object-cover object-top ring-1 ring-white/15"
            />
            <span className="font-display text-[17px] font-bold tracking-tight">
              {open ? SITE.name : "najmul"}
            </span>
            <span className="hidden items-center gap-1.5 text-[13px] whitespace-nowrap text-white/65 sm:flex">
              <span className="size-[7px] rounded-full bg-[#34c759] shadow-[0_0_8px_#34c759]" aria-hidden="true" />
              {SITE.status}
            </span>
          </button>
          <a
            href="#contact"
            onClick={close}
            className="sheen ml-auto inline-flex h-[38px] shrink-0 items-center rounded-full bg-accent px-4 text-[14px] font-semibold text-white transition-[background-color,transform] hover:bg-accent-hover active:scale-95"
          >
            Hire me
          </a>
        </div>

        <div
          id="island-panel"
          inert={!open}
          className={`island-panel grid ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        >
          <div className="overflow-hidden">
            <div className="px-3 pt-1 pb-3">
              <p className="px-1 pb-3 text-[13px] text-white/60">
                Indie iOS dev · {SITE.location.split(",")[0]}
                {time && <span suppressHydrationWarning> {time}</span>}
              </p>
              <nav aria-label="Main" className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {LINKS.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={close}
                    className="rounded-2xl bg-white/[0.08] px-3 py-3 text-center text-[14px] font-semibold transition-colors hover:bg-white/[0.16]"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
