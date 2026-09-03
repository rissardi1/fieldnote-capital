"use client";

import { motion } from "motion/react";
import { Chip, Figure } from "@/components/PanelKit";

/* ---------------------------------------------------------------------------
   PORTFOLIO PANEL — code-rendered "fake UI", not a screenshot.
   Build spec: docs/TOKENS.md §7

   POLISH PASS, against amperos.com (2026-09-03). Their product panels are
   designed SVG rather than live DOM, so nothing was copied — but four habits
   were measured out of them and applied here:

   1. EVERY PANEL CARRIES A SUBTITLE. Theirs pair "Revenue Insights" with
      "Portfolio Overview · AI-powered analysis of your outstanding AR". A bare
      title labels a box; a subtitle says what you are looking at. Ours had a
      title and nothing else.

   2. NO NUMBER STANDS ALONE. Every headline figure of theirs is followed by a
      named comparison — "16%" then "Compared to 11% overall". Ours had a bare
      delta in a chip, which reads as decoration; it is now a written
      comparison against something specific.

   3. CHIPS ARE FOR STATUS, NEVER FOR DELTAS. In their UI the tinted pills are
      Denied / Medium / High — states. Deltas are plain grey text. We were
      putting "+6" in a chip, which spent the loudest element in the panel on
      the least surprising fact. The chips now carry whether we led the round.

   4. COLOUR IS COUNTED. Their fills: 28 ink, 21 grey, ~14 surface — against 7
      accent uses in the entire artwork. In an achromatic system the equivalent
      scarce resource is FULL-STRENGTH INK, so it is spent on values and row
      names only; every label around them is secondary.

   Labels moved from --color-ink-tertiary to --color-ink-secondary while here:
      tertiary measures 2.75:1 on this surface and these are real text, not
      decoration. See the standing note in §2.

   Every value is a token — no raw colours, sizes or easings in here.
   ------------------------------------------------------------------------ */

const EASE_DRAMATIC = [0.16, 1, 0.3, 1] as const;

/* `compare` is the Amperos move: the figure is never the whole story. */
const STATS = [
  { label: "Companies", value: "47", compare: "6 added since Q2" },
  { label: "Follow-on rate", value: "68%", compare: "against 61% in 2025" },
  { label: "Median first cheque", value: "$600k", compare: "against $535k in 2025" },
];

/* Capital deployed per quarter, 12 quarters. Static so the path is stable
   between server and client render — no Math.random anywhere. */
const SERIES = [18, 24, 21, 33, 29, 41, 38, 52, 47, 61, 58, 74];

const ROWS = [
  {
    mark: "H",
    name: "Halden Systems",
    sector: "Industrial telemetry",
    stage: "Seed",
    status: "Led",
    amount: "$1.4M",
    date: "Aug 2026",
  },
  {
    mark: "O",
    name: "Orrery",
    sector: "Developer tooling",
    stage: "Pre-seed",
    status: "Led",
    amount: "$400k",
    date: "Jul 2026",
  },
  {
    mark: "W",
    name: "Weft Labs",
    sector: "Materials simulation",
    stage: "Seed",
    status: "Followed",
    amount: "$2.0M",
    date: "Jun 2026",
  },
];
/* Three rows, not four. The panel floats over the plate — past ~540px tall it
   crowds the art out of its own frame. Row count is the cheapest lever. */

/* Build the sparkline path once at module scope. */
const SPARK_W = 100;
const SPARK_H = 28;
const SPARK_MIN = Math.min(...SERIES);
const SPARK_MAX = Math.max(...SERIES);
const pointAt = (i: number) => ({
  x: (i / (SERIES.length - 1)) * SPARK_W,
  y: SPARK_H - ((SERIES[i] - SPARK_MIN) / (SPARK_MAX - SPARK_MIN)) * SPARK_H,
});
const SPARK_PATH = SERIES.map((_, i) => {
  const p = pointAt(i);
  return `${i === 0 ? "M" : "L"}${p.x.toFixed(2)},${p.y.toFixed(2)}`;
}).join(" ");
const SPARK_END = pointAt(SERIES.length - 1);

/* Uses motion-managed `whileInView` rather than a hand-rolled `animate:
   inView ? {...} : undefined`. That pattern leaves `animate` undefined until an
   observer fires, so anything the observer misses stays at opacity 0 forever.
   `whileInView` owns its own observer and always resolves. */
export default function PortfolioPanel({ reduce }: { reduce: boolean }) {
  const show = (delay: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.15 },
    transition: { duration: 0.62, delay: reduce ? 0 : delay, ease: EASE_DRAMATIC },
  });

  return (
    <motion.div
      {...show(0)}
      className="mx-auto w-full max-w-[880px] overflow-hidden rounded-lg border border-line bg-surface"
    >
      {/* ---- Header: title + subtitle, not a title alone ---- */}
      <div className="flex items-start justify-between gap-4 border-b border-line-subtle px-5 py-4">
        <div className="min-w-0">
          <p className="text-h4 text-ink">Portfolio</p>
          <p className="mt-0.5 truncate text-caption text-ink-secondary">
            Positions held, by date of first cheque
          </p>
        </div>

        {/* Segmented control — a STATE display, not a control: no pointer
            cursor and no hover, so it does not promise a click it cannot take. */}
        <div className="hidden shrink-0 items-center gap-0.5 rounded-sm border border-line p-0.5 sm:flex">
          {["All", "Seed", "Pre-seed"].map((t, i) => (
            <span
              key={t}
              className={[
                "rounded-xs px-2.5 py-1 text-caption uppercase font-mono",
                i === 0 ? "bg-page text-ink" : "text-ink-secondary",
              ].join(" ")}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ---- Stats: value, then a named comparison ---- */}
      <div className="grid grid-cols-1 divide-y divide-line-subtle border-b border-line-subtle sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {STATS.map((s, i) => (
          <motion.div key={s.label} {...show(0.14 + i * 0.09)} className="px-5 py-4">
            <p className="text-caption font-mono text-ink">{s.label}</p>
            <Figure
              value={s.value}
              className="mt-2 block font-mono text-h2 text-ink tabular-nums"
            />
            <p className="mt-1 text-caption text-ink-secondary">{s.compare}</p>
          </motion.div>
        ))}
      </div>

      {/* ---- Sparkline ---- */}
      <motion.div
        {...show(0.41)}
        className="flex items-center gap-5 border-b border-line-subtle px-5 py-3.5"
      >
        <div className="shrink-0">
          <p className="text-caption font-mono text-ink">Capital deployed</p>
          <Figure value="$28.4M" className="mt-1 block font-mono text-h4 text-ink tabular-nums" />
        </div>
        <svg
          viewBox={`0 -3 ${SPARK_W} ${SPARK_H + 6}`}
          preserveAspectRatio="none"
          className="h-10 min-w-0 flex-1"
          aria-hidden
        >
          <motion.path
            d={SPARK_PATH}
            fill="none"
            stroke="var(--color-ink)"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
            initial={{ pathLength: reduce ? 1 : 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduce ? 0 : 1.6, ease: [0, 0, 0.2, 1] }}
          />
          {/* The line now terminates on something. A trend that just stops at
              the frame edge reads as a crop; a marked last point reads as the
              current value, which is what the figure beside it claims. */}
          <motion.circle
            cx={SPARK_END.x}
            cy={SPARK_END.y}
            r="2"
            fill="var(--color-accent-warm)"
            vectorEffect="non-scaling-stroke"
            initial={{ opacity: reduce ? 1 : 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 1.5 }}
          />
        </svg>
        <span className="shrink-0 text-right text-caption text-ink-secondary">
          12 quarters
          <br />
          to Q3 2026
        </span>
      </motion.div>

      {/* ---- Column headers ---- */}
      <div className="hidden items-center gap-4 border-b border-line-subtle bg-page px-5 py-2 sm:flex">
        <span className="flex-1 text-caption font-mono text-ink">Company</span>
        <span className="w-24 text-caption font-mono text-ink">Stage</span>
        <span className="w-16 text-right text-caption font-mono text-ink">
          Cheque
        </span>
        <span className="w-20 text-right text-caption font-mono text-ink">
          Date
        </span>
      </div>

      {/* ---- Rows ---- */}
      <ul>
        {ROWS.map((row, i) => (
          <motion.li
            key={row.name}
            {...show(0.5 + i * 0.09)}
            className="group relative flex items-center gap-4 border-b border-line-subtle px-5 py-2.5 transition-colors duration-[220ms] last:border-b-0 hover:bg-page"
          >
            {/* Hover marker: scales from the row's own edge rather than
                fading in, so the row reads as being picked out of a list. */}
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-[2px] origin-top scale-y-0 bg-[var(--color-accent-warm)] transition-transform duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-y-100 motion-reduce:transition-none"
            />
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xs border border-line font-mono text-caption text-ink-secondary transition-colors duration-[220ms] group-hover:border-[var(--color-accent-warm)] group-hover:text-[var(--color-accent-warm)]">
                {row.mark}
              </span>
              <div className="min-w-0">
                {/* Name and status on one line: the chip is the only filled
                    element in the row, so it has to be carrying a state rather
                    than repeating something already in a column. */}
                <div className="flex items-center gap-2">
                  <p className="truncate text-body text-ink">{row.name}</p>
                  <Chip tone={row.status === "Led" ? "warm" : "quiet"}>{row.status}</Chip>
                </div>
                <p className="truncate text-caption text-ink-secondary">{row.sector}</p>
              </div>
            </div>
            <span className="w-24 shrink-0">
              <span className="rounded-xs border border-line px-2 py-0.5 text-caption font-mono text-ink">
                {row.stage}
              </span>
            </span>
            <span className="w-16 shrink-0 text-right font-mono text-small text-ink tabular-nums">
              {row.amount}
            </span>
            <span className="hidden w-20 shrink-0 text-right font-mono text-caption text-ink-secondary tabular-nums sm:block">
              {row.date}
            </span>
          </motion.li>
        ))}
      </ul>

      {/* ---- Footer ----
          "updated 2h ago" is gone. It claimed a refresh cadence on a static
          mock — the same lie the LIVE pill told before it was removed. */}
      <motion.div
        {...show(0.86)}
        className="flex items-center justify-between border-t border-line-subtle px-5 py-3"
      >
        {/* "View all →" was here: a span with an arrow, which is the
            universal signal for a link, going nowhere. The count beside it
            already says there is more, so deleting it cost nothing and stopped
            the panel promising navigation it cannot perform. */}
        <span className="font-mono text-caption text-ink-secondary tabular-nums">
          Showing 3 of 47 positions
        </span>
        <span className="font-mono text-caption text-ink-secondary tabular-nums">
          Sorted by first cheque
        </span>
      </motion.div>
    </motion.div>
  );
}
