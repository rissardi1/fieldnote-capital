"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import { PLATES } from "@/lib/plates";
import { Chip, Figure } from "@/components/PanelKit";

/* ---------------------------------------------------------------------------
   SECTION 5 — FOCUS AREAS
   Layout reference: the "Engineered for Business Growth" composition — split
   header (headline left, lede + action right), then two stacked cards | tall
   centre visual | two stacked cards, each card led by a bracketed [01] index.
   Translated to our system, not copied: light band instead of dark, Geist
   instead of the reference serif, dither plate instead of a mesh gradient,
   and our radius / border / motion language throughout.
   Tokens: docs/TOKENS.md §3 type · §4 spacing · §6 motion · §7 art layer
   ------------------------------------------------------------------------ */

const EASE_DRAMATIC = [0.16, 1, 0.3, 1] as const;

const HEADLINE = "What we look for."; // 17 ≤ 40 cap
const LEDE =
  "We are generalists about sector and specific about everything else. Four things decide it.";

const CARDS = [
  {
    n: "01",
    title: "Technical founders",
    body: "You built the thing yourself before anyone gave you money to.",
  },
  {
    n: "02",
    title: "Unglamorous markets",
    body: "Logistics, materials, compliance. Industries that resist software.",
  },
  {
    n: "03",
    title: "Evidence over narrative",
    body: "One customer who renewed beats ten who signed a letter of intent.",
  },
  {
    n: "04",
    title: "Ten-year patience",
    body: "We underwrite decades, not exit windows.",
  },
];

/* The centre visual: a screening stack. Three memos at three verdicts, which is
   the section's actual subject — what passes the filter and what does not. */
const STACK = [
  { id: "FN-118", state: "Passed", tone: "muted" as const },
  { id: "FN-119", state: "Tracking", tone: "muted" as const },
];

function FocusCard({
  card,
  index,
  reduce,
}: {
  card: (typeof CARDS)[number];
  index: number;
  reduce: boolean;
}) {
  return (
    <motion.article
      initial={reduce ? { opacity: 0 } : { opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.62,
        delay: reduce ? 0 : index * 0.09,
        ease: EASE_DRAMATIC,
      }}
      /* No hover lift or border change: these are content, not controls.
         Movement on hover promises a click target that does not exist. */
      className="flex h-full flex-col rounded-md border border-line-subtle bg-surface p-6"
    >
      <p className="font-mono text-caption text-ink tabular-nums">[{card.n}]</p>
      <h3 className="mt-4 text-h3 text-ink text-balance">{card.title}</h3>
      <p className="mt-3 max-w-[38ch] text-body text-ink-secondary text-pretty">{card.body}</p>
    </motion.article>
  );
}

export default function Focus() {
  const reduce = useReducedMotion();
  const plate = PLATES.nastagio;

  const rise = (i: number) => ({
    initial: reduce ? { opacity: 0 } : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.4 },
    transition: {
      duration: 0.62,
      delay: reduce ? 0 : i * 0.09,
      ease: EASE_DRAMATIC,
    },
  });

  /* No rules in this section at all, and that is now settled. Vertical rules
     were tried twice — once spanning the whole section, which carried them down
     alongside the bordered card grid, and once as a ruled lead-in above the
     header. Then the header itself carried a four-sided ruled band, which is
     also out. The cards' own hairline frames are the only borders left, and the
     section keeps its ordinary `.section` padding.

     (A JSX comment cannot be the first thing inside `return (` before the root
     element — it parses as an object literal. TS1005.) */
  return (
    <section id="focus" className="section bg-page-alt">
      <div className="container-page">
        {/* ---- Split header ----
            This was a ruled band: horizontals top and bottom plus vertical
            end-ticks, four solid lines boxing the header. Removed on request.

            The padding went with them. `px-6 lg:px-10` only existed to hold the
            content off the vertical rules — with the frame gone it became a
            24/40px indent that pushed the headline inboard of the card grid
            below, which shares the container's own gutter. The header now
            starts on the same line as the cards; only the bottom rhythm is
            kept, so the gap to the grid is unchanged. */}
        <div className="relative">
          <div className="grid gap-6 pb-10 lg:grid-cols-12 lg:gap-8 lg:pb-12">
            <motion.h2 {...rise(0)} className="text-h1 text-ink text-balance lg:col-span-5">
              {HEADLINE}
            </motion.h2>

            {/* justify-self-end puts the BLOCK against the column edge;
                lg:text-right ranges the copy and the button along it too.
                Without the second, the block sat at the right edge with its
                text still ragged-right, which reads as an accident rather than
                a decision. Left-aligned below lg, where the block is full
                width and stacked under the headline. */}
            <motion.div
              {...rise(1)}
              className="lg:col-span-5 lg:col-start-8 lg:justify-self-end lg:text-right"
            >
              <p className="max-w-[34ch] text-body text-ink-secondary text-pretty">{LEDE}</p>
              <a
                href="#thesis"
                className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface px-5 py-2.5 text-nav text-ink transition-[background-color,border-color] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-ink-tertiary hover:bg-page-alt"
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none" aria-hidden>
                  <path
                    d="M5 11 11 5m0 0H6m5 0v5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Read the thesis
              </a>
            </motion.div>
          </div>
        </div>

        {/* ---- 2 | visual | 2 ----
            Below lg the visual takes `order-first` so the stack reads
            visual → 01 → 02 → 03 → 04. The cards are numbered, so interrupting
            them at the halfway point would break the count the lede promises
            ("four things decide it"). */}
        <div className="mt-14 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_1.3fr_1fr]">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <FocusCard card={CARDS[0]} index={0} reduce={!!reduce} />
            <FocusCard card={CARDS[1]} index={1} reduce={!!reduce} />
          </div>

          {/* Centre visual */}
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.9, ease: EASE_DRAMATIC }}
            className="relative order-first overflow-hidden rounded-md lg:order-none"
            style={{ backgroundColor: plate.paper }}
          >
            <Image
              src={plate.src}
              alt={plate.alt}
              width={plate.width}
              height={plate.height}
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="h-[300px] w-full object-cover object-center lg:h-full lg:min-h-[440px]"
            />

            <div className="absolute inset-0 flex items-center justify-center p-6">
              <ScreeningStack reduce={!!reduce} />
            </div>
          </motion.div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <FocusCard card={CARDS[2]} index={2} reduce={!!reduce} />
            <FocusCard card={CARDS[3]} index={3} reduce={!!reduce} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------------------
   Screening stack — code-rendered, three memos at three verdicts.
   The two behind are scaled and offset so the stack reads as depth without a
   shadow (the system has none). Static, not a loop: a perpetual animation here
   would compete with reading for no informational gain.
   ------------------------------------------------------------------------ */
function ScreeningStack({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative w-full max-w-[300px]">
      {/* Cards behind */}
      {STACK.map((s, i) => (
        <motion.div
          key={s.id}
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.62,
            delay: reduce ? 0 : 0.1 + i * 0.09,
            ease: EASE_DRAMATIC,
          }}
          className="mx-auto flex items-center justify-between rounded-sm border border-line bg-surface px-3 py-2"
          style={{
            width: `${86 + i * 7}%`,
            marginBottom: -6,
          }}
        >
          <span className="font-mono text-caption text-ink-secondary tabular-nums">{s.id}</span>
          <Chip>{s.state}</Chip>
        </motion.div>
      ))}

      {/* Front card */}
      <motion.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 14 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.5 }}
        transition={{
          duration: 0.62,
          delay: reduce ? 0 : 0.28,
          ease: EASE_DRAMATIC,
        }}
        className="relative rounded-md border border-line bg-surface"
      >
        <div className="flex items-center justify-between border-b border-line-subtle px-3.5 py-2.5">
          <span className="font-mono text-caption text-ink-secondary tabular-nums">FN-120</span>
          <Chip tone="warm">Committed</Chip>
        </div>
        <div className="px-3.5 py-3">
          <p className="text-caption text-ink">Second customer renewed before the round opened.</p>
          <p className="mt-1.5 text-caption text-ink-secondary">Industrial telemetry · pre-seed</p>
        </div>
        <div className="flex items-center justify-between border-t border-line-subtle px-3.5 py-2">
          <span className="text-caption font-mono text-ink">
            Days to decision
          </span>
          <Figure
            value="11"
            className="font-mono text-caption text-[var(--color-accent-warm)] tabular-nums"
          />
        </div>
      </motion.div>
    </div>
  );
}
