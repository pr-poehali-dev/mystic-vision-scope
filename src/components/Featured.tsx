import { useSiteData } from '@/hooks/useSiteData';

export default function Featured() {
  const { data } = useSiteData();
  const concerts = data?.concerts || [];

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

        <div className="flex flex-col divide-y divide-neutral-800">
          {concerts.map((concert, i) => (
            <div
              key={concert.id ?? i}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 group"
            >
              <div className="flex items-center gap-6 lg:gap-10">
                <div className="text-center min-w-[56px]">
                  <div className="text-2xl font-bold leading-tight">{concert.date}</div>
                  <div className="text-neutral-500 text-xs uppercase tracking-wide">
                    {concert.day}{concert.time ? ` · ${concert.time}` : ''}
                  </div>
                </div>
                <div>
                  <div className="text-xl font-semibold group-hover:text-brand transition-colors duration-300">
                    {concert.city}
                  </div>
                  <div className="text-neutral-400 text-sm">{concert.venue}</div>
                </div>
              </div>

              {concert.sold ? (
                <span className="text-neutral-600 uppercase text-xs tracking-widest border border-neutral-700 px-5 py-2.5 w-fit">
                  Распродано
                </span>
              ) : concert.ticketUrl ? (
                <a
                  href={concert.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-brand text-brand px-6 py-2.5 uppercase text-xs tracking-widest hover:bg-brand hover:text-white transition-all duration-300 w-fit"
                >
                  Купить билет
                </a>
              ) : (
                <span className="text-neutral-500 uppercase text-xs tracking-widest border border-neutral-700 px-6 py-2.5 w-fit">
                  Скоро
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}