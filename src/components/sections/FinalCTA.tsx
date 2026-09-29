"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SplitWords } from "@/components/ui/SplitWords";
import { Reveal } from "@/components/ui/Reveal";
import { CheckBurst } from "@/components/portfolio/shared";
import { BUDGETS, BUSINESS_TYPES, validateContact, type ContactErrors } from "@/lib/contact";
import { site } from "@/lib/site";
import { EASE, cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent" | "error";

export function FinalCTA() {
  return (
    <section id="contacto" className="relative isolate overflow-hidden pb-16 pt-32 sm:pt-44" aria-labelledby="cta-title">
      <div aria-hidden className="absolute inset-0 -z-10">
        <div className="absolute bottom-[-30%] left-1/2 h-[900px] w-[1500px] -translate-x-1/2 animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(139,124,255,0.3),rgba(94,230,208,0.08)_60%,transparent)] blur-3xl" />
        <div className="absolute inset-0 bg-grid opacity-50 mask-radial" />
      </div>

      <div className="container-x">
        <div className="mx-auto max-w-5xl text-center">
          <Reveal blur={false} y={12}>
            <p className="mb-8 inline-flex items-center gap-2 rounded-full glass px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
              <span className="size-1.5 animate-pulse-soft rounded-full bg-lime" />
              {site.availability.remaining} plazas disponibles este trimestre
            </p>
          </Reveal>
          <h2 id="cta-title" className="text-balance text-[clamp(2.6rem,7.5vw,6.5rem)] font-medium leading-[0.95] tracking-[-0.055em]">
            <SplitWords text="Dentro de seis semanas, la referencia podrías ser tú." accent={["referencia"]} />
          </h2>
          <Reveal delay={0.3}>
            <p className="mx-auto mt-8 max-w-lg text-lg text-muted">
              Cuéntanos sobre tu negocio. Te respondemos en menos de 24 horas con una primera idea, sin compromiso.
            </p>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mx-auto mt-16 max-w-3xl">
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function Chip({
  selected,
  children,
  ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { selected: boolean }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      className={cn(
        "relative rounded-full border px-4 py-2 text-sm transition-all duration-300",
        selected ? "border-fg bg-fg text-ink" : "border-line-strong text-muted hover:border-white/40 hover:text-fg",
      )}
      {...rest}
    >
      {children}
    </button>
  );
}

function ContactForm() {
  const [business, setBusiness] = useState("");
  const [budget, setBudget] = useState("");
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>("idle");
  const [serverError, setServerError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
      company: String(data.get("company") ?? ""),
      business,
      budget,
    };

    const found = validateContact(payload);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    setServerError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok || !json.ok) {
        if (json.errors) setErrors(json.errors);
        throw new Error(json.error ?? "Error");
      }
      setStatus("sent");
    } catch (err) {
      setStatus("error");
      setServerError(err instanceof Error && err.message !== "Error" ? err.message : "Algo ha fallado. Inténtalo de nuevo.");
    }
  }

  return (
    <div className="hairline-gradient relative overflow-hidden rounded-[32px] bg-ink-2/80 p-6 shadow-[0_60px_160px_-40px_rgba(139,124,255,0.35)] backdrop-blur-xl sm:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {status === "sent" ? (
          <motion.div
            key="sent"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE }}
            className="flex flex-col items-center py-12 text-center text-cyan"
            role="status"
          >
            <CheckBurst className="size-20" />
            <p className="mt-6 text-3xl font-medium tracking-tight text-fg">Recibido. Empieza lo bueno.</p>
            <p className="mt-3 max-w-sm text-muted">
              Te escribiremos en menos de 24 horas con los siguientes pasos y una primera idea para tu negocio.
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            exit={{ opacity: 0, scale: 0.98, filter: "blur(8px)" }}
            onSubmit={onSubmit}
            noValidate
            className="space-y-8"
          >
            <fieldset>
              <legend className="mb-3 text-sm text-muted">Mi negocio es…</legend>
              <div className="flex flex-wrap gap-2">
                {BUSINESS_TYPES.map((b) => (
                  <Chip key={b} selected={business === b} onClick={() => setBusiness(b)}>
                    {b}
                  </Chip>
                ))}
              </div>
              {errors.business && <FieldError>{errors.business}</FieldError>}
            </fieldset>

            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Nombre" name="name" autoComplete="name" error={errors.name} />
              <Field label="Email" name="email" type="email" autoComplete="email" error={errors.email} />
            </div>

            <fieldset>
              <legend className="mb-3 text-sm text-muted">
                Inversión aproximada <span className="text-subtle">(opcional)</span>
              </legend>
              <div className="flex flex-wrap gap-2">
                {BUDGETS.map((b) => (
                  <Chip key={b} selected={budget === b} onClick={() => setBudget(budget === b ? "" : b)}>
                    {b}
                  </Chip>
                ))}
              </div>
            </fieldset>

            <Field label="¿Qué te gustaría conseguir?" name="message" textarea error={errors.message} />

            {/* Honeypot */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label>
                Empresa
                <input type="text" name="company" tabIndex={-1} autoComplete="off" />
              </label>
            </div>

            <div className="flex flex-col-reverse items-center justify-between gap-4 border-t border-line pt-8 sm:flex-row">
              <p className="text-center text-xs text-subtle sm:text-left">
                O escríbenos a{" "}
                <a href={`mailto:${site.email}`} className="text-muted underline-offset-4 hover:text-fg hover:underline">
                  {site.email}
                </a>
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-fg px-7 py-4 text-[15px] font-medium text-ink shadow-[0_8px_40px_-8px_rgba(139,124,255,0.7)] transition-transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 sm:w-auto"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                />
                <span className="relative">{status === "sending" ? "Enviando…" : "Solicitar propuesta"}</span>
                {status !== "sending" && (
                  <svg aria-hidden viewBox="0 0 16 16" className="relative size-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" strokeWidth="1.6">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </button>
            </div>
            {status === "error" && (
              <p role="alert" className="text-center text-sm text-ember">
                {serverError}
              </p>
            )}
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function FieldError({ children, id }: { children: React.ReactNode; id?: string }) {
  return (
    <motion.p id={id} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="mt-2 text-xs text-ember">
      {children}
    </motion.p>
  );
}

function Field({
  label,
  name,
  type = "text",
  textarea,
  error,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  textarea?: boolean;
  error?: string;
  autoComplete?: string;
}) {
  const id = `f-${name}`;
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    autoComplete,
    placeholder: " ",
    "aria-invalid": Boolean(error),
    "aria-describedby": error ? errorId : undefined,
    className: cn(
      "peer w-full border-b bg-transparent pb-3 pt-6 text-lg text-fg outline-none transition-colors placeholder:text-transparent focus:border-fg",
      error ? "border-ember" : "border-line-strong",
      textarea && "min-h-[110px] resize-none",
    ),
  };
  return (
    <div className="relative">
      {textarea ? <textarea rows={3} {...shared} /> : <input type={type} {...shared} />}
      <label
        htmlFor={id}
        className="pointer-events-none absolute left-0 top-6 origin-left text-lg text-muted transition-all duration-300 peer-focus:top-0 peer-focus:text-xs peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs"
      >
        {label}
      </label>
      {error && <FieldError id={errorId}>{error}</FieldError>}
    </div>
  );
}
