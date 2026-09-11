import { CategoryProvider } from "@/components/category-context";
import { SiteNav } from "@/components/site-nav";
import { SiteFooter } from "@/components/site-footer";
import { Hero } from "@/components/home/hero";
import { StageRail } from "@/components/home/stage-rail";
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
      {/* The grounds alternate the whole way down and no two neighbours
          match: Bottle, Acid (the rail), Cream, Bottle, Acid, Cream sunken,
          Bottle, Acid, Cream, Bottle, Cream, Acid, Bottle. Moving a section
          or restacking the stages means rechecking that run. */}
      <main id="main">
        {/* The hero sits inside the board wrapper so the rail can start on
            the hero's foot, at the fold, and stay sticky for exactly the
            height of the five stages: it lets go the moment the last one
            scrolls out. */}
        <div id="board" className="relative">
          <Hero />
          <StageRail />
          {STAGES.map((stage) => (
            <Stage key={stage.id} stage={stage} />
          ))}
        </div>
        <Quiet />
        <Vendors />
        <Pricing />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </CategoryProvider>
  );
}
