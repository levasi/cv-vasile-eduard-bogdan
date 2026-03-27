export type PortfolioItem = {
  label: string;
  url: string;
  /** Optional: custom screenshot URL. If not set, a preview is fetched from the page URL. */
  screenshot?: string;
};

export const portfolioLinks: PortfolioItem[] = [
  { label: "One Man Agency", url: "https://one-man-agency-duf265f37-levasis-projects.vercel.app/" },
  { label: "BrightSmile Dental", url: "https://v0-dental-clinic-website-chi-five.vercel.app/" },
  { label: "Zion Builder", url: "https://zionbuilder.io" },
  { label: "Eutron", url: "https://www.eutron.ro" },
  { label: "Web48", url: "https://www.web48.ro" },
  { label: "CEJ Buc", url: "https://cejbuc.ro" },
  { label: "Höfats", url: "https://hofats.com" },
  { label: "Outstand", url: "https://outstand.ro" },
  { label: "JuristFirme", url: "http://d37.xfactorapp.com/juristfirme" },
  { label: "ProtectiaMuncii", url: "http://d37.xfactorapp.com/protectiamuncii" },
];
