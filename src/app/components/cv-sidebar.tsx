import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./language-context";
import React from "react";
import { portfolioProjects } from "../data/portfolio";
import { personalProjects } from "../data/personal-projects";

const contactInfo = [
  { icon: MapPin, text: "București 040932" },
  { icon: Mail, text: "vasileeduardbogdan@gmail.com", href: "mailto:vasileeduardbogdan@gmail.com" },
  { icon: Phone, text: "0752 383 792", href: "tel:0752383792" },
  { icon: Linkedin, text: "LinkedIn Profile", href: "https://www.linkedin.com/in/vasile-eduard-bogdan" },
  { icon: Github, text: "github.com/levasi", href: "https://github.com/levasi" },
];

const skillGroups = [
  {
    titleKey: "skillsFrontend",
    items: ["React", "Next.js", "Vue.js", "Nuxt.js", "JavaScript", "TypeScript", "HTML", "SCSS"],
  },
  {
    titleKey: "skillsEcommerce",
    items: ["Shopify", "Shopware", "WordPress"],
  },
  {
    titleKey: "skillsUiDesign",
    items: ["Figma", "Storybook", "Adobe XD", "Photoshop"],
  },
  {
    titleKey: "skillsTools",
    items: ["Git", "Webpack", "Jira"],
  },
] as const;

export function CvSidebar() {
  const { t } = useLanguage();
  const projects = portfolioProjects;

  return (
    <aside className="w-full lg:w-[340px] bg-[#1a1a2e] text-white p-8 flex flex-col gap-8 shrink-0">
      {/* Photo */}
      <div className="flex justify-center">
        <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-[#e94560]/40 shadow-lg">
          <ImageWithFallback
            src="/images/me.jpg"
            alt="Vasile Bogdan"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Contact */}
      <div>
        <h3
          className="text-[#e94560] tracking-widest mb-4 pb-2 border-b border-[#e94560]/30"
          style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}
        >
          {t("contact")}
        </h3>
        <ul className="flex flex-col gap-3">
          {contactInfo.map((item) => (
            <li key={item.text} className="flex items-start gap-3">
              <item.icon className="w-4 h-4 text-[#e94560] mt-0.5 shrink-0" />
              {item.href ? (
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors break-all"
                  style={{ fontSize: "0.8rem", lineHeight: 1.5 }}
                >
                  {item.text}
                </a>
              ) : (
                <span className="text-gray-300" style={{ fontSize: "0.8rem", lineHeight: 1.5 }}>
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
          className="text-[#e94560] tracking-widest mb-4 pb-2 border-b border-[#e94560]/30"
          style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}
        >
          {t("skills")}
        </h3>
        <div className="flex flex-col gap-5">
          {skillGroups.map((group) => (
            <div key={group.titleKey}>
              <div className="text-xs font-semibold text-white/80 mb-2 tracking-wide">
                {t(group.titleKey)}
              </div>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-gray-200"
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

      {/* Portfolio link */}
      <div>
        <h3
          className="text-[#e94560] tracking-widest mb-4 pb-2 border-b border-[#e94560]/30"
          style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}
        >
          {t("portfolio")}
        </h3>
        <Link
          to="/portfolio"
          className="text-gray-300 hover:text-[#e94560] transition-colors text-sm"
        >
          {t("viewFullPortfolio")}
        </Link>

        {projects.length > 0 && (
          <ul className="mt-4 flex flex-col gap-2">
            {projects.map((p) => (
              <li key={p.slug}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#e94560] transition-colors"
                  style={{ fontSize: "0.85rem", lineHeight: 1.4 }}
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Personal projects */}
      {personalProjects.length > 0 && (
        <div>
          <h3
            className="text-[#e94560] tracking-widest mb-4 pb-2 border-b border-[#e94560]/30"
            style={{ fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.15em" }}
          >
            <Link to="/personal-projects" className="hover:text-white transition-colors">
              {t("personalProjects")}
            </Link>
          </h3>

          <ul className="flex flex-col gap-2">
            {personalProjects.map((p) => (
              <li key={p.url}>
                <a
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-[#e94560] transition-colors"
                  style={{ fontSize: "0.85rem", lineHeight: 1.4 }}
                >
                  {p.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
