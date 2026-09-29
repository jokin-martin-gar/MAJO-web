import { cn } from "@/lib/utils";

/** MAJO mark: two offset quarter-arcs forming an ascending "M" — growth drawn as a single gesture. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2.5", className)}>
      <svg viewBox="0 0 32 32" className="size-7" aria-hidden>
        <defs>
          <linearGradient id="majo-g" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#8b7cff" />
            <stop offset="1" stopColor="#5ee6d0" />
          </linearGradient>
        </defs>
        <rect width="32" height="32" rx="9" fill="#111117" />
        <rect x="0.5" y="0.5" width="31" height="31" rx="8.5" fill="none" stroke="rgba(255,255,255,0.12)" />
        <path
          d="M7 23V13.5a4.5 4.5 0 0 1 9 0V23M16 18.5V13.5a4.5 4.5 0 0 1 9 0V23"
          fill="none"
          stroke="url(#majo-g)"
          strokeWidth="2.6"
          strokeLinecap="round"
        />
      </svg>
      <span className="text-[17px] font-semibold tracking-[-0.04em]">MAJO</span>
    </span>
  );
}
