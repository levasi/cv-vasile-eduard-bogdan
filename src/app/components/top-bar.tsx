import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "./language-context";
import { FileText, Briefcase, Sparkles } from "lucide-react";
import { LanguageToggle } from "./cv-controls";

const navItems = [
  { path: "/", labelKey: "cv", icon: FileText },
  { path: "/portfolio", labelKey: "portfolio", icon: Briefcase },
  { path: "/personal-projects", labelKey: "personalProjects", icon: Sparkles },
] as const;

export function TopBar() {
  const location = useLocation();
  const { t } = useLanguage();

  return (
    <header
      className="w-full bg-[#1a1a2e] text-white shadow-md sticky top-0 z-50"
      style={{ fontFamily: "'Inter', sans-serif" }}
    >
      <nav className="max-w-[1100px] mx-auto px-4 lg:px-8 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-1">
          {navItems.map(({ path, labelKey, icon: Icon }) => {
            const isActive = location.pathname === path;
            return (
              <Link
                key={path}
                to={path}
                className={`
                  flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${isActive ? "bg-[#e94560] text-white" : "text-gray-300 hover:bg-white/10 hover:text-white"}
                `}
              >
                <Icon className="w-4 h-4" />
                {t(labelKey)}
              </Link>
            );
          })}
        </div>

        <LanguageToggle />
      </nav>
    </header>
  );
}
