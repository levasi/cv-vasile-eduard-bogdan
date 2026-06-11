import { Routes, Route, Navigate } from "react-router-dom";
import { LanguageProvider } from "./components/language-context";
import { LenisScrollProvider } from "./components/hero/useLenisScroll";
import { CvPdfDownloadProvider } from "./components/cv/useCvPdfDownload";
import { TopBar } from "./components/top-bar";
import { Footer } from "./components/footer";
import { CvPage } from "./pages/cv-page";
import { PortfolioPage } from "./pages/portfolio-page";
import { PortfolioProjectPage } from "./pages/portfolio-project-page";

function Layout() {
  return (
    <LenisScrollProvider>
      <TopBar />
      <Routes>
        <Route path="/" element={<PortfolioPage />} />
        <Route path="/portfolio" element={<Navigate to="/" replace />} />
        <Route path="/cv" element={<CvPage />} />
        <Route path="/portfolio/:slug" element={<PortfolioProjectPage />} />
        <Route path="/personal-projects" element={<Navigate to="/#portfolio-work" replace />} />
      </Routes>
      <Footer />
    </LenisScrollProvider>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <CvPdfDownloadProvider>
        <Layout />
      </CvPdfDownloadProvider>
    </LanguageProvider>
  );
}
