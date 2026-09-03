"use client";

import { useEffect, useRef } from "react";

/* ---------------------------------------------------------------------------
   DITHER TOUCH — the CTA's artwork.

   Source: a vectorised rendering of the two hands from the Creation of Adam.
   The plates it reads are cut by scripts/build-hands.mjs — see that script for
   the split point and the shared window.

   THE ARTWORK RUNS OFF BOTH EDGES ON PURPOSE. Both forearms enter from outside
   the frame, as they do in the fresco, and the band is full bleed so they reach
   the viewport border. Two attempts at softening that were wrong and are worth
   not repeating: fading the PLATE toward its edge does nothing useful, because
   every square is floored at 50% size and 45% alpha, so the column holds at the
   floor and then crosses the key all at once — a straight cut in pale squares.
   Dropping squares instead did dissolve, but it pulled the arms ~40px off the
   border, which is the opposite of what the composition wants.

   It is not rendered as an image. A canvas samples the plate into a grid and
   redraws it as squares whose size and alpha track how dark the drawing is
   underneath — the page's dither language taken apart and made live.

   THE GROUND IS KEYED OUT BY LUMINANCE, not by alpha: any cell lighter than
   `bgCut` is never painted, which isolates the hands and lets the section's own
   colour through. That is why build-hands.mjs compresses the drawing into
   0.06..0.80 before writing — the artwork's own highlights reach 0.96, and
   without the remap the key would punch holes through the middle of a forearm.
   The first source tried had no alpha at all and a halftone ground that keyed
   as artwork wherever the downsample landed it under the line; those were the
   stray squares floating in clear space.

   Two behaviours:
   · ASSEMBLE on first view, staggered by each cell's distance from the centre,
     so the picture gathers toward the point where the fingers nearly meet.
   · SCATTER under the pointer, cells pushed apart and falling back as it
     leaves. On a section that asks you to reach out, an image of two hands not
     quite touching that answers your hand is doing a job, not decorating.

   Reduced motion draws once and never binds a pointer. Coarse pointers get the
   assemble and nothing else — `pointermove` also fires for a touch drag, so on
   a phone the scatter would trigger on the gesture used to scroll past it.
   ------------------------------------------------------------------------ */

type Cell = { x: number; y: number; v: number; jx: number; jy: number; delay: number };

/* Pitch. 7px is the design size, but it is a CEILING rather than a constant:
   what has to stay fixed is how many cells the DRAWING gets, not how big each
   square is. At 1280 the band is 319px tall and 7px gives the plate 45 rows; at
   375 the same band is 94px and 7px leaves 13, at which point the fingers stop
   resolving and the artwork reads as texture. Holding the row count instead
   keeps the picture legible at every width — and it matches the rest of the
   page better than a fixed pitch does, since every other plate is a baked
   dither whose dots shrink with the image too. */
const CELL_MAX = 7;
const CELL_MIN = 3;
const TARGET_ROWS = 45;
const ASSEMBLE_MS = 900;
const PUSH_RADIUS = 110;
const PUSH_STRENGTH = 26;

/* Deterministic per-cell noise. Math.random would reshuffle the scatter on every
   reload and on every hot reload, which reads as a bug rather than a texture. */
function hash(i: number) {
  const s = Math.sin(i * 127.1) * 43758.5453;
  return s - Math.floor(s);
}

/* Tone curve applied to each square's weight.
   Linear was wrong for this artwork. The plate's pale mid-tones — the highlight
   across the left wrist, the back of each hand — landed at v≈0.10, which draws
   a square at just over half size and half opacity. Faithful to the value, but
   at this dot pitch it read as the hand coming APART from the arm. A gamma
   under 1 lifts those without touching the darks (0.10 → 0.25, 1.0 → 1.0), so
   the flesh stays continuous and the modelling survives.
   0.45 was tried and is too far: the squares merge and the halftone becomes a
   silhouette. */
const TONE_GAMMA = 0.6;

export default function DitherTouch({
  src,
  label,
  className = "",
  /** Luminance above this is the flat ground and is never painted. */
  bgCut = 0.88,
  /** CSS custom property the squares are drawn in. */
  inkVar = "--color-art-ink",
  /** `cover` fills the box and crops; `contain` fits the whole plate inside it. */
  fit = "cover",
}: {
  src: string;
  label: string;
  className?: string;
  bgCut?: number;
  inkVar?: string;
  fit?: "cover" | "contain";
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    const canvas = canvasRef.current;
    if (!host || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ink =
      getComputedStyle(document.documentElement).getPropertyValue(inkVar).trim() || "#4B0F04";

    let cells: Cell[] = [];
    let w = 0;
    let h = 0;
    let cell = CELL_MAX; // set from the measured box in resize()
    let raf = 0;
    let startedAt = 0;
    const pointer = { x: -9999, y: -9999, active: 0 };

    const img = new Image();
    img.decoding = "async";

    /* Sample by drawing the plate scaled DOWN to the grid: the browser box
       filters it, so each destination pixel is already the average of its cell.
       The image is fitted (contain) inside the box so it is never distorted. */
    function sample() {
      if (!img.complete || !img.naturalWidth || !w || !h) return;
      /* ceil, not floor. floor leaves the box's remainder permanently unreachable
         — at 754px wide, floor(754/7)=107 cells cover 749px and the last 5px can
         never be painted, which read as a margin down the right edge of the
         artwork. ceil over-covers by less than one cell and the canvas clips it. */
      const cols = Math.max(1, Math.ceil(w / cell));
      const rows = Math.max(1, Math.ceil(h / cell));

      const sx = cols / img.naturalWidth;
      const sy = rows / img.naturalHeight;
      /* cover overshoots the grid deliberately; drawImage clips the overflow, so
         the plate fills the box and crops instead of sitting inside it. */
      const scale = fit === "cover" ? Math.max(sx, sy) : Math.min(sx, sy);
      const dw = Math.max(1, Math.round(img.naturalWidth * scale));
      const dh = Math.max(1, Math.round(img.naturalHeight * scale));
      const dx = Math.round((cols - dw) / 2);
      const dy = Math.round((rows - dh) / 2);

      const off = document.createElement("canvas");
      off.width = cols;
      off.height = rows;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(img, dx, dy, dw, dh);
      const data = octx.getImageData(0, 0, cols, rows).data;

      const cx = cols / 2;
      const cy = rows / 2;
      const maxD = Math.hypot(cx, cy) || 1;

      /* Two passes. The first keeps whatever is darker than the ground and
         records the darkest value present; the second normalises against it, so
         the mapping calibrates itself to the plate instead of to a constant
         somebody tuned once against one image. */
      const kept: { c: number; r: number; lum: number }[] = [];
      let darkest = 1;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const i = (r * cols + c) * 4;
          if (data[i + 3] < 40) continue; // genuinely transparent, if ever
          const lum = (0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]) / 255;
          if (lum > bgCut) continue; // the flat ground
          if (lum < darkest) darkest = lum;
          kept.push({ c, r, lum });
        }
      }

      const span = Math.max(0.05, bgCut - darkest);
      cells = kept.map(({ c, r, lum }, n) => ({
        x: c * cell + cell / 2,
        y: r * cell + cell / 2,
        v: Math.pow(Math.min(1, (bgCut - lum) / span), TONE_GAMMA),
        jx: (hash(n) - 0.5) * 2,
        jy: (hash(n + 9973) - 0.5) * 2,
        delay: (Math.hypot(c - cx, r - cy) / maxD) * 0.45,
      }));
    }

    function draw(now: number) {
      if (!ctx) return false;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = ink;

      const t = startedAt ? (now - startedAt) / ASSEMBLE_MS : 0;
      let settling = false;

      /* `sq`, not `cell` — `cell` is the pitch now, and a loop variable of that
         name silently shadowed it here: every square was sized off its own
         object instead of the grid. */
      for (const sq of cells) {
        let p = reduce ? 1 : (t - sq.delay) / (1 - sq.delay || 1);
        p = p < 0 ? 0 : p > 1 ? 1 : p;
        const eased = 1 - Math.pow(1 - p, 3);
        if (p < 1) settling = true;

        let dx = (1 - eased) * sq.jx * 60;
        let dy = (1 - eased) * sq.jy * 60;

        if (pointer.active > 0.001) {
          const ox = sq.x - pointer.x;
          const oy = sq.y - pointer.y;
          const d = Math.hypot(ox, oy);
          if (d < PUSH_RADIUS && d > 0.001) {
            const f = (1 - d / PUSH_RADIUS) ** 2 * PUSH_STRENGTH * pointer.active;
            dx += (ox / d) * f + sq.jx * f * 0.5;
            dy += (oy / d) * f + sq.jy * f * 0.5;
          }
        }

        /* Floors of 0.5 and 0.45 rather than 0.35 and 0.3: with the ground keyed
           out, every square that survives IS the drawing, so even the palest
           part of a hand should read. The lower floors left the highlights so
           faint the hands dissolved at their edges. */

        const size = cell * (0.5 + 0.5 * sq.v) * (0.4 + 0.6 * eased);
        ctx.globalAlpha = (0.45 + 0.55 * sq.v) * eased;
        ctx.fillRect(sq.x + dx - size / 2, sq.y + dy - size / 2, size, size);
      }
      ctx.globalAlpha = 1;
      return settling;
    }

    function frame(now: number) {
      const settling = draw(now);
      if (pointer.active > 0 && pointer.x < -9000) pointer.active *= 0.88;
      if (pointer.active < 0.01) pointer.active = 0;
      if (settling || pointer.active > 0) raf = requestAnimationFrame(frame);
      else raf = 0;
    }

    function kick() {
      if (!raf) raf = requestAnimationFrame(frame);
    }

    function resize() {
      const rect = host!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      w = rect.width;
      h = rect.height;
      /* Pitch follows the box, so the drawing keeps its resolution as the band
         shrinks. Rounded to whole pixels — a fractional pitch puts every square
         on a half-pixel and the whole grid goes soft. */
      cell = Math.max(CELL_MIN, Math.min(CELL_MAX, Math.round(h / TARGET_ROWS)));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(w * dpr);
      canvas!.height = Math.round(h * dpr);
      canvas!.style.width = `${w}px`;
      canvas!.style.height = `${h}px`;
      sample();
      if (reduce) draw(performance.now());
      else kick();
    }

    const ro = new ResizeObserver(resize);
    ro.observe(host);

    /* Assemble starts the first time the artwork is on screen, not on mount —
       otherwise it plays to nobody and is over before the reader arrives. */
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting && !startedAt) {
            startedAt = performance.now();
            kick();
            io.disconnect();
          }
        }
      },
      { threshold: 0.2 }
    );
    io.observe(host);

    img.onload = () => {
      sample();
      if (reduce) {
        startedAt = performance.now();
        draw(performance.now());
      } else {
        kick();
      }
    };
    img.src = src;

    const onMove = (e: PointerEvent) => {
      const rect = host!.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = 1;
      kick();
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
      kick();
    };

    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!reduce && fine) {
      host.addEventListener("pointermove", onMove);
      host.addEventListener("pointerleave", onLeave);
    }

    return () => {
      ro.disconnect();
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      host.removeEventListener("pointermove", onMove);
      host.removeEventListener("pointerleave", onLeave);
      img.onload = null;
    };
  }, [src, bgCut, inkVar, fit]);

  return (
    <div ref={hostRef} className={`relative ${className}`}>
      {/* absolute, NOT in flow. resize() writes a pixel width onto this element
          to match the backing store to the DPR; while it was `static` that
          inline width fed straight back into layout — it propped the host open
          at whatever the widest measurement had been, so the ResizeObserver
          never saw the box shrink and the size latched at its maximum. On a
          375px screen the frame was 335px wide with 842px columns inside it,
          clipped by the frame's overflow so nothing looked wrong.
          Out of flow, the host sizes the canvas and never the reverse. */}
      <canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        className="absolute inset-0 block h-full w-full"
      />
      {/* Without JS the canvas is an empty box, so the plate itself stands in. */}
      <noscript>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={label} className="absolute inset-0 h-full w-full object-contain" />
      </noscript>
    </div>
  );
}
