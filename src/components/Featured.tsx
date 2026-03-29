const concerts = [
  {
    date: "12 апр",
    day: "Суббота",
    city: "Москва",
    venue: "Stadium Live",
    ticketUrl: "#",
    sold: false,
  },
  {
    date: "19 апр",
    day: "Суббота",
    city: "Санкт-Петербург",
    venue: "A2 Green Concert",
    ticketUrl: "#",
    sold: false,
  },
  {
    date: "26 апр",
    day: "Суббота",
    city: "Екатеринбург",
    venue: "Tele-Club",
    ticketUrl: "#",
    sold: false,
  },
  {
    date: "3 мая",
    day: "Суббота",
    city: "Казань",
    venue: "Universiade Village",
    ticketUrl: "#",
    sold: true,
  },
  {
    date: "10 мая",
    day: "Суббота",
    city: "Новосибирск",
    venue: "Podzemka Club",
    ticketUrl: "#",
    sold: false,
  },
  {
    date: "17 мая",
    day: "Суббота",
    city: "Краснодар",
    venue: "Club Dobrye Lyudi",
    ticketUrl: "#",
    sold: false,
  },
  {
    date: "24 мая",
    day: "Суббота",
    city: "Ростов-на-Дону",
    venue: "Отель Don Plaza",
    ticketUrl: "#",
    sold: false,
  },
];

export default function Featured() {
  return (
    <div id="concerts" className="bg-black text-white min-h-screen px-6 py-20 lg:py-32">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-16 gap-6">
          <div>
            <p className="text-purple-400 uppercase tracking-[0.4em] text-xs mb-3">2025 Тур</p>
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
                  <div className="text-xl font-semibold group-hover:text-purple-300 transition-colors duration-300">
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
                  className="border border-purple-500 text-purple-300 px-6 py-2.5 uppercase text-xs tracking-widest hover:bg-purple-500 hover:text-white transition-all duration-300 w-fit"
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
