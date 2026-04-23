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

      {/* Фоновое изображение */}
      <div className="absolute inset-0">
        <img src={HERO_IMAGE} alt="hero" className="w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,11,8,0.95) 0%, rgba(13,11,8,0.55) 55%, rgba(13,11,8,0.88) 100%)" }} />
      </div>

      {/* Природный туман снизу */}
      <div className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none" style={{ background: "linear-gradient(to top, rgba(13,11,8,1) 0%, rgba(13,11,8,0.6) 40%, transparent 100%)" }} />

      {/* Туман слева */}
      <div className="absolute left-0 top-0 bottom-0 w-32 pointer-events-none" style={{ background: "linear-gradient(to right, rgba(13,11,8,0.9) 0%, transparent 100%)" }} />

      {/* ЛЕШИЙ — левый нижний угол */}
      <div className="absolute bottom-0 left-0 pointer-events-none animate-fade-in delay-600" style={{ opacity: 0, animationFillMode: "forwards" }}>
        <svg width="320" height="420" viewBox="0 0 320 420" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.18 }}>
          {/* Корни / ноги */}
          <path d="M60 420 Q55 380 40 350 Q25 320 10 300 Q30 310 50 340 Q45 300 30 260 Q55 280 65 320 Q70 280 60 240 Q85 265 80 310 Q95 270 90 230 Q110 260 100 310 Q115 280 120 250 Q130 275 120 320 Q135 295 145 270 Q150 300 135 340 Q150 310 165 290 Q165 330 148 370 Q155 340 170 320 Q168 360 155 390 L60 420Z" fill="var(--gold-dark)" />
          {/* Тело */}
          <path d="M65 330 Q50 280 55 240 Q60 200 80 180 Q100 160 120 165 Q145 170 155 195 Q170 220 165 260 Q160 295 145 325 Q120 345 90 340 Q72 338 65 330Z" fill="var(--gold-dark)" />
          {/* Ветви-руки */}
          <path d="M55 240 Q30 220 10 200 Q5 185 15 180 Q30 195 55 215" fill="none" stroke="var(--gold-dark)" strokeWidth="6" strokeLinecap="round" />
          <path d="M10 200 Q0 175 8 165 Q18 178 15 200" fill="none" stroke="var(--gold-dark)" strokeWidth="4" strokeLinecap="round" />
          <path d="M165 250 Q195 225 215 205 Q225 195 218 185 Q205 198 190 218" fill="none" stroke="var(--gold-dark)" strokeWidth="6" strokeLinecap="round" />
          <path d="M215 205 Q235 190 228 175 Q216 185 218 205" fill="none" stroke="var(--gold-dark)" strokeWidth="4" strokeLinecap="round" />
          {/* Листья/ветки на голове */}
          <path d="M80 175 Q70 145 55 130 Q75 140 85 160" fill="none" stroke="var(--gold-dark)" strokeWidth="4" strokeLinecap="round" />
          <path d="M55 130 Q45 110 50 95 Q60 112 62 132" fill="none" stroke="var(--gold-dark)" strokeWidth="3" strokeLinecap="round" />
          <path d="M100 165 Q95 135 100 115 Q110 135 108 162" fill="none" stroke="var(--gold-dark)" strokeWidth="4" strokeLinecap="round" />
          <path d="M120 165 Q128 138 140 125 Q135 148 122 168" fill="none" stroke="var(--gold-dark)" strokeWidth="4" strokeLinecap="round" />
          <path d="M140 125 Q148 105 158 98 Q152 118 142 130" fill="none" stroke="var(--gold-dark)" strokeWidth="3" strokeLinecap="round" />
          {/* Глаза */}
          <ellipse cx="95" cy="210" rx="5" ry="6" fill="rgba(201,168,76,0.6)" />
          <ellipse cx="130" cy="208" rx="5" ry="6" fill="rgba(201,168,76,0.6)" />
          <ellipse cx="96" cy="211" rx="2" ry="3" fill="rgba(13,11,8,0.8)" />
          <ellipse cx="131" cy="209" rx="2" ry="3" fill="rgba(13,11,8,0.8)" />
          {/* Борода из корней */}
          <path d="M85 240 Q75 265 70 290 Q80 268 90 250" fill="none" stroke="var(--gold-dark)" strokeWidth="3" strokeLinecap="round" />
          <path d="M100 245 Q100 275 98 305 Q105 278 108 250" fill="none" stroke="var(--gold-dark)" strokeWidth="3" strokeLinecap="round" />
          <path d="M118 243 Q122 270 128 295 Q120 272 114 248" fill="none" stroke="var(--gold-dark)" strokeWidth="3" strokeLinecap="round" />
          {/* Мох/текстура */}
          <circle cx="75" cy="200" r="3" fill="rgba(201,168,76,0.2)" />
          <circle cx="145" cy="195" r="2" fill="rgba(201,168,76,0.2)" />
          <circle cx="110" cy="185" r="2.5" fill="rgba(201,168,76,0.15)" />
        </svg>
      </div>

      {/* КАМЕННЫЙ ВЕЛИКАН — правый нижний угол */}
      <div className="absolute bottom-0 right-0 pointer-events-none animate-fade-in delay-600" style={{ opacity: 0, animationFillMode: "forwards" }}>
        <svg width="280" height="380" viewBox="0 0 280 380" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 0.14 }}>
          {/* Ноги-скалы */}
          <path d="M70 380 Q65 350 55 320 Q70 335 80 360 Q85 330 80 295 Q98 315 95 355 Q105 320 108 285 Q122 308 115 355 L70 380Z" fill="#6b5a3e" />
          <path d="M160 380 Q165 348 175 318 Q162 332 155 362 Q148 328 152 292 Q136 312 138 356 Q128 320 124 285 Q112 306 118 355 L160 380Z" fill="#6b5a3e" />
          {/* Тело — каменная глыба */}
          <path d="M50 310 Q40 270 45 235 Q50 200 65 180 Q80 158 105 150 Q130 143 155 150 Q178 158 190 180 Q205 205 200 242 Q195 278 182 308 Q165 328 140 335 Q110 340 82 330 Q60 322 50 310Z" fill="#5a4a32" />
          {/* Трещины на теле */}
          <path d="M100 155 Q105 190 100 225" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="2" />
          <path d="M140 150 Q148 185 142 230" fill="none" stroke="rgba(201,168,76,0.25)" strokeWidth="1.5" />
          <path d="M80 200 Q110 210 130 205" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1.5" />
          <path d="M155 215 Q170 225 180 220" fill="none" stroke="rgba(201,168,76,0.2)" strokeWidth="1.5" />
          {/* Руки-скалы */}
          <path d="M50 250 Q20 235 5 215 Q15 205 30 220 Q20 200 25 185 Q38 200 42 225" fill="#5a4a32" />
          <path d="M5 215 Q-5 195 5 182 Q15 193 12 212" fill="#4a3a28" />
          <path d="M200 245 Q232 228 248 208 Q238 198 224 213 Q235 193 228 180 Q216 193 213 220" fill="#5a4a32" />
          <path d="M248 208 Q260 190 250 178 Q240 190 242 208" fill="#4a3a28" />
          {/* Голова */}
          <path d="M75 155 Q80 120 95 100 Q110 82 130 78 Q152 75 165 92 Q180 110 178 140 Q175 162 160 172 Q140 180 115 177 Q88 172 75 155Z" fill="#5a4a32" />
          {/* Рога/камни на голове */}
          <path d="M95 100 Q88 75 92 55 Q100 72 100 98" fill="#4a3a28" />
          <path d="M130 78 Q125 50 132 35 Q138 55 135 78" fill="#4a3a28" />
          <path d="M162 92 Q170 68 168 50 Q160 68 160 92" fill="#4a3a28" />
          {/* Светящиеся глаза */}
          <ellipse cx="108" cy="130" rx="9" ry="8" fill="rgba(201,168,76,0.15)" />
          <ellipse cx="152" cy="128" rx="9" ry="8" fill="rgba(201,168,76,0.15)" />
          <ellipse cx="108" cy="130" rx="5" ry="5" fill="rgba(201,168,76,0.5)" />
          <ellipse cx="152" cy="128" rx="5" ry="5" fill="rgba(201,168,76,0.5)" />
          <ellipse cx="108" cy="130" rx="2" ry="2" fill="rgba(201,168,76,0.9)" />
          <ellipse cx="152" cy="128" rx="2" ry="2" fill="rgba(201,168,76,0.9)" />
          {/* Рот — суровая линия */}
          <path d="M118 152 Q130 148 143 152" fill="none" stroke="rgba(201,168,76,0.3)" strokeWidth="2" strokeLinecap="round" />
          {/* Камни вокруг */}
          <ellipse cx="30" cy="355" rx="22" ry="12" fill="#3a2e1e" />
          <ellipse cx="250" cy="360" rx="18" ry="10" fill="#3a2e1e" />
          <ellipse cx="200" cy="370" rx="14" ry="8" fill="#3a2e1e" />
        </svg>
      </div>

      {/* Частицы / споры */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[
          { left: "15%", top: "30%", size: 2, delay: "0s", dur: "6s" },
          { left: "25%", top: "60%", size: 1.5, delay: "1s", dur: "8s" },
          { left: "70%", top: "25%", size: 2, delay: "2s", dur: "7s" },
          { left: "80%", top: "55%", size: 1, delay: "0.5s", dur: "9s" },
          { left: "45%", top: "70%", size: 1.5, delay: "3s", dur: "6s" },
          { left: "55%", top: "40%", size: 1, delay: "1.5s", dur: "10s" },
          { left: "35%", top: "20%", size: 2, delay: "2.5s", dur: "7s" },
          { left: "88%", top: "35%", size: 1.5, delay: "4s", dur: "8s" },
        ].map((p, i) => (
          <div key={i} className="absolute rounded-full" style={{
            left: p.left, top: p.top,
            width: `${p.size * 2}px`, height: `${p.size * 2}px`,
            background: "rgba(201,168,76,0.4)",
            boxShadow: "0 0 6px rgba(201,168,76,0.6)",
            animation: `float ${p.dur} ease-in-out infinite`,
            animationDelay: p.delay,
          }} />
        ))}
      </div>

      {/* Основной контент */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid lg:grid-cols-2 gap-16 items-center">
        <div>
          <p className="section-label mb-6 animate-fade-in-up" style={{ opacity: 0, animationFillMode: "forwards" }}>Мастерская природных материалов</p>
          <h1 className="animate-fade-in-up delay-100" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(3rem, 6vw, 5.5rem)", lineHeight: 1.05, fontWeight: 300, opacity: 0, animationFillMode: "forwards" }}>
            Красота,<br />
            <span className="gold-shimmer">рождённая</span><br />
            природой
          </h1>
          <div className="gold-line my-8 animate-fade-in-up delay-200" style={{ opacity: 0, animationFillMode: "forwards" }} />
          <p className="animate-fade-in-up delay-300 leading-relaxed" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem", color: "var(--cream-muted)", maxWidth: "420px", opacity: 0, animationFillMode: "forwards", fontStyle: "italic", lineHeight: 1.8 }}>
            Говорят, леший отдаёт дерево лишь тому, кто слышит лес.<br />
            Каменный великан — только тому, кто чтит горы.<br />
            <span style={{ fontStyle: "normal", fontSize: "0.85rem", letterSpacing: "0.05em" }}>Мы слышим. Мы чтим. Мы создаём.</span>
          </p>
          <div className="flex flex-wrap gap-4 mt-10 animate-fade-in-up delay-400" style={{ opacity: 0, animationFillMode: "forwards" }}>
            <button className="btn-gold px-8 py-4 cursor-pointer flex items-center gap-3" style={{ borderRadius: "2px" }} onClick={() => scrollTo("Каталог")}>
              <span style={{ fontFamily: "serif", fontSize: "1.1rem", letterSpacing: "0.05em" }}>ᚠ</span>
              Смотреть каталог
            </button>
            <button className="btn-outline-gold px-8 py-4 cursor-pointer flex items-center gap-3" style={{ borderRadius: "2px" }} onClick={() => scrollTo("Портфолио")}>
              <span style={{ fontFamily: "serif", fontSize: "1.1rem", letterSpacing: "0.05em" }}>ᚹ</span>
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
            {/* Природное свечение за фото */}
            <div className="absolute -inset-4 rounded-sm" style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.08) 0%, transparent 70%)" }} />
            <img src={WOOD_IMAGE} alt="wood" className="w-full h-full object-cover animate-fade-in delay-200" style={{ opacity: 0, animationFillMode: "forwards", borderRadius: "2px" }} />
            {/* Тонкая рамка природного цвета */}
            <div className="absolute inset-0 pointer-events-none" style={{ borderRadius: "2px", boxShadow: "inset 0 0 40px rgba(13,11,8,0.5)" }} />
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