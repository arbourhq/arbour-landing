import { ScrollCompanion } from "@/components/arby/scroll-companion";
import { CategoryProvider } from "@/components/category-context";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { StageStrip } from "@/components/home/stage-strip";
import { Stage } from "@/components/home/stage";
import { Quiet } from "@/components/home/quiet";
import { Vendors } from "@/components/home/vendors";
import { Pricing } from "@/components/home/pricing";
import { Faq } from "@/components/home/faq";
import { FinalCta } from "@/components/home/final-cta";
import { STAGES } from "@/content/stages";

export default function Home() {
  return (
    <CategoryProvider>
      <SiteNav />
      {/* One ruled sheet from the nav to the footer: every row draws the
          column rules at the same x, so they read as two unbroken lines. */}
      <main id="main">
        <Hero />
        {/* The strip docks at the foot of the window while this wrapper,
            the five stages, fills it. */}
        <div id="board" className="relative">
          <StageStrip />
          {STAGES.map((stage, i) => (
            <Stage key={stage.id} stage={stage} index={i} />
          ))}
        </div>
        <Quiet />
        <Vendors />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
      <ScrollCompanion />
    </CategoryProvider>
  );
}
