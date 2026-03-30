const tracks = [
  {
    num: "01",
    title: "Название трека",
    subtitle: "2024",
    cover: "https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/files/e30c8157-24d3-4be4-86ef-6815791b20ab.jpg",
    url: "#",
  },
  {
    num: "02",
    title: "Название трека",
    subtitle: "2023",
    cover: "https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/files/e30c8157-24d3-4be4-86ef-6815791b20ab.jpg",
    url: "#",
  },
  {
    num: "03",
    title: "Название трека",
    subtitle: "2023",
    cover: "https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/files/e30c8157-24d3-4be4-86ef-6815791b20ab.jpg",
    url: "#",
  },
  {
    num: "04",
    title: "Название трека",
    subtitle: "2022",
    cover: "https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/files/e30c8157-24d3-4be4-86ef-6815791b20ab.jpg",
    url: "#",
  },
  {
    num: "05",
    title: "Название трека",
    subtitle: "2022",
    cover: "https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/files/e30c8157-24d3-4be4-86ef-6815791b20ab.jpg",
    url: "#",
  },
];

export default function Tracks() {
  return (
    <div className="bg-black text-white py-20 lg:py-32 px-6">
      <div className="max-w-5xl mx-auto">

        <p className="text-brand uppercase tracking-[0.4em] text-xs mb-3">Популярное</p>
        <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-16">ТРЕКИ</h2>

        {/* Вариант 1 — Список */}
        <div className="mb-24">
          <p className="text-neutral-600 uppercase text-xs tracking-widest mb-6">Вариант 1 — Список</p>
          <div className="flex flex-col divide-y divide-neutral-800">
            {tracks.map((track) => (
              <a
                key={track.num}
                href={track.url}
                className="flex items-center gap-6 py-4 group hover:bg-neutral-900 -mx-4 px-4 transition-colors duration-200"
              >
                <span className="text-neutral-600 text-sm w-6 flex-shrink-0">{track.num}</span>
                <img src={track.cover} alt={track.title} className="w-10 h-10 object-cover flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-white text-base group-hover:text-brand transition-colors duration-200">{track.title}</div>
                  <div className="text-neutral-500 text-xs">{track.subtitle}</div>
                </div>
                <span className="text-neutral-600 group-hover:text-brand text-xs uppercase tracking-widest transition-colors duration-200">
                  Слушать →
                </span>
              </a>
            ))}
          </div>
        </div>

        {/* Вариант 2 — Карточки */}
        <div>
          <p className="text-neutral-600 uppercase text-xs tracking-widest mb-6">Вариант 2 — Карточки</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {tracks.map((track) => (
              <a
                key={track.num}
                href={track.url}
                className="group flex flex-col gap-3"
              >
                <div className="relative aspect-square overflow-hidden">
                  <img
                    src={track.cover}
                    alt={track.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                    <span className="text-white text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300">▶</span>
                  </div>
                </div>
                <div>
                  <div className="text-white text-sm font-medium group-hover:text-brand transition-colors duration-200">{track.title}</div>
                  <div className="text-neutral-500 text-xs">{track.subtitle}</div>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
