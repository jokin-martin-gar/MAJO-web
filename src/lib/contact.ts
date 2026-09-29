export const BUSINESS_TYPES = [
  "Restaurante",
  "Clínica",
  "Despacho profesional",
  "Gimnasio",
  "Tienda / Ecommerce",
  "Otro",
] as const;

export const BUDGETS = ["< 3.000 €", "3.000 – 6.000 €", "6.000 – 12.000 €", "+ 12.000 €"] as const;

export type ContactPayload = {
  name: string;
  email: string;
  business: string;
  budget: string;
  message: string;
  /** Honeypot — must stay empty. */
  company?: string;
};

export type ContactErrors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/** Shared validation: runs in the browser for instant feedback and again on the server. */
export function validateContact(input: Partial<ContactPayload>): ContactErrors {
  const errors: ContactErrors = {};
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  if (name.length < 2) errors.name = "¿Cómo te llamas?";
  if (name.length > 120) errors.name = "Nombre demasiado largo";
  if (!EMAIL_RE.test(email) || email.length > 200) errors.email = "Necesitamos un email válido para responderte";
  if (!BUSINESS_TYPES.includes(input.business as (typeof BUSINESS_TYPES)[number])) errors.business = "Elige tu tipo de negocio";
  if (input.budget && !BUDGETS.includes(input.budget as (typeof BUDGETS)[number])) errors.budget = "Presupuesto no válido";
  if (message.length > 3000) errors.message = "Máximo 3.000 caracteres";

  return errors;
}
