import { useState, useEffect } from "react";

const API_URL = "https://functions.poehali.dev/9cb423e1-3fe8-42e5-b7ad-5ce71a92d818";

export default function Presave() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "already" | "error">("idle");
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetch(API_URL)
      .then((r) => r.json())
      .then((d) => setCount(d.count))
      .catch(() => null);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.status === "already") {
        setStatus("already");
      } else {
        setStatus("success");
        setCount((c) => (c !== null ? c + 1 : null));
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div
      className="min-h-screen bg-black flex flex-col items-center justify-center px-6 relative overflow-hidden"
      style={{
        backgroundImage: `url(https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/files/5f58cc8c-18d8-46bc-b717-fb08e199ec71.jpg)`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black/70" />

      <div className="relative z-10 flex flex-col items-center text-center max-w-lg w-full">
        <a href="/" className="text-white/40 hover:text-white text-xs uppercase tracking-widest mb-12 transition-colors duration-200"
          style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.4em" }}>
          ← BATRAI
        </a>

        <p className="text-[#e00000] uppercase tracking-[0.4em] text-xs mb-4">Новый трек</p>

        <h1
          className="text-7xl md:text-9xl font-bold leading-none mb-3"
          style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.15em" }}
        >
          ПУСКАЙ
        </h1>

        <p className="text-neutral-400 text-sm uppercase tracking-widest mb-12">
          Релиз 31 марта 2025
        </p>

        {status === "success" ? (
          <div className="flex flex-col items-center gap-4">
            <div className="text-5xl mb-2">🔔</div>
            <p className="text-white text-xl font-light">Ты в списке!</p>
            <p className="text-neutral-400 text-sm">Мы уведомим тебя в день выхода трека.</p>
          </div>
        ) : status === "already" ? (
          <div className="flex flex-col items-center gap-4">
            <p className="text-white text-xl font-light">Ты уже сохранил трек</p>
            <p className="text-neutral-400 text-sm">Ждём вместе 31 марта!</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
            <input
              type="email"
              required
              placeholder="Твой email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/20 text-white placeholder-neutral-500 px-6 py-4 text-sm focus:outline-none focus:border-[#e00000] transition-colors duration-200"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#e00000] text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
            >
              {status === "loading" ? "Сохраняем..." : "Сохранить трек"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-xs">Что-то пошло не так, попробуй ещё раз</p>
            )}
          </form>
        )}

        {count !== null && count > 0 && (
          <p className="text-neutral-600 text-xs mt-10 uppercase tracking-widest">
            {count} {count === 1 ? "человек уже сохранил" : count < 5 ? "человека уже сохранили" : "человек уже сохранили"} трек
          </p>
        )}
      </div>
    </div>
  );
}
