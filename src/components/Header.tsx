import { useEffect, useState } from "react";

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      } ${className ?? ""}`}
    >
      <div className="flex justify-between items-center px-6 lg:px-10 py-5">
        <a
          href="/"
          className="text-white text-sm font-bold uppercase"
          style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.5em" }}
        >
          BATRAI
        </a>

        <p className="text-brand uppercase tracking-[0.3em] text-xs font-medium">
          Тур 2026
        </p>
      </div>
    </header>
  );
}
