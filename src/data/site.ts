// Everything the home page says lives here. Leave an optional field empty
// ("" or []) and the part of the page that uses it stays hidden.

export type AppCard = {
  name: string;
  tagline: string;
  stack: string;
  platforms: ("iOS" | "Android")[];
  tags: string[];
  // Each app gets its own color for its icon, stats and button.
  color: string;
  // Text color on top of `color` (for the button).
  onColor: string;
  stats: [Stat, Stat, Stat];
  href: string;
  store: string;
  // Optional app icon in /public. Without one, a tile with initials is shown.
  icon?: string;
};

export type Stat = { value: string; label: string };

export type Testimonial = { quote: string; name: string; role: string };

export const SITE = {
  name: "Najmul Huda",
  shortName: "Najmul",
  email: "najmul.myself@gmail.com",
  status: "Taking new projects",
  location: "Dhaka, GMT+6",
  resume: "/Najmul_Huda_Resume.pdf",
  photo: "/me.jpg",
  github: "https://github.com/najmulmyself",
  linkedin: "https://www.linkedin.com/in/najmulmyself/",
  x: "https://x.com/najmulmyself",

  // Optional. Fill these in when you have them.
  // Your Cal.com event, the part after cal.com/ (e.g. "najmul/discovery-call").
  // Until it's set, the project form ends by emailing the details instead.
  calLink: "najmulmyself/15min",
  replyTime: "", // e.g. "Usually replies within a day"
  quoteTime: "", // e.g. "3 days", used in "a fixed quote within …"
  startingPrice: "", // e.g. "$2,000"
  automationExample: "", // one real example of an automation you built
};

export const STATS: Stat[] = [
  { value: "100k+", label: "downloads on one solo app" },
  { value: "3+ yrs", label: "shipping to the stores" },
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

export const APPS: AppCard[] = [
  {
    name: "Dream Kit 25",
    tagline: "A kit app for football gamers. Built, monetized and launched solo.",
    stack: "Flutter • Provider • AdMob",
    platforms: ["Android"],
    tags: ["Indie", "Gaming"],
    color: "#3DDC84",
    onColor: "#0B1A10",
    stats: [
      { value: "100k+", label: "Downloads" },
      { value: "$120/mo", label: "Ad revenue" },
      { value: "Solo", label: "Built & shipped" },
    ],
    href: "https://play.google.com/store/apps/details?id=com.sakib.dreamkit",
    store: "Google Play",
  },
  {
    name: "Gold Kinen",
    tagline: "Save in gold automatically, with recurring bKash payments.",
    stack: "Flutter • BLoC • Clean Architecture",
    platforms: ["iOS", "Android"],
    tags: ["Fintech"],
    color: "#F5C542",
    onColor: "#1F1600",
    stats: [
      { value: "80%+", label: "Test coverage" },
      { value: "BLoC", label: "Architecture" },
      { value: "bKash", label: "Auto-Save" },
    ],
    href: "https://play.google.com/store/apps/details?id=com.goldkinen.android",
    store: "Google Play",
  },
  {
    name: "Skill Finesse",
    tagline: "A learning app with reminders that keep students coming back.",
    stack: "Flutter • Provider • SQFLite",
    platforms: ["iOS", "Android"],
    tags: ["Education"],
    color: "#A78BFA",
    onColor: "#150B33",
    stats: [
      { value: "2", label: "App stores" },
      { value: "Modular", label: "Architecture" },
      { value: "Push", label: "Reminders" },
    ],
    href: "https://apps.apple.com/us/app/skill-finesse/id6477940594",
    store: "App Store",
    icon: "/icons/skill-finesse.webp",
  },
  {
    name: "Stayverz",
    tagline: "Hotel booking with real-time availability and secure payments.",
    stack: "Flutter • Provider • Payments",
    platforms: ["Android"],
    tags: ["Travel"],
    color: "#FB7185",
    onColor: "#2A0710",
    stats: [
      { value: "Live", label: "Booking flows" },
      { value: "Secure", label: "Payments" },
      { value: "Push", label: "Booking alerts" },
    ],
    href: "https://play.google.com/store/apps/details?id=com.stayverz.stayverz",
    store: "Google Play",
  },
];

// Choices in the "Start a project" form. Edit freely.
export const PROJECT_FORM = {
  needs: [
    { id: "app", label: "An iOS app" },
    { id: "automation", label: "An AI automation" },
    { id: "team", label: "An iOS dev for my team" },
  ],
  timelines: ["ASAP", "1–3 months", "3+ months", "Just exploring"],
  budgets: ["Under $2k", "$2k–$5k", "$5k–$10k", "$10k+", "Not sure yet"],
};

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
