import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "../language-context";

function seeded(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  const v = x - Math.floor(x);
  return v <= 0 ? 1 : v;
}

gsap.registerPlugin(ScrollTrigger);

export function useHeroIntroAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  heroContentRef: RefObject<HTMLElement | null>
) {
  const { lang, t } = useLanguage();
  const linesKey = [t("heroLine1"), t("heroLine2"), t("heroLine3"), t("heroLine4")].join("|");

  useEffect(() => {
    if (!scopeRef.current) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scopeRef.current);
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      const START_AT = 0.15;

      tl.fromTo(
        q("[data-hero-nav]"),
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        START_AT
      );

      tl.fromTo(
        q("[data-hero-greeting]"),
        { opacity: 0, y: -14, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6 },
        START_AT
      );

      const letters = q("[data-hero-letter]") as HTMLElement[];
      letters.forEach((el, i) => {
        const r1 = seeded(i + 1);
        const r2 = seeded(i + 2);
        const r3 = seeded(i + 3);
        const r4 = seeded(i + 4);

        gsap.set(el, {
          opacity: 0,
          x: r1 * 100,
          scale: 0.1 + r3 * 0.55,
          rotateZ: r4 * 24,
        });
      });

      // Animate each line in parallel (stagger only within that line).
      const lineIndices = Array.from(
        new Set(letters.map((el) => Number(el.dataset.line ?? 0)))
      ).sort((a, b) => a - b);

      lineIndices.forEach((lineIndex) => {
        const lineLetters = letters.filter((el) => Number(el.dataset.line ?? 0) === lineIndex);
        tl.to(
          lineLetters,
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateZ: 0,
            duration: 0.85,
            stagger: { each: 0.07, from: "start" },
          },
          START_AT
        );
      });

      tl.fromTo(
        q("[data-hero-accent]"),
        { opacity: 0, y: 18, filter: "blur(6px)", x: 100 },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7, x: 0 },
        START_AT
      );

      tl.fromTo(
        q("[data-hero-intro]"),
        { opacity: 0, y: 16, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
        START_AT + 0.25
      );

      tl.fromTo(
        q("[data-hero-tools]"),
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.6 },
        START_AT + 0.4
      );

      tl.fromTo(
        q("[data-hero-tool]"),
        { opacity: 0, y: 10, scale: 0.9 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.45,
          ease: "back.out(1.6)",
          stagger: { each: 0.06, from: "start" },
        },
        START_AT + 0.5
      );

      tl.fromTo(
        q("[data-hero-cta]"),
        { opacity: 0, y: 18, filter: "blur(6px)" },
        { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.7 },
        START_AT + 0.55
      );

      tl.fromTo(
        q("[data-hero-skills]"),
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        START_AT
      );

      tl.fromTo(
        q("[data-hero-skill]"),
        { y: 10, opacity: 0, filter: "blur(6px)" },
        {
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: { each: 0.09, from: "start" },
        },
        START_AT + 0.05
      );

      const heroContent =
        heroContentRef.current ?? scopeRef.current?.querySelector<HTMLElement>("[data-hero-content]");

      if (heroContent) {
        gsap.set(heroContent, {
          transformOrigin: "top center",
          transformStyle: "preserve-3d",
          willChange: "transform",
        });

        gsap.to(heroContent, {
          yPercent: 12,
          scale: 0.94,
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: scopeRef.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
            invalidateOnRefresh: true,
          },
        });
      }
    }, scopeRef.current);

    return () => ctx.revert();
  }, [lang, linesKey]);
}
