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
  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Настройки сайта</h2>
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
