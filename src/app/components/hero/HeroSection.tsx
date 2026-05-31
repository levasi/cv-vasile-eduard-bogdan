import React, { useRef } from "react";
import { HeroCanvas } from "./HeroCanvas";
import { HeroContent } from "./HeroContent";
import { HeroNav } from "./HeroNav";
import { HeroSkillsBar } from "./HeroSkillsBar";
import { HeroPulsingLight } from "./HeroPulsingLight";
import { useHeroIntroAnimation } from "./useHeroIntroAnimation";

export function HeroSection() {
  const heroScopeRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  useHeroIntroAnimation(heroScopeRef, heroContentRef);

  return (
    <section className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HeroCanvas />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#120a06]/72 via-[#120a06]/28 to-transparent opacity-50"
        aria-hidden
      />

      <HeroPulsingLight />

      <div
        ref={heroScopeRef}
        className="relative z-10 flex min-h-[100svh] flex-col overflow-hidden"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        <HeroNav />

        <div className="portfolio-container flex flex-1 flex-col py-10 lg:py-14">
          <HeroContent ref={heroContentRef} />
        </div>

        <div className="relative z-10 mt-auto">
          <HeroSkillsBar />
        </div>
      </div>
    </section>
  );
}
