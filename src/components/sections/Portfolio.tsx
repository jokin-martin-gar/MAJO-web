"use client";

import { AnimatePresence, motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { EASE, cn } from "@/lib/utils";

// Each demo is its own chunk: they only load when the portfolio is reached.
const Loading = () => <div className="h-full animate-pulse bg-white/[0.03]" />;
const RestaurantDemo = dynamic(() => import("@/components/portfolio/demos/RestaurantDemo").then((m) => m.RestaurantDemo), { loading: Loading });
const DentalDemo = dynamic(() => import("@/components/portfolio/demos/DentalDemo").then((m) => m.DentalDemo), { loading: Loading });
const GymDemo = dynamic(() => import("@/components/portfolio/demos/GymDemo").then((m) => m.GymDemo), { loading: Loading });
const LawDemo = dynamic(() => import("@/components/portfolio/demos/LawDemo").then((m) => m.LawDemo), { loading: Loading });
const ShopDemo = dynamic(() => import("@/components/portfolio/demos/ShopDemo").then((m) => m.ShopDemo), { loading: Loading });

const PROJECTS = [
  {
    id: "koji",
    name: "Kōji",
    sector: "Restaurante",
    url: "kojibilbao.com",
    color: "#b91c1c",
    tone: "light" as const,
    Demo: RestaurantDemo,
    summary: "Reservas sin llamadas y una carta que abre el apetito.",
    metrics: [
      { v: "+221%", l: "Reservas online" },
      { v: "−71%", l: "No-shows" },
      { v: "41 €", l: "Ticket medio" },
    ],
    stack: ["Reservas 24/7", "Carta dinámica", "SEO local"],
  },
  {
    id: "arlanza",
    name: "Arlanza",
    sector: "Clínica dental",
    url: "clinicaarlanza.es",
    color: "#0ea5e9",
    tone: "light" as const,
    Demo: DentalDemo,
    summary: "Confianza médica desde el primer segundo, cita en tres toques.",
    metrics: [
      { v: "+184%", l: "Citas online" },
      { v: "4,9★", l: "Valoración" },
      { v: "−38%", l: "Coste/paciente" },
    ],
    stack: ["Agenda integrada", "Recordatorios WhatsApp", "Precios claros"],
  },
  {
    id: "forma",
    name: "Forma",
    sector: "Gimnasio",
    url: "formastudio.es",
    color: "#d4ff5c",
    tone: "dark" as const,
    Demo: GymDemo,
    summary: "Energía de marca deportiva y reservas de clase en tiempo real.",
    metrics: [
      { v: "+212", l: "Socios/90 días" },
      { v: "94%", l: "Ocupación" },
      { v: "71%", l: "Altas móvil" },
    ],
    stack: ["Horarios en vivo", "Pagos recurrentes", "Área de socios"],
  },
  {
    id: "vidal",
    name: "Vidal & Ros",
    sector: "Abogados",
    url: "vidalros.law",
    color: "#a8a29e",
    tone: "light" as const,
    Demo: LawDemo,
    summary: "Autoridad editorial y captación de consultas cualificadas.",
    metrics: [
      { v: "×3,4", l: "Consultas" },
      { v: "Top 3", l: "42 búsquedas" },
      { v: "3:12", l: "Min en web" },
    ],
    stack: ["Posicionamiento", "Formulario inteligente", "Blog jurídico"],
  },
  {
    id: "nacar",
    name: "Nácar",
    sector: "Ecommerce",
    url: "nacar.shop",
    color: "#d6b4a8",
    tone: "light" as const,
    Demo: ShopDemo,
    summary: "Cerámica artesanal que se siente de lujo y se compra en segundos.",
    metrics: [
      { v: "3,8%", l: "Conversión" },
      { v: "+62%", l: "Valor carrito" },
      { v: "0,7 s", l: "Carga" },
    ],
    stack: ["Checkout 1 paso", "Variantes visuales", "Stripe"],
  },
];

export function Portfolio() {
  const [active, setActive] = useState(0);
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  const project = PROJECTS[active];
  const { Demo } = project;

  return (
    <section id="portfolio" className="relative py-28 sm:py-40" aria-labelledby="portfolio-title">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ backgroundColor: project.color }}
          transition={{ duration: 1.2, ease: EASE }}
          className="absolute left-1/2 top-1/3 h-[700px] w-[1100px] -translate-x-1/2 rounded-full opacity-[0.09] blur-[140px]"
        />
      </div>

      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionIntro
            id="portfolio-title"
            index="05"
            eyebrow="Portfolio interactivo"
            title="No te lo enseñamos. Pruébalo."
            accent={["Pruébalo."]}
            lead="Cinco negocios, cinco experiencias. Navega, reserva, compra. Todo lo que ves funciona."
          />
          <div role="radiogroup" aria-label="Vista previa" className="flex shrink-0 gap-1 self-start rounded-full border border-line p-1 lg:self-auto">
            {(["desktop", "mobile"] as const).map((d) => (
              <button
                key={d}
                type="button"
                role="radio"
                aria-checked={device === d}
                onClick={() => setDevice(d)}
                className={cn(
                  "relative rounded-full px-4 py-1.5 text-xs transition-colors",
                  device === d ? "text-ink" : "text-muted hover:text-fg",
                )}
              >
                {device === d && (
                  <motion.span layoutId="device-pill" className="absolute inset-0 rounded-full bg-fg" transition={{ type: "spring", stiffness: 400, damping: 32 }} />
                )}
                <span className="relative">{d === "desktop" ? "Escritorio" : "Móvil"}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="mt-14 grid gap-8 lg:grid-cols-[280px_1fr] lg:gap-10">
          {/* Project index */}
          <div role="tablist" aria-label="Proyectos" aria-orientation="vertical" className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:flex-col lg:gap-0 lg:overflow-visible lg:px-0">
            {PROJECTS.map((p, i) => (
              <button
                key={p.id}
                type="button"
                role="tab"
                id={`tab-${p.id}`}
                aria-selected={active === i}
                aria-controls="portfolio-panel"
                onClick={() => setActive(i)}
                onKeyDown={(e) => {
                  const delta = e.key === "ArrowDown" || e.key === "ArrowRight" ? 1 : e.key === "ArrowUp" || e.key === "ArrowLeft" ? -1 : 0;
                  if (!delta) return;
                  e.preventDefault();
                  const next = (active + delta + PROJECTS.length) % PROJECTS.length;
                  setActive(next);
                  document.getElementById(`tab-${PROJECTS[next].id}`)?.focus();
                }}
                tabIndex={active === i ? 0 : -1}
                className={cn(
                  "group relative shrink-0 rounded-2xl px-4 py-3 text-left transition-colors lg:rounded-none lg:border-b lg:border-line lg:px-0 lg:py-5",
                  active === i ? "bg-white/[0.06] lg:bg-transparent" : "hover:bg-white/[0.03] lg:hover:bg-transparent",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-mono text-[10px] text-subtle">0{i + 1}</span>
                  <span
                    className="size-2 rounded-full transition-transform duration-500 group-hover:scale-150"
                    style={{ background: p.color }}
                  />
                  <span className={cn("text-lg font-medium tracking-tight transition-colors lg:text-2xl", active === i ? "text-fg" : "text-subtle group-hover:text-muted")}>
                    {p.name}
                  </span>
                </div>
                <p className={cn("mt-1 pl-[3.25rem] text-xs transition-colors", active === i ? "text-muted" : "text-subtle")}>{p.sector}</p>
                {active === i && (
                  <motion.span layoutId="project-bar" className="absolute bottom-[-1px] left-0 hidden h-px w-full bg-fg lg:block" transition={{ duration: 0.6, ease: EASE }} />
                )}
              </button>
            ))}

            <div className="mt-8 hidden lg:block">
              <AnimatePresence mode="wait">
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="text-sm leading-relaxed text-muted">{project.summary}</p>
                  <ul className="mt-4 flex flex-wrap gap-1.5">
                    {project.stack.map((s) => (
                      <li key={s} className="rounded-full border border-line px-2.5 py-1 text-[11px] text-muted">
                        {s}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Stage */}
          <div id="portfolio-panel" role="tabpanel" aria-labelledby={`tab-${project.id}`}>
            <motion.div
              layout
              transition={{ duration: 0.8, ease: EASE }}
              className={cn("mx-auto", device === "mobile" ? "max-w-[380px]" : "max-w-none")}
            >
              <BrowserFrame url={project.url} tone={project.tone}>
                <div className={cn("relative", device === "mobile" ? "h-[640px]" : "h-[560px] sm:h-[600px]")}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={project.id}
                      initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
                      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                      exit={{ opacity: 0, scale: 1.02, filter: "blur(10px)" }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="absolute inset-0"
                    >
                      <Demo />
                    </motion.div>
                  </AnimatePresence>
                </div>
              </BrowserFrame>
            </motion.div>

            <AnimatePresence mode="wait">
              <motion.dl
                key={project.id}
                className="mt-4 grid grid-cols-3 gap-3"
                initial="hidden"
                animate="show"
                exit="hidden"
                variants={{ show: { transition: { staggerChildren: 0.06 } } }}
              >
                {project.metrics.map((m) => (
                  <motion.div
                    key={m.l}
                    variants={{ hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0 } }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="rounded-2xl border border-line bg-ink-2/80 p-4 backdrop-blur"
                  >
                    <dt className="text-[11px] text-muted">{m.l}</dt>
                    <dd className="mt-1 text-xl font-medium tracking-tight sm:text-2xl">{m.v}</dd>
                  </motion.div>
                ))}
              </motion.dl>
            </AnimatePresence>
            <p className="mt-3 font-mono text-[10px] text-subtle">
              ↳ Proyectos conceptuales creados para demostrar nuestro proceso. Interactúa con ellos libremente.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
