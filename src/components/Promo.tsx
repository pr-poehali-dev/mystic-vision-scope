import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "5vh"]);

  return (
    <div
      id="about"
      ref={container}
      className="relative overflow-hidden bg-black"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="max-w-6xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
        <motion.div
          style={{ y }}
          className="relative flex-shrink-0 w-72 lg:w-96"
        >
          <div
            className="absolute inset-0 scale-110 rounded-sm"
            style={{
              background:
                "radial-gradient(ellipse at center, rgba(220,38,38,0.35) 0%, transparent 70%)",
            }}
          />
          <img
            src="https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/bucket/708374ef-a475-4c4e-a275-434b046150af.png"
            alt="Batrai"
            className="relative z-10 w-full object-contain drop-shadow-2xl"
            style={{ filter: "drop-shadow(0 0 40px rgba(220,38,38,0.4))" }}
          />
        </motion.div>

        <div className="flex flex-col gap-6 text-white">
          <p className="text-red-400 uppercase tracking-[0.4em] text-xs">Об исполнителе</p>
          <h2 className="text-4xl lg:text-6xl font-bold tracking-tight leading-tight" style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: '0.6em' }}>
            BATRAI
          </h2>
          <p className="text-neutral-300 text-lg lg:text-xl leading-relaxed max-w-lg font-light">
            Голос, рождённый из тишины. Музыка, созданная для тех, кто умеет слышать больше, чем звук.
          </p>
          <p className="text-neutral-500 text-base leading-relaxed max-w-lg">
            Живые выступления, честные тексты и атмосфера, которая остаётся после концерта. Batrai — это не просто музыка, это ощущение.
          </p>
          <a
            href="#concerts"
            className="inline-block mt-4 border border-red-500 text-red-400 px-8 py-3 uppercase tracking-widest text-sm hover:bg-red-500 hover:text-white transition-all duration-300 w-fit"
          >
            Расписание концертов
          </a>
        </div>
      </div>
    </div>
  );
}