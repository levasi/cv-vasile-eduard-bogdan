import React, { useCallback, useMemo, useRef, useState } from "react";
import { ArrowUpRight, Maximize2 } from "lucide-react";
import { useLanguage } from "../language-context";
import { projects, type Project } from "../../data/portfolio";
import { PortfolioScreenshot } from "../portfolio-screenshot";
import { getProjectGridLayout } from "./portfolioLayout";
import { getProjectPlacements, placementStyle } from "./portfolioGrid";
import { usePortfolioGridColumns } from "./usePortfolioGridColumns";
import { usePortfolioParallax } from "./usePortfolioParallax";
import { PortfolioDetailPanel } from "./PortfolioDetailPanel";
import { rectFromDOM, type PanelRect } from "./portfolioDetailTypes";

function PortfolioCard({
  item,
  tagLabel,
  floatPaused,
  isExpanded,
  speed,
  floatDelay,
  floatDuration,
  onExpand,
}: {
  item: Project;
  tagLabel: string;
  floatPaused: boolean;
  isExpanded: boolean;
  speed: number;
  floatDelay: number;
  floatDuration: number;
  onExpand: (rect: DOMRect) => void;
}) {
  const { t } = useLanguage();
  const cardRef = useRef<HTMLDivElement>(null);

  const handleExpandClick = () => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (rect) onExpand(rect);
  };

  return (
    <div
      className={`portfolio-section__float${floatPaused ? " is-active" : ""}`}
      style={
        {
          "--float-duration": `${floatDuration}s`,
          "--float-delay": `${floatDelay}s`,
        } as React.CSSProperties
      }
    >
      <div ref={cardRef} className="portfolio-section__card group relative flex min-h-0 flex-1 flex-col">
        <span className="portfolio-section__tag">{tagLabel}</span>

        <div className="portfolio-section__media">
          <div
            className="portfolio-section__media-parallax"
            data-portfolio-parallax
            data-speed={speed}
          >
            <PortfolioScreenshot
              url={item.url}
              label={item.title}
              customScreenshot={item.screenshot}
              fill
            />
          </div>
        </div>
        <div className="portfolio-section__shader" aria-hidden />

        <button
          type="button"
          className="portfolio-section__expand"
          onClick={handleExpandClick}
          aria-expanded={isExpanded}
          aria-haspopup="dialog"
          aria-label={`${t("portfolioExpand")}: ${item.title}`}
        >
          <Maximize2 className="h-5 w-5" aria-hidden />
        </button>

        <a
          href={item.url}
          target="_blank"
          rel="noopener noreferrer"
          className="portfolio-section__title"
          aria-label={`${item.cta}: ${item.title}`}
        >
          <ArrowUpRight className="h-4 w-4 shrink-0 text-white/55 transition-colors" aria-hidden />
          <span>{item.title}</span>
        </a>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const columns = usePortfolioGridColumns();
  const gridPlacements = useMemo(
    () => getProjectPlacements(
      projects.map((p) => p.grid),
      columns
    ),
    [columns]
  );
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<PanelRect | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [lockedProjectSlug, setLockedProjectSlug] = useState<string | null>(null);

  usePortfolioParallax(sectionRef, columns);

  const handleExitComplete = useCallback(() => {
    setLockedProjectSlug(null);
    setActiveProject(null);
    setOriginRect(null);
  }, []);

  const closePanel = useCallback(() => {
    setPanelOpen(false);
  }, []);

  const handleExpand = useCallback(
    (project: Project, rect: DOMRect) => {
      if (activeProject?.slug === project.slug && panelOpen) {
        closePanel();
        return;
      }

      setOriginRect(rectFromDOM(rect));
      setActiveProject(project);
      setLockedProjectSlug(project.slug);
      setPanelOpen(true);
    },
    [activeProject, panelOpen, closePanel]
  );

  const activeTagLabel = activeProject
    ? activeProject.kind === "work"
      ? t("projectTagWork")
      : t("projectTagPersonal")
    : "";

  return (
    <section id="portfolio-work" ref={sectionRef} className="portfolio-items-section">
      <div className="portfolio-section__content">
        <div
          className="portfolio-section__grid"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {projects.map((item, index) => {
            const { speed, floatDelay, floatDuration } = getProjectGridLayout(index, item.slug);
            return (
              <div
                key={item.slug}
                className="portfolio-section__cell"
                style={placementStyle(gridPlacements[index])}
              >
                <PortfolioCard
                  item={item}
                  speed={speed}
                  floatDelay={floatDelay}
                  floatDuration={floatDuration}
                  floatPaused={lockedProjectSlug !== null}
                  isExpanded={lockedProjectSlug === item.slug}
                  tagLabel={item.kind === "work" ? t("projectTagWork") : t("projectTagPersonal")}
                  onExpand={(rect) => handleExpand(item, rect)}
                />
              </div>
            );
          })}
        </div>
      </div>

      {activeProject && originRect ? (
        <PortfolioDetailPanel
          project={activeProject}
          tagLabel={activeTagLabel}
          open={panelOpen}
          originRect={originRect}
          onBackdropClick={closePanel}
          onExitComplete={handleExitComplete}
        />
      ) : null}
    </section>
  );
}
