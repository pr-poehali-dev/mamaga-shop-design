import { useState, useEffect } from "react";
import { MAINTENANCE_KEY } from "@/components/MaintenanceBanner";

interface AdminSettingsTabProps {
  settings: Record<string, string>;
  setSettings: (s: Record<string, string>) => void;
  saveSettingsHandler: () => void;
  savingSettings: boolean;
}

const SETTINGS_GROUPS: { group: string; fields: [string, string, string][] }[] = [
  {
    group: 'Главная страница',
    fields: [
      ['hero_title', 'Заголовок главного экрана', 'text'],
      ['hero_subtitle', 'Подзаголовок главного экрана', 'text'],
    ],
  },
  {
    group: 'Контакты',
    fields: [
      ['phone', 'Телефон', 'text'],
      ['email', 'Email', 'text'],
    ],
  },
  {
    group: 'Мессенджеры',
    fields: [
      ['telegram', 'Telegram — канал или личка (https://t.me/...)', 'text'],
      ['whatsapp', 'WhatsApp — номер без + (https://wa.me/79001234567)', 'text'],
    ],
  },
  {
    group: 'Социальные сети',
    fields: [
      ['vk', 'ВКонтакте (https://vk.com/...)', 'text'],
      ['instagram', 'Instagram (https://instagram.com/...)', 'text'],
      ['youtube', 'YouTube (https://youtube.com/...)', 'text'],
      ['dzen', 'Яндекс Дзен (https://dzen.ru/...)', 'text'],
      ['tiktok', 'TikTok (https://tiktok.com/@...)', 'text'],
    ],
  },
];

export default function AdminSettingsTab({
  settings,
  setSettings,
  saveSettingsHandler,
  savingSettings,
}: AdminSettingsTabProps) {
  const [maintenance, setMaintenance] = useState(() => localStorage.getItem(MAINTENANCE_KEY) === "true");

  useEffect(() => {
    localStorage.setItem(MAINTENANCE_KEY, String(maintenance));
  }, [maintenance]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Настройки сайта</h2>

      <div className="bg-stone-800 border border-stone-700 rounded-xl p-6 mb-6">
        <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-widest mb-4">Режим паузы</h3>
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-stone-200 text-sm font-medium">
              {maintenance ? "Сайт на паузе — клиенты видят баннер" : "Сайт работает в обычном режиме"}
            </p>
            <p className="text-stone-400 text-xs mt-1">
              Включите, если временно не принимаете заказы. Вы продолжаете видеть сайт как обычно.
            </p>
          </div>
          <button
            onClick={() => setMaintenance(v => !v)}
            className={`relative flex-shrink-0 w-14 h-7 rounded-full transition-colors duration-300 focus:outline-none ${
              maintenance ? "bg-amber-600" : "bg-stone-600"
            }`}
          >
            <span
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow transition-transform duration-300 ${
                maintenance ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>
        {maintenance && (
          <div className="mt-4 p-3 bg-amber-900/30 border border-amber-700/40 rounded-lg text-xs text-amber-300">
            Баннер активен. Новые клиенты видят сообщение о паузе. Чтобы снять — выключите переключатель выше.
          </div>
        )}
      </div>
      <div className="flex flex-col gap-6">
        {SETTINGS_GROUPS.map(({ group, fields }) => (
          <div key={group} className="bg-stone-800 border border-stone-700 rounded-xl p-6">
            <h3 className="text-sm font-semibold text-amber-400 uppercase tracking-widest mb-4">{group}</h3>
            <div className="space-y-4">
              {fields.map(([key, label]) => (
                <div key={key}>
                  <label className="block text-sm text-stone-400 mb-1">{label}</label>
                  <input
                    className="input-field"
                    value={settings[key] || ''}
                    onChange={e => setSettings({ ...settings, [key]: e.target.value })}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          onClick={saveSettingsHandler}
          disabled={savingSettings}
          className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-2 rounded-lg text-sm disabled:opacity-50 self-start"
        >
          {savingSettings ? 'Сохраняю...' : 'Сохранить настройки'}
        </button>
      </div>
    </div>
  );
}