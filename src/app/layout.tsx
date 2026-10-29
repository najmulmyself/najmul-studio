import { SITE } from "@/data/site";
import { SiteAnalytics } from "@/components/site-analytics";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { Bricolage_Grotesque, Caveat, Hanken_Grotesk } from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  axes: ["opsz"],
});

const body = Hanken_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
  weight: ["500", "700"],
  // Only used far down the page, so it shouldn't compete with the headline font.
  preload: false,
});

const title = "Najmul Huda: indie iOS developer & AI automation";
const description =
  "You bring the idea, I'll ship it to the App Store. Indie iOS developer and AI automation builder from Dhaka, taking freelance and contract work.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title,
  description,
  alternates: { canonical: "/" },
  openGraph: { title, description, url: "/", siteName: SITE.name, type: "website", locale: "en_US" },
  twitter: { card: "summary_large_image", title, description, creator: "@najmulmyself" },
};

// Tells search engines who the site is about.
const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  url: SITE.url,
  image: new URL(SITE.photo, SITE.url).toString(),
  jobTitle: "Indie iOS developer & AI automation builder",
  email: `mailto:${SITE.email}`,
  address: { "@type": "PostalAddress", addressLocality: "Dhaka", addressCountry: "BD" },
  sameAs: [SITE.github, SITE.linkedin, SITE.x],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          // Marks the page as JS-enabled before paint, so scroll reveals don't flash.
          dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }}
        />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }} />
      </head>
      <body className={`${display.variable} ${body.variable} ${hand.variable} font-sans antialiased`}>
        {children}
        {/* Cookie-free visitor counts, shown in the Vercel dashboard. */}
        <Analytics />
        <SiteAnalytics />
      </body>
    </html>
  );
}
