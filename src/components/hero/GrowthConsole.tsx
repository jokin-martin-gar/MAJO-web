"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { Counter } from "@/components/ui/Counter";
import { EASE, cn } from "@/lib/utils";

type Kpi = { label: string; to: number; decimals: number; suffix: string; delta: string };
type View = { kpis: Kpi[]; before: number[]; after: number[]; caption: string };

// Each tab tells the same story from a different angle. All series share lengths so paths morph.
const VIEWS = {
  Resumen: {
    caption: "Solicitudes mensuales",
    before: [22, 24, 21, 25, 23, 26],
    after: [26, 34, 47, 61, 83, 104, 131, 158, 196, 231, 268, 312],
    kpis: [
      { label: "Visitas", to: 48.2, decimals: 1, suffix: "k", delta: "+184%" },
      { label: "Conversión", to: 6.8, decimals: 1, suffix: "%", delta: "+3,1 pp" },
      { label: "Solicitudes", to: 1204, decimals: 0, suffix: "", delta: "+312%" },
    ],
  },
  Reservas: {
    caption: "Reservas online / mes",
    before: [40, 38, 44, 41, 39, 43],
    after: [48, 70, 96, 118, 142, 170, 188, 205, 236, 250, 281, 298],
    kpis: [
      { label: "Reservas", to: 2896, decimals: 0, suffix: "", delta: "+221%" },
      { label: "Sin llamadas", to: 87, decimals: 0, suffix: "%", delta: "+64 pp" },
      { label: "No-shows", to: 3.2, decimals: 1, suffix: "%", delta: "−71%" },
    ],
  },
  Búsqueda: {
    caption: "Clics desde Google / mes",
    before: [60, 58, 63, 57, 61, 59],
    after: [64, 72, 90, 115, 139, 170, 196, 214, 246, 270, 291, 320],
    kpis: [
      { label: "Posición media", to: 2.1, decimals: 1, suffix: "", delta: "−14 pos." },
      { label: "Palabras top 3", to: 142, decimals: 0, suffix: "", delta: "+128" },
      { label: "Rendimiento", to: 100, decimals: 0, suffix: "", delta: "Lighthouse" },
    ],
  },
} satisfies Record<string, View>;

type Tab = keyof typeof VIEWS;
const TABS = Object.keys(VIEWS) as Tab[];

const W = 640;
const H = 180;
const MAX = 330;
const STEP = W / 17;
const LAUNCH_X = 5 * STEP;

function toPath(values: number[], offsetX = 0) {
  return values
    .map((v, i) => `${i === 0 ? "M" : "L"}${(offsetX + i * STEP).toFixed(1)},${(H - (v / MAX) * H).toFixed(1)}`)
    .join(" ");
}

/** The hero's centrepiece: a product-grade analytics console telling the growth story. */
export function GrowthConsole() {
  const [tab, setTab] = useState<Tab>("Resumen");
  const view = VIEWS[tab];
  const after = toPath(view.after, LAUNCH_X);
  const area = `${after} L${W},${H} L${LAUNCH_X},${H} Z`;
  const endY = H - (view.after[view.after.length - 1] / MAX) * H;

  return (
    <div className="hairline-gradient relative overflow-hidden rounded-[22px] bg-ink-2/90 shadow-[0_60px_160px_-40px_rgba(139,124,255,0.35)] backdrop-blur-xl">
      <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3 sm:px-5">
        <div className="flex min-w-0 items-center gap-2.5">
          <span className="relative flex size-2 shrink-0">
            <span className="absolute inset-0 animate-ping rounded-full bg-cyan/60" />
            <span className="relative size-2 rounded-full bg-cyan" />
          </span>
          <span className="truncate text-[13px] font-medium">Crecimiento en directo</span>
        </div>
        <div role="tablist" aria-label="Vista del panel" className="flex gap-0.5 rounded-lg bg-white/[0.04] p-0.5">
          {TABS.map((t) => (
            <button
              key={t}
              role="tab"
              type="button"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={cn(
                "relative rounded-md px-2 py-1 text-[11px] transition-colors sm:px-2.5",
                tab === t ? "text-fg" : "text-muted hover:text-fg",
              )}
            >
              {tab === t && (
                <motion.span
                  layoutId="console-tab"
                  className="absolute inset-0 rounded-md bg-white/10"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <span className="relative">{t}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 divide-x divide-line border-b border-line">
        <AnimatePresence mode="popLayout" initial={false}>
          {view.kpis.map((k, i) => (
            <motion.div
              key={`${tab}-${k.label}`}
              initial={{ opacity: 0, y: 8, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(6px)" }}
              transition={{ duration: 0.5, ease: EASE, delay: i * 0.05 }}
              className="px-3 py-4 sm:px-5"
            >
              <p className="truncate text-[11px] text-muted">{k.label}</p>
              <p className="mt-1 text-lg font-medium tracking-tight sm:text-2xl">
                <Counter to={k.to} decimals={k.decimals} suffix={k.suffix} duration={1.8} />
              </p>
              <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-cyan/10 px-1.5 py-0.5 font-mono text-[10px] text-cyan">
                {k.delta}
              </p>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative px-4 pb-5 pt-5 sm:px-5">
        <div className="mb-3 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[10px] text-muted">
          <span className="text-fg/80">{view.caption}</span>
          <span className="flex items-center gap-1.5">
            <span className="h-px w-4 border-t border-dashed border-white/40" /> Web anterior
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-0.5 w-4 rounded bg-gradient-to-r from-violet to-cyan" /> Con MAJO
          </span>
        </div>
        <svg
          viewBox={`0 0 ${W} ${H + 8}`}
          className="h-auto w-full overflow-visible"
          role="img"
          aria-label={`Gráfico de ${view.caption.toLowerCase()}: crecimiento sostenido tras el lanzamiento de la nueva web`}
        >
          <defs>
            <linearGradient id="gc-line" x1="0" x2="1">
              <stop offset="0" stopColor="#8b7cff" />
              <stop offset="1" stopColor="#5ee6d0" />
            </linearGradient>
            <linearGradient id="gc-area" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="#8b7cff" stopOpacity="0.35" />
              <stop offset="1" stopColor="#8b7cff" stopOpacity="0" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75, 1].map((r) => (
            <line key={r} x1="0" x2={W} y1={H * r} y2={H * r} stroke="rgba(255,255,255,0.05)" />
          ))}
          <line x1={LAUNCH_X} x2={LAUNCH_X} y1="0" y2={H} stroke="rgba(255,255,255,0.18)" strokeDasharray="2 4" />
          <text x={LAUNCH_X + 8} y="14" fill="rgba(255,255,255,0.5)" fontSize="10" fontFamily="var(--font-geist-mono)">
            Lanzamiento
          </text>

          <motion.path
            animate={{ d: toPath(view.before) }}
            transition={{ duration: 0.8, ease: EASE }}
            fill="none"
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="1.5"
            strokeDasharray="3 4"
          />
          <motion.path
            initial={{ opacity: 0, d: area }}
            animate={{ opacity: 1, d: area }}
            transition={{ opacity: { delay: 1.6, duration: 1.2 }, d: { duration: 0.8, ease: EASE } }}
            fill="url(#gc-area)"
          />
          <motion.path
            initial={{ pathLength: 0, d: after }}
            animate={{ pathLength: 1, d: after }}
            transition={{ pathLength: { delay: 0.9, duration: 2.2, ease: EASE }, d: { duration: 0.8, ease: EASE } }}
            fill="none"
            stroke="url(#gc-line)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <motion.g
            initial={{ opacity: 0, y: endY }}
            animate={{ opacity: 1, y: endY }}
            transition={{ opacity: { delay: 3, duration: 0.6 }, y: { duration: 0.8, ease: EASE } }}
          >
            <circle cx={W} cy={0} r="10" fill="#5ee6d0" opacity="0.2" className="animate-pulse-soft" style={{ transformBox: "fill-box", transformOrigin: "center" }} />
            <circle cx={W} cy={0} r="4" fill="#5ee6d0" />
          </motion.g>
        </svg>
      </div>
    </div>
  );
}
