/**
 * Visible placeholder for information only the studio can provide (names, prices, conditions…).
 * Search the code for "COMPLETAR" to find every pending one. Listed in MEJORAS.md.
 */
export function Completar({ children }: { children: React.ReactNode }) {
  return (
    <mark className="rounded-md bg-amber-200/80 px-1.5 py-0.5 font-mono text-[0.8em] font-normal not-italic tracking-normal text-amber-950 decoration-clone">
      [COMPLETAR: {children}]
    </mark>
  );
}
