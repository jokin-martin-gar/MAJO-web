import { cn } from "@/lib/utils";

type BrowserFrameProps = {
  url: string;
  children: React.ReactNode;
  className?: string;
  tone?: "dark" | "light";
};

/** Minimal, Arc-like browser chrome used to present the interactive demos. */
export function BrowserFrame({ url, children, className, tone = "dark" }: BrowserFrameProps) {
  const dark = tone === "dark";
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl shadow-[0_40px_120px_-30px_rgba(0,0,0,0.8)] ring-1",
        dark ? "bg-ink-3 ring-white/10" : "bg-white ring-black/10",
        className,
      )}
    >
      <div
        className={cn(
          "flex items-center gap-3 border-b px-4 py-2.5",
          dark ? "border-white/5 bg-white/[0.02]" : "border-black/5 bg-black/[0.02]",
        )}
      >
        <div className="flex gap-1.5" aria-hidden>
          <span className="size-2.5 rounded-full bg-[#ff5f57]/90" />
          <span className="size-2.5 rounded-full bg-[#febc2e]/90" />
          <span className="size-2.5 rounded-full bg-[#28c840]/90" />
        </div>
        <div
          className={cn(
            "mx-auto flex max-w-xs flex-1 items-center justify-center gap-1.5 truncate rounded-md px-3 py-1 font-mono text-[11px]",
            dark ? "bg-white/5 text-white/50" : "bg-black/5 text-black/50",
          )}
        >
          <svg aria-hidden viewBox="0 0 12 12" className="size-2.5 shrink-0" fill="currentColor">
            <path d="M3 5V3.5a3 3 0 0 1 6 0V5h.5A1.5 1.5 0 0 1 11 6.5v4A1.5 1.5 0 0 1 9.5 12h-7A1.5 1.5 0 0 1 1 10.5v-4A1.5 1.5 0 0 1 2.5 5H3Zm1.5 0h3V3.5a1.5 1.5 0 0 0-3 0V5Z" />
          </svg>
          {url}
        </div>
        <div className="w-[42px]" aria-hidden />
      </div>
      {children}
    </div>
  );
}
