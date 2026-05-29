import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioParallax(
  sectionRef: RefObject<HTMLElement | null>,
  itemSelector = "[data-portfolio-parallax-inner]"
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const items = section.querySelectorAll<HTMLElement>(itemSelector);
    if (!items.length) return;

    const ctx = gsap.context(() => {
      items.forEach((el) => {
        const speed = Number.parseFloat(el.dataset.speed ?? "0.35");
        const travel = 14 + speed * 42;

        gsap.fromTo(
          el,
          { y: -travel },
          {
            y: travel,
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: 1.4,
            },
          }
        );
      });
    }, section);

    const refreshId = window.setTimeout(() => ScrollTrigger.refresh(), 300);

    return () => {
      window.clearTimeout(refreshId);
      ctx.revert();
    };
  }, [sectionRef, itemSelector]);
}
