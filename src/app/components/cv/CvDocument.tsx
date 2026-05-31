import React, { forwardRef } from "react";
import { CvSidebar } from "../cv-sidebar";
import { CvMain } from "../cv-main";

export const CvDocument = forwardRef<HTMLDivElement>(function CvDocument(_props, ref) {
  return (
    <div
      ref={ref}
      className="flex w-full flex-col-reverse overflow-hidden bg-white lg:flex-row"
    >
      <CvSidebar />
      <CvMain />
    </div>
  );
});
