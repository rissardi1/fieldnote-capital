"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { PLATES } from "@/lib/plates";
import { BarRow, Chip, Figure, PanelHead } from "@/components/PanelKit";

/* ---------------------------------------------------------------------------
   SECTION 3 — THESIS
   Layout reference: Answerr's three-up — split header (serif-weight headline
   left, description right), a bordered three-column grid where each cell holds
   a label plus an art panel with a floating mini-UI, then title + copy beneath
   the grid rather than inside it.
   Deviation from the reference: the panel ground is a dither plate, not a flat
   grey fill. Plate grounds come from lib/plates.ts (sampled per file).
   Tokens: docs/TOKENS.md §3 type · §4 spacing · §6 motion · §7 art layer
   ------------------------------------------------------------------------ */

const EASE_DRAMATIC = [0.16, 1, 0.3, 1] as const;

const HEAD_1 = "One thesis.";
const HEAD_2 = "Three ways we work.";           // 31 total ≤ 40 cap
const LEDE =
  "We write the first cheque, decide in two weeks, and stay close for the decade that follows. The same three commitments on every deal.";

/* ---------- Mini-UI 1 — sector bars + side stats ---------- */
const SECTORS = [
  { label: "Industrial", pct: 92 },
  { label: "Developer tooling", pct: 88 },
  { label: "Life sciences", pct: 72 },
];
const FUNNEL = [
  { label: "Inbound", value: "1,240" },
  { label: "Screened", value: "312" },
  { label: "Met", value: "89" },
];

function SourcingUI() {
  return (
    <div className="w-full rounded-md border border-line bg-surface">
      <PanelHead compact title="Sourcing" subtitle="Where the last 200 files came from" />
      <div className="grid grid-cols-[1fr_auto]">
        <div className="border-r border-line-subtle p-3.5">
          {/* BarRow draws each track from zero on view. A bar that was measured
              reads differently from one that was declared, and the widths here
              are the whole point of the panel. The largest share is the one
              warm mark. */}
          <ul className="space-y-3">
            {SECTORS.map((s, i) => (
              <BarRow
                key={s.label}
                label={s.label}
                pct={s.pct}
                value={`${s.pct}%`}
                warm={s.pct === Math.max(...SECTORS.map((x) => x.pct))}
                delay={i * 0.09}
              />
            ))}
          </ul>
        </div>
        <div className="w-[92px] divide-y divide-line-subtle">
          {FUNNEL.map((f) => (
            <div key={f.label} className="px-3 py-[11px]">
              <p className="text-caption font-mono text-ink">{f.label}</p>
              <Figure
                value={f.value}
                className="mt-0.5 block font-mono text-caption text-ink tabular-nums"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t border-line-subtle px-3.5 py-2.5">
        {/* Was "Open a file" + a warm "Track" chip — a label and a button
            that did nothing, and the polish pass had just made the button the
            loudest thing in the panel. Now a count, which is what the funnel
            above it actually produces. */}
        <span className="text-caption font-mono text-ink">Now tracking</span>
        <span className="font-mono text-caption text-ink tabular-nums">38 files</span>
      </div>
    </div>
  );
}

/* ---------- Mini-UI 2 — stat row + decision notes ---------- */
const DILIGENCE = [
  { label: "Memos", value: "48" },
  { label: "Refs / deal", value: "6.2" },
  { label: "Days to yes", value: "11" },
];
const NOTES = [
  { strong: "Signal:", rest: "Three customers renewed before the round opened." },
  { strong: "Risk:", rest: "Single-channel distribution. Flagged, not fatal." },
];

function ConvictionUI() {
  return (
    <div className="w-full rounded-md border border-line bg-surface">
      <PanelHead compact title="Conviction" subtitle="What we checked before committing" />
      <div className="grid grid-cols-3 divide-x divide-line-subtle border-b border-line-subtle">
        {DILIGENCE.map((d) => (
          <div key={d.label} className="px-3 py-3">
            <p className="text-caption font-mono text-ink">{d.label}</p>
            <Figure
              value={d.value}
              className="mt-1 block font-mono text-caption text-ink tabular-nums"
            />
          </div>
        ))}
      </div>
      <div className="flex items-center justify-between px-3.5 pb-1 pt-3">
        <p className="text-caption font-mono text-ink">Decision notes</p>
        {/* "Recent" as a warm chip read as an active filter. It is a time
            window, so it says so, in the same voice as every other label. */}
        <span className="text-caption font-mono text-ink">Last 30 days</span>
      </div>
      <ul className="space-y-1.5 p-3.5 pt-2">
        {NOTES.map((n) => (
          <li key={n.strong} className="rounded-xs bg-page px-2.5 py-2">
            <p className="text-caption text-ink-secondary">
              <span className="text-ink">{n.strong}</span> {n.rest}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- Mini-UI 3 — score + radar + range ---------- */
const AXES = ["Hiring", "Capital", "Customers", "Product", "Board"];
const VALUES = [0.86, 0.72, 0.9, 0.6, 0.78];
const R = 30;
const CX = 40;
const CY = 40;

const polar = (i: number, n: number, radius: number) => {
  const a = (-90 + (360 / n) * i) * (Math.PI / 180);
  return [CX + radius * Math.cos(a), CY + radius * Math.sin(a)] as const;
};
const toPoints = (radii: number[]) =>
  radii.map((r, i) => polar(i, radii.length, r).map((v) => v.toFixed(1)).join(",")).join(" ");

const WEB_RINGS = [0.33, 0.66, 1].map((f) => toPoints(AXES.map(() => R * f)));
const SHAPE = toPoints(VALUES.map((v) => R * v));

function SupportUI() {
  return (
    <div className="w-full rounded-md border border-line bg-surface">
      <div className="flex items-center justify-between gap-3 p-3.5">
        <div>
          <p className="whitespace-nowrap text-caption font-mono text-ink">
            Support
          </p>
          <Figure value="74" className="mt-1 block font-mono text-h3 text-ink tabular-nums" />
        </div>

        <svg viewBox="0 0 80 80" className="h-[74px] w-[74px] shrink-0" aria-hidden>
          {WEB_RINGS.map((pts, i) => (
            <polygon
              key={i}
              points={pts}
              fill="none"
              stroke="var(--color-line)"
              strokeWidth="0.5"
            />
          ))}
          {AXES.map((_, i) => {
            const [x, y] = polar(i, AXES.length, R);
            return (
              <line
                key={i}
                x1={CX}
                y1={CY}
                x2={x}
                y2={y}
                stroke="var(--color-line)"
                strokeWidth="0.5"
              />
            );
          })}
          <polygon
            points={SHAPE}
            fill="var(--color-accent-warm)"
            fillOpacity="0.14"
            stroke="var(--color-accent-warm)"
            strokeWidth="1"
          />
        </svg>

        <div className="text-right">
          <p className="whitespace-nowrap text-caption font-mono text-ink">
            Follow-on
          </p>
          <p className="mt-1 font-mono text-caption text-ink tabular-nums">Top 8%</p>
        </div>
      </div>

      <div className="border-t border-line-subtle px-3.5 py-3">
        <p className="text-caption font-mono text-ink">
          Out of 100 · conviction high
        </p>
        <div className="relative mt-2.5 h-px w-full bg-line">
          <span className="absolute -top-[3px] h-[7px] w-[7px] -translate-x-1/2 rounded-full bg-ink" style={{ left: "74%" }} />
        </div>
        <div className="mt-2 flex justify-between font-mono text-caption text-ink-secondary tabular-nums">
          <span>0</span><span>25</span><span>50</span><span>75</span><span>100</span>
        </div>
      </div>
    </div>
  );
}

/* ---------- Columns ---------- */
const COLUMNS = [
  {
    tag: "Sourcing",
    title: "We find you early",
    body: "Pre-product, pre-deck, pre-warm-intro. We go looking before the round exists.",
    plate: PLATES.calumny,
    UI: SourcingUI,
  },
  {
    tag: "Conviction",
    title: "We decide in two weeks",
    body: "One partner owns it end to end. A yes or a no, with the reasoning either way.",
    plate: PLATES.panel,
    UI: ConvictionUI,
  },
  {
    tag: "The decade",
    title: "We stay long after",
    body: "Follow-on capital, hiring, and the introductions that actually close.",
    plate: PLATES.venus,
    UI: SupportUI,
  },
];

export default function Thesis() {
  const reduce = useReducedMotion();

  const rise = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.25 },
    transition: {
      duration: 0.62,
      delay: reduce ? 0 : i * 0.09,
      ease: EASE_DRAMATIC,
    },
  });

  return (
    <section id="thesis" className="section bg-page-alt">
      <div className="container-page">
        {/* Split header */}
        <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
          <motion.h2 {...rise(0)} className="text-h1 text-ink text-balance lg:col-span-6">
            {HEAD_1}
            <br className="hidden sm:block" /> {HEAD_2}
          </motion.h2>
          <motion.p
            {...rise(1)}
            className="text-body text-ink-secondary text-pretty lg:col-span-5 lg:col-start-8"
          >
            {LEDE}
          </motion.p>
        </div>

        {/* Grid of art panels */}
        <div className="mt-14 grid grid-cols-1 overflow-hidden rounded-lg border border-line md:grid-cols-3">
          {COLUMNS.map((col, i) => (
            <motion.div
              key={col.tag}
              {...rise(i)}
              className="border-b border-line last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
            >
              <div className="flex items-center gap-2 px-5 py-4">
                <span className="h-2 w-2 bg-ink" />
                <span className="text-caption font-mono text-ink">
                  {col.tag}
                </span>
              </div>

              {/* Art panel — dither plate ground, floating mini-UI on top.
                  Ground colour comes from the plate's own sampled paper. */}
              <div
                className="relative mx-5 mb-5 overflow-hidden rounded-md"
                style={{ backgroundColor: col.plate.paper }}
              >
                <Image
                  src={col.plate.src}
                  alt={col.plate.alt}
                  width={col.plate.width}
                  height={col.plate.height}
                  sizes="(min-width: 768px) 33vw, 100vw"
                  /* 320 was starving the art. The mini-UIs are centred inside
                     p-6, so a 320px plate offered 272px of usable height — and
                     the Conviction panel is 309px, overflowing its own padding
                     and leaving 5px of plate visible below it. The painting had
                     been reduced to a hairline frame around a white box, which
                     is the exact failure this grid was rebuilt to avoid.
                     At 440 the three panels clear by 65 / 80 / 128px and the
                     plate is the dominant element again. */
                  className="h-[400px] w-full object-cover object-center lg:h-[440px]"
                />
                {/* The plate has to READ. The mini-UI is capped and inset so the
                    art is visible on all four sides — target ~65% coverage, the
                    ratio the Answerr panels use. A card that fills the panel
                    turns the plate into a border. */}
                <div className="absolute inset-0 flex items-center justify-center p-6">
                  <div className="w-full max-w-[300px]">
                    <col.UI />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Titles + copy, beneath the grid as in the reference */}
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6">
          {COLUMNS.map((col, i) => (
            <motion.div key={col.title} {...rise(i)}>
              {/* `text-label` — a content token. Was `text-nav`, which the system
                  documents as chrome that must never carry content. */}
              <h3 className="text-label text-ink">
                {col.title}
              </h3>
              <p className="mt-3 max-w-[34ch] text-body text-ink-secondary text-pretty">
                {col.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
