import { useMemo, useState } from 'react';
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

const CITY_TO_REGION: Record<string, string> = {
  'батайск': 'Ростовская область',
  'зерноград': 'Ростовская область',
  'сальск': 'Ростовская область',
  'семикаракорск': 'Ростовская область',
  'песчанокопское': 'Ростовская область',
  'егорлыкская': 'Ростовская область',
  'краснодар': 'Краснодарский край',
  'ейск': 'Краснодарский край',
  'тихорецк': 'Краснодарский край',
  'выселки': 'Краснодарский край',
  'гулькевичи': 'Краснодарский край',
  'усть-лабинск': 'Краснодарский край',
  'курганинск': 'Краснодарский край',
  'лабинск': 'Краснодарский край',
  'кущёвская': 'Краснодарский край',
  'ленинградская': 'Краснодарский край',
  'отрадная': 'Краснодарский край',
  'павловская': 'Краснодарский край',
  'староминская': 'Краснодарский край',
  'тбилисская': 'Краснодарский край',
  'невинномысск': 'Ставропольский край',
  'георгиевск': 'Ставропольский край',
  'будённовск': 'Ставропольский край',
  'буденновск': 'Ставропольский край',
  'благодарный': 'Ставропольский край',
  'ипатово': 'Ставропольский край',
  'рыздвяный': 'Ставропольский край',
  'пятигорск': 'Ставропольский край',
  'владикавказ': 'Северная Осетия',
  'кизляр': 'Дагестан',
  'майкоп': 'Адыгея',
  'волгоград': 'Волгоградская область',
  'санкт-петербург': 'Санкт-Петербург',
  'москва': 'Москва',
};

function getRegion(city: string): string {
  const normalized = city
    .toLowerCase()
    .replace(/^[а-я]+\.\s*/i, '')
    .trim();
  return CITY_TO_REGION[normalized] || 'Другие регионы';
}

const SHORT_REGION_NAMES: Record<string, string> = {
  'Ростовская область': 'Ростовская',
  'Краснодарский край': 'Краснодарский',
  'Ставропольский край': 'Ставропольский',
  'Северная Осетия': 'Осетия',
  'Волгоградская область': 'Волгоградская',
  'Другие регионы': 'Другие',
};

function shortRegion(region: string): string {
  return SHORT_REGION_NAMES[region] || region;
}

function getMonth(date: string): string {
  const parts = date.trim().split(' ');
  return parts.length >= 2 ? parts[1] : date;
}

function shortDate(date: string): string {
  const parts = date.trim().split(' ');
  if (parts.length < 2) return date;
  return `${parts[0]} ${parts[1].slice(0, 3)}`;
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
  const { data, isLoading } = useSiteData();
  const [region, setRegion] = useState<string>('all');

  const upcoming = (data?.concerts || []).filter(c => !isPast(c.date));

  const regions = useMemo(() => {
    const set = new Set<string>();
    upcoming.forEach(c => set.add(getRegion(c.city)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'ru'));
  }, [upcoming]);

  const concerts = region === 'all' ? upcoming : upcoming.filter(c => getRegion(c.city) === region);
  const groups = groupByMonth(concerts);

  return (
    <div id="concerts" className="relative bg-black text-white px-6 pt-16 pb-24 lg:pt-28 lg:pb-36 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #e00000 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto">
        {regions.length > 1 && (
          <div className="flex items-center gap-1 sm:gap-2 flex-nowrap mb-8 sm:mb-12">
            <button
              onClick={() => setRegion('all')}
              className={`flex-shrink-0 sm:flex-initial px-2 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-xs uppercase tracking-tight sm:tracking-wide border ${
                region === 'all'
                  ? 'bg-brand border-brand text-white'
                  : 'border-white/15 text-neutral-400 hover:border-white/40 hover:text-white'
              }`}
            >
              <span className="sm:hidden">Все</span>
              <span className="hidden sm:inline">Все регионы</span>
            </button>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                title={r}
                className={`flex-1 sm:flex-initial min-w-0 px-1 py-1.5 sm:px-4 sm:py-2 text-[9px] sm:text-xs uppercase tracking-tight sm:tracking-wide border truncate ${
                  region === r
                    ? 'bg-brand border-brand text-white'
                    : 'border-white/15 text-neutral-400 hover:border-white/40 hover:text-white'
                }`}
              >
                <span className="sm:hidden">{shortRegion(r)}</span>
                <span className="hidden sm:inline">{r}</span>
              </button>
            ))}
          </div>
        )}

        {!isLoading && groups.length === 0 && (
          <div className="border border-white/10 py-16 text-center bg-white/[0.02]">
            <p className="text-brand uppercase tracking-[0.4em] text-xs mb-3">Скоро</p>
            <p className="text-neutral-400 text-sm">
              {region === 'all' ? 'Новые даты концертов будут объявлены' : 'В этом регионе пока нет концертов'}
            </p>
          </div>
        )}

        <div className="space-y-14">
          {groups.map(({ month, items }) => (
            <div key={month}>
              <div className="flex items-center gap-4 mb-4">
                <span className="text-brand uppercase tracking-[0.3em] text-xs font-bold">{MONTH_NAMES[month] || month.toUpperCase()}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
              </div>
              <div className="flex flex-col divide-y divide-white/10">
                {items.map((concert, i) => (
                  <div
                    key={concert.id ?? i}
                    className="flex items-center justify-between py-3 sm:py-6 gap-2 sm:gap-4 group px-3 -mx-3 hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-3 sm:gap-6 lg:gap-10 min-w-0">
                      <div className="flex items-stretch gap-2 sm:gap-4 min-w-0">
                        <div className="w-14 sm:w-28 flex-shrink-0">
                          <div className="text-sm sm:text-2xl font-bold leading-tight whitespace-nowrap">
                            {shortDate(concert.date)}
                          </div>
                          <div className="hidden sm:block text-neutral-500 text-xs uppercase tracking-wide mt-1">{concert.day}{concert.time ? ` · ${concert.time}` : ''}</div>
                        </div>
                        <div className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-sm sm:text-2xl font-bold leading-tight group-hover:text-brand truncate">{concert.city}</div>
                          <div className="hidden sm:block text-neutral-400 text-sm mt-1">{concert.venue}{concert.address ? <span className="text-neutral-600"> · {concert.address}</span> : ''}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                      {concert.phone && (
                        <a
                          href={`tel:${concert.phone}`}
                          className="hidden sm:inline-flex border border-white/15 text-neutral-400 p-2.5 hover:border-white/40 hover:text-white"
                          title={concert.phone}
                        >
                          <Icon name="Phone" size={14} />
                        </a>
                      )}
                      {concert.sold ? (
                        <span className="text-neutral-600 uppercase text-[10px] sm:text-xs tracking-widest border border-white/10 px-2.5 py-1.5 sm:px-5 sm:py-2.5 whitespace-nowrap">
                          <span className="sm:hidden">Продано</span>
                          <span className="hidden sm:inline">Распродано</span>
                        </span>
                      ) : concert.ticketUrl ? (
                        <a
                          href={concert.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-brand text-white px-2.5 py-1.5 sm:px-6 sm:py-2.5 uppercase text-[10px] sm:text-xs tracking-widest hover:bg-white hover:text-black whitespace-nowrap"
                        >
                          Купить билет
                        </a>
                      ) : (
                        <span className="text-neutral-500 uppercase text-[10px] sm:text-xs tracking-widest border border-white/10 px-2.5 py-1.5 sm:px-6 sm:py-2.5 whitespace-nowrap">
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

        <a
          href="tel:+79281819424"
          className="sm:hidden mt-8 flex items-center justify-center gap-2 border border-white/15 text-neutral-400 py-4 uppercase text-xs tracking-widest hover:border-white/40 hover:text-white"
        >
          <Icon name="Phone" size={16} />
          Связаться с организатором (Сергей)
        </a>
      </div>
    </div>
  );
}