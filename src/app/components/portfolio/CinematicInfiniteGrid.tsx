import React, { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "../language-context";
import { projects, type Project } from "../../data/portfolio";
import { PortfolioScreenshot } from "../portfolio-screenshot";

function CinematicCard({ item, tagLabel }: { item: Project; tagLabel: string }) {
  const ref = useRef<HTMLAnchorElement | null>(null);

  return (
    <a
      ref={ref}
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor-text="View"
      className="cine-card group relative block [transform-style:preserve-3d]"
    >
      <span className="cine-card__tag">{tagLabel}</span>

      <div className="cine-card__media">
        <PortfolioScreenshot url={item.url} label={item.title} customScreenshot={item.screenshot} />
        <div className="cine-card__shader" aria-hidden />
      </div>

      <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 transform items-center justify-center gap-2 rounded-xl bg-black/5 px-4 py-2 text-center backdrop-blur-sm">
        <ArrowUpRight className="h-4 w-4 text-white/55 transition-colors group-hover:text-white/85" />
        <div className="text-lg font-medium tracking-tight text-white/85">{item.title}</div>
      </div>
    </a>
  );
}

export function CinematicInfiniteGrid() {
  const { t } = useLanguage();

  return (
    <section id="portfolio-work" className="portfolio-section relative">
      <div className="portfolio-container">
        <div className="portfolio-items">
          {projects.map((it) => (
            <section key={it.slug} className="portfolio-item-section">
              <CinematicCard
                item={it}
                tagLabel={it.kind === "work" ? t("projectTagWork") : t("projectTagPersonal")}
              />
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
