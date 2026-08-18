import { CategoryProvider } from "@/components/category-context";
import { WaitlistProvider } from "@/components/waitlist/waitlist-context";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { HeroWord } from "@/components/home/hero-word";
import { Problem } from "@/components/home/problem";
import { Product } from "@/components/home/product";
import { Statement } from "@/components/home/statement";
import { Building } from "@/components/home/building";
import { Sales } from "@/components/home/sales";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";

export default function Home() {
  return (
    <WaitlistProvider>
      <CategoryProvider>
        <SiteNav />
        {/* The grounds alternate the whole way down and no two neighbours
            match: Bottle, Cream, Bottle, Cream, Bottle, Acid, Cream sunken,
            Bottle, Cream, Acid, Bottle. Moving a section means rechecking that
            run. */}
        <main>
          <HeroWord />
          <Problem />
          <Product />
          <Statement />
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
