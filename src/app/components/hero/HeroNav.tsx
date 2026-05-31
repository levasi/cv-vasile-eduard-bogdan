import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../language-context";
import { LanguageToggle, DownloadButton } from "../cv-controls";
import { useCvPdfDownload } from "../cv/useCvPdfDownload";

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
      className="relative z-20 pt-6"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="portfolio-container flex items-center justify-between gap-6">
        <Link to={brandTo} className="group flex min-w-0 items-center gap-3 sm:gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 bg-white/10 text-sm font-semibold tracking-tight text-white backdrop-blur-md sm:h-12 sm:w-12">
            VB
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <nav className="hidden items-center gap-0.5 sm:flex lg:gap-2">
            {navLinks.map(({ key, href }) => (
              <Link
                key={key}
                to={href}
                className="px-3 py-2 text-[11px] font-medium uppercase tracking-[0.2em] text-white/75 transition-colors hover:text-white lg:px-4"
              >
                {t(key)}
              </Link>
            ))}
          </nav>

          <DownloadButton
            downloading={downloading}
            onClick={() => void downloadCv()}
            variant="dark"
          />

          <LanguageToggle variant="dark" />
        </div>
      </div>
    </header>
  );
}
