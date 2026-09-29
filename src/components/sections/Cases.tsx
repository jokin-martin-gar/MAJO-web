"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { DEMO_CONTENT } from "@/lib/content";

/**
 * Case studies. NOTE: these are illustrative demo cases — replace with real clients
 * (and real figures) before going to production.
 */
const CASES = [
  {
    client: "Clínica Dental Arlanza",
    place: "Bilbao",
    sector: "Salud",
    headline: "Del boca a boca a tener lista de espera de tres semanas.",
    challenge:
      "Una clínica con 20 años de prestigio que en Google parecía una más. Los pacientes jóvenes ni siquiera la encontraban.",
    work: ["Identidad digital", "Reserva online 24/7", "SEO local", "Rediseño de marca"],
    metrics: [
      { v: "+184%", l: "citas online" },
      { v: "4,9★", l: "612 reseñas" },
      { v: "−38%", l: "coste por paciente" },
    ],
    quote: "Ahora los pacientes llegan diciendo que nos eligieron por la web.",
    author: "Dra. Leire Etxeberria, directora",
    gradient: "from-[#0c4a6e] via-[#0369a1] to-[#38bdf8]",
    mark: "A",
  },
  {
    client: "Forma Studio",
    place: "Valencia",
    sector: "Fitness",
    headline: "Llenar las clases de las 7 de la mañana. Todas.",
    challenge:
      "Un estudio boutique con entrenadores excelentes y una web que parecía un gimnasio de barrio. El precio premium no se entendía.",
    work: ["Dirección de arte", "App web de reservas", "Pagos recurrentes", "Contenido en movimiento"],
    metrics: [
      { v: "+212", l: "socios en 90 días" },
      { v: "71%", l: "altas desde el móvil" },
      { v: "94%", l: "ocupación media" },
    ],
    quote: "Subimos precios un 30% y aun así tenemos lista de espera.",
    author: "Marc Soler, fundador",
    gradient: "from-[#1a2e05] via-[#4d7c0f] to-[#d4ff5c]",
    mark: "F",
  },
  {
    client: "Vidal & Ros Abogados",
    place: "Madrid",
    sector: "Legal",
    headline: "De despacho tradicional a primera opción en mercantil.",
    challenge:
      "Cuarenta años de trayectoria, cero presencia digital. Las empresas que necesitaban exactamente sus servicios contrataban a otros.",
    work: ["Estrategia de posicionamiento", "Web editorial", "Captación cualificada", "Artículos jurídicos"],
    metrics: [
      { v: "×3,4", l: "consultas cualificadas" },
      { v: "Top 3", l: "en 42 búsquedas clave" },
      { v: "3:12", l: "min de lectura media" },
    ],
    quote: "Proyecta exactamente lo que somos. Por fin.",
    author: "Elena Vidal, socia directora",
    gradient: "from-[#1c1917] via-[#44403c] to-[#d6d3d1]",
    mark: "V",
  },
];

export function Cases() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLOListElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0.05, 0.95], [0, -distance]);

  // Horizontal travel = track width minus viewport, re-measured on resize.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const measure = () => setDistance(Math.max(0, track.scrollWidth - window.innerWidth + 32));
    const ro = new ResizeObserver(measure);
    ro.observe(track);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);
  const progress = useTransform(scrollYProgress, [0.05, 0.95], ["0%", "100%"]);

  return (
    <section ref={ref} className="relative h-[320vh]" aria-labelledby="cases-title">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="container-x mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="mb-4 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              <span className="text-fg">04</span>
              <span className="h-px w-8 bg-line-strong" />
              Casos
            </p>
            <h2 id="cases-title" className="text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.02] tracking-[-0.035em]">
              Historias de transformación. <span className="font-serif italic text-gradient">Resultados medibles.</span>
            </h2>
            {DEMO_CONTENT && (
              <p className="mt-3 font-mono text-[10px] text-subtle">Casos ilustrativos · nombres y cifras de ejemplo</p>
            )}
          </div>
          <div className="hidden w-48 md:block" aria-hidden>
            <div className="h-px w-full bg-line">
              <motion.div className="h-px bg-fg" style={{ width: progress }} />
            </div>
            <p className="mt-2 text-right font-mono text-[10px] text-muted">DESLIZA</p>
          </div>
        </div>

        <motion.ol ref={trackRef} style={{ x }} className="flex w-max gap-5 pl-[max(1rem,calc((100vw_-_1320px)/2_+_2.5rem))]">
          {CASES.map((c, i) => (
            <li key={c.client} className="w-[88vw] max-w-[1080px] sm:w-[78vw]">
              <CaseCard data={c} index={i} />
            </li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}

function CaseCard({ data, index }: { data: (typeof CASES)[number]; index: number }) {
  return (
    <article className="hairline-gradient grid h-[min(66svh,600px)] overflow-hidden rounded-[28px] bg-ink-2 md:grid-cols-[0.9fr_1.1fr]">
      {/* Brand visual */}
      <div className={cn("relative hidden overflow-hidden bg-gradient-to-br md:block", data.gradient)}>
        <div className="absolute inset-0 bg-grid opacity-30 mask-radial" />
        <span className="absolute -bottom-16 -right-6 font-serif text-[22rem] italic leading-none text-white/15">
          {data.mark}
        </span>
        <div className="absolute left-8 top-8 rounded-full bg-black/25 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur">
          {String(index + 1).padStart(2, "0")} / {data.sector.toUpperCase()}
        </div>
        <div className="absolute bottom-8 left-8 right-8 rounded-2xl bg-black/30 p-4 text-white backdrop-blur-md">
          <p className="font-serif text-2xl italic leading-tight">“{data.quote}”</p>
          <p className="mt-2 text-xs text-white/70">{data.author}</p>
        </div>
      </div>

      {/* Story */}
      <div className="flex flex-col justify-between p-7 sm:p-10">
        <div>
          <p className="text-sm text-muted">
            {data.client} · {data.place}
          </p>
          <h3 className="mt-3 text-balance text-[clamp(1.5rem,2.8vw,2.4rem)] font-medium leading-[1.08] tracking-[-0.03em]">
            {data.headline}
          </h3>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-muted">{data.challenge}</p>
          <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Qué hicimos">
            {data.work.map((w) => (
              <li key={w} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted">
                {w}
              </li>
            ))}
          </ul>
        </div>
        <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line pt-6">
          {data.metrics.map((m) => (
            <div key={m.l}>
              <dt className="sr-only">{m.l}</dt>
              <dd className="text-[clamp(1.4rem,2.6vw,2.2rem)] font-medium tracking-[-0.04em]">{m.v}</dd>
              <dd className="mt-1 text-[11px] leading-tight text-muted">{m.l}</dd>
            </div>
          ))}
        </dl>
      </div>
    </article>
  );
}
