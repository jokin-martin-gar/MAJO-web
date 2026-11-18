"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef } from "react";
import { EASE, cn } from "@/lib/utils";

/**
 * Film/paper grain as an inline SVG data URI (no image request). `alpha` sets its strength.
 * Static and non-fixed, so it costs nothing while scrolling.
 */
export function grain(alpha = 0.5, frequency = 0.85) {
  return `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='180' height='180'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='${frequency}' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${alpha} 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
}

/** Cross-fades between the simulated pages of a demo site and, like a real site, starts each page at the top. */
export function DemoPages({ page, children }: { page: string; children: React.ReactNode }) {
  const anchor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    // The anchor's parent is the demo's scroll container.
    anchor.current?.parentElement?.scrollTo({ top: 0 });
  }, [page]);
  return (
    <>
    <div ref={anchor} hidden />
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={page}
        initial={{ opacity: 0, y: 14, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -10, filter: "blur(6px)" }}
        transition={{ duration: 0.45, ease: EASE }}
        className="min-h-full"
      >
        {children}
      </motion.div>
    </AnimatePresence>
    </>
  );
}

type DemoNavProps<T extends string> = {
  pages: readonly T[];
  page: T;
  onChange: (p: T) => void;
  className?: string;
  activeClassName?: string;
  inactiveClassName?: string;
  layoutId: string;
  indicatorClassName?: string;
};

/** Nav links for a demo site with a shared-layout underline. */
export function DemoNav<T extends string>({
  pages,
  page,
  onChange,
  className,
  activeClassName,
  inactiveClassName,
  layoutId,
  indicatorClassName,
}: DemoNavProps<T>) {
  return (
    <div className={cn("flex items-center gap-4", className)}>
      {pages.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onChange(p)}
          aria-current={p === page ? "page" : undefined}
          className={cn("relative py-1 transition-colors", p === page ? activeClassName : inactiveClassName)}
        >
          {p}
          {p === page && (
            <motion.span
              layoutId={layoutId}
              className={cn("absolute inset-x-0 -bottom-0.5 h-px", indicatorClassName)}
              transition={{ type: "spring", stiffness: 380, damping: 30 }}
            />
          )}
        </button>
      ))}
    </div>
  );
}

/** Animated check mark used for confirmation states. */
export function CheckBurst({ className }: { className?: string }) {
  return (
    <motion.svg viewBox="0 0 52 52" className={cn("size-14", className)} aria-hidden>
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: EASE }}
      />
      <motion.path
        d="M15 27l7 7 15-16"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.45, ease: EASE }}
      />
    </motion.svg>
  );
}
