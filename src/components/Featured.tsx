import { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [region, setRegion] = useState<string>('all');

  const upcoming = (data?.concerts || []).filter(c => !isPast(c.date));

  const regions = useMemo(() => {
    const set = new Set<string>();
    upcoming.forEach(c => set.add(getRegion(c.city)));
    return Array.from(set).sort((a, b) => a.localeCompare(b, 'ru'));
  }, [upcoming]);

  const concerts = region === 'all' ? upcoming : upcoming.filter(c => getRegion(c.city) === region);
  const groups = groupByMonth(concerts);
  const total = concerts.length;

  return (
    <div id="concerts" className="relative bg-black text-white px-6 pt-32 pb-24 lg:pt-44 lg:pb-36 overflow-hidden">
      <div
        className="pointer-events-none absolute -top-40 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #e00000 0%, transparent 70%)" }}
      />

      <div className="relative max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex items-center justify-between mb-16 gap-6"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-brand" />
            <p className="text-brand uppercase tracking-[0.4em] text-xs">{data?.settings?.concerts_month || '2026 Тур'}</p>
          </div>
          {total > 0 && (
            <div className="flex-shrink-0 text-right">
              <div className="text-4xl font-bold text-brand" style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif" }}>{total}</div>
              <div className="text-neutral-500 text-[10px] uppercase tracking-widest">концертов</div>
            </div>
          )}
        </motion.div>

        {regions.length > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2 flex-wrap mb-12"
          >
            <span className="text-neutral-500 text-xs uppercase tracking-[0.2em] mr-2 flex items-center gap-1.5">
              <Icon name="MapPin" size={13} /> Регион:
            </span>
            <button
              onClick={() => setRegion('all')}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-wide transition-all duration-300 border ${
                region === 'all'
                  ? 'bg-brand border-brand text-white'
                  : 'border-white/15 text-neutral-400 hover:border-white/40 hover:text-white'
              }`}
            >
              Все регионы
            </button>
            {regions.map((r) => (
              <button
                key={r}
                onClick={() => setRegion(r)}
                className={`px-4 py-2 rounded-full text-xs uppercase tracking-wide transition-all duration-300 border ${
                  region === r
                    ? 'bg-brand border-brand text-white'
                    : 'border-white/15 text-neutral-400 hover:border-white/40 hover:text-white'
                }`}
              >
                {r}
              </button>
            ))}
          </motion.div>
        )}

        {groups.length === 0 && (
          <div className="border border-white/10 rounded-2xl py-16 text-center bg-white/[0.02]">
            <p className="text-brand uppercase tracking-[0.4em] text-xs mb-3">Скоро</p>
            <p className="text-neutral-400 text-sm">
              {region === 'all' ? 'Новые даты концертов будут объявлены' : 'В этом регионе пока нет концертов'}
            </p>
          </div>
        )}

        <AnimatePresence mode="wait">
        <motion.div
          key={region}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="space-y-14"
        >
          {groups.map(({ month, items }) => (
            <div key={month}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-4 mb-4"
              >
                <span className="text-brand uppercase tracking-[0.3em] text-xs font-bold">{MONTH_NAMES[month] || month.toUpperCase()}</span>
                <div className="flex-1 h-px bg-gradient-to-r from-white/15 to-transparent" />
              </motion.div>
              <div className="flex flex-col divide-y divide-white/10">
                {items.map((concert, i) => (
                  <motion.div
                    key={concert.id ?? i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: Math.min(i * 0.05, 0.3) }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 group rounded-xl px-3 -mx-3 transition-colors duration-300 hover:bg-white/[0.03]"
                  >
                    <div className="flex items-center gap-6 lg:gap-10">
                      <div className="flex items-stretch gap-4">
                        <div className="w-28 flex-shrink-0">
                          <div className="text-2xl font-bold leading-tight">{concert.date}</div>
                          <div className="text-neutral-500 text-xs uppercase tracking-wide mt-1">{concert.day}{concert.time ? ` · ${concert.time}` : ''}</div>
                        </div>
                        <div className="w-px bg-gradient-to-b from-transparent via-white/20 to-transparent flex-shrink-0" />
                        <div>
                          <div className="text-2xl font-bold leading-tight group-hover:text-brand transition-colors duration-300">{concert.city}</div>
                          <div className="text-neutral-400 text-sm mt-1">{concert.venue}{concert.address ? <span className="text-neutral-600"> · {concert.address}</span> : ''}</div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 flex-shrink-0">
                      {concert.phone && (
                        <a
                          href={`tel:${concert.phone}`}
                          className="border border-white/15 text-neutral-400 rounded-full p-2.5 hover:border-white/40 hover:text-white transition-all duration-300"
                          title={concert.phone}
                        >
                          <Icon name="Phone" size={14} />
                        </a>
                      )}
                      {concert.sold ? (
                        <span className="text-neutral-600 uppercase text-xs tracking-widest border border-white/10 rounded-full px-5 py-2.5">
                          Распродано
                        </span>
                      ) : concert.ticketUrl ? (
                        <a
                          href={concert.ticketUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="bg-brand text-white px-6 py-2.5 rounded-full uppercase text-xs tracking-widest hover:bg-white hover:text-black transition-all duration-300"
                        >
                          Купить билет
                        </a>
                      ) : (
                        <span className="text-neutral-500 uppercase text-xs tracking-widest border border-white/10 rounded-full px-6 py-2.5">
                          Скоро
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}