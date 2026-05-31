import { useEffect, useState } from "react";

/** Mobile stacks in 1 column; tablet and desktop share the 12-column bento template */
export type PortfolioGridColumns = 1 | 12;

function readColumnCount(): PortfolioGridColumns {
  if (typeof window === "undefined") return 12;
  if (window.matchMedia("(max-width: 767px)").matches) return 1;
  return 12;
}

export function usePortfolioGridColumns(): PortfolioGridColumns {
  const [columns, setColumns] = useState<PortfolioGridColumns>(readColumnCount);

  useEffect(() => {
    const mqMobile = window.matchMedia("(max-width: 767px)");

    const update = () => setColumns(readColumnCount());

    mqMobile.addEventListener("change", update);
    window.addEventListener("resize", update);

    return () => {
      mqMobile.removeEventListener("change", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  return columns;
}
