import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../language-context";
import { LanguageToggle } from "../cv-controls";
import { useLenisScrollApi } from "./useLenisScroll";

const navLinks = [
  { key: "heroNavWork", href: "#portfolio-work" },
  { key: "heroNavCV", href: "/cv" },
] as const;

export function HeroNav() {
  const { t } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();
  const { scrollTo } = useLenisScrollApi() ?? {};
  const isCv = location.pathname === "/cv";
  const brandTo = isCv ? "/" : "/cv";
  const resolvedLinks = navLinks.map((l) => {
    if (l.key === "heroNavWork") {
      return { ...l, href: isCv ? "/#portfolio-work" : "#portfolio-work" };
    }
    return l;
  });

  return (
    <header
      data-hero-nav
      className="relative z-20 pt-6"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="portfolio-container flex items-center justify-between gap-6">
        <Link to={brandTo} className="group flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-sm font-semibold tracking-tight text-white backdrop-blur-md sm:h-12 sm:w-12">
            VB
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.22em] text-white sm:text-xs">
              {t("heroName")}
            </span>
            <span className="mt-0.5 block truncate text-[10px] font-medium uppercase tracking-[0.18em] text-white/55 sm:text-[11px]">
              {t("heroBrandTagline")}
            </span>
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden items-center gap-0.5 sm:flex lg:gap-2">
            {resolvedLinks.map(({ key, href, ...rest }) => {
              const external = "external" in rest && rest.external;
              const className =
                "px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white lg:px-4";

              if (external) {
                return (
                  <a key={key} href={href} className={className}>
                    {t(key)}
                  </a>
                );
              }

              if (href.startsWith("#")) {
                return (
                  <a
                    key={key}
                    href={href}
                    className={className}
                    onClick={(e) => {
                      e.preventDefault();
                      if (key === "heroNavWork" && isCv) {
                        navigate("/#portfolio-work");
                        return;
                      }
                      scrollTo?.(href);
                    }}
                  >
                    {t(key)}
                  </a>
                );
              }

              return (
                <Link key={key} to={href} className={className}>
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          <LanguageToggle variant="dark" />
        </div>
      </div>
    </header>
  );
}
