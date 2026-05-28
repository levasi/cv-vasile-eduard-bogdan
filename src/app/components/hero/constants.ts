export const HERO_COLORS = {
  background: "#070B14",
  primary: "#7C3AED",
  secondary: "#3B82F6",
  accent: "#A855F7",
  text: "#F8FAFC",
  muted: "#94A3B8",
  glass: "rgba(255,255,255,0.06)",
  border: "rgba(255,255,255,0.12)",
} as const;

export type UIElementType =
  | "button"
  | "card"
  | "chart"
  | "code"
  | "nav"
  | "product"
  | "dashboard"
  | "typography"
  | "token"
  | "grid";

export type UIElementConfig = {
  id: string;
  type: UIElementType;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  label?: string;
};

export const UI_ELEMENTS: UIElementConfig[] = [
  { id: "btn-1", type: "button", position: [2.4, 0.6, -0.8], rotation: [0.1, -0.45, 0.05], scale: 1, label: "CTA" },
  { id: "card-1", type: "card", position: [1.8, -0.4, -1.6], rotation: [0.15, -0.2, -0.08], scale: 1.1, label: "Card" },
  { id: "chart-1", type: "chart", position: [3.1, -0.2, -2.2], rotation: [-0.05, 0.35, 0.02], scale: 1, label: "Analytics" },
  { id: "code-1", type: "code", position: [0.9, 0.9, -2.4], rotation: [0.08, 0.55, -0.04], scale: 0.95, label: "Component" },
  { id: "nav-1", type: "nav", position: [2.8, 1.2, -1.9], rotation: [-0.12, -0.15, 0.03], scale: 1, label: "Navigation" },
  { id: "product-1", type: "product", position: [1.2, -0.9, -1.1], rotation: [0.2, 0.25, -0.06], scale: 1.05, label: "Product" },
  { id: "dash-1", type: "dashboard", position: [3.4, 0.3, -0.5], rotation: [-0.08, -0.55, 0.1], scale: 0.9, label: "Dashboard" },
  { id: "type-1", type: "typography", position: [0.5, 0.1, -0.6], rotation: [0, 0.4, 0.12], scale: 1, label: "Aa" },
  { id: "token-1", type: "token", position: [2.0, -1.1, -2.0], rotation: [0.05, -0.3, 0.15], scale: 1, label: "#7C3AED" },
  { id: "grid-1", type: "grid", position: [3.0, -0.8, -1.4], rotation: [1.2, 0, 0], scale: 1.2, label: "Layout" },
];

export const SCROLL_PHASES = [
  { id: "systems", titleKey: "heroPhaseSystemsTitle", bodyKey: "heroPhaseSystemsBody" },
  { id: "motion", titleKey: "heroPhaseMotionTitle", bodyKey: "heroPhaseMotionBody" },
  { id: "product", titleKey: "heroPhaseProductTitle", bodyKey: "heroPhaseProductBody" },
] as const;
