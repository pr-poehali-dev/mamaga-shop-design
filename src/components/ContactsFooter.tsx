import { useState } from "react";
import Icon from "@/components/ui/icon";

const SEND_CONTACT_URL = "https://functions.poehali.dev/f06415d5-74ec-4511-bfc5-a38fd0ed38ce";

export default function ContactsFooter() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(SEND_CONTACT_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email, message }),
      });
      if (res.ok) {
        setStatus("success");
        setName(""); setPhone(""); setEmail(""); setMessage("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle = { background: "rgba(255,255,255,0.03)", border: "1px solid rgba(201,168,76,0.2)", borderRadius: "2px", padding: "14px 18px", fontFamily: "Montserrat, sans-serif", fontSize: "0.8rem", color: "var(--cream)", outline: "none", transition: "border-color 0.3s", width: "100%" };
  const onFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "rgba(201,168,76,0.6)");
  const onBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => (e.target.style.borderColor = "rgba(201,168,76,0.2)");

  return (
    <>
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

              {status === "success" ? (
                <div className="p-8 text-center" style={{ border: "1px solid rgba(201,168,76,0.3)", borderRadius: "2px", background: "rgba(201,168,76,0.05)" }}>
                  <p style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.6rem", color: "var(--gold)", marginBottom: "8px" }}>Заявка отправлена</p>
                  <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", color: "var(--cream-muted)" }}>Мы свяжемся с вами в ближайшее время</p>
                  <button onClick={() => setStatus("idle")} className="mt-6 btn-outline-gold px-6 py-2 cursor-pointer flex items-center gap-2" style={{ borderRadius: "2px", fontSize: "0.7rem" }}>
                    <span style={{ fontFamily: "serif", fontSize: "1rem" }}>ᚨ</span> Отправить ещё
                  </button>
                </div>
              ) : (
                <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
                  <input type="text" placeholder="Ваше имя" value={name} onChange={e => setName(e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  <input type="text" placeholder="Номер телефона" value={phone} onChange={e => setPhone(e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  <input type="text" placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)} style={inputStyle} onFocus={onFocus} onBlur={onBlur} />
                  <textarea placeholder="Расскажите о вашем проекте..." rows={4} value={message} onChange={e => setMessage(e.target.value)} style={{ ...inputStyle, resize: "none" }} onFocus={onFocus} onBlur={onBlur} />
                  {status === "error" && (
                    <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.75rem", color: "#e57373" }}>Ошибка отправки. Попробуйте ещё раз.</p>
                  )}
                  <button type="submit" disabled={status === "loading"} className="btn-gold py-4 cursor-pointer flex items-center justify-center gap-3" style={{ borderRadius: "2px", opacity: status === "loading" ? 0.7 : 1 }}>
                    <span style={{ fontFamily: "serif", fontSize: "1.1rem" }}>{status === "loading" ? "ᛜ" : "ᛊ"}</span>
                    {status === "loading" ? "Отправляем..." : "Отправить заявку"}
                  </button>
                </form>
              )}
            </div>

            <div className="flex flex-col gap-8">
              <h3 style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1.6rem", fontWeight: 300 }}>Реквизиты</h3>
              {[
                { icon: "MapPin", label: "Адрес", value: "Москва, ул. Мастеровая, 14, стр. 2" },
                { icon: "Phone", label: "Телефон", value: "+7 (921) 235-49-67" },
                { icon: "Mail", label: "E-mail", value: "anisim4ik-10@yandex.ru" },
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
            <span style={{ fontFamily: "Cormorant Garamond, serif", fontSize: "1rem", letterSpacing: "0.2em", color: "var(--cream-muted)" }}>VKORNE</span>
          </div>
          <p style={{ fontFamily: "Montserrat, sans-serif", fontSize: "0.65rem", letterSpacing: "0.1em", color: "var(--cream-muted)", opacity: 0.5 }}>
            © 2026 VKORNE. Все права защищены.
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
    </>
  );
}