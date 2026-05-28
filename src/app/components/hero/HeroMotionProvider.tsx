import React, { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";

type HeroMotionState = {
  mouse: { x: number; y: number };
  scrollProgress: number;
  introProgress: number;
  activePhase: number;
  setMouse: (mouse: { x: number; y: number }) => void;
  setScrollProgress: (value: number) => void;
  setIntroProgress: (value: number) => void;
  setActivePhase: (value: number) => void;
  containerRef: React.RefObject<HTMLDivElement | null>;
};

const HeroMotionContext = createContext<HeroMotionState | null>(null);

export function HeroMotionProvider({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [scrollProgress, setScrollProgress] = useState(0);
  const [introProgress, setIntroProgress] = useState(0);
  const [activePhase, setActivePhase] = useState(0);

  const value = useMemo(
    () => ({
      mouse,
      scrollProgress,
      introProgress,
      activePhase,
      setMouse,
      setScrollProgress,
      setIntroProgress,
      setActivePhase,
      containerRef,
    }),
    [mouse, scrollProgress, introProgress, activePhase]
  );

  return <HeroMotionContext.Provider value={value}>{children}</HeroMotionContext.Provider>;
}

export function useHeroMotion() {
  const context = useContext(HeroMotionContext);
  if (!context) {
    throw new Error("useHeroMotion must be used within HeroMotionProvider");
  }
  return context;
}
