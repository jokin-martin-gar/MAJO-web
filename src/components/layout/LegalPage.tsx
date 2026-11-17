import Link from "next/link";
import { Logo } from "@/components/ui/Logo";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/lib/site";

/** Shared, quiet layout for legal pages: readable column, link back home, regular footer. */
export function LegalPage({ title, updated, children }: { title: string; updated: React.ReactNode; children: React.ReactNode }) {
  return (
    <>
      <header className="container-x flex items-center justify-between py-6">
        <Link href="/" aria-label={`${site.name}, volver al inicio`}>
          <Logo />
        </Link>
        <Link href="/" className="rounded-full border border-line px-4 py-2 text-sm text-muted transition-colors hover:text-fg">
          ← Volver a la web
        </Link>
      </header>
      <main id="contenido" className="container-x pb-28 pt-12 sm:pt-20">
        <article className="mx-auto max-w-2xl">
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted">Legal</p>
          <h1 className="mt-4 text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.035em]">{title}</h1>
          <p className="mt-4 text-sm text-muted">Última actualización: {updated}</p>
          <div className="legal-prose mt-12 space-y-5 text-[17px] leading-relaxed text-fg/85 [&_a]:text-violet-ink [&_a]:underline [&_a]:underline-offset-4 [&_h2]:mt-12 [&_h2]:text-2xl [&_h2]:font-medium [&_h2]:tracking-tight [&_h2]:text-fg [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
