interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header className={`absolute top-0 left-0 right-0 z-10 p-6 ${className ?? ""}`}>
      <div className="flex justify-between items-center">
        <div className="text-white text-sm uppercase tracking-widest font-bold" style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: '0.4em' }}>BATRAI</div>
        <nav className="flex gap-8">
          <a
            href="#about"
            className="text-white hover:text-red-400 transition-colors duration-300 uppercase text-sm tracking-wide"
          >
            О себе
          </a>
          <a
            href="#concerts"
            className="text-white hover:text-red-400 transition-colors duration-300 uppercase text-sm tracking-wide"
          >
            Концерты
          </a>
          <a
            href="#music"
            className="text-white hover:text-red-400 transition-colors duration-300 uppercase text-sm tracking-wide"
          >
            Музыка
          </a>
        </nav>
      </div>
    </header>
  );
}