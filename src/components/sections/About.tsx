import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { Completar } from "@/components/ui/Completar";
import { VALUES } from "@/lib/content";

/**
 * Who we are. Team details are placeholders on purpose: only the studio can fill them in.
 * Duplicate or remove entries in TEAM to match the real team.
 */
const TEAM = [
  { name: "nombre y apellido", role: "rol, p. ej. Diseño y dirección de arte", bio: "una o dos frases sobre tu experiencia" },
  { name: "nombre y apellido", role: "rol, p. ej. Desarrollo", bio: "una o dos frases sobre tu experiencia" },
];

export function About() {
  return (
    <section id="nosotros" className="relative py-28 sm:py-40" aria-labelledby="about-title">
      <div className="container-x">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <div>
            <SectionIntro
              id="about-title"
              index="06"
              eyebrow="Quiénes somos"
              title="Un estudio pequeño, a propósito."
              accent={["propósito."]}
              lead="MAJO nace para que los negocios locales tengan webs con el mismo cuidado que las grandes marcas. Somos pocos, y es una ventaja: cada proyecto lo llevamos nosotros de principio a fin."
            />
            <Reveal delay={0.25}>
              <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted">
                Trabajamos desde <Completar>ciudad</Completar> con negocios de toda España.
              </p>
            </Reveal>
          </div>

          <ul className="grid content-start gap-4">
            {TEAM.map((p, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <li className="hairline-gradient flex gap-5 rounded-3xl bg-ink-2 p-6">
                  <span
                    aria-hidden
                    className="grid size-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet/25 to-cyan/25 text-violet-ink"
                  >
                    {/* Swap for a real photo (next/image) when available. */}
                    <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.6">
                      <circle cx="12" cy="8.5" r="3.5" />
                      <path d="M5 20c1.2-3.6 3.8-5.5 7-5.5s5.8 1.9 7 5.5" strokeLinecap="round" />
                    </svg>
                  </span>
                  <div className="min-w-0 space-y-1.5">
                    <p className="font-medium">
                      <Completar>{p.name}</Completar>
                    </p>
                    <p className="text-sm text-muted">
                      <Completar>{p.role}</Completar>
                    </p>
                    <p className="text-sm text-muted">
                      <Completar>{p.bio}</Completar>
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>

        <div className="mt-20 grid gap-4 md:grid-cols-3">
          {VALUES.map((v, i) => (
            <Reveal key={v.t} delay={i * 0.08} className="rounded-3xl border border-line p-7">
              <p className="font-mono text-[11px] text-subtle">0{i + 1}</p>
              <h3 className="mt-4 text-xl font-medium tracking-tight">{v.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.d}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
