"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckBurst, DemoNav, DemoPages } from "../shared";
import { cn } from "@/lib/utils";

const PAGES = ["Clínica", "Tratamientos", "Pedir cita"] as const;
type Page = (typeof PAGES)[number];

const TREATMENTS = [
  { n: "Implantes", d: "Carga inmediata, en un día", p: "desde 890 €", c: "from-sky-100 to-sky-50" },
  { n: "Ortodoncia invisible", d: "Alineadores a medida", p: "desde 2.400 €", c: "from-indigo-100 to-indigo-50" },
  { n: "Estética dental", d: "Carillas y blanqueamiento", p: "desde 290 €", c: "from-cyan-100 to-cyan-50" },
  { n: "Higiene y prevención", d: "Revisión completa", p: "Primera visita gratis", c: "from-emerald-100 to-emerald-50" },
];

const DAYS = [
  { d: "Lun", n: 13 },
  { d: "Mar", n: 14 },
  { d: "Mié", n: 15 },
  { d: "Jue", n: 16 },
  { d: "Vie", n: 17 },
];

export function DentalDemo() {
  const [page, setPage] = useState<Page>("Clínica");
  return (
    <div className="@container flex h-full flex-col bg-white text-slate-900">
      <header className="flex items-center justify-between px-5 py-4 @xl:px-8">
        <span className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <span className="grid size-7 place-items-center rounded-lg bg-sky-500 text-xs font-bold text-white">A</span>
          <span className="hidden @md:inline">Arlanza</span>
        </span>
        <DemoNav
          pages={PAGES}
          page={page}
          onChange={setPage}
          layoutId="arlanza-nav"
          className="gap-3 text-[12px] @md:gap-5"
          activeClassName="font-medium text-sky-600"
          inactiveClassName="text-slate-500 hover:text-slate-900"
          indicatorClassName="bg-sky-500"
        />
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <DemoPages page={page}>
          {page === "Clínica" && <Home onBook={() => setPage("Pedir cita")} />}
          {page === "Tratamientos" && <Treatments />}
          {page === "Pedir cita" && <Appointment />}
        </DemoPages>
      </div>
    </div>
  );
}

function Home({ onBook }: { onBook: () => void }) {
  return (
    <div className="relative overflow-hidden px-5 pb-10 pt-8 @xl:px-8 @xl:pt-12">
      <div aria-hidden className="absolute -right-20 -top-10 size-72 rounded-full bg-sky-200/60 blur-3xl" />
      <div aria-hidden className="absolute bottom-0 left-1/3 size-56 rounded-full bg-indigo-100 blur-3xl" />
      <div className="relative grid items-center gap-8 @xl:grid-cols-[1.3fr_1fr]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 ring-1 ring-sky-100">
            <span className="size-1.5 rounded-full bg-emerald-500" /> Citas disponibles hoy
          </span>
          <h3 className="mt-5 text-[clamp(2rem,6.5cqw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.035em]">
            Tu sonrisa, en manos <span className="text-sky-500">expertas.</span>
          </h3>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-slate-500">
            Odontología avanzada sin esperas y sin sorpresas. Presupuesto cerrado desde la primera visita.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={onBook}
              className="rounded-full bg-sky-500 px-5 py-2.5 text-xs font-medium text-white shadow-lg shadow-sky-500/30 transition-all hover:-translate-y-0.5 hover:shadow-xl"
            >
              Pedir cita online
            </button>
            <div className="flex -space-x-2" aria-hidden>
              {["bg-amber-200", "bg-rose-200", "bg-sky-200", "bg-emerald-200"].map((c) => (
                <span key={c} className={cn("size-7 rounded-full ring-2 ring-white", c)} />
              ))}
            </div>
            <span className="text-xs text-slate-500">
              <b className="text-slate-900">4,9</b> · 612 pacientes
            </span>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="rounded-2xl bg-white/80 p-4 shadow-xl shadow-sky-900/10 ring-1 ring-slate-100 backdrop-blur"
        >
          <p className="text-[11px] text-slate-500">Próxima cita disponible</p>
          <p className="mt-1 text-lg font-semibold">Hoy · 17:30</p>
          <div className="mt-3 flex items-center gap-3 rounded-xl bg-slate-50 p-3">
            <span className="size-9 rounded-full bg-gradient-to-br from-sky-300 to-indigo-300" aria-hidden />
            <div>
              <p className="text-xs font-medium">Dra. Etxeberria</p>
              <p className="text-[11px] text-slate-500">Implantología · 18 años</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function Treatments() {
  return (
    <div className="grid gap-3 px-5 py-8 @lg:grid-cols-2 @xl:px-8">
      {TREATMENTS.map((t, i) => (
        <motion.div
          key={t.n}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.06 }}
          whileHover={{ y: -4 }}
          className={cn("group cursor-pointer rounded-2xl bg-gradient-to-br p-5 ring-1 ring-slate-100", t.c)}
        >
          <p className="font-semibold tracking-tight">{t.n}</p>
          <p className="mt-1 text-xs text-slate-500">{t.d}</p>
          <div className="mt-6 flex items-center justify-between">
            <span className="text-xs font-medium text-sky-700">{t.p}</span>
            <span className="grid size-7 place-items-center rounded-full bg-white text-xs transition-transform group-hover:translate-x-1">
              →
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function Appointment() {
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex flex-col items-center px-5 py-16 text-center text-sky-500">
        <CheckBurst />
        <p className="mt-4 text-2xl font-semibold tracking-tight text-slate-900">¡Cita reservada!</p>
        <p className="mt-2 text-sm text-slate-500">
          {DAYS[day].d} {DAYS[day].n} a las {slot}. Te recordaremos por WhatsApp el día anterior.
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 @xl:px-8">
      <p className="text-xl font-semibold tracking-tight">Elige día y hora</p>
      <div className="mt-5 grid grid-cols-5 gap-2">
        {DAYS.map((d, i) => (
          <button
            key={d.d}
            type="button"
            onClick={() => {
              setDay(i);
              setSlot(null);
            }}
            aria-pressed={day === i}
            className={cn(
              "rounded-xl py-3 text-center transition-all",
              day === i ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30" : "bg-slate-50 hover:bg-slate-100",
            )}
          >
            <span className="block text-[10px] opacity-70">{d.d}</span>
            <span className="text-lg font-semibold">{d.n}</span>
          </button>
        ))}
      </div>
      <div className="mt-5 grid grid-cols-3 gap-2 @lg:grid-cols-4">
        {["09:00", "10:15", "11:30", "12:45", "16:00", "17:30", "18:15", "19:00"]
          .filter((_, i) => (i + day) % 3 !== 0)
          .map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => setSlot(s)}
              aria-pressed={slot === s}
              className={cn(
                "rounded-lg border py-2 font-mono text-xs transition-colors",
                slot === s ? "border-sky-500 bg-sky-50 text-sky-700" : "border-slate-200 hover:border-slate-400",
              )}
            >
              {s}
            </button>
          ))}
      </div>
      <button
        type="button"
        disabled={!slot}
        onClick={() => setDone(true)}
        className="mt-6 w-full rounded-xl bg-slate-900 py-3 text-sm font-medium text-white transition-opacity disabled:opacity-30"
      >
        {slot ? `Confirmar cita · ${DAYS[day].d} ${slot}` : "Selecciona una hora"}
      </button>
    </div>
  );
}
