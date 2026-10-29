"use client";

import { PROJECT_FORM, SITE } from "@/data/site";
import { tag, track } from "@/lib/analytics";
import dynamic from "next/dynamic";
import { useCallback, useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";

// Cal.com's embed only loads once someone reaches the booking step.
const CalEmbed = dynamic(() => import("@calcom/embed-react"), { ssr: false });
const CAL_NAMESPACE = "discovery";

const OPEN_EVENT = "start-project";
type OpenDetail = { need?: string; idea?: string; call?: boolean; source?: string };

// Opens the "Start a project" modal from anywhere. Links can do the same
// with a data-start-project attribute (its value preselects what they need).
export function openProjectModal(detail: OpenDetail = {}) {
  window.dispatchEvent(new CustomEvent<OpenDetail>(OPEN_EVENT, { detail }));
}

type Step = "details" | "book" | "done";
type Fields = { need: string; name: string; email: string; idea: string; timeline: string; budget: string };
const EMPTY: Fields = { need: "", name: "", email: "", idea: "", timeline: "", budget: "" };

function Chips({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: { id: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
}) {
  const id = useId();
  return (
    <fieldset>
      <legend id={id} className="text-[14px] font-semibold text-ink-soft">
        {label} <span className="font-normal text-faint">(optional)</span>
      </legend>
      <div role="radiogroup" aria-labelledby={id} className="mt-2 flex flex-wrap gap-2">
        {options.map((o) => {
          const on = value === o.id;
          return (
            <button
              key={o.id}
              type="button"
              role="radio"
              aria-checked={on}
              onClick={() => onChange(on ? "" : o.id)}
              className={`rounded-full border px-3.5 py-2 text-[14px] font-semibold transition-[background-color,border-color,color,transform] duration-200 active:scale-[0.97] ${
                on
                  ? "border-accent bg-accent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"
                  : "border-black/10 bg-white/70 text-ink-soft hover:bg-white"
              }`}
            >
              {o.label}
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: (props: { id: string; "aria-invalid": boolean; "aria-describedby"?: string }) => ReactNode;
}) {
  const id = useId();
  const errorId = `${id}-error`;
  return (
    <div>
      <label htmlFor={id} className="text-[14px] font-semibold text-ink-soft">
        {label}
      </label>
      <div className="mt-2">{children({ id, "aria-invalid": !!error, "aria-describedby": error ? errorId : undefined })}</div>
      {error && (
        <p id={errorId} className="mt-1.5 text-[13px] font-medium text-[#d93025]">
          {error}
        </p>
      )}
    </div>
  );
}

const inputClass =
  "block w-full rounded-2xl border border-black/10 bg-white/80 px-4 py-3 text-[16px] text-ink shadow-[inset_0_1px_2px_rgba(0,0,0,0.04)] transition-[border-color,box-shadow] placeholder:text-faint focus-visible:border-accent focus-visible:shadow-[0_0_0_4px_rgba(39,71,240,0.15)] focus-visible:outline-none aria-[invalid=true]:border-[#d93025]";

function summary(f: Fields) {
  const need = PROJECT_FORM.needs.find((n) => n.id === f.need)?.label;
  return [
    need && `Needs: ${need}`,
    `Building: ${f.idea.trim()}`,
    f.timeline && `Timeline: ${f.timeline}`,
    f.budget && `Budget: ${f.budget}`,
  ]
    .filter(Boolean)
    .join("\n");
}

// Emails me the details as soon as someone continues, so a lead isn't lost
// if they never book. Fire and forget: the visitor never waits on it.
function sendLead(f: Fields) {
  if (!SITE.web3formsKey) return;
  const need = PROJECT_FORM.needs.find((n) => n.id === f.need)?.label;
  fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({
      access_key: SITE.web3formsKey,
      subject: `New project from ${f.name.trim()}${need ? `: ${need}` : ""}`,
      from_name: "Portfolio project form",
      name: f.name.trim(),
      email: f.email.trim(),
      replyto: f.email.trim(),
      needs: need || "Not picked",
      building: f.idea.trim(),
      timeline: f.timeline || "Not picked",
      budget: f.budget || "Not picked",
    }),
  }).catch(() => {});
}

export function ProjectModal() {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [step, setStep] = useState<Step>("details");
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [errors, setErrors] = useState<Partial<Record<keyof Fields, string>>>({});
  const [isCall, setIsCall] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  // Going back to edit and continuing again only re-sends if something changed.
  const lastSent = useRef("");

  const set = <K extends keyof Fields>(k: K, v: Fields[K]) => {
    setFields((f) => ({ ...f, [k]: v }));
    setErrors((e) => ({ ...e, [k]: undefined }));
  };

  const open = useCallback((detail: OpenDetail) => {
    track("Hire form opened");
    if (detail.source) tag("hire_source", detail.source);
    setIsCall(!!detail.call);
    setFields((f) => ({
      ...f,
      need: detail.need ?? f.need,
      idea: detail.idea ? detail.idea : f.idea,
    }));
    setStep((s) => (s === "done" ? "details" : s));
    const dialog = dialogRef.current;
    if (dialog && !dialog.open) {
      dialog.showModal();
      // Start on the sheet itself, not its first button (and no surprise keyboard on phones).
      dialog.focus();
    }
  }, []);

  const close = useCallback(() => dialogRef.current?.close(), []);

  // Open from the custom event, and from any link marked data-start-project.
  useEffect(() => {
    const onOpen = (e: Event) => open((e as CustomEvent<OpenDetail>).detail ?? {});
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const trigger = (e.target as Element | null)?.closest<HTMLElement>("[data-start-project]");
      if (!trigger) return;
      e.preventDefault();
      const value = trigger.dataset.startProject ?? "";
      const source = trigger.textContent?.trim() || trigger.getAttribute("aria-label") || "button";
      open(value === "call" ? { call: true, source } : { need: value || undefined, source });
    };
    window.addEventListener(OPEN_EVENT, onOpen);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      document.removeEventListener("click", onClick);
    };
  }, [open]);

  // Cal.com tells us when the booking went through.
  useEffect(() => {
    if (step !== "book" || !SITE.calLink) return;
    let cancelled = false;
    import("@calcom/embed-react").then(async ({ getCalApi }) => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;
      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        layout: "month_view",
        cssVarsPerTheme: { light: { "cal-brand": "#2747f0" }, dark: { "cal-brand": "#2747f0" } },
      });
      cal("on", {
        action: "bookingSuccessfulV2",
        callback: () => {
          track("Call booked");
          setStep("done");
        },
      });
    });
    return () => {
      cancelled = true;
    };
  }, [step]);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!fields.name.trim()) next.name = "What should I call you?";
    if (!/^\S+@\S+\.\S+$/.test(fields.email.trim())) next.email = "I’ll need an email to send the invite to.";
    if (!fields.idea.trim()) next.idea = "One sentence is plenty.";
    setErrors(next);
    const first = (Object.keys(next) as (keyof Fields)[])[0];
    if (first) {
      formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`)?.focus();
      return;
    }
    const isBot = formRef.current?.querySelector<HTMLInputElement>('[name="botcheck"]')?.checked;
    const snapshot = JSON.stringify(fields);
    if (!isBot && snapshot !== lastSent.current) {
      lastSent.current = snapshot;
      sendLead(fields);
      track("Hire form sent");
    }
    setStep("book");
    dialogRef.current?.scrollTo({ top: 0 });
  };

  const mailto = `mailto:${SITE.email}?subject=${encodeURIComponent(`New project: ${fields.name.trim()}`)}&body=${encodeURIComponent(
    `Hi ${SITE.shortName},\n\n${summary(fields)}\n\n${fields.name.trim()}\n${fields.email.trim()}\n`,
  )}`;

  const wide = step === "book" && !!SITE.calLink;

  return (
    <dialog
      ref={dialogRef}
      // Recordings show clicks here but hide what people type about their project.
      data-clarity-mask="true"
      tabIndex={-1}
      aria-labelledby="project-title"
      onClick={(e) => e.target === dialogRef.current && close()}
      onClose={() => {
        if (step === "done") {
          setStep("details");
          setFields(EMPTY);
        }
      }}
      className={`project-modal m-auto max-h-[min(92dvh,920px)] w-[calc(100vw-16px)] overflow-y-auto overscroll-contain rounded-[32px] border border-white/80 bg-white/90 p-0 focus-visible:outline-none text-ink shadow-[0_40px_100px_-30px_rgba(0,0,0,0.45),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-2xl backdrop-saturate-[1.8] ${
        wide ? "max-w-[1000px]" : "max-w-[600px]"
      }`}
    >
      <div className="relative p-6 md:p-8">
        <button
          type="button"
          onClick={close}
          aria-label="Close"
          className="absolute top-5 right-5 flex size-10 items-center justify-center rounded-full bg-black/5 text-ink-soft transition-colors hover:bg-black/10 md:top-6 md:right-6"
        >
          <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6 6 18" />
          </svg>
        </button>

        {step !== "done" && (
          <ol className="flex items-center gap-2 pr-12 text-[12px] font-semibold" aria-label="Steps">
            {[
              ["details", "Your project"],
              ["book", SITE.calLink ? "Pick a time" : "Send it"],
            ].map(([id, label], i) => {
              const on = step === id;
              const past = step === "book" && id === "details";
              return (
                <li key={id} className="flex items-center gap-2" aria-current={on ? "step" : undefined}>
                  {i > 0 && <span aria-hidden="true" className="h-px w-6 bg-black/15" />}
                  <span
                    className={`flex size-6 items-center justify-center rounded-full text-[11px] ${
                      on ? "bg-accent text-white" : past ? "bg-[#34c759] text-white" : "bg-black/5 text-muted"
                    }`}
                  >
                    {past ? "✓" : i + 1}
                  </span>
                  <span className={on ? "text-ink" : "text-muted"}>{label}</span>
                </li>
              );
            })}
          </ol>
        )}

        {step === "details" && (
          <form ref={formRef} onSubmit={submit} noValidate className="mt-6">
            {/* Honeypot: people never see it, spam bots tick it. */}
            <input type="checkbox" name="botcheck" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />
            <p className="text-[12px] font-bold tracking-[0.14em] text-accent uppercase">
              {isCall && SITE.calLink ? "Free 15-minute call" : "Start a project"}
            </p>
            <h2 id="project-title" className="mt-2 font-display text-[clamp(26px,4vw,34px)] leading-[1.05] font-semibold tracking-[-0.03em]">
              Tell me what you’re building.
            </h2>
            <p className="mt-2 text-[15px] leading-relaxed text-muted">
              {SITE.calLink
                ? "A few details first, then you pick a time for a free 15-minute call. No pitch deck needed."
                : "A few details and I’ll reply with how I’d build it. No pitch deck needed."}
            </p>

            <div className="mt-7 space-y-5">
              <Chips
                label="What do you need?"
                options={PROJECT_FORM.needs}
                value={fields.need}
                onChange={(v) => set("need", v)}
              />
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" error={errors.name}>
                  {(p) => (
                    <input {...p} name="name" autoComplete="name" value={fields.name} onChange={(e) => set("name", e.target.value)} className={inputClass} />
                  )}
                </Field>
                <Field label="Email" error={errors.email}>
                  {(p) => (
                    <input
                      {...p}
                      name="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      value={fields.email}
                      onChange={(e) => set("email", e.target.value)}
                      className={inputClass}
                    />
                  )}
                </Field>
              </div>
              <Field label="What are you building?" error={errors.idea}>
                {(p) => (
                  <textarea
                    {...p}
                    name="idea"
                    rows={3}
                    placeholder="A booking app for my gym, so members can stop texting me."
                    value={fields.idea}
                    onChange={(e) => set("idea", e.target.value)}
                    className={`${inputClass} resize-none leading-relaxed`}
                  />
                )}
              </Field>
              <Chips
                label="Timeline"
                options={PROJECT_FORM.timelines.map((t) => ({ id: t, label: t }))}
                value={fields.timeline}
                onChange={(v) => set("timeline", v)}
              />
              <Chips
                label="Budget"
                options={PROJECT_FORM.budgets.map((b) => ({ id: b, label: b }))}
                value={fields.budget}
                onChange={(v) => set("budget", v)}
              />
            </div>

            <button
              type="submit"
              className="sheen mt-8 flex min-h-13 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-[16px] font-semibold text-white transition-[background-color,transform] hover:bg-accent-hover active:scale-[0.98]"
            >
              {SITE.calLink ? "Continue to pick a time" : "Continue"}
              <span aria-hidden="true">→</span>
            </button>
          </form>
        )}

        {step === "book" && (
          <div className="mt-6">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="text-[12px] font-bold tracking-[0.14em] text-accent uppercase">
                  {SITE.calLink ? "Free 15-minute call" : "Last step"}
                </p>
                <h2 id="project-title" className="mt-2 font-display text-[clamp(26px,4vw,34px)] leading-[1.05] font-semibold tracking-[-0.03em]">
                  {SITE.calLink ? "Pick a time that works for you." : "Send it my way."}
                </h2>
              </div>
              <button type="button" onClick={() => setStep("details")} className="text-[14px] font-semibold text-accent hover:underline">
                ← Edit details
              </button>
            </div>

            {SITE.calLink ? (
              <div className="mt-6 overflow-hidden rounded-[24px] border border-black/5 bg-white">
                <CalEmbed
                  namespace={CAL_NAMESPACE}
                  calLink={SITE.calLink}
                  className="min-h-[480px] w-full"
                  config={{
                    layout: "month_view",
                    theme: "light",
                    name: fields.name.trim(),
                    email: fields.email.trim(),
                    notes: summary(fields),
                  }}
                />
              </div>
            ) : (
              <div className="mt-6 rounded-[24px] border border-black/5 bg-white/80 p-5">
                <p className="text-[13px] font-semibold text-muted">Your note</p>
                <p className="mt-2 text-[15px] leading-relaxed whitespace-pre-line">{summary(fields)}</p>
                <a
                  href={mailto}
                  className="sheen mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-accent px-6 font-semibold text-white transition-[background-color,transform] hover:bg-accent-hover active:scale-[0.98]"
                >
                  Send it by email <span aria-hidden="true">→</span>
                </a>
                <p className="mt-3 text-center text-[13px] text-muted">It opens your email with all of this filled in.</p>
              </div>
            )}
          </div>
        )}

        {step === "done" && (
          <div className="py-6 text-center">
            <span className="pop mx-auto flex size-16 items-center justify-center rounded-full bg-[#34c759] text-white shadow-[0_16px_30px_-12px_rgba(52,199,89,0.7)]">
              <svg viewBox="0 0 24 24" className="size-8" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="m5 12 5 5 9-10" />
              </svg>
            </span>
            <h2 id="project-title" className="pop mt-5 font-display text-[32px] leading-tight font-semibold tracking-[-0.03em] [--d:120ms]">
              You’re booked, {fields.name.trim().split(" ")[0] || "friend"}.
            </h2>
            <p className="pop mx-auto mt-2 max-w-sm text-muted [--d:200ms]">
              The invite is on its way to {fields.email.trim() || "your inbox"}. I’ll read your note before we talk.
            </p>
            <button
              type="button"
              onClick={close}
              className="pop mt-7 rounded-full bg-ink px-6 py-3 font-semibold text-white transition-[background-color,transform] hover:bg-ink-soft active:scale-[0.97] [--d:280ms]"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </dialog>
  );
}
