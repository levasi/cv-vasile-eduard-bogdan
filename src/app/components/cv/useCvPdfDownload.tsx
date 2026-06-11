import {
  createContext,
  createElement,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type RefObject,
} from "react";
import { useLocation } from "react-router-dom";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { useLanguage, type Lang } from "../language-context";
import { CvDocument } from "./CvDocument";

const PDF_FILENAME = "Vasile_Bogdan_CV.pdf";
const PDF_MIME = "application/pdf";
/** Same width as desktop CV so layout matches the on-screen version. */
const CV_PDF_CAPTURE_WIDTH = "80rem";
const PDF_WIDTH_MM = 210;
const PDF_HEIGHT_MM = 297;
/** Output sharpness target (~150 DPI on A4). Scale stays at 1 for 80rem — no 2× PNG bloat. */
const PDF_CAPTURE_DPI = 150;
const PDF_MAX_CAPTURE_SCALE = 1.35;
const PDF_JPEG_QUALITY = 0.92;

function getCaptureScale(elementWidth: number) {
  if (elementWidth <= 0) return 1;
  const targetWidthPx = (PDF_WIDTH_MM / 25.4) * PDF_CAPTURE_DPI;
  return Math.max(1, Math.min(PDF_MAX_CAPTURE_SCALE, targetWidthPx / elementWidth));
}

function canvasToJpegDataUrl(canvas: HTMLCanvasElement) {
  return canvas.toDataURL("image/jpeg", PDF_JPEG_QUALITY);
}

type CvPdfDownloadApi = {
  downloading: boolean;
  downloadCv: () => Promise<void>;
};

const CvPdfDownloadContext = createContext<CvPdfDownloadApi | null>(null);

export function useCvPdfDownload() {
  const ctx = useContext(CvPdfDownloadContext);
  if (!ctx) {
    throw new Error("useCvPdfDownload must be used within CvPdfDownloadProvider");
  }
  return ctx;
}

async function waitForImages(element: HTMLElement) {
  const images = Array.from(element.querySelectorAll("img"));
  await Promise.all(
    images.map(
      (img) =>
        new Promise<void>((resolve) => {
          if (img.complete) {
            resolve();
            return;
          }
          const done = () => resolve();
          img.addEventListener("load", done, { once: true });
          img.addEventListener("error", done, { once: true });
        })
    )
  );
}

async function buildPdfBlob(element: HTMLElement) {
  const wrapper = element.parentElement;
  const wrapperStyle = wrapper
    ? {
        position: wrapper.style.position,
        left: wrapper.style.left,
        top: wrapper.style.top,
        width: wrapper.style.width,
        opacity: wrapper.style.opacity,
        zIndex: wrapper.style.zIndex,
        pointerEvents: wrapper.style.pointerEvents,
      }
    : null;

  if (wrapper) {
    wrapper.style.position = "fixed";
    // Keep off-screen during capture — moving to (0, 0) flashes a duplicate CV in the viewport.
    wrapper.style.left = "-10000px";
    wrapper.style.top = "0";
    wrapper.style.width = CV_PDF_CAPTURE_WIDTH;
    wrapper.style.opacity = "1";
    wrapper.style.zIndex = "-1";
    wrapper.style.pointerEvents = "none";
  }

  const originalOverflow = element.style.overflow;
  const originalMaxHeight = element.style.maxHeight;
  const originalHeight = element.style.height;
  element.style.overflow = "visible";
  element.style.maxHeight = "none";
  element.style.height = "auto";

  try {
    await waitForImages(element);

    const captureScale = getCaptureScale(element.offsetWidth);
    const canvas = await html2canvas(element, {
      scale: captureScale,
      useCORS: true,
      allowTaint: true,
      backgroundColor: "#ffffff",
      logging: false,
      scrollX: 0,
      scrollY: 0,
    });

    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = PDF_WIDTH_MM / imgWidth;
    const scaledHeight = imgHeight * ratio;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
      compress: true,
    });

    if (scaledHeight <= PDF_HEIGHT_MM) {
      pdf.addImage(canvasToJpegDataUrl(canvas), "JPEG", 0, 0, PDF_WIDTH_MM, scaledHeight);
    } else {
      const pageCanvasHeight = PDF_HEIGHT_MM / ratio;
      let yOffset = 0;
      let page = 0;

      while (yOffset < imgHeight) {
        if (page > 0) pdf.addPage();

        const sliceHeight = Math.min(pageCanvasHeight, imgHeight - yOffset);
        const pageCanvas = document.createElement("canvas");
        pageCanvas.width = imgWidth;
        pageCanvas.height = sliceHeight;
        const ctx = pageCanvas.getContext("2d");
        if (ctx) {
          ctx.fillStyle = "#ffffff";
          ctx.fillRect(0, 0, imgWidth, sliceHeight);
          ctx.drawImage(canvas, 0, -yOffset);
        }

        const pageScaledHeight = sliceHeight * ratio;
        pdf.addImage(
          canvasToJpegDataUrl(pageCanvas),
          "JPEG",
          0,
          0,
          PDF_WIDTH_MM,
          pageScaledHeight
        );

        yOffset += sliceHeight;
        page += 1;
      }
    }

    return pdf.output("blob");
  } finally {
    element.style.overflow = originalOverflow;
    element.style.maxHeight = originalMaxHeight;
    element.style.height = originalHeight;

    if (wrapper && wrapperStyle) {
      wrapper.style.position = wrapperStyle.position;
      wrapper.style.left = wrapperStyle.left;
      wrapper.style.top = wrapperStyle.top;
      wrapper.style.width = wrapperStyle.width;
      wrapper.style.opacity = wrapperStyle.opacity;
      wrapper.style.zIndex = wrapperStyle.zIndex;
      wrapper.style.pointerEvents = wrapperStyle.pointerEvents;
    }
  }
}

function triggerDirectDownload(blob: Blob) {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = blobUrl;
  link.download = PDF_FILENAME;
  link.rel = "noopener";
  link.style.display = "none";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(blobUrl), 60_000);
}

async function requestSaveFileHandle() {
  if (typeof window.showSaveFilePicker !== "function") {
    return null;
  }

  try {
    return await window.showSaveFilePicker({
      suggestedName: PDF_FILENAME,
      types: [{ description: "PDF document", accept: { [PDF_MIME]: [".pdf"] } }],
    });
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return "cancelled" as const;
    }
    return null;
  }
}

async function writeToFileHandle(handle: FileSystemFileHandle, blob: Blob) {
  const writable = await handle.createWritable();
  await writable.write(blob);
  await writable.close();
}

async function sharePdf(blob: Blob) {
  const file = new File([blob], PDF_FILENAME, { type: PDF_MIME });
  if (typeof navigator.share !== "function" || !navigator.canShare?.({ files: [file] })) {
    return false;
  }

  try {
    await navigator.share({ files: [file], title: PDF_FILENAME });
    return true;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      return true;
    }
    return false;
  }
}

function CvPdfSnapshot({ snapshotRef }: { snapshotRef: RefObject<HTMLDivElement | null> }) {
  return (
    <div
      aria-hidden
      data-cv-pdf-snapshot
      className="pointer-events-none fixed top-0 -left-[10000px] max-w-none overflow-visible"
      style={{ fontFamily: "var(--font-family)", width: CV_PDF_CAPTURE_WIDTH }}
    >
      <CvDocument ref={snapshotRef} forceDesktopLayout />
    </div>
  );
}

export function CvPdfDownloadProvider({ children }: { children: ReactNode }) {
  const { lang } = useLanguage();
  const location = useLocation();
  const [downloading, setDownloading] = useState(false);
  const cvElementRef = useRef<HTMLDivElement | null>(null);
  const pdfCacheRef = useRef<{ lang: Lang; blob: Blob } | null>(null);
  const warmingRef = useRef(false);

  const waitForSnapshot = useCallback(async () => {
    if (cvElementRef.current) return cvElementRef.current;
    await new Promise((resolve) => window.setTimeout(resolve, 200));
    return cvElementRef.current;
  }, []);

  const warmPdfCache = useCallback(async (language: Lang) => {
    if (warmingRef.current) return pdfCacheRef.current?.lang === language ? pdfCacheRef.current.blob : null;

    warmingRef.current = true;
    try {
      const element = await waitForSnapshot();
      if (!element) return null;

      const blob = await buildPdfBlob(element);
      pdfCacheRef.current = { lang: language, blob };
      return blob;
    } catch (error) {
      console.error("CV PDF cache warm failed:", error);
      return null;
    } finally {
      warmingRef.current = false;
    }
  }, [waitForSnapshot]);

  useEffect(() => {
    pdfCacheRef.current = null;
    if (location.pathname !== "/cv") return;

    const timer = window.setTimeout(() => {
      void warmPdfCache(lang);
    }, 800);

    return () => window.clearTimeout(timer);
  }, [lang, location.pathname, warmPdfCache]);

  const downloadCv = useCallback(async () => {
    if (downloading) return;

    const cached = pdfCacheRef.current?.lang === lang ? pdfCacheRef.current.blob : null;
    if (cached) {
      triggerDirectDownload(cached);
      return;
    }

    const saveHandle = await requestSaveFileHandle();
    if (saveHandle === "cancelled") return;

    setDownloading(true);
    try {
      const element = await waitForSnapshot();
      if (!element) throw new Error("CV snapshot is not ready");

      const blob = await buildPdfBlob(element);
      pdfCacheRef.current = { lang, blob };

      if (saveHandle) {
        await writeToFileHandle(saveHandle, blob);
        return;
      }

      if (await sharePdf(blob)) return;

      triggerDirectDownload(blob);
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloading(false);
    }
  }, [downloading, lang, waitForSnapshot]);

  return createElement(
    CvPdfDownloadContext.Provider,
    { value: { downloading, downloadCv } },
    createElement(CvPdfSnapshot, { snapshotRef: cvElementRef }),
    children
  );
}
