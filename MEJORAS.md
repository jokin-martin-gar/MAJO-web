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

Cada fila es un commit local en la rama `mejoras-autonomas`. Para deshacer una mejora concreta: `git revert <commit>`. Para ver los cambios de una: `git show <commit>`.

| Commit | Mejora | Qué se hizo |
|--------|--------|-------------|
| `1ad55be` | Diagnóstico | Este documento. |
| `31a2bb5` | **1. Scroll inmediato** | Se elimina Lenis (y su dependencia) en favor del scroll nativo. Anclas suaves con CSS. Fuera el blur ligado al scroll, el blur de las auroras y del resplandor del portfolio, la capa de grano fija, el `backdrop-filter` sobre contenido animado y el `will-change` en cada palabra. `left`/`height` animados pasan a `transform`. Detalle completo en la sección 3. |
| `3dcd026` | **2. Contenido honesto** | Fuera las secciones de testimonios (8 personas inventadas) y de casos de éxito (3 clientes con cifras). Fuera las métricas inventadas del portfolio y del antes/después (se sustituyen por qué incluye cada proyecto y qué cambia, sin números). Fuera "4,9 · 612 reseñas", la "Guía Repsol", las notificaciones de clientes ficticios, la escasez inventada ("solo 3 proyectos por trimestre", "2 plazas") y "+312 % solicitudes". Las demos y el antes/después llevan una etiqueta visible **"Proyecto conceptual"** y dominios `demo.majo.studio/…`. El panel del hero queda como "Panel de resultados · Ejemplo · Datos simulados". El rendimiento se expresa como objetivos (Core Web Vitals en verde, Lighthouse 90+). Nuevas secciones **Quiénes somos** (equipo + valores) y **Estamos empezando: sé de nuestros primeros clientes** (precio de lanzamiento, mantenimiento incluido, atención prioritaria, qué pedimos a cambio, CTA) + **Nuestros compromisos** (< 24 h, presupuesto cerrado, prototipo antes de programar, la web es tuya). FAQ nueva: "Sois un estudio nuevo, ¿por qué confiar?". |
| `16e4e0d` | **3. Diseño claro** | Paleta clara (crema `#faf8f4`, tarjetas blancas, texto `#16151b`). Todos los colores pasan a variables CSS en `globals.css`, con un ámbito `.theme-dark` reutilizable. Se mantienen en oscuro, como contraste puntual, el footer, el bloque "Primeros clientes" y los paneles visuales del proceso. Se conservan los acentos violeta/menta/ámbar/lima, con variantes `*-ink` para texto. Se adaptan al fondo claro el canvas del hero, el gráfico, las sombras, el cristal (glass), los bordes y la rejilla. También se arregla un fallo previo del gráfico del hero: el área terminaba en diagonal y el punto final no coincidía con la línea. |
| `7b05ad8` | 4. Legal y RGPD | Páginas `/aviso-legal`, `/privacidad` y `/cookies` (plantillas con `[COMPLETAR]`), enlazadas desde el footer y en el sitemap. Aviso de privacidad junto al botón del formulario. Los enlaces del menú pasan a `/#ancla` para funcionar desde cualquier página. |
| `3afebaa` | 5. SEO | Título descriptivo ("Diseño y desarrollo web a medida para negocios locales"), descripción nueva, imagen Open Graph en claro, `theme-color` y `color-scheme` claros. |
| `0580c60` | 7–9. Accesibilidad y limpieza | Menú móvil como `dialog` accesible y con tamaño de letra adaptable. Acordeón sin blur. Se elimina código muerto (`text-shimmer`, `mask-fade-y`, `--ease-snappy`, `DEMO_CONTENT`, `Cases`, `Testimonials`). README actualizado. |
| `8f6c19e` | 10. Maquetación | Menos hueco vacío bajo el hero. Características del portfolio en formato compacto en móvil. "Sectores con los que trabajamos" pasa a "Sectores para los que diseñamos". |
| *(último)* | Cierre | Este registro, y "24 horas laborables" coherente en todo el formulario. |

### Contraste (WCAG 2.x, calculado)

| Token | Claro (sobre `#faf8f4` / `#fff`) | Oscuro (sobre `#0b0b10` / `#14141b`) |
|---|---|---|
| fg | 17,1 / 18,2 | 17,5 / 16,4 |
| muted | 7,1 / 7,6 | 7,7 / 7,2 |
| subtle | 5,5 / 5,8 | 6,0 / 5,6 |
| violet-ink | 5,8 / 6,1 | 7,9 / 7,4 |
| cyan-ink | 4,9 / 5,2 | 12,8 / 12,0 |
| ember-ink | 4,9 / 5,2 | 8,4 / 7,9 |
| lime-ink | ≥ 4,7 | 17,1 / 15,9 |

Todos ≥ 4,5:1 (AA para texto normal).

### Verificación final (fase 4)

- `tsc`, `next lint` y `next build` sin errores después de cada commit.
- Capturas automáticas con Microsoft Edge (Playwright, instalado solo en una carpeta temporal, fuera del proyecto) a 1440 px y 390 px de todas las páginas: inicio, aviso legal, privacidad, cookies y 404. **Sin errores de consola ni desbordes horizontales.**
- Pruebas de interacción, todas OK (16/16):
  - el menú móvil se abre, se cierra y lleva a la sección correcta (queda bajo la barra fija);
  - las 5 demos cargan con la etiqueta "Proyecto conceptual" y en modo móvil;
  - el slider antes/después funciona con teclado (Inicio/Fin);
  - el acordeón se abre;
  - el formulario muestra errores si está vacío y la confirmación si se envía bien (se ha comprobado la API real);
  - los enlaces legales del footer funcionan y "Proceso" lleva de una página legal a la home.

---

## 5. Qué se descartó y por qué

- **Valoraciones dentro de las mini-webs conceptuales** (p. ej. "★ 4,8 · 1.240 reseñas" en Kōji, "4,9 · 612 pacientes" en Arlanza). Se han mantenido porque forman parte del diseño de un negocio ficticio, igual que su carta o sus precios. No dicen nada de MAJO, y el marco que las contiene lleva la etiqueta "Proyecto conceptual". Si prefieres quitarlas, están en `src/components/portfolio/demos/`.
- **Datos de los estudios en la sección "El problema"** (0,05 s, 75 %, 53 %). Se mantienen porque son estudios reales y citados, no cifras de MAJO.
- **Mantener Lenis con valores más bajos** (`lerp` alto). Descartado: cualquier interpolación añade retraso por diseño, y el scroll nativo de los navegadores actuales ya es suave. Si se quisiera volver a un scroll "con peso", basta con `npm i lenis` y usar `new Lenis({ lerp: 0.2 })`, nunca `duration` > 0,5.
- **Fotos reales del equipo**: no las tengo. Se ha dejado un icono neutro y un comentario para sustituirlo por `next/image`.
- **Banner de cookies**: no hace falta, porque la web no instala cookies. Si se añade analítica, habrá que ponerlo.
- **Migrar `next lint` a la CLI de ESLint** (Next avisa de que está obsoleto) y **resolver las 17 vulnerabilidades de `npm audit`**. Se descartan por ahora porque cambian dependencias y configuración de herramientas sin mejorar nada visible. Quedan en recomendaciones.
- **Nada ha requerido permisos de administrador**, así que no hay mejoras saltadas por ese motivo.

---

## 6. Marcadores [COMPLETAR] pendientes

Busca `COMPLETAR` en `src/` para encontrarlos todos. En la web se ven resaltados en amarillo.

| Dónde | Qué falta |
|-------|-----------|
| `src/components/sections/About.tsx` | Ciudad desde la que trabajáis. Nombre, rol y una o dos frases de cada persona del equipo (hay 2 fichas; añade o quita en `TEAM`). Opcional: fotos. |
| `src/components/sections/FoundingClients.tsx` | Descuento de lanzamiento (p. ej. −20 %). Meses de mantenimiento incluidos. Número de plazas con estas condiciones. |
| `src/lib/site.ts` | Confirmar el email real (`hola@majo.studio`) y el dominio (`NEXT_PUBLIC_SITE_URL`). |
| `src/app/aviso-legal/page.tsx` | Titular, NIF/CIF, domicilio, datos registrales (si es sociedad), fecha. |
| `src/app/privacidad/page.tsx` | Responsable, NIF/CIF, domicilio, plazo de conservación, proveedores (alojamiento, email), fecha. |
| `src/app/cookies/page.tsx` | Fecha. |

**Revisar también** (no son marcadores, pero son promesas que solo tú puedes confirmar):
- Los compromisos de `src/lib/content.ts`: respuesta < 24 h laborables, presupuesto cerrado, prototipo antes de programar, y dominio/código/contenidos a nombre del cliente.
- Las respuestas de la FAQ: panel para editar contenidos, mantenimiento posterior, rondas de revisión incluidas.
- "Unas seis semanas" como duración habitual del proyecto (sección Proceso y CTA final).
- Los textos legales son una plantilla: conviene que los revise un profesional antes de publicar.

---

## 7. Recomendaciones para el futuro

1. **Rellena los `[COMPLETAR]` antes de enseñar la web.** Lo que más confianza genera ahora mismo es la sección "Quiénes somos" con caras y nombres reales.
2. **En cuanto tengas el primer cliente**, pide permiso para añadir su proyecto como caso real (con su testimonio). Puedes recuperar el diseño de las secciones eliminadas con `git show 31a2bb5:src/components/sections/Cases.tsx` (y `Testimonials.tsx`) y llenarlas solo con datos reales.
3. **Configura `CONTACT_WEBHOOK_URL`** (n8n, Make, Zapier, Slack o email). Sin ella, las solicitudes solo aparecen en el log del servidor y se pueden perder.
4. **Medición respetuosa**: si quieres analítica, usa una sin cookies (Plausible, Umami, Vercel Analytics) para no necesitar banner.
5. **Mantenimiento técnico**: ejecutar `npm audit` y actualizar dependencias, y migrar `next lint` a ESLint CLI (`npx @next/codemod@canary next-lint-to-eslint-cli .`) antes de pasar a Next 16.
6. **Rendimiento real**: tras publicar, pasar PageSpeed Insights sobre la URL real y comprobar que cumple los objetivos que la propia web promete (LCP < 2,5 s, Lighthouse 90+).
7. **Imagen Open Graph**: si tienes una tipografía o un logo final en alta resolución, sustituye la imagen generada (`src/app/opengraph-image.tsx`) por una diseñada.
