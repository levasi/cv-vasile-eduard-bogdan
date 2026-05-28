import { CvSidebar } from "../components/cv-sidebar";
import { CvMain } from "../components/cv-main";
import { useRef, useState, useCallback } from "react";
import html2canvas from "html2canvas-pro";
import { jsPDF } from "jspdf";
import { HeroNav } from "../components/hero/HeroNav";

export function CvPage() {
  const cvRef = useRef<HTMLDivElement>(null);
  const [downloading, setDownloading] = useState(false);

  const handleDownloadPdf = useCallback(async () => {
    if (!cvRef.current || downloading) return;
    setDownloading(true);

    try {
      const element = cvRef.current;

      const originalOverflow = element.style.overflow;
      const originalMaxHeight = element.style.maxHeight;
      const originalHeight = element.style.height;
      element.style.overflow = "visible";
      element.style.maxHeight = "none";
      element.style.height = "auto";

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      element.style.overflow = originalOverflow;
      element.style.maxHeight = originalMaxHeight;
      element.style.height = originalHeight;

      const imgData = canvas.toDataURL("image/png");
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;

      const pdfWidth = 210;
      const pdfHeight = 297;

      const ratio = pdfWidth / imgWidth;
      const scaledHeight = imgHeight * ratio;

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      if (scaledHeight <= pdfHeight) {
        pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, scaledHeight);
      } else {
        const pageCanvasHeight = pdfHeight / ratio;
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
            ctx.drawImage(canvas, 0, -yOffset);
          }

          const pageImgData = pageCanvas.toDataURL("image/png");
          const pageScaledHeight = sliceHeight * ratio;
          pdf.addImage(pageImgData, "PNG", 0, 0, pdfWidth, pageScaledHeight);

          yOffset += sliceHeight;
          page++;
        }
      }

      pdf.save("Vasile_Bogdan_CV.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
    } finally {
      setDownloading(false);
    }
  }, [downloading]);

  return (
    <div className="min-h-screen w-full bg-gray-100" style={{ fontFamily: "'Inter', sans-serif" }}>
      <div className="w-full bg-[#070B14] border-b border-white/10">
        <HeroNav />
        <div className="h-6" />
      </div>

      <div className="w-full flex flex-col items-center p-4 lg:p-8">
        <div
          ref={cvRef}
          className="w-full max-w-[1100px] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col lg:flex-row"
        >
          <CvSidebar />
          <CvMain downloading={downloading} onDownload={handleDownloadPdf} />
        </div>
      </div>
    </div>
  );
}
