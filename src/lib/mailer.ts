/**
 * Server-only: import it exclusively from route handlers (src/app/api/**).
 * Sends contact-form leads by email through Resend's REST API (https://resend.com).
 * No SDK needed: one fetch call. All settings live in environment variables:
 *
 *   RESEND_API_KEY      secret key from resend.com (never exposed to the browser)
 *   CONTACT_TO_EMAIL    optional override of where leads are delivered; defaults to site.email
 *   CONTACT_FROM_EMAIL  verified sender; defaults to Resend's test sender
 */

import { site } from "@/lib/site";

export type Lead = {
  name: string;
  email: string;
  business: string;
  budget: string;
  message: string;
  receivedAt: string;
};

export function mailerConfig() {
  return {
    apiKey: process.env.RESEND_API_KEY?.trim() ?? "",
    to: process.env.CONTACT_TO_EMAIL?.trim() || site.email,
    from: process.env.CONTACT_FROM_EMAIL?.trim() || "MAJO <onboarding@resend.dev>",
  };
}

export function mailerConfigured() {
  const { apiKey, to } = mailerConfig();
  return Boolean(apiKey && to);
}

const escapeHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

// Strip line breaks so user input can never inject extra headers into the subject.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export async function sendLeadEmail(lead: Lead) {
  const { apiKey, to, from } = mailerConfig();

  const rows: [string, string][] = [
    ["Nombre", lead.name],
    ["Email", lead.email],
    ["Negocio", lead.business],
    ["Inversión", lead.budget],
    ["Mensaje", lead.message || "(sin mensaje)"],
    ["Recibido", new Date(lead.receivedAt).toLocaleString("es-ES", { timeZone: "Europe/Madrid" })],
  ];

  const text = rows.map(([k, v]) => `${k}: ${v}`).join("\n");
  const html = `<table cellpadding="8" style="font-family:system-ui,sans-serif;font-size:14px;border-collapse:collapse">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="color:#55535d;vertical-align:top;white-space:nowrap"><strong>${k}</strong></td><td style="white-space:pre-wrap">${escapeHtml(v)}</td></tr>`,
  )
  .join("\n")}
</table>`;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from,
      to: to.split(",").map((s) => s.trim()).filter(Boolean),
      reply_to: lead.email,
      subject: `Nueva solicitud desde MAJO – ${oneLine(lead.name)}`,
      text,
      html,
    }),
    signal: AbortSignal.timeout(10_000),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    throw new Error(`Resend respondió ${res.status}: ${detail}`);
  }
}
