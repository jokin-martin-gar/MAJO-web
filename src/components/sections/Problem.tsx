"use client";

import { motion } from "framer-motion";
import { ScrollWords } from "@/components/ui/ScrollWords";
import { Reveal } from "@/components/ui/Reveal";
import { Counter } from "@/components/ui/Counter";
import { EASE } from "@/lib/utils";

const SYMPTOMS = [
  {
    value: 0.05,
    decimals: 2,
    suffix: " s",
    title: "Para juzgarte",
    body: "Es lo que tarda un visitante en formarse una opinión de tu negocio al ver tu web. No hay segunda oportunidad.",
  },
  {
    value: 75,
    decimals: 0,
    suffix: "%",
    title: "Juzga por el diseño",
    body: "Tres de cada cuatro personas deciden si un negocio es creíble a partir del aspecto de su web.",
  },
  {
    value: 53,
    decimals: 0,
    suffix: "%",
    title: "Se va si tarda",
    body: "Más de la mitad abandona una web móvil que tarda más de tres segundos en cargar. Directo a tu competencia.",
  },
];

export function Problem() {
  return (
    <section className="relative py-28 sm:py-40" aria-labelledby="problem-title">
      <div aria-hidden className="absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(255,138,76,0.08),transparent_60%)]" />
      <div className="container-x">
        <Reveal blur={false} y={12}>
          <p className="mb-10 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
            <span className="text-fg">02</span>
            <span className="h-px w-8 bg-line-strong" />
            El problema
          </p>
        </Reveal>

        <h2 id="problem-title" className="sr-only">
          El problema de las webs obsoletas
        </h2>
        <ScrollWords
          className="max-w-5xl text-[clamp(1.9rem,4.6vw,4rem)] font-medium leading-[1.1] tracking-[-0.035em]"
          accent={["invisible", "competencia"]}
          text="Tu cliente ya decidió si confía en ti. Lo hizo en una fracción de segundo, mirando una web que no te representa. Tu negocio es excelente, pero online es invisible — y cada día, alguien peor que tú se queda con clientes que deberían ser tuyos. No es culpa tuya. Es de tu web. Y la de tu competencia está mejorando."
        />

        <div className="mt-28 grid gap-px overflow-hidden rounded-3xl border border-line bg-line md:grid-cols-3">
          {SYMPTOMS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10% 0px" }}
              transition={{ duration: 0.9, ease: EASE, delay: i * 0.1 }}
              className="group relative bg-ink p-8 transition-colors duration-500 hover:bg-ink-2 sm:p-10"
            >
              <p className="text-[clamp(3rem,6vw,5rem)] font-medium leading-none tracking-[-0.05em] text-fg transition-colors duration-500 group-hover:text-ember">
                <Counter to={s.value} decimals={s.decimals} suffix={s.suffix} />
              </p>
              <h3 className="mt-6 text-lg font-medium tracking-tight">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{s.body}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-4 font-mono text-[10px] text-subtle">
          Fuentes: Lindgaard et al. (2006), Stanford Web Credibility Project, Google/SOASTA (2017).
        </p>
      </div>
    </section>
  );
}
