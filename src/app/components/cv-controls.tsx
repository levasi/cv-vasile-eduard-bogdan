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

export function LanguageToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { lang, setLang } = useLanguage();
  const isDark = variant === "dark";
  const current = languageOptions.find((opt) => opt.value === lang) ?? languageOptions[0];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={cn(
          "inline-flex items-center gap-0.5 rounded-lg px-2 py-1.5 outline-none transition-colors focus-visible:ring-2",
          isDark
            ? "border border-white/15 bg-white/8 text-white/85 backdrop-blur-sm hover:bg-white/12 hover:text-white focus-visible:ring-white/25"
            : "border border-border/80 bg-background/80 text-muted-foreground hover:text-foreground focus-visible:ring-ring/50",
        )}
        aria-label={`Language: ${current.label}`}
      >
        <span className="text-[11px] font-medium uppercase tracking-[0.12em]">
          {current.code}
        </span>
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
      onClick={onClick}
      disabled={downloading}
      className={cn(
        "flex items-center gap-2 rounded-lg px-3 py-2 transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 cursor-pointer sm:px-4 sm:py-2.5",
        isDark
          ? "border border-white/20 bg-white/10 text-white shadow-sm hover:bg-white/15 hover:shadow-md"
          : "bg-foreground text-background shadow-sm hover:bg-foreground/90 hover:shadow-md",
      )}
      style={{ fontSize: "0.75rem", fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase" }}
    >
      {downloading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Download className="h-4 w-4" />
      )}
      <span className="hidden sm:inline">{downloading ? t("generatingPdf") : t("downloadPdf")}</span>
      <span className="sm:hidden">{downloading ? "…" : "PDF"}</span>
    </button>
  );
}
