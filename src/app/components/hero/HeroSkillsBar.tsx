import React from "react";
import { useLanguage } from "../language-context";
import { skillGroups } from "../../data/skills";

export function HeroSkillsBar() {
  const { t } = useLanguage();

  return (
    <div
      data-hero-skills
      className="border-t border-white/10 bg-[#1a120c]/55 opacity-0 backdrop-blur-md"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="portfolio-container grid grid-cols-2 gap-px lg:grid-cols-4">
        {skillGroups.map(({ icon: Icon, titleKey, items }) => (
          <div
            key={titleKey}
            className="flex flex-col gap-2 px-5 py-4 sm:px-6 sm:py-5 lg:border-r lg:border-white/8 lg:last:border-r-0"
            data-hero-skill
          >
            <div className="flex items-center gap-2 text-[#F5C76B]">
              <Icon className="h-4 w-4 shrink-0" strokeWidth={1.75} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/90 sm:text-[11px]">
                {t(titleKey)}
              </span>
            </div>
            <p className="text-[11px] leading-relaxed text-white/55 sm:text-xs">{items.join(" · ")}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
