import React from "react";
import { ArrowUpRight } from "lucide-react";
import { personalProjects } from "../data/personal-projects";
import { useLanguage } from "../components/language-context";
import { PortfolioScreenshot } from "../components/portfolio-screenshot";

export function PersonalProjectsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full bg-neutral-50" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <header className="max-w-[980px]">
          <div className="text-xs uppercase tracking-widest text-neutral-500">{t("personalProjects")}</div>
          <h1
            className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("personalProjectsTitle")}
          </h1>
          <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">{t("personalProjectsLead")}</p>
        </header>

        <section className="mt-10 lg:mt-14">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {personalProjects.map((p) => (
              <li key={p.url}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <PortfolioScreenshot url={p.url} label={p.title} customScreenshot={p.screenshot} />
                  <div className="flex items-start justify-between gap-3 px-4 py-4">
                    <div className="min-w-0">
                      <div className="text-sm font-semibold text-neutral-900 truncate group-hover:text-[#e94560] transition-colors">
                        {p.title}
                      </div>
                      {p.short && <div className="mt-1 text-xs text-neutral-500 line-clamp-2">{p.short}</div>}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#e94560] shrink-0 transition-colors" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

