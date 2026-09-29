export const site = {
  name: "MAJO",
  legalName: "MAJO Estudio Digital",
  tagline: "Estudio de producto digital",
  description:
    "Diseñamos y desarrollamos webs que convierten negocios locales en la referencia de su sector. Dirección de arte, UX y desarrollo a medida para restaurantes, clínicas, despachos, gimnasios y comercios.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://majo.studio",
  email: "hola@majo.studio",
  locale: "es_ES",
  /** Real capacity — shown in the hero badge and the final CTA. Keep it honest. */
  availability: { projectsPerQuarter: 3, remaining: 2 },
  nav: [
    { label: "Trabajo", href: "#portfolio" },
    { label: "Transformación", href: "#transformacion" },
    { label: "Proceso", href: "#proceso" },
    { label: "Preguntas", href: "#preguntas" },
  ],
} as const;
