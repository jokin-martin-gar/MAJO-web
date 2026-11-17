# MEJORAS — MAJO-web

Rama de trabajo: `mejoras-autonomas`. Cada mejora tiene su propio commit local, sin push.

---

## 1. Diagnóstico general

**Qué es.** Es una landing de una sola página para el estudio MAJO, hecha con Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, Framer Motion y Lenis (smooth scroll). Tiene una API mínima (`/api/contact`) para el formulario. No hay imágenes rasterizadas: todo (demos, ilustraciones, gráficos) está dibujado con CSS, SVG o canvas, lo que es una gran ventaja de peso.

**Puntos fuertes.**
- Código limpio, tipado y bien organizado (una sección por archivo y primitivas reutilizables en `ui/`).
- Accesibilidad bastante cuidada: enlace para saltar al contenido, `prefers-reduced-motion`, roles ARIA en pestañas, slider y acordeón.
- Las cinco mini-webs del portfolio son interactivas de verdad y se cargan bajo demanda.
- Validación compartida cliente/servidor, honeypot y límite de peticiones en el formulario.
- Compila, pasa `tsc` y `next lint` sin avisos. La página principal pesa 191 kB de JS en la primera carga.

**Problemas detectados.**
1. **El scroll va con retraso.** Lenis está configurado con `duration: 1.15`, así que cada golpe de rueda se reparte en más de un segundo. Encima se suman efectos caros durante el scroll: `filter: blur()` ligado al scroll en el hero, auroras gigantes con `blur-3xl` animadas sin parar, una capa de grano fija a pantalla completa por encima de todo, `will-change` en cada palabra de cada titular, y `left` animado (provoca reflow).
2. **Contenido inventado que finge actividad real.** Hay 8 testimonios con nombre y apellidos, 3 casos de éxito con cifras ("+184 % citas", "+212 socios"), métricas en cada proyecto del portfolio, "4,9 · 612 reseñas", una mención a la "Guía Repsol" (marca real), notificaciones de reservas de "clientes", un panel de "crecimiento en directo" con resultados "Con MAJO", "+312 % solicitudes desde el lanzamiento", "6 semanas de media" y "2 plazas disponibles este trimestre". Para un estudio sin clientes todavía, esto es un riesgo serio de credibilidad (y legal: publicidad engañosa).
3. **Diseño muy oscuro.** El fondo es casi negro (`#050507`) en toda la página y resulta pesado. Los colores están parcialmente centralizados en tokens, pero hay decenas de valores fijos (`white/5`, `rgba(255,255,255,…)`) repartidos por los componentes, lo que impide cambiar de tema.
4. **Faltan las páginas legales.** Aviso legal, privacidad y cookies aparecen como texto sin enlace. El formulario recoge datos personales sin informar de la política de privacidad (RGPD).
5. **Pequeños problemas de SEO y metadatos.** El `theme-color`, el `color-scheme` y la imagen Open Graph siguen en oscuro. El sitemap solo contiene la portada.
6. **Código muerto.** La utilidad `text-shimmer` no se usa. El interruptor `DEMO_CONTENT` y sus avisos dejarán de tener sentido al quitar el contenido inventado.
7. **Dominios de las demos que podrían ser reales.** `clinicaarlanza.es`, `kojibilbao.com`, etc. Si existe un negocio real con ese dominio, parecería que es cliente nuestro.

---

## 2. Lista de mejoras (ordenadas por impacto)

| # | Mejora | Problema | Solución elegida y por qué |
|---|--------|----------|----------------------------|
| 1 | **Scroll inmediato** | Lenis con `duration: 1.15` retrasa cada movimiento de rueda. Los filtros y blur animados bajan los FPS durante el scroll. | Quitar Lenis y volver al scroll nativo, que responde al instante y además ya es suave en los navegadores modernos. Desplazamiento suave a las anclas con CSS (`scroll-behavior` + `scroll-padding-top`). Eliminar el blur ligado al scroll, las auroras con `blur()` (el degradado radial ya es suave), la capa de grano fija, el `will-change` masivo y las animaciones de `left`/`height`, que pasan a `transform`. Las animaciones se conservan. |
| 2 | **Contenido honesto** | Testimonios, casos, cifras, reseñas y escasez inventados. | Eliminar Testimonios y Casos. Quitar las métricas del portfolio y del antes/después. Marcar los proyectos y paneles de ejemplo con una etiqueta visible "Proyecto conceptual" / "Ejemplo". Crear secciones nuevas: "Quiénes somos", "Primeros clientes" (con condiciones especiales y CTA) y compromisos verificables. Los datos que no conozco se quedan como `[COMPLETAR: …]`. |
| 3 | **Tema claro** | El fondo casi negro resulta cargante. | Base crema (`#faf8f4`), tarjetas blancas y texto casi negro. Se conservan el violeta y el menta de marca, con variantes más oscuras para texto que cumplen WCAG AA. Todos los colores pasan a variables CSS con un ámbito `.theme-dark` para bloques puntuales en oscuro (footer y paneles del proceso). |
| 4 | Páginas legales y RGPD | Faltan aviso legal, privacidad y cookies. El formulario no informa del tratamiento de datos. | Crear `/aviso-legal`, `/privacidad` y `/cookies` con plantillas y marcadores `[COMPLETAR]`, enlazarlas en el footer y añadir el aviso de privacidad junto al botón de envío. |
| 5 | SEO y metadatos | Tema y OG en oscuro, sitemap incompleto, textos de marca exagerados. | Metadatos en claro, imagen OG clara y sitemap con las páginas legales. |
| 6 | Dominios de las demos | Dominios plausibles de negocios reales. | Usar subdominios propios y evidentes (`demo.majo.studio/…`). |
| 7 | Navegación | Los enlaces del menú apuntan a secciones que cambian. | Actualizar el menú a las secciones nuevas (Trabajo, Proceso, Nosotros, Preguntas). |
| 8 | Código muerto | `text-shimmer`, `DEMO_CONTENT`, Lenis, `Cases`, `Testimonials`. | Eliminarlo. Menos JS y menos mantenimiento. |
| 9 | Accesibilidad | Algunos textos de 10–11 px en gris quedarían por debajo de AA sobre fondo claro. Animaciones de `left`. | Revisar los contrastes con cálculo real y ajustar los tokens `muted` y `subtle`. |
| 10 | Revisión móvil | Comprobar desbordes horizontales y tamaños en 390 px. | Capturas automáticas con Edge (Playwright) en escritorio y móvil, con detección de desbordes y errores de consola. |

---

## 3. Qué causaba el retraso del scroll

*(Se completa en la sección 4, mejora 1.)*

---

## 4. Registro de lo hecho

*(Se completa al terminar cada mejora.)*
