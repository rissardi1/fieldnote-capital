"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import PortfolioPanel from "@/components/PortfolioPanel";
import LogoGrid from "@/components/LogoGrid";
import { ColumnRules, PatternBand } from "@/components/Rules";

/* ---------------------------------------------------------------------------
   SECTION 2 — HERO
   Tokens: docs/TOKENS.md §3 type · §4 spacing · §6 motion · §7 art layer
   Reference anatomy (Lumen · Orbaxon · Answerr all share it):
     eyebrow → 2-line display → sub → dual CTA → art band + floating UI → logos
   ------------------------------------------------------------------------ */

const EASE_DRAMATIC = [0.16, 1, 0.3, 1] as const;

/* Checked against the §4.7 caps: eyebrow 24 · headline 48 · sub 120 · CTA 3w
   The eyebrow must not restate the headline. "First cheques since 2019" over
   "We write first cheques." added only a year — a decorative label carrying no
   new information. It now says what the headline and subhead cannot. */
const EYEBROW = "Fund III · Now investing";            // 24
/* Each line stays near 22ch: at 68px/-0.05em a longer line cannot hold one row
   inside the 900px measure and silently breaks to three. */
const LINE_1 = "We write first cheques.";              // 23
const LINE_2 = "Then we stay.";                        // 13  → 37 total
const SUBHEAD =
  "Pre-seed and seed for technical founders. $250k to $2M, and a decade of staying close after."; // 92

export default function Hero() {
  const reduce = useReducedMotion();
  const artRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: artRef,
    offset: ["start end", "end start"],
  });
  const plateY = useTransform(scrollYProgress, [0, 1], ["-4%", "4%"]);

  const rise = (delay: number) =>
    reduce
      ? { initial: { opacity: 0 }, animate: { opacity: 1 }, transition: { duration: 0.2, delay: 0 } }
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.62, delay, ease: EASE_DRAMATIC },
        };

  return (
    <section id="hero" className="relative overflow-hidden">
      <ColumnRules />

      {/* ---------- Type block ---------- */}
      <div className="section pb-0">
        <div className="container-page">
          <div className="mx-auto flex max-w-[900px] flex-col items-center text-center">
            <motion.p {...rise(0)} className="text-eyebrow uppercase font-mono text-ink-secondary">
              {EYEBROW}
            </motion.p>

            <motion.h1 {...rise(0.09)} className="mt-6 text-display text-ink">
              {LINE_1}
              <br />
              {LINE_2}
            </motion.h1>

            <motion.p
              {...rise(0.18)}
              className="mt-6 max-w-[560px] text-body-lg text-ink-secondary text-pretty"
            >
              {SUBHEAD}
            </motion.p>

            <motion.div
              {...rise(0.27)}
              className="mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#cta"
                className="rounded-full bg-accent px-6 py-3 text-nav text-on-dark transition-[background-color,transform] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:bg-accent-hover hover:-translate-y-px active:translate-y-0 active:scale-[0.98] motion-reduce:transform-none"
              >
                Send a note
              </a>
              {/* Was "See portfolio" → #portfolio. That section is hidden, so the
                  anchor was dead. Restore both together. */}
              <a
                href="#thesis"
                className="rounded-full border border-line bg-transparent px-6 py-3 text-nav text-ink transition-[background-color,border-color] duration-[220ms] ease-[cubic-bezier(0.4,0,0.2,1)] hover:border-ink-tertiary hover:bg-page-alt"
              >
                How we work
              </a>
            </motion.div>
          </div>
        </div>
      </div>

      {/* ---------- Art band + floating panel ----------
          The plate is NOT full-bleed: it sits inside the 1280px content column
          like everything else (§4 --container-max). Media frame per §7 —
          --radius-lg, 1px hairline, no shadow. Ground is the plate's own paper
          colour so the dither meets the frame with no seam. */}
      <div ref={artRef} className="relative mt-10 lg:mt-12">
        <div className="container-page">
          {/* Hatched measure strips mount the plate on the ruled sheet rather
              than letting it float on the page. */}
          <PatternBand className="border-x border-t border-line" />
          <div className="relative overflow-hidden border border-line bg-[var(--color-art-paper)]">
            <motion.div style={reduce ? undefined : { y: plateY }} className="relative">
              <Image
                src="/art/hero-dither.png"
                alt="Michelangelo's Creation of Adam, rendered as a one-bit dither plate."
                width={1600}
                height={700}
                priority
                sizes="(min-width: 1280px) 1280px, 100vw"
                className="h-[300px] w-full object-cover object-center sm:h-[400px] lg:h-[700px]"
              />
            </motion.div>

            <div className="pointer-events-none absolute inset-0 hidden items-center justify-center px-8 lg:flex">
              <div className="pointer-events-auto w-full">
                <PortfolioPanel reduce={!!reduce} />
              </div>
            </div>
          </div>
          <PatternBand className="hidden border-x border-b border-line lg:block" />
        </div>

        <div className="container-page lg:hidden">
          <div className="-mt-12 sm:-mt-16">
            <PortfolioPanel reduce={!!reduce} />
          </div>
        </div>
      </div>

      {/* ---------- Trusted-by, as a ruled band ----------
          The technical rules are back, with a job: they delimit the logo band
          as a distinct region — Lumen's device. Horizontals bound the band,
          vertical end-ticks mark where the content column starts and stops, so
          the marquee reads as travelling *through* a fixed frame rather than
          floating loose. Drawn in --color-line (not line-subtle): a rule you
          cannot see is decoration, not structure. */}
      <div className="section-sm">
        <div className="container-page">
          <div className="relative border-b border-line">
            {/* Vertical end-ticks at the column edges */}
            <span aria-hidden className="absolute inset-y-0 left-0 w-px bg-line" />
            <span aria-hidden className="absolute inset-y-0 right-0 w-px bg-line" />

            <p className="border-b border-line py-4 text-center text-eyebrow uppercase font-mono text-ink-secondary">
              Backed at first cheque
            </p>

            {/* Two-row ruled grid. Cell hairlines use --color-line, the same
                weight as the band frame and the column rules — a second, lighter
                rule colour inside the same band read as a mistake. */}
            <LogoGrid />
          </div>
        </div>
      </div>
    </section>
  );
}
