import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/a5fd1402-d2f7-4bf5-ab13-8c879035c0cd.jpg";
const WOOD_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/69192ff1-ef49-48af-ae42-b372e7ab926a.jpg";
const MARBLE_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/61cb8446-b721-49a6-a9ad-db0ba501bd03.jpg";

const NAV_ITEMS = ["Главная", "Каталог", "О материалах", "Мифы", "Портфолио", "Услуги", "Блог", "Контакты"];

const PRODUCTS = [
  { id: 1, name: "Столешница из слэба ореха", material: "дерево", style: "лофт", price: 85000, tag: "Популярное", img: WOOD_IMAGE },
  { id: 2, name: "Столешница из мрамора Calacatta", material: "камень", style: "классика", price: 140000, tag: "Новинка", img: MARBLE_IMAGE },
  { id: 3, name: "Подстолье из кованого металла", material: "металл", style: "лофт", price: 45000, tag: null, img: HERO_IMAGE },
  { id: 4, name: "Полка из массива дуба", material: "дерево", style: "минимализм", price: 28000, tag: null, img: WOOD_IMAGE },
  { id: 5, name: "Столешница из гранита", material: "камень", style: "классика", price: 95000, tag: "Хит", img: MARBLE_IMAGE },
  { id: 6, name: "Экран из латуни и стали", material: "металл", style: "арт-деко", price: 62000, tag: null, img: HERO_IMAGE },
];

const MATERIALS = [
  { name: "Дерево", desc: "Слэбы, массив, шпон. Дуб, орех, ясень, карагач — каждое изделие уникально, как сама природа.", icon: "🌳" },
  { name: "Металл", desc: "Сталь, медь, латунь, бронза. Кованные и литые элементы с ручной патиной и полировкой.", icon: "⚙️" },
  { name: "Камень", desc: "Мрамор, гранит, оникс, сланец. Природные блоки с минимальной обработкой для максимальной выразительности.", icon: "🪨" },
];

const MYTHS = [
  { q: "Натуральные материалы — это всегда дорого", a: "Долгосрочная инвестиция: изделие из массива дуба служит 50+ лет без ремонта. Итоговая стоимость владения ниже, чем у дешёвых аналогов." },
  { q: "Дерево боится влаги и рассыхается", a: "При профессиональной обработке маслами и воском дерево надёжно защищено. Мы применяем немецкие покрытия Osmo с гарантией 10 лет." },
  { q: "Камень слишком тяжёлый для мебели", a: "Современные технологии позволяют делать слэбы толщиной 20–30 мм без потери прочности. Наши столешницы не требуют усиленных оснований." },
  { q: "Металл ржавеет и пачкает ткань", a: "Все изделия проходят обработку антикоррозийными составами и покрываются воском или лаком. Острые кромки снимаются вручную." },
];

const PORTFOLIO_ITEMS = [
  { title: "Ресторан «Сосна»", desc: "Барная стойка из слэба грецкого ореха, 4.2 м", tag: "Дерево" },
  { title: "Пентхаус Москва-Сити", desc: "Кухня с мраморными столешницами и латунной фурнитурой", tag: "Камень + Металл" },
  { title: "Офис IT-компании", desc: "20 рабочих столов из дуба с кованым основанием", tag: "Дерево + Металл" },
];

const SERVICES = [
  { title: "Консультация по материалам", desc: "Поможем выбрать породу дерева, тип камня или металла под ваш интерьер", icon: "MessageCircle" },
  { title: "Замер и проектирование", desc: "Выезд специалиста, 3D-визуализация изделия в вашем пространстве", icon: "Ruler" },
  { title: "Изготовление под заказ", desc: "Производство от 14 дней. Собственная мастерская в Москве", icon: "Hammer" },
  { title: "Доставка и монтаж", desc: "Бережная доставка и профессиональная установка с гарантией", icon: "Truck" },
];

const BLOG_POSTS = [
  { title: "Как выбрать слэб дерева: 7 критериев", date: "18 апреля 2026", tag: "Дерево", excerpt: "Рассказываем, на что смотреть при выборе слэба: влажность, годовые кольца, трещины и как с ними работать." },
  { title: "Мрамор или кварц: сравниваем честно", date: "10 апреля 2026", tag: "Камень", excerpt: "Развенчиваем мифы и помогаем сделать осознанный выбор между натуральным и искусственным камнем." },
  { title: "Патинирование металла в домашних условиях", date: "2 апреля 2026", tag: "Металл", excerpt: "Пошаговая инструкция по созданию состаренного эффекта на медных и латунных поверхностях." },
];

const PRICE_RANGES = [
  { label: "До 30 000 ₽", min: 0, max: 30000 },
  { label: "30 000 — 80 000 ₽", min: 30000, max: 80000 },
  { label: "80 000 — 150 000 ₽", min: 80000, max: 150000 },
  { label: "Свыше 150 000 ₽", min: 150000, max: Infinity },
];

const STYLES = ["Все стили", "лофт", "классика", "минимализм", "арт-деко"];
const MATERIAL_FILTERS = ["Все материалы", "дерево", "металл", "камень"];

export default function Index() {
  const [activeSection, setActiveSection] = useState("Главная");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [materialFilter, setMaterialFilter] = useState("Все материалы");
  const [styleFilter, setStyleFilter] = useState("Все стили");
  const [priceFilter, setPriceFilter] = useState<number | null>(null);
  const [openMyth, setOpenMyth] = useState<number | null>(null);

  const filteredProducts = PRODUCTS.filter((p) => {
    const matOk = materialFilter === "Все материалы" || p.material === materialFilter;
    const styleOk = styleFilter === "Все стили" || p.style === styleFilter;
    const range = priceFilter !== null ? PRICE_RANGES[priceFilter] : null;
    const priceOk = !range || (p.price >= range.min && p.price <= range.max);
    return matOk && styleOk && priceOk;
  });

  const scrollTo = (section: string) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="min-h-screen" style={{ background: "var(--dark)", color: "var(--cream)" }}>
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50" style={{ background: "rgba(13,11,8,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(201,168,76,0.12)" }}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 flex items-center justify-center" style={{ border: "1px solid var(--gold)" }}>
              <span style={{ color: "var(--gold)", fontSize: "10px", letterSpacing: "0.05em", fontFamily: "Cormorant Garamond, serif", fontWeight: 600 }}>A</span>
            </div>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", letterSpacing: "0.2em", color: "var(--cream)" }}>ARTISANO</span>
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

      {/* HERO */}
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

      {/* КАТАЛОГ */}
      <section id="Каталог" className="py-24" style={{ background: "var(--dark-2)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-14">
            <p className="section-label mb-4">Каталог изделий</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              Найдите своё изделие
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="flex flex-col lg:flex-row gap-8 mb-10 flex-wrap">
            <div>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "10px" }}>Материал</p>
              <div className="flex flex-wrap gap-2">
                {MATERIAL_FILTERS.map((m) => (
                  <button key={m} onClick={() => setMaterialFilter(m)} className={`filter-tab px-4 py-2 ${materialFilter === m ? "active" : ""}`} style={{ borderRadius: "2px", cursor: "pointer" }}>
                    {m}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "10px" }}>Стиль</p>
              <div className="flex flex-wrap gap-2">
                {STYLES.map((s) => (
                  <button key={s} onClick={() => setStyleFilter(s)} className={`filter-tab px-4 py-2 ${styleFilter === s ? "active" : ""}`} style={{ borderRadius: "2px", cursor: "pointer" }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "10px" }}>Бюджет</p>
              <div className="flex flex-wrap gap-2">
                <button onClick={() => setPriceFilter(null)} className={`filter-tab px-4 py-2 ${priceFilter === null ? "active" : ""}`} style={{ borderRadius: "2px", cursor: "pointer" }}>Любой</button>
                {PRICE_RANGES.map((r, i) => (
                  <button key={r.label} onClick={() => setPriceFilter(i)} className={`filter-tab px-4 py-2 ${priceFilter === i ? "active" : ""}`} style={{ borderRadius: "2px", cursor: "pointer" }}>
                    {r.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-3 text-center py-16" style={{ color: "var(--cream-muted)" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem" }}>Ничего не найдено</p>
                <p className="mt-2" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", letterSpacing: "0.1em" }}>Попробуйте изменить фильтры</p>
              </div>
            ) : filteredProducts.map((p) => (
              <div key={p.id} className="product-card group relative" style={{ background: "var(--dark-3)", borderRadius: "2px", overflow: "hidden", border: "1px solid rgba(201,168,76,0.08)" }}>
                {p.tag && (
                  <div className="absolute top-4 left-4 z-10 px-3 py-1" style={{ background: "var(--gold)", borderRadius: "1px" }}>
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--dark)", textTransform: "uppercase" }}>{p.tag}</span>
                  </div>
                )}
                <div className="h-56 overflow-hidden">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>{p.material}</span>
                    <span style={{ color: "rgba(201,168,76,0.3)" }}>·</span>
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--cream-muted)", textTransform: "uppercase" }}>{p.style}</span>
                  </div>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.2 }}>{p.name}</h3>
                  <div className="flex items-center justify-between mt-4">
                    <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", color: "var(--gold)", fontWeight: 300 }}>
                      {p.price.toLocaleString("ru-RU")} ₽
                    </p>
                    <button className="btn-outline-gold px-4 py-2 cursor-pointer" style={{ borderRadius: "2px", fontSize: "0.6rem" }}>Подробнее</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* О МАТЕРИАЛАХ */}
      <section id="О материалах" className="py-24" style={{ background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <p className="section-label mb-4">Наша философия</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              О материалах
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {MATERIALS.map((m, i) => (
              <div key={i} className="group p-8 relative" style={{ border: "1px solid rgba(201,168,76,0.15)", borderRadius: "2px", background: "rgba(201,168,76,0.02)", transition: "all 0.4s ease" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)")}>
                <div className="text-4xl mb-6">{m.icon}</div>
                <div className="gold-line mb-6" />
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.8rem", fontWeight: 400, marginBottom: "12px" }}>{m.name}</h3>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", lineHeight: 1.8, color: "var(--cream-muted)" }}>{m.desc}</p>
                <button className="mt-6 flex items-center gap-2 nav-link" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}>
                  Узнать больше <Icon name="ArrowRight" size={12} />
                </button>
              </div>
            ))}
          </div>

          <div className="mt-20 grid lg:grid-cols-2 gap-0 overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.15)", borderRadius: "2px" }}>
            <div className="relative h-80 lg:h-auto">
              <img src={MARBLE_IMAGE} alt="material" className="w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: "rgba(13,11,8,0.4)" }} />
            </div>
            <div className="p-12 flex flex-col justify-center" style={{ background: "var(--dark-3)" }}>
              <p className="section-label mb-6">Наш подход</p>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300, lineHeight: 1.2 }}>
                Минимальная обработка — максимальная красота
              </h3>
              <div className="gold-line my-6" />
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", lineHeight: 1.9, color: "var(--cream-muted)" }}>
                Мы убеждены: природа создаёт лучший дизайн. Наша задача — бережно раскрыть красоту материала, сохранить его живые линии и текстуры, а не скрыть их под слоями лака.
              </p>
              <p className="mt-4" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", lineHeight: 1.9, color: "var(--cream-muted)" }}>
                Каждый слэб — уникален. Каждое изделие — единственное в мире.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* МИФЫ */}
      <section id="Мифы" className="py-24" style={{ background: "var(--dark-2)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <p className="section-label mb-4">Развенчиваем заблуждения</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              Мифы о натуральных<br />материалах
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="flex flex-col gap-0">
            {MYTHS.map((myth, i) => (
              <div key={i} className="myth-item">
                <button className="w-full flex items-center justify-between py-7 text-left group" onClick={() => setOpenMyth(openMyth === i ? null : i)} style={{ background: "none", border: "none", cursor: "pointer" }}>
                  <div className="flex items-start gap-4">
                    <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", color: "var(--gold)", minWidth: "28px" }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", fontWeight: 400, lineHeight: 1.3, color: openMyth === i ? "var(--gold)" : "var(--cream)" }}>
                      {myth.q}
                    </h3>
                  </div>
                  <Icon name={openMyth === i ? "Minus" : "Plus"} size={16} style={{ color: "var(--gold)", flexShrink: 0, marginLeft: "16px" }} />
                </button>
                {openMyth === i && (
                  <div className="pb-7 pl-10">
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.82rem", lineHeight: 1.9, color: "var(--cream-muted)" }}>{myth.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ПОРТФОЛИО */}
      <section id="Портфолио" className="py-24" style={{ background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <p className="section-label mb-4">Наши работы</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              Портфолио
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {PORTFOLIO_ITEMS.map((item, i) => (
              <div key={i} className="product-card relative overflow-hidden group" style={{ height: "400px", borderRadius: "2px" }}>
                <img src={i % 2 === 0 ? WOOD_IMAGE : MARBLE_IMAGE} alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(13,11,8,0.95) 0%, rgba(13,11,8,0.3) 60%, transparent 100%)" }} />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>{item.tag}</span>
                  <h3 className="mt-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", fontWeight: 400 }}>{item.title}</h3>
                  <p className="mt-1" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", color: "var(--cream-muted)", lineHeight: 1.6 }}>{item.desc}</p>
                  <button className="mt-5 flex items-center gap-2 nav-link" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}>
                    Смотреть проект <Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline-gold px-10 py-4 cursor-pointer" style={{ borderRadius: "2px" }}>Все проекты</button>
          </div>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="Услуги" className="py-24" style={{ background: "var(--dark-2)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <p className="section-label mb-4">Что мы делаем</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              Услуги
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((s, i) => (
              <div key={i} className="p-8 text-center" style={{ border: "1px solid rgba(201,168,76,0.12)", borderRadius: "2px", transition: "all 0.4s ease" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)"; e.currentTarget.style.background = "rgba(201,168,76,0.03)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "rgba(201,168,76,0.12)"; e.currentTarget.style.background = "transparent"; }}>
                <div className="w-12 h-12 mx-auto mb-6 flex items-center justify-center" style={{ border: "1px solid rgba(201,168,76,0.3)", borderRadius: "2px" }}>
                  <Icon name={s.icon} size={20} style={{ color: "var(--gold)" }} fallback="Star" />
                </div>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", fontWeight: 400, marginBottom: "10px" }}>{s.title}</h3>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", lineHeight: 1.8, color: "var(--cream-muted)" }}>{s.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 p-10 text-center" style={{ border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px", background: "rgba(201,168,76,0.03)" }}>
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300 }}>Готовы обсудить ваш проект?</h3>
            <p className="mt-4 mb-8" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", color: "var(--cream-muted)" }}>Расскажите нам о своей идее — мы предложим оптимальное решение и материалы</p>
            <button className="btn-gold px-10 py-4 cursor-pointer" style={{ borderRadius: "2px" }} onClick={() => scrollTo("Контакты")}>Получить консультацию</button>
          </div>
        </div>
      </section>

      {/* БЛОГ */}
      <section id="Блог" className="py-24" style={{ background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <p className="section-label mb-4">Знания и опыт</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              Блог
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className="blog-card group" style={{ border: "1px solid rgba(201,168,76,0.1)", borderRadius: "2px", overflow: "hidden", background: "var(--dark-3)" }}>
                <div className="h-48 overflow-hidden">
                  <img src={i === 0 ? WOOD_IMAGE : i === 1 ? MARBLE_IMAGE : HERO_IMAGE} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em", color: "var(--gold)", textTransform: "uppercase", border: "1px solid rgba(201,168,76,0.4)", padding: "2px 8px", borderRadius: "1px" }}>{post.tag}</span>
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", color: "var(--cream-muted)" }}>{post.date}</span>
                  </div>
                  <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.3, marginBottom: "10px" }}>{post.title}</h3>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", lineHeight: 1.8, color: "var(--cream-muted)" }}>{post.excerpt}</p>
                  <button className="mt-6 flex items-center gap-2 blog-read-more transition-colors duration-300" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cream-muted)", background: "none", border: "none", cursor: "pointer" }}>
                    Читать далее <Icon name="ArrowRight" size={11} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* КОНТАКТЫ */}
      <section id="Контакты" className="py-24" style={{ background: "var(--dark-2)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <p className="section-label mb-4">Будем рады общению</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              Контакты
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.6rem", fontWeight: 300, marginBottom: "24px" }}>Напишите нам</h3>
              <form className="flex flex-col gap-5">
                {["Ваше имя", "Номер телефона", "E-mail"].map((placeholder) => (
                  <input key={placeholder} type="text" placeholder={placeholder} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px", padding: "14px 18px", fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", color: "var(--cream)", outline: "none", transition: "border-color 0.3s", width: "100%" }}
                    onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.2)")} />
                ))}
                <textarea placeholder="Расскажите о вашем проекте..." rows={4} style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px", padding: "14px 18px", fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", color: "var(--cream)", outline: "none", resize: "none", transition: "border-color 0.3s", width: "100%" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(201,168,76,0.6)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(201,168,76,0.2)")} />
                <button type="submit" className="btn-gold py-4 cursor-pointer" style={{ borderRadius: "2px" }}>Отправить заявку</button>
              </form>
            </div>

            <div className="flex flex-col gap-8">
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.6rem", fontWeight: 300 }}>Реквизиты</h3>
              {[
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Мастеровая, 14, стр. 2" },
                { icon: "Phone", label: "Телефон", value: "+7 (495) 123-45-67" },
                { icon: "Mail", label: "E-mail", value: "hello@artisano.ru" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт 9:00–19:00, Сб 10:00–16:00" },
              ].map((c) => (
                <div key={c.label} className="flex items-start gap-5">
                  <div className="w-10 h-10 flex items-center justify-center flex-shrink-0" style={{ border: "1px solid rgba(201,168,76,0.3)", borderRadius: "2px" }}>
                    <Icon name={c.icon} size={16} style={{ color: "var(--gold)" }} fallback="Star" />
                  </div>
                  <div>
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "4px" }}>{c.label}</p>
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.85rem", color: "var(--cream)" }}>{c.value}</p>
                  </div>
                </div>
              ))}

              <div className="mt-4 p-6" style={{ background: "rgba(201,168,76,0.05)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px" }}>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", fontStyle: "italic", color: "var(--cream-muted)", lineHeight: 1.7 }}>
                  "Мы принимаем проекты любого масштаба — от одной полки до полного оснащения ресторана. Приезжайте в шоу-рум или закажите выезд специалиста."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-10" style={{ borderTop: "1px solid rgba(201,168,76,0.15)", background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 flex items-center justify-center" style={{ border: "1px solid rgba(201,168,76,0.4)" }}>
              <span style={{ color: "var(--gold)", fontSize: "9px", fontFamily: "Cormorant Garamond, serif", fontWeight: 600 }}>A</span>
            </div>
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", letterSpacing: "0.2em", color: "var(--cream-muted)" }}>ARTISANO</span>
          </div>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--cream-muted)", opacity: 0.5 }}>
            © 2026 ARTISANO. Все права защищены.
          </p>
          <div className="flex gap-6">
            {["ВКонтакте", "Telegram", "Дзен"].map((s) => (
              <button key={s} className="nav-link" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--cream-muted)", background: "none", border: "none", cursor: "pointer" }}>
                {s}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}