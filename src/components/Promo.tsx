import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useSiteData } from "@/hooks/useSiteData";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-5vh", "5vh"]);

  const { data } = useSiteData();
  const s = data?.settings;

  return (
    <div
      id="about"
      ref={container}
      className="relative overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen">

        <motion.div
          style={{ y }}
          className="relative w-full lg:w-1/2 h-[60vh] lg:h-auto flex-shrink-0"
        >
          <img
            src="https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/bucket/8f07db44-393e-4264-bee1-7aaa0844e775.jpg"
            alt="Batrai"
            className="w-full h-full object-cover object-[center_20%] lg:hidden"
          />
          <img
            src="https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/bucket/395366ad-ad65-45f5-b6c8-31d841fd75c1.jpg"
            alt="Batrai"
            className="hidden lg:block w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, transparent 70%, rgba(0,0,0,1) 100%)" }} />
        </motion.div>

        <div className="relative z-10 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-24 w-full lg:w-1/2">
          <p className="text-brand uppercase tracking-[0.4em] text-xs mb-5">Об исполнителе</p>
          <h2
            className="text-5xl lg:text-7xl font-bold leading-none mb-8 text-[#ffffff]"
            style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.6em" }}
          >
            {s?.about_title ?? 'BATRAI'}
          </h2>
          <p className="text-neutral-300 text-lg lg:text-xl leading-relaxed max-w-md font-light mb-4">
            {s?.about_text1 ?? 'Голос, рождённый из тишины. Музыка, созданная для тех, кто умеет слышать больше, чем звук.'}
          </p>
          <p className="text-neutral-500 text-sm lg:text-base leading-relaxed max-w-md mb-10">
            {s?.about_text2 ?? 'Живые выступления, честные тексты и атмосфера, которая остаётся после концерта. Batrai — это не просто музыка, это ощущение.'}
          </p>
          <a
            href="#concerts"
            className="inline-block border border-brand text-brand px-8 py-3 uppercase tracking-widest text-sm hover:bg-brand hover:text-white transition-all duration-300 w-fit"
          >
            Расписание концертов
          </a>
        </div>
      </div>
    </div>
  );
}
