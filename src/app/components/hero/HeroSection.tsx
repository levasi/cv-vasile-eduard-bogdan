import React, { useRef } from "react";
import { HeroContent } from "./HeroContent";
import { HeroNav } from "./HeroNav";
import { HeroSkillsBar } from "./HeroSkillsBar";
import { useHeroIntroAnimation } from "./useHeroIntroAnimation";

export function HeroSection() {
  const heroScopeRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  useHeroIntroAnimation(heroScopeRef, heroContentRef);

  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col">
      <div ref={heroScopeRef} className="relative z-10 flex min-h-[100svh] flex-col">
        <HeroNav />

        <div className="portfolio-container flex flex-1 flex-col py-10 lg:py-14 px-2">
          <HeroContent ref={heroContentRef} />
        </div>

        <div className="relative z-10 mt-auto">
          <HeroSkillsBar />
        </div>
      </div>
    </section>
  );
}
