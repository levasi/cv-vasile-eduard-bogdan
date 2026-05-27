import { Briefcase, GraduationCap, Calendar, MapPin } from "lucide-react";
import { useLanguage } from "./language-context";
import { LanguageToggle, DownloadButton } from "./cv-controls";

interface ExperienceItem {
  titleKey: string;
  company: string;
  location: string;
  periodKey: string;
  descKey?: string;
  respKeys: string[];
  tools: string;
}

const experiences: ExperienceItem[] = [
  {
    titleKey: "exp1.title",
    company: "Valantic Romania",
    location: "București",
    periodKey: "exp1.period",
    respKeys: ["exp1.resp1", "exp1.resp2"],
    tools: "Shopware, Shopify, JavaScript, Twig Templates, Vue.js, HTML, SCSS, Jira",
  },
  {
    titleKey: "exp2.title",
    company: "Encode Expert",
    location: "București",
    periodKey: "exp2.period",
    descKey: "exp2.desc",
    respKeys: ["exp2.resp1", "exp2.resp2"],
    tools: "JavaScript, Vue.js, Vuex, Nuxt, Bootstrap-Vue, Storybook, WebSockets, Figma, Nanocosmos",
  },
  {
    titleKey: "exp3.title",
    company: "STEP TO WEB Agency",
    location: "București",
    periodKey: "exp3.period",
    descKey: "exp3.desc",
    respKeys: ["exp3.resp1", "exp3.resp2", "exp3.resp3"],
    tools: "JavaScript, Vue.js, Vuex, Jira, Bitbucket, Git, Adobe Photoshop, Adobe XD, Webpack, AJAX",
  },
  {
    titleKey: "exp4.title",
    company: "SC XFACTORAPP SRL",
    location: "București",
    periodKey: "exp4.period",
    respKeys: ["exp4.resp1"],
    tools: "HTML/HTML5, CSS3, SCSS, Bootstrap, JavaScript, jQuery",
  },
  {
    titleKey: "exp5.title",
    company: "Connect Promotions",
    location: "București",
    periodKey: "exp5.period",
    respKeys: ["exp5.resp1", "exp5.resp2", "exp5.resp3"],
    tools: "3ds Max, V-Ray, KeyShot, AutoCAD, Adobe Photoshop, Adobe Illustrator",
  },
  {
    titleKey: "exp6.title",
    company: "Ferca Medical",
    location: "Bucharest, Ilfov",
    periodKey: "exp6.period",
    respKeys: ["exp6.resp1", "exp6.resp2"],
    tools: "Adobe Photoshop, Adobe Illustrator, CorelDRAW, InDesign, HTML, CSS, JavaScript",
  },
  {
    titleKey: "exp7.title",
    company: "Easy-Print (Digital Department)",
    location: "Bucharest, Romania",
    periodKey: "exp7.period",
    respKeys: ["exp7.resp1"],
    tools: "",
  },
];

interface EducationItem {
  degreeKey: string;
  institutionKey: string;
  period: string;
}

const education: EducationItem[] = [
  {
    degreeKey: "edu1.degree",
    institutionKey: "edu1.institution",
    period: "2015 — 2016",
  },
  {
    degreeKey: "edu2.degree",
    institutionKey: "edu2.institution",
    period: "2007 — 2011",
  },
  {
    degreeKey: "edu3.degree",
    institutionKey: "edu3.institution",
    period: "2002 — 2006",
  },
];

export function CvMain({ downloading, onDownload }: { downloading: boolean; onDownload: () => void }) {
  const { t } = useLanguage();

  return (
    <main className="flex-1 bg-white p-8 lg:p-12 overflow-y-auto">
      {/* Action Bar */}
      <div className="flex items-center justify-between mb-6">
        <LanguageToggle />
        <DownloadButton downloading={downloading} onClick={onDownload} />
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1
          className="text-[#1a1a2e] mb-1"
          style={{ fontFamily: "'Playfair Display', serif", fontSize: "2.5rem", fontWeight: 700, lineHeight: 1.15 }}
        >
          Vasile Bogdan
        </h1>
        <p
          className="text-[#e94560] mb-4"
          style={{ fontSize: "1.1rem", fontWeight: 500, letterSpacing: "0.05em" }}
        >
          {t("jobTitle")}
        </p>
        <p className="text-gray-600 max-w-2xl" style={{ fontSize: "0.875rem", lineHeight: 1.7 }}>
          {t("summary")}
        </p>
      </header>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-[#e94560]/50 via-[#e94560]/20 to-transparent mb-8" />

      {/* Work Experience */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center">
            <Briefcase className="w-4 h-4 text-[#e94560]" />
          </div>
          <h2
            className="text-[#1a1a2e]"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600 }}
          >
            {t("workExperience")}
          </h2>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-[11px] top-2 bottom-0 w-px bg-[#e94560]/20" />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, index) => (
              <div key={index} className="relative pl-8">
                {/* Timeline dot */}
                <div className="absolute left-[6px] top-1.5 w-3 h-3 rounded-full bg-[#e94560] border-2 border-white shadow-sm" />

                <div className="bg-gray-50/70 rounded-lg p-5 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-2">
                    <div>
                      <h3 className="text-[#1a1a2e]" style={{ fontSize: "1rem", fontWeight: 600 }}>
                        {t(exp.titleKey)}
                      </h3>
                      <p className="text-[#e94560] flex items-center gap-1.5" style={{ fontSize: "0.85rem", fontWeight: 500 }}>
                        {exp.company}
                        <span className="text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span style={{ fontSize: "0.78rem", fontWeight: 400 }}>{exp.location}</span>
                        </span>
                      </p>
                    </div>
                    <span
                      className="flex items-center gap-1.5 text-gray-500 whitespace-nowrap shrink-0"
                      style={{ fontSize: "0.78rem" }}
                    >
                      <Calendar className="w-3 h-3" />
                      {t(exp.periodKey)}
                    </span>
                  </div>

                  {exp.descKey && (
                    <p className="text-gray-600 mb-2" style={{ fontSize: "0.82rem", lineHeight: 1.6 }}>
                      {t(exp.descKey)}
                    </p>
                  )}

                  <ul className="flex flex-col gap-1.5 mb-3">
                    {exp.respKeys.map((key, i) => (
                      <li
                        key={i}
                        className="text-gray-600 flex items-start gap-2"
                        style={{ fontSize: "0.82rem", lineHeight: 1.6 }}
                      >
                        <span className="text-[#e94560] mt-1.5 shrink-0">•</span>
                        {t(key)}
                      </li>
                    ))}
                  </ul>

                  {exp.tools && (
                    <div className="flex items-start gap-2">
                      <span
                        className="text-[#1a1a2e] shrink-0"
                        style={{ fontSize: "0.75rem", fontWeight: 600 }}
                      >
                        {t("tools")}
                      </span>
                      <span className="text-gray-500" style={{ fontSize: "0.75rem" }}>
                        {exp.tools}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Education */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#1a1a2e] flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-[#e94560]" />
          </div>
          <h2
            className="text-[#1a1a2e]"
            style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.4rem", fontWeight: 600 }}
          >
            {t("education")}
          </h2>
        </div>

        <div className="relative">
          <div className="absolute left-[11px] top-2 bottom-0 w-px bg-[#e94560]/20" />

          <div className="flex flex-col gap-5">
            {education.map((edu, index) => (
              <div key={index} className="relative pl-8">
                <div className="absolute left-[6px] top-1.5 w-3 h-3 rounded-full bg-[#e94560]/60 border-2 border-white shadow-sm" />

                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
                  <div>
                    <h3 className="text-[#1a1a2e]" style={{ fontSize: "0.95rem", fontWeight: 600 }}>
                      {t(edu.degreeKey)}
                    </h3>
                    <p className="text-gray-500" style={{ fontSize: "0.82rem" }}>
                      {t(edu.institutionKey)}
                    </p>
                  </div>
                  <span
                    className="flex items-center gap-1.5 text-gray-500 whitespace-nowrap shrink-0"
                    style={{ fontSize: "0.78rem" }}
                  >
                    <Calendar className="w-3 h-3" />
                    {edu.period}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
