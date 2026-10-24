import { AppShowcase } from "@/components/app-showcase";
import { DynamicIsland } from "@/components/dynamic-island";
import { FaqChat } from "@/components/faq-chat";
import { IdeaNote } from "@/components/idea-note";
import { HeroPhone } from "@/components/hero-phone";
import { ProcessSteps } from "@/components/process-steps";
import { ProjectModal } from "@/components/project-modal";
import { RevealOnScroll } from "@/components/reveal";
import { ServiceCards } from "@/components/services";
import { StatWidgets } from "@/components/stat-widgets";
import { ArrowUpRight, Button, Container, Eyebrow, SocialIcons, TextLink, TwoTone } from "@/components/ui";
import { FAQ, SITE, TESTIMONIALS } from "@/data/site";
import Image from "next/image";

export default function Home() {
  return (
    <div className="relative overflow-x-clip">
      <Frame />
      <DynamicIsland />
      <ProjectModal />
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
      <RevealOnScroll />
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

function Hero() {
  return (
    <section id="top" className="relative">
      <Container className="flex flex-col items-center gap-16 pt-32 pb-20 md:flex-row md:justify-between md:pt-40 md:pb-28">
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
          <p className="mt-7 text-[19px] leading-relaxed text-pretty text-ink-soft">
            I build iOS apps people actually download (one passed 100k) and AI automations that do
            your boring work.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
            <Button href="#contact" project="">
              Tell me your idea <ArrowUpRight />
            </Button>
            <TextLink href="#work">See my apps</TextLink>
          </div>
          <p className="mt-6 flex items-center gap-2 text-sm text-muted">
            <span className="size-2 rounded-full bg-[#1f9d55]" aria-hidden="true" />
            {SITE.status} · Free 15-minute call · No pitch deck needed
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
      <Container className="py-10 md:py-12">
        <StatWidgets />
      </Container>
    </Section>
  );
}

function About() {
  return (
    <Section>
      <Container className="reveal py-24 md:py-28">
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
      <Container className="reveal py-24 md:py-28">
        <Eyebrow>Services</Eyebrow>
        <TwoTone
          quiet="Pick your problem."
          loud="I’ll pick up the keyboard."
          className="mt-4 text-[clamp(36px,4.6vw,56px)]"
        />
        <ServiceCards />
      </Container>
    </Section>
  );
}

function Work() {
  return (
    <section id="work" data-island-dark className="grain relative z-10 bg-night text-white">
      <Container className="py-24 md:py-28">
        <div className="reveal text-center">
          <h2 className="font-display text-[clamp(36px,4.6vw,56px)] font-semibold tracking-[-0.035em] text-balance">
            Apps that made it out of my laptop.
          </h2>
          <p className="mt-3 text-night-muted">Real apps, on real stores. Go on, tap one.</p>
        </div>
        <AppShowcase />
        <p className="mt-12 text-center text-[17px] text-night-muted">
          Want your app on this list?{" "}
          <a href="#contact" data-start-project="" className="font-semibold text-white underline-offset-4 hover:underline">
            Let’s talk →
          </a>
        </p>
      </Container>
    </section>
  );
}

function Hook() {
  return (
    <Section className="border-t-0">
      <Container className="reveal py-24 text-center md:py-32">
        <p className="mx-auto max-w-[820px] text-balance font-display text-[clamp(30px,4.2vw,50px)] leading-[1.08] font-semibold tracking-[-0.035em]">
          Your app idea has been sitting in your Notes app since 2023.{" "}
          <span className="font-normal text-faint">Let’s get it out.</span>
        </p>
        <p className="mt-5 text-[18px] text-ink-soft">
          Tell me about it in one sentence. I’ll tell you how I’d build it, for free.
        </p>
        <IdeaNote />
      </Container>
    </Section>
  );
}

function Process() {
  return (
    <Section id="process">
      <Container className="reveal py-24 md:py-28">
        <div className="text-center">
          <h2 className="font-display text-[clamp(32px,4vw,48px)] leading-[1.05] font-semibold tracking-[-0.035em]">
            From “hey” to the App&nbsp;Store
            <br className="hidden md:block" /> in three steps.
          </h2>
          <p className="mt-3 text-muted">Tap a step, or just sit back and watch.</p>
        </div>
        <ProcessSteps>
          <Button href="#contact" variant="ink" project="call">
            Book a free 15-minute call
          </Button>
        </ProcessSteps>
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
  // The chat only reveals answers on tap, so search engines get them all here.
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return (
    <Section id="faq">
      <Container className="reveal py-24 text-center md:py-28">
        <h2 className="font-display text-[clamp(32px,4vw,48px)] font-semibold tracking-[-0.035em]">Still got questions?</h2>
        <p className="mt-3 text-muted">Tap one. I’ll answer like a normal person.</p>
        <FaqChat />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
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
      <Container className="reveal relative py-24 text-center md:py-32">
        <div aria-hidden="true" className="absolute top-1/2 left-1/2 -z-10 h-72 w-[min(640px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/15 blur-3xl" />
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
            href="#contact"
            data-start-project="call"
            className="inline-block -rotate-2 rounded-full border-2 border-ink bg-ink px-12 py-6 font-display text-[clamp(36px,5vw,60px)] leading-none font-semibold tracking-[-0.03em] text-white shadow-[8px_8px_0_#2747f0] transition-transform hover:-translate-y-1 hover:rotate-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            Let’s talk
          </a>
        </div>
        <p className="mt-8 font-hand text-2xl text-muted">psst. a few details, then a call with a real human.</p>

        <div className="glass mx-auto mt-16 flex max-w-[720px] flex-col items-center justify-between gap-4 rounded-full px-6 py-4 sm:flex-row max-sm:rounded-[28px]">
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
                className="sheen flex size-11 items-center justify-center rounded-full bg-ink text-white transition-[background-color,transform] hover:bg-accent active:scale-95"
              >
                {SocialIcons[s.name]}
              </a>
            ))}
          </div>
        </div>
        <p className="mt-5 text-sm text-muted">
          {SITE.location}
          {SITE.replyTime && ` · ${SITE.replyTime}`}
        </p>
      </Container>
      <footer className="border-t border-line">
        <Container className="flex flex-col justify-between gap-2 py-6 text-sm text-muted sm:flex-row">
          <span>
            © {new Date().getFullYear()} {SITE.name}
          </span>
        </Container>
      </footer>
    </Section>
  );
}
