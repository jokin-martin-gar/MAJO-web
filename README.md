# MAJO-web

Web del estudio MAJO. No es una landing: es una demostración interactiva de lo que el estudio sabe hacer.

**Stack:** Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · scroll nativo (sin librerías de smooth scroll)

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

Cada sección tiene una función concreta (ver `src/app/page.tsx`). Ninguna usa pruebas inventadas: los proyectos y paneles de ejemplo están etiquetados como tales.

1. **Hero**: campo de señal interactivo en canvas + panel de resultados de ejemplo (datos simulados, etiquetados).
2. **Oficio**: micro-demos vivas (tipografía variable, física del movimiento, color, responsive, rendimiento como objetivos verificables).
3. **Problema**: texto que se ilumina con el scroll + datos de estudios citados.
4. **Transformación**: slider antes/después sobre un proyecto conceptual.
5. **Proyectos conceptuales**: cinco mini-webs funcionales (restaurante, clínica, gimnasio, abogados, ecommerce) con la etiqueta "Proyecto conceptual".
6. **Proceso**: columna sticky con pasos que se activan al hacer scroll.
7. **Quiénes somos**: equipo y valores (datos del equipo pendientes, marcados con `[COMPLETAR]`).
8. **Primeros clientes**: oferta de lanzamiento + compromisos verificables.
9. **Preguntas**: acordeón accesible.
10. **CTA final**: formulario con validación compartida cliente/servidor, honeypot, límite de peticiones y aviso de privacidad.

Páginas legales: `/aviso-legal`, `/privacidad`, `/cookies` (plantillas con `[COMPLETAR]`).
## Estructura

```
src/
  app/                  layout (SEO, fuentes, JSON-LD), page, api/contact, legales, sitemap, robots, OG image
  components/
    layout/             Navbar, Footer, LegalPage, Providers (MotionConfig)
    sections/           una sección por archivo
    hero/               SignalField (canvas), GrowthConsole, FloatingCards
    portfolio/demos/    las cinco mini-webs interactivas
    transform/          webs del antes/después
    ui/                 primitivas: Reveal, SplitWords, ScrollWords, MagneticButton, SpotlightCard, Counter, Completar...
  lib/                  site (config), content (compromisos, valores, FAQ), contact (validación), utils
```

## Colores y tema

Todos los colores están en variables CSS en `src/app/globals.css`. La web es clara por defecto; cualquier elemento con la clase `theme-dark` usa la paleta oscura (footer, bloque "Primeros clientes", paneles del proceso). Usa siempre los tokens (`bg-ink`, `bg-ink-2`, `text-fg`, `text-muted`, `border-line`, `text-violet-ink`…) en lugar de colores fijos.
## Antes de publicar

- [ ] Rellenar todos los marcadores `[COMPLETAR: …]` (busca "COMPLETAR" en `src/`). La lista está en `MEJORAS.md`.
- [ ] **Email y dominio**: `site.email` en `src/lib/site.ts` y `NEXT_PUBLIC_SITE_URL`.
- [ ] **Páginas legales**: completar y revisar los textos de `/aviso-legal`, `/privacidad` y `/cookies`.
- [ ] **Webhook de contacto**: configura `CONTACT_WEBHOOK_URL`.
- [ ] Cuando haya clientes reales (con su permiso), añadir testimonios o casos reales.
## Accesibilidad y rendimiento

- Se respeta `prefers-reduced-motion` en todas partes: MotionConfig, CSS (incluido el desplazamiento suave a anclas) y canvas estático.
- Hay enlace para saltar al contenido, foco visible, pestañas con navegación por flechas, slider con teclado (`←/→`, `Shift` para saltos grandes, `Inicio/Fin`) y regiones ARIA en el acordeón.
- Las demos del portfolio se cargan bajo demanda (`next/dynamic`). El canvas se pausa fuera de pantalla.
