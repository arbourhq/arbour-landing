import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import {
  Bricolage_Grotesque,
  Instrument_Sans,
  Martian_Mono,
} from "next/font/google";
import { AttributionCapture } from "@/components/attribution-capture";
import { MetaPixel } from "@/components/meta-pixel";
import { RedditPixel } from "@/components/reddit-pixel";
import { RevealObserver } from "@/components/motion/reveal-observer";
import { SITE } from "@/content/site";
import "./globals.css";

// Bricolage is only ever set at 800. Instrument Sans carries 400/600.
// Martian Mono is uppercase labels only, never body copy.
//
// Bricolage loads its optical size axis as well as weight. Headlines carry no
// added letter spacing (the console's rule), and opsz is what tightens the
// face at 44 to 160px; without it the display sizes set loose.
const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
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
  // Meta Business domain verification. Must be in the server-rendered head,
  // and Next renders each verification.other key as <meta name=key>.
  verification: {
    other: {
      "facebook-domain-verification": "47swubvxinxgxxljjync0rcdkyblkw",
    },
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
      // The inline script below adds data-js before hydration.
      suppressHydrationWarning
    >
      <head>
        {/* Before first paint: reveals may hide what they are about to play,
            because something is now here to play it. */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.dataset.js=''",
          }}
        />
      </head>
      <body>
        {children}
        <RevealObserver />
        <Analytics />
        <MetaPixel />
        <RedditPixel />
        <AttributionCapture />
      </body>
    </html>
  );
}
