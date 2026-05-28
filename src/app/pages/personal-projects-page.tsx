import React from "react";
import { ArrowUpRight } from "lucide-react";
import { personalProjects } from "../data/portfolio";
import { useLanguage } from "../components/language-context";
import { PortfolioScreenshot } from "../components/portfolio-screenshot";

export function PersonalProjectsPage() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen w-full bg-background" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full px-4 sm:px-6 lg:px-10 py-10 lg:py-14">

        <section className="mt-10">
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
                      <div className="text-sm font-semibold text-foreground truncate group-hover:text-primary transition-colors">
                        {p.title}
                      </div>
                      {p.short && <div className="mt-1 text-xs text-muted-foreground line-clamp-2">{p.short}</div>}
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground group-hover:text-primary shrink-0 transition-colors" />
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

