import { SectionIntro } from "@/components/ui/SectionIntro";
import { Reveal } from "@/components/ui/Reveal";
import { COMMITMENTS, DEMO_CONTENT, TESTIMONIALS } from "@/lib/content";
import { cn } from "@/lib/utils";

function QuoteCard({ q, a, r }: (typeof TESTIMONIALS)[number]) {
  return (
    <figure className="hairline-gradient w-[340px] shrink-0 rounded-3xl bg-ink-2 p-6 transition-colors duration-500 hover:bg-ink-3 sm:w-[400px]">
      <div className="mb-4 text-sm tracking-widest text-amber-300/90" aria-label="5 de 5 estrellas">
        ★★★★★
      </div>
      <blockquote className="text-[17px] leading-relaxed tracking-tight text-fg/90">“{q}”</blockquote>
      <figcaption className="mt-6 flex items-center gap-3">
        <span
          aria-hidden
          className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-violet/60 to-cyan/60 text-xs font-medium"
        >
          {a
            .split(" ")
            .map((w) => w[0])
            .join("")}
        </span>
        <span>
          <span className="block text-sm font-medium">{a}</span>
          <span className="block text-xs text-muted">{r}</span>
        </span>
      </figcaption>
    </figure>
  );
}

function Row({ items, reverse }: { items: typeof TESTIMONIALS; reverse?: boolean }) {
  return (
    <div className="mask-fade-x overflow-hidden">
      <div
        className={cn(
          "flex w-max animate-marquee gap-4 py-2 hover:[animation-play-state:paused] [--marquee-duration:70s]",
          reverse && "[animation-direction:reverse]",
        )}
      >
        {[...items, ...items].map((t, i) => (
          <div key={i} aria-hidden={i >= items.length}>
            <QuoteCard {...t} />
          </div>
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const half = Math.ceil(TESTIMONIALS.length / 2);
  return (
    <section className="relative overflow-hidden py-28 sm:py-40" aria-labelledby="social-title">
      <div className="container-x">
        <SectionIntro
          id="social-title"
          index="07"
          eyebrow="Prueba social"
          title="Lo que dicen cuando ya no necesitan ser amables."
          accent={["amables."]}
          align="center"
        />
        {DEMO_CONTENT && (
          <p className="mt-4 text-center font-mono text-[10px] text-subtle">Testimonios de ejemplo</p>
        )}
      </div>

      <div className="mt-16 space-y-4">
        <Row items={TESTIMONIALS.slice(0, half)} />
        <Row items={TESTIMONIALS.slice(half)} reverse />
      </div>

      <div className="container-x mt-20">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-line bg-line lg:grid-cols-4">
          {COMMITMENTS.map((c, i) => (
            <Reveal key={c.l} delay={i * 0.08} className="flex flex-col bg-ink p-7 sm:p-9">
              <dt className="order-2 mt-2 text-sm text-muted">{c.l}</dt>
              <dd className="text-[clamp(2.2rem,4vw,3.2rem)] font-medium leading-none tracking-[-0.05em]">{c.v}</dd>
            </Reveal>
          ))}
        </dl>
      </div>
    </section>
  );
}
