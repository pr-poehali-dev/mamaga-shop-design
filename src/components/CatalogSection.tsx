const WOOD_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/69192ff1-ef49-48af-ae42-b372e7ab926a.jpg";
const MARBLE_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/61cb8446-b721-49a6-a9ad-db0ba501bd03.jpg";
const HERO_IMAGE = "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/a5fd1402-d2f7-4bf5-ab13-8c879035c0cd.jpg";

const PRODUCTS = [
  { id: 1, name: "Столешница из слэба ореха", material: "дерево", style: "лофт", price: 85000, tag: "Популярное", img: WOOD_IMAGE },
  { id: 2, name: "Столешница из мрамора Calacatta", material: "камень", style: "классика", price: 140000, tag: "Новинка", img: MARBLE_IMAGE },
  { id: 3, name: "Подстолье из кованого металла", material: "металл", style: "лофт", price: 45000, tag: null, img: HERO_IMAGE },
  { id: 4, name: "Полка из массива дуба", material: "дерево", style: "минимализм", price: 28000, tag: null, img: WOOD_IMAGE },
  { id: 5, name: "Столешница из гранита", material: "камень", style: "классика", price: 95000, tag: "Хит", img: MARBLE_IMAGE },
  { id: 6, name: "Экран из латуни и стали", material: "металл", style: "арт-деко", price: 62000, tag: null, img: HERO_IMAGE },
];

const PRICE_RANGES = [
  { label: "До 30 000 ₽", min: 0, max: 30000 },
  { label: "30 000 — 80 000 ₽", min: 30000, max: 80000 },
  { label: "80 000 — 150 000 ₽", min: 80000, max: 150000 },
  { label: "Свыше 150 000 ₽", min: 150000, max: Infinity },
];

const STYLES = ["Все стили", "лофт", "классика", "минимализм", "арт-деко"];
const MATERIAL_FILTERS = ["Все материалы", "дерево", "металл", "камень"];

interface CatalogSectionProps {
  materialFilter: string;
  setMaterialFilter: (v: string) => void;
  styleFilter: string;
  setStyleFilter: (v: string) => void;
  priceFilter: number | null;
  setPriceFilter: (v: number | null) => void;
}

export default function CatalogSection({ materialFilter, setMaterialFilter, styleFilter, setStyleFilter, priceFilter, setPriceFilter }: CatalogSectionProps) {
  const filteredProducts = PRODUCTS.filter((p) => {
    const matOk = materialFilter === "Все материалы" || p.material === materialFilter;
    const styleOk = styleFilter === "Все стили" || p.style === styleFilter;
    const range = priceFilter !== null ? PRICE_RANGES[priceFilter] : null;
    const priceOk = !range || (p.price >= range.min && p.price <= range.max);
    return matOk && styleOk && priceOk;
  });

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
  );
}
