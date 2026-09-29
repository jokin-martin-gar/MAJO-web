"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DemoPages } from "../shared";
import { cn } from "@/lib/utils";

type Product = { id: string; n: string; p: number; tones: string[]; shape: "vase" | "bowl" | "cup" | "plate" };

const PRODUCTS: Product[] = [
  { id: "v1", n: "Jarrón Ola", p: 86, tones: ["#e8d5c4", "#9ca3af", "#1f2937"], shape: "vase" },
  { id: "b1", n: "Cuenco Brisa", p: 42, tones: ["#c7d2c0", "#e8d5c4", "#b45309"], shape: "bowl" },
  { id: "c1", n: "Taza Nácar", p: 28, tones: ["#f5f0e8", "#d6b4a8", "#475569"], shape: "cup" },
  { id: "p1", n: "Plato Luna", p: 36, tones: ["#1f2937", "#e8d5c4", "#c7d2c0"], shape: "plate" },
];

type Line = { id: string; tone: string; qty: number };

/** Ceramic pieces drawn with CSS — no product photography needed. */
function Piece({ shape, tone, className }: { shape: Product["shape"]; tone: string; className?: string }) {
  const shade = `radial-gradient(circle at 35% 30%, rgba(255,255,255,0.55), transparent 45%), ${tone}`;
  return (
    <div className={cn("relative grid place-items-center", className)} aria-hidden>
      <div className="absolute bottom-[12%] h-[6%] w-[55%] rounded-full bg-black/15 blur-md" />
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
    </div>
  );
}

export function ShopDemo() {
  const [view, setView] = useState<"shop" | "product" | "cart">("shop");
  const [current, setCurrent] = useState<Product>(PRODUCTS[0]);
  const [cart, setCart] = useState<Line[]>([]);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  function add(product: Product, tone: string) {
    setCart((c) => {
      const found = c.find((l) => l.id === product.id && l.tone === tone);
      if (found) return c.map((l) => (l === found ? { ...l, qty: l.qty + 1 } : l));
      return [...c, { id: product.id, tone, qty: 1 }];
    });
  }

  return (
    <div className="@container flex h-full flex-col bg-[#faf7f2] text-[#2a2522]">
      <header className="flex items-center justify-between px-5 py-4 @xl:px-8">
        <button type="button" onClick={() => setView("shop")} className="text-lg font-light tracking-[0.3em]">
          NÁCAR
        </button>
        <div className="flex items-center gap-5 text-[12px]">
          <button
            type="button"
            onClick={() => setView("shop")}
            className={cn("hidden @md:inline", view === "shop" ? "text-[#2a2522]" : "text-[#2a2522]/50 hover:text-[#2a2522]")}
          >
            Colección
          </button>
          <button type="button" onClick={() => setView("cart")} className="relative flex items-center gap-1.5" aria-label={`Carrito, ${count} artículos`}>
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
                  className="absolute -right-2 -top-1.5 grid size-4 place-items-center rounded-full bg-[#2a2522] text-[9px] text-white"
                >
                  {count}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <DemoPages page={view === "product" ? `p-${current.id}` : view}>
          {view === "shop" && (
            <Shop
              onOpen={(p) => {
                setCurrent(p);
                setView("product");
              }}
              onQuickAdd={(p) => add(p, p.tones[0])}
            />
          )}
          {view === "product" && <ProductView product={current} onAdd={add} />}
          {view === "cart" && <Cart lines={cart} setLines={setCart} onBack={() => setView("shop")} />}
        </DemoPages>
      </div>
    </div>
  );
}

function Shop({ onOpen, onQuickAdd }: { onOpen: (p: Product) => void; onQuickAdd: (p: Product) => void }) {
  return (
    <div className="px-5 pb-8 @xl:px-8">
      <div className="flex items-end justify-between py-4">
        <p className="font-serif text-3xl italic">Colección Otoño</p>
        <p className="text-[11px] text-[#2a2522]/50">Hecho a mano en Sevilla</p>
      </div>
      <div className="grid grid-cols-2 gap-3 @xl:grid-cols-4">
        {PRODUCTS.map((p) => (
          <div key={p.id} className="group">
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-[#efe9df]">
              <button type="button" onClick={() => onOpen(p)} className="absolute inset-0" aria-label={`Ver ${p.n}`}>
                <Piece shape={p.shape} tone={p.tones[0]} className="size-full transition-transform duration-700 group-hover:scale-110" />
              </button>
              <button
                type="button"
                onClick={() => onQuickAdd(p)}
                className="absolute inset-x-2 bottom-2 translate-y-2 rounded-lg bg-[#2a2522] py-2 text-[11px] text-white opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100 focus:translate-y-0 focus:opacity-100"
              >
                Añadir rápido
              </button>
            </div>
            <div className="mt-2 flex justify-between text-xs">
              <span>{p.n}</span>
              <span className="text-[#2a2522]/60">{p.p} €</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProductView({ product, onAdd }: { product: Product; onAdd: (p: Product, tone: string) => void }) {
  const [tone, setTone] = useState(product.tones[0]);
  const [added, setAdded] = useState(false);

  return (
    <div className="grid gap-6 px-5 py-6 @xl:grid-cols-2 @xl:px-8">
      <motion.div layout className="aspect-square overflow-hidden rounded-2xl bg-[#efe9df]">
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
      </motion.div>
      <div className="flex flex-col justify-center">
        <p className="text-[11px] uppercase tracking-[0.2em] text-[#2a2522]/50">Gres esmaltado</p>
        <p className="mt-2 font-serif text-4xl">{product.n}</p>
        <p className="mt-2 text-lg">{product.p},00 €</p>
        <p className="mt-6 text-[11px] uppercase tracking-[0.2em] text-[#2a2522]/50">Esmalte</p>
        <div className="mt-2 flex gap-2">
          {product.tones.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTone(t)}
              aria-label={`Esmalte ${t}`}
              aria-pressed={tone === t}
              className={cn(
                "size-8 rounded-full ring-offset-2 ring-offset-[#faf7f2] transition-all",
                tone === t ? "ring-2 ring-[#2a2522]" : "ring-1 ring-black/10 hover:scale-110",
              )}
              style={{ background: t }}
            />
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            onAdd(product, tone);
            setAdded(true);
            setTimeout(() => setAdded(false), 1400);
          }}
          className="relative mt-8 overflow-hidden rounded-xl bg-[#2a2522] py-3.5 text-sm text-white"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={added ? "ok" : "add"}
              initial={{ y: 16, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -16, opacity: 0 }}
              className="block"
            >
              {added ? "Añadido ✓" : "Añadir al carrito"}
            </motion.span>
          </AnimatePresence>
        </button>
        <p className="mt-3 text-center text-[11px] text-[#2a2522]/50">Envío gratis desde 60 € · Devolución 30 días</p>
      </div>
    </div>
  );
}

function Cart({
  lines,
  setLines,
  onBack,
}: {
  lines: Line[];
  setLines: React.Dispatch<React.SetStateAction<Line[]>>;
  onBack: () => void;
}) {
  const items = lines.map((l) => ({ ...l, product: PRODUCTS.find((p) => p.id === l.id)! }));
  const total = items.reduce((s, i) => s + i.product.p * i.qty, 0);

  if (items.length === 0) {
    return (
      <div className="px-5 py-16 text-center">
        <p className="font-serif text-3xl italic">Tu carrito está vacío</p>
        <button type="button" onClick={onBack} className="mt-4 text-xs underline">
          Descubrir la colección
        </button>
      </div>
    );
  }

  return (
    <div className="px-5 py-6 @xl:px-8">
      <p className="font-serif text-3xl">Tu carrito</p>
      <ul className="mt-4 divide-y divide-black/10">
        <AnimatePresence initial={false}>
          {items.map((i) => (
            <motion.li
              key={`${i.id}-${i.tone}`}
              layout
              exit={{ opacity: 0, x: 30 }}
              className="flex items-center gap-4 py-3"
            >
              <Piece shape={i.product.shape} tone={i.tone} className="size-14 shrink-0 rounded-lg bg-[#efe9df]" />
              <div className="flex-1 text-sm">
                <p>{i.product.n}</p>
                <p className="text-xs text-[#2a2522]/50">Cantidad: {i.qty}</p>
              </div>
              <p className="font-mono text-sm">{i.product.p * i.qty} €</p>
              <button
                type="button"
                onClick={() => setLines((ls) => ls.filter((l) => !(l.id === i.id && l.tone === i.tone)))}
                className="text-xs text-[#2a2522]/40 hover:text-[#2a2522]"
                aria-label={`Quitar ${i.product.n}`}
              >
                ✕
              </button>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
      <div className="mt-4 flex justify-between border-t border-black/10 pt-4">
        <span className="text-sm">Total</span>
        <span className="font-mono text-lg">{total},00 €</span>
      </div>
      <button type="button" className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-black py-3.5 text-sm text-white">
        Pagar de forma segura
      </button>
    </div>
  );
}
