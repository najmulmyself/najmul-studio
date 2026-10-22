import type { ReactNode } from "react";

function isExternal(href: string) {
  return /^https?:\/\//.test(href);
}

function linkProps(href: string) {
  return isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {};
}

export function Container({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`mx-auto w-full max-w-[1080px] px-6 ${className}`}>{children}</div>;
}

export function SectionLabel({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return (
    <p className={`font-mono text-[13px] ${dark ? "text-night-muted" : "text-muted"}`}>{children}</p>
  );
}

export function SectionTitle({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={`mt-3.5 text-[clamp(32px,4.2vw,52px)] font-semibold leading-[1.05] tracking-[-0.035em] ${className}`}
    >
      {children}
    </h2>
  );
}

// The one solid button a section gets.
export function Button({
  href,
  children,
  inverted = false,
}: {
  href: string;
  children: ReactNode;
  inverted?: boolean;
}) {
  return (
    <a
      href={href}
      {...linkProps(href)}
      className={`inline-flex min-h-[52px] items-center rounded-[10px] px-6 font-medium transition-opacity hover:opacity-85 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link ${
        inverted ? "bg-paper text-ink" : "bg-ink text-white"
      }`}
    >
      {children}
    </a>
  );
}

// Every other CTA: a quiet text link with an arrow.
export function ArrowLink({
  href,
  children,
  tone = "accent",
}: {
  href: string;
  children: ReactNode;
  tone?: "accent" | "underline" | "night";
}) {
  const styles = {
    accent: "text-link hover:underline underline-offset-4",
    underline: "border-b border-ink pb-0.5 hover:text-link hover:border-link",
    night: "border-b border-paper pb-0.5 text-paper hover:opacity-80",
  }[tone];
  return (
    <a href={href} {...linkProps(href)} className={`font-medium ${styles}`}>
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}
