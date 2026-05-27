export type PersonalProject = {
  title: string;
  url: string;
  short?: string;
  screenshot?: string;
};

export const personalProjects: PersonalProject[] = [
  {
    title: "PoetryHub",
    url: "https://poetryhub.ro/",
    screenshot: "/images/poetryhub.png",
    short: "Read, discover, and share poetry—clean typography-first reading experience.",
  },
  {
    title: "Raw Beats",
    url: "https://rawbeats.ro/",
    screenshot: "/images/rawbeats.png",
    short: "Community-first beat marketplace for MCs and producers.",
  },
  {
    title: "One Man Agency",
    url: "https://one-man-agency-duf265f37-levasis-projects.vercel.app/",
    screenshot: "/images/onemanagency.png",
    short: "A minimal portfolio built to feel confident, not loud.",
  },
  {
    title: "BrightSmile Dental",
    url: "https://v0-dental-clinic-website-chi-five.vercel.app/",
    screenshot: "/images/brightsmiledental.png",
    short: "A calm, high-trust marketing site built for bookings.",
  }
];

