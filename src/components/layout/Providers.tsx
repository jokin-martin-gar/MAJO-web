"use client";

import { MotionConfig } from "framer-motion";

/**
 * Global client providers:
 *  - MotionConfig honours the user's reduced-motion preference everywhere.
 *
 * Scrolling is deliberately native: it responds on the very first frame, and every scroll-linked
 * animation (Framer Motion's useScroll) follows it without an extra interpolation layer.
 * Smooth anchor jumps are handled in CSS (see `scroll-behavior` in globals.css).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
