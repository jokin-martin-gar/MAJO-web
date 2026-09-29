"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { useRef } from "react";
import { SignalField } from "@/components/hero/SignalField";
import { GrowthConsole } from "@/components/hero/GrowthConsole";
import { NotificationCard, ScoreRing, SearchCard, SpeedChip } from "@/components/hero/FloatingCards";
import { SplitWords } from "@/components/ui/SplitWords";
import { ArrowIcon, MagneticButton } from "@/components/ui/MagneticButton";
import { EASE } from "@/lib/utils";
import { site } from "@/lib/site";

function useDepth(mx: MotionValue<number>, my: MotionValue<number>, depth: number) {
  const x = useTransform(mx, (v) => v * depth);
  const y = useTransform(my, (v) => v * depth);
  return { x, y };
}

type FloatLayerProps = {
  depth: { x: MotionValue<number>; y: MotionValue<number> };
  delay: number;
  from: { x?: number; y?: number };
  float: number;
  duration: number;
  className?: string;
  children: React.ReactNode;
};

/** Three nested layers so pointer parallax, entrance and idle float never fight over transforms. */
function FloatLayer({ depth, delay, from, float, duration, className, children }: FloatLayerProps) {
  return (
    <motion.div style={{ x: depth.x, y: depth.y }} className={className}>
      <motion.div
        initial={{ opacity: 0, x: from.x ?? 0, y: from.y ?? 0, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, y: 0, filter: "blur(0px)" }}
        transition={{ delay, duration: 1.1, ease: EASE }}
      >
        <motion.div animate={{ y: [0, float, 0] }} transition={{ duration, repeat: Infinity, ease: "easeInOut" }}>
          {children}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Scroll: the stage settles from a tilted perspective into place, copy drifts away.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const rotateX = useTransform(scrollYProgress, [0, 0.45], [22, 0]);
  const stageScale = useTransform(scrollYProgress, [0, 0.45], [0.9, 1]);
  const stageY = useTransform(scrollYProgress, [0, 0.45], [0, -40]);
  const copyY = useTransform(scrollYProgress, [0, 0.5], [0, -120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const copyBlur = useTransform(scrollYProgress, [0, 0.35], ["blur(0px)", "blur(12px)"]);

  // Pointer: layered parallax, each floating element at its own depth.
  const mxRaw = useMotionValue(0);
  const myRaw = useMotionValue(0);
  const mx = useSpring(mxRaw, { stiffness: 60, damping: 20, mass: 0.6 });
  const my = useSpring(myRaw, { stiffness: 60, damping: 20, mass: 0.6 });
  const tiltY = useTransform(mx, (v) => v * 0.12);
  const tiltX = useTransform(my, (v) => -v * 0.08);
  const near = useDepth(mx, my, 1.6);
  const mid = useDepth(mx, my, 0.9);
  const far = useDepth(mx, my, -0.6);

  function onPointerMove(e: React.PointerEvent) {
    if (e.pointerType !== "mouse") return;
    const { innerWidth: w, innerHeight: h } = window;
    mxRaw.set(((e.clientX - w / 2) / w) * 40);
    myRaw.set(((e.clientY - h / 2) / h) * 40);
  }

  return (
    <section
      id="top"
      ref={ref}
      onPointerMove={onPointerMove}
      className="relative isolate min-h-[100svh] overflow-hidden pb-24 pt-36 sm:pt-44"
      aria-labelledby="hero-title"
    >
      {/* Atmosphere */}
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[900px] w-[1400px] -translate-x-1/2 animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(139,124,255,0.28),transparent)] blur-3xl" />
        <div className="absolute right-[-10%] top-[30%] h-[600px] w-[700px] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(94,230,208,0.14),transparent)] blur-3xl [animation-delay:-6s]" />
        <SignalField className="absolute inset-0 size-full mask-radial" />
        <div className="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-b from-transparent to-ink" />
      </div>

      <motion.div style={{ y: copyY, opacity: copyOpacity, filter: copyBlur }} className="container-x relative text-center">
        <motion.a
          href="#contacto"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 }}
          className="group mx-auto mb-10 inline-flex items-center gap-3 rounded-full glass py-1.5 pl-1.5 pr-4 text-[13px] text-muted transition-colors hover:text-fg"
        >
          <span className="rounded-full bg-fg px-2.5 py-0.5 text-[11px] font-medium text-ink">Nuevo</span>
          Solo aceptamos {site.availability.projectsPerQuarter} proyectos por trimestre
          <ArrowIcon className="size-3.5" />
        </motion.a>

        <h1
          id="hero-title"
          className="mx-auto max-w-[17ch] text-balance text-[clamp(2.75rem,7.6vw,7.25rem)] font-medium leading-[0.95] tracking-[-0.055em]"
        >
          <SplitWords
            immediate
            delay={0.25}
            stagger={0.055}
            text="La diferencia entre parecer un negocio más y convertirse en la referencia."
            accent={["referencia"]}
          />
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 1, ease: EASE, delay: 1.1 }}
          className="mx-auto mt-8 max-w-xl text-pretty text-lg leading-relaxed text-muted sm:text-xl"
        >
          Diseñamos experiencias digitales que hacen que tus clientes te elijan antes de conocerte.
          Estrategia, diseño y tecnología al nivel de las mejores marcas del mundo.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 1.3 }}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <MagneticButton href="#contacto">
            Quiero ser la referencia <ArrowIcon />
          </MagneticButton>
          <MagneticButton href="#portfolio" variant="ghost">
            Ver transformaciones
          </MagneticButton>
        </motion.div>
      </motion.div>

      {/* Stage */}
      <div className="container-x relative mt-20 [perspective:1600px] sm:mt-24">
        <motion.div
          initial={{ opacity: 0, y: 80 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: EASE, delay: 0.6 }}
        >
          <motion.div
            style={{ rotateX, scale: stageScale, y: stageY, transformStyle: "preserve-3d" }}
            className="relative mx-auto max-w-4xl origin-top"
          >
            <motion.div style={{ rotateY: tiltY, rotateX: tiltX, x: far.x, y: far.y }}>
              <GrowthConsole />
            </motion.div>

            <FloatLayer depth={near} delay={1.8} from={{ x: -30 }} float={-8} duration={6} className="absolute -left-10 -top-10 hidden md:block lg:-left-24">
              <NotificationCard />
            </FloatLayer>
            <FloatLayer depth={mid} delay={2.1} from={{ x: 30 }} float={10} duration={7} className="absolute -right-8 top-24 hidden md:block lg:-right-20">
              <ScoreRing />
            </FloatLayer>
            <FloatLayer depth={near} delay={2.4} from={{ y: 30 }} float={-6} duration={8} className="absolute -bottom-12 -left-6 hidden lg:-left-16 lg:block">
              <SearchCard />
            </FloatLayer>
            <FloatLayer depth={mid} delay={2.6} from={{ y: 30 }} float={5} duration={5} className="absolute -bottom-6 -right-4 hidden sm:block lg:-right-12">
              <SpeedChip />
            </FloatLayer>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
