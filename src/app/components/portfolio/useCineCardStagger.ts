import { useEffect, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const HIDDEN = { y: 32, opacity: 0, scale: 0.95, filter: "blur(1px)" };
const VISIBLE = { y: 0, opacity: 1, scale: 1, filter: "blur(0px)" };

function syncScrubTimeline(tl: gsap.core.Timeline) {
  ScrollTrigger.refresh();
  const st = tl.scrollTrigger;
  if (st) tl.progress(st.progress);
}

export function useCineCardStagger(scopeRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    if (!scopeRef.current) return;

    let ctx: gsap.Context | null = null;
    let cancelled = false;
    const timers: number[] = [];

    const scheduleSync = (tl: gsap.core.Timeline) => {
      const run = () => {
        if (!cancelled) syncScrubTimeline(tl);
      };
      run();
      requestAnimationFrame(run);
      timers.push(window.setTimeout(run, 120), window.setTimeout(run, 400));
    };

    const setup = () => {
      if (cancelled || !scopeRef.current) return;

      const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

      ctx = gsap.context(() => {
        const root = scopeRef.current;
        const cards = gsap.utils.toArray<HTMLElement>(".cine-card", root);
        if (!cards.length) return;

        if (reducedMotion) {
          gsap.set(cards, VISIBLE);
          return;
        }

        const grid = root?.querySelector<HTMLElement>(".portfolio-items") ?? root;
        gsap.set(cards, HIDDEN);

        const staggerEach = 0.22;
        const cardDuration = 0.65;
        const totalDuration = cardDuration + (cards.length - 1) * staggerEach;

        let tl!: gsap.core.Timeline;
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: grid,
            start: "top 88%",
            end: () =>
              `+=${Math.round(grid!.offsetHeight * 0.65 + totalDuration * 120)}`,
            scrub: 0.55,
            invalidateOnRefresh: true,
            onRefresh(self) {
              tl.progress(self.progress);
            },
          },
        });

        tl.to(cards, {
          ...VISIBLE,
          duration: cardDuration,
          ease: "none",
          stagger: { each: staggerEach, from: "start" },
        });

        scheduleSync(tl);

        grid?.querySelectorAll("img").forEach((img) => {
          if (img.complete) return;
          img.addEventListener("load", () => syncScrubTimeline(tl), { once: true });
        });
      }, scopeRef.current);
    };

    // Run after LenisScrollProvider has attached the scroller proxy.
    timers.push(window.setTimeout(setup, 0));

    return () => {
      cancelled = true;
      timers.forEach((id) => window.clearTimeout(id));
      ctx?.revert();
    };
  }, []);
}
