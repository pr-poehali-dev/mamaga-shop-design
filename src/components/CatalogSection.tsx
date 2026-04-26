import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '@/lib/api';
import PassportCard from '@/components/PassportCard';

const WOOD_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/0b859a9e-8cca-4712-9284-c6b9628bb842.jpg";
const MARBLE_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/d50a62b6-2324-4f9c-b1c6-4861301cdfe6.jpg";
const HERO_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/e93c2ccd-1cf6-4059-82f1-e74aab891821.jpg";

const FALLBACK_PRODUCTS = [
  { id: 1, title: "Столешница из слэба ореха", description: "Живая текстура грецкого ореха, пропитка маслом, уникальный рисунок.", material: "дерево", style: "лофт", price: 85000, image_url: WOOD_IMAGE },
  { id: 2, title: "Столешница из мрамора Calacatta", description: "Итальянский мрамор с золотистыми прожилками. Полировка зеркало.", material: "камень", style: "классика", price: 140000, image_url: MARBLE_IMAGE },
  { id: 3, title: "Подстолье из кованого металла", description: "Ручная ковка, патинирование, матовое покрытие воском.", material: "металл", style: "лофт", price: 45000, image_url: HERO_IMAGE },
  { id: 4, title: "Полка из массива дуба", description: "Дуб 50 мм, масло-воск, скрытый крепёж. Выдерживает до 80 кг.", material: "дерево", style: "минимализм", price: 28000, image_url: WOOD_IMAGE },
  { id: 5, title: "Столешница из гранита", description: "Гранит Абсолют Блэк, полировка, кромка 45°. Толщина 30 мм.", material: "камень", style: "классика", price: 95000, image_url: MARBLE_IMAGE },
  { id: 6, title: "Экран из латуни и стали", description: "Комбинация латуни и вороненой стали. Размер под заказ.", material: "металл", style: "арт-деко", price: 62000, image_url: HERO_IMAGE },
];

const PRICE_RANGES = [
  { label: "До 30 000 ₽", min: 0, max: 30000 },
  { label: "30 000 — 80 000 ₽", min: 30000, max: 80000 },
  { label: "80 000 — 150 000 ₽", min: 80000, max: 150000 },
  { label: "Свыше 150 000 ₽", min: 150000, max: Infinity },
];

interface CatalogSectionProps {
  materialFilter: string;
  setMaterialFilter: (v: string) => void;
  styleFilter: string;
  setStyleFilter: (v: string) => void;
  priceFilter: number | null;
  setPriceFilter: (v: number | null) => void;
}

interface Product {
  id: number;
  title: string;
  description?: string;
  material: string;
  style: string;
  price: number;
  image_url: string;
}

export default function CatalogSection({ materialFilter, setMaterialFilter, styleFilter, setStyleFilter, priceFilter, setPriceFilter }: CatalogSectionProps) {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(FALLBACK_PRODUCTS);
  const [passport, setPassport] = useState<Product | null>(null);

  useEffect(() => {
    api.getProducts()
      .then(data => { if (Array.isArray(data) && data.length > 0) setProducts(data); })
      .catch(() => {});
  }, []);

  const materials = ["Все материалы", ...Array.from(new Set(products.map(p => p.material).filter(Boolean)))];
  const styles = ["Все стили", ...Array.from(new Set(products.map(p => p.style).filter(Boolean)))];

  const filteredProducts = products.filter((p) => {
    const matOk = materialFilter === "Все материалы" || p.material === materialFilter;
    const styleOk = styleFilter === "Все стили" || p.style === styleFilter;
    const range = priceFilter !== null ? PRICE_RANGES[priceFilter] : null;
    const priceOk = !range || (p.price >= range.min && p.price <= range.max);
    return matOk && styleOk && priceOk;
  });

  const scrollToContacts = () => {
    const el = document.getElementById("Контакты");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
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
              {materials.map((m) => (
                <button key={m} onClick={() => setMaterialFilter(m)} className={`filter-tab px-4 py-2 ${materialFilter === m ? "active" : ""}`} style={{ borderRadius: "2px", cursor: "pointer" }}>
                  {m}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "10px" }}>Стиль</p>
            <div className="flex flex-wrap gap-2">
              {styles.map((s) => (
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
            <div
              key={p.id}
              className="product-card group relative cursor-pointer"
              style={{ background: "var(--dark-3)", borderRadius: "2px", overflow: "hidden", border: "1px solid rgba(201,168,76,0.08)", transition: "border-color 0.3s" }}
              onClick={() => navigate(`/product/${p.id}`)}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.35)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(201,168,76,0.08)")}
            >
              <div className="h-56 overflow-hidden relative">
                <img src={p.image_url} alt={p.title} loading="lazy" decoding="async" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center" style={{ background: "rgba(13,11,8,0.5)" }}>
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", border: "1px solid rgba(201,168,76,0.5)", padding: "8px 16px", borderRadius: "2px" }}>
                    Паспорт изделия
                  </span>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase" }}>{p.material}</span>
                  <span style={{ color: "rgba(201,168,76,0.3)" }}>·</span>
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", color: "var(--cream-muted)", textTransform: "uppercase" }}>{p.style}</span>
                </div>
                <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.25rem", fontWeight: 400, lineHeight: 1.2 }}>{p.title}</h3>
                <div className="flex items-center justify-between mt-4">
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", color: "var(--gold)", fontWeight: 300 }}>
                    {p.price ? `${p.price.toLocaleString("ru-RU")} ₽` : 'по запросу'}
                  </p>
                  <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.58rem", letterSpacing: "0.12em", color: "var(--cream-muted)", textTransform: "uppercase" }}>
                    подробнее →
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {passport && (
        <PassportCard
          image={passport.image_url}
          title={passport.title}
          description={passport.description || ''}
          price={passport.price}
          material={passport.material}
          style={passport.style}
          rune="ᚱ"
          onClose={() => setPassport(null)}
          onContact={() => { setPassport(null); setTimeout(scrollToContacts, 100); }}
        />
      )}
    </section>
  );
}