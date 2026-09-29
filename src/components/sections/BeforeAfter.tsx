"use client";

import { animate, motion, useInView, useMotionValue, useMotionValueEvent, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { NewRestaurantSite, OldRestaurantSite } from "@/components/transform/RestaurantSites";
import { EASE, cn } from "@/lib/utils";

const METRICS = [
  { label: "Tiempo de carga", before: "7,4 s", after: "0,6 s" },
  { label: "Reservas online / mes", before: "0", after: "312" },
  { label: "Posición en Google", before: "#27", after: "#2" },
  { label: "Ticket medio", before: "24 €", after: "41 €" },
];

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const inView = useInView(containerRef, { once: true, margin: "-25% 0px" });
  const pos = useMotionValue(50); // percentage from the left
  const clip = useTransform(pos, (p) => `inset(0 0 0 ${p}%)`);
  const handleLeft = useTransform(pos, (p) => `${p}%`);
  const [value, setValue] = useState(50);
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);

  useMotionValueEvent(pos, "change", (v) => setValue(Math.round(v)));

  // A single invitation sweep the first time it's seen, then it's the visitor's.
  useEffect(() => {
    if (!inView || touched.current) return;
    const controls = animate(pos, [50, 82, 18, 50], { duration: 2.6, ease: EASE, delay: 0.3 });
    return () => controls.stop();
  }, [inView, pos]);

  function setFromClientX(clientX: number) {
    const el = containerRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    pos.set(Math.min(100, Math.max(0, ((clientX - r.left) / r.width) * 100)));
  }

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    touched.current = true;
    pos.stop();
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    setFromClientX(e.clientX);
  }

  function onKeyDown(e: React.KeyboardEvent) {
    const step = e.shiftKey ? 10 : 2;
    let next: number | null = null;
    if (e.key === "ArrowLeft") next = pos.get() - step;
    if (e.key === "ArrowRight") next = pos.get() + step;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = 100;
    if (next === null) return;
    e.preventDefault();
    touched.current = true;
    animate(pos, Math.min(100, Math.max(0, next)), { duration: 0.3, ease: EASE });
  }

  return (
    <section id="transformacion" className="relative py-28 sm:py-40" aria-labelledby="ba-title">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro
            id="ba-title"
            index="03"
            eyebrow="Transformación"
            title="Mismo restaurante. Misma cocina. Otro negocio."
            accent={["Otro", "negocio."]}
            lead="Arrastra y compara. La comida no cambió. Lo que cambió es cómo la percibe quien aún no ha entrado por la puerta."
          />
          <div className="flex shrink-0 gap-2 font-mono text-[11px]">
            <button
              type="button"
              onClick={() => animate(pos, 100, { duration: 0.9, ease: EASE })}
              className="rounded-full border border-line px-3 py-1.5 text-muted transition-colors hover:text-fg"
            >
              Ver antes
            </button>
            <button
              type="button"
              onClick={() => animate(pos, 0, { duration: 0.9, ease: EASE })}
              className="rounded-full bg-fg px-3 py-1.5 text-ink"
            >
              Ver después
            </button>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration: 1.2, ease: EASE }}
          className="mt-14"
        >
          <BrowserFrame url="casaolmo.es">
            <div
              ref={containerRef}
              onPointerDown={onPointerDown}
              onPointerMove={(e) => dragging && setFromClientX(e.clientX)}
              onPointerUp={() => setDragging(false)}
              onPointerCancel={() => setDragging(false)}
              className={cn(
                "relative aspect-[4/5] touch-pan-y select-none sm:aspect-[16/9]",
                dragging ? "cursor-grabbing" : "cursor-ew-resize",
              )}
            >
              <div className="absolute inset-0" aria-hidden>
                <OldRestaurantSite />
              </div>
              <motion.div className="absolute inset-0" style={{ clipPath: clip }} aria-hidden>
                <NewRestaurantSite />
              </motion.div>

              <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-black/70 px-3 py-1 font-mono text-[10px] text-white backdrop-blur">
                ANTES
              </span>
              <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 font-mono text-[10px] text-black backdrop-blur">
                DESPUÉS
              </span>

              <motion.div
                className="absolute inset-y-0 -ml-px w-0.5 bg-white shadow-[0_0_24px_rgba(255,255,255,0.8)]"
                style={{ left: handleLeft }}
              >
                <div
                  role="slider"
                  tabIndex={0}
                  aria-label="Comparar la web antigua con la nueva"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={value}
                  aria-valuetext={`${100 - value}% de la web nueva visible`}
                  onKeyDown={onKeyDown}
                  className="absolute left-1/2 top-1/2 grid size-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-black shadow-2xl transition-transform hover:scale-110"
                >
                  <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                    <path d="m9 6-6 6 6 6M15 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </BrowserFrame>
        </motion.div>

        <dl className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {METRICS.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.1 * i }}
              className="rounded-2xl border border-line bg-ink-2 p-5"
            >
              <dt className="text-xs text-muted">{m.label}</dt>
              <dd className="mt-3 flex items-baseline gap-3">
                <span className="text-sm text-subtle line-through decoration-ember/60">{m.before}</span>
                <span className="text-2xl font-medium tracking-tight">{m.after}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
