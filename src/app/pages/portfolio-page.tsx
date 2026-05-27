import React from "react";
import { useMemo, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { PortfolioScreenshot } from "../components/portfolio-screenshot";
import { portfolioProjects } from "../data/portfolio";
import { useLanguage } from "../components/language-context";

export function PortfolioPage() {
  const { t } = useLanguage();
  const [activeTag, setActiveTag] = useState<string>("All");

  const tags = useMemo(() => {
    const all = new Set<string>();
    portfolioProjects.forEach((p) => p.tags.forEach((t) => all.add(t)));
    return ["All", ...Array.from(all).sort((a, b) => a.localeCompare(b))];
  }, []);

  const featured = useMemo(() => portfolioProjects.filter((p) => p.featured), []);
  const filtered = useMemo(() => {
    if (activeTag === "All") return portfolioProjects;
    return portfolioProjects.filter((p) => p.tags.includes(activeTag));
  }, [activeTag]);

  return (
    <div
      className="min-h-screen w-full bg-neutral-50"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <header className="max-w-[980px]">
          <div className="text-xs uppercase tracking-widest text-neutral-500">{t("portfolioKicker")}</div>
          <h1
            className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {t("portfolioTitle")}
          </h1>
          <p className="mt-4 text-neutral-600 text-base sm:text-lg leading-relaxed">
            {t("portfolioLead")}
          </p>
        </header>

        {/* Featured */}
        <section className="mt-10 lg:mt-14">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featured.map((p) => (
              <a
                key={p.slug}
                href={p.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <PortfolioScreenshot url={p.url} label={p.title} customScreenshot={p.screenshot} />
                <div className="p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div className="min-w-0">
                      <div className="text-base font-semibold text-neutral-900 truncate group-hover:text-[#e94560] transition-colors">
                        {p.title}
                      </div>
                      <div className="mt-1 text-sm text-neutral-600 line-clamp-2">{p.headline}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#e94560] transition-colors shrink-0" />
                  </div>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-neutral-50 text-neutral-700 border border-neutral-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Filters */}
        <section className="mt-10 lg:mt-14">
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const active = tag === activeTag;
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setActiveTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${active
                      ? "bg-[#1a1a2e] border-[#1a1a2e] text-white"
                      : "bg-white border-neutral-200 text-neutral-700 hover:border-neutral-300"
                    }`}
                >
                  {tag === "All" ? t("all") : tag}
                </button>
              );
            })}
          </div>
        </section>

        {/* Grid */}
        <section className="mt-6">
          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 lg:gap-6">
            {filtered.map((p) => (
              <li key={p.slug}>
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
                      <div className="mt-1 text-xs text-neutral-500 line-clamp-2">{p.short}</div>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-neutral-400 group-hover:text-[#e94560] shrink-0 transition-colors" />
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* CTA */}
        <section className="mt-12 lg:mt-16">
          <div className="rounded-xl bg-[#1a1a2e] text-white px-6 py-8 sm:px-8 sm:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <div className="text-sm text-white/70">{t("openToRemote")}</div>
              <div className="mt-1 text-lg font-semibold tracking-tight">{t("rolesHeadline")}</div>
              <div className="mt-2 text-sm text-white/75 max-w-[64ch]">
                {t("contactPitch")}
              </div>
            </div>
            <a
              href="mailto:vasileeduardbogdan@gmail.com"
              className="inline-flex items-center justify-center px-4 py-2 rounded-lg bg-[#e94560] text-white text-sm font-medium hover:bg-[#e94560]/90 transition-colors"
            >
              {t("emailMe")}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
