"use client";

import { MotionConfig } from "framer-motion";
import { useEffect } from "react";
import Lenis from "lenis";

/**
 * Global client providers:
 *  - MotionConfig honours the user's reduced-motion preference everywhere.
 *  - Lenis gives the page its weighted, cinematic scroll (disabled for reduced motion).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({ duration: 1.15, smoothWheel: true, anchors: { offset: -80 } });
    let frame = requestAnimationFrame(function raf(time) {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    });

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
