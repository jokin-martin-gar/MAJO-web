import { useId } from "react";
import { cn } from "@/lib/utils";

/** MAJO mark: two offset quarter-arcs forming an ascending "M" — growth drawn as a single gesture. */
export function Logo({ className, tagline = true }: { className?: string; tagline?: boolean }) {
  const id = useId().replace(/:/g, "");
  const stroke = `majo-stroke-${id}`;
  const edge = `majo-edge-${id}`;
  const sheen = `majo-sheen-${id}`;
  const glow = `majo-glow-${id}`;

  return (
    <span className={cn("group/logo inline-flex items-center gap-3", className)}>
      <span className="relative grid size-10 place-items-center">
        {/* Soft brand halo behind the tile */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-[12px] bg-[conic-gradient(from_200deg,#8b7cff,#5ee6d0,#8b7cff)] opacity-40 blur-md transition-opacity duration-500 group-hover/logo:opacity-70"
        />
        <svg
          viewBox="0 0 40 40"
          className="relative size-10 transition-transform duration-500 ease-out group-hover/logo:-rotate-3 group-hover/logo:scale-[1.04]"
          aria-hidden
        >
          <defs>
            <linearGradient id={stroke} x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stopColor="#a497ff" />
              <stop offset="1" stopColor="#6ff0da" />
            </linearGradient>
            <linearGradient id={edge} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#8b7cff" stopOpacity="0.9" />
              <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.12" />
              <stop offset="1" stopColor="#5ee6d0" stopOpacity="0.9" />
            </linearGradient>
            <radialGradient id={sheen} cx="0.25" cy="0.15" r="0.9">
              <stop offset="0" stopColor="#2a2640" />
              <stop offset="0.6" stopColor="#14131c" />
              <stop offset="1" stopColor="#0c0c12" />
            </radialGradient>
            <filter id={glow} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="1.4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <rect width="40" height="40" rx="12" fill={`url(#${sheen})`} />
          <rect x="0.6" y="0.6" width="38.8" height="38.8" rx="11.4" fill="none" stroke={`url(#${edge})`} strokeWidth="1.2" />
          {/* Inner top highlight for a glassy bevel */}
          <path d="M8 2.2h24" stroke="#fff" strokeOpacity="0.18" strokeLinecap="round" />

          <path
            d="M9 29V17a5.5 5.5 0 0 1 11 0v12M20 23.5V17a5.5 5.5 0 0 1 11 0v12"
            fill="none"
            stroke={`url(#${stroke})`}
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter={`url(#${glow})`}
          />
        </svg>
      </span>

      <span className="flex flex-col leading-none">
        <span className="text-[21px] font-semibold tracking-[-0.045em] text-fg">
          MAJO
          <span className="ml-[1px] bg-gradient-to-br from-violet to-cyan bg-clip-text text-transparent">.</span>
        </span>
        {tagline && (
          <span className="mt-1 hidden font-mono text-[9.5px] uppercase tracking-[0.24em] text-muted sm:block">
            Estudio web
          </span>
        )}
      </span>
    </span>
  );
}
