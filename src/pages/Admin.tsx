import { useState, useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { ADMIN_URL, Concert, SiteSettings } from '@/hooks/useSiteData';
import Icon from '@/components/ui/icon';

const STORAGE_KEY = 'batrai_admin_token';

export default function Admin() {
  const [token, setToken] = useState(() => localStorage.getItem(STORAGE_KEY) || '');
  const [authed, setAuthed] = useState(false);
  const [loginInput, setLoginInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<'concerts' | 'settings'>('concerts');
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [settings, setSettings] = useState<Partial<SiteSettings>>({});
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState('');
  const [editingConcert, setEditingConcert] = useState<Concert | null>(null);
  const [newConcert, setNewConcert] = useState(false);
  const queryClient = useQueryClient();

  const apiFetch = (action: string, options: RequestInit = {}, extra = '') =>
    fetch(`${ADMIN_URL}?action=${action}${extra}`, {
      ...options,
      headers: { 'Content-Type': 'application/json', 'X-Admin-Token': token, ...(options.headers || {}) },
    });

  async function loadData() {
    const res = await fetch(`${ADMIN_URL}?action=data`);
    const data = await res.json();
    setConcerts(data.concerts || []);
    setSettings(data.settings || {});
  }

  useEffect(() => {
    if (token) {
      apiFetch('settings', { method: 'GET' }).then(r => {
        if (r.status !== 401) setAuthed(true);
        else { setToken(''); localStorage.removeItem(STORAGE_KEY); }
      });
    }
  }, []);

  useEffect(() => {
    if (authed) loadData();
  }, [authed]);

  async function handleLogin() {
    setLoginError('');
    const res = await fetch(`${ADMIN_URL}?action=login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password: loginInput }),
    });
    const data = await res.json();
    if (data.ok) {
      setToken(loginInput);
      localStorage.setItem(STORAGE_KEY, loginInput);
      setAuthed(true);
    } else {
      setLoginError('Неверный пароль');
    }
  }

  function logout() {
    setToken('');
    setAuthed(false);
    localStorage.removeItem(STORAGE_KEY);
  }

  async function saveSettings() {
    setSaving(true);
    await apiFetch('settings', { method: 'PUT', body: JSON.stringify(settings) });
    queryClient.invalidateQueries({ queryKey: ['site-data'] });
    setSaveMsg('Сохранено!');
    setSaving(false);
    setTimeout(() => setSaveMsg(''), 2000);
  }

  async function saveConcert(c: Concert) {
    setSaving(true);
    await apiFetch('concerts', { method: 'PUT', body: JSON.stringify(c) });
    await loadData();
    queryClient.invalidateQueries({ queryKey: ['site-data'] });
    setEditingConcert(null);
    setSaving(false);
  }

  async function createConcert(c: Omit<Concert, 'id' | 'sort_order'>) {
    setSaving(true);
    await apiFetch('concerts', { method: 'POST', body: JSON.stringify(c) });
    await loadData();
    queryClient.invalidateQueries({ queryKey: ['site-data'] });
    setNewConcert(false);
    setSaving(false);
  }

  async function deleteConcert(id: number) {
    if (!confirm('Удалить концерт?')) return;
    await apiFetch('concerts', { method: 'DELETE' }, `&id=${id}`);
    await loadData();
    queryClient.invalidateQueries({ queryKey: ['site-data'] });
  }

  if (!authed) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center px-4">
        <div className="w-full max-w-sm">
          <h1 className="text-white text-3xl font-bold tracking-widest mb-8 text-center" style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: '0.4em' }}>
            BATRAI<br /><span className="text-brand text-lg">ADMIN</span>
          </h1>
          <div className="bg-neutral-900 p-6 space-y-4">
            <input
              type="password"
              placeholder="Пароль"
              value={loginInput}
              onChange={e => setLoginInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleLogin()}
              className="w-full bg-neutral-800 text-white px-4 py-3 outline-none border border-neutral-700 focus:border-brand"
            />
            {loginError && <p className="text-brand text-sm">{loginError}</p>}
            <button
              onClick={handleLogin}
              className="w-full bg-brand text-white py-3 uppercase tracking-widest text-sm hover:bg-red-700 transition-colors"
            >
              Войти
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <div className="border-b border-neutral-800 px-6 py-4 flex items-center justify-between">
        <h1 className="font-bold tracking-widest text-xl" style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: '0.3em' }}>
          BATRAI <span className="text-brand">ADMIN</span>
        </h1>
        <div className="flex items-center gap-4">
          <a href="/" className="text-neutral-400 hover:text-white text-sm transition-colors">← Сайт</a>
          <button onClick={logout} className="text-neutral-400 hover:text-brand text-sm transition-colors">Выйти</button>
        </div>
      </div>

      <div className="flex border-b border-neutral-800">
        {(['concerts', 'settings'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 uppercase tracking-widest text-xs transition-colors ${activeTab === tab ? 'text-brand border-b-2 border-brand' : 'text-neutral-500 hover:text-white'}`}
          >
            {tab === 'concerts' ? 'Концерты' : 'Настройки сайта'}
          </button>
        ))}
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8">

        {activeTab === 'concerts' && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Концерты ({concerts.length})</h2>
              <button
                onClick={() => setNewConcert(true)}
                className="flex items-center gap-2 bg-brand text-white px-4 py-2 text-sm uppercase tracking-widest hover:bg-red-700 transition-colors"
              >
                <Icon name="Plus" size={16} /> Добавить
              </button>
            </div>

            {newConcert && (
              <ConcertForm
                initial={{ id: 0, date: '', day: '', time: '', city: '', venue: '', ticketUrl: '', sold: false, sort_order: 0 }}
                onSave={c => createConcert(c)}
                onCancel={() => setNewConcert(false)}
                saving={saving}
                isNew
              />
            )}

            <div className="space-y-2">
              {concerts.map(c => (
                <div key={c.id}>
                  {editingConcert?.id === c.id ? (
                    <ConcertForm
                      initial={editingConcert}
                      onSave={saveConcert}
                      onCancel={() => setEditingConcert(null)}
                      saving={saving}
                    />
                  ) : (
                    <div className="flex items-center justify-between bg-neutral-900 px-4 py-3 gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <span className="text-brand text-sm font-bold whitespace-nowrap">{c.date} {c.day}{c.time ? ` · ${c.time}` : ''}</span>
                        <div className="min-w-0">
                          <div className="font-medium truncate">{c.city}</div>
                          <div className="text-neutral-400 text-xs truncate">{c.venue}</div>
                        </div>
                        {c.sold && <span className="text-xs border border-neutral-600 text-neutral-500 px-2 py-0.5 whitespace-nowrap">Распродано</span>}
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <button onClick={() => setEditingConcert(c)} className="text-neutral-400 hover:text-white p-1">
                          <Icon name="Pencil" size={16} />
                        </button>
                        <button onClick={() => deleteConcert(c.id)} className="text-neutral-400 hover:text-brand p-1">
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="space-y-8">
            <SettingsSection title="Главный экран">
              <Field label="Подпись" value={settings.hero_label || ''} onChange={v => setSettings(s => ({ ...s, hero_label: v }))} />
              <Field label="Заголовок" value={settings.hero_title || ''} onChange={v => setSettings(s => ({ ...s, hero_title: v }))} />
              <Field label="Описание" value={settings.hero_subtitle || ''} onChange={v => setSettings(s => ({ ...s, hero_subtitle: v }))} />
            </SettingsSection>

            <SettingsSection title="О себе">
              <Field label="Заголовок" value={settings.about_title || ''} onChange={v => setSettings(s => ({ ...s, about_title: v }))} />
              <Field label="Текст 1" value={settings.about_text1 || ''} onChange={v => setSettings(s => ({ ...s, about_text1: v }))} textarea />
              <Field label="Текст 2" value={settings.about_text2 || ''} onChange={v => setSettings(s => ({ ...s, about_text2: v }))} textarea />
            </SettingsSection>

            <SettingsSection title="Контакты">
              <Field label="Имя" value={settings.contact_name || ''} onChange={v => setSettings(s => ({ ...s, contact_name: v }))} />
              <Field label="Телефон" value={settings.contact_phone || ''} onChange={v => setSettings(s => ({ ...s, contact_phone: v }))} />
              <Field label="Email" value={settings.contact_email || ''} onChange={v => setSettings(s => ({ ...s, contact_email: v }))} />
            </SettingsSection>

            <SettingsSection title="Соцсети">
              <Field label="VK" value={settings.social_vk || ''} onChange={v => setSettings(s => ({ ...s, social_vk: v }))} />
              <Field label="Instagram" value={settings.social_instagram || ''} onChange={v => setSettings(s => ({ ...s, social_instagram: v }))} />
              <Field label="YouTube" value={settings.social_youtube || ''} onChange={v => setSettings(s => ({ ...s, social_youtube: v }))} />
              <Field label="TikTok" value={settings.social_tiktok || ''} onChange={v => setSettings(s => ({ ...s, social_tiktok: v }))} />
              <Field label="Telegram" value={settings.social_telegram || ''} onChange={v => setSettings(s => ({ ...s, social_telegram: v }))} />
            </SettingsSection>

            <SettingsSection title="Раздел концертов">
              <Field label="Подпись (над заголовком)" value={settings.concerts_month || ''} onChange={v => setSettings(s => ({ ...s, concerts_month: v }))} />
              <Field label="Заголовок" value={settings.concerts_title || ''} onChange={v => setSettings(s => ({ ...s, concerts_title: v }))} />
              <Field label="Описание" value={settings.concerts_description || ''} onChange={v => setSettings(s => ({ ...s, concerts_description: v }))} textarea />
            </SettingsSection>

            <SettingsSection title="Музыкальные платформы">
              <Field label="VK Музыка" value={settings.music_vk || ''} onChange={v => setSettings(s => ({ ...s, music_vk: v }))} />
              <Field label="Яндекс Музыка" value={settings.music_yandex || ''} onChange={v => setSettings(s => ({ ...s, music_yandex: v }))} />
              <Field label="Spotify" value={settings.music_spotify || ''} onChange={v => setSettings(s => ({ ...s, music_spotify: v }))} />
              <Field label="Apple Music" value={settings.music_apple || ''} onChange={v => setSettings(s => ({ ...s, music_apple: v }))} />
              <Field label="YouTube Music" value={settings.music_youtube || ''} onChange={v => setSettings(s => ({ ...s, music_youtube: v }))} />
            </SettingsSection>

            <div className="flex items-center gap-4 pt-2">
              <button
                onClick={saveSettings}
                disabled={saving}
                className="bg-brand text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-red-700 transition-colors disabled:opacity-50"
              >
                {saving ? 'Сохранение...' : 'Сохранить'}
              </button>
              {saveMsg && <span className="text-green-400 text-sm">{saveMsg}</span>}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SettingsSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="text-brand uppercase tracking-widest text-xs mb-4">{title}</h3>
      <div className="space-y-3 bg-neutral-900 p-4">{children}</div>
    </div>
  );
}

function Field({ label, value, onChange, textarea }: { label: string; value: string; onChange: (v: string) => void; textarea?: boolean }) {
  const cls = "w-full bg-neutral-800 text-white px-3 py-2 text-sm outline-none border border-neutral-700 focus:border-brand";
  return (
    <div className="flex flex-col sm:flex-row sm:items-start gap-2">
      <label className="text-neutral-400 text-sm w-36 flex-shrink-0 pt-2">{label}</label>
      {textarea ? (
        <textarea rows={3} value={value} onChange={e => onChange(e.target.value)} className={cls} />
      ) : (
        <input value={value} onChange={e => onChange(e.target.value)} className={cls} />
      )}
    </div>
  );
}

const DAYS_RU = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
const MONTHS_RU = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];

function dateToDisplay(iso: string): { date: string; day: string } {
  if (!iso) return { date: '', day: '' };
  const d = new Date(iso + 'T00:00:00');
  return {
    date: `${d.getDate()} ${MONTHS_RU[d.getMonth()]}`,
    day: DAYS_RU[d.getDay()],
  };
}

function ConcertForm({
  initial, onSave, onCancel, saving, isNew,
}: {
  initial: Concert;
  onSave: (c: Concert) => void;
  onCancel: () => void;
  saving: boolean;
  isNew?: boolean;
}) {
  const [form, setForm] = useState(initial);
  const [isoDate, setIsoDate] = useState('');
  const set = (k: keyof Concert, v: string | boolean) => setForm(f => ({ ...f, [k]: v }));

  function handleDateChange(e: React.ChangeEvent<HTMLInputElement>) {
    const iso = e.target.value;
    setIsoDate(iso);
    const { date, day } = dateToDisplay(iso);
    setForm(f => ({ ...f, date, day }));
  }

  return (
    <div className="bg-neutral-800 p-4 space-y-3 mb-2">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="sm:col-span-2">
          <label className="text-neutral-400 text-xs mb-1 block">Дата</label>
          <input
            type="date"
            value={isoDate}
            onChange={handleDateChange}
            className="w-full bg-neutral-700 text-white px-3 py-2 text-sm outline-none border border-neutral-600 focus:border-brand"
            style={{ colorScheme: 'dark' }}
          />
          {form.date && (
            <div className="text-neutral-400 text-xs mt-1">{form.date} ({form.day})</div>
          )}
        </div>
        <div>
          <label className="text-neutral-400 text-xs mb-1 block">Время начала</label>
          <input
            type="time"
            value={form.time || ''}
            onChange={e => set('time', e.target.value)}
            className="w-full bg-neutral-700 text-white px-3 py-2 text-sm outline-none border border-neutral-600 focus:border-brand"
            style={{ colorScheme: 'dark' }}
          />
        </div>
        <div>
          <label className="text-neutral-400 text-xs mb-1 block">Город</label>
          <input value={form.city} onChange={e => set('city', e.target.value)} placeholder="г. Краснодар" className="w-full bg-neutral-700 text-white px-3 py-2 text-sm outline-none border border-neutral-600 focus:border-brand" />
        </div>
        <div>
          <label className="text-neutral-400 text-xs mb-1 block">Площадка</label>
          <input value={form.venue} onChange={e => set('venue', e.target.value)} placeholder="ДК «София»" className="w-full bg-neutral-700 text-white px-3 py-2 text-sm outline-none border border-neutral-600 focus:border-brand" />
        </div>
      </div>
      <div>
        <label className="text-neutral-400 text-xs mb-1 block">Адрес площадки</label>
        <input value={form.address || ''} onChange={e => set('address', e.target.value)} placeholder="ул. Красная, 5" className="w-full bg-neutral-700 text-white px-3 py-2 text-sm outline-none border border-neutral-600 focus:border-brand" />
      </div>
      <div>
        <label className="text-neutral-400 text-xs mb-1 block">Ссылка на билеты</label>
        <input value={form.ticketUrl} onChange={e => set('ticketUrl', e.target.value)} placeholder="https://..." className="w-full bg-neutral-700 text-white px-3 py-2 text-sm outline-none border border-neutral-600 focus:border-brand" />
      </div>
      <label className="flex items-center gap-2 cursor-pointer">
        <input type="checkbox" checked={form.sold} onChange={e => set('sold', e.target.checked)} className="accent-brand" />
        <span className="text-sm text-neutral-300">Распродано</span>
      </label>
      <div className="flex gap-3 pt-1">
        <button onClick={() => onSave(form)} disabled={saving} className="bg-brand text-white px-5 py-2 text-sm uppercase tracking-widest hover:bg-red-700 transition-colors disabled:opacity-50">
          {isNew ? 'Добавить' : 'Сохранить'}
        </button>
        <button onClick={onCancel} className="text-neutral-400 hover:text-white text-sm px-3">Отмена</button>
      </div>
    </div>
  );
}