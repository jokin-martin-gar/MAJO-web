import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { Completar } from "@/components/ui/Completar";
import { ArrowIcon, MagneticButton } from "@/components/ui/MagneticButton";
import { COMMITMENTS } from "@/lib/content";

/**
 * Honest replacement for social proof: we're starting out, and we say so —
 * with a concrete offer for the first clients and commitments anyone can verify.
 */
export function FoundingClients() {
  const offer = [
    {
      t: "Precio de lanzamiento",
      d: (
        <>
          <Completar>descuento, p. ej. −20 %</Completar> sobre nuestra tarifa habitual, por escrito en el presupuesto.
        </>
      ),
    },
    {
      t: "Mantenimiento incluido",
      d: (
        <>
          <Completar>número de meses</Completar> de mantenimiento, seguridad y copias de seguridad sin coste.
        </>
      ),
    },
    {
      t: "Atención prioritaria",
      d: "Sois pocos y lo notarás: respuesta rápida y acceso directo a quien diseña y programa tu web.",
    },
  ];

  return (
    <section id="primeros-clientes" className="relative py-28 sm:py-40" aria-labelledby="founding-title">
      <div className="container-x">
        <div className="theme-dark relative isolate overflow-hidden rounded-[32px] bg-ink px-6 py-14 text-fg sm:px-12 sm:py-20">
          <div
            aria-hidden
            className="absolute -right-40 -top-40 -z-10 size-[640px] rounded-full bg-[radial-gradient(closest-side,rgba(139,124,255,0.35),transparent)]"
          />
          <div
            aria-hidden
            className="absolute -bottom-48 -left-32 -z-10 size-[520px] rounded-full bg-[radial-gradient(closest-side,rgba(94,230,208,0.18),transparent)]"
          />

          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <SectionIntro
                id="founding-title"
                index="07"
                eyebrow="Estamos empezando"
                title="Sé de nuestros primeros clientes."
                accent={["primeros"]}
                lead="No vamos a enseñarte testimonios que todavía no tenemos. Preferimos ser claros: estamos buscando los primeros negocios con los que trabajar, y queremos que salga muy bien. Por eso les ofrecemos condiciones que no volveremos a ofrecer."
              />
              <Reveal delay={0.3} className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                <MagneticButton href="#contacto">
                  Quiero ser de los primeros <ArrowIcon />
                </MagneticButton>
                <p className="text-sm text-muted">
                  Plazas con estas condiciones: <Completar>número</Completar>
                </p>
              </Reveal>
            </div>

            <ul className="grid content-start gap-3">
              {offer.map((o, i) => (
                <Reveal key={o.t} delay={0.1 + i * 0.08}>
                  <li className="rounded-2xl border border-line bg-fg/[0.04] p-6">
                    <h3 className="flex items-center gap-3 text-lg font-medium tracking-tight">
                      <span className="grid size-6 place-items-center rounded-full bg-cyan/15 text-cyan-ink" aria-hidden>
                        <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="m3.5 8.5 3 3 6-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                      {o.t}
                    </h3>
                    <p className="mt-2 pl-9 text-sm leading-relaxed text-muted">{o.d}</p>
                  </li>
                </Reveal>
              ))}
              <Reveal delay={0.4}>
                <li className="rounded-2xl border border-dashed border-line-strong p-6">
                  <h3 className="text-lg font-medium tracking-tight">Qué te pedimos a cambio</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    Tu opinión sincera al terminar y, solo si te gusta el resultado, permiso para enseñar el proyecto
                    como uno de nuestros trabajos.
                  </p>
                </li>
              </Reveal>
            </ul>
          </div>
        </div>

        {/* Commitments: true for every client, from the very first one. */}
        <div className="mt-16">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Nuestros compromisos</p>
          <dl className="grid grid-cols-1 gap-px overflow-hidden rounded-3xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {COMMITMENTS.map((c, i) => (
              <Reveal key={c.l} delay={i * 0.08} className="flex flex-col bg-ink-2 p-7 sm:p-9">
                <dt className="order-2 mt-3 text-sm leading-relaxed text-muted">{c.l}</dt>
                <dd className="text-[clamp(2rem,3.4vw,2.8rem)] font-medium leading-none tracking-[-0.05em]">{c.v}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
