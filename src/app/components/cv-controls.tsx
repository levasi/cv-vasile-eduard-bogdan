import { Download, Loader2 } from "lucide-react";
import { useLanguage, type Lang } from "./language-context";

export function LanguageToggle() {
  const { lang, setLang } = useLanguage();

  const options: { value: Lang; label: string; flag: string }[] = [
    { value: "en", label: "EN", flag: "🇬🇧" },
    { value: "ro", label: "RO", flag: "🇷🇴" },
  ];

  return (
    <div className="flex items-center bg-[#1a1a2e] rounded-lg overflow-hidden shadow-lg">
      {options.map((opt) => (
        <button
          key={opt.value}
          onClick={() => setLang(opt.value)}
          className={`flex items-center gap-1.5 px-4 py-2.5 transition-all cursor-pointer ${
            lang === opt.value
              ? "bg-[#e94560] text-white"
              : "text-gray-400 hover:text-white"
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
      className="flex items-center gap-2 bg-[#1a1a2e] text-white px-5 py-2.5 rounded-lg hover:bg-[#1a1a2e]/90 active:scale-[0.98] transition-all shadow-lg hover:shadow-xl disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
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
