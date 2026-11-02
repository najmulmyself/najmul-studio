// Everything the home page says lives here. Leave an optional field empty
// ("" or []) and the part of the page that uses it stays hidden.

export type AppCard = {
  name: string;
  tagline: string;
  // Tech used. Leave it out when unsure; the line is then hidden.
  stack?: string;
  platforms: ("iOS" | "Android")[];
  tags: string[];
  // Each app gets its own color for its icon, stats and button.
  color: string;
  // Text color on top of `color` (for the button).
  onColor: string;
  stats: [Stat, Stat, Stat];
  href: string;
  store: string;
  // Button text when the main link isn't a store listing yet (e.g. "Visit tixeconcept.com").
  cta?: string;
  // A second store listing, e.g. the App Store version of an Android app.
  alsoOn?: { store: string; href: string };
  // Optional app icon in /public. Without one, a tile with initials is shown.
  icon?: string;
  // Optional real screenshots (in /public, status bar cropped off) shown on the
  // phone mockup in place of the drawn screen. They rotate, and a tap skips ahead.
  // bg fills any gap around the shot (match the app's background).
  // top: colour at the top of the shot (sets the status bar tone; defaults to bg).
  // fill: fit the width and sit at the top (for shots from older, wider 16:9 iPhones).
  screens?: { src: string; alt: string; bg?: string; top?: string; fill?: boolean }[];
};

export type Stat = { value: string; label: string };

export type Testimonial = { quote: string; name: string; role: string };

export const SITE = {
  name: "Najmul Huda",
  shortName: "Najmul",
  email: "najmul.myself@gmail.com",
  // The live address. Used for link previews, the sitemap and search engines.
  url: "https://www.najmulmyself.com",
  status: "Taking new projects",
  location: "Dhaka, GMT+6",
  resume: "/Najmul_Huda_Resume.pdf",
  photo: "/najmul-huda.jpg",
  // Square crop of the same photo, for the small round avatars.
  headshot: "/najmul-huda-headshot.jpg",
  github: "https://github.com/najmulmyself",
  linkedin: "https://www.linkedin.com/in/najmulmyself/",
  x: "https://x.com/najmulmyself",
  threads: "https://www.threads.com/@najmulmyself",

  // Optional. Fill these in when you have them.
  // Your Cal.com event, the part after cal.com/ (e.g. "najmul/discovery-call").
  // Until it's set, the project form ends by emailing the details instead.
  calLink: "najmulmyself/15min",
  // Microsoft Clarity project id (recordings, heatmaps, click tracking). Empty turns it off.
  clarityId: "z4qfcjlglt",
  // Web3Forms access key: every project form is emailed to you, booked or not.
  // It's meant to be public. Empty turns this off.
  web3formsKey: "03a773a5-08bf-4f52-b9f3-aec7ae7b7c68",
  // Your WhatsApp number in international format, digits only (e.g. "8801XXXXXXXXX").
  // Shows "or chat on WhatsApp" in the chat bubble. Empty hides it.
  whatsapp: "8801400969123",
  replyTime: "", // e.g. "Usually replies within a day"
  quoteTime: "", // e.g. "3 days", used in "a fixed quote within …"
  startingPrice: "", // e.g. "$2,000"
  automationExample: "", // one real example of an automation you built
};

export const STATS: Stat[] = [
  { value: "500K+", label: "downloads on one solo app" },
  { value: "3+ yrs", label: "shipping to the stores" },
  { value: "80%+", label: "test coverage on payment code" },
  { value: "1 dev", label: "no meetings about meetings" },
];

export const SERVICES = [
  {
    title: "An iOS app people actually download",
    body: "From napkin sketch to App Store: design, build, release and crash monitoring. One I built solo passed 500K downloads.",
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
    name: "DLS Pro",
    tagline:
      "An all-in-one Dream League Soccer companion: kits, player stats, squad builder and upgrade simulator. Built, monetized and launched solo.",
    stack: "Flutter • Provider • AdMob",
    platforms: ["Android"],
    tags: ["Indie", "Sports"],
    color: "#3DDC84",
    onColor: "#0B1A10",
    stats: [
      { value: "500K+", label: "Downloads" },
      { value: "4.1★", label: "2.3K reviews" },
      { value: "Solo", label: "Built & shipped" },
    ],
    href: "https://play.google.com/store/apps/details?id=com.sakib.dreamkit",
    store: "Google Play",
    icon: "/icons/dls-pro.webp",
    screens: [
      { src: "/screens/dls-pro-home.webp", alt: "DLS Pro home: player database, season pass and new players" },
      { src: "/screens/dls-pro-tools.webp", alt: "DLS Pro tools: squad builder, compare, card creator, upgrade simulator" },
      { src: "/screens/dls-pro-kits.webp", alt: "DLS Pro kits: World Cup and La Liga kit collections" },
    ],
  },
  {
    name: "Card Creator",
    tagline: "Design custom DLS player cards in 2026 and classic DLS 19 styles: edit every stat, then export in high resolution.",
    platforms: ["Android"],
    tags: ["Tools"],
    color: "#E9B949",
    onColor: "#1A1200",
    stats: [
      { value: "100K+", label: "Downloads" },
      { value: "4.8★", label: "314 reviews" },
      { value: "5 eras", label: "DLS 19 to 26 cards" },
    ],
    href: "https://play.google.com/store/apps/details?id=com.sakibpro.cardcreator",
    store: "Google Play",
    icon: "/icons/card-creator.webp",
    screens: [
      { src: "/screens/card-creator-creator.webp", alt: "Card Creator: a DLS 26 player card with name, nationality and rating", bg: "#f0f1f0" },
      { src: "/screens/card-creator-retro.webp", alt: "Card Creator: a retro DLS 19 card with every stat editable", bg: "#eff0ee" },
    ],
  },
  {
    name: "Skill Finesse",
    tagline: "An e-learning app for Bangladesh: courses, quizzes and live classes from top local instructors.",
    stack: "Flutter • Provider • SQFLite",
    platforms: ["iOS", "Android"],
    tags: ["Education"],
    color: "#A78BFA",
    onColor: "#150B33",
    stats: [
      { value: "2", label: "App stores" },
      { value: "Since 2024", label: "Live and updated" },
      { value: "Courses", label: "Quizzes, live classes" },
    ],
    href: "https://apps.apple.com/us/app/skill-finesse/id6477940594",
    store: "App Store",
    icon: "/icons/skill-finesse.webp",
    screens: [
      { src: "/screens/skill-finesse-home.webp", alt: "Skill Finesse home: course search, quiz examination and new courses", bg: "#f2f3f8" },
      { src: "/screens/skill-finesse-courses.webp", alt: "Skill Finesse courses: all, studying and wishlist", bg: "#f2f3f8" },
      { src: "/screens/skill-finesse-profile.webp", alt: "Skill Finesse account: personal information and support", bg: "#f2f3f8" },
      { src: "/screens/skill-finesse-future.webp", alt: "Skill Finesse: the future of e-learning in Bangladesh", bg: "#000000" },
    ],
  },
  {
    name: "Stayverz",
    tagline: "Short-term rentals across Bangladesh: guests book homes, hosts list a place in ten steps.",
    stack: "Flutter • Provider • Payments",
    platforms: ["iOS", "Android"],
    tags: ["Travel"],
    color: "#F05926",
    onColor: "#ffffff",
    stats: [
      { value: "10K+", label: "Downloads" },
      { value: "2-sided", label: "Guests and hosts" },
      { value: "Live", label: "Booking flows" },
    ],
    href: "https://play.google.com/store/apps/details?id=com.stayverz.stayverz",
    store: "Google Play",
    alsoOn: { store: "App Store", href: "https://apps.apple.com/us/app/stayverz-seamless-experience/id6748875178" },
    icon: "/icons/stayverz.webp",
    screens: [
      { src: "/screens/stayverz-listings.webp", alt: "Stayverz listings: apartments with nightly prices in Bangladesh", bg: "#ffffff" },
      { src: "/screens/stayverz-search.webp", alt: "Stayverz search: where, when and who's coming", bg: "#f3f4f6" },
      { src: "/screens/stayverz-publish.webp", alt: "Stayverz host flow: review and publish a listing", bg: "#ffffff" },
    ],
  },
  {
    name: "EasyTrax",
    tagline:
      "GPS fleet tracking: live vehicle locations, speed and idle time, trip reports and remote engine lock for businesses in Bangladesh.",
    platforms: ["iOS", "Android"],
    tags: ["Logistics"],
    color: "#0A72B2",
    onColor: "#ffffff",
    stats: [
      { value: "10K+", label: "Downloads" },
      { value: "4.1★", label: "328 reviews" },
      { value: "Since 2019", label: "Live and updated" },
    ],
    href: "https://play.google.com/store/apps/details?id=com.bd.easytraxstandard",
    store: "Google Play",
    alsoOn: { store: "App Store", href: "https://apps.apple.com/us/app/easytrax-gps-tracking/id1476965773" },
    icon: "/icons/easytrax.webp",
    screens: [
      { src: "/screens/easytrax-map.webp", alt: "EasyTrax: a live map of every vehicle in the fleet", bg: "#ffffff", top: "#0672b2", fill: true },
      { src: "/screens/easytrax-vehicle.webp", alt: "EasyTrax vehicle view: location, speed, odometer and ignition", bg: "#ffffff", top: "#f4f4f4", fill: true },
      { src: "/screens/easytrax-status.webp", alt: "EasyTrax fleet status: moving, idle, stopped and offline vehicles", bg: "#ffffff", top: "#0672b2", fill: true },
      { src: "/screens/easytrax-lock.webp", alt: "EasyTrax remote engine lock and unlock", bg: "#ffffff", top: "#0672b2", fill: true },
    ],
  },
  {
    name: "Tixe",
    tagline:
      "A military-style fitness app: tactical training courses, strength workouts, activity tracking and a gear store, with a built-in wallet.",
    platforms: ["iOS", "Android"],
    tags: ["Fitness", "Coming soon"],
    color: "#E2CA06",
    onColor: "#121106",
    stats: [
      { value: "4-in-1", label: "Courses, workouts, tracking, gear" },
      { value: "Wallet", label: "Pay, sell and withdraw" },
      { value: "Soon", label: "On iOS and Android" },
    ],
    // Not on the stores yet: link the site (it has the waitlist) until it launches.
    href: "https://tixeconcept.com/",
    store: "Website",
    cta: "Visit tixeconcept.com",
    icon: "/icons/tixe.webp",
    screens: [
      { src: "/screens/tixe-trainings.webp", alt: "Tixe trainings: tactical courses like long range sniper training", bg: "#121106" },
      { src: "/screens/tixe-workouts.webp", alt: "Tixe workouts: strength and HIIT sessions", bg: "#121106" },
      { src: "/screens/tixe-fitness.webp", alt: "Tixe fitness tracking: steps, calories, activity and heart rate", bg: "#121106" },
      { src: "/screens/tixe-store.webp", alt: "Tixe store: browse tactical gear", bg: "#121106", top: "#121106" },
      { src: "/screens/tixe-wallet.webp", alt: "Tixe wallet: balance and history", bg: "#121106" },
    ],
  },
  {
    name: "Tuition Finder",
    tagline: "Connects students, parents and tutors directly: search by subject, class and location, post a tuition and chat in the app. No commission.",
    platforms: ["iOS"],
    tags: ["Education"],
    color: "#2F7BF5",
    onColor: "#ffffff",
    stats: [
      { value: "5.0★", label: "7 ratings" },
      { value: "0%", label: "Commission" },
      { value: "2026", label: "Launched" },
    ],
    href: "https://apps.apple.com/us/app/tuition-finder/id6757366885",
    store: "App Store",
    icon: "/icons/tuition-finder.webp",
    screens: [
      { src: "/screens/tuition-finder-home.webp", alt: "Tuition Finder home: find tutors by curriculum, class, subject and location", bg: "#ffffff" },
      { src: "/screens/tuition-finder-jobs.webp", alt: "Tuition Finder jobs: tuition posts with subjects, location and pay", bg: "#ffffff" },
      { src: "/screens/tuition-finder-filter.webp", alt: "Tuition Finder filters: tuition type, monthly budget and tutor gender", bg: "#2e2f33" },
    ],
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
