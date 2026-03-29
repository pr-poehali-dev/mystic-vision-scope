import { useScroll, useTransform, motion } from "framer-motion";
import { useRef, useEffect, useCallback } from "react";

function CrowdCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: { x: number; y: number; size: number; opacity: number; speed: number; phase: number }[] = [];

    for (let i = 0; i < 180; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: canvas.height * 0.45 + Math.random() * canvas.height * 0.55,
        size: Math.random() * 2.5 + 0.5,
        opacity: Math.random() * 0.8 + 0.2,
        speed: Math.random() * 0.008 + 0.003,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let frame = 0;
    let animId: number;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;

      particles.forEach((p) => {
        const flicker = Math.sin(frame * p.speed + p.phase);
        const alpha = p.opacity * (0.5 + 0.5 * flicker);
        const warm = flicker > 0.3;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
        if (warm) {
          grad.addColorStop(0, `rgba(255, 220, 100, ${alpha})`);
          grad.addColorStop(1, `rgba(255, 150, 50, 0)`);
        } else {
          grad.addColorStop(0, `rgba(255, 255, 255, ${alpha * 0.6})`);
          grad.addColorStop(1, `rgba(200, 200, 255, 0)`);
        }

        ctx.fillStyle = grad;
        ctx.fill();
      });

      animId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const cleanup = animate();
    const handleResize = () => animate();
    window.addEventListener("resize", handleResize);
    return () => {
      cleanup?.();
      window.removeEventListener("resize", handleResize);
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-10 pointer-events-none"
    />
  );
}

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
          style={{ filter: "sepia(1) saturate(3) hue-rotate(-30deg) brightness(0.6)" }}
        />
        <div className="absolute inset-0 bg-black/55" />
      </motion.div>

      <CrowdCanvas />

      <motion.div style={{ opacity }} className="relative z-20 text-center text-white px-6">
        <p className="text-red-400 uppercase tracking-[0.4em] text-sm mb-4 font-light">
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