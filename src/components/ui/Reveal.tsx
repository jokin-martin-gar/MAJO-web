"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { EASE } from "@/lib/utils";

type RevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
  y?: number;
  /** Opt-in: blurring on reveal repaints every frame, so it's off by default for scroll reveals. */
  blur?: boolean;
};

/** Fades and lifts its children the first time they enter the viewport. */
export function Reveal({ delay = 0, y = 24, blur = false, children, ...rest }: RevealProps) {
  return (
    <motion.div
      initial={blur ? { opacity: 0, y, filter: "blur(8px)" } : { opacity: 0, y }}
      whileInView={blur ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10% 0px" }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}
