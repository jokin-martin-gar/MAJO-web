"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckBurst, DemoNav, DemoPages } from "../shared";
import { EASE, cn } from "@/lib/utils";

/*
 * Arlanza — concept site for a dental clinic.
 * Palette: white and ice blue with deep navy and a mint accent. Health advertising in Spain
 * must show the centre's health-registry number and avoid promising results: both are built in.
 */

const PAGES = ["Clínica", "Tratamientos", "Equipo", "Cita"] as const;
type Page = (typeof PAGES)[number];

const TREATMENTS = [
  {
    n: "Implantes",
    s: "Carga inmediata",
    d: "Sustituimos la pieza perdida por un implante de titanio. En muchos casos, sales con el diente provisional el mismo día.",
    time: "1–3 visitas",
    price: 890,
    icon: "M12 3c-3 0-5 1.5-5 4 0 2 1 3 1.5 6 .4 2.6 1 5 2 5s1-3 1.5-3 .5 3 1.5 3 1.6-2.4 2-5c.5-3 1.5-4 1.5-6 0-2.5-2-4-5-4Z",
  },
  {
    n: "Ortodoncia invisible",
    s: "Alineadores a medida",
    d: "Alineadores transparentes y removibles, planificados con escáner 3D para que veas el resultado previsto antes de empezar.",
    time: "6–18 meses",
    price: 2400,
    icon: "M4 9c2-3 14-3 16 0M4 9c0 4 3 7 8 7s8-3 8-7M8 11v2M12 11v3M16 11v2",
  },
  {
    n: "Estética dental",
    s: "Carillas y blanqueamiento",
    d: "Diseño digital de la sonrisa: probamos la forma de las carillas en tu boca antes de fabricarlas.",
    time: "2–4 visitas",
    price: 290,
    icon: "M12 3l1.8 4.6L18 9l-4.2 1.4L12 15l-1.8-4.6L6 9l4.2-1.4L12 3Z",
  },
  {
    n: "Higiene y prevención",
    s: "Revisión completa",
    d: "Limpieza, revisión y radiografía digital. La primera visita de diagnóstico no tiene coste.",
    time: "45 min",
    price: 0,
    icon: "M5 12l4 4 10-10",
  },
];

const TEAM = [
  { i: "LE", n: "Dra. Leire Etxeberria", r: "Directora médica · Implantología", c: "Col. 09/0000", g: "from-sky-300 to-indigo-300" },
  { i: "PM", n: "Dr. Pablo Mendía", r: "Ortodoncia", c: "Col. 09/0000", g: "from-emerald-200 to-sky-300" },
  { i: "AR", n: "Dra. Ane Ruiz", r: "Estética y prótesis", c: "Col. 09/0000", g: "from-rose-200 to-sky-200" },
];

const REASONS = ["Revisión", "Dolor o urgencia", "Implantes", "Ortodoncia", "Estética"] as const;
const DAYS = [
  { d: "Lun", n: 13 },
  { d: "Mar", n: 14 },
  { d: "Mié", n: 15 },
  { d: "Jue", n: 16 },
  { d: "Vie", n: 17 },
];
const SLOTS = ["09:00", "10:15", "11:30", "12:45", "16:00", "17:30", "18:15", "19:00"];

export function DentalDemo() {
  const [page, setPage] = useState<Page>("Clínica");
  const [reason, setReason] = useState<string | null>(null);
  const book = (r?: string) => {
    setReason(r ?? null);
    setPage("Cita");
  };

  return (
    <div className="@container flex h-full flex-col bg-white text-[#0b2540]">
      <header className="relative z-10 flex items-center justify-between gap-3 border-b border-sky-100 bg-white/90 px-4 py-3.5 @xl:px-8">
        <button type="button" onClick={() => setPage("Clínica")} className="flex items-center gap-2 text-[15px] font-semibold tracking-tight">
          <Logo className="size-7" />
          <span className="hidden @md:inline">
            Arlanza <span className="font-normal text-slate-500">Dental</span>
          </span>
        </button>
        <DemoNav
          pages={PAGES}
          page={page}
          onChange={(p) => (p === "Cita" ? book() : setPage(p))}
          layoutId="arlanza-nav"
          className="gap-3 text-[11px] @md:gap-5 @md:text-[12px]"
          activeClassName="font-medium text-[#0369a1]"
          inactiveClassName="text-slate-500 hover:text-slate-900"
          indicatorClassName="bg-sky-500"
        />
      </header>
      <div className="flex-1 overflow-y-auto bg-[linear-gradient(to_bottom,#f2f9fd,#ffffff_60%)] bg-local no-scrollbar">
        <DemoPages page={page}>
          {page === "Clínica" && <Home onBook={book} onTreatments={() => setPage("Tratamientos")} />}
          {page === "Tratamientos" && <Treatments onBook={book} />}
          {page === "Equipo" && <Team onBook={() => book()} />}
          {page === "Cita" && <Appointment key={reason ?? "none"} initialReason={reason} />}
        </DemoPages>
      </div>
    </div>
  );
}

/* ── Pieces ────────────────────────────────────────────────────────────── */

function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 28 28" className={className} aria-hidden>
      <rect width="28" height="28" rx="8" fill="#0ea5e9" />
      <path d="M7 12c2.5 5 11.5 5 14 0" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="14" cy="8.5" r="1.8" fill="#a7f3d0" />
    </svg>
  );
}

/** Background for the hero: soft mesh of radial gradients, a dot grid and "smile" arcs drawn in. */
function HeroBackdrop() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-clip">
      <div className="absolute inset-0 bg-[radial-gradient(55%_60%_at_90%_10%,rgba(14,165,233,0.22),transparent_70%),radial-gradient(45%_50%_at_10%_90%,rgba(16,185,129,0.14),transparent_70%),radial-gradient(40%_40%_at_60%_60%,rgba(99,102,241,0.10),transparent_70%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(3,105,161,0.16)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(70%_60%_at_70%_40%,black,transparent)]" />
      <svg viewBox="0 0 600 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" fill="none">
        {[0, 1, 2, 3, 4].map((i) => (
          <motion.path
            key={i}
            d={`M${220 - i * 30} ${150 + i * 10} C ${330} ${330 + i * 28}, ${520} ${330 + i * 28}, ${640 + i * 30} ${150 + i * 10}`}
            stroke={i % 2 ? "#10b981" : "#0ea5e9"}
            strokeOpacity={0.28 - i * 0.04}
            strokeWidth="1.2"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2, delay: 0.2 + i * 0.15, ease: EASE }}
          />
        ))}
      </svg>
    </div>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#0369a1]">{children}</p>;
}

/* ── Pages ─────────────────────────────────────────────────────────────── */

function Home({ onBook, onTreatments }: { onBook: (r?: string) => void; onTreatments: () => void }) {
  return (
    <div>
      <section className="relative isolate px-5 pb-10 pt-9 @xl:px-10 @xl:pt-12">
        <HeroBackdrop />
        <div className="relative grid items-center gap-8 @xl:grid-cols-[1.25fr_1fr]">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-[#0369a1] shadow-sm ring-1 ring-sky-100">
              <span className="relative flex size-1.5">
                <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400" />
                <span className="relative size-1.5 rounded-full bg-emerald-500" />
              </span>
              Citas disponibles hoy
            </span>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-5 text-[clamp(2rem,6.6cqw,3.5rem)] font-semibold leading-[1.02] tracking-[-0.035em]"
            >
              Tu sonrisa, en manos{" "}
              <span className="bg-gradient-to-r from-sky-500 to-emerald-500 bg-clip-text text-transparent">expertas.</span>
            </motion.h3>
            <p className="mt-4 max-w-[40ch] text-sm leading-relaxed text-slate-600">
              Odontología avanzada sin esperas. Diagnóstico con escáner 3D y presupuesto cerrado por escrito desde la primera visita.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onBook()}
                className="rounded-full bg-[#0b2540] px-5 py-2.5 text-xs font-medium text-white shadow-lg shadow-sky-900/20 transition-all hover:-translate-y-0.5"
              >
                Pedir cita online
              </button>
              <button type="button" onClick={onTreatments} className="rounded-full bg-white px-5 py-2.5 text-xs font-medium ring-1 ring-sky-200 hover:ring-sky-400">
                Ver tratamientos
              </button>
            </div>
          </div>

          <div className="relative mx-auto h-[220px] w-full max-w-[300px]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.7, ease: EASE }}
              className="absolute inset-x-0 top-0 rounded-2xl bg-white/85 p-4 shadow-xl shadow-sky-900/10 ring-1 ring-white backdrop-blur-md"
            >
              <p className="text-[11px] text-slate-500">Próxima cita disponible</p>
              <p className="mt-0.5 text-lg font-semibold">Hoy · 17:30</p>
              <div className="mt-3 flex items-center gap-3 rounded-xl bg-sky-50/80 p-2.5">
                <span className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-sky-300 to-indigo-300 text-[11px] font-semibold text-white">LE</span>
                <div>
                  <p className="text-xs font-medium">Dra. Etxeberria</p>
                  <p className="text-[11px] text-slate-500">Implantología</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0, y: [0, -5, 0] }}
              transition={{ opacity: { delay: 0.5 }, x: { delay: 0.5, duration: 0.7, ease: EASE }, y: { duration: 5, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute -right-2 bottom-4 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 text-[11px] shadow-lg shadow-sky-900/10 ring-1 ring-white backdrop-blur-md"
            >
              <span className="grid size-6 place-items-center rounded-full bg-emerald-100 text-emerald-700">€</span>
              <span>
                <b className="font-semibold">Presupuesto cerrado</b>
                <br />
                <span className="text-slate-500">por escrito, sin sorpresas</span>
              </span>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0, y: [0, 5, 0] }}
              transition={{ opacity: { delay: 0.7 }, x: { delay: 0.7, duration: 0.7, ease: EASE }, y: { duration: 6, repeat: Infinity, ease: "easeInOut" } }}
              className="absolute bottom-0 left-0 rounded-xl bg-[#0b2540] px-3 py-2 text-[11px] text-white shadow-lg"
            >
              Financiación <b className="text-emerald-300">0 % TAE</b>
            </motion.div>
          </div>
        </div>

        <ul className="relative mt-8 grid gap-2 @lg:grid-cols-3">
          {[
            ["Escáner 3D", "Diagnóstico sin moldes incómodos"],
            ["Urgencias en el día", "Si te duele, te vemos hoy"],
            ["Recordatorio por WhatsApp", "Y cambios de cita en un toque"],
          ].map(([t, d]) => (
            <li key={t} className="flex items-start gap-2.5 rounded-xl bg-white/70 p-3 ring-1 ring-sky-100 backdrop-blur-sm">
              <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-sky-500 text-white">
                <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden>
                  <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <span>
                <span className="block text-[12px] font-semibold">{t}</span>
                <span className="block text-[11px] text-slate-500">{d}</span>
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="px-5 py-10 @xl:px-10">
        <Eyebrow>Tu primera visita</Eyebrow>
        <p className="mt-2 max-w-[24ch] text-2xl font-semibold tracking-tight">Sabrás qué necesitas y cuánto cuesta. El mismo día.</p>
        <ol className="mt-6 grid gap-3 @xl:grid-cols-3">
          {[
            ["Diagnóstico", "Escáner intraoral 3D y radiografía digital de baja radiación."],
            ["Plan y presupuesto", "Te explicamos las opciones y te damos el presupuesto cerrado por escrito."],
            ["Tratamiento", "Empezamos cuando tú decidas, con citas que se adaptan a tu horario."],
          ].map(([t, d], i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: EASE }}
              className="relative overflow-clip rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
            >
              <span className="absolute -right-1 -top-4 text-7xl font-semibold text-sky-500/10">{i + 1}</span>
              <p className="relative text-[15px] font-semibold">{t}</p>
              <p className="relative mt-1 text-[12px] leading-relaxed text-slate-500">{d}</p>
            </motion.li>
          ))}
        </ol>
      </section>

      <footer className="border-t border-slate-100 bg-slate-50 px-5 py-5 text-[10px] leading-relaxed text-slate-500 @xl:px-10">
        <p>Arlanza Dental · Burgos · Centro sanitario autorizado nº CS-0000</p>
        <p>Directora médica: Dra. Leire Etxeberria, col. 09/0000 · Aviso legal · Privacidad</p>
      </footer>
    </div>
  );
}

function Treatments({ onBook }: { onBook: (r?: string) => void }) {
  const [sel, setSel] = useState(0);
  const [months, setMonths] = useState(12);
  const t = TREATMENTS[sel];
  const monthly = t.price ? Math.ceil(t.price / months) : 0;

  return (
    <div className="px-5 py-8 @xl:px-10">
      <Eyebrow>Tratamientos</Eyebrow>
      <p className="mt-2 text-2xl font-semibold tracking-tight">Precios claros desde el principio.</p>
      <div className="mt-6 grid gap-4 @xl:grid-cols-[220px_1fr]">
        <div className="no-scrollbar -mx-1 flex gap-2 overflow-x-auto px-1 @xl:mx-0 @xl:flex-col @xl:overflow-visible @xl:px-0">
          {TREATMENTS.map((x, i) => (
            <button
              key={x.n}
              type="button"
              onClick={() => setSel(i)}
              aria-pressed={sel === i}
              className={cn(
                "flex shrink-0 items-center gap-3 rounded-xl p-3 text-left transition-all",
                sel === i ? "bg-[#0b2540] text-white shadow-lg shadow-sky-900/20" : "bg-white ring-1 ring-slate-100 hover:ring-sky-200",
              )}
            >
              <span className={cn("grid size-8 shrink-0 place-items-center rounded-lg", sel === i ? "bg-white/10 text-sky-300" : "bg-sky-50 text-sky-600")}>
                <svg viewBox="0 0 24 24" className="size-4" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d={x.icon} />
                </svg>
              </span>
              <span>
                <span className="block text-[13px] font-semibold">{x.n}</span>
                <span className={cn("block text-[11px]", sel === i ? "text-white/60" : "text-slate-500")}>{x.s}</span>
              </span>
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={t.n}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="relative overflow-clip rounded-2xl bg-white p-5 shadow-sm ring-1 ring-slate-100"
          >
            <div aria-hidden className="absolute -right-16 -top-16 size-48 rounded-full bg-[radial-gradient(closest-side,rgba(14,165,233,0.15),transparent)]" />
            <p className="relative text-xl font-semibold tracking-tight">{t.n}</p>
            <p className="relative mt-2 text-[13px] leading-relaxed text-slate-600">{t.d}</p>
            <dl className="relative mt-4 grid grid-cols-2 gap-2 text-[12px]">
              <div className="rounded-xl bg-sky-50/70 p-3">
                <dt className="text-slate-500">Duración</dt>
                <dd className="font-semibold">{t.time}</dd>
              </div>
              <div className="rounded-xl bg-sky-50/70 p-3">
                <dt className="text-slate-500">Precio</dt>
                <dd className="font-semibold">{t.price ? `desde ${t.price.toLocaleString("es-ES", { useGrouping: "always" })} €` : "Primera visita sin coste"}</dd>
              </div>
            </dl>

            {t.price > 0 && (
              <div className="relative mt-4 rounded-xl border border-dashed border-sky-200 p-3">
                <div className="flex items-center justify-between text-[12px]">
                  <span className="text-slate-500">Financiación sin intereses</span>
                  <span className="font-semibold text-[#0369a1]">
                    {monthly} €/mes · {months} meses
                  </span>
                </div>
                <div className="mt-2 grid grid-cols-4 gap-1">
                  {[6, 12, 18, 24].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMonths(m)}
                      aria-pressed={months === m}
                      className={cn("rounded-lg py-1.5 text-[11px] transition-colors", months === m ? "bg-sky-500 text-white" : "bg-slate-50 hover:bg-slate-100")}
                    >
                      {m} m
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-[10px] text-slate-500">TIN 0 % · TAE 0 %. Sujeto a aprobación de la entidad financiera.</p>
              </div>
            )}

            <button
              type="button"
              onClick={() => onBook(t.n === "Higiene y prevención" ? "Revisión" : t.n === "Estética dental" ? "Estética" : t.n === "Ortodoncia invisible" ? "Ortodoncia" : "Implantes")}
              className="relative mt-5 w-full rounded-xl bg-[#0b2540] py-3 text-sm font-medium text-white transition-transform hover:scale-[1.01]"
            >
              Pedir valoración
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function Team({ onBook }: { onBook: () => void }) {
  return (
    <div className="relative px-5 py-8 @xl:px-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-48 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(14,165,233,0.12),transparent)]" />
      <div className="relative">
        <Eyebrow>Equipo</Eyebrow>
        <p className="mt-2 max-w-[24ch] text-2xl font-semibold tracking-tight">Especialistas que te explican las cosas.</p>
        <ul className="mt-6 grid gap-3 @xl:grid-cols-3">
          {TEAM.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.6, ease: EASE }}
              className="group overflow-clip rounded-2xl bg-white shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-lg hover:shadow-sky-900/10"
            >
              <div className={cn("relative grid aspect-[5/3] place-items-center bg-gradient-to-br", p.g)}>
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:12px_12px] opacity-60" />
                <span className="relative grid size-16 place-items-center rounded-full bg-white/90 text-lg font-semibold text-[#0b2540] shadow-md transition-transform duration-500 group-hover:scale-110">
                  {p.i}
                </span>
              </div>
              <div className="p-4">
                <p className="text-[15px] font-semibold">{p.n}</p>
                <p className="text-[12px] text-[#0369a1]">{p.r}</p>
                <p className="mt-2 font-mono text-[10px] text-slate-500">Nº colegiado {p.c}</p>
              </div>
            </motion.li>
          ))}
        </ul>
        <button type="button" onClick={onBook} className="mt-6 rounded-full bg-[#0b2540] px-5 py-2.5 text-xs font-medium text-white">
          Pedir cita con el equipo
        </button>
      </div>
    </div>
  );
}

function Appointment({ initialReason }: { initialReason: string | null }) {
  const [step, setStep] = useState(initialReason ? 1 : 0);
  const [reason, setReason] = useState<string | null>(initialReason);
  const [day, setDay] = useState(1);
  const [slot, setSlot] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState(true);
  const [privacy, setPrivacy] = useState(false);
  const [done, setDone] = useState(false);

  const canNext = [Boolean(reason), Boolean(slot), name.trim().length > 1 && phone.trim().length > 5 && privacy][step];

  if (done) {
    return (
      <div className="flex flex-col items-center px-5 py-14 text-center text-sky-500">
        <CheckBurst />
        <p className="mt-4 text-2xl font-semibold tracking-tight text-[#0b2540]">¡Cita reservada!</p>
        <p className="mt-2 max-w-xs text-sm text-slate-600">
          {reason} · {DAYS[day].d} {DAYS[day].n} a las {slot}.
          {whatsapp ? " Te recordaremos por WhatsApp el día anterior." : " Te enviaremos la confirmación por SMS."}
        </p>
        <span className="mt-6 rounded-full bg-sky-50 px-4 py-2 text-xs text-[#0369a1] ring-1 ring-sky-100">Añadir al calendario</span>
      </div>
    );
  }

  const choice = (on: boolean) =>
    on ? "bg-sky-500 text-white shadow-lg shadow-sky-500/30" : "bg-white ring-1 ring-slate-200 hover:ring-sky-300";

  return (
    <div className="px-5 py-8 @xl:px-10">
      <div className="flex items-center justify-between">
        <Eyebrow>Pedir cita</Eyebrow>
        <span className="text-[11px] text-slate-500">Paso {step + 1} de 3</span>
      </div>
      <div className="mt-3 h-1 overflow-clip rounded-full bg-slate-100">
        <motion.div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-emerald-400" animate={{ width: `${((step + 1) / 3) * 100}%` }} transition={{ duration: 0.5, ease: EASE }} />
      </div>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -16 }}
          transition={{ duration: 0.3, ease: EASE }}
          className="mt-6"
        >
          {step === 0 && (
            <>
              <p className="text-xl font-semibold tracking-tight">¿Cuál es el motivo de la visita?</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {REASONS.map((r) => (
                  <button key={r} type="button" onClick={() => setReason(r)} aria-pressed={reason === r} className={cn("rounded-full px-4 py-2 text-[13px] transition-all", choice(reason === r))}>
                    {r}
                  </button>
                ))}
              </div>
              {reason === "Dolor o urgencia" && (
                <p className="mt-4 rounded-xl bg-amber-50 p-3 text-[12px] text-amber-900 ring-1 ring-amber-100">
                  Reservamos huecos cada día para urgencias. Elige el primero disponible.
                </p>
              )}
            </>
          )}

          {step === 1 && (
            <>
              <p className="text-xl font-semibold tracking-tight">Elige día y hora</p>
              <div className="mt-4 grid grid-cols-5 gap-2">
                {DAYS.map((d, i) => (
                  <button
                    key={d.d}
                    type="button"
                    onClick={() => {
                      setDay(i);
                      setSlot(null);
                    }}
                    aria-pressed={day === i}
                    className={cn("rounded-xl py-3 text-center transition-all", choice(day === i))}
                  >
                    <span className="block text-[10px] opacity-70">{d.d}</span>
                    <span className="text-lg font-semibold">{d.n}</span>
                  </button>
                ))}
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 @lg:grid-cols-4">
                {SLOTS.filter((_, i) => (i + day) % 3 !== 0).map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSlot(s)}
                    aria-pressed={slot === s}
                    className={cn(
                      "rounded-lg border py-2 font-mono text-xs transition-colors",
                      slot === s ? "border-sky-500 bg-sky-50 text-[#0369a1]" : "border-slate-200 bg-white hover:border-slate-400",
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <p className="text-xl font-semibold tracking-tight">Tus datos</p>
              <div className="mt-4 grid gap-3 @lg:grid-cols-2">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nombre y apellidos"
                  aria-label="Nombre y apellidos"
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Teléfono"
                  aria-label="Teléfono"
                  inputMode="tel"
                  className="rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm outline-none focus:border-sky-400 focus:ring-4 focus:ring-sky-100"
                />
              </div>
              <div className="mt-4 flex items-center gap-3 text-sm">
                <button
                  type="button"
                  role="switch"
                  aria-checked={whatsapp}
                  aria-label="Recordatorio por WhatsApp"
                  onClick={() => setWhatsapp((w) => !w)}
                  className={cn("relative h-6 w-11 rounded-full transition-colors", whatsapp ? "bg-emerald-500" : "bg-slate-300")}
                >
                  <motion.span layout className={cn("absolute top-1 size-4 rounded-full bg-white", whatsapp ? "right-1" : "left-1")} />
                </button>
                Recordatorio por WhatsApp
              </div>
              <label className="mt-4 flex cursor-pointer items-start gap-2.5 text-[12px] text-slate-600">
                <input type="checkbox" checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} className="mt-0.5 size-4 accent-sky-500" />
                Acepto la política de privacidad. Tus datos de salud se tratan con la máxima confidencialidad.
              </label>
            </>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-7 flex items-center gap-3">
        {step > 0 && (
          <button type="button" onClick={() => setStep(step - 1)} className="rounded-xl px-3 py-3 text-sm text-slate-500 hover:text-slate-900">
            ← Atrás
          </button>
        )}
        <button
          type="button"
          disabled={!canNext}
          onClick={() => (step < 2 ? setStep(step + 1) : setDone(true))}
          className="flex-1 rounded-xl bg-[#0b2540] py-3 text-sm font-medium text-white transition-opacity disabled:opacity-30"
        >
          {step < 2 ? "Continuar" : `Confirmar cita · ${DAYS[day].d} ${slot}`}
        </button>
      </div>
    </div>
  );
}
