import React from "react";

export function HeroCanvas() {
  return (
    <div className="her-banner">
      <div className="absolute inset-0 hero-banner-bg" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-[#1a1008]/15" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_85%_55%,rgba(251,191,36,0.12),transparent_42%)]"
        aria-hidden
      />
    </div>
  );
}
