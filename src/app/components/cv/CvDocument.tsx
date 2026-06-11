import React, { forwardRef } from "react";
import { cn } from "../ui/utils";
import { CvSidebar } from "../cv-sidebar";
import { CvMain } from "../cv-main";
import { CvDesktopLayoutProvider } from "./cv-layout-context";

type CvDocumentProps = {
  /** Use desktop (two-column) layout regardless of viewport — required for PDF capture on mobile. */
  forceDesktopLayout?: boolean;
};

export const CvDocument = forwardRef<HTMLDivElement, CvDocumentProps>(function CvDocument(
  { forceDesktopLayout = false },
  ref,
) {
  return (
    <CvDesktopLayoutProvider enabled={forceDesktopLayout}>
      <div
        ref={ref}
        className={cn(
          "flex w-full overflow-hidden my-8 lg:rounded-xl lg:border-2 border-border",
          forceDesktopLayout ? "flex-row" : "flex-col-reverse lg:flex-row",

        )}
      >
        <CvSidebar />
        <CvMain />
      </div>
    </CvDesktopLayoutProvider>
  );
});
