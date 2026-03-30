export default function Tracks() {
  return (
    <div className="bg-black text-white py-20 lg:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <p className="text-brand uppercase tracking-[0.4em] text-xs mb-3">Популярное</p>
        <h2 className="text-5xl lg:text-7xl font-bold tracking-tight mb-12">ТРЕКИ</h2>

        <div className="flex justify-center lg:justify-start">
          <iframe
            frameBorder="0"
            allow="clipboard-write"
            style={{ border: "none", width: "100%", maxWidth: "614px", height: "556px" }}
            src="https://music.yandex.ru/iframe/playlist/bdolev/1000"
          />
        </div>
      </div>
    </div>
  );
}
