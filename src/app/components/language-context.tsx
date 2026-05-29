import React, { createContext, useContext, useState, type ReactNode } from "react";

export type Lang = "en" | "ro";

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: (key: string) => string;
}

const translations: Record<Lang, Record<string, string>> = {
  en: {
    // Nav
    cv: "CV",
    portfolio: "Portfolio",
    viewFullPortfolio: "View full portfolio →",
    personalProjects: "Personal projects",
    projectTagPersonal: "Personal project",
    projectTagWork: "Work project",
    portfolioExpand: "Expand project details",
    portfolioClose: "Close project details",

    // Hero
    heroName: "Vasile Eduard Bogdan",
    heroBrandTagline: "Senior frontend developer",
    heroLine1: "It is not about",
    heroLine2: "the tools",
    heroLine3: "It is about",
    heroLine4: "Who is behind them.",
    heroAccent: "Let's build something together.",
    heroExploreCta: "Explore my work",
    heroPlayReel: "Play reel",
    heroNavWork: "Work",
    heroNavCV: "CV",
    heroQuote: "It's not about the tools; it's about who is behind them.",
    heroQuoteBy: "by Vasile Eduard Bogdan",

    // Portfolio project page
    backToPortfolio: "Back to portfolio",
    projectNotFound: "Project not found.",
    roleLabel: "Role",
    technicalHighlightsLabel: "Technical highlights",
    caseStudyLabel: "Case study",
    nextStepLabel: "Next step",
    sameQualityHeadline: "Want the same level of UI quality?",
    sameQualityPitch:
      "I’m available for senior frontend roles and premium agency work—shipping fast, polished interfaces with clean architecture.",
    // Sidebar
    contact: "Contact",
    skills: "Skills",
    skillsFrontend: "Frontend",
    skillsEcommerce: "Ecommerce",
    skillsUiDesign: "UI & Design",
    skillsTools: "Tools",

    // Main header
    jobTitle: "Senior Frontend Developer",
    summary:
      "Frontend Developer with 8+ years of experience building scalable ecommerce and product interfaces using Vue.js, Nuxt, and any modern frontend technologies. Specialized in responsive UI systems, interactive experiences, and performance-focused frontend architecture with a strong design and UX foundation.",

    // Section titles
    workExperience: "Work Experience",
    education: "Education",
    tools: "Tools:",

    // Buttons
    downloadPdf: "Download PDF",
    generatingPdf: "Generating PDF...",

    // Experience 1
    "exp1.title": "Senior Frontend Developer",
    "exp1.period": "Jun 2021 — Jun 2026",
    "exp1.resp1":
      "Built scalable ecommerce interfaces for high-traffic Shopware storefronts with focus on performance, UX consistency, and maintainable component architecture.",
    "exp1.resp2":
      "Extended the administration of Shopware stores by developing new CMS components, elements, and features.",

    // Experience 2
    "exp2.title": "Frontend Developer",
    "exp2.period": "Mar 2020 — Apr 2021",
    "exp2.desc":
      "Contributed to the development of an online dating application, focusing on user experience, functionality, and performance optimization.",
    "exp2.resp1":
      "Implemented the application's user interface and logical workflow to ensure a seamless and intuitive user experience.",
    "exp2.resp2":
      "Developed and maintained a scalable Storybook-based design system to streamline UI consistency and accelerate development.",

    // Experience 3
    "exp3.title": "Frontend Developer",
    "exp3.period": "May 2018 — Mar 2020",
    "exp3.desc":
      "Contributed to the development of Zion Builder, a custom page builder plugin for WordPress, focused on delivering a flexible and user-friendly site-building experience.",
    "exp3.resp1":
      "Implemented new features and enhanced existing functionality to meet evolving user needs.",
    "exp3.resp2":
      "Translated UI/UX designs into responsive and interactive interfaces.",
    "exp3.resp3":
      "Optimized application performance for faster load times and improved user experience.",

    // Experience 4
    "exp4.title": "Frontend Developer",
    "exp4.period": "May 2016 — Feb 2018",
    "exp4.resp1":
      "Developed fully functional, responsive front-end prototypes aligned with business requirements and design specifications.",

    // Experience 5
    "exp5.title": "3D Designer",
    "exp5.period": "Oct 2014 — May 2016",
    "exp5.resp1":
      "Produced photorealistic 3D renders of exhibition stands for client presentations and marketing materials.",
    "exp5.resp2":
      "Created precise technical drawings to support production and assembly.",
    "exp5.resp3":
      "Designed promotional materials for both print and digital platforms, ensuring brand consistency and visual impact.",

    // Experience 6
    "exp6.title": "DTP Grafician / HTML Editor",
    "exp6.period": "Jul 2012 — Aug 2014",
    "exp6.resp1":
      "Designed graphic assets for advertising materials across print and digital media, aligning with brand and campaign goals.",
    "exp6.resp2":
      "Developed responsive HTML emails for online marketing campaigns, ensuring cross-client compatibility and engagement.",

    // Experience 7
    "exp7.title": "Printer Operator / Graphic Designer",
    "exp7.period": "May 2010 — Jul 2012",
    "exp7.resp1":
      "Handled the design and personalization of promotional materials for various clients in the digital department of an advertising company.",

    // Education
    "edu1.degree": "Web Design",
    "edu2.degree": "Management & Business Administration",
    "edu3.degree": "Math Profile",
    "edu1.institution": "Swiss Web Academy, Bucharest",
    "edu2.institution": "Romanian-American University, Bucharest",
    "edu3.institution": "High School, Brezoi City, Valcea County",
  },
  ro: {
    // Nav
    cv: "CV",
    portfolio: "Portofoliu",
    viewFullPortfolio: "Vezi portofoliul complet →",
    personalProjects: "Proiecte personale",
    projectTagPersonal: "Proiect personal",
    projectTagWork: "Proiect profesional",
    portfolioExpand: "Deschide detaliile proiectului",
    portfolioClose: "Închide detaliile proiectului",

    // Hero
    heroName: "Vasile Eduard Bogdan",
    heroBrandTagline: "Dezvoltator creativ",
    heroLine1: "DESIGN.",
    heroLine2: "CODEZ.",
    heroAccent: "în realitate.",
    heroExploreCta: "Vezi proiectele",
    heroPlayReel: "Vezi reel",
    heroNavWork: "Proiecte",
    heroNavCV: "CV",
    heroQuote: "Nu contează uneltele; contează cine stă în spatele lor.",
    heroQuoteBy: "de Vasile Eduard Bogdan",

    // Portfolio project page
    backToPortfolio: "Înapoi la portofoliu",
    projectNotFound: "Proiectul nu a fost găsit.",
    roleLabel: "Rol",
    technicalHighlightsLabel: "Repere tehnice",
    caseStudyLabel: "Studiu de caz",
    nextStepLabel: "Pasul următor",
    sameQualityHeadline: "Vrei același nivel de calitate UI?",
    sameQualityPitch:
      "Sunt disponibil pentru roluri senior frontend și proiecte premium în agenții—livrând interfețe rapide, finisate și cu arhitectură curată.",
    // Sidebar
    contact: "Contact",
    skills: "Competențe",
    skillsFrontend: "Frontend",
    skillsEcommerce: "E-commerce",
    skillsUiDesign: "UI & Design",
    skillsTools: "Instrumente",

    // Main header
    jobTitle: "Senior Frontend Developer",
    summary:
      "Dezvoltator Frontend cu peste 8 ani de experiență în construirea de interfețe e-commerce și de produs scalabile, folosind Vue.js, Nuxt și orice tehnologii frontend moderne. Specializat în sisteme UI responsive, experiențe interactive și arhitectură frontend orientată pe performanță, cu o bază solidă în design și UX.",

    // Section titles
    workExperience: "Experiență profesională",
    education: "Educație",
    tools: "Instrumente:",

    // Buttons
    downloadPdf: "Descarcă PDF",
    generatingPdf: "Se generează PDF...",

    // Experience 1
    "exp1.title": "Dezvoltator Frontend Senior",
    "exp1.period": "Iun 2021 — Iun 2026",
    "exp1.resp1":
      "Am construit interfețe e-commerce scalabile pentru magazine Shopware cu trafic ridicat, cu focus pe performanță, consistență UX și arhitectură de componente ușor de întenținut.",
    "exp1.resp2":
      "Am extins administrarea magazinelor Shopware prin dezvoltarea de noi componente, elemente și funcționalități CMS.",

    // Experience 2
    "exp2.title": "Dezvoltator Frontend",
    "exp2.period": "Mar 2020 — Apr 2021",
    "exp2.desc":
      "Am contribuit la dezvoltarea unei aplicații de dating online, concentrându-mă pe experiența utilizatorului, funcționalitate și optimizarea performanței.",
    "exp2.resp1":
      "Am implementat interfața aplicației și fluxul logic pentru a asigura o experiență fluidă și intuitivă.",
    "exp2.resp2":
      "Am dezvoltat și întreținut un sistem de design scalabil bazat pe Storybook, pentru a eficientiza consistența UI și a accelera dezvoltarea.",

    // Experience 3
    "exp3.title": "Dezvoltator Frontend",
    "exp3.period": "Mai 2018 — Mar 2020",
    "exp3.desc":
      "Am contribuit la dezvoltarea Zion Builder, un plugin personalizat de page builder pentru WordPress, axat pe oferirea unei experiențe flexibile și ușor de utilizat pentru construirea de site-uri.",
    "exp3.resp1":
      "Am implementat funcționalități noi și am îmbunătățit funcționalitățile existente pentru a răspunde nevoilor tot mai diverse ale utilizatorilor.",
    "exp3.resp2":
      "Am transpus design-urile UI/UX în interfețe responsive și interactive.",
    "exp3.resp3":
      "Am optimizat performanța aplicației pentru timpi de încărcare mai rapizi și o experiență îmbunătățită a utilizatorului.",

    // Experience 4
    "exp4.title": "Dezvoltator Frontend",
    "exp4.period": "Mai 2016 — Feb 2018",
    "exp4.resp1":
      "Am dezvoltat prototipuri front-end complet funcționale și responsive, aliniate cu cerințele de business și specificațiile de design.",

    // Experience 5
    "exp5.title": "Designer 3D",
    "exp5.period": "Oct 2014 — Mai 2016",
    "exp5.resp1":
      "Am realizat randări 3D fotorealiste ale standurilor de expoziție pentru prezentări către clienți și materiale de marketing.",
    "exp5.resp2":
      "Am creat desene tehnice precise pentru a sprijini producția și asamblarea.",
    "exp5.resp3":
      "Am conceput materiale promoționale pentru platforme print și digitale, asigurând consistența brandului și impactul vizual.",

    // Experience 6
    "exp6.title": "Grafician DTP / Editor HTML",
    "exp6.period": "Iul 2012 — Aug 2014",
    "exp6.resp1":
      "Am conceput materiale grafice pentru publicitate în medii print și digitale, aliniate cu brandul și obiectivele campaniilor.",
    "exp6.resp2":
      "Am dezvoltat emailuri HTML responsive pentru campanii de marketing online, asigurând compatibilitatea cross-client și un engagement ridicat.",

    // Experience 7
    "exp7.title": "Operator tipar / Designer grafic",
    "exp7.period": "Mai 2010 — Iul 2012",
    "exp7.resp1":
      "Am gestionat designul și personalizarea materialelor promoționale pentru diverși clienți în departamentul digital al unei companii de publicitate.",

    // Education
    "edu1.degree": "Web Design",
    "edu2.degree": "Management și administrarea afacerilor",
    "edu3.degree": "Profil matematică",
    "edu1.institution": "Swiss Web Academy, București",
    "edu2.institution": "Universitatea Româno-Americană, București",
    "edu3.institution": "Liceu, orașul Brezoi, județul Vâlcea",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  const t = (key: string): string => {
    return translations[lang][key] ?? key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
