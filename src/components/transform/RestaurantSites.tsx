"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { grain } from "@/components/portfolio/shared";

/**
 * Two versions of the same (fictional) restaurant, drawn entirely in code — no stock imagery.
 *
 * "Before" is the site many local restaurants really still have: a 2014–2016 template with a
 * fixed 960 px boxed layout, a slider, sidebar widgets, the menu as a PDF and a cookie banner.
 * It is not responsive, so on a phone it is simply shrunk to fit — exactly what happens in reality.
 */

const OLD_WIDTH = 960;

/** Renders its children at a fixed desktop width and scales them down to fit, like a non-responsive site on a phone. */
function FixedWidthViewport({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ w: OLD_WIDTH, h: 600 });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setSize({ w: width, h: height }); // ignore the 0×0 pass before layout
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const scale = Math.min(1, size.w / OLD_WIDTH);
  return (
    <div ref={ref} className="relative size-full overflow-clip bg-[#d9d9d9]">
      <div
        className="absolute left-1/2 top-0 origin-top"
        style={{ width: OLD_WIDTH, height: size.h / scale, transform: `translateX(-50%) scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

const OLD_GREEN = "#4a7a2c";

export function OldRestaurantSite() {
  return (
    <FixedWidthViewport>
      <div
        className="relative h-full overflow-clip bg-white text-[13px] leading-[1.5] text-[#444] shadow-[0_0_12px_rgba(0,0,0,0.25)]"
        style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between border-b border-[#ddd] bg-[#f4f4f4] px-5 py-1.5 text-[11px] text-[#777]">
          <span>Tlf: 944 00 00 00 &nbsp;|&nbsp; info@casaolmo.es</span>
          <span className="flex gap-1">
            {["f", "t", "g+"].map((s) => (
              <span key={s} className="grid h-5 w-5 place-items-center rounded-[3px] bg-[#9a9a9a] text-[10px] font-bold text-white">
                {s}
              </span>
            ))}
          </span>
        </div>

        {/* Header */}
        <div className="flex items-end justify-between px-5 pb-3 pt-4">
          <div>
            <p className="text-[30px] italic leading-none text-[#5a3a1a]" style={{ fontFamily: "Georgia, serif" }}>
              Casa Olmo
            </p>
            <p className="mt-1 text-[11px] uppercase tracking-[0.15em] text-[#888]">Restaurante · Asador · Celebraciones</p>
          </div>
          <div className="text-right">
            <p className="text-[11px] text-[#888]">¡Reserve su mesa!</p>
            <p className="text-[20px] font-bold" style={{ color: OLD_GREEN }}>
              944 00 00 00
            </p>
          </div>
        </div>

        {/* Nav */}
        <div className="flex text-[12px] font-bold uppercase text-white" style={{ background: `linear-gradient(to bottom, #5d9137, ${OLD_GREEN})` }}>
          {["Inicio", "Nosotros", "Carta ▾", "Menú del día", "Galería", "Contacto"].map((l, i) => (
            <span key={l} className={i === 0 ? "bg-black/20 px-4 py-2.5" : "border-l border-white/15 px-4 py-2.5"}>
              {l}
            </span>
          ))}
        </div>

        {/* Slider: a "photo" of the dining room made of gradients */}
        <div className="relative h-[230px] overflow-clip">
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#6b4a2b,#3b2414)]" />
          <div className="absolute inset-x-0 bottom-0 h-[45%] bg-[linear-gradient(to_bottom,#7a5230,#4a2f19)]" />
          <div className="absolute left-[8%] top-[18%] h-[38%] w-[16%] rounded-sm bg-[linear-gradient(to_bottom,#e9d9a8,#b99a5f)] opacity-80" />
          <div className="absolute left-[30%] top-[18%] h-[38%] w-[16%] rounded-sm bg-[linear-gradient(to_bottom,#e9d9a8,#b99a5f)] opacity-80" />
          <div className="absolute right-[10%] top-[10%] size-24 rounded-full bg-[radial-gradient(closest-side,rgba(255,220,150,0.7),transparent)]" />
          <div className="absolute bottom-[14%] left-[18%] h-[22%] w-[64%] rounded-[50%] bg-[#f2efe8] opacity-90" />
          <div className="absolute bottom-[19%] left-[30%] h-[10%] w-[14%] rounded-[50%] bg-[#fff]" />
          <div className="absolute bottom-[19%] left-[55%] h-[10%] w-[14%] rounded-[50%] bg-[#fff]" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,rgba(0,0,0,0.45))]" />
          <div className="absolute bottom-6 left-8 bg-black/60 px-4 py-2.5 text-white">
            <p className="text-[18px]" style={{ fontFamily: "Georgia, serif" }}>
              Bienvenidos a Restaurante Casa Olmo
            </p>
            <p className="text-[11px] text-white/80">Cocina tradicional desde 1987</p>
          </div>
          <span className="absolute left-2 top-1/2 grid h-9 w-6 -translate-y-1/2 place-items-center bg-black/40 text-lg text-white">‹</span>
          <span className="absolute right-2 top-1/2 grid h-9 w-6 -translate-y-1/2 place-items-center bg-black/40 text-lg text-white">›</span>
          <span className="absolute bottom-2 right-4 flex gap-1.5">
            {[0, 1, 2, 3].map((d) => (
              <span key={d} className={d === 0 ? "size-2 rounded-full bg-white" : "size-2 rounded-full bg-white/40"} />
            ))}
          </span>
        </div>

        {/* Content + sidebar */}
        <div className="grid grid-cols-[1fr_250px] gap-6 px-5 py-5">
          <div>
            <h4 className="border-b border-[#e3e3e3] pb-1 text-[20px] font-normal" style={{ color: OLD_GREEN, fontFamily: "Georgia, serif" }}>
              Bienvenidos
            </h4>
            <p className="mt-2">
              Restaurante Casa Olmo es un negocio familiar situado en pleno centro. Ofrecemos cocina tradicional, carnes a la
              brasa, pescados del día, menú del día y menú de fin de semana. Disponemos de salón para celebraciones, comuniones y
              eventos de empresa. Para reservar llame por teléfono.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-4">
              <div className="border border-[#e3e3e3] bg-[#fafafa] p-3">
                <p className="font-bold text-[#5a3a1a]">MENÚ DEL DÍA &nbsp;12,50 €</p>
                <p className="mt-1 text-[12px]">De lunes a viernes. Primero, segundo, postre, pan y bebida. IVA incl.</p>
                <p className="mt-2 text-[12px] text-[#1a0dab] underline">Ver menú de hoy »</p>
              </div>
              <div className="border border-[#e3e3e3] bg-[#fafafa] p-3">
                <p className="font-bold text-[#5a3a1a]">NUESTRA CARTA</p>
                <p className="mt-1 text-[12px]">Consulte nuestra carta de raciones, carnes, pescados y postres caseros.</p>
                <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#1a0dab] underline">
                  <span className="rounded-[2px] bg-[#c4302b] px-1 text-[9px] font-bold text-white no-underline">PDF</span>
                  Descargar carta (8,4 MB)
                </p>
              </div>
            </div>
          </div>

          <aside className="space-y-4 text-[12px]">
            <div>
              <p className="px-2 py-1 text-[12px] font-bold uppercase text-white" style={{ background: OLD_GREEN }}>
                Horario
              </p>
              <div className="border border-t-0 border-[#e3e3e3] p-2">
                <p>Lunes a domingo</p>
                <p>13:00 - 16:00 / 20:30 - 23:30</p>
                <p className="text-[#c4302b]">Martes noche cerrado</p>
              </div>
            </div>
            <div>
              <p className="px-2 py-1 text-[12px] font-bold uppercase text-white" style={{ background: OLD_GREEN }}>
                Dónde estamos
              </p>
              <div className="relative h-20 border border-t-0 border-[#e3e3e3] bg-[#e8e6df]">
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_48%,#fff_48%,#fff_52%,transparent_52%),linear-gradient(0deg,transparent_45%,#fff_45%,#fff_50%,transparent_50%)]" />
                <span className="absolute left-1/2 top-1/2 size-3 -translate-x-1/2 -translate-y-full rotate-45 rounded-[50%_50%_0_50%] bg-[#c4302b]" />
              </div>
              <p className="mt-1 text-[11px] text-[#1a0dab] underline">Ver mapa más grande</p>
            </div>
          </aside>
        </div>

        <div className="border-t border-[#e3e3e3] bg-[#f4f4f4] px-5 py-2.5 text-[11px] text-[#888]">
          © 2016 Restaurante Casa Olmo · Aviso legal · Web realizada por WebsNorte
        </div>

        {/* Cookie banner covering the content, as they always do */}
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-4 bg-[#222]/95 px-5 py-3 text-[12px] text-white">
          <p>
            Utilizamos cookies propias y de terceros para mejorar nuestros servicios. Si continúa navegando, consideramos que
            acepta su uso. <span className="underline">Más información</span>
          </p>
          <span className="shrink-0 bg-[#5d9137] px-4 py-1.5 font-bold">ACEPTAR</span>
        </div>
      </div>
    </FixedWidthViewport>
  );
}

/* ── After ─────────────────────────────────────────────────────────────── */

const LEAVES = [
  { x: "62%", y: "12%", r: -20, s: 1, d: 9 },
  { x: "84%", y: "30%", r: 35, s: 0.7, d: 11 },
  { x: "46%", y: "70%", r: 70, s: 0.6, d: 13 },
  { x: "92%", y: "72%", r: -50, s: 0.9, d: 10 },
  { x: "8%", y: "86%", r: 15, s: 0.5, d: 12 },
];

/** Elm leaf: serrated oval with a central vein. */
function ElmLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 60" className={className} fill="none" aria-hidden>
      <path
        d="M20 2 C30 10 36 22 34 36 C32 48 26 55 20 58 C14 55 8 48 6 36 C4 22 10 10 20 2 Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeDasharray="3 1.4"
      />
      <path d="M20 6 V58 M20 20 L28 14 M20 30 L30 23 M20 40 L29 34 M20 20 L12 14 M20 30 L10 23 M20 40 L11 34" stroke="currentColor" strokeWidth="0.8" />
    </svg>
  );
}

/** Chuletón on a wooden board with salt flakes and smoke. */
function Board({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 280 220" className={className} aria-hidden>
      <defs>
        <linearGradient id="olmo-wood" x1="0" x2="1">
          <stop offset="0" stopColor="#5a3a22" />
          <stop offset="1" stopColor="#3d2615" />
        </linearGradient>
        <radialGradient id="olmo-meat" cx="0.4" cy="0.35" r="0.8">
          <stop offset="0" stopColor="#c0573a" />
          <stop offset="0.55" stopColor="#7a2a17" />
          <stop offset="1" stopColor="#2c120a" />
        </radialGradient>
        <radialGradient id="olmo-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#f59e0b" stopOpacity="0.35" />
          <stop offset="1" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="140" cy="150" rx="140" ry="60" fill="url(#olmo-glow)" />
      {[96, 140, 184].map((x, i) => (
        <motion.path
          key={x}
          d={`M${x} 92 C${x - 14} 74 ${x + 14} 58 ${x} 40 C${x - 10} 28 ${x + 8} 18 ${x} 6`}
          fill="none"
          stroke="#efe6d8"
          strokeWidth="2.4"
          strokeLinecap="round"
          animate={{ opacity: [0, 0.35, 0], y: [10, -4, -14] }}
          transition={{ duration: 4, repeat: Infinity, delay: i * 1.3, ease: "easeInOut" }}
        />
      ))}
      {/* board */}
      <rect x="22" y="104" width="236" height="84" rx="14" fill="url(#olmo-wood)" />
      <rect x="22" y="180" width="236" height="10" rx="5" fill="#2a190d" />
      {[118, 132, 148, 164].map((y) => (
        <path key={y} d={`M36 ${y} C110 ${y - 4} 170 ${y + 4} 244 ${y - 2}`} stroke="#6b4628" strokeWidth="1" fill="none" opacity="0.6" />
      ))}
      <circle cx="246" cy="146" r="5" fill="#2a190d" />
      {/* steak: crust and sliced pieces */}
      <path d="M56 140 C58 112 120 104 168 112 C200 118 214 136 204 154 C192 172 120 176 82 166 C62 160 54 152 56 140 Z" fill="url(#olmo-meat)" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${150 + i * 18} ${120 + (i % 2) * 4}) rotate(12)`}>
          <rect width="14" height="44" rx="4" fill="#3a160c" />
          <rect x="2" y="3" width="10" height="38" rx="3" fill="#d4675a" />
          <rect x="4" y="8" width="6" height="28" rx="3" fill="#e98a7a" />
        </g>
      ))}
      {/* bone */}
      <path d="M60 134 C46 130 40 140 46 146 C40 152 50 160 60 154" fill="#efe6d8" />
      {/* salt flakes + pepper */}
      {[
        [90, 128], [110, 138], [128, 124], [100, 150], [76, 146], [140, 146],
      ].map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="3" height="3" fill="#fff" transform={`rotate(${i * 25} ${x} ${y})`} opacity="0.9" />
      ))}
      <circle cx="226" cy="124" r="10" fill="#4d7c0f" />
      <circle cx="232" cy="118" r="6" fill="#65a30d" />
    </svg>
  );
}

export function NewRestaurantSite() {
  return (
    <div className="@container relative size-full overflow-clip bg-[#0f130e] text-[#efe6d8]">
      {/* Background layers */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        {/* grill bars */}
        <div
          className="absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_70%)]"
          style={{ backgroundImage: "repeating-linear-gradient(to bottom, rgba(239,230,216,0.04) 0 2px, transparent 2px 18px)" }}
        />
        {/* wood fire breathing at the bottom-right */}
        <motion.div
          className="absolute -bottom-1/3 right-[-10%] h-[90%] w-[70%] bg-[radial-gradient(closest-side,rgba(234,88,12,0.45),rgba(245,158,11,0.12)_55%,transparent)]"
          animate={{ opacity: [0.75, 1, 0.8, 0.95, 0.75], scale: [1, 1.04, 0.99, 1.03, 1] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(50%_60%_at_0%_0%,rgba(77,124,15,0.18),transparent_70%)]" />
        {LEAVES.map((l, i) => (
          <motion.div
            key={i}
            className="absolute text-[#a3b18a]/25"
            style={{ left: l.x, top: l.y, width: 30 * l.s }}
            animate={{ rotate: [l.r, l.r + 12, l.r], y: [0, 8, 0] }}
            transition={{ duration: l.d, repeat: Infinity, ease: "easeInOut" }}
          >
            <ElmLeaf className="w-full" />
          </motion.div>
        ))}
        <div className="absolute inset-0 opacity-[0.25] mix-blend-overlay" style={{ backgroundImage: grain(0.6) }} />
      </div>

      {/* Nav */}
      <div className="relative flex items-center justify-between px-5 py-4 text-[10px] tracking-[0.2em] text-[#efe6d8]/70 @2xl:px-10 @2xl:py-6">
        <span className="flex items-center gap-2">
          <ElmLeaf className="h-6 w-4 text-[#a3b18a]" />
          <span className="leading-none">
            <span className="block font-serif text-xl italic tracking-normal text-[#efe6d8] @2xl:text-2xl">Olmo</span>
            <span className="block text-[7px] tracking-[0.45em] text-[#efe6d8]/45">ASADOR</span>
          </span>
        </span>
        <div className="hidden gap-7 @3xl:flex">
          <span>CARTA</span>
          <span>BRASA</span>
          <span>BODEGA</span>
          <span>EVENTOS</span>
        </div>
        <span className="rounded-full bg-[#efe6d8] px-4 py-1.5 text-[10px] font-medium tracking-[0.12em] text-[#0f130e]">RESERVAR</span>
      </div>

      {/* Vertical caption */}
      <span aria-hidden className="absolute left-3 top-1/2 hidden -translate-y-1/2 -rotate-180 text-[9px] tracking-[0.5em] text-[#efe6d8]/30 [writing-mode:vertical-rl] @3xl:block">
        BILBAO · DESDE 1987
      </span>

      {/* Hero */}
      <div className="relative grid grid-cols-1 items-center gap-2 px-5 pt-2 @2xl:grid-cols-[1.15fr_1fr] @2xl:px-10 @2xl:pt-6 @3xl:pl-14">
        <div>
          <p className="mb-3 flex items-center gap-2 text-[9px] tracking-[0.3em] text-[#f59e0b] @2xl:mb-4 @2xl:text-[10px]">
            <span className="h-px w-6 bg-[#f59e0b]/70" />
            BRASA DE ENCINA · COCINA DE TEMPORADA
          </p>
          <p className="font-serif text-[clamp(1.9rem,7.6cqw,4.8rem)] leading-[0.95] tracking-[-0.02em]">
            El fuego <span className="italic text-[#f59e0b]">lento</span>
            <br />
            también es un
            <br />
            ingrediente.
          </p>
          <p className="mt-4 hidden max-w-[42ch] text-[12px] leading-relaxed text-[#efe6d8]/60 @2xl:block">
            Treinta y cinco años de brasa familiar. Carne madurada en casa, pescado del día y una bodega de 120 referencias.
          </p>
          <div className="mt-4 flex flex-wrap gap-2 text-[10px] @2xl:mt-6 @2xl:text-[11px]">
            {["Menú del día · 18 €", "Carta con alérgenos", "Salón para grupos"].map((c) => (
              <span key={c} className="rounded-full border border-[#efe6d8]/20 bg-[#efe6d8]/[0.04] px-3 py-1.5">
                {c}
              </span>
            ))}
          </div>
        </div>
        <div className="relative mx-auto hidden w-full max-w-[360px] @2xl:block">
          <Board className="w-full drop-shadow-[0_30px_40px_rgba(0,0,0,0.6)]" />
        </div>
      </div>

      {/* Mobile illustration, smaller and lower */}
      <div className="absolute inset-x-0 bottom-[68px] mx-auto w-[64%] max-w-[260px] @2xl:hidden">
        <Board className="w-full" />
      </div>

      {/* Booking bar */}
      <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-[#efe6d8]/10 bg-[#1a1f17]/90 p-2.5 text-[11px] shadow-[0_20px_40px_-20px_rgba(0,0,0,0.8)] @2xl:inset-x-10 @2xl:bottom-6 @2xl:p-3">
        <div className="flex gap-4 pl-1 @2xl:gap-6">
          <span>
            <span className="block text-[9px] uppercase tracking-[0.2em] text-[#efe6d8]/45">Día</span>
            Hoy
          </span>
          <span>
            <span className="block text-[9px] uppercase tracking-[0.2em] text-[#efe6d8]/45">Personas</span>4
          </span>
          <span className="hidden @lg:block">
            <span className="block text-[9px] uppercase tracking-[0.2em] text-[#efe6d8]/45">Hora</span>
            21:30
          </span>
          <span className="hidden @3xl:block">
            <span className="block text-[9px] uppercase tracking-[0.2em] text-[#efe6d8]/45">Zona</span>
            Junto a la brasa
          </span>
        </div>
        <span className="rounded-xl bg-[#ea580c] px-3.5 py-2 font-medium text-white shadow-[0_8px_20px_-6px_rgba(234,88,12,0.8)]">Reservar mesa →</span>
      </div>
    </div>
  );
}
