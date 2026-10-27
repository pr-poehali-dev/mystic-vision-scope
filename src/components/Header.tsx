interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  return (
    <header
      className={`relative z-50 flex-shrink-0 bg-transparent ${className ?? ""}`}
    >
      <div className="flex justify-center items-center px-6 lg:px-10 pt-10 pb-5 sm:pt-14 sm:pb-8">
        <a
          href="/"
          className="text-white text-5xl sm:text-7xl leading-none font-bold uppercase"
          style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.5em", marginRight: "-0.5em" }}
        >
          BATRAI
        </a>
      </div>
    </header>
  );
}
