"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------------------------------------
   PANEL KIT — the shared vocabulary for every code-rendered UI on the page.

   Five components were building the same pieces by hand: the Hero's portfolio
   panel, §3's three mini-UIs, §4's stat card, §5's screening stack and §6's
   deal file. They had drifted — three different chip treatments, labels split
   between tertiary and secondary, numbers with and without comparisons. This
   file is the single answer to each of those.

   The habits encoded here were measured off amperos.com, whose product panels
   are designed SVG rather than live DOM:

   · A PANEL CARRIES A SUBTITLE. A bare title labels a box; a subtitle says what
     you are looking at.
   · NO NUMBER STANDS ALONE. Every figure gets a named comparison.
   · CHIPS ARE FOR STATUS. Deltas are plain text. A filled chip is the loudest
     thing in a panel and must not be spent on the least surprising fact.
   · COLOUR IS COUNTED. Their fills ran 28 ink / 21 grey / ~14 surface against
     7 accent uses in a whole artwork. `warm` here is held to the same
     discipline: at most two per panel, never where a neutral would do.
   ------------------------------------------------------------------------ */

const EASE_DRAMATIC = [0.16, 1, 0.3, 1] as const;

/* --------------------------------------------------------------------------
   Panel header: title, subtitle, optional right-hand slot.
   -------------------------------------------------------------------------- */
export function PanelHead({
  title,
  subtitle,
  right,
  compact = false,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  compact?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-start justify-between gap-4 border-b border-line-subtle",
        compact ? "px-3.5 py-2.5" : "px-5 py-4",
      ].join(" ")}
    >
      <div className="min-w-0">
        <p className={compact ? "text-small text-ink" : "text-h4 text-ink"}>{title}</p>
        {subtitle ? (
          <p className="mt-0.5 truncate text-caption text-ink-secondary">{subtitle}</p>
        ) : null}
      </div>
      {right ? <div className="shrink-0">{right}</div> : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Chip. `tone` is the whole API, and there are only three because a fourth
   would immediately be used to mean nothing in particular.
     quiet  — an outline. The default, and what most states should be.
     solid  — near-black fill. One per panel at most.
     warm   — the accent. The single loudest mark available; spend it on the
              one state the reader should leave remembering.
   -------------------------------------------------------------------------- */
export function Chip({
  children,
  tone = "quiet",
}: {
  children: React.ReactNode;
  tone?: "quiet" | "solid" | "warm";
}) {
  const tones = {
    quiet: "border border-line text-ink-secondary",
    solid: "bg-accent text-on-dark",
    warm: "bg-[var(--color-accent-warm-tint)] text-[var(--color-accent-warm)]",
  };
  return (
    <span
      className={[
        "inline-block shrink-0 whitespace-nowrap rounded-xs px-1.5 py-0.5 text-caption font-mono",
        tones[tone],
      ].join(" ")}
    >
      {children}
    </span>
  );
}

/* --------------------------------------------------------------------------
   A figure that counts up when it first comes into view.

   Parses the number out of the string and animates only that, so "$600k",
   "68%" and "2.5×" keep their prefix and suffix rather than needing three
   props. Reduced motion, and any string without a number, render verbatim.
   -------------------------------------------------------------------------- */
export function Figure({ value, className = "" }: { value: string; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState<string>(value);

  useEffect(() => {
    const el = ref.current;
    const match = value.match(/^(\D*)([\d.,]+)(.*)$/);
    if (!el || reduce || !match) {
      setShown(value);
      return;
    }
    const [, prefix, digits, suffix] = match;
    const target = Number(digits.replace(/,/g, ""));
    if (!Number.isFinite(target)) {
      setShown(value);
      return;
    }
    const decimals = (digits.split(".")[1] || "").length;
    const grouped = digits.includes(",");
    const fmt = (n: number) => {
      const s = n.toFixed(decimals);
      return grouped ? Number(s).toLocaleString("en-GB", { minimumFractionDigits: decimals }) : s;
    };

    let raf = 0;
    let fallback = 0;
    let start = 0;
    const DURATION = 900;

    const io = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        io.disconnect();
        const step = (now: number) => {
          if (!start) start = now;
          const p = Math.min(1, (now - start) / DURATION);
          const eased = 1 - Math.pow(1 - p, 3);
          setShown(`${prefix}${fmt(target * eased)}${suffix}`);
          if (p < 1) raf = requestAnimationFrame(step);
        };
        setShown(`${prefix}${fmt(0)}${suffix}`);
        raf = requestAnimationFrame(step);
        /* Hard floor. The count runs on rAF, and rAF stops in a backgrounded
           tab — so a panel whose animation started and then lost its frames
           would sit on "0 companies" indefinitely, which is worse than never
           animating. This forces the true value once the window has passed,
           whatever happened to the frames. */
        fallback = window.setTimeout(() => {
          if (raf) cancelAnimationFrame(raf);
          setShown(value);
        }, DURATION + 400);
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => {
      io.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (fallback) clearTimeout(fallback);
    };
  }, [value, reduce]);

  /* The final string is in the DOM from the first render and the animated one
     replaces it, so a crawler or a failed observer still reads the real value.
     aria-hidden on the animating copy would leave nothing to announce; instead
     the element carries the settled value as its accessible name. */
  return (
    <span ref={ref} className={className} aria-label={value} role="text">
      <span aria-hidden>{shown}</span>
    </span>
  );
}

/* --------------------------------------------------------------------------
   Stat cell: label, figure, named comparison.
   -------------------------------------------------------------------------- */
export function StatCell({
  label,
  value,
  compare,
  className = "",
}: {
  label: string;
  value: string;
  compare?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-caption font-mono text-ink">{label}</p>
      <Figure value={value} className="mt-2 block font-mono text-h2 text-ink tabular-nums" />
      {compare ? <p className="mt-1 text-caption text-ink-secondary">{compare}</p> : null}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Bar row: label, a track that fills on view, and the value at the end.

   The bar grows from 0 rather than appearing at full width — the amperos bars
   read as measurements, and a measurement that was drawn rather than declared
   is the difference. `warm` marks the one row worth noticing.
   -------------------------------------------------------------------------- */
export function BarRow({
  label,
  pct,
  value,
  warm = false,
  delay = 0,
}: {
  label: string;
  pct: number;
  value: string;
  warm?: boolean;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <li>
      <div className="flex items-baseline justify-between gap-3">
        <span className="truncate text-caption text-ink">{label}</span>
        <span
          className={[
            "font-mono text-caption tabular-nums",
            warm ? "text-[var(--color-accent-warm)]" : "text-ink",
          ].join(" ")}
        >
          {value}
        </span>
      </div>
      <div className="mt-1.5 h-[3px] w-full overflow-hidden rounded-full bg-line-subtle">
        <motion.div
          className={["h-full rounded-full", warm ? "bg-[var(--color-accent-warm)]" : "bg-ink"].join(
            " "
          )}
          initial={{ width: reduce ? `${pct}%` : 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay, ease: EASE_DRAMATIC }}
        />
      </div>
    </li>
  );
}
