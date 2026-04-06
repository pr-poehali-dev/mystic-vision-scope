import { useState } from "react";

const BOOKING_URL = "https://functions.poehali.dev/d1008bc4-8a0c-4810-8d86-f3928c59d4d6";

const EVENT_TYPES = [
  "Корпоратив",
  "День рождения",
  "Свадьба",
  "Юбилей",
  "Другое",
];

export default function Booking() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    city: "",
    date: "",
    event_type: "",
    comment: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch(BOOKING_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1419] text-white flex flex-col items-center justify-center px-6 py-20">
      <div className="w-full max-w-lg">
        <a
          href="/"
          className="text-white/40 hover:text-white text-xs uppercase tracking-widest mb-12 block transition-colors duration-200"
          style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.4em" }}
        >
          ← BATRAI
        </a>

        <p className="text-[#e00000] uppercase tracking-[0.4em] text-xs mb-4">Частные выступления</p>

        <h1
          className="text-5xl md:text-7xl font-bold leading-none mb-3"
          style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.1em" }}
        >
          ЗАЯВКА
        </h1>

        <p className="text-neutral-400 text-sm mb-12">
          Корпоратив, день рождения, свадьба — оставь заявку и мы свяжемся с тобой.
        </p>

        {status === "success" ? (
          <div className="flex flex-col gap-4 py-8">
            <div className="text-5xl mb-2">🎤</div>
            <p className="text-white text-2xl font-light">Заявка отправлена!</p>
            <p className="text-neutral-400 text-sm">Мы свяжемся с тобой в ближайшее время.</p>
            <button
              onClick={() => { setStatus("idle"); setForm({ name: "", phone: "", city: "", date: "", event_type: "", comment: "" }); }}
              className="mt-6 text-xs uppercase tracking-widest text-neutral-500 hover:text-white transition-colors"
            >
              Отправить ещё одну
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              name="name"
              required
              placeholder="Имя *"
              value={form.name}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 text-white placeholder-neutral-500 px-6 py-4 text-sm focus:outline-none focus:border-[#e00000] transition-colors duration-200"
            />
            <input
              name="phone"
              required
              placeholder="Телефон *"
              value={form.phone}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 text-white placeholder-neutral-500 px-6 py-4 text-sm focus:outline-none focus:border-[#e00000] transition-colors duration-200"
            />
            <input
              name="city"
              placeholder="Город"
              value={form.city}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 text-white placeholder-neutral-500 px-6 py-4 text-sm focus:outline-none focus:border-[#e00000] transition-colors duration-200"
            />
            <input
              name="date"
              placeholder="Дата мероприятия"
              value={form.date}
              onChange={handleChange}
              className="w-full bg-white/5 border border-white/20 text-white placeholder-neutral-500 px-6 py-4 text-sm focus:outline-none focus:border-[#e00000] transition-colors duration-200"
            />
            <select
              name="event_type"
              value={form.event_type}
              onChange={handleChange}
              className="w-full bg-[#0f1419] border border-white/20 text-white placeholder-neutral-500 px-6 py-4 text-sm focus:outline-none focus:border-[#e00000] transition-colors duration-200 appearance-none"
            >
              <option value="" disabled>Тип мероприятия</option>
              {EVENT_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <textarea
              name="comment"
              placeholder="Комментарий (пожелания, количество гостей...)"
              value={form.comment}
              onChange={handleChange}
              rows={4}
              className="w-full bg-white/5 border border-white/20 text-white placeholder-neutral-500 px-6 py-4 text-sm focus:outline-none focus:border-[#e00000] transition-colors duration-200 resize-none"
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="w-full bg-[#e00000] text-white py-4 uppercase tracking-widest text-sm font-medium hover:bg-red-700 transition-colors duration-200 disabled:opacity-50"
            >
              {status === "loading" ? "Отправляем..." : "Отправить заявку"}
            </button>
            {status === "error" && (
              <p className="text-red-400 text-xs text-center">Что-то пошло не так, попробуй ещё раз</p>
            )}
            <p className="text-neutral-600 text-xs text-center mt-2">* — обязательные поля</p>
          </form>
        )}
      </div>
    </div>
  );
}
