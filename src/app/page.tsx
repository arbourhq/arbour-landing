import { ArbyLauncher } from "@/components/arby/arby-launcher";
import { CategoryProvider } from "@/components/category-context";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { StageStrip } from "@/components/home/stage-strip";
import { Stage } from "@/components/home/stage";
import { Quiet, Statement } from "@/components/home/quiet";
import { BookCanvas, BookStory } from "@/components/book/story";
import { Vendors } from "@/components/home/vendors";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { STAGES } from "@/content/stages";
import { StructuredData } from "@/components/structured-data";
import { FAQS } from "@/content/faq";
import { TIERS } from "@/content/pricing";
import { APP, SITE } from "@/content/site";
import { siteUrl } from "@/lib/seo";

export default function Home() {
  return (
    <CategoryProvider>
      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "SoftwareApplication",
              "@id": siteUrl("/#software"),
              name: "Arbour",
              url: siteUrl("/"),
              description: SITE.introduction,
              applicationCategory: "BusinessApplication",
              applicationSubCategory: "Wedding CRM",
              operatingSystem: "Web browser",
              inLanguage: "en-AU",
              countriesSupported: "AU",
              publisher: { "@id": siteUrl("/#organization") },
              featureList: TIERS[0].features.join("; "),
              screenshot: STAGES.map((stage) => siteUrl(stage.capture.src)),
              softwareHelp: { "@type": "WebPage", url: APP.help },
              offers: TIERS.flatMap((tier) =>
                tier.price
                  ? [
                      {
                        "@type": "Offer",
                        name: `${tier.name} monthly`,
                        description: "Monthly subscription, including GST.",
                        price: tier.price.monthly,
                        priceCurrency: "AUD",
                        url: siteUrl("/#pricing"),
                      },
                    ]
                  : [],
              ),
            },
            {
              "@type": "FAQPage",
              "@id": siteUrl("/#faq"),
              mainEntity: FAQS.map(({ q, a }) => ({
                "@type": "Question",
                name: q,
                acceptedAnswer: { "@type": "Answer", text: a },
              })),
            },
          ],
        }}
      />
      <SiteNav />
      {/* One ruled sheet from the nav to the footer: every row draws the
          column rules at the same x, so they read as two unbroken lines.
          The story (hero, five stages, statement) is the book: one job,
          bound, its pages turned by the scroll from enquiry to paid. */}
      <main id="main">
        <BookStory>
          <Hero />
          <BookCanvas />
          {/* The strip docks at the foot of the window while the five
              stages fill it. */}
          <StageStrip />
          {STAGES.map((stage, i) => (
            <Stage key={stage.id} stage={stage} index={i} />
          ))}
          <Statement />
        </BookStory>
        <Quiet />
        <Vendors />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <ArbyLauncher />
    </CategoryProvider>
  );
}
