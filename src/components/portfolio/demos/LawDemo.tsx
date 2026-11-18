"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { CheckBurst, DemoNav, DemoPages } from "../shared";
import { EASE, cn } from "@/lib/utils";

/*
 * Vidal & Ros — concept site for a law firm.
 * Palette: night ink + brass on warm paper. Copy follows the Spanish bar's
 * advertising rules (no promised results, no success rates): a selling point for lawyers.
 */

const PAGES = ["Despacho", "Áreas", "Equipo", "Consulta"] as const;
type Page = (typeof PAGES)[number];

const C = {
  night: "#10141c",
  paper: "#f5f1e8",
  ink: "#1a1d24",
  brass: "#c3a36b", // on dark backgrounds
  brassInk: "#7a5c2a", // brass text on paper (AA contrast)
};

const AREAS = [
  {
    n: "Derecho mercantil",
    r: "I",
    d: "Acompañamos a empresas y socios en las decisiones que definen su futuro.",
    s: ["Constitución y pactos de socios", "Fusiones y adquisiciones", "Reestructuraciones", "Contratación mercantil"],
  },
  {
    n: "Litigación y arbitraje",
    r: "II",
    d: "Defensa rigurosa ante tribunales civiles, mercantiles y cortes arbitrales.",
    s: ["Conflictos societarios", "Reclamaciones de cantidad", "Arbitraje nacional e internacional", "Medidas cautelares"],
  },
  {
    n: "Derecho laboral",
    r: "III",
    d: "Asesoramiento estratégico a dirección y a profesionales.",
    s: ["Despidos y negociación", "Contratos de alta dirección", "ERE y ERTE", "Compliance laboral"],
  },
  {
    n: "Herencias y patrimonio",
    r: "IV",
    d: "Planificación sucesoria y protección del patrimonio familiar y empresarial.",
    s: ["Testamentos y particiones", "Empresa familiar", "Protocolos familiares", "Fiscalidad patrimonial"],
  },
];

const TEAM = [
  { i: "EV", n: "Elena Vidal Sanz", r: "Socia directora", a: "Mercantil · M&A", c: "ICAM 41.208" },
  { i: "JR", n: "Javier Ros Aldama", r: "Socio", a: "Litigación y arbitraje", c: "ICAM 52.774" },
  { i: "MO", n: "Marta Ochoa Requena", r: "Socia", a: "Laboral · Alta dirección", c: "ICAM 66.130" },
];

const POSTS = [
  { t: "Pactos de socios: cinco cláusulas que evitan un pleito", c: "Mercantil", d: "12 nov" },
  { t: "Herencias con empresa familiar: cómo planificar a tiempo", c: "Patrimonio", d: "28 oct" },
];

// Fine paper grain, generated once by the browser; no image request.
const GRAIN = `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
// Same grain, much fainter, for the paper pages.
const PAPER_GRAIN = GRAIN.replace("0 0 0 0.55 0", "0 0 0 0.09 0");

export function LawDemo() {
  const [page, setPage] = useState<Page>("Despacho");
  const [area, setArea] = useState<string | null>(null);

  const scroller = useRef<HTMLDivElement>(null);

  // Like a real site: every page change starts at the top.
  useEffect(() => {
    scroller.current?.scrollTo({ top: 0 });
  }, [page]);

  const consult = (a?: string) => {
    setArea(a ?? null);
    setPage("Consulta");
  };

  return (
    <div className="@container flex h-full flex-col text-[#1a1d24]" style={{ background: C.paper }}>
      <header
        className="relative z-10 flex items-center justify-between gap-3 border-b border-[#c3a36b]/20 px-4 py-3.5 @xl:px-8"
        style={{ background: C.night }}
      >
        <button type="button" onClick={() => setPage("Despacho")} className="flex items-center gap-2.5 text-left">
          <Monogram className="size-8 shrink-0" />
          <span className="hidden leading-none @md:block">
            <span className="block font-serif text-[17px] tracking-tight text-[#f5f1e8]">
              Vidal <span className="italic text-[#c3a36b]">&amp;</span> Ros
            </span>
            <span className="mt-1 block text-[8px] uppercase tracking-[0.42em] text-[#f5f1e8]/45">Abogados</span>
          </span>
        </button>
        <DemoNav
          pages={PAGES}
          page={page}
          onChange={(p) => (p === "Consulta" ? consult() : setPage(p))}
          layoutId="vr-nav"
          className="gap-3 text-[10px] uppercase tracking-[0.12em] @xl:gap-6 @xl:text-[11px] @xl:tracking-[0.2em]"
          activeClassName="text-[#c3a36b]"
          inactiveClassName="text-[#f5f1e8]/55 hover:text-[#f5f1e8]"
          indicatorClassName="bg-[#c3a36b]"
        />
      </header>
      <div
        ref={scroller}
        className="flex-1 overflow-y-auto no-scrollbar"
        style={{ backgroundImage: PAPER_GRAIN, backgroundAttachment: "local" }}
      >
        <DemoPages page={page}>
          {page === "Despacho" && <Home onConsult={consult} onTeam={() => setPage("Equipo")} />}
          {page === "Áreas" && <Areas onConsult={consult} />}
          {page === "Equipo" && <Team onConsult={() => consult()} />}
          {page === "Consulta" && <Consult key={area ?? "none"} initialArea={area} />}
        </DemoPages>
      </div>
    </div>
  );
}

/* ── Shared pieces ─────────────────────────────────────────────────────── */

function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect x="1" y="1" width="38" height="38" fill="none" stroke={C.brass} strokeWidth="1" />
      <rect x="4" y="4" width="32" height="32" fill="none" stroke={C.brass} strokeWidth="0.5" opacity="0.5" />
      <text x="20" y="25.5" textAnchor="middle" fontFamily="var(--font-instrument), Georgia, serif" fontSize="13" letterSpacing="0.6" fill={C.brass}>
        V<tspan fontStyle="italic" dx="0.6">&amp;</tspan><tspan dx="0.6">R</tspan>
      </text>
    </svg>
  );
}

/**
 * Paper section background. The grain itself lives on the scroll container (so it covers
 * short pages too); sections add faint ruled lines like a legal pad on top.
 */
function PaperBg({ ruled = false }: { ruled?: boolean }) {
  if (!ruled) return null;
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent_85%)]"
      style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent 0 31px, rgba(122,92,42,0.08) 31px 32px)" }}
    />
  );
}

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p
      className={cn(
        "flex items-center gap-3 text-[10px] uppercase tracking-[0.32em]",
        dark ? "text-[#c3a36b]" : "text-[#7a5c2a]",
      )}
    >
      <span className={cn("h-px w-8", dark ? "bg-[#c3a36b]/60" : "bg-[#7a5c2a]/50")} />
      {children}
    </p>
  );
}

/** Neoclassical facade drawn line by line: the firm's "building". */
function Facade({ className }: { className?: string }) {
  const cols = [62, 112, 162, 238, 288, 338];
  const draw = (delay: number) => ({
    initial: { pathLength: 0, opacity: 0 },
    animate: { pathLength: 1, opacity: 1 },
    transition: { pathLength: { duration: 1.6, delay, ease: EASE }, opacity: { duration: 0.3, delay } },
  });
  return (
    <svg viewBox="0 0 400 320" className={className} fill="none" stroke={C.brass} aria-hidden>
      {/* pediment */}
      <motion.path d="M24 104 L200 34 L376 104 Z" strokeWidth="1.2" {...draw(0)} />
      <motion.path d="M58 98 L200 46 L342 98" strokeWidth="0.6" opacity="0.6" {...draw(0.2)} />
      <motion.circle cx="200" cy="80" r="11" strokeWidth="0.8" {...draw(0.5)} />
      {/* entablature */}
      <motion.path d="M24 104 H376 V126 H24 Z M30 116 H370" strokeWidth="1" {...draw(0.3)} />
      {/* columns with capitals, bases and fluting */}
      {cols.map((x, i) => (
        <g key={x}>
          <motion.path d={`M${x - 14} 126 h28 v6 h-28 Z M${x - 10} 132 V262 M${x + 10} 132 V262 M${x - 14} 262 h28 v6 h-28 Z`} strokeWidth="1" {...draw(0.45 + i * 0.08)} />
          <motion.path d={`M${x - 4} 138 V256 M${x + 4} 138 V256`} strokeWidth="0.5" opacity="0.5" {...draw(0.7 + i * 0.08)} />
        </g>
      ))}
      {/* door */}
      <motion.path d="M184 268 V178 a16 16 0 0 1 32 0 V268" strokeWidth="0.9" {...draw(1)} />
      {/* steps */}
      <motion.path d="M16 268 H384 M8 280 H392 M0 292 H400" strokeWidth="1" {...draw(0.9)} />
    </svg>
  );
}

/** Slowly rotating seal with circular lettering. */
function Seal({ className }: { className?: string }) {
  return (
    <div className={cn("relative", className)} aria-hidden>
      <motion.svg
        viewBox="0 0 120 120"
        className="size-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 40, ease: "linear", repeat: Infinity }}
      >
        <defs>
          <path id="vr-seal" d="M60 60 m-46 0 a46 46 0 1 1 92 0 a46 46 0 1 1 -92 0" />
        </defs>
        <circle cx="60" cy="60" r="58" fill="none" stroke={C.brass} strokeWidth="0.6" opacity="0.6" />
        <circle cx="60" cy="60" r="36" fill="none" stroke={C.brass} strokeWidth="0.6" opacity="0.6" />
        <text fontSize="7.4" fill={C.brass} fontFamily="ui-monospace, monospace">
          {/* textLength = circumference (2π·46), so the lettering closes the circle exactly */}
          <textPath href="#vr-seal" textLength="287" lengthAdjust="spacing">VIDAL & ROS · ABOGADOS · MADRID · MCMLXXXIV ·</textPath>
        </text>
      </motion.svg>
      <span className="absolute inset-0 grid place-items-center font-serif text-2xl italic text-[#c3a36b]">§</span>
    </div>
  );
}

/* ── Pages ─────────────────────────────────────────────────────────────── */

function Home({ onConsult, onTeam }: { onConsult: (a?: string) => void; onTeam: () => void }) {
  return (
    <div>
      {/* Hero */}
      <section className="relative isolate overflow-hidden text-[#f5f1e8]" style={{ background: C.night }}>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          {/* light falling from the top-right, like a window in an old office */}
          <div className="absolute inset-0 bg-[radial-gradient(70%_60%_at_85%_0%,rgba(195,163,107,0.22),transparent_70%)]" />
          <div className="absolute inset-0 bg-[linear-gradient(115deg,transparent_45%,rgba(195,163,107,0.06)_55%,transparent_65%)]" />
          {/* column rhythm */}
          <div
            className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black,transparent)]"
            style={{ backgroundImage: "repeating-linear-gradient(90deg, rgba(195,163,107,0.07) 0 1px, transparent 1px 72px)" }}
          />
          <Facade className="absolute -right-10 bottom-0 h-[88%] w-auto opacity-30 [mask-image:linear-gradient(to_left,black_40%,transparent)] @xl:right-6 @xl:opacity-45" />
          <span className="absolute -bottom-16 -left-4 select-none font-serif text-[16rem] leading-none text-[#c3a36b]/[0.05]">§</span>
          <div className="absolute inset-0 opacity-[0.18] mix-blend-overlay" style={{ backgroundImage: GRAIN }} />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[#c3a36b]/60 to-transparent" />
        </div>

        <div className="px-5 pb-8 pt-10 @xl:px-10 @xl:pb-10 @xl:pt-14">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: EASE }}>
            <Eyebrow dark>Madrid · Desde 1984</Eyebrow>
          </motion.div>
          <motion.h3
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.1, ease: EASE }}
            className="mt-6 max-w-[15ch] font-serif text-[clamp(2.2rem,7cqw,4rem)] leading-[1.02] tracking-[-0.015em]"
          >
            Cuarenta años defendiendo lo que <span className="italic text-[#c3a36b]">más le importa</span>.
          </motion.h3>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
            className="mt-5 max-w-[42ch] text-[13px] leading-relaxed text-[#f5f1e8]/65"
          >
            Despacho independiente de abogados para empresas y familias. Cada asunto lo dirige un socio, de principio a fin.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
            className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3"
          >
            <button
              type="button"
              onClick={() => onConsult()}
              className="group relative overflow-hidden bg-[#c3a36b] px-5 py-3 text-[11px] uppercase tracking-[0.2em] text-[#10141c] transition-colors hover:bg-[#d4b57d]"
            >
              Solicitar primera consulta
            </button>
            <button type="button" onClick={onTeam} className="group flex items-center gap-2 text-[12px] text-[#f5f1e8]/80 hover:text-[#f5f1e8]">
              Conocer al equipo
              <span className="text-[#c3a36b] transition-transform group-hover:translate-x-1">→</span>
            </button>
          </motion.div>

          <div className="mt-10">
            <dl className="grid grid-cols-3 border-t border-[#c3a36b]/25 @xl:max-w-md">
              {[
                ["40", "años de ejercicio"],
                ["IV", "áreas de práctica"],
                ["48 h", "primera consulta"],
              ].map(([v, l]) => (
                <div key={l} className="border-r border-[#c3a36b]/20 py-4 pr-3 last:border-r-0 [&:not(:first-child)]:pl-3">
                  <dt className="sr-only">{l}</dt>
                  <dd className="font-serif text-2xl text-[#c3a36b] @xl:text-3xl">{v}</dd>
                  <dd className="mt-1 text-[9px] uppercase tracking-[0.16em] text-[#f5f1e8]/50">{l}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* Practice areas preview */}
      <section className="relative px-5 py-10 @xl:px-10">
        <PaperBg ruled />
        <div className="relative">
          <Eyebrow>Áreas de práctica</Eyebrow>
          <p className="mt-3 max-w-[24ch] font-serif text-2xl leading-tight @xl:text-3xl">
            Especialistas en lo que <span className="italic">no admite errores</span>.
          </p>
          <div className="mt-6 grid gap-px border border-[#7a5c2a]/20 bg-[#7a5c2a]/20 @lg:grid-cols-2">
            {AREAS.map((a) => (
              <button
                key={a.n}
                type="button"
                onClick={() => onConsult(a.n)}
                className="group relative flex flex-col items-start bg-[#f5f1e8] p-5 text-left transition-colors hover:bg-[#10141c]"
              >
                <span className="font-serif text-sm italic text-[#7a5c2a] transition-colors group-hover:text-[#c3a36b]">{a.r}.</span>
                <p className="mt-2 font-serif text-xl transition-colors group-hover:text-[#f5f1e8]">{a.n}</p>
                <p className="mt-1.5 text-[12px] leading-relaxed text-[#1a1d24]/60 transition-colors group-hover:text-[#f5f1e8]/60">{a.d}</p>
                <span className="mt-3 inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.2em] text-[#7a5c2a] opacity-0 transition-all group-hover:text-[#c3a36b] group-hover:opacity-100">
                  Consultar <span aria-hidden>→</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Principle */}
      <section className="relative overflow-hidden px-5 py-12 text-center text-[#f5f1e8] @xl:px-10" style={{ background: C.night }}>
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(50%_80%_at_50%_100%,rgba(195,163,107,0.16),transparent)]" />
        <div className="relative mx-auto max-w-lg">
          <Seal className="mx-auto size-20" />
          <p className="mt-5 font-serif text-[clamp(1.4rem,4.2cqw,2rem)] leading-snug">
            Le diremos lo que necesita oír, no lo que quiere oír. Y por escrito.
          </p>
          <p className="mt-4 text-[10px] uppercase tracking-[0.3em] text-[#c3a36b]">Nuestro compromiso</p>
        </div>
      </section>

      {/* Legal news (SEO) */}
      <section className="relative px-5 py-10 @xl:px-10">
        <PaperBg />
        <div className="relative">
          <div className="flex items-end justify-between gap-4">
            <Eyebrow>Actualidad jurídica</Eyebrow>
            <span className="text-[11px] text-[#7a5c2a]">Ver todo →</span>
          </div>
          <ul className="mt-5 grid gap-4 @lg:grid-cols-2">
            {POSTS.map((p) => (
              <li key={p.t} className="group border-t border-[#1a1d24]/80 pt-4">
                <p className="flex gap-3 text-[10px] uppercase tracking-[0.2em] text-[#1a1d24]/50">
                  <span className="text-[#7a5c2a]">{p.c}</span>
                  {p.d}
                </p>
                <p className="mt-2 font-serif text-lg leading-snug decoration-[#c3a36b] underline-offset-4 group-hover:underline">{p.t}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <footer className="px-5 py-6 text-[10px] text-[#f5f1e8]/50 @xl:px-10" style={{ background: C.night }}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span>Paseo de la Castellana 00 · Madrid · Miembros del ICAM</span>
          <span className="flex gap-4">
            <span>Aviso legal</span>
            <span>Privacidad</span>
          </span>
        </div>
      </footer>
    </div>
  );
}

function Areas({ onConsult }: { onConsult: (a?: string) => void }) {
  const [open, setOpen] = useState(0);
  return (
    <div className="relative min-h-full px-5 py-8 @xl:px-10 @xl:py-10">
      <PaperBg ruled />
      <div className="relative">
        <Eyebrow>Áreas de práctica</Eyebrow>
        <p className="mt-3 max-w-[22ch] font-serif text-3xl leading-tight">Cuatro áreas. Un solo criterio: el suyo.</p>
        <ul className="mt-6 border-t border-[#1a1d24]/80">
          {AREAS.map((a, i) => (
            <li key={a.n} className="border-b border-[#1a1d24]/15">
              <button
                type="button"
                onClick={() => setOpen(open === i ? -1 : i)}
                aria-expanded={open === i}
                className="group flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="flex items-baseline gap-4">
                  <span className="w-7 font-serif text-sm italic text-[#7a5c2a]">{a.r}.</span>
                  <span className={cn("font-serif text-2xl transition-all", open === i ? "italic" : "group-hover:translate-x-1")}>{a.n}</span>
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  className={cn(
                    "grid size-7 shrink-0 place-items-center rounded-full border text-base font-light transition-colors",
                    open === i ? "border-[#10141c] bg-[#10141c] text-[#c3a36b]" : "border-[#1a1d24]/25",
                  )}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="overflow-hidden"
                  >
                    <div className="pb-6 pl-11">
                      <p className="text-sm leading-relaxed text-[#1a1d24]/65">{a.d}</p>
                      <ul className="mt-4 grid gap-x-6 gap-y-2 @lg:grid-cols-2">
                        {a.s.map((s) => (
                          <li key={s} className="flex items-center gap-2.5 text-[13px]">
                            <span className="size-1 rotate-45 bg-[#7a5c2a]" />
                            {s}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => onConsult(a.n)}
                        className="mt-5 border-b border-[#7a5c2a] pb-0.5 text-[11px] uppercase tracking-[0.2em] text-[#7a5c2a] hover:text-[#1a1d24]"
                      >
                        Consultar sobre {a.n.toLowerCase()} →
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function Team({ onConsult }: { onConsult: () => void }) {
  return (
    <div className="relative min-h-full px-5 py-8 @xl:px-10 @xl:py-10">
      <PaperBg />
      <div className="relative">
        <Eyebrow>Socios</Eyebrow>
        <p className="mt-3 max-w-[24ch] font-serif text-3xl leading-tight">
          Hablará siempre con <span className="italic">quien lleva su asunto</span>.
        </p>
        <ul className="mt-7 grid gap-4 @lg:grid-cols-3">
          {TEAM.map((p, i) => (
            <motion.li
              key={p.n}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: EASE }}
              className="group border border-[#1a1d24]/15 bg-[#fbf9f4] transition-colors hover:border-[#7a5c2a]/60"
            >
              {/* Portrait placeholder: monogram on night, like an engraved plaque */}
              <div className="relative grid aspect-[4/3] place-items-center overflow-hidden" style={{ background: C.night }}>
                <div aria-hidden className="absolute inset-0 bg-[radial-gradient(60%_70%_at_50%_30%,rgba(195,163,107,0.25),transparent)]" />
                <div aria-hidden className="absolute inset-3 border border-[#c3a36b]/25" />
                <span className="relative font-serif text-5xl italic text-[#c3a36b] transition-transform duration-700 group-hover:scale-110">{p.i}</span>
              </div>
              <div className="p-4">
                <p className="font-serif text-xl leading-tight">{p.n}</p>
                <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-[#7a5c2a]">{p.r}</p>
                <p className="mt-3 text-[12px] text-[#1a1d24]/65">{p.a}</p>
                <p className="mt-1 font-mono text-[10px] text-[#1a1d24]/45">Colegiado {p.c}</p>
              </div>
            </motion.li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-[#1a1d24]/15 pt-5">
          <p className="text-[13px] text-[#1a1d24]/65">Y un equipo de veinte abogados, economistas y asistentes jurídicos.</p>
          <button type="button" onClick={onConsult} className="bg-[#10141c] px-4 py-2.5 text-[10px] uppercase tracking-[0.2em] text-[#c3a36b]">
            Hablar con un socio
          </button>
        </div>
      </div>
    </div>
  );
}

const CHANNELS = ["Llamada", "Videollamada", "En el despacho"] as const;

function Consult({ initialArea }: { initialArea: string | null }) {
  const [step, setStep] = useState(initialArea ? 1 : 0);
  const [area, setArea] = useState<string | null>(initialArea);
  const [channel, setChannel] = useState<(typeof CHANNELS)[number]>("Llamada");
  const [urgent, setUrgent] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const [sent, setSent] = useState(false);

  const canNext = [Boolean(area), true, name.trim().length > 1 && phone.trim().length > 5 && privacy][step];

  if (sent) {
    return (
      <div className="relative flex min-h-full flex-col items-center px-5 py-14 text-center">
        <PaperBg />
        <div className="relative flex flex-col items-center">
          <CheckBurst className="text-[#7a5c2a]" />
          <p className="mt-5 font-serif text-3xl">Consulta registrada</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#1a1d24]/65">
            Un socio de {area?.toLowerCase()} le contactará {urgent ? "en menos de 2 horas" : "en 48 horas como máximo"} por{" "}
            {channel.toLowerCase()}.
          </p>
          <p className="mt-5 border border-[#7a5c2a]/30 px-3 py-1.5 font-mono text-[11px] text-[#7a5c2a]">Ref. VR-2611-0418</p>
          <p className="mt-6 flex items-center gap-2 text-[11px] text-[#1a1d24]/50">
            <LockIcon /> Protegido por el secreto profesional
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-full px-5 py-8 @xl:px-10">
      <PaperBg />
      <div className="relative">
        <div className="flex items-center justify-between gap-4">
          <Eyebrow>Primera consulta</Eyebrow>
          <span className="font-mono text-[10px] text-[#1a1d24]/50">Paso {step + 1} de 3</span>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-1.5" aria-hidden>
          {[0, 1, 2].map((s) => (
            <span key={s} className="h-0.5 overflow-hidden bg-[#1a1d24]/10">
              <motion.span
                className="block h-full bg-[#7a5c2a]"
                initial={false}
                animate={{ scaleX: s <= step ? 1 : 0 }}
                style={{ originX: 0 }}
                transition={{ duration: 0.5, ease: EASE }}
              />
            </span>
          ))}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="mt-6"
          >
            {step === 0 && (
              <>
                <p className="font-serif text-3xl">¿En qué podemos ayudarle?</p>
                <div className="mt-5 grid gap-2 @lg:grid-cols-2">
                  {AREAS.map((a) => (
                    <button
                      key={a.n}
                      type="button"
                      onClick={() => setArea(a.n)}
                      aria-pressed={area === a.n}
                      className={cn(
                        "flex items-center gap-3 border px-4 py-3 text-left text-sm transition-colors",
                        area === a.n ? "border-[#10141c] bg-[#10141c] text-[#f5f1e8]" : "border-[#1a1d24]/20 bg-[#fbf9f4] hover:border-[#1a1d24]/50",
                      )}
                    >
                      <span className={cn("font-serif italic", area === a.n ? "text-[#c3a36b]" : "text-[#7a5c2a]")}>{a.r}.</span>
                      {a.n}
                    </button>
                  ))}
                </div>
              </>
            )}

            {step === 1 && (
              <>
                <p className="font-serif text-3xl">¿Cómo prefiere hablar?</p>
                <p className="mt-1 text-sm text-[#1a1d24]/60">{area}</p>
                <div className="mt-5 flex flex-wrap gap-2">
                  {CHANNELS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setChannel(c)}
                      aria-pressed={channel === c}
                      className={cn(
                        "border px-4 py-2.5 text-[13px] transition-colors",
                        channel === c ? "border-[#10141c] bg-[#10141c] text-[#f5f1e8]" : "border-[#1a1d24]/20 bg-[#fbf9f4] hover:border-[#1a1d24]/50",
                      )}
                    >
                      {c}
                    </button>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-3 text-sm">
                  <button
                    type="button"
                    role="switch"
                    aria-checked={urgent}
                    aria-label="Es urgente"
                    onClick={() => setUrgent((u) => !u)}
                    className={cn("relative h-6 w-11 rounded-full transition-colors", urgent ? "bg-[#7a5c2a]" : "bg-[#1a1d24]/20")}
                  >
                    <motion.span
                      layout
                      className={cn("absolute top-1 size-4 rounded-full bg-white", urgent ? "right-1" : "left-1")}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  </button>
                  Es urgente <span className="text-[12px] text-[#1a1d24]/50">(respuesta en menos de 2 h)</span>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <p className="font-serif text-3xl">Sus datos de contacto</p>
                <div className="mt-5 grid gap-4 @lg:grid-cols-2">
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#1a1d24]/55">Nombre</span>
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Ana García"
                      className="mt-1 w-full border-b border-[#1a1d24]/30 bg-transparent py-2 font-serif text-lg outline-none placeholder:text-[#1a1d24]/30 focus:border-[#7a5c2a]"
                    />
                  </label>
                  <label className="block">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-[#1a1d24]/55">Teléfono</span>
                    <input
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      inputMode="tel"
                      placeholder="600 000 000"
                      className="mt-1 w-full border-b border-[#1a1d24]/30 bg-transparent py-2 font-serif text-lg outline-none placeholder:text-[#1a1d24]/30 focus:border-[#7a5c2a]"
                    />
                  </label>
                </div>
                <label className="mt-5 flex cursor-pointer items-start gap-2.5 text-[12px] leading-relaxed text-[#1a1d24]/65">
                  <input
                    type="checkbox"
                    checked={privacy}
                    onChange={(e) => setPrivacy(e.target.checked)}
                    className="mt-0.5 size-4 accent-[#7a5c2a]"
                  />
                  Acepto la política de privacidad. Su consulta es confidencial y está protegida por el secreto profesional.
                </label>
              </>
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-8 flex items-center gap-3">
          {step > 0 && (
            <button type="button" onClick={() => setStep(step - 1)} className="px-2 py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#1a1d24]/60 hover:text-[#1a1d24]">
              ← Atrás
            </button>
          )}
          <button
            type="button"
            disabled={!canNext}
            onClick={() => (step < 2 ? setStep(step + 1) : setSent(true))}
            className="flex-1 bg-[#10141c] py-3.5 text-[11px] uppercase tracking-[0.2em] text-[#c3a36b] transition-opacity disabled:opacity-30"
          >
            {step < 2 ? "Continuar" : "Solicitar consulta"}
          </button>
        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg viewBox="0 0 12 12" className="size-3" fill="currentColor" aria-hidden>
      <path d="M3 5V3.5a3 3 0 0 1 6 0V5h.5A1.5 1.5 0 0 1 11 6.5v4A1.5 1.5 0 0 1 9.5 12h-7A1.5 1.5 0 0 1 1 10.5v-4A1.5 1.5 0 0 1 2.5 5H3Zm1.5 0h3V3.5a1.5 1.5 0 0 0-3 0V5Z" />
    </svg>
  );
}
