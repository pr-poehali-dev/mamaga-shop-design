import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "@/components/ui/icon";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/e93c2ccd-1cf6-4059-82f1-e74aab891821.jpg";
const WOOD_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/0b859a9e-8cca-4712-9284-c6b9628bb842.jpg";
const MARBLE_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/d50a62b6-2324-4f9c-b1c6-4861301cdfe6.jpg";

const MATERIALS = [
  { name: "Дерево", slug: "derevo", desc: "Корень, сук, наплыв — не изъян, а голос дерева. Мы слышим, чем хочет стать каждая ветвь. Дуб, орех, карагач: каждое изделие — это судьба, прожитая деревом.", icon: "🌳" },
  { name: "Железо", slug: "zhelezo", desc: "Металл не терпит слабых рук. Но тому, кто умеет держать огонь — он подчиняется как вода. Латунь, сталь, бронза: жёсткость снаружи, душа внутри.", icon: "⚙️" },
  { name: "Камень", slug: "kamen", desc: "Камень молчит тысячелетиями. Но однажды — раскалывается, и внутри оказывается то, чего не видел ни один глаз. Мрамор, оникс, гранит: красота, которую нельзя придумать.", icon: "🪨" },
  { name: "Корнепластика", slug: "korneplastika", desc: "Корнепластика — это не стиль. Это философия: дерево, железо и камень не соединяются — они срастаются, как срастаются корни разных деревьев под землёй. Каждое изделие — живой организм из трёх стихий.", icon: "🌿" },
];

const MYTHS = [
  {
    material: "Дерево",
    title: "Корона Лесного Царя",
    icon: "🌳",
    img: WOOD_IMAGE,
    story: "Говорят, в чаще, куда не ступала нога человека, живёт Лесной Царь. Трон его выточен из единого дуба, которому тысяча лет — и ни единый топор не смел коснуться его без дозволения. Тот, кто приносил дары лесу и слушал голос ветра в ветвях, мог получить от Царя ветвь. Из такой ветви вырастало изделие, которое хранило дом от зла, притягивало достаток и передавалось детям как самое дорогое наследство.",
  },
  {
    material: "Камень",
    title: "Слёзы Горного Великана",
    icon: "🪨",
    img: MARBLE_IMAGE,
    story: "В незапамятные времена Великан держал небо на плечах, пока боги спорили о судьбах мира. Когда усталость взяла своё — единственная слеза упала в сердце горы и застыла мрамором. С тех пор в каждой прожилке белого камня живёт память о той тяжести и той силе. Войти в дом, где лежит такой камень — значит войти под защиту самого неба.",
  },
  {
    material: "Металл",
    title: "Кузня на краю мира",
    icon: "⚔️",
    img: HERO_IMAGE,
    story: "На краю света, где закат встречается с рассветом, стоит кузня бога-огня. Латунь там льётся как мёд, сталь поётся как струна, бронза пахнет грозой. Кузнец не торопится — он бьёт молотом ровно столько раз, сколько нужно, чтобы металл забыл о руде и вспомнил о красоте. Говорят, изделие из такой кузни не стареет — оно лишь становится богаче с каждым прожитым годом.",
  },
  {
    material: "Три стихии",
    title: "Пир Трёх Стихий",
    icon: "🔥",
    img: WOOD_IMAGE,
    story: "Однажды Лес, Гора и Огонь сели за один стол — и это был единственный раз в истории мира, когда три великие силы договорились. Лес принёс тепло и живую нить годовых колец. Гора — холодное величие и вечность. Огонь — волю превратить одно в другое. С тех пор мастер, который умеет говорить со всеми тремя, создаёт не мебель, а алтари повседневной жизни — для тех, кто понимает разницу.",
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
  const [openMyth, setOpenMyth] = useState<number | null>(null);
  const navigate = useNavigate();

  return (
    <>
      {/* О МАТЕРИАЛАХ */}
      <section id="О материалах" className="py-24" style={{ background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-center mb-16">
            <p className="section-label mb-4">Три стихии · Одна воля</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              О материалах
            </h2>
            <div className="gold-line mt-5" />
            <p className="mt-6" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.05rem", fontStyle: "italic", color: "var(--cream-muted)", textAlign: "center", maxWidth: "520px", lineHeight: 1.9 }}>
              «Не спрашивай, из чего сделан мир — спроси, кто решился его тронуть.»
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {MATERIALS.map((m, i) => (
              <div key={i} className="group p-8 relative" style={{ border: "1px solid rgba(201,168,76,0.15)", borderRadius: "2px", background: "rgba(201,168,76,0.02)", transition: "all 0.4s ease" }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.5)")}
                onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)")}>
                <div className="text-4xl mb-6">{m.icon}</div>
                <div className="gold-line mb-6" />
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.8rem", fontWeight: 400, marginBottom: "12px" }}>{m.name}</h3>
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", lineHeight: 1.8, color: "var(--cream-muted)" }}>{m.desc}</p>
                <button onClick={() => navigate(`/material/${m.slug}`)} className="mt-6 flex items-center gap-2 nav-link" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}>
                  <span style={{ fontFamily: "serif", fontSize: "1rem" }}>ᚱ</span> Узнать больше
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
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300, lineHeight: 1.2 }}>
                Там, где дерево встречает камень — рождается третье
              </h3>
              <div className="gold-line my-6" />
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", lineHeight: 2, color: "var(--cream-muted)", fontStyle: "italic" }}>
                «Вино не знает, из какой лозы оно вышло. Но тот, кто пьёт — чувствует землю, солнце и время.»
              </p>
              <p className="mt-5" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", lineHeight: 1.9, color: "var(--cream-muted)" }}>
                Корнепластика — это не стиль. Это философия: дерево, железо и камень не соединяются — они срастаются, как срастаются корни разных деревьев под землёй. Каждое изделие — живой организм из трёх стихий.
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
            {MYTHS.map((myth, i) => {
              const isOpen = openMyth === i;
              const preview = myth.story.slice(0, 120) + "...";
              return (
                <div key={i} className="group relative overflow-hidden" style={{ border: `1px solid ${isOpen ? "rgba(201,168,76,0.45)" : "rgba(201,168,76,0.15)"}`, borderRadius: "2px", background: "var(--dark-3)", transition: "border-color 0.4s ease" }}
                  onMouseEnter={e => { if (!isOpen) e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)"; }}
                  onMouseLeave={e => { if (!isOpen) e.currentTarget.style.borderColor = "rgba(201,168,76,0.15)"; }}>

                  {/* Картинка */}
                  <div className="h-52 overflow-hidden relative">
                    <img src={myth.img} alt={myth.title} className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
                    <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(13,11,8,0.1) 0%, rgba(13,11,8,0.88) 100%)" }} />
                    <div className="absolute bottom-0 left-0 p-6 flex items-end gap-4">
                      <span className="text-3xl">{myth.icon}</span>
                      <div>
                        <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase" }}>{myth.material}</span>
                        <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 400, color: "var(--cream)", lineHeight: 1.1 }}>{myth.title}</h3>
                      </div>
                    </div>
                    {/* Номер */}
                    <div className="absolute top-4 right-4" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.5rem", fontWeight: 300, color: "rgba(201,168,76,0.2)", lineHeight: 1 }}>
                      {String(i + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Текст */}
                  <div className="p-7">
                    <div className="gold-line mb-5" />

                    {/* Превью — всегда виден */}
                    <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", lineHeight: 1.9, color: "var(--cream-muted)", fontStyle: "italic" }}>
                      {isOpen ? myth.story : preview}
                    </p>

                    {/* Раскрытая часть */}
                    <div style={{ overflow: "hidden", maxHeight: isOpen ? "0px" : "0px", transition: "max-height 0.5s ease" }} />

                    {/* Кнопка */}
                    <button
                      onClick={() => setOpenMyth(isOpen ? null : i)}
                      className="mt-5 flex items-center gap-2 nav-link"
                      style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.62rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--gold)", background: "none", border: "none", cursor: "pointer" }}
                    >
                        <span style={{ fontFamily: "serif", fontSize: "1rem" }}>{isOpen ? "ᛉ" : "ᛟ"}</span>
                      {isOpen ? "Свернуть" : "Читать полностью"}
                    </button>
                  </div>
                </div>
              );
            })}
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
                    <span style={{ fontFamily: "serif", fontSize: "1rem" }}>ᚦ</span> Смотреть проект
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="btn-outline-gold px-10 py-4 cursor-pointer flex items-center gap-3" style={{ borderRadius: "2px" }}>
              <span style={{ fontFamily: "serif", fontSize: "1.1rem" }}>ᚷ</span> Все проекты
            </button>
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
            <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300 }}>У каждой идеи есть материал, который её ждёт</h3>
            <p className="mt-4 mb-2" style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", color: "var(--cream-muted)", fontStyle: "italic" }}>«Глина не просит гончара. Но гончар всегда приходит.»</p>
            <p className="mt-3 mb-8" style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", color: "var(--cream-muted)", letterSpacing: "0.05em" }}>Расскажите, что вы чувствуете — мы найдём стихию, которая это выразит</p>
            <button className="btn-gold px-10 py-4 cursor-pointer flex items-center gap-3" style={{ borderRadius: "2px" }} onClick={() => scrollTo("Контакты")}>
              <span style={{ fontFamily: "serif", fontSize: "1.1rem" }}>ᚢ</span> Получить консультацию
            </button>
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
                    <span style={{ fontFamily: "serif", fontSize: "1rem" }}>ᚾ</span> Читать далее
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