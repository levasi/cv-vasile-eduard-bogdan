import React from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "./language-context";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { experiences, type ExperienceDescLink } from "../data/experience";
import { useCvDesktopLayout } from "./cv/cv-layout-context";
import { cn } from "./ui/utils";

function CvExplicitLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary underline-offset-2 hover:underline cv-explicit-link"
    >
      {children}
      <span className="cv-explicit-link__url"> ({href})</span>
    </a>
  );
}

function parseTools(tools: string) {
  return tools
    .split(",")
    .map((tool) => tool.trim())
    .filter(Boolean);
}

function renderDescWithLinks(text: string, links?: ExperienceDescLink[]) {
  if (!links?.length) {
    return text;
  }

  const pattern = new RegExp(
    `(${links.map((link) => link.text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`,
    "g",
  );
  const parts = text.split(pattern);

  return parts.map((part, index) => {
    const link = links.find((item) => item.text === part);
    if (!link) {
      return part;
    }

    return <CvExplicitLink key={index} href={link.url}>{part}</CvExplicitLink>;
  });
}

export function CvMain() {
  const { t } = useLanguage();
  const isDesktopLayout = useCvDesktopLayout();

  return (
    <main
      className={cn(
        "flex-1 overflow-y-auto",
        isDesktopLayout ? "p-12" : "p-2 lg:p-8",
      )}
    >
      {/* Header */}
      <header className="mb-8">
        <div
          className={cn(
            "flex gap-6",
            isDesktopLayout
              ? "flex-row items-start"
              : "flex-col items-center sm:flex-row sm:items-center",
          )}
        >
          <div
            className={cn(
              "h-32 w-32 shrink-0 overflow-hidden rounded-full border-4 border-primary/20 shadow-sm",
              isDesktopLayout ? "h-40 w-40" : "lg:h-40 lg:w-40",
            )}
          >
            <ImageWithFallback
              src="/images/me.jpg"
              alt="Vasile Bogdan"
              className="h-full w-full object-cover"
            />
          </div>

          <div
            className={cn(
              "min-w-0 flex-1",
              isDesktopLayout ? "text-left" : "text-center sm:text-left",
            )}
          >

            <h1
              className="text-foreground mb-1"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.15 }}
            >
              Vasile Bogdan
            </h1>
            <p
              className="text-primary mb-4"
              style={{ fontSize: "1.1rem", fontWeight: 500, letterSpacing: "0.05em" }}
            >
              {t("jobTitle")}
            </p>
            <p className="text-muted-foreground max-w-2xl" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>
              {t("summary")}
            </p>
          </div>
        </div>
      </header>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-primary/40 via-primary/10 to-transparent mb-8" />

      {/* Work Experience */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-foreground flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-background" />
          </div>
          <h2
            className="text-foreground"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600 }}
          >
            {t("workExperience")}
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className={cn("flex flex-col")}>
            {experiences.map((exp, index) => (
              <div key={index} className={cn("relative")}>
                {/* Timeline dot */}
                <div className="rounded-lg lg:p-5 p-2 transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-4">
                    <div>
                      <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-0.5">
                        <h3 className="text-foreground font-display" style={{ fontSize: "1.2rem", letterSpacing: "0.03em", fontWeight: 600 }}>
                          {t(exp.titleKey)}
                        </h3>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span style={{ fontSize: "0.78rem", fontWeight: 400 }}>{exp.location}</span>
                        </span>
                      </div>
                      <p className="text-primary flex flex-wrap items-center gap-x-1.5 gap-y-1" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {exp.companyUrl ? (
                          <CvExplicitLink href={exp.companyUrl}>{exp.company}</CvExplicitLink>
                        ) : (
                          exp.company
                        )}
                        {exp.projectLink && (
                          <>
                            <span className="text-muted-foreground" aria-hidden>
                              ·
                            </span>
                            <CvExplicitLink href={exp.projectLink.url}>{exp.projectLink.text}</CvExplicitLink>
                          </>
                        )}
                      </p>
                    </div>
                    <span
                      className="flex items-center gap-1.5 text-muted-foreground whitespace-nowrap shrink-0"
                      style={{ fontSize: "0.78rem" }}
                    >
                      <Calendar className="w-3 h-3" />
                      {t(exp.periodKey)}
                    </span>
                  </div>

                  {exp.descKey && (
                    <p className="text-muted-foreground mb-2" style={{ fontSize: "0.82rem", lineHeight: 1.6 }}>
                      {renderDescWithLinks(t(exp.descKey), exp.descLinks)}
                    </p>
                  )}

                  <ul className="flex flex-col gap-1.5 mb-3">
                    {exp.respKeys.map((key, i) => (
                      <li
                        key={i}
                        className="text-muted-foreground flex items-start gap-2"
                        style={{ fontSize: "0.82rem", lineHeight: 1.6 }}
                      >
                        <span className="text-primary shrink-0">•</span>
                        {t(key)}
                      </li>
                    ))}
                  </ul>

                  {exp.tools && (
                    <div className="mt-1">
                      <span
                        className="text-foreground block mb-2"
                        style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.04em" }}
                      >
                        {t("technologies")}
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {parseTools(exp.tools).map((tool) => (
                          <span key={tool} className="cv-tool-pill">
                            {tool}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                {index < experiences.length - 1 && (
                  <hr className="my-2 lg:my-4 border-border" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
