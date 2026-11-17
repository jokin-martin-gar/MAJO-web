import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  url: string;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
  /** Visible label in the toolbar, e.g. "Proyecto conceptual". */
  badge?: string;
};

/** Minimal, Arc-like browser chrome used to present the interactive demos. */
export function BrowserFrame({ url, children, className, tone = "dark", badge }: BrowserFrameProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl shadow-[0_30px_80px_-30px_rgba(30,25,60,0.35)] ring-1",
        dark ? "bg-[#111117] ring-white/10" : "bg-white ring-black/10",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-2.5",
          dark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-black/[0.02]",
        )}
      >
        <div className="flex shrink-0 gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
          <span className="size-2.5 rounded-full bg-[#28c840]/90" />
        </div>
        <div
          className={cn(
            "mx-auto flex min-w-0 max-w-xs flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1 font-mono text-[11px]",
            dark ? "bg-white/5 text-white/60" : "bg-black/5 text-black/60",
          )}
        >
          <svg aria-hidden viewBox="0 0 12 12" className="size-2.5 shrink-0" fill="currentColor">
            <path d="M3 5V3.5a3 3 0 0 1 6 0V5h.5A1.5 1.5 0 0 1 11 6.5v4A1.5 1.5 0 0 1 9.5 12h-7A1.5 1.5 0 0 1 1 10.5v-4A1.5 1.5 0 0 1 2.5 5H3Zm1.5 0h3V3.5a1.5 1.5 0 0 0-3 0V5Z" />
          </svg>
          <span className="truncate">{url}</span>
        </div>
        {badge ? (
          <span className="shrink-0 rounded-full bg-gradient-to-r from-[#6d5ef0] to-[#0f8f7f] px-2.5 py-1 text-[10px] font-medium tracking-wide text-white">
            {badge}
          </span>
        ) : (
          <div className="w-[42px] shrink-0" aria-hidden />
        )}
      </div>
      {children}
    </div>
  );
}
