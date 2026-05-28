import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { HeroCanvas } from "./HeroCanvas";
import { HeroContent } from "./HeroContent";
import { HeroNav } from "./HeroNav";
import { HeroQuote } from "./HeroQuote";
import { HeroSkillsBar } from "./HeroSkillsBar";
import { HeroPulsingLight } from "./HeroPulsingLight";
import { useHeroMotion } from "./HeroMotionProvider";
import { useHeroIntroAnimation } from "./useHeroIntroAnimation";

export function HeroSection() {
  const { setIntroProgress } = useHeroMotion();
  const heroScopeRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  useHeroIntroAnimation(heroScopeRef, heroContentRef);

  useEffect(() => {
    const intro = { value: 0 };
    const tween = gsap.to(intro, {
      value: 1,
      duration: 1.4,
      ease: "power3.out",
      onUpdate: () => setIntroProgress(intro.value),
    });

    return () => {
      tween.kill();
    };
  }, [setIntroProgress]);

  return (
    <section className="relative flex min-h-[100svh] flex-col overflow-x-hidden">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <HeroCanvas />
      </div>

      <div
        className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-r from-[#120a06]/72 via-[#120a06]/28 to-transparent"
        aria-hidden
      />

      <HeroPulsingLight />

      <div
        ref={heroScopeRef}
        className="relative z-10 flex min-h-[100svh] flex-col overflow-x-hidden overflow-y-visible"
        style={{ perspective: "1200px", transformStyle: "preserve-3d" }}
      >
        <HeroNav />

        <div className="portfolio-container flex flex-1 flex-col py-10 lg:py-14">
          <HeroContent ref={heroContentRef} />
          <div className="hidden">
            <HeroQuote />
          </div>
        </div>

        <div className="relative z-10 mt-auto">
          <HeroSkillsBar />
        </div>
      </div>
    </section>
  );
}
