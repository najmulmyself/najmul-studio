// Everything the home page says lives here. Leave an optional field empty
// ("" or []) and the part of the page that uses it stays hidden.

export type App = {
  name: string;
  summary: string;
  platforms: string;
  href: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

export const SITE = {
  name: "Najmul Huda",
  email: "najmul.myself@gmail.com",
  status: "Taking new projects",
  location: "Dhaka, GMT+6",
  resume: "/Najmul_Huda_Resume.pdf",
  photo: "/me.jpg",
  github: "https://github.com/najmulmyself",
  linkedin: "https://www.linkedin.com/in/najmulmyself/",

  // Optional. Fill these in when you have them.
  bookingUrl: "", // e.g. a Calendly link
  replyTime: "", // e.g. "Usually replies within a day"
  quoteTime: "", // e.g. "3 days", used in "a fixed quote within …"
  startingPrice: "", // e.g. "$2,000"
  automationExample: "", // one real example of an automation you built
};

export const STATS = [
  { value: "100k+", label: "downloads on one solo app" },
  { value: "3+ years", label: "shipping to the stores" },
  { value: "80%+", label: "test coverage on payment code" },
  { value: "1 dev", label: "no meetings about meetings" },
];

export const SERVICES = [
  {
    title: "An iOS app people actually download",
    body: "From napkin sketch to App Store: design, build, release and crash monitoring. One I built solo passed 100k downloads.",
    cta: "Start an app",
  },
  {
    title: "Robots for your boring work",
    body: "Stop paying humans to copy-paste. AI automations that read emails, fill sheets, write reports and tell you when they’re done.",
    cta: "Automate something",
  },
  {
    title: "An extra pair of iOS hands",
    body: "Contract work or a remote role on your team. Clean Architecture, tests and App Store releases: I can do the grown-up stuff too.",
    cta: "Hire me for your team",
  },
];

export const FEATURED_APP = {
  name: "Dream Kit 25",
  tag: "Indie · built solo",
  summary:
    "A kit app for football gamers that grew to 100k+ downloads and pays for itself with ads. Idea, code, monetization and launch: all me.",
  stats: [
    { value: "100k+", label: "downloads" },
    { value: "$120/mo", label: "ad revenue" },
  ],
  href: "https://play.google.com/store/apps/details?id=com.sakib.dreamkit",
  linkLabel: "See it on Google Play",
  screenshot: "", // e.g. "/dream-kit.png"; hidden until added
};

export const APPS: App[] = [
  {
    name: "Gold Kinen",
    summary: "Fintech app rebuilt on Clean Architecture. Auto-Save payments at 80%+ test coverage.",
    platforms: "iOS · Android",
    href: "https://play.google.com/store/apps/details?id=com.goldkinen.android",
  },
  {
    name: "Skill Finesse",
    summary: "A learning app on both stores, with reminders that keep students coming back.",
    platforms: "iOS · Android",
    href: "https://apps.apple.com/us/app/skill-finesse/id6477940594",
  },
  {
    name: "Stayverz",
    summary: "Hotel booking with real-time availability, secure payments and booking alerts.",
    platforms: "Android",
    href: "https://play.google.com/store/apps/details?id=com.stayverz.stayverz",
  },
];

export const STEPS = [
  {
    title: "We chat",
    body: "Explain your idea in plain words. No jargon test, no 40-page brief.",
  },
  {
    title: "You get a plan and a price",
    body: SITE.quoteTime
      ? `Scope, timeline and a fixed quote within ${SITE.quoteTime}. No surprise invoices.`
      : "Scope, timeline and a fixed quote. No surprise invoices.",
  },
  {
    title: "I build, you tap, we ship",
    body: "Test builds on your own phone as we go, then launch on the App Store.",
  },
];

// Hidden until it has at least one real quote.
export const TESTIMONIALS: Testimonial[] = [];

export const FAQ = [
  {
    q: "How much does an app cost?",
    a:
      "It depends on what it does. After a short chat you get a fixed quote, no hourly surprises." +
      (SITE.startingPrice ? ` Projects start from ${SITE.startingPrice}.` : ""),
  },
  {
    q: "Native iOS or Flutter?",
    a: "SwiftUI when you want the most iPhone-feeling app (my focus now). Flutter when you need iOS and Android fast from one codebase; I’ve shipped plenty with it.",
  },
  {
    q: "I only have an idea. Is that enough?",
    a: "Perfect, that’s where every app starts. I’ll help shape it into something worth building.",
  },
  {
    q: "Will I own the code?",
    a: "Yes. Your app, your code, your App Store account.",
  },
  {
    q: "You’re in Dhaka. What about time zones?",
    a: "GMT+6 overlaps a full European workday. US clients wake up to progress updates.",
  },
];
