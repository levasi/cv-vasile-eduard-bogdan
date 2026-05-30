import React from "react";
import { useState } from "react";

/** Direct screenshot image URL (no API key). Falls back to placeholder if image fails to load. */
function getScreenshotImageUrl(pageUrl: string): string {
  return `https://pageshot.site/v1/screenshot?url=${encodeURIComponent(pageUrl)}`;
}

interface PortfolioScreenshotProps {
  url: string;
  label: string;
  customScreenshot?: string;
  /** Fill parent height (masonry cards); image uses object-cover */
  fill?: boolean;
}

export function PortfolioScreenshot({
  url,
  label,
  customScreenshot,
  fill = false,
}: PortfolioScreenshotProps) {
  const [failed, setFailed] = useState(false);
  const src = customScreenshot ?? (failed ? null : getScreenshotImageUrl(url));

  const shellClass = fill
    ? "relative h-full w-full overflow-hidden bg-neutral-900"
    : "relative w-full bg-neutral-100 overflow-hidden shrink-0";

  const imgClass = fill
    ? "absolute inset-0 h-full w-full object-cover object-center"
    : "w-full h-full object-cover object-center";

  // Custom screenshot or API screenshot URL
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className={imgClass}
        onError={() => setFailed(true)}
      />
    );
  }

  // Placeholder when no custom image and API failed or not used: first letter + gradient
  return (
    <div
      className={`${shellClass} flex items-center justify-center bg-gradient-to-br from-foreground to-foreground/80 text-background/80`}
      aria-hidden
    >
      <span className="text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
        {label.charAt(0)}
      </span>
    </div>
  );
}
