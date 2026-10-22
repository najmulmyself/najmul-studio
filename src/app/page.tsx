import { HeroPhone } from "@/components/hero-phone";
import { ArrowUpRight, Button, Container, Eyebrow, SocialIcons, TextLink, TwoTone } from "@/components/ui";
import { APPS, FAQ, SERVICES, SITE, STATS, STEPS, TESTIMONIALS, type AppCard } from "@/data/site";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <Frame />
      <Nav />
      <main>
        <Hero />
        <Stats />
        <About />
        <Services />
        <Work />
        <Hook />
        <Process />
        {TESTIMONIALS.length > 0 && <KindWords />}
        <Faq />
        <Contact />
      </main>
    </div>
  );
}

// Thin vertical lines at the content edges, like a page frame.
function Frame() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 hidden md:block">
      <div className="mx-auto h-full max-w-[1120px] border-x border-line" />
    </div>
  );
}

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`relative border-t border-line ${className}`}>
      {children}
    </section>
  );
}

function Nav() {
  const links = [
    ["Services", "#services"],
    ["Work", "#work"],
    ["Process", "#process"],
    ["FAQ", "#faq"],
  ];
  return (
    <header className="sticky top-0 z-20 border-b border-line bg-paper/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-xl font-bold tracking-tight">
          najmul<span className="text-accent">.</span>
        </a>
        <nav aria-label="Main" className="flex items-center gap-7 text-[15px] font-medium">
          {links.map(([label, href]) => (
            <a key={href} href={href} className="hidden text-ink-soft hover:text-ink md:inline">
              {label}
            </a>
          ))}
          <Button href="#contact" className="min-h-10 rounded-lg px-4 text-[15px]">
            Hire me
          </Button>
        </nav>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="relative">
      <Container className="flex flex-col items-center gap-16 py-20 md:flex-row md:justify-between md:py-28">
        <div className="max-w-[560px]">
          <Eyebrow>
            Indie iOS development <span className="mx-1.5 text-faint">·</span> AI automation
          </Eyebrow>
          <h1 className="mt-6 font-display text-[clamp(44px,6vw,72px)] leading-[0.98] tracking-[-0.045em]">
            <span className="font-normal text-faint">You bring the</span>{" "}
            <span className="font-semibold">idea.</span>{" "}
            <span className="font-normal text-faint">I’ll</span>{" "}
            <span className="font-semibold">ship&nbsp;it</span>{" "}
            <span className="font-normal text-faint">to the</span>{" "}
            <span className="font-semibold">App&nbsp;Store.</span>
          </h1>
          <p className="mt-7 text-[19px] leading-relaxed text-ink-soft">
            I build iOS apps people actually download (one passed 100k) and AI automations that do
            your boring work.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href="#contact">
              Tell me your idea <ArrowUpRight />
            </Button>
            <TextLink href="#work">See my apps</TextLink>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <span className="size-2 rounded-full bg-[#1f9d55]" aria-hidden="true" />
            {SITE.status} · Free 20-minute call · No pitch deck needed
          </p>
        </div>
        <HeroPhone />
      </Container>
      <div className="flex justify-center pb-10" aria-hidden="true">
        <span className="flex h-9 w-6 justify-center rounded-full border-2 border-ink/25 pt-1.5">
          <span className="scroll-cue size-1.5 rounded-full bg-ink/50" />
        </span>
      </div>
    </section>
  );
}

function Stats() {
  return (
    <Section>
      <div className="mx-auto max-w-[1120px]">
        <dl className="grid grid-cols-2 md:grid-cols-4">
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className={`flex flex-col px-6 py-8 md:px-10 ${i % 2 === 1 ? "border-l border-line" : ""} ${
                i === 2 ? "border-t border-line md:border-t-0 md:border-l" : ""
              } ${i === 3 ? "border-t border-line md:border-t-0" : ""}`}
            >
              <dt className="text-sm text-muted">{stat.label}</dt>
              <dd className="order-first font-display text-[38px] font-semibold tracking-[-0.03em]">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}

function About() {
  return (
    <Section>
      <Container className="py-24 md:py-28">
        <TwoTone quiet="Studied geography." loud="Ended up mapping apps." className="text-[clamp(36px,4.6vw,56px)]" />
        <div className="mt-16 grid items-start gap-14 md:grid-cols-[minmax(0,380px)_1fr] md:gap-20">
          <figure>
            <div className="relative">
              <span className="absolute -top-4 left-5 z-10 -rotate-3 border-2 border-ink bg-white px-3 py-1 font-display text-sm font-bold shadow-[3px_3px_0_#1a1a1a]">
                made in Dhaka
              </span>
              <Image
                src={SITE.photo}
                alt={SITE.name}
                width={380}
                height={460}
                sizes="(min-width: 768px) 380px, 100vw"
                className="aspect-[38/46] w-full border-2 border-ink object-cover object-top shadow-[10px_10px_0_#1a1a1a]"
              />
            </div>
            <figcaption className="mt-7">
              <span className="block font-display text-lg font-bold">{SITE.name}</span>
              <span className="text-muted">Indie iOS developer → AI automation</span>
            </figcaption>
          </figure>
          <div className="max-w-[520px] space-y-5 text-[18px] leading-relaxed text-ink-soft md:pt-6">
            <p className="font-semibold text-ink">
              I’m an indie developer who likes the last 10% best: the part where an app actually ships.
            </p>
            <p>
              For 3+ years I’ve taken apps from first commit to the App Store and Play Store: a fintech
              app at Gold Kinen, a government VAT system, and Dream Kit 25, a side project I built alone
              that crossed 100k downloads.
            </p>
            <p className="font-semibold text-ink">Now I’m going all-in on native iOS.</p>
            <p>
              And building AI automations on the side, because nobody should spend their week copying
              data between spreadsheets.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Services() {
  return (
    <Section id="services">
      <Container className="py-24 md:py-28">
        <Eyebrow>Services</Eyebrow>
        <TwoTone
          quiet="Pick your problem."
          loud="I’ll pick up the keyboard."
          className="mt-4 text-[clamp(36px,4.6vw,56px)]"
        />
        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {SERVICES.map((service, i) => (
            <article key={service.title} className="flex flex-col rounded-3xl bg-chip p-7">
              <span className="font-display text-sm font-semibold text-accent">0{i + 1}</span>
              <h3 className="mt-3 font-display text-[23px] leading-tight font-semibold tracking-[-0.02em]">
                {service.title}
              </h3>
              <p className="mt-3 flex-1 leading-relaxed text-ink-soft">
                {service.body}
                {i === 1 && SITE.automationExample && ` ${SITE.automationExample}`}
              </p>
              <TextLink href="#contact" className="mt-6">
                {service.cta}
              </TextLink>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Work() {
  return (
    <section id="work" className="grain relative z-10 bg-night text-white">
      <Container className="py-24 md:py-28">
        <div className="text-center">
          <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-semibold tracking-[-0.035em]">
            Apps that made it out of my laptop.
          </h2>
          <p className="mt-3 text-night-muted">Real apps, on real stores, used by real people.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {APPS.map((app) => (
            <AppCardView key={app.name} app={app} />
          ))}
        </div>
        <p className="mt-12 text-center text-[17px] text-night-muted">
          Want your app on this list?{" "}
          <a href="#contact" className="font-semibold text-white underline-offset-4 hover:underline">
            Let’s talk →
          </a>
        </p>
      </Container>
    </section>
  );
}

function AppCardView({ app }: { app: AppCard }) {
  const initials = app.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <article className="flex flex-col rounded-3xl border border-night-line bg-night-card p-6 md:p-7">
      <div className="flex items-start gap-4">
        {app.icon ? (
          <Image src={app.icon} alt="" width={56} height={56} className="size-14 rounded-2xl" />
        ) : (
          <span
            aria-hidden="true"
            className="flex size-14 shrink-0 items-center justify-center rounded-2xl font-display text-lg font-bold"
            style={{ background: app.color, color: app.onColor }}
          >
            {initials}
          </span>
        )}
        <div className="min-w-0">
          <h3 className="font-display text-2xl font-semibold tracking-[-0.02em]">{app.name}</h3>
          <p className="mt-1 text-[15px] leading-snug text-night-muted">{app.tagline}</p>
        </div>
      </div>
      <p className="mt-5 text-[13px] text-night-muted/80">{app.stack}</p>
      <ul className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-semibold tracking-wider uppercase">
        {app.platforms.map((p) => (
          <li
            key={p}
            className={`rounded-md px-2 py-1 ${p === "iOS" ? "bg-[#2a2440] text-[#c4b5fd]" : "bg-[#16301f] text-[#86efac]"}`}
          >
            {p}
          </li>
        ))}
        {app.tags.map((t) => (
          <li key={t} className="rounded-md bg-white/8 px-2 py-1 text-night-muted">
            {t}
          </li>
        ))}
      </ul>
      <dl className="mt-5 grid grid-cols-3 gap-2">
        {app.stats.map((s) => (
          <div key={s.label} className="flex flex-col rounded-2xl border border-night-line px-2 py-3.5 text-center">
            <dt className="text-[11px] text-night-muted">{s.label}</dt>
            <dd className="order-first font-display text-lg font-semibold" style={{ color: app.color }}>
              {s.value}
            </dd>
          </div>
        ))}
      </dl>
      <a
        href={app.href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl font-semibold transition-opacity hover:opacity-90"
        style={{ background: app.color, color: app.onColor }}
      >
        Open on {app.store} <ArrowUpRight />
      </a>
    </article>
  );
}

function Hook() {
  return (
    <Section className="border-t-0">
      <Container className="py-24 text-center md:py-32">
        <p className="mx-auto max-w-[820px] font-display text-[clamp(30px,4.2vw,50px)] leading-[1.08] font-semibold tracking-[-0.035em]">
          Your app idea has been sitting in your Notes app since 2023.{" "}
          <span className="font-normal text-faint">Let’s get it out.</span>
        </p>
        <p className="mt-5 text-[18px] text-ink-soft">
          Tell me about it in one sentence. I’ll tell you how I’d build it, for free.
        </p>
        <Button href="#contact" variant="ink" className="mt-9">
          Get a free build plan
        </Button>
      </Container>
    </Section>
  );
}

function Process() {
  return (
    <Section id="process">
      <Container className="py-24 md:py-28">
        <div className="text-center">
          <h2 className="font-display text-[clamp(32px,4vw,48px)] leading-[1.05] font-semibold tracking-[-0.035em]">
            From “hey” to the App&nbsp;Store
            <br className="hidden md:block" /> in three steps.
          </h2>
          <p className="mt-3 text-muted">No fluff, no surprise invoices.</p>
        </div>
        <ol className="mt-14 grid gap-4 md:grid-cols-3">
          {STEPS.map((step, i) => (
            <li key={step.title} className="rounded-3xl border border-line bg-white p-7">
              <span className="font-display text-[56px] leading-none font-semibold text-line">{i + 1}</span>
              <p className="mt-4 text-[13px] font-semibold text-accent">Step {i + 1}</p>
              <h3 className="mt-1 font-display text-[22px] font-semibold tracking-[-0.02em]">{step.title}</h3>
              <p className="mt-2 leading-relaxed text-ink-soft">{step.body}</p>
            </li>
          ))}
        </ol>
        <div className="mt-12 text-center">
          <Button href={SITE.bookingUrl || "#contact"} variant="ink">
            Book a free 20-minute call
          </Button>
        </div>
      </Container>
    </Section>
  );
}

function KindWords() {
  return (
    <Section id="kind-words">
      <Container className="py-24 md:py-28">
        <Eyebrow>Kind words</Eyebrow>
        <div className="mt-10 grid gap-10 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <figure key={t.name}>
              <blockquote className="font-display text-[24px] leading-snug tracking-[-0.01em]">“{t.quote}”</blockquote>
              <figcaption className="mt-4 text-muted">
                {t.name}, {t.role}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}

function Faq() {
  return (
    <Section id="faq">
      <Container className="py-24 md:py-28">
        <h2 className="text-center font-display text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.035em]">
          Still got questions?
        </h2>
        <div className="mx-auto mt-12 max-w-[680px] space-y-2.5">
          {FAQ.map((item) => (
            <details key={item.q} className="group rounded-2xl bg-chip px-6 py-5">
              <summary className="flex cursor-pointer items-center gap-4 font-semibold">
                <span
                  aria-hidden="true"
                  className="text-xl leading-none text-accent transition-transform group-open:rotate-45"
                >
                  +
                </span>
                {item.q}
              </summary>
              <p className="mt-3 pl-8 leading-relaxed text-ink-soft">{item.a}</p>
            </details>
          ))}
        </div>
        <p className="mt-8 text-center text-ink-soft">
          Didn’t see yours? <TextLink href="#contact">Just ask</TextLink>
        </p>
      </Container>
    </Section>
  );
}

function Contact() {
  const socials = [
    { name: "GitHub", href: SITE.github },
    { name: "LinkedIn", href: SITE.linkedin },
    { name: "X", href: SITE.x },
  ] as const;
  return (
    <Section id="contact">
      <Container className="py-24 text-center md:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white py-1 pr-3.5 pl-1 text-sm font-semibold shadow-sm">
          <Image src={SITE.photo} alt="" width={28} height={28} className="size-7 rounded-full object-cover object-top" />
          {SITE.shortName}
        </span>
        <p className="mt-6 -rotate-2 font-hand text-[clamp(30px,4vw,44px)] leading-tight text-ink-soft">
          Have an app in mind? Or a boring task?
        </p>
        <h2 className="mt-2 font-display text-[clamp(40px,6vw,72px)] leading-[1] font-semibold tracking-[-0.045em]">
          Let’s build it together.
        </h2>

        <div className="relative mt-14 inline-block">
          <svg
            aria-hidden="true"
            viewBox="0 0 120 90"
            className="absolute top-1/2 -left-28 hidden h-20 w-28 -translate-y-1/2 text-ink md:block"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          >
            <path d="M6 14c20 2 46 10 58 30 8 14 2 30-10 26-12-4-4-22 12-26 16-4 34 4 44 14" />
            <path d="M101 50l9 9-12 3" />
          </svg>
          <a
            href={`mailto:${SITE.email}`}
            className="inline-block -rotate-2 rounded-full border-2 border-ink bg-ink px-12 py-6 font-display text-[clamp(36px,5vw,60px)] leading-none font-semibold tracking-[-0.03em] text-white shadow-[8px_8px_0_#2747f0] transition-transform hover:-translate-y-1 hover:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Let’s talk
          </a>
        </div>
        <p className="mt-8 font-hand text-2xl text-muted">psst. it’s just an email to a real human.</p>

        <div className="mx-auto mt-16 flex max-w-[720px] flex-col items-center justify-between gap-4 rounded-3xl bg-chip px-6 py-5 sm:flex-row">
          <a
            href={`mailto:${SITE.email}`}
            className="flex min-w-0 items-center gap-3 text-[17px] font-medium hover:text-accent"
          >
            <svg viewBox="0 0 24 24" className="size-5 shrink-0" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m22 2-7 20-4-9-9-4 20-7Z" />
              <path d="M22 2 11 13" />
            </svg>
            <span className="truncate">{SITE.email}</span>
          </a>
          <div className="flex gap-2">
            {socials.map((s) => (
              <a
                key={s.name}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex size-11 items-center justify-center rounded-xl bg-ink text-white transition-colors hover:bg-accent"
              >
                {SocialIcons[s.name]}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-5 text-sm text-muted">
          {SITE.location}
          {SITE.replyTime && ` · ${SITE.replyTime}`}
          {SITE.bookingUrl && (
            <>
              {" · "}
              <TextLink href={SITE.bookingUrl}>Book a call</TextLink>
            </>
          )}
          {" · "}
          <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="underline-offset-4 hover:underline">
            Résumé (PDF)
          </a>
        </p>
      </Container>
      <footer className="border-t border-line">
        <Container className="flex flex-col justify-between gap-2 py-6 text-sm text-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
          <span>Built by a human, polished by robots.</span>
        </Container>
      </footer>
    </Section>
  );
}
