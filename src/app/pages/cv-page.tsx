import { HeroNav } from "../components/hero/HeroNav";
import { CvDocument } from "../components/cv/CvDocument";

export function CvPage() {
  return (
    <div className="min-h-screen w-full sm:bg-muted/40" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="sticky top-0 z-50 w-full border-b border-white/10 bg-[var(--espresso)]">
        <HeroNav />
      </div>

      <div className="max-w-[80rem] mx-auto sm:px-2">
        <div className="overflow-hidden rounded-xl">
          <CvDocument />
        </div>
      </div>

    </div>
  );
}
