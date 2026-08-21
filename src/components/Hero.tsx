import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useSiteData } from "@/hooks/useSiteData";
import Icon from "@/components/ui/icon";

const TITLE_LETTERS = "BATRAI".split("");

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "35vh"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  const { data } = useSiteData();
  const s = data?.settings;

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-[100svh] overflow-hidden bg-black"
    >
      <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
        <img
          src="https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/bucket/447c0826-631a-49ce-b828-e923421a0a19.jpg"
          alt="Batrai — концертное выступление"
          className="w-full h-full object-cover"
          style={{ filter: "grayscale(0.3) brightness(0.5) contrast(1.15)" }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-transparent to-black/70" />
      </motion.div>

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <motion.div style={{ opacity }} className="relative z-20 text-center text-white px-6 flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex items-center gap-3 mb-6"
        >
          <span className="w-8 h-px bg-brand" />
          <p className="text-brand uppercase tracking-[0.5em] text-xs font-medium">
            {s?.hero_label ?? "Официальный сайт"}
          </p>
          <span className="w-8 h-px bg-brand" />
        </motion.div>

        <h1
          className="flex flex-wrap justify-center text-7xl md:text-9xl lg:text-[11rem] font-bold leading-none mb-6"
          style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif" }}
        >
          {TITLE_LETTERS.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 60 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.06, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block"
              style={{ marginRight: "0.08em" }}
            >
              {letter}
            </motion.span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="text-base md:text-xl max-w-xl mx-auto text-white/70 font-light leading-relaxed mb-10"
        >
          {s?.hero_subtitle ?? "Музыка, которая останется с тобой навсегда"}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.05, ease: "easeOut" }}
        >
          <a
            href="#concerts"
            className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 uppercase tracking-widest text-sm font-medium rounded-full hover:bg-brand hover:text-white transition-all duration-300"
          >
            Расписание концертов
            <Icon name="ArrowDown" size={16} className="group-hover:translate-y-0.5 transition-transform duration-300" />
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        style={{ opacity }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-[10px] uppercase tracking-[0.3em]">Скролл</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
        />
      </motion.div>
    </div>
  );
}
