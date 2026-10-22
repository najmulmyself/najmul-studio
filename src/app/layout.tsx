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
});

const title = "Najmul Huda: indie iOS developer & AI automation";
const description =
  "You bring the idea, I'll ship it to the App Store. Indie iOS developer and AI automation builder from Dhaka, taking freelance and contract work.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, type: "website", locale: "en_US" },
  twitter: { card: "summary", title, description },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${display.variable} ${body.variable} ${hand.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
