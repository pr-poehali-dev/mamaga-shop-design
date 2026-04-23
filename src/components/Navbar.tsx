import Icon from "@/components/ui/icon";

const NAV_ITEMS = ["Главная", "Каталог", "О материалах", "Мифы", "Портфолио", "Услуги", "Блог", "Контакты"];

interface NavbarProps {
  activeSection: string;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  scrollTo: (section: string) => void;
}

export default function Navbar({ activeSection, mobileMenuOpen, setMobileMenuOpen, scrollTo }: NavbarProps) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(13,11,8,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 flex items-center justify-center" style={{ border: "1px solid var(--gold)" }}>
            <span style={{ color: "var(--gold)", fontSize: "10px", letterSpacing: "0.05em", fontFamily: "Cormorant Garamond, serif", fontWeight: 600 }}>A</span>
          </div>
          <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", letterSpacing: "0.2em", color: "var(--cream)" }}>VKORNE</span>
        </div>

        <div className="hidden lg:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <button key={item} onClick={() => scrollTo(item)} className="nav-link text-xs tracking-widest uppercase" style={{ fontFamily: "Montserrat, sans-serif", color: activeSection === item ? "var(--gold)" : "var(--cream-muted)", letterSpacing: "0.12em", background: "none", border: "none", cursor: "pointer" }}>
              {item}
            </button>
          ))}
        </div>

        <button className="hidden lg:flex btn-gold px-5 py-2.5 text-xs tracking-widest cursor-pointer" style={{ borderRadius: "2px" }}>
          Заказать консультацию
        </button>

        <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)} style={{ color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}>
          <Icon name={mobileMenuOpen ? "X" : "Menu"} size={22} />
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden px-6 pb-6 pt-2 flex flex-col gap-4" style={{ borderTop: "1px solid rgba(201,168,76,0.12)" }}>
          {NAV_ITEMS.map((item) => (
            <button key={item} onClick={() => scrollTo(item)} className="text-left text-xs tracking-widest uppercase nav-link" style={{ fontFamily: "Montserrat, sans-serif", color: "var(--cream-muted)", background: "none", border: "none", cursor: "pointer" }}>
              {item}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}
