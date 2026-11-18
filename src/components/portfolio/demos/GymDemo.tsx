"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckBurst, DemoNav, DemoPages, grain } from "../shared";
import { EASE, cn } from "@/lib/utils";

/*
 * Forma — concept site for a boutique training gym.
 * Palette: black and electric lime. No promised results (no "lose X kg in Y weeks"):
 * it sells small groups, qualified coaches and no lock-in contracts.
 */

const PAGES = ["Inicio", "Horario", "Coaches", "Planes"] as const;
type Page = (typeof PAGES)[number];

const LIME = "#d4ff5c";

const DISCIPLINES = [
  { n: "Fuerza", d: "Técnica primero, carga después.", lvl: 3 },
  { n: "HIIT", d: "30 minutos que cuentan doble.", lvl: 5 },
  { n: "Movilidad", d: "Muévete sin dolor, rinde más.", lvl: 1 },
  { n: "Hyrox", d: "Prepara tu primera carrera.", lvl: 4 },
] as const;
type Discipline = (typeof DISCIPLINES)[number]["n"];

const COACHES = [
  { i: "MC", n: "Marc Coll", s: "Fuerza y halterofilia", t: "Grado en CAFyD", fav: "Strength Lab" },
  { i: "AV", n: "Ana Vidal", s: "Movilidad y yoga", t: "Fisioterapeuta", fav: "Mobility Flow" },
  { i: "IG", n: "Iker Goñi", s: "HIIT y acondicionamiento", t: "TSEAS", fav: "HIIT 30" },
  { i: "LS", n: "Laura Sanz", s: "Hyrox y resistencia", t: "Grado en CAFyD", fav: "Hyrox Prep" },
];

const DAYS = [
  { d: "L", n: 13 }, { d: "M", n: 14 }, { d: "X", n: 15 }, { d: "J", n: 16 }, { d: "V", n: 17 }, { d: "S", n: 18 },
];
const CLASSES: { t: string; n: string; k: Discipline; coach: string; cap: number; taken: number }[] = [
  { t: "07:00", n: "Strength Lab", k: "Fuerza", coach: "MC", cap: 16, taken: 15 },
  { t: "08:15", n: "Mobility Flow", k: "Movilidad", coach: "AV", cap: 14, taken: 9 },
  { t: "13:30", n: "HIIT 30", k: "HIIT", coach: "IG", cap: 16, taken: 16 },
  { t: "18:00", n: "Strength Lab", k: "Fuerza", coach: "MC", cap: 16, taken: 11 },
  { t: "19:00", n: "Hyrox Prep", k: "Hyrox", coach: "LS", cap: 16, taken: 12 },
  { t: "20:15", n: "HIIT 30", k: "HIIT", coach: "IG", cap: 16, taken: 8 },
];

export function GymDemo() {
  const [page, setPage] = useState<Page>("Inicio");
  return (
    <div className="@container flex h-full flex-col bg-[#0b0c0a] text-white">
      <header className="relative z-10 flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-3.5 @xl:px-8">
        <button type="button" onClick={() => setPage("Inicio")} className="text-lg font-black uppercase italic tracking-tighter">
          Forma<span style={{ color: LIME }}>.</span>
        </button>
        <DemoNav
          pages={PAGES}
          page={page}
          onChange={setPage}
          layoutId="forma-nav"
          className="gap-3 text-[10px] font-semibold uppercase tracking-wider @md:gap-5 @md:text-[11px]"
          activeClassName="text-[#d4ff5c]"
          inactiveClassName="text-white/50 hover:text-white"
          indicatorClassName="bg-[#d4ff5c]"
        />
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ backgroundImage: grain(0.12), backgroundAttachment: "local" }}>
        <DemoPages page={page}>
          {page === "Inicio" && <Home onTrial={() => setPage("Planes")} onSchedule={() => setPage("Horario")} />}
          {page === "Horario" && <Schedule />}
          {page === "Coaches" && <Coaches onSchedule={() => setPage("Horario")} />}
          {page === "Planes" && <Plans />}
        </DemoPages>
      </div>
    </div>
  );
}

/* ── Pieces ────────────────────────────────────────────────────────────── */

/** Giant outlined word scrolling behind the hero. */
function OutlineMarquee() {
  const word = "FORMA · FUERZA · RITMO · ";
  return (
    <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 overflow-clip">
      <motion.div
        className="flex w-max whitespace-nowrap text-[7rem] font-black uppercase italic leading-none tracking-tighter text-transparent @xl:text-[9rem]"
        style={{ WebkitTextStroke: "1px rgba(212,255,92,0.18)" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 28, ease: "linear", repeat: Infinity }}
      >
        <span>{word}</span>
        <span>{word}</span>
      </motion.div>
    </div>
  );
}

/** Heart-rate trace that keeps drawing itself. */
function Pulse({ className }: { className?: string }) {
  const d = "M0 30 H60 L70 30 L78 8 L88 52 L96 22 L104 30 H170 L180 30 L188 12 L198 48 L206 30 H300";
  return (
    <svg viewBox="0 0 300 60" className={className} fill="none" aria-hidden>
      <path d={d} stroke="rgba(255,255,255,0.08)" strokeWidth="2" />
      <motion.path
        d={d}
        stroke={LIME}
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0, pathOffset: 0 }}
        animate={{ pathLength: [0, 0.35, 0.35], pathOffset: [0, 0.65, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
        style={{ filter: "drop-shadow(0 0 6px rgba(212,255,92,0.8))" }}
      />
    </svg>
  );
}

function Intensity({ lvl, dark }: { lvl: number; dark?: boolean }) {
  return (
    <span className="flex items-end gap-0.5" aria-label={`Intensidad ${lvl} de 5`}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span
          key={i}
          className={cn("w-1 rounded-sm", i <= lvl ? (dark ? "bg-black" : "bg-[#d4ff5c]") : dark ? "bg-black/20" : "bg-white/15")}
          style={{ height: 4 + i * 2.5 }}
        />
      ))}
    </span>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.25em] text-[#d4ff5c]">
      <span className="h-0.5 w-5 bg-[#d4ff5c]" />
      {children}
    </p>
  );
}

/* ── Pages ─────────────────────────────────────────────────────────────── */

function Home({ onTrial, onSchedule }: { onTrial: () => void; onSchedule: () => void }) {
  return (
    <div>
      <section className="relative isolate overflow-clip px-5 pb-36 pt-9 @xl:px-10 @xl:pb-44">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_15%_0%,rgba(212,255,92,0.16),transparent_70%)]" />
          <motion.div
            className="absolute inset-y-0 right-0 w-2/3 [mask-image:linear-gradient(to_left,black,transparent)]"
            style={{ backgroundImage: "repeating-linear-gradient(115deg, transparent 0 22px, rgba(212,255,92,0.07) 22px 24px)", backgroundSize: "200% 200%" }}
            animate={{ backgroundPosition: ["0% 0%", "100% 0%"] }}
            transition={{ duration: 14, ease: "linear", repeat: Infinity }}
          />
          <OutlineMarquee />
        </div>

        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ring-1 ring-white/10"
        >
          <span className="relative flex size-1.5">
            <span className="absolute inset-0 animate-ping rounded-full bg-red-500" />
            <span className="relative size-1.5 rounded-full bg-red-500" />
          </span>
          Ahora en sala · HIIT 30 · 14/16
        </motion.span>
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mt-5 text-[clamp(3rem,12cqw,6.5rem)] font-black uppercase italic leading-[0.84] tracking-[-0.045em]"
        >
          Muévete
          <br />
          <span className="text-[#d4ff5c] [text-shadow:0_0_40px_rgba(212,255,92,0.35)]">mejor.</span>
        </motion.h3>
        <p className="mt-5 max-w-[34ch] text-sm text-white/65">
          Entrenamiento en grupos de máximo 16 personas, con coaches titulados que corrigen cada repetición.
        </p>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <motion.button
            type="button"
            onClick={onTrial}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="rounded-full bg-[#d4ff5c] px-5 py-2.5 text-xs font-bold uppercase text-black shadow-[0_0_30px_-4px_rgba(212,255,92,0.6)]"
          >
            Prueba 7 días gratis
          </motion.button>
          <button type="button" onClick={onSchedule} className="rounded-full px-4 py-2.5 text-xs font-bold uppercase text-white/80 ring-1 ring-white/20 hover:ring-white/50">
            Ver horario
          </button>
        </div>
        <Pulse className="mt-8 h-10 w-full max-w-sm" />
      </section>

      <section className="relative -mt-24 px-5 pb-10 @xl:px-10">
        <div className="grid grid-cols-3 overflow-clip rounded-2xl bg-[#121410]/90 ring-1 ring-white/10 backdrop-blur-sm">
          {[
            ["16", "máx. por clase"],
            ["6–22 h", "abierto L–S"],
            ["0 €", "matrícula"],
          ].map(([v, l]) => (
            <div key={l} className="border-r border-white/10 p-4 last:border-r-0">
              <p className="text-2xl font-black italic tracking-tight @xl:text-3xl">{v}</p>
              <p className="text-[10px] uppercase tracking-wider text-white/50">{l}</p>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <Eyebrow>Disciplinas</Eyebrow>
          <div className="mt-4 grid grid-cols-2 gap-2 @xl:grid-cols-4">
            {DISCIPLINES.map((d, i) => (
              <motion.button
                key={d.n}
                type="button"
                onClick={onSchedule}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.06, duration: 0.5, ease: EASE }}
                className="group relative overflow-clip rounded-2xl bg-white/[0.04] p-4 text-left ring-1 ring-white/10 transition-colors hover:bg-[#d4ff5c] hover:text-black"
              >
                <span className="relative flex items-start justify-between">
                  <span className="text-lg font-black uppercase italic tracking-tight">{d.n}</span>
                  <span className="hidden group-hover:block">
                    <Intensity lvl={d.lvl} dark />
                  </span>
                  <span className="group-hover:hidden">
                    <Intensity lvl={d.lvl} />
                  </span>
                </span>
                <span className="relative mt-6 block text-[11px] text-white/55 group-hover:text-black/70">{d.d}</span>
              </motion.button>
            ))}
          </div>
        </div>

        <div className="mt-10">
          <Eyebrow>Tu primera semana</Eyebrow>
          <ol className="mt-4 grid gap-2 @xl:grid-cols-3">
            {[
              ["Valoración", "30 minutos con un coach: historial, objetivos y test de movilidad."],
              ["Plan", "Te recomendamos clases y nivel según tu punto de partida."],
              ["A entrenar", "Reservas desde el móvil y cancelas sin penalización hasta 2 h antes."],
            ].map(([t, d], i) => (
              <li key={t} className="flex gap-3 rounded-2xl bg-white/[0.03] p-4 ring-1 ring-white/[0.06]">
                <span className="grid size-7 shrink-0 place-items-center rounded-full bg-[#d4ff5c] text-xs font-black text-black">{i + 1}</span>
                <span>
                  <span className="block text-sm font-bold">{t}</span>
                  <span className="block text-[11px] leading-relaxed text-white/55">{d}</span>
                </span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <footer className="flex flex-wrap justify-between gap-2 border-t border-white/[0.06] px-5 py-5 text-[10px] text-white/40 @xl:px-10">
        <span>Forma Training Club · Pamplona</span>
        <span>Sin permanencia · Cancela cuando quieras</span>
      </footer>
    </div>
  );
}

function Schedule() {
  const [day, setDay] = useState(2);
  const [filter, setFilter] = useState<Discipline | "Todas">("Todas");
  const [booked, setBooked] = useState<string[]>([]);
  const list = CLASSES.filter((c) => filter === "Todas" || c.k === filter);

  return (
    <div className="relative px-5 py-8 @xl:px-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(212,255,92,0.10),transparent)]" />
      <div className="relative">
        <div className="flex items-center justify-between gap-3">
          <Eyebrow>Horario</Eyebrow>
          <AnimatePresence>
            {booked.length > 0 && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="rounded-full bg-[#d4ff5c] px-2.5 py-1 text-[10px] font-bold uppercase text-black"
              >
                {booked.length} {booked.length === 1 ? "reserva" : "reservas"} esta semana
              </motion.span>
            )}
          </AnimatePresence>
        </div>

        <div className="mt-4 flex gap-1.5">
          {DAYS.map((d, i) => (
            <button
              key={d.d}
              type="button"
              onClick={() => setDay(i)}
              aria-pressed={day === i}
              aria-label={`Día ${d.n}`}
              className={cn(
                "flex h-12 flex-1 flex-col items-center justify-center rounded-xl text-xs font-bold transition-colors",
                day === i ? "bg-[#d4ff5c] text-black" : "bg-white/5 text-white/60 hover:bg-white/10",
              )}
            >
              <span className="text-[9px] opacity-70">{d.d}</span>
              {d.n}
            </button>
          ))}
        </div>

        <div className="no-scrollbar mt-3 flex gap-1.5 overflow-x-auto">
          {(["Todas", ...DISCIPLINES.map((d) => d.n)] as const).map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={filter === f}
              className={cn(
                "shrink-0 rounded-full px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors",
                filter === f ? "bg-white text-black" : "text-white/55 ring-1 ring-white/15 hover:text-white",
              )}
            >
              {f}
            </button>
          ))}
        </div>

        <ul className="mt-5 space-y-2">
          <AnimatePresence initial={false} mode="popLayout">
            {list.map((c, i) => {
              const taken = Math.max(0, Math.min(c.cap, c.taken - ((i + day) % 4)));
              const key = `${day}-${c.t}-${c.n}`;
              const isBooked = booked.includes(key);
              const count = taken + (isBooked ? 1 : 0);
              const full = !isBooked && taken >= c.cap;
              return (
                <motion.li
                  layout
                  key={key}
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.3, delay: i * 0.03 }}
                  className={cn("flex items-center gap-3 rounded-2xl p-3 ring-1 transition-colors", isBooked ? "bg-[#d4ff5c]/[0.08] ring-[#d4ff5c]/40" : "bg-white/[0.04] ring-white/5")}
                >
                  <span className="w-11 font-mono text-xs text-white/55">{c.t}</span>
                  <span className="grid size-8 shrink-0 place-items-center rounded-full bg-white/10 text-[10px] font-bold">{c.coach}</span>
                  <div className="min-w-0 flex-1">
                    <p className="flex items-center gap-2 truncate text-sm font-bold">
                      {c.n}
                      <Intensity lvl={DISCIPLINES.find((d) => d.n === c.k)!.lvl} />
                    </p>
                    <div className="mt-1.5 flex items-center gap-2">
                      <div className="h-1 flex-1 overflow-clip rounded-full bg-white/10">
                        <motion.div
                          className={cn("h-full origin-left rounded-full", full ? "bg-red-400" : "bg-[#d4ff5c]")}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: count / c.cap }}
                          transition={{ duration: 0.6, ease: EASE }}
                        />
                      </div>
                      <span className="font-mono text-[10px] text-white/45">
                        {count}/{c.cap}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    disabled={full}
                    onClick={() => setBooked((b) => (isBooked ? b.filter((k) => k !== key) : [...b, key]))}
                    className={cn(
                      "w-[84px] shrink-0 rounded-full py-1.5 text-[10px] font-bold uppercase transition-colors",
                      isBooked && "bg-[#d4ff5c] text-black",
                      !isBooked && !full && "bg-white/10 hover:bg-white/20",
                      full && "cursor-not-allowed text-white/35",
                    )}
                  >
                    {isBooked ? "Dentro ✓" : full ? "Lista espera" : "Reservar"}
                  </button>
                </motion.li>
              );
            })}
          </AnimatePresence>
        </ul>
      </div>
    </div>
  );
}

function Coaches({ onSchedule }: { onSchedule: () => void }) {
  return (
    <div className="px-5 py-8 @xl:px-10">
      <Eyebrow>Coaches</Eyebrow>
      <p className="mt-3 max-w-[18ch] text-3xl font-black uppercase italic leading-[0.95] tracking-tight">
        Titulados. <span className="text-[#d4ff5c]">Y exigentes.</span>
      </p>
      <ul className="mt-6 grid grid-cols-2 gap-2 @xl:grid-cols-4">
        {COACHES.map((c, i) => (
          <motion.li
            key={c.n}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
            className="group overflow-clip rounded-2xl bg-white/[0.04] ring-1 ring-white/10"
          >
            <div className="relative grid aspect-square place-items-center overflow-clip bg-[#121410]">
              <div
                aria-hidden
                className="absolute inset-0 opacity-60 transition-transform duration-700 group-hover:scale-110"
                style={{ backgroundImage: "repeating-linear-gradient(115deg, transparent 0 10px, rgba(212,255,92,0.08) 10px 11px)" }}
              />
              <span className="relative text-5xl font-black italic tracking-tighter text-transparent transition-colors duration-500 group-hover:text-[#d4ff5c]" style={{ WebkitTextStroke: "1.5px #d4ff5c" }}>
                {c.i}
              </span>
            </div>
            <div className="p-3">
              <p className="text-sm font-bold">{c.n}</p>
              <p className="text-[11px] text-white/55">{c.s}</p>
              <p className="mt-2 inline-block rounded-full bg-[#d4ff5c]/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#d4ff5c]">{c.t}</p>
            </div>
          </motion.li>
        ))}
      </ul>
      <button type="button" onClick={onSchedule} className="mt-6 rounded-full bg-[#d4ff5c] px-5 py-2.5 text-xs font-bold uppercase text-black">
        Entrena con ellos
      </button>
    </div>
  );
}

/** A pseudo QR code: deterministic pattern with the three finder squares. */
function PassCode({ className }: { className?: string }) {
  const N = 21;
  const finder = (x: number, y: number) =>
    [
      [0, 0],
      [N - 7, 0],
      [0, N - 7],
    ].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  const cells: [number, number][] = [];
  for (let y = 0; y < N; y++)
    for (let x = 0; x < N; x++) if (!finder(x, y) && (x * 7 + y * 13 + x * y) % 5 < 2) cells.push([x, y]);
  return (
    <svg viewBox={`-1 -1 ${N + 2} ${N + 2}`} className={className} aria-hidden shapeRendering="crispEdges">
      <rect x="-1" y="-1" width={N + 2} height={N + 2} fill="#fff" />
      {[
        [0, 0],
        [N - 7, 0],
        [0, N - 7],
      ].map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="7" height="7" fill="#000" />
          <rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" />
          <rect x={x + 2} y={y + 2} width="3" height="3" fill="#000" />
        </g>
      ))}
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#000" />
      ))}
    </svg>
  );
}

function Plans() {
  const [annual, setAnnual] = useState(true);
  const [plan, setPlan] = useState("Unlimited");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState(false);
  const plans = [
    { n: "Flex", m: 59, a: 49, f: ["8 clases al mes", "App de reservas"] },
    { n: "Unlimited", m: 89, a: 74, f: ["Clases ilimitadas", "Valoración trimestral", "Plan nutricional"], hot: true },
    { n: "Personal", m: 190, a: 159, f: ["4 sesiones 1:1 al mes", "Todo lo de Unlimited"] },
  ];
  const valid = name.trim().length > 1 && /\S+@\S+\.\S+/.test(email);

  return (
    <div className="px-5 py-8 @xl:px-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Eyebrow>Planes</Eyebrow>
        <div className="flex rounded-full bg-white/5 p-1 text-[10px] font-bold uppercase">
          {[false, true].map((v) => (
            <button
              key={String(v)}
              type="button"
              onClick={() => setAnnual(v)}
              aria-pressed={annual === v}
              className={cn("rounded-full px-3.5 py-1.5 transition-colors", annual === v ? "bg-white text-black" : "text-white/55")}
            >
              {v ? "Anual −17 %" : "Mensual"}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 grid gap-2 @xl:grid-cols-3">
        {plans.map((p) => {
          const on = plan === p.n;
          return (
            <button
              key={p.n}
              type="button"
              onClick={() => setPlan(p.n)}
              aria-pressed={on}
              className={cn(
                "relative rounded-2xl p-5 text-left ring-1 transition-all hover:-translate-y-1",
                on ? "bg-[#d4ff5c] text-black ring-transparent shadow-[0_0_40px_-10px_rgba(212,255,92,0.6)]" : "bg-white/[0.04] ring-white/10",
              )}
            >
              {p.hot && (
                <span className={cn("absolute right-3 top-3 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase", on ? "bg-black text-[#d4ff5c]" : "bg-[#d4ff5c] text-black")}>
                  Más elegido
                </span>
              )}
              <p className="text-xs font-bold uppercase tracking-wider">{p.n}</p>
              <p className="mt-3 text-4xl font-black italic tracking-tight">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span key={annual ? "a" : "m"} initial={{ y: 10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -10, opacity: 0 }} className="inline-block">
                    {annual ? p.a : p.m} €
                  </motion.span>
                </AnimatePresence>
                <span className="text-xs font-normal not-italic opacity-60"> /mes</span>
              </p>
              <ul className="mt-4 space-y-1 text-xs opacity-80">
                {p.f.map((f) => (
                  <li key={f}>— {f}</li>
                ))}
              </ul>
            </button>
          );
        })}
      </div>
      <p className="mt-2 text-[10px] text-white/40">IVA incluido. Sin permanencia: puedes darte de baja cuando quieras.</p>

      <div className="relative mt-8 overflow-clip rounded-2xl bg-white/[0.04] p-5 ring-1 ring-white/10">
        <div aria-hidden className="absolute -right-10 -top-10 size-40 rounded-full bg-[radial-gradient(closest-side,rgba(212,255,92,0.2),transparent)]" />
        <AnimatePresence mode="wait" initial={false}>
          {pass ? (
            <motion.div key="pass" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, ease: EASE }} className="relative flex flex-wrap items-center gap-5">
              <PassCode className="size-24 rounded-md" />
              <div>
                <p className="flex items-center gap-2 text-[#d4ff5c]">
                  <CheckBurst className="size-6" />
                  <span className="text-lg font-black uppercase italic">Pase listo, {name.split(" ")[0]}</span>
                </p>
                <p className="mt-1 text-[12px] text-white/60">7 días gratis en el plan {plan}. Enséñalo en recepción; también te lo hemos enviado por email.</p>
              </div>
            </motion.div>
          ) : (
            <motion.div key="form" exit={{ opacity: 0 }} className="relative">
              <p className="text-lg font-black uppercase italic">Prueba 7 días gratis</p>
              <p className="text-[12px] text-white/55">Plan {plan}. Sin tarjeta, sin compromiso.</p>
              <div className="mt-4 grid gap-2 @lg:grid-cols-[1fr_1fr_auto]">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Tu nombre"
                  aria-label="Tu nombre"
                  className="rounded-xl bg-white/5 px-3.5 py-2.5 text-sm outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-[#d4ff5c]"
                />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu email"
                  aria-label="Tu email"
                  type="email"
                  className="rounded-xl bg-white/5 px-3.5 py-2.5 text-sm outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-[#d4ff5c]"
                />
                <button
                  type="button"
                  disabled={!valid}
                  onClick={() => setPass(true)}
                  className="rounded-xl bg-[#d4ff5c] px-5 py-2.5 text-xs font-bold uppercase text-black transition-opacity disabled:opacity-30"
                >
                  Quiero mi pase
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
