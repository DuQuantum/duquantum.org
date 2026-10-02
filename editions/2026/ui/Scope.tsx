"use client";

import { useEffect, useRef } from "react";
import { cn } from "@/lib/cn";

/**
 * A tiny oscilloscope for the nav bar: a fine amber wave scrolling left forever
 * inside a ruled box -- a nod to the old cyclogram readouts.
 *
 * The wave is a sum of sines at unrelated frequencies (none a multiple of
 * another), so it stays smooth but never visibly repeats. Scrolling is just
 * sampling that function further along as time passes; one component also
 * drifts in phase with time, so the shape keeps evolving rather than only
 * sliding.
 *
 * Canvas rather than SVG so a frame is one cheap redraw, and drawn at device
 * pixel ratio so it stays crisp. It sleeps when the tab is hidden
 * (requestAnimationFrame stops), and under reduced motion it draws one still
 * frame.
 */

const COLORS = {
  grid: "rgba(99, 35, 35, 0.9)", // --dq-red
  trace: "rgba(232, 177, 103, 0.55)", // --dq-amber
};

/** [amplitude, spatial frequency (rad/px), drift (rad/s)]. Amplitudes sum to 1. */
const WAVES = [
  [0.5, 0.061, 0],
  [0.3, 0.137, 0.9],
  [0.2, 0.023, -0.4],
] as const;

const SPEED = 22; // px per second

/** Wave height, -1..1, at scroll position `u` px and time `t` s. */
function wave(u: number, t: number) {
  let y = 0;
  for (const [a, k, drift] of WAVES) y += a * Math.sin(u * k + t * drift);
  return y;
}

export default function Scope({ className }: { className?: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const el = canvas.current;
    const ctx = el?.getContext("2d");
    if (!el || !ctx) return;

    let w = 0;
    let h = 0;
    let frame = 0;
    const start = performance.now();

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      w = el.clientWidth;
      h = el.clientHeight;
      el.width = Math.round(w * dpr);
      el.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t: number) => {
      ctx.clearRect(0, 0, w, h);

      // ruled grid: three faint lines
      ctx.strokeStyle = COLORS.grid;
      ctx.lineWidth = 1;
      ctx.beginPath();
      for (const f of [0.25, 0.5, 0.75]) {
        const y = Math.round(h * f) + 0.5;
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
      }
      ctx.stroke();

      // the trace, sampled every pixel
      const mid = h / 2;
      const amp = mid - 3;
      const scroll = t * SPEED;
      ctx.strokeStyle = COLORS.trace;
      ctx.lineWidth = 1.25;
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let x = 0; x <= w; x += 1) {
        const y = mid - wave(x + scroll, t) * amp;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
    };

    const tick = (now: number) => {
      if (w > 0) draw((now - start) / 1000);
      frame = requestAnimationFrame(tick);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(el);

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) draw(0);
    else frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
    };
  }, []);

  return (
    <div
      aria-hidden
      className={cn(
        "flex items-center gap-2 font-mono text-[11px] text-dq-red",
        className,
      )}
    >
      <span>|ψ⟩</span>
      <span className="block h-[26px] min-w-0 flex-1 border-2 border-dq-red bg-dq-panel">
        <canvas ref={canvas} className="block h-full w-full" />
      </span>
    </div>
  );
}
