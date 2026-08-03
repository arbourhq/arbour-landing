import { CategoryProvider } from "@/components/category-context";
import { WaitlistProvider } from "@/components/waitlist/waitlist-context";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Marquee } from "@/components/marquee";
import { Hero } from "@/components/home/hero";
import { Problem } from "@/components/home/problem";
import { Product } from "@/components/home/product";
import { Building } from "@/components/home/building";
import { Sales } from "@/components/home/sales";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

const MARQUEE_ITEMS = [
  "Run sheets",
  "Deposit chasing",
  "Seating plans",
  "Vendor briefs",
  "Final headcounts",
  "Timeline builder",
];

export default function Home() {
  return (
    <WaitlistProvider>
      <CategoryProvider>
        <SiteNav />
        <main>
          <Hero />
          <Marquee items={MARQUEE_ITEMS} className="bg-bottle text-acid" />
          <Problem />
          <Product />
          <Building />
          <Sales />
          <Pricing />
          <Faq />
          <FinalCta />
        </main>
        <SiteFooter />
      </CategoryProvider>
    </WaitlistProvider>
  );
}
