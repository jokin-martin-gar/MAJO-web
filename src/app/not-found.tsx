import Link from "next/link";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center px-6 text-center">
      <div>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Error 404</p>
        <h1 className="mt-4 text-[clamp(3rem,10vw,7rem)] font-medium leading-none tracking-[-0.05em]">
          Esta página <span className="font-serif italic text-gradient">no existe.</span>
        </h1>
        <p className="mt-6 text-muted">Pero la tuya podría ser la mejor de tu sector.</p>
        <Link
          href="/"
          className="mt-10 inline-flex rounded-full bg-fg px-6 py-3 text-sm font-medium text-ink transition-transform hover:scale-105"
        >
          Volver al inicio
        </Link>
      </div>
    </main>
  );
}
