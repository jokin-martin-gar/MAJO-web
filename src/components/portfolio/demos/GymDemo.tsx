"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DemoNav, DemoPages } from "../shared";
import { cn } from "@/lib/utils";

const PAGES = ["Inicio", "Clases", "Planes"] as const;
type Page = (typeof PAGES)[number];

const DAYS = ["L", "M", "X", "J", "V", "S"];
const CLASSES = [
  { t: "07:00", n: "Strength Lab", coach: "Marc", cap: 18, taken: 17 },
  { t: "08:15", n: "Mobility Flow", coach: "Ana", cap: 14, taken: 9 },
  { t: "13:30", n: "HIIT 30", coach: "Iker", cap: 20, taken: 20 },
  { t: "19:00", n: "Hyrox Prep", coach: "Laura", cap: 16, taken: 12 },
];

export function GymDemo() {
  const [page, setPage] = useState<Page>("Inicio");
  return (
    <div className="@container flex h-full flex-col bg-[#0b0c0a] text-white">
      <header className="flex items-center justify-between px-5 py-4 @xl:px-8">
        <span className="text-lg font-black uppercase italic tracking-tighter">
          Forma<span className="text-[#d4ff5c]">.</span>
        </span>
        <DemoNav
          pages={PAGES}
          page={page}
          onChange={setPage}
          layoutId="forma-nav"
          className="text-[11px] font-semibold uppercase tracking-wider"
          activeClassName="text-[#d4ff5c]"
          inactiveClassName="text-white/50 hover:text-white"
          indicatorClassName="bg-[#d4ff5c]"
        />
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <DemoPages page={page}>
          {page === "Inicio" && <Home onCta={() => setPage("Clases")} />}
          {page === "Clases" && <Schedule />}
          {page === "Planes" && <Plans />}
        </DemoPages>
      </div>
    </div>
  );
}

function Home({ onCta }: { onCta: () => void }) {
  return (
    <div className="relative overflow-hidden px-5 py-10 @xl:px-8">
      <div aria-hidden className="absolute -right-10 top-0 h-full w-1/2 bg-[repeating-linear-gradient(115deg,transparent_0_18px,rgba(212,255,92,0.07)_18px_20px)]" />
      <h3 className="relative text-[clamp(2.8rem,11cqw,6rem)] font-black uppercase italic leading-[0.85] tracking-[-0.04em]">
        Muévete
        <br />
        <span className="text-[#d4ff5c]">mejor.</span>
      </h3>
      <p className="relative mt-5 max-w-xs text-sm text-white/60">
        Entrenamiento en grupos reducidos. Coaches de verdad. Resultados que se notan en 8 semanas.
      </p>
      <div className="relative mt-7 flex flex-wrap items-center gap-3">
        <motion.button
          type="button"
          onClick={onCta}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="rounded-full bg-[#d4ff5c] px-5 py-2.5 text-xs font-bold uppercase text-black"
        >
          Prueba gratis 7 días
        </motion.button>
        <span className="text-[11px] uppercase tracking-wider text-white/40">Sin permanencia</span>
      </div>
      <div className="relative mt-10 grid grid-cols-3 gap-2 border-t border-white/10 pt-5">
        {[
          ["94%", "ocupación"],
          ["12", "coaches"],
          ["4,9★", "valoración"],
        ].map(([v, l]) => (
          <div key={l}>
            <p className="text-2xl font-black italic tracking-tight">{v}</p>
            <p className="text-[10px] uppercase tracking-wider text-white/40">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Schedule() {
  const [day, setDay] = useState(2);
  const [booked, setBooked] = useState<string[]>([]);

  return (
    <div className="px-5 py-8 @xl:px-8">
      <div className="flex gap-1.5">
        {DAYS.map((d, i) => (
          <button
            key={d}
            type="button"
            onClick={() => setDay(i)}
            aria-pressed={day === i}
            className={cn(
              "grid size-10 place-items-center rounded-full text-xs font-bold transition-colors",
              day === i ? "bg-[#d4ff5c] text-black" : "bg-white/5 text-white/60 hover:bg-white/10",
            )}
          >
            {d}
          </button>
        ))}
      </div>
      <ul className="mt-6 space-y-2">
        {CLASSES.map((c, i) => {
          const taken = Math.min(c.cap, c.taken - ((i + day) % 4));
          const key = `${day}-${c.n}`;
          const isBooked = booked.includes(key);
          const full = taken + (isBooked ? 1 : 0) >= c.cap && !isBooked;
          return (
            <motion.li
              key={key}
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.04] p-3 ring-1 ring-white/5"
            >
              <span className="w-12 font-mono text-xs text-white/50">{c.t}</span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-bold">{c.n}</p>
                <div className="mt-1.5 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/10">
                    <motion.div
                      className={cn("h-full rounded-full", full ? "bg-red-400" : "bg-[#d4ff5c]")}
                      initial={{ width: 0 }}
                      animate={{ width: `${((taken + (isBooked ? 1 : 0)) / c.cap) * 100}%` }}
                      transition={{ duration: 0.6 }}
                    />
                  </div>
                  <span className="font-mono text-[10px] text-white/40">
                    {Math.min(c.cap, taken + (isBooked ? 1 : 0))}/{c.cap}
                  </span>
                </div>
              </div>
              <button
                type="button"
                disabled={full}
                onClick={() => setBooked((b) => (isBooked ? b.filter((k) => k !== key) : [...b, key]))}
                className={cn(
                  "w-24 shrink-0 rounded-full py-1.5 text-[11px] font-bold uppercase transition-colors",
                  isBooked && "bg-[#d4ff5c] text-black",
                  !isBooked && !full && "bg-white/10 hover:bg-white/20",
                  full && "cursor-not-allowed text-white/30",
                )}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={isBooked ? "y" : full ? "f" : "n"}
                    initial={{ y: 8, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -8, opacity: 0 }}
                    className="block"
                  >
                    {isBooked ? "Dentro ✓" : full ? "Lleno" : "Reservar"}
                  </motion.span>
                </AnimatePresence>
              </button>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}

function Plans() {
  const [annual, setAnnual] = useState(true);
  const plans = [
    { n: "Flex", m: 59, a: 49, f: ["8 clases / mes", "App de reservas"] },
    { n: "Unlimited", m: 89, a: 74, f: ["Clases ilimitadas", "Plan nutricional", "Evaluación trimestral"], hot: true },
    { n: "Personal", m: 190, a: 159, f: ["4 sesiones 1:1", "Todo Unlimited"] },
  ];
  return (
    <div className="px-5 py-8 @xl:px-8">
      <div className="mx-auto flex w-fit rounded-full bg-white/5 p-1 text-[11px] font-bold uppercase">
        {[false, true].map((v) => (
          <button
            key={String(v)}
            type="button"
            onClick={() => setAnnual(v)}
            aria-pressed={annual === v}
            className={cn("rounded-full px-4 py-1.5 transition-colors", annual === v ? "bg-white text-black" : "text-white/50")}
          >
            {v ? "Anual −17%" : "Mensual"}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-3 @xl:grid-cols-3">
        {plans.map((p) => (
          <div
            key={p.n}
            className={cn(
              "rounded-2xl p-5 ring-1 transition-transform hover:-translate-y-1",
              p.hot ? "bg-[#d4ff5c] text-black ring-transparent" : "bg-white/[0.04] ring-white/10",
            )}
          >
            <p className="text-xs font-bold uppercase tracking-wider">{p.n}</p>
            <p className="mt-3 text-4xl font-black italic tracking-tight">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={annual ? "a" : "m"}
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: -10, opacity: 0 }}
                  className="inline-block"
                >
                  {annual ? p.a : p.m}€
                </motion.span>
              </AnimatePresence>
              <span className="text-xs font-normal not-italic opacity-60">/mes</span>
            </p>
            <ul className="mt-4 space-y-1 text-xs opacity-80">
              {p.f.map((f) => (
                <li key={f}>— {f}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
