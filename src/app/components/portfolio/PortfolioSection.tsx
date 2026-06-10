import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
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
import { Checkbox } from "../ui/checkbox";
import { cn } from "../ui/utils";

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
        <div className="portfolio-section__tags">
          <span className="portfolio-section__tag">{tagLabel}</span>
          {item.workInProgress ? (
            <span className="portfolio-section__tag portfolio-section__tag--wip">{t("projectStatusWip")}</span>
          ) : null}
        </div>

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
          <span className="portfolio-section__title-text text-sm">
            <ArrowUpRight className="portfolio-section__title-icon h-4 w-4 shrink-0" aria-hidden />
            <span>{item.title}</span>
          </span>
        </a>
      </div>
    </div>
  );
}

export function PortfolioSection() {
  const { t } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const columns = usePortfolioGridColumns();
  const [selectedKinds, setSelectedKinds] = useState<("work" | "personal")[]>(["work", "personal"]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => selectedKinds.includes(project.kind));
  }, [selectedKinds]);

  const gridPlacements = useMemo(
    () => getProjectPlacements(
      filteredProjects.map((p) => p.grid),
      columns
    ),
    [columns, filteredProjects]
  );
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [originRect, setOriginRect] = useState<PanelRect | null>(null);
  const [panelOpen, setPanelOpen] = useState(false);
  const [lockedProjectSlug, setLockedProjectSlug] = useState<string | null>(null);

  usePortfolioParallax(sectionRef, columns);

  useEffect(() => {
    if (!activeProject) return;
    if (filteredProjects.some((p) => p.slug === activeProject.slug)) return;
    setPanelOpen(false);
    setLockedProjectSlug(null);
    setActiveProject(null);
    setOriginRect(null);
  }, [activeProject, filteredProjects]);

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
      <div className="pt-6 justify-center flex flex-wrap items-center gap-2">
        {(() => {
          const allChecked = selectedKinds.length === 2;
          return (
            <label
              key="all"
              className={cn(
                "inline-flex cursor-pointer select-none items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-colors",
                allChecked
                  ? "border-white/25 bg-white/12 text-white"
                  : "border-white/12 bg-white/6 text-white/70 hover:bg-white/10 hover:text-white/85",
              )}
            >
              <Checkbox
                checked={allChecked}
                onCheckedChange={(next) => {
                  if (next === true) setSelectedKinds(["work", "personal"]);
                }}
                aria-label={t("filterAll")}
                className="border-white/25 data-[state=checked]:bg-[rgba(var(--gold-rgb),0.9)] data-[state=checked]:border-[rgba(var(--gold-rgb),0.9)]"
              />
              <span>{t("filterAll")}</span>
            </label>
          );
        })()}

        {(["work", "personal"] as const).map((kind) => {
          const checked = selectedKinds.includes(kind);
          const label = kind === "work" ? t("workProjects") : t("personalProjects");

          return (
            <label
              key={kind}
              className={cn(
                "inline-flex cursor-pointer select-none items-center gap-2 rounded-full border px-3 py-1.5 text-[11px] font-semibold tracking-wide transition-colors",
                checked
                  ? "border-white/25 bg-white/12 text-white"
                  : "border-white/12 bg-white/6 text-white/70 hover:bg-white/10 hover:text-white/85",
              )}
            >
              <Checkbox
                checked={checked}
                onCheckedChange={(next) => {
                  const nextChecked = next === true;
                  setSelectedKinds((prev) => {
                    if (nextChecked) return prev.includes(kind) ? prev : [...prev, kind];
                    const nextKinds = prev.filter((k) => k !== kind);
                    // Keep at least one kind selected
                    return nextKinds.length === 0 ? prev : nextKinds;
                  });
                }}
                aria-label={label}
                className="border-white/25 data-[state=checked]:bg-[rgba(var(--gold-rgb),0.9)] data-[state=checked]:border-[rgba(var(--gold-rgb),0.9)]"
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
      <div className="portfolio-section__content">
        <div
          className="portfolio-section__grid"
          style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        >
          {filteredProjects.map((item, index) => {
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
