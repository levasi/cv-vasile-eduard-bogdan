import { Code2, Palette, ShoppingCart, Clapperboard, type LucideIcon } from "lucide-react";

export type SkillGroup = {
  titleKey: "skillsFrontend" | "skillsEcommerce" | "skillsUiDesign" | "skillsMotionDesign";
  icon: LucideIcon;
};

export const skillGroups: readonly SkillGroup[] = [
  {
    titleKey: "skillsFrontend",
    icon: Code2
  },
  {
    titleKey: "skillsEcommerce",
    icon: ShoppingCart
  },
  {
    titleKey: "skillsUiDesign",
    icon: Palette
  },
  {
    titleKey: "skillsMotionDesign",
    icon: Clapperboard
  },
];
