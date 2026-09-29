import { NextResponse } from "next/server";
import { validateContact, type ContactPayload } from "@/lib/contact";

// Best-effort, per-instance rate limit. Put a shared store (e.g. Upstash) in front for multi-instance deploys.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const hits = new Map<string, { count: number; start: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  if (hits.size > 5000) {
    for (const [key, value] of hits) if (now - value.start > WINDOW_MS) hits.delete(key);
  }
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_REQUESTS;
}

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "Demasiadas solicitudes. Inténtalo en unos minutos." }, { status: 429 });
  }

  let body: Partial<ContactPayload>;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Solicitud no válida" }, { status: 400 });
  }

  // Bots fill every field; humans never see this one. Pretend success.
  if (body.company) return NextResponse.json({ ok: true });

  const errors = validateContact(body);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const lead = {
    name: body.name!.trim(),
    email: body.email!.trim(),
    business: body.business,
    budget: body.budget || "Sin especificar",
    message: body.message?.trim() ?? "",
    receivedAt: new Date().toISOString(),
  };

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    try {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(lead),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    } catch (err) {
      console.error("[contact] webhook delivery failed", err);
      return NextResponse.json(
        { ok: false, error: "No hemos podido enviar tu solicitud. Escríbenos directamente por email." },
        { status: 502 },
      );
    }
  } else {
    console.info("[contact] new lead (set CONTACT_WEBHOOK_URL to forward it)", lead);
  }

  return NextResponse.json({ ok: true });
}
