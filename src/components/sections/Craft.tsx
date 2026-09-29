"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { EASE, cn } from "@/lib/utils";

const SECTORS = [
  "Restaurantes",
  "Clínicas dentales",
  "Despachos de abogados",
  "Gimnasios",
  "Comercio local",
  "Estética",
  "Inmobiliarias",
  "Hoteles boutique",
  "Fisioterapia",
  "Arquitectura",
];

export function Craft() {
  return (
    <section className="relative py-28 sm:py-40" aria-labelledby="craft-title">
      <div className="mask-fade-x mb-28 overflow-hidden sm:mb-36" aria-label="Sectores con los que trabajamos">
        <div className="flex w-max animate-marquee gap-12 [--marquee-duration:50s] hover:[animation-play-state:paused]">
          {[...SECTORS, ...SECTORS].map((s, i) => (
            <span
              key={i}
              aria-hidden={i >= SECTORS.length}
              className="flex items-center gap-12 whitespace-nowrap text-2xl tracking-tight text-subtle transition-colors hover:text-fg sm:text-3xl"
            >
              {s}
              <span className="size-1.5 rounded-full bg-line-strong" />
            </span>
          ))}
        </div>
      </div>

      <div className="container-x">
        <SectionIntro
          id="craft-title"
          index="01"
          eyebrow="Oficio"
          title="Cada píxel es una decisión. Ninguna es casual."
          accent={["decisión."]}
          lead="Lo que separa una web que se olvida de una que se recuerda no es una gran idea. Son cien pequeñas decisiones bien tomadas. Estas son algunas."
        />

        <div className="mt-16 grid auto-rows-[minmax(280px,auto)] grid-cols-1 gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <TypeCell />
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.1}>
            <PerformanceCell />
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.05}>
            <MotionCell />
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.1}>
            <ColorCell />
          </Reveal>
          <Reveal className="md:col-span-2" delay={0.15}>
            <ResponsiveCell />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function CellLabel({ title, body }: { title: string; body: string }) {
  return (
    <div className="relative">
      <h3 className="text-[15px] font-medium tracking-tight">{title}</h3>
      <p className="mt-1 max-w-sm text-sm leading-relaxed text-muted">{body}</p>
    </div>
  );
}

/* ── Typography: variable weight follows the pointer ─────────────────── */
function TypeCell() {
  const [weight, setWeight] = useState(500);

  return (
    <SpotlightCard
      className="flex h-full flex-col justify-between p-7 sm:p-9"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setWeight(Math.round(200 + ((e.clientX - r.left) / r.width) * 700));
      }}
      onPointerLeave={() => setWeight(500)}
    >
      <div className="flex items-start justify-between gap-6">
        <CellLabel
          title="Tipografía con intención"
          body="Elegimos y componemos cada fuente para que tu marca tenga voz propia. Mueve el cursor sobre la tarjeta."
        />
        <span className="shrink-0 rounded-full border border-line px-2.5 py-1 font-mono text-[11px] text-muted" aria-live="polite">
          wght {weight}
        </span>
      </div>
      <div className="relative mt-10 flex items-end justify-between gap-6 overflow-hidden">
        <p
          className="text-[clamp(5rem,14vw,11rem)] leading-[0.8] tracking-[-0.06em] transition-[font-weight] duration-300 ease-out"
          style={{ fontWeight: weight }}
          aria-hidden
        >
          Aa
        </p>
        <div className="hidden space-y-2 pb-3 text-right sm:block" aria-hidden>
          <p className="font-serif text-4xl italic text-fg/90">Editorial</p>
          <p className="text-lg tracking-tight text-muted">Geist · Instrument Serif</p>
          <p className="font-mono text-xs text-subtle">0123456789 € & ¿?</p>
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── Performance: Core Web Vitals ─────────────────────────────────────── */
function PerformanceCell() {
  const vitals = [
    { k: "LCP", v: "0,6 s" },
    { k: "INP", v: "38 ms" },
    { k: "CLS", v: "0,00" },
  ];
  return (
    <SpotlightCard glow="rgba(94,230,208,0.16)" className="flex h-full flex-col justify-between p-7">
      <CellLabel title="Rápida de verdad" body="Cada segundo de carga cuesta clientes. Las nuestras cargan antes de que parpadees." />
      <div className="mt-8">
        <p className="text-6xl font-medium tracking-[-0.05em] text-cyan">
          <Counter to={0.6} decimals={1} suffix=" s" duration={1.6} />
        </p>
        <div className="mt-5 flex gap-2">
          {vitals.map((v) => (
            <div key={v.k} className="flex-1 rounded-xl border border-line bg-white/[0.02] px-3 py-2">
              <p className="font-mono text-[10px] text-muted">{v.k}</p>
              <p className="text-sm font-medium">{v.v}</p>
            </div>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── Motion: linear vs. crafted easing ────────────────────────────────── */
function MotionCell() {
  const [crafted, setCrafted] = useState(true);
  const [run, setRun] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setRun((r) => r + 1), 2200);
    return () => clearInterval(id);
  }, [inView]);

  return (
    <SpotlightCard className="flex h-full flex-col justify-between p-7">
      <CellLabel title="Movimiento con física" body="La diferencia entre algo que se mueve y algo que se siente vivo." />
      <div ref={ref} className="mt-8">
        <div className="relative h-12 rounded-full border border-line bg-white/[0.02]">
          <motion.span
            key={`${run}-${crafted}`}
            className="absolute left-1.5 top-1.5 size-9 rounded-full bg-gradient-to-br from-violet to-cyan shadow-[0_0_30px_rgba(139,124,255,0.6)]"
            initial={{ left: "6px" }}
            animate={{ left: "calc(100% - 42px)" }}
            transition={crafted ? { type: "spring", stiffness: 120, damping: 14 } : { duration: 1, ease: "linear" }}
          />
        </div>
        <div className="mt-4 flex gap-1 rounded-full border border-line p-1 text-xs" role="radiogroup" aria-label="Tipo de movimiento">
          {[
            { v: false, label: "Lineal" },
            { v: true, label: "MAJO" },
          ].map((o) => (
            <button
              key={o.label}
              type="button"
              role="radio"
              aria-checked={crafted === o.v}
              onClick={() => {
                setCrafted(o.v);
                setRun((r) => r + 1);
              }}
              className={cn(
                "flex-1 rounded-full py-1.5 transition-colors",
                crafted === o.v ? "bg-white/10 text-fg" : "text-muted hover:text-fg",
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
}

/* ── Color: swatches expand on hover ──────────────────────────────────── */
const SWATCHES = [
  { c: "#0e0e10", n: "Tinta" },
  { c: "#8b7cff", n: "Violeta" },
  { c: "#5ee6d0", n: "Menta" },
  { c: "#ff8a4c", n: "Ámbar" },
  { c: "#f3f2ee", n: "Papel" },
];

function ColorCell() {
  const [active, setActive] = useState(1);
  return (
    <SpotlightCard glow="rgba(255,138,76,0.14)" className="flex h-full flex-col justify-between p-7">
      <CellLabel title="Sistemas de color" body="Paletas construidas para tu marca, con contraste accesible AA garantizado." />
      <div className="mt-8 flex h-28 gap-1.5">
        {SWATCHES.map((s, i) => (
          <motion.button
            key={s.c}
            type="button"
            onPointerEnter={() => setActive(i)}
            onFocus={() => setActive(i)}
            aria-label={`${s.n} ${s.c}`}
            animate={{ flexGrow: active === i ? 4 : 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="relative min-w-0 basis-0 overflow-hidden rounded-xl ring-1 ring-white/10"
            style={{ backgroundColor: s.c }}
          >
            <motion.span
              animate={{ opacity: active === i ? 1 : 0 }}
              className={cn(
                "absolute bottom-2 left-2.5 whitespace-nowrap text-left font-mono text-[10px]",
                i === 4 || i === 2 ? "text-black/70" : "text-white/80",
              )}
            >
              {s.n}
              <br />
              {s.c.toUpperCase()}
            </motion.span>
          </motion.button>
        ))}
      </div>
    </SpotlightCard>
  );
}

/* ── Responsive: one layout, three devices ────────────────────────────── */
const DEVICES = [
  { w: "38%", label: "Móvil", cols: 1 },
  { w: "68%", label: "Tablet", cols: 2 },
  { w: "100%", label: "Escritorio", cols: 3 },
];

function ResponsiveCell() {
  const [d, setD] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "-20% 0px" });

  useEffect(() => {
    if (!inView) return;
    const id = setInterval(() => setD((v) => (v + 1) % DEVICES.length), 2000);
    return () => clearInterval(id);
  }, [inView]);

  const device = DEVICES[d];
  return (
    <SpotlightCard className="flex h-full flex-col justify-between p-7">
      <CellLabel title="Perfecta en cualquier pantalla" body="La mayoría de tus clientes te descubrirá desde el móvil. Diseñamos para ellos primero." />
      <div ref={ref} className="mt-8 flex h-32 items-end justify-center">
        <motion.div
          layout
          transition={{ duration: 0.8, ease: EASE }}
          style={{ width: device.w }}
          className="h-full overflow-hidden rounded-lg border border-line-strong bg-white/[0.03] p-2"
        >
          <div className="mb-2 h-2 w-1/3 rounded-full bg-white/20" />
          <motion.div
            layout
            className="grid gap-1.5"
            style={{ gridTemplateColumns: `repeat(${device.cols}, minmax(0, 1fr))` }}
          >
            {Array.from({ length: 6 }).map((_, i) => (
              <motion.div
                layout
                key={i}
                transition={{ duration: 0.8, ease: EASE }}
                className={cn("h-7 rounded-md", i === 0 ? "bg-violet/40" : "bg-white/[0.07]")}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>
      <p className="mt-3 text-center font-mono text-[11px] text-muted" aria-live="polite">
        {device.label}
      </p>
    </SpotlightCard>
  );
}
