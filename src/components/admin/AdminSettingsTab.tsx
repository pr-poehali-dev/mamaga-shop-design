interface AdminSettingsTabProps {
  settings: Record<string, string>;
  setSettings: (s: Record<string, string>) => void;
  saveSettingsHandler: () => void;
  savingSettings: boolean;
}

const SETTINGS_FIELDS: [string, string][] = [
  ['hero_title', 'Заголовок главного экрана'],
  ['hero_subtitle', 'Подзаголовок главного экрана'],
  ['phone', 'Телефон'],
  ['email', 'Email'],
  ['instagram', 'Instagram (ссылка)'],
  ['telegram', 'Telegram (ссылка)'],
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
      <div className="bg-stone-800 border border-stone-700 rounded-xl p-6 space-y-4">
        {SETTINGS_FIELDS.map(([key, label]) => (
          <div key={key}>
            <label className="block text-sm text-stone-400 mb-1">{label}</label>
            <input
              className="input-field"
              value={settings[key] || ''}
              onChange={e => setSettings({ ...settings, [key]: e.target.value })}
            />
          </div>
        ))}
        <button
          onClick={saveSettingsHandler}
          disabled={savingSettings}
          className="bg-amber-700 hover:bg-amber-600 text-white px-6 py-2 rounded-lg text-sm mt-2 disabled:opacity-50"
        >
          {savingSettings ? 'Сохраняю...' : 'Сохранить настройки'}
        </button>
      </div>
    </div>
  );
}
