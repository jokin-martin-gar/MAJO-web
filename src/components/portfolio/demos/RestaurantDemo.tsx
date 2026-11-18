"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckBurst, DemoNav, DemoPages, grain } from "../shared";
import { EASE, cn } from "@/lib/utils";

/*
 * Kōji — concept site for a Japanese-Basque izakaya.
 * Palette: sumi charcoal, rice paper and vermilion. The menu shows the 14 EU allergens
 * (Regulation 1169/2011), something every restaurant must inform about.
 */

const PAGES = ["Inicio", "Carta", "Omakase", "Reservar"] as const;
type Page = (typeof PAGES)[number];

const C = { sumi: "#141110", rice: "#f3ece0", ver: "#c8321e", verInk: "#a3261a" };

const ALLERGENS = {
  G: "Gluten",
  Cr: "Crustáceos",
  P: "Pescado",
  S: "Soja",
  Se: "Sésamo",
  L: "Lácteos",
  H: "Huevo",
  Mo: "Moluscos",
} as const;
type Allergen = keyof typeof ALLERGENS;

type Dish = { n: string; d: string; p: number; a: Allergen[]; tag?: string };
const MENU: Record<"Para compartir" | "Brasa" | "Postres", Dish[]> = {
  "Para compartir": [
    { n: "Gyozas de rabo de toro", d: "Caldo dashi, cebollino", p: 14, a: ["G", "S"] },
    { n: "Tataki de bonito", d: "Ponzu de cítricos, sésamo tostado", p: 18, a: ["P", "S", "Se"], tag: "Temporada" },
    { n: "Pan bao de panceta", d: "Pepino encurtido, kimchi de la casa", p: 12, a: ["G", "S", "Se"] },
    { n: "Tartar de quisquilla", d: "Yema curada, alga nori", p: 22, a: ["Cr", "H"] },
  ],
  Brasa: [
    { n: "Chuletón madurado 45 días", d: "Sal de Añana, pimientos de Gernika", p: 64, a: [], tag: "Para dos" },
    { n: "Rodaballo salvaje", d: "Beurre blanc de miso", p: 38, a: ["P", "L", "S"] },
    { n: "Pichón en dos cocciones", d: "Jugo de sus huesos, tare", p: 32, a: ["S", "G"] },
    { n: "Pulpo al binchotan", d: "Patata ahumada, pimentón de la Vera", p: 26, a: ["Mo"] },
  ],
  Postres: [
    { n: "Cheesecake de yuzu", d: "Galleta de sésamo negro", p: 9, a: ["L", "H", "G", "Se"] },
    { n: "Torrija de brioche", d: "Helado de té matcha", p: 9, a: ["L", "H", "G"] },
    { n: "Sorbete de ume", d: "Ciruela japonesa, shiso", p: 7, a: [] },
  ],
};
type Category = keyof typeof MENU;

const OMAKASE = [
  { n: "Sakizuke", d: "Ostra, ponzu y caviar cítrico" },
  { n: "Owan", d: "Dashi de kombu y bonito, almeja" },
  { n: "Tsukuri", d: "Tres cortes del Cantábrico" },
  { n: "Yakimono", d: "Kokotxa de merluza al binchotan" },
  { n: "Agemono", d: "Tempura de verduras de Tudela" },
  { n: "Niku", d: "Wagyu gallego, salsa de su jugo" },
  { n: "Gohan", d: "Arroz de setas en donabe" },
  { n: "Mizumono", d: "Fruta de temporada y sorbete" },
];

// Ember particles: fixed positions so server and client render the same thing.
const EMBERS = [
  { x: 8, s: 3, d: 5.5, t: 0 }, { x: 17, s: 2, d: 7, t: 1.2 }, { x: 26, s: 4, d: 6, t: 2.6 },
  { x: 38, s: 2, d: 8, t: 0.6 }, { x: 47, s: 3, d: 6.5, t: 3.1 }, { x: 58, s: 2, d: 7.5, t: 1.8 },
  { x: 66, s: 3, d: 5.8, t: 4 }, { x: 74, s: 2, d: 6.8, t: 0.3 }, { x: 83, s: 4, d: 7.2, t: 2.2 },
  { x: 91, s: 2, d: 6.2, t: 3.6 },
];

// Seigaiha (Japanese wave) pattern, as a tiny SVG tile.
const seigaiha = (stroke: string, bg: string) => {
  const wave = (cx: number, cy: number) =>
    `<circle cx='${cx}' cy='${cy}' r='19' fill='${bg}'/>` +
    [19, 14, 9, 4].map((r) => `<circle cx='${cx}' cy='${cy}' r='${r}' fill='none' stroke='${stroke}' stroke-width='1'/>`).join("");
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='40' height='20'>${wave(0, 10)}${wave(40, 10)}${wave(20, 20)}</svg>`;
  return `url("data:image/svg+xml;utf8,${svg.replace(/#/g, "%23")}")`;
};
const WAVES_DARK = seigaiha("rgba(200,50,30,0.16)", C.sumi);
const WAVES_PAPER = seigaiha("rgba(163,38,26,0.09)", C.rice);

export function RestaurantDemo() {
  const [page, setPage] = useState<Page>("Inicio");
  return (
    <div className="@container flex h-full flex-col text-[#141110]" style={{ background: C.rice }}>
      <header className="relative z-10 flex items-center justify-between gap-3 border-b border-white/10 px-4 py-3.5 @xl:px-8" style={{ background: C.sumi }}>
        <button type="button" onClick={() => setPage("Inicio")} className="flex items-center gap-2.5">
          <Hanko className="size-7" />
          <span className="font-serif text-2xl italic leading-none text-[#f3ece0]">Kōji</span>
        </button>
        <DemoNav
          pages={PAGES}
          page={page}
          onChange={setPage}
          layoutId="koji-nav"
          className="gap-3 text-[11px] tracking-wide @xl:gap-6 @xl:text-[12px]"
          activeClassName="text-[#f3ece0]"
          inactiveClassName="text-[#f3ece0]/50 hover:text-[#f3ece0]"
          indicatorClassName="bg-[#c8321e]"
        />
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ backgroundImage: grain(0.08), backgroundAttachment: "local" }}>
        <DemoPages page={page}>
          {page === "Inicio" && <Home onBook={() => setPage("Reservar")} onMenu={() => setPage("Carta")} onOmakase={() => setPage("Omakase")} />}
          {page === "Carta" && <Menu />}
          {page === "Omakase" && <Omakase onBook={() => setPage("Reservar")} />}
          {page === "Reservar" && <Booking />}
        </DemoPages>
      </div>
    </div>
  );
}

/* ── Pieces ────────────────────────────────────────────────────────────── */

function Hanko({ className }: { className?: string }) {
  return (
    <span
      className={cn("grid shrink-0 -rotate-6 place-items-center rounded-[3px] bg-[#c8321e] font-serif text-[15px] leading-none text-[#f3ece0]", className)}
      aria-hidden
    >
      麹
    </span>
  );
}

/** Noren: the split fabric curtain that hangs at an izakaya's door. */
function Noren() {
  return (
    <div aria-hidden className="absolute inset-x-0 top-0 flex h-14 gap-[3px] px-3 @xl:h-16">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="relative flex-1 origin-top rounded-b-sm bg-[linear-gradient(to_bottom,#6e180f,#9c271a_70%,#8a2216)] shadow-[inset_0_-6px_12px_rgba(0,0,0,0.3),0_10px_24px_-10px_rgba(0,0,0,0.6)]"
          animate={{ rotate: [-0.8, 0.8, -0.8], skewX: [-1, 1, -1] }}
          transition={{ duration: 5 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
        >
          {i === 2 && (
            <span className="absolute inset-x-0 top-1/2 mx-auto grid size-8 -translate-y-1/2 place-items-center rounded-full border border-[#f3ece0]/70 font-serif text-sm text-[#f3ece0]">
              麹
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

/** Donburi bowl with steam, drawn in SVG. */
function Bowl({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden>
      <defs>
        <radialGradient id="koji-bowl" cx="0.35" cy="0.2" r="0.9">
          <stop offset="0" stopColor="#3a2d29" />
          <stop offset="1" stopColor="#0d0a09" />
        </radialGradient>
        <radialGradient id="koji-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ff7a3d" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ff7a3d" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="110" cy="150" rx="105" ry="45" fill="url(#koji-glow)" />
      {[70, 108, 146].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 92 C${x - 12} 76 ${x + 12} 62 ${x} 46 C${x - 10} 34 ${x + 6} 24 ${x} 14`}
          fill="none"
          stroke="#f3ece0"
          strokeWidth="2.2"
          strokeLinecap="round"
          animate={{ opacity: [0, 0.45, 0], y: [8, -6, -14] }}
          transition={{ duration: 3.6, repeat: Infinity, delay: i * 1.1, ease: "easeInOut" }}
        />
      ))}
      {/* chopsticks */}
      <path d="M36 88 L196 58" stroke="#c9a36a" strokeWidth="4" strokeLinecap="round" />
      <path d="M44 96 L200 72" stroke="#b08c55" strokeWidth="4" strokeLinecap="round" />
      {/* bowl */}
      <path d="M28 104 H192 C188 150 156 178 110 178 C64 178 32 150 28 104 Z" fill="url(#koji-bowl)" />
      <path d="M58 140 C80 150 140 150 162 140" stroke="#c8321e" strokeWidth="2" fill="none" opacity="0.9" />
      <rect x="86" y="176" width="48" height="10" rx="3" fill="#0d0a09" />
      <ellipse cx="110" cy="104" rx="82" ry="11" fill="#c8321e" />
      <ellipse cx="110" cy="102" rx="74" ry="8" fill="#f3ece0" />
      {/* toppings */}
      <ellipse cx="88" cy="99" rx="14" ry="4" fill="#e9a07a" />
      <ellipse cx="124" cy="100" rx="12" ry="4" fill="#d9734f" />
      <circle cx="142" cy="98" r="5" fill="#f7c948" />
      <circle cx="104" cy="97" r="2" fill="#3f7d3a" />
      <circle cx="112" cy="99" r="2" fill="#3f7d3a" />
    </svg>
  );
}

function Eyebrow({ children, dark }: { children: React.ReactNode; dark?: boolean }) {
  return (
    <p className={cn("flex items-center gap-2.5 text-[10px] uppercase tracking-[0.3em]", dark ? "text-[#ff8a6a]" : "text-[#a3261a]")}>
      <span className={cn("size-1.5 rotate-45", dark ? "bg-[#c8321e]" : "bg-[#a3261a]")} />
      {children}
    </p>
  );
}

/* ── Pages ─────────────────────────────────────────────────────────────── */

function Home({ onBook, onMenu, onOmakase }: { onBook: () => void; onMenu: () => void; onOmakase: () => void }) {
  return (
    <div>
      <section className="relative isolate overflow-clip text-[#f3ece0]" style={{ background: C.sumi }}>
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 opacity-70 [mask-image:linear-gradient(to_top,black,transparent_75%)]" style={{ backgroundImage: WAVES_DARK }} />
          <div className="absolute inset-x-0 bottom-0 h-2/3 bg-[radial-gradient(60%_70%_at_70%_100%,rgba(255,110,50,0.28),transparent_70%)]" />
          <span className="absolute -right-4 top-16 select-none font-serif text-[11rem] leading-none text-[#f3ece0]/[0.035] @xl:text-[15rem]">炭</span>
          {EMBERS.map((e, i) => (
            <motion.span
              key={i}
              className="absolute bottom-0 rounded-full bg-[#ffb070] shadow-[0_0_8px_2px_rgba(255,120,50,0.7)]"
              style={{ left: `${e.x}%`, width: e.s, height: e.s }}
              animate={{ y: [0, -340], x: [0, i % 2 ? 14 : -14, 0], opacity: [0, 1, 0] }}
              transition={{ duration: e.d, repeat: Infinity, delay: e.t, ease: "easeOut" }}
            />
          ))}
          <div className="absolute inset-0 opacity-[0.22] mix-blend-overlay" style={{ backgroundImage: grain(0.6) }} />
        </div>
        <Noren />

        <div className="grid items-center gap-4 px-5 pb-10 pt-24 @xl:grid-cols-[1.25fr_1fr] @xl:px-10 @xl:pt-28">
          <div>
            <Eyebrow dark>Izakaya · Bilbao</Eyebrow>
            <motion.h3
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, ease: EASE }}
              className="mt-5 font-serif text-[clamp(2.3rem,7.2cqw,4rem)] leading-[0.98] tracking-[-0.02em]"
            >
              Brasa japonesa, <span className="italic text-[#ff6a4a]">producto</span> del Cantábrico.
            </motion.h3>
            <p className="mt-4 max-w-[40ch] text-[13px] leading-relaxed text-[#f3ece0]/65">
              Doce mesas, una barra y un fuego de binchotan que no se apaga. Cocina de mercado con técnica japonesa.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-3">
              <button
                type="button"
                onClick={onBook}
                className="rounded-full bg-[#c8321e] px-5 py-2.5 text-xs font-medium text-white shadow-[0_10px_30px_-8px_rgba(200,50,30,0.8)] transition-transform hover:scale-105"
              >
                Reservar mesa
              </button>
              <button type="button" onClick={onMenu} className="group text-xs text-[#f3ece0]/80 hover:text-[#f3ece0]">
                Ver la carta <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: EASE }}
            className="mx-auto w-full max-w-[260px]"
          >
            <Bowl className="w-full" />
          </motion.div>
        </div>

        <dl className="grid grid-cols-3 border-t border-white/10 text-[10px] @xl:text-[11px]">
          {[
            ["Horario", "Mar–Sáb · 13:30 y 20:00"],
            ["Sala", "12 mesas y barra"],
            ["Dónde", "C/ Ribera 00, Bilbao"],
          ].map(([k, v]) => (
            <div key={k} className="border-r border-white/10 px-4 py-3 last:border-r-0 @xl:px-6">
              <dt className="uppercase tracking-[0.2em] text-[#ff8a6a]">{k}</dt>
              <dd className="mt-1 text-[#f3ece0]/75">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="relative px-5 py-10 @xl:px-10">
        <div aria-hidden className="absolute inset-0 [mask-image:linear-gradient(to_bottom,transparent,black_30%,transparent)]" style={{ backgroundImage: WAVES_PAPER }} />
        <div className="relative">
          <Eyebrow>La casa</Eyebrow>
          <p className="mt-3 max-w-[22ch] font-serif text-3xl leading-tight">Tres cosas que no negociamos.</p>
          <div className="mt-6 grid gap-3 @xl:grid-cols-3">
            {[
              { k: "炭", t: "Binchotan", d: "Carbón japonés de encina: 1.000 °C sin humo ni llama." },
              { k: "海", t: "Cantábrico", d: "Pescado de lonja de Ondarroa y Santurtzi, cada mañana." },
              { k: "酒", t: "Sake y vino natural", d: "Treinta referencias elegidas para acompañar la brasa." },
            ].map((c, i) => (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6, ease: EASE }}
                className="group relative overflow-clip rounded-2xl border border-[#141110]/10 bg-[#faf6ee] p-5"
              >
                <span className="absolute -right-2 -top-3 font-serif text-7xl text-[#a3261a]/10 transition-transform duration-700 group-hover:scale-110">{c.k}</span>
                <p className="relative font-serif text-xl">{c.t}</p>
                <p className="relative mt-1.5 text-[12px] leading-relaxed text-[#141110]/60">{c.d}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative mx-5 mb-10 overflow-clip rounded-2xl px-6 py-7 text-[#f3ece0] @xl:mx-10" style={{ background: C.sumi }}>
        <div aria-hidden className="absolute inset-0 opacity-60" style={{ backgroundImage: WAVES_DARK }} />
        <div aria-hidden className="absolute inset-0 bg-[radial-gradient(80%_120%_at_100%_50%,rgba(200,50,30,0.35),transparent_60%)]" />
        <div className="relative flex flex-wrap items-center justify-between gap-4">
          <div>
            <Eyebrow dark>Solo en barra</Eyebrow>
            <p className="mt-2 font-serif text-2xl">Omakase de ocho pases</p>
            <p className="mt-1 text-[12px] text-[#f3ece0]/60">Jueves a sábado · 8 plazas por turno</p>
          </div>
          <button type="button" onClick={onOmakase} className="rounded-full border border-[#f3ece0]/30 px-4 py-2 text-xs hover:bg-[#f3ece0] hover:text-[#141110]">
            Descubrir el menú
          </button>
        </div>
      </section>

      <footer className="flex flex-wrap justify-between gap-2 px-5 py-5 text-[10px] text-[#f3ece0]/50 @xl:px-10" style={{ background: C.sumi }}>
        <span>Kōji Izakaya · Bilbao</span>
        <span>Información de alérgenos disponible en la carta</span>
      </footer>
    </div>
  );
}

function AllergenChip({ a, active }: { a: Allergen; active?: boolean }) {
  return (
    <abbr
      title={ALLERGENS[a]}
      className={cn(
        "grid h-5 min-w-5 place-items-center rounded-full border px-1 font-mono text-[9px] no-underline",
        active ? "border-[#a3261a] bg-[#a3261a] text-white" : "border-[#141110]/20 text-[#141110]/60",
      )}
    >
      {a}
    </abbr>
  );
}

function Menu() {
  const [cat, setCat] = useState<Category>("Para compartir");
  const [avoid, setAvoid] = useState<Allergen[]>([]);
  const toggle = (a: Allergen) => setAvoid((v) => (v.includes(a) ? v.filter((x) => x !== a) : [...v, a]));

  return (
    <div className="relative px-5 py-8 @xl:px-10">
      <div aria-hidden className="absolute inset-x-0 top-0 h-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" style={{ backgroundImage: WAVES_PAPER }} />
      <div className="relative">
        <Eyebrow>La carta</Eyebrow>
        <div className="mt-4 flex flex-wrap gap-2" role="tablist" aria-label="Categorías de la carta">
          {(Object.keys(MENU) as Category[]).map((c) => (
            <button
              key={c}
              type="button"
              role="tab"
              aria-selected={cat === c}
              onClick={() => setCat(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
                cat === c ? "border-[#141110] bg-[#141110] text-[#f3ece0]" : "border-[#141110]/15 text-[#141110]/65 hover:border-[#141110]/40",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-[#141110]/10 bg-[#faf6ee] p-3">
          <p className="text-[11px] text-[#141110]/65">Evitar alérgenos:</p>
          <div className="mt-2 flex flex-wrap gap-1.5">
            {(Object.keys(ALLERGENS) as Allergen[]).map((a) => (
              <button
                key={a}
                type="button"
                aria-pressed={avoid.includes(a)}
                onClick={() => toggle(a)}
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] transition-colors",
                  avoid.includes(a) ? "border-[#a3261a] bg-[#a3261a] text-white" : "border-[#141110]/15 hover:border-[#141110]/40",
                )}
              >
                {ALLERGENS[a]}
              </button>
            ))}
          </div>
        </div>

        <ul className="mt-4 divide-y divide-[#141110]/10">
          {MENU[cat].map((dish, i) => {
            const blocked = dish.a.some((a) => avoid.includes(a));
            return (
              <motion.li
                key={dish.n}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: blocked ? 0.35 : 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="group flex items-start justify-between gap-4 py-4"
              >
                <div className="min-w-0">
                  <p className={cn("flex flex-wrap items-center gap-2 font-serif text-xl", blocked && "line-through decoration-[#a3261a]/60")}>
                    {dish.n}
                    {dish.tag && <span className="rounded-full bg-[#a3261a]/10 px-2 py-0.5 font-sans text-[10px] text-[#a3261a]">{dish.tag}</span>}
                  </p>
                  <p className="text-xs text-[#141110]/55">{dish.d}</p>
                  <div className="mt-2 flex flex-wrap gap-1">
                    {dish.a.length ? dish.a.map((a) => <AllergenChip key={a} a={a} active={avoid.includes(a)} />) : (
                      <span className="text-[10px] text-[#3f7d3a]">Sin alérgenos principales</span>
                    )}
                  </div>
                </div>
                <span className="shrink-0 font-mono text-sm text-[#141110]/70 transition-colors group-hover:text-[#a3261a]">{dish.p} €</span>
              </motion.li>
            );
          })}
        </ul>
        <p className="mt-4 text-[10px] leading-relaxed text-[#141110]/50">
          Información sobre alérgenos conforme al Reglamento (UE) 1169/2011. Consulta al equipo ante cualquier duda. Precios con IVA.
        </p>
      </div>
    </div>
  );
}

function Omakase({ onBook }: { onBook: () => void }) {
  const [pairing, setPairing] = useState(false);
  const total = 75 + (pairing ? 35 : 0);
  return (
    <div>
      <section className="relative overflow-clip px-5 py-9 text-[#f3ece0] @xl:px-10" style={{ background: C.sumi }}>
        <div aria-hidden className="absolute inset-0 opacity-60 [mask-image:linear-gradient(to_top,black,transparent)]" style={{ backgroundImage: WAVES_DARK }} />
        <span aria-hidden className="absolute -right-2 -top-6 font-serif text-[9rem] leading-none text-[#c8321e]/15">任</span>
        <div className="relative">
          <Eyebrow dark>Omakase · solo en barra</Eyebrow>
          <p className="mt-4 max-w-[18ch] font-serif text-[clamp(2rem,6cqw,3rem)] leading-none">Déjalo en manos del cocinero.</p>
          <p className="mt-3 max-w-[44ch] text-[12px] leading-relaxed text-[#f3ece0]/60">
            Ocho pases que cambian con la lonja. Jueves a sábado, dos turnos de ocho plazas.
          </p>
        </div>
      </section>
      <div className="px-5 py-8 @xl:px-10">
        <ol className="relative ml-2 border-l border-[#a3261a]/30">
          {OMAKASE.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05, duration: 0.5, ease: EASE }}
              className="relative pb-4 pl-6 last:pb-0"
            >
              <span className="absolute -left-[5px] top-1.5 size-2.5 rotate-45 bg-[#a3261a]" />
              <p className="flex items-baseline gap-3">
                <span className="font-mono text-[10px] text-[#141110]/45">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-serif text-lg italic">{s.n}</span>
              </p>
              <p className="pl-8 text-[12px] text-[#141110]/60">{s.d}</p>
            </motion.li>
          ))}
        </ol>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-[#141110]/10 bg-[#faf6ee] p-4">
          <label className="flex cursor-pointer items-center gap-3 text-sm">
            <button
              type="button"
              role="switch"
              aria-checked={pairing}
              aria-label="Maridaje de sake"
              onClick={() => setPairing((p) => !p)}
              className={cn("relative h-6 w-11 rounded-full transition-colors", pairing ? "bg-[#a3261a]" : "bg-[#141110]/20")}
            >
              <motion.span layout className={cn("absolute top-1 size-4 rounded-full bg-white", pairing ? "right-1" : "left-1")} />
            </button>
            Maridaje de sake <span className="text-[#141110]/50">+35 €</span>
          </label>
          <div className="flex items-center gap-4">
            <p className="font-serif text-3xl">
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={total} initial={{ y: 8, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -8, opacity: 0 }} className="inline-block">
                  {total} €
                </motion.span>
              </AnimatePresence>
              <span className="ml-1 font-sans text-[11px] text-[#141110]/50">/ persona</span>
            </p>
            <button type="button" onClick={onBook} className="rounded-full bg-[#141110] px-4 py-2.5 text-xs text-[#f3ece0]">
              Reservar barra
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const DAYS = ["Hoy", "Mañana", "Jueves", "Viernes", "Sábado"];
const ZONES = ["Sala", "Barra", "Terraza"] as const;
const TIMES = ["13:30", "14:00", "14:30", "20:30", "21:00", "21:30", "22:00"];

function Booking() {
  const [guests, setGuests] = useState(2);
  const [day, setDay] = useState(0);
  const [zone, setZone] = useState<(typeof ZONES)[number]>("Sala");
  const [time, setTime] = useState<string | null>(null);
  const [notes, setNotes] = useState("");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="relative flex min-h-full flex-col items-center px-5 py-14 text-center">
        <div aria-hidden className="absolute inset-0 [mask-image:radial-gradient(closest-side,black,transparent)]" style={{ backgroundImage: WAVES_PAPER }} />
        <div className="relative flex flex-col items-center text-[#a3261a]">
          <CheckBurst />
          <p className="mt-4 font-serif text-3xl text-[#141110]">Mesa confirmada</p>
          <p className="mt-2 max-w-xs text-sm text-[#141110]/60">
            {guests} personas · {DAYS[day].toLowerCase()} a las {time} · {zone.toLowerCase()}.
            {notes && " Hemos anotado tus alergias."} Te llegará la confirmación por email y WhatsApp.
          </p>
          <div className="mt-6 flex gap-3 text-xs">
            <span className="rounded-full border border-[#141110]/20 px-3 py-1.5 text-[#141110]">Añadir al calendario</span>
            <button type="button" onClick={() => setDone(false)} className="text-[#141110]/55 underline">
              Otra reserva
            </button>
          </div>
        </div>
      </div>
    );
  }

  const label = "text-[10px] uppercase tracking-[0.22em] text-[#141110]/55";
  return (
    <div className="px-5 py-8 @xl:px-10">
      <Eyebrow>Reservar</Eyebrow>
      <p className="mt-3 font-serif text-3xl">Tu mesa, en un minuto.</p>
      <p className="mt-1 text-sm text-[#141110]/55">Confirmación inmediata. Sin llamadas.</p>

      <div className="mt-6 grid gap-6 @xl:grid-cols-2">
        <div>
          <p className={label}>Comensales</p>
          <div className="mt-2 flex gap-2">
            {[1, 2, 3, 4, 6].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGuests(g)}
                aria-pressed={guests === g}
                className={cn(
                  "size-10 rounded-xl border text-sm transition-all",
                  guests === g ? "border-[#a3261a] bg-[#a3261a] text-white" : "border-[#141110]/15 bg-[#faf6ee] hover:border-[#141110]/40",
                )}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className={label}>Zona</p>
          <div className="mt-2 flex gap-1 rounded-xl border border-[#141110]/15 bg-[#faf6ee] p-1">
            {ZONES.map((z) => (
              <button
                key={z}
                type="button"
                onClick={() => setZone(z)}
                aria-pressed={zone === z}
                className={cn("flex-1 rounded-lg py-2 text-xs transition-colors", zone === z ? "bg-[#141110] text-[#f3ece0]" : "hover:bg-[#141110]/5")}
              >
                {z}
              </button>
            ))}
          </div>
        </div>
      </div>

      <p className={cn(label, "mt-6")}>Día</p>
      <div className="no-scrollbar mt-2 flex gap-2 overflow-x-auto">
        {DAYS.map((d, i) => (
          <button
            key={d}
            type="button"
            onClick={() => {
              setDay(i);
              setTime(null);
            }}
            aria-pressed={day === i}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-xs transition-colors",
              day === i ? "border-[#141110] bg-[#141110] text-[#f3ece0]" : "border-[#141110]/15 hover:border-[#141110]/40",
            )}
          >
            {d}
          </button>
        ))}
      </div>

      <p className={cn(label, "mt-6")}>Hora</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {TIMES.map((t, i) => {
          const full = (i + day) % 4 === 1;
          return (
            <button
              key={t}
              type="button"
              disabled={full}
              onClick={() => setTime(t)}
              aria-pressed={time === t}
              className={cn(
                "rounded-lg border px-3 py-2 font-mono text-xs transition-all",
                full && "cursor-not-allowed border-dashed text-[#141110]/25 line-through",
                !full && time === t && "border-[#141110] bg-[#141110] text-white",
                !full && time !== t && "border-[#141110]/15 bg-[#faf6ee] hover:border-[#141110]/40",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>

      <label className="mt-6 block">
        <span className={label}>Alergias o intolerancias (opcional)</span>
        <input
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Ej.: celiaquía, sin marisco…"
          className="mt-2 w-full rounded-xl border border-[#141110]/15 bg-[#faf6ee] px-3 py-2.5 text-sm outline-none placeholder:text-[#141110]/35 focus:border-[#a3261a]"
        />
      </label>

      <button
        type="button"
        disabled={!time}
        onClick={() => setDone(true)}
        className="mt-7 w-full rounded-xl bg-[#141110] py-3.5 text-sm font-medium text-[#f3ece0] transition-all hover:bg-[#2a2220] disabled:opacity-30"
      >
        {time ? `Confirmar · ${guests} personas, ${DAYS[day].toLowerCase()} a las ${time}` : "Elige una hora"}
      </button>
    </div>
  );
}
