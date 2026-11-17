export const site = {
  name: "MAJO",
  legalName: "MAJO Estudio Digital",
  tagline: "Estudio de diseño y desarrollo web",
  description:
    "Estudio de diseño y desarrollo web a medida para negocios locales: restaurantes, clínicas, despachos, gimnasios y comercios. Webs rápidas, cuidadas y pensadas para conseguir clientes.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://majo.studio",
  /** [COMPLETAR: confirmar el email real de contacto antes de publicar] */
  email: "hola@majo.studio",
  locale: "es_ES",
  nav: [
    { label: "Trabajo", href: "#portfolio" },
    { label: "Proceso", href: "#proceso" },
    { label: "Nosotros", href: "#nosotros" },
    { label: "Preguntas", href: "#preguntas" },
  ],
} as const;
