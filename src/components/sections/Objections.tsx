"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useId, useState } from "react";
import { SectionIntro } from "@/components/ui/SectionIntro";
import { OBJECTIONS } from "@/lib/content";
import { EASE, cn } from "@/lib/utils";

export function Objections() {
  const [open, setOpen] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="preguntas" className="relative py-28 sm:py-40" aria-labelledby="faq-title">
      <div className="container-x grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionIntro
            id="faq-title"
            index="08"
            eyebrow="Sin letra pequeña"
            title="Lo que probablemente estás pensando ahora mismo."
            accent={["pensando"]}
            lead="Son las mismas dudas que tenían todos nuestros clientes antes de empezar. Estas son las respuestas honestas."
          />
        </div>

        <ul className="border-t border-line">
          {OBJECTIONS.map((item, i) => {
            const isOpen = open === i;
            const panelId = `${baseId}-panel-${i}`;
            const buttonId = `${baseId}-button-${i}`;
            return (
              <li key={item.q} className="border-b border-line">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-7 text-left"
                  >
                    <span
                      className={cn(
                        "text-[clamp(1.15rem,2vw,1.5rem)] font-medium tracking-[-0.02em] transition-colors duration-300",
                        isOpen ? "text-fg" : "text-muted group-hover:text-fg",
                      )}
                    >
                      {item.q}
                    </span>
                    <span
                      className={cn(
                        "relative grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500",
                        isOpen ? "rotate-45 border-fg bg-fg text-ink" : "border-line-strong group-hover:border-fg",
                      )}
                      aria-hidden
                    >
                      <svg viewBox="0 0 16 16" className="size-3.5" stroke="currentColor" strokeWidth="1.6">
                        <path d="M8 2v12M2 8h12" strokeLinecap="round" />
                      </svg>
                    </span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={buttonId}
                      initial={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                      animate={{ height: "auto", opacity: 1, filter: "blur(0px)" }}
                      exit={{ height: 0, opacity: 0, filter: "blur(4px)" }}
                      transition={{ duration: 0.5, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl pb-8 pr-16 text-[17px] leading-relaxed text-muted">{item.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
