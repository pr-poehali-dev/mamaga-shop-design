import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CatalogSection from "@/components/CatalogSection";
import ContentSections from "@/components/ContentSections";
import ContactsFooter from "@/components/ContactsFooter";
import { api } from "@/lib/api";

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [materialFilter, setMaterialFilter] = useState("Все материалы");
  const [styleFilter, setStyleFilter] = useState("Все стили");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [settings, setSettings] = useState<Record<string, string>>({});

  useEffect(() => {
    api.getSettings().then(data => {
      if (data && typeof data === 'object') setSettings(data);
    });
  }, []);

  const scrollTo = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark)", color: "var(--cream)" }}>
      <Navbar
        activeSection={activeSection}
        mobileMenuOpen={mobileMenuOpen}
        setMobileMenuOpen={setMobileMenuOpen}
        scrollTo={scrollTo}
      />
      <HeroSection scrollTo={scrollTo} />
      <CatalogSection
        materialFilter={materialFilter}
        setMaterialFilter={setMaterialFilter}
        styleFilter={styleFilter}
        setStyleFilter={setStyleFilter}
        priceFilter={priceFilter}
        setPriceFilter={setPriceFilter}
      />
      <ContentSections
        openMyth={null}
        setOpenMyth={() => {}}
        scrollTo={scrollTo}
      />
      <ContactsFooter settings={settings} />
    </div>
  );
}
