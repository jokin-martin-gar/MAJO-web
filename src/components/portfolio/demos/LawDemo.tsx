"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CheckBurst, DemoNav, DemoPages } from "../shared";
import { cn } from "@/lib/utils";

const PAGES = ["Despacho", "Áreas", "Consulta"] as const;
type Page = (typeof PAGES)[number];

const AREAS = [
  { n: "Derecho mercantil", d: "Operaciones societarias, fusiones, pactos de socios y reestructuraciones empresariales." },
  { n: "Litigación y arbitraje", d: "Defensa en procedimientos civiles y mercantiles complejos ante tribunales y cortes arbitrales." },
  { n: "Derecho laboral", d: "Asesoramiento estratégico a dirección: despidos, ERE, alta dirección y compliance laboral." },
  { n: "Herencias y patrimonio", d: "Planificación sucesoria y protección del patrimonio familiar y empresarial." },
];

export function LawDemo() {
  const [page, setPage] = useState<Page>("Despacho");
  return (
    <div className="@container flex h-full flex-col bg-[#f2efe9] text-[#1c1917]">
      <header className="flex items-center justify-between border-b border-[#1c1917]/10 px-5 py-4 @xl:px-8">
        <span className="font-serif text-lg tracking-tight">
          Vidal <span className="italic">&amp;</span> Ros
        </span>
        <DemoNav
          pages={PAGES}
          page={page}
          onChange={setPage}
          layoutId="vr-nav"
          className="text-[11px] uppercase tracking-[0.18em]"
          activeClassName="text-[#1c1917]"
          inactiveClassName="text-[#1c1917]/45 hover:text-[#1c1917]"
          indicatorClassName="bg-[#1c1917]"
        />
      </header>
      <div className="flex-1 overflow-y-auto no-scrollbar">
        <DemoPages page={page}>
          {page === "Despacho" && <Home onCta={() => setPage("Consulta")} />}
          {page === "Áreas" && <Areas />}
          {page === "Consulta" && <Consult />}
        </DemoPages>
      </div>
    </div>
  );
}

function Home({ onCta }: { onCta: () => void }) {
  return (
    <div className="px-5 py-10 @xl:px-8 @xl:py-14">
      <p className="text-[10px] uppercase tracking-[0.3em] text-[#1c1917]/50">Madrid · Desde 1984</p>
      <h3 className="mt-5 max-w-[16ch] font-serif text-[clamp(2.1rem,6.5cqw,3.8rem)] leading-[1] tracking-[-0.02em]">
        Cuarenta años resolviendo lo que otros <span className="italic">no se atreven</span> a asumir.
      </h3>
      <div className="mt-8 flex flex-wrap items-center gap-5">
        <button
          type="button"
          onClick={onCta}
          className="group flex items-center gap-3 border-b border-[#1c1917] pb-1 text-sm"
        >
          Solicitar una primera consulta
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </button>
      </div>
      <div className="mt-12 grid grid-cols-3 border-t border-[#1c1917]/15">
        {[
          ["1.800+", "asuntos resueltos"],
          ["92%", "éxito en litigios"],
          ["24", "abogados"],
        ].map(([v, l]) => (
          <div key={l} className="border-r border-[#1c1917]/15 py-4 pr-3 last:border-r-0 [&:not(:first-child)]:pl-4">
            <p className="font-serif text-3xl">{v}</p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.15em] text-[#1c1917]/50">{l}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function Areas() {
  const [open, setOpen] = useState(0);
  return (
    <ul className="px-5 py-6 @xl:px-8">
      {AREAS.map((a, i) => (
        <li key={a.n} className="border-b border-[#1c1917]/15">
          <button
            type="button"
            onClick={() => setOpen(open === i ? -1 : i)}
            aria-expanded={open === i}
            className="flex w-full items-center justify-between gap-4 py-5 text-left"
          >
            <span className="flex items-baseline gap-4">
              <span className="font-mono text-[10px] text-[#1c1917]/40">0{i + 1}</span>
              <span className={cn("font-serif text-2xl transition-all", open === i && "italic")}>{a.n}</span>
            </span>
            <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-xl font-light">
              +
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.p
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden pl-8 text-sm leading-relaxed text-[#1c1917]/60"
              >
                <span className="block pb-5">{a.d}</span>
              </motion.p>
            )}
          </AnimatePresence>
        </li>
      ))}
    </ul>
  );
}

function Consult() {
  const [area, setArea] = useState<string | null>(null);
  const [urgent, setUrgent] = useState(false);
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div className="flex flex-col items-center px-5 py-16 text-center">
        <CheckBurst className="text-[#1c1917]" />
        <p className="mt-5 font-serif text-3xl">Consulta recibida</p>
        <p className="mt-2 max-w-xs text-sm text-[#1c1917]/60">
          Un socio especialista en {area?.toLowerCase()} le llamará {urgent ? "en menos de 2 horas" : "hoy mismo"}.
        </p>
      </div>
    );
  }

  return (
    <div className="px-5 py-8 @xl:px-8">
      <p className="font-serif text-3xl">¿En qué podemos ayudarle?</p>
      <p className="mt-1 text-sm text-[#1c1917]/55">Confidencial. Sin compromiso.</p>
      <div className="mt-6 flex flex-wrap gap-2">
        {AREAS.map((a) => (
          <button
            key={a.n}
            type="button"
            onClick={() => setArea(a.n)}
            aria-pressed={area === a.n}
            className={cn(
              "rounded-full border px-3.5 py-2 text-xs transition-colors",
              area === a.n ? "border-[#1c1917] bg-[#1c1917] text-[#f2efe9]" : "border-[#1c1917]/20 hover:border-[#1c1917]/60",
            )}
          >
            {a.n}
          </button>
        ))}
      </div>
      <label className="mt-6 flex cursor-pointer items-center gap-3 text-sm">
        <button
          type="button"
          role="switch"
          aria-checked={urgent}
          onClick={() => setUrgent((u) => !u)}
          className={cn("relative h-6 w-11 rounded-full transition-colors", urgent ? "bg-[#1c1917]" : "bg-[#1c1917]/20")}
        >
          <motion.span
            layout
            className={cn("absolute top-1 size-4 rounded-full bg-white", urgent ? "right-1" : "left-1")}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
        Es urgente
      </label>
      <button
        type="button"
        disabled={!area}
        onClick={() => setSent(true)}
        className="mt-8 w-full bg-[#1c1917] py-3.5 text-xs uppercase tracking-[0.2em] text-[#f2efe9] transition-opacity disabled:opacity-30"
      >
        Solicitar llamada
      </button>
    </div>
  );
}
