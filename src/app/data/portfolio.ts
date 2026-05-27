export type PortfolioItem = {
  label: string;
  url: string;
  /** Optional: custom screenshot URL. If not set, a preview is fetched from the page URL. */
  screenshot?: string;
};

export const portfolioLinks: PortfolioItem[] = [
  { label: "One Man Agency", url: "https://one-man-agency-duf265f37-levasis-projects.vercel.app/", screenshot: "/images/onemanagency.png" },
  { label: "BrightSmile Dental", url: "https://v0-dental-clinic-website-chi-five.vercel.app/", screenshot: "/images/brightsmiledental.png" },
  { label: "Zion Builder", url: "https://zionbuilder.io", screenshot: "/images/zion-screenshot.png" },
  { label: "Eutron", url: "https://www.eutron.ro", screenshot: "/images/eutron.png" },
  { label: "Web48", url: "https://www.web48.ro", screenshot: "/images/web48.png" },
  { label: "CEJ Buc", url: "https://cejbuc.ro", screenshot: "/images/cejbuc.png" },
  { label: "Höfats", url: "https://hofats.com", screenshot: "/images/hofats.png" },
  { label: "Outstand", url: "https://outstand.ro", screenshot: "/images/outstand.png" },
  { label: "JuristFirme", url: "http://d37.xfactorapp.com/juristfirme", screenshot: "/images/juristfirme.png" },
];
