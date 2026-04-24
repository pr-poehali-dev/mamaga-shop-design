import { useEffect, useState } from "react";

export const MAINTENANCE_KEY = "vkorne_maintenance_mode";

export function useMaintenanceMode() {
  const [isOn, setIsOn] = useState(() => localStorage.getItem(MAINTENANCE_KEY) === "true");

  const toggle = () => {
    const next = !isOn;
    localStorage.setItem(MAINTENANCE_KEY, String(next));
    setIsOn(next);
  };

  return { isOn, toggle };
}

export default function MaintenanceBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const check = () => setVisible(localStorage.getItem(MAINTENANCE_KEY) === "true");
    check();
    window.addEventListener("storage", check);
    const interval = setInterval(check, 500);
    return () => {
      window.removeEventListener("storage", check);
      clearInterval(interval);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      style={{ fontFamily: "'Cormorant Garamond', serif" }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#0d0b08]"
    >
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(201,168,76,0.07) 0%, transparent 70%)"
        }}
      />

      <div className="relative flex flex-col items-center gap-8 px-6 text-center max-w-xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="h-px w-12 bg-[#c9a84c] opacity-60" />
          <span className="text-[#c9a84c] text-xs tracking-[0.3em] uppercase opacity-80">VKORNE</span>
          <div className="h-px w-12 bg-[#c9a84c] opacity-60" />
        </div>

        <h1 className="text-[#f2ede4] text-4xl sm:text-5xl font-light leading-tight tracking-wide">
          Мастерская временно<br />
          <span className="text-[#c9a84c] italic">на паузе</span>
        </h1>

        <div className="h-px w-24 bg-[#c9a84c] opacity-30" />

        <p className="text-[#b8afa0] text-base sm:text-lg font-light leading-relaxed" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          В данный момент мы временно приостановили приём новых заказов.
          <br /><br />
          Благодарим за интерес к нашей работе — мы вернёмся в ближайшее время
          и с удовольствием воплотим ваши идеи в жизнь.
        </p>

        <div className="h-px w-24 bg-[#c9a84c] opacity-30" />

        <p className="text-[#b8afa0] text-sm tracking-widest uppercase opacity-60" style={{ fontFamily: "'Montserrat', sans-serif" }}>
          Санкт-Петербург
        </p>
      </div>
    </div>
  );
}
