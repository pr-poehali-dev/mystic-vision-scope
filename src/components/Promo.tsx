import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10vh", "10vh"]);

  return (
    <div
      id="about"
      ref={container}
      className="relative flex items-end justify-start h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="absolute inset-0 w-full h-full">
        <motion.div style={{ y }} className="relative w-full h-[120%] -top-[10%]">
          <img
            src="https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/bucket/0251bab2-d579-46c1-976d-bf78fb7e4134.jpg"
            alt="Batrai"
            className="w-full h-full object-cover object-top"
          />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.4) 50%, rgba(0,0,0,0.1) 100%)" }} />
        </motion.div>
      </div>

      <div className="relative z-10 px-6 lg:px-16 pb-16 lg:pb-24 w-full max-w-4xl">
        <p className="text-brand uppercase tracking-[0.4em] text-xs mb-4">Об исполнителе</p>
        <h2
          className="text-5xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.6em", textIndent: "0.6em" }}
        >
          BATRAI
        </h2>
        <p className="text-neutral-300 text-lg lg:text-xl leading-relaxed max-w-xl font-light mb-3">
          Голос, рождённый из тишины. Музыка, созданная для тех, кто умеет слышать больше, чем звук.
        </p>
        <p className="text-neutral-500 text-sm lg:text-base leading-relaxed max-w-xl mb-8">
          Живые выступления, честные тексты и атмосфера, которая остаётся после концерта. Batrai — это не просто музыка, это ощущение.
        </p>
        <a
          href="#concerts"
          className="inline-block border border-brand text-brand px-8 py-3 uppercase tracking-widest text-sm hover:bg-brand hover:text-white transition-all duration-300"
        >
          Расписание концертов
        </a>
      </div>
    </div>
  );
}