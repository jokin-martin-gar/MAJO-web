"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CheckBurst, DemoNav, DemoPages } from "../shared";
import { cn } from "@/lib/utils";

const PAGES = ["Inicio", "Carta", "Reservar"] as const;
type Page = (typeof PAGES)[number];

const MENU = {
  Compartir: [
    { n: "Gyozas de rabo de toro", d: "Caldo dashi, cebollino", p: 14 },
    { n: "Tataki de bonito", d: "Ponzu de cítricos, sésamo", p: 18 },
    { n: "Pan bao de panceta", d: "Pepino encurtido, kimchi", p: 12 },
  ],
  Brasa: [
    { n: "Chuletón madurado 45 días", d: "Sal de Añana, pimientos", p: 64 },
    { n: "Rodaballo salvaje", d: "Beurre blanc de miso", p: 38 },
    { n: "Pichón en dos cocciones", d: "Jugo de sus huesos", p: 32 },
  ],
  Postres: [
    { n: "Cheesecake de yuzu", d: "Galleta de sésamo negro", p: 9 },
    { n: "Torrija de brioche", d: "Helado de té matcha", p: 9 },
  ],
} as const;
type Category = keyof typeof MENU;

export function RestaurantDemo() {
  const [page, setPage] = useState<Page>("Inicio");
  return (
    <div className="@container flex h-full flex-col bg-[#f6f1ea] text-[#1b1a17]">
      <header className="flex items-center justify-between border-b border-black/5 px-5 py-4 @xl:px-8">
        <span className="font-serif text-2xl italic">Kōji</span>
        <DemoNav
          pages={PAGES}
          page={page}
          onChange={setPage}
          layoutId="koji-nav"
          className="text-[12px] tracking-wide"
          activeClassName="text-[#1b1a17]"
          inactiveClassName="text-black/45 hover:text-black"
          indicatorClassName="bg-[#b91c1c]"
        />
      </header>
      <div className="relative flex-1 overflow-y-auto no-scrollbar">
        <DemoPages page={page}>
          {page === "Inicio" && <Home onBook={() => setPage("Reservar")} />}
          {page === "Carta" && <Menu />}
          {page === "Reservar" && <Booking />}
        </DemoPages>
      </div>
    </div>
  );
}

function Home({ onBook }: { onBook: () => void }) {
  return (
    <div className="grid items-center gap-8 px-5 py-10 @xl:grid-cols-[1.2fr_1fr] @xl:px-8 @xl:py-14">
      <div>
        <p className="text-[10px] tracking-[0.3em] text-[#b91c1c]">IZAKAYA · BILBAO</p>
        <h3 className="mt-4 font-serif text-[clamp(2.2rem,7cqw,3.8rem)] leading-[0.95] tracking-[-0.02em]">
          Brasa japonesa, <span className="italic text-[#b91c1c]">producto</span> del Cantábrico.
        </h3>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-black/60">
          Doce mesas, una barra y un fuego que no se apaga. Cocina de mercado con técnica japonesa.
        </p>
        <div className="mt-6 flex items-center gap-3">
          <button
            type="button"
            onClick={onBook}
            className="rounded-full bg-[#1b1a17] px-5 py-2.5 text-xs font-medium text-[#f6f1ea] transition-transform hover:scale-105"
          >
            Reservar mesa
          </button>
          <span className="text-xs text-black/50">★ 4,8 · 1.240 reseñas</span>
        </div>
      </div>
      <motion.div
        className="relative mx-auto aspect-square w-full max-w-[240px]"
        whileHover={{ rotate: 12, scale: 1.04 }}
        transition={{ type: "spring", stiffness: 120, damping: 12 }}
        aria-hidden
      >
        <div className="absolute inset-0 rounded-full bg-[#1b1a17] shadow-[0_30px_60px_-20px_rgba(0,0,0,0.5)]" />
        <div className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_50%_40%,#f5deb3,#d4a373_70%)]" />
        <div className="absolute inset-[22%] rounded-full bg-[radial-gradient(circle_at_45%_40%,#fde68a,#f59e0b_60%,#b45309)]" />
        <div className="absolute left-[30%] top-[28%] h-[8%] w-[40%] rotate-[25deg] rounded-full bg-[#15803d]" />
        <div className="absolute left-[40%] top-[55%] h-[6%] w-[30%] -rotate-[15deg] rounded-full bg-[#b91c1c]" />
        <div className="absolute left-[25%] top-[45%] size-[7%] rounded-full bg-[#fff7ed]" />
      </motion.div>
    </div>
  );
}

function Menu() {
  const [cat, setCat] = useState<Category>("Brasa");
  return (
    <div className="px-5 py-8 @xl:px-8">
      <div className="flex gap-2" role="tablist" aria-label="Categorías de la carta">
        {(Object.keys(MENU) as Category[]).map((c) => (
          <button
            key={c}
            type="button"
            role="tab"
            aria-selected={cat === c}
            onClick={() => setCat(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs transition-colors",
              cat === c ? "border-[#1b1a17] bg-[#1b1a17] text-[#f6f1ea]" : "border-black/15 text-black/60 hover:border-black/40",
            )}
          >
            {c}
          </button>
        ))}
      </div>
      <ul className="mt-6 divide-y divide-black/10">
        {MENU[cat].map((dish, i) => (
          <motion.li
            key={dish.n}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.06 }}
            className="group flex items-baseline justify-between gap-4 py-4 transition-[padding] duration-300 hover:pl-2"
          >
            <div>
              <p className="font-serif text-xl">{dish.n}</p>
              <p className="text-xs text-black/50">{dish.d}</p>
            </div>
            <span className="font-mono text-sm text-black/70 transition-colors group-hover:text-[#b91c1c]">{dish.p} €</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

function Booking() {
  const [guests, setGuests] = useState(2);
  const [time, setTime] = useState("21:00");
  const [done, setDone] = useState(false);

  if (done) {
    return (
      <div className="flex flex-col items-center justify-center px-5 py-16 text-center text-[#15803d]">
        <CheckBurst />
        <p className="mt-4 font-serif text-3xl text-[#1b1a17]">Mesa confirmada</p>
        <p className="mt-2 text-sm text-black/55">
          {guests} personas · Hoy a las {time}. Te hemos enviado la confirmación por email.
        </p>
        <button type="button" onClick={() => setDone(false)} className="mt-6 text-xs text-black/50 underline">
          Hacer otra reserva
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 @xl:px-8">
      <p className="font-serif text-3xl">Reserva tu mesa</p>
      <p className="mt-1 text-sm text-black/55">Confirmación inmediata. Sin llamadas.</p>
      <p className="mt-6 text-[11px] tracking-[0.2em] text-black/50">COMENSALES</p>
      <div className="mt-2 flex gap-2">
        {[2, 3, 4, 6].map((g) => (
          <button
            key={g}
            type="button"
            onClick={() => setGuests(g)}
            aria-pressed={guests === g}
            className={cn(
              "size-11 rounded-xl border text-sm transition-all",
              guests === g ? "border-[#b91c1c] bg-[#b91c1c] text-white" : "border-black/15 hover:border-black/40",
            )}
          >
            {g}
          </button>
        ))}
      </div>
      <p className="mt-6 text-[11px] tracking-[0.2em] text-black/50">HORA · HOY</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {["20:30", "21:00", "21:30", "22:00", "22:30"].map((t, i) => {
          const full = i === 3;
          return (
            <button
              key={t}
              type="button"
              disabled={full}
              onClick={() => setTime(t)}
              aria-pressed={time === t}
              className={cn(
                "rounded-lg border px-3 py-2 font-mono text-xs transition-all",
                full && "cursor-not-allowed border-dashed text-black/25 line-through",
                !full && time === t && "border-[#1b1a17] bg-[#1b1a17] text-white",
                !full && time !== t && "border-black/15 hover:border-black/40",
              )}
            >
              {t}
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={() => setDone(true)}
        className="mt-8 w-full rounded-xl bg-[#1b1a17] py-3 text-sm font-medium text-[#f6f1ea] transition-transform hover:scale-[1.01] active:scale-[0.99]"
      >
        Confirmar · {guests} personas a las {time}
      </button>
    </div>
  );
}
