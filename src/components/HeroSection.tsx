import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/a5fd1402-d2f7-4bf5-ab13-8c879035c0cd.jpg";
const WOOD_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/69192ff1-ef49-48af-ae42-b372e7ab926a.jpg";
const MARBLE_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/61cb8446-b721-49a6-a9ad-db0ba501bd03.jpg";

interface HeroSectionProps {
  scrollTo: (section: string) => void;
}

export default function HeroSection({ scrollTo }: HeroSectionProps) {
  return (
    <section id="Главная" className="relative min-h-screen flex items-center overflow-hidden" style={{ paddingTop: "64px" }}>
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="hero" className="w-full h-full object-cover opacity-30" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,11,8,0.92) 0%, rgba(13,11,8,0.6) 60%, rgba(13,11,8,0.85) 100%)" }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-label mb-6 animate-fade-in-up" style={{ opacity: 0, animationFillMode: "forwards" }}>Мастерская природных материалов</p>
          <h1 className="animate-fade-in-up delay-100" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1.05, fontWeight: 300, opacity: 0, animationFillMode: "forwards" }}>
            Красота,<br />
            <span className="gold-shimmer">рождённая</span><br />
            природой
          </h1>
          <div className="gold-line my-8 animate-fade-in-up delay-200" style={{ opacity: 0, animationFillMode: "forwards" }} />
          <p className="animate-fade-in-up delay-300 leading-relaxed" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.875rem", color: "var(--cream-muted)", maxWidth: "420px", opacity: 0, animationFillMode: "forwards" }}>
            Каждое изделие — единственное в своём роде. Мы работаем с деревом, металлом и камнем так, как это задумала природа: без лишних компромиссов.
          </p>
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up delay-400" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <button className="btn-gold px-8 py-4 cursor-pointer" style={{ borderRadius: "2px" }} onClick={() => scrollTo("Каталог")}>
              Смотреть каталог
            </button>
            <button className="btn-outline-gold px-8 py-4 cursor-pointer" style={{ borderRadius: "2px" }} onClick={() => scrollTo("Портфолио")}>
              Наши работы
            </button>
          </div>
          <div className="flex gap-12 mt-14 animate-fade-in-up delay-500" style={{ opacity: 0, animationFillMode: "forwards" }}>
            {[["150+", "Проектов"], ["12", "Лет опыта"], ["3", "Материала"]].map(([num, label]) => (
              <div key={label}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.2rem", fontWeight: 300, color: "var(--gold)", lineHeight: 1 }}>{num}</p>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", color: "var(--cream-muted)", textTransform: "uppercase", marginTop: "4px" }}>{label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="hidden lg:block relative">
          <div className="relative" style={{ aspectRatio: "4/5" }}>
            <img src={WOOD_IMAGE} alt="wood" className="w-full h-full object-cover animate-fade-in delay-200" style={{ opacity: 0, animationFillMode: "forwards", borderRadius: "2px" }} />
            <div className="absolute -bottom-6 -left-6 w-48 h-48 animate-fade-in delay-400" style={{ opacity: 0, animationFillMode: "forwards", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "2px", overflow: "hidden" }}>
              <img src={MARBLE_IMAGE} alt="marble" className="w-full h-full object-cover" />
            </div>
            <div className="absolute top-6 -right-6 px-4 py-3 animate-fade-in delay-500" style={{ opacity: 0, animationFillMode: "forwards", background: "rgba(13,11,8,0.9)", border: "1px solid rgba(201,168,76,0.3)", borderRadius: "2px" }}>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>Ручная работа</p>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", color: "var(--cream)" }}>с 2012 года</p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-in delay-600" style={{ opacity: 0, animationFillMode: "forwards" }}>
        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={() => scrollTo("Каталог")}>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.3em", color: "var(--cream-muted)", textTransform: "uppercase" }}>Листайте</span>
          <Icon name="ChevronDown" size={16} style={{ color: "var(--gold)" }} />
        </div>
      </div>
    </section>
  );
}
