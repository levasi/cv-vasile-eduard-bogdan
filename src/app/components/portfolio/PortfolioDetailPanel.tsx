import React, { useCallback, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ArrowUpRight, Minimize2 } from "lucide-react";
import type { Project } from "../../data/portfolio";
import { PortfolioScreenshot } from "../portfolio-screenshot";
import { useLanguage } from "../language-context";
import { useLenisScrollApi } from "../hero/useLenisScroll";
import type { PanelRect } from "./portfolioDetailTypes";
import { usePortfolioDetailExpand } from "./usePortfolioDetailExpand";

type PortfolioDetailPanelProps = {
  project: Project;
  tagLabel: string;
  open: boolean;
  originRect: PanelRect;
  onBackdropClick: () => void;
  onExitComplete: () => void;
};

export function PortfolioDetailPanel({
  project,
  tagLabel,
  open,
  originRect,
  onBackdropClick,
  onExitComplete,
}: PortfolioDetailPanelProps) {
  const { t } = useLanguage();
  const { stopScroll, startScroll } = useLenisScrollApi() ?? {};
  const screenRef = useRef<HTMLDivElement>(null);
  const backdropRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const handleExitComplete = useCallback(() => {
    startScroll?.();
    onExitComplete();
  }, [onExitComplete, startScroll]);

  usePortfolioDetailExpand(
    open,
    originRect,
    project.slug,
    screenRef,
    backdropRef,
    contentRef,
    closeRef,
    handleExitComplete
  );

  useEffect(() => {
    if (open) {
      stopScroll?.();
    }
  }, [open, stopScroll]);

  useEffect(
    () => () => {
      startScroll?.();
    },
    [startScroll]
  );

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onBackdropClick();
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onBackdropClick]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <div
      className={`portfolio-detail-panel${open ? " is-open" : " is-closing"}`}
      aria-hidden={!open}
    >
      <button
        type="button"
        ref={backdropRef}
        className="portfolio-detail-panel__backdrop"
        aria-label={t("portfolioClose")}
        onClick={onBackdropClick}
      />

      <div
        ref={screenRef}
        className="portfolio-detail-panel__screen"
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <div className="portfolio-detail-panel__media" aria-hidden>
          <PortfolioScreenshot
            url={project.url}
            label={project.title}
            customScreenshot={project.screenshot}
            fill
          />
        </div>

        <div className="portfolio-detail-panel__scrim" aria-hidden />

        <button
          ref={closeRef}
          type="button"
          className="portfolio-detail-panel__close"
          aria-label={t("portfolioClose")}
          onClick={onBackdropClick}
        >
          <span className="portfolio-detail-panel__close-icon" aria-hidden>
            <Minimize2 className="h-5 w-5" aria-hidden />
          </span>
        </button>

        <div
          ref={contentRef}
          className="portfolio-detail-panel__body"
          data-lenis-prevent
        >
          <div className="portfolio-detail-panel__body-glass" aria-hidden />
          <div className="portfolio-detail-panel__body-inner">
            <div className="portfolio-detail-panel__meta-tags">
              <span className="portfolio-detail-panel__tag">{tagLabel}</span>
              {project.workInProgress ? (
                <span className="portfolio-detail-panel__tag portfolio-detail-panel__tag--wip">
                  {t("projectStatusWip")}
                </span>
              ) : null}
            </div>

            <div>
              <h3 className="portfolio-detail-panel__title font-display mb-1">{project.title}</h3>
              <p className="portfolio-detail-panel__headline">{project.headline}</p>
            </div>
            <p className="portfolio-detail-panel__description">{project.medium}</p>

            <p className="portfolio-detail-panel__role">
              <h3 className="portfolio-detail-panel__label text-md mb-2 font-display">{t("roleLabel")}</h3>
              {project.role}
            </p>

            <div className="portfolio-detail-panel__highlights">
              <h3 className="portfolio-detail-panel__label text-md mb-2 font-display">{t("technicalHighlightsLabel")}</h3>
              <ul className="pl-0">
                {project.technicalHighlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
            </div>

            <div className="portfolio-detail-panel__tags">
              {project.tags.slice(0, 8).map((tag) => (
                <span key={tag} className="portfolio-detail-panel__chip">
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="portfolio-detail-panel__cta"
            >
              {project.cta}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
