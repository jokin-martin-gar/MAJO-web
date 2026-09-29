import { ImageResponse } from "next/og";

export const alt = "MAJO — La diferencia entre parecer un negocio más y convertirse en la referencia.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          backgroundColor: "#050507",
          backgroundImage:
            "radial-gradient(circle at 70% 20%, rgba(139,124,255,0.45), transparent 50%), radial-gradient(circle at 90% 90%, rgba(94,230,208,0.25), transparent 45%)",
          color: "#f3f2ee",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: -1 }}>MAJO</div>
        <div style={{ fontSize: 76, lineHeight: 1, letterSpacing: -3, maxWidth: 980 }}>
          La diferencia entre parecer un negocio más y convertirse en la referencia.
        </div>
        <div style={{ fontSize: 24, color: "#8b8b94" }}>Estudio de producto digital</div>
      </div>
    ),
    size,
  );
}
