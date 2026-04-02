const concerts = [
  {
    date: "15 мая",
    day: "Пт",
    city: "г. Зерноград",
    venue: "РДК",
    ticketUrl: "https://rnd.kassir.ru/koncert/batrai-1",
    sold: false,
  },
  {
    date: "16 мая",
    day: "Сб",
    city: "г. Новочеркасск",
    venue: "КЗ НПИ",
    ticketUrl: "https://rnd.kassir.ru/koncert/batrai-1#3810038",
    sold: false,
  },
  {
    date: "17 мая",
    day: "Вс",
    city: "г. Батайск",
    venue: "РДК",
    ticketUrl: "https://rnd.kassir.ru/koncert/batrai-1#3809778",
    sold: false,
  },
  {
    date: "18 мая",
    day: "Пн",
    city: "ст. Кущёвская",
    venue: "РДК",
    ticketUrl: "https://krd.kassir.ru/koncert/rdk-st-kuschyovskaya/batrai-batyir-dolev_2026-05-18",
    sold: false,
  },
  {
    date: "19 мая",
    day: "Вт",
    city: "ст. Ленинградская",
    venue: "МБУ ССК",
    ticketUrl: "https://krd.kassir.ru/koncert/mbu-skk-leningradskaya/batrai-batyir-dolev_2026-05-19",
    sold: false,
  },
  {
    date: "20 мая",
    day: "Ср",
    city: "г. Ейск",
    venue: "ГДК",
    ticketUrl: "https://krd.kassir.ru/koncert/gorodskoy-dvorets-kulturyi-eysk/batrai-batyir-dolev_2026-05-20",
    sold: false,
  },
  {
    date: "21 мая",
    day: "Чт",
    city: "ст. Староминская",
    venue: "РДКС",
    ticketUrl: "https://krd.kassir.ru/koncert/rdks-st-starominskoy/batrai-batyir-dolev_2026-05-21",
    sold: false,
  },
  {
    date: "22 мая",
    day: "Пт",
    city: "г. Краснодар",
    venue: "Sgt. Pepper's Bar",
    ticketUrl: "https://afisha.yandex.ru/krasnodar/concert/batrai-12-2026-03-23",
    sold: false,
  },
  {
    date: "23 мая",
    day: "Сб",
    city: "г. Майкоп",
    venue: "КЗ АГУ",
    ticketUrl: "https://kassa01.ru/pay.php?uid=69b2fe8ac5c34644181ad8cb&partner=kassa01",
    sold: false,
  },
  {
    date: "27 мая",
    day: "Ср",
    city: "г. Кизляр",
    venue: "ДК КЭМЗ",
    ticketUrl: "https://iframeab-pre10704.intickets.ru/seance/71479586/#abiframe",
    sold: false,
  },
  {
    date: "28 мая",
    day: "Чт",
    city: "г. Будённовск",
    venue: "Клуб Асгард",
    ticketUrl: "https://iframeab-pre10704.intickets.ru/seance/71485030/#abiframe",
    sold: false,
  },
  {
    date: "29 мая",
    day: "Пт",
    city: "г. Пятигорск",
    venue: "ДК «София»",
    ticketUrl: "https://iframeab-pre10704.intickets.ru/seance/71354346/#abiframe",
    sold: false,
  },
];

export default function Featured() {
  return (
    <div id="concerts" className="bg-black text-white min-h-screen px-6 py-20 lg:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-brand uppercase tracking-[0.4em] text-xs mb-3">2026 Тур</p>
            <h2 className="text-5xl lg:text-7xl font-bold tracking-tight">КОНЦЕРТЫ</h2>
          </div>
          <p className="text-neutral-400 max-w-xs leading-relaxed text-sm">
            Живые выступления в лучших площадках страны. Почувствуй музыку вживую.
          </p>
        </div>

        <div className="flex flex-col divide-y divide-neutral-800">
          {concerts.map((concert, i) => (
            <div
              key={i}
              className="flex flex-col sm:flex-row sm:items-center justify-between py-6 gap-4 group"
            >
              <div className="flex items-center gap-6 lg:gap-10">
                <div className="text-center min-w-[56px]">
                  <div className="text-2xl font-bold leading-tight">{concert.date}</div>
                  <div className="text-neutral-500 text-xs uppercase tracking-wide">{concert.day}</div>
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
              ) : (
                <a
                  href={concert.ticketUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border border-brand text-brand px-6 py-2.5 uppercase text-xs tracking-widest hover:bg-brand hover:text-white transition-all duration-300 w-fit"
                >
                  Купить билет
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}