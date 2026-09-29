import { site } from "@/lib/site";
import { Logo } from "@/components/ui/Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative overflow-hidden border-t border-line pt-16">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-10 md:flex-row">
          <div className="max-w-xs">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">
              {site.tagline}. Diseñamos webs que convierten negocios locales en la referencia de su sector.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-10 text-sm sm:grid-cols-3">
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Estudio</p>
              <ul className="space-y-2">
                {site.nav.map((l) => (
                  <li key={l.href}>
                    <a href={l.href} className="text-muted transition-colors hover:text-fg">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Contacto</p>
              <ul className="space-y-2">
                <li>
                  <a href={`mailto:${site.email}`} className="text-muted transition-colors hover:text-fg">
                    {site.email}
                  </a>
                </li>
                <li>
                  <a href="#contacto" className="text-muted transition-colors hover:text-fg">
                    Pedir propuesta
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-subtle">Legal</p>
              <ul className="space-y-2 text-muted">
                <li>Aviso legal</li>
                <li>Privacidad</li>
                <li>Cookies</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col justify-between gap-2 border-t border-line py-6 text-xs text-subtle sm:flex-row">
          <p>
            © {year} {site.legalName}. Todos los derechos reservados.
          </p>
          <p className="flex items-center gap-2">
            <span className="size-1.5 animate-pulse-soft rounded-full bg-cyan" /> Diseñado y construido a mano.
          </p>
        </div>
      </div>

      {/* Monumental wordmark */}
      <p
        aria-hidden
        className="pointer-events-none select-none bg-gradient-to-b from-white/[0.09] to-transparent bg-clip-text text-center text-[28vw] font-semibold leading-[0.75] tracking-[-0.08em] text-transparent"
      >
        MAJO
      </p>
    </footer>
  );
}
