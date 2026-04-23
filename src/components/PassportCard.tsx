import Icon from "@/components/ui/icon";

interface PassportCardProps {
  image: string;
  title: string;
  description: string;
  price: number;
  material?: string;
  style?: string;
  rune?: string;
  onClose: () => void;
  onContact?: () => void;
}

export default function PassportCard({ image, title, description, price, material, style, rune = "ᚱ", onClose, onContact }: PassportCardProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: "rgba(5,4,3,0.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
    >
      <div
        onClick={e => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto"
        style={{
          background: "var(--dark-3)",
          border: "1px solid rgba(201,168,76,0.25)",
          borderRadius: "2px",
          boxShadow: "0 40px 80px rgba(0,0,0,0.7)",
        }}
      >
        {/* Закрыть */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 flex items-center justify-center w-9 h-9"
          style={{ background: "rgba(13,11,8,0.8)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px", color: "var(--cream-muted)", cursor: "pointer" }}
        >
          <Icon name="X" size={16} />
        </button>

        <div className="grid md:grid-cols-2">
          {/* Фото */}
          <div className="relative" style={{ minHeight: "340px" }}>
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover"
              style={{ minHeight: "340px" }}
            />
            <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(13,11,8,0.3) 0%, rgba(13,11,8,0.1) 100%)" }} />
            {/* Руна-водяной знак */}
            <div className="absolute bottom-4 left-4" style={{ fontFamily: "serif", fontSize: "4rem", color: "rgba(201,168,76,0.15)", lineHeight: 1 }}>
              {rune}
            </div>
          </div>

          {/* Паспорт */}
          <div className="p-8 flex flex-col justify-between" style={{ minHeight: "340px" }}>
            {/* Шапка */}
            <div>
              <p className="section-label mb-3" style={{ fontSize: "0.55rem", letterSpacing: "0.3em" }}>
                Паспорт изделия · VKORNE
              </p>
              <div className="gold-line mb-5" style={{ width: "48px" }} />

              <h2 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.7rem", fontWeight: 300, lineHeight: 1.2, color: "var(--cream)", marginBottom: "16px" }}>
                {title}
              </h2>

              {/* Характеристики */}
              <div className="flex flex-col gap-3 mb-6">
                {material && (
                  <div className="flex items-center gap-3">
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", minWidth: "80px" }}>Материал</span>
                    <span style={{ width: "1px", height: "12px", background: "rgba(201,168,76,0.3)" }} />
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", color: "var(--cream)" }}>{material}</span>
                  </div>
                )}
                {style && (
                  <div className="flex items-center gap-3">
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.58rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", minWidth: "80px" }}>Стиль</span>
                    <span style={{ width: "1px", height: "12px", background: "rgba(201,168,76,0.3)" }} />
                    <span style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.78rem", color: "var(--cream)" }}>{style}</span>
                  </div>
                )}
              </div>

              {description && (
                <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", lineHeight: 1.8, color: "var(--cream-muted)", fontStyle: "italic", marginBottom: "24px" }}>
                  {description}
                </p>
              )}
            </div>

            {/* Цена и кнопка */}
            <div>
              <div className="gold-line mb-5" style={{ width: "48px" }} />
              <div className="flex items-end justify-between gap-4 flex-wrap">
                <div>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.55rem", letterSpacing: "0.2em", color: "var(--gold)", textTransform: "uppercase", marginBottom: "4px" }}>
                    Стоимость
                  </p>
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "2rem", fontWeight: 300, color: "var(--cream)", lineHeight: 1 }}>
                    {price ? `${price.toLocaleString("ru-RU")} ₽` : "по запросу"}
                  </p>
                </div>
                {onContact && (
                  <button
                    onClick={onContact}
                    className="btn-gold px-6 py-3 flex items-center gap-2"
                    style={{ borderRadius: "2px", fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", textTransform: "uppercase", cursor: "pointer" }}
                  >
                    <span style={{ fontFamily: "serif", fontSize: "1rem" }}>ᚢ</span>
                    Заказать
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя полоска */}
        <div style={{ height: "3px", background: "linear-gradient(90deg, transparent, rgba(201,168,76,0.6), transparent)" }} />
      </div>
    </div>
  );
}
