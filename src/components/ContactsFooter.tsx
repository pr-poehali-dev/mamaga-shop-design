import Icon from "@/components/ui/icon";

export default function ContactsFooter() {
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
