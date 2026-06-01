import React, { forwardRef } from "react";
import { ArrowDown } from "lucide-react";
import { useLanguage } from "../language-context";
import { useLenisScrollApi } from "./useLenisScroll";

function HeroLetters({ text, lineIndex }: { text: string; lineIndex: number }) {
  return (
    <>
      {text.split("").map((ch, idx) => {
        const isSpace = ch === " ";

        if (isSpace) {
          return (
            <span
              key={`${lineIndex}-${idx}`}
              className="hero-headline-letter--space inline-block"
              aria-hidden
            >
              {"\u00A0"}
            </span>
          );
        }

        return (
          <span
            key={`${lineIndex}-${idx}`}
            data-hero-letter
            data-line={lineIndex}
            className="hero-headline-letter opacity-0 "
          >
            {ch}
          </span>
        );
      })}
    </>
  );
}

export const HeroContent = forwardRef<HTMLDivElement>(function HeroContent(_props, ref) {
  const { t } = useLanguage();
  const { scrollTo } = useLenisScrollApi() ?? {};
  const lines = [t("heroLine1"), t("heroLine2"), t("heroLine3"), t("heroLine4")];
  const fullHeadline = `${lines.join(" ")} ${t("heroAccent")}`;

  return (
    <div
      ref={ref}
      className="flex min-h-0 flex-1 flex-col justify-center overflow-visible"
      data-hero-content
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <h1
        className="hero-headline max-w-4xl text-[clamp(2rem,5.2vw,4rem)] uppercase leading-[1.06]"
        aria-label={fullHeadline}
      >
        <span className="sr-only">{fullHeadline}</span>
        <span aria-hidden className="block">
          {lines.map((line, lineIndex) => (
            <span key={lineIndex} className="block">
              <HeroLetters text={line} lineIndex={lineIndex} />
            </span>
          ))}
        </span>
      </h1>
      <span
        data-hero-accent
        className="hero-accent-text hero-script-text mt-6 block w-fit max-w-full text-[clamp(1.75rem,4.5vw,3.25rem)] opacity-0"
        aria-hidden
      >
        {t("heroAccent")}
      </span>
      <div className="mt-8 flex flex-wrap items-center gap-4 sm:mt-10 sm:gap-5">
        <a
          data-hero-cta
          href="#portfolio-work"
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-full border border-white/70 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white transition-colors hover:bg-white/10 sm:text-xs"
          onClick={(e) => {
            e.preventDefault();
            scrollTo?.("#portfolio-work");
          }}
        >
          {t("heroExploreCta")}
          <ArrowDown className="size-3.5 shrink-0 opacity-90" aria-hidden />
        </a>
      </div>
    </div>
  );
});
