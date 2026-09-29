"use client";

import { useEffect, useRef } from "react";

/**
 * "Signal field": a quiet grid of points that wakes up around the cursor.
 * The idea — a market full of identical dots, and one area that lights up and stands out.
 *
 * Canvas 2D, DPR-aware, paused when off-screen, static frame for reduced motion.
 */
export function SignalField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const GAP = 26;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let frame = 0;
    let running = false;

    // Pointer target and smoothed position. Idle state drifts along a slow Lissajous path.
    const target = { x: -9999, y: -9999, active: false };
    const pos = { x: 0, y: 0 };

    function resize() {
      if (!canvas || !ctx) return;
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      pos.x = width * 0.62;
      pos.y = height * 0.45;
      if (!running) draw(0);
    }

    function draw(t: number) {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      if (!target.active) {
        target.x = width * (0.55 + Math.sin(t * 0.00023) * 0.22);
        target.y = height * (0.48 + Math.cos(t * 0.00031) * 0.2);
      }
      pos.x += (target.x - pos.x) * 0.075;
      pos.y += (target.y - pos.y) * 0.075;

      const sigma = Math.max(width, height) * 0.16;
      const s2 = sigma * sigma;
      const cols = Math.ceil(width / GAP) + 1;
      const rows = Math.ceil(height / GAP) + 1;
      const ox = (width - (cols - 1) * GAP) / 2;
      const oy = (height - (rows - 1) * GAP) / 2;

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const bx = ox + c * GAP;
          const by = oy + r * GAP;
          const dx = bx - pos.x;
          const dy = by - pos.y;
          const d2 = dx * dx + dy * dy;
          const k = Math.exp(-d2 / s2);
          const wave = reduce ? 0 : Math.sin(t * 0.0012 - (bx + by) * 0.012) * 0.5 + 0.5;

          // Points are pushed gently outward from the light, like a lens.
          const d = Math.sqrt(d2) || 1;
          const push = k * 10;
          const x = bx + (dx / d) * push;
          const y = by + (dy / d) * push;

          const radius = 0.7 + k * 1.9;
          const alpha = 0.07 + wave * 0.05 + k * 0.85;

          // Violet → cyan as intensity grows.
          const rr = Math.round(139 + (94 - 139) * k);
          const gg = Math.round(124 + (230 - 124) * k);
          const bb = Math.round(255 + (208 - 255) * k);
          ctx.fillStyle = `rgba(${rr},${gg},${bb},${alpha})`;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    }

    function loop(t: number) {
      draw(t);
      frame = requestAnimationFrame(loop);
    }

    function start() {
      if (running || reduce) return;
      running = true;
      frame = requestAnimationFrame(loop);
    }

    function stop() {
      running = false;
      cancelAnimationFrame(frame);
    }

    function onPointer(e: PointerEvent) {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      target.active = e.clientY >= rect.top && e.clientY <= rect.bottom;
    }

    function onLeave() {
      target.active = false;
    }

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    const io = new IntersectionObserver(([entry]) => (entry.isIntersecting ? start() : stop()));
    io.observe(canvas);
    window.addEventListener("pointermove", onPointer, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    resize();

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden className={className} />;
}
