import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { useLanguage } from "../language-context";

const REVEAL_TARGETS =
  "[data-hero-nav], [data-hero-status], [data-hero-title], [data-hero-intro], [data-hero-actions], [data-hero-visual], [data-hero-skill]";

export function useHeroIntroAnimation(
  scopeRef: RefObject<HTMLElement | null>,
  _heroContentRef: RefObject<HTMLElement | null>
) {
  const { lang } = useLanguage();

  useEffect(() => {
    if (!scopeRef.current) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(scopeRef.current);

      if (reducedMotion) {
        gsap.set(q(REVEAL_TARGETS), { opacity: 1, y: 0 });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power3.out", duration: 0.8 } });

      tl.fromTo(q("[data-hero-nav]"), { y: -12, opacity: 0 }, { y: 0, opacity: 1 }, 0.1)
        .fromTo(q("[data-hero-status]"), { y: 14, opacity: 0 }, { y: 0, opacity: 1 }, 0.2)
        .fromTo(q("[data-hero-title]"), { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.3)
        .fromTo(q("[data-hero-intro]"), { y: 18, opacity: 0 }, { y: 0, opacity: 1 }, 0.44)
        .fromTo(q("[data-hero-actions]"), { y: 16, opacity: 0 }, { y: 0, opacity: 1 }, 0.56)
        .fromTo(q("[data-hero-visual]"), { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: 1 }, 0.45)
        .fromTo(
          q("[data-hero-skill]"),
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5, stagger: 0.06 },
          0.65
        );
    }, scopeRef.current);

    return () => ctx.revert();
  }, [lang, scopeRef]);
}
