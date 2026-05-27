import { Mail, Phone, MapPin, Linkedin, Github } from "lucide-react";
import { Link } from "react-router-dom";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useLanguage } from "./language-context";

const contactInfo = [
  { icon: MapPin, text: "București 040932" },
  { icon: Mail, text: "vasileeduardbogdan@gmail.com", href: "mailto:vasileeduardbogdan@gmail.com" },
  { icon: Phone, text: "0752 383 792", href: "tel:0752383792" },
  { icon: Linkedin, text: "LinkedIn Profile", href: "https://www.linkedin.com/in/vasile-eduard-bogdan" },
  { icon: Github, text: "github.com/levasi", href: "https://github.com/levasi" },
];

const skills = [
  { name: "JavaScript", years: 12 },
  { name: "Vue.js", years: 8 },
  { name: "Nuxt.js", years: 6 },
  { name: "HTML5", years: 14 },
  { name: "CSS3 / SCSS", years: 10 },
  { name: "Shopware", years: 5 },
  { name: "Shopify", years: 2 },
  { name: "Storybook", years: 1 },
  { name: "Webpack", years: 2 },
  { name: "Git / Bitbucket", years: 8 },
  { name: "Figma / Adobe XD", years: 6 },
  { name: "Adobe Photoshop", years: 12 },
  { name: "Adobe Illustrator", years: 4 },
  { name: "3ds Max / V-Ray", years: 2 },
  { name: "Jira", years: 7 },
];

const MAX_YEARS = 14;

export function CvSidebar() {
  const { t } = useLanguage();

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
        <div className="flex flex-col gap-3">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex items-center justify-between mb-1">
                <span className="text-gray-200" style={{ fontSize: "0.8rem" }}>
                  {skill.name}
                </span>
                <span className="text-[#e94560]/80" style={{ fontSize: "0.7rem", fontWeight: 500 }}>
                  {skill.years} {skill.years === 1 ? t("yr") : t("yrs")}
                </span>
              </div>
              <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#e94560] to-[#e94560]/60 rounded-full"
                  style={{ width: `${(skill.years / MAX_YEARS) * 100}%` }}
                />
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
      </div>
    </aside>
  );
}
