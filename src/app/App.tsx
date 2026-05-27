import { Routes, Route } from "react-router-dom";
import { LanguageProvider } from "./components/language-context";
import { TopBar } from "./components/top-bar";
import { CvPage } from "./pages/cv-page";
import { PortfolioPage } from "./pages/portfolio-page";
import { PortfolioProjectPage } from "./pages/portfolio-project-page";
import { PersonalProjectsPage } from "./pages/personal-projects-page";

function Layout() {
  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/" element={<CvPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<PortfolioProjectPage />} />
        <Route path="/personal-projects" element={<PersonalProjectsPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <Layout />
    </LanguageProvider>
  );
}
