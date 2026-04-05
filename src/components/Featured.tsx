import { useSiteData } from '@/hooks/useSiteData';
import type { Concert } from '@/hooks/useSiteData';
import Icon from '@/components/ui/icon';

const MONTH_ORDER = [
  'января', 'февраля', 'марта', 'апреля', 'мая', 'июня',
  'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'
];

const MONTH_NAMES: Record<string, string> = {
  'января': 'ЯНВАРЬ', 'февраля': 'ФЕВРАЛЬ', 'марта': 'МАРТ',
  'апреля': 'АПРЕЛЬ', 'мая': 'МАЙ', 'июня': 'ИЮНЬ',
  'июля': 'ИЮЛЬ', 'августа': 'АВГУСТ', 'сентября': 'СЕНТЯБРЬ',
  'октября': 'ОКТЯБРЬ', 'ноября': 'НОЯБРЬ', 'декабря': 'ДЕКАБРЬ'
};

const MONTH_NUM: Record<string, string> = {
  'января': '01', 'февраля': '02', 'марта': '03', 'апреля': '04',
  'мая': '05', 'июня': '06', 'июля': '07', 'августа': '08',
  'сентября': '09', 'октября': '10', 'ноября': '11', 'декабря': '12'
};

function getMonth(date: string): string {
  const parts = date.trim().split(' ');
  return parts.length >= 2 ? parts[1] : date;
}

function isPast(date: string): boolean {
  const parts = date.trim().split(' ');
  if (parts.length < 2) return false;
  const day = parseInt(parts[0]);
  const monthIdx = MONTH_ORDER.indexOf(parts[1]);
  if (monthIdx === -1) return false;
  const now = new Date();
  const concertDate = new Date(now.getFullYear(), monthIdx, day);
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  return concertDate < today;
}

function groupByMonth(concerts: Concert[]): { month: string; items: Concert[] }[] {
  const map = new Map<string, Concert[]>();
  for (const c of concerts) {
    const month = getMonth(c.date);
    if (!map.has(month)) map.set(month, []);
    map.get(month)!.push(c);
  }
  return Array.from(map.entries())
    .sort(([a], [b]) => MONTH_ORDER.indexOf(a) - MONTH_ORDER.indexOf(b))
    .map(([month, items]) => ({ month, items }));
}

export default function Featured() {
  const { data } = useSiteData();
  const concerts = (data?.concerts || []).filter(c => !isPast(c.date));
  const groups = groupByMonth(concerts);

  return (
    <div id="concerts" className="bg-black text-white min-h-screen px-6 py-20 lg:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-brand uppercase tracking-[0.4em] text-xs mb-3">{data?.settings?.concerts_month || '2026 Тур'}</p>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">{data?.settings?.concerts_title || 'КОНЦЕРТЫ'}</h2>
          </div>
          <p className="text-neutral-400 max-w-xs leading-relaxed text-sm">
            {data?.settings?.concerts_description || 'Живые выступления в лучших площадках страны. Почувствуй музыку вживую.'}
          </p>
        </div>

        {groups.length === 0 && (
          <div className="border border-neutral-800 py-16 text-center">
            <p className="text-brand uppercase tracking-[0.4em] text-xs mb-3">Скоро</p>
            <p className="text-neutral-400 text-sm">Новые даты концертов будут объявлены</p>
          </div>
        )}

        <div className="space-y-12">
          {groups.map(({ month, items }) => (
            <div key={month}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-brand uppercase tracking-[0.3em] text-xs font-bold">{MONTH_NAMES[month] || month.toUpperCase()}</span>
                <div className="flex-1 h-px bg-neutral-800" />
              </div>
              <div className="flex flex-col divide-y divide-neutral-800">
                {items.map((concert, i) => (
                  <div
                    key={concert.id ?? i}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 group"
                  >
                    <div className="flex items-center gap-6 lg:gap-10">
                      <div>
                        <div className="flex items-baseline gap-3">
                          <span className="text-2xl font-bold leading-tight w-32">{concert.date}</span>
                          <span className="w-px h-4 bg-neutral-700 self-center flex-shrink-0" />
                          <span className="text-2xl font-bold leading-tight group-hover:text-brand transition-colors duration-300">{concert.city}</span>
                        </div>
                        <div className="flex gap-3 mt-1.5">
                          <div className="w-32 flex-shrink-0">
                            <span className="text-neutral-500 text-xs uppercase tracking-wide">{concert.day}{concert.time ? ` · ${concert.time}` : ''}</span>
                          </div>
                          <div className="w-px bg-neutral-800 flex-shrink-0" />
                          <div className="text-neutral-500 text-xs">
                            {concert.venue}{concert.address ? ` · ${concert.address}` : ''}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {concert.phone && (
                        <a
                          href={`tel:${concert.phone}`}
                          className="border border-neutral-700 text-neutral-400 px-3 py-2.5 hover:border-neutral-500 hover:text-white transition-all duration-300"
                          title={concert.phone}
                        >
                          <Icon name="Phone" size={14} />
                        </a>
                      )}
                      {concert.sold ? (
                        <span className="text-neutral-600 uppercase text-xs tracking-widest border border-neutral-700 px-5 py-2.5">
                          Распродано
                        </span>
                      ) : concert.ticketUrl ? (
                        <a
                          href={concert.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="border border-brand text-brand px-6 py-2.5 uppercase text-xs tracking-widest hover:bg-brand hover:text-white transition-all duration-300"
                        >
                          Купить билет
                        </a>
                      ) : (
                        <span className="text-neutral-500 uppercase text-xs tracking-widest border border-neutral-700 px-6 py-2.5">
                          Скоро
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}