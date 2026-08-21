import { useEffect, useState } from "react";
import { motion, useScroll } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import Icon from "@/components/ui/icon";

const NAV_LINKS = [
  { href: "#concerts", label: "Концерты" },
];

interface HeaderProps {
  className?: string;
}

export default function Header({ className }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "bg-black/60 backdrop-blur-xl border-b border-white/10" : "bg-transparent"
      } ${className ?? ""}`}
    >
      <motion.div
        style={{ scaleX: scrollYProgress }}
        className="absolute bottom-0 left-0 right-0 h-px bg-brand origin-left"
      />
      <div className="flex justify-between items-center px-6 lg:px-10 py-5">
        <a
          href="/"
          className="text-white text-sm font-bold uppercase"
          style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.5em" }}
        >
          BATRAI
        </a>

        <nav className="hidden md:flex items-center gap-10">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="relative text-white/70 hover:text-white transition-colors duration-300 uppercase text-xs tracking-[0.2em] group"
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-brand transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <Sheet>
          <SheetTrigger asChild>
            <button className="md:hidden text-white p-2 -mr-2" aria-label="Меню">
              <Icon name="Menu" size={22} />
            </button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-black border-white/10 w-full sm:max-w-xs p-0">
            <div className="flex flex-col h-full px-8 py-10">
              <SheetClose asChild>
                <div
                  className="text-white text-sm font-bold uppercase mb-16 cursor-pointer"
                  style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.5em" }}
                >
                  BATRAI
                </div>
              </SheetClose>
              <nav className="flex flex-col gap-2">
                {NAV_LINKS.map((link, i) => (
                  <SheetClose asChild key={link.href}>
                    <a
                      href={link.href}
                      className="text-white text-3xl font-bold py-3 border-b border-white/10 flex items-center justify-between group"
                      style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif" }}
                    >
                      <span className="group-hover:text-brand transition-colors duration-300">{link.label}</span>
                      <span className="text-white/30 text-sm">0{i + 1}</span>
                    </a>
                  </SheetClose>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}