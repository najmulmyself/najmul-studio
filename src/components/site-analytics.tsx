"use client";

import { SITE } from "@/data/site";
import { track } from "@/lib/analytics";
import Clarity from "@microsoft/clarity";
import Link from "next/link";
import { useEffect, useState } from "react";

const CHOICE_KEY = "analytics-consent";

// Visitors in the EU/EEA, UK and Switzerland must agree before Clarity records
// them. The browser's time zone is a good-enough, server-free way to tell.
function needsConsent() {
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  return zone.startsWith("Europe/") || ["Atlantic/Canary", "Atlantic/Madeira", "Atlantic/Azores", "Atlantic/Reykjavik", "Atlantic/Faroe"].includes(zone);
}

function loadChoice() {
  try {
    return localStorage.getItem(CHOICE_KEY);
  } catch {
    return null;
  }
}
function saveChoice(choice: "granted" | "denied") {
  try {
    localStorage.setItem(CHOICE_KEY, choice);
  } catch {}
}

function start(consented: boolean) {
  Clarity.init(SITE.clarityId);
  if (consented) Clarity.consentV2({ ad_Storage: "denied", analytics_Storage: "granted" });
}

// Loads Microsoft Clarity (recordings, heatmaps) and reports clicks on
// anything marked data-track, plus which FAQ questions get opened.
export function SiteAnalytics() {
  const [ask, setAsk] = useState(false);

  useEffect(() => {
    if (!SITE.clarityId) return;
    if (!needsConsent()) return start(false);
    const choice = loadChoice();
    if (choice === "granted") start(true);
    else if (choice !== "denied") setAsk(true);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as Element | null)?.closest<HTMLElement>("[data-track]");
      if (el?.dataset.track) track(el.dataset.track);
    };
    // FAQ answers are <details>; their toggle event doesn't bubble, so listen while capturing.
    const onToggle = (e: Event) => {
      const details = e.target as HTMLDetailsElement;
      if (details.tagName === "DETAILS" && details.open && details.closest("#faq")) {
        // Skip the decorative "+" icon, keep just the question.
        const summary = details.querySelector("summary")?.cloneNode(true) as HTMLElement | undefined;
        summary?.querySelectorAll("[aria-hidden]").forEach((icon) => icon.remove());
        track(`FAQ: ${summary?.textContent?.trim() ?? ""}`);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("toggle", onToggle, true);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("toggle", onToggle, true);
    };
  }, []);

  if (!ask) return null;

  const choose = (choice: "granted" | "denied") => {
    saveChoice(choice);
    setAsk(false);
    if (choice === "granted") start(true);
  };

  return (
    <div
      role="region"
      aria-label="Analytics consent"
      className="chat-teaser fixed right-4 bottom-24 left-4 z-40 rounded-[24px] border border-white/80 bg-white/[0.97] p-4 text-ink shadow-[0_24px_60px_-24px_rgba(0,0,0,0.4)] backdrop-blur-xl sm:right-auto sm:bottom-6 sm:left-6 sm:max-w-sm"
    >
      <p className="font-semibold">Mind if I watch how the site gets used?</p>
      <p className="mt-1 text-[14px] leading-snug text-ink-soft">
        Anonymous recordings through Microsoft Clarity show me what confuses people. No ads, and what you type stays hidden.{" "}
        <Link href="/privacy" className="font-semibold text-accent underline-offset-2 hover:underline">
          Privacy
        </Link>
      </p>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={() => choose("denied")}
          className="flex-1 rounded-full bg-black/5 px-4 py-2.5 text-[14px] font-semibold text-ink-soft transition-colors hover:bg-black/10"
        >
          No thanks
        </button>
        <button
          type="button"
          onClick={() => choose("granted")}
          className="sheen flex-1 rounded-full bg-accent px-4 py-2.5 text-[14px] font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          Sure
        </button>
      </div>
    </div>
  );
}
