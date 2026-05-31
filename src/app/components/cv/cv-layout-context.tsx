import { createContext, useContext, type ReactNode } from "react";

const CvDesktopLayoutContext = createContext(false);

export function CvDesktopLayoutProvider({
  enabled,
  children,
}: {
  enabled: boolean;
  children: ReactNode;
}) {
  return (
    <CvDesktopLayoutContext.Provider value={enabled}>{children}</CvDesktopLayoutContext.Provider>
  );
}

export function useCvDesktopLayout() {
  return useContext(CvDesktopLayoutContext);
}
