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
}

export function PortfolioScreenshot({
  url,
  label,
  customScreenshot,
}: PortfolioScreenshotProps) {
  const [failed, setFailed] = useState(false);
  const src = customScreenshot ?? (failed ? null : getScreenshotImageUrl(url));

  // Custom screenshot or API screenshot URL
  if (src) {
    return (
      <div className="relative w-full bg-neutral-100 overflow-hidden shrink-0">
        <img
          src={src}
          alt=""
          className="w-full h-full object-cover object-top"
          onError={() => setFailed(true)}
        />
      </div>
    );
  }

  // Placeholder when no custom image and API failed or not used: first letter + gradient
  return (
    <div
      className="w-full flex items-center justify-center shrink-0 bg-gradient-to-br from-foreground to-foreground/80 text-background/80"
      aria-hidden
    >
      <span className="text-4xl font-semibold" style={{ fontFamily: "'Playfair Display', serif" }}>
        {label.charAt(0)}
      </span>
    </div>
  );
}
