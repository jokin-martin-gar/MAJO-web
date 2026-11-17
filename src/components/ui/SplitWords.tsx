"use client";

import { motion } from "framer-motion";
import { EASE, cn } from "@/lib/utils";

type SplitWordsProps = {
  text: string;
  className?: string;
  /** Words (exact match, punctuation stripped) rendered in the italic serif accent. */
  accent?: string[];
  delay?: number;
  stagger?: number;
  /** Animate on mount instead of on scroll into view. */
  immediate?: boolean;
};

/**
 * Word-by-word cinematic reveal (lift + blur). Screen readers get the full sentence once,
 * the animated spans are hidden from the accessibility tree.
 */
export function SplitWords({
  text,
  className,
  accent = [],
  delay = 0,
  stagger = 0.06,
  immediate = false,
}: SplitWordsProps) {
  const words = text.split(" ");
  // Blur is only used for the on-load reveal. Scroll-triggered reveals stick to transform +
  // opacity, which the compositor animates without repainting while the page is moving.
  const hidden = immediate
    ? { y: "105%", opacity: 0, filter: "blur(10px)" }
    : { y: "105%", opacity: 0 };
  const show = immediate ? { y: "0%", opacity: 1, filter: "blur(0px)" } : { y: "0%", opacity: 1 };
  const trigger = immediate
    ? { animate: "show" as const }
    : { whileInView: "show" as const, viewport: { once: true, margin: "-10% 0px" } };

  return (
    <span className={cn("inline", className)}>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden
        initial="hidden"
        {...trigger}
        transition={{ staggerChildren: stagger, delayChildren: delay }}
      >
        {words.map((word, i) => {
          const isAccent = accent.includes(word.replace(/[.,:;!?¿¡]/g, ""));
          return (
            <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
              <motion.span
                className={cn(
                  "inline-block",
                  isAccent && "font-serif italic font-normal tracking-normal text-gradient",
                )}
                variants={{ hidden, show }}
                transition={{ duration: 1.1, ease: EASE }}
              >
                {word}
              </motion.span>
              {i < words.length - 1 && " "}
            </span>
          );
        })}
      </motion.span>
    </span>
  );
}
