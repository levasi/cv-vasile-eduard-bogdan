import { Code2, Palette, ShoppingCart, Wrench, type LucideIcon } from "lucide-react";

export type SkillGroup = {
  titleKey: "skillsFrontend" | "skillsEcommerce" | "skillsUiDesign" | "skillsTools";
  items: readonly string[];
  icon: LucideIcon;
};

export const skillGroups: readonly SkillGroup[] = [
  {
    titleKey: "skillsFrontend",
    items: ["Vue.js", "Nuxt.js", "React", "Next.js", "JavaScript", "TypeScript", "Tailwind CSS", "GSAP", "HTML", "SCSS"],
    icon: Code2,
  },
  {
    titleKey: "skillsEcommerce",
    items: ["Shopify", "Shopware", "WordPress"],
    icon: ShoppingCart,
  },
  {
    titleKey: "skillsUiDesign",
    items: ["Figma", "Storybook", "Adobe XD", "Photoshop"],
    icon: Palette,
  },
  {
    titleKey: "skillsTools",
    items: ["Git", "Webpack", "Jira"],
    icon: Wrench,
  },
];
