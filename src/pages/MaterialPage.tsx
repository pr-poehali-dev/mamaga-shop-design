import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { api } from "@/lib/api";
import Icon from "@/components/ui/icon";
import PassportCard from "@/components/PassportCard";

interface Photo {
  id: number;
  url: string;
  caption: string;
  price: number;
  description: string;
}

interface MaterialConfig {
  name: string;
  slug: string;
  rune: string;
  description: string;
  longDesc: string;
  bgImage: string;
  accentColor: string;
  overlayColor: string;
  photos: Photo[];
  seoTitle: string;
  seoDescription: string;
}

const MATERIALS: Record<string, MaterialConfig> = {
  derevo: {
    name: "Дерево",
    slug: "derevo",
    rune: "ᚦ",
    description: "Корень, сук, наплыв — не изъян, а голос дерева",
    longDesc: "Мы слышим, чем хочет стать каждая ветвь. Дуб, орех, карагач: каждое изделие — это судьба, прожитая деревом. Живая текстура, тёплый отклик под рукой, аромат, который не забывается.",
    bgImage: "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/6b69f803-62f5-49ae-8371-440848fe1aaa.jpg",
    accentColor: "#8B5E3C",
    overlayColor: "rgba(20,10,5,0.75)",
    photos: [],
    seoTitle: "Столешницы и изделия из дерева на заказ — VKORNE, Санкт-Петербург",
    seoDescription: "Столешницы из слэбов дуба, ореха и карагача. Ручная работа, уникальный рисунок. Изготовление на заказ в Санкт-Петербурге. Мастерская VKORNE.",
  },
  zhelezo: {
    name: "Железо",
    slug: "zhelezo",
    rune: "ᚢ",
    description: "Металл не терпит слабых рук — он подчиняется тому, кто умеет держать огонь",
    longDesc: "Латунь, сталь, бронза: жёсткость снаружи, душа внутри. Каждый удар молота — это диалог мастера с материалом. Металл помнит форму, которую ему дали руки, и хранит её веками.",
    bgImage: "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/f720c9a5-1c3f-47f4-a5bb-e328d0a69e2e.jpg",
    accentColor: "#7A6040",
    overlayColor: "rgba(10,8,5,0.80)",
    photos: [],
    seoTitle: "Изделия из металла на заказ: подстолья, полки, кованые элементы — VKORNE, СПб",
    seoDescription: "Подстолья, полки и декоративные элементы из кованой стали, латуни и бронзы. Ручная ковка, патинирование. Мастерская VKORNE, Санкт-Петербург.",
  },
  kamen: {
    name: "Камень",
    slug: "kamen",
    rune: "ᚱ",
    description: "Камень молчит тысячелетиями — но внутри скрыто то, чего не видел ни один глаз",
    longDesc: "Мрамор, оникс, гранит: красота, которую нельзя придумать. Каждая прожилка — это след времени, застывшего в породе. Холодный на ощупь — тёплый по смыслу.",
    bgImage: "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/5189ba98-0064-4203-9494-51f38bfc2c7d.jpg",
    accentColor: "#6B7B8D",
    overlayColor: "rgba(5,8,12,0.80)",
    photos: [],
    seoTitle: "Столешницы из мрамора, гранита и оникса на заказ — VKORNE, Санкт-Петербург",
    seoDescription: "Столешницы из мрамора Calacatta, гранита и оникса. Итальянский камень, полировка зеркало. Изготовление на заказ в СПб. Мастерская VKORNE.",
  },
  korneplastika: {
    name: "Корнепластика",
    slug: "korneplastika",
    rune: "ᚹ",
    description: "Не стиль — философия: дерево, железо и камень не соединяются, они срастаются",
    longDesc: "Как срастаются корни разных деревьев под землёй — так в наших изделиях три стихии становятся одним. Каждое изделие — живой организм, созданный на стыке природы и ремесла.",
    bgImage: "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/321ef37f-1560-42c4-bc9e-df5b151dae3e.jpg",
    accentColor: "#5A7A4A",
    overlayColor: "rgba(5,10,5,0.78)",
    photos: [],
    seoTitle: "Корнепластика — уникальные изделия из корней деревьев на заказ — VKORNE, СПб",
    seoDescription: "Мебель и скульптуры из корней деревьев — природная форма, ручная обработка. Уникальные изделия на заказ. Мастерская VKORNE, Санкт-Петербург.",
  },
};

interface MaterialPageProps {
  materialSlug: string;
}

export default function MaterialPage({ materialSlug }: MaterialPageProps) {
  const navigate = useNavigate();
  const material = MATERIALS[materialSlug];
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [passport, setPassport] = useState<Photo | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getMaterialPhotos(materialSlug).then(data => {
      if (Array.isArray(data)) setPhotos(data);
    });
  }, [materialSlug]);

  if (!material) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--dark)" }}>
        <div className="text-center">
          <p style={{ color: "var(--cream-muted)" }}>Страница не найдена</p>
          <button onClick={() => navigate("/")} className="mt-4 btn-gold px-6 py-2 text-sm">На главную</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: "var(--dark)" }}>
      <Helmet>
        <title>{material.seoTitle}</title>
        <meta name="description" content={material.seoDescription} />
        <link rel="canonical" href={`https://vkorne.space/material/${material.slug}`} />
        <meta property="og:title" content={material.seoTitle} />
        <meta property="og:description" content={material.seoDescription} />
        <meta property="og:url" content={`https://vkorne.space/material/${material.slug}`} />
        <meta property="og:image" content={material.bgImage} />
        <meta name="twitter:title" content={material.seoTitle} />
        <meta name="twitter:description" content={material.seoDescription} />
        <meta name="twitter:image" content={material.bgImage} />
      </Helmet>

      {/* Hero */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${material.bgImage})`, transform: "scale(1.05)" }}
        />
        <div className="absolute inset-0" style={{ background: material.overlayColor }} />

        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="absolute top-6 left-6 z-20 flex items-center gap-2 text-xs tracking-widest uppercase"
          style={{ color: "var(--cream-muted)", background: "rgba(0,0,0,0.4)", border: "1px solid rgba(201,168,76,0.2)", padding: "10px 18px", borderRadius: "2px", fontFamily: "Montserrat, sans-serif", cursor: "pointer", backdropFilter: "blur(8px)" }}
        >
          <Icon name="ArrowLeft" size={14} />
          Назад
        </button>

        <div className="relative z-10 text-center px-6 max-w-3xl">
          <div className="mb-6" style={{ fontFamily: "serif", fontSize: "4rem", color: "var(--gold)", opacity: 0.7 }}>
            {material.rune}
          </div>
          <p className="section-label mb-4" style={{ letterSpacing: "0.25em" }}>Материал · VKORNE</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(3rem, 8vw, 6rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1 }}>
            {material.name}
          </h1>
          <div className="gold-line my-6 mx-auto" />
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.1rem", fontStyle: "italic", color: "var(--cream-muted)", lineHeight: 1.8 }}>
            {material.description}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "var(--gold)", opacity: 0.5 }}>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Прокрутите</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </div>

      {/* Description */}
      <section className="py-20 px-6" style={{ background: "var(--dark-2)" }}>
        <div className="max-w-3xl mx-auto text-center">
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", lineHeight: 2, color: "var(--cream-muted)", fontStyle: "italic" }}>
            {material.longDesc}
          </p>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6" style={{ background: "var(--dark)" }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col items-center mb-14">
            <p className="section-label mb-3">Наши работы</p>
            <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, textAlign: "center" }}>
              {material.name} — галерея
            </h2>
            <div className="gold-line mt-5" />
          </div>

          {photos.length === 0 ? (
            <div className="text-center py-20" style={{ border: "1px solid rgba(201,168,76,0.1)", borderRadius: "2px" }}>
              <div style={{ fontFamily: "serif", fontSize: "3rem", color: "var(--gold)", opacity: 0.3, marginBottom: "16px" }}>{material.rune}</div>
              <p style={{ color: "var(--cream-muted)", fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", letterSpacing: "0.1em" }}>
                Фотографии работ появятся здесь
              </p>
            </div>
          ) : (
            <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
              {photos.map((photo) => (
                <div
                  key={photo.id}
                  className="break-inside-avoid cursor-pointer group relative overflow-hidden"
                  style={{ borderRadius: "2px" }}
                  onClick={() => setPassport(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption}
                    className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-2"
                    style={{ background: "rgba(13,11,8,0.6)" }}
                  >
                    <span style={{ fontFamily: "serif", fontSize: "1.8rem", color: "var(--gold)" }}>{material.rune}</span>
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--cream)", border: "1px solid rgba(201,168,76,0.4)", padding: "6px 14px", borderRadius: "2px" }}>
                      Паспорт изделия
                    </span>
                    {photo.price > 0 && (
                      <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", color: "var(--gold)" }}>
                        {photo.price.toLocaleString("ru-RU")} ₽
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 text-center" style={{ background: "var(--dark-3)" }}>
        <div className="max-w-xl mx-auto">
          <p className="section-label mb-4">Готовы создать?</p>
          <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2.2rem", fontWeight: 300, marginBottom: "20px" }}>
            Обсудим ваш проект
          </h3>
          <div className="gold-line mx-auto mb-8" />
          <button
            onClick={() => { navigate("/"); setTimeout(() => { const el = document.getElementById("Контакты"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 100); }}
            className="btn-gold px-8 py-3 text-xs tracking-widest uppercase"
            style={{ fontFamily: "Montserrat, sans-serif", borderRadius: "2px", cursor: "pointer" }}
          >
            Написать нам
          </button>
        </div>
      </section>

      {passport && (
        <PassportCard
          image={passport.url}
          title={passport.caption || material.name}
          description={passport.description}
          price={passport.price}
          material={material.name}
          rune={material.rune}
          onClose={() => setPassport(null)}
          onContact={() => {
            setPassport(null);
            navigate("/");
            setTimeout(() => { const el = document.getElementById("Контакты"); if (el) el.scrollIntoView({ behavior: "smooth" }); }, 200);
          }}
        />
      )}
    </div>
  );
}