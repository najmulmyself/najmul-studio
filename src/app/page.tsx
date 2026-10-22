import { ArrowLink, Button, Container, SectionLabel, SectionTitle } from "@/components/ui";
import {
  APPS,
  FAQ,
  FEATURED_APP,
  SERVICES,
  SITE,
  STATS,
  STEPS,
  TESTIMONIALS,
} from "@/data/site";
import Image from "next/image";

// Numbered sections; testimonials only count once there are real quotes.
const SECTIONS = [
  "services",
  "work",
  "process",
  ...(TESTIMONIALS.length > 0 ? ["kind-words"] : []),
  "faq",
  "contact",
];
const num = (id: string) => String(SECTIONS.indexOf(id) + 1).padStart(2, "0");

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Container>
          <Hero />
          <Stats />
          <Services />
          <Work />
          <Hook />
          <Process />
          {TESTIMONIALS.length > 0 && <KindWords />}
          <Faq />
        </Container>
        <Contact />
      </main>
    </>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-10 border-b border-line bg-paper/70 backdrop-blur-lg backdrop-saturate-150">
      <Container className="flex items-center justify-between gap-3 py-3.5">
        <a href="#top" className="font-semibold">
          {SITE.name}
        </a>
        <nav aria-label="Main" className="flex items-center gap-6 text-[15px]">
          {[
            ["Services", "#services"],
            ["Work", "#work"],
            ["Process", "#process"],
            ["FAQ", "#faq"],
          ].map(([label, href]) => (
            <a key={href} href={href} className="hidden text-ink-soft hover:text-ink sm:inline">
              {label}
            </a>
          ))}
          <a
            href="#contact"
            className="inline-flex min-h-10 items-center rounded-[10px] bg-ink px-4 font-medium text-white hover:opacity-85"
          >
            Hire me
          </a>
        </nav>
      </Container>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="flex flex-wrap items-end gap-14 pt-16 pb-20 sm:pt-24 sm:pb-22">
      <div className="min-w-0 flex-[999_1_480px]">
        <p className="mb-7 font-mono text-[13px] text-ink-soft">
          <span className="mr-2 inline-block size-2 rounded-full bg-[#1f9d55]" aria-hidden="true" />
          {SITE.status} · {SITE.location}
        </p>
        <h1 className="text-[clamp(42px,6.2vw,80px)] leading-none font-semibold tracking-[-0.045em]">
          You bring the idea.
          <br />
          I’ll ship it to the App Store.
        </h1>
        <p className="mt-7 max-w-[540px] text-[19px] leading-relaxed text-ink-soft">
          Indie iOS developer and AI automation builder. I’ve shipped an app to 100k+ people, and I
          build the robots that do your boring work.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-6">
          <Button href="#contact">Tell me your idea</Button>
          <ArrowLink href="#work" tone="underline">
            See apps I shipped
          </ArrowLink>
        </div>
        <p className="mt-4 text-sm text-muted">Free 20-minute call. No pitch deck needed.</p>
      </div>
      <Image
        src={SITE.photo}
        alt={SITE.name}
        width={220}
        height={280}
        priority
        sizes="220px"
        className="h-[280px] w-[220px] flex-none rounded-md object-cover object-top grayscale-[0.15]"
      />
    </section>
  );
}

function Stats() {
  return (
    <dl className="grid grid-cols-2 gap-6 border-y border-line py-7 md:grid-cols-4">
      {STATS.map((stat) => (
        <div key={stat.label} className="flex flex-col">
          <dt className="text-sm text-muted">{stat.label}</dt>
          <dd className="order-first text-[34px] font-semibold tracking-[-0.03em]">{stat.value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Services() {
  return (
    <section id="services" className="pt-28">
      <SectionLabel>{num("services")} — Services</SectionLabel>
      <SectionTitle className="max-w-[720px]">Pick your problem. I’ll pick up the keyboard.</SectionTitle>
      <div className="mt-12 grid gap-y-10 border-t border-ink md:grid-cols-3">
        {SERVICES.map((service, i) => (
          <article key={service.title} className="pt-7 md:pr-7">
            <h3 className="text-[21px] font-semibold">{service.title}</h3>
            <p className="mt-3 text-[17px] leading-relaxed text-body">
              {service.body}
              {i === 1 && SITE.automationExample && ` ${SITE.automationExample}`}
            </p>
            <p className="mt-4.5">
              <ArrowLink href="#contact">{service.cta}</ArrowLink>
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="pt-32">
      <SectionLabel>{num("work")} — Work</SectionLabel>
      <SectionTitle>Apps that made it out of my laptop.</SectionTitle>

      <article className="mt-12 flex flex-wrap items-center gap-10 border-t border-ink py-8">
        <div className="min-w-0 flex-[999_1_420px]">
          <p className="font-mono text-[13px] text-muted">{FEATURED_APP.tag}</p>
          <h3 className="mt-2 text-[34px] font-semibold tracking-[-0.03em]">{FEATURED_APP.name}</h3>
          <p className="mt-3 max-w-[520px] text-[17px] leading-relaxed text-body">{FEATURED_APP.summary}</p>
          <dl className="mt-5 flex gap-10">
            {FEATURED_APP.stats.map((stat) => (
              <div key={stat.label} className="flex flex-col">
                <dt className="text-sm text-muted">{stat.label}</dt>
                <dd className="order-first text-[28px] font-semibold">{stat.value}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-5">
            <ArrowLink href={FEATURED_APP.href}>{FEATURED_APP.linkLabel}</ArrowLink>
          </p>
        </div>
        {FEATURED_APP.screenshot && (
          <Image
            src={FEATURED_APP.screenshot}
            alt={`${FEATURED_APP.name} screenshot`}
            width={200}
            height={433}
            className="mx-auto h-auto w-[200px] flex-none rounded-[28px] border border-line"
          />
        )}
      </article>

      <ul>
        {APPS.map((app) => (
          <li key={app.name}>
            <a
              href={app.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-wrap items-baseline gap-x-6 gap-y-2 border-t border-line py-5.5 last:border-b"
            >
              <span className="flex-[0_0_200px] text-[21px] font-semibold group-hover:text-link">{app.name}</span>
              <span className="flex-[1_1_320px] text-[17px] text-body">{app.summary}</span>
              <span className="font-mono text-[13px] text-muted">
                {app.platforms} <span aria-hidden="true">→</span>
              </span>
            </a>
          </li>
        ))}
      </ul>
      <p className="mt-7 text-[17px]">
        Want your app on this list? <ArrowLink href="#contact">Let’s talk</ArrowLink>
      </p>
    </section>
  );
}

function Hook() {
  return (
    <section className="pt-32">
      <p className="max-w-[860px] text-[clamp(28px,4vw,48px)] leading-[1.12] font-medium tracking-[-0.03em]">
        Your app idea has been sitting in your Notes app since 2023.{" "}
        <span className="text-faint">
          Tell me about it in one sentence, and I’ll tell you how I’d build it. Free.
        </span>
      </p>
      <div className="mt-8">
        <Button href="#contact">Get a free build plan</Button>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section id="process" className="pt-32">
      <SectionLabel>{num("process")} — Process</SectionLabel>
      <SectionTitle>From “hey” to the App Store in three steps.</SectionTitle>
      <ol className="mt-12 grid gap-8 border-t border-ink md:grid-cols-3">
        {STEPS.map((step, i) => (
          <li key={step.title} className="pt-6">
            <p className="font-mono text-[13px] text-muted">Step {i + 1}</p>
            <h3 className="mt-2 text-[21px] font-semibold">{step.title}</h3>
            <p className="mt-2 text-[17px] leading-relaxed text-body">{step.body}</p>
          </li>
        ))}
      </ol>
      <p className="mt-8 text-[17px]">
        <ArrowLink href={SITE.bookingUrl || "#contact"} tone="underline">
          Book a free 20-minute call
        </ArrowLink>
      </p>
    </section>
  );
}

function KindWords() {
  return (
    <section id="kind-words" className="pt-32">
      <SectionLabel>{num("kind-words")} — Kind words</SectionLabel>
      <div className="mt-8 grid gap-12 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <figure key={t.name}>
            <blockquote className="text-[22px] leading-snug tracking-[-0.01em]">“{t.quote}”</blockquote>
            <figcaption className="mt-3.5 text-[15px] text-muted">
              {t.name}, {t.role}
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section id="faq" className="flex flex-wrap gap-10 pt-32">
      <div className="flex-[1_1_260px]">
        <SectionLabel>{num("faq")} — FAQ</SectionLabel>
        <h2 className="mt-3.5 text-[clamp(28px,3.4vw,40px)] leading-[1.1] font-semibold tracking-[-0.03em]">
          Questions clients ask before saying yes.
        </h2>
        <p className="mt-4 text-[17px] text-body">
          Didn’t see yours? <ArrowLink href="#contact">Just ask</ArrowLink>
        </p>
      </div>
      <div className="min-w-0 flex-[999_1_520px] border-t border-ink">
        {FAQ.map((item) => (
          <details key={item.q} className="group border-b border-line py-5">
            <summary className="flex cursor-pointer items-center justify-between gap-4 text-[19px] font-semibold">
              {item.q}
              <span
                aria-hidden="true"
                className="font-mono text-xl text-muted transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-2.5 text-[17px] leading-relaxed text-body">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mt-32 bg-ink text-paper">
      <Container className="pt-28 pb-14">
        <SectionLabel dark>{num("contact")} — Contact · Still scrolling? That’s a sign.</SectionLabel>
        <h2 className="mt-4.5 text-[clamp(44px,7vw,96px)] leading-[0.98] font-semibold tracking-[-0.05em]">
          Got an idea?
          <br />
          Let’s make it ship.
        </h2>
        <div className="mt-10 flex flex-wrap items-center gap-6">
          <Button href={`mailto:${SITE.email}`} inverted>
            {SITE.email}
          </Button>
          {SITE.bookingUrl && (
            <ArrowLink href={SITE.bookingUrl} tone="night">
              Book a call
            </ArrowLink>
          )}
          <ArrowLink href={SITE.resume} tone="night">
            Download my résumé
          </ArrowLink>
        </div>
        <p className="mt-5 text-[15px] text-night-muted">
          {SITE.location}
          {SITE.replyTime && ` · ${SITE.replyTime}`}
        </p>
        <footer className="mt-24 flex flex-wrap justify-between gap-3 border-t border-night-line pt-6 text-sm text-night-muted">
          <span>© {new Date().getFullYear()} {SITE.name} · Built by a human, polished by robots.</span>
          <span className="flex gap-3">
            <a href={SITE.github} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              GitHub
            </a>
            <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              LinkedIn
            </a>
            <a href={SITE.resume} target="_blank" rel="noopener noreferrer" className="hover:text-paper">
              Résumé
            </a>
          </span>
        </footer>
      </Container>
    </section>
  );
}
