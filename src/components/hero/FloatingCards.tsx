"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { EASE, cn } from "@/lib/utils";

const NOTIFICATIONS = [
  { mark: "O", bg: "from-[#c2410c] to-[#7c2d12]", title: "Nueva reserva", body: "Olmo · Mesa para 4 · Hoy 21:30" },
  { mark: "A", bg: "from-[#38bdf8] to-[#1e40af]", title: "Cita confirmada", body: "Arlanza · Implante · Jue 10:15" },
  { mark: "V", bg: "from-[#a8a29e] to-[#292524]", title: "Consulta entrante", body: "Vidal & Ros · Mercantil" },
  { mark: "F", bg: "from-[#d4ff5c] to-[#4d7c0f]", title: "Nuevo socio", body: "Forma · Plan anual · Pagado" },
  { mark: "N", bg: "from-[#f9a8d4] to-[#9d174d]", title: "Pedido #4821", body: "Nácar · 3 artículos · 186,00 €" },
];

/** Live-feeling notification that cycles through what a great website brings in. */
export function NotificationCard({ className }: { className?: string }) {
  const [i, setI] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % NOTIFICATIONS.length), 3200);
    return () => clearInterval(id);
  }, []);

  const n = NOTIFICATIONS[i];
  return (
    <div className={cn("glass w-[268px] overflow-hidden rounded-2xl p-3.5 shadow-2xl", className)}>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -14, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="flex items-center gap-3"
        >
          <span
            className={cn(
              "grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br font-serif text-xl italic text-white shadow-inner",
              n.bg,
            )}
            aria-hidden
          >
            {n.mark}
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-[13px] font-medium">{n.title}</p>
              <span className="font-mono text-[10px] text-muted">ahora</span>
            </div>
            <p className="truncate text-[12px] text-muted">{n.body}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/** Performance ring — the silent proof of engineering quality. */
export function ScoreRing({ className }: { className?: string }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  return (
    <div className={cn("glass flex items-center gap-3.5 rounded-2xl p-3.5 pr-5 shadow-2xl", className)}>
      <svg viewBox="0 0 64 64" className="size-14 -rotate-90" aria-hidden>
        <circle cx="32" cy="32" r={r} fill="none" stroke="rgba(94,230,208,0.15)" strokeWidth="5" />
        <motion.circle
          cx="32"
          cy="32"
          r={r}
          fill="none"
          stroke="#5ee6d0"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: 0 }}
          transition={{ delay: 1.4, duration: 1.8, ease: EASE }}
        />
      </svg>
      <div>
        <p className="text-2xl font-semibold leading-none tracking-tight text-cyan">100</p>
        <p className="mt-1 text-[11px] text-muted">Rendimiento</p>
      </div>
    </div>
  );
}

/** A Google result where the client is, finally, first. */
export function SearchCard({ className }: { className?: string }) {
  return (
    <div className={cn("glass w-[300px] rounded-2xl p-4 shadow-2xl", className)}>
      <div className="mb-3 flex items-center gap-2 rounded-full bg-white/[0.05] px-3 py-1.5 text-[11px] text-muted">
        <svg viewBox="0 0 16 16" className="size-3" aria-hidden fill="none" stroke="currentColor" strokeWidth="1.6">
          <circle cx="7" cy="7" r="4.5" />
          <path d="m10.5 10.5 3 3" strokeLinecap="round" />
        </svg>
        dentista en bilbao
      </div>
      <div className="flex items-start gap-2.5">
        <span className="mt-0.5 rounded-md bg-lime/15 px-1.5 py-0.5 font-mono text-[10px] font-medium text-lime">#1</span>
        <div className="min-w-0">
          <p className="truncate text-[11px] text-muted">clinicaarlanza.es</p>
          <p className="truncate text-[13px] font-medium text-[#a8b4ff]">Clínica Arlanza · Implantes sin espera</p>
          <p className="mt-0.5 text-[11px] text-amber-300/90">★★★★★ <span className="text-muted">4,9 · 612 reseñas</span></p>
        </div>
      </div>
    </div>
  );
}

/** Tiny load-time chip. */
export function SpeedChip({ className }: { className?: string }) {
  return (
    <div className={cn("glass flex items-center gap-2.5 rounded-full py-2 pl-2 pr-4 shadow-2xl", className)}>
      <span className="grid size-7 place-items-center rounded-full bg-violet/20 text-violet" aria-hidden>
        <svg viewBox="0 0 16 16" className="size-3.5" fill="currentColor">
          <path d="M9 1 3 9h4l-1 6 6-8H8l1-6Z" />
        </svg>
      </span>
      <span className="text-[12px]">
        Carga en <span className="font-mono text-fg">0,6 s</span>
      </span>
    </div>
  );
}
