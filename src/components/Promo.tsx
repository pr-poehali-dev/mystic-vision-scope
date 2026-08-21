import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";
import { useSiteData } from "@/hooks/useSiteData";
import Icon from "@/components/ui/icon";

export default function Promo() {
  const container = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-6vh", "6vh"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);

  const { data } = useSiteData();
  const s = data?.settings;

  return (
    <div
      id="about"
      ref={container}
      className="relative overflow-hidden bg-black"
    >
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row min-h-screen">

        <div className="relative w-full lg:w-1/2 h-[60vh] lg:h-auto flex-shrink-0 overflow-hidden">
          <motion.div style={{ y, scale }} className="absolute inset-0 w-full h-full">
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
          </motion.div>
          <div className="absolute inset-0 lg:hidden" style={{ background: "linear-gradient(to top, rgba(0,0,0,1) 0%, transparent 60%)" }} />
          <div className="absolute inset-0 hidden lg:block" style={{ background: "linear-gradient(to right, transparent 65%, rgba(0,0,0,0.9) 100%)" }} />
          <div
            className="absolute -bottom-20 -left-20 w-72 h-72 rounded-full opacity-25 blur-[100px]"
            style={{ background: "radial-gradient(circle, #e00000 0%, transparent 70%)" }}
          />
        </div>

        <div className="relative z-10 flex flex-col justify-center px-8 lg:px-16 py-16 lg:py-24 w-full lg:w-1/2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="flex items-center gap-3 mb-5"
          >
            <span className="w-8 h-px bg-brand" />
            <p className="text-brand uppercase tracking-[0.4em] text-xs">Об исполнителе</p>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
            className="text-5xl lg:text-8xl font-bold leading-none mb-8 text-white"
            style={{ fontFamily: "'DIN Condensed', 'Barlow Condensed', sans-serif", letterSpacing: "0.4em" }}
          >
            {s?.about_title ?? 'BATRAI'}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
            className="text-neutral-300 text-lg lg:text-xl leading-relaxed max-w-md font-light mb-4"
          >
            {s?.about_text1 ?? 'Голос, рождённый из тишины. Музыка, созданная для тех, кто умеет слышать больше, чем звук.'}
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.3, ease: "easeOut" }}
            className="text-neutral-500 text-sm lg:text-base leading-relaxed max-w-md mb-10"
          >
            {s?.about_text2 ?? 'Живые выступления, честные тексты и атмосфера, которая остаётся после концерта. Batrai — это не просто музыка, это ощущение.'}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          >
            <a
              href="#concerts"
              className="group inline-flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full uppercase tracking-widest text-sm hover:bg-brand hover:text-white transition-all duration-300 w-fit"
            >
              Расписание концертов
              <Icon name="ArrowRight" size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
