import React, { lazy, Suspense } from "react";
import { HeroMotionProvider } from "../components/hero/HeroMotionProvider";
import { LenisScrollProvider } from "../components/hero/useLenisScroll";
import { CinematicInfiniteGrid } from "../components/portfolio/CinematicInfiniteGrid";

const HeroSection = lazy(() =>
  import("../components/hero/HeroSection").then((module) => ({ default: module.HeroSection }))
);

function HeroFallback() {
  return (
    <div className="min-h-[100svh] bg-[#070B14] flex items-center justify-center">
      <div className="h-10 w-10 rounded-full border-2 border-[#7C3AED]/30 border-t-[#7C3AED] animate-spin" />
    </div>
  );
}

export function PortfolioPage() {
  return (
    <LenisScrollProvider>
      <HeroMotionProvider>
        <div className="min-h-screen w-full" style={{ fontFamily: "'Inter', sans-serif" }}>
          <Suspense fallback={<HeroFallback />}>
            <HeroSection />
          </Suspense>
          <CinematicInfiniteGrid />
        </div>
      </HeroMotionProvider>
    </LenisScrollProvider>
  );
}
