import { useEffect, useState } from "react";

/** Fine-grained column count for bento packing (12 = desktop gallery grid) */
export type PortfolioGridColumns = 2 | 8 | 12;

function readColumnCount(): PortfolioGridColumns {
  if (typeof window === "undefined") return 12;
  if (window.matchMedia("(max-width: 767px)").matches) return 2;
  if (window.matchMedia("(max-width: 1099px)").matches) return 8;
  return 12;
}

export function usePortfolioGridColumns(): PortfolioGridColumns {
  const [columns, setColumns] = useState<PortfolioGridColumns>(readColumnCount);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767px)");
    const mqTablet = window.matchMedia("(max-width: 1099px)");

    const update = () => setColumns(readColumnCount());

    mqMobile.addEventListener("change", update);
    mqTablet.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      mqMobile.removeEventListener("change", update);
      mqTablet.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return columns;
}
