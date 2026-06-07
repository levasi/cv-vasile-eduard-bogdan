export type ProjectKind = "work" | "personal";

/**
 * Tile size on the portfolio bento grid (12 columns on desktop).
 * Set `columns` / `rows` to control how many tracks the card spans.
 * Optional `column` / `row` pin a tile to a 1-based start line (desktop layout).
 */
export type ProjectGrid = {
  columns: number;
  rows: number;
  column?: number;
  row?: number;
};

export type Project = {
  slug: string;
  kind: ProjectKind;
  title: string;
  headline: string;
  url: string;
  screenshot?: string;
  tags: string[];
  short: string;
  medium: string;
  premium: string[];
  role: string;
  technicalHighlights: string[];
  cta: string;
  featured?: boolean;
  workInProgress?: boolean;
  /** Bento grid footprint — spans are relative to a 12-column desktop grid */
  grid: ProjectGrid;
};

export const projects: Project[] = [
  {
    slug: "zion-builder",
    kind: "work",
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
    grid: { columns: 6, rows: 3 },
  },
  {
    slug: "raw-beats",
    kind: "personal",
    title: "Raw Beats",
    headline: "Community-first beat marketplace for MCs and producers.",
    url: "https://rawbeats.ro/",
    screenshot: "/images/rawbeats.png",
    tags: ["Personal project", "Community", "Marketplace"],
    short: "Community-first beat marketplace for MCs and producers.",
    medium:
      "A marketplace-style experience focused on discovery, previews, and a clear path from browsing beats to contacting creators.",
    premium: [
      "Built around fast scanning: strong cards, clear metadata, and a UI that supports repeat visits.",
      "Prioritized mobile usability and performance for media-heavy listings.",
    ],
    role: "Personal build (design + frontend)",
    technicalHighlights: ["Listing-first UX", "Media-heavy responsive UI", "Conversion-friendly contact flows"],
    cta: "View live",
    grid: { columns: 6, rows: 3 },
  },
  {
    slug: "poetryhub",
    kind: "personal",
    title: "PoetryHub",
    headline: "Typography-first poetry reading and discovery.",
    url: "https://poetryhub.ro/",
    screenshot: "/images/poetryhub.png",
    tags: ["Personal project", "Reading", "Typography"],
    short: "Read, discover, and share poetry—clean typography-first reading experience.",
    medium:
      "A reading-focused product built around calm layouts, clear hierarchy, and a lightweight publishing flow for poems and authors.",
    premium: [
      "Designed for long-form reading: generous spacing, strong typographic rhythm, and minimal UI noise.",
      "Built end-to-end with a focus on discoverability and a simple path from browsing to saving or sharing.",
    ],
    role: "Personal build (design + frontend)",
    technicalHighlights: ["Reading-first layout system", "Responsive typography", "Lightweight content browsing"],
    cta: "View live",
    grid: { columns: 6, rows: 3 },
  },
  {
    slug: "music-visualizer",
    kind: "personal",
    title: "Music Visualizer",
    headline: "Layer-based music visualizer studio with real-time audio reactivity.",
    url: "https://musicvisualizer-one.vercel.app/",
    screenshot: "/images/music-visualizer.png",
    tags: ["Personal project", "Nuxt 3", "Vue 3", "TypeScript", "Tailwind CSS", "Web Audio API"],
    short:
      "Upload a track, compose image and text layers, tune audio reactivity, and export a synced WebM—or embed the visualizer anywhere.",
    medium:
      "A full studio editor with image and text layer stacks, custom frequency bands, beat detection, and audio-reactive modulations—backed by cloud project saves and guest mode.",
    premium: [
      "Built as a product, not a demo: projects persist to SQLite, layers bind to kick/snare/hi-hat bands, and export records the full visualization with synced audio.",
      "Composable layer editor with drag-and-drop ordering, per-parameter easing, and embed routes via Vue component, iframe postMessage, and a web component.",
      "Real-time FFT, BPM estimation, and optional Essentia.js analysis drive musical layer motion instead of generic waveform wobble.",
    ],
    role: "Personal build (design + full-stack frontend)",
    technicalHighlights: [
      "Layer-based editor with image/text stacks and audio-driven parameter modulations",
      "Interactive frequency spectrum with custom bands driving layer modulations",
      "Embeddable via Vue component, iframe, web component, and postMessage API",
    ],
    cta: "View live",
    workInProgress: true,
    grid: { columns: 6, rows: 3 },
  },
  {
    slug: "dacia-1310",
    kind: "personal",
    title: "Dacia 1310",
    headline: "Romania's everyday icon, told as a scroll-driven 3D story.",
    url: "https://animations-ashen-chi.vercel.app/",
    screenshot: "/images/dacia-1310.png",
    tags: ["Personal project", "Scroll-driven", "Three.js", "3D", "Interactive storytelling"],
    short:
      "A scroll-driven visual story about the car that carried families, workers, students, and memories across Romania for more than two decades.",
    medium:
      "An editorial experience pairing serif typography with a central 3D Dacia 1310 model—section timeline, orbit controls, and scroll-triggered storytelling from intro through decades of everyday use.",
    premium: [
      "Built as a cinematic landing page, not a static brochure: scroll progress drives the narrative while the car stays present as the visual anchor.",
      "Minimal chrome keeps focus on typography and the model—timeline dots, section labels, and subtle UI for orbit and year context.",
      "Designed to feel like a museum exhibit on the web: calm palette, strong hierarchy, and motion that supports reading rather than distracting from it.",
    ],
    role: "Personal build (design + frontend)",
    technicalHighlights: [
      "Scroll-driven section narrative with timeline navigation",
      "Interactive 3D model presentation with optional orbit mode",
      "Editorial typography and restrained UI for long-form storytelling",
    ],
    cta: "View live",
    grid: { columns: 6, rows: 3 },
  },
  {
    slug: "hofats",
    kind: "work",
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
    grid: { columns: 2, rows: 3 },
  },
  {
    slug: "prym",
    kind: "work",
    title: "Prym",
    headline: "Consumer brand storefront for sewing and craft.",
    url: "https://www.prym.com/en/",
    screenshot: "/images/prym.png",
    tags: ["E-commerce", "Consumer brand", "Responsive", "Catalog UX"],
    short:
      "Frontend work on Prym’s consumer shop—collections, brand worlds, and product discovery for sewing and DIY audiences.",
    medium:
      "Built customer-facing UI for a heritage craft brand: category browsing, collection pages, and promotional surfaces that stay clear across devices.",
    premium: [
      "Consumer craft retail mixes inspiration and utility—users need fast paths to products without losing the brand story.",
      "Focused on scannable collection layouts, consistent product cards, and stable performance on image-rich pages.",
      "Reusable patterns so seasonal campaigns and new collections ship without redesigning the storefront shell.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Collection- and brand-driven navigation",
      "Product listing UX for a broad craft catalog",
      "Responsive layouts for marketing and shop flows",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "awg-mode",
    kind: "work",
    title: "AWG Mode",
    headline: "Family fashion e-commerce at scale.",
    url: "https://www.awg-mode.de/",
    screenshot: "/images/awgmode.png",
    tags: ["E-commerce", "Responsive", "Catalog UX", "Performance"],
    short:
      "Frontend work on a large family-fashion shop—clear category paths, promotional surfaces, and a storefront that stays fast with heavy imagery.",
    medium:
      "Built and refined customer-facing UI for a full-sortiment retailer: category navigation, campaign banners, and product discovery flows tuned for mobile and desktop.",
    premium: [
      "Retail at this scale means predictable patterns: promos, category grids, and account flows that cannot break when merchandising changes weekly.",
      "Focused on layout stability, scannable category entry points, and performance on image-heavy listing and campaign pages.",
      "Patterns stay maintainable so marketing and catalog updates ship without one-off page rebuilds.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Category-first navigation for a broad catalog",
      "Campaign and promo surfaces integrated into the shop shell",
      "Responsive, media-heavy layouts with stable performance",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "ingun",
    kind: "work",
    title: "INGUN",
    headline: "B2B product catalog UI for precision test technology.",
    url: "https://ingun.com/",
    screenshot: "/images/ingun.png",
    tags: ["B2B", "Product catalog", "Responsive", "Technical content"],
    short:
      "Frontend work on a global B2B site for test probes and fixtures—structured product discovery and clear technical storytelling.",
    medium:
      "Implemented customer-facing UI for a complex industrial catalog: product families, application areas, and content-heavy pages that stay scannable for engineers and buyers.",
    premium: [
      "B2B hardware sites need clarity over flash: dense specs, many product lines, and trust signals for a global engineering audience.",
      "Focused on consistent navigation, readable technical layouts, and reusable page patterns as the catalog grows.",
      "Built for maintainability so new product lines and regions can ship without breaking the design system.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Structured navigation across a large technical product catalog",
      "Content-heavy layouts tuned for scanning and credibility",
      "Reusable components for product and application pages",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },

  {
    slug: "dr-spiller",
    kind: "work",
    title: "Dr. Spiller",
    headline: "Premium skincare storefront with guided product discovery.",
    url: "https://dr-spiller.com/en/",
    screenshot: "/images/drspiller.png",
    tags: ["E-commerce", "Beauty", "Responsive", "Product advisor"],
    short:
      "Frontend work on a German skincare brand shop—product lines, routines, and an online skin consultant for personalized recommendations.",
    medium:
      "Implemented customer-facing UI for a premium cosmetics catalog: category navigation, product families, and content that explains complex care systems without overwhelming shoppers.",
    premium: [
      "Beauty e-commerce needs trust and clarity—ingredient stories, skin-type paths, and a calm visual tone that matches a professional brand.",
      "Focused on scannable product hierarchies, campaign surfaces, and flows that connect education to purchase.",
      "Maintainable patterns so new lines and seasonal campaigns integrate cleanly into the storefront.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Product-line navigation across a large skincare catalog",
      "Guided discovery flows (skin advisor, routines)",
      "Responsive, image-rich layouts with a premium brand feel",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "collectif-mon-amour",
    kind: "work",
    title: "Collectif mon Amour",
    headline: "Sustainable fashion e-commerce from Zurich.",
    url: "https://collectifmonamour.com/",
    screenshot: "/images/collectifmonamour.png",
    tags: ["E-commerce", "Fashion", "Sustainability", "Shopify"],
    short:
      "Frontend work on a Swiss sustainable womenswear shop—collections, capsule drops, and a storefront built for brand storytelling and conversion.",
    medium:
      "Implemented customer-facing UI for an independent fashion label: category browsing, campaign pages, and product discovery tuned for a premium, color-forward brand.",
    premium: [
      "Fashion retail needs strong visuals without sacrificing clarity—collections, sizing, and sustainability messaging must scan fast on mobile.",
      "Focused on consistent product cards, promotional surfaces, and layouts that support frequent collection updates.",
      "Patterns stay maintainable so new capsules and seasonal campaigns ship without rebuilding the shop shell.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Collection-driven navigation for a fashion catalog",
      "Campaign and storytelling layouts for brand launches",
      "Responsive, image-forward e-commerce UI",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "pentagast",
    kind: "work",
    title: "PENTAGAST",
    headline: "B2B catalog UI for professional kitchen equipment.",
    url: "https://www.pentagast.de/",
    screenshot: "/images/pentagast.png",
    tags: ["B2B", "E-commerce", "Gastronomy", "Product catalog"],
    short:
      "Frontend work on Germany’s leading hospitality equipment network—product discovery, categories, and trade-focused shop flows.",
    medium:
      "Implemented customer-facing UI for a large B2B catalog: commercial kitchen technology, tableware, and accessories with clear navigation for professional buyers.",
    premium: [
      "Hospitality wholesale needs dense catalogs without chaos—SKU-heavy listings, technical categories, and trust for business customers.",
      "Focused on structured navigation, readable product detail patterns, and layouts that scale across hundreds of brands.",
      "Maintainable components so new product lines and campaigns integrate without breaking the shop experience.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Multi-category B2B product navigation",
      "Trade-focused listing and product detail UX",
      "Responsive layouts for catalog-heavy pages",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "funken",
    kind: "work",
    title: "FUNKEN",
    headline: "B2B site for plastic exhaust air systems.",
    url: "https://www.funken.de/en/",
    screenshot: "/images/funken.png",
    tags: ["B2B", "Industrial", "Product catalog", "Responsive"],
    short:
      "Frontend work on a German manufacturer site—product families, technical catalog, and clear paths for engineers and planners.",
    medium:
      "Implemented customer-facing UI for industrial ventilation products: fans, fittings, and custom systems with structured navigation and download-ready technical content.",
    premium: [
      "Industrial B2B sites need precision over marketing fluff—product lines, specs, and catalog access must be obvious for technical buyers.",
      "Focused on consistent product presentation, sidebar navigation, and layouts that support bilingual content.",
      "Reusable patterns so new products and documentation integrate without redesigning the site shell.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Product-family navigation for technical equipment",
      "Catalog and download flows for planners",
      "Responsive B2B layouts with clear hierarchy",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "cornelsen",
    kind: "work",
    title: "Cornelsen",
    headline: "Educational publishing portal for teachers and learners.",
    url: "https://www.cornelsen.de/",
    screenshot: "/images/cornelsen.png",
    tags: ["Education", "Publishing", "Digital products", "Responsive"],
    short:
      "Frontend work on a leading German education publisher—subject worlds, services, and paths for teachers, schools, and digital learning products.",
    medium:
      "Implemented customer-facing UI for a large educational brand: structured content hubs, registration flows, and navigation across print and digital offerings.",
    premium: [
      "Education platforms serve many audiences—teachers, students, and institutions—each needing fast access without drowning in catalog depth.",
      "Focused on clear topic navigation, service entry points, and layouts that scale across subjects and product types.",
      "Maintainable patterns so campaigns, anniversaries, and new digital products integrate cleanly into the portal.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Multi-audience navigation for education content",
      "Topic and service hub layouts",
      "Responsive UI for content-heavy publishing pages",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "tropy",
    kind: "work",
    title: "tropy",
    headline: "Exotic fruit and specialty food e-commerce.",
    url: "https://www.tropy.de/",
    screenshot: "/images/tropy.png",
    tags: ["E-commerce", "Food", "Shopify", "Responsive"],
    short:
      "Frontend work on a German specialty food shop—exotic fruits, vegetables, and boxes with a playful brand and clear category navigation.",
    medium:
      "Implemented customer-facing UI for a fresh-produce retailer: category menus, seasonal campaigns, and product discovery tuned for mobile ordering.",
    premium: [
      "Food e-commerce needs appetite and clarity—seasonal heroes, category paths, and trust signals without slowing checkout.",
      "Focused on campaign layouts, scannable listings, and consistent product cards across fruits, boxes, and bulk.",
      "Maintainable patterns so seasonal drops and new categories ship without redesigning the storefront.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Category-first navigation for perishable products",
      "Seasonal campaign and hero layouts",
      "Responsive, image-forward shop UI",
    ],
    cta: "View live",
    grid: { columns: 5, rows: 3 },
  },
  {
    slug: "normbau",
    kind: "work",
    title: "NORMBAU",
    headline: "B2B site for barrier-free sanitary and hardware systems.",
    url: "https://www.normbau.de/en/",
    screenshot: "/images/normbau.png",
    tags: ["B2B", "Manufacturing", "Product catalog", "Accessibility"],
    short:
      "Frontend work on a German manufacturer portal—product series, planning support, and clear navigation for architects, planners, and facility buyers.",
    medium:
      "Implemented customer-facing UI for inclusive bathroom and building hardware: product families, technical content, and structured paths for professional specification.",
    premium: [
      "Specification-driven B2B needs trust and standards clarity—product lines, DIN context, and downloads must be easy for planners on any device.",
      "Focused on series-based navigation, consistent product presentation, and layouts that support bilingual content.",
      "Maintainable patterns so new product lines and documentation integrate without redesigning the site shell.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Product-series navigation for building hardware",
      "Technical and planning-oriented content layouts",
      "Responsive B2B UI with clear hierarchy",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "oetker",
    kind: "work",
    title: "Dr. Oetker",
    headline: "Brand shop for baking, desserts, and kitchen essentials.",
    url: "https://www.oetker-shop.de/",
    screenshot: "/images/oetker.png",
    tags: ["E-commerce", "Food", "Consumer brand", "Responsive"],
    short:
      "Frontend work on the Dr. Oetker online shop—baking mixes, utensils, seasonal campaigns, and a catalog built for repeat purchase.",
    medium:
      "Implemented customer-facing UI for a major FMCG brand store: category navigation, promotional carousels, and product discovery across food and non-food lines.",
    premium: [
      "FMCG shops need familiarity and speed—trusted categories, seasonal heroes, and loyalty cues without cluttering checkout.",
      "Focused on campaign carousels, theme worlds, and consistent product cards across a wide assortment.",
      "Maintainable patterns so launches, limited editions, and sales integrate cleanly into the storefront.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Multi-category navigation for food and accessories",
      "Seasonal campaign and hero carousel layouts",
      "Responsive e-commerce UI for a household brand",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "flaschenland",
    kind: "work",
    title: "Flaschenland",
    headline: "Packaging e-commerce with configurable products.",
    url: "https://www.flaschenland.de/",
    screenshot: "/images/flaschenland.png",
    tags: ["E-commerce", "B2B", "Product configurator", "Responsive"],
    short:
      "Frontend work on a bottles-and-jars shop—2,500+ SKUs, variant configuration, tier pricing, and flows for private and wholesale buyers.",
    medium:
      "Implemented customer-facing UI for a packaging retailer: category filters, product configurators, and detail pages that surface specs, closures, and bulk pricing.",
    premium: [
      "Packaging catalogs are specification-heavy—volume, mouth type, closures, and tier prices must stay scannable for both hobbyists and business buyers.",
      "Focused on filter-driven discovery, configurable product detail UX, and consistent cards across glass, plastic, and accessories.",
      "Maintainable patterns so new product lines and wholesale features integrate without breaking the shop shell.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Filter-heavy navigation across a large SKU catalog",
      "Product configuration and tier-pricing UI",
      "Responsive e-commerce for B2B and consumer audiences",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "nevermined",
    kind: "work",
    title: "Nevermined",
    headline: "B2B shop for lab-grown diamonds made in Germany.",
    url: "https://www.nevermined-diamonds.com/en_GB/",
    screenshot: "/images/nevermined.png",
    tags: ["E-commerce", "B2B", "Luxury", "Shopware"],
    short:
      "Frontend work on a jewellery-industry B2B store—diamond shapes, colours, sustainability storytelling, and trade-focused product discovery.",
    medium:
      "Implemented customer-facing UI for a lab-grown diamond producer: category navigation, product grids, and brand pages that communicate quality, certification, and German production.",
    premium: [
      "Luxury B2B needs clarity and trust—4C specs, certifications, and sustainability claims must read cleanly for professional buyers.",
      "Focused on premium product presentation, shape/colour discovery, and layouts that support international trade customers.",
      "Maintainable patterns so new collections and B2B flows integrate without redesigning the storefront.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "B2B product discovery for a technical luxury catalog",
      "Brand and sustainability content layouts",
      "Responsive e-commerce UI with premium visual tone",
    ],
    cta: "View live",
    grid: { columns: 3, rows: 3 },
  },
  {
    slug: "jung",
    kind: "work",
    title: "JUNG",
    headline: "Building technology brand site with product catalog depth.",
    url: "https://www.jung-group.com/en-DE/",
    screenshot: "/images/jung.png",
    tags: ["B2B", "Manufacturing", "Product catalog", "Responsive"],
    short:
      "Frontend work on a premium building-technology brand—switch ranges, collaborations, and product discovery for architects and trade professionals.",
    medium:
      "Implemented customer-facing UI for a design-led hardware manufacturer: product families, range pages, and content that balances specification detail with brand storytelling.",
    premium: [
      "Architectural brands need precision and aesthetics—finish variants, range navigation, and technical specs must feel effortless on desktop and mobile.",
      "Focused on hero campaigns, product-range layouts, and consistent presentation across collections and collaborations.",
      "Maintainable patterns so new ranges and partner launches integrate without redesigning the site shell.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Product-range navigation across a deep hardware catalog",
      "Campaign and collaboration landing layouts",
      "Responsive B2B UI with premium brand tone",
    ],
    cta: "View live",
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "megazyme",
    kind: "work",
    title: "Megazyme",
    headline: "B2B catalog for enzymatic assay kits and reagents.",
    url: "https://www.megazyme.com/",
    screenshot: "/images/megazyme.png",
    tags: ["B2B", "Life sciences", "Product catalog", "Technical content"],
    short:
      "Frontend work on a global diagnostics brand site—assay kits, industry segments, and technical support paths for food and beverage laboratories.",
    medium:
      "Implemented customer-facing UI for a scientific product catalog: category hubs, product families, and content structured for researchers and quality-control labs.",
    premium: [
      "Scientific B2B needs accuracy and findability—industry filters, kit formats, and documentation must be one click away for lab buyers.",
      "Focused on category entry points, product search, and layouts that scale across industries from dairy to brewing.",
      "Maintainable patterns so new kits and focus-area pages integrate without redesigning the site shell.",
    ],
    role: "Frontend implementation",
    technicalHighlights: [
      "Industry- and category-driven product navigation",
      "Technical support and documentation entry points",
      "Responsive B2B UI for a scientific catalog",
    ],
    cta: "View live",
    grid: { columns: 3, rows: 3 },
  },
  {
    slug: "outstand",
    kind: "work",
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
    grid: { columns: 5, rows: 3 },
  },
  {
    slug: "web48",
    kind: "work",
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
    grid: { columns: 4, rows: 3 },
  },
  {
    slug: "cej-buc",
    kind: "work",
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
    grid: { columns: 5, rows: 3 },
  },
  {
    slug: "eutron",
    kind: "work",
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
    grid: { columns: 5, rows: 3 },
  },
  {
    slug: "juristfirme",
    kind: "work",
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
    grid: { columns: 2, rows: 3 },
  },
];

export const workProjects = projects.filter((p) => p.kind === "work");
export const personalProjects = projects.filter((p) => p.kind === "personal");

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
