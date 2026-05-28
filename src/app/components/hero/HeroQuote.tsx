import React from "react";
import { useLanguage } from "../language-context";

export function HeroQuote() {
  const { t } = useLanguage();

  return (
    <aside
      data-hero-quote
      className="pointer-events-none hidden max-w-[22rem] flex-col justify-end opacity-0 lg:flex xl:max-w-[26rem]"
      style={{ fontFamily: "'Inter', sans-serif" }}
      aria-hidden
    >
      <div className="mb-auto" />

      <blockquote className="relative pl-6">
        <span
          className="absolute left-0 top-0 font-serif text-5xl leading-none text-[#F5C76B]"
          style={{ fontFamily: "'Playfair Display', serif" }}
          aria-hidden
        >
          “
        </span>
        <p className="text-sm leading-relaxed text-white/85 sm:text-[15px]">{t("heroQuote")}</p>
        <footer
          className="hero-script-text mt-4 text-2xl leading-none"
          style={{ fontFamily: "'Caveat', cursive" }}
        >
          → {t("heroQuoteBy")}
        </footer>
      </blockquote>

      <div className="mt-10 flex items-center gap-3 text-[10px] font-medium uppercase tracking-[0.22em] text-white/45">
        <span className="flex h-9 w-5 items-start justify-center rounded-full border border-white/25 pt-1.5">
          <span className="h-1.5 w-1 rounded-full bg-white/50 animate-bounce" />
        </span>
        {t("heroScrollHint")}
      </div>
    </aside>
  );
}
