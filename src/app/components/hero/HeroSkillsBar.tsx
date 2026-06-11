import React from "react";
import { useLanguage } from "../language-context";
import { skillGroups } from "../../data/skills";

export function HeroSkillsBar() {
  const { t } = useLanguage();

  return (
    <div data-hero-skills className="border-y border-[var(--dark)]/10">
      <div className="portfolio-container flex flex-wrap items-center justify-center gap-x-4 gap-y-2 py-5 px-2">
        {skillGroups.map(({ titleKey }) => (
          <span
            key={titleKey}
            data-hero-skill
            className="font-display text-[10px] font-medium uppercase tracking-[0.2em] text-[var(--dark)]/55 opacity-0 sm:text-[11px]"
          >
            {t(titleKey)}
          </span>
        ))}
      </div>
    </div>
  );
}
