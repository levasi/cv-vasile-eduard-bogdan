import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../language-context";
import { DownloadButton } from "../cv-controls";
import { useCvPdfDownload } from "../cv/useCvPdfDownload";
import { cn } from "../ui/utils";

const navLinks = [
  { key: "heroNavWork", href: "/" },
  { key: "heroNavCV", href: "/cv" },
] as const;

export function HeroNav() {
  const { t } = useLanguage();
  const location = useLocation();
  const { downloading, downloadCv } = useCvPdfDownload();
  const isCv = location.pathname === "/cv";
  const brandTo = isCv ? "/" : "/cv";

  return (
    <header
      data-hero-nav
      className="relative z-20 py-3 header"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="portfolio-container flex items-center justify-between gap-6">
        <Link to={brandTo} className="group flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-sm font-semibold tracking-tight text-white backdrop-blur-md sm:h-12 sm:w-12">
            VB
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="flex shrink-0 items-center gap-0.5 lg:gap-2">
            {navLinks.map(({ key, href }) => {
              const isActive =
                href === "/"
                  ? location.pathname === "/"
                  : location.pathname === href;

              return (
                <Link
                  key={key}
                  to={href}
                  className={cn(
                    "shrink-0 px-1.5 py-1.5 text-[10px] font-medium uppercase tracking-[0.12em] transition-colors sm:px-3 sm:py-2 sm:text-[11px] sm:tracking-[0.2em] lg:px-4",
                    isActive
                      ? "text-white"
                      : "text-white/75 hover:text-white",
                  )}
                  aria-current={isActive ? "page" : undefined}
                >
                  {t(key)}
                </Link>
              );
            })}
          </nav>

          <DownloadButton
            downloading={downloading}
            onClick={() => void downloadCv()}
            variant="dark"
          />
        </div>
      </div>
    </header>
  );
}
