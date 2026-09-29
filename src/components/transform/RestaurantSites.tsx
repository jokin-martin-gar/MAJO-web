/**
 * Two versions of the same restaurant, drawn entirely in code (no stock imagery).
 * The "before" is deliberately dated — it is the site most local businesses still have.
 */

export function OldRestaurantSite() {
  return (
    <div
      className="size-full overflow-hidden bg-[#f5f0dc] text-[#222]"
      style={{ fontFamily: "'Times New Roman', Times, serif" }}
    >
      <div className="border-b-4 border-[#8b0000] bg-gradient-to-b from-[#b22222] to-[#8b0000] px-6 py-4 text-center">
        <p className="text-3xl font-bold text-[#ffd700] [text-shadow:2px_2px_0_#000]">★ Restaurante Casa Olmo ★</p>
        <p className="text-sm italic text-white">Cocina casera desde 1987 - ¡¡Bienvenidos a nuestra página web!!</p>
      </div>
      <div className="flex justify-center gap-1 bg-[#333] py-1 text-xs">
        {["INICIO", "CARTA", "FOTOS", "DÓNDE ESTAMOS", "CONTACTO", "LIBRO DE VISITAS"].map((l) => (
          <span key={l} className="bg-gradient-to-b from-[#666] to-[#333] px-2 py-1 text-white underline">
            {l}
          </span>
        ))}
      </div>
      <div className="overflow-hidden whitespace-nowrap bg-[#ffff66] py-0.5 text-xs font-bold text-[#c00]">
        <span className="inline-block animate-marquee [--marquee-duration:12s]">
          *** NUEVO MENÚ DEL DÍA 12€ *** LLAME PARA RESERVAR: 944 00 00 00 *** ABIERTO DE LUNES A DOMINGO *** NUEVO MENÚ DEL DÍA 12€ *** LLAME PARA RESERVAR ***
        </span>
      </div>
      <div className="grid grid-cols-[1fr_150px] gap-4 p-5">
        <div>
          <p className="mb-2 text-xl font-bold text-[#8b0000] underline">Quienes Somos</p>
          <p className="text-[13px] leading-snug">
            Somos un restaurante familiar situado en el centro de la ciudad. Ofrecemos comida tradicional, menú del día,
            raciones, bocadillos y celebraciones. Disponemos de comedor para grupos. Aceptamos todas las tarjetas.
            Para reservar llame por teléfono en horario de apertura.
          </p>
          <div className="mt-3 grid h-28 place-items-center border-2 border-dashed border-[#999] bg-[#ddd] text-xs text-[#777]">
            [ imagen no disponible ]
          </div>
          <p className="mt-3 text-[13px] text-[#0000ee] underline">&gt;&gt; Pinche aquí para ver la carta (PDF 8,4MB)</p>
        </div>
        <div className="space-y-2 text-[11px]">
          <div className="border border-[#999] bg-white p-2 text-center">
            <p className="font-bold">VISITAS:</p>
            <p className="bg-black px-1 font-mono text-[#0f0]">0 0 1 2 3 4</p>
          </div>
          <div className="border border-[#999] bg-white p-2">
            <p className="font-bold">Horario:</p>
            <p>L-D 13:00-16:00</p>
            <p>20:30-23:30</p>
          </div>
          <p className="text-[10px] text-[#666]">Última actualización: 14/03/2014</p>
          <p className="text-[10px] text-[#666]">Resolución óptima 1024x768</p>
        </div>
      </div>
    </div>
  );
}

export function NewRestaurantSite() {
  return (
    <div className="relative size-full overflow-hidden bg-[#12100e] text-[#efe6d8]">
      {/* Ambient "fire" light drawn with gradients */}
      <div className="absolute -right-24 -top-24 size-[420px] rounded-full bg-[radial-gradient(closest-side,rgba(234,88,12,0.45),transparent)] blur-2xl" />
      <div className="absolute bottom-[-30%] left-[20%] size-[380px] rounded-full bg-[radial-gradient(closest-side,rgba(251,191,36,0.14),transparent)] blur-2xl" />

      <div className="relative flex items-center justify-between px-8 py-5 text-[11px] tracking-[0.2em] text-[#efe6d8]/70">
        <span className="font-serif text-xl italic tracking-normal text-[#efe6d8]">Olmo</span>
        <div className="hidden gap-6 sm:flex">
          <span>CARTA</span>
          <span>BRASA</span>
          <span>BODEGA</span>
          <span>EVENTOS</span>
        </div>
        <span className="rounded-full bg-[#efe6d8] px-4 py-1.5 text-[10px] font-medium tracking-[0.12em] text-[#12100e]">RESERVAR</span>
      </div>

      <div className="relative grid grid-cols-1 items-end gap-6 px-8 pt-6 sm:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="mb-4 text-[10px] tracking-[0.3em] text-[#ea580c]">COCINA DE TEMPORADA · DESDE 1987</p>
          <p className="font-serif text-[clamp(2.4rem,5.5vw,4.6rem)] leading-[0.92] tracking-[-0.02em]">
            El fuego
            <br />
            <span className="italic text-[#f59e0b]">lento</span> también
            <br />
            es un ingrediente.
          </p>
          <div className="mt-6 flex items-center gap-3 text-[11px]">
            <span className="rounded-full border border-[#efe6d8]/25 px-3 py-1.5">Menú degustación · 68 €</span>
            <span className="text-[#efe6d8]/50">★ 4,9 · Guía Repsol</span>
          </div>
        </div>

        {/* Plate — pure CSS illustration */}
        <div className="relative mx-auto hidden aspect-square w-full max-w-[260px] sm:block">
          <div className="absolute inset-0 rounded-full bg-[#1d1915] shadow-[0_30px_80px_-10px_rgba(0,0,0,0.9),inset_0_2px_0_rgba(255,255,255,0.06)]" />
          <div className="absolute inset-[12%] rounded-full bg-[#efe6d8] shadow-inner" />
          <div className="absolute inset-[26%] rounded-full bg-[radial-gradient(circle_at_40%_35%,#b45309,#7c2d12_60%,#431407)]" />
          <div className="absolute left-[38%] top-[30%] h-[12%] w-[30%] rotate-[-20deg] rounded-full bg-[#4d7c0f]/90" />
          <div className="absolute left-[52%] top-[52%] size-[6%] rounded-full bg-[#fbbf24]" />
          <div className="absolute left-[34%] top-[56%] size-[4%] rounded-full bg-[#efe6d8]" />
        </div>
      </div>

      <div className="absolute inset-x-8 bottom-6 flex items-center justify-between rounded-2xl border border-[#efe6d8]/10 bg-[#efe6d8]/[0.04] p-3 text-[11px] backdrop-blur">
        <div className="flex gap-5">
          <span><span className="text-[#efe6d8]/50">Hoy</span> · 4 personas</span>
          <span className="hidden sm:inline"><span className="text-[#efe6d8]/50">Hora</span> · 21:30</span>
        </div>
        <span className="rounded-lg bg-[#ea580c] px-3 py-1.5 font-medium text-white">Confirmar mesa →</span>
      </div>
    </div>
  );
}
