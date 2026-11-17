import { ImageResponse } from "next/og";

export const alt = "MAJO — Diseño y desarrollo web a medida para negocios locales.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/** Social preview in the site's light palette, with the brand accents. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          backgroundColor: "#faf8f4",
          backgroundImage:
            "radial-gradient(circle at 80% 10%, rgba(139,124,255,0.35), transparent 50%), radial-gradient(circle at 95% 95%, rgba(94,230,208,0.35), transparent 45%)",
          color: "#16151b",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 16,
              backgroundColor: "#111117",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#5ee6d0",
              fontSize: 34,
              fontWeight: 700,
            }}
          >
            m
          </div>
          <div style={{ fontSize: 36, fontWeight: 700, letterSpacing: -1 }}>MAJO</div>
        </div>
        <div style={{ fontSize: 74, lineHeight: 1.02, letterSpacing: -3, maxWidth: 1000 }}>
          La diferencia entre parecer un negocio más y convertirse en la referencia.
        </div>
        <div style={{ fontSize: 26, color: "#55535d" }}>Diseño y desarrollo web a medida para negocios locales</div>
      </div>
    ),
    size,
  );
}
