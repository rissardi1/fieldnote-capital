"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { PLATES } from "@/lib/plates";
import { ColumnRules, PillLabel } from "@/components/Rules";
import { Figure } from "@/components/PanelKit";

/* ---------------------------------------------------------------------------
   SECTION 4 — PORTFOLIO / TRACK RECORD
   Reference: the "Say goodbye to working capital fire drills" composition —
   pill eyebrow, centred headline + lede, a segmented tab bar, then alternating
   text / visual rows with a floating card inside each panel.

   Translated to our system:
   · The reference's green-and-lime accent becomes our achromatic near-black —
     the palette carries no chroma outside the art layer (§2).
   · Flat grey panels become dither plates, as everywhere else on this page.
   · The tab bar is REAL: anchors with a scroll-spy active state. In the
     reference it is decorative, and a segmented control that highlights but
     does nothing is a fake affordance (§7).
   · The rows carry TRACK RECORD, not product features. A fund's proof is its
     numbers — pace, conviction, longevity — so each row is anchored by one
     figure rather than a capability claim.
   Tokens: docs/TOKENS.md §3 type · §4 spacing · §4.6 states · §6 motion
   ------------------------------------------------------------------------ */

const EASE_DRAMATIC = [0.16, 1, 0.3, 1] as const;

const EYEBROW = "Track record";
const HEADLINE = "Seven years of first cheques.";
const LEDE =
  "Forty-seven companies since 2019. The numbers below are the whole argument — pace, conviction, and how long we stay.";

type Row = {
  id: string;
  tag: string;
  tab: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  plate: (typeof PLATES)[keyof typeof PLATES];
  Card: () => React.ReactElement;
};

/* ---------- One number card shape, three sets of figures ------------------ */
function StatCard({
  label,
  value,
  unit,
  rows,
}: {
  label: string;
  value: string;
  unit?: string;
  rows: [string, string][];
}) {
  return (
    <div className="w-full max-w-[320px] rounded-md border border-line bg-surface">
      <div className="border-b border-line-subtle px-4 py-3">
        <p className="text-caption font-mono text-ink">{label}</p>
        <p className="mt-1.5 flex items-baseline gap-1.5">
          <Figure value={value} className="font-mono text-h1 text-ink tabular-nums" />
          {unit ? (
            <span className="font-mono text-caption text-ink">{unit}</span>
          ) : null}
        </p>
      </div>
      <dl className="divide-y divide-line-subtle">
        {rows.map(([k, v], i) => (
          <div key={k} className="flex items-center justify-between px-4 py-2">
            <dt className="text-caption font-mono text-ink">{k}</dt>
            <dd
              className={[
                "font-mono text-caption tabular-nums",
                i === rows.length - 1 ? "text-[var(--color-accent-warm)]" : "text-ink",
              ].join(" ")}
            >
              {v}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

const ROWS: Row[] = [
  {
    id: "pace",
    tag: "Pace",
    tab: "Pace",
    title: "Eleven days from first call to committed.",
    body: "One partner owns the decision end to end. You get a yes or a no, with the reasoning either way — never a maybe held open for a quarter.",
    cta: { label: "How we decide", href: "#thesis" },
    plate: PLATES.garlands,
    Card: () => (
      <StatCard
        label="Median days to decision"
        value="11"
        unit="days"
        rows={[
          ["First call", "Day 0"],
          ["References", "Day 4"],
          ["Committed", "Day 9"],
          ["Slowest in 2026", "19 days"],
        ]}
      />
    ),
  },
  {
    id: "conviction",
    tag: "Conviction",
    tab: "Conviction",
    title: "We follow on in two of every three.",
    body: "A first cheque never repeated is a vote of no confidence. We reserve against every position and deploy it wherever the evidence holds.",
    cta: { label: "What we back", href: "#focus" },
    plate: PLATES.assembly,
    Card: () => (
      <StatCard
        label="Follow-on rate"
        value="68"
        unit="%"
        rows={[
          ["Pre-seed to seed", "71%"],
          ["Seed to Series A", "64%"],
          ["Reserved per deal", "2.5x"],
          ["Led again", "19 rounds"],
        ]}
      />
    ),
  },
  {
    id: "longevity",
    tag: "Longevity",
    tab: "Longevity",
    title: "Forty-seven companies. Seven years.",
    body: "We underwrite decades, not exit windows. Most positions are still held, and the earliest of them is now in its seventh year.",
    cta: { label: "Send a note", href: "#cta" },
    plate: PLATES.tondo,
    Card: () => (
      <StatCard
        label="Companies backed"
        value="47"
        rows={[
          ["Since", "2019"],
          ["Median hold", "5.2 yrs"],
          ["Still held", "38 of 47"],
          ["Median cheque", "600k"],
        ]}
      />
    ),
  },
];

export default function Portfolio() {
  const reduce = useReducedMotion();
  const [activeTab, setActiveTab] = useState(0);
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Scroll-spy: whichever row owns the most of the viewport drives the tab.
     Plain IntersectionObserver — the tabs stay honest without extra deps. */
  useEffect(() => {
    const els = rowRefs.current.filter(Boolean) as HTMLDivElement[];
    if (!els.length) return;

    const ratios = new Map<Element, number>();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) =>
          ratios.set(e.target, e.isIntersecting ? e.intersectionRatio : 0)
        );
        let best = -1;
        let bestRatio = 0;
        els.forEach((el, i) => {
          const r = ratios.get(el) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            best = i;
          }
        });
        if (best >= 0) setActiveTab(best);
      },
      { threshold: [0, 0.25, 0.5, 0.75, 1], rootMargin: "-20% 0px -20% 0px" }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const rise = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.62, delay: reduce ? 0 : i * 0.09, ease: EASE_DRAMATIC },
  });

  /* pb-0: the last row already carries py-20, so the section adding another
     160px on top left a ~240px dead band before the next section. */
  return (
    <section id="portfolio" className="section section-flush-b relative bg-page">
      <ColumnRules />
      <div className="container-page">
        {/* ---- Centred header ---- */}
        <div className="mx-auto flex max-w-[760px] flex-col items-center text-center">
          <motion.div {...rise(0)}>
            <PillLabel>{EYEBROW}</PillLabel>
          </motion.div>

          <motion.h2 {...rise(1)} className="mt-6 text-h1 text-ink text-balance">
            {HEADLINE}
          </motion.h2>

          <motion.p
            {...rise(2)}
            className="mt-5 max-w-[58ch] text-body-lg text-ink-secondary text-pretty"
          >
            {LEDE}
          </motion.p>

          {/* ---- Tab bar: real anchors, scroll-spy active state ---- */}
          <motion.nav
            {...rise(3)}
            aria-label="Track record"
            className="mt-9 inline-flex items-center rounded-full border border-line bg-surface p-1"
          >
            {ROWS.map((r, i) => (
              <a
                key={r.id}
                href={`#${r.id}`}
                aria-current={activeTab === i ? "location" : undefined}
                className={[
                  "rounded-full px-4 py-2 text-nav transition-colors duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)]",
                  activeTab === i
                    ? "bg-accent text-on-dark"
                    : "text-ink-secondary hover:text-ink",
                ].join(" ")}
              >
                {r.tab}
              </a>
            ))}
          </motion.nav>
        </div>

        {/* ---- Alternating rows ---- */}
        {/* Rows are separated by a hairline rather than pure whitespace, so
            the section carries the same ruled structure as the hero band. */}
        {/* The divider is on the ROW, full width, so it runs the whole column
            and meets the side rules. The gutter sits on the inner grid instead
            — putting it on the parent inset the rule too, leaving it floating
            short of the verticals. */}
        <div className="mt-16 flex flex-col">
          {ROWS.map((row, i) => {
            const flip = i % 2 === 1;
            return (
              <div
                key={row.id}
                id={row.id}
                ref={(el) => {
                  rowRefs.current[i] = el;
                }}
                className={[
                  "scroll-mt-28 py-16 lg:py-20",
                  i > 0 ? "border-t border-line" : "",
                ].join(" ")}
              >
                <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16 lg:px-10 xl:px-12">
                {/* Text */}
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.62, ease: EASE_DRAMATIC }}
                  className={flip ? "lg:order-2" : undefined}
                >
                  <PillLabel>{row.tag}</PillLabel>
                  <h3 className="mt-5 max-w-[18ch] text-h2 text-ink text-balance">
                    {row.title}
                  </h3>
                  <p className="mt-4 max-w-[46ch] text-body text-ink-secondary text-pretty">
                    {row.body}
                  </p>
                  <a
                    href={row.cta.href}
                    className="mt-7 inline-flex items-center gap-3 rounded-full bg-accent py-1.5 pl-5 pr-1.5 text-nav text-on-dark transition-[background-color,transform] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-accent-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none"
                  >
                    {row.cta.label}
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-on-dark text-ink">
                      <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                        <path
                          d="M5 11 11 5m0 0H6m5 0v5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </a>
                </motion.div>

                {/* Visual */}
                <motion.div
                  initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: 0.62,
                    delay: reduce ? 0 : 0.09,
                    ease: EASE_DRAMATIC,
                  }}
                  className={[
                    "relative overflow-hidden rounded-lg",
                    flip ? "lg:order-1" : "",
                  ].join(" ")}
                  style={{ backgroundColor: row.plate.paper }}
                >
                  <Image
                    src={row.plate.src}
                    alt={row.plate.alt}
                    width={row.plate.width}
                    height={row.plate.height}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="h-[380px] w-full object-cover object-center sm:h-[440px]"
                  />
                  {/* Card capped and inset so the plate reads on all four sides —
                      the art is the point, not a border. */}
                  <div className="absolute inset-0 flex items-center justify-center p-8">
                    <row.Card />
                  </div>
                </motion.div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* PillLabel now lives in components/Rules.tsx — three sections use it. */
