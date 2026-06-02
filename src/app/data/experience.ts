export interface ExperienceItem {
  titleKey: string;
  company: string;
  location: string;
  periodKey: string;
  descKey?: string;
  respKeys: string[];
  tools: string;
}

export const experiences: ExperienceItem[] = [
  {
    titleKey: "exp1.title",
    company: "Valantic Romania",
    location: "București",
    periodKey: "exp1.period",
    descKey: "exp1.desc",
    respKeys: ["exp1.resp1", "exp1.resp2"],
    tools: "Shopware, Shopify, JavaScript, TypeScript, Twig Templates, Vue.js, HTML, SCSS, Jira",
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
    tools: "JavaScript, Vue.js, Vuex, WordPress, Jira, Bitbucket, Git, Adobe Photoshop, Adobe XD, Webpack, AJAX",
  },
  {
    titleKey: "exp4.title",
    company: "SC XFACTORAPP SRL",
    location: "București",
    periodKey: "exp4.period",
    descKey: "exp4.desc",
    respKeys: ["exp4.resp1"],
    tools: "HTML/HTML5, CSS3, SCSS, Bootstrap, JavaScript, jQuery",
  },
  {
    titleKey: "exp5.title",
    company: "Connect Promotions",
    location: "București",
    periodKey: "exp5.period",
    descKey: "exp5.desc",
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
