import React from "react";
import { useLanguage } from "../language-context";
import { skillGroups } from "../../data/skills";

export function HeroSkillsBar() {
  const { t } = useLanguage();

  return (
    <div
      data-hero-skills
      className="border-t border-[var(--espresso)]/10 bg-[var(--cream)]/75 opacity-0 backdrop-blur-md"
    >
      <div className="portfolio-container grid grid-cols-2 gap-px lg:grid-cols-4">
        {skillGroups.map(({ icon: Icon, titleKey }) => (
          <div
            key={titleKey}
            className="flex gap-2 justify-center py-4 sm:py-5 lg:border-r lg:border-[var(--espresso)]/8 lg:last:border-r-0 font-display"
            data-hero-skill
          >
            <div className="flex items-center gap-2 text-[var(--sunset-deep)] justify-center">
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--espresso)]/90 sm:text-[11px]">
                {t(titleKey)}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
