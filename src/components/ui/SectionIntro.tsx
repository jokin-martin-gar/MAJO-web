import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SplitWords } from "./SplitWords";

type SectionIntroProps = {
  /** Id for the heading, so the section can reference it with aria-labelledby. */
  id?: string;
  index: string;
  eyebrow: string;
  title: string;
  accent?: string[];
  lead?: string;
  align?: "left" | "center";
  className?: string;
  tone?: "dark" | "light";
};

/** Consistent editorial opening for every chapter: index · eyebrow, headline, lead. */
export function SectionIntro({
  id,
  index,
  eyebrow,
  title,
  accent,
  lead,
  align = "left",
  className,
  tone = "dark",
}: SectionIntroProps) {
  const centered = align === "center";
  return (
    <div className={cn("max-w-3xl", centered && "mx-auto text-center", className)}>
      <Reveal blur={false} y={12}>
        <p
          className={cn(
            "mb-6 flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em]",
            tone === "dark" ? "text-muted" : "text-black/50",
            centered && "justify-center",
          )}
        >
          <span className={tone === "dark" ? "text-fg" : "text-black"}>{index}</span>
          <span className={cn("h-px w-8", tone === "dark" ? "bg-line-strong" : "bg-black/20")} />
          {eyebrow}
        </p>
      </Reveal>
      <h2 id={id} className="text-balance text-[clamp(2.2rem,5.2vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.035em]">
        <SplitWords text={title} accent={accent} />
      </h2>
      {lead && (
        <Reveal delay={0.2}>
          <p
            className={cn(
              "mt-6 max-w-xl text-pretty text-lg leading-relaxed",
              tone === "dark" ? "text-muted" : "text-black/60",
              centered && "mx-auto",
            )}
          >
            {lead}
          </p>
        </Reveal>
      )}
    </div>
  );
}
