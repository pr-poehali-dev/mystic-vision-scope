import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "50vh"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div
      ref={container}
      className="relative flex items-center justify-center h-screen overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="absolute inset-0 w-full h-full"
      >
        <img
          src="https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/bucket/447c0826-631a-49ce-b828-e923421a0a19.jpg"
          alt="Concert stage"
          className="w-full h-full object-cover"
          style={{ filter: "sepia(1) saturate(5) hue-rotate(-20deg) brightness(0.55) contrast(1.1)" }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      <motion.div style={{ opacity }} className="relative z-20 text-center text-white px-6">
        <p className="text-brand uppercase tracking-[0.4em] text-sm mb-4 font-light">
          Официальный сайт
        </p>
        <h1
          className="text-7xl md:text-9xl lg:text-[12rem] font-bold leading-none mb-6"
          style={{
            fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif",
            letterSpacing: "0.6em",
            textIndent: "0.6em",
          }}
        >
          BATRAI
        </h1>
        <p className="text-lg md:text-xl max-w-xl mx-auto opacity-80 font-light leading-relaxed">
          Музыка, которая останется с тобой навсегда
        </p>
        <a
          href="#concerts"
          className="inline-block mt-10 border border-white text-white px-8 py-3 uppercase tracking-widest text-sm hover:bg-white hover:text-black transition-all duration-300"
        >
          Расписание концертов
        </a>
      </motion.div>
    </div>
  );
}