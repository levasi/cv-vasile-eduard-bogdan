import React, { forwardRef } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useLanguage } from "../language-context";
import { useLenisScrollApi } from "./useLenisScroll";

const CONTACT_EMAIL = "vasileeduardbogdan@gmail.com";

function HeroVisual() {
  return (
    <div data-hero-visual className="hero-visual hidden opacity-0 lg:block" aria-hidden>
      <div className="hero-visual__dots" />

      <div className="hero-visual__browser">
        <div className="hero-visual__chrome">
          <span className="hero-visual__chrome-dot" />
          <span className="hero-visual__chrome-dot" />
          <span className="hero-visual__chrome-dot" />
          <span className="hero-visual__chrome-address" />
        </div>
        <div className="hero-visual__canvas">
          <span className="hero-visual__line hero-visual__line--heading" />
          <span className="hero-visual__line" style={{ width: "86%" }} />
          <span className="hero-visual__line" style={{ width: "64%" }} />
          <div className="hero-visual__cta-row">
            <span className="hero-visual__pill hero-visual__pill--solid" />
            <span className="hero-visual__pill" />
          </div>
          <div className="hero-visual__cards">
            <span />
            <span />
            <span />
          </div>
        </div>
      </div>

      <div className="hero-visual__card">
        <span className="hero-visual__swatch" />
        <span className="hero-visual__card-lines">
          <span style={{ width: "5.5rem" }} />
          <span style={{ width: "3.5rem" }} />
        </span>
      </div>
    </div>
  );
}

export const HeroContent = forwardRef<HTMLDivElement>(function HeroContent(_props, ref) {
  const { t } = useLanguage();
  const { scrollTo } = useLenisScrollApi() ?? {};

  return (
    <div
      ref={ref}
      data-hero-content
      className="grid min-h-0 flex-1 content-center gap-12 py-10 lg:grid-cols-[7fr_5fr] lg:items-center lg:gap-20"
    >
      <div className="max-w-2xl">
        <p data-hero-status className="hero-status opacity-0">
          <span className="hero-status__dot" aria-hidden />
          {t("heroStatus")}
        </p>

        <h1 data-hero-title className="hero-title mt-6 opacity-0">
          {t("heroTitleLine1")}
          <br />
          <em className="hero-title__accent">{t("heroTitleLine2")}</em>
        </h1>

        <p data-hero-intro className="hero-lede mt-7 opacity-0 font-mono">
          {t("heroIntro")}
        </p>

        <div data-hero-actions className="mt-10 flex flex-wrap items-center gap-3 opacity-0 sm:gap-4">
          <a
            href="#portfolio-work"
            className="hero-btn hero-btn--primary"
            onClick={(e) => {
              e.preventDefault();
              scrollTo?.("#portfolio-work");
            }}
          >
            {t("heroExploreCta")}
            <ArrowDown className="size-4 shrink-0" aria-hidden />
          </a>
          <a href={`mailto:${CONTACT_EMAIL}`} className="hero-btn hero-btn--ghost">
            {t("heroContactCta")}
            <ArrowUpRight className="size-4 shrink-0" aria-hidden />
          </a>
        </div>
      </div>

      <HeroVisual />
    </div>
  );
});
