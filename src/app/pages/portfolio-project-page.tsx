import { Link, useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { PortfolioScreenshot } from "../components/portfolio-screenshot";
import { getPortfolioProject } from "../data/portfolio";
import { useLanguage } from "../components/language-context";

export function PortfolioProjectPage() {
  const { t } = useLanguage();
  const { slug } = useParams();
  const project = slug ? getPortfolioProject(slug) : undefined;

  if (!project) {
    return (
      <div className="min-h-screen w-full bg-neutral-50">
        <div className="w-full px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToPortfolio")}
          </Link>
          <div className="mt-10 text-neutral-800">{t("projectNotFound")}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-neutral-50">
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 lg:py-14">
        <div className="flex items-center justify-between gap-4">
          <Link
            to="/portfolio"
            className="inline-flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t("backToPortfolio")}
          </Link>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-medium text-neutral-800 hover:text-[#e94560] transition-colors"
          >
            {project.cta}
            <ExternalLink className="w-4 h-4" />
          </a>
        </div>

        <header className="mt-10">
          <h1
            className="text-3xl sm:text-4xl font-semibold tracking-tight text-neutral-900"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {project.title}
          </h1>
          <p className="mt-3 text-neutral-600 text-base sm:text-lg">{project.headline}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs px-2.5 py-1 rounded-full bg-white text-neutral-700 shadow-sm border border-neutral-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-10 lg:mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10">
          <div className="lg:col-span-7 bg-white rounded-xl overflow-hidden shadow-sm">
            <PortfolioScreenshot url={project.url} label={project.title} customScreenshot={project.screenshot} />
          </div>

          <aside className="lg:col-span-5">
            <div className="bg-white rounded-xl shadow-sm border border-neutral-100 p-6">
              <div className="text-xs uppercase tracking-widest text-neutral-500">{t("roleLabel")}</div>
              <div className="mt-2 text-sm font-medium text-neutral-900">{project.role}</div>

              <div className="mt-6 text-xs uppercase tracking-widest text-neutral-500">
                {t("technicalHighlightsLabel")}
              </div>
              <ul className="mt-3 space-y-2 text-sm text-neutral-700">
                {project.technicalHighlights.map((h) => (
                  <li key={h} className="leading-relaxed">
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>

        <section className="mt-12 lg:mt-16 max-w-[900px]">
          <div className="text-xs uppercase tracking-widest text-neutral-500">{t("caseStudyLabel")}</div>
          <div className="mt-5 space-y-4 text-neutral-800">
            {project.premium.map((p) => (
              <p key={p} className="leading-relaxed text-base">
                {p}
              </p>
            ))}
          </div>
        </section>

        <section className="mt-12 lg:mt-16">
          <div className="rounded-xl bg-[#1a1a2e] text-white px-6 py-8 sm:px-8 sm:py-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
            <div>
              <div className="text-sm text-white/70">{t("nextStepLabel")}</div>
              <div className="mt-1 text-lg font-semibold tracking-tight">{t("sameQualityHeadline")}</div>
              <div className="mt-2 text-sm text-white/75 max-w-[56ch]">
                {t("sameQualityPitch")}
              </div>
            </div>
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#e94560] text-white text-sm font-medium hover:bg-[#e94560]/90 transition-colors"
            >
              {project.cta}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

