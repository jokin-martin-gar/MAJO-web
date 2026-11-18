"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckBurst, DemoNav, DemoPages, grain } from "../shared";
import { EASE, cn } from "@/lib/utils";

/*
 * Nácar — concept online shop for a ceramics studio in Seville.
 * Palette: lime-washed cream, terracotta and ink. Arches and shutter shadows give it place;
 * prices include VAT and the 14-day withdrawal right is stated, as Spanish consumer law requires.
 */

const PAGES = ["Inicio", "Tienda", "Taller"] as const;
type Page = (typeof PAGES)[number];
type View = Page | "product" | "cart";

type Shape = "vase" | "bowl" | "cup" | "plate" | "jug" | "pot";
type Kind = "Jarrones" | "Cuencos" | "Tazas" | "Platos";
type Product = { id: string; n: string; p: number; kind: Kind; tones: string[]; shape: Shape; size: string; unique?: boolean; isNew?: boolean };

const PRODUCTS: Product[] = [
  { id: "v1", n: "Jarrón Ola", p: 86, kind: "Jarrones", tones: ["#e8d5c4", "#9ca3af", "#1f2937"], shape: "vase", size: "Ø 14 × 28 cm", isNew: true },
  { id: "b1", n: "Cuenco Brisa", p: 42, kind: "Cuencos", tones: ["#c7d2c0", "#e8d5c4", "#b45309"], shape: "bowl", size: "Ø 18 × 8 cm" },
  { id: "c1", n: "Taza Nácar", p: 28, kind: "Tazas", tones: ["#f5f0e8", "#d6b4a8", "#475569"], shape: "cup", size: "300 ml", isNew: true },
  { id: "p1", n: "Plato Luna", p: 36, kind: "Platos", tones: ["#1f2937", "#e8d5c4", "#c7d2c0"], shape: "plate", size: "Ø 26 cm" },
  { id: "j1", n: "Jarra Triana", p: 58, kind: "Jarrones", tones: ["#c0785a", "#f5f0e8", "#3f6b5a"], shape: "jug", size: "1 l", unique: true },
  { id: "m1", n: "Maceta Patio", p: 48, kind: "Cuencos", tones: ["#b4664a", "#e8d5c4", "#8a9a7b"], shape: "pot", size: "Ø 16 × 15 cm", isNew: true },
];

const KINDS = ["Todo", "Jarrones", "Cuencos", "Tazas", "Platos"] as const;
const FREE_SHIPPING = 60;
const C = { cream: "#faf6ef", clay: "#efe6d8", terra: "#c0785a", terraInk: "#9a4f33", ink: "#2a2522" };

type Line = { id: string; tone: string; qty: number };

/* ── Pieces ────────────────────────────────────────────────────────────── */

/** Ceramic pieces drawn with CSS: no product photography needed. */
function Piece({ shape, tone, className }: { shape: Shape; tone: string; className?: string }) {
  const shade = `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), transparent 45%), radial-gradient(circle at 70% 80%, rgba(0,0,0,0.18), transparent 50%), ${tone}`;
  return (
    <div className={cn("relative grid place-items-center", className)} aria-hidden>
      <div className="absolute bottom-[12%] h-[6%] w-[55%] rounded-full bg-[radial-gradient(closest-side,rgba(0,0,0,0.22),transparent)]" />
      {shape === "vase" && <div className="h-[72%] w-[42%] rounded-[45%_45%_40%_40%/30%_30%_60%_60%]" style={{ background: shade }} />}
      {shape === "bowl" && <div className="mt-[10%] h-[36%] w-[66%] rounded-b-full rounded-t-[10%]" style={{ background: shade }} />}
      {shape === "cup" && (
        <div className="relative mt-[6%] h-[44%] w-[40%] rounded-b-[40%] rounded-t-md" style={{ background: shade }}>
          <div className="absolute -right-[30%] top-[20%] h-[45%] w-[38%] rounded-r-full border-[5px] border-l-0" style={{ borderColor: tone }} />
        </div>
      )}
      {shape === "plate" && (
        <div className="grid size-[70%] place-items-center rounded-full" style={{ background: shade }}>
          <div className="size-[60%] rounded-full border border-black/10" />
        </div>
      )}
      {shape === "jug" && (
        <div className="relative h-[62%] w-[40%] rounded-[30%_30%_45%_45%/20%_20%_55%_55%]" style={{ background: shade }}>
          <div className="absolute -right-[28%] top-[18%] h-[50%] w-[34%] rounded-r-full border-[5px] border-l-0" style={{ borderColor: tone }} />
          <div className="absolute -left-[6%] -top-[3%] h-[10%] w-[30%] -rotate-12 rounded-full" style={{ background: tone }} />
        </div>
      )}
      {shape === "pot" && <div className="mt-[8%] h-[50%] w-[52%] [clip-path:polygon(0_0,100%_0,86%_100%,14%_100%)]" style={{ background: shade }} />}
    </div>
  );
}

/** Soft diagonal shadows, like sun through window shutters. */
function Shutters({ className, strength = 0.08 }: { className?: string; strength?: number }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0", className)}
      style={{
        backgroundImage: `repeating-linear-gradient(-32deg, transparent 0 18px, rgba(90,55,30,${strength}) 30px, transparent 42px, transparent 64px)`,
      }}
    />
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase tracking-[0.28em] text-[#9a4f33]">{children}</p>;
}

/* ── Shell ─────────────────────────────────────────────────────────────── */

export function ShopDemo() {
  const [view, setView] = useState<View>("Inicio");
  const [lastPage, setLastPage] = useState<Page>("Inicio");
  const [current, setCurrent] = useState<Product>(PRODUCTS[0]);
  const [cart, setCart] = useState<Line[]>([]);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const go = (p: Page) => {
    setLastPage(p);
    setView(p);
  };
  const open = (p: Product) => {
    setCurrent(p);
    setLastPage("Tienda");
    setView("product");
  };
  function add(product: Product, tone: string, qty = 1) {
    setCart((c) => {
      const found = c.find((l) => l.id === product.id && l.tone === tone);
      if (found) return c.map((l) => (l === found ? { ...l, qty: l.qty + qty } : l));
      return [...c, { id: product.id, tone, qty }];
    });
  }

  return (
    <div className="@container flex h-full flex-col text-[#2a2522]" style={{ background: C.cream }}>
      <header className="relative z-10 flex items-center justify-between gap-3 border-b border-[#2a2522]/[0.07] px-4 py-3.5 @xl:px-8" style={{ background: C.cream }}>
        <button type="button" onClick={() => go("Inicio")} className="text-lg font-light tracking-[0.32em]">
          NÁCAR
        </button>
        <div className="flex items-center gap-4">
          <DemoNav
            pages={PAGES}
            page={view === "cart" ? lastPage : view === "product" ? "Tienda" : view}
            onChange={go}
            layoutId="nacar-nav"
            className="gap-3 text-[11px] @md:gap-5 @md:text-[12px]"
            activeClassName={view === "cart" ? "text-[#2a2522]/50" : "text-[#2a2522]"}
            inactiveClassName="text-[#2a2522]/50 hover:text-[#2a2522]"
            indicatorClassName={view === "cart" ? "bg-transparent" : "bg-[#c0785a]"}
          />
          <button type="button" onClick={() => setView("cart")} className="relative" aria-label={`Carrito, ${count} artículos`}>
            <svg viewBox="0 0 20 20" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden>
              <path d="M5 7h10l-1 10H6L5 7Z" />
              <path d="M7.5 7V5.5a2.5 2.5 0 0 1 5 0V7" />
            </svg>
            <AnimatePresence>
              {count > 0 && (
                <motion.span
                  key={count}
                  initial={{ scale: 0.4, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                  className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-[#9a4f33] text-[9px] text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar" style={{ backgroundImage: grain(0.07, 0.7), backgroundAttachment: "local" }}>
        <DemoPages page={view === "product" ? `p-${current.id}` : view}>
          {view === "Inicio" && <Home onShop={() => go("Tienda")} onOpen={open} onWorkshop={() => go("Taller")} />}
          {view === "Tienda" && <Shop onOpen={open} onQuickAdd={(p) => add(p, p.tones[0])} />}
          {view === "Taller" && <Workshop />}
          {view === "product" && <ProductView product={current} onAdd={add} onOpen={open} />}
          {view === "cart" && <Cart lines={cart} setLines={setCart} onBack={() => go("Tienda")} />}
        </DemoPages>
      </div>
    </div>
  );
}

/* ── Pages ─────────────────────────────────────────────────────────────── */

function Home({ onShop, onOpen, onWorkshop }: { onShop: () => void; onOpen: (p: Product) => void; onWorkshop: () => void }) {
  return (
    <div>
      <section className="relative isolate overflow-clip px-5 pb-10 pt-8 @xl:px-10 @xl:pt-10">
        <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_70%_at_80%_20%,rgba(192,120,90,0.18),transparent_70%)]" />
          <Shutters className="[mask-image:linear-gradient(to_bottom_left,black,transparent_70%)]" />
        </div>
        <div className="grid items-center gap-8 @xl:grid-cols-[1fr_1fr]">
          <div>
            <Eyebrow>Taller de cerámica · Sevilla</Eyebrow>
            <motion.h3
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="mt-4 font-serif text-[clamp(2.3rem,7cqw,3.9rem)] leading-[0.98] tracking-[-0.015em]"
            >
              Barro, fuego y <span className="italic text-[#9a4f33]">paciencia</span>.
            </motion.h3>
            <p className="mt-4 max-w-[36ch] text-[13px] leading-relaxed text-[#2a2522]/65">
              Piezas torneadas a mano, una a una, con esmaltes sin plomo. Ninguna es exactamente igual a otra.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
              <button type="button" onClick={onShop} className="rounded-full bg-[#2a2522] px-5 py-2.5 text-xs text-[#faf6ef] transition-transform hover:scale-105">
                Ver colección
              </button>
              <button type="button" onClick={onWorkshop} className="text-xs underline decoration-[#c0785a] underline-offset-4">
                Conoce el taller
              </button>
            </div>
          </div>

          {/* Arch window with the featured piece */}
          <motion.button
            type="button"
            onClick={() => onOpen(PRODUCTS[0])}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
            className="group relative mx-auto aspect-[3/4] w-full max-w-[250px] overflow-clip rounded-t-full border-[6px] border-[#efe6d8] bg-[linear-gradient(to_bottom,#f3d9c6,#e9cdb6)] shadow-[0_30px_60px_-30px_rgba(90,55,30,0.5)]"
            aria-label="Ver Jarrón Ola"
          >
            <Shutters strength={0.13} />
            <div aria-hidden className="absolute inset-x-0 bottom-0 h-[26%] bg-[#e2d2bd]" />
            <div aria-hidden className="absolute inset-x-[22%] bottom-[18%] h-[12%] rounded-sm bg-[#d8c4ab] shadow-[0_8px_16px_-8px_rgba(0,0,0,0.3)]" />
            <motion.div
              className="absolute inset-x-0 bottom-[24%] h-[62%]"
              animate={{ y: [0, -4, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <Piece shape="vase" tone="#e8d5c4" className="size-full transition-transform duration-700 group-hover:scale-105" />
            </motion.div>
            <span className="absolute bottom-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-[#faf6ef]/90 px-3 py-1 text-[10px]">
              Jarrón Ola · 86 €
            </span>
          </motion.button>
        </div>
      </section>

      <div className="overflow-clip border-y border-[#2a2522]/10 bg-[#efe6d8] py-2.5" aria-label="Ventajas">
        <motion.div
          className="flex w-max gap-8 whitespace-nowrap text-[11px] uppercase tracking-[0.2em] text-[#2a2522]/70"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 24, ease: "linear", repeat: Infinity }}
        >
          {[0, 1].map((k) => (
            <span key={k} className="flex gap-8" aria-hidden={k === 1}>
              <span>Envío gratis desde {FREE_SHIPPING} €</span>
              <span className="text-[#c0785a]">✦</span>
              <span>Hecho a mano en Sevilla</span>
              <span className="text-[#c0785a]">✦</span>
              <span>Esmaltes sin plomo</span>
              <span className="text-[#c0785a]">✦</span>
              <span>Apto para lavavajillas</span>
              <span className="text-[#c0785a]">✦</span>
            </span>
          ))}
        </motion.div>
      </div>

      <section className="px-5 py-10 @xl:px-10">
        <div className="flex items-end justify-between">
          <div>
            <Eyebrow>Novedades</Eyebrow>
            <p className="mt-2 font-serif text-3xl italic">Colección Otoño</p>
          </div>
          <button type="button" onClick={onShop} className="text-[11px] text-[#9a4f33]">
            Ver todo →
          </button>
        </div>
        <div className="mt-5 grid grid-cols-3 gap-3">
          {PRODUCTS.filter((p) => p.isNew).map((p, i) => (
            <motion.button
              key={p.id}
              type="button"
              onClick={() => onOpen(p)}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: EASE }}
              className="group text-left"
            >
              <div className="relative aspect-[4/5] overflow-clip rounded-t-full bg-[#efe6d8]">
                <Shutters strength={0.06} />
                <Piece shape={p.shape} tone={p.tones[0]} className="size-full transition-transform duration-700 group-hover:scale-110" />
              </div>
              <p className="mt-2 text-[12px]">{p.n}</p>
              <p className="text-[11px] text-[#2a2522]/55">{p.p} €</p>
            </motion.button>
          ))}
        </div>
      </section>

      <section className="relative mx-5 mb-10 overflow-clip rounded-2xl bg-[#2a2522] px-6 py-8 text-center text-[#faf6ef] @xl:mx-10">
        <Shutters strength={0.18} className="opacity-60 mix-blend-overlay" />
        <p className="relative mx-auto max-w-[28ch] font-serif text-2xl italic leading-snug">“Cada pieza pasa tres días en el taller antes de llegar a tu mesa.”</p>
        <p className="relative mt-3 text-[10px] uppercase tracking-[0.25em] text-[#e9b59c]">Rocío, ceramista</p>
      </section>

      <footer className="border-t border-[#2a2522]/10 px-5 py-5 text-[10px] leading-relaxed text-[#2a2522]/55 @xl:px-10">
        <p>Nácar Cerámica · Sevilla · Precios con IVA incluido</p>
        <p>Envíos 48–72 h · Desistimiento 14 días (lo ampliamos a 30) · Aviso legal · Privacidad · Cookies</p>
      </footer>
    </div>
  );
}

function Shop({ onOpen, onQuickAdd }: { onOpen: (p: Product) => void; onQuickAdd: (p: Product) => void }) {
  const [kind, setKind] = useState<(typeof KINDS)[number]>("Todo");
  const list = PRODUCTS.filter((p) => kind === "Todo" || p.kind === kind);
  return (
    <div className="px-5 pb-10 pt-6 @xl:px-10">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <Eyebrow>Tienda</Eyebrow>
          <p className="mt-1 font-serif text-3xl italic">Colección Otoño</p>
        </div>
        <p className="text-[11px] text-[#2a2522]/55">{list.length} piezas</p>
      </div>
      <div className="no-scrollbar mt-4 flex gap-1.5 overflow-x-auto">
        {KINDS.map((k) => (
          <button
            key={k}
            type="button"
            onClick={() => setKind(k)}
            aria-pressed={kind === k}
            className={cn(
              "shrink-0 rounded-full border px-3.5 py-1.5 text-[11px] transition-colors",
              kind === k ? "border-[#2a2522] bg-[#2a2522] text-[#faf6ef]" : "border-[#2a2522]/15 hover:border-[#2a2522]/40",
            )}
          >
            {k}
          </button>
        ))}
      </div>
      <motion.div layout className="mt-5 grid grid-cols-2 gap-3 @xl:grid-cols-3">
        <AnimatePresence initial={false} mode="popLayout">
          {list.map((p) => (
            <motion.div
              layout
              key={p.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="group"
            >
              <div className="relative aspect-[4/5] overflow-clip rounded-xl bg-[#efe6d8]">
                <Shutters strength={0.05} />
                <button type="button" onClick={() => onOpen(p)} className="absolute inset-0" aria-label={`Ver ${p.n}`}>
                  <Piece shape={p.shape} tone={p.tones[0]} className="size-full transition-transform duration-700 group-hover:scale-110" />
                </button>
                {(p.unique || p.isNew) && (
                  <span className="pointer-events-none absolute left-2 top-2 rounded-full bg-[#faf6ef]/90 px-2 py-0.5 text-[9px] uppercase tracking-wider">
                    {p.unique ? "Pieza única" : "Nuevo"}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => onQuickAdd(p)}
                  className="absolute inset-x-2 bottom-2 translate-y-2 rounded-lg bg-[#2a2522] py-2 text-[11px] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
                >
                  Añadir rápido
                </button>
              </div>
              <div className="mt-2 flex justify-between gap-2 text-xs">
                <span>{p.n}</span>
                <span className="text-[#2a2522]/60">{p.p} €</span>
              </div>
              <div className="mt-1 flex gap-1" aria-hidden>
                {p.tones.map((t) => (
                  <span key={t} className="size-2.5 rounded-full ring-1 ring-black/10" style={{ background: t }} />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}

const DETAILS = (p: Product) => [
  { t: "Medidas y material", d: `${p.size}. Gres esmaltado cocido a 1.250 °C. Esmaltes sin plomo, aptos para uso alimentario.` },
  { t: "Cuidados", d: "Apto para lavavajillas y microondas. Al ser hecha a mano, pequeñas variaciones de color y forma hacen única cada pieza." },
  { t: "Envío y devoluciones", d: `Envío en 48–72 h, gratis desde ${FREE_SHIPPING} €. Embalaje sin plástico. Tienes 14 días de desistimiento por ley; nosotros lo ampliamos a 30.` },
];

function ProductView({ product, onAdd, onOpen }: { product: Product; onAdd: (p: Product, tone: string, qty: number) => void; onOpen: (p: Product) => void }) {
  const [tone, setTone] = useState(product.tones[0]);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState(0);
  const related = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="px-5 py-6 @xl:px-10">
      <div className="grid gap-6 @xl:grid-cols-2">
        <div className="relative aspect-square overflow-clip rounded-t-full bg-[#efe6d8]">
          <Shutters strength={0.1} />
          <AnimatePresence mode="wait">
            <motion.div
              key={tone}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.04 }}
              transition={{ duration: 0.4 }}
              className="size-full"
            >
              <Piece shape={product.shape} tone={tone} className="size-full" />
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="flex flex-col justify-center">
          <Eyebrow>{product.kind} · Gres esmaltado</Eyebrow>
          <p className="mt-2 font-serif text-4xl">{product.n}</p>
          <p className="mt-1 text-lg">
            {product.p},00 € <span className="text-[11px] text-[#2a2522]/50">IVA incluido</span>
          </p>
          <p className="mt-5 text-[10px] uppercase tracking-[0.2em] text-[#2a2522]/55">Esmalte</p>
          <div className="mt-2 flex gap-2">
            {product.tones.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setTone(t)}
                aria-label={`Esmalte ${t}`}
                aria-pressed={tone === t}
                className={cn(
                  "size-8 rounded-full ring-offset-2 ring-offset-[#faf6ef] transition-all",
                  tone === t ? "ring-2 ring-[#2a2522]" : "ring-1 ring-black/10 hover:scale-110",
                )}
                style={{ background: t }}
              />
            ))}
          </div>
          <div className="mt-6 flex gap-2">
            <div className="flex items-center rounded-xl border border-[#2a2522]/15">
              <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))} className="px-3 py-3 text-sm" aria-label="Quitar una">
                −
              </button>
              <span className="w-6 text-center text-sm" aria-live="polite">
                {qty}
              </span>
              <button type="button" onClick={() => setQty((q) => Math.min(9, q + 1))} className="px-3 py-3 text-sm" aria-label="Añadir una">
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                onAdd(product, tone, qty);
                setAdded(true);
                setTimeout(() => setAdded(false), 1400);
              }}
              className="relative flex-1 overflow-clip rounded-xl bg-[#2a2522] py-3 text-sm text-white"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span key={added ? "ok" : "add"} initial={{ y: 16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: -16, opacity: 0 }} className="block">
                  {added ? "Añadido ✓" : `Añadir · ${product.p * qty} €`}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
          <ul className="mt-6 border-t border-[#2a2522]/10">
            {DETAILS(product).map((d, i) => (
              <li key={d.t} className="border-b border-[#2a2522]/10">
                <button type="button" onClick={() => setOpen(open === i ? -1 : i)} aria-expanded={open === i} className="flex w-full items-center justify-between py-3 text-left text-[13px]">
                  {d.t}
                  <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-base font-light">
                    +
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {open === i && (
                    <motion.p
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: EASE }}
                      className="overflow-clip text-[12px] leading-relaxed text-[#2a2522]/65"
                    >
                      <span className="block pb-3">{d.d}</span>
                    </motion.p>
                  )}
                </AnimatePresence>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="mt-10 font-serif text-xl italic">También te puede gustar</p>
      <div className="mt-3 grid grid-cols-3 gap-3">
        {related.map((p) => (
          <button key={p.id} type="button" onClick={() => onOpen(p)} className="group text-left">
            <div className="aspect-square overflow-clip rounded-xl bg-[#efe6d8]">
              <Piece shape={p.shape} tone={p.tones[0]} className="size-full transition-transform duration-700 group-hover:scale-110" />
            </div>
            <p className="mt-1.5 text-[11px]">{p.n}</p>
          </button>
        ))}
      </div>
    </div>
  );
}

function Workshop() {
  const [booked, setBooked] = useState(false);
  return (
    <div>
      <section className="relative overflow-clip px-5 py-9 @xl:px-10">
        <Shutters className="[mask-image:linear-gradient(to_bottom,black,transparent)]" />
        <div className="relative grid items-center gap-6 @xl:grid-cols-[auto_1fr]">
          <div className="relative mx-auto grid aspect-[3/4] w-40 place-items-center overflow-clip rounded-t-full bg-[linear-gradient(to_bottom,#c0785a,#9a4f33)]">
            <Shutters strength={0.2} className="mix-blend-multiply" />
            <span className="relative font-serif text-6xl italic text-[#faf6ef]">R</span>
          </div>
          <div>
            <Eyebrow>El taller</Eyebrow>
            <p className="mt-2 font-serif text-3xl leading-tight">
              Rocío Márquez, <span className="italic">ceramista</span>
            </p>
            <p className="mt-3 max-w-[46ch] text-[13px] leading-relaxed text-[#2a2522]/65">
              Un pequeño taller en Triana donde cada pieza se tornea, se seca, se esmalta y se cuece a mano. Producimos poco y
              bien: cuando una pieza se agota, puede que no vuelva.
            </p>
          </div>
        </div>
      </section>

      <section className="px-5 pb-8 @xl:px-10">
        <ol className="grid grid-cols-2 gap-2 @xl:grid-cols-4">
          {[
            ["Tornear", "El barro toma forma en el torno.", "Día 1"],
            ["Secar", "Reposa lejos del sol directo.", "Día 1–2"],
            ["Esmaltar", "Por inmersión, uno a uno.", "Día 2"],
            ["Cocer", "Horno a 1.250 °C durante 10 h.", "Día 3"],
          ].map(([t, d, day], i) => (
            <motion.li
              key={t}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07, duration: 0.5, ease: EASE }}
              className="rounded-2xl border border-[#2a2522]/10 bg-[#f5eee3] p-4"
            >
              <p className="font-mono text-[10px] text-[#9a4f33]">{day}</p>
              <p className="mt-1 font-serif text-xl">{t}</p>
              <p className="mt-1 text-[11px] leading-relaxed text-[#2a2522]/60">{d}</p>
            </motion.li>
          ))}
        </ol>

        <div className="relative mt-6 overflow-clip rounded-2xl bg-[#2a2522] p-5 text-[#faf6ef]">
          <Shutters strength={0.15} className="opacity-70 mix-blend-overlay" />
          <div className="relative flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.25em] text-[#e9b59c]">Talleres de iniciación</p>
              <p className="mt-1 font-serif text-2xl">Sábados · 10:00 · 45 €</p>
              <p className="text-[12px] text-[#faf6ef]/60">Grupos de 6. Te llevas tu pieza cocida en dos semanas.</p>
            </div>
            <button
              type="button"
              onClick={() => setBooked(true)}
              className={cn("rounded-full px-4 py-2.5 text-xs transition-colors", booked ? "bg-[#c0785a] text-white" : "bg-[#faf6ef] text-[#2a2522]")}
            >
              {booked ? "Plaza reservada ✓" : "Reservar plaza"}
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Cart({ lines, setLines, onBack }: { lines: Line[]; setLines: React.Dispatch<React.SetStateAction<Line[]>>; onBack: () => void }) {
  const [step, setStep] = useState<"cart" | "shipping" | "payment" | "done">("cart");
  const [method, setMethod] = useState<"Tarjeta" | "Bizum">("Tarjeta");
  const [address, setAddress] = useState({ name: "", street: "", city: "" });
  const items = lines.map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id)! }));
  const subtotal = items.reduce((s, i) => s + i.product.p * i.qty, 0);
  const shipping = subtotal >= FREE_SHIPPING || subtotal === 0 ? 0 : 4.9;
  const total = subtotal + shipping;
  const missing = Math.max(0, FREE_SHIPPING - subtotal);
  const addressOk = address.name.trim().length > 1 && address.street.trim().length > 3 && address.city.trim().length > 1;

  if (step === "done") {
    return (
      <div className="flex flex-col items-center px-5 py-14 text-center text-[#9a4f33]">
        <CheckBurst />
        <p className="mt-4 font-serif text-3xl text-[#2a2522]">Pedido confirmado</p>
        <p className="mt-2 max-w-xs text-sm text-[#2a2522]/60">Gracias, {address.name.split(" ")[0]}. Lo envolvemos a mano y sale mañana hacia {address.city}.</p>
        <p className="mt-5 rounded-full border border-[#2a2522]/15 px-3 py-1.5 font-mono text-[11px]">Pedido NC-26-0418</p>
        <button
          type="button"
          onClick={() => {
            setLines([]);
            onBack();
          }}
          className="mt-6 text-xs underline"
        >
          Seguir comprando
        </button>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="relative px-5 py-16 text-center">
        <p className="font-serif text-3xl italic">Tu carrito está vacío</p>
        <button type="button" onClick={onBack} className="mt-4 text-xs underline">
          Descubrir la colección
        </button>
      </div>
    );
  }

  const steps = ["cart", "shipping", "payment"] as const;
  const field = "w-full rounded-xl border border-[#2a2522]/15 bg-white/60 px-3.5 py-2.5 text-sm outline-none placeholder:text-[#2a2522]/35 focus:border-[#c0785a]";

  return (
    <div className="px-5 py-6 @xl:px-10">
      <ol className="flex items-center gap-2 text-[10px] uppercase tracking-[0.18em]">
        {["Carrito", "Envío", "Pago"].map((s, i) => {
          const idx = steps.indexOf(step);
          return (
            <li key={s} className={cn("flex items-center gap-2", i <= idx ? "text-[#2a2522]" : "text-[#2a2522]/35")}>
              <span className={cn("grid size-5 place-items-center rounded-full text-[9px]", i <= idx ? "bg-[#2a2522] text-[#faf6ef]" : "border border-[#2a2522]/25")}>{i + 1}</span>
              {s}
              {i < 2 && <span className="h-px w-5 bg-[#2a2522]/20" />}
            </li>
          );
        })}
      </ol>

      <AnimatePresence mode="wait" initial={false}>
        <motion.div key={step} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -16 }} transition={{ duration: 0.3, ease: EASE }} className="mt-5">
          {step === "cart" && (
            <>
              <div className="rounded-xl bg-[#efe6d8] p-3">
                <p className="text-[12px]">{missing > 0 ? <>Te faltan <b>{missing} €</b> para el envío gratis</> : <>¡Tienes <b>envío gratis</b>!</>}</p>
                <div className="mt-2 h-1.5 overflow-clip rounded-full bg-[#2a2522]/10">
                  <motion.div className="h-full origin-left rounded-full bg-[#c0785a]" animate={{ scaleX: Math.min(1, subtotal / FREE_SHIPPING) }} transition={{ duration: 0.6, ease: EASE }} />
                </div>
              </div>
              <ul className="mt-3 divide-y divide-black/10">
                <AnimatePresence initial={false}>
                  {items.map((i) => (
                    <motion.li key={`${i.id}-${i.tone}`} layout exit={{ opacity: 0, x: 30 }} className="flex items-center gap-3 py-3">
                      <Piece shape={i.product.shape} tone={i.tone} className="size-14 shrink-0 rounded-lg bg-[#efe6d8]" />
                      <div className="min-w-0 flex-1 text-sm">
                        <p>{i.product.n}</p>
                        <div className="mt-1 flex items-center gap-2 text-xs text-[#2a2522]/60">
                          <button
                            type="button"
                            aria-label={`Quitar una unidad de ${i.product.n}`}
                            onClick={() =>
                              setLines((ls) => ls.flatMap((l) => (l.id === i.id && l.tone === i.tone ? (l.qty > 1 ? [{ ...l, qty: l.qty - 1 }] : []) : [l])))
                            }
                            className="grid size-5 place-items-center rounded-full border border-[#2a2522]/20"
                          >
                            −
                          </button>
                          {i.qty}
                          <button
                            type="button"
                            aria-label={`Añadir una unidad de ${i.product.n}`}
                            onClick={() => setLines((ls) => ls.map((l) => (l.id === i.id && l.tone === i.tone ? { ...l, qty: l.qty + 1 } : l)))}
                            className="grid size-5 place-items-center rounded-full border border-[#2a2522]/20"
                          >
                            +
                          </button>
                        </div>
                      </div>
                      <p className="font-mono text-sm">{i.product.p * i.qty} €</p>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </>
          )}

          {step === "shipping" && (
            <div className="grid gap-2.5">
              <p className="font-serif text-2xl">¿Dónde lo enviamos?</p>
              <input className={field} placeholder="Nombre y apellidos" aria-label="Nombre y apellidos" value={address.name} onChange={(e) => setAddress({ ...address, name: e.target.value })} />
              <input className={field} placeholder="Dirección" aria-label="Dirección" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
              <input className={field} placeholder="Ciudad" aria-label="Ciudad" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              <p className="text-[11px] text-[#2a2522]/55">Envío en 48–72 h en embalaje sin plástico.</p>
            </div>
          )}

          {step === "payment" && (
            <div>
              <p className="font-serif text-2xl">Pago seguro</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {(["Tarjeta", "Bizum"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    aria-pressed={method === m}
                    className={cn("rounded-xl border py-3 text-sm transition-colors", method === m ? "border-[#2a2522] bg-[#2a2522] text-[#faf6ef]" : "border-[#2a2522]/15 hover:border-[#2a2522]/40")}
                  >
                    {m}
                  </button>
                ))}
              </div>
              {method === "Tarjeta" ? (
                <div className="relative mt-3 flex aspect-[1.586] w-full max-w-[300px] flex-col justify-between overflow-clip rounded-2xl bg-[linear-gradient(135deg,#2a2522,#5a4a40)] p-5 font-mono text-[12px] text-[#faf6ef]/80 shadow-[0_20px_40px_-16px_rgba(42,37,34,0.6)]">
                  <Shutters strength={0.18} className="mix-blend-overlay" />
                  <span className="relative h-7 w-9 rounded-md bg-[linear-gradient(135deg,#e9c48f,#b8894d)]" aria-hidden />
                  <p className="relative tracking-[0.2em]">•••• •••• •••• 4242</p>
                  <p className="relative flex justify-between text-[10px]">
                    <span>{address.name.toUpperCase() || "TU NOMBRE"}</span>
                    <span>12/28</span>
                  </p>
                </div>
              ) : (
                <p className="mt-3 rounded-xl bg-[#efe6d8] p-3 text-[12px]">Recibirás una notificación de Bizum en tu móvil para confirmar el pago.</p>
              )}
              <p className="mt-2 text-[10px] text-[#2a2522]/50">Pago procesado de forma cifrada. No guardamos los datos de tu tarjeta.</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <dl className="mt-5 space-y-1 border-t border-black/10 pt-4 text-sm">
        <div className="flex justify-between text-[#2a2522]/60">
          <dt>Subtotal</dt>
          <dd className="font-mono">{subtotal.toFixed(2).replace(".", ",")} €</dd>
        </div>
        <div className="flex justify-between text-[#2a2522]/60">
          <dt>Envío</dt>
          <dd className="font-mono">{shipping ? `${shipping.toFixed(2).replace(".", ",")} €` : "Gratis"}</dd>
        </div>
        <div className="flex justify-between pt-1 text-base">
          <dt>Total <span className="text-[10px] text-[#2a2522]/50">IVA incluido</span></dt>
          <dd className="font-mono">{total.toFixed(2).replace(".", ",")} €</dd>
        </div>
      </dl>
      <div className="mt-5 flex gap-2">
        {step !== "cart" && (
          <button type="button" onClick={() => setStep(step === "payment" ? "shipping" : "cart")} className="rounded-xl px-3 text-sm text-[#2a2522]/60">
            ← Atrás
          </button>
        )}
        <button
          type="button"
          disabled={step === "shipping" && !addressOk}
          onClick={() => setStep(step === "cart" ? "shipping" : step === "shipping" ? "payment" : "done")}
          className="flex-1 rounded-xl bg-[#2a2522] py-3.5 text-sm text-white transition-opacity disabled:opacity-30"
        >
          {step === "cart" ? "Finalizar compra" : step === "shipping" ? "Continuar al pago" : `Pagar ${total.toFixed(2).replace(".", ",")} €`}
        </button>
      </div>
    </div>
  );
}
