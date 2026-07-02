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
    workProjects: "Work projects",
    filterAll: "All",
    onlinePortfolio: "Online portfolio",
    viewFullPortfolio: "View full portfolio →",
    personalProjects: "Personal projects",
    projectTagPersonal: "Personal project",
    projectTagWork: "Work project",
    projectStatusWip: "Work in progress",
    portfolioExpand: "Expand project details",
    portfolioClose: "Close project details",

    // Hero
    heroName: "Vasile Eduard Bogdan",
    heroBrandTagline: "Senior frontend developer",
    heroStatus: "Available for new projects",
    heroTitleLine1: "Digital experiences,",
    heroTitleLine2: "crafted with care.",
    heroIntro:
      "I'm Eduard, a frontend developer building performant, accessible and engaging interfaces — from design systems to interactive product experiences.",
    heroContactCta: "Get in touch",
    heroExploreCta: "View projects",
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
    skillsHeading: "Skills",
    toolsHeading: "Tools",
    skillsFrontend: "Frontend",
    skillsEcommerce: "Ecommerce",
    skillsUiDesign: "UI & Design",
    skillsMotionDesign: "Motion design",
    languagesHeading: "Languages",
    "lang.ro.name": "Romanian",
    "lang.ro.level": "Native",
    "lang.en.name": "English",
    "lang.en.level": "Advanced",

    // Main header
    jobTitle: "Senior Frontend Developer",
    summary:
      "Creative frontend developer focused on building high-performance web experiences, scalable UI systems, and modern applications with Vue, React, JavaScript, and AI-assisted development tools.",

    // Section titles
    workExperience: "Work Experience",
    education: "Education",
    technologies: "Technologies:",

    // Buttons
    downloadPdf: "CV",
    generatingPdf: "Generating PDF...",

    // Experience 1
    "exp1.title": "Senior Frontend Developer",
    "exp1.period": "Jun 2021 — Jun 2026",
    "exp1.desc":
      "Valantic is a software development and digital transformation company that builds web applications, e-commerce platforms, business software, and digital solutions for large international clients.",
    "exp1.resp1":
      "Delivered scalable ecommerce solutions using Shopware and Shopify for enterprise clients with a focus on storefront performance and custom extensions.",
    "exp1.resp2":
      "Built high-traffic Shopware storefronts with scalable interfaces emphasizing performance, UX consistency, and maintainable component architecture.",
    "exp1.resp3":
      "Developed custom Shopware plugins, CMS components, and scalable ecommerce features to enhance platform functionality and streamline content management workflows.",

    // Experience 2
    "exp2.title": "Frontend Developer",
    "exp2.period": "Mar 2020 — Apr 2021",
    "exp2.desc":
      "Web platform providing live, user-driven digital experiences.",
    "exp2.resp1":
      "Developed and maintained responsive Vue.js/Nuxt applications for a large-scale consumer platform with a focus on performance, real-time interactions, and user engagement.",
    "exp2.resp2":
      "Collaborated with designers, backend developers, and product stakeholders to build reusable UI components and application workflows for delivering new features.",
    "exp2.resp3":
      "Improved UI consistency, scalability, and development efficiency across the platform by contributing to a Storybook-based design system.",
    "exp2.resp4":
      "Optimized frontend performance for seamless user experiences across devices by integrating real-time functionality using WebSockets.",
    "exp2.resp5":
      "Ensured high-quality and reliable product through participation in code reviews, debugging, and continuous improvements.",

    // Experience 3
    "exp3.title": "Frontend Developer",
    "exp3.period": "May 2018 — Mar 2020",
    "exp3.desc":
      "Digital agency developing custom WordPress solutions, including Zion Builder, a visual page builder focused on flexible website creation and user experience.",
    "exp3.resp1":
      "Contributed to the development of Zion Builder, a custom page builder plugin for WordPress, emphasizing flexibility and user-friendliness.",
    "exp3.resp2":
      "Implemented new features and enhanced existing functionality to align with user requirements.",
    "exp3.resp3":
      "Created responsive interfaces based on design requirements.",
    "exp3.resp4":
      "Enhanced application performance and user engagement.",

    // Experience 4
    "exp4.title": "Frontend Developer",
    "exp4.period": "May 2016 — Feb 2018",
    "exp4.desc":
      "Custom software development company building web and mobile applications for businesses across multiple industries.",
    "exp4.resp1":
      "Converted business requirements and design specifications into responsive front-end prototypes for web applications.",
    "exp4.resp2":
      "Aligned fully functional, responsive front-end prototypes with business requirements and design specifications.",

    // Experience 5
    "exp5.title": "3D Designer",
    "exp5.period": "Oct 2014 — May 2016",
    "exp5.desc":
      "Designed exhibition stands and promotional visuals for clients, combining 3D visualization, technical documentation, and brand-consistent marketing assets.",
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
      "Handled design and personalization of promotional materials for various clients in the digital department of an advertising company.",

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
    workProjects: "Proiecte profesionale",
    filterAll: "Toate",
    onlinePortfolio: "Portofoliu online",
    viewFullPortfolio: "Vezi portofoliul complet →",
    personalProjects: "Proiecte personale",
    projectTagPersonal: "Proiect personal",
    projectTagWork: "Proiect profesional",
    projectStatusWip: "În lucru",
    portfolioExpand: "Deschide detaliile proiectului",
    portfolioClose: "Închide detaliile proiectului",

    // Hero
    heroName: "Vasile Eduard Bogdan",
    heroBrandTagline: "Dezvoltator creativ",
    heroStatus: "Disponibil pentru proiecte noi",
    heroTitleLine1: "Experiențe digitale,",
    heroTitleLine2: "construite cu grijă.",
    heroIntro:
      "Sunt Eduard, dezvoltator frontend — construiesc interfețe performante, accesibile și captivante, de la design systems la experiențe interactive de produs.",
    heroContactCta: "Hai să vorbim",
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
    skillsHeading: "Competențe",
    toolsHeading: "Instrumente",
    skillsFrontend: "Dezvoltare frontend",
    skillsEcommerce: "E-commerce",
    skillsUiDesign: "UI & Design",
    skillsMotionDesign: "Motion design",
    languagesHeading: "Limbi",
    "lang.ro.name": "Română",
    "lang.ro.level": "Nativ",
    "lang.en.name": "Engleză",
    "lang.en.level": "Avansat",

    // Main header
    jobTitle: "Senior Frontend Developer",
    summary:
      "Dezvoltator Frontend cu peste 8 ani de experiență în construirea de interfețe e-commerce și de produs scalabile, folosind Vue.js, Nuxt și orice tehnologii frontend moderne. Specializat în sisteme UI responsive, experiențe interactive și arhitectură frontend orientată pe performanță, cu o bază solidă în design și UX.",

    // Section titles
    workExperience: "Experiență profesională",
    education: "Educație",
    technologies: "Tehnologii:",

    // Buttons
    downloadPdf: "CV",
    generatingPdf: "Se generează PDF...",

    // Experience 1
    "exp1.title": "Dezvoltator Frontend Senior",
    "exp1.period": "Iun 2021 — Iun 2026",
    "exp1.desc":
      "Am livrat soluții e-commerce scalabile pe Shopware și Shopify pentru clienți enterprise, cu focus pe performanța magazinelor, extensii personalizate ale platformei și arhitectură frontend ușor de întenținut.",
    "exp1.resp1":
      "Am livrat soluții e-commerce scalabile folosind Shopware și Shopify pentru clienți enterprise, cu focus pe performanța magazinelor și extensii personalizate.",
    "exp1.resp2":
      "Am construit magazine Shopware cu trafic ridicat și interfețe scalabile, cu accent pe performanță, consistență UX și arhitectură de componente ușor de întenținut.",
    "exp1.resp3":
      "Am dezvoltat plugin-uri Shopware personalizate, componente CMS și funcționalități e-commerce scalabile pentru a extinde funcționalitatea platformei și a eficientiza fluxurile de management al conținutului.",

    // Experience 2
    "exp2.title": "Dezvoltator Frontend",
    "exp2.period": "Mar 2020 — Apr 2021",
    "exp2.desc":
      "Platformă web care oferă experiențe digitale live, conduse de utilizatori.",
    "exp2.resp1":
      "Am dezvoltat și întreținut aplicații responsive Vue.js/Nuxt pentru o platformă consumer la scară largă, cu accent pe performanță, interacțiuni în timp real și implicarea utilizatorilor.",
    "exp2.resp2":
      "Am colaborat cu designeri, dezvoltatori backend și stakeholderi de produs pentru a construi componente UI reutilizabile și fluxuri de aplicație pentru livrarea de funcționalități noi.",
    "exp2.resp3":
      "Am îmbunătățit consistența UI, scalabilitatea și eficiența dezvoltării pe platformă prin contribuția la un sistem de design bazat pe Storybook.",
    "exp2.resp4":
      "Am optimizat performanța frontend pentru experiențe fluide pe toate dispozitivele, integrând funcționalitate în timp real folosind WebSockets.",
    "exp2.resp5":
      "Am asigurat un produs de înaltă calitate și fiabil prin participarea la code review-uri, debugging și îmbunătățiri continue.",

    // Experience 3
    "exp3.title": "Dezvoltator Frontend",
    "exp3.period": "Mai 2018 — Mar 2020",
    "exp3.desc":
      "Agenție digitală care dezvoltă soluții WordPress personalizate, inclusiv Zion Builder, un page builder vizual axat pe crearea flexibilă de site-uri web și experiența utilizatorului.",
    "exp3.resp1":
      "Am contribuit la dezvoltarea Zion Builder, un plugin personalizat de page builder pentru WordPress, punând accent pe flexibilitate și ușurința în utilizare.",
    "exp3.resp2":
      "Am implementat funcționalități noi și am îmbunătățit funcționalitățile existente pentru a răspunde cerințelor utilizatorilor.",
    "exp3.resp3":
      "Am creat interfețe responsive conform cerințelor de design.",
    "exp3.resp4":
      "Am îmbunătățit performanța aplicației și implicarea utilizatorilor.",

    // Experience 4
    "exp4.title": "Dezvoltator Frontend",
    "exp4.period": "Mai 2016 — Feb 2018",
    "exp4.desc":
      "Companie de dezvoltare software personalizat care construiește aplicații web și mobile pentru afaceri din multiple industrii.",
    "exp4.resp1":
      "Am transformat cerințele de business și specificațiile de design în prototipuri front-end responsive pentru aplicații web.",
    "exp4.resp2":
      "Am aliniat prototipurile front-end complet funcționale și responsive cu cerințele de business și specificațiile de design.",

    // Experience 5
    "exp5.title": "Designer 3D",
    "exp5.period": "Oct 2014 — Mai 2016",
    "exp5.desc":
      "Am proiectat standuri de expoziție și materiale promoționale pentru clienți, combinând vizualizare 3D, documentație tehnică și resurse de marketing aliniate brandului.",
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
