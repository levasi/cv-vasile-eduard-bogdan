import React, { lazy, Suspense } from "react";
import { PortfolioSection } from "../components/portfolio/PortfolioSection";

const HeroSection = lazy(() =>
  import("../components/hero/HeroSection").then((module) => ({ default: module.HeroSection }))
);

function HeroFallback() {
  return (
    <div className="flex min-h-[100svh] items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-primary/30 border-t-primary" />
    </div>
  );
}

export function PortfolioPage() {
  return (
    <div className="min-h-screen w-full">
      <Suspense fallback={<HeroFallback />}>
        <HeroSection />
      </Suspense>
      <PortfolioSection />
    </div>
  );
}
