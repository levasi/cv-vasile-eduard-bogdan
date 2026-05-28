import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { PortfolioProject } from "../../data/portfolio";
import { ProjectWorldCard } from "./ProjectWorldCard";
import { ProjectWorldOverlay, type OpenState } from "./ProjectWorldOverlay";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  projects: PortfolioProject[];
};

export function ProjectWorldsSection({ projects }: Props) {
  const gridRef = useRef<HTMLUListElement>(null);
  const [open, setOpen] = useState<OpenState>(null);

  const items = useMemo(() => projects, [projects]);

  useLayoutEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>("[data-world-card]");

      cards.forEach((card) => {
        gsap.set(card, { transformPerspective: 1100, transformOrigin: "50% 50%", rotateX: 8, y: 32, opacity: 0 });

        ScrollTrigger.create({
          trigger: card,
          start: "top 80%",
          once: true,
          onEnter: () => {
            gsap.to(card, { rotateX: 0, y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
          },
        });

        gsap.to(card, {
          y: -10,
          scrollTrigger: {
            trigger: card,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
          ease: "none",
        });
      });
    }, grid);

    return () => ctx.revert();
  }, [items.length]);

  return (
    <>
      <ul ref={gridRef} className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-7">
        {items.map((p) => (
          <li key={p.slug} data-world-card>
            <ProjectWorldCard project={p} onOpenWorld={(project, sourceRect) => setOpen({ project, sourceRect })} />
          </li>
        ))}
      </ul>

      <ProjectWorldOverlay open={open} onClose={() => setOpen(null)} />
    </>
  );
}

