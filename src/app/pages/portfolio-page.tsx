import { ExternalLink } from "lucide-react";
import { useLanguage } from "../components/language-context";
import { PortfolioScreenshot } from "../components/portfolio-screenshot";
import { portfolioLinks } from "../data/portfolio";

export function PortfolioPage() {
  const { t } = useLanguage();

  return (
    <div
      className="min-h-screen w-full bg-neutral-50"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <header className="mb-10 lg:mb-14">
          <h1
            className="text-2xl font-semibold tracking-tight text-neutral-900 mb-1"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("portfolio")}
          </h1>
          <p className="text-neutral-500 text-sm">
            {t("portfolioIntro")}
          </p>
        </header>

        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
          {portfolioLinks.map((link) => (
            <li key={link.url}>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <PortfolioScreenshot
                  url={link.url}
                  label={link.label}
                  customScreenshot={link.screenshot}
                />
                <div className="flex items-center justify-between gap-2 px-3 py-3">
                  <span className="text-sm font-medium text-neutral-800 truncate group-hover:text-[#e94560] transition-colors">
                    {link.label}
                  </span>
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-400 group-hover:text-[#e94560] shrink-0 transition-colors" />
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
