"use client";

import { AnimatePresence, motion, useInView, useScroll, useSpring } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { EASE, cn } from "@/lib/utils";

const STEPS = [
  {
    n: "01",
    title: "Inmersión",
    when: "Semana 1",
    body: "Nos sentamos contigo, analizamos tu negocio, tus clientes y a tu competencia. Salimos sabiendo exactamente por qué deberían elegirte.",
    deliverable: "Informe estratégico",
    Visual: ResearchVisual,
  },
  {
    n: "02",
    title: "Dirección de arte",
    when: "Semana 2",
    body: "Definimos cómo debe sentirse tu marca en digital. Ves la dirección visual y un prototipo navegable antes de escribir una línea de código.",
    deliverable: "Prototipo interactivo",
    Visual: ArtVisual,
  },
  {
    n: "03",
    title: "Diseño y desarrollo",
    when: "Semanas 3–5",
    body: "Cada pantalla diseñada y construida a medida. Sin plantillas. Recibes un enlace privado para ver los avances en directo cada semana.",
    deliverable: "Web en staging",
    Visual: BuildVisual,
  },
  {
    n: "04",
    title: "Lanzamiento y crecimiento",
    when: "Semana 6 en adelante",
    body: "Publicamos, medimos y mejoramos. Tu web no es un proyecto que se entrega: es un activo que crece contigo.",
    deliverable: "Informe mensual de resultados",
    Visual: LaunchVisual,
  },
];

export function Process() {
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 0.6", "end 0.6"] });
  const line = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const ActiveVisual = STEPS[active].Visual;

  return (
    <section id="proceso" className="relative bg-paper py-28 text-paper-ink sm:py-40" aria-labelledby="process-title">
      <div className="container-x">
        <SectionIntro
          id="process-title"
          tone="light"
          index="06"
          eyebrow="Proceso"
          title="Seis semanas. Cero sorpresas. Una experiencia que disfrutarás."
          accent={["disfrutarás."]}
          lead="Trabajar con nosotros es tan cuidado como el resultado. Sabes en todo momento qué pasa, qué viene y por qué."
        />

        <div className="mt-20 grid gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Sticky visual */}
          <div className="hidden lg:block">
            <div className="sticky top-28">
              <div className="relative aspect-square overflow-hidden rounded-[32px] bg-paper-ink text-fg">
                <div aria-hidden className="absolute inset-0 bg-grid opacity-40 mask-radial" />
                <AnimatePresence mode="wait">
                  <motion.div
                    key={active}
                    initial={{ opacity: 0, scale: 0.94, filter: "blur(12px)" }}
                    animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, scale: 1.04, filter: "blur(12px)" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-0 grid place-items-center p-12"
                  >
                    <ActiveVisual />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between font-mono text-[11px] text-muted">
                  <span>{STEPS[active].when}</span>
                  <span>
                    {STEPS[active].n} / 0{STEPS.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Steps */}
          <ol ref={listRef} className="relative">
            <div aria-hidden className="absolute bottom-0 left-[11px] top-0 w-px bg-black/10">
              <motion.div style={{ scaleY: line }} className="h-full w-full origin-top bg-paper-ink" />
            </div>
            {STEPS.map((s, i) => (
              <Step key={s.n} step={s} index={i} active={active === i} onActive={setActive} />
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

function Step({
  step,
  index,
  active,
  onActive,
}: {
  step: (typeof STEPS)[number];
  index: number;
  active: boolean;
  onActive: (i: number) => void;
}) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { margin: "-45% 0px -45% 0px" });

  useEffect(() => {
    if (inView) onActive(index);
  }, [inView, index, onActive]);

  return (
    <li ref={ref} className="relative pb-24 pl-14 last:pb-0 lg:min-h-[52vh]">
      <span
        className={cn(
          "absolute left-0 top-1 grid size-6 place-items-center rounded-full border-2 bg-paper transition-all duration-500",
          active ? "scale-110 border-paper-ink bg-paper-ink" : "border-black/20",
        )}
        aria-hidden
      >
        <span className={cn("size-1.5 rounded-full transition-colors", active ? "bg-paper" : "bg-transparent")} />
      </span>
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-black/45">
        {step.n} · {step.when}
      </p>
      <h3
        className={cn(
          "mt-3 text-[clamp(2rem,4vw,3.2rem)] font-medium leading-none tracking-[-0.04em] transition-opacity duration-500",
          active ? "opacity-100" : "opacity-35",
        )}
      >
        {step.title}
      </h3>
      <p className={cn("mt-5 max-w-md text-lg leading-relaxed transition-colors duration-500", active ? "text-black/70" : "text-black/35")}>
        {step.body}
      </p>
      <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 text-xs">
        <span className="size-1.5 rounded-full bg-[#16a34a]" /> Entregable: {step.deliverable}
      </p>
      <div className="mt-8 aspect-[4/3] overflow-hidden rounded-3xl bg-paper-ink p-8 text-fg lg:hidden">
        <div className="grid size-full place-items-center">
          <step.Visual />
        </div>
      </div>
    </li>
  );
}

/* ── Step visuals ─────────────────────────────────────────────────────── */

function ResearchVisual() {
  const notes = [
    { t: "¿Quién decide?", x: "8%", y: "14%", r: -6, c: "bg-[#fde68a]" },
    { t: "Competencia: 4 webs antiguas", x: "48%", y: "8%", r: 4, c: "bg-[#c4b5fd]" },
    { t: "El 80% busca en móvil", x: "14%", y: "52%", r: 3, c: "bg-[#99f6e4]" },
    { t: "Diferencial: trato cercano", x: "52%", y: "48%", r: -3, c: "bg-[#fecaca]" },
  ];
  return (
    <div className="relative size-full" aria-hidden>
      {notes.map((n, i) => (
        <motion.div
          key={n.t}
          initial={{ opacity: 0, y: 20, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: n.r }}
          transition={{ delay: 0.15 * i, duration: 0.6, ease: EASE }}
          className={cn("absolute w-[40%] rounded-md p-4 text-sm font-medium text-black shadow-xl", n.c)}
          style={{ left: n.x, top: n.y }}
        >
          {n.t}
        </motion.div>
      ))}
    </div>
  );
}

function ArtVisual() {
  return (
    <div className="w-full space-y-5" aria-hidden>
      <motion.p
        initial={{ letterSpacing: "0.2em", opacity: 0 }}
        animate={{ letterSpacing: "-0.04em", opacity: 1 }}
        transition={{ duration: 1, ease: EASE }}
        className="font-serif text-7xl italic"
      >
        Aa
      </motion.p>
      <div className="flex h-20 gap-2">
        {["#0e0e10", "#8b7cff", "#5ee6d0", "#ff8a4c", "#f3f2ee"].map((c, i) => (
          <motion.div
            key={c}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ delay: 0.1 * i, duration: 0.6, ease: EASE }}
            className="flex-1 origin-bottom rounded-xl ring-1 ring-white/10"
            style={{ background: c }}
          />
        ))}
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + 0.1 * i }}
            className="h-16 rounded-xl border border-white/10 bg-white/5"
          />
        ))}
      </div>
    </div>
  );
}

function BuildVisual() {
  const lines = [
    ["<Hero", "text-violet"],
    ["  title=\"Tu negocio, referente\"", "text-cyan"],
    ["  motion=\"premium\"", "text-cyan"],
    ["/>", "text-violet"],
    ["<Reservas online realtime />", "text-ember"],
    ["<Seo local score={100} />", "text-lime"],
  ];
  return (
    <div className="w-full rounded-2xl border border-white/10 bg-black/40 p-5 font-mono text-[13px] leading-7" aria-hidden>
      {lines.map(([l, c], i) => (
        <motion.p
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.12 * i, duration: 0.4 }}
          className={c}
        >
          <span className="mr-4 text-white/20">{i + 1}</span>
          {l}
        </motion.p>
      ))}
      <motion.span
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 1, repeat: Infinity }}
        className="ml-8 inline-block h-4 w-2 bg-white/70 align-middle"
      />
    </div>
  );
}

function LaunchVisual() {
  const bars = [18, 26, 34, 42, 58, 70, 86, 100];
  return (
    <div className="flex size-full flex-col justify-end" aria-hidden>
      <p className="text-6xl font-medium tracking-[-0.05em]">
        +312<span className="text-cyan">%</span>
      </p>
      <p className="mt-2 text-sm text-muted">Solicitudes desde el lanzamiento</p>
      <div className="mt-8 flex h-40 items-end gap-2">
        {bars.map((b, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            animate={{ height: `${b}%` }}
            transition={{ delay: 0.08 * i, duration: 0.7, ease: EASE }}
            className="flex-1 rounded-t-md bg-gradient-to-t from-violet/40 to-cyan"
          />
        ))}
      </div>
    </div>
  );
}
