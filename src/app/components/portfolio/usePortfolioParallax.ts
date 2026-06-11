import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function usePortfolioParallax(
  sectionRef: RefObject<HTMLElement | null>,
  layoutKey = 0,
  itemSelector = "[data-portfolio-parallax]"
) {
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const scroller = document.documentElement;
    const refresh = () => {
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
      });
    };

    let ctx: gsap.Context | null = null;

    const init = () => {
      ctx?.revert();

      const layers = section.querySelectorAll<HTMLElement>(itemSelector);
      if (!layers.length) return;

      ctx = gsap.context(() => {
        layers.forEach((layer) => {
          const cell = layer.closest<HTMLElement>(".portfolio-section__cell");
          if (!cell) return;

          const speed = Number.parseFloat(layer.dataset.speed ?? "0.35");
          const travel = 12 + speed * 28;

          gsap.fromTo(
            layer,
            { y: -travel * 0.5, force3D: true },
            {
              y: travel * 0.5,
              ease: "none",
              force3D: true,
              scrollTrigger: {
                trigger: cell,
                scroller,
                start: "top bottom",
                end: "bottom top",
                scrub: 1.6,
                invalidateOnRefresh: true,
              },
            }
          );
        });
      }, section);

      refresh();
    };

    init();
    const refreshId = window.setTimeout(refresh, 350);

    return () => {
      window.clearTimeout(refreshId);
      ctx?.revert();
    };
  }, [sectionRef, itemSelector, layoutKey]);
}
