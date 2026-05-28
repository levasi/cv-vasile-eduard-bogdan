import { Download, Loader2 } from "lucide-react";
import { useLanguage, type Lang } from "./language-context";

export function LanguageToggle({ variant = "light" }: { variant?: "light" | "dark" }) {
  const { lang, setLang } = useLanguage();
  const isDark = variant === "dark";

  const options: { value: Lang; label: string; flag: string }[] = [
    { value: "en", label: "EN", flag: "🇬🇧" },
    { value: "ro", label: "RO", flag: "🇷🇴" },
  ];

  return (
    <div
      className={`flex items-center rounded-lg overflow-hidden }`}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLang(opt.value)}
          className={`flex items-center gap-1.5 px-4 py-2.5 transition-all cursor-pointer ${lang === opt.value
            ? isDark
              ? "text-white"
              : "text-primary-foreground"
            : isDark
              ? "text-[#94A3B8] hover:text-[#F8FAFC] "
              : "text-muted-foreground hover:text-foreground"
            }`}
          style={{ fontSize: "0.82rem", fontWeight: 600 }}
        >
          <span style={{ fontSize: "1rem" }}>{opt.flag}</span>
          {opt.label}
        </button>
      ))}
    </div>
  );
}

export function DownloadButton({ downloading, onClick }: { downloading: boolean; onClick: () => void }) {
  const { t } = useLanguage();

  return (
    <button
      onClick={onClick}
      disabled={downloading}
      className="flex items-center gap-2 bg-foreground text-background px-5 py-2.5 rounded-lg hover:bg-foreground/90 active:scale-[0.98] transition-all shadow-sm hover:shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
      style={{ fontSize: "0.85rem", fontWeight: 500 }}
    >
      {downloading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <Download className="w-4 h-4" />
      )}
      {downloading ? t("generatingPdf") : t("downloadPdf")}
    </button>
  );
}
