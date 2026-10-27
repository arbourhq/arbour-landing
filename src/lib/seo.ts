import type { Metadata } from "next";
import { SITE } from "@/content/site";

export function siteUrl(path: string): string {
  return new URL(path, SITE.url).toString();
}

/** Nested metadata is replaced, rather than merged, by Next.js. */
export function pageMetadata({
  title,
  description,
  path,
  noIndex = false,
}: {
  title: string;
  description: string;
  path: string;
  noIndex?: boolean;
}): Metadata {
  const socialTitle = `${title} · Arbour`;
  const imageAlt = `Arbour. ${SITE.tagline}.`;

  return {
    title,
    description,
    alternates: { canonical: siteUrl(path) },
    robots: {
      index: !noIndex,
      follow: true,
      googleBot: {
        index: !noIndex,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: socialTitle,
      description,
      url: siteUrl(path),
      siteName: "Arbour",
      locale: "en_AU",
      type: "website",
      images: [
        {
          url: siteUrl("/opengraph-image"),
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [{ url: siteUrl("/twitter-image"), alt: imageAlt }],
    },
  };
}
