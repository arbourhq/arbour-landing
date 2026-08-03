import type { Metadata } from "next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Martian_Mono,
} from "next/font/google";
import { SITE } from "@/content/site";
import "./globals.css";

// Bricolage is only ever set at 800. Instrument Sans carries 400/600.
// Martian Mono is uppercase labels only, never body copy.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--font-bricolage",
  display: "swap",
});

const instrument = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument",
  display: "swap",
});

const martian = Martian_Mono({
  subsets: ["latin"],
  variable: "--font-martian",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `Arbour · ${SITE.tagline}`,
    template: "%s · Arbour",
  },
  description: SITE.description,
  openGraph: {
    title: `Arbour · ${SITE.tagline}`,
    description: SITE.description,
    url: SITE.url,
    siteName: "Arbour",
    locale: "en_AU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `Arbour · ${SITE.tagline}`,
    description: SITE.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en-AU"
      className={`${bricolage.variable} ${instrument.variable} ${martian.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
