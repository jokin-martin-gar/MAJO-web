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

Había una causa principal y varias secundarias que se sumaban:

1. **Lenis con `duration: 1.15` (la causa principal).** Lenis intercepta la rueda del ratón y, en vez de mover la página, la interpola hacia el destino durante 1,15 s. Cada golpe de rueda tardaba más de un segundo en "llegar", y si seguías girando la rueda el destino se iba moviendo por delante. Esa es exactamente la sensación de "delay". No había conflicto con `scroll-behavior: smooth` en CSS (el proyecto lo anulaba con `.lenis-smooth`), pero sí un `requestAnimationFrame` permanente aunque no hubiera scroll.
   - **Solución:** quitar Lenis y volver al scroll nativo, que responde en el mismo fotograma. Los navegadores ya suavizan la rueda por su cuenta. Todas las animaciones ligadas al scroll (Framer Motion `useScroll`) siguen funcionando igual, porque leen el scroll nativo. Los saltos a las anclas del menú siguen siendo suaves gracias a `scroll-behavior: smooth` + `scroll-padding-top: 88px` en CSS (y se desactivan con `prefers-reduced-motion`).
2. **Blur ligado al scroll en el hero.** El texto del hero se desenfocaba con `filter: blur(0→12px)` en cada píxel de scroll. Los filtros obligan a repintar en cada fotograma. Ahora solo se desplaza y se desvanece (`transform` + `opacity`, que van por la GPU).
3. **Auroras con `blur-3xl` animadas sin parar.** Hay tres elipses de hasta 1500×900 px con `filter: blur(64px)` y una animación infinita de `transform`. El blur hay que recalcularlo en cada fotograma de la animación. Se ha quitado el `filter` y se conserva el degradado radial, que ya es suave por sí mismo. Se ven igual.
4. **Capa de "grano" fija a pantalla completa.** Era un `<div>` `position: fixed` del doble del tamaño de la ventana, con un `feTurbulence` SVG y `z-index: 60` por encima de toda la página. Obligaba a recomponer toda la pantalla en cada fotograma de scroll. Eliminada (además, en el nuevo tema claro sobraba).
5. **`backdrop-filter` sobre contenido animado.** El panel del hero (sobre el canvas animado) y el formulario final (sobre la aurora animada) tenían `backdrop-blur-xl`, que se recalcula cada vez que cambia lo que hay detrás. Ahora son opacos.
6. **Resplandor del portfolio con `blur(140px)` y `background-color` animado.** Sustituido por un degradado radial con fundido de opacidad.
7. **`will-change: transform` en cada palabra de cada titular** (cientos de capas de GPU) y **blur en cada palabra y en cada `Reveal`** al entrar en pantalla, es decir, justo mientras haces scroll. Eliminados el `will-change` y el blur en las apariciones por scroll. Se mantiene el blur solo en la entrada inicial del hero, que ocurre al cargar y no durante el scroll.
8. **Animaciones de propiedades que provocan reflow.** La bola de la tarjeta "Movimiento con física" animaba `left` y las barras del proceso animaban `height`. Ahora usan `transform` (`x` y `scaleY`).
9. **Muelle (`useSpring`) en la línea de progreso del proceso.** Hacía que la línea fuera por detrás del scroll. Ahora la controla el scroll directamente.

Lo que **no** era problema: los listeners de scroll (Framer Motion ya usa `requestAnimationFrame` y listeners pasivos, y el canvas del hero usa `{ passive: true }` y se pausa fuera de pantalla). El proyecto no usa GSAP/ScrollTrigger ni tiene imágenes pesadas.

---

## 4. Registro de lo hecho

*(Se completa al terminar cada mejora.)*
