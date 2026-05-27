export type PortfolioProject = {
  slug: string;
  title: string;
  headline: string;
  url: string;
  screenshot?: string;
  tags: string[];

  // Copy variants
  short: string;
  medium: string;
  premium: string[];

  role: string;
  technicalHighlights: string[];
  cta: string;
  featured?: boolean;
};

export const portfolioProjects: PortfolioProject[] = [
  {
    slug: "zion-builder",
    title: "Zion Builder",
    headline: "Complex product UI, built to stay fast.",
    url: "https://zionbuilder.io",
    screenshot: "/images/zion-screenshot.png",
    tags: ["JavaScript", "Vue.js", "Vuex", "WordPress", "Jira", "Bitbucket", "Git", "Webpack", "AJAX"],
    short:
      "Frontend work on a page builder where the UI has to feel instant—despite heavy customization and complex state.",
    medium:
      "Shipped editor UI improvements and features inside a builder environment, focusing on consistent control patterns and performance-aware rendering as layouts grow.",
    premium: [
      "Page builders are a stress test for frontend: deep component trees, constant state changes, and users pushing the UI in unpredictable ways.",
      "I focused on interaction clarity (controls that behave consistently) and runtime performance (keeping the editor responsive under real workloads).",
      "Delivered reusable UI primitives for panels and controls, and patterns that let new features ship without accumulating one‑off logic.",
    ],
    role: "Frontend Engineer (UI + performance)",
    technicalHighlights: [
      "Consistent control patterns and reusable UI primitives",
      "Performance-aware rendering for complex editor state",
      "UX improvements for common flows (responsive preview, option discovery)",
    ],
    cta: "View product",
    featured: true,
  },
  {
    slug: "hofats",
    title: "Höfats",
    headline: "Premium e-commerce UI with real performance constraints.",
    url: "https://hofats.com",
    screenshot: "/images/hofats.png",
    tags: ["E-commerce", "UI Polish", "Responsive", "Performance", "Interactions"],
    short:
      "E-commerce UI work focused on premium presentation, smooth interactions, and performance on image-heavy pages.",
    medium:
      "Implemented responsive merchandising and product presentation with a high visual standard—balancing polish with fast load times and maintainable patterns.",
    premium: [
      "Premium commerce is a design + engineering problem: heavy media, high expectations, and zero tolerance for jank.",
      "I focused on layout stability, responsive merchandising, and interaction polish—the details that make a shop feel ‘expensive’.",
      "Built with reusable UI patterns so future content changes don’t degrade the design or performance.",
    ],
    role: "Frontend implementation + UI polish",
    technicalHighlights: [
      "Responsive layouts tuned for product storytelling",
      "Stable, performant presentation on media-heavy pages",
      "Interaction details that reinforce hierarchy and trust",
    ],
    cta: "View live",
    featured: true,
  },
  {
    slug: "outstand",
    title: "Outstand",
    headline: "Turning dense services into a clear, credible funnel.",
    url: "https://outstand.ro",
    screenshot: "/images/outstand.png",
    tags: ["Conversion UX", "Content Design", "Responsive", "SEO Hygiene"],
    short:
      "A service-heavy website made easier to scan: clearer hierarchy, stronger trust signals, and a smoother quote-request path.",
    medium:
      "Improved the content structure and UI pacing for compliance services—prioritizing clarity, credibility, and reducing friction in the lead-capture flow.",
    premium: [
      "The challenge wasn’t ‘designing a page’—it was making complex, regulated services understandable in seconds.",
      "I approached it as content design: simplify the story, improve scanability, and make the contact flow feel approachable rather than bureaucratic.",
      "Built long-form layouts with maintainable patterns so the site can grow without turning into a wall of text.",
    ],
    role: "Frontend + content structure",
    technicalHighlights: [
      "Information architecture for service-heavy content",
      "Mobile-first readability and section pacing",
      "CTAs aligned with intent (quote vs call vs messaging)",
    ],
    cta: "View live",
    featured: true,
  },
  {
    slug: "web48",
    title: "Web48",
    headline: "A lightweight agency site built to convert.",
    url: "https://www.web48.ro",
    screenshot: "/images/web48.png",
    tags: ["Landing UX", "Responsive", "Performance", "Motion"],
    short:
      "Agency website built around clear positioning and strong CTAs—fast, responsive, and easy to expand.",
    medium:
      "Implemented a modern marketing layout with confident typography, clean spacing, and interaction polish. Structured pages so services and work can grow without redesign.",
    premium: [
      "Agency sites fail when they’re vague. I treated this as a product page: positioning, proof, and a contact path that’s always one step away.",
      "Interactions are used to guide attention—not distract—and the layout stays readable across devices.",
      "Reusable blocks keep ongoing updates cheap while maintaining a consistent visual standard.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Reusable page blocks for consistent marketing pages",
      "Responsive layout rules that hold up with real content",
      "Interaction polish with minimal UI noise",
    ],
    cta: "View live",
  },
  {
    slug: "cej-buc",
    title: "CEJ Buc",
    headline: "Structured UI for complex information.",
    url: "https://cejbuc.ro",
    screenshot: "/images/cejbuc.png",
    tags: ["Information Architecture", "Responsive", "Accessibility"],
    short:
      "A clean, navigable site for content depth—where structure matters more than effects.",
    medium:
      "Focused on information architecture: readable layouts, consistent components, and navigation that keeps users oriented across many pages.",
    premium: [
      "Content-heavy sites need discipline: consistent patterns, predictable page sections, and typography that stays readable on every device.",
      "I implemented a UI system that supports expansion—new pages fit naturally without visual drift.",
      "The result is calm and professional, optimized for real users trying to find information quickly.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Consistent UI patterns for scalable content",
      "Navigation and layout tuned for readability",
      "Responsive behavior designed for dense pages",
    ],
    cta: "View live",
  },
  {
    slug: "eutron",
    title: "Eutron",
    headline: "Structured content with a clean, maintainable UI system.",
    url: "https://www.eutron.ro",
    screenshot: "/images/eutron.png",
    tags: ["Marketing", "Responsive UI", "Maintainability"],
    short:
      "Corporate site built for clarity: strong hierarchy, simple navigation, and components that scale across pages.",
    medium:
      "Implemented a consistent layout and component set for marketing pages—focused on readability, responsive behavior, and clean implementation for ongoing updates.",
    premium: [
      "This project was about making information feel organized and trustworthy without leaning on heavy effects.",
      "I standardized the UI into reusable sections with predictable spacing and typography so new content remains consistent.",
      "The codebase stays maintainable—future edits don’t require redesigning the page system.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Reusable sections and consistent spacing rules",
      "Responsive typography and layout behavior",
      "Maintainable structure for long-term updates",
    ],
    cta: "View live",
  },
  {
    slug: "juristfirme",
    title: "JuristFirme",
    headline: "High-clarity UI for a trust-sensitive service.",
    url: "http://d37.xfactorapp.com/juristfirme",
    screenshot: "/images/juristfirme.png",
    tags: ["Landing UX", "Forms", "Responsive"],
    short:
      "A service site where clarity and trust matter—clean layout, direct messaging, and frictionless contact.",
    medium:
      "Implemented a conversion-oriented structure with strong hierarchy and short, scannable sections that support decision-making.",
    premium: [
      "Trust-sensitive services don’t need flashy UI—they need structure, clarity, and a feeling of control.",
      "I focused on hierarchy and pacing: short sections, strong headings, and a contact flow that doesn’t overwhelm users.",
      "Built with maintainable components so content changes don’t break the visual standard.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Hierarchy-first layout for high-trust messaging",
      "Responsive structure for quick scanning",
      "Maintainable sections for evolving content",
    ],
    cta: "View live",
  },
];

export function getPortfolioProject(slug: string) {
  return portfolioProjects.find((p) => p.slug === slug);
}
