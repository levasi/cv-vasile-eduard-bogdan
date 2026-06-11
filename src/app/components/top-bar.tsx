import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "./language-context";
import { FileText, Briefcase } from "lucide-react";

const navItems = [
  { path: "/", labelKey: "portfolio", icon: Briefcase },
  { path: "/cv", labelKey: "cv", icon: FileText },
] as const;

export function TopBar() {
  const location = useLocation();
  const { t } = useLanguage();
  const isDarkHero = location.pathname === "/";

  if (location.pathname === "/" || location.pathname === "/cv") {
    return null;
  }

  return (
    <header
      className={`w-full sticky top-0 z-50 border-b backdrop-blur-xl ${isDarkHero
        ? "bg-[var(--espresso)]/90 text-[var(--cream)] border-white/10"
        : "bg-background/70 text-foreground border-border"
        }`}
    >
      <nav className="max-w-[1100px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          {navItems.map(({ path, labelKey, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-xs  transition-colors uppercase tracking-widest
                  ${isActive
                    ? isDarkHero
                      ? "text-white"
                      : "text-primary-foreground"
                    : isDarkHero
                      ? "text-[#94A3B8]"
                      : "text-muted-foreground"
                  }
                `}
              >
                {t(labelKey)}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
