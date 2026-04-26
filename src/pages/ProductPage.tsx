import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import Icon from "@/components/ui/icon";
import { api } from "@/lib/api";

interface Product {
  id: number;
  title: string;
  description?: string;
  material: string;
  style: string;
  price: number;
  image_url: string;
  is_visible?: boolean;
}

const MATERIAL_RUNES: Record<string, string> = {
  дерево: "ᚦ",
  металл: "ᚢ",
  железо: "ᚢ",
  камень: "ᚱ",
  корнепластика: "ᚹ",
};

const FALLBACK: Product[] = [
  { id: 1, title: "Столешница из слэба ореха", description: "Живая текстура грецкого ореха, пропитка маслом, уникальный рисунок.", material: "дерево", style: "лофт", price: 85000, image_url: "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/0b859a9e-8cca-4712-9284-c6b9628bb842.jpg" },
  { id: 2, title: "Столешница из мрамора Calacatta", description: "Итальянский мрамор с золотистыми прожилками. Полировка зеркало.", material: "камень", style: "классика", price: 140000, image_url: "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/d50a62b6-2324-4f9c-b1c6-4861301cdfe6.jpg" },
  { id: 3, title: "Подстолье из кованого металла", description: "Ручная ковка, патинирование, матовое покрытие воском.", material: "металл", style: "лофт", price: 45000, image_url: "https://cdn.poehali.dev/projects/b2e86887-0b17-4b4c-8739-174a406118f0/files/e93c2ccd-1cf6-4059-82f1-e74aab891821.jpg" },
];

export default function ProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  const ymGoal = (goal: string, params?: Record<string, unknown>) => {
    try {
      const w = window as unknown as Record<string, (...args: unknown[]) => void>;
      if (typeof w['ym'] === 'function') {
        w['ym'](108756174, 'reachGoal', goal, params);
        w['ym'](108770703, 'reachGoal', goal, params);
      }
    } catch (e) { void e; }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    api.getProducts()
      .then((data: Product[]) => {
        const list = Array.isArray(data) && data.length > 0 ? data : FALLBACK;
        const found = list.find(p => String(p.id) === id);
        setProduct(found || null);
        if (found) {
          const w = window as unknown as { dataLayer?: unknown[] };
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({ ecommerce: { detail: { products: [{ id: String(found.id), name: found.title, price: found.price, category: found.material }] } } });
        }
      })
      .catch(() => {
        const found = FALLBACK.find(p => String(p.id) === id);
        setProduct(found || null);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const scrollToContacts = () => {
    navigate("/");
    setTimeout(() => {
      const el = document.getElementById("Контакты");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 300);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--dark)" }}>
        <div style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", color: "var(--cream-muted)" }}>...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: "var(--dark)" }}>
        <div className="text-center">
          <p style={{ color: "var(--cream-muted)", fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem" }}>Изделие не найдено</p>
          <button onClick={() => navigate("/")} className="mt-6 btn-gold px-6 py-2 text-sm">На главную</button>
        </div>
      </div>
    );
  }

  const rune = MATERIAL_RUNES[product.material?.toLowerCase()] || "ᚱ";

  return (
    <div className="min-h-screen" style={{ background: "var(--dark)" }}>
      <Helmet>
        <title>{product.title} — VKORNE, Санкт-Петербург</title>
        <meta name="description" content={product.description || `${product.title}. Ручная работа. Мастерская VKORNE, Санкт-Петербург.`} />
        <link rel="canonical" href={`https://vkorne.space/product/${id}`} />
        <meta property="og:title" content={`${product.title} — VKORNE`} />
        <meta property="og:description" content={product.description || `${product.title}. Ручная работа. Мастерская VKORNE, Санкт-Петербург.`} />
        <meta property="og:url" content={`https://vkorne.space/product/${id}`} />
        <meta property="og:image" content={product.image_url} />
        <meta property="og:type" content="product" />
      </Helmet>

      {/* Hero */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${product.image_url})`, transform: "scale(1.05)" }}
        />
        <div className="absolute inset-0" style={{ background: "rgba(10,8,5,0.72)" }} />

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
            {rune}
          </div>
          <p className="section-label mb-4" style={{ letterSpacing: "0.25em" }}>{product.material} · {product.style}</p>
          <h1 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "clamp(2.5rem, 7vw, 5rem)", fontWeight: 300, color: "var(--cream)", lineHeight: 1.1 }}>
            {product.title}
          </h1>
          <div className="gold-line my-6 mx-auto" />
          <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.5rem", fontWeight: 300, color: "var(--gold)" }}>
            {product.price ? `${product.price.toLocaleString("ru-RU")} ₽` : "по запросу"}
          </p>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ color: "var(--gold)", opacity: 0.5 }}>
          <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Прокрутите</span>
          <Icon name="ChevronDown" size={16} />
        </div>
      </div>

      {/* Описание */}
      <section className="py-20 px-6" style={{ background: "var(--dark-2)" }}>
        <div className="max-w-3xl mx-auto text-center">
          {product.description && (
            <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.3rem", lineHeight: 2, color: "var(--cream-muted)", fontStyle: "italic" }}>
              {product.description}
            </p>
          )}
          <div className="gold-line my-10 mx-auto" />
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mb-10">
            {product.material && (
              <div className="text-center">
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.58rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "8px" }}>Материал</p>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", color: "var(--cream)" }}>{product.material}</p>
              </div>
            )}
            <div style={{ width: "1px", height: "40px", background: "rgba(201,168,76,0.2)" }} className="hidden sm:block" />
            {product.style && (
              <div className="text-center">
                <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.58rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "8px" }}>Стиль</p>
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.2rem", color: "var(--cream)" }}>{product.style}</p>
              </div>
            )}
            <div style={{ width: "1px", height: "40px", background: "rgba(201,168,76,0.2)" }} className="hidden sm:block" />
            <div className="text-center">
              <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.58rem", letterSpacing: "0.25em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "8px" }}>Стоимость</p>
              <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.4rem", color: "var(--cream)" }}>
                {product.price ? `${product.price.toLocaleString("ru-RU")} ₽` : "по запросу"}
              </p>
            </div>
          </div>
          <button
            onClick={() => { ymGoal('discuss_order', { product: product.title }); scrollToContacts(); }}
            className="btn-gold px-10 py-4 flex items-center gap-3 mx-auto"
            style={{ borderRadius: "2px", fontFamily: "Montserrat, sans-serif", fontSize: "0.7rem", letterSpacing: "0.2em", textTransform: "uppercase", cursor: "pointer" }}
          >
            <span style={{ fontFamily: "serif", fontSize: "1.1rem" }}>{rune}</span>
            Обсудить заказ
          </button>
        </div>
      </section>

      {/* Фото крупно */}
      <section className="py-20 px-6" style={{ background: "var(--dark)" }}>
        <div className="max-w-4xl mx-auto">
          <img
            src={product.image_url}
            alt={product.title}
            className="w-full"
            style={{ borderRadius: "2px", border: "1px solid rgba(201,168,76,0.15)" }}
          />
        </div>
      </section>
    </div>
  );
}