export interface ExperienceDescLink {
  text: string;
  url: string;
}

export interface ExperienceItem {
  titleKey: string;
  company: string;
  companyUrl?: string;
  projectLink?: ExperienceDescLink;
  location: string;
  periodKey: string;
  descKey?: string;
  descLinks?: ExperienceDescLink[];
  respKeys: string[];
  tools: string;
}

export const experiences: ExperienceItem[] = [
  {
    titleKey: "exp1.title",
    company: "Valantic Romania",
    companyUrl: "https://www.valantic.com/en/cities/iasi/",
    location: "Bucharest",
    periodKey: "exp1.period",
    descKey: "exp1.desc",
    respKeys: ["exp1.resp1", "exp1.resp2", "exp1.resp3"],
    tools: "Shopware, Shopify, JavaScript, Twig Templates, Vue.js, HTML, SCSS, Jira",
  },
  {
    titleKey: "exp2.title",
    company: "Encode Expert",
    companyUrl: "https://www.encodexpert.com/",
    location: "Bucharest",
    periodKey: "exp2.period",
    descKey: "exp2.desc",
    respKeys: ["exp2.resp1", "exp2.resp2", "exp2.resp3", "exp2.resp4", "exp2.resp5"],
    tools: "JavaScript, Vue, Nuxt.js, Bootstrap-Vue, Storybook, WebSockets, Figma, Nanocosmos",
  },
  {
    titleKey: "exp3.title",
    company: "STEP TO WEB Agency",
    location: "Bucharest",
    periodKey: "exp3.period",
    descKey: "exp3.desc",
    projectLink: { text: "Zion Builder", url: "https://zionbuilder.io/" },
    respKeys: ["exp3.resp1", "exp3.resp2", "exp3.resp3", "exp3.resp4"],
    tools: "JavaScript, Vue.js, Vuex, WordPress, Jira, Bitbucket, Git, Adobe Photoshop, Adobe XD, Webpack, AJAX",
  },
  {
    titleKey: "exp4.title",
    company: "XfactorApp",
    companyUrl: "https://xfactorapp.com/",
    location: "Bucharest",
    periodKey: "exp4.period",
    descKey: "exp4.desc",
    respKeys: ["exp4.resp1", "exp4.resp2"],
    tools: "HTML/HTML5, CSS3, SCSS, Bootstrap, JavaScript, jQuery",
  },
  {
    titleKey: "exp5.title",
    company: "Connect Promotions",
    companyUrl: "https://connect-promotion.ro/",
    location: "Bucharest",
    periodKey: "exp5.period",
    descKey: "exp5.desc",
    respKeys: ["exp5.resp1", "exp5.resp2", "exp5.resp3"],
    tools: "3ds Max, V-Ray, KeyShot, AutoCAD, Adobe Photoshop, Adobe Illustrator",
  },
  {
    titleKey: "exp6.title",
    company: "Ferca Medical",
    companyUrl: "https://ferca.ro/",
    location: "Bucharest",
    periodKey: "exp6.period",
    respKeys: ["exp6.resp1", "exp6.resp2"],
    tools: "Adobe Photoshop, Adobe Illustrator, CorelDRAW, InDesign, HTML, CSS, JavaScript",
  },
  {
    titleKey: "exp7.title",
    company: "Easy-Print (Digital Department)",
    companyUrl: "https://www.easy-print.ro/",
    location: "Bucharest",
    periodKey: "exp7.period",
    respKeys: ["exp7.resp1"],
    tools: "",
  },
];
