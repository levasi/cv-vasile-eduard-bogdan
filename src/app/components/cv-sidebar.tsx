import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "./language-context";
import React from "react";
import { personalProjects, workProjects } from "../data/portfolio";
import { skillGroups } from "../data/skills";
import { useCvDesktopLayout } from "./cv/cv-layout-context";
import { cn } from "./ui/utils";

const contactInfo = [
  { icon: MapPin, text: "București 040932" },
  { icon: Mail, text: "vasileeduardbogdan@gmail.com", href: "mailto:vasileeduardbogdan@gmail.com" },
  { icon: Phone, text: "0752 383 792", href: "tel:0752383792" },
  { icon: Linkedin, text: "LinkedIn Profile", href: "https://www.linkedin.com/in/vasile-eduard-bogdan" },
  { icon: Github, text: "github.com/levasi", href: "https://github.com/levasi" },
];

export function CvSidebar() {
  const { t } = useLanguage();
  const projects = workProjects;
  const isDesktopLayout = useCvDesktopLayout();

  return (
    <aside
      className={cn(
        "text-sidebar-foreground flex flex-col gap-8 shrink-0 border-border",
        isDesktopLayout
          ? "w-[340px] border-r p-8"
          : "w-full border-b p-4 lg:w-[340px] lg:border-b-0 lg:border-r lg:p-8",
      )}
    >
      {/* Contact */}
      <div>
        <h3
          className="text-primary tracking-widest mb-4 pb-2 border-b border-border"
          style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}
        >
          {t("contact")}
        </h3>
        <ul className="flex flex-col gap-3">
          {contactInfo.map((item) => (
            <li key={item.text} className="flex items-start gap-3">
              <item.icon className="w-4 h-4 text-primary mt-0.5 shrink-0" />
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-foreground transition-colors break-all"
                  style={{ fontSize: "0.8rem", lineHeight: 1.5 }}
                >
                  {item.text}
                </a>
              ) : (
                <span className="text-muted-foreground" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
                  {item.text}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      {/* Skills */}
      <div>
        <h3
          className="text-primary tracking-widest mb-4 pb-2 border-b border-border"
          style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}
        >
          {t("skills")}
        </h3>
        <div className="flex flex-col gap-5">
          {skillGroups.map((group) => (
            <div key={group.titleKey}>
              <div className="text-xs font-semibold text-foreground/80 mb-2 tracking-wide">
                {t(group.titleKey)}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-full bg-white border border-border"
                    style={{ fontSize: "0.75rem" }}
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Personal projects */}
      {personalProjects.length > 0 && (
        <div>
          <h3
            className="text-primary tracking-widest mb-4 pb-2 border-b border-border"
            style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}
          >
            <Link to="/#portfolio-work" className="hover:text-foreground transition-colors">
              {t("personalProjects")}
            </Link>
          </h3>

          <ul className="flex flex-col gap-2">
            {personalProjects.map((p) => (
              <li key={p.slug}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  style={{ fontSize: "0.85rem", lineHeight: 1.4 }}
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Work projects */}
      <div>
        <h3
          className="text-primary tracking-widest mb-4 pb-2 border-b border-border"
          style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}
        >
          {t("workProjects")}
        </h3>

        {projects.length > 0 && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {projects.map((p) => (
              <li key={p.slug} className="">
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors"
                  style={{ fontSize: "0.85rem", lineHeight: 1.4 }}
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Online portfolio */}
      <div>
        <h3
          className="text-primary tracking-widest mb-4 pb-2 border-b border-border"
          style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}
        >
          {t("onlinePortfolio")}
        </h3>
        <a
          href="https://cv-vasile-eduard-bogdan.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-muted-foreground hover:text-primary transition-colors break-all"
          style={{ fontSize: "0.85rem", lineHeight: 1.4 }}
        >
          cv-vasile-eduard-bogdan.vercel.app
        </a>
      </div>
    </aside>
  );
}
