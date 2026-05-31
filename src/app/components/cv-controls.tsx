import { Check, ChevronDown, Download, Loader2 } from "lucide-react";
import { useLanguage, type Lang } from "./language-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { cn } from "./ui/utils";

const languageOptions: { value: Lang; label: string; code: string; flag: string }[] = [
  { value: "en", label: "English", code: "EN", flag: "🇬🇧" },
  { value: "ro", label: "Română", code: "RO", flag: "🇷🇴" },
];

function controlTriggerClass(isDark: boolean) {
  return cn(
    "inline-flex items-center gap-1 rounded-lg px-2 py-1.5 outline-none transition-colors focus-visible:ring-2",
    isDark
      ? "border border-white/15 bg-white/8 text-white/85 backdrop-blur-sm hover:bg-white/12 hover:text-white focus-visible:ring-white/25"
      : "border border-border/80 bg-background/80 text-muted-foreground hover:text-foreground focus-visible:ring-ring/50",
  );
}

const controlLabelClass = "text-[11px] font-medium uppercase tracking-[0.12em]";

export function LanguageToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { lang, setLang } = useLanguage();
  const isDark = variant === "dark";
  const current = languageOptions.find((opt) => opt.value === lang) ?? languageOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={controlTriggerClass(isDark)}
        aria-label={`Language: ${current.label}`}
      >
        <span className={controlLabelClass}>{current.code}</span>
        <ChevronDown className="size-3 opacity-60" aria-hidden />
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className={cn(
          "min-w-[9.5rem]",
          isDark && "border-white/15 bg-[#0f1729]/95 text-white backdrop-blur-md",
        )}
      >
        {languageOptions.map((opt) => (
          <DropdownMenuItem
            key={opt.value}
            onClick={() => setLang(opt.value)}
            className={cn(
              "cursor-pointer gap-2 text-xs font-medium",
              isDark && "focus:bg-white/10 focus:text-white",
            )}
          >
            <span aria-hidden>{opt.flag}</span>
            <span className="flex-1">{opt.label}</span>
            {lang === opt.value ? <Check className="size-3.5 shrink-0 opacity-80" /> : null}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DownloadButton({
  downloading,
  onClick,
  variant = "light",
}: {
  downloading: boolean;
  onClick: () => void;
  variant?: "light" | "dark";
}) {
  const { t } = useLanguage();
  const isDark = variant === "dark";

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={downloading}
      className={cn(
        controlTriggerClass(isDark),
        "cursor-pointer disabled:cursor-not-allowed disabled:opacity-70",
      )}
    >
      {downloading ? (
        <Loader2 className="size-3 shrink-0 animate-spin opacity-80" aria-hidden />
      ) : (
        <Download className="size-3 shrink-0 opacity-80" aria-hidden />
      )}
      <span className={controlLabelClass}>
        {downloading ? t("generatingPdf") : t("downloadPdf")}
      </span>
    </button>
  );
}
