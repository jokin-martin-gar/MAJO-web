# MAJO-web

Web del estudio MAJO. No es una landing: es una demostración interactiva de lo que el estudio sabe hacer.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · Lenis

## Empezar

```bash
npm install
npm run dev        # http://localhost:3000
npm run build && npm start
npm run typecheck
npm run lint
```

Copia `.env.example` a `.env.local` y ajusta:

| Variable | Uso |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL canónica (SEO, sitemap, Open Graph) |
| `CONTACT_WEBHOOK_URL` | Opcional. Destino de las solicitudes de presupuesto (Slack, Make, Zapier, n8n, CRM…). Sin ella se registran en el log del servidor. |

## Narrativa

Cada sección tiene una función psicológica concreta (ver `src/app/page.tsx`):

1. **Hero**: campo de señal interactivo en canvas + consola de crecimiento con capas en parallax.
2. **Oficio**: bento de micro-demos vivas (tipografía variable, física del movimiento, color, responsive, rendimiento).
3. **Problema**: texto que se ilumina con el scroll + datos.
4. **Transformación**: slider antes/después arrastrable y accesible por teclado.
5. **Casos**: carrusel horizontal guiado por el scroll vertical.
6. **Portfolio**: cinco mini-webs funcionales (restaurante, clínica, gimnasio, abogados, ecommerce) con navegación, reservas y carrito. Usan container queries, así que el modo Móvil reorganiza el layout de verdad.
7. **Proceso**: columna sticky con pasos que se activan al hacer scroll.
8. **Prueba social**: marquesinas de testimonios + compromisos.
9. **Objeciones**: acordeón accesible.
10. **CTA final**: formulario con validación compartida cliente/servidor, honeypot y límite de peticiones.

## Estructura

```
src/
  app/                  layout (SEO, fuentes, JSON-LD), page, api/contact, sitemap, robots, OG image
  components/
    layout/             Navbar, Footer, Providers (MotionConfig + Lenis)
    sections/           una sección por archivo
    hero/               SignalField (canvas), GrowthConsole, FloatingCards
    portfolio/demos/    las cinco mini-webs interactivas
    transform/          webs del antes/después
    ui/                 primitivas: Reveal, SplitWords, ScrollWords, MagneticButton, SpotlightCard, Counter...
  lib/                  site (config), content (testimonios/FAQ), contact (validación), utils
```

## Antes de publicar

- [ ] **Contenido de ejemplo**: los testimonios y casos de `src/lib/content.ts` y `src/components/sections/Cases.tsx` son ilustrativos. Sustitúyelos por clientes reales (con su permiso) y pon `DEMO_CONTENT = false`, que quita los avisos de "ilustrativo" de la página.
- [ ] **Disponibilidad real**: `site.availability` en `src/lib/site.ts` (se muestra en el hero y en el CTA).
- [ ] **Email y dominio**: `site.email` y `NEXT_PUBLIC_SITE_URL`.
- [ ] **Páginas legales**: aviso legal, privacidad y cookies (los enlaces del footer están como texto).
- [ ] **Webhook de contacto**: configura `CONTACT_WEBHOOK_URL`.

## Accesibilidad y rendimiento

- Se respeta `prefers-reduced-motion` en todas partes: MotionConfig, CSS, canvas estático y Lenis desactivado.
- Hay enlace para saltar al contenido, foco visible, pestañas con navegación por flechas, slider con teclado (`←/→`, `Shift` para saltos grandes, `Inicio/Fin`) y regiones ARIA en el acordeón.
- Las demos del portfolio se cargan bajo demanda (`next/dynamic`). El canvas se pausa fuera de pantalla.
