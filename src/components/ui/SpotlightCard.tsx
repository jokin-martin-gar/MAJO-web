"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";

type SpotlightCardProps = React.HTMLAttributes<HTMLDivElement> & {
  glow?: string;
};

/**
 * Surface that is lit by the cursor: a soft radial light follows the pointer and the border
 * picks up the same highlight. Pure CSS variables — no re-renders on mouse move.
 */
export function SpotlightCard({
  className,
  children,
  glow = "rgba(139,124,255,0.18)",
  ...rest
}: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      className={cn(
        "group/spot hairline-gradient relative overflow-hidden rounded-3xl bg-ink-2",
        className,
      )}
      style={{ ["--glow" as string]: glow }}
      {...rest}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/spot:opacity-100"
        style={{
          background:
            "radial-gradient(520px circle at var(--mx, 50%) var(--my, 50%), var(--glow), transparent 45%)",
        }}
      />
      {children}
    </div>
  );
}
