import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CatalogSection from "@/components/CatalogSection";
import ContentSections from "@/components/ContentSections";
import ContactsFooter from "@/components/ContactsFooter";

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [materialFilter, setMaterialFilter] = useState("Все материалы");
  const [styleFilter, setStyleFilter] = useState("Все стили");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [openMyth, setOpenMyth] = useState<number | null>(null);

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
        openMyth={openMyth}
        setOpenMyth={setOpenMyth}
        scrollTo={scrollTo}
      />
      <ContactsFooter />
    </div>
  );
}
