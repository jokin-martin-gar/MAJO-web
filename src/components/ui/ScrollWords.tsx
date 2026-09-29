"use client";

import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

type ScrollWordsProps = {
  text: string;
  className?: string;
  /** Words (punctuation stripped) that light up in the accent gradient. */
  accent?: string[];
};

/** Paragraph whose words light up one by one as it travels through the viewport. */
export function ScrollWords({ text, className, accent = [] }: ScrollWordsProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={cn("flex flex-wrap", className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          accent={accent.includes(word.replace(/[.,:;!?¿¡—]/g, ""))}
        >
          {word}
        </Word>
      ))}
    </p>
  );
}

function Word({
  children,
  progress,
  range,
  accent,
}: {
  children: string;
  progress: MotionValue<number>;
  range: [number, number];
  accent: boolean;
}) {
  const opacity = useTransform(progress, range, [0.12, 1]);
  const y = useTransform(progress, range, [6, 0]);
  return (
    <motion.span
      aria-hidden
      style={{ opacity, y }}
      className={cn("mr-[0.25em] inline-block", accent && "font-serif italic text-ember")}
    >
      {children}
    </motion.span>
  );
}
