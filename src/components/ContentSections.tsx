import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/a5fd1402-d2f7-4bf5-ab13-8c879035c0cd.jpg";
const WOOD_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/69192ff1-ef49-48af-ae42-b372e7ab926a.jpg";
const MARBLE_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/61cb8446-b721-49a6-a9ad-db0ba501bd03.jpg";

const MATERIALS = [
  { name: "Дерево", desc: "Слэбы, массив, шпон. Дуб, орех, ясень, карагач — каждое изделие уникально, как сама природа.", icon: "🌳" },
  { name: "Металл", desc: "Сталь, медь, латунь, бронза. Кованные и литые элементы с ручной патиной и полировкой.", icon: "⚙️" },
  { name: "Камень", desc: "Мрамор, гранит, оникс, сланец. Природные блоки с минимальной обработкой для максимальной выразительности.", icon: "🪨" },
];

const MYTHS = [
  {
    material: "Дерево",
    title: "Дерево Игдрасиль",
    icon: "🌳",
    img: WOOD_IMAGE,
    story: "В начале времён великий ясень Игдрасиль пронзил своими корнями все девять миров. Боги собирались у его ствола, чтобы вершить судьбы. Говорят, мастер, который прикасается к живому дереву с уважением, слышит его память — годовые кольца хранят каждую бурю, каждое лето, каждый рассвет за сотни лет. Изделие из массива — это не просто стол. Это часть того самого древа.",
  },
  {
    material: "Камень",
    title: "Камень из сердца горы",
    icon: "🪨",
    img: MARBLE_IMAGE,
    story: "Прометей, прикованный к скале, тысячелетиями чувствовал её тепло. Камень помнит всё: давление земных недр, огонь вулканов, холод ледников. Когда мрамор выходит на свет впервые, его прожилки — это карта путешествия длиной в миллион лет. Мы лишь помогаем камню рассказать свою историю.",
  },
  {
    material: "Металл",
    title: "Меч в камне",
    icon: "⚔️",
    img: HERO_IMAGE,
    story: "Экскалибур не был выкован — он был явлен. Металл, прошедший через огонь и волю мастера, обретает душу. Гефест, бог-кузнец, ковал не просто оружие — он вкладывал в каждый удар молота намерение, силу и судьбу. Латунь, сталь, бронза в наших руках проходят тот же путь: от руды к произведению, достойному легенды.",
  },
  {
    material: "Дерево + Камень",
    title: "Данко и его сердце",
    icon: "🔥",
    img: WOOD_IMAGE,
    story: "Данко вырвал из груди своё пылающее сердце, чтобы осветить путь людям сквозь тёмный лес. Так и природа отдаёт своё лучшее — вековой орех, каррарский мрамор, карпатский дуб. Мы принимаем этот дар с благодарностью и превращаем его в предмет, который будет согревать твой дом спустя поколения.",
  },
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

interface ContentSectionsProps {
  openMyth: number | null;
  setOpenMyth: (i: number | null) => void;
  scrollTo: (section: string) => void;
}

export default function ContentSections({ scrollTo }: ContentSectionsProps) {
  return (
    <>
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
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <p className="section-label mb-4">Легенды материалов</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              Мифы
            </h2>
            <div className="gold-line mt-5" />
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {MYTHS.map((myth, i) => (
              <div key={i} className="group relative overflow-hidden" style={{ border: "1px solid rgba(201,168,76,0.15)", borderRadius: "2px", background: "var(--dark-3)", transition: "border-color 0.4s ease" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.4)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)")}>
                <div className="h-48 overflow-hidden relative">
                  <img src={myth.img} alt={myth.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,11,8,0.2) 0%, rgba(13,11,8,0.85) 100%)" }} />
                  <div className="absolute bottom-0 left-0 p-6 flex items-end gap-4">
                    <span className="text-3xl">{myth.icon}</span>
                    <div>
                      <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase" }}>{myth.material}</span>
                      <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--cream)", lineHeight: 1.1 }}>{myth.title}</h3>
                    </div>
                  </div>
                </div>
                <div className="p-7">
                  <div className="gold-line mb-5" />
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", lineHeight: 1.9, color: "var(--cream-muted)", fontStyle: "italic" }}>{myth.story}</p>
                </div>
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
    </>
  );
}