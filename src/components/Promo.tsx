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
      className="relative flex items-center justify-center h-screen overflow-hidden"
      style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
    >
      <div className="fixed top-[-10vh] left-0 h-[120vh] w-full">
        <motion.div style={{ y }} className="relative w-full h-full">
          <img
            src="https://cdn.poehali.dev/projects/bd77bfb9-eb01-4e5f-b885-f17ac1c02d19/files/fb35c808-fa37-421b-a675-2d5fd06f235c.jpg"
            alt="Artist portrait"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/60" />
        </motion.div>
      </div>

      <h3 className="absolute top-12 left-6 text-red-400 uppercase z-10 text-xs tracking-[0.4em]">
        Об исполнителе
      </h3>

      <p className="absolute bottom-12 left-6 right-6 text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl max-w-4xl z-10 font-light leading-tight">
        Голос, рождённый из тишины. Музыка, созданная для тех, кто умеет слышать больше, чем звук.
      </p>
    </div>
  );
}